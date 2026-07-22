import { describe, expect, it } from "vitest";
import {
  buildExternalAPICredentialPath,
  normalizeExternalAPICredentialPayload,
} from "./integration";

describe("external API credential API helpers", () => {
  it("builds the project-scoped external API credential path", () => {
    expect(buildExternalAPICredentialPath("acme", "retailerv2")).toBe(
      "/acme/retailerv2/integrations/external-api-credentials"
    );
  });

  it("normalizes bearer credential payloads before sending secrets", () => {
    expect(
      normalizeExternalAPICredentialPayload({
        name: "  Davinci Staging ",
        authType: "bearer",
        headerName: " X-API-Key ",
        secret: " token ",
        allowedDomains: " https://api-staging.davinciboardgame.com/order ",
        expiresAt: "",
      })
    ).toEqual({
      name: "Davinci Staging",
      authType: "bearer",
      secret: "token",
      allowedDomains: ["https://api-staging.davinciboardgame.com/order"],
    });
  });

  it("keeps custom header name for header credentials", () => {
    expect(
      normalizeExternalAPICredentialPayload({
        name: "Vendor",
        authType: "header",
        headerName: "X-API-Key",
        secret: "secret",
        allowedDomains: "api.vendor.com, checkout.vendor.com",
        expiresAt: "2026-08-01T12:00",
      })
    ).toEqual({
      name: "Vendor",
      authType: "header",
      headerName: "X-API-Key",
      secret: "secret",
      allowedDomains: ["api.vendor.com", "checkout.vendor.com"],
      expiresAt: new Date("2026-08-01T12:00").toISOString(),
    });
  });
});
