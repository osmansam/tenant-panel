// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  CheckboxField,
  FileField,
  NumberField,
  TextField,
} from ".";

describe("shared form fields", () => {
  it("composes explicit IDs, descriptions, errors, and required state", () => {
    render(
      <TextField
        id="customer-name"
        name="name"
        label="Customer name"
        description="Shown on the invoice"
        error="Name is required"
        required
        value=""
        onChange={() => undefined}
      />,
    );

    const control = screen.getByRole("textbox", { name: /customer name/i });
    expect(control).toHaveAttribute("id", "customer-name");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control.getAttribute("aria-describedby")).toBe(
      "customer-name-description customer-name-error",
    );
    expect(screen.getByText("Name is required")).toHaveAttribute(
      "id",
      "customer-name-error",
    );
    expect(screen.getByText("Name is required")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getByText("required")).toHaveClass("sr-only");
  });

  it("generates sanitized, distinct control IDs", () => {
    render(
      <>
        <TextField name="first" label="First" value="" onChange={() => undefined} />
        <TextField name="second" label="Second" value="" onChange={() => undefined} />
      </>,
    );
    const firstId = screen.getByRole("textbox", { name: "First" }).id;
    const secondId = screen.getByRole("textbox", { name: "Second" }).id;
    expect(firstId).not.toContain(":");
    expect(firstId).not.toBe(secondId);
  });

  it("immediately reflects an externally controlled value", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <TextField name="name" label="Name" value="before" onChange={onChange} />,
    );
    rerender(
      <TextField name="name" label="Name" value="after" onChange={onChange} />,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("after");
  });

  it("reveals and hides password values without changing the value", async () => {
    const user = userEvent.setup();
    render(
      <TextField
        name="password"
        label="Password"
        type="password"
        value="secret"
        onChange={() => undefined}
      />,
    );
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("uses a native checkbox and emits its checked state", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CheckboxField
        name="enabled"
        label="Enabled"
        value={false}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Enabled" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("preserves empty number editing and clamps numeric values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberField
        name="quantity"
        label="Quantity"
        value={2}
        min={1}
        max={5}
        onChange={onChange}
      />,
    );
    const input = screen.getByRole("spinbutton", { name: "Quantity" });
    await user.clear(input);
    expect(onChange).toHaveBeenCalledWith("");
    await user.type(input, "9");
    expect(onChange).toHaveBeenLastCalledWith(5);
  });

  it("exposes accessible number step buttons", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberField
        name="quantity"
        label="Quantity"
        value={2}
        min={1}
        max={5}
        showStepButtons
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Increase Quantity" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("emits selected files without transforming them", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FileField
        name="image"
        label="Image"
        value={null}
        accept="image/png"
        onChange={onChange}
      />,
    );
    const file = new File(["image"], "avatar.png", { type: "image/png" });
    await user.upload(screen.getByLabelText("Image"), file);
    expect(onChange).toHaveBeenCalledWith(file);
    expect(screen.getByText(/accepted file types: image\/png/i)).toBeVisible();
  });

  it("removes an already selected file without transforming the callback", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const file = new File(["image"], "avatar.png", { type: "image/png" });
    render(
      <FileField
        name="image"
        label="Image"
        value={file}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
