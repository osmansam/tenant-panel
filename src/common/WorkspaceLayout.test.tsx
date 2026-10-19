// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { GeneralContextProvider } from "../context/General.context";
import { WorkspaceLayout } from "./WorkspaceLayout";
import Loading from "./Loading";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));

describe("workspace navigation", () => {
  it("offers navigation and a skip target on every protected page", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    render(<MemoryRouter><GeneralContextProvider><WorkspaceLayout><h1>Projects</h1></WorkspaceLayout></GeneralContextProvider></MemoryRouter>);
    const menu = screen.getByRole("button", { name: "Open navigation" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("announces background work without adding another heading or blocking actions", async () => {
    let clicked = false;
    render(<><button onClick={() => { clicked = true; }}>Continue working</button><Loading /></>);
    expect(screen.getByRole("status")).toHaveTextContent("Working");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Continue working" }));
    expect(clicked).toBe(true);
  });
});
