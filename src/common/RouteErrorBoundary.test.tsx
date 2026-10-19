// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
function BrokenPage(): JSX.Element { throw new Error("Unexpected page error"); }

describe("page recovery", () => {
  afterEach(() => vi.restoreAllMocks());
  it("keeps a recoverable error on screen when a page fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    let broken = true;
    function Page() { return broken ? <BrokenPage /> : <h1>Projects</h1>; }
    render(<RouteErrorBoundary resetKey="/projects"><Page /></RouteErrorBoundary>);
    expect(screen.getByRole("alert")).toHaveTextContent("This page could not be displayed");
    broken = false;
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });
  it("recovers on navigation to a different page", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { rerender } = render(<RouteErrorBoundary resetKey="/broken"><BrokenPage /></RouteErrorBoundary>);
    rerender(<RouteErrorBoundary resetKey="/projects"><h1>Projects</h1></RouteErrorBoundary>);
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });

  it("offers a full reload when an optional page module fails to download", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    function MissingModule(): JSX.Element { throw new TypeError("Failed to fetch dynamically imported module"); }
    render(<RouteErrorBoundary resetKey="/projects"><MissingModule /></RouteErrorBoundary>);
    expect(screen.getByRole("button", { name: "Reload page" })).toBeInTheDocument();
  });


  it("offers a reload when a page stylesheet fails to preload", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    function MissingStyles(): JSX.Element { throw new Error("Unable to preload CSS for /assets/table.css"); }
    render(<RouteErrorBoundary resetKey="/collections"><MissingStyles /></RouteErrorBoundary>);
    expect(screen.getByRole("button", { name: "Reload page" })).toBeInTheDocument();
  });

});
