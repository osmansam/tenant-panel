"use client";

import { useState, type ReactNode } from "react";
import type { AccordionNode, DisclosureNode } from "../model";

export type DisclosurePreviewState = Record<string, "default" | "open" | "closed">;

interface DisclosureRuntimeProps {
  node: DisclosureNode;
  trigger: ReactNode;
  content: ReactNode;
  forcedState?: "default" | "open" | "closed";
  interactive?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DisclosureRuntime({ node, trigger, content, forcedState = "default", interactive = true, open: controlledOpen, onOpenChange }: DisclosureRuntimeProps) {
  const [localOpen, setLocalOpen] = useState(node.defaultOpen);
  const open = forcedState === "open" ? true : forcedState === "closed" ? false : controlledOpen ?? localOpen;
  const panelId = `${node.id}-panel`;
  const triggerId = `${node.id}-trigger-control`;
  const toggle = () => {
    if (!interactive) return;
    const next = !open;
    if (onOpenChange) onOpenChange(next);
    else setLocalOpen(next);
  };

  return (
    <div className="ve-disclosure" data-disclosure-id={node.id} data-open={open ? "true" : "false"}>
      <button id={triggerId} type="button" className="ve-disclosure__trigger" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        <span className="ve-disclosure__trigger-content">{trigger}</span>
        <span className="ve-disclosure__indicator" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div
        id={panelId}
        className={`ve-disclosure__panel${node.transition === "height-fade" ? " ve-disclosure__panel--animated" : ""}`}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        hidden={!open && node.transition === "none"}
        inert={!open || undefined}
      >
        <div className="ve-disclosure__panel-inner">{content}</div>
      </div>
    </div>
  );
}

interface AccordionRuntimeProps {
  node: AccordionNode;
  preview?: DisclosurePreviewState;
  interactive?: boolean;
  renderItem: (node: DisclosureNode, open: boolean, onOpenChange: (open: boolean) => void, forcedState: "default" | "open" | "closed") => ReactNode;
}

export function AccordionRuntime({ node, preview = {}, interactive = true, renderItem }: AccordionRuntimeProps) {
  const disclosures = node.children.filter((child): child is DisclosureNode => child.type === "disclosure");
  const [openIds, setOpenIds] = useState(() => {
    const defaults = disclosures.filter((item) => item.defaultOpen);
    return new Set((node.openMode === "single" ? defaults.slice(0, 1) : defaults).map((item) => item.id));
  });

  const change = (id: string, open: boolean) => {
    if (!interactive) return;
    setOpenIds((current) => {
      if (!open && !node.collapsible && current.size === 1 && current.has(id)) return current;
      const next = node.openMode === "single" && open ? new Set<string>() : new Set(current);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className="ve-accordion" data-accordion-mode={node.openMode}>
      {disclosures.map((item) => {
        const forced = preview[item.id] ?? "default";
        const open = forced === "open" ? true : forced === "closed" ? false : openIds.has(item.id);
        return <div key={item.id} className="ve-accordion__item">{renderItem(item, open, (next) => change(item.id, next), forced)}</div>;
      })}
    </div>
  );
}
