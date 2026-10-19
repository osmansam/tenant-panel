import { useEffect, useMemo, useRef } from "react";
import type { OptionType } from "../../types";
import { Button, Select } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

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

const isOptionArray = (
  candidate: OptionType | readonly OptionType[] | null,
): candidate is readonly OptionType[] => Array.isArray(candidate);

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
  const lastAutoFillSignature = useRef<string | null>(null);
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
  const displayedValue = useMemo(() => {
    if (isOptionArray(value)) {
      return value.flatMap((selected) => {
        const current = options.find((option) =>
          Object.is(option.value, selected.value),
        );
        return current ? [current] : [];
      });
    }
    if (!value) return null;
    return (
      options.find((option) => Object.is(option.value, value.value)) || null
    );
  }, [options, value]);
  useEffect(() => {
    if (autoFillSingleOption && options.length === 1 && !value) {
      const signature = `${typeof options[0].value}:${String(options[0].value)}`;
      if (lastAutoFillSignature.current !== signature) {
        lastAutoFillSignature.current = signature;
        onChange(options[0]);
      }
      return;
    }
    if (options.length !== 1) lastAutoFillSignature.current = null;
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
              <Select<OptionType>
                id={controlId}
                name={presentation.name}
                value={displayedValue}
                options={options}
                multiple={multiple}
                disabled={disabled}
                readOnly={readOnly}
                required={presentation.required}
                invalid={invalid}
                placeholder={placeholder}
                clearable={false}
                sortOptions={sortOptions}
                aria-describedby={describedBy}
                onChange={(selected) =>
                  onChange(selected as OptionType | readonly OptionType[] | null)
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
