import { describe, expect, it } from "vitest";
import type { SelectFilterBinding } from "../types/selectFilters";
import { parseRequestFiltersInput } from "./requestFilterTemplates";
import {
  clearDependentSelectValues,
  hasDependentSelectFilters,
  referencedSelectRecordFields,
  resolveSelectFilters,
  validateSelectFilterBindings,
} from "./selectFilters";

const rule = (
  value: SelectFilterBinding["value"],
  operator: "eq" | "in" = "eq",
  field = "location",
): SelectFilterBinding => ({ id: field, field, operator, value });

const fields = [
  { formKey: "location", type: "select" },
  {
    formKey: "countList",
    type: "select",
    sourceFilterBindings: [
      rule({ source: "record", fieldKey: "location", path: ["_id"] }),
    ],
  },
];

describe("dependent select request filters", () => {
  it("resolves prefilled IDs without requiring the selected record to be loaded", () => {
    expect(
      resolveSelectFilters(fields[1], fields, { location: "loc-1" }).filters,
    ).toEqual({ location: "loc-1" });
    expect(
      resolveSelectFilters(fields[1], fields, { location: "loc-1" }).ready,
    ).toBe(true);
  });

  it("uses selected record paths and projects their fields without mistaking custom values for IDs", () => {
    const custom = [{ ...fields[0], sourceValueField: "code" }, fields[1]];
    expect(
      resolveSelectFilters(custom[1], custom, { location: "A" }).ready,
    ).toBe(false);
    const options = new Map([
      [
        "location",
        [{ value: "A", sourceItem: { _id: "loc-1", region: { code: "EU" } } }],
      ],
    ]);
    expect(
      resolveSelectFilters(custom[1], custom, { location: "A" }, options)
        .filters,
    ).toEqual({ location: "loc-1" });
    const region = {
      ...fields[1],
      sourceFilterBindings: [
        rule(
          { source: "record", fieldKey: "location", path: ["region", "code"] },
          "eq",
          "regionCode",
        ),
      ],
    };
    expect(
      resolveSelectFilters(
        region,
        [custom[0], region],
        { location: "A" },
        options,
      ).filters,
    ).toEqual({ regionCode: "EU" });
    expect(referencedSelectRecordFields([custom[0], region], "location")).toEqual([
      "region.code",
    ]);
  });

  it("keeps false and zero typed, combines fixed filters, and supports membership", () => {
    const child = {
      formKey: "child",
      sourceRequestFilters: { active: true },
      sourceFilterBindings: [
        rule({ source: "field", fieldKey: "parent" }, "in"),
      ],
    };
    expect(
      resolveSelectFilters(
        child,
        [{ formKey: "parent" }, child],
        { parent: [0, false] },
      ),
    ).toMatchObject({
      ready: true,
      filters: { active: true, location: [0, false] },
    });
    const literal = {
      formKey: "child",
      sourceFilterBindings: [rule({ source: "literal", value: false })],
    };
    expect(resolveSelectFilters(literal, [literal], {})).toMatchObject({
      ready: true,
      filters: { location: false },
    });
  });

  it("waits on missing references and never broadens a partially resolved filter", () => {
    for (const location of [undefined, null, "", []]) {
      expect(resolveSelectFilters(fields[1], fields, { location }).ready).toBe(
        false,
      );
    }
    expect(
      resolveSelectFilters(
        fields[1],
        fields,
        { location: "loc-1" },
        new Map(),
      ),
    ).toMatchObject({ ready: true });
  });

  it("clears descendants on real changes while preserving initial unchanged defaults", () => {
    const grandchild = {
      formKey: "line",
      isMultiple: true,
      sourceFilterBindings: [rule({ source: "field", fieldKey: "countList" })],
    };
    const all = [...fields, grandchild];
    const initial = {
      location: "loc-1",
      countList: "count-1",
      line: ["line-1"],
    };
    expect(clearDependentSelectValues(all, initial, { ...initial })).toEqual(
      initial,
    );
    expect(
      clearDependentSelectValues(all, initial, {
        ...initial,
        location: "loc-2",
      }),
    ).toEqual({ location: "loc-2", countList: "", line: [] });
    expect(initial.countList).toBe("count-1");
  });

  it("rejects cycles, missing peers, duplicate targets, unsafe paths and malformed imported rules", () => {
    expect(validateSelectFilterBindings(fields)).toEqual([]);
    expect(
      validateSelectFilterBindings([
        {
          ...fields[0],
          sourceFilterBindings: [
            rule({ source: "field", fieldKey: "countList" }),
          ],
        },
        fields[1],
      ]).join(" "),
    ).toMatch(/cycle/i);
    for (const bindings of [
      [rule({ source: "field", fieldKey: "missing" })],
      [rule({ source: "field", fieldKey: "countList" })],
      [
        rule({ source: "literal", value: 1 }),
        rule({ source: "literal", value: 2 }),
      ],
      [rule({ source: "record", fieldKey: "location", path: ["constructor"] })],
      {},
    ]) {
      expect(
        validateSelectFilterBindings([
          fields[0],
          { ...fields[1], sourceFilterBindings: bindings as never },
        ]).length,
      ).toBeGreaterThan(0);
    }
  });

  it("parses and resolves Request filters equations ({{product.item._id}}=item._id) and JSON templates ({\"_id\":\"{{product.item._id}}\"})", () => {
    const fromEquation = parseRequestFiltersInput(
      "{{product.item._id}}=item._id",
      { formKey: "item", sourceSchemaName: "items" },
    );
    const fromJson = parseRequestFiltersInput('{"_id":"{{product.item._id}}"}', {
      formKey: "item",
      sourceSchemaName: "items",
    });
    expect(fromEquation).toEqual({ _id: "{{product.item._id}}" });
    expect(fromJson).toEqual({ _id: "{{product.item._id}}" });

    const productField = {
      formKey: "product",
      label: "Product",
      type: "select",
      sourceSchemaName: "products",
    };
    const itemField = {
      formKey: "item",
      label: "Item",
      type: "select",
      sourceSchemaName: "items",
      sourceRequestFilters: fromEquation,
    };
    const allFields = [productField, itemField];

    expect(hasDependentSelectFilters(itemField)).toBe(true);
    expect(referencedSelectRecordFields(allFields, "product")).toEqual([
      "item._id",
    ]);
    expect(resolveSelectFilters(itemField, allFields, { product: "" }).ready).toBe(
      false,
    );

    const nestedRecordOptions = new Map([
      [
        "product",
        [
          {
            value: "prod-1",
            sourceItem: { _id: "prod-1", item: { _id: "item-42" } },
          },
        ],
      ],
    ]);
    expect(
      resolveSelectFilters(
        itemField,
        allFields,
        { product: "prod-1" },
        nestedRecordOptions,
      ),
    ).toEqual({
      ready: true,
      filters: { _id: "item-42" },
    });

    const scalarFkOptions = new Map([
      [
        "product",
        [{ value: "prod-1", sourceItem: { _id: "prod-1", item: "item-99" } }],
      ],
    ]);
    expect(
      resolveSelectFilters(
        itemField,
        allFields,
        { product: "prod-1" },
        scalarFkOptions,
      ),
    ).toEqual({
      ready: true,
      filters: { _id: "item-99" },
    });

    expect(
      clearDependentSelectValues(
        allFields,
        { product: "prod-1", item: "item-42" },
        { product: "prod-2", item: "item-42" },
      ),
    ).toEqual({ product: "prod-2", item: "" });

    expect(
      validateSelectFilterBindings([
        {
          ...productField,
          sourceRequestFilters: { _id: "{{item._id}}" },
        },
        itemField,
      ]).join(" "),
    ).toMatch(/cycle/i);
  });
});
