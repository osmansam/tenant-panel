// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SelectInput from "./SelectInput";

const options = [
  { value: "istanbul", label: "İstanbul" },
  { value: "izmir", label: "İzmir" },
];

describe("SelectInput", () => {
  it("adapts legacy callbacks to the shared select", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onChangeTrigger = vi.fn();

    render(
      <SelectInput
        label="City"
        options={options}
        value={null}
        onChange={onChange}
        onChangeTrigger={onChangeTrigger}
        isAutoFill={false}
      />,
    );

    const select = screen.getByRole("combobox", { name: "City" });
    expect(select.closest("[data-control-size]"))?.toHaveAttribute(
      "data-control-size",
      "md",
    );

    await user.click(select);
    await user.click(screen.getByRole("option", { name: "İstanbul" }));

    expect(onChange).toHaveBeenCalledWith(
      options[0],
      expect.objectContaining({ action: "select-option" }),
    );
    expect(onChangeTrigger).toHaveBeenCalledWith(
      options[0],
      expect.objectContaining({ action: "select-option" }),
    );
  });

  it("autofills an equivalent one-option list only once", async () => {
    const onChange = vi.fn();
    const onlyOption = [{ value: "one", label: "One" }];
    const { rerender } = render(
      <SelectInput
        label="Choice"
        options={onlyOption}
        value={null}
        onChange={onChange}
      />,
    );

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    rerender(
      <SelectInput
        label="Choice"
        options={[{ value: "one", label: "One" }]}
        value={null}
        onChange={onChange}
      />,
    );
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });

  it("keeps Turkish-insensitive search, suggestions, and clear behavior", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onClear = vi.fn();
    const { rerender } = render(
      <SelectInput
        label="City"
        options={options}
        value={null}
        onChange={onChange}
        onClear={onClear}
        suggestedOption={[options[0]]}
        isAutoFill={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Use suggested İstanbul" }));
    expect(onChange).toHaveBeenLastCalledWith(
      options[0],
      expect.objectContaining({ action: "select-option" }),
    );

    rerender(
      <SelectInput
        label="City"
        options={options}
        value={options[0]}
        onChange={onChange}
        onClear={onClear}
        isAutoFill={false}
      />,
    );
    const select = screen.getByRole("combobox", { name: "City" });
    await user.click(select);
    await user.type(select, "izmir");
    expect(screen.getByRole("option", { name: "İzmir" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Clear City" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("locks the shared control in read-only mode", () => {
    render(
      <SelectInput
        label="City"
        options={options}
        value={options[0]}
        onChange={vi.fn()}
        isReadOnly
      />,
    );

    const select = screen.getByLabelText("City");
    expect(select).toBeDisabled();
    expect(
      select.closest("[data-readonly]"),
    ).toHaveAttribute("data-readonly", "true");
  });
});
