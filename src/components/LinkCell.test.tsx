// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LinkCell } from "./LinkCell";
import type { LinkType } from "../utils/api/container";

vi.mock("react-router-dom", () => ({ useNavigate: () => vi.fn() }));
vi.mock("../hooks/useTenant", () => ({ default: () => ({ currentTenant: { slug: "tenant" } }) }));
vi.mock("../hooks/useCurrentProject", () => ({ useCurrentProject: () => ({ currentProject: { slug: "project" } }) }));

describe("LinkCell URL safety", () => {
  it.each<LinkType>(["external", "internal", "email", "phone", "file"])("renders unsafe %s links as plain labels", (linkType) => {
    render(<LinkCell field={{ name: "target", type: "string", frontend: { linkType, linkTemplate: "{{value}}", linkLabelField: "label" } }} row={{ target: "javascript:alert(1)", label: "Record" }} />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Record")).toBeInTheDocument();
  });

  it("keeps tenant and project scoping for safe internal paths", () => {
    render(<LinkCell field={{ name: "target", type: "string", frontend: { linkType: "internal", linkTemplate: "/records/{{value}}" } }} row={{ target: "123" }} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/t/tenant/p/project/records/123");
  });
});
