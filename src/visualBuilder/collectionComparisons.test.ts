import { expect, it } from "vitest";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
import type { CollectionFilter } from "../visual-engine/model";
it("roundtrips all supported collection comparisons without changing their values", () => {
 for (const operator of ["gt", "gte", "lt", "lte"] as const) {
  const filter = { field: "price", operator, value: -0.5 };
  const input = { version: 2, id: "doc", name: "Comparisons", root: { id: "root", type: "section", children: [{ id: "repeat", type: "repeater", itemAlias: "item", source: { kind: "autotable", schemaName: "products", limit: 20, filters: [filter] }, children: [{ id: "slot", type: "slot", name: "item", children: [] }] }] } };
  const parsed = migrateComponentDocument(input); expect(parsed.success).toBe(true);
  if (parsed.success) expect(JSON.stringify(parsed.value)).toContain(JSON.stringify(filter));
 }
 const typed: CollectionFilter = { field: "created", operator: "gte", value: "2026-11-01" }; expect(typed.operator).toBe("gte");
});
