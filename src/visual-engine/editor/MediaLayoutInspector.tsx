"use client";

import { useState } from "react";
import { DEFAULT_ANIMATION, type AnimationSpec } from "../model/animation";
import type { GridNode } from "../model/nodes";
import type { Breakpoint } from "../model/responsive";
import type { ShuffleAnimationSpec } from "../model/shuffle";
import { resolveSlotLayout, type SlotLayout, type SlotSpec } from "../model/mediaLayout";
import type { NodePatch } from "../operations";
import { createMediaLayoutPreset, markMediaLayoutCustom } from "./mediaLayoutPresets";
import { InspectorCheckbox, InspectorNumber, InspectorSection, InspectorSelect } from "./InspectorSection";

const PRESETS = ["uniform-grid", "mosaic", "featured-left", "featured-center"] as const;

export function MediaLayoutInspector({ node, onUpdate }: { node: GridNode; onUpdate(patch: NodePatch): void }) {
  const layout = node.mediaLayout ?? createMediaLayoutPreset("uniform-grid", node.children.length);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile");
  const resolved = resolveSlotLayout(layout, breakpoint);
  const animation: AnimationSpec = node.animation ?? DEFAULT_ANIMATION;
  const shuffle: ShuffleAnimationSpec = animation.shuffle ?? { enabled: false, intervalMs: 2500, durationMs: 600, easing: "ease-in-out" };

  const updateSlot = (slotId: string, patch: Partial<SlotSpec>) => {
    updateBreakpoint({ ...resolved, slots: resolved.slots.map((slot) => slot.id === slotId ? { ...slot, ...patch } : slot) });
  };
  const updateBreakpoint = (next: SlotLayout) => onUpdate({ mediaLayout: markMediaLayoutCustom({ ...layout, breakpoints: { ...layout.breakpoints, [breakpoint]: next } }) });
  const patchShuffle = (patch: Partial<ShuffleAnimationSpec>) => onUpdate({ animation: { ...animation, shuffle: { ...shuffle, ...patch } } });

  return (
    <InspectorSection title="Media layout" defaultOpen>
      <InspectorSelect
        label="Preset"
        ariaLabel="Media layout preset"
        value={layout.preset ?? "custom"}
        options={[...PRESETS, "custom"].map((value) => ({ value, label: value.replaceAll("-", " ") }))}
        onChange={(value) => value !== "custom" && onUpdate({ mediaLayout: createMediaLayoutPreset(value as (typeof PRESETS)[number], node.children.length) })}
      />
      <InspectorSelect label="Area ratio" value={layout.aspectRatio ?? "landscape"} options={["square", "landscape", "wide", "portrait"]} onChange={(aspectRatio) => onUpdate({ mediaLayout: { ...layout, aspectRatio: aspectRatio as typeof layout.aspectRatio } })} />
      <InspectorSelect label="Edit breakpoint" ariaLabel="Media layout breakpoint" value={breakpoint} options={["mobile", "tablet", "desktop"]} onChange={(value) => setBreakpoint(value as Breakpoint)} />
      <InspectorNumber label={`${capitalize(breakpoint)} columns`} value={resolved.columns} min={1} max={12} step={1} onChange={(columns) => updateBreakpoint({ ...resolved, columns })} />
      <InspectorNumber label={`${capitalize(breakpoint)} rows`} value={resolved.rows} min={1} max={12} step={1} onChange={(rows) => updateBreakpoint({ ...resolved, rows })} />
      <InspectorNumber label="Visible slots" value={resolved.slots.length} min={1} max={Math.max(1, node.children.length)} step={1} onChange={(count) => updateBreakpoint(resizeSlots(resolved, count))} />
      {resolved.slots.map((slot, index) => (
        <div key={slot.id}>
          <InspectorNumber label={`Slot ${index + 1} column start`} value={slot.columnStart} min={1} max={resolved.columns} step={1} onChange={(columnStart) => updateSlot(slot.id, { columnStart })} />
          <InspectorNumber label={`Slot ${index + 1} row start`} value={slot.rowStart} min={1} max={resolved.rows} step={1} onChange={(rowStart) => updateSlot(slot.id, { rowStart })} />
          <InspectorNumber label={`Slot ${index + 1} column span`} value={slot.columnSpan} min={1} max={resolved.columns} step={1} onChange={(columnSpan) => updateSlot(slot.id, { columnSpan })} />
          <InspectorNumber label={`Slot ${index + 1} row span`} value={slot.rowSpan} min={1} max={resolved.rows} step={1} onChange={(rowSpan) => updateSlot(slot.id, { rowSpan })} />
        </div>
      ))}
      <InspectorCheckbox label="Shuffle images" checked={shuffle.enabled} onChange={(enabled) => patchShuffle({ enabled })} />
      <InspectorNumber label="Shuffle interval" value={shuffle.intervalMs} min={2000} max={30000} step={100} unit="ms" onChange={(intervalMs) => patchShuffle({ intervalMs })} />
      <InspectorNumber label="Shuffle duration" value={shuffle.durationMs} min={100} max={2000} step={50} unit="ms" onChange={(durationMs) => patchShuffle({ durationMs })} />
    </InspectorSection>
  );
}

function resizeSlots(layout: SlotLayout, count: number): SlotLayout {
  if (count <= layout.slots.length) return { ...layout, slots: layout.slots.slice(0, count) };
  const slots = [...layout.slots];
  let rows = layout.rows;
  while (slots.length < count) {
    rows += 1;
    slots.push({ id: `slot-${slots.length + 1}`, columnStart: 1, rowStart: rows, columnSpan: layout.columns, rowSpan: 1 });
  }
  return { ...layout, rows, slots };
}

function capitalize(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }
