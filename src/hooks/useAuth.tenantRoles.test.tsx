// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import useAuth from "./useAuth";

const state = vi.hoisted(() => ({
  user: { id: "user-1", _id: "user-1", email: "admin@example.test", tenantId: "tenant-1", roleScope: "tenant", roles: ["project_developer"] } as Record<string, any>,
  setUser: vi.fn(), navigate: vi.fn(), get: vi.fn(), location: { pathname: "/projects" },
}));
vi.mock("../context/User.context", () => ({ useUserContext: () => ({ user: state.user, setUser: state.setUser }) }));
vi.mock("react-router-dom", () => ({ useNavigate: () => state.navigate, useLocation: () => state.location }));
vi.mock("../utils/api/axiosClient", () => ({ axiosClient: { get: state.get } }));

beforeEach(() => {
  vi.clearAllMocks();
  state.user = { id: "user-1", _id: "user-1", email: "admin@example.test", tenantId: "tenant-1", roleScope: "tenant", roles: ["project_developer"] };
  state.get.mockResolvedValue({ data: { authenticated: true, user: { id: "user-1" }, tenantId: "tenant-1", roles: ["tenant_admin"] } });
});

it("repairs persisted project roles in a tenant workspace from the matching tenant session", async () => {
  renderHook(() => useAuth());
  await waitFor(() => expect(state.setUser).toHaveBeenCalledWith(expect.objectContaining({ roles: ["tenant_admin"], roleScope: "tenant" })));
  expect(state.get).toHaveBeenCalledWith("/tenant/auth/session");
  expect(JSON.parse(localStorage.getItem("user")!).roles).toEqual(["tenant_admin"]);
});

it("does not replace a tenant workspace with another tenant's session", async () => {
  state.get.mockResolvedValue({ data: { authenticated: true, user: { id: "user-1" }, tenantId: "other-tenant", roles: ["tenant_owner"] } });
  renderHook(() => useAuth());
  await waitFor(() => expect(state.navigate).toHaveBeenCalledWith("/login", expect.objectContaining({ replace: true })));
  expect(state.setUser).not.toHaveBeenCalled();
});

it("does not refresh valid tenant roles or project-scoped sessions", () => {
  state.user.roles = ["tenant_admin"];
  const { rerender } = renderHook(() => useAuth());
  expect(state.get).not.toHaveBeenCalled();
  state.user = { ...state.user, roleScope: "project", projectId: "project-1", roles: ["project_developer"] };
  rerender();
  expect(state.get).not.toHaveBeenCalled();
});

it("does not apply an old tenant-role repair after switching to a project", async () => {
  let resolve!: (value: unknown) => void;
  state.get.mockImplementation(() => new Promise(done => { resolve = done; }));
  const { rerender } = renderHook(() => useAuth());
  state.user = { ...state.user, roleScope: "project", projectId: "project-1", roles: ["project_developer"] };
  rerender();
  resolve({ data: { authenticated: true, user: { id: "user-1" }, tenantId: "tenant-1", roles: ["tenant_admin"] } });
  await Promise.resolve();
  expect(state.setUser).not.toHaveBeenCalled();
});
