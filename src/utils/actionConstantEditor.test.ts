import { describe, expect, it } from "vitest";
import {
  actionConstantRowsFromValues,
  parseActionConstantRows,
} from "./actionConstantEditor";

describe("action constant editor", () => {
  it("round trips JSON-compatible values without losing falsy values", () => {
    const rows = actionConstantRowsFromValues({
      status: "ACTIVE",
      enabled: false,
      count: 0,
      note: "",
      parent: null,
      tags: ["a"],
    });

    expect(parseActionConstantRows(rows)).toEqual({
      ok: true,
      values: {
        status: "ACTIVE",
        enabled: false,
        count: 0,
        note: "",
        parent: null,
        tags: ["a"],
      },
    });
  });

  it("reports blank, duplicate, and malformed structured values", () => {
    const result = parseActionConstantRows([
      { id: "1", key: "", valueText: "ACTIVE" },
      { id: "2", key: "status", valueText: "ACTIVE" },
      { id: "3", key: "status", valueText: "PAUSED" },
      { id: "4", key: "filters", valueText: "{" },
    ]);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual({
        "1": "Key is required",
        "3": "Key must be unique",
        "4": "Enter valid JSON for an object or array",
      });
    }
  });
});
