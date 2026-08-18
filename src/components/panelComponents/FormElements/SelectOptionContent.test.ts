import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SelectOptionContent } from "./SelectOptionContent";

describe("SelectOptionContent", () => {
  it("renders configured labels on opposite sides", () => {
    const html = renderToStaticMarkup(createElement(SelectOptionContent, { option: {
      value: "p1", label: "Syrup", leftLabel: "Syrup", rightLabel: "120 ₺",
    } }));
    expect(html).toContain("Syrup");
    expect(html).toContain("120 ₺");
    expect(html).toContain("data-option-left");
    expect(html).toContain("data-option-right");
  });

  it("keeps legacy options as a single label", () => {
    const html = renderToStaticMarkup(createElement(SelectOptionContent, { option: { value: "legacy", label: "Legacy" } }));
    expect(html).toContain("Legacy");
    expect(html).not.toContain("data-option-right");
  });
});
