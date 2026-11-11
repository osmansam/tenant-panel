"use client";
import type { ComponentDocument } from "../model";
import type { EffectRegistry } from "../effects/core";
import { findNode } from "../operations";
import { STYLE_TRANSFER_GROUPS, STYLE_TRANSFER_LABELS, inspectStyleTransfer, supportsStyleGroup } from "../operations/styleTransfer";
import type { StylePainter } from "./useStylePainter";

export function StylePainterPanel({ painter, document, registry }: { painter: StylePainter; document: ComponentDocument; registry: EffectRegistry }) {
  const clipboard = painter.clipboard;
  if (!clipboard) return null;
  const target = painter.targetId ? findNode(document.root, painter.targetId) : undefined;
  const issues = target ? inspectStyleTransfer(target, clipboard.payload, registry) : [];
  return <section className="vb-painter-panel" aria-label="Style Painter options">
    <div><strong>{painter.active ? "Style Painter active" : "Copy styles from"}</strong><p>{clipboard.label}{!findNode(document.root, clipboard.sourceNodeId) ? " — Source deleted (snapshot retained)" : ""}</p></div>
    <div className="vb-painter-panel__groups">
      {STYLE_TRANSFER_GROUPS.map((group) => {
        const supported = supportsStyleGroup(clipboard.payload.sourceType, group);
        if (!supported) return null;
        const present = group === "animation" || group === "effects" ? clipboard.payload[group] : clipboard.payload.style[group] ?? (group === "spacing" ? clipboard.payload.gap : group === "sizing" ? clipboard.payload.image : undefined);
        const diagnostic = issues.find((issue) => issue.group === group);
        return <label key={group}><input type="checkbox" disabled={Boolean(clipboard.payload.excludedGroups?.[group])} checked={clipboard.payload.selectedGroups.includes(group)} onChange={() => painter.toggleGroup(group)} />{STYLE_TRANSFER_LABELS[group]}{group === "animation" || group === "effects" ? " (Advanced)" : ""}<small>{clipboard.payload.excludedGroups?.[group] ?? diagnostic?.message ?? (present ? "" : "Default — clears target overrides")}</small></label>;
      })}
    </div>
    <div className="vb-painter-panel__actions">
      <button type="button" className="vb-button vb-button--primary" disabled={!clipboard.payload.selectedGroups.length} onClick={() => painter.start("once")}>Paint once</button>
      <button type="button" className="vb-button" disabled={!clipboard.payload.selectedGroups.length} onClick={() => painter.start("multiple")}>Paint multiple</button>
      <button type="button" className="vb-button" onClick={painter.cancel}>Cancel painter</button>
      <span>{painter.active ? "Click a target in Canvas or Layers. Escape cancels." : "Selected groups replace target overrides. Content and placement stay unchanged."}</span>
    </div>
    {painter.message ? <p role="status">{painter.message}</p> : null}
  </section>;
}
