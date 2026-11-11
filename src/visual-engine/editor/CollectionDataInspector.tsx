import { useEffect, useState } from "react";
import { COLLECTION_FILTER_OPERATORS, type CollectionFilter, type CollectionFilterOperator, type RepeaterNode } from "../model";
import type { NodePatch } from "../operations";
import { useVisualDataSchemas } from "../host/DataContext";
import { InspectorField, InspectorInput, InspectorNumber, InspectorSection, InspectorSelect } from "./InspectorSection";

const operatorLabels: Record<CollectionFilterOperator, string> = {
 eq: "Equals", in: "One of", gt: "Greater than (gt)", gte: "Greater than or equal (gte)", lt: "Less than (lt)", lte: "Less than or equal (lte)",
};
function filterOperators(type?: string) {
 return COLLECTION_FILTER_OPERATORS.filter(operator => operator === "eq" || (operator === "in" ? type !== "date" : type === undefined || ["int", "float", "double", "date"].includes(type)));
}
function scalarValue(value: string, type?: string): string | number | boolean {
 if (["int", "float", "double"].includes(type ?? "") && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
 if (["bool", "boolean"].includes(type ?? "") && ["true", "false"].includes(value)) return value === "true";
 return value;
}
/** Keep incomplete numeric drafts (minus sign / decimal point) intact until committed. */
function FilterValueInput({ filter, type, index, onChange }: { filter: CollectionFilter; type?: string; index: number; onChange(value: CollectionFilter["value"]): void }) {
 const saved = Array.isArray(filter.value) ? filter.value.join(",") : String(filter.value ?? "");
 const [draft, setDraft] = useState(saved);
 useEffect(() => setDraft(saved), [saved]);
 const commit = () => onChange(filter.operator === "in" ? draft.split(",").map(value => scalarValue(value.trim(), type)) : scalarValue(draft, type));
 return <InspectorField label={filter.operator === "in" ? "Values (comma separated)" : "Value"}>
  <input className="vb-field__control" aria-label={`Filter ${index + 1} value`} placeholder={type === "date" ? "YYYY-MM-DD" : undefined} inputMode={["int", "float", "double"].includes(type ?? "") ? "decimal" : undefined} value={draft} onChange={event => setDraft(event.target.value)} onBlur={commit} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); commit(); } }} />
 </InspectorField>;
}

export function CollectionDataInspector({ node, onUpdate }: { node: RepeaterNode; onUpdate: (patch: NodePatch) => void }) {
 const schemas = useVisualDataSchemas();
 const fields = schemas.find(schema => schema.name === node.source.schemaName)?.fields.filter(field => field.path.length === 1) || [];
 const filters = node.source.filters || [];
 const update = (source: RepeaterNode["source"]) => onUpdate({ source });
 return <InspectorSection title="Data" category="content" defaultOpen>
  {!!schemas.length && <InspectorSelect label="Schema" ariaLabel="Data schema" value={schemas.some(schema => schema.name === node.source.schemaName) ? node.source.schemaName : ""} options={[{ value: "", label: "Choose schema or enter manually" }, ...schemas.map(schema => ({ value: schema.name, label: schema.name }))]} onChange={schemaName => { if (schemaName) update({ ...node.source, schemaName }); }} />}
  <InspectorInput label="Source" ariaLabel="Collection source" value={node.source.schemaName} onChange={schemaName => update({ ...node.source, schemaName })} />
  {!!schemas.length && !schemas.some(schema => schema.name === node.source.schemaName) && <p role="status">This schema is not in the current project's metadata. Check the name and runtime access.</p>}
  {!schemas.length && <p>Schema metadata is unavailable. Enter the schema and field paths manually.</p>}
  <InspectorInput label="Item alias" value={node.itemAlias} onChange={itemAlias => onUpdate({ itemAlias })} />
  <InspectorNumber label="Limit" value={node.source.limit} min={1} max={100} step={1} onChange={limit => update({ ...node.source, limit })} />
  <p>First page only, up to {node.source.limit} records. Live pagination will be added separately.</p>
  <p>For a range, add two filters on the same field: one lower bound and one upper bound. Both must match.</p>
  {filters.map((filter, index) => {
   const type = fields.find(field => field.name === filter.field)?.type;
   const operators = filterOperators(type);
   const setFilter = (patch: Partial<CollectionFilter>) => update({ ...node.source, filters: filters.map((entry, i) => i === index ? { ...entry, ...patch } : entry) });
   return <fieldset key={index} className="my-2 rounded border p-2"><legend>Filter {index + 1}</legend>
    <InspectorInput label="Field" ariaLabel={`Filter ${index + 1} field`} value={filter.field} onChange={field => {
     const nextType = fields.find(entry => entry.name === field)?.type;
     const operator = filterOperators(nextType).includes(filter.operator) ? filter.operator : "eq";
     setFilter({ field, operator, value: operator === "in" ? [] : "" });
    }} />
    <InspectorSelect label="Operator" ariaLabel={`Filter ${index + 1} operator`} value={filter.operator} options={[...operators, ...(operators.includes(filter.operator) ? [] : [filter.operator])].map(value => ({ value, label: operatorLabels[value] }))} onChange={value => {
     const operator = value as CollectionFilterOperator;
     setFilter({ operator, value: operator === "in" ? (Array.isArray(filter.value) ? filter.value : filter.value === "" || filter.value === null ? [] : [filter.value]) : Array.isArray(filter.value) ? filter.value.length === 1 ? filter.value[0] : "" : filter.value });
    }} />
    {!operators.includes(filter.operator) && <p role="alert">This operator is unavailable for the field type. Choose another operator.</p>}
    <FilterValueInput key={`${filter.field}:${filter.operator}:${type}`} filter={filter} type={type} index={index} onChange={value => setFilter({ value })} />
    {type === "date" && <p>Use YYYY-MM-DD. Date comparisons use midnight UTC; Equals matches that exact timestamp.</p>}
    <button type="button" className="vb-button" onClick={() => update({ ...node.source, filters: filters.filter((_, i) => i !== index) })}>Remove filter {index + 1}</button>
   </fieldset>;
  })}
  <button type="button" className="vb-button" disabled={filters.length >= 10} onClick={() => update({ ...node.source, filters: [...filters, { field: fields[0]?.name || "field", operator: "eq", value: "" }] })}>Add filter</button>
  <InspectorInput label="Sort field" value={node.source.sort?.[0]?.field || ""} onChange={field => update({ ...node.source, sort: field ? [{ field, direction: node.source.sort?.[0]?.direction || "asc" }] : undefined })} />
  <InspectorSelect label="Sort direction" value={node.source.sort?.[0]?.direction || "asc"} options={[{ value: "asc", label: "Ascending" }, { value: "desc", label: "Descending" }]} onChange={direction => { if (node.source.sort?.length) update({ ...node.source, sort: [{ ...node.source.sort[0], direction: direction as "asc" | "desc" }] }); }} />
 </InspectorSection>;
}
