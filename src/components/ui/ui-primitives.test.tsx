// @vitest-environment jsdom
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Checkbox, Input } from ".";

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

  it("keeps checkbox semantics native", () => {
    render(<Checkbox aria-label="Enabled" checked readOnly />);
    expect(screen.getByRole("checkbox", { name: "Enabled" })).toBeChecked();
  });
});
