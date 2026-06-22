import { FormElementValue, FormElementsState } from "../types";
import {
  FormActionConfig,
  FormAreaKey,
  FormComponentConfig,
  FormFieldConfig,
  FormObjectListConfig,
} from "../types/page";
import {
  FormKeyType,
  FormKeyTypeEnum,
  GenericInputType,
  InputTypes,
  OptionType,
} from "../components/panelComponents/shared/types";
import { evaluateRowCondition } from "./genericPageHelpers";

export type EmbeddedFormObject = Record<string, unknown>;
export type FormSelectionDataMap = Map<
  string,
  Array<Record<string, unknown>>
>;

const inputTypeMap: Record<string, InputTypes> = {
  text: InputTypes.TEXT,
  date: InputTypes.DATE,
  number: InputTypes.NUMBER,
  select: InputTypes.SELECT,
  textarea: InputTypes.TEXTAREA,
  image: InputTypes.IMAGE,
  password: InputTypes.PASSWORD,
  time: InputTypes.TIME,
  color: InputTypes.COLOR,
  checkbox: InputTypes.CHECKBOX,
  hour: InputTypes.HOUR,
  monthYear: InputTypes.MONTHYEAR,
};

const formKeyTypeMap: Record<string, FormKeyTypeEnum> = {
  string: FormKeyTypeEnum.STRING,
  number: FormKeyTypeEnum.NUMBER,
  color: FormKeyTypeEnum.COLOR,
  date: FormKeyTypeEnum.DATE,
  boolean: FormKeyTypeEnum.BOOLEAN,
  checkbox: FormKeyTypeEnum.CHECKBOX,
  stringArray: FormKeyTypeEnum.STRING_ARRAY,
  numberArray: FormKeyTypeEnum.NUMBER_ARRAY,
  intArray: FormKeyTypeEnum.INT_ARRAY,
};

const getDefaultFormKeyType = (field: FormFieldConfig): FormKeyTypeEnum => {
  if (field.formKeyType && formKeyTypeMap[field.formKeyType]) {
    return formKeyTypeMap[field.formKeyType];
  }
  if (field.isMultiple) return FormKeyTypeEnum.STRING_ARRAY;
  if (field.type === "number") return FormKeyTypeEnum.NUMBER;
  if (field.type === "checkbox") return FormKeyTypeEnum.BOOLEAN;
  if (field.type === "color") return FormKeyTypeEnum.COLOR;
  if (["date", "time", "hour", "monthYear"].includes(field.type)) {
    return FormKeyTypeEnum.DATE;
  }
  return FormKeyTypeEnum.STRING;
};

const parseStaticOptions = (field: FormFieldConfig): OptionType[] => {
  if (field.staticOptions?.length) {
    return field.staticOptions.map((option) => ({ ...option }));
  }
  if (!field.staticOptionsJson?.trim()) return [];
  try {
    const parsed = JSON.parse(field.staticOptionsJson);
    return Array.isArray(parsed)
      ? parsed
          .filter((item) => item && item.value !== undefined)
          .map((item) => ({
            value: item.value,
            label: String(item.label ?? item.value),
          }))
      : [];
  } catch {
    return [];
  }
};

const getFieldOptions = (
  field: FormFieldConfig,
  selectionDataMap: FormSelectionDataMap,
): OptionType[] => {
  if (field.type !== "select") return [];
  if (field.optionsSource !== "schema") return parseStaticOptions(field);
  const valueField = field.sourceValueField || "_id";
  const labelField = field.sourceLabelField || valueField;
  return (selectionDataMap.get(field.formKey) || []).map((item) => ({
    value: String(item[valueField] ?? item._id ?? ""),
    label: String(item[labelField] ?? item[valueField] ?? item._id ?? ""),
    sourceItem: item,
  }));
};

export const buildFormInputs = (
  form: FormComponentConfig,
  selectionDataMap: FormSelectionDataMap,
): GenericInputType[] => {
  const fieldsByKey = new Map(
    (form.fields || []).map((field) => [field.formKey, field]),
  );
  return (form.fields || [])
    .filter((field) => field.formKey)
    .slice()
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
    .map((field) => ({
      type: inputTypeMap[field.type] || InputTypes.TEXT,
      formKey: field.formKey,
      label: field.label || field.formKey,
      placeholder: field.placeholder || field.label || field.formKey,
      required: !!field.required,
      requiredCondition: field.requiredCondition,
      disabledCondition: field.disabledCondition,
      isDisabled: field.isDisabled,
      isMultiple: field.isMultiple,
      isNumberButtonsActive: field.isNumberButtonsActive,
      options: getFieldOptions(field, selectionDataMap),
      sourceFilterCondition: field.sourceFilterCondition,
      invalidateKeys: field.invalidateKeys?.map((key) => ({
        key,
        defaultValue:
          fieldsByKey.get(key)?.defaultValue ??
          defaultValueForType(
            getDefaultFormKeyType(
              fieldsByKey.get(key) || {
                formKey: key,
                type: "text",
              },
            ),
          ) ??
          "",
      })),
      min: field.min,
      max: field.max,
      minLength: field.minLength,
      maxLength: field.maxLength,
      pattern: field.pattern,
      validationMessage: field.validationMessage,
    }));
};

