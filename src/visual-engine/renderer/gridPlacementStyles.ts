import type { CSSProperties } from "react";
import type { Breakpoint, BreakpointValue, FlowGridPosition, GridNode, GridPlacement, GridPlacementByBreakpoint } from "../model";

type PlacementProperties = CSSProperties & Record<`--ve-grid-${"column" | "row"}-${Breakpoint}`, string>;
type FlowPlacementProperties = CSSProperties & Record<`--ve-flow-grid-${"column" | "row"}-${Breakpoint}`, string>;
const breakpointList = ["mobile", "tablet", "desktop"] as const;

export function isPositioningGrid(node: GridNode): boolean {
  return node.children.length > 0 && node.children.every((child) => child.layout?.placement !== undefined);
}

/** Picks the span most of a flow Grid's children already use, so dropped items match the rows around them. */
export function inferFlowGridSpan(node: GridNode, breakpoint: Breakpoint): number {
  const counts = new Map<number, number>();
  let fallback = 12;
  for (const child of node.children) {
    const span = child.layout?.span?.[breakpoint];
    if (span === undefined) continue;
    const clamped = Math.max(1, Math.min(12, span));
    fallback = clamped;
    counts.set(clamped, (counts.get(clamped) ?? 0) + 1);
  }
  let best = fallback;
  let bestCount = 0;
  for (const [span, count] of counts) {
    if (count > bestCount) {
      best = span;
      bestCount = count;
    }
  }
  return best;
}

export function gridChildPlacementStyle(placement: GridPlacementByBreakpoint, breakpoint?: Breakpoint): CSSProperties {
  if (breakpoint) return directPlacementStyle(placement[breakpoint]);
  return {
    "--ve-grid-column-mobile": columnValue(placement.mobile),
    "--ve-grid-row-mobile": rowValue(placement.mobile),
    "--ve-grid-column-tablet": columnValue(placement.tablet),
    "--ve-grid-row-tablet": rowValue(placement.tablet),
    "--ve-grid-column-desktop": columnValue(placement.desktop),
    "--ve-grid-row-desktop": rowValue(placement.desktop),
  } as PlacementProperties;
}

function directPlacementStyle(placement: GridPlacement): CSSProperties {
  return { gridColumn: columnValue(placement), gridRow: rowValue(placement) };
}

function columnValue(placement: GridPlacement): string {
  return `${placement.column} / span ${placement.columnSpan}`;
}

function rowValue(placement: GridPlacement): string {
  return `${placement.row} / span ${placement.rowSpan}`;
}

/** Inline slot placement for a child of a flow Grid (rows size to content). */
export function flowGridStartStyle(
  start: BreakpointValue<FlowGridPosition | null>,
  span: BreakpointValue<number> | undefined,
  breakpoint?: Breakpoint,
): CSSProperties {
  const resolve = (value: Breakpoint) => {
    const position = start[value];
    if (position === null) return { column: "auto", row: "auto" };
    const spanValue = Math.min(12, Math.max(1, span?.[value] ?? 1));
    const column = Math.max(1, Math.min(position.column, 13 - spanValue));
    return { column: `${column} / span ${spanValue}`, row: String(position.row) };
  };
  if (breakpoint !== undefined) {
    const resolved = resolve(breakpoint);
    return { gridColumn: resolved.column, gridRow: resolved.row };
  }
  return Object.fromEntries(breakpointList.map((value) => {
    const resolved = resolve(value);
    return [
      [`--ve-flow-grid-column-${value}`, resolved.column],
      [`--ve-flow-grid-row-${value}`, resolved.row],
    ];
  }).flat()) as FlowPlacementProperties;
}
