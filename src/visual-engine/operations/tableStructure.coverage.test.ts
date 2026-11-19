import { expect, it } from "vitest";
import type { ComponentDocument, TableNode } from "../model";
import { addNode, collectNodeIds, duplicateNode, findNode, moveNode, removeNode, reorderNode } from "./index";
import type { OperationResult } from "./result";
import { addEffect, duplicateEffect, moveEffect, removeEffect, setEffectEnabled, updateEffectProps } from "./effects";
import type { EffectRegistry, RegisteredEffect } from "../effects/core";
import { tableStructurePatch, TABLE_STRUCTURE_LIMITS } from "./tableStructure";

const table: TableNode = { id: "table", type: "table", headers: ["Name", "Price"], rows: [["A", "10"], ["B", "20"]] };
it("keeps table columns and cells aligned during insert, move and delete without mutating input", () => {
  const before = structuredClone(table);
  expect(tableStructurePatch(table, { kind: "addColumn", index: 0 })).toEqual({ headers: ["Name", "Column 3", "Price"], rows: [["A", "", "10"], ["B", "", "20"]] });
  expect(tableStructurePatch(table, { kind: "moveColumn", index: 0, offset: 1 })).toEqual({ headers: ["Price", "Name"], rows: [["10", "A"], ["20", "B"]] });
  expect(tableStructurePatch(table, { kind: "removeColumn", index: 0 })).toEqual({ headers: ["Price"], rows: [["10"], ["20"]] });
  expect(table).toEqual(before);
});
it("keeps row values aligned during insert, move and delete", () => {
  expect(tableStructurePatch(table, { kind: "addRow", index: 0 })).toEqual({ rows: [["A", "10"], ["", ""], ["B", "20"]] });
  expect(tableStructurePatch(table, { kind: "moveRow", index: 1, offset: -1 })).toEqual({ rows: [["B", "20"], ["A", "10"]] });
  expect(tableStructurePatch(table, { kind: "removeRow", index: 1 })).toEqual({ rows: [["A", "10"]] });
});
it("normalizes ragged rows before structural edits and clamps reference indexes", () => {
  const ragged = { ...table, rows: [["A"], ["B", "20", "extra"]] };
  expect(tableStructurePatch(ragged, { kind: "addColumn", index: Infinity })).toEqual({ headers: ["Name", "Column 3", "Price"], rows: [["A", "", ""], ["B", "", "20"]] });
  expect(tableStructurePatch(ragged, { kind: "addRow", index: 99 })).toEqual({ rows: [["A", ""], ["B", "20"], ["", ""]] });
});
it("rejects edits that violate row or column bounds", () => {
  for (const kind of ["removeRow", "removeColumn", "moveRow", "moveColumn"] as const) {
    expect(tableStructurePatch(table, { kind, index: -1, offset: -1 })).toBeNull();
    expect(tableStructurePatch(table, { kind, index: 2, offset: 1 })).toBeNull();
  }
  expect(tableStructurePatch(table, { kind: "moveRow", index: 0, offset: -1 })).toBeNull();
  expect(tableStructurePatch(table, { kind: "moveColumn", index: 1, offset: 1 })).toBeNull();
  expect(tableStructurePatch({ ...table, headers: ["Only"] }, { kind: "removeColumn", index: 0 })).toBeNull();
  expect(tableStructurePatch({ ...table, rows: [["A", "10"]] }, { kind: "removeRow", index: 0 })).toBeNull();
  expect(tableStructurePatch({ ...table, headers: Array(TABLE_STRUCTURE_LIMITS.maxColumns).fill("Column") }, { kind: "addColumn", index: 0 })).toBeNull();
  expect(tableStructurePatch({ ...table, rows: Array(TABLE_STRUCTURE_LIMITS.maxRows).fill(["A", "10"]) }, { kind: "addRow", index: 0 })).toBeNull();
});

const tree: ComponentDocument = { version: 2, id: "doc", name: "Tables", root: { id: "root", type: "section", children: [
  { id: "card", type: "card", element: "article", children: [table] },
  { id: "destination", type: "card", element: "article", children: [] },
] } };
function changed(result: OperationResult): ComponentDocument {
  if (!result.success) throw new Error(result.message);
  return result.document;
}

it("duplicates complete subtrees with new IDs, moves their children, and removes only the selected copy", () => {
  const before = structuredClone(tree);
  let sequence = 0;
  const copied = changed(duplicateNode(tree, "card", () => `copy-${++sequence}`));
  expect(copied.root.children.map(child => child.id)).toEqual(["card", "copy-1", "destination"]);
  expect(findNode(copied.root, "copy-2")).toMatchObject({ type: "table", headers: table.headers, rows: table.rows });
  expect(collectNodeIds(copied.root).size).toBe(6);
  const moved = changed(moveNode(copied, "copy-2", "destination", 0));
  expect(findNode(moved.root, "destination")).toMatchObject({ children: [{ id: "copy-2" }] });
  expect(findNode(moved.root, "copy-1")).toMatchObject({ children: [] });
  const reordered = changed(reorderNode(moved, "destination", "up"));
  expect(reordered.root.children.map(child => child.id)).toEqual(["card", "destination", "copy-1"]);
  const removed = changed(removeNode(reordered, "copy-1"));
  expect(findNode(removed.root, "copy-1")).toBeUndefined();
  expect(findNode(removed.root, "table")).toEqual(table);
  expect(tree).toEqual(before);
});

