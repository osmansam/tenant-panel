"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import type { ComponentNode, DisclosureNode, SidebarNode } from "../model";

interface Props {
  node: SidebarNode;
  selectedNodeId?: string;
  onSelectPanel?(id: string): void;
  inheritTextColor?: boolean;
  renderLabel(item: DisclosureNode): ReactNode;
  renderPanel(item: DisclosureNode): ReactNode;
}

const contains = (node: ComponentNode, id: string): boolean => node.id === id || "children" in node && node.children.some(child => contains(child, id));

export function SidebarRuntime({ node, selectedNodeId, onSelectPanel, inheritTextColor = false, renderLabel, renderPanel }: Props) {
  const items = node.children.filter((child): child is DisclosureNode => child.type === "disclosure");
  const [activeId, setActiveId] = useState(() => items.find(item => item.defaultOpen)?.id ?? items[0]?.id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replaceAll(":", "");
  const selected = selectedNodeId ? items.find(item => contains(item, selectedNodeId)) : undefined;
  const active = selected ?? items.find(item => item.id === activeId) ?? items.find(item => item.defaultOpen) ?? items[0];
  const select = (index: number, focus = false) => {
    const item = items[index];
    if (!item) return;
    setActiveId(item.id);
    onSelectPanel?.(item.id);
    if (focus) refs.current[index]?.focus();
  };
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowDown" ? (index + 1) % items.length : event.key === "ArrowUp" ? (index - 1 + items.length) % items.length : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); event.stopPropagation(); select(next, true);
  };
  if (!active) return null;
  return <div className="ve-sidebar" style={{ "--ve-sidebar-width": `${node.navigationWidth}px`, color: inheritTextColor ? "inherit" : "var(--theme-text, #1e293b)" } as CSSProperties}>
    <div className="ve-sidebar__layout">
      <div role="tablist" aria-label={node.accessibleLabel} aria-orientation="vertical" className="ve-sidebar__menu">
        {items.map((item, index) => <button key={item.id} ref={element => { refs.current[index] = element; }}
          type="button" role="tab" id={`${instanceId}-${item.id}-tab`} aria-controls={`${instanceId}-${item.id}-panel`}
          aria-selected={item.id === active.id} tabIndex={item.id === active.id ? 0 : -1} className="ve-sidebar__item"
          onClick={event => { event.stopPropagation(); select(index); }} onKeyDown={event => keyDown(event, index)}>
          {renderLabel(item)}
        </button>)}
      </div>
      {items.map(item => <div key={item.id} id={`${instanceId}-${item.id}-panel`} role="tabpanel" tabIndex={item.id === active.id ? 0 : -1}
        hidden={item.id !== active.id} aria-labelledby={`${instanceId}-${item.id}-tab`} className="ve-sidebar__panel">
        {item.id === active.id ? renderPanel(item) : null}
      </div>)}
    </div>
  </div>;
}
