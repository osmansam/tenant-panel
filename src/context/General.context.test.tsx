// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { GeneralContextProvider, useGeneralContext } from "./General.context";

function NavigationProbe() {
  const { isSidebarOpen, setIsSidebarOpen } = useGeneralContext();
  return <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? "Close navigation" : "Open navigation"}</button>;
}
function renderNavigation() {
  return render(<GeneralContextProvider><NavigationProbe /></GeneralContextProvider>);
}
function resize(width: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  act(() => { window.dispatchEvent(new Event("resize")); });
}
describe("responsive navigation preferences", () => {
  beforeEach(() => { localStorage.clear(); resize(1024); });
  it("starts closed on phones while preserving the desktop preference", async () => {
    localStorage.setItem("sidebar-open", "true");
    resize(390);
    renderNavigation();
    expect(screen.getByRole("button", { name: "Open navigation" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(localStorage.getItem("sidebar-open")).toBe("true");
    await userEvent.click(screen.getByRole("button", { name: "Close navigation" }));
    resize(1280);
    expect(screen.getByRole("button", { name: "Close navigation" })).toBeInTheDocument();
  });
  it("recovers from an invalid stored preference instead of crashing", () => {
    localStorage.setItem("sidebar-open", "broken");
    renderNavigation();
    expect(screen.getByRole("button", { name: "Close navigation" })).toBeInTheDocument();
  });
  it("closes the mobile drawer when returning from desktop", async () => {
    resize(390);
    renderNavigation();
    await userEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    resize(1280);
    resize(390);
    expect(screen.getByRole("button", { name: "Open navigation" })).toBeInTheDocument();
  });
});
