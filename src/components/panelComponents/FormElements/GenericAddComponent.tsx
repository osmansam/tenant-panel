import { useMutation } from "@tanstack/react-query";
import { AxiosHeaders } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { toast } from "react-toastify";
import {
  FormElementsState,
  FormElementValue,
  NO_IMAGE_URL,
  OptionType,
} from "../../../types";
import { postWithHeader, UpdatePayload } from "../../../utils/api";
import { GenericButton } from "../FormElements/GenericButton";
import { H4, H6 } from "../Typography";
import {
  FormKeyType,
  FormKeyTypeEnum,
  GenericInputType,
  InputTypes,
} from "../shared/types";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

type Props<T> = {
  inputs: GenericInputType[];
  formKeys: FormKeyType[];
  topClassName?: string;
  header?: string;
  submitItem: (item: T | UpdatePayload<T>) => void;
  setForm?: (item: T) => void;
  handleUpdate?: () => void;
  submitFunction?: () => void;
  additionalSubmitFunction?: () => void;
  constantValues?: { [key: string]: FormElementValue };
  isEditMode?: boolean;
  showRequired?: boolean;
  folderName?: string;
  buttonName?: string;
  itemToEdit?: {
    id: number | string;
    updates: T;
  };
};

const GenericAddComponent = <T,>({
  inputs,
  formKeys,
  buttonName,
  constantValues,
  topClassName,
  header,
  showRequired = false,
  isEditMode = false,
  itemToEdit,
  folderName,
  handleUpdate,
  submitFunction,
  additionalSubmitFunction,
  setForm,
  submitItem,
}: Props<T>) => {
  const { t } = useTranslation();
  const [imageFormKey, setImageFormKey] = useState<string>("");
  const [textInputKey, setTextInputKey] = useState<number>(0);
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
          defaultValue = "";
          break;
        case FormKeyTypeEnum.BOOLEAN:
          defaultValue = false;
          break;
        case FormKeyTypeEnum.DATE:
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
  const [formElements, setFormElements] = useState(() => {
    if (isEditMode && itemToEdit) {
      return itemToEdit.updates as unknown as FormElementsState;
    }
    const mergedInitialState = { ...initialState, ...constantValues };
    return mergedInitialState;
  });

  const uploadImageMutation = useMutation({
    mutationFn: async ({
      file,
      filename,
    }: {
      file: File;
      filename: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);
      formData.append("foldername", folderName ?? "forgotton");

      const res = await postWithHeader<FormData, { url: string }>({
        path: "/asset/upload",
        payload: formData,
        headers: new AxiosHeaders({
          "Content-Type": "multipart/form-data",
        }),
      });
      return res;
    },
    onSuccess: (data: { url: string }) => {
      setFormElements((prev) => ({ ...prev, [imageFormKey]: data.url }));
    },
    onError: (error: Error) => {
      console.error("Error uploading file:", error);
    },
  });

  const allRequiredFilled = useMemo(() => {
    return inputs.every((input) => {
      if (!input.required) return true;
      const value = formElements[input.formKey];
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== "";
    });
  }, [inputs, formElements]);

  useEffect(() => {
    setForm?.(formElements as T);
  }, [formElements, setForm]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, input: GenericInputType) => {
      setImageFormKey(input.formKey);
      if (event.target.files?.[0]) {
        const file = event.target.files[0];
        const filename = file.name;
        uploadImageMutation.mutate({
          file,
          filename,
        });
      }
    },
    [uploadImageMutation]
  );
  const handleSubmit = () => {
    try {
      if (isEditMode && itemToEdit) {
        submitItem({ id: itemToEdit.id, updates: formElements as T });
      } else if (isEditMode && handleUpdate) {
        handleUpdate();
      } else {
        if (submitFunction) {
          submitFunction();
        } else {
          submitItem(formElements as T);
        }
      }
      setFormElements({ ...initialState, ...constantValues });
      setTextInputKey((prev) => prev + 1);
      additionalSubmitFunction?.();
    } catch (error) {
      console.error("Failed to execute submit item:", error);
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
          [key.key]: initialState[key.key],
        }));
      });
    }
  };
  return (
    <div className="w-5/6 sm:w-1/2 flex flex-col gap-8 px-4 py-4 border border-gray-200 rounded-lg bg-white shadow-sm mx-auto __className_a182b8 ">
      <div className="rounded-tl-md rounded-tr-md px-4 py-6 flex flex-col gap-4 justify-between ">
        {header && <H4>{header}</H4>}
        <div
          className={`${
            topClassName
              ? topClassName
              : "grid grid-cols-1 md:grid-cols-2 gap-4 "
          }`}
        >
          <div>
            {/* Image inputs */}
            {imageInputs.map((input) => (
              <div className="flex flex-col gap-2" key={input.formKey}>
                <img
                  src={
                    formElements[input.formKey] &&
                    typeof formElements[input.formKey] === "string"
                      ? (formElements[input.formKey] as string)
                      : NO_IMAGE_URL
                  }
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
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {/* nonimage inputs */}
            {nonImageInputs.map((input) => {
              const value = formElements[input.formKey];
              const handleChange =
                (key: string) => (value: FormElementValue) => {
                  const changedInput = inputs.find(
                    (input) => input.formKey === key
                  );
                  if (changedInput?.invalidateKeys) {
                    changedInput.invalidateKeys.forEach((key) => {
                      setFormElements((prev) => ({
                        ...prev,
                        [key.key]: key.defaultValue,
                      }));
                    });
                  }
                  setFormElements((prev) => ({ ...prev, [key]: value }));
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
                    actionMeta.action === "select-option" ||
                    actionMeta.action === "remove-value" ||
                    actionMeta.action === "clear"
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
                        [key.key]: key.defaultValue,
                      }));
                    });
                  }
                };

              if (!input?.isDisabled) {
                return (
                  <div key={input.formKey} className="flex flex-col gap-2">
                    {(input.type === InputTypes.TEXT ||
                      input.type === InputTypes.NUMBER ||
                      input.type === InputTypes.TIME ||
                      input.type === InputTypes.COLOR ||
                      input.type === InputTypes.CHECKBOX ||
                      input.type === InputTypes.PASSWORD) && (
                      <TextInput
                        key={input.formKey + String(textInputKey)}
                        type={input.type}
                        value={value}
                        label={input.label ?? ""}
                        placeholder={input.placeholder ?? ""}
                        onChange={handleChange(input.formKey)}
                        requiredField={input.required && showRequired}
                        onClear={() => {
                          handleInputClear(input);
                        }}
                      />
                    )}
                    {input.type === InputTypes.DATE && (
                      <DateInput
                        key={input.formKey}
                        value={typeof value === "string" ? value : ""}
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
                        isDateInitiallyOpen={input.isDateInitiallyOpen ?? false}
                        isTopFlexRow={input.isTopFlexRow ?? false}
                        isReadOnly={input.isReadOnly ?? false}
                        onClear={() => {
                          handleInputClear(input);
                        }}
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
                          input.isMultiple
                            ? input.options?.filter((option) => {
                                const fieldValue = formElements[input.formKey];
                                return (
                                  Array.isArray(fieldValue) &&
                                  (fieldValue as (string | number)[]).includes(
                                    option.value
                                  )
                                );
                              }) || []
                            : input.options?.find(
                                (option) =>
                                  option.value === formElements[input.formKey]
                              ) || null
                        }
                        label={input.label ?? ""}
                        options={input.options ?? []}
                        placeholder={input.placeholder ?? ""}
                        requiredField={input.required && showRequired}
                        isAutoFill={input.isAutoFill ?? true}
                        isMultiple={input.isMultiple ?? false}
                        onChange={handleChangeForSelect(input.formKey)}
                        onClear={() => {
                          handleInputClear(input);
                        }}
                      />
                    )}
                    {input.type === InputTypes.TEXTAREA && (
                      <div className="flex flex-col gap-2" key={input.formKey}>
                        <div className="flex flex-row items-center ">
                          <H6>{input.label}</H6>
                          {input.required && showRequired && (
                            <>
                              <span className="text-red-400">* </span>
                              <span className="text-xs text-gray-400">
                                {"("} {t("required")} {")"}
                              </span>
                            </>
                          )}
                        </div>
                        <textarea
                          value={typeof value === "string" ? value : ""}
                          onChange={(e) => {
                            handleChange(input.formKey)(e.target.value);
                          }}
                          placeholder={input.placeholder ?? ""}
                          className="border text-sm border-gray-300 rounded-md p-2 min-h-40"
                        />
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <GenericButton
          onClick={() => {
            if (!allRequiredFilled) {
              toast.error(t("Please fill all required fields"));
            } else {
              const phoneValidationFailed = inputs
                .filter((input) => input.additionalType === "phone")
                .some((input) => {
                  const inputValue = formElements[input.formKey];
                  if (
                    typeof inputValue !== "string" ||
                    !inputValue.match(/^[0-9]{11}$/)
                  ) {
                    toast.error(t("Check phone number."));
                    return true; // Validation failed for phone number
                  }
                  return false; // Validation passed for phone number
                });

              if (!phoneValidationFailed) {
                handleSubmit();
              }
            }
          }}
          variant={!allRequiredFilled ? "secondary" : "primary"}
          size="sm"
          className="ml-auto"
        >
          {buttonName ? buttonName : isEditMode ? t("Update") : t("Create")}
        </GenericButton>
      </div>
    </div>
  );
};

export default GenericAddComponent;
