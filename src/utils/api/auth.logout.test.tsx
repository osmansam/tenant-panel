// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ setUser: vi.fn(), navigate: vi.fn() }));
vi.mock("react-router-dom", () => ({ useNavigate: () => mocks.navigate }));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (s: string) => s }) }));
vi.mock("../../context/User.context", () => ({ useUserContext: () => ({ setUser: mocks.setUser }) }));
vi.mock("./index", () => ({ get: vi.fn(), post: vi.fn() }));
import { post } from "./index";
import { useTenantLogout } from "./auth";

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  localStorage.setItem("user", "cached-user");
  localStorage.setItem("currentTenant", JSON.stringify({ slug: "tenant" }));
});

function setup() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  client.setQueryData(["private"], "cached data");
  const wrapper = ({ children }: PropsWithChildren) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  return { ...renderHook(() => useTenantLogout(), { wrapper }), client };
}

it("waits for credentialed backend logout before clearing identity and cache", async () => {
  let resolve!: () => void;
  vi.mocked(post).mockImplementation(() => new Promise<void>(done => { resolve = done; }) as Promise<any>);
  const { result, client } = setup();
  let pending!: Promise<unknown>;
  act(() => { pending = result.current.tenantLogout(); });
  await waitFor(() => expect(post).toHaveBeenCalledWith({ path: "/tenant/auth/logout", payload: undefined }));
  expect(localStorage.getItem("user")).toBe("cached-user");
  expect(mocks.navigate).not.toHaveBeenCalled();
  await act(async () => { resolve(); await pending; });
  expect(localStorage.getItem("user")).toBeNull();
  expect(localStorage.getItem("loggedOut")).toBe("true");
  expect(client.getQueryData(["private"])).toBeUndefined();
  expect(mocks.setUser).toHaveBeenCalledWith(undefined);
  expect(mocks.navigate).toHaveBeenCalledWith("/login", { replace: true });
});

it("retains the tenant session and retry context if project logout fails", async () => {
  localStorage.setItem("currentProject", JSON.stringify({ slug: "project / one" }));
  vi.mocked(post).mockRejectedValueOnce(new Error("Project logout failed")).mockResolvedValueOnce({});
  const { result, client } = setup();
  await act(async () => {
    await expect(result.current.tenantLogout()).rejects.toThrow("Project logout failed");
  });
  expect(post).toHaveBeenCalledWith({ path: "/tenant/project%20%2F%20one/tenant-auth/logout", payload: undefined });
  expect(post).not.toHaveBeenCalledWith({ path: "/tenant/auth/logout", payload: undefined });
  expect(localStorage.getItem("user")).toBe("cached-user");
  expect(client.getQueryData(["private"])).toBe("cached data");
  expect(mocks.navigate).not.toHaveBeenCalled();
});

it("logs out the tenant even if persisted project JSON is malformed", async () => {
  localStorage.setItem("currentProject", "invalid JSON");
  vi.mocked(post).mockResolvedValue({});
  const { result } = setup();
  await act(async () => { await result.current.tenantLogout(); });
  expect(post).toHaveBeenCalledOnce();
  expect(localStorage.getItem("user")).toBeNull();
});

it("keeps local identity available for retry when tenant logout fails", async () => {
  vi.mocked(post).mockRejectedValue(new Error("Offline"));
  const { result } = setup();
  await act(async () => { await expect(result.current.tenantLogout()).rejects.toThrow("Offline"); });
  expect(localStorage.getItem("user")).toBe("cached-user");
  expect(mocks.navigate).not.toHaveBeenCalled();
});


it("clears both management scopes before leaving a project workspace", async () => {
  localStorage.setItem("currentProject", JSON.stringify({ slug: "project" }));
  vi.mocked(post).mockResolvedValue({});
  const { result } = setup();
  await act(async () => { await result.current.tenantLogout(); });
  expect(post).toHaveBeenCalledTimes(2);
  expect(post).toHaveBeenCalledWith({ path: "/tenant/project/tenant-auth/logout", payload: undefined });
  expect(post).toHaveBeenCalledWith({ path: "/tenant/auth/logout", payload: undefined });
  expect(localStorage.getItem("currentProject")).toBeNull();
  expect(mocks.setUser).toHaveBeenCalledWith(undefined);
});

it("does not revoke the tenant session until project session cleanup succeeds", async () => {
  localStorage.setItem("currentProject", JSON.stringify({ slug: "project" }));
  let release!: () => void;
  const gate = new Promise<void>(done => { release = done; });
  vi.mocked(post).mockImplementationOnce(() => gate as Promise<any>).mockResolvedValueOnce({});
  const { result } = setup();
  let pending!: Promise<void>;
  act(() => { pending = result.current.tenantLogout(); });
  await waitFor(() => expect(post).toHaveBeenCalledWith({ path: "/tenant/project/tenant-auth/logout", payload: undefined }));
  try {
    expect(post).not.toHaveBeenCalledWith({ path: "/tenant/auth/logout", payload: undefined });
  } finally { await act(async () => { release(); await pending; }); }
  expect(post).toHaveBeenLastCalledWith({ path: "/tenant/auth/logout", payload: undefined });
});
