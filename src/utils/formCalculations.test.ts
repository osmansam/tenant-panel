import { describe, expect, it } from "vitest";
import { FormComponentConfig, FormObjectListConfig } from "../types/page";
import {
  calculateFormSummaries,
  calculateObjectListItem,
  recalculateFormState,
  snapshotMappedFields,
} from "./formCalculations";

const objectList: FormObjectListConfig = {
  key: "items",
  itemFields: ["productId", "quantity"],
  fieldMappings: [
    {
      sourceFormKey: "productId",
      sourceField: "price",
      targetField: "unitPrice",
      required: true,
    },
  ],
  itemCalculations: [
    {
      operation: "multiply",
      inputs: ["unitPrice", "quantity"],
      targetField: "lineTotal",
      precision: 2,
    },
  ],
};

const form: FormComponentConfig = {
  schemaName: "davinciOrder",
  fields: [],
  objectLists: [objectList],
  summaries: [
    {
      key: "subtotal",
      operation: "sum",
      objectListKey: "items",
      sourceField: "lineTotal",
      targetField: "subtotal",
      format: { style: "currency", currency: "TRY", precision: 2 },
    },
    {
      key: "total",
      operation: "copy",
      sourceField: "subtotal",
      targetField: "total",
      format: { style: "currency", currency: "TRY", precision: 2 },
    },
  ],
};

describe("form calculations", () => {
  it("snapshots and calculates with a qualified additional option field", () => {
    const configured: FormObjectListConfig = {
      key: "items",
      itemFields: ["productId", "quantity"],
      itemCalculations: [{
        operation: "multiply",
        inputs: ["productId.price", "quantity"],
        targetField: "lineTotal",
        precision: 2,
      }],
    };

    const snapshot = snapshotMappedFields(configured, { productId: "p1", quantity: 3 }, {
      productId: { _id: "p1", name: "Tea", price: 19.99 },
    });

    expect(snapshot).toEqual({
      productId: "p1",
      quantity: 3,
      _optionData: { productId: { price: 19.99 } },
    });
    expect(calculateObjectListItem(configured, snapshot)).toMatchObject({ lineTotal: 59.97 });
  });

  it("snapshots mapped source fields without mutating the item", () => {
    const item = { productId: "p1", quantity: 3 };
    const result = snapshotMappedFields(objectList, item, {
      productId: { _id: "p1", name: "Tea", price: 19.99 },
    });

    expect(result).toEqual({ productId: "p1", quantity: 3, unitPrice: 19.99 });
    expect(item).toEqual({ productId: "p1", quantity: 3 });
  });

  it("rejects a missing required mapping", () => {
    expect(() =>
      snapshotMappedFields(objectList, { productId: "p1", quantity: 1 }, {
        productId: { _id: "p1" },
      }),
    ).toThrowError(expect.objectContaining({ code: "missing_mapping" }));
  });

  it("calculates a rounded item total", () => {
    expect(calculateObjectListItem(objectList, { unitPrice: 19.99, quantity: 3 })).toEqual({
      unitPrice: 19.99,
      quantity: 3,
      lineTotal: 59.97,
    });
  });

  it("evaluates sum and copy summaries in order", () => {
    expect(
      calculateFormSummaries(form, {
        items: [
          { unitPrice: 19.99, quantity: 3, lineTotal: 59.97 },
          { unitPrice: 5.25, quantity: 2, lineTotal: 10.5 },
        ],
      }),
    ).toEqual({ subtotal: 70.47, total: 70.47 });
  });

  it("returns zero summaries for an empty list", () => {
    expect(calculateFormSummaries(form, { items: [] })).toEqual({ subtotal: 0, total: 0 });
  });

  it.each([
    { precision: 0, expected: 7 },
    { precision: 2, expected: 6.67 },
    { precision: 6, expected: 6.666667 },
  ])("supports precision $precision", ({ precision, expected }) => {
    const configured = {
      ...objectList,
      itemCalculations: [{ ...objectList.itemCalculations![0], precision }],
    };
    expect(calculateObjectListItem(configured, { unitPrice: 10, quantity: 2 / 3 }).lineTotal).toBe(expected);
  });

  it("recalculates every item and form summary immutably", () => {
    const state = {
      items: [
        { unitPrice: 19.99, quantity: 3 },
        { unitPrice: 5.25, quantity: 2 },
      ],
    };
    const result = recalculateFormState(form, state);

    expect(result).toMatchObject({ subtotal: 70.47, total: 70.47 });
    expect(result.items).toEqual([
      { unitPrice: 19.99, quantity: 3, lineTotal: 59.97 },
      { unitPrice: 5.25, quantity: 2, lineTotal: 10.5 },
    ]);
    expect(state.items[0]).not.toHaveProperty("lineTotal");
  });
});
