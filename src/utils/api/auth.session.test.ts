// @vitest-environment jsdom
import { QueryClient } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  options: undefined as any,
  queryClient: undefined as any,
  setUser: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock("@tanstack/react-query", async (importOriginal) => ({
  ...await importOriginal<typeof import("@tanstack/react-query")>(),
  useMutation: (options: unknown) => { mocks.options = options; return { mutate: vi.fn() }; },
  useQueryClient: () => mocks.queryClient,
}));
vi.mock("react-router-dom", () => ({ useNavigate: () => mocks.navigate }));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (s: string) => s }) }));
vi.mock("react-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("../../context/User.context", () => ({ useUserContext: () => ({ setUser: mocks.setUser }) }));
vi.mock("./index", () => ({ get: vi.fn(), post: vi.fn() }));

import { useGoogleCallback, useTenantLogin, useTenantRegister, useSwitchBackToTenant } from "./auth";
import { get } from "./index";

beforeEach(() => {
  localStorage.clear();
  mocks.queryClient = new QueryClient();
  mocks.queryClient.setQueryData(["containers", "previous-tenant", "previous-project"], [{ id: "previous-content" }]);
  localStorage.setItem("currentProject", JSON.stringify({ id: "old-project", slug: "old-project" }));
  localStorage.setItem("currentTenant", JSON.stringify({ id: "old-tenant", slug: "old-tenant" }));
  vi.clearAllMocks();
});

describe("switching back to the tenant workspace", () => {
  const user = { id: "user-1", email: "admin@example.com", roles: ["project_developer"], roleScope: "project", projectId: "project-1", allTenants: [] };
  const tenant = { id: "tenant-1", name: "Tenant", slug: "tenant" };
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("currentTenant", JSON.stringify(tenant));
    localStorage.setItem("currentProject", JSON.stringify({ id: "project-1", name: "Project", slug: "project" }));
    mocks.setUser.mockClear();
    mocks.navigate.mockClear();
    vi.mocked(get).mockReset();
  });

  it("restores tenant roles from the tenant session before navigating to Projects", async () => {
    vi.mocked(get).mockResolvedValue({ authenticated: true, user: { id: "user-1" }, tenantId: "tenant-1", roles: ["tenant_admin"] });
    await useSwitchBackToTenant().switchBackToTenant();
    expect(get).toHaveBeenCalledWith({ path: "/tenant/auth/session" });
    expect(mocks.setUser).toHaveBeenCalledWith(expect.objectContaining({ roles: ["tenant_admin"], roleScope: "tenant", projectId: undefined }));
    expect(localStorage.getItem("currentProject")).toBeNull();
    expect(mocks.navigate).toHaveBeenCalledWith("/projects");
  });

  it.each([
    { authenticated: false },
    { authenticated: true, user: { id: "user-1" }, tenantId: "other-tenant", roles: ["tenant_owner"] },
    { authenticated: true, user: { id: "other-user" }, tenantId: "tenant-1", roles: ["tenant_owner"] },
    { authenticated: true, user: { id: "user-1" }, tenantId: "tenant-1", roles: [123] },
  ])("preserves the project workspace if the tenant session is invalid or belongs to someone else", async session => {
    vi.mocked(get).mockResolvedValue(session);
    const onError = vi.fn();
    await useSwitchBackToTenant(onError).switchBackToTenant();
    expect(onError).toHaveBeenCalled();
    expect(mocks.setUser).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("user")!)).toEqual(user);
    expect(localStorage.getItem("currentProject")).not.toBeNull();
  });

  it("keeps the project workspace when the tenant session request fails", async () => {
    vi.mocked(get).mockRejectedValue(new Error("Network unavailable"));
    const onError = vi.fn();
    await useSwitchBackToTenant(onError).switchBackToTenant();
    expect(onError).toHaveBeenCalled();
    expect(mocks.setUser).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(localStorage.getItem("currentProject")).not.toBeNull();
  });

  it("does not overwrite a newer workspace while the tenant request is pending", async () => {
    let resolve!: (value: unknown) => void;
    vi.mocked(get).mockImplementation(() => new Promise(done => { resolve = done; }));
    const pending = useSwitchBackToTenant().switchBackToTenant();
    const newerUser = { ...user, projectId: "project-2" };
    localStorage.setItem("user", JSON.stringify(newerUser));
    resolve({ authenticated: true, user: { id: "user-1" }, tenantId: "tenant-1", roles: ["tenant_admin"] });
    await pending;
    expect(mocks.setUser).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("user")!)).toEqual(newerUser);
  });
});

describe("successful tenant sign-in starts a tenant workspace", () => {
  it.each([
    ["password login", useTenantLogin],
    ["registration", useTenantRegister],
    ["Google callback", useGoogleCallback],
  ] as const)("removes previous project context and cache after %s", async (_name, hook) => {
    hook();
    await mocks.options.onSuccess({
      data: {
        user: { id: "new-user", email: "new@example.com", name: "New User" },
        tenant: { id: "new-tenant", name: "New Tenant", slug: "new-tenant" },
        allTenants: [],
        roles: ["tenant_owner"],
      },
    });

    expect(localStorage.getItem("currentProject")).toBeNull();
    expect(JSON.parse(localStorage.getItem("currentTenant")!)).toEqual({ id: "new-tenant", name: "New Tenant", slug: "new-tenant" });
    expect(JSON.parse(localStorage.getItem("user")!)).toMatchObject({ id: "new-user", tenantId: "new-tenant", roleScope: "tenant", roles: ["tenant_owner"] });
    expect(mocks.queryClient.getQueryData(["containers", "previous-tenant", "previous-project"])).toBeUndefined();
    expect(mocks.navigate).toHaveBeenCalledWith("/");
  });
});
