import { describe, expect, it } from "vitest";
import { resolveTableDataMode, shouldUseAllItemsTable } from "./tableDataMode";

describe("table data mode", () => {
  it("fails closed to pagination for missing and unknown values", () => {
    expect(resolveTableDataMode(undefined)).toBe("paginated");
    expect(resolveTableDataMode("future")).toBe("paginated");
    expect(resolveTableDataMode("all")).toBe("all");
  });

  it("activates all-items loading only for schema bindings", () => {
    expect(shouldUseAllItemsTable("schema", "all")).toBe(true);
    expect(shouldUseAllItemsTable("schema", undefined)).toBe(false);
    expect(shouldUseAllItemsTable("pipeline", "all")).toBe(false);
    expect(shouldUseAllItemsTable("workflow", "all")).toBe(false);
  });

  it("keeps an all-items choice dormant across non-schema bindings", () => {
    const savedMode = "all";
    expect(shouldUseAllItemsTable("schema", savedMode)).toBe(true);
    expect(shouldUseAllItemsTable("pipeline", savedMode)).toBe(false);
    expect(shouldUseAllItemsTable("schema", savedMode)).toBe(true);
  });
});
