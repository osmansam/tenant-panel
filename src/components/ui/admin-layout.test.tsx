// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Badge,
  EmptyState,
  PageActions,
  PageHeader,
  PageShell,
  ResponsiveActionBar,
} from ".";

describe("admin layout primitives", () => {
  it("renders_page_heading_and_context_in_landmark_order", () => {
    render(
      <main>
        <PageShell>
          <PageHeader
            title="Projects"
            description="Manage tenant projects"
            context={<span>12 projects</span>}
            actions={<PageActions aria-label="Project actions">Create project</PageActions>}
          />
        </PageShell>
      </main>,
    );

    expect(screen.getAllByRole("main")).toHaveLength(1);
    const main = screen.getByRole("main");
    const heading = screen.getByRole("heading", { name: "Projects", level: 1 });
    const context = screen.getByText("12 projects");
    const actions = screen.getByRole("group", { name: "Project actions" });

    expect(main).toContainElement(heading);
    expect(heading.compareDocumentPosition(context)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(context.compareDocumentPosition(actions)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("exposes_empty_state_as_named_status", () => {
    render(
      <EmptyState
        title="No projects"
        description="Create a project to get started."
        action={<button type="button">Create project</button>}
      />,
    );

    const status = screen.getByRole("status", { name: "No projects" });
    expect(status).toHaveTextContent("Create a project to get started.");
    expect(status).toContainElement(
      screen.getByRole("button", { name: "Create project" }),
    );
  });

  it("uses_semantic_badge_variants", () => {
    render(
      <>
        <Badge variant="neutral">Draft</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="danger">Failed</Badge>
      </>,
    );

    expect(screen.getByText("Draft")).toHaveAttribute("data-variant", "neutral");
    expect(screen.getByText("Active")).toHaveAttribute("data-variant", "success");
    expect(screen.getByText("Failed")).toHaveAttribute("data-variant", "danger");
  });

  it("keeps_long_actions_in_a_wrapping_action_region", () => {
    render(
      <ResponsiveActionBar aria-label="Container actions" align="between">
        <button type="button">Create with a very long translated label</button>
        <button type="button">Upload spreadsheet</button>
      </ResponsiveActionBar>,
    );

    const actions = screen.getByRole("group", { name: "Container actions" });
    expect(actions).toHaveAttribute("data-layout", "wrapping-actions");
    expect(actions).toHaveAttribute("data-align", "between");
  });
});
