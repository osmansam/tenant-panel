import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FormObjectListConfig } from "../../types/page";
import DynamicFormObjectList from "./DynamicFormObjectList";

const config: FormObjectListConfig = {
  key: "items",
  display: {
    primaryField: "name",
    rightTemplate: "Fallback {{lineTotal}}",
    priceComparison: {
      originalField: "originalLineTotal",
      discountedField: "lineTotal",
      currency: "TRY",
      precision: 2,
    },
  },
};

const renderItem = (item: Record<string, unknown>) => renderToStaticMarkup(createElement(DynamicFormObjectList, {
  config,
  items: [item],
  onEdit: () => undefined,
  onRemove: () => undefined,
  onAdjust: () => undefined,
}));

describe("DynamicFormObjectList price comparison", () => {
  it("renders one regular price when the line is not discounted", () => {
    const html = renderItem({ name: "Tea", originalLineTotal: 500, lineTotal: 500 });
    expect(html).toContain("500.00 TRY");
    expect(html.match(/500\.00 TRY/g)).toHaveLength(1);
    expect(html).not.toContain("<del");
  });

  it("renders the original price struck through beside the discounted price", () => {
    const html = renderItem({ name: "Tea", originalLineTotal: 600, lineTotal: 420 });
    expect(html).toMatch(/<del[^>]*>600\.00 TRY<\/del>/);
    expect(html).toContain("420.00 TRY");
  });

  it("falls back to the safe text template for nonnumeric comparison values", () => {
    const html = renderItem({ name: "Tea", originalLineTotal: "bad", lineTotal: 420 });
    expect(html).toContain("Fallback 420");
    expect(html).not.toContain("<del");
  });
});