it("rejects duplicate identities, invalid destinations, cycles, and root mutations atomically", () => {
  expect(addNode(tree, "root", table)).toMatchObject({ success: false, code: "operation.id_duplicate" });
  expect(duplicateNode(tree, "card", () => "same")).toMatchObject({ success: false, code: "operation.id_duplicate" });
  expect(addNode(tree, "missing", { id: "new", type: "text", text: "New" })).toMatchObject({ success: false, code: "operation.parent_not_found" });
  expect(addNode(tree, "table", { id: "new", type: "text", text: "New" })).toMatchObject({ success: false, code: "operation.parent_rejects_child" });
  expect(moveNode(tree, "card", "card", 0)).toMatchObject({ success: false, code: "operation.cycle" });
  expect(moveNode(tree, "table", "destination", -1)).toMatchObject({ success: false, code: "operation.index_invalid" });
  for (const result of [removeNode(tree, "root"), duplicateNode(tree, "root"), reorderNode(tree, "root", "up"), moveNode(tree, "root", "destination", 0)]) expect(result).toMatchObject({ success: false, code: "operation.root_protected" });
  expect(reorderNode(tree, "card", "up")).toMatchObject({ success: false, code: "operation.index_invalid" });
});

it("preserves table layout semantics when moving into and out of a grid", () => {
  const withGrid = changed(addNode(tree, "root", { id: "grid", type: "grid", columns: 12, children: [] }));
  const inside = changed(moveNode(withGrid, "table", "grid", 0));
  expect(findNode(inside.root, "table")).toMatchObject({ layout: { span: { mobile: 12, tablet: 12, desktop: 12 } } });
  const outside = changed(moveNode(inside, "table", "destination", 0));
  expect(findNode(outside.root, "table")).not.toHaveProperty("layout");
  expect(findNode(outside.root, "table")).toMatchObject({ headers: table.headers, rows: table.rows });
});

const glow: RegisteredEffect = {
  id: "test.glow", provider: "test", name: "Glow", category: "background", layer: "background", stacking: "multiple",
  compatibleNodes: ["section"], schemaVersion: 1,
  inputs: [{ key: "amount", label: "Amount", kind: "number", required: true, defaultValue: 1, min: 0, max: 10, step: 1 }],
  component: () => null,
  runtime: { kind: "css", clientRequired: false, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
const effectsRegistry: EffectRegistry = { get: id => id === glow.id ? glow : undefined, list: () => [glow] };

it("validates and persists effect edits, copies, toggles, ordering and removal immutably", () => {
  const before = structuredClone(tree);
  const added = changed(addEffect(tree, "root", glow, () => "effect-1", effectsRegistry));
  expect(added.root.effects).toMatchObject([{ attachmentId: "effect-1", props: { amount: 1 }, enabled: true }]);
  const configured = changed(updateEffectProps(added, "root", "effect-1", { amount: 4 }, effectsRegistry));
  const copied = changed(duplicateEffect(configured, "root", "effect-1", effectsRegistry, () => "effect-2"));
  expect(copied.root.effects?.map(effect => effect.attachmentId)).toEqual(["effect-1", "effect-2"]);
  expect(copied.root.effects?.[1].props).toEqual({ amount: 4 });
  const disabled = changed(setEffectEnabled(copied, "root", "effect-2", false, effectsRegistry));
  expect(disabled.root.effects?.[1].enabled).toBe(false);
  const enabled = changed(setEffectEnabled(disabled, "root", "effect-2", true, effectsRegistry));
  const reordered = changed(moveEffect(enabled, "root", "effect-2", 0));
  expect(reordered.root.effects?.map(effect => effect.attachmentId)).toEqual(["effect-2", "effect-1"]);
  const removed = changed(removeEffect(reordered, "root", "effect-1"));
  expect(removed.root.effects?.map(effect => effect.attachmentId)).toEqual(["effect-2"]);
  expect(added.root.effects?.[0].props).toEqual({ amount: 1 });
  expect(tree).toEqual(before);
});

it("rejects invalid effect properties, locations, ordering and compatibility", () => {
  const added = changed(addEffect(tree, "root", glow, () => "effect-1", effectsRegistry));
  expect(updateEffectProps(added, "root", "effect-1", { amount: 11 }, effectsRegistry)).toMatchObject({ success: false, code: "effect.props_invalid" });
  expect(removeEffect(added, "root", "missing")).toMatchObject({ success: false, code: "effect.attachment_not_found" });
  expect(removeEffect(added, "missing", "effect-1")).toMatchObject({ success: false, code: "operation.node_not_found" });
  expect(moveEffect(added, "root", "effect-1", 1)).toMatchObject({ success: false, code: "effect.index_invalid" });
  expect(addEffect(tree, "card", glow, () => "effect-1", effectsRegistry)).toMatchObject({ success: false, code: "effect.incompatible" });
  const absent: EffectRegistry = { get: () => undefined, list: () => [] };
  expect(updateEffectProps(added, "root", "effect-1", {}, absent)).toMatchObject({ success: false, code: "effect.unavailable" });
});