export const buildFormKeys = (form: FormComponentConfig): FormKeyType[] =>
  (form.fields || [])
    .filter((field) => field.formKey)
    .map((field) => ({
      key: field.formKey,
      type: getDefaultFormKeyType(field),
    }));

const defaultValueForType = (type: string) => {
  switch (type) {
    case FormKeyTypeEnum.NUMBER:
      return null;
    case FormKeyTypeEnum.BOOLEAN:
    case FormKeyTypeEnum.CHECKBOX:
      return false;
    case FormKeyTypeEnum.STRING_ARRAY:
    case FormKeyTypeEnum.NUMBER_ARRAY:
    case FormKeyTypeEnum.INT_ARRAY:
      return [];
    default:
      return "";
  }
};

export const buildInitialFormState = (
  form: FormComponentConfig,
): FormElementsState => {
  const state = buildFormKeys(form).reduce<FormElementsState>((current, key) => {
    current[key.key] = defaultValueForType(key.type);
    return current;
  }, {});

  (form.fields || []).forEach((field) => {
    if (field.defaultValue !== undefined) {
      state[field.formKey] = field.defaultValue;
    }
  });
  (form.objectLists || []).forEach((objectList) => {
    state[objectList.key] = [];
  });
  return state;
};

export const getFieldArea = (field: FormFieldConfig): FormAreaKey =>
  field.area || "main";

export const getObjectListArea = (
  objectList: FormObjectListConfig,
): FormAreaKey => objectList.area || "right";

export const getAreaClassName = (area: FormAreaKey) => {
  switch (area) {
    case "top":
    case "bottom":
      return "lg:col-span-full";
    case "left":
      return "lg:col-start-1";
    case "right":
      return "lg:col-start-2";
    default:
      return "";
  }
};

export const normalizeObjectListValue = (
  value: unknown,
): EmbeddedFormObject[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is EmbeddedFormObject =>
          item !== null && typeof item === "object" && !Array.isArray(item),
      )
    : [];

export const copySourceFieldsToObject = (
  formElements: FormElementsState,
  sourceFields: string[] = [],
): EmbeddedFormObject =>
  sourceFields.reduce<EmbeddedFormObject>((item, field) => {
    item[field] = formElements[field];
    return item;
  }, {});

export const addOrReplaceObjectListItem = (
  currentItems: unknown,
  item: EmbeddedFormObject,
  editingIndex: number | null,
): EmbeddedFormObject[] => {
  const items = normalizeObjectListValue(currentItems);
  if (editingIndex === null || !items[editingIndex]) {
    return [...items, item];
  }
  return items.map((current, index) =>
    index === editingIndex ? item : current,
  );
};

export const removeObjectListItem = (
  currentItems: unknown,
  itemIndex: number,
): EmbeddedFormObject[] =>
  normalizeObjectListValue(currentItems).filter(
    (_item, index) => index !== itemIndex,
  );

export const adjustObjectListNumber = (
  currentItems: unknown,
  itemIndex: number,
  field: string,
  delta: number,
  min?: number,
  max?: number,
): EmbeddedFormObject[] =>
  normalizeObjectListValue(currentItems).map((item, index) => {
    if (index !== itemIndex) return item;
    const currentValue = Number(item[field] ?? 0);
    const safeCurrent = Number.isFinite(currentValue) ? currentValue : 0;
    const nextValue = Math.min(
      max ?? Number.POSITIVE_INFINITY,
      Math.max(min ?? Number.NEGATIVE_INFINITY, safeCurrent + delta),
    );
    return { ...item, [field]: nextValue };
  });

export const resolveFormTemplate = (
  template: string | undefined,
  item: EmbeddedFormObject,
): string => {
  if (!template?.trim()) return "";
  return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key: string) => {
    const value = item[key.trim()];
    return value === undefined || value === null ? "" : String(value);
  });
};

export const getObjectDisplayText = (
  item: EmbeddedFormObject,
  field?: string,
  template?: string,
): string => {
  const resolvedTemplate = resolveFormTemplate(template, item);
  if (resolvedTemplate) return resolvedTemplate;
  const value = field ? item[field] : undefined;
  return value === undefined || value === null ? "" : String(value);
};

export const getEnabledFormActions = (
  form: FormComponentConfig,
  kind: FormActionConfig["kind"],
): FormActionConfig[] =>
  (form.actions || [])
    .filter((action) => action.enabled !== false && action.kind === kind)
    .slice()
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0));

const normalizeCondition = (condition: string) =>
  condition
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/\\u0026/gi, "&");

