import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FormObjectListConfig } from "../../types/page";
import DynamicFormObjectList from "./DynamicFormObjectList";

const config: FormObjectListConfig = {
  key: "items",
  itemCalculations: [{
    operation: "quantityDiscount",
    inputs: ["unitPrice", "quantity"],
    originalTargetField: "originalLineTotal",
    targetField: "lineTotal",
    discountTiers: [
      { minimumQuantity: 6, discountPercentage: 30 },
      { minimumQuantity: 10, discountPercentage: 40 },
    ],
  }],
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

  it.each([
    { quantity: 3, label: "+3 → %30", accessible: "Add 3 items to unlock 30% discount" },
    { quantity: 6, label: "+4 → %40", accessible: "Add 4 items to unlock 40% discount" },
    { quantity: 8, label: "+2 → %40", accessible: "Add 2 items to unlock 40% discount" },
  ])("offers the next discount tier at quantity $quantity", ({ quantity, label, accessible }) => {
    const html = renderItem({ name: "Tea", quantity, originalLineTotal: 100, lineTotal: 100 });
    expect(html).toContain(label);
    expect(html).toContain(`aria-label="${accessible}"`);
  });

  it("hides the discount offer at the highest tier", () => {
    const html = renderItem({ name: "Tea", quantity: 10, originalLineTotal: 1000, lineTotal: 600 });
    expect(html).not.toContain("unlock");
    expect(html).not.toContain("→");
  });
});
