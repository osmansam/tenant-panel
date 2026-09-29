// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PagesPage from "./PagesPage";

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
vi.mock("../components/panelComponents/common/PagesSection", () => ({
  PagesSection: () => <section aria-label="Pages" />,
}));
vi.mock("../components/panelComponents/common/AuditLogsAuthorizationSection", () => ({
  AuditLogsAuthorizationSection: () => <section aria-label="Audit logs authorization" />,
}));

describe("PagesPage", () => {
  it("renders the project heading and isolated Pages section", () => {
    render(
      <main>
        <PagesPage />
      </main>,
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Demo Project" })).toBeInTheDocument();
    expect(screen.getByText("Active")).toHaveAttribute("data-variant", "success");
    expect(screen.getByText("project_developer")).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("region", { name: "Pages" }),
    );
    expect(screen.queryByRole("region", { name: "Containers" })).not.toBeInTheDocument();
  });

  it("separates page management and audit authorization into tabs", async () => {
    const user = userEvent.setup();
    render(
      <main>
        <PagesPage />
      </main>,
    );

    const pagesTab = screen.getByRole("tab", { name: "Pages" });
    expect(pagesTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("region", { name: "Pages" })).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "Audit logs authorization" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Audit Logs" }));

    expect(screen.getByRole("tab", { name: "Audit Logs" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("region", { name: "Audit logs authorization" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Pages" })).not.toBeInTheDocument();
  });
});
