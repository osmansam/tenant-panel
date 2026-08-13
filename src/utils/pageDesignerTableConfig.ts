import type {
  GeneratedRelationColumnsConfig,
  GridSection,
  TableActionConfig,
  TableActionFormLayoutConfig,
  TableColumnConfig,
  TableComponentConfig,
  TableToggleConfig,
  ToggleBinding,
  ToggleRequestEffect,
} from "../types/page";
import type { Field } from "./api/container";
import { resolveTableDataMode } from "./tableDataMode";

export const cleanDesignerTableDataMode = resolveTableDataMode;

export const getDesignerEditableCellId = (cellId: string): string =>
  cellId.trim() || `cell_${crypto.randomUUID().split("-").join("")}`;

export const ensureDesignerGridCellIds = (
  sections: GridSection[],
): GridSection[] => {
  const used = new Set<string>();
  let changed = false;
  const createCellId = () => {
    let id = getDesignerEditableCellId("");
    while (used.has(id)) {
      id = getDesignerEditableCellId("");
    }
    used.add(id);
    return id;
  };

  const next = sections.map((section) => {
    let sectionChanged = false;
    const cells = section.cells.map((cell) => {
      const id = cell.id?.trim();
      if (id && !used.has(id)) {
        used.add(id);
        return cell;
      }
      changed = true;
      sectionChanged = true;
      return { ...cell, id: createCellId() };
    });
    return sectionChanged ? { ...section, cells } : section;
  });

  return changed ? next : sections;
};

export const cleanDesignerTableDataFields = (
  fields: string[] | undefined,
): string[] | undefined => {
  const cleaned = (fields || [])
    .map((field) => field.trim())
    .filter((field, index, all) => field && all.indexOf(field) === index);
  return cleaned.length ? cleaned : undefined;
};

export const cleanDesignerTableColumnTemplate = (
  column: TableColumnConfig,
): string | undefined => {
  if (column.type !== "template") return undefined;
  return column.template?.trim() || undefined;
};

export const hydrateDesignerTableConfigForEditing = (
  saved: TableComponentConfig,
  hydrated: TableComponentConfig,
): TableComponentConfig => ({
  ...saved,
  ...hydrated,
  dataMode: cleanDesignerTableDataMode(saved.dataMode),
});

export const moveArrayItem = <T>(
  items: T[],
  index: number,
  direction: -1 | 1,
): T[] => {
  const targetIndex = index + direction;
  if (
    index < 0 ||
    index >= items.length ||
    targetIndex < 0 ||
    targetIndex >= items.length
  ) {
    return items;
  }

  const reordered = [...items];
  [reordered[index], reordered[targetIndex]] = [
    reordered[targetIndex],
    reordered[index],
  ];
  return reordered;
};

export const cleanDesignerActionFormLayout = (
  layout?: TableActionFormLayoutConfig,
): TableActionFormLayoutConfig | undefined => {
  if (!layout) return undefined;

  const cleaned: TableActionFormLayoutConfig = {
    ...(layout.columns ? { columns: layout.columns } : {}),
    ...(layout.allowOverflow !== undefined
      ? { allowOverflow: layout.allowOverflow }
      : {}),
    ...(layout.topClassName?.trim()
      ? { topClassName: layout.topClassName.trim() }
      : {}),
    ...(layout.generalClassName?.trim()
      ? { generalClassName: layout.generalClassName.trim() }
      : {}),
  };

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
};

export const cleanDesignerTableDrag = (
  drag?: TableComponentConfig["drag"],
): TableComponentConfig["drag"] | undefined => {
  const orderField = drag?.orderField?.trim();
  return drag?.enabled && orderField
    ? { enabled: true, orderField }
    : undefined;
};

export const cleanDesignerTableArraySource = (
  arraySource?: TableComponentConfig["arraySource"],
): TableComponentConfig["arraySource"] | undefined => {
  const field = arraySource?.field?.trim();
  const rowIdentityField = arraySource?.rowIdentityField?.trim();
  return arraySource?.enabled && field && rowIdentityField
    ? { enabled: true, field, rowIdentityField }
    : undefined;
};

const INTEGER_TABLE_ORDER_FIELD_TYPES = new Set([
  "int",
  "integer",
  "int32",
  "int64",
  "autoincrementid",
]);

export const isIntegerTableOrderField = (field: Field): boolean =>
  INTEGER_TABLE_ORDER_FIELD_TYPES.has((field.type || "").toLowerCase());

export const cleanDesignerToggleBinding = (
  binding?: ToggleBinding,
): ToggleBinding | undefined => {
  const toggleId = binding?.toggleId?.trim();
  return toggleId ? { toggleId, when: binding?.when === true } : undefined;
};

export const cleanDesignerTableToggles = (
  toggles: TableToggleConfig[] = [],
): TableToggleConfig[] =>
  toggles
    .filter((toggle) => toggle.id.trim())
    .map((toggle) => {
      const cleanEffect = (effect?: ToggleRequestEffect) => {
        if (!effect) return undefined;
        if (effect.type === "omit") return { type: "omit" as const };
        const field = effect.field.trim();
        return field
          ? { type: "set" as const, field, value: effect.value }
          : undefined;
      };
      const on = cleanEffect(toggle.request?.on);
      const off = cleanEffect(toggle.request?.off);
      return {
        id: toggle.id.trim(),
        label: toggle.label.trim(),
        defaultValue: toggle.defaultValue === true,
        ...(toggle.isUpperSide !== undefined
          ? { isUpperSide: toggle.isUpperSide }
          : {}),
        ...(on || off ? { request: { ...(on ? { on } : {}), ...(off ? { off } : {}) } } : {}),
      };
    });

export const createDesignerTableToggle = (
  id: string,
): TableToggleConfig => ({
  id,
  label: "Display toggle",
  defaultValue: false,
  isUpperSide: true,
});

