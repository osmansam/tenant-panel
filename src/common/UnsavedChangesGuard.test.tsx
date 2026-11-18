// @vitest-environment jsdom
import { transferableAbortController } from "node:util";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UnsavedChangesGuard } from "./UnsavedChangesGuard";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (value: string) => value }) }));

describe("unsaved workspace navigation", () => {
  const nativeAbort = transferableAbortController();
  const routers: ReturnType<typeof createMemoryRouter>[] = [];

  beforeEach(() => {
    // Data-router navigation uses Node's Fetch Request in jsdom. Newer Undici
    // versions reject jsdom signals, so keep its abort primitives in one realm.
    vi.stubGlobal("AbortController", nativeAbort.constructor);
    vi.stubGlobal("AbortSignal", nativeAbort.signal.constructor);
  });

  afterEach(() => {
    for (const router of routers) router.dispose();
    routers.length = 0;
    vi.unstubAllGlobals();
  });

  it("blocks browser Back, keeps the draft on cancel, and navigates only after discard", async () => {
    const router = createMemoryRouter([
      { path: "/projects", element: <h1>Projects</h1> },
      { path: "/pages", element: <><h1>Page draft</h1><UnsavedChangesGuard when /></> },
    ], { initialEntries: ["/projects", "/pages"], initialIndex: 1 });
    routers.push(router);
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    await act(async () => { await router.navigate(-1); });
    expect(await screen.findByRole("dialog", { name: "Leave without saving?" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/pages");
    await user.click(screen.getByRole("button", { name: "Keep editing" }));
    expect(screen.getByRole("heading", { name: "Page draft" })).toBeInTheDocument();
    await act(async () => { await router.navigate(-1); });
    await user.click(screen.getByRole("button", { name: "Discard and leave" }));
    expect(await screen.findByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });
  it("allows navigation when the workspace has no unsaved changes", async () => {
    const router = createMemoryRouter([
      { path: "/projects", element: <h1>Projects</h1> },
      { path: "/pages", element: <UnsavedChangesGuard when={false} /> },
    ], { initialEntries: ["/projects", "/pages"], initialIndex: 1 });
    routers.push(router);
    render(<RouterProvider router={router} />);
    await act(async () => { await router.navigate(-1); });
    expect(await screen.findByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
