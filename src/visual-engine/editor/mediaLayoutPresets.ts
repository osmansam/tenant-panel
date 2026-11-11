import type { MediaLayoutPreset, MediaLayoutSpec, SlotLayout, SlotSpec } from "../model/mediaLayout";

type AuthoredPreset = Exclude<MediaLayoutPreset, "custom">;

export function createMediaLayoutPreset(preset: AuthoredPreset, imageCount: number): MediaLayoutSpec {
  const visible = Math.max(1, imageCount);
  const mobile = uniformLayout(Math.min(visible, 4), 2);
  const desktop = presetLayout(preset, visible);
  return {
    mode: "slots",
    preset,
    aspectRatio: preset === "uniform-grid" ? "square" : "landscape",
    overflow: "hidden",
    breakpoints: { mobile, tablet: layoutAsOverride(desktop), desktop: layoutAsOverride(desktop) },
  };
}

export function markMediaLayoutCustom(spec: MediaLayoutSpec): MediaLayoutSpec {
  return { ...spec, preset: "custom" };
}

function presetLayout(preset: AuthoredPreset, count: number): SlotLayout {
  if (preset === "uniform-grid") return uniformLayout(Math.min(count, 16), 4);
  if (preset === "featured-left") return {
    columns: 4, rows: 2, slots: [slot("slot-1", 1, 1, 2, 2), slot("slot-2", 3, 1), slot("slot-3", 4, 1), slot("slot-4", 3, 2, 2, 1)].slice(0, count),
  };
  if (preset === "featured-center") return {
    columns: 4, rows: 2, slots: [slot("slot-1", 2, 1, 2, 2), slot("slot-2", 1, 1), slot("slot-3", 4, 1), slot("slot-4", 1, 2), slot("slot-5", 4, 2)].slice(0, count),
  };
  return {
    columns: 4, rows: 3, slots: [slot("slot-1", 1, 1, 2, 2), slot("slot-2", 3, 1), slot("slot-3", 4, 1, 1, 2), slot("slot-4", 3, 2), slot("slot-5", 1, 3), slot("slot-6", 2, 3, 3, 1)].slice(0, count),
  };
}

function uniformLayout(count: number, columns: number): SlotLayout {
  const rows = Math.max(1, Math.ceil(count / columns));
  return {
    columns,
    rows,
    slots: Array.from({ length: count }, (_, index) => slot(`slot-${index + 1}`, index % columns + 1, Math.floor(index / columns) + 1)),
  };
}

function slot(id: string, columnStart: number, rowStart: number, columnSpan = 1, rowSpan = 1): SlotSpec {
  return { id, columnStart, rowStart, columnSpan, rowSpan, aspectRatio: "square" };
}

function layoutAsOverride(layout: SlotLayout) {
  return { columns: layout.columns, rows: layout.rows, slots: layout.slots.map((slot) => ({ ...slot })) };
}
