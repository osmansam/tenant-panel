import { useEffect, useMemo, useState } from "react";
import Select, {
  components,
  type GroupBase,
  type InputProps,
  type MultiValue,
  type OptionProps,
  type SingleValue,
} from "react-select";
import type { OptionType } from "../../types";
import { SelectOptionContent } from "../panelComponents/FormElements/SelectOptionContent";
import { Button } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";
import { getSelectStyles } from "./selectStyles";

export interface SelectFieldProps extends FieldPresentationProps {
  value: OptionType | readonly OptionType[] | null;
  options: readonly OptionType[];
  onChange: (value: OptionType | readonly OptionType[] | null) => void;
  multiple?: boolean;
  placeholder?: string;
  clearable?: boolean;
  autoFillSingleOption?: boolean;
  sortOptions?: boolean;
  suggestedOptions?: readonly OptionType[];
}

const normalizeText = (text: string) =>
  text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/i̇/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

const isOptionArray = (
  candidate: OptionType | readonly OptionType[] | null,
): candidate is readonly OptionType[] => Array.isArray(candidate);

const CustomOption = (
  props: OptionProps<OptionType, boolean, GroupBase<OptionType>>,
) => (
  <components.Option {...props}>
    <SelectOptionContent option={props.data} />
    {props.isSelected && <span aria-hidden="true">✓</span>}
  </components.Option>
);

const AccessibleInput = (
  props: InputProps<OptionType, boolean, GroupBase<OptionType>>,
) => (
  <components.Input
    {...props}
    aria-describedby={
      (props.selectProps as typeof props.selectProps & {
        "aria-describedby"?: string;
      })["aria-describedby"] || props["aria-describedby"]
    }
  />
);

export const SelectField = ({
  autoFillSingleOption = true,
  clearable = true,
  disabled,
  label,
  multiple = false,
  onChange,
  options,
  placeholder,
  readOnly,
  sortOptions = true,
  suggestedOptions,
  value,
  ...presentation
}: SelectFieldProps) => {
  const [searchInput, setSearchInput] = useState("");
  const selectedValues = isOptionArray(value) ? value : [];
  const labelText = typeof label === "string" ? label : presentation.name;
  const visibleSuggestions = (suggestedOptions || [])
    .filter((suggestion) =>
      options.some((option) => option.value === suggestion.value),
    )
    .filter((suggestion) =>
      multiple
        ? !selectedValues.some((selected) => selected.value === suggestion.value)
        : !value || isOptionArray(value) || value.value !== suggestion.value,
    );
  const displayedOptions = useMemo(() => {
    if (!sortOptions) return options;
    const normalizedSearch = normalizeText(searchInput);
    return [...options].sort((left, right) => {
      const leftStarts = normalizeText(left.label).startsWith(normalizedSearch);
      const rightStarts = normalizeText(right.label).startsWith(normalizedSearch);
      if (leftStarts && !rightStarts) return -1;
      if (rightStarts && !leftStarts) return 1;
      return left.label.localeCompare(right.label);
    });
  }, [options, searchInput, sortOptions]);
  useEffect(() => {
    if (autoFillSingleOption && options.length === 1 && !value) {
      onChange(options[0]);
    }
  }, [autoFillSingleOption, onChange, options, value]);

  return (
    <FieldShell
      {...presentation}
      label={label}
      disabled={disabled}
      readOnly={readOnly}
    >
      {({ controlId, describedBy, invalid }) => (
        <div className="space-y-2">
          {visibleSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label={`${labelText} suggestions`}>
              {visibleSuggestions.map((suggestion) => (
                <Button
                  key={suggestion.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled || readOnly}
                  aria-label={`Use suggested ${suggestion.label}`}
                  onClick={() =>
                    onChange(
                      multiple ? [...selectedValues, suggestion] : suggestion,
                    )
                  }
                  className="rounded-full shadow-none"
                >
                  {suggestion.label}
                </Button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <Select<OptionType, boolean>
                inputId={controlId}
                name={presentation.name}
                value={value}
                options={displayedOptions}
                isMulti={multiple}
                isDisabled={disabled || readOnly}
                placeholder={placeholder}
                closeMenuOnSelect={!multiple}
                hideSelectedOptions={!multiple}
                backspaceRemovesValue
                isClearable={false}
                components={{
                  Option: CustomOption,
                  Input: AccessibleInput,
                }}
                styles={getSelectStyles(invalid)}
                aria-describedby={describedBy}
                aria-invalid={invalid || undefined}
                aria-readonly={readOnly || undefined}
                filterOption={(candidate, input) =>
                  normalizeText(candidate.label).includes(normalizeText(input))
                }
                inputValue={searchInput}
                onInputChange={(next, meta) => {
                  if (meta.action === "input-change") setSearchInput(next);
                }}
                onChange={(selected) =>
                  onChange(
                    selected as
                      | SingleValue<OptionType>
                      | MultiValue<OptionType>,
                  )
                }
              />
            </div>
            {clearable && !readOnly && (isOptionArray(value) ? value.length > 0 : value) && (
              <Button
                type="button"
                variant="ghost"
                size="md"
                disabled={disabled}
                aria-label={`Clear ${labelText}`}
                onClick={() => onChange(multiple ? [] : null)}
                className="shrink-0 px-3 shadow-none"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      )}
    </FieldShell>
  );
};
