import type { FormElementValue, FormElementsState } from "../../types";
import {
  CheckboxField,
  ColorField,
  DateField,
  FileField,
  MonthYearField,
  NumberField,
  SelectField,
  TextareaField,
  TextField,
  TimeField,
} from "../form-fields";
import {
  type GenericInputType,
  InputTypes,
} from "../panelComponents/shared/types";
import {
  getDynamicFieldValue,
  getSelectedOptions,
  getSelectFormValue,
} from "./dynamicFieldAdapter";

type Props = {
  input: GenericInputType;
  formElements: FormElementsState;
  error?: string;
  onChange: (key: string, value: FormElementValue) => void;
};

const DynamicFormField = ({ input, formElements, error, onChange }: Props) => {
  const rawValue = formElements[input.formKey];
  const value = getDynamicFieldValue(input, formElements);
  const label = input.label || input.formKey;
  const shared = {
    name: input.formKey,
    label,
    required: input.required,
    error,
  };

  if (input.type === InputTypes.DATE) {
    return (
      <DateField
        {...shared}
        value={typeof rawValue === "string" ? rawValue : null}
        placeholder={input.placeholder}
        onChange={(next) => onChange(input.formKey, next || "")}
        onClear={() => onChange(input.formKey, "")}
        initiallyOpen={input.isDateInitiallyOpen}
        arrowsEnabled={input.isArrowsEnabled}
      />
    );
  }

  if (input.type === InputTypes.HOUR || input.type === InputTypes.TIME) {
    return (
      <TimeField
        {...shared}
        value={typeof rawValue === "string" ? rawValue : ""}
        variant={input.type === InputTypes.HOUR ? "segmented" : "native"}
        onChange={(next) => onChange(input.formKey, next)}
        onClear={() => onChange(input.formKey, "")}
      />
    );
  }

  if (input.type === InputTypes.MONTHYEAR) {
    return (
      <MonthYearField
        {...shared}
        value={typeof rawValue === "string" ? rawValue : ""}
        onChange={(next) => onChange(input.formKey, next)}
      />
    );
  }

  if (input.type === InputTypes.SELECT) {
    return (
      <SelectField
        {...shared}
        value={getSelectedOptions(input, value)}
        options={input.options || []}
        placeholder={input.placeholder}
        multiple={Boolean(input.isMultiple)}
        clearable={input.isOnClearActive !== false}
        autoFillSingleOption={input.isAutoFill !== false}
        sortOptions={!input.isSortDisabled}
        suggestedOptions={input.suggestedOption || undefined}
        onChange={(selected) =>
          onChange(input.formKey, getSelectFormValue(input, selected))
        }
      />
    );
  }

  if (input.type === InputTypes.TEXTAREA) {
    return (
      <TextareaField
        {...shared}
        value={typeof rawValue === "string" ? rawValue : ""}
        placeholder={input.placeholder}
        onChange={(next) => onChange(input.formKey, next)}
      />
    );
  }

  if (input.type === InputTypes.IMAGE) {
    return (
      <FileField
        {...shared}
        value={rawValue instanceof File ? rawValue : null}
        accept="image/*"
        onChange={(next) => onChange(input.formKey, next)}
      />
    );
  }

  if (input.type === InputTypes.COLOR) {
    return (
      <ColorField
        {...shared}
        value={typeof rawValue === "string" ? rawValue : ""}
        onChange={(next) => onChange(input.formKey, next)}
        onClear={() => onChange(input.formKey, "")}
      />
    );
  }

  if (input.type === InputTypes.CHECKBOX) {
    return (
      <CheckboxField
        {...shared}
        value={Boolean(value)}
        onChange={(next) => onChange(input.formKey, next)}
      />
    );
  }

  if (input.type === InputTypes.NUMBER) {
    const numberValue =
      typeof rawValue === "number" || rawValue === "" || rawValue === null
        ? rawValue
        : "";
    return (
      <NumberField
        {...shared}
        value={numberValue}
        min={
          input.isMinNumber === false
            ? undefined
            : input.minNumber ?? input.min
        }
        max={input.max}
        showStepButtons={input.isNumberButtonsActive}
        onChange={(next) => onChange(input.formKey, next)}
      />
    );
  }

  return (
    <TextField
      {...shared}
      type={input.type === InputTypes.PASSWORD ? "password" : "text"}
      value={typeof value === "string" ? value : String(value ?? "")}
      placeholder={input.placeholder}
      onChange={(next) => onChange(input.formKey, next)}
    />
  );
};

export default DynamicFormField;
