// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectManagementPage from "./ProjectManagementPage";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));

vi.mock("react-router-dom", () => ({ Navigate: () => null }));
vi.mock("../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({
    isInProject: true,
    currentProject: { name: "Demo Project", slug: "demo", isActive: true },
  }),
}));
vi.mock("../context/User.context", () => ({
  useUserContext: () => ({ user: { roles: ["project_developer"] } }),
}));
vi.mock("../components/panelComponents/common/ContainersSection", () => ({
  ContainersSection: () => <section aria-label="Collections" />,
}));
vi.mock("../components/panelComponents/common/PagesSection", () => ({
  PagesSection: () => <section aria-label="Pages" />,
}));
vi.mock("../components/panelComponents/common/AuditLogsAuthorizationSection", () => ({
  AuditLogsAuthorizationSection: () => <section aria-label="Audit logs" />,
}));

describe("ProjectManagementPage", () => {
  it("renders one project heading with status and role context", () => {
    render(
      <main>
        <ProjectManagementPage />
      </main>,
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const heading = screen.getByRole("heading", { name: "Demo Project" });
    expect(heading).toBeInTheDocument();
    expect(heading.closest("header")).toBeInTheDocument();
    expect(screen.getByText("Active")).toHaveAttribute("data-variant", "success");
    expect(screen.getByText("project_developer")).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("region", { name: "Collections" }),
    );
  });

  it("keeps the project name, slug, and status in the same header row", () => {
    render(
      <main>
        <ProjectManagementPage />
      </main>,
    );

    const heading = screen.getByRole("heading", { name: "Demo Project" });
    const header = heading.closest("header");
    const slug = screen.getByText("demo");
    const status = screen.getByText("Active");

    expect(header?.parentElement).toHaveClass("py-3", "sm:py-3");
    expect(slug.parentElement).toBe(heading.parentElement);
    expect(status.parentElement).toBe(heading.parentElement);
  });
});
