import { describe, expect, it } from "vitest";
import type { Field } from "./api/container";
import {
  canReorderFilteredFields,
  filterContainerFields,
} from "./containerFieldView";

const fields: Field[] = [
  {
    name: "product",
    type: "objectId",
    objectSchemaName: "catalog",
    tag: "required",
  },
  { name: "quantity", type: "int", tag: "required,min=1" },
];

describe("container field view", () => {
  it("matches field metadata without case sensitivity", () => {
    expect(
      filterContainerFields(fields, "CATALOG").map((field) => field.name),
    ).toEqual(["product"]);
    expect(
      filterContainerFields(fields, "min=1").map((field) => field.name),
    ).toEqual(["quantity"]);
  });

  it("only permits reordering without an active query", () => {
    expect(canReorderFilteredFields(" quantity ")).toBe(false);
    expect(canReorderFilteredFields("  ")).toBe(true);
  });
});
