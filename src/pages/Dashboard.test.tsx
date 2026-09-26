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
  allTenants: [] as Array<{ id: string; name: string; slug: string }>,
  setIsSidebarOpen: vi.fn(),
  switchTenant: vi.fn(),
  tenantLogout: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));
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
vi.mock("../utils/api/auth", () => ({
  useTenantLogout: () => ({ tenantLogout: state.tenantLogout }),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    state.currentTenant = {
      id: "tenant-1",
      name: "A very long tenant name that still belongs in one page heading",
      slug: "long-tenant",
    };
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

  it("presents unavailable quick actions without enabled controls", () => {
    render(<Dashboard />);

    for (const label of ["View Analytics", "Manage Users", "Settings", "View Logs"]) {
      expect(screen.queryByRole("button", { name: new RegExp(label) })).not.toBeInTheDocument();
      expect(screen.getByText(label)).toBeInTheDocument();
    }
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
