// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InputTypes, type GenericInputType } from "../panelComponents/shared/types";
import DynamicFormField from "./DynamicFormField";

const makeInput = (
  type: InputTypes,
  overrides: Partial<GenericInputType> = {},
): GenericInputType => ({
  type,
  formKey: "field",
  label: `Field ${type}`,
  required: true,
  ...overrides,
});

describe("DynamicFormField", () => {
  it.each([
    InputTypes.TEXT,
    InputTypes.PASSWORD,
    InputTypes.NUMBER,
    InputTypes.COLOR,
    InputTypes.CHECKBOX,
    InputTypes.TEXTAREA,
    InputTypes.IMAGE,
    InputTypes.DATE,
    InputTypes.TIME,
    InputTypes.HOUR,
    InputTypes.MONTHYEAR,
  ])("dispatches %s with shared error presentation", (type) => {
    render(
      <DynamicFormField
        input={makeInput(type)}
        formElements={{
          field:
            type === InputTypes.CHECKBOX
              ? false
              : type === InputTypes.NUMBER
                ? 2
                : type === InputTypes.IMAGE
                  ? null
                  : type === InputTypes.DATE
                    ? "2026-09-22"
                    : type === InputTypes.TIME || type === InputTypes.HOUR
                      ? "09:15"
                      : type === InputTypes.MONTHYEAR
                        ? "09-2026"
                        : "value",
        }}
        error="Invalid value"
        onChange={() => undefined}
      />,
    );
    expect(screen.getByText("Invalid value")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getByText(new RegExp(`Field ${type}`, "i"))).toBeVisible();
  });

  it("preserves scalar and multiple select callbacks", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const options = [
      { value: "one", label: "One" },
      { value: 2, label: "Two" },
    ];
    const { rerender } = render(
      <DynamicFormField
        input={makeInput(InputTypes.SELECT, {
          required: false,
          options,
          isAutoFill: false,
        })}
        formElements={{ field: "one" }}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox", { name: "Field select" }));
    await user.click(screen.getByText("Two"));
    expect(onChange).toHaveBeenLastCalledWith("field", 2);

    rerender(
      <DynamicFormField
        input={makeInput(InputTypes.SELECT, {
          required: false,
          options,
          isMultiple: true,
          isAutoFill: false,
        })}
        formElements={{ field: ["one"] }}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox", { name: "Field select" }));
    await user.click(screen.getByText("Two"));
    expect(onChange).toHaveBeenLastCalledWith("field", ["one", 2]);
  });

  it("emits native field values with the existing callback shape", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <DynamicFormField
        input={makeInput(InputTypes.TEXT, { required: false })}
        formElements={{ field: "before" }}
        onChange={onChange}
      />,
    );
    const text = screen.getByRole("textbox", { name: "Field text" });
    fireEvent.change(text, { target: { value: "after" } });
    expect(onChange).toHaveBeenLastCalledWith("field", "after");

    rerender(
      <DynamicFormField
        input={makeInput(InputTypes.CHECKBOX, { required: false })}
        formElements={{ field: false }}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Field checkbox" }));
    expect(onChange).toHaveBeenLastCalledWith("field", true);

    rerender(
      <DynamicFormField
        input={makeInput(InputTypes.TIME, { required: false })}
        formElements={{ field: "09:15" }}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByLabelText("Field time"), {
      target: { value: "10:30" },
    });
    expect(onChange).toHaveBeenLastCalledWith("field", "10:30");
  });

  it("reflects dependent external value changes without a key change", () => {
    const input = makeInput(InputTypes.HOUR, { required: false });
    const onChange = vi.fn();
    const { rerender } = render(
      <DynamicFormField
        input={input}
        formElements={{ field: "08:10" }}
        onChange={onChange}
      />,
    );
    expect(screen.getByText("08")).toBeVisible();
    rerender(
      <DynamicFormField
        input={input}
        formElements={{ field: "14:35" }}
        onChange={onChange}
      />,
    );
    expect(screen.getByText("14")).toBeVisible();
    expect(screen.getByText("35")).toBeVisible();
  });
});
