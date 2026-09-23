// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-color", () => ({
  SketchPicker: ({ onChange }: { onChange: (color: { hex: string }) => void }) => (
    <button type="button" onClick={() => onChange({ hex: "#123456" })}>
      Pick test color
    </button>
  ),
}));

import { ColorField, DateField, MonthYearField, TimeField } from ".";

describe("date, time, month-year, and color fields", () => {
  it("renders and emits the existing serialized date format with ARIA wiring", () => {
    const onChange = vi.fn();
    render(
      <DateField
        id="delivery-date"
        name="deliveryDate"
        label="Delivery date"
        description="Local delivery date"
        error="Choose a valid date"
        value="2026-09-22"
        onChange={onChange}
      />,
    );

    const input = screen.getByLabelText("Delivery date");
    expect(input).toHaveValue("09/22/2026");
    expect(input).toHaveAttribute("id", "delivery-date");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "delivery-date-description delivery-date-error",
    );

    fireEvent.change(input, { target: { value: "09/23/2026" } });
    expect(onChange).toHaveBeenCalledWith("2026-09-23");
  });

  it("emits null when a date is cleared", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DateField
        name="deliveryDate"
        label="Delivery date"
        value="2026-09-22"
        onChange={onChange}
        onClear={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Clear Delivery date" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("keeps native and segmented time strings controlled", async () => {
    const user = userEvent.setup();
    const nativeChange = vi.fn();
    const { rerender } = render(
      <TimeField
        name="startsAt"
        label="Starts at"
        variant="native"
        value="09:15"
        onChange={nativeChange}
      />,
    );
    const native = screen.getByLabelText("Starts at");
    fireEvent.change(native, { target: { value: "10:30" } });
    expect(nativeChange).toHaveBeenCalledWith("10:30");

    rerender(
      <TimeField
        name="startsAt"
        label="Starts at"
        variant="segmented"
        value="12:45"
        onChange={nativeChange}
      />,
    );
    expect(screen.getByText("12")).toBeVisible();
    expect(screen.getByText("45")).toBeVisible();
    await user.click(screen.getByLabelText("Hour"));
    await user.click(screen.getByText("13"));
    expect(nativeChange).toHaveBeenLastCalledWith("13:45");
  });

  it("keeps month-year output as MM-YYYY", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MonthYearField
        name="expiry"
        label="Expiry"
        value="09-2026"
        onChange={onChange}
      />,
    );
    await user.click(screen.getByLabelText("Month"));
    await user.click(screen.getByText("10"));
    expect(onChange).toHaveBeenCalledWith("10-2026");
  });

  it("emits color hex strings and the existing empty clear value", async () => {
    const user = userEvent.setup();
    const values: string[] = [];
    const Harness = () => {
      const [value, setValue] = useState("#abcdef");
      return (
        <ColorField
          name="brandColor"
          label="Brand color"
          value={value}
          onChange={(next) => {
            values.push(next);
            setValue(next);
          }}
          onClear={() => {
            values.push("");
            setValue("");
          }}
        />
      );
    };
    render(<Harness />);

    expect(screen.getByText("#abcdef")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Choose Brand color" }));
    await user.click(screen.getByRole("button", { name: "Pick test color" }));
    expect(values).toContain("#123456");
    await user.click(screen.getByRole("button", { name: "Clear Brand color" }));
    expect(values).toContain("");
  });
});
