import { describe, expect, it } from "vitest";
import { FormFieldConfig, FormFieldMappingConfig } from "../types/page";
import {
  extractTemplateFields,
  getEffectiveSelectDataFields,
  renderOptionTemplate,
} from "./selectOptionConfig";

describe("select option configuration", () => {
  it("extracts and renders safe field templates", () => {
    expect(extractTemplateFields("{{code}} — {{name}} / {{price}}"))
      .toEqual(["code", "name", "price"]);
    expect(renderOptionTemplate("{{price}} ₺", { price: 120 })).toBe("120 ₺");
    expect(renderOptionTemplate("{{missing}}", {})).toBe("");
  });

  it("derives every field needed by value, display, dependencies, and mappings", () => {
    const field = {
      formKey: "productId",
      type: "select",
      sourceValueField: "_id",
      sourceLabelField: "name",
      sourceDataFields: ["taxRate", "discountRate"],
      optionDisplay: { leftTemplate: "{{name}}", rightTemplate: "{{price}}" },
    } as FormFieldConfig;
    const mappings: FormFieldMappingConfig[] = [{
      sourceFormKey: "productId",
      sourceField: "price",
      targetField: "unitPrice",
    }];

    expect(getEffectiveSelectDataFields(field, mappings))
      .toEqual(["_id", "discountRate", "name", "price", "taxRate"]);
  });
});
