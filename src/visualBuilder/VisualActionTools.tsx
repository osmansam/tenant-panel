import { useState, type ReactNode } from "react";
import { Button, Checkbox, Input, Select, Textarea, WorkspaceDialog, type SelectOption } from "../components/ui";
import ActionSettingsTabs, { ActionConditionsEditor } from "../components/PageDesigner/ActionSettingsTabs";
import ActionConstantValuesEditor from "../components/PageDesigner/ActionConstantValuesEditor";
import FormFieldEditor from "../components/PageDesigner/FormFieldEditor";
import type { FormFieldConfig, TableActionConfig, TableActionKind, TableActionModalType } from "../types/page";
import type { ComponentDocument, HostActionSpec } from "../visual-engine/model";
import type { VisualDataSchema } from "../visual-engine/host/DataContext";
import { findAncestors, findNode, mapNode } from "../visual-engine/operations/queryNode";
import { itemPath, readRecordAction, recordActionSpec } from "./recordActions";

type Props = {
 document: ComponentDocument; selectedId: string | null; schemas: readonly VisualDataSchema[];
 onReplace: (document: ComponentDocument) => void; onSelect: (id: string) => void;
};
type PassedValue = { id: string; destination: string; path: string };
type Draft = { nodeId: string; schemaName: string; action: TableActionConfig; values: PassedValue[] };
type Option = SelectOption<string>;
const Choice = ({ label, value, options, onChange }: { label: string; value: string; options: readonly Option[]; onChange: (value: string) => void }) => <Select<Option> aria-label={label} value={options.find(option => option.value === value) || null} options={options} onChange={selected => { if (selected) onChange((selected as Option).value); }} />;
const Control = ({ label, children }: { label: string; children: ReactNode }) => <label className="block space-y-1"><span className="text-sm font-medium">{label}</span>{children}</label>;
const modalFor = (kind: TableActionKind): TableActionModalType => kind === "delete" ? "confirm" : ["edit", "create"].includes(kind) ? "form" : "none";
const schemaFields = (schema?: VisualDataSchema): FormFieldConfig[] => (schema?.fields || []).flatMap(field => {
 if (field.path.length !== 1 || ["_id", "createdAt", "updatedAt"].includes(field.name)) return [];
 const type = field.type.toLowerCase();
 if (["object", "array"].some(value => type.includes(value))) return [];
 const number = ["int", "float", "double", "number", "decimal"].some(value => type.includes(value));
 const boolean = ["bool", "boolean"].includes(type), date = ["date", "datetime"].includes(type);
 return [{ formKey: field.name, label: field.name, type: number ? "number" : boolean ? "checkbox" : date ? "date" : "text", formKeyType: number ? "number" : boolean ? "boolean" : date ? "date" : "string" }];
});

