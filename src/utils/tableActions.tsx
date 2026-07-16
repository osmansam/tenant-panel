import { useQueries } from "@tanstack/react-query";
import {
  TableActionConfig,
  TableActionFormFieldConfig,
  TableComponentConfig,
} from "../types/page";
import {
  FormKeyType,
  FormKeyTypeEnum,
  GenericInputType,
  InputTypes,
  OptionType,
} from "../components/panelComponents/shared/types";
import { get } from "./api";
import { Field } from "./api/container";
import { evaluateRowCondition } from "./genericPageHelpers";
import { getIconByName } from "./menuIcons";
import { getSelectionQueryConfig } from "./selectionQuery";

type GenericItem = Record<string, unknown> & { _id: string };
type ActionSelectDataMap = Map<string, Array<Record<string, unknown>>>;
type SelectionResponse =
  | Array<Record<string, unknown>>
  | {
      data?: Array<Record<string, unknown>>;
      items?: Array<Record<string, unknown>>;
    };

const getSelectionFieldName = (field: TableActionFormFieldConfig) =>
  field.sourceLabelField || field.sourceValueField || "_id";

export const getActionId = (action: TableActionConfig, index: number) =>
  action.id || `${action.kind}-${action.label || index}`;

export const getConfiguredTableActions = (
  tableConfig: TableComponentConfig | undefined,
  schemaActions?: TableActionConfig[],
): TableActionConfig[] | undefined => {
  const actions =
    tableConfig?.actions && tableConfig.actions.length > 0
      ? tableConfig.actions
      : schemaActions && schemaActions.length > 0
      ? schemaActions
      : undefined;

  return actions
    ?.filter((action) => action.enabled !== false)
    .slice()
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
};

export const getConfiguredCreateAction = (
  tableConfig: TableComponentConfig | undefined,
  schemaActions?: TableActionConfig[],
): TableActionConfig | undefined =>
  tableConfig?.addButton !== undefined
    ? tableConfig.addButton.enabled !== false
      ? tableConfig.addButton
      : undefined
    : getConfiguredTableActions(tableConfig, schemaActions)?.find(
        (action) => action.kind === "create",
      );

export const getConfiguredRowActions = (
  tableConfig: TableComponentConfig | undefined,
  schemaActions?: TableActionConfig[],
): TableActionConfig[] | undefined => {
  const actions = getConfiguredTableActions(tableConfig, schemaActions);
  if (!actions) return undefined;
  return actions.filter((action) => action.kind !== "create");
};

export const getActionConstantValues = (
  action: TableActionConfig,
): Record<string, unknown> => {
  if (action.constantValues) return action.constantValues;
  if (!action.constantValuesJson?.trim()) return {};

  try {
    const parsed = JSON.parse(action.constantValuesJson);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
};

export const resolveActionTemplate = (
  template: string,
  row: GenericItem,
): string =>
  template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key: string) => {
    const value = row[key.trim()];
    return value === null || value === undefined ? "" : String(value);
  });

export const getActionIconElement = (
  action: TableActionConfig,
  fallbackIconName?: string,
) => {
  const Icon = getIconByName(action.icon || fallbackIconName || "");
  return <Icon />;
};

export const filterActionFields = (
  fields: Field[],
  _action: TableActionConfig,
): Field[] => fields;

export const useActionFormSelectionData = (
  actions: TableActionConfig[] = [],
): ActionSelectDataMap => {
  const schemaSelectFields = actions.flatMap((action, actionIndex) =>
    (action.formFields || [])
      .filter(
        (field) =>
          field.type === "select" &&
          field.optionsSource === "schema" &&
          field.sourceSchemaName,
      )
      .map((field) => ({
        actionId: getActionId(action, actionIndex),
        field,
      })),
  );

  const queryResults = useQueries({
    queries: schemaSelectFields.map(({ field }) => {
      const fieldName = getSelectionFieldName(field);
      const { path, queryKey } = getSelectionQueryConfig({
        schemaName: field.sourceSchemaName || "",
        fieldName,
      });

      return {
        queryKey,
        queryFn: () => get<SelectionResponse>({ path }),
        enabled: Boolean(field.sourceSchemaName && fieldName),
        staleTime: Infinity,
      };
    }),
  });

  return schemaSelectFields.reduce<ActionSelectDataMap>((map, item, index) => {
    const rawData = queryResults[index]?.data;
    const items = Array.isArray(rawData)
      ? rawData
      : rawData?.data || rawData?.items || [];

    map.set(
      `${item.actionId}:${item.field.formKey}`,
      items,
    );
    return map;
  }, new Map());
};

