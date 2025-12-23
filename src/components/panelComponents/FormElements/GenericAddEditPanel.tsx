import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../../common/ConfirmationDialog";
import { useGeneralContext } from "../../../context/General.context";
import { FormElementsState, NO_IMAGE_URL, OptionType } from "../../../types";
import { UpdatePayload } from "../../../utils/api";
import {
  validateField,
  ValidationRules,
} from "../../../utils/validationHelper";
import { H6 } from "../Typography";
import {
  FormKeyType,
  FormKeyTypeEnum,
  GenericInputType,
  InputTypes,
} from "../shared/types";
import DateInput from "./DateInput";
import { GenericButton } from "./GenericButton";
import HourInput from "./HourInput";
import MonthYearInput from "./MonthYearInput";
import SelectInput from "./SelectInput";
import TabInput from "./TabInput";
import TabInputScreen from "./TabInputScreen";
import TextInput from "./TextInput";

type Props<T> = {
  isOpen: boolean;
  close?: () => void;
  inputs: GenericInputType[];
  formKeys: FormKeyType[];
  topClassName?: string;
  nonImageInputsClassName?: string;
  onOpenTriggerTabInputFormKey?: string;
  generalClassName?: string;
  submitItem: (item: T | UpdatePayload<T>) => void;
  setForm?: (item: T) => void;
  handleUpdate?: () => void;
  submitFunction?: () => void;
  additionalSubmitFunction?: () => void;
  additionalCancelFunction?: () => void;

  constantValues?: { [key: string]: any };
  isCancelConfirmationDialogExist?: boolean;
  isCreateConfirmationDialogExist?: boolean;
  isCreateCloseActive?: boolean;
  optionalCreateButtonActive?: boolean;
  allowOptionalSubmitForActivityTable?: boolean;
  isEditMode?: boolean;
  folderName?: string;
  buttonName?: string;
  cancelButtonLabel?: string;
  anotherPanel?: React.ReactNode;
  anotherPanelTopClassName?: string;
  createConfirmationDialogText?: string;
  createConfirmationDialogHeader?: string;
  isConfirmationDialogRequired?: () => boolean;
  confirmationDialogHeader?: string;
  confirmationDialogText?: string;
  isSubmitButtonActive?: boolean;
  upperMessage?: string[];
  additionalButtons?: AdditionalButtonProps[];
  itemToEdit?: {
    id: number | string;
    updates: T;
  };
};

