import { useState } from "react";
import { Button, WorkspaceDialog } from "../components/ui";
import PageRequestsEditor from "../components/PageDesigner/PageRequestsEditor";
import type { PageModel, ComponentBlock } from "./pageTypes";
import { listPageComponents } from "./pageAdapter";

export default function VisualRequestConnectionEditor({ page, component, disabled, onSave }: { page: PageModel; component: ComponentBlock; disabled: boolean; onSave: (component: ComponentBlock) => Promise<void> }) {
  const [draft, setDraft] = useState<PageModel>(), [saving, setSaving] = useState(false), [error, setError] = useState("");
  return <><Button type="button" variant="outline" disabled={disabled} onClick={() => { setDraft(structuredClone(page)); setError(""); }}>Page request connections</Button>
    <WorkspaceDialog open={!!draft} title="Page request connections" onClose={() => { if (!saving) setDraft(undefined); }} footer={<div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={saving} onClick={() => setDraft(undefined)}>Cancel</Button><Button type="button" disabled={saving || disabled} onClick={() => { if (!draft || saving) return; const block = listPageComponents(draft).find(item => item.id === component.id); if (!block) return; setSaving(true); void onSave(block).then(() => setDraft(undefined), reason => setError(reason instanceof Error ? reason.message : "The connections could not be saved.")).finally(() => setSaving(false)); }}>Save connections</Button></div>}>
      <p className="mb-4 text-sm text-ui-muted">Define requests in Pages → Page Requests, then connect this design's collections here.</p>
      {draft && <PageRequestsEditor page={draft} componentId={component.id} onChange={next => setDraft({ ...next, sections: next.sections || [] } as PageModel)} disabled={saving} />}
      {error && <p role="alert" className="mt-3 text-sm text-ui-danger">{error}</p>}
    </WorkspaceDialog></>;
}
