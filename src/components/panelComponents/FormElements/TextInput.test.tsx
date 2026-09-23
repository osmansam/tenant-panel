// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("updates the visible value when its controlled value prop changes", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <TextInput
        label="Field Name"
        type="text"
        value=""
        onChange={onChange}
      />,
    );

    rerender(
      <TextInput
        label="Field Name"
        type="text"
        value="product"
        onChange={onChange}
      />,
    );

    expect(screen.getByRole("textbox")).toHaveValue("product");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("associates its label with the input", () => {
    render(
      <TextInput
        label="Field Name"
        type="text"
        value="product"
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: /field name/i }),
    ).toBeInTheDocument();
  });

  it("continues to emit normalized numeric user input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TextInput
        label="Quantity"
        type="number"
        value={1}
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("spinbutton", { name: /quantity/i });
    await user.clear(input);
    await user.type(input, "8");

    expect(onChange).toHaveBeenLastCalledWith(8);
  });
});
