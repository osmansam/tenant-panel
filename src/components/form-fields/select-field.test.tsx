// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectField } from ".";

describe("SelectField", () => {
  it("emits the original numeric option value without coercion", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SelectField
        name="quantity"
        label="Quantity"
        value={null}
        options={[{ value: 1, label: "One" }]}
        onChange={onChange}
        autoFillSingleOption={false}
      />,
    );
    await user.click(screen.getByRole("combobox", { name: "Quantity" }));
    await user.click(screen.getByText("One"));
    expect(onChange).toHaveBeenCalledWith({ value: 1, label: "One" });
  });

  it("emits multiple options as option objects", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SelectField
        name="tags"
        label="Tags"
        value={[]}
        options={[
          { value: "a", label: "Alpha" },
          { value: 2, label: "Two" },
        ]}
        onChange={onChange}
        multiple
      />,
    );
    const select = screen.getByRole("combobox", { name: "Tags" });
    await user.click(select);
    await user.click(screen.getByText("Alpha"));
    expect(onChange).toHaveBeenCalledWith([{ value: "a", label: "Alpha" }]);
  });

  it("clears with the shape appropriate to its mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SelectField
        name="status"
        label="Status"
        value={{ value: "open", label: "Open" }}
        options={[{ value: "open", label: "Open" }]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Clear Status" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("auto-fills a single option when enabled", async () => {
    const onChange = vi.fn();
    render(
      <SelectField
        name="country"
        label="Country"
        value={null}
        options={[{ value: "tr", label: "Türkiye" }]}
        onChange={onChange}
      />,
    );
    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith({ value: "tr", label: "Türkiye" }),
    );
  });

  it("normalizes Turkish characters while searching", async () => {
    const user = userEvent.setup();
    render(
      <SelectField
        name="contact"
        label="Contact"
        value={null}
        options={[
          { value: "cagri", label: "Çağrı" },
          { value: "diger", label: "Diğer" },
        ]}
        onChange={() => undefined}
        autoFillSingleOption={false}
      />,
    );
    await user.type(screen.getByRole("combobox", { name: "Contact" }), "cagri");
    expect(screen.getByText("Çağrı")).toBeVisible();
    expect(screen.queryByText("Diğer")).not.toBeInTheDocument();
  });

  it("wires description and error to the combobox", () => {
    render(
      <SelectField
        id="relation"
        name="relation"
        label="Relation"
        description="Choose a record"
        error="Relation is required"
        value={{ value: "parent", label: "Parent" }}
        options={[{ value: "parent", label: "Parent" }]}
        onChange={() => undefined}
      />,
    );
    const control = screen.getByRole("combobox", { name: "Relation" });
    expect(control).toHaveAttribute(
      "aria-describedby",
      "relation-description relation-error",
    );
    expect(control).toHaveAttribute("aria-invalid", "true");
  });

  it("removes disabled and read-only selects from interaction", () => {
    const { rerender } = render(
      <SelectField
        name="relation"
        label="Relation"
        value={null}
        options={[]}
        onChange={() => undefined}
        disabled
      />,
    );
    expect(screen.queryByRole("combobox", { name: "Relation" })).toBeNull();
    rerender(
      <SelectField
        name="relation"
        label="Relation"
        value={null}
        options={[]}
        onChange={() => undefined}
        readOnly
      />,
    );
    expect(screen.queryByRole("combobox", { name: "Relation" })).toBeNull();
  });

  it("selects suggestions and renders custom left/right option labels", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const option = {
      value: "tea",
      label: "Tea",
      leftLabel: "Black tea",
      rightLabel: "120 ₺",
    };
    render(
      <SelectField
        name="product"
        label="Product"
        value={null}
        options={[option]}
        suggestedOptions={[option]}
        onChange={onChange}
        autoFillSingleOption={false}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Use suggested Tea" }));
    expect(onChange).toHaveBeenCalledWith(option);

    await user.click(screen.getByRole("combobox", { name: "Product" }));
    expect(screen.getByText("Black tea")).toHaveAttribute("data-option-left");
    expect(screen.getByText("120 ₺")).toHaveAttribute("data-option-right");
  });
});
