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
  useProjects: () => ({ data: state.projects, isLoading: false }),
}));

vi.mock("../utils/api/container", () => ({
  useContainers: () => ({ data: state.containers, isLoading: false }),
}));

vi.mock("../utils/api/page", () => ({
  useGetTenantPages: () => ({ data: state.pages, isLoading: false }),
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
    expect(screen.getByText("project_developer")).toBeInTheDocument();
  });

  it("renders actionable quick action destinations and navigates on click", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const projectsButtons = screen.getAllByRole("button", { name: /Projects/i });
    expect(projectsButtons.length).toBeGreaterThanOrEqual(1);
    await user.click(projectsButtons[0]);
    expect(state.navigate).toHaveBeenCalledWith("/projects");

    expect(screen.getAllByRole("button", { name: /Collections/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Pages/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Integrations/i })[0]).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Settings & Branding/i })).toBeInTheDocument();
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
});
