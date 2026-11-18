// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import useAuth from "./useAuth";

const state = vi.hoisted(() => ({
  user: { id: "user-1", _id: "user-1", email: "admin@example.test", tenantId: "tenant-1", roleScope: "tenant", roles: ["project_developer"] } as Record<string, any>,
  setUser: vi.fn(), navigate: vi.fn(), get: vi.fn(), location: { pathname: "/projects" },
}));
vi.mock("@tanstack/react-query",()=>({useQueryClient:()=>({clear:vi.fn()})}));
vi.mock("../context/User.context", () => ({ useUserContext: () => ({ user: state.user, setUser: state.setUser }) }));
vi.mock("react-router-dom", () => ({ useNavigate: () => state.navigate, useLocation: () => state.location }));
vi.mock("../utils/api/axiosClient", () => ({ axiosClient: { get: state.get } }));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  state.user = { id: "user-1", _id: "user-1", email: "admin@example.test", tenantId: "tenant-1", roleScope: "tenant", roles: ["project_developer"] };
  state.get.mockResolvedValue({ data: { authenticated: true, user: { id: "user-1" }, tenantId: "tenant-1", roles: ["tenant_admin"], data: {user:{id:"user-1", email:"admin@example.test"}} } });
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

it("refreshes persisted owner roles on entry", async () => {
  state.user.roles = ["tenant_owner"];
  state.get.mockResolvedValue({data:{authenticated:true,user:{id:"user-1",email:"admin@example.test"},tenantId:"tenant-1",roles:["tenant_member"],data:{user:{id:"user-1",email:"admin@example.test"}}}});
  renderHook(() => useAuth());
  await waitFor(()=>expect(state.setUser).toHaveBeenCalledWith(expect.objectContaining({roles:["tenant_member"]})));
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

it('does not publish a pending refresh after another tab replaces the workspace',async()=>{
 const old={...state.user,roleScope:'project',projectId:'project-a',tenantSlug:'tenant',projectSlug:'a',roles:['project_editor']};state.user=old;localStorage.setItem('user',JSON.stringify(old));
 let finish!:(value:unknown)=>void;state.get.mockImplementation((path:string)=>path.endsWith('/session')?new Promise(resolve=>{finish=resolve}):Promise.resolve({data:{data:{user:{id:'user-1',email:'admin@example.test'}}}}));
 renderHook(()=>useAuth());const newer={...old,projectId:'project-b',projectSlug:'b'};localStorage.setItem('user',JSON.stringify(newer));window.dispatchEvent(new StorageEvent('storage',{key:'user',newValue:JSON.stringify(newer)}));
 finish({data:{authenticated:true,user:{id:'user-1'},tenantId:'tenant-1',projectId:'project-a',roles:['project_editor']}});
 await new Promise(resolve=>setTimeout(resolve,20));expect(JSON.parse(localStorage.getItem('user')!).projectId).toBe('project-b');expect(state.setUser).not.toHaveBeenCalledWith(expect.objectContaining({projectId:'project-a'}));
});

it("keeps a session-store outage distinct from logout",async()=>{state.get.mockRejectedValue({response:{status:503}});const {result}=renderHook(()=>useAuth());await waitFor(()=>expect(result.current.authError).toBe(true));expect(state.navigate).not.toHaveBeenCalled();expect(state.setUser).not.toHaveBeenCalled();expect(localStorage.getItem("loggedOut")).toBeNull()});
