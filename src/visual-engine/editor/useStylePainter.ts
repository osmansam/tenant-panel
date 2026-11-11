"use client";
import { useEffect, useState } from "react";
import type { ComponentDocument, ComponentNode } from "../model";
import type { EffectRegistry } from "../effects/core";
import { findNode } from "../operations";
import { captureStyleTransfer, inspectStyleTransfer, type StyleTransferPayload, type StyleTransferGroup } from "../operations/styleTransfer";
import { layerLabel } from "./layerLabels";

export function useStylePainter(document: ComponentDocument, registry: EffectRegistry, apply: (id: string, payload: StyleTransferPayload, registry: EffectRegistry) => boolean) {
  const [clipboard, setClipboard] = useState<{ sourceNodeId: string; documentId: string; label: string; payload: StyleTransferPayload } | null>(null);
  const [mode, setMode] = useState<"options" | "once" | "multiple">("options");
  const [targetId, setTargetId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const cancel = () => { setClipboard(null); setMode("options"); setTargetId(null); setMessage(""); };
  useEffect(() => {
    if (!clipboard) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); cancel(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [clipboard]);
  useEffect(() => { if (clipboard && clipboard.documentId !== document.id) cancel(); }, [document.id, clipboard]);
  const capture = (node: ComponentNode) => {
    const label = layerLabel(node);
    setClipboard({ sourceNodeId: node.id, documentId: document.id, label: `${label.type}${label.content ? ` · ${label.content}` : ""}`, payload: captureStyleTransfer(node) });
    setMode("options"); setTargetId(null); setMessage("");
  };
  const toggleGroup = (group: StyleTransferGroup) => setClipboard((current) => current ? { ...current, payload: { ...current.payload, selectedGroups: current.payload.selectedGroups.includes(group) ? current.payload.selectedGroups.filter((entry) => entry !== group) : [...current.payload.selectedGroups, group] } } : null);
  const paint = (id: string): boolean => {
    if (!clipboard || mode === "options") return false;
    setTargetId(id);
    const target = findNode(document.root, id);
    if (!target) { setMessage("Target no longer exists."); return true; }
    const issues = inspectStyleTransfer(target, clipboard.payload, registry);
    if (issues.length) { setMessage(issues.map((issue) => issue.message).join("; ")); return true; }
    if (!clipboard.payload.selectedGroups.length) { setMessage("Select at least one style group."); return true; }
    if (apply(id, clipboard.payload, registry)) {
      if (mode === "once") cancel();
      else setMessage(`Styles applied to ${layerLabel(target).type}. Choose another target or press Escape.`);
    }
    return true;
  };
  const pasteStyle = (id: string): boolean => {
    if (!clipboard) return false;
    const target = findNode(document.root, id);
    if (!target) { setMessage("Target no longer exists."); return false; }
    const issues = inspectStyleTransfer(target, clipboard.payload, registry);
    if (issues.length) { setMessage(issues.map((issue) => issue.message).join("; ")); return false; }
    if (!clipboard.payload.selectedGroups.length) { setMessage("Select at least one style group."); return false; }
    if (!apply(id, clipboard.payload, registry)) return false;
    setTargetId(id);
    setMessage(`Styles applied to ${layerLabel(target).type}.`);
    return true;
  };
  return { clipboard, mode, active: clipboard !== null && mode !== "options", targetId, message, capture, cancel, toggleGroup, paint, pasteStyle, start: (next: "once" | "multiple") => { setMode(next); setTargetId(null); setMessage(""); } };
}
export type StylePainter = ReturnType<typeof useStylePainter>;
