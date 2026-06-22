import { MultiValue, SingleValue } from "react-select";
import { FormElementValue, FormElementsState, OptionType } from "../../types";
import { GenericInputType, InputTypes } from "../panelComponents/shared/types";
import DateInput from "../panelComponents/FormElements/DateInput";
import HourInput from "../panelComponents/FormElements/HourInput";
import MonthYearInput from "../panelComponents/FormElements/MonthYearInput";
import SelectInput from "../panelComponents/FormElements/SelectInput";
import TextInput from "../panelComponents/FormElements/TextInput";

type Props = {
  input: GenericInputType;
  formElements: FormElementsState;
  error?: string;
  onChange: (key: string, value: FormElementValue) => void;
};

const DynamicFormField = ({ input, formElements, error, onChange }: Props) => {
  const value = formElements[input.formKey];
  const normalizedValue =
    value ?? (input.type === InputTypes.CHECKBOX ? false : "");
  const label = input.label || input.formKey;
  const placeholder = input.placeholder || "";

  if (input.type === InputTypes.DATE) {
    return (
      <DateInput
        value={typeof value === "string" ? value : null}
        label={label}
        placeholder={placeholder}
        onChange={(next) => onChange(input.formKey, next || "")}
        requiredField={input.required}
        isOnClearActive={true}
        onClear={() => onChange(input.formKey, "")}
      />
    );
  }

  if (input.type === InputTypes.HOUR) {
    return (
      <HourInput
        value={typeof value === "string" ? value : undefined}
        label={label}
        onChange={(next) => onChange(input.formKey, next)}
        requiredField={input.required}
      />
    );
  }

  if (input.type === InputTypes.MONTHYEAR) {
    return (
      <MonthYearInput
        value={typeof value === "string" ? value : undefined}
        label={label}
        onChange={(next) => onChange(input.formKey, next)}
        requiredField={input.required}
      />
    );
  }

  if (input.type === InputTypes.SELECT) {
    const selectedValue = input.isMultiple
      ? (input.options || []).filter((option) =>
          Array.isArray(value) ? value.includes(option.value as never) : false,
        )
      : (input.options || []).find((option) => option.value === value) || null;
    return (
      <SelectInput
        value={selectedValue}
        label={label}
        options={input.options || []}
        placeholder={placeholder}
        isMultiple={input.isMultiple || false}
        requiredField={input.required}
        onChange={(
          selected: SingleValue<OptionType> | MultiValue<OptionType>,
        ) => {
          if (Array.isArray(selected)) {
            onChange(
              input.formKey,
              selected.map((option) => option.value) as string[] | number[],
            );
            return;
          }
          onChange(
            input.formKey,
            selected ? (selected as OptionType).value : "",
          );
        }}
        onClear={() => onChange(input.formKey, input.isMultiple ? [] : "")}
      />
    );
  }

  if (input.type === InputTypes.TEXTAREA) {
    return (
      <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700">
        <span>
          {label}
          {input.required && <span className="ml-1 text-red-500">*</span>}
        </span>
        <textarea
          value={typeof value === "string" ? value : ""}
          placeholder={placeholder}
          rows={4}
          onChange={(event) => onChange(input.formKey, event.target.value)}
          className="w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
        />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    );
  }

  if (input.type === InputTypes.IMAGE) {
    return (
      <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700">
        <span>{label}</span>
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            onChange(input.formKey, event.target.files?.[0] || null)
          }
          className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
        />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    );
  }

  return (
    <TextInput
      type={input.type}
      value={normalizedValue}
      label={label}
      placeholder={placeholder}
      onChange={(next) => onChange(input.formKey, next)}
      requiredField={input.required}
      isNumberButtonsActive={input.isNumberButtonsActive || false}
      minNumber={input.min ?? 0}
      maxNumber={input.max}
      error={error}
      isOnClearActive={false}
      onClear={() => onChange(input.formKey, "")}
    />
  );
};

export default DynamicFormField;
