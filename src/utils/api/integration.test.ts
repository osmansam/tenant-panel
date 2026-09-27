import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  currentProject: { slug: "retail" } as { slug: string } | null,
  useQuery: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
  useQuery: mocks.useQuery,
  useQueryClient: vi.fn(),
}));

vi.mock("../../hooks/useTenant", () => ({
  useTenant: () => ({ currentTenant: { slug: "acme" } }),
}));

vi.mock("../../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({ currentProject: mocks.currentProject }),
}));

import {
  buildExternalAPICredentialPath,
  normalizeExternalAPICredentialPayload,
  useIntegrationCredentials,
} from "./integration";

describe("useIntegrationCredentials", () => {
  beforeEach(() => {
    mocks.currentProject = { slug: "retail" };
    mocks.useQuery.mockReset();
  });

  it("does not require project context when loading is disabled", () => {
    mocks.currentProject = null;
    const queryResult = { data: undefined, isLoading: false };
    mocks.useQuery.mockReturnValue(queryResult);

    expect(useIntegrationCredentials(false)).toBe(queryResult);
    expect(mocks.useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["integrationCredentials", "acme", "__disabled__"],
        enabled: false,
      }),
    );
  });
});

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
