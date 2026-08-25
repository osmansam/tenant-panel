import { describe, expect, it } from "vitest";
import * as PageDesignerModule from "./PageDesigner";
import { FormComponentConfig } from "../../types/page";

describe("PageDesigner form save serialization", () => {
  it("keeps product mappings, item calculations, and summaries in the saved form", () => {
    const cleanFormConfig = (
      PageDesignerModule as typeof PageDesignerModule & {
        cleanFormConfig?: (form: FormComponentConfig) => FormComponentConfig;
      }
    ).cleanFormConfig;

    expect(cleanFormConfig).toBeTypeOf("function");

    const cleaned = cleanFormConfig!({
      schemaName: "orders",
      fields: [{
        formKey: "productId",
        type: "select",
        sourceDataFields: [" name ", "price", "price"],
        optionDisplay: { leftTemplate: " {{name}} ", rightTemplate: " {{price}} ₺ " },
      }],
      objectLists: [{
        key: "items",
        itemFields: ["productId", "quantity"],
        display: {
          rightTemplate: " {{lineTotal}} TRY ",
          priceComparison: {
            originalField: " originalLineTotal ",
            discountedField: " lineTotal ",
            currency: " try ",
            precision: 2,
          },
        },
        fieldMappings: [{
          sourceFormKey: " productId ",
          sourceField: " price ",
          targetField: " unitPrice ",
          required: true,
        }],
        itemCalculations: [{
          operation: "multiply",
          inputs: [" productId.price ", " quantity "],
          targetField: " lineTotal ",
          precision: 2,
        }],
      }],
      summaries: [{
        key: " total ",
        operation: "sum",
        objectListKey: " items ",
        sourceField: " lineTotal ",
        targetField: " total ",
        format: { style: "currency", currency: "try", precision: 2 },
      }],
    });

    expect(cleaned.fields?.[0]).toMatchObject({
      sourceDataFields: ["name", "price"],
      optionDisplay: { leftTemplate: "{{name}}", rightTemplate: "{{price}} ₺" },
    });

    expect(cleaned.objectLists?.[0].fieldMappings).toEqual([{
      sourceFormKey: "productId",
      sourceField: "price",
      targetField: "unitPrice",
      required: true,
    }]);
    expect(cleaned.objectLists?.[0].itemCalculations).toEqual([{
      operation: "multiply",
      inputs: ["productId.price", "quantity"],
      targetField: "lineTotal",
      precision: 2,
    }]);
    expect(cleaned.objectLists?.[0].display?.rightTemplate).toBe("{{lineTotal}} TRY");
    expect(cleaned.objectLists?.[0].display?.priceComparison).toEqual({
      originalField: "originalLineTotal",
      discountedField: "lineTotal",
      currency: "TRY",
      precision: 2,
    });
    expect(cleaned.summaries).toEqual([{
      key: "total",
      operation: "sum",
      objectListKey: "items",
      sourceField: "lineTotal",
      targetField: "total",
      format: { style: "currency", currency: "TRY", precision: 2 },
    }]);
  });
});
