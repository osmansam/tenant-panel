// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-control-size",
      "md",
    );
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

  it("uses the shared checkbox control", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <TextInput label="Published" type="checkbox" value={false} onChange={onChange} />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Published" });
    expect(checkbox).toHaveAttribute("data-control-size", "md");
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("provides accessible password and number controls", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <TextInput label="Password" type="password" value="secret" onChange={onChange} />,
    );
    const password = screen.getByLabelText("Password");
    expect(password).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Show Password" }));
    expect(password).toHaveAttribute("type", "text");

    rerender(
      <TextInput
        label="Quantity"
        type="number"
        value={2}
        minNumber={0}
        maxNumber={3}
        isNumberButtonsActive
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Increment Quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrement Quantity" }));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("preserves debounced updates", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(
      <TextInput
        label="Search"
        type="text"
        value=""
        isDebounce
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Search" }), {
      target: { value: "query" },
    });
    expect(onChange).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(onChange).toHaveBeenCalledWith("query");
    vi.useRealTimers();
  });

  it("connects validation feedback to its field", () => {
    render(<TextInput label="Work email" type="email" value="bad" error="Enter a valid email" onChange={vi.fn()} />);
    const input = screen.getByRole("textbox", { name: "Work email" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email");
  });

});
