import type { Field } from "./api/container";
import type {
  ParameterBinding,
  TableActionFormFieldConfig,
  TableComponentConfig,
} from "../types/page";

const scalarIdentityTypes = new Set(["string", "enum", "int", "number", "float", "boolean", "objectid"]);

export const eligibleArrayFields = (fields: Field[]): Field[] =>
  fields.filter((field) => field.type.toLowerCase() === "array" && (field.children?.length || 0) > 0);

export const eligibleIdentityFields = (arrayField: Field | undefined): Field[] =>
  (arrayField?.children || []).filter(
    (field) =>
      scalarIdentityTypes.has(field.type.toLowerCase()) &&
      (field.unique === true || (field.tag || "").split(",").includes("required")),
  );

const formFieldForChild = (field: Field): TableActionFormFieldConfig => {
  const type = field.type.toLowerCase();
  const isRelation = type === "objectid" || type === "objectidarray";
  return {
    id: `array-${field.name}`,
    formKey: field.name,
    type: isRelation || type === "enum" ? "select" : type === "boolean" ? "checkbox" : ["int", "number", "float"].includes(type) ? "number" : "text",
    formKeyType: type === "boolean" ? "boolean" : ["int", "number", "float"].includes(type) ? "number" : type === "objectidarray" ? "stringArray" : "string",
    label: field.frontend?.displayName || field.name,
    required: (field.tag || "").split(",").includes("required"),
    isMultiple: type === "objectidarray",
    ...(isRelation
      ? {
          optionsSource: "schema" as const,
          sourceSchemaName: field.objectSchemaName,
          sourceValueField: "_id",
          sourceLabelField: field.populationSettings?.inputSelectionField || field.populationSettings?.displayFields?.[0] || "name",
        }
      : {}),
  };
};

export interface GenerateArrayTableOptions {
  parentId: ParameterBinding;
  arrayField: Field;
  rowIdentityField: string;
  enabled: { columns: boolean; add: boolean; edit: boolean; delete: boolean; reorder: boolean };
  orderField?: string;
}

export const generateArrayTableDefaults = ({ parentId, arrayField, rowIdentityField, enabled, orderField }: GenerateArrayTableOptions): TableComponentConfig => {
  const formFields = (arrayField.children || []).map(formFieldForChild);
  return {
    dataMode: "arrayField",
    arraySource: { enabled: true, field: arrayField.name, rowIdentityField, parentId, autoGenerate: enabled },
    columns: enabled.columns ? (arrayField.children || []).map((field) => ({ field: field.name, displayName: field.frontend?.displayName || field.name })) : [],
    addButton: { kind: "create", enabled: enabled.add, buttonName: "Add", modalType: "form", formFields },
    actions: [
      { kind: "edit", enabled: enabled.edit, label: "Edit", modalType: "form", formFields },
      { kind: "delete", enabled: enabled.delete, label: "Delete", modalType: "confirm", confirmTitle: "Delete item", confirmText: "Are you sure you want to delete this item?" },
    ],
    ...(enabled.reorder && orderField ? { drag: { enabled: true, orderField } } : {}),
  };
};

export const cleanArrayTableSource = (
  source: TableComponentConfig["arraySource"],
): TableComponentConfig["arraySource"] | undefined => {
  const field = source?.field?.trim();
  const rowIdentityField = source?.rowIdentityField?.trim();
  if (!source?.enabled || !field || !rowIdentityField) return undefined;

  return {
    enabled: true,
    field,
    rowIdentityField,
    ...(source.parentId ? { parentId: source.parentId } : {}),
    ...(source.autoGenerate ? { autoGenerate: source.autoGenerate } : {}),
  };
};

export const cleanArrayTableDataMode = (
  dataMode: TableComponentConfig["dataMode"],
  source: TableComponentConfig["arraySource"],
): TableComponentConfig["dataMode"] =>
  dataMode === "arrayField" && !cleanArrayTableSource(source)
    ? "paginated"
    : dataMode;

export const reconcileArrayTableDefaults = (current: TableComponentConfig, arrayField: Field): { table: TableComponentConfig; warnings: string[] } => {
  const currentColumns = new Map((current.columns || []).map((column) => [column.field, column]));
  const childNames = new Set((arrayField.children || []).map((field) => field.name));
  const warnings = (current.columns || []).filter((column) => !childNames.has(column.field)).map((column) => `Field ${column.field} no longer exists in ${arrayField.name}.`);
  return {
    table: {
      ...current,
      columns: (arrayField.children || []).map((field) => currentColumns.get(field.name) || { field: field.name, displayName: field.frontend?.displayName || field.name }),
    },
    warnings,
  };
};
