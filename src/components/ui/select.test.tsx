// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select, type SelectOption } from ".";

const options = [
  { value: "", label: "Empty value" },
  { value: 0, label: "Zero" },
  { value: "one", label: "One" },
] satisfies SelectOption<string | number>[];

describe("Select", () => {
  it("preserves string, numeric zero, and empty-string option values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select
        aria-label="Value"
        value={null}
        options={options}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Value" }));
    await user.click(screen.getByText("Zero"));
    expect(onChange).toHaveBeenLastCalledWith(
      options[1],
      expect.objectContaining({ action: "select-option" }),
    );

    await user.click(screen.getByRole("combobox", { name: "Value" }));
    await user.click(screen.getByText("Empty value"));
    expect(onChange).toHaveBeenLastCalledWith(
      options[0],
      expect.objectContaining({ action: "select-option" }),
    );
  });

  it("emits arrays in multiple mode without duplicating selections", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const alpha = { value: "a", label: "Alpha" };
    const beta = { value: "b", label: "Beta" };
    render(
      <Select
        aria-label="Tags"
        value={[alpha]}
        options={[alpha, beta]}
        onChange={onChange}
        multiple
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Tags" }));
    await user.click(screen.getByText("Beta"));
    expect(onChange).toHaveBeenCalledWith(
      [alpha, beta],
      expect.objectContaining({ action: "select-option" }),
    );
  });

  it("matches Turkish characters during search", async () => {
    const user = userEvent.setup();
    render(
      <Select
        aria-label="Contact"
        value={null}
        options={[
          { value: "cagri", label: "Çağrı" },
          { value: "diger", label: "Diğer" },
        ]}
        onChange={() => undefined}
      />,
    );

    await user.type(screen.getByRole("combobox", { name: "Contact" }), "cagri");
    expect(screen.getByText("Çağrı")).toBeVisible();
    expect(screen.queryByText("Diğer")).not.toBeInTheDocument();
  });

  it("supports keyboard open, navigation, selection, and Escape close", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select
        aria-label="Status"
        value={null}
        options={[
          { value: "open", label: "Open" },
          { value: "closed", label: "Closed" },
        ]}
        onChange={onChange}
      />,
    );

    const combobox = screen.getByRole("combobox", { name: "Status" });
    await user.click(combobox);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith(
      { value: "closed", label: "Closed" },
      expect.objectContaining({ action: "select-option" }),
    );

    await user.click(combobox);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("portals its menu outside a clipped dialog container", async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="clipped-dialog" style={{ overflow: "hidden" }}>
        <Select
          aria-label="Schema"
          value={null}
          options={[{ value: "orders", label: "Orders" }]}
          onChange={() => undefined}
        />
      </div>,
    );

    await user.click(screen.getByRole("combobox", { name: "Schema" }));
    const listbox = screen.getByRole("listbox");
    expect(document.body).toContainElement(listbox);
    expect(within(screen.getByTestId("clipped-dialog")).queryByRole("listbox"))
      .not.toBeInTheDocument();
  });

  it("renders invalid, disabled, read-only, loading, and empty states accessibly", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Select
        aria-label="State"
        aria-describedby="state-error"
        value={null}
        options={[]}
        onChange={onChange}
        invalid
        required
      />,
    );

    const invalid = screen.getByRole("combobox", { name: "State" });
    expect(invalid).toHaveAttribute("aria-invalid", "true");
    expect(invalid).toHaveAttribute("aria-required", "true");
    expect(invalid).toHaveAttribute("aria-describedby", "state-error");
    await user.click(invalid);
    expect(screen.getByText("No options")).toBeVisible();

    rerender(
      <Select
        aria-label="State"
        value={null}
        options={options}
        onChange={onChange}
        loading
      />,
    );
    expect(screen.getByRole("combobox", { name: "State" })).toHaveAttribute(
      "aria-busy",
      "true",
    );

    rerender(
      <Select
        aria-label="State"
        value={null}
        options={options}
        onChange={onChange}
        disabled
      />,
    );
    expect(screen.queryByRole("combobox", { name: "State" })).not.toBeInTheDocument();

    rerender(
      <Select
        aria-label="State"
        value={null}
        options={options}
        onChange={onChange}
        readOnly
      />,
    );
    expect(screen.queryByRole("combobox", { name: "State" })).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("adapts native-style option children and change events", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select aria-label="Legacy status" value="open" onChange={onChange}>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Legacy status" });
    expect(select.closest("[data-control-size]"))?.toHaveAttribute(
      "data-control-size",
      "md",
    );
    await user.click(select);
    await user.click(screen.getByRole("option", { name: "Closed" }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: "closed" }) }),
    );
  });

  it("strips legacy box-chrome classes from the outer wrapper and infers compact controlSize", () => {
    render(
      <Select
        aria-label="Compact field"
        value="open"
        onChange={() => undefined}
        className="w-full h-8 px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="open">Open</option>
      </Select>,
    );

    const wrapper = screen
      .getByRole("combobox", { name: "Compact field" })
      .closest("[data-control-size]");
    expect(wrapper).toHaveAttribute("data-control-size", "sm");
    expect(wrapper).toHaveClass("w-full");
    expect(wrapper).not.toHaveClass("border", "border-neutral-300", "px-3", "py-2", "rounded-lg");
  });
});
