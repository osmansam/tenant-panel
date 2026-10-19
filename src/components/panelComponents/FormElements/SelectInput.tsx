import React, { useEffect, useId, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import type { OptionType } from "../../../types";
import { Button, Select, type SelectChangeMeta } from "../../ui";
import { H6 } from "../Typography";

type SelectInputValue = OptionType | readonly OptionType[] | null;

interface SelectInputProps {
  label?: string;
  options: OptionType[];
  value: SelectInputValue;
  onChange: (
    value: SelectInputValue,
    actionMeta: SelectChangeMeta<OptionType>,
  ) => void;
  onClear?: () => void;
  onChangeTrigger?: (
    value: SelectInputValue,
    actionMeta: SelectChangeMeta<OptionType>,
  ) => void;
  placeholder?: string;
  isMultiple?: boolean;
  requiredField?: boolean;
  isAutoFill?: boolean;
  isOnClearActive?: boolean;
  isReadOnly?: boolean;
  isTopFlexRow?: boolean;
  suggestedOption?: { value: string; label: string }[] | null;
  isSortDisabled?: boolean;
  /** @deprecated Shared controls use theme surface tokens. */
  customControlBackgroundColor?: string;
}

const isOptionArray = (
  value: SelectInputValue,
): value is readonly OptionType[] => Array.isArray(value);

const selectionMeta = (option: OptionType): SelectChangeMeta<OptionType> => ({
  action: "select-option",
  option,
});

const SelectInput = ({
  label,
  options,
  value,
  onChange,
  onChangeTrigger,
  isMultiple = false,
  placeholder,
  onClear,
  isOnClearActive = true,
  isAutoFill = true,
  requiredField = false,
  isReadOnly = false,
  isTopFlexRow = false,
  isSortDisabled = false,
  suggestedOption,
}: SelectInputProps) => {
  const generatedId = useId();
  const controlId = `select-${generatedId}`;
  const labelText = label || "Select";
  const lastAutoFillSignature = useRef<string | null>(null);
  const selectedValues = isOptionArray(value) ? value : [];

  useEffect(() => {
    if (options.length === 1 && !value && isAutoFill) {
      const signature = `${typeof options[0].value}:${String(options[0].value)}`;
      if (lastAutoFillSignature.current !== signature) {
        lastAutoFillSignature.current = signature;
        const actionMeta = selectionMeta(options[0]);
        onChange(options[0], actionMeta);
        onChangeTrigger?.(options[0], actionMeta);
      }
      return;
    }
    if (options.length !== 1) lastAutoFillSignature.current = null;
  }, [isAutoFill, onChange, onChangeTrigger, options, value]);

  const applySelection = (
    nextValue: SelectInputValue,
    actionMeta: SelectChangeMeta<OptionType>,
  ) => {
    onChange(nextValue, actionMeta);
    onChangeTrigger?.(nextValue, actionMeta);
  };

  const visibleSuggestions = (suggestedOption || [])
    .filter((suggestion) =>
      options.some((option) => option.value === suggestion.value),
    )
    .filter((suggestion) =>
      isMultiple
        ? !selectedValues.some(
            (selected) => selected.value === suggestion.value,
          )
        : !value || isOptionArray(value) || value.value !== suggestion.value,
    );

  return (
    <div
      className={`flex ${
        isTopFlexRow
          ? "flex-row items-center sm:flex-col sm:items-baseline"
          : "flex-col"
      } gap-2`}
    >
      <H6 className="flex items-center gap-2">
        <span>{label}</span>
        {requiredField && <span className="text-ui-danger">*</span>}
        {visibleSuggestions.map((suggestion) => {
          const candidate = options.find(
            (option) => option.value === suggestion.value,
          ) as OptionType;
          return (
            <Button
              key={suggestion.value}
              type="button"
              variant="outline"
              size="sm"
              disabled={isReadOnly}
              aria-label={`Use suggested ${suggestion.label}`}
              onClick={(event) => {
                event.stopPropagation();
                const nextValue = isMultiple
                  ? [...selectedValues, candidate]
                  : candidate;
                applySelection(nextValue, selectionMeta(candidate));
              }}
              className="ml-2 rounded-full text-xs shadow-none sm:text-sm"
            >
              {suggestion.label}
            </Button>
          );
        })}
      </H6>

      <div className="flex w-full flex-row gap-2">
        <Select<OptionType>
          id={controlId}
          value={value}
          options={options}
          onChange={applySelection}
          multiple={isMultiple}
          placeholder={placeholder}
          readOnly={isReadOnly}
          required={requiredField}
          sortOptions={!isSortDisabled}
          aria-label={labelText}
        />
        {!isReadOnly &&
          !isMultiple &&
          isOnClearActive &&
          value &&
          onClear && (
            <Button
              type="button"
              variant="icon"
              size="md"
              aria-label={`Clear ${labelText}`}
              onClick={onClear}
              className="shrink-0 text-ui-muted hover:text-ui-danger"
            >
              <IoIosClose size={24} aria-hidden="true" />
            </Button>
          )}
      </div>
    </div>
  );
};

export default React.memo(SelectInput);
