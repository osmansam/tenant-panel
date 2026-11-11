// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisualBuilderPageLink, canOpenVisualBuilder, runtimePageURL } from "./pageLinks";

describe("Tenant Panel visual authoring entry", () => {
  it("links a writable content page to the panel's own editor", () => {
    render(<VisualBuilderPageLink page={{ id: "page-1", name: "Inventory" }} canEdit />);
    expect(screen.getByRole("link", { name: "Open visual builder: Inventory" })).toHaveAttribute("href", "/pages/visual-builder");
  });
  it("hides authoring for read-only users and group-only pages", () => {
    const { rerender } = render(<VisualBuilderPageLink page={{ id: "page-1", name: "Inventory" }} canEdit={false} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    rerender(<VisualBuilderPageLink page={{ id: "group", name: "Group", isGroupOnly: true }} canEdit />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(canOpenVisualBuilder(["project_developer"], true)).toBe(true);
    expect(canOpenVisualBuilder(["project_viewer"], true)).toBe(false);
    expect(canOpenVisualBuilder(["admin"], true)).toBe(false);
    expect(canOpenVisualBuilder(["project_developer"], false)).toBe(false);
  });
  it("opens rendered pages on the runtime host with the correct project scope", () => {
    expect(runtimePageURL("https://app.example.com", { tenant: "acme", project: "shop" }, "orders/details")).toBe("https://app.example.com/t/acme/p/shop/orders/details");
    expect(runtimePageURL("javascript:alert(1)", { tenant: "acme", project: "shop" }, "orders")).toBeUndefined();
    expect(runtimePageURL(undefined, { tenant: "acme", project: "shop" }, "orders")).toBeUndefined();
  });
});
