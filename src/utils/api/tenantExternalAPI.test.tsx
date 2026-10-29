// @vitest-environment jsdom
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as api from "./integration";
import * as projects from "./project";
import { axiosClient } from "./axiosClient";
vi.mock("./axiosClient", () => ({ axiosClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } }));
vi.mock("../../hooks/useTenant", () => ({ useTenant: () => ({ currentTenant: { id: "tenant-1", slug: "acme" } }) }));
vi.mock("../../hooks/useCurrentProject", () => ({ useCurrentProject: () => ({ currentProject: null }) }));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (s: string) => s }) }));
vi.mock("react-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })}>{children}</QueryClientProvider>;
describe("tenant external API contract", () => {
  beforeEach(() => { vi.clearAllMocks(); vi.mocked(axiosClient.post).mockResolvedValue({ data: { data: { credential: { id: "shared-1", scope: "tenant" } } } }); });
  it("creates tenant credentials without requiring a selected project", async () => {
    expect(api).toHaveProperty("useCreateTenantExternalAPICredential");
    const { result } = renderHook(() => (api as any).useCreateTenantExternalAPICredential(), { wrapper });
    let saved: any;
    await act(async () => { saved = await result.current.mutateAsync({ name: "Vendor", secret: "secret", authType: "bearer", allowedDomains: ["api.vendor.com"] }); });
    expect(axiosClient.post).toHaveBeenCalledWith("/tenant/integrations/external-api-credentials", { name: "Vendor", secret: "secret", authType: "bearer", allowedDomains: ["api.vendor.com"] });
    expect(saved).toEqual({ credential: { id: "shared-1", scope: "tenant" } });
  });
  it("uses independent promote, grant, disconnect, and global revoke routes", async () => {
    expect(api).toHaveProperty("useTenantExternalAPICredentialAction");
    const { result } = renderHook(() => (api as any).useTenantExternalAPICredentialAction(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ action: "promote", credentialId: "legacy" });
      await result.current.mutateAsync({ action: "grant", credentialId: "shared", projectId: "project-1" });
      await result.current.mutateAsync({ action: "disconnect", credentialId: "shared", projectId: "project-1" });
      await result.current.mutateAsync({ action: "revoke", credentialId: "shared" });
    });
    expect(axiosClient.post).toHaveBeenCalledWith("/tenant/integrations/external-api-credentials/legacy/promote", {});
    expect(axiosClient.put).toHaveBeenCalledWith("/tenant/integrations/external-api-credentials/shared/projects/project-1");
    expect(axiosClient.delete).toHaveBeenCalledWith("/tenant/integrations/external-api-credentials/shared/projects/project-1");
    expect(axiosClient.post).toHaveBeenCalledWith("/tenant/integrations/external-api-credentials/shared/revoke", {});
  });
  it("fetches safe template requirements from the tenant route", async () => {
    expect(projects).toHaveProperty("useTemplateExternalAPIRequirements");
    vi.mocked(axiosClient.get).mockResolvedValue({ data: { data: { requirements: [{ sourceCredentialId: "source", name: "External API 1", hosts: ["api.vendor.com"], usages: ["sync / call"] }] } } });
    const { result } = renderHook(() => (projects as any).useTemplateExternalAPIRequirements("template-1"), { wrapper });
    await vi.waitFor(() => expect(result.current.data).toHaveLength(1));
    expect(axiosClient.get).toHaveBeenCalledWith("/tenant/projects/templates/template-1/external-api-requirements");
    expect(result.current.data[0].sourceCredentialId).toBe("source");
  });
});
