import { useRef, useState } from "react";
import { Button, Select, WorkspaceDialog, type SelectOption } from "../components/ui";
import type { ComponentBlock } from "./pageTypes";
import { readVisualCellSizing, type VisualCellSizing } from "./cellSizing";
const options: SelectOption<VisualCellSizing>[] = [{ value: "natural", label: "Design size" }, { value: "fill", label: "Fill page cell" }];
export default function CellSizingEditor({ component, disabled, onSave }: { component: ComponentBlock; disabled: boolean; onSave: (sizing: VisualCellSizing) => Promise<void> }) {
 const current = readVisualCellSizing(component);
 const [open, setOpen] = useState(false), [selected, setSelected] = useState(current), [saving, setSaving] = useState(false), [error, setError] = useState("");
 const busy = useRef(false);
 const close = () => { if (!busy.current) setOpen(false); };
 const save = async () => {
  if (disabled || busy.current || selected === current) return;
  busy.current = true; setSaving(true); setError("");
  try { await onSave(selected); setOpen(false); }
  catch (reason) { setError(reason instanceof Error ? reason.message : "The sizing could not be saved. Please retry."); }
  finally { busy.current = false; setSaving(false); }
 };
 return <>
  <Button type="button" variant="outline" onClick={() => { setSelected(current); setError(""); setOpen(true); }}>Cell sizing</Button>
  <WorkspaceDialog open={open} title="Cell sizing" description="Choose how this page copy fits its cell." className="max-w-lg" onClose={close} footer={<div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={saving} onClick={close}>Cancel</Button><Button type="button" disabled={disabled || saving || selected === current} onClick={() => void save()}>{saving ? "Saving…" : "Save sizing"}</Button></div>}>
   <div className="space-y-4">
    <Select<SelectOption<VisualCellSizing>> aria-label="Visual component size" value={options.find(option => option.value === selected) || options[0]} options={options} disabled={disabled || saving} menuPortalTarget={null} onChange={option => { const next = option as SelectOption<VisualCellSizing> | null; if (next) setSelected(next.value); }} />
    <p className="text-sm text-ui-muted">Fill page cell stretches the outer design and its single main Card, Stack, Flex or Grid to the available space. Text, images and nested content keep their authored sizes. Content that exceeds the available height scrolls.</p>
    <p className="text-sm text-ui-muted">Height follows the grid row and shares space with other components in the cell. On stacked mobile layouts, height follows the content. This setting applies only to this page copy.</p>
    {disabled && <p className="text-sm text-ui-muted">Save your design changes before changing cell sizing.</p>}
    {error && <p role="alert" className="text-sm text-ui-danger">{error}</p>}
   </div>
  </WorkspaceDialog>
 </>;
}
