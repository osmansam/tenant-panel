import { describe, expect, it } from "vitest";
import {
  getTableTemplateFields,
  renderTableColumnTemplate,
} from "./tableColumnTemplate";

describe("renderTableColumnTemplate", () => {
  it("interpolates fields from the row", () => {
    expect(
      renderTableColumnTemplate("{{name}} {{surname}}", {
        name: "Ada",
        surname: "Lovelace",
      }),
    ).toBe("Ada Lovelace");
  });

  it("removes missing values and normalizes whitespace", () => {
    expect(
      renderTableColumnTemplate("  {{name}}   {{surname}}  ", {
        name: "Ada",
        surname: null,
      }),
    ).toBe("Ada");
  });

  it("preserves zero and false values", () => {
    expect(
      renderTableColumnTemplate("{{count}} {{active}}", {
        count: 0,
        active: false,
      }),
    ).toBe("0 false");
  });
});

describe("getTableTemplateFields", () => {
  it("returns trimmed unique placeholder fields", () => {
    expect(
      getTableTemplateFields("{{ name }} {{surname}} {{name}}"),
    ).toEqual(["name", "surname"]);
  });
});

