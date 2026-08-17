import { describe, expect, it } from "vitest";
import {
  applyHiddenActionValues,
  buildActionInitialValues,
  partitionActionConstantValues,
} from "./actionConstantValues";

describe("action constant values", () => {
  it("partitions constants by effective rendered keys without dropping falsy values", () => {
    expect(
      partitionActionConstantValues(
        {
          status: "ACTIVE",
          enabled: false,
          count: 0,
          note: "",
          parent: null,
        },
        ["status", "enabled"],
      ),
    ).toEqual({
      visibleDefaults: { status: "ACTIVE", enabled: false },
      hiddenValues: { count: 0, note: "", parent: null },
    });
  });

  it("lets existing values win over visible constants", () => {
    expect(
      buildActionInitialValues(
        { status: "FORM_DEFAULT" },
        { status: "ACTIVE", enabled: false },
        { status: "PAUSED" },
      ),
    ).toEqual({ status: "PAUSED", enabled: false });
  });

  it("applies hidden values after the submitted payload", () => {
    expect(
      applyHiddenActionValues(
        { status: "USER_VALUE", name: "Ada" },
        { status: "ACTIVE" },
      ),
    ).toEqual({ status: "ACTIVE", name: "Ada" });
  });
});
