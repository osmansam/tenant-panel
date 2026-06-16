import { TableColumnConfig, TableComponentConfig } from "../types/page";
import { Field, Frontend } from "./api/container";

export const getTableColumnConfig = (
  tableConfig: TableComponentConfig | undefined,
  fieldName: string,
): TableColumnConfig | undefined =>
  tableConfig?.columns?.find((column) => column.field === fieldName);

export const getTableDisplayName = (
  tableConfig: TableComponentConfig | undefined,
  field: Field,
): string | undefined => getTableColumnConfig(tableConfig, field.name)?.displayName;

export const getTableCellClassName = (
  tableConfig: TableComponentConfig | undefined,
  field: Field,
) => getTableColumnConfig(tableConfig, field.name)?.cellClassName;

export const getTableLinkConfig = (
  tableConfig: TableComponentConfig | undefined,
  field: Field,
): Frontend | undefined => {
  const link = getTableColumnConfig(tableConfig, field.name)?.link;
  if (link) {
    return {
      linkTemplate: link.template,
      linkLabelField: link.labelField,
      linkType: link.type,
    };
  }

  return field.frontend;
};
