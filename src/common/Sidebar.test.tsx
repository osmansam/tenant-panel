// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

const state = vi.hoisted(() => ({
  path: "/dashboard",
  user: {
    email: "developer@example.com",
    roles: ["tenant_viewer"],
    roleScope: "tenant" as "tenant" | "project",
    projectId: undefined as string | undefined,
    projectName: undefined as string | undefined,
    projectSlug: undefined as string | undefined,
  },
  project: undefined as { id: string; name: string; slug: string } | undefined,
  isInProject: false,
  isSidebarOpen: true,
  navigate: vi.fn(),
  setUser: vi.fn(),
  clearCurrentProject: vi.fn(),
  switchBackToTenant: vi.fn(),
  setIsSidebarOpen: vi.fn(),
  resetGeneralContext: vi.fn(),
  clearQueryClient: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useLocation: () => ({ pathname: state.path }),
    useNavigate: () => state.navigate,
  };
});

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useQueryClient: () => ({ clear: state.clearQueryClient }),
  };
});

vi.mock("../context/User.context", () => ({
  useUserContext: () => ({ user: state.user, setUser: state.setUser }),
}));

vi.mock("../context/General.context", () => ({
  useGeneralContext: () => ({
    isSidebarOpen: state.isSidebarOpen,
    setIsSidebarOpen: state.setIsSidebarOpen,
    resetGeneralContext: state.resetGeneralContext,
  }),
}));

vi.mock("../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({
    currentProject: state.project,
    clearCurrentProject: state.clearCurrentProject,
    isInProject: state.isInProject,
  }),
}));

vi.mock("../utils/api/auth", () => ({
  useSwitchBackToTenant: () => ({ switchBackToTenant: state.switchBackToTenant }),
}));

vi.mock("./SidebarTooltip", () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

describe("Sidebar", () => {
  beforeEach(() => {
    state.path = "/dashboard";
    state.user.roles = ["tenant_viewer"];
    state.user.roleScope = "tenant";
    state.user.projectId = undefined;
    state.user.projectName = undefined;
    state.user.projectSlug = undefined;
    state.project = undefined;
    state.isInProject = false;
    state.isSidebarOpen = true;
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows tenant routes and hides project or unauthorized routes", () => {
    render(<Sidebar />);

    expect(screen.getByRole("button", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Collections" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pages" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Localization" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Integrations" })).not.toBeInTheDocument();
  });

  it("shows project routes and switches back without losing user identity", async () => {
    const user = userEvent.setup();
    state.isInProject = true;
    state.project = { id: "project-1", name: "Demo Project", slug: "demo" };
    state.user.roles = ["project_developer"];
    state.user.roleScope = "project";
    state.user.projectId = "project-1";
    state.user.projectName = "Demo Project";
    state.user.projectSlug = "demo";

    render(<Sidebar />);

    expect(screen.getByRole("button", { name: "Collections" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Localization" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Integrations" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Projects" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Back to Tenant" }));

    expect(state.clearCurrentProject).toHaveBeenCalledOnce();
    expect(state.setUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "developer@example.com",
        roleScope: "tenant",
        projectId: undefined,
      }),
    );
    expect(state.switchBackToTenant).toHaveBeenCalledOnce();
  });

  it("exposes collapse and expand controls", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Sidebar />);

    await user.click(screen.getByRole("button", { name: "Collapse Sidebar" }));
    expect(state.setIsSidebarOpen).toHaveBeenCalledWith(false);

    state.isSidebarOpen = false;
    rerender(<Sidebar />);
    await user.click(screen.getByRole("button", { name: "Expand Sidebar" }));
    expect(state.setIsSidebarOpen).toHaveBeenCalledWith(true);
  });

  it("clears local and query state on logout", async () => {
    const user = userEvent.setup();
    localStorage.setItem("token", "secret");
    render(<Sidebar />);

    await user.click(screen.getByRole("button", { name: "Logout" }));

    expect(localStorage.getItem("token")).toBeNull();
    expect(state.setUser).toHaveBeenCalledWith(undefined);
    expect(state.clearQueryClient).toHaveBeenCalledOnce();
    expect(state.navigate).toHaveBeenCalledWith("/login");
  });

  it("marks the active route as current", () => {
    state.path = "/dashboard";
    render(<Sidebar />);

    expect(screen.getByRole("button", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
