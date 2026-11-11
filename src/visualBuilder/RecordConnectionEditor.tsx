import { useRef, useState } from "react";
import { Button, Select, WorkspaceDialog, type SelectOption } from "../components/ui";
import type { ParameterBinding } from "../utils/api/page";
import type { ComponentBlock, PageModel } from "./pageTypes";
import { listPageComponents } from "./pageAdapter";

type SourceOption = SelectOption<string>;
export default function RecordConnectionEditor({ page, component, disabled, onSave }: { page: PageModel; component: ComponentBlock; disabled: boolean; onSave: (binding: ParameterBinding | null) => Promise<void> }) {
 const binding = component.dataBinding?.parameters?.item;
 const current = !binding ? "" : binding.source === "componentOutput" ? JSON.stringify([binding.componentId, binding.outputId]) : "unsupported";
 const [open, setOpen] = useState(false), [selected, setSelected] = useState(current), [saving, setSaving] = useState(false), [error, setError] = useState("");
 const busy = useRef(false);
 const options: SourceOption[] = [{ value: "", label: "No connection" }, ...listPageComponents(page).filter(block => block.id !== component.id && block.type === "table").flatMap(block => (block.outputs || []).filter(output => output.type === "record" && output.source.kind === "tableSelectedRecord").map(output => ({ value: JSON.stringify([block.id, output.id]), label: `${block.title || block.stateKey || block.id} · ${output.key}` })))];
 if (current && !options.some(option => option.value === current)) options.push({ value: current, label: current === "unsupported" ? "Existing connection (unsupported)" : "Missing selected-record output", disabled: true });
 const close = () => { if (!busy.current) setOpen(false); };
 const save = async () => {
  if (disabled || busy.current || selected === current) return;
  busy.current = true; setSaving(true); setError("");
  try {
   const ids: string[] = selected ? JSON.parse(selected) : [];
   await onSave(selected ? { source: "componentOutput", componentId: ids[0], outputId: ids[1] } : null);
   setOpen(false);
  } catch (reason) { setError(reason instanceof Error ? reason.message : "The connection could not be saved. Please retry."); }
  finally { busy.current = false; setSaving(false); }
 };
 return <>
  <Button type="button" variant="outline" title={binding ? "Manage this section's record connection" : "Optionally connect this section to table data"} onClick={() => { setSelected(current); setError(""); setOpen(true); }}>Data connection</Button>
  <WorkspaceDialog open={open} title="Data connection" description="Optionally display a record from another component." className="max-w-lg" onClose={close} footer={<div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={saving} onClick={close}>Cancel</Button><Button type="button" disabled={disabled || saving || selected === current} onClick={() => void save()}>{saving ? "Saving…" : "Save connection"}</Button></div>}>
   <div className="space-y-4">
    <p className="text-sm text-ui-muted">This design can be used without a table connection. Choose a table below when you want a details panel.</p>
    <div className="space-y-2"><p className="text-sm font-medium text-ui-foreground">Record source</p><Select<SourceOption> aria-label="Selected record source" value={options.find(option => option.value === selected) || options[0]} options={options} disabled={disabled || saving} menuPortalTarget={null} onChange={option => { const next = option as SourceOption | null; if (next) { setSelected(next.value); setError(""); } }} /></div>
    <p className="text-xs leading-5 text-ui-muted">Missing a table? Expose “Selected record” in Pages → table → Component Outputs, then save the page. Use <code>{"{{item.name}}"}</code> and other item fields in this design.</p>
    {disabled && <p className="text-sm text-ui-muted">Save your design changes before changing the connection.</p>}
    {error && <p role="alert" className="text-sm text-ui-danger">{error}</p>}
   </div>
  </WorkspaceDialog>
 </>;
}
