import type { Breakpoint } from "./responsive";

export const MEDIA_LAYOUT_PRESETS = ["uniform-grid", "mosaic", "featured-left", "featured-center", "custom"] as const;
export type MediaLayoutPreset = (typeof MEDIA_LAYOUT_PRESETS)[number];
export type SlotAspectRatio = "square" | "landscape" | "portrait" | "wide";

export interface SlotSpec {
  id: string;
  columnStart: number;
  rowStart: number;
  columnSpan: number;
  rowSpan: number;
  aspectRatio?: SlotAspectRatio;
}

export interface SlotLayout { columns: number; rows: number; slots: SlotSpec[] }
export type SlotOverride = Pick<SlotSpec, "id"> & Partial<Omit<SlotSpec, "id">>;
export interface SlotLayoutOverride { columns?: number; rows?: number; slots?: SlotOverride[] }

export interface MediaLayoutSpec {
  mode: "slots";
  preset?: MediaLayoutPreset;
  aspectRatio: "square" | "landscape" | "wide" | "portrait";
  overflow: "hidden";
  breakpoints: { mobile: SlotLayout; tablet?: SlotLayoutOverride; desktop?: SlotLayoutOverride };
}

export function resolveSlotLayout(spec: MediaLayoutSpec, breakpoint: Breakpoint): SlotLayout {
  let resolved = cloneLayout(spec.breakpoints.mobile);
  if (breakpoint === "tablet" || breakpoint === "desktop") resolved = applyOverride(resolved, spec.breakpoints.tablet);
  if (breakpoint === "desktop") resolved = applyOverride(resolved, spec.breakpoints.desktop);
  return resolved;
}

function applyOverride(base: SlotLayout, override: SlotLayoutOverride | undefined): SlotLayout {
  if (override === undefined) return cloneLayout(base);
  const patches = new Map((override.slots ?? []).map((slot) => [slot.id, slot]));
  const inheritedIds = new Set(base.slots.map((slot) => slot.id));
  return {
    columns: override.columns ?? base.columns,
    rows: override.rows ?? base.rows,
    slots: [
      ...base.slots.map((slot) => ({ ...slot, ...patches.get(slot.id) })),
      ...(override.slots ?? []).filter((slot): slot is SlotSpec =>
        !inheritedIds.has(slot.id) &&
        slot.columnStart !== undefined && slot.rowStart !== undefined && slot.columnSpan !== undefined && slot.rowSpan !== undefined,
      ).map((slot) => ({ ...slot })),
    ],
  };
}

function cloneLayout(layout: SlotLayout): SlotLayout {
  return { columns: layout.columns, rows: layout.rows, slots: layout.slots.map((slot) => ({ ...slot })) };
}

export function validateResolvedSlotLayout(layout: SlotLayout): string[] {
  const issues: string[] = [];
  if (!Number.isInteger(layout.columns) || layout.columns < 1 || !Number.isInteger(layout.rows) || layout.rows < 1) issues.push("slot.grid_invalid");
  if (layout.slots.length === 0) issues.push("slot.empty");
  if (new Set(layout.slots.map((slot) => slot.id)).size !== layout.slots.length) issues.push("slot.id_duplicate");
  const occupied = new Set<string>();
  for (const slot of layout.slots) {
    const values = [slot.columnStart, slot.rowStart, slot.columnSpan, slot.rowSpan];
    if (values.some((value) => !Number.isInteger(value) || value < 1)) issues.push("slot.geometry_invalid");
    if (slot.columnStart + slot.columnSpan - 1 > layout.columns || slot.rowStart + slot.rowSpan - 1 > layout.rows) issues.push("slot.out_of_bounds");
    for (let row = slot.rowStart; row < slot.rowStart + slot.rowSpan; row += 1) {
      for (let column = slot.columnStart; column < slot.columnStart + slot.columnSpan; column += 1) {
        const cell = `${column}:${row}`;
        if (occupied.has(cell) && !issues.includes("slot.overlap")) issues.push("slot.overlap");
        occupied.add(cell);
      }
    }
  }
  return [...new Set(issues)];
}
