import { describe, expect, it } from "vitest";
import {
  applyTableNestedRows,
  getLookupLabelValue,
  getTableDataFieldNames,
  getTableLookupKey,
  isTableSearchEnabled,
} from "./tableConfig";

describe("table lookup labels", () => {
  it("requests the nested array field even when it is not a visible column", () => {
    expect(
      getTableDataFieldNames({
        columns: [
          { field: "date", type: "date" },
          { field: "status", type: "field" },
        ],
        nestedRows: {
          enabled: true,
          field: "items",
          columns: [{ field: "productId" }, { field: "quantity" }],
        },
      }),
    ).toEqual(["date", "status", "items"]);
  });

  it("keeps table search enabled by default and allows disabling it", () => {
    expect(isTableSearchEnabled(undefined)).toBe(true);
    expect(isTableSearchEnabled({ columns: [] })).toBe(true);
    expect(isTableSearchEnabled({ columns: [], enableSearch: true })).toBe(true);
    expect(isTableSearchEnabled({ columns: [], enableSearch: false })).toBe(false);
  });

  it("resolves a lookup label by matching the row field to the selected schema match field", () => {
    const column = {
      field: "productId",
      type: "lookupLabel" as const,
      lookup: {
        schemaName: "product",
        matchField: "_id",
        labelField: "productName",
      },
    };
    const lookupData = new Map([
      [
        getTableLookupKey(column.lookup),
        [
          { _id: "p1", productName: "Espresso" },
          { _id: "p2", productName: "Latte" },
        ],
      ],
    ]);

    expect(getLookupLabelValue(column, { productId: "p2" }, lookupData)).toBe(
      "Latte",
    );
  });

  it("applies lookup labels to nested row columns", () => {
    const lookup = {
      schemaName: "product",
      matchField: "_id",
      labelField: "productName",
    };
    const [row] = applyTableNestedRows(
      [{ _id: "order-1", items: [{ productId: "p1", quantity: 2 }] }],
      {
        nestedRows: {
          enabled: true,
          field: "items",
          columns: [
            {
              field: "productId",
              displayName: "Product",
              type: "lookupLabel",
              lookup,
            },
          ],
        },
      },
      (value) => value,
      new Map([[getTableLookupKey(lookup), [{ _id: "p1", productName: "Espresso" }]]]),
    );

    expect(row.collapsible?.collapsibleRowKeys[0].node?.({ productId: "p1" }))
      .toBe("Espresso");
  });
});