const parseStaticOptions = (
  field: TableActionFormFieldConfig,
): OptionType[] => {
  if (field.staticOptions?.length) {
    return field.staticOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));
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
  actionId: string,
  field: TableActionFormFieldConfig,
  selectDataMap: ActionSelectDataMap,
): OptionType[] => {
  if (field.type !== "select") return [];
  if (field.optionsSource !== "schema") return parseStaticOptions(field);

  const valueField = field.sourceValueField || "_id";
  const labelField = field.sourceLabelField || valueField;
  return (selectDataMap.get(`${actionId}:${field.formKey}`) || [])
    .filter((item) =>
      field.sourceFilterCondition?.trim()
        ? evaluateRowCondition(item as GenericItem, field.sourceFilterCondition)
        : true,
    )
    .map((item) => ({
      value: String(item[valueField] ?? item._id ?? ""),
      label: String(item[labelField] ?? item[valueField] ?? item._id ?? ""),
      sourceItem: item,
    }));
};

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

const defaultFormKeyTypeForInput = (
  field: TableActionFormFieldConfig,
): FormKeyTypeEnum => {
  if (field.formKeyType) return formKeyTypeMap[field.formKeyType];
  if (field.isMultiple) return FormKeyTypeEnum.STRING_ARRAY;

  switch (field.type) {
    case "number":
      return FormKeyTypeEnum.NUMBER;
    case "date":
    case "time":
    case "hour":
    case "monthYear":
      return FormKeyTypeEnum.DATE;
    case "checkbox":
      return FormKeyTypeEnum.BOOLEAN;
    case "color":
      return FormKeyTypeEnum.COLOR;
    default:
      return FormKeyTypeEnum.STRING;
  }
};

export const buildActionFormInputs = (
  action: TableActionConfig,
  actionId: string,
  row: GenericItem | null,
  selectDataMap: ActionSelectDataMap,
): GenericInputType[] =>
  (action.formFields || [])
    .filter((field) => field.formKey)
    .map((field) => ({
      type: inputTypeMap[field.type] || InputTypes.TEXT,
      formKey: field.formKey,
      label: field.label || field.formKey,
      placeholder: field.placeholder || field.label || field.formKey,
      required:
        !!field.required ||
        (!!row &&
          !!field.requiredCondition?.trim() &&
          evaluateRowCondition(row, field.requiredCondition)),
      requiredCondition: field.requiredCondition,
      disabledCondition: field.disabledCondition,
      isMultiple: field.isMultiple,
      isNumberButtonsActive: field.isNumberButtonsActive,
      options: getFieldOptions(actionId, field, selectDataMap),
      sourceFilterCondition: field.sourceFilterCondition,
      invalidateKeys: field.invalidateKeys?.map((key) => ({
        key,
        defaultValue: "",
      })),
      min: field.min,
      max: field.max,
      minLength: field.minLength,
      maxLength: field.maxLength,
      pattern: field.pattern,
      validationMessage: field.validationMessage,
    }));

export const buildActionFormKeys = (
  action: TableActionConfig,
): FormKeyType[] =>
  (action.formFields || [])
    .filter((field) => field.formKey)
    .map((field) => ({
      key: field.formKey,
      type: defaultFormKeyTypeForInput(field),
    }));

export const getActionDefaultValues = (
  action: TableActionConfig,
): Record<string, unknown> =>
  (action.formFields || []).reduce<Record<string, unknown>>((values, field) => {
    if (field.formKey && field.defaultValue !== undefined) {
      values[field.formKey] = field.defaultValue;
    }
    return values;
  }, {});
