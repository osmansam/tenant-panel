import { createDefaultRepeaterLayout, type Breakpoint, type RepeaterNode } from "../model";
import type { NodePatch } from "../operations";
import { InspectorNumber, InspectorSection, InspectorSelect } from "./InspectorSection";

const devices: Array<{ key: Breakpoint; label: string }> = [
  { key: "desktop", label: "Desktop" }, { key: "tablet", label: "Tablet" }, { key: "mobile", label: "Mobile" },
];
const columns = Array.from({ length: 6 }, (_, index) => ({ value: String(index + 1), label: `${index + 1} ${index ? "columns" : "column"}` }));

export function RepeaterLayoutInspector({ node, onUpdate }: { node: RepeaterNode; onUpdate: (patch: NodePatch) => void }) {
  const layout = node.itemsLayout;
  const arrangement = !layout ? "original" : Object.values(layout.columns).every(value => value === 1) ? "list" : "grid";
  return <InspectorSection title="Repeated items layout" category="content" defaultOpen>
    <InspectorSelect label="Arrangement" ariaLabel="Items arrangement" value={arrangement} options={[
      { value: "original", label: "Original parent layout" }, { value: "grid", label: "Responsive grid" }, { value: "list", label: "Vertical list" },
    ]} onChange={value => {
      if (value === "original") { onUpdate({ itemsLayout: undefined }); return; }
      const next = layout ?? createDefaultRepeaterLayout();
      onUpdate({ itemsLayout: { ...next, columns: value === "list" ? { mobile: 1, tablet: 1, desktop: 1 } : createDefaultRepeaterLayout().columns } });
    }} />
    {layout ? <>
      {devices.map(({ key, label }) => <div key={key}>
        <InspectorSelect label={`${label} columns`} ariaLabel={`${label} item columns`} value={String(layout.columns[key])} options={columns} onChange={value => onUpdate({ itemsLayout: { ...layout, columns: { ...layout.columns, [key]: Number(value) } } })} />
        <InspectorNumber label={`${label} gap`} ariaLabel={`${label} item gap`} unit="px" value={layout.gap[key]} min={0} max={128} step={1} onChange={value => onUpdate({ itemsLayout: { ...layout, gap: { ...layout.gap, [key]: Math.round(value) } } })} />
      </div>)}
      <InspectorSelect label="Item alignment" value={layout.alignment} options={[
        { value: "stretch", label: "Stretch to column" }, { value: "start", label: "Start" }, { value: "center", label: "Center" }, { value: "end", label: "End" },
      ]} onChange={value => onUpdate({ itemsLayout: { ...layout, alignment: value as typeof layout.alignment } })} />
      <p>These settings arrange generated records. The canvas shows one editable item; use Sample records to preview the collection. Select the Card to change its colors, padding and sizing. A fixed Card width is preserved; use Sizing → Width → Full to fill its column.</p>
    </> : <p>Records currently follow the parent layout. Choose Responsive grid to start with 3 desktop, 2 tablet and 1 mobile columns.</p>}
  </InspectorSection>;
}
