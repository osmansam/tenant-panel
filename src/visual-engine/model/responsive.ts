import type { CustomDimensionSpec, StyleSpec } from "./styles";

export type Breakpoint = "mobile" | "tablet" | "desktop";
export type BreakpointValue<T> = Record<Breakpoint, T>;

export interface ResponsiveSpacingSpec {
  spacing?: StyleSpec["spacing"];
  custom?: Pick<CustomDimensionSpec, "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "margin" | "gap">;
}

export interface ResponsiveSpec {
  visibility?: BreakpointValue<boolean>;
  spacing?: Partial<Record<Breakpoint, ResponsiveSpacingSpec>>;
}

export const GRID_COLUMNS = 12;
export const GRID_ROWS = 12;

export interface GridPlacement {
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
}

export type GridPlacementByBreakpoint = BreakpointValue<GridPlacement>;

/** Explicit slot for a child of a flow Grid (rows grow with content). Null means automatic flow. */
export interface FlowGridPosition {
  column: number;
  row: number;
}

export interface ChildLayoutSpec {
  span?: BreakpointValue<number>;
  placement?: GridPlacementByBreakpoint;
  start?: BreakpointValue<FlowGridPosition | null>;
}

export function isPlacementInBounds(value: GridPlacement): boolean {
  return Number.isInteger(value.column)
    && Number.isInteger(value.row)
    && Number.isInteger(value.columnSpan)
    && Number.isInteger(value.rowSpan)
    && value.column >= 1
    && value.row >= 1
    && value.columnSpan >= 1
    && value.rowSpan >= 1
    && value.column + value.columnSpan - 1 <= GRID_COLUMNS
    && value.row + value.rowSpan - 1 <= GRID_ROWS;
}
