import { describe, expect, it } from "vitest";
import type { Field } from "./api/container";
import {
  TABLE_ACTION_KIND_OPTIONS,
  TABLE_COLUMN_TYPE_OPTIONS,
  TABLE_ROW_ACTION_KIND_OPTIONS,
  hydrateEmptyDesignerTableColumns,
  mergeDesignerTableColumnsFromNames,
  shouldHydrateEmptyDesignerTableColumns,
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

  it("does not hydrate empty columns while editing an existing table", () => {
    expect(
      shouldHydrateEmptyDesignerTableColumns({
        componentType: "table",
        tableSourceType: "schema",
        schemaName: "products",
        columnCount: 0,
        isEditingExistingTable: true,
      }),
    ).toBe(false);
  });

  it("hydrates empty columns for a new schema table", () => {
    expect(
      shouldHydrateEmptyDesignerTableColumns({
        componentType: "table",
        tableSourceType: "schema",
        schemaName: "products",
        columnCount: 0,
        isEditingExistingTable: false,
      }),
    ).toBe(true);
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

  it("offers lookup label as a table column type", () => {
    expect(TABLE_COLUMN_TYPE_OPTIONS).toContainEqual({
      value: "lookupLabel",
      label: "Lookup Label",
    });
  });

  it("offers boolean switch as an editable table column type", () => {
    expect(TABLE_COLUMN_TYPE_OPTIONS).toContainEqual({
      value: "booleanSwitch",
      label: "Boolean Switch",
    });
  });
});
