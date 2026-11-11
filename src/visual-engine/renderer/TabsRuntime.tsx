"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { DisclosureNode, TabsNode } from "../model";

interface TabsRuntimeProps {
  node: TabsNode;
  renderLabel: (item: DisclosureNode) => ReactNode;
  renderPanel: (item: DisclosureNode) => ReactNode;
}

export function TabsRuntime({ node, renderLabel, renderPanel }: TabsRuntimeProps) {
  const items = node.children.filter((child): child is DisclosureNode => child.type === "disclosure");
  const initial = items.find((item) => item.defaultOpen)?.id ?? items[0]?.id ?? "";
  const [activeId, setActiveId] = useState(initial);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replaceAll(":", "");
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const active = items[activeIndex];

  const select = (index: number, focus = false) => {
    const item = items[index];
    if (!item) return;
    setActiveId(item.id);
    if (focus) refs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  };

  if (!active) return null;

  return (
    <div className="ve-tabs">
      <div className="ve-tabs__list" role="tablist" aria-label="Code comparison">
        {items.map((item, index) => {
          const selected = item.id === active.id;
          const tabId = `${instanceId}-${item.id}-tab`;
          const panelId = `${instanceId}-${item.id}-panel`;
          return (
            <button
              key={item.id}
              ref={(element) => { refs.current[index] = element; }}
              id={tabId}
              type="button"
              role="tab"
              className="ve-tabs__tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {renderLabel(item)}
            </button>
          );
        })}
      </div>
      <div
        id={`${instanceId}-${active.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${instanceId}-${active.id}-tab`}
        className="ve-tabs__panel"
        key={active.id}
      >
        {renderPanel(active)}
      </div>
    </div>
  );
}
