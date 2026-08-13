import { describe, expect, it } from "vitest";
import {
  applyTableArraySource,
  applyTableNestedRows,
  buildArraySourceParentUpdate,
  getLookupLabelValue,
  getTableDataFieldNames,
  getTableLookupKey,
  isTableSearchEnabled,
} from "./tableConfig";

describe("table lookup labels", () => {
  it("builds table rows from a configured array source", () => {
    const rows = [
      {
        _id: "count-list-1",
        name: "Main count",
        products: [
          { product: "p1", locations: [1, 2] },
          { product: "p2", locations: [] },
        ],
      },
    ];

    const result = applyTableArraySource(rows, {
      arraySource: {
        enabled: true,
        field: "products",
        rowIdentityField: "product",
      },
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      _id: "count-list-1:products:p1",
      product: "p1",
      locations: [1, 2],
      __arraySource: {
        parentId: "count-list-1",
        arrayField: "products",
        rowIdentityField: "product",
        rowIdentityValue: "p1",
        index: 0,
      },
    });
  });

  it("builds parent array updates from an array source row", () => {
    const [row] = applyTableArraySource(
      [
        {
          _id: "count-list-1",
          products: [
            { product: "p1", locations: [1] },
            { product: "p2", locations: [] },
          ],
        },
      ],
      {
        arraySource: {
          enabled: true,
          field: "products",
          rowIdentityField: "product",
        },
      },
    );

    expect(buildArraySourceParentUpdate(row, { locations: [1, 3] })).toEqual({
      parentId: "count-list-1",
      updates: {
        products: [
          { product: "p1", locations: [1, 3] },
          { product: "p2", locations: [] },
        ],
      },
    });
  });

  it("requests row fields referenced by cell class templates", () => {
    expect(
      getTableDataFieldNames({
        columns: [
          {
            field: "name",
            type: "field",
            cellClassName: [
              {
                condition: "status = 'active'",
                className: "text-white bg-[{{backgroundColor}}] {{fontClass}}",
              },
            ],
          },
        ],
      }),
    ).toEqual(["name", "status", "backgroundColor", "fontClass"]);
  });

  it("requests template source fields without requesting its synthetic column key", () => {
    const config = {
      columns: [
        {
          field: "fullName",
          type: "template",
          template: "{{name}} {{surname}}",
        },
      ],
    } as unknown as Parameters<typeof getTableDataFieldNames>[0];

    expect(
      getTableDataFieldNames(config, ["_id", "name", "surname"]),
    ).toEqual(["name", "surname"]);
  });


  it("requests non-column fields consumed by filters, actions, rows, and explicit data fields", () => {
    const config = {
      columns: [{ field: "name" as const }],
      dataFields: ["internalCategory", "status", "status"],
      filterPanel: {
        inputs: [{ formKey: "owner", type: "text" as const }],
      },
      actions: [
        {
          kind: "edit" as const,
          disabledCondition: "status != 'ACTIVE'",
          hiddenCondition: "owner == 'system'",
          requiredCondition: "approved == true",
          formFields: [{ formKey: "notes", type: "text" as const }],
          fieldOverrides: [
            { field: "price", disabledCondition: "locked == true" },
          ],
        },
      ],
      rows: {
        className: [{ condition: "priority == 'high'", className: "font-bold" }],
      },
    };

    expect(
      getTableDataFieldNames(config, [
        "_id",
        "name",
        "status",
        "internalCategory",
        "owner",
        "approved",
        "locked",
        "price",
        "notes",
        "priority",
      ]),
    ).toEqual([
      "name",
      "owner",
      "status",
      "approved",
      "notes",
      "price",
      "locked",
      "priority",
      "internalCategory",
    ]);
    expect(config.columns).toEqual([{ field: "name" }]);
  });

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

  it("requests the array source field even when child columns are rendered", () => {
    expect(
      getTableDataFieldNames({
        columns: [{ field: "product" }],
        arraySource: {
          enabled: true,
          field: "products",
          rowIdentityField: "product",
        },
      }, ["_id", "name", "products"]),
    ).toEqual(["products"]);
  });

  it("requests generated relation array fields without visible static columns", () => {
    expect(
      getTableDataFieldNames({
        generatedRelationColumns: [
          {
            id: "locations",
            arrayField: "locations",
            sourceSchemaName: "location",
            sourceLabelField: "name",
          },
        ],
      }),
    ).toEqual(["locations"]);
  });

  it("requests the drag order field even when it is not a visible column", () => {
    expect(
      getTableDataFieldNames(
        { drag: { enabled: true, orderField: "position" } },
        ["name", "position"],
      ),
    ).toEqual(["position"]);
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
