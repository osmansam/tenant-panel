import {
  TableColumnConfig,
  TableComponentConfig,
  TableLookupLabelConfig,
  TableNestedRowColumnConfig,
} from "../types/page";
import { Field, Frontend } from "./api/container";

const CONDITION_KEYWORD_VALUES = new Set([
  "true",
  "false",
  "null",
  "undefined",
]);

export const getTableColumnConfig = (
  tableConfig: TableComponentConfig | undefined,
  fieldName: string,
): TableColumnConfig | undefined =>
  tableConfig?.columns?.find((column) => column.field === fieldName);

export const isTableSearchEnabled = (
  tableConfig: TableComponentConfig | undefined,
): boolean => tableConfig?.enableSearch !== false;

type GenericTableRow = Record<string, unknown>;
type LookupColumnConfig =
  | TableColumnConfig
  | (TableNestedRowColumnConfig & { fallbackValue?: string });
export type TableLookupSelectionDataMap = Map<string, GenericTableRow[]>;
type NestedTableRow<T extends GenericTableRow> = T & {
  collapsible?: {
    collapsibleHeader?: string;
    collapsibleColumns: { key: string; isSortable: boolean }[];
    collapsibleRows: GenericTableRow[];
    collapsibleRowKeys: {
      key: string;
      isDate: boolean;
      node?: (row: GenericTableRow) => unknown;
    }[];
  };
};

const nestedRowValue = (item: unknown): GenericTableRow =>
  item && typeof item === "object" && !Array.isArray(item)
    ? (item as GenericTableRow)
    : { value: item };

export const getTableLookupKey = (
  lookup: TableLookupLabelConfig | undefined,
): string =>
  [
    lookup?.schemaName?.trim() || "",
    lookup?.matchField?.trim() || "_id",
    lookup?.labelField?.trim() || "",
  ].join("::");

const normalizeLookupValue = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const rawColumnValue = (
  column: Pick<LookupColumnConfig, "field">,
  row: GenericTableRow,
) => row[column.field];

export const getLookupLabelValue = (
  column: LookupColumnConfig,
  row: GenericTableRow,
  lookupData: TableLookupSelectionDataMap = new Map(),
): string => {
  const rawValue = rawColumnValue(column, row);
  const fallback =
    column.fallbackValue !== undefined
      ? column.fallbackValue
      : rawValue === undefined || rawValue === null
      ? ""
      : String(rawValue);
  const lookup = column.lookup;
  if (!lookup) return fallback;
  const schemaName = lookup.schemaName?.trim();
  const labelField = lookup.labelField?.trim();
  if (!schemaName || !labelField) return fallback;

  const matchField = lookup.matchField?.trim() || "_id";
  const rowMatchValue = normalizeLookupValue(rawValue);
  if (rowMatchValue === undefined) return fallback;

  const match = (lookupData.get(getTableLookupKey(lookup)) || []).find(
    (item) => normalizeLookupValue(item[matchField]) === rowMatchValue,
  );
  const label = match?.[labelField];
  return label === undefined || label === null || label === ""
    ? fallback
    : String(label);
};

