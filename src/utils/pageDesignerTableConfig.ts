import type {
  TableActionConfig,
  TableColumnConfig,
  TableComponentConfig,
} from "../types/page";
import type { Field } from "./api/container";

export const TABLE_ACTION_KIND_OPTIONS: {
  value: TableActionConfig["kind"];
  label: string;
}[] = [
  { value: "create", label: "Create" },
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  { value: "update", label: "Update" },
  { value: "link", label: "Link" },
];

export const TABLE_ROW_ACTION_KIND_OPTIONS: {
  value: TableActionConfig["kind"];
  label: string;
}[] = TABLE_ACTION_KIND_OPTIONS.filter((option) => option.value !== "create");

export const buildDesignerTableColumnsFromFields = (
  fields: Field[],
): TableColumnConfig[] =>
  fields
    .filter((field) => field.name && !["_id", "id"].includes(field.name))
    .map((field) => ({
      field: field.name,
      type: "field" as const,
      displayName: field.frontend?.displayName || "",
      cellClassName: field.frontend?.rowKeyClassName || [],
      link: field.frontend?.linkTemplate
        ? {
            template: field.frontend.linkTemplate,
            labelField: field.frontend.linkLabelField,
            type: field.frontend.linkType || "external",
          }
        : undefined,
    }));

export const hydrateEmptyDesignerTableColumns = (
  tableConfig: TableComponentConfig,
  fields: Field[],
): TableComponentConfig => {
  if (tableConfig.columns && tableConfig.columns.length > 0) {
    return tableConfig;
  }

  return {
    ...tableConfig,
    columns: buildDesignerTableColumnsFromFields(fields),
  };
};

export const mergeDesignerTableColumnsFromNames = (
  currentColumns: TableColumnConfig[] = [],
  fieldNames: string[],
): TableColumnConfig[] => {
  const existingByField = new Map(
    currentColumns
      .filter((column) => column.field?.trim())
      .map((column) => [column.field.trim(), column]),
  );

  const syncedFields = fieldNames
    .map((field) => field.trim())
    .filter(
      (field, index, all) =>
        field && !["_id", "id"].includes(field) && all.indexOf(field) === index,
    );
  const syncedFieldSet = new Set(syncedFields);

  const syncedColumns = syncedFields.map(
    (field) =>
      existingByField.get(field) || {
        field,
        type: "field" as const,
        displayName: "",
      },
  );

  const customColumns = currentColumns.filter((column) => {
    const field = column.field?.trim();
    return field && !["_id", "id"].includes(field) && !syncedFieldSet.has(field);
  });

  return [...syncedColumns, ...customColumns];
};
