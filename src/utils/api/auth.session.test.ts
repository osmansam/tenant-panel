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
vi.mock("react-toastify", () => ({ toast: { success: vi.fn() } }));
vi.mock("../../context/User.context", () => ({ useUserContext: () => ({ setUser: mocks.setUser }) }));
vi.mock("./index", () => ({ get: vi.fn(), post: vi.fn() }));

import { useGoogleCallback, useTenantLogin, useTenantRegister } from "./auth";

beforeEach(() => {
  localStorage.clear();
  mocks.queryClient = new QueryClient();
  mocks.queryClient.setQueryData(["containers", "previous-tenant", "previous-project"], [{ id: "previous-content" }]);
  localStorage.setItem("currentProject", JSON.stringify({ id: "old-project", slug: "old-project" }));
  localStorage.setItem("currentTenant", JSON.stringify({ id: "old-tenant", slug: "old-tenant" }));
  vi.clearAllMocks();
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
