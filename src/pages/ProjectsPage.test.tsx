// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectsPage from "./ProjectsPage";

const state = vi.hoisted(() => ({
  projects: [] as Array<Record<string, any>>,
  templates: [] as Array<Record<string, any>>,
  canManageTemplates: false,
  createProject: vi.fn(),
  switchToProject: vi.fn(),
  updateProjectTemplate: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
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
  useProjects: () => state.projects,
  useProjectTemplates: () => state.templates,
  useCreateProject: () => ({ createProject: state.createProject, isCreating: false }),
  useUpdateProjectTemplate: () => ({
    updateProjectTemplate: state.updateProjectTemplate,
    isUpdatingTemplate: false,
  }),
  getProjectId: (project: Record<string, any>) => project.id || project._id || "",
  getProjectStatusDisplay: (status: string) => ({
    label: status === "active" ? "Active" : "Inactive",
  }),
}));

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
    state.canManageTemplates = false;
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
    expect(trigger).toHaveFocus();
  });

  it("preserves template creation choices", async () => {
    const user = userEvent.setup();
    state.templates = [project({ id: "template-1", name: "Starter", templateIncludeItems: true })];
    render(<ProjectsPage />);

    await user.click(screen.getByRole("button", { name: "New Project" }));
    await user.type(screen.getByLabelText(/Project Name/), "From starter");
    await user.selectOptions(screen.getByLabelText(/Template Project/), "template-1");
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
    state.projects = [project(), project({ id: "project-2", name: "Disabled", isActive: false })];
    render(<ProjectsPage />);

    await user.click(screen.getByRole("button", { name: /Operations Workspace/ }));
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
});
