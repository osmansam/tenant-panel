// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { UserContextProvider, useUserContext } from "./User.context";
import { useTenant } from "../hooks/useTenant";
import { useCurrentProject } from "../hooks/useCurrentProject";

function ContextStatus() {
  const { user } = useUserContext();
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();
  return <><p>{user?.email || "Sign in to continue"}</p><p>{currentTenant?.name || "No tenant selected"}</p><p>{currentProject?.name || "No project selected"}</p></>;
}

describe("persisted workspace recovery", () => {
  beforeEach(() => localStorage.clear());
  it("recovers from malformed user data instead of rendering a blank application", () => {
    localStorage.setItem("user", "broken-json");
    render(<UserContextProvider><ContextStatus /></UserContextProvider>);
    expect(screen.getByText("Sign in to continue")).toBeInTheDocument();
    expect(localStorage.getItem("user")).toBeNull();
  });
  it("ignores malformed tenant and project records", () => {
    localStorage.setItem("currentTenant", "broken-json");
    localStorage.setItem("currentProject", "[]");
    render(<UserContextProvider><ContextStatus /></UserContextProvider>);
    expect(screen.getByText("No tenant selected")).toBeInTheDocument();
    expect(screen.getByText("No project selected")).toBeInTheDocument();
  });
  it("preserves valid profile and workspace information", () => {
    localStorage.setItem("user", JSON.stringify({ id: "user-1", email: "alex@example.com", roles: ["project_developer"] }));
    localStorage.setItem("currentTenant", JSON.stringify({ id: "tenant-1", name: "Acme Studio", slug: "acme" }));
    localStorage.setItem("currentProject", JSON.stringify({ id: "project-1", name: "Operations", slug: "operations" }));
    render(<UserContextProvider><ContextStatus /></UserContextProvider>);
    expect(screen.getByText("alex@example.com")).toBeInTheDocument();
    expect(screen.getByText("Acme Studio")).toBeInTheDocument();
    expect(screen.getByText("Operations")).toBeInTheDocument();
  });
});
