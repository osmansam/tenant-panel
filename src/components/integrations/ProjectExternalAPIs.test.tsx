// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import { ProjectExternalAPIs } from "./ProjectExternalAPIs";
const state = vi.hoisted(() => ({ credentials: [] as any[], requirements: [] as any[], loading: false, error: false, requirementsLoading: false, requirementsError: false, create: vi.fn(), refetch: vi.fn() }));
vi.mock("../../utils/api/integration", async original => ({ ...await original<any>(), useTenantExternalAPICredentials: () => ({ data: state.credentials, isLoading: state.loading, isError: state.error, refetch: state.refetch }), useCreateTenantExternalAPICredential: () => ({ mutateAsync: state.create, isPending: false }) }));
vi.mock("../../utils/api/project", () => ({ useTemplateExternalAPIRequirements: (id: string) => ({ data: id ? state.requirements : [], isLoading: state.requirementsLoading, isError: state.requirementsError, refetch: state.refetch }) }));
const shared = { id: "shared", name: "Vendor", scope: "tenant", authType: "bearer", allowedDomains: ["api.vendor.com"] };
beforeEach(() => { vi.clearAllMocks(); state.credentials = [shared]; state.requirements = []; state.loading = false; state.error = false; state.requirementsLoading = false; state.requirementsError = false; });
it("requires explicit template mappings and excludes project-only, expired, and revoked keys", async () => {
 state.credentials = [shared, { ...shared, id: "legacy", name: "Legacy", scope: undefined }, { ...shared, id: "expired", name: "Expired", expiresAt: "2020-01-01" }, { ...shared, id: "revoked", name: "Revoked", revokedAt: "2026-01-01" }];
 state.requirements = [{ sourceCredentialId: "source", name: "Payment connection", hosts: ["api.vendor.com"], usages: ["checkout / send"] }]; const onChange = vi.fn();
 render(<ProjectExternalAPIs templateId="template" onChange={onChange} disabled={false} onSavingChange={vi.fn()} />);
 expect(screen.getByText("checkout / send")).toBeInTheDocument(); expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ ready: false }));
 await userEvent.click(screen.getByLabelText("Credential for Payment connection")); expect(screen.queryByRole("option", { name: "Legacy" })).not.toBeInTheDocument();
 await userEvent.click(screen.getByRole("option", { name: "Vendor" }));
 await waitFor(() => expect(onChange).toHaveBeenLastCalledWith({ ids: [], bindings: { source: "shared" }, ready: true }));
});
it("rejects incompatible host selections and shows requirements errors with retry", async () => {
 state.credentials = [{ ...shared, allowedDomains: ["other.example.com"] }]; state.requirements = [{ sourceCredentialId: "source", name: "Payment", hosts: ["api.vendor.com"], usages: [] }];
 const { rerender } = render(<ProjectExternalAPIs templateId="template" onChange={vi.fn()} disabled={false} onSavingChange={vi.fn()} />);
 await userEvent.click(screen.getByLabelText("Credential for Payment")); expect(screen.queryByRole("option", { name: "Vendor" })).not.toBeInTheDocument();
 state.requirementsError = true; rerender(<ProjectExternalAPIs templateId="template" onChange={vi.fn()} disabled={false} onSavingChange={vi.fn()} />); expect(screen.getByRole("alert")).toHaveTextContent("requirements could not be loaded"); await userEvent.click(screen.getByRole("button", { name: "Retry connections" })); expect(state.refetch).toHaveBeenCalled();
});
it("clears old template bindings after switching templates", async () => {
 state.requirements = [{ sourceCredentialId: "source", name: "Payment", hosts: [], usages: [] }]; const onChange = vi.fn(); const onSavingChange = vi.fn();
 const { rerender } = render(<ProjectExternalAPIs templateId="one" onChange={onChange} disabled={false} onSavingChange={onSavingChange} />);
 await userEvent.click(screen.getByLabelText("Credential for Payment")); await userEvent.click(screen.getByRole("option", { name: "Vendor" }));
 rerender(<ProjectExternalAPIs templateId="two" onChange={onChange} disabled={false} onSavingChange={onSavingChange} />);
 await waitFor(() => expect(onChange).toHaveBeenLastCalledWith({ ids: [], bindings: {}, ready: false }));
});
it("explicitly saves a new key then selects its ID, clearing the secret form", async () => {
 state.credentials = []; state.create.mockResolvedValue({ credential: shared }); const onChange = vi.fn();
 render(<ProjectExternalAPIs onChange={onChange} disabled={false} onSavingChange={vi.fn()} />); const user = userEvent.setup();
 await user.click(screen.getByRole("button", { name: "Add new credential" })); await user.type(screen.getByLabelText("Credential name"), "Vendor"); await user.type(screen.getByLabelText("External API token"), "private-token"); await user.type(screen.getByLabelText("Allowed domains"), "api.vendor.com"); await user.click(screen.getByRole("button", { name: "Save shared credential" }));
 await waitFor(() => expect(onChange).toHaveBeenLastCalledWith({ ids: ["shared"], bindings: {}, ready: true })); expect(screen.queryByLabelText("External API token")).not.toBeInTheDocument(); expect(screen.getByRole("checkbox", { name: "Vendor" })).toBeChecked(); expect(screen.getByText(/remains available/)).toBeInTheDocument();
});
it("blocks create while credential or template metadata is loading", () => {
 state.loading = true; const onChange = vi.fn(); render(<ProjectExternalAPIs onChange={onChange} disabled={false} onSavingChange={vi.fn()} />); expect(screen.getByRole("status")).toHaveTextContent("Loading"); expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ ready: false }));
});
it("allows dot-boundary subdomains but excludes lookalike domains", async () => {
 state.credentials = [{ ...shared, allowedDomains: ["vendor.com"] }];
 state.requirements = [{ sourceCredentialId: "source", name: "Orders", hosts: ["orders.vendor.com"], usages: [] }];
 const { rerender } = render(<ProjectExternalAPIs templateId="template" onChange={vi.fn()} disabled={false} onSavingChange={vi.fn()} />);
 await userEvent.click(screen.getByLabelText("Credential for Orders")); expect(screen.getByRole("option", { name: "Vendor" })).toBeInTheDocument();
 await userEvent.keyboard("{Escape}"); state.requirements = [{ ...state.requirements[0], hosts: ["evil-vendor.com"] }]; rerender(<ProjectExternalAPIs templateId="template" onChange={vi.fn()} disabled={false} onSavingChange={vi.fn()} />);
 await userEvent.click(screen.getByLabelText("Credential for Orders")); expect(screen.queryByRole("option", { name: "Vendor" })).not.toBeInTheDocument();
});
it("preselects a usable tenant source credential without granting access until project submission", () => {
 state.requirements = [{ sourceCredentialId: "shared", name: "Existing connection", hosts: ["api.vendor.com"], usages: [] }]; const onChange = vi.fn();
 render(<ProjectExternalAPIs templateId="template" onChange={onChange} disabled={false} onSavingChange={vi.fn()} />);
 expect(onChange).toHaveBeenLastCalledWith({ ids: [], bindings: { shared: "shared" }, ready: true });
 expect(state.create).not.toHaveBeenCalled();
});
it("lets users remove a selected key that becomes revoked before submission", async () => {
 const onChange = vi.fn(); const onSavingChange = vi.fn(); const { rerender } = render(<ProjectExternalAPIs onChange={onChange} disabled={false} onSavingChange={onSavingChange} />);
 await userEvent.click(screen.getByRole("checkbox", { name: "Vendor" })); expect(onChange).toHaveBeenLastCalledWith({ ids: ["shared"], bindings: {}, ready: true });
 state.credentials = [{ ...shared, revokedAt: "2026-01-01T00:00:00Z" }]; rerender(<ProjectExternalAPIs onChange={onChange} disabled={false} onSavingChange={onSavingChange} />);
 expect(screen.getByRole("alert")).toHaveTextContent("revoked, expired, or no longer available"); expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ ready: false }));
 await userEvent.click(screen.getByRole("button", { name: "Remove unavailable Vendor" })); expect(onChange).toHaveBeenLastCalledWith({ ids: [], bindings: {}, ready: true });
});
