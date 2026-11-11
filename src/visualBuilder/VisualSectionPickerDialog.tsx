import { useState } from "react";
import { Button, WorkspaceDialog } from "../components/ui";
import VisualComponentPicker from "./VisualComponentPicker";
import { copyVisualDesign, type VisualDesignSelection } from "./componentLibrary";
import type { Section } from "../utils/api/page";
import { readStoredProject } from "../utils/persistedContext";
export function appendVisualSection(sections: Section[], selection: VisualDesignSelection): Section[] {
 const component = copyVisualDesign(selection.value, selection.name);
 const order = Math.max(-1, ...sections.map(section => section.order || 0)) + 1;
 return [...sections, { id: crypto.randomUUID(), type: "component", order, component }];
}
export default function VisualSectionPickerDialog({ onAdd, onClose }: { onAdd: (selection: VisualDesignSelection) => void; onClose: () => void }) {
 const [selection, setSelection] = useState<VisualDesignSelection | null>(null);
 const [error, setError] = useState("");
 const add = () => {
  const project = readStoredProject();
  if (!selection || selection.scope.tenant !== project?.tenantSlug || selection.scope.project !== project?.slug) { setError("Choose a design from the current project."); return; }
  onAdd(selection);
 };
 return <WorkspaceDialog open layer="nested" title="Add visual section" onClose={onClose} footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button disabled={!selection} onClick={add}>Add section</Button></div>}>
  <VisualComponentPicker selection={selection} onChange={setSelection} />
  {error && <p role="alert">{error}</p>}
 </WorkspaceDialog>;
}
