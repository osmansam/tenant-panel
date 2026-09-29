// @vitest-environment jsdom
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge, Button, Checkbox, Input } from ".";

describe("shared UI primitives", () => {
  it("forwards input state and refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Name" invalid disabled />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  it("makes a loading button busy and non-interactive", () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("uses shared semantic variants and stable interaction geometry", () => {
    render(
      <>
        <Button variant="success" size="sm">Approve</Button>
        <Button variant="warning" size="md">Review</Button>
        <Button variant="icon" size="lg" aria-label="More actions">+</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: "Approve" })).toHaveClass(
      "h-ui-sm",
      "border",
      "border-transparent",
      "bg-ui-success",
      "ui-focus-ring",
    );
    expect(screen.getByRole("button", { name: "Review" })).toHaveClass(
      "h-ui-md",
      "border",
      "border-transparent",
      "ui-focus-ring",
    );
    expect(screen.getByRole("button", { name: "More actions" })).toHaveClass(
      "h-ui-lg",
      "aspect-square",
      "p-0",
      "ui-focus-ring",
    );
  });

  it("keeps shared button content shrinkable inside constrained widths", () => {
    render(<Button className="w-24">A very long translated action label</Button>);

    const content = screen.getByRole("button").firstElementChild;
    expect(content).toHaveClass("min-w-0", "max-w-full");
  });

  it("keeps Badge variants semantic", () => {
    render(<Badge variant="info">Connected</Badge>);
    expect(screen.getByText("Connected")).toHaveAttribute("data-variant", "info");
  });

  it("keeps checkbox semantics native", () => {
    render(<Checkbox aria-label="Enabled" checked readOnly />);
    expect(screen.getByRole("checkbox", { name: "Enabled" })).toBeChecked();
  });
});
