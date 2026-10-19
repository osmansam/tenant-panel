// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Dashboard from "./Dashboard";

const state = vi.hoisted(() => ({
  user: {
    name: "Developer",
    email: "developer@example.com",
    role: "project_developer",
    roles: ["project_developer", "project_editor"],
  },
  currentTenant: {
    id: "tenant-1",
    name: "A very long tenant name that still belongs in one page heading",
    slug: "long-tenant",
  } as { id: string; name: string; slug: string } | null,
  currentProject: null as { id: string; name: string; slug: string } | null,
  projects: [] as Array<{ id: string; name: string; slug: string; isActive: boolean }>,
  containers: [] as Array<{ id: string; schemaName: string }>,
  pages: [] as Array<{ id: string; name: string }>,
  integrations: [] as Array<{ id: string; name: string }>,
  allTenants: [] as Array<{ id: string; name: string; slug: string }>,
  navigate: vi.fn(),
  setIsSidebarOpen: vi.fn(),
  resourceLoading: false,
  resourceError: false,
  refetch: vi.fn(),
  switchTenant: vi.fn(),
  tenantLogout: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (options && typeof options === "object") {
        return Object.entries(options).reduce(
          (acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)),
          key,
        );
      }
      return key;
    },
  }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => state.navigate,
  };
});

vi.mock("../context/User.context", () => ({
  useUserContext: () => ({ user: state.user }),
}));

vi.mock("../context/General.context", () => ({
  useGeneralContext: () => ({ setIsSidebarOpen: state.setIsSidebarOpen }),
}));

vi.mock("../hooks/useTenant", () => ({
  default: () => ({
    currentTenant: state.currentTenant,
    allTenants: state.allTenants,
    hasMultipleTenants: () => state.allTenants.length > 1,
    switchTenant: state.switchTenant,
  }),
}));

vi.mock("../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({
    currentProject: state.currentProject,
    isInProject: Boolean(state.currentProject),
  }),
}));

vi.mock("../utils/api/auth", () => ({
  useTenantLogout: () => ({ tenantLogout: state.tenantLogout }),
}));

vi.mock("../utils/api/project", () => ({
  useProjectsQuery: () => ({ data: state.projects, isLoading: state.resourceLoading, error: state.resourceError ? new Error("Offline") : null, refetch: state.refetch }),
}));

vi.mock("../utils/api/container", () => ({
  useContainersQuery: () => ({ data: state.containers, isLoading: false, error: null, refetch: state.refetch }),
}));

vi.mock("../utils/api/page", () => ({
  useGetTenantPagesQuery: () => ({ data: state.pages, isLoading: false, error: null, refetch: state.refetch }),
}));

vi.mock("../utils/api/integration", () => ({
  useIntegrationCredentials: () => ({ data: state.integrations, isLoading: false }),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    state.currentTenant = {
      id: "tenant-1",
      name: "A very long tenant name that still belongs in one page heading",
      slug: "long-tenant",
    };
    state.currentProject = null;
    state.resourceLoading = false;
    state.resourceError = false;
    state.user.roles = ["project_developer", "project_editor"];
    state.projects = [
      { id: "proj-1", name: "Alpha Project", slug: "alpha", isActive: true },
    ];
    state.containers = [];
    state.pages = [];
    state.integrations = [];
    state.allTenants = [];
    vi.clearAllMocks();
  });

  it("renders one tenant heading and semantic account status", () => {
    render(<Dashboard />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        name: "A very long tenant name that still belongs in one page heading",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Active")).toHaveAttribute("data-variant", "success");
    expect(screen.getByText("Project developer")).toBeInTheDocument();
  });

  it("renders project activity from the array returned by the project hook", () => {
    render(<Dashboard />);

    expect(screen.getByText("Project Alpha Project ready")).toBeInTheDocument();
    expect(screen.getByText("Slug: alpha · Status: Active")).toBeInTheDocument();
  });

  it("renders actionable quick action destinations and navigates on click", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const projectsButtons = screen.getAllByRole("button", { name: /Projects/i });
    expect(projectsButtons.length).toBeGreaterThanOrEqual(1);
    await user.click(projectsButtons[0]);
    expect(state.navigate).toHaveBeenCalledWith("/projects");

    expect(screen.queryByRole("button", { name: /Collections/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Pages/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Integrations/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Settings & Branding/i })).toBeInTheDocument();
  });

  it("uses collection terminology for project data", () => {
    state.currentProject = { id: "proj-1", name: "Alpha Project", slug: "alpha" };
    state.containers = [{ id: "collection-1", schemaName: "orders" }];

    render(<Dashboard />);

    expect(screen.getAllByText("Collections").length).toBeGreaterThan(0);
    expect(screen.queryByText("Containers")).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/\bcontainers?\b/i);
  });

  it("switches tenants with keyboard-operable tenant choices", async () => {
    const user = userEvent.setup();
    state.allTenants = [
      { id: "tenant-1", name: "Current Tenant", slug: "current" },
      { id: "tenant-2", name: "Second Tenant", slug: "second" },
    ];
    state.currentTenant = state.allTenants[0];

    render(<Dashboard />);
    await user.click(screen.getByRole("button", { name: /Second Tenant/ }));

    expect(state.switchTenant).toHaveBeenCalledWith("tenant-2");
    expect(screen.getByText("Current")).toHaveAttribute("data-variant", "info");
  });

  it("shows a stable dashboard heading when tenant context is absent", () => {
    state.currentTenant = null;
    render(<Dashboard />);

    expect(screen.getByRole("heading", { name: "Dashboard", level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Tenant context is unavailable" }),
    ).toBeInTheDocument();
  });

  it("shows project destinations according to the current project role", () => {
    state.currentProject = { id: "proj-1", name: "Alpha Project", slug: "alpha" };
    state.user.roles = ["project_viewer"];
    render(<Dashboard />);
    expect(screen.getByRole("heading", { level: 1, name: "Alpha Project" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Collections/ }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /Integrations/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Projects/ })).not.toBeInTheDocument();
    expect(screen.queryByText("Full Access")).not.toBeInTheDocument();
  });

  it("labels the total project count without calling inactive projects active", () => {
    state.projects = [
      { id: "p1", name: "Active one", slug: "active", isActive: true },
      { id: "p2", name: "Old project", slug: "old", isActive: false },
    ];
    render(<Dashboard />);
    expect(screen.getByRole("button", { name: /Projects: 2. Total projects/i })).toBeInTheDocument();
    expect(screen.queryByText("Total active projects")).not.toBeInTheDocument();
  });


  it("does not show a ready or empty workspace while project data loads", async () => {
    state.projects = [];
    state.resourceLoading = true;
    const { rerender } = render(<Dashboard />);
    expect(screen.getByRole("status", { name: "Loading workspace" })).toBeInTheDocument();
    expect(screen.queryByText("Your workspace is ready")).not.toBeInTheDocument();
    state.resourceLoading = false;
    state.resourceError = true;
    rerender(<Dashboard />);
    expect(screen.getByRole("alert")).toHaveTextContent("Workspace summary could not be loaded");
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(state.refetch).toHaveBeenCalled();
  });

});
