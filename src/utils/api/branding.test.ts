import { describe, expect, it } from "vitest";
import {
  brandingQueryKey,
  brandingUploadErrorMessage,
  normalizeBrandingResponse,
} from "./branding";

const managementPayload = {
  overrides: { displayName: "Project" },
  effective: {
    displayName: "Project",
    logoUrl: "logo.png",
    compactLogoUrl: "compact.png",
    faviconUrl: "favicon.png",
    logoAlt: "Project",
    primaryColor: "#2563EB",
    loginBrandingEnabled: true,
    version: 2,
  },
};

describe("branding API contracts", () => {
  it("normalizes GeneralResponse data without losing inheritance state", () => {
    expect(normalizeBrandingResponse({ data: managementPayload })).toEqual(
      managementPayload,
    );
    expect(normalizeBrandingResponse(managementPayload)).toEqual(
      managementPayload,
    );
  });

  it("isolates tenant and project cache entries", () => {
    expect(brandingQueryKey("tenant", "tenant-1")).toEqual([
      "branding",
      "tenant",
      "tenant-1",
    ]);
    expect(brandingQueryKey("project", "project-1")).toEqual([
      "branding",
      "project",
      "project-1",
    ]);
  });

  it("shows backend upload errors returned in either supported error field", () => {
    expect(
      brandingUploadErrorMessage({ response: { data: { error: "Request body too large" } } }),
    ).toBe("Request body too large");
    expect(
      brandingUploadErrorMessage({ response: { data: { message: "Unsupported image" } } }),
    ).toBe("Unsupported image");
  });
});