export const isFormConditionMet = (
  condition: string | undefined,
  formElements: FormElementsState,
) =>
  Boolean(
    condition?.trim() &&
      evaluateRowCondition(
        formElements as Record<string, unknown> & { _id: string },
        normalizeCondition(condition),
      ),
  );

export const filterFormInputOptions = (
  input: GenericInputType,
  formElements: FormElementsState,
): GenericInputType => {
  if (!input.sourceFilterCondition?.trim()) return input;
  const condition = input.sourceFilterCondition.replace(
    /\{\{\s*([^}]+?)\s*\}\}/g,
    (_match, key: string) => {
      const value = formElements[key.trim()];
      if (value === undefined || value === null || value === "") return '""';
      return typeof value === "number" || typeof value === "boolean"
        ? String(value)
        : JSON.stringify(String(value));
    },
  );
  return {
    ...input,
    options: (input.options || []).filter((option) =>
      option.sourceItem
        ? evaluateRowCondition(
            option.sourceItem as Record<string, unknown> & { _id: string },
            normalizeCondition(condition),
          )
        : true,
    ),
  };
};

export const getAddObjectActions = (
  form: FormComponentConfig,
): FormActionConfig[] => [
  ...getEnabledFormActions(form, "addObject"),
  ...(form.objectLists || []).flatMap((objectList) =>
    objectList.addAction?.enabled !== false && objectList.addAction
      ? [{ ...objectList.addAction, targetObjectList: objectList.key }]
      : [],
  ),
];

const convertFieldValue = (field: FormFieldConfig, value: unknown) => {
  const keyType = getDefaultFormKeyType(field);
  if (keyType === FormKeyTypeEnum.NUMBER) {
    if (value === "" || value === null || value === undefined) return null;
    const converted = Number(value);
    return Number.isFinite(converted) ? converted : value;
  }
  if (
    keyType === FormKeyTypeEnum.BOOLEAN ||
    keyType === FormKeyTypeEnum.CHECKBOX
  ) {
    return value === true || value === "true";
  }
  if (
    keyType === FormKeyTypeEnum.STRING_ARRAY ||
    keyType === FormKeyTypeEnum.NUMBER_ARRAY ||
    keyType === FormKeyTypeEnum.INT_ARRAY
  ) {
    const values = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
    if (keyType === FormKeyTypeEnum.STRING_ARRAY) return values;
    return values
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item));
  }
  return value;
};

export const buildFormSubmitPayload = (
  form: FormComponentConfig,
  formElements: FormElementsState,
): Record<string, unknown> => {
  const transientFields = new Set(
    getAddObjectActions(form).flatMap(
      (action) => action.sourceFields || [],
    ),
  );
  const payload: Record<string, unknown> = {};
  (form.fields || []).forEach((field) => {
    if (!transientFields.has(field.formKey)) {
      payload[field.formKey] = convertFieldValue(
        field,
        formElements[field.formKey],
      );
    }
  });
  (form.objectLists || []).forEach((objectList) => {
    const items = normalizeObjectListValue(formElements[objectList.key]);
    payload[objectList.key] = objectList.itemFields?.length
      ? items.map((item) =>
          objectList.itemFields!.reduce<EmbeddedFormObject>((projected, key) => {
            projected[key] = item[key];
            return projected;
          }, {}),
        )
      : items;
  });
  return { ...payload, ...(form.submit?.constantValues || {}) };
};

export const getFormSubmitMode = (form: FormComponentConfig) =>
  form.submit?.mode || "create";

export const buildFormSubmitRequestBody = (
  form: FormComponentConfig,
  formElements: FormElementsState,
): Record<string, unknown> | EmbeddedFormObject[] => {
  const payload = buildFormSubmitPayload(form, formElements);
  if (getFormSubmitMode(form) === "createMany") {
    return normalizeObjectListValue(
      payload[form.submit?.bulkObjectListKey || ""],
    );
  }
  if (getFormSubmitMode(form) === "workflow") {
    return { record: payload };
  }
  return payload;
};

const getPreviewValue = (field: FormFieldConfig): FormElementValue => {
  if (field.defaultValue !== undefined) return field.defaultValue;
  if (field.isMultiple) return [];
  if (field.type === "number") return 0;
  if (field.type === "checkbox") return false;
  return "";
};

export const buildFormSubmitRequestPreview = (
  form: FormComponentConfig,
): Record<string, unknown> | EmbeddedFormObject[] => {
  const previewState = (form.fields || []).reduce<FormElementsState>(
    (state, field) => ({ ...state, [field.formKey]: getPreviewValue(field) }),
    {},
  );
  const fieldsByKey = new Map(
    (form.fields || []).map((field) => [field.formKey, field]),
  );
  (form.objectLists || []).forEach((objectList) => {
    previewState[objectList.key] = [
      (objectList.itemFields || []).reduce<EmbeddedFormObject>((item, key) => {
        const field = fieldsByKey.get(key);
        item[key] = field ? getPreviewValue(field) : "";
        return item;
      }, {}),
    ];
  });
  return buildFormSubmitRequestBody(form, previewState);
};
