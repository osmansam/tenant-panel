import { useEffect, useState } from "react";
import type { ComponentNode, ConditionalColorRule, ConditionalColors } from "../model";
import { isConditionalColorRules, MAX_CONDITIONAL_COLOR_RULES, validConditionalColorPath } from "../model/conditionalColors";
import type { NodePatch } from "../operations";
import { useVisualDataSchemas } from "../host/DataContext";
import { useOptionalActiveTheme } from "../theme/ThemeScope";
import { ColorPaintControl } from "./ColorPaintControl";
import { InspectorCheckbox, InspectorField, InspectorInput, InspectorSection, InspectorSelect } from "./InspectorSection";
import "./conditional-colors.css";

const operators = [{ value: "lt", label: "Less than" }, { value: "lte", label: "Less than or equal" }, { value: "gt", label: "Greater than" }, { value: "gte", label: "Greater than or equal" }, { value: "between", label: "Between (lower included, upper excluded)" }, { value: "eq", label: "Equals" }, { value: "neq", label: "Does not equal" }];
function ItemPath({ value, label, onChange }: { value: string[]; label: string; onChange: (path: string[]) => void }) {
 const canonical = `item.${value.join(".")}`;
 const [text, setText] = useState(canonical), [error, setError] = useState(false);
 useEffect(() => { setText(canonical); setError(false); }, [canonical]);
 return <><InspectorField label="Item path"><input className="vb-field__control" aria-label={label} value={text} aria-invalid={error || undefined} onChange={event => { setText(event.target.value); setError(false); }} onBlur={() => {
  const path = text.trim().replace(/^\{\{\s*|\s*\}\}$/g, "").trim().replace(/^item\./, "").split(".");
  if (!validConditionalColorPath(path)) { setError(true); return; }
  onChange(path);
 }} /></InspectorField>{error && <p role="alert">Enter a safe item field path. This incomplete path has not been applied.</p>}</>;
}
function NumberValue({ value, label, name, onChange }: { value: number; label: string; name: string; onChange: (value: number) => boolean }) {
 const [text, setText] = useState(String(value)), [error, setError] = useState(false);
 useEffect(() => { setText(String(value)); setError(false); }, [value]);
 const number = (text: string): number | undefined => text.trim() !== "" && /^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(text) && Number.isFinite(Number(text)) ? Number(text) : undefined;
 const commit = () => {
  const next = number(text);
  if (next === undefined || !onChange(next)) { setText(String(value)); setError(true); }
  else setError(false);
 };
 return <><InspectorField label={label}><input className="vb-field__control" role="spinbutton" inputMode="decimal" aria-label={name} aria-valuenow={value} aria-invalid={error || undefined} value={text} onChange={event => { setText(event.target.value); setError(false); }} onBlur={commit} onKeyDown={event => {
  if (event.key === "Enter") { event.preventDefault(); commit(); }
  if (event.key === "ArrowUp" || event.key === "ArrowDown") { event.preventDefault(); const next = (number(text) ?? value) + (event.key === "ArrowUp" ? 1 : -1); if (Number.isFinite(next) && onChange(next)) { setText(String(next)); setError(false); } }
 }} /></InspectorField>{error && <p role="alert">This value was not applied. The last saved value has been restored; check the number and range bounds.</p>}</>;
}
export function ConditionalColorsInspector({ node, schemaName, onUpdate }: { node: ComponentNode; schemaName?: string; onUpdate: (patch: NodePatch) => void }) {
 const schemas = useVisualDataSchemas(), theme = useOptionalActiveTheme();
 const fields = schemas.find(schema => schema.name === schemaName)?.fields || [];
 const rules = node.conditionalColors || [];
 const [error, setError] = useState("");
 const commit = (next: ConditionalColorRule[]) => {
  if (!isConditionalColorRules(next)) { setError("Check the rule values. A range needs an upper bound greater than its lower bound, and each rule needs at least one color."); return false; }
  setError(""); onUpdate({ conditionalColors: next.length ? next : undefined }); return true;
 };
 const update = (id: string, patch: Partial<ConditionalColorRule>) => commit(rules.map(rule => rule.id === id ? { ...rule, ...patch } : rule));
 const move = (index: number, offset: number) => { const next = [...rules]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; commit(next); };
 return <InspectorSection title="Conditional colors" category="design" defaultOpen>
  <p>Rules use each record's fields. The first match wins; otherwise normal colors stay. Preview with Sample records. Border color needs a visible border width.</p>
  {rules.map((rule, index) => {
   const label = `Rule ${index + 1}`;
   const numeric = !["eq", "neq"].includes(rule.operator) || typeof rule.value === "number";
   return <fieldset key={rule.id} className="vb-conditional-rule"><legend>{label}</legend>
    <div className="vb-conditional-rule__actions"><button type="button" className="vb-button" aria-label={`Move rule ${index + 1} up`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button type="button" className="vb-button" aria-label={`Move rule ${index + 1} down`} disabled={index === rules.length - 1} onClick={() => move(index, 1)}>↓</button><button type="button" className="vb-button" aria-label={`Remove color rule ${index + 1}`} onClick={() => commit(rules.filter(entry => entry.id !== rule.id))}>Remove</button></div>
    {!!fields.length && <InspectorSelect label="Field" ariaLabel={`${label} field`} value={fields.some(field => JSON.stringify(field.path) === JSON.stringify(rule.path)) ? JSON.stringify(rule.path) : ""} options={[{ value: "", label: "Choose field or enter manually" }, ...fields.map(field => ({ value: JSON.stringify(field.path), label: field.path.join(".") }))]} onChange={value => {
     const field = fields.find(entry => JSON.stringify(entry.path) === value); if (!field) return;
     const type = field.type.toLowerCase(), numericField = ["int", "float", "double", "decimal", "number"].some(part => type.includes(part));
     update(rule.id, { path: field.path, ...(!numericField ? { operator: "eq", value: ["boolean", "bool"].includes(type) ? false : "", upper: undefined } : {}) });
    }} />}
    <ItemPath value={rule.path} label={`${label} item path`} onChange={path => update(rule.id, { path })} />
    <InspectorSelect label="Comparison" ariaLabel={`${label} operator`} value={rule.operator} options={operators} onChange={value => {
     const operator = value as ConditionalColorRule["operator"], base = typeof rule.value === "number" ? rule.value : 0;
     update(rule.id, { operator, ...(["eq", "neq"].includes(operator) ? { upper: undefined } : { value: base, upper: operator === "between" ? base + 100 : undefined }) });
    }} />
    {["eq", "neq"].includes(rule.operator) && <InspectorSelect label="Value type" ariaLabel={`${label} value type`} value={typeof rule.value} options={[{ value: "number", label: "Number" }, { value: "string", label: "Text" }, { value: "boolean", label: "True / false" }]} onChange={type => update(rule.id, { value: type === "number" ? 0 : type === "boolean" ? false : "" })} />}
    {numeric ? <NumberValue label={rule.operator === "between" ? "From (included)" : "Value"} name={`${label} value`} value={Number(rule.value)} onChange={value => update(rule.id, { value })} /> : typeof rule.value === "boolean" ? <InspectorSelect label="Value" ariaLabel={`${label} value`} value={String(rule.value)} options={[{ value: "true", label: "True" }, { value: "false", label: "False" }]} onChange={value => update(rule.id, { value: value === "true" })} /> : <InspectorInput label="Value" ariaLabel={`${label} value`} value={String(rule.value)} onChange={value => update(rule.id, { value })} />}
    {rule.operator === "between" && <NumberValue label="To (excluded)" name={`${label} upper bound`} value={rule.upper!} onChange={upper => update(rule.id, { upper })} />}
    {(["text", "background", "border"] as const).map(target => {
     const color = rule.colors[target];
     return <div key={target} className="vb-conditional-rule__color"><InspectorCheckbox label={`${label} ${target} color`} checked={!!color} onChange={checked => {
      const colors: ConditionalColors = { ...rule.colors };
      if (checked) colors[target] = { kind: "token", value: target === "text" ? "text" : target === "background" ? "surface" : "border" }; else delete colors[target];
      update(rule.id, { colors });
     }} />{color && <ColorPaintControl label={`${label} ${target}`} value={color} resolvedTokenColors={theme?.values} onChange={value => update(rule.id, { colors: { ...rule.colors, [target]: value } })} />}</div>;
    })}
   </fieldset>;
  })}
  {error && <p role="alert">{error} Changes have not been applied.</p>}
  <button type="button" className="vb-button" disabled={rules.length >= MAX_CONDITIONAL_COLOR_RULES} onClick={() => commit([...rules, { id: crypto.randomUUID(), path: fields.find(field => field.name === "price")?.path || ["price"], operator: "lt", value: 0, colors: { text: { kind: "token", value: "success" } } }])}>Add color rule</button>
 </InspectorSection>;
}
