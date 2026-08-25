import { describe, expect, it } from "vitest";
import { buildBrandingPatch, validateBrandingDraft } from "./brandingState";

describe("branding editor state", () => {
  it("resets one project field without copying the inherited value", () => {
    expect(
      buildBrandingPatch(
        { displayName: "Project" },
        {
          displayName: "Tenant",
          logoAlt: "Tenant",
          primaryColor: "#2563EB",
          loginBrandingEnabled: true,
        },
        { displayName: true },
        {},
      ),
    ).toEqual({ reset: ["displayName"] });
  });

  it("normalizes changed scalar overrides", () => {
    expect(
      buildBrandingPatch(
        { displayName: "Old", primaryColor: "#111111" },
        {
          displayName: "  New Name  ",
          logoAlt: "New logo",
          primaryColor: "#a1b2c3",
          loginBrandingEnabled: false,
        },
        {},
        {
          displayName: true,
          logoAlt: true,
          primaryColor: true,
          loginBrandingEnabled: true,
        },
      ),
    ).toEqual({
      displayName: "New Name",
      logoAlt: "New logo",
      primaryColor: "#A1B2C3",
      loginBrandingEnabled: false,
    });
  });

  it("rejects an invalid primary color", () => {
    expect(
      validateBrandingDraft({
        displayName: "Acme",
        logoAlt: "Acme",
        primaryColor: "blue",
        loginBrandingEnabled: true,
      }),
    ).toEqual({ primaryColor: "Use a six-digit hex color such as #2563EB" });
  });
});
