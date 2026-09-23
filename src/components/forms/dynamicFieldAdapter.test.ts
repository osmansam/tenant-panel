import { describe, expect, it } from "vitest";
import { InputTypes } from "../panelComponents/shared/types";
import {
  getDynamicFieldValue,
  getSelectFormValue,
  getSelectedOptions,
  resolveDynamicFieldState,
} from "./dynamicFieldAdapter";

const input = {
  type: InputTypes.TEXT,
  formKey: "notes",
  label: "Notes",
  required: false,
};

describe("resolveDynamicFieldState", () => {
  it("preserves static isDisabled as legacy hidden behavior", () => {
    expect(resolveDynamicFieldState({ ...input, isDisabled: true }, {})).toEqual({
      hidden: true,
      disabled: false,
      readOnly: false,
      required: false,
    });
  });

  it("preserves a matching disabledCondition as legacy hidden behavior", () => {
    expect(
      resolveDynamicFieldState(
        { ...input, disabledCondition: 'status = "closed"' },
        { status: "closed", notes: "retained" },
      ).hidden,
    ).toBe(true);
  });

  it("resolves conditional required without changing visibility", () => {
    expect(
      resolveDynamicFieldState(
        { ...input, requiredCondition: 'status = "open"' },
        { status: "open" },
      ),
    ).toMatchObject({ hidden: false, required: true });
  });
});

describe("getDynamicFieldValue", () => {
  it("preserves a false checkbox value", () => {
    expect(
      getDynamicFieldValue(
        { ...input, type: InputTypes.CHECKBOX, formKey: "approved" },
        { approved: false },
      ),
    ).toBe(false);
  });

  it("normalizes an explicit null number with the legacy empty fallback", () => {
    expect(
      getDynamicFieldValue(
        { ...input, type: InputTypes.NUMBER, formKey: "quantity" },
        { quantity: null },
      ),
    ).toBe("");
  });

  it("defaults a missing checkbox to false", () => {
    expect(
      getDynamicFieldValue(
        { ...input, type: InputTypes.CHECKBOX, formKey: "approved" },
        {},
      ),
    ).toBe(false);
  });
});

describe("select value conversion", () => {
  const options = [
    { value: "open", label: "Open" },
    { value: 2, label: "Two" },
  ];

  it("selects scalar string and number options without coercion", () => {
    const selectInput = { ...input, type: InputTypes.SELECT, options };
    expect(getSelectedOptions(selectInput, "open")).toEqual(options[0]);
    expect(getSelectedOptions(selectInput, 2)).toEqual(options[1]);
  });

  it("selects string and number arrays without coercion", () => {
    const selectInput = {
      ...input,
      type: InputTypes.SELECT,
      options,
      isMultiple: true,
    };
    expect(getSelectedOptions(selectInput, ["open"])).toEqual([options[0]]);
    expect(getSelectedOptions(selectInput, [2])).toEqual([options[1]]);
  });

  it("returns existing scalar and array formats", () => {
    const selectInput = { ...input, type: InputTypes.SELECT, options };
    expect(getSelectFormValue(selectInput, options[0])).toBe("open");
    expect(getSelectFormValue(selectInput, options[1])).toBe(2);
    expect(
      getSelectFormValue(
        { ...selectInput, isMultiple: true },
        [options[0]],
      ),
    ).toEqual(["open"]);
    expect(
      getSelectFormValue(
        { ...selectInput, isMultiple: true },
        [options[1]],
      ),
    ).toEqual([2]);
  });
});
