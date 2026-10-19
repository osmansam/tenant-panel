// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { UnsavedChangesGuard } from "./UnsavedChangesGuard";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (value: string) => value }) }));

describe("unsaved workspace navigation", () => {
  it("blocks browser Back, keeps the draft on cancel, and navigates only after discard", async () => {
    const router = createMemoryRouter([
      { path: "/projects", element: <h1>Projects</h1> },
      { path: "/pages", element: <><h1>Page draft</h1><UnsavedChangesGuard when /></> },
    ], { initialEntries: ["/projects", "/pages"], initialIndex: 1 });
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    await act(async () => { await router.navigate(-1); });
    expect(screen.getByRole("dialog", { name: "Leave without saving?" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/pages");
    await user.click(screen.getByRole("button", { name: "Keep editing" }));
    expect(screen.getByRole("heading", { name: "Page draft" })).toBeInTheDocument();
    await act(async () => { await router.navigate(-1); });
    await user.click(screen.getByRole("button", { name: "Discard and leave" }));
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });
  it("allows navigation when the workspace has no unsaved changes", async () => {
    const router = createMemoryRouter([
      { path: "/projects", element: <h1>Projects</h1> },
      { path: "/pages", element: <UnsavedChangesGuard when={false} /> },
    ], { initialEntries: ["/projects", "/pages"], initialIndex: 1 });
    render(<RouterProvider router={router} />);
    await act(async () => { await router.navigate(-1); });
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
