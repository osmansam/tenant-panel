import { describe, expect, it } from "vitest";
import { FormComponentConfig } from "../../types/page";
import {
  addFieldMapping,
  addItemCalculation,
  addSummary,
  getAvailableCalculationInputs,
  normalizeDesignerCalculations,
  removeFieldMapping,
  updateFieldMapping,
  validateDesignerCalculations,
} from "./formCalculationEditor";

const form = (): FormComponentConfig => ({
  schemaName: "davinciOrder",
  fields: [
    { formKey: "productId", label: "Product", type: "select", optionsSource: "schema", sourceSchemaName: "product", sourceDataFields: ["price", "taxRate"] },
    { formKey: "quantity", type: "number" },
  ],
  objectLists: [{ key: "items", itemFields: ["productId", "quantity"] }],
});

describe("form calculation editor helpers", () => {
  it("offers qualified additional option fields as calculation inputs", () => {
    expect(getAvailableCalculationInputs(form(), 0, 0)).toEqual([
      { value: "productId", label: "productId", group: "Item fields" },
      { value: "quantity", label: "quantity", group: "Item fields" },
      { value: "productId.price", label: "Product → price", group: "Additional option data" },
      { value: "productId.taxRate", label: "Product → taxRate", group: "Additional option data" },
    ]);
  });

  it("accepts a qualified additional option field in an item calculation", () => {
    const configured = form();
    configured.objectLists![0].itemCalculations = [{
      operation: "multiply",
      inputs: ["productId.price", "quantity"],
      targetField: "lineTotal",
      precision: 2,
    }];

    expect(validateDesignerCalculations(configured)).toEqual([]);
  });

  it("adds, updates, and removes mappings immutably", () => {
    const original = form();
    const added = addFieldMapping(original, 0);
    const updated = updateFieldMapping(added, 0, 0, { sourceFormKey: "productId", sourceField: " price ", targetField: " unitPrice ", required: true });
    const removed = removeFieldMapping(updated, 0, 0);
    expect(original.objectLists![0].fieldMappings).toBeUndefined();
    expect(updated.objectLists![0].fieldMappings![0].targetField).toBe(" unitPrice ");
    expect(removed.objectLists![0].fieldMappings).toEqual([]);
  });

  it("adds operation defaults and preserves zero precision", () => {
    const withMapping = updateFieldMapping(addFieldMapping(form(), 0), 0, 0, { sourceFormKey: "productId", sourceField: "price", targetField: "unitPrice" });
    const calculated = addItemCalculation(withMapping, 0);
    calculated.objectLists![0].itemCalculations![0].precision = 0;
    expect(normalizeDesignerCalculations(calculated).objectLists![0].itemCalculations![0].precision).toBe(0);
  });

  it("validates duplicate, stale, ordered, currency, and precision references", () => {
    let configured: FormComponentConfig = addFieldMapping(form(), 0);
    configured = updateFieldMapping(configured, 0, 0, { sourceFormKey: "missing", sourceField: "price", targetField: "quantity" });
    configured = addSummary(configured);
    configured.summaries![0] = { ...configured.summaries![0], operation: "copy", sourceField: "future", targetField: "subtotal", format: { currency: "try", precision: 7 } };
    const errors = validateDesignerCalculations(configured).join(" ");
    expect(errors).toContain("schema-backed select");
    expect(errors).toContain("duplicate item target");
    expect(errors).toContain("earlier summary");
    expect(errors).toContain("currency");
    expect(errors).toContain("precision");
  });

  it("normalizes mapping and summary strings", () => {
    let configured: FormComponentConfig = addFieldMapping(form(), 0);
    configured = updateFieldMapping(configured, 0, 0, { sourceFormKey: " productId ", sourceField: " price ", targetField: " unitPrice " });
    configured = addSummary(configured);
    configured.summaries![0] = { ...configured.summaries![0], key: " subtotal ", sourceField: " lineTotal ", targetField: " subtotal ", format: { currency: "try", precision: 2 } };
    const normalized = normalizeDesignerCalculations(configured);
    expect(normalized.objectLists![0].fieldMappings![0]).toMatchObject({ sourceFormKey: "productId", sourceField: "price", targetField: "unitPrice" });
    expect(normalized.summaries![0]).toMatchObject({ key: "subtotal", sourceField: "lineTotal", targetField: "subtotal", format: { currency: "TRY", precision: 2 } });
  });

  it("validates quantity-discount thresholds, percentages, outputs, and price comparisons", () => {
    let configured = updateFieldMapping(addFieldMapping(form(), 0), 0, 0, {
      sourceFormKey: "productId",
      sourceField: "price",
      targetField: "unitPrice",
    });
    configured.objectLists![0].itemCalculations = [{
      operation: "quantityDiscount",
      inputs: ["unitPrice", "quantity"],
      originalTargetField: "lineTotal",
      targetField: "lineTotal",
      minimumQuantity: 0,
      discountPercentage: 101,
      precision: 2,
    }];
    configured.objectLists![0].display = {
      priceComparison: {
        originalField: "missing",
        discountedField: "",
        currency: "try",
        precision: 7,
      },
    };

    const errors = validateDesignerCalculations(configured).join(" ");
    expect(errors).toContain("distinct output fields");
    expect(errors).toContain("minimum quantity");
    expect(errors).toContain("discount percentage");
    expect(errors).toContain("price comparison fields");
    expect(errors).toContain("currency");
    expect(errors).toContain("precision");
  });

  it("normalizes quantity-discount outputs and price-comparison settings", () => {
    const configured = form();
    configured.objectLists![0].itemCalculations = [{
      operation: "quantityDiscount",
      inputs: [" unitPrice ", " quantity "],
      originalTargetField: " originalLineTotal ",
      targetField: " lineTotal ",
      minimumQuantity: 6,
      discountPercentage: 30,
    }];
    configured.objectLists![0].display = {
      priceComparison: {
        originalField: " originalLineTotal ",
        discountedField: " lineTotal ",
        currency: " try ",
      },
    };

    const normalized = normalizeDesignerCalculations(configured);
    expect(normalized.objectLists![0].itemCalculations![0]).toMatchObject({
      originalTargetField: "originalLineTotal",
      targetField: "lineTotal",
      precision: 2,
    });
    expect(normalized.objectLists![0].display?.priceComparison).toEqual({
      originalField: "originalLineTotal",
      discountedField: "lineTotal",
      currency: "TRY",
      precision: 2,
    });
  });
});
