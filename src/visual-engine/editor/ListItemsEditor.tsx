"use client";

import type { ListNode } from "../model";
import type { NodePatch } from "../operations";
import { IconPicker } from "./IconPicker";
import { InspectorInput, InspectorSection, InspectorSelect } from "./InspectorSection";

export function ListItemsEditor({ node, onUpdate }: { node: ListNode; onUpdate(patch: NodePatch): void }) {
  const updateItem = (index: number, value: string) => onUpdate({ items: node.items.map((item, itemIndex) => itemIndex === index ? value : item) });
  const move = (index: number, offset: -1 | 1) => {
    const target = index + offset;
    if (target < 0 || target >= node.items.length) return;
    const items = [...node.items];
    [items[index], items[target]] = [items[target], items[index]];
    onUpdate({ items });
  };
  return (
    <InspectorSection title="List items">
      <InspectorSelect label="Marker" ariaLabel="List marker" value={node.marker} options={[{ value: "bullet", label: "Bullet" }, { value: "number", label: "Number" }, { value: "check", label: "Check" }, { value: "icon", label: "Icon" }, { value: "none", label: "None" }]} onChange={(marker) => onUpdate({ marker: marker as ListNode["marker"], ...(marker === "icon" ? { iconId: node.iconId ?? "check" } : { iconId: undefined }) })} />
      {node.marker === "icon" ? <IconPicker label="Marker icon" value={node.iconId} onChange={(iconId) => onUpdate({ iconId })} /> : null}
      {node.items.map((item, index) => <div key={index} className="vb-field vb-field--stacked"><InspectorInput label={`Item ${index + 1}`} ariaLabel={`List item ${index + 1}`} value={item} onChange={(value) => updateItem(index, value)} /><div className="flex gap-1"><button type="button" className="vb-button" aria-label={`Move item ${index + 1} up`} disabled={index === 0} onClick={() => move(index, -1)}>Up</button><button type="button" className="vb-button" aria-label={`Move item ${index + 1} down`} disabled={index === node.items.length - 1} onClick={() => move(index, 1)}>Down</button><button type="button" className="vb-button" aria-label={`Remove item ${index + 1}`} disabled={node.items.length === 1} onClick={() => onUpdate({ items: node.items.filter((_, itemIndex) => itemIndex !== index) })}>Remove</button><button type="button" className="vb-button" aria-label={`Add item after ${index + 1}`} onClick={() => onUpdate({ items: [...node.items.slice(0, index + 1), "New item", ...node.items.slice(index + 1)] })}>Add after</button></div></div>)}
    </InspectorSection>
  );
}
