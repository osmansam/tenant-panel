import type {
  FormElementValue,
  FormElementsState,
  OptionType,
} from "../../types";
import { isFormConditionMet } from "../../utils/formConfig";
import {
  type GenericInputType,
  InputTypes,
} from "../panelComponents/shared/types";

export interface ResolvedDynamicFieldState {
  hidden: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

export const resolveDynamicFieldState = (
  input: GenericInputType,
  values: FormElementsState,
): ResolvedDynamicFieldState => ({
  hidden:
    Boolean(input.isDisabled) ||
    isFormConditionMet(input.disabledCondition, values),
  disabled: false,
  readOnly: false,
  required:
    Boolean(input.required) ||
    isFormConditionMet(input.requiredCondition, values),
});

export const getDynamicFieldValue = (
  input: GenericInputType,
  values: FormElementsState,
): FormElementValue =>
  values[input.formKey] ??
  (input.type === InputTypes.CHECKBOX ? false : "");

export const getSelectedOptions = (
  input: GenericInputType,
  value: FormElementValue,
): OptionType | OptionType[] | null =>
  input.isMultiple
    ? (input.options || []).filter((option) =>
        Array.isArray(value) ? value.includes(option.value as never) : false,
      )
    : (input.options || []).find((option) => option.value === value) || null;

export const getSelectFormValue = (
  input: GenericInputType,
  selected: OptionType | readonly OptionType[] | null,
): string | number | string[] | number[] =>
  Array.isArray(selected)
    ? (selected.map((option) => option.value) as string[] | number[])
    : selected
      ? (selected as OptionType).value
      : input.isMultiple
        ? []
        : "";