export default function VisualActionTools({ document, selectedId, schemas, onReplace, onSelect }: Props) {
 const selected = selectedId ? findNode(document.root, selectedId) : undefined;
 const [draft, setDraft] = useState<Draft | null>(null), [error, setError] = useState("");
 const update = (updates: Partial<TableActionConfig>) => setDraft(value => value && ({ ...value, action: { ...value.action, ...updates } }));
 const open = () => {
  if (selected?.type !== "button") return;
  const repeater = findAncestors(document.root, selected.id).reverse().find(node => node.type === "repeater");
  const schemaName = repeater?.type === "repeater" ? repeater.source.schemaName : schemas[0]?.name || "";
  let next: Draft = { nodeId: selected.id, schemaName, action: { kind: "edit", modalType: "form", formFields: schemaFields(schemas.find(schema => schema.name === schemaName)) }, values: [] };
  setError("");
  if (selected.action) {
   try {
    const config = readRecordAction(selected.action);
    next = { nodeId: selected.id, schemaName: config.schemaName, action: config.action, values: Object.entries(config.valueBindings || {}).map(([destination, path]) => ({ id: crypto.randomUUID(), destination, path: `item.${path.join(".")}` })) };
   } catch (reason) { setError((reason as Error).message); }
  }
  setDraft(next);
 };
 const apply = (remove = false) => {
  if (!draft) return;
  try {
   let action: HostActionSpec | undefined;
   if (!remove) {
    const destinations = draft.values.map(value => value.destination.trim());
    if (new Set(destinations).size !== destinations.length) throw new Error("Passed values need unique destination fields.");
    action = recordActionSpec({ schemaName: draft.schemaName.trim(), action: draft.action, valueBindings: Object.fromEntries(draft.values.map(value => [value.destination.trim(), itemPath(value.path)])) });
   }
   const root = mapNode(document.root, draft.nodeId, node => {
    if (node.type !== "button") return node;
    const bindings = node.bindings ? { ...node.bindings } : undefined;
    if (bindings) delete bindings.href;
    return { ...node, action, href: undefined, submit: undefined, openInNewTab: undefined, bindings };
   });
   onReplace({ ...document, root: root as ComponentDocument["root"] }); onSelect(draft.nodeId); setDraft(null); setError("");
  } catch (reason) { setError((reason as Error).message); }
 };
 const containers = schemas.map(schema => ({ schemaName: schema.name, fields: schema.fields.filter(field => field.path.length === 1).map(field => ({ name: field.name, type: field.type })) }));
 const fields: FormFieldConfig[] = draft?.action.formFields || [];
 const setFields = (formFields: FormFieldConfig[]) => update({ formFields });
 const sourceSchema = selectedId ? findAncestors(document.root, selectedId).reverse().find(node => node.type === "repeater") : undefined;
 const sourceFields = sourceSchema?.type === "repeater" ? schemas.find(schema => schema.name === sourceSchema.source.schemaName)?.fields || [] : [];
 const paths = Array.from(new Set(["_id", ...sourceFields.map(field => field.path.join("."))]));
 return <div className="flex flex-wrap items-center gap-3 border-b bg-white px-4 py-2 text-sm text-slate-700">
  <Button variant="outline" disabled={selected?.type !== "button"} title={selected?.type !== "button" ? "Select a Button in Layers to configure its action." : undefined} onClick={open}>Configure button action</Button>
  {selected?.type === "button" && <span>The complete clicked record is available, including undisplayed fields such as <code>item._id</code>.</span>}
  {draft && <WorkspaceDialog open title="Configure button action" size="workspace" onClose={() => setDraft(null)} footer={<div className="flex flex-wrap justify-end gap-2"><Button variant="outline" onClick={() => apply(true)}>Remove action</Button><Button variant="outline" onClick={() => setDraft(null)}>Cancel action</Button><Button onClick={() => apply()}>Apply action</Button></div>}>
   <p className="mb-4 text-sm">Actions run on published pages with the visitor's existing permissions. Designing and sample previews never run actions.</p>
   {error && <p role="alert" className="mb-3 text-ui-danger">{error}</p>}
   <ActionSettingsTabs expanded id="visual-button-action" label="Button action settings" actionContent={<>
    <div className="grid gap-3 md:grid-cols-3">
     <Control label="Operation"><Choice label="Record operation" value={draft.action.kind} options={["create", "edit", "update", "delete", "link"].map(value => ({ value, label: value[0].toUpperCase() + value.slice(1) }))} onChange={value => update({ kind: value as TableActionKind, modalType: modalFor(value as TableActionKind), ...(["delete", "link"].includes(value) ? { submit: undefined } : {}) })} /></Control>
     <Control label="Target schema"><Input aria-label="Target schema" list="visual-action-schemas" value={draft.schemaName} onChange={event => setDraft({ ...draft, schemaName: event.target.value })} /><datalist id="visual-action-schemas">{schemas.map(schema => <option key={schema.name} value={schema.name} />)}</datalist></Control>
     <Control label="Open"><Choice label="Action modal" value={draft.action.modalType || "none"} options={[{ value: "form", label: "Form modal" }, { value: "confirm", label: "Confirmation" }, { value: "none", label: "No modal" }]} onChange={value => update({ modalType: value as TableActionModalType })} /></Control>
     <Control label="Form submit label"><Input value={draft.action.buttonName || ""} onChange={event => update({ buttonName: event.target.value })} placeholder="Save changes" /></Control>
     <Control label="Confirmation title"><Input value={draft.action.confirmTitle || ""} onChange={event => update({ confirmTitle: event.target.value })} /></Control>
     <Control label="Confirmation text"><Input value={draft.action.confirmText || ""} onChange={event => update({ confirmText: event.target.value })} /></Control>
    </div>
    {draft.action.kind === "link" ? <Control label="Link template"><Input value={draft.action.linkTemplate || draft.action.path || ""} onChange={event => update({ linkTemplate: event.target.value })} placeholder="/items/{{item._id}}" /></Control> : !["delete"].includes(draft.action.kind) && <div className="space-y-3 rounded border p-3">
     <label className="flex items-center gap-2"><Checkbox checked={!!draft.action.submit} onChange={event => update({ submit: event.target.checked ? { workflowName: "", workflowSchema: draft.schemaName } : undefined })} />Submit to a workflow</label>
     {draft.action.submit && <div className="grid gap-3 md:grid-cols-2"><Control label="Workflow schema"><Input value={draft.action.submit.workflowSchema || ""} onChange={event => update({ submit: { ...draft.action.submit, workflowSchema: event.target.value } })} /></Control><Control label="Workflow name"><Input value={draft.action.submit.workflowName || ""} onChange={event => update({ submit: { ...draft.action.submit, workflowName: event.target.value } })} /></Control></div>}
    </div>}
    <section className="space-y-3 rounded border p-3"><h3 className="font-semibold">Pass values from the clicked record</h3><p>Visible form fields are prefilled and editable. Other destination fields are submitted as hidden values. Edit, update and delete always use the clicked record's original <code>_id</code>.</p>
     {draft.values.map((value, index) => <div className="grid items-end gap-2 md:grid-cols-[1fr_1fr_1fr_auto]" key={value.id}>
      <Control label="Destination field"><Input aria-label={`Passed value ${index + 1} destination`} value={value.destination} placeholder="productId" onChange={event => setDraft({ ...draft, values: draft.values.map(row => row.id === value.id ? { ...row, destination: event.target.value } : row) })} /></Control>
      <Control label="Source field"><Choice label={`Passed value ${index + 1} source field`} value={value.path.replace(/^item\./, "")} options={paths.map(path => ({ value: path, label: `item.${path}` }))} onChange={path => setDraft({ ...draft, values: draft.values.map(row => row.id === value.id ? { ...row, path: `item.${path}` } : row) })} /></Control>
      <Control label="Item path"><Input aria-label={`Passed value ${index + 1} item path`} value={value.path} placeholder="item._id" onChange={event => setDraft({ ...draft, values: draft.values.map(row => row.id === value.id ? { ...row, path: event.target.value } : row) })} /></Control>
      <Button variant="outline" onClick={() => setDraft({ ...draft, values: draft.values.filter(row => row.id !== value.id) })} aria-label={`Remove passed value ${index + 1}`}>Remove</Button>
     </div>)}
     <Button variant="outline" onClick={() => setDraft({ ...draft, values: [...draft.values, { id: crypto.randomUUID(), destination: "", path: "item._id" }] })}>Add passed value</Button>
    </section>
    <ActionConstantValuesEditor values={draft.action.constantValues} onChange={constantValues => update({ constantValues })} />
   </>} formContent={draft.action.modalType === "form" ? {
    fields: <><div className="flex gap-2"><Button variant="outline" onClick={() => setFields(schemaFields(schemas.find(schema => schema.name === draft.schemaName)))}>Load schema fields</Button><Button variant="outline" onClick={() => setFields([...fields, { formKey: "", type: "text", formKeyType: "string" }])}>Add form field</Button></div>{fields.map((field, index) => <FormFieldEditor key={index} field={field} index={index} containers={containers} formFields={fields} onChange={changes => setFields(fields.map((entry, at) => at === index ? { ...entry, ...changes } : entry))} onRemove={() => setFields(fields.filter((_, at) => at !== index))} />)}</>,
    layout: <div className="space-y-3"><Control label="Form columns"><Choice label="Form columns" value={String(draft.action.formLayout?.columns || 1)} options={[1, 2, 3, 4].map(value => ({ value: String(value), label: String(value) }))} onChange={value => update({ formLayout: { ...draft.action.formLayout, columns: Number(value) as 1 | 2 | 3 | 4 } })} /></Control><label className="flex items-center gap-2"><Checkbox checked={!!draft.action.formLayout?.allowOverflow} onChange={event => update({ formLayout: { ...draft.action.formLayout, allowOverflow: event.target.checked } })} />Allow overflow</label><Control label="Form container classes"><Textarea value={draft.action.formLayout?.generalClassName || ""} onChange={event => update({ formLayout: { ...draft.action.formLayout, generalClassName: event.target.value } })} /></Control></div>,
    defaultValues: <p>Set each field's default in Fields. Passed values override record values, and Default / hidden values in Action override passed values. Visible form values remain editable.</p>,
   } : undefined} conditionsContent={<ActionConditionsEditor action={draft.action} onChange={update} />} />
  </WorkspaceDialog>}
 </div>;
}
