import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosClose } from "react-icons/io";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { useGeneralContext } from "../../../context/General.context";
import {
  FormElementsState,
  FormElementValue,
  NUMBER_FILTER_OPERATORS,
} from "../../../types";
import { OptionType } from "../../panelComponents/shared/types";
import DateInput from "../FormElements/DateInput";
import { GenericButton } from "../FormElements/GenericButton";
import HourInput from "../FormElements/HourInput";
import MonthYearInput from "../FormElements/MonthYearInput";
import SelectInput from "../FormElements/SelectInput";
import TextInput from "../FormElements/TextInput";
import { H4, H6 } from "../Typography";
import { InputTypes, PanelFilterType } from "../shared/types";
const FilterPanel = ({
  inputs,
  formElements,
  setFormElements,
  closeFilters,
  isApplyButtonActive = false,
  isCloseButtonActive = true,
  isFilterPanelCoverTable = false,
  additionalFilterCleanFunction,
}: PanelFilterType) => {
  const { t } = useTranslation();
  const { setCurrentPage } = useGeneralContext();
  const [tempFormElements, setTempFormElements] =
    useState<FormElementsState>(formElements);

  // Track operators for number inputs - now supporting two conditions per field
  const [numberOperators, setNumberOperators] = useState<
    Record<string, { first: string; second: string }>
  >({});

  // Sync tempFormElements with formElements when not in apply button mode
  useEffect(() => {
    if (!isApplyButtonActive) {
      setTempFormElements(formElements);
    }
  }, [formElements, isApplyButtonActive]);
  const applyFilters = () => {
    setFormElements(tempFormElements);
    setCurrentPage(1); // Reset to the first page after applying filters
  };
  const handleClearAllFilters = () => {
    const clearedFormElements: FormElementsState = {};
    inputs.forEach((input) => {
      clearedFormElements[input.formKey] = "";
    });

    setFormElements(clearedFormElements);
    setTempFormElements(clearedFormElements);
    setNumberOperators({});
    additionalFilterCleanFunction?.();
    setCurrentPage(1);
  };
  const buttons = [
    {
      label: "Clear All Filters",
      onClick: handleClearAllFilters,
      isDisabled: false,
    },
    {
      label: "Apply",
      onClick: applyFilters,
      isDisabled: !isApplyButtonActive,
    },
  ];

  // Helper function to render operator select dropdown
  const renderOperatorSelect = (
    fieldKey: string,
    position: "first" | "second",
    currentOperator: string
  ) => (
    <select
      value={currentOperator}
      onChange={(e) => {
        const operator = e.target.value;
        setNumberOperators((prev) => ({
          ...prev,
          [fieldKey]: {
            first:
              position === "first" ? operator : prev[fieldKey]?.first || "=",
            second:
              position === "second" ? operator : prev[fieldKey]?.second || "=",
          },
        }));

        // Get current array or create new one
        const currentValue = tempFormElements[fieldKey] ?? "";
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const otherValue =
          position === "first" ? currentArray[1] || "" : currentArray[0] || "";

        // Extract raw value from current position
        const currentRaw = currentArray[position === "first" ? 0 : 1]
          ? String(currentArray[position === "first" ? 0 : 1]).replace(
              /^(gte-|gt-|lte-|lt-)/,
              ""
            )
          : "";

        if (currentRaw) {
          const newValue =
            operator === "=" ? currentRaw : `${operator}-${currentRaw}`;
          const newArray: string[] = (
            position === "first"
              ? [newValue, otherValue].filter((v) => v !== "")
              : [otherValue, newValue].filter((v) => v !== "")
          ) as string[];

          isApplyButtonActive
            ? setTempFormElements((prev) => ({
                ...prev,
                [fieldKey]: newArray.length > 0 ? newArray : "",
              }))
            : setFormElements((prev) => ({
                ...prev,
                [fieldKey]: newArray.length > 0 ? newArray : "",
              }));
        }
      }}
      className={`border border-gray-300 rounded-md px-4 py-2.5 text-sm w-20 h-[42px] ${
        currentOperator === "=" ? "opacity-30" : ""
      }`}
    >
      {NUMBER_FILTER_OPERATORS.map((op) => (
        <option key={op.value} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  );

  // Helper function to render number input field
  const renderNumberInput = (
    fieldKey: string,
    position: "first" | "second",
    value: FormElementValue,
    placeholder: string,
    isDebounce: boolean,
    isOnClearActive?: boolean
  ) => {
    const currentArray = Array.isArray(value) ? value : [];
    const currentValue = currentArray[position === "first" ? 0 : 1]
      ? String(currentArray[position === "first" ? 0 : 1]).replace(
          /^(gte-|gt-|lte-|lt-)/,
          ""
        )
      : "";

    return (
      <TextInput
        key={`${fieldKey}-${position}`}
        type={InputTypes.NUMBER}
        value={currentValue}
        label=""
        placeholder={placeholder}
        onChange={(newValue) => {
          const operator = numberOperators[fieldKey]?.[position] || "=";
          const finalValue =
            operator === "=" ? String(newValue) : `${operator}-${newValue}`;

          const otherValue = currentArray[position === "first" ? 1 : 0] || "";
          const newArray: string[] = (
            position === "first"
              ? [finalValue, otherValue].filter((v) => v !== "")
              : [otherValue, finalValue].filter((v) => v !== "")
          ) as string[];

          isApplyButtonActive
            ? setTempFormElements((prev) => ({
                ...prev,
                [fieldKey]: newArray.length > 0 ? newArray : "",
              }))
            : setFormElements((prev) => ({
                ...prev,
                [fieldKey]: newArray.length > 0 ? newArray : "",
              }));
        }}
        isDatePicker={false}
        isOnClearActive={position === "second" ? isOnClearActive : false}
        isDebounce={isDebounce}
        onClear={
          position === "second"
            ? () => {
                isApplyButtonActive
                  ? setTempFormElements((prev) => ({
                      ...prev,
                      [fieldKey]: "",
                    }))
                  : setFormElements((prev) => ({
                      ...prev,
                      [fieldKey]: "",
                    }));
                setNumberOperators((prev) => ({
                  ...prev,
                  [fieldKey]: { first: "=", second: "=" },
                }));
              }
            : undefined
        }
      />
    );
  };

  return (
    <div
      className={`flex flex-col gap-3 __className_a182b8 bg-white min-w-full ${
        isFilterPanelCoverTable ? "" : "sm:min-w-[20rem]"
      } border h-fit pb-8 border-gray-200 rounded-md py-2 px-3 focus:outline-none `}
    >
      <div className="flex flex-row justify-between">
        <H4 className="my-1">{t("Filters")}</H4>
        {isCloseButtonActive && (
          <GenericButton onClick={closeFilters} variant="icon">
            <IoIosClose className="w-8 h-8 mx-auto p-1 cursor-pointer  hover:bg-gray-50 hover:rounded-full" />
          </GenericButton>
        )}
      </div>
      {inputs.map((input) => {
        const value = tempFormElements[input.formKey] ?? "";
        const handleChange = (key: string) => (value: FormElementValue) => {
          const changedInput = inputs.find((input) => input.formKey === key);
          if (changedInput?.invalidateKeys) {
            changedInput.invalidateKeys.forEach((key) => {
              if (isApplyButtonActive) {
                setTempFormElements((prev) => ({
                  ...prev,
                  [key.key]: key.defaultValue,
                }));
              } else {
                setFormElements((prev) => ({
                  ...prev,
                  [key.key]: key.defaultValue,
                }));
              }
            });
          }

          isApplyButtonActive
            ? setTempFormElements((prev) => ({ ...prev, [key]: value }))
            : setFormElements((prev) => ({ ...prev, [key]: value }));
          setCurrentPage(1);
        };

        const handleChangeForSelect =
          (key: string) =>
          (
            selectedValue: SingleValue<OptionType> | MultiValue<OptionType>,
            actionMeta: ActionMeta<OptionType>
          ) => {
            if (
              actionMeta.action === "select-option" ||
              actionMeta.action === "remove-value" ||
              actionMeta.action === "clear"
            ) {
              if (Array.isArray(selectedValue)) {
                const values = selectedValue.map((option) => option.value);
                isApplyButtonActive
                  ? setTempFormElements((prev) => ({ ...prev, [key]: values }))
                  : setFormElements((prev) => ({ ...prev, [key]: values }));
              } else if (selectedValue) {
                isApplyButtonActive
                  ? setTempFormElements((prev) => ({
                      ...prev,
                      [key]: (selectedValue as OptionType)?.value,
                    }))
                  : setFormElements((prev) => ({
                      ...prev,
                      [key]: (selectedValue as OptionType)?.value,
                    }));
              } else {
                isApplyButtonActive
                  ? setTempFormElements((prev) => ({
                      ...prev,
                      [key]: "",
                    }))
                  : setFormElements((prev) => ({
                      ...prev,
                      [key]: "",
                    }));
              }
            }
            const changedInput = inputs.find((input) => input.formKey === key);
            if (changedInput?.invalidateKeys) {
              changedInput.invalidateKeys.forEach((key) => {
                isApplyButtonActive
                  ? setTempFormElements((prev) => ({
                      ...prev,
                      [key.key]: key.defaultValue,
                    }))
                  : setFormElements((prev) => ({
                      ...prev,
                      [key.key]: key.defaultValue,
                    }));
              });
            }
            if (changedInput?.additionalOnChange) {
              // Extract the actual value for additionalOnChange
              let valueForCallback: string | string[] = "";
              if (Array.isArray(selectedValue)) {
                valueForCallback = selectedValue.map((option) =>
                  String(option.value)
                );
              } else if (selectedValue && !Array.isArray(selectedValue)) {
                valueForCallback = String((selectedValue as OptionType).value);
              }
              changedInput.additionalOnChange(valueForCallback);
            }
            setCurrentPage(1);
          };
        if (input.isDisabled) return null;
        return (
          <div key={input.formKey} className="flex flex-col gap-2">
            {input.type === InputTypes.NUMBER && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                {/* First condition */}
                <div className="flex flex-row gap-2 items-center">
                  {renderOperatorSelect(
                    input.formKey,
                    "first",
                    numberOperators[input.formKey]?.first || "="
                  )}
                  {renderNumberInput(
                    input.formKey,
                    "first",
                    value,
                    input.placeholder ?? "",
                    input?.isDebounce ?? false
                  )}
                </div>

                {/* Second condition */}
                <div className="flex flex-row gap-2 items-center">
                  {renderOperatorSelect(
                    input.formKey,
                    "second",
                    numberOperators[input.formKey]?.second || "="
                  )}
                  {renderNumberInput(
                    input.formKey,
                    "second",
                    value,
                    input.placeholder ?? "",
                    input?.isDebounce ?? false,
                    input?.isOnClearActive
                  )}
                </div>
              </div>
            )}
            {(input.type === InputTypes.TEXT ||
              input.type === InputTypes.TIME ||
              input.type === InputTypes.COLOR ||
              input.type === InputTypes.PASSWORD) && (
              <TextInput
                key={input.formKey}
                type={input.type}
                value={String(value)}
                label={input.label ?? ""}
                placeholder={input.placeholder ?? ""}
                onChange={handleChange(input.formKey)}
                isDatePicker={input.isDatePicker ?? false}
                isOnClearActive={input?.isOnClearActive}
                isDebounce={input?.isDebounce ?? false}
                onClear={() =>
                  isApplyButtonActive
                    ? setTempFormElements((prev) => ({
                        ...prev,
                        [input.formKey]: "",
                      }))
                    : setFormElements((prev) => ({
                        ...prev,
                        [input.formKey]: "",
                      }))
                }
              />
            )}
            {input.type === InputTypes.DATE && (
              <DateInput
                key={input.formKey}
                value={String(value)}
                label={
                  input.required && input.label
                    ? input.label
                    : input.label ?? ""
                }
                placeholder={input.placeholder ?? ""}
                onChange={(val) => handleChange(input.formKey)(val ?? "")}
                isArrowsEnabled={input.isArrowsEnabled ?? false}
                requiredField={input.required}
                isOnClearActive={input?.isOnClearActive ?? true}
                isDateInitiallyOpen={input.isDateInitiallyOpen ?? false}
                isTopFlexRow={input.isTopFlexRow ?? false}
                isDebounce={input.isDebounce ?? true}
                isReadOnly={input.isReadOnly ?? false}
              />
            )}
            {input.type === InputTypes.SELECT && !input.isDisabled && (
              <SelectInput
                key={
                  input.isMultiple
                    ? input.formKey
                    : input.formKey + tempFormElements[input.formKey]
                }
                value={
                  input.isMultiple
                    ? input.options?.filter((option) => {
                        const formValue = tempFormElements[input.formKey];
                        return (
                          Array.isArray(formValue) &&
                          (formValue as (string | number)[]).includes(
                            option.value
                          )
                        );
                      }) || []
                    : input.options?.find(
                        (option) =>
                          option.value === tempFormElements[input.formKey]
                      ) || null
                }
                label={input.label ?? ""}
                options={input.options ?? []}
                placeholder={input.placeholder ?? ""}
                isMultiple={input.isMultiple ?? false}
                onChange={handleChangeForSelect(input.formKey)}
                isOnClearActive={input?.isOnClearActive ?? true}
                onClear={() => {
                  isApplyButtonActive
                    ? setTempFormElements((prev) => ({
                        ...prev,
                        [input.formKey]: input.isMultiple ? [] : "",
                      }))
                    : setFormElements((prev) => ({
                        ...prev,
                        [input.formKey]: input.isMultiple ? [] : "",
                      }));
                }}
              />
            )}
            {input.type === InputTypes.MONTHYEAR && (
              <MonthYearInput
                key={input.formKey}
                value={String(value)}
                label={
                  input.required && input.label
                    ? input.label
                    : input.label ?? ""
                }
                onChange={handleChange(input.formKey)}
                requiredField={input.required}
                isReadOnly={input.isReadOnly ?? false}
              />
            )}
            {input.type === InputTypes.TEXTAREA && (
              <div className="flex flex-col gap-2" key={input.formKey}>
                <H6>{input.label}</H6>
                <textarea
                  id={"textarea-input"}
                  value={String(value)}
                  onChange={(e) => {
                    handleChange(input.formKey)(e.target.value);
                  }}
                  placeholder={input.placeholder ?? ""}
                  className="border text-sm border-gray-300 rounded-md p-2"
                />
              </div>
            )}
            {input.type === InputTypes.HOUR && (
              <HourInput
                key={input.formKey}
                value={String(value)}
                label={
                  input.required && input.label
                    ? input.label
                    : input.label ?? ""
                }
                onChange={handleChange(input.formKey)}
                requiredField={input.required}
                isReadOnly={input.isReadOnly ?? false}
              />
            )}
          </div>
        );
      })}
      <div className="flex flex-row w-fit gap-2 ml-auto">
        {buttons
          .filter((button) => !button.isDisabled)
          .map((button) => {
            return (
              <GenericButton
                key={button.label}
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={button.onClick}
              >
                {t(button.label)}
              </GenericButton>
            );
          })}
      </div>
    </div>
  );
};

export default FilterPanel;
