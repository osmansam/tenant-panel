import { describe, expect, it } from "vitest";
import { validateLocaleSettings } from "./localeSettings";

describe("validateLocaleSettings", () => {
  it("requires source and default locales to remain enabled", () => {
    expect(validateLocaleSettings("en", "tr", ["en"])).toBe(
      "Default language must be enabled",
    );
    expect(validateLocaleSettings("en", "tr", ["tr"])).toBe(
      "Source language must be enabled",
    );
  });

  it("accepts valid project locale settings", () => {
    expect(validateLocaleSettings("en", "tr", ["en", "tr"])).toBeNull();
  });
});