export type DesignerVisibilityTarget =
  | `column:${string}`
  | `group:${string}`;

export const getDesignerToggleVisibilityTargets = (
  config: TableComponentConfig,
  toggleId: string,
): DesignerVisibilityTarget[] => [
  ...(config.columns || [])
    .filter((column) => column.visibilityToggle?.toggleId === toggleId)
    .map((column) => `column:${column.field}` as const),
  ...(config.generatedRelationColumns || [])
    .filter((group) => group.visibilityToggle?.toggleId === toggleId)
    .map((group) => `group:${group.id}` as const),
];

export const setDesignerToggleVisibilityTargets = (
  config: TableComponentConfig,
  toggleId: string,
  targets: DesignerVisibilityTarget[],
): TableComponentConfig => {
  const selected = new Set(targets);
  const updateBinding = (
    target: DesignerVisibilityTarget,
    binding: ToggleBinding | undefined,
  ): ToggleBinding | undefined => {
    if (selected.has(target)) return { toggleId, when: true };
    return binding?.toggleId === toggleId ? undefined : binding;
  };

  return {
    ...config,
    columns: (config.columns || []).map((column) => ({
      ...column,
      visibilityToggle: updateBinding(
        `column:${column.field}`,
        column.visibilityToggle,
      ),
    })),
    generatedRelationColumns: (config.generatedRelationColumns || []).map(
      (group) => ({
        ...group,
        visibilityToggle: updateBinding(
          `group:${group.id}`,
          group.visibilityToggle,
        ),
      }),
    ),
  };
};

export const cleanDesignerGeneratedRelationColumns = (
  groups: GeneratedRelationColumnsConfig[] = [],
): GeneratedRelationColumnsConfig[] =>
  groups.flatMap((group) => {
    const id = group.id.trim();
    const arrayField = group.arrayField.trim();
    const sourceSchemaName = group.sourceSchemaName.trim();
    const sourceLabelField = group.sourceLabelField.trim();
    if (!id || !arrayField || !sourceSchemaName || !sourceLabelField) return [];
    const booleanEditToggle = cleanDesignerToggleBinding(
      group.booleanEditToggle,
    );
    const visibilityToggle = cleanDesignerToggleBinding(
      group.visibilityToggle,
    );
    return [
      {
        id,
        arrayField,
        sourceSchemaName,
        sourceIdField: group.sourceIdField?.trim() || "_id",
        sourceLabelField,
        sourceLimit: Math.min(100, Math.max(1, group.sourceLimit || 100)),
        ...(visibilityToggle ? { visibilityToggle } : {}),
        ...(booleanEditToggle ? { booleanEditToggle } : {}),
      },
    ];
  });

export const TABLE_COLUMN_TYPE_OPTIONS: {
  value: NonNullable<TableColumnConfig["type"]>;
  label: string;
}[] = [
  { value: "field", label: "Field" },
  { value: "lookupLabel", label: "Lookup Label" },
  { value: "number", label: "Number" },
  { value: "currency", label: "Currency (₺)" },
  { value: "percentage", label: "Percentage (%)" },
  { value: "growthPercentage", label: "Growth Percentage (↑ ↓)" },
  { value: "date", label: "Date" },
  { value: "boolean", label: "Boolean (Badge)" },
  { value: "booleanSwitch", label: "Boolean Switch" },
  { value: "image", label: "Image" },
  { value: "badge", label: "Badge / Enum" },
  { value: "array", label: "Array (comma-separated)" },
  { value: "computedLabel", label: "Computed Label" },
  { value: "template", label: "Template" },
  { value: "progressBar", label: "Progress Bar" },
];

export const TABLE_NESTED_COLUMN_TYPE_OPTIONS: {
  value: NonNullable<TableColumnConfig["type"]>;
  label: string;
}[] = TABLE_COLUMN_TYPE_OPTIONS.filter((option) =>
  ["field", "lookupLabel", "number", "date"].includes(option.value),
);

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


type DesignerTableLinkType = NonNullable<
  NonNullable<TableColumnConfig["link"]>["type"]
>;

export const defaultTemplateForDesignerLinkType = (
  type?: DesignerTableLinkType,
): string => {
  switch (type) {
    case "email":
      return "mailto:{{value}}";
    case "phone":
      return "tel:{{value}}";
    default:
      return "";
  }
};

export const normalizeDesignerTableColumnLink = (
  link?: TableColumnConfig["link"],
): TableColumnConfig["link"] | undefined => {
  const type = link?.type || "external";
  const template =
    link?.template?.trim() || defaultTemplateForDesignerLinkType(type);

  if (!template) return undefined;

  return {
    template,
    ...(link?.labelField?.trim() ? { labelField: link.labelField.trim() } : {}),
    type,
  };
};

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

export const shouldHydrateEmptyDesignerTableColumns = ({
  componentType,
  tableSourceType,
  schemaName,
  columnCount,
  isEditingExistingTable,
}: {
  componentType: string;
  tableSourceType: string;
  schemaName?: string;
  columnCount: number;
  isEditingExistingTable: boolean;
}) =>
  ["table", "tabPanel"].includes(componentType) &&
  tableSourceType === "schema" &&
  Boolean(schemaName) &&
  columnCount === 0 &&
  !isEditingExistingTable;

export const ensureDesignerTableBulkActions = (
  tableConfig: TableComponentConfig,
  defaults: {
    edit: TableActionConfig;
    delete: TableActionConfig;
  },
): TableComponentConfig => ({
  ...tableConfig,
  bulkActions: {
    edit: tableConfig.bulkActions?.edit || defaults.edit,
    delete: tableConfig.bulkActions?.delete || defaults.delete,
  },
});

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
