// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import ExternalAPIsPage from "./ExternalAPIsPage";
const state = vi.hoisted(() => ({ allowed: true, projectScope: false, loading: false, error: false, credentials: [] as any[], action: vi.fn(), create: vi.fn(), refetch: vi.fn() }));
vi.mock("react-router-dom", () => ({ Navigate: () => <div>Access denied</div> }));
vi.mock("../context/User.context", () => ({ useUserContext: () => ({ user: { roleScope: state.projectScope ? "project" : "tenant", roles: state.allowed ? ["tenant_admin"] : ["project_admin"] } }) }));
vi.mock("../hooks/useTenant", () => ({ useTenant: () => ({ currentTenant: { id: "tenant" }, hasRole: () => state.allowed, isTenantOwner: () => state.allowed }) }));
vi.mock("../utils/api/project", () => ({ useProjectsQuery: () => ({ data: [{ id: "p1", name: "First project", isActive: true }], isLoading: false, isError: false }) }));
vi.mock("../utils/api/integration", async (original) => ({ ...await original<any>(), useTenantExternalAPICredentials: () => ({ data: state.credentials, isLoading: state.loading, isError: state.error, refetch: state.refetch }), useTenantExternalAPICredentialAction: () => ({ mutateAsync: state.action, isPending: false }), useCreateTenantExternalAPICredential: () => ({ mutateAsync: state.create, isPending: false }) }));
beforeEach(() => { vi.clearAllMocks(); state.allowed = true; state.projectScope = false; state.loading = false; state.error = false; state.credentials = []; state.action.mockResolvedValue({}); });
it("denies project-only and non-admin tenant roles before loading credentials", () => { state.allowed = false; render(<ExternalAPIsPage />); expect(screen.getByText("Access denied")).toBeInTheDocument(); expect(screen.queryByRole("button", { name: "Add shared credential" })).not.toBeInTheDocument(); });
it("distinguishes loading and retryable credential errors", async () => { state.loading = true; const { rerender } = render(<ExternalAPIsPage />); expect(screen.getByRole("status")).toHaveTextContent("Loading"); state.loading = false; state.error = true; rerender(<ExternalAPIsPage />); expect(screen.getByRole("alert")).toHaveTextContent("could not be loaded"); await userEvent.click(screen.getByRole("button", { name: "Try again" })); expect(state.refetch).toHaveBeenCalledOnce(); });
it("connects and disconnects one project and confirms global revocation", async () => {
  state.credentials = [{ id: "shared", name: "Vendor", scope: "tenant", authType: "bearer", allowedDomains: ["api.vendor.com"], grantedProjectIds: [] }];
  const user = userEvent.setup(); const { rerender } = render(<ExternalAPIsPage />);
  await user.click(screen.getByLabelText("Project for Vendor")); await user.click(screen.getByRole("option", { name: "First project" })); await user.click(screen.getByRole("button", { name: "Connect Vendor" }));
  await waitFor(() => expect(state.action).toHaveBeenCalledWith({ action: "grant", credentialId: "shared", projectId: "p1" }));
  state.credentials = [{ ...state.credentials[0], grantedProjectIds: ["p1"] }]; rerender(<ExternalAPIsPage />);
  await user.click(screen.getByRole("button", { name: "Disconnect First project from Vendor" }));
  expect(state.action).toHaveBeenCalledWith({ action: "disconnect", credentialId: "shared", projectId: "p1" });
  await user.click(screen.getByRole("button", { name: "Revoke Vendor" })); expect(screen.getByRole("dialog")).toHaveTextContent("every connected project");
  await user.click(screen.getByRole("button", { name: "Revoke for all projects" })); await waitFor(() => expect(state.action).toHaveBeenCalledWith({ action: "revoke", credentialId: "shared" }));
});
it("explicitly promotes a legacy project key without replacing its ID", async () => {
 state.credentials = [{ id: "legacy", name: "Old vendor", projectId: "p1", authType: "bearer", allowedDomains: ["api.vendor.com"] }]; render(<ExternalAPIsPage />);
 await userEvent.click(screen.getByRole("button", { name: "Promote Old vendor" })); expect(screen.getByRole("dialog")).toHaveTextContent("original project keeps access");
 await userEvent.click(screen.getByRole("button", { name: "Promote to shared" })); await waitFor(() => expect(state.action).toHaveBeenCalledWith({ action: "promote", credentialId: "legacy" }));
});
it("retains credential form values and shows actionable save errors", async () => {
 state.create.mockRejectedValue({ response: { data: { message: "Allowed domain is invalid" } } }); render(<ExternalAPIsPage />); const user = userEvent.setup();
 await user.click(screen.getByRole("button", { name: "Add shared credential" })); await user.type(screen.getByLabelText("Credential name"), "Vendor"); await user.type(screen.getByLabelText("External API token"), "private-token"); await user.type(screen.getByLabelText("Allowed domains"), "api.vendor.com"); await user.click(screen.getByRole("button", { name: "Save shared credential" }));
 await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Allowed domain is invalid")); expect(screen.getByLabelText("Credential name")).toHaveValue("Vendor"); expect(screen.getByLabelText("External API token")).toHaveValue("private-token");
});

it("denies a project-scoped identity even when tenant roles or ownership metadata remain in memory", () => {
 state.projectScope = true; render(<ExternalAPIsPage />); expect(screen.getByText("Access denied")).toBeInTheDocument();
});
