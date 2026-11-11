import type { PageModel, ComponentBlock } from "../../utils/api/page";
import type { PageRequestConnection } from "../../types/pageRequests";
import { pageRequestDefinitions, type PageRequestSlot } from "../../utils/pageRequests";
import PageRequestValuesEditor from "./PageRequestValuesEditor";
export default function PageRequestConnectionEditor({ page, component, slot, value, onChange, disabled }: { page: PageModel; component: ComponentBlock; slot: PageRequestSlot; value?: PageRequestConnection; onChange: (value: PageRequestConnection | undefined) => void; disabled?: boolean }) {
  const definitions = pageRequestDefinitions(page);
  const current = definitions.find(request => request.id === value?.requestId);
  return <fieldset disabled={disabled} className="space-y-3 rounded-ui-md border border-ui-border p-3">
    <label className="block space-y-1 text-sm"><span className="font-medium">{slot.label}</span><select className="w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2" aria-label={`${component.title || component.id} · ${slot.label} request`} value={value?.requestId || ""} onChange={event => onChange(event.target.value ? { requestId: event.target.value } : undefined)}>
      <option value="">Use component source</option>
      {definitions.filter(request => !slot.records || request.result.kind === "records" || request.id === value?.requestId).map(request => <option value={request.id} key={request.id}>{request.name}</option>)}
      {value && !current && <option value={value.requestId}>Missing request</option>}
    </select></label>
    {current && value && <details><summary className="cursor-pointer text-sm text-ui-muted">Local overrides</summary><div className="mt-3 space-y-3"><p className="text-xs text-ui-muted">Empty settings inherit the page request. Different effective values run a separate request.</p><PageRequestValuesEditor source={current.source} value={value.overrides} label={`${component.title || component.id} ${slot.label}`} onChange={overrides => onChange({ ...value, overrides })} /><button type="button" className="text-sm text-ui-accent" onClick={() => onChange({ requestId: value.requestId })}>Reset to shared defaults</button></div></details>}
  </fieldset>;
}
