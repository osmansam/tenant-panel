import { describe, expect, it } from "vitest";
import type { Field } from "./api/container";
import {
  eligibleArrayFields,
  eligibleIdentityFields,
  generateArrayTableDefaults,
  reconcileArrayTableDefaults,
} from "./pageDesignerArraySource";

const duties: Field = {
  name: "duties",
  type: "array",
  children: [
    { name: "duty", type: "string", tag: "required", unique: true },
    { name: "locations", type: "objectIdArray", objectSchemaName: "location" },
    { name: "order", type: "int", tag: "required" },
    { name: "description", type: "string" },
  ],
};

describe("array table designer generation", () => {
  it("offers embedded arrays and scalar identity children", () => {
    expect(eligibleArrayFields([{ name: "name", type: "string" }, duties])).toEqual([duties]);
    expect(eligibleIdentityFields(duties).map((field) => field.name)).toEqual(["duty", "order"]);
  });

  it("generates checklist columns and customizable CRUD actions", () => {
    const result = generateArrayTableDefaults({
      parentId: { source: "static", value: "{{route.id}}" },
      arrayField: duties,
      rowIdentityField: "duty",
      enabled: { columns: true, add: true, edit: true, delete: true, reorder: true },
      orderField: "order",
    });
    expect(result.arraySource).toMatchObject({ enabled: true, field: "duties", rowIdentityField: "duty" });
    expect(result.columns?.map((column) => column.field)).toEqual(["duty", "locations", "order", "description"]);
    expect(result.addButton).toMatchObject({ kind: "create", enabled: true, modalType: "form" });
    expect(result.actions?.map((action) => action.kind)).toEqual(["edit", "delete"]);
    expect(result.drag).toEqual({ enabled: true, orderField: "order" });
  });

  it("preserves customizations and disabled actions during regeneration", () => {
    const generated = generateArrayTableDefaults({
      parentId: { source: "static", value: "{{route.id}}" },
      arrayField: duties,
      rowIdentityField: "duty",
      enabled: { columns: true, add: true, edit: true, delete: true, reorder: false },
    });
    generated.columns![0].displayName = "Task name";
    generated.addButton!.enabled = false;
    const changed = { ...duties, children: [...duties.children!, { name: "notes", type: "string" }] };
    const reconciled = reconcileArrayTableDefaults(generated, changed);
    expect(reconciled.table.columns?.find((column) => column.field === "duty")?.displayName).toBe("Task name");
    expect(reconciled.table.columns?.some((column) => column.field === "notes")).toBe(true);
    expect(reconciled.table.addButton?.enabled).toBe(false);
  });
});
