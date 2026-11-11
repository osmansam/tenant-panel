"use client";
import { useEffect, useRef, type ReactNode } from "react";
import type { ComponentDocument } from "../model";
import type { EffectRegistry } from "../effects/core";
import { findNode } from "../operations";
import { inspectStyleTransfer } from "../operations/styleTransfer";
import type { StylePainter } from "./useStylePainter";

export function StylePainterTargets({ painter, document, registry, children }: { painter: StylePainter; document: ComponentDocument; registry: EffectRegistry; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const titles = new Map<HTMLElement, string | null>();
    const annotated = new Set<HTMLElement>();
    const annotate = () => {
      const elements = ref.current?.querySelectorAll<HTMLElement>("[data-node-id], [data-layer-id]") ?? [];
      elements.forEach((element) => {
        annotated.add(element);
        const id = element.dataset.nodeId ?? element.dataset.layerId;
        const node = id ? findNode(document.root, id) : undefined;
        if (painter.clipboard && id === painter.clipboard.sourceNodeId) element.dataset.paintSource = "true";
        else delete element.dataset.paintSource;
        if (node && painter.active && painter.clipboard) {
          const issues = inspectStyleTransfer(node, painter.clipboard.payload, registry);
          element.dataset.paintTarget = issues.length ? "invalid" : "valid";
          if (!titles.has(element)) titles.set(element, element.getAttribute("title"));
          element.title = issues.length ? issues.map((issue) => issue.message).join("; ") : "Click to apply selected styles";
        } else delete element.dataset.paintTarget;
      });
    };
    annotate();
    const observer = new MutationObserver(annotate);
    if (ref.current && painter.clipboard) observer.observe(ref.current, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      annotated.forEach((element) => {
        delete element.dataset.paintTarget; delete element.dataset.paintSource; delete element.dataset.paintHover;
        const title = titles.get(element);
        if (title === null) element.removeAttribute("title"); else if (title !== undefined) element.title = title;
      });
    };
  }, [painter.clipboard, painter.active, document, registry]);
  return <div ref={ref} className="vb-painter-targets" onPointerOver={(event) => {
    if (!painter.active) return;
    ref.current?.querySelectorAll<HTMLElement>("[data-paint-hover]").forEach((element) => delete element.dataset.paintHover);
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-paint-target]") : null;
    if (target) target.dataset.paintHover = "true";
  }} onPointerLeave={() => ref.current?.querySelectorAll<HTMLElement>("[data-paint-hover]").forEach((element) => delete element.dataset.paintHover)}>{children}</div>;
}
