import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PageFilterModal from "./PageFilterModal";
import MonthYearInput from "../panelComponents/FormElements/MonthYearInput";

describe("month/year filter language", () => {
  it("restores the saved Turkish selection in the editor", () => {
    const html = renderToStaticMarkup(React.createElement(PageFilterModal, {
      filter: { id: "month", key: "month", label: "", type: "monthYear", language: "tr", placement: { kind: "navbar" } },
      defaultCellId: "", cells: [], onClose: () => {}, onSave: () => {},
    }));
    expect(html).toContain('<option value="tr" selected="">Türkçe</option>');
    expect(html).toContain('<option value="en">English</option>');
  });

  it.each([["tr", "Eylül"], ["en", "September"]])("renders %s month names", (language, expected) => {
    const html = renderToStaticMarkup(React.createElement(MonthYearInput, { value: "09-2026", language, onChange: () => {} }));
    expect(html).toContain(expected);
    expect(html).toContain("2026");
  });
});
