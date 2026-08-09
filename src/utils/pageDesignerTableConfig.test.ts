import { describe, expect, it } from "vitest";
import type { Field } from "./api/container";
import {
  TABLE_ACTION_KIND_OPTIONS,
  TABLE_COLUMN_TYPE_OPTIONS,
  TABLE_ROW_ACTION_KIND_OPTIONS,
  cleanDesignerActionFormLayout,
  ensureDesignerTableBulkActions,
  hydrateEmptyDesignerTableColumns,
  mergeDesignerTableColumnsFromNames,
  moveArrayItem,
  normalizeDesignerTableColumnLink,
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
  it("keeps per-action form layout values in the save payload", () => {
    expect(
      cleanDesignerActionFormLayout({
        columns: 3,
        allowOverflow: false,
        topClassName: "  items-start  ",
        generalClassName: "  w-full  ",
      }),
    ).toEqual({
      columns: 3,
      allowOverflow: false,
      topClassName: "items-start",
      generalClassName: "w-full",
    });
  });

  it("moves a field one position without mutating or recreating field objects", () => {
    const first = { formKey: "first" };
    const second = { formKey: "second" };
    const third = { formKey: "third" };
    const fields = [first, second, third];

    const movedUp = moveArrayItem(fields, 2, -1);
    const movedDown = moveArrayItem(fields, 0, 1);

    expect(movedUp).toEqual([first, third, second]);
    expect(movedDown).toEqual([second, first, third]);
    expect(fields).toEqual([first, second, third]);
    expect(movedUp[1]).toBe(third);
  });

  it("leaves the same array unchanged when a move crosses a boundary", () => {
    const fields = [{ formKey: "first" }, { formKey: "second" }];

    expect(moveArrayItem(fields, 0, -1)).toBe(fields);
    expect(moveArrayItem(fields, 1, 1)).toBe(fields);
  });

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

  it("materializes default bulk actions into table config", () => {
    const result = ensureDesignerTableBulkActions(
      {
        columns: [{ field: "productName" }],
      },
      {
        edit: { kind: "update", label: "Edit Selected" },
        delete: { kind: "delete", label: "Delete Selected" },
      },
    );

    expect(result.bulkActions?.edit?.label).toBe("Edit Selected");
    expect(result.bulkActions?.delete?.label).toBe("Delete Selected");
  });

  it("preserves configured bulk actions while filling missing defaults", () => {
    const result = ensureDesignerTableBulkActions(
      {
        bulkActions: {
          edit: { kind: "update", label: "Custom Bulk Edit" },
        },
      },
      {
        edit: { kind: "update", label: "Default Bulk Edit" },
        delete: { kind: "delete", label: "Delete Selected" },
      },
    );

    expect(result.bulkActions?.edit?.label).toBe("Custom Bulk Edit");
    expect(result.bulkActions?.delete?.label).toBe("Delete Selected");
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

  it("keeps email links when the user only selects the email link type", () => {
    expect(normalizeDesignerTableColumnLink({ type: "email" })).toEqual({
      type: "email",
      template: "mailto:{{value}}",
    });
  });
});
