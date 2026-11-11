import {
  GRID_COLUMNS,
  GRID_ROWS,
  isPlacementInBounds,
  type GridPlacement,
} from "../model";

export type GridDirection = "left" | "right" | "up" | "down";
export type GridPlacementMap = Record<string, GridPlacement>;
export type GridGeometryResult =
  | { ok: true; placements: GridPlacementMap }
  | { ok: false; code: "grid.boundary" | "grid.area_occupied" | "grid.item_not_found"; message: string };

export function rectanglesOverlap(a: GridPlacement, b: GridPlacement): boolean {
  return a.column < b.column + b.columnSpan
    && a.column + a.columnSpan > b.column
    && a.row < b.row + b.rowSpan
    && a.row + a.rowSpan > b.row;
}

function clonePlacements(placements: GridPlacementMap): GridPlacementMap {
  return Object.fromEntries(Object.entries(placements).map(([id, placement]) => [id, { ...placement }]));
}

export function movePlacement(input: {
  placements: GridPlacementMap;
  selectedId: string;
  direction: GridDirection;
}): GridGeometryResult {
  const selected = input.placements[input.selectedId];
  if (!selected) return failure("grid.item_not_found", "The selected grid item was not found.");
  const offset = {
    left: { column: -1, row: 0 },
    right: { column: 1, row: 0 },
    up: { column: 0, row: -1 },
    down: { column: 0, row: 1 },
  }[input.direction];
  const candidate = { ...selected, column: selected.column + offset.column, row: selected.row + offset.row };
  if (!isPlacementInBounds(candidate)) return failure("grid.boundary", "The item cannot move beyond the grid boundary.");

  const colliders = Object.entries(input.placements)
    .filter(([id, placement]) => id !== input.selectedId && rectanglesOverlap(candidate, placement));
  if (colliders.length === 0) {
    return { ok: true, placements: { ...clonePlacements(input.placements), [input.selectedId]: candidate } };
  }
  if (colliders.length === 1) {
    const [colliderId, collider] = colliders[0];
    if (collider.columnSpan === selected.columnSpan && collider.rowSpan === selected.rowSpan) {
      return {
        ok: true,
        placements: {
          ...clonePlacements(input.placements),
          [input.selectedId]: { ...selected, column: collider.column, row: collider.row },
          [colliderId]: { ...collider, column: selected.column, row: selected.row },
        },
      };
    }
  }
  return failure("grid.area_occupied", "This grid area is occupied.");
}

export function resizePlacement(input: {
  placements: GridPlacementMap;
  selectedId: string;
  columnSpan: number;
  rowSpan: number;
}): GridGeometryResult {
  const selected = input.placements[input.selectedId];
  if (!selected) return failure("grid.item_not_found", "The selected grid item was not found.");
  const candidate = { ...selected, columnSpan: input.columnSpan, rowSpan: input.rowSpan };
  if (!isPlacementInBounds(candidate)) return failure("grid.boundary", "The item cannot extend beyond the grid boundary.");
  if (Object.entries(input.placements).some(([id, placement]) => id !== input.selectedId && rectanglesOverlap(candidate, placement))) {
    return failure("grid.area_occupied", "This grid area is occupied.");
  }
  return { ok: true, placements: { ...clonePlacements(input.placements), [input.selectedId]: candidate } };
}

export function packPlacements(items: readonly {
  id: string;
  columnSpan: number;
  rowSpan: number;
}[]): GridGeometryResult {
  const placements: GridPlacementMap = {};
  for (const item of items) {
    let available: GridPlacement | undefined;
    for (let row = 1; row <= GRID_ROWS && !available; row += 1) {
      for (let column = 1; column <= GRID_COLUMNS; column += 1) {
        const candidate = { column, row, columnSpan: item.columnSpan, rowSpan: item.rowSpan };
        if (!isPlacementInBounds(candidate)) continue;
        if (Object.values(placements).every((placement) => !rectanglesOverlap(candidate, placement))) {
          available = candidate;
          break;
        }
      }
    }
    if (!available) return failure("grid.area_occupied", "The items do not fit inside the positioning grid.");
    placements[item.id] = available;
  }
  return { ok: true, placements: clonePlacements(placements) };
}

function failure(code: Extract<GridGeometryResult, { ok: false }>["code"], message: string): GridGeometryResult {
  return { ok: false, code, message };
}
