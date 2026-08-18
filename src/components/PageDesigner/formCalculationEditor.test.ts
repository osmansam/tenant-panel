import { describe, expect, it } from "vitest";
import { FormComponentConfig } from "../../types/page";
import {
  addFieldMapping,
  addItemCalculation,
  addSummary,
  normalizeDesignerCalculations,
  removeFieldMapping,
  updateFieldMapping,
  validateDesignerCalculations,
} from "./formCalculationEditor";

const form = (): FormComponentConfig => ({
  schemaName: "davinciOrder",
  fields: [
    { formKey: "productId", type: "select", optionsSource: "schema", sourceSchemaName: "product" },
    { formKey: "quantity", type: "number" },
  ],
  objectLists: [{ key: "items", itemFields: ["productId", "quantity"] }],
});

describe("form calculation editor helpers", () => {
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
});
