import { describe, expect, it } from "vitest";
import { mergeTableConstantValues, omitTableConstantKeys } from "./tableConstantValues";

describe("table constant values", () => {
  it("applies caller constants last and protects all constant keys", () => {
    expect(
      mergeTableConstantValues(
        { name: "edited", tenant: "editable" },
        { status: "configured" },
        { tenant: "table", active: true },
        { tenant: "caller" },
      ),
    ).toEqual({ name: "edited", status: "configured", tenant: "caller", active: true });
    expect(
      omitTableConstantKeys(
        { name: "edited", tenant: "bad", active: false },
        { tenant: "table", active: true },
        { tenant: "caller" },
      ),
    ).toEqual({ name: "edited" });
  });
});
