"use client";
import { useEffect, useState } from "react";
import type { DisclosureNode, SidebarNode } from "../model";
import { sidebarPanelLabel } from "../model/sidebar";
import type { SidebarItemAction } from "../operations/sidebar";

export function SidebarInspector({ node, onAction, onSelectNode }: { node: SidebarNode; onAction(action: SidebarItemAction): void; onSelectNode?(id: string): void }) {
  const items = node.children.filter((item): item is DisclosureNode => item.type === "disclosure");
  const defaultId = items.find(item => item.defaultOpen)?.id ?? items[0]?.id;
  return <section aria-label="Sidebar items" className="space-y-3">
    <h3 className="font-semibold">Sidebar items</h3>
    <p className="text-xs">Edit a panel to design its content on the canvas.</p>
    {items.map((item, index) => <SidebarItem key={item.id} sidebarId={node.id} item={item} index={index} count={items.length} isDefault={item.id === defaultId} onAction={onAction} onSelectNode={onSelectNode} />)}
    <button type="button" className="vb-button" onClick={() => onAction({ type: "add" })}>Add sidebar item</button>
  </section>;
}

function SidebarItem({ sidebarId, item, index, count, isDefault, onAction, onSelectNode }: { sidebarId: string; item: DisclosureNode; index: number; count: number; isDefault: boolean; onAction(action: SidebarItemAction): void; onSelectNode?(id: string): void }) {
  const label = sidebarPanelLabel(item);
  const [draft, setDraft] = useState(label);
  useEffect(() => setDraft(label), [label]);
  const number = index + 1;
  const content = item.children.find(child => child.type === "slot" && child.name === "content");
  return <fieldset className="space-y-2 rounded border p-2">
    <legend>Item {number}</legend>
    <label className="block text-xs">Label<input className="vb-input" aria-label={`Sidebar item ${number} label`} value={draft} onChange={event => setDraft(event.target.value)} onBlur={() => { if (draft !== label) onAction({ type: "rename", itemId: item.id, label: draft }); }} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } }} /></label>
    <label className="flex gap-2 text-xs"><input type="radio" name={`${sidebarId}-default`} aria-label={`Default sidebar item ${number}`} checked={isDefault} onChange={() => onAction({ type: "default", itemId: item.id })} />Default panel</label>
    <div className="flex flex-wrap gap-1">
      {onSelectNode && content ? <button type="button" className="vb-button" onClick={() => onSelectNode(content.id)}>Edit panel</button> : null}
      <button type="button" className="vb-button" aria-label={`Move sidebar item ${number} up`} disabled={index === 0} onClick={() => onAction({ type: "move", itemId: item.id, direction: "up" })}>Up</button>
      <button type="button" className="vb-button" aria-label={`Move sidebar item ${number} down`} disabled={index === count - 1} onClick={() => onAction({ type: "move", itemId: item.id, direction: "down" })}>Down</button>
      <button type="button" className="vb-button" aria-label={`Duplicate sidebar item ${number}`} onClick={() => onAction({ type: "duplicate", itemId: item.id })}>Duplicate</button>
      <button type="button" className="vb-button" aria-label={`Remove sidebar item ${number}`} disabled={count === 1} onClick={() => onAction({ type: "remove", itemId: item.id })}>Remove</button>
    </div>
  </fieldset>;
}
