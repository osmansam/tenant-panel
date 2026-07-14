import { describe, expect, it } from "vitest";
import type { Field } from "./api/container";
import {
  TABLE_ACTION_KIND_OPTIONS,
  TABLE_ROW_ACTION_KIND_OPTIONS,
  hydrateEmptyDesignerTableColumns,
  mergeDesignerTableColumnsFromNames,
} from "./pageDesignerTableConfig";

const fields: Field[] = [
  { name: "_id", type: "objectID" } as Field,
  {
    name: "productName",
    type: "string",
    frontend: { displayName: "Product Name" },
  } as Field,
  { name: "quantity", type: "number" } as Field,
];

describe("page designer table config", () => {
  it("hydrates empty existing table columns from selected DB schema fields", () => {
    const result = hydrateEmptyDesignerTableColumns(
      {
        columns: [],
        actions: [{ kind: "edit", label: "Custom edit" }],
      },
      fields,
    );

    expect(result.columns).toEqual([
      {
        field: "productName",
        type: "field",
        displayName: "Product Name",
        cellClassName: [],
      },
      {
        field: "quantity",
        type: "field",
        displayName: "",
        cellClassName: [],
      },
    ]);
    expect(result.actions).toEqual([{ kind: "edit", label: "Custom edit" }]);
  });

  it("preserves existing custom table columns", () => {
    const result = hydrateEmptyDesignerTableColumns(
      {
        columns: [{ field: "customTotal", type: "currency", displayName: "Total" }],
      },
      fields,
    );

    expect(result.columns).toEqual([
      { field: "customTotal", type: "currency", displayName: "Total" },
    ]);
  });

  it("preserves existing column types while syncing pipeline or workflow output fields", () => {
    const result = mergeDesignerTableColumnsFromNames(
      [
        { field: "name", type: "field", displayName: "Name" },
        { field: "price", type: "currency", displayName: "Price" },
        {
          field: "davinciPrice",
          type: "number",
          displayName: "Da Vinci Price",
        },
      ],
      ["name", "image", "price", "category", "davinciPrice"],
    );

    expect(result).toEqual([
      { field: "name", type: "field", displayName: "Name" },
      { field: "image", type: "field", displayName: "" },
      { field: "price", type: "currency", displayName: "Price" },
      { field: "category", type: "field", displayName: "" },
      {
        field: "davinciPrice",
        type: "number",
        displayName: "Da Vinci Price",
      },
    ]);
  });

  it("offers create alongside regular row action kinds", () => {
    expect(TABLE_ACTION_KIND_OPTIONS.map((option) => option.value)).toEqual([
      "create",
      "edit",
      "delete",
      "update",
      "link",
    ]);
  });

  it("does not offer create as a row action kind", () => {
    expect(TABLE_ROW_ACTION_KIND_OPTIONS.map((option) => option.value)).toEqual([
      "edit",
      "delete",
      "update",
      "link",
    ]);
  });
});