type AdditionalButtonProps = {
  onClick: () => void;
  label: string;
  isInputRequirementCheck?: boolean;
  isInputNeedToBeReset?: boolean;
  preservedKeys?: string[];
};
const GenericAddEditPanel = <T,>({
  isOpen,
  close,
  inputs,
  formKeys,
  additionalButtons,
  topClassName,
  generalClassName,
  buttonName,
  constantValues,
  isEditMode = false,
  itemToEdit,
  handleUpdate,
  anotherPanel,
  optionalCreateButtonActive,
  allowOptionalSubmitForActivityTable,
  cancelButtonLabel = "Cancel",
  submitFunction,
  additionalSubmitFunction,
  additionalCancelFunction,
  isSubmitButtonActive = true,
  isCancelConfirmationDialogExist = false,
  isCreateConfirmationDialogExist = false,
  createConfirmationDialogText,
  createConfirmationDialogHeader,
  isCreateCloseActive = true,
  anotherPanelTopClassName,
  isConfirmationDialogRequired,
  confirmationDialogText,
  confirmationDialogHeader,
  upperMessage,
  setForm,
  submitItem,
  nonImageInputsClassName,
}: Props<T>) => {
  const { t } = useTranslation();
  const { isTabInputScreenOpen, tabInputScreenOptions } = useGeneralContext();
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [resetTextInput, setResetTextInput] = useState(false);
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [isCancelConfirmationDialogOpen, setIsCancelConfirmationDialogOpen] =
    useState(false);
  const [confirmationDialogFunction, setConfirmationDialogFunction] = useState<
    (() => void) | null
  >(null);
  const { setIsExtraModalOpen } = useGeneralContext();
  const [isCreateConfirmationDialogOpen, setIsCreateConfirmationDialogOpen] =
    useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const imageInputs = inputs.filter((input) => input.type === InputTypes.IMAGE);
  const nonImageInputs = inputs.filter(
    (input) => input.type !== InputTypes.IMAGE
  );
  const initialState = formKeys.reduce<FormElementsState>(
    (acc, { key, type }) => {
      let defaultValue;
      switch (type) {
        case FormKeyTypeEnum.STRING:
          defaultValue = "";
          break;
        case FormKeyTypeEnum.COLOR:
          defaultValue = "#ffffff";
          break;
        case FormKeyTypeEnum.NUMBER:
          defaultValue = null;
          break;
        case FormKeyTypeEnum.BOOLEAN:
          defaultValue = false;
          break;
        case FormKeyTypeEnum.DATE:
          defaultValue = "";
          break;
        case FormKeyTypeEnum.STRING_ARRAY:
        case FormKeyTypeEnum.INT_ARRAY:
        case FormKeyTypeEnum.NUMBER_ARRAY:
          defaultValue = "";
          break;
        default:
          defaultValue = null;
      }
      acc[key] = defaultValue;
      return acc;
    },
    {}
  );
  const mergedInitialState = { ...initialState, ...constantValues };
  const [formElements, setFormElements] = useState(() => {
    if (itemToEdit) {
      const updates = itemToEdit.updates as unknown as FormElementsState;

      // Convert arrays to comma-separated strings for editing
      const processedUpdates = { ...updates };
      formKeys.forEach(({ key, type }) => {
        if (
          (type === FormKeyTypeEnum.STRING_ARRAY ||
            type === FormKeyTypeEnum.INT_ARRAY ||
            type === FormKeyTypeEnum.NUMBER_ARRAY) &&
          Array.isArray(updates[key])
        ) {
          processedUpdates[key] = updates[key].join(", ");
        }
      });

      // Merge with initialState to ensure boolean fields default to false if not present
      return {
        ...initialState,
        ...constantValues,
        ...processedUpdates,
      };
    }
    return mergedInitialState;
  });
  const handleClose = useCallback(() => {
    setIsExtraModalOpen?.(false);
    close?.();
  }, [setIsExtraModalOpen, close]);
  const isValueEmpty = useCallback((value: unknown) => {
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === "";
  }, []);

  // Validation function
  const validateFieldValue = useCallback(
    (input: GenericInputType, value: any) => {
      const fieldType =
        formKeys.find((fk) => fk.key === input.formKey)?.type || "string";

      // Build validation rules from input properties
      const rules: ValidationRules = {};

      if (input.required) rules.required = true;
      if (input.minLength) rules.minlength = input.minLength;
      if (input.maxLength) rules.maxlength = input.maxLength;
      if (input.min !== undefined) rules.min = input.min;
      if (input.max !== undefined) rules.max = input.max;
      if (input.pattern) rules.pattern = input.pattern;

      // Check if it's an email field based on additionalType or formKey
      if (
        input.additionalType === "email" ||
        input.formKey.toLowerCase().includes("email")
      ) {
        rules.email = true;
      }

      // Check if it's a phone field
      if (
        input.additionalType === "phone" ||
        input.formKey.toLowerCase().includes("phone")
      ) {
        rules.phone = true;
      }

      // Check if it's a url field
      if (
        input.additionalType === "url" ||
        input.formKey.toLowerCase().includes("url")
      ) {
        rules.url = true;
      }

      const error = validateField(value, rules, fieldType);
      return error;
    },
    [formKeys]
  );
  const allRequiredFilled = useMemo(() => {
    return inputs.every((input) => {
      if (!input.required) return true;
      return !isValueEmpty(formElements[input.formKey]);
    });
  }, [inputs, formElements, isValueEmpty]);

  useEffect(() => {
    setForm?.(formElements as T);
  }, [formElements, setForm]);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (isEditMode) {
          additionalCancelFunction?.();
        }
        handleClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditMode, additionalCancelFunction, handleClose]);
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, input: GenericInputType) => {
      if (event.target.files?.[0]) {
        const file = event.target.files[0];
        // Store the File object directly in formElements
        setFormElements((prev) => ({ ...prev, [input.formKey]: file }));
      }
    },
    []
  );
  const finalSubmitFunction = () => {
    try {
      // Convert form elements to proper types based on formKeys
      const convertedFormElements = { ...formElements };

      // Ensure ALL formKeys are present with proper defaults
      formKeys.forEach((formKey) => {
        const value = convertedFormElements[formKey.key];

        // Convert boolean values - ensure false default for undefined/null
        if (formKey.type === FormKeyTypeEnum.BOOLEAN) {
          if (value === undefined || value === null || value === "") {
            convertedFormElements[formKey.key] = false;
          } else if (typeof value === "string") {
            convertedFormElements[formKey.key] = value === "true";
          } else if (typeof value === "boolean") {
            convertedFormElements[formKey.key] = value;
          } else {
            // Fallback for any other unexpected type
            convertedFormElements[formKey.key] = false;
          }
        }

        // Convert number values from string to actual number
        if (formKey.type === FormKeyTypeEnum.NUMBER) {
          if (typeof value === "string" && value !== "") {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
              convertedFormElements[formKey.key] = numValue;
            }
          }
        }

        // Convert string array - split comma-separated values into array
        if (formKey.type === FormKeyTypeEnum.STRING_ARRAY) {
          if (typeof value === "string" && value !== "") {
            // Split by comma and trim whitespace from each item
            convertedFormElements[formKey.key] = value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "");
          } else if (Array.isArray(value)) {
            convertedFormElements[formKey.key] = value;
          } else {
            convertedFormElements[formKey.key] = [];
          }
        }

        // Convert int array - split comma-separated values and parse to integers
        if (formKey.type === FormKeyTypeEnum.INT_ARRAY) {
          if (typeof value === "string" && value !== "") {
            convertedFormElements[formKey.key] = value
              .split(",")
              .map((item) => parseInt(item.trim(), 10))
              .filter((item) => !isNaN(item));
          } else if (Array.isArray(value)) {
            convertedFormElements[formKey.key] = value.map((item) =>
              typeof item === "string" ? parseInt(item, 10) : item
            );
          } else {
            convertedFormElements[formKey.key] = [];
          }
        }

        // Convert number array - split comma-separated values and parse to numbers
        if (formKey.type === FormKeyTypeEnum.NUMBER_ARRAY) {
          if (typeof value === "string" && value !== "") {
            convertedFormElements[formKey.key] = value
              .split(",")
              .map((item) => parseFloat(item.trim()))
              .filter((item) => !isNaN(item));
          } else if (Array.isArray(value)) {
            convertedFormElements[formKey.key] = value.map((item) =>
              typeof item === "string" ? parseFloat(item) : item
            );
          } else {
            convertedFormElements[formKey.key] = [];
          }
        }
      });
      if (isEditMode && itemToEdit) {
        submitItem({ id: itemToEdit.id, updates: convertedFormElements as T });
      } else if (isEditMode && handleUpdate) {
        handleUpdate();
      } else {
        if (submitFunction) {
          submitFunction();
        } else {
          submitItem(convertedFormElements as T);
        }
      }
      additionalSubmitFunction?.();
      setFormElements(mergedInitialState);
      setResetTextInput(!resetTextInput);
      setAttemptedSubmit(false);
      isCreateCloseActive && close?.();
    } catch (error) {
      console.error("Failed to execute submit item:", error);
    }
  };
  const handleSubmit = () => {
    if (isConfirmationDialogRequired?.()) {
      setConfirmationDialogFunction(() => finalSubmitFunction);
      setIsConfirmationDialogOpen(true);
    } else {
      finalSubmitFunction();
    }
  };

  const handleInputClear = (input: GenericInputType) => {
    setFormElements((prev) => ({
      ...prev,
      [input.formKey]: initialState[input.formKey],
    }));
    if (input.invalidateKeys) {
      input.invalidateKeys.forEach((key) => {
        setFormElements((prev) => ({
          ...prev,
          [key.key]: initialState[key.key] ?? "",
        }));
      });
    }
  };
  const handleCancelButtonClick = () => {
    additionalCancelFunction?.();
    handleClose();
  };
  const handleCreateButtonClick = () => {
    setAttemptedSubmit(true);

    // Validate all fields
    const errors: Record<string, string> = {};
    inputs.forEach((input) => {
      const value = formElements[input.formKey];
      const error = validateFieldValue(input, value);
      if (error) {
        errors[input.formKey] = error;
      }
    });

    setFieldErrors(errors);

    // If there are validation errors, show error and return
    if (Object.keys(errors).length > 0) {
      toast.error(t("Please fix the errors in the form"));
      return;
    }

    if (!allRequiredFilled && !optionalCreateButtonActive) {
      toast.error(t("Please fill all required fields"));
      return;
    } else if (allRequiredFilled) {
      const phoneValidationFailed = inputs
        .filter((input) => input.additionalType === "phone")
        .some((input) => {
          const inputValue = formElements[input.formKey];
          if (!inputValue.match(/^[0-9]{11}$/)) {
            toast.error(t("Check phone number."));
            return true; // Validation failed for phone number
          }
          return false; // Validation passed for phone number
        });

      if (!phoneValidationFailed) {
        handleSubmit();
      }
    } else if (optionalCreateButtonActive) {
      if (allowOptionalSubmitForActivityTable) {
        handleSubmit();
      } else {
        if (
          JSON.stringify(formElements) !== JSON.stringify(mergedInitialState) &&
          !allRequiredFilled
        ) {
          toast.error(t("Please fill all required fields"));
          return;
        }
        handleSubmit();
      }
    }
  };
  const renderGenericAddEditModal = () => {
    const hasValidationErrors = Object.values(fieldErrors).some(
      (error) => !!error
    );

    if (isTabInputScreenOpen) {
      return (
        <TabInputScreen
          options={tabInputScreenOptions.map((o) => ({
            value: o.value,
            label: o.label,
            imageUrl: o.imageUrl,
            keywords: o?.keywords,
            triggerExtraModal: o?.triggerExtraModal,
          }))}
          topClassName={generalClassName}
          formElements={formElements}
          setFormElements={setFormElements}
          inputs={inputs}
          setForm={setForm as any}
        />
      );
    }
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        className={`bg-white rounded-md shadow-lg ${
          anotherPanelTopClassName
            ? ""
            : "w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 max-w-full"
        }   max-h-[90vh]   ${generalClassName} `}
      >
        <div className="rounded-tl-md rounded-tr-md px-4  flex flex-col gap-4 py-6 justify-between  h-full">
          {upperMessage?.length && upperMessage?.length > 0 && (
            <div className="flex flex-col px-4 py-2 border-b space-y-1">
              {upperMessage.map((msg, index) => (
                <H6 key={index}>{msg}</H6>
              ))}
            </div>
          )}
          <div
            className={`${
              topClassName
                ? topClassName
                : "grid grid-cols-1 md:grid-cols-2 gap-4 "
            }`}
          >
            <div>
              {/* Image inputs */}
              {imageInputs.map((input) => {
                const value = formElements[input.formKey];
                // If value is a File object, create a preview URL
                const imageSrc =
                  value instanceof File
                    ? URL.createObjectURL(value)
                    : value || NO_IMAGE_URL;

                return (
                  <div className="flex flex-col gap-2" key={input.formKey}>
                    <img
                      src={imageSrc}
                      alt="image"
                      className="w-full h-40 object-contain rounded-md"
                    />
                    <label
                      key={input.formKey}
                      className="w-fit ml-auto inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-md cursor-pointer my-auto border-b sm:border-b-0"
                    >
                      {t("Upload")}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileChange(e, input);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            <div
              className={`${
                nonImageInputsClassName
                  ? nonImageInputsClassName
                  : "flex flex-col gap-4"
              }`}
            >
              {/* nonimage inputs */}
              {nonImageInputs.map((input) => {
                // Default boolean fields to false if undefined/null
                const rawValue = formElements[input.formKey];
                const value =
                  input.type === InputTypes.CHECKBOX &&
                  (rawValue === undefined || rawValue === null)
                    ? false
                    : rawValue;
                const handleChange = (key: string) => (value: string) => {
                  const changedInput = inputs.find(
                    (input) => input.formKey === key
                  );
                  setFormElements((prev) => ({ ...prev, [key]: value }));

                  // Validate the field
                  if (changedInput) {
                    const error = validateFieldValue(changedInput, value);
                    setFieldErrors((prev) => ({
                      ...prev,
                      [key]: error || "",
                    }));
                  }

                  if (changedInput?.invalidateKeys) {
                    changedInput.invalidateKeys.forEach((key) => {
                      setFormElements((prev) => ({
                        ...prev,
                        [key.key]: initialState[key.key] ?? "",
                      }));
                    });
                  }
                };
                const handleChangeForSelect =
                  (key: string) =>
                  (
                    selectedValue:
                      | SingleValue<OptionType>
                      | MultiValue<OptionType>,
                    actionMeta: ActionMeta<OptionType>
                  ) => {
                    if (
                      actionMeta?.action === "select-option" ||
                      actionMeta?.action === "remove-value" ||
                      actionMeta?.action === "clear"
                    ) {
                      if (Array.isArray(selectedValue)) {
                        const values = selectedValue.map(
                          (option) => option.value
                        );
                        setFormElements((prev) => ({ ...prev, [key]: values }));
                      } else if (selectedValue) {
                        setFormElements((prev) => ({
                          ...prev,
                          [key]: (selectedValue as OptionType)?.value,
                        }));
                      } else {
                        setFormElements((prev) => ({ ...prev, [key]: "" }));
                      }
                    }
                    const changedInput = inputs.find(
                      (input) => input.formKey === key
                    );
                    if (changedInput?.invalidateKeys) {
                      changedInput.invalidateKeys.forEach((key) => {
                        setFormElements((prev) => ({
                          ...prev,
                          [key.key]: initialState[key.key] ?? "",
                        }));
                      });
                    }
                  };
                if (
                  input.type === InputTypes.SELECT &&
                  !input?.required &&
                  input?.options?.length === 0
                ) {
                  return null;
                }
                if (!input?.isDisabled) {
                  const showError =
                    attemptedSubmit &&
                    input.required &&
                    isValueEmpty(formElements[input.formKey]);
                  return (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      key={input.formKey}
                      className="flex flex-col gap-1"
                    >
                      {input.type === InputTypes.DATE && (
                        <DateInput
                          key={input.formKey + resetTextInput}
                          value={value}
                          label={
                            input.required && input.label
                              ? input.label
                              : input.label ?? ""
                          }
                          placeholder={input.placeholder ?? ""}
                          onChange={(val) =>
                            handleChange(input.formKey)(val ?? "")
                          }
                          isArrowsEnabled={input.isArrowsEnabled ?? false}
                          requiredField={input.required}
                          isOnClearActive={input?.isOnClearActive ?? true}
                          isDateInitiallyOpen={
                            input.isDateInitiallyOpen ?? false
                          }
                          isTopFlexRow={input.isTopFlexRow ?? false}
                          isReadOnly={input.isReadOnly ?? false}
                          onClear={() => {
                            handleInputClear(input);
                          }}
                        />
                      )}
                      {(input.type === InputTypes.TEXT ||
                        input.type === InputTypes.NUMBER ||
                        input.type === InputTypes.TIME ||
                        input.type === InputTypes.COLOR ||
                        input.type === InputTypes.CHECKBOX ||
                        input.type === InputTypes.PASSWORD) && (
                        <TextInput
                          key={input.formKey + resetTextInput}
                          type={input.type}
                          value={value}
                          label={
                            input.required && input.label
                              ? input.label
                              : input.label ?? ""
                          }
                          placeholder={input.placeholder ?? ""}
                          onChange={handleChange(input.formKey)}
                          requiredField={input.required}
                          isOnClearActive={input?.isOnClearActive ?? true}
                          isNumberButtonsActive={
                            input?.isNumberButtonsActive ?? false
                          }
                          isDateInitiallyOpen={
                            input.isDateInitiallyOpen ?? false
                          }
                          isTopFlexRow={input.isTopFlexRow ?? false}
                          minNumber={input?.minNumber ?? 0}
                          isDebounce={input?.isDebounce ?? false}
                          isReadOnly={input.isReadOnly ?? false}
                          isMinNumber={input?.isMinNumber ?? true}
                          error={fieldErrors[input.formKey]}
                          onClear={() => {
                            handleInputClear(input);
                          }}
                        />
                      )}
                      {input.type === InputTypes.HOUR && (
                        <HourInput
                          key={input.formKey}
                          value={value}
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
                      {input.type === InputTypes.MONTHYEAR && (
                        <MonthYearInput
                          key={input.formKey}
                          value={value}
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
                      {input.type === InputTypes.SELECT && (
                        <SelectInput
                          key={
                            input.isMultiple
                              ? input.formKey
                              : input.formKey + formElements[input.formKey]
                          }
                          value={
                            (input.isMultiple
                              ? input.options?.filter((option) =>
                                  formElements[input.formKey]?.includes(
                                    option.value
                                  )
                                )
                              : input?.options?.find(
                                  (option) =>
                                    option?.value ===
                                    formElements[input.formKey]
                                )) ?? null
                          }
                          label={
                            input.required && input.label
                              ? input.label
                              : input.label ?? ""
                          }
                          suggestedOption={input?.suggestedOption}
                          isSortDisabled={input.isSortDisabled ?? false}
                          isAutoFill={input?.isAutoFill}
                          options={input.options ?? []}
                          placeholder={input.placeholder ?? ""}
                          isMultiple={input.isMultiple ?? false}
                          requiredField={input.required}
                          onChange={handleChangeForSelect(input.formKey)}
                          isTopFlexRow={input.isTopFlexRow ?? false}
                          onChangeTrigger={
                            input?.onChangeTrigger
                              ? (value) => {
                                  if (Array.isArray(value)) {
                                    input.onChangeTrigger?.(
                                      value.map((v) => v.value)
                                    );
                                  } else if (value && !Array.isArray(value)) {
                                    input.onChangeTrigger?.(
                                      (value as OptionType).value
                                    );
                                  } else {
                                    input.onChangeTrigger?.(null);
                                  }
                                }
                              : undefined
                          }
                          isOnClearActive={input?.isOnClearActive ?? true}
                          isReadOnly={input.isReadOnly ?? false}
                          onClear={() => {
                            handleInputClear(input);
                          }}
                        />
                      )}
                      {input.type === InputTypes.TAB && (
                        <TabInput
                          key={input.formKey + formElements[input.formKey]}
                          value={
                            input.options?.find(
                              (option) =>
                                option?.value === formElements[input.formKey]
                            ) ?? null
                          }
                          label={
                            input.required && input.label
                              ? input.label
                              : input.label ?? ""
                          }
                          suggestedOption={input?.suggestedOption || null}
                          formKey={input.formKey}
                          options={input.options ?? []}
                          placeholder={input.placeholder ?? ""}
                          invalidateKeys={input.invalidateKeys}
                          requiredField={input.required}
                          setFormElements={setFormElements}
                          setForm={setForm as any}
                          formElements={formElements}
                          isTopFlexRow={input.isTopFlexRow ?? false}
                          isReadOnly={input.isReadOnly ?? false}
                          onClear={() => {
                            handleInputClear(input);
                          }}
                        />
                      )}
                      {input.type === InputTypes.TEXTAREA && (
                        <div
                          key={input.formKey}
                          className="flex flex-col gap-2 relative"
                        >
                          <div className="flex items-center">
                            <H6>{input.label}</H6>
                            {input.required && (
                              <>
                                <span className="text-red-400">*</span>
                                <span className="text-xs text-gray-400">
                                  ({t("required")})
                                </span>
                              </>
                            )}
                            {input?.options && input?.options?.length > 0 && (
                              <GenericButton
                                variant="icon"
                                size="sm"
                                className="ml-2 p-1"
                                onClick={() =>
                                  setOpenFor((prev) =>
                                    prev === input.formKey
                                      ? null
                                      : input.formKey
                                  )
                                }
                              >
                                <FaChevronDown size={16} />
                              </GenericButton>
                            )}
                          </div>

                          {openFor === input.formKey && (
                            <>
                              {/* backdrop */}
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenFor(null)}
                              />

                              {/* dropdown */}
                              <ul className="absolute z-20 mt-1 w-full bg-white border rounded shadow-md max-h-40 overflow-auto">
                                {/* full-width cancel row */}
                                <li
                                  className="px-3 py-2 text-red-500 cursor-pointer hover:bg-gray-100"
                                  onMouseDown={() => setOpenFor(null)}
                                >
                                  {t("Close Selection")}
                                </li>

                                {input.options!.map((opt) => (
                                  <li
                                    key={opt.value}
                                    onMouseDown={() => {
                                      handleChange(input.formKey)(
                                        opt.value as string
                                      );
                                      setOpenFor(null);
                                    }}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  >
                                    {opt.label}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          <div className="relative">
                            <textarea
                              value={formElements[input.formKey]}
                              onChange={(e) =>
                                handleChange(input.formKey)(e.target.value)
                              }
                              placeholder={input.placeholder}
                              className={`border text-base border-gray-300 rounded-md p-2 w-full ${input.inputClassName}`}
                            />
                            {formElements[input.formKey] && (
                              <GenericButton
                                variant="icon"
                                size="sm"
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 p-0"
                                onClick={() => handleChange(input.formKey)("")}
                              >
                                <IoIosClose size={28} />
                              </GenericButton>
                            )}
                          </div>
                        </div>
                      )}
                      {showError && (
                        <span className="text-xs text-red-600">
                          {t("This field is required")}
                        </span>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="ml-auto flex flex-row gap-4 mt-auto ">
            <GenericButton
              variant="danger"
              size="md"
              onClick={() => {
                isCancelConfirmationDialogExist
                  ? setIsCancelConfirmationDialogOpen(true)
                  : handleCancelButtonClick();
              }}
            >
              {t(cancelButtonLabel)}
            </GenericButton>
            {additionalButtons &&
              additionalButtons.map((button, index) => {
                return (
                  <GenericButton
                    key={index}
                    variant={
                      button.isInputRequirementCheck && !allRequiredFilled
                        ? "secondary"
                        : "primary"
                    }
                    size="md"
                    onClick={() => {
                      if (
                        button.isInputRequirementCheck &&
                        !allRequiredFilled
                      ) {
                        setAttemptedSubmit(true);
                        toast.error(t("Please fill all required fields"));
                        return;
                      }

                      const handleButtonClick = () => {
                        const preservedValues = button.preservedKeys?.reduce<
                          Partial<typeof formElements>
                        >((acc, key) => {
                          acc[key] = formElements[key];
                          return acc;
                        }, {});

                        button.onClick();

                        if (button?.isInputNeedToBeReset) {
                          setFormElements({
                            ...(constantValues
                              ? { ...initialState, ...constantValues }
                              : initialState),
                            ...preservedValues,
                          });
                          setResetTextInput((prev) => !prev);
                          setAttemptedSubmit(false);
                        }
                        // triggerOnTriggerTabInput();
                      };

                      if (isConfirmationDialogRequired?.()) {
                        setConfirmationDialogFunction(() => handleButtonClick);
                        setIsConfirmationDialogOpen(true);
                      } else {
                        handleButtonClick();
                      }
                    }}
                  >
                    {t(button.label)}
                  </GenericButton>
                );
              })}
            {isSubmitButtonActive && (
              <GenericButton
                variant={
                  hasValidationErrors ||
                  (!allRequiredFilled && !optionalCreateButtonActive)
                    ? "secondary"
                    : "primary"
                }
                disabled={
                  hasValidationErrors ||
                  (!allRequiredFilled && !optionalCreateButtonActive)
                }
                size="md"
                onClick={() => {
                  if (isCreateConfirmationDialogExist) {
                    setIsCreateConfirmationDialogOpen(true);
                  } else {
                    handleCreateButtonClick();
                  }
                }}
              >
                {buttonName
                  ? buttonName
                  : isEditMode
                  ? t("Update")
                  : t("Create")}
              </GenericButton>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="__className_a182b8 fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-[99999]">
      {anotherPanel ? (
        <div
          className={`${anotherPanelTopClassName} rounded-md bg-white relative z-10`}
        >
          {anotherPanel}
          {renderGenericAddEditModal()}
        </div>
      ) : (
        renderGenericAddEditModal()
      )}
      {isCancelConfirmationDialogOpen && (
        <ConfirmationDialog
          isOpen={isCancelConfirmationDialogOpen}
          close={() => {
            setIsCancelConfirmationDialogOpen(false);
          }}
          confirm={() => {
            handleCancelButtonClick();
          }}
          title={t("Cancel Entry")}
          text={`${t("Are you sure you want to cancel this entry?")}`}
        />
      )}
      {isCreateConfirmationDialogOpen && (
        <ConfirmationDialog
          isOpen={isCreateConfirmationDialogOpen}
          close={() => {
            setIsCreateConfirmationDialogOpen(false);
          }}
          confirm={() => {
            handleCreateButtonClick();
            setIsCreateConfirmationDialogOpen(false);
          }}
          title={createConfirmationDialogHeader ?? t("Create Entry")}
          text={
            createConfirmationDialogText ??
            `${t("Are you sure you want to create this entry?")}`
          }
        />
      )}
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          isOpen={isConfirmationDialogOpen}
          close={() => {
            setIsConfirmationDialogOpen(false);
            setConfirmationDialogFunction(null);
          }}
          confirm={() => {
            confirmationDialogFunction?.();
            setIsConfirmationDialogOpen(false);
            setConfirmationDialogFunction(null);
          }}
          title={confirmationDialogHeader ?? t("Create Entry")}
          text={
            confirmationDialogText ??
            `${t("Are you sure you want to create this entry?")}`
          }
        />
      )}
    </div>,
    document.body
  );
};

export default GenericAddEditPanel;
