import type {
  RelationMatrixConfig,
  TableActionFormKeyType,
  TableActionInputType,
  TableFilterPanelInputConfig,
} from "../../types/page";
import type { Field } from "../../utils/api/container";

const inputTypeFromField = (field: Field): TableActionInputType => {
  const type = (field.type || "").toLowerCase();
  if (type.includes("date")) return "date";
  if (
    type.includes("number") ||
    type.includes("int") ||
    type.includes("float") ||
    type.includes("double")
  ) return "number";
  if (
    type.includes("bool") ||
    type === "objectid" ||
    type === "autoincrementid" ||
    type === "objectidarray" ||
    Boolean(field.enumList?.length)
  ) return "select";
  return "text";
};

const formKeyTypeForInput = (
  type: TableActionInputType,
  multiple: boolean,
): TableActionFormKeyType => {
  if (multiple) return "stringArray";
  if (type === "number") return "number";
  if (["date", "time", "hour", "monthYear"].includes(type)) return "date";
  return "string";
};

const isMultipleField = (field: Field): boolean =>
  ["objectidarray", "stringarray", "intarray", "numberarray", "string[]", "int[]", "number[]"]
    .includes((field.type || "").toLowerCase());

export const buildRelationMatrixFilterInputs = (
  fields: Field[],
): TableFilterPanelInputConfig[] =>
  fields
    .filter((field) => field.name && !["_id", "id"].includes(field.name))
    .filter((field) => !field.equation)
    .filter((field) => !["image", "img"].includes((field.type || "").toLowerCase()))
    .map((field) => {
      const fieldType = (field.type || "").toLowerCase();
      const type = inputTypeFromField(field);
      const multiple = isMultipleField(field);
      const staticOptions = field.enumList?.length
        ? field.enumList.map((value) => ({ value, label: String(value) }))
        : fieldType.includes("bool")
          ? [
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]
          : [];

      return {
        formKey: field.name,
        type,
        formKeyType: formKeyTypeForInput(type, multiple),
        label: field.frontend?.displayName || field.name,
        placeholder: field.frontend?.displayName || field.name,
        required: false,
        isMultiple: multiple,
        optionsSource: type === "select" && field.objectSchemaName ? "schema" : "static",
        staticOptionsJson: JSON.stringify(staticOptions, null, 2),
        sourceSchemaName: field.objectSchemaName || "",
        sourceValueField: "_id",
        sourceLabelField: field.populationSettings?.inputSelectionField || "",
        sourceFilterCondition: "",
      };
    });

export const EMPTY_RELATION_MATRIX_FILTER: TableFilterPanelInputConfig = {
  formKey: "",
  type: "text",
  formKeyType: "string",
  label: "",
  placeholder: "",
  required: false,
  optionsSource: "static",
  staticOptionsJson: "[]",
  sourceValueField: "_id",
};

export const addRelationMatrixFilterInput = (
  config: RelationMatrixConfig,
): RelationMatrixConfig => ({
  ...config,
  filterPanel: {
    inputs: [
      ...(config.filterPanel?.inputs || []),
      { ...EMPTY_RELATION_MATRIX_FILTER },
    ],
  },
});

export const updateRelationMatrixFilterInput = (
  config: RelationMatrixConfig,
  index: number,
  updates: Partial<TableFilterPanelInputConfig>,
): RelationMatrixConfig => ({
  ...config,
  filterPanel: {
    inputs: (config.filterPanel?.inputs || []).map((input, currentIndex) =>
      currentIndex === index ? { ...input, ...updates } : input,
    ),
  },
});

export const removeRelationMatrixFilterInput = (
  config: RelationMatrixConfig,
  index: number,
): RelationMatrixConfig => ({
  ...config,
  filterPanel: {
    inputs: (config.filterPanel?.inputs || []).filter(
      (_, currentIndex) => currentIndex !== index,
    ),
  },
});
