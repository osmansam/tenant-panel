import { useQueries } from "@tanstack/react-query";
import {
  TableFilterPanelInputConfig,
} from "../types/page";
import {
  GenericInputType,
  InputTypes,
  OptionType,
} from "../components/panelComponents/shared/types";
import { get } from "./api";
import { evaluateRowCondition } from "./genericPageHelpers";

type GenericItem = Record<string, unknown> & { _id: string };
type FilterSelectDataMap = Map<string, Array<Record<string, unknown>>>;

const qs = (params: Record<string, unknown>) =>
  new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => [k, String(v)]),
  ).toString();

const getSelectionFieldName = (field: TableFilterPanelInputConfig) =>
  field.sourceLabelField || field.sourceValueField || "_id";

const filterInputTypeMap: Record<string, InputTypes> = {
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

export const useFilterPanelSelectionData = (
  inputs: TableFilterPanelInputConfig[] = [],
): FilterSelectDataMap => {
  const schemaSelectFields = inputs.filter(
    (field) =>
      field.type === "select" &&
      field.optionsSource === "schema" &&
      field.sourceSchemaName,
  );

  const queryResults = useQueries({
    queries: schemaSelectFields.map((field) => {
      const fieldName = getSelectionFieldName(field);
      const path = `/dynamic/selection?${qs({
        schemaName: field.sourceSchemaName,
        fieldName,
      })}`;

      return {
        queryKey: [
          "dynamic",
          field.sourceSchemaName,
          "selection",
          fieldName,
          "filter-options",
        ],
        queryFn: () => get<Array<Record<string, unknown>>>({ path }),
        enabled: Boolean(field.sourceSchemaName && fieldName),
        staleTime: Infinity,
      };
    }),
  });

  return schemaSelectFields.reduce<FilterSelectDataMap>((map, field, index) => {
    map.set(`filterPanel:${field.formKey}`, queryResults[index]?.data || []);
    return map;
  }, new Map());
};

const parseStaticOptions = (
  field: TableFilterPanelInputConfig,
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

const getFilterOptions = (
  field: TableFilterPanelInputConfig,
  selectDataMap: FilterSelectDataMap,
): OptionType[] => {
  if (field.type !== "select") return [];
  if (field.optionsSource !== "schema") return parseStaticOptions(field);

  const valueField = field.sourceValueField || "_id";
  const labelField = field.sourceLabelField || valueField;
  return (selectDataMap.get(`filterPanel:${field.formKey}`) || [])
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

export const buildConfiguredFilterInputs = (
  fields: TableFilterPanelInputConfig[] | undefined,
  fallbackInputs: GenericInputType[],
  selectDataMap: FilterSelectDataMap,
): GenericInputType[] => {
  if (fields === undefined) return fallbackInputs;

  return fields
    .filter((field) => field.formKey)
    .map((field) => {
      const fallback = fallbackInputs.find(
        (input) => input.formKey === field.formKey,
      );
      return {
        ...(fallback || {}),
        type: filterInputTypeMap[field.type] || InputTypes.TEXT,
        formKey: field.formKey,
        label: field.label || fallback?.label || field.formKey,
        placeholder:
          field.placeholder ||
          fallback?.placeholder ||
          field.label ||
          field.formKey,
        required: field.required ?? fallback?.required ?? false,
        requiredCondition: field.requiredCondition,
        disabledCondition: field.disabledCondition,
        isDisabled: field.isDisabled ?? fallback?.isDisabled,
        isMultiple: field.isMultiple ?? fallback?.isMultiple,
        isNumberButtonsActive:
          field.isNumberButtonsActive ?? fallback?.isNumberButtonsActive,
        options: getFilterOptions(field, selectDataMap),
        sourceFilterCondition: field.sourceFilterCondition,
        invalidateKeys: field.invalidateKeys?.map((key) => ({
          key,
          defaultValue: "",
        })),
        min: field.min ?? fallback?.min,
        max: field.max ?? fallback?.max,
        minLength: field.minLength ?? fallback?.minLength,
        maxLength: field.maxLength ?? fallback?.maxLength,
        pattern: field.pattern ?? fallback?.pattern,
        validationMessage:
          field.validationMessage ?? fallback?.validationMessage,
      };
    });
};

export const getFilterDefaultValues = (
  fields: TableFilterPanelInputConfig[] | undefined,
): Record<string, unknown> =>
  (fields || []).reduce<Record<string, unknown>>((values, field) => {
    if (field.formKey && field.defaultValue !== undefined) {
      values[field.formKey] = field.defaultValue;
    }
    return values;
  }, {});
