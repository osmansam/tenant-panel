// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectsPage from "./ProjectsPage";

const state = vi.hoisted(() => ({
  projects: [] as Array<Record<string, any>>,
  templates: [] as Array<Record<string, any>>,
  externalCredentials: [] as any[],
  requirements: [] as any[],
  createExternal: vi.fn(),
  canManageTemplates: true,
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
  createProject: vi.fn(),
  switchToProject: vi.fn(),
  updateProjectTemplate: vi.fn(),
  deleteProject: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (value: string, options?: Record<string, unknown>) =>
      value.replace(/\{\{(\w+)\}\}/g, (match, key) => (options && key in options ? String(options[key]) : match)),
  }),
}));
vi.mock("react-toastify", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock("../hooks/useTenant", () => ({
  useTenant: () => ({
    currentTenant: { id: "tenant-1", slug: "tenant" },
    hasRole: () => state.canManageTemplates,
    isTenantOwner: () => state.canManageTemplates,
  }),
}));
vi.mock("../utils/api/auth", () => ({
  useSwitchToProject: () => ({ switchToProject: state.switchToProject, isSwitching: false }),
}));
vi.mock("../utils/api/project", () => ({
  useProjectsQuery: () => ({ data: state.projects, isLoading: state.isLoading, isError: state.isError, refetch: state.refetch }),
  useProjectTemplates: () => state.templates,
  useTemplateExternalAPIRequirements: (id: string) => ({ data: id ? state.requirements : [], isLoading: false, isError: false }),
  useCreateProject: () => ({ createProject: state.createProject, isCreating: false }),
  useDeleteProject: () => ({ deleteProject: state.deleteProject, isDeleting: false }),
  useUpdateProjectTemplate: () => ({
    updateProjectTemplate: state.updateProjectTemplate,
    isUpdatingTemplate: false,
  }),
  getProjectId: (project: Record<string, any>) => project.id || project._id || "",
  getProjectStatusDisplay: (status: string) => ({
    label: status === "active" ? "Active" : "Inactive",
  }),
}));

vi.mock("../utils/api/integration", async original => ({ ...await original<any>(), useTenantExternalAPICredentials: () => ({ data: state.externalCredentials, isLoading: false, isError: false }), useCreateTenantExternalAPICredential: () => ({ mutateAsync: state.createExternal, isPending: false }) }));

const project = (overrides: Record<string, any> = {}) => ({
  id: "project-1",
  name: "Operations Workspace",
  slug: "operations",
  description: "Internal operations tools",
  isActive: true,
  createdAt: "2026-09-20T00:00:00.000Z",
  ...overrides,
});

describe("ProjectsPage", () => {
  beforeEach(() => {
    state.projects = [];
    state.templates = [];
    state.externalCredentials = [];
    state.requirements = [];
    state.canManageTemplates = true;
    state.isLoading = false;
    state.isError = false;
    state.createProject.mockReset();
    vi.clearAllMocks();
  });

  it("renders a single page heading and a useful empty state", () => {
    render(<ProjectsPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Projects", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "No projects yet" })).toBeInTheDocument();
  });

  it("creates a project with generated slug through an accessible dialog", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const trigger = screen.getByRole("button", { name: "New Project" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Create New Project" })).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Project Name/), "Customer Success!");
    await user.click(screen.getByRole("button", { name: "Create Project" }));

    expect(state.createProject).toHaveBeenCalledWith({
      name: "Customer Success!",
      slug: "customer-success",
    });
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("preserves template creation choices", async () => {
    const user = userEvent.setup();
    state.templates = [project({ id: "template-1", name: "Starter", templateIncludeItems: true })];
    render(<ProjectsPage />);

    await user.click(screen.getByRole("button", { name: "New Project" }));
    await user.type(screen.getByLabelText(/Project Name/), "From starter");
    await user.click(screen.getByLabelText(/Template Project/));
    await user.click(screen.getByRole("option", { name: "Starter" }));
    expect(screen.getByRole("checkbox", { name: /Include template items/ })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "Create Project" }));

    expect(state.createProject).toHaveBeenCalledWith({
      name: "From starter",
      slug: "from-starter",
      templateProjectId: "template-1",
      includeTemplateItems: true,
    });
  });

  it("keeps project switching and template permissions explicit", async () => {
    const user = userEvent.setup();
    state.canManageTemplates = false;
    state.projects = [project(), project({ id: "project-2", name: "Disabled", isActive: false })];
    render(<ProjectsPage />);

    await user.click(screen.getByRole("button", { name: /Switch to Operations Workspace/ }));
    expect(state.switchToProject).toHaveBeenCalledWith({ projectId: "project-1" });
    expect(screen.getByRole("button", { name: /Disabled/ })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Make Template" })).not.toBeInTheDocument();
  });

  it("uses a wrapping action layout on compact screens", () => {
    state.projects = [project()];
    render(<ProjectsPage />);

    expect(screen.getByRole("group", { name: "Project actions" })).toHaveAttribute(
      "data-layout",
      "wrapping-actions",
    );
  });

  it("searches names and slugs and can clear an empty result", async () => {
    const user = userEvent.setup();
    state.projects = [project(), project({ id: "p2", name: "Client Portal", slug: "customers" })];
    render(<ProjectsPage />);
    await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "customers");
    expect(screen.queryByRole("button", { name: /Switch to Operations/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Switch to Client/ })).toBeInTheDocument();
    await user.clear(screen.getByRole("searchbox", { name: "Search projects" }));
    await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "missing");
    expect(screen.getByRole("status", { name: "No matching projects" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByRole("button", { name: /Switch to Operations/ })).toBeInTheDocument();
  });

  it("distinguishes loading and recoverable errors from an empty workspace", async () => {
    state.isLoading = true;
    const { rerender } = render(<ProjectsPage />);
    expect(screen.getByRole("status", { name: "Loading projects" })).toBeInTheDocument();
    expect(screen.queryByText("No projects yet")).not.toBeInTheDocument();
    state.isLoading = false;
    state.isError = true;
    rerender(<ProjectsPage />);
    expect(screen.getByRole("alert")).toHaveTextContent("Projects could not be loaded");
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(state.refetch).toHaveBeenCalledOnce();
  });

  it("keeps a failed project creation open with the entered values", async () => {
    state.createProject.mockRejectedValueOnce(new Error("Network unavailable"));
    const user = userEvent.setup();
    render(<ProjectsPage />);
    await user.click(screen.getByRole("button", { name: "New Project" }));
    await user.type(screen.getByLabelText(/Project Name/), "My new workspace");
    await user.click(screen.getByRole("button", { name: "Create Project" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Your project could not be created"));
    expect(screen.getByLabelText(/Project Name/)).toHaveValue("My new workspace");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("hides creation actions when the tenant role cannot create projects", () => {
    state.canManageTemplates = false;
    render(<ProjectsPage />);
    expect(screen.queryByRole("button", { name: "New Project" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Create your first project" })).not.toBeInTheDocument();
  });


  it("submits the creation form and rejects invalid URL identifiers inline", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    await user.click(screen.getByRole("button", { name: "New Project" }));
    await user.type(screen.getByLabelText(/Project Name/), "Customer workspace");
    await user.type(screen.getByLabelText(/Project Slug/), "bad slug!");
    await user.click(screen.getByRole("button", { name: "Create Project" }));
    expect(state.createProject).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/Project Slug/)).toHaveAttribute("aria-invalid", "true");
    await user.clear(screen.getByLabelText(/Project Slug/));
    await user.type(screen.getByLabelText(/Project Slug/), "customer-workspace");
    fireEvent.submit(screen.getByLabelText(/Project Slug/).closest("form")!);
    await waitFor(() => expect(state.createProject).toHaveBeenCalledWith({ name: "Customer workspace", slug: "customer-workspace" }));
  });

  it("deletes a project only after typing its name to confirm", async () => {
    const user = userEvent.setup();
    state.deleteProject.mockResolvedValueOnce({});
    state.projects = [project()];
    render(<ProjectsPage />);

    await user.click(screen.getByRole("button", { name: "Delete Operations Workspace" }));
    const dialog = screen.getByRole("dialog", { name: "Delete project" });
    expect(dialog).toBeInTheDocument();
    const confirmButton = screen.getByRole("button", { name: "Delete project" });
    expect(confirmButton).toBeDisabled();

    await user.type(screen.getByLabelText(/Type .* to confirm/), "Operations Workspace");
    expect(confirmButton).toBeEnabled();
    await user.click(confirmButton);

    expect(state.deleteProject).toHaveBeenCalledWith("project-1");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("hides project deletion for non-owners", () => {
    state.canManageTemplates = false;
    state.projects = [project()];
    render(<ProjectsPage />);
    expect(screen.queryByRole("button", { name: /Delete Operations/ })).not.toBeInTheDocument();
  });


it("retains saved key selection and template bindings after a failed project submission without resending secrets", async () => {
 const key = { id: "shared-1", scope: "tenant", name: "New vendor", authType: "bearer", allowedDomains: ["api.vendor.com"] };
 state.createExternal.mockResolvedValueOnce({ credential: key });
 state.createProject.mockRejectedValueOnce({ response: { data: { message: "Slug already exists" } } }).mockResolvedValueOnce({});
 state.templates = [project({ id: "template", name: "Store starter" })];
 state.requirements = [{ sourceCredentialId: "source-key", name: "Checkout", hosts: ["api.vendor.com"], usages: ["checkout / pay"] }];
 const user = userEvent.setup(); render(<ProjectsPage />);
 await user.click(screen.getByRole("button", { name: "New Project" })); await user.type(screen.getByLabelText(/Project Name/), "Store"); await user.click(screen.getByLabelText(/Template Project/)); await user.click(screen.getByRole("option", { name: "Store starter" }));
 expect(screen.getByRole("button", { name: "Create Project" })).toBeDisabled();
 await user.click(screen.getByRole("button", { name: "Add new credential" })); await user.type(screen.getByLabelText("Credential name"), "New vendor"); await user.type(screen.getByLabelText("External API token"), "transient-secret"); await user.type(screen.getByLabelText("Allowed domains"), "api.vendor.com"); await user.click(screen.getByRole("button", { name: "Save shared credential" }));
 await user.click(screen.getByLabelText("Credential for Checkout")); await user.click(screen.getByRole("option", { name: "New vendor" })); await user.click(screen.getByRole("button", { name: "Create Project" }));
 await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Slug already exists"));
 expect(screen.getByLabelText(/Project Name/)).toHaveValue("Store"); expect(screen.getByRole("checkbox", { name: "New vendor" })).toBeChecked();
 await user.click(screen.getByRole("button", { name: "Create Project" }));
 await waitFor(() => expect(state.createProject).toHaveBeenCalledTimes(2));
 expect(state.createProject).toHaveBeenLastCalledWith({ name: "Store", slug: "store", templateProjectId: "template", includeTemplateItems: false, externalAPICredentialIds: ["shared-1"], externalAPICredentialBindings: { "source-key": "shared-1" } });
 expect(state.createExternal).toHaveBeenCalledOnce(); expect(JSON.stringify(state.createProject.mock.calls)).not.toContain("transient-secret");
});

});