export const collectTableLookupConfigs = (
  tableConfig: TableComponentConfig | undefined,
): TableLookupLabelConfig[] => {
  const lookups = [
    ...(tableConfig?.columns || []),
    ...(tableConfig?.nestedRows?.columns || []),
  ]
    .filter((column) => column.type === "lookupLabel")
    .map((column) => column.lookup)
    .filter(
      (lookup): lookup is TableLookupLabelConfig =>
        Boolean(lookup?.schemaName?.trim() && lookup?.labelField?.trim()),
    );

  const seen = new Set<string>();
  return lookups.filter((lookup) => {
    const key = getTableLookupKey(lookup);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const applyTableNestedRows = <T extends GenericTableRow>(
  rows: T[],
  tableConfig: TableComponentConfig | undefined,
  translate: (value: string) => string = (value) => value,
  lookupData: TableLookupSelectionDataMap = new Map(),
): NestedTableRow<T>[] => {
  const config = tableConfig?.nestedRows;
  const field = config?.field?.trim();
  const columns = (config?.columns || []).filter((column) =>
    column.field?.trim(),
  );

  if (!config?.enabled || !field || columns.length === 0) {
    return rows as NestedTableRow<T>[];
  }

  return rows.map((row) => {
    const nestedItems = Array.isArray(row[field]) ? row[field] : [];

    return {
      ...row,
      collapsible: {
        collapsibleHeader: config.header?.trim() || undefined,
        collapsibleColumns: columns.map((column) => ({
          key: translate(column.displayName?.trim() || column.field.trim()),
          isSortable: false,
        })),
        collapsibleRows: nestedItems.map(nestedRowValue),
        collapsibleRowKeys: columns.map((column) => ({
          key: column.field.trim(),
          isDate: column.type === "date",
          ...(column.type === "lookupLabel"
            ? {
                node: (nestedRow: GenericTableRow) =>
                  getLookupLabelValue(column, nestedRow, lookupData),
              }
            : {}),
        })),
      },
    };
  });
};

export const getTableDisplayName = (
  tableConfig: TableComponentConfig | undefined,
  field: Field,
): string | undefined => getTableColumnConfig(tableConfig, field.name)?.displayName;

export const getTableCellClassName = (
  tableConfig: TableComponentConfig | undefined,
  field: Field,
) => getTableColumnConfig(tableConfig, field.name)?.cellClassName;

export const getComputedLabelValue = (
  tableConfig: TableComponentConfig | undefined,
  fieldName: string,
  row: Record<string, unknown>,
  evaluateCondition: (
    row: Record<string, unknown> & { _id: string },
    condition: string,
  ) => boolean,
): string => {
  const column = getTableColumnConfig(tableConfig, fieldName);
  if (column?.type !== "computedLabel") return "";

  const typedRow = row as Record<string, unknown> & { _id: string };
  const matchedRule = (column.computedLabelRules || []).find(
    (rule) =>
      rule.condition?.trim() &&
      evaluateCondition(typedRow, rule.condition.trim()),
  );

  return matchedRule?.value || column.fallbackValue || "";
};

const toNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

export const getProgressBarValue = (
  tableConfig: TableComponentConfig | undefined,
  fieldName: string,
  row: Record<string, unknown>,
  evaluateCondition: (
    row: Record<string, unknown> & { _id: string },
    condition: string,
  ) => boolean,
) => {
  const column = getTableColumnConfig(tableConfig, fieldName);
  if (column?.type !== "progressBar") return undefined;

  const config = column.progressBar || {};
  const sourceField = config.sourceField || fieldName;
  const value = toNumber(row[sourceField]) ?? 0;
  const max = config.maxField
    ? toNumber(row[config.maxField]) ?? config.max ?? 0
    : config.max ?? 0;
  const percent = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
  const typedRow = {
    ...row,
    [fieldName]: value,
  } as Record<string, unknown> & { _id: string };
  const matchedColorRule = (config.colorRules || []).find(
    (rule) =>
      rule.condition?.trim() &&
      evaluateCondition(typedRow, rule.condition.trim()),
  );

  return {
    value,
    max,
    percent,
    color: matchedColorRule?.color || config.color || "#4d9f24",
    trackColor: config.trackColor || "#e7e5df",
    height: config.height || 12,
    width: config.width || 260,
    showValue: config.showValue !== false,
  };
};

const extractConditionFieldCandidates = (condition: string): string[] => {
  const fields = new Set<string>();
  const withoutQuotedStrings = condition.replace(/(["'])(?:\\.|(?!\1).)*\1/g, " ");

  withoutQuotedStrings.replace(/row\(([^)]+)\)/g, (_match, fieldName) => {
    const trimmedField = String(fieldName).trim();
    if (trimmedField) fields.add(trimmedField);
    return " ";
  });

  withoutQuotedStrings
    .replace(/row\(([^)]+)\)/g, " ")
    .match(/[A-Za-z_][A-Za-z0-9_.]*/g)
    ?.forEach((candidate) => {
      if (!CONDITION_KEYWORD_VALUES.has(candidate)) fields.add(candidate);
    });

  return Array.from(fields);
};

export const getTableDataFieldNames = (
  tableConfig: TableComponentConfig | undefined,
  availableFieldNames?: string[],
): string[] | undefined => {
  if (!tableConfig?.columns?.length) return undefined;

  const available = availableFieldNames?.length
    ? new Set(availableFieldNames)
    : undefined;
  const fields = new Set<string>();

  tableConfig.columns.forEach((column) => {
    if (column.type !== "computedLabel" && column.field) {
      fields.add(column.field);
    }

    column.cellClassName?.forEach((rule) => {
      extractConditionFieldCandidates(rule.condition || "").forEach(
        (candidate) => {
          if (!available || available.has(candidate)) {
            fields.add(candidate);
          }
        },
      );
    });

    if (column.type === "computedLabel") {
      column.computedLabelRules?.forEach((rule) => {
        extractConditionFieldCandidates(rule.condition || "").forEach(
          (candidate) => {
            if (!available || available.has(candidate)) {
              fields.add(candidate);
            }
          },
        );
      });
    }

    if (column.type === "progressBar") {
      if (column.progressBar?.sourceField) {
        fields.add(column.progressBar.sourceField);
      }
      if (column.progressBar?.maxField) {
        fields.add(column.progressBar.maxField);
      }
      column.progressBar?.colorRules?.forEach((rule) => {
        extractConditionFieldCandidates(rule.condition || "").forEach(
          (candidate) => {
            if (!available || available.has(candidate)) {
              fields.add(candidate);
            }
          },
        );
      });
    }
  });

  if (tableConfig.nestedRows?.enabled && tableConfig.nestedRows.field?.trim()) {
    fields.add(tableConfig.nestedRows.field.trim());
  }

  return Array.from(fields);
};

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
