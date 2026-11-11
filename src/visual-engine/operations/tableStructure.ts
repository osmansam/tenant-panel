import type { TableNode } from "../model";
import type { NodePatch } from "./updateNode";

/** Matches the validator's row width limit so on-canvas edits cannot create invalid tables. */
export const TABLE_STRUCTURE_LIMITS = {
  maxColumns: 40,
  maxRows: 500,
} as const;

export type TableStructureEdit =
  | { kind: "addColumn"; index: number }
  | { kind: "removeColumn"; index: number }
  | { kind: "moveColumn"; index: number; offset: -1 | 1 }
  | { kind: "addRow"; index: number }
  | { kind: "removeRow"; index: number }
  | { kind: "moveRow"; index: number; offset: -1 | 1 };

const clampReferenceIndex = (index: number, length: number): number =>
  Number.isFinite(index) ? Math.min(Math.max(Math.trunc(index), 0), length - 1) : 0;

const normalizeRows = (rows: string[][], width: number): string[][] =>
  rows.map((row) => Array.from({ length: width }, (_, index) => row[index] ?? ""));

const moveWithin = <T>(items: T[], index: number, offset: -1 | 1): T[] | null => {
  const target = index + offset;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return null;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

/**
 * Resolves a structural table edit into a node patch.
 * Returns null for invalid indexes or edits that would break the table constraints.
 */
export function tableStructurePatch(node: TableNode, edit: TableStructureEdit): NodePatch<"table"> | null {
  const headers = [...node.headers];
  const rows = normalizeRows(node.rows, headers.length);

  switch (edit.kind) {
    case "addColumn": {
      if (headers.length >= TABLE_STRUCTURE_LIMITS.maxColumns) return null;
      const insertAt = clampReferenceIndex(edit.index, Math.max(headers.length, 1)) + 1;
      headers.splice(insertAt, 0, `Column ${headers.length + 1}`);
      for (const row of rows) row.splice(insertAt, 0, "");
      return { headers, rows };
    }
    case "removeColumn": {
      if (headers.length <= 1 || edit.index < 0 || edit.index >= headers.length) return null;
      headers.splice(edit.index, 1);
      for (const row of rows) row.splice(edit.index, 1);
      return { headers, rows };
    }
    case "moveColumn": {
      const moved = moveWithin(headers, edit.index, edit.offset);
      if (moved === null) return null;
      const nextRows = rows.map((row) => {
        const cell = row[edit.index];
        const target = edit.index + edit.offset;
        const nextRow = [...row];
        nextRow[edit.index] = nextRow[target];
        nextRow[target] = cell;
        return nextRow;
      });
      return { headers: moved, rows: nextRows };
    }
    case "addRow": {
      if (rows.length >= TABLE_STRUCTURE_LIMITS.maxRows) return null;
      const insertAt = clampReferenceIndex(edit.index, Math.max(rows.length, 1)) + 1;
      rows.splice(insertAt, 0, headers.map(() => ""));
      return { rows };
    }
    case "removeRow": {
      if (rows.length <= 1 || edit.index < 0 || edit.index >= rows.length) return null;
      rows.splice(edit.index, 1);
      return { rows };
    }
    case "moveRow": {
      const moved = moveWithin(rows, edit.index, edit.offset);
      return moved === null ? null : { rows: moved };
    }
    default:
      return null;
  }
}
