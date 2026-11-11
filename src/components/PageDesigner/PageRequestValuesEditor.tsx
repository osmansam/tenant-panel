import type { JsonRequestValue, PageRequestValues, PageRequestSource } from "../../types/pageRequests";
import { pageRequestControls } from "../../utils/pageRequests";
const inputClass = "w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2 text-sm text-ui-foreground";
function readValue(value: string): JsonRequestValue {
  try { const parsed: unknown = JSON.parse(value); if (parsed === null || typeof parsed === "boolean" || typeof parsed === "number" || Array.isArray(parsed)) return parsed as JsonRequestValue; } catch { /* plain text */ }
  return value;
}
export default function PageRequestValuesEditor({ source, value = {}, onChange, label = "Defaults" }: { source: PageRequestSource; value?: PageRequestValues; onChange: (value: PageRequestValues) => void; label?: string }) {
  const bag = (name: "filters" | "params", title: string) => <fieldset className="space-y-2"><legend className="text-sm font-medium">{title}</legend>
    {Object.entries(value[name] || {}).map(([key, fieldValue], index) => <div className="flex gap-2" key={`${name}-${index}`}>
      <input className={inputClass} aria-label={`${label} ${title} name ${index + 1}`} value={key} onChange={event => { const entries = Object.entries(value[name] || {}); entries[index][0] = event.target.value; onChange({ ...value, [name]: Object.fromEntries(entries) }); }} />
      <input className={inputClass} aria-label={`${label} ${title} value ${index + 1}`} value={typeof fieldValue === "string" ? fieldValue : JSON.stringify(fieldValue)} onChange={event => onChange({ ...value, [name]: { ...value[name], [key]: readValue(event.target.value) } })} />
      <button type="button" aria-label={`Remove ${title} ${index + 1}`} onClick={() => { const next = { ...value[name] }; delete next[key]; onChange({ ...value, [name]: next }); }}>Remove</button>
    </div>)}
    <button type="button" className="text-sm text-ui-accent" onClick={() => { let key = "field"; let i = 1; while (Object.hasOwn(value[name] || {}, key)) key = `field${++i}`; onChange({ ...value, [name]: { ...value[name], [key]: "" } }); }}>Add {title.toLowerCase()}</button>
  </fieldset>;
  return <div className="space-y-4">
    {bag("filters", "Filter")}{bag("params", "Parameter")}
    <div className="grid gap-3 sm:grid-cols-2">{pageRequestControls(source).map(key => <label className="space-y-1 text-sm" key={key}>{({ page: "Page", limit: "Page size", sort: "Sort field", asc: "Sort direction", search: "Search" } as Record<string, string>)[key]}
      {key === "asc" ? <select className={inputClass} aria-label={`${label} sort direction`} value={value.controls?.asc === undefined ? "" : String(value.controls.asc)} onChange={event => { const controls = { ...value.controls }; if (!event.target.value) delete controls.asc; else controls.asc = event.target.value === "true"; onChange({ ...value, controls }); }}><option value="">Inherit</option><option value="true">Ascending</option><option value="false">Descending</option></select>
        : <input className={inputClass} aria-label={`${label} ${key}`} type={key === "page" || key === "limit" ? "number" : "text"} min={1} value={(value.controls as Record<string, unknown> | undefined)?.[key] as string | number ?? ""} placeholder="Inherit" onChange={event => { const controls = { ...value.controls } as Record<string, unknown>; if (event.target.value === "") delete controls[key]; else controls[key] = key === "page" || key === "limit" ? Number(event.target.value) : event.target.value; onChange({ ...value, controls }); }} />}
    </label>)}</div>
    {source.transport === "table-source" && <label className="block space-y-1 text-sm">Returned fields<input className={inputClass} aria-label={`${label} returned fields`} placeholder="All fields, or comma-separated field names" value={value.fields?.join(", ") || ""} onChange={event => { const next = { ...value }; const fields = event.target.value.split(",").map(value => value.trim()).filter(Boolean); if (fields.length) next.fields = fields; else delete next.fields; onChange(next); }} /></label>}
  </div>;
}
