// pages/GenericPaginatedPage.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { ConfirmationDialog } from "../../../common/ConfirmationDialog";
import { useGeneralContext } from "../../../context/General.context";
import { useUserContext } from "../../../context/User.context";
import { useSelectionData } from "../../../hooks/useSelectionData";
import { FormElementsState } from "../../../types";
import {
  DataBinding,
  TableActionConfig,
  TableComponentConfig,
} from "../../../types/page";
import { UpdatePayload } from "../../../utils/api";
import {
  ContainerModel,
  Field,
  Types,
  useGetContainers,
} from "../../../utils/api/container";
import {
  RawContainer,
  evaluateRowCondition,
  fieldToInput,
  getFieldLabel,
  getMatchingRowClassNames,
  humanize,
  isDisplayablePrimitive,
  normalizeContainer,
  normalizeField,
  tailwindBgToStyle,
} from "../../../utils/genericPageHelpers";
import { generateMockData } from "../../../utils/mockDataGenerator";
import {
  buildActionFormInputs,
  buildActionFormKeys,
  filterActionFields,
  getActionConstantValues,
  getActionDefaultValues,
  getActionIconElement,
  getActionId,
  getConfiguredCreateAction,
  getConfiguredRowActions,
  resolveActionTemplate,
  useActionFormSelectionData,
} from "../../../utils/tableActions";
import {
  getComputedLabelValue,
  getProgressBarValue,
  getTableDataFieldNames,
  getTableCellClassName,
  getTableDisplayName,
  getTableLinkConfig,
} from "../../../utils/tableConfig";
import {
  buildConfiguredFilterInputs,
  getFilterDefaultValues,
  useFilterPanelSelectionData,
} from "../../../utils/tableFilters";
import {
  isFieldRequired,
  parseValidationRules,
} from "../../../utils/validationHelper";
import { LinkCell } from "../../LinkCell";
import SwitchButton from "../common/SwitchButton";
import {
  ActionType,
  FormKeyTypeEnum,
  GenericInputType,
  InputTypes,
} from "../shared/types";
import GenericTable from "../Tables/GenericTable";
import GenericAddEditPanel from "./GenericAddEditPanel";

type GenericItem = Record<string, unknown> & { _id: string };

type Props = {
  schemaName: string;
  includeFields?: string[];
  excludeFields?: string[];
  actionsEnabled?: boolean;
  isHeader?: boolean;
  constantFilter?: Record<string, unknown>; // Constant filter that won't be editable
  customTitle?: string; // Custom title for the table
  tableConfig?: TableComponentConfig;
  dataBinding?: DataBinding;
};

export default function GenericPaginatedPage({
  schemaName,
  includeFields,
  excludeFields,
  actionsEnabled = true,
  isHeader = false,
  constantFilter,
  customTitle,
  tableConfig,
  dataBinding,
}: Props) {
  const { t } = useTranslation();
  const {
    rowsPerPage,
    currentPage,
    setCurrentPage,
    selectedRows,
    setSelectedRows,
    setIsSelectionActive,
  } = useGeneralContext();
  const { user } = useUserContext();
  const rawContainers = useGetContainers();

  const container: ContainerModel | undefined = useMemo(() => {
    if (!rawContainers) return undefined;
    const normalized = rawContainers.map((c: RawContainer) =>
      normalizeContainer(c),
    );
    return normalized.find(
      (c: ContainerModel) =>
        (c.schemaName || "").toLowerCase() === schemaName.toLowerCase(),
    );
  }, [rawContainers, schemaName]);

  const tableBinding = useMemo(
    () => ({
      kind:
        dataBinding?.kind === "pipeline" || dataBinding?.kind === "workflow"
          ? dataBinding.kind
          : "schema",
      schemaName: dataBinding?.schemaName || schemaName,
      pipelineName: dataBinding?.pipelineName,
      workflowName: dataBinding?.workflowName,
      fields: getTableDataFieldNames(
        tableConfig,
        container?.fields?.map((field) => field.name),
      ),
      params: dataBinding?.params,
    }),
    [container?.fields, dataBinding, schemaName, tableConfig],
  );
  const schemaActionsEnabled = actionsEnabled && tableBinding.kind === "schema";

  // Generate mock data based on container fields (10 items)
  const mockItems = useMemo(() => {
    if (!container?.fields) return [];
    return generateMockData<GenericItem>(container.fields, 10);
  }, [container]);

  // Mock CRUD functions for preview mode (no actual API calls)
  const createDynamicItem = useCallback((item: GenericItem) => {
    console.log("Preview mode: Create item", item);
  }, []);

  const createMultipleDynamicItem = useCallback((items: GenericItem[]) => {
    console.log("Preview mode: Create multiple items", items);
  }, []);

  const updateDynamicItem = useCallback(
    (id: string | number, updates: Partial<GenericItem>) => {
      console.log("Preview mode: Update item", id, updates);
    },
    [],
  );

  const deleteDynamicItem = useCallback((id: string | number) => {
    console.log("Preview mode: Delete item", id);
  }, []);

  const deleteMultipleDynamicItem = useCallback(
    (items: { _id: string | number }[]) => {
      console.log("Preview mode: Delete multiple items", items);
    },
    [],
  );

  const updateMultipleDynamicItem = useCallback(
    (items: { _id: string | number; updates: Partial<GenericItem> }[]) => {
      console.log("Preview mode: Update multiple items", items);
    },
    [],
  );

  const [filterPanelFormElements, setFilterPanelFormElements] =
    useState<FormElementsState>({
      search: "",
      sort: "",
      asc: 1,
    });

  const [showFilters, setShowFilters] = useState(false);
  const configuredFilterInputs = tableConfig?.filterPanel?.inputs;
  const filterSelectionDataMap = useFilterPanelSelectionData(
    configuredFilterInputs,
  );
  const configuredFilterDefaults = useMemo(
    () => getFilterDefaultValues(configuredFilterInputs),
    [configuredFilterInputs],
  );

  useEffect(() => {
    if (!Object.keys(configuredFilterDefaults).length) return;

    setFilterPanelFormElements((prev) => {
      const next = { ...prev };
      let changed = false;

      Object.entries(configuredFilterDefaults).forEach(([key, value]) => {
        if (next[key] === undefined) {
          next[key] = value as FormElementsState[string];
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [configuredFilterDefaults]);

  const displayFields: Field[] = useMemo(() => {
    const containerFields = container?.fields || [];
    let fields = containerFields
      .map(normalizeField)
      .filter(isDisplayablePrimitive);

    if (tableConfig?.columns?.length) {
      fields = tableConfig.columns
        .map((column) => {
          const field = fields.find((item) => item.name === column.field);
          return (
            field || {
              name: column.field,
              type: "string",
              frontend: column.displayName
                ? { displayName: column.displayName }
                : undefined,
            }
          );
        })
        .filter((field): field is Field => Boolean(field?.name));
    }

    if (includeFields?.length) {
      fields = includeFields
        .map((name) => fields.find((f) => f.name === name))
        .filter((f): f is Field => Boolean(f));
    }
    if (excludeFields?.length) {
      const ex = new Set(excludeFields);
      fields = fields.filter((f) => !ex.has(f.name));
    }
    const uniq = new Set<string>();
    fields = fields.filter(
      (f) =>
        f.name &&
        !["_id", "id"].includes(f.name) &&
        !uniq.has(f.name) &&
        (uniq.add(f.name), true),
    );

    // Filter by authorizeRole if isAuthorized is true
    fields = fields.filter((f) => {
      // If not authorized, show it
      if (!f.isAuthorized) return true;

      // If authorized, user must exist and have a matching role
      if (!user?.role) return false;

      // Check if authorizeRole exists and includes user role
      if (!f.authorizeRole || f.authorizeRole.length === 0) return false;
      return f.authorizeRole.includes(user.role);
    });

    return fields;
  }, [container, includeFields, excludeFields, user, tableConfig]);

  // Fetch selection data for objectId/autoIncrementId fields with populationSettings
  const selectionDataMap = useSelectionData(container?.fields || []);

  const rowKeys = useMemo(() => {
    const constantFilterKeys = constantFilter
      ? Object.keys(constantFilter)
      : [];
    return displayFields
      .filter((f) => !constantFilterKeys.includes(f.name))
      .map((f) => {
        const fieldType = (f.type || "").toLowerCase();
        const originalType = f.type || "";
        const isStringArray =
          fieldType === Types.StringArray ||
          originalType === "stringArray" ||
          fieldType === "string[]" ||
          fieldType === "array<string>";
        const isIntArray =
          fieldType === Types.IntArray ||
          originalType === "intArray" ||
          fieldType === "int[]" ||
          fieldType === "array<int>";
        const isNumberArray =
          fieldType === Types.NumberArray ||
          originalType === "numberArray" ||
          fieldType === "number[]" ||
          fieldType === "array<number>";
        const isArray = isStringArray || isIntArray || isNumberArray;

        const rowKey: {
          key: string;
          isImage?: boolean;
          isDate?: boolean;
          isBoolean?: boolean;
          className?: string | ((row: GenericItem) => string);
          node?: (row: GenericItem) => React.ReactNode;
        } = {
          key: f.name,
          isImage: fieldType === Types.Image,
          isDate: fieldType === Types.Date,
          isBoolean: fieldType === Types.Boolean || fieldType === "bool",
        };

        const cellClassName = getTableCellClassName(tableConfig, f);
        const legacyCellClassName = f.frontend?.rowKeyClassName;
        const rowKeyClassName = cellClassName ?? legacyCellClassName;
        const linkConfig = getTableLinkConfig(tableConfig, f);

        // Compute className based on table column cellClassName conditions
        if (rowKeyClassName) {
          rowKey.className = (row: GenericItem) =>
            getMatchingRowClassNames(row, rowKeyClassName);
        }

        const columnConfig = tableConfig?.columns?.find(
          (column) => column.field === f.name,
        );
        if (columnConfig?.type === "computedLabel") {
          const getComputedValue = (row: GenericItem) =>
            getComputedLabelValue(
              tableConfig,
              f.name,
              row,
              evaluateRowCondition,
            );

          if (rowKeyClassName) {
            rowKey.className = (row: GenericItem) =>
              getMatchingRowClassNames(
                { ...row, [f.name]: getComputedValue(row) },
                rowKeyClassName,
              );
          }

          rowKey.node = (row: GenericItem) => <span>{getComputedValue(row)}</span>;
          return rowKey;
        }

        if (columnConfig?.type === "progressBar") {
          rowKey.node = (row: GenericItem) => {
            const progress = getProgressBarValue(
              tableConfig,
              f.name,
              row,
              evaluateRowCondition,
            );
            if (!progress) return <span>-</span>;

            return (
              <span className="inline-flex items-center gap-3 align-middle">
                <span
                  className="inline-flex overflow-hidden rounded-full"
                  style={{
                    width: progress.width,
                    height: progress.height,
                    backgroundColor: progress.trackColor,
                  }}
                >
                  <span
                    className="h-full rounded-full"
                    style={{
                      width: `${progress.percent}%`,
                      backgroundColor: progress.color,
                    }}
                  />
                </span>
                {progress.showValue && (
                  <span className="text-sm font-medium text-neutral-500">
                    {progress.value}/{progress.max}
                  </span>
                )}
              </span>
            );
          };
          return rowKey;
        }

        // --- New explicit display type overrides ---
        if (columnConfig?.type === "number") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (v === undefined || v === null || v === "") return <span>-</span>;
            const n = Number(v);
            return <span>{isNaN(n) ? String(v) : n.toLocaleString()}</span>;
          };
          return rowKey;
        }

        if (columnConfig?.type === "currency") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (v === undefined || v === null || v === "") return <span>-</span>;
            const n = Number(v);
            return (
              <span>
                {isNaN(n) ? String(v) : n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
              </span>
            );
          };
          return rowKey;
        }

        if (columnConfig?.type === "percentage") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (v === undefined || v === null || v === "") return <span>-</span>;
            const n = Number(v);
            return <span>{isNaN(n) ? String(v) : `${n.toLocaleString()}%`}</span>;
          };
          return rowKey;
        }

        if (columnConfig?.type === "growthPercentage") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (v === undefined || v === null || v === "") return <span>-</span>;
            const n = Number(v);
            if (isNaN(n)) return <span>{String(v)}</span>;
            const isPositive = n > 0;
            const isNegative = n < 0;
            const sign = isPositive ? "+" : "";
            const arrow = isPositive ? "↑" : isNegative ? "↓" : "→";
            const color = isPositive
              ? "#2e7d32"
              : isNegative
                ? "#c62828"
                : "#827717";
            return (
              <span style={{ color, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span>{arrow}</span>
                <span>{sign}{n.toLocaleString()}%</span>
              </span>
            );
          };
          return rowKey;
        }

        if (columnConfig?.type === "date") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (!v) return <span>-</span>;
            try {
              const d = new Date(v as string | number);
              if (isNaN(d.getTime())) return <span>{String(v)}</span>;
              return (
                <span>
                  {String(d.getDate()).padStart(2, "0")}/
                  {String(d.getMonth() + 1).padStart(2, "0")}/
                  {d.getFullYear()}
                </span>
              );
            } catch {
              return <span>{String(v)}</span>;
            }
          };
          return rowKey;
        }

        if (columnConfig?.type === "boolean") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            const isTrue = v === true || v === "true" || v === 1 || v === "1";
            return (
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isTrue
                    ? "bg-green-100 text-green-700"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {isTrue ? "Yes" : "No"}
              </span>
            );
          };
          return rowKey;
        }

        if (columnConfig?.type === "image") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (!v) return <span>-</span>;
            return (
              <img
                src={String(v)}
                alt={f.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            );
          };
          return rowKey;
        }

        if (columnConfig?.type === "badge") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (v === undefined || v === null || v === "") return <span>-</span>;
            return (
              <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                {String(v)}
              </span>
            );
          };
          return rowKey;
        }

        if (columnConfig?.type === "array") {
          rowKey.node = (row: GenericItem) => {
            const v = row[f.name];
            if (v === undefined || v === null) return <span>-</span>;
            const content = Array.isArray(v) ? v.join(", ") : String(v);
            return <span>{content || "-"}</span>;
          };
          return rowKey;
        }
        // --- End of explicit display type overrides ---

        if (rowKey.isBoolean) {

          rowKey.node = (row: GenericItem) => (
            <CheckSwitch
              checked={!!row[f.name]}
              onChange={() => {
                updateDynamicItem(row._id, {
                  [f.name]: !row[f.name],
                });
              }}
            />
          );
        } else if (isArray) {
          // Handle array types - display as comma-separated values
          rowKey.node = (row: GenericItem) => {
            const value = row[f.name];
            const content = Array.isArray(value)
              ? value.join(", ")
              : String(value || "");
            return linkConfig?.linkTemplate ? (
              <LinkCell field={f} row={row} linkConfig={linkConfig} />
            ) : (
              <span>{content}</span>
            );
          };
        } else if (
          (fieldType === Types.ObjectId ||
            fieldType === Types.AutoIncrementId) &&
          f.populationSettings &&
          f.populationSettings.displayFields &&
          f.populationSettings.displayFields.length > 0
        ) {
          // Handle populated objectId/autoIncrementId fields
          rowKey.node = (row: GenericItem) => {
            const value = row[f.name];
            let content = "";
            if (value && typeof value === "object") {
              // Display the fields specified in displayFields
              const valueObj = value as Record<string, unknown>;
              const displayValues = f
                .populationSettings!.displayFields.map(
                  (fieldName) => valueObj[fieldName],
                )
                .filter(Boolean)
                .map(String);
              content = displayValues.join(" - ") || String(valueObj._id || "");
            } else {
              content = String(value || "");
            }
            return linkConfig?.linkTemplate ? (
              <LinkCell field={f} row={row} linkConfig={linkConfig} />
            ) : (
              <span>{content}</span>
            );
          };
        } else if (
          fieldType === Types.ObjectIdArray &&
          f.populationSettings &&
          f.populationSettings.displayFields &&
          f.populationSettings.displayFields.length > 0
        ) {
          // Handle populated objectIdArray fields
          rowKey.node = (row: GenericItem) => {
            const value = row[f.name];
            let content = "";
            if (Array.isArray(value) && value.length > 0) {
              // Map over array of populated objects
              const displayItems = value.map((item) => {
                if (item && typeof item === "object") {
                  const itemObj = item as Record<string, unknown>;
                  const displayValues = f
                    .populationSettings!.displayFields.map(
                      (fieldName) => itemObj[fieldName],
                    )
                    .filter(Boolean)
                    .map(String);
                  return displayValues.join(" - ") || String(itemObj._id || "");
                } else if (typeof item === "string") {
                  // Handle ID strings by looking up in selectionDataMap
                  const selectionOptions = selectionDataMap.get(f.name) || [];
                  const foundOption = selectionOptions.find(
                    (opt) => opt._id === item,
                  );
                  if (foundOption) {
                    return String(
                      foundOption[f.populationSettings!.inputSelectionField] ||
                        item,
                    );
                  }
                  return item;
                }
                return String(item || "");
              });
              content = displayItems.join(", ");
            } else {
              content = String(value || "");
            }
            return linkConfig?.linkTemplate ? (
              <LinkCell field={f} row={row} linkConfig={linkConfig} />
            ) : (
              <span>{content}</span>
            );
          };
        } else if (linkConfig?.linkTemplate) {
          // Handle all other field types with linkTemplate (e.g., regular strings, numbers)
          rowKey.node = (row: GenericItem) => (
            <LinkCell field={f} row={row} linkConfig={linkConfig} />
          );
        }

        return rowKey;
      });
  }, [
    displayFields,
    updateDynamicItem,
    selectionDataMap,
    constantFilter,
    tableConfig,
  ]);

  const columns = useMemo(() => {
    const constantFilterKeys = constantFilter
      ? Object.keys(constantFilter)
      : [];
    const baseCols = displayFields
      .filter((f) => !constantFilterKeys.includes(f.name))
      .map((f) => ({
        key: t(getTableDisplayName(tableConfig, f) || getFieldLabel(f)),
        isSortable:
          tableConfig?.columns?.find((column) => column.field === f.name)
            ?.type !== "computedLabel",
        correspondingKey: f.name,
      }));
    return schemaActionsEnabled
      ? [...baseCols, { key: t("Actions"), isSortable: false }]
      : baseCols;
  }, [displayFields, t, schemaActionsEnabled, constantFilter, tableConfig]);

  const { inputs, formKeys, constantFilterKeys } = useMemo(() => {
    const constantFilterKeys = constantFilter
      ? Object.keys(constantFilter)
      : [];

    const ins = displayFields
      .map((f) => {
        // Skip fields with equation
        if (f.equation) return null;

        const m = fieldToInput(f);
        const label = t(getFieldLabel(f));
        const fieldType = (f.type || "").toLowerCase();

        // Parse validation rules from tag
        const validationRules = parseValidationRules(f.tag);
        const isRequired = isFieldRequired(f.tag);

        // Check if field has populationSettings (objectId/autoIncrementId/objectIdArray with selection data)
        if (
          (fieldType === Types.ObjectId ||
            fieldType === Types.AutoIncrementId ||
            fieldType === Types.ObjectIdArray) &&
          f.populationSettings &&
          f.objectSchemaName
        ) {
          const selectionData = selectionDataMap.get(f.name) || [];
          const displayLabel = f.populationSettings.displayLabel || label;

          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label: t(displayLabel),
            placeholder: t(displayLabel),
            required: isRequired,
            isMultiple: fieldType === Types.ObjectIdArray, // Enable multi-select for objectIdArray
            options: selectionData.map((item) => ({
              value: String(item._id || ""),
              label: String(
                item[f.populationSettings!.inputSelectionField] ||
                  item._id ||
                  "",
              ),
            })),
            invalidateKeys:
              f.frontend?.invalidateKeys?.map((key) => ({
                key: String(key),
                defaultValue: undefined,
              })) ?? [],
          };
        }

        // Check if field has enumList
        if (f.enumList && f.enumList.length > 0) {
          const originalType = f.type || "";

          // Check if it's an array type
          const isStringArray =
            fieldType === "stringarray" ||
            originalType === "stringArray" ||
            fieldType === "string[]" ||
            fieldType === "array<string>";
          const isIntArray =
            fieldType === "intarray" ||
            originalType === "intArray" ||
            fieldType === "int[]" ||
            fieldType === "array<int>";
          const isNumberArray =
            fieldType === "numberarray" ||
            originalType === "numberArray" ||
            fieldType === "number[]" ||
            fieldType === "array<number>";

          const isArrayType = isStringArray || isIntArray || isNumberArray;

          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label,
            placeholder: label,
            required: isRequired,
            isMultiple: isArrayType,
            options: f.enumList.map((item) => ({
              value: item,
              label: String(item),
            })),
            invalidateKeys:
              f.frontend?.invalidateKeys?.map((key) => ({
                key: String(key),
                defaultValue: undefined,
              })) ?? [],
          };
        }

        return {
          type: m.inputType,
          formKey: f.name,
          label,
          placeholder: label,
          required: isRequired,
          minLength: validationRules.minlength,
          maxLength: validationRules.maxlength,
          min: validationRules.min,
          max: validationRules.max,
          pattern: validationRules.pattern,
          invalidateKeys:
            f.frontend?.invalidateKeys?.map((key) => ({
              key: String(key),
              defaultValue: undefined,
            })) ?? [],
        };
      })
      .filter((i): i is NonNullable<typeof i> => i !== null);

    const fks = displayFields
      .map((f) => {
        if (f.equation) return null;
        const m = fieldToInput(f);
        return { key: f.name, type: m.formKeyType };
      })
      .filter((k): k is NonNullable<typeof k> => k !== null);

    return { inputs: ins, formKeys: fks, constantFilterKeys };
  }, [displayFields, t, selectionDataMap, constantFilter]);

  // Merge constantFilter with filterPanelFormElements for querying
  const mergedFilters = useMemo(() => {
    return constantFilter
      ? ({ ...filterPanelFormElements, ...constantFilter } as FormElementsState)
      : filterPanelFormElements;
  }, [filterPanelFormElements, constantFilter]);

  // Mock paginated data for preview mode
  const itemsPayload = useMemo(() => {
    return {
      items: mockItems,
      totalItems: mockItems.length,
      totalPages: Math.ceil(mockItems.length / rowsPerPage),
      currentPage: currentPage,
    };
  }, [mockItems, rowsPerPage, currentPage]);

  const rows = useMemo(() => itemsPayload?.items || [], [itemsPayload?.items]);

  const outsideSort = useMemo(
    () => ({ filterPanelFormElements, setFilterPanelFormElements }),
    [filterPanelFormElements],
  );

  const pagination = useMemo(
    () =>
      itemsPayload
        ? {
            totalPages: itemsPayload.totalPages,
            totalRows: itemsPayload.totalItems,
          }
        : null,
    [itemsPayload],
  );

  const outsideSearchProps = useMemo(
    () => ({ t, filterPanelFormElements, setFilterPanelFormElements }),
    [t, filterPanelFormElements],
  );

  const rowStyleFunction = useCallback(
    (row: GenericItem): React.CSSProperties => {
      const styles: React.CSSProperties = {};
      const rowClassName = tableConfig?.rows?.className;

      if (rowClassName) {
        Object.assign(
          styles,
          tailwindBgToStyle(getMatchingRowClassNames(row, rowClassName)),
        );
        return styles;
      }

      // Container level configs
      if (container?.frontend?.rowClassName) {
        Object.assign(
          styles,
          tailwindBgToStyle(
            getMatchingRowClassNames(row, container.frontend.rowClassName),
          ),
        );
      }

      // Field level configs
      container?.fields.forEach((field) => {
        if (field.frontend?.rowClassName) {
          Object.assign(
            styles,
            tailwindBgToStyle(
              getMatchingRowClassNames(row, field.frontend.rowClassName),
            ),
          );
        }
      });

      return styles;
    },
    [container, tableConfig],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterPanelFormElements.search,
    filterPanelFormElements.sort,
    filterPanelFormElements.asc,
    setCurrentPage,
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState<
    Record<string, boolean>
  >({});
  const [rowToAction, setRowToAction] = useState<GenericItem | null>(null);

  const normalizeRowForSubmit = useCallback(
    (row: GenericItem) => {
      const normalizedUpdates = { ...row };
      displayFields.forEach((f) => {
        const fieldType = (f.type || "").toLowerCase();
        if (
          (fieldType === Types.ObjectId ||
            fieldType === Types.AutoIncrementId) &&
          f.populationSettings &&
          normalizedUpdates[f.name] &&
          typeof normalizedUpdates[f.name] === "object"
        ) {
          const populatedValue = normalizedUpdates[f.name] as Record<
            string,
            unknown
          >;
          normalizedUpdates[f.name] = populatedValue._id;
        } else if (
          fieldType === Types.ObjectIdArray &&
          f.populationSettings &&
          normalizedUpdates[f.name] &&
          Array.isArray(normalizedUpdates[f.name])
        ) {
          const populatedArray = normalizedUpdates[f.name] as Array<
            Record<string, unknown>
          >;
          normalizedUpdates[f.name] = populatedArray.map((item) =>
            item && typeof item === "object" ? item._id : item,
          );
        }
      });
      return normalizedUpdates;
    },
    [displayFields],
  );

  const configuredCreateAction = useMemo(
    () => getConfiguredCreateAction(tableConfig, container?.frontend?.actions),
    [container?.frontend?.actions, tableConfig],
  );

  const configuredActionDefinitions = useMemo(
    () => getConfiguredRowActions(tableConfig, container?.frontend?.actions),
    [container?.frontend?.actions, tableConfig],
  );
  const configuredActionsForSelectionData = useMemo(
    () =>
      [
        ...(configuredCreateAction ? [configuredCreateAction] : []),
        ...(configuredActionDefinitions || []),
      ],
    [configuredActionDefinitions, configuredCreateAction],
  );
  const actionSelectionDataMap = useActionFormSelectionData(
    configuredActionsForSelectionData,
  );

  const getActionInputs = useCallback(
    (action: TableActionConfig, actionId: string, row: GenericItem | null) => {
      if (action.formFields !== undefined) {
        return buildActionFormInputs(
          action,
          actionId,
          row,
          actionSelectionDataMap,
        );
      }

      const fields = filterActionFields(displayFields, action);
      const fieldNames = new Set(fields.map((field) => field.name));
      const overrides = new Map(
        (action.fieldOverrides || []).map((override) => [
          override.field,
          override,
        ]),
      );

      return inputs
        .filter((input) => fieldNames.has(input.formKey))
        .map((input): GenericInputType => {
          const genericInput = input as GenericInputType;
          const override = overrides.get(input.formKey);
          const isConditionDisabled =
            !!row &&
            !!override?.disabledCondition?.trim() &&
            evaluateRowCondition(row, override.disabledCondition);
          return {
            ...genericInput,
            required: override?.required ?? genericInput.required,
            isDisabled: genericInput.isDisabled || isConditionDisabled,
          };
        });
    },
    [actionSelectionDataMap, displayFields, inputs],
  );

  const getActionFormKeys = useCallback(
    (action: TableActionConfig, actionInputs: GenericInputType[]) => {
      if (action.formFields !== undefined) return buildActionFormKeys(action);

      const fieldNames = new Set(actionInputs.map((input) => input.formKey));
      return formKeys.filter((formKey) => fieldNames.has(formKey.key));
    },
    [formKeys],
  );

  const createActionId = configuredCreateAction
    ? getActionId(configuredCreateAction, 0)
    : "create";
  const createActionInputs = configuredCreateAction
    ? getActionInputs(configuredCreateAction, createActionId, null)
    : inputs;
  const createActionFormKeys = configuredCreateAction
    ? getActionFormKeys(configuredCreateAction, createActionInputs)
    : formKeys;
  const createActionConstants = configuredCreateAction
    ? getActionConstantValues(configuredCreateAction)
    : {};
  const createActionDefaults = configuredCreateAction
    ? getActionDefaultValues(configuredCreateAction)
    : {};

  const handleSubmitItem = useCallback(
    (item: GenericItem | UpdatePayload<GenericItem>) => {
      if ("id" in item && "updates" in item) {
        // Update operation - EXCLUDE constantFilter fields to prevent ObjectId to string conversion
        const updates = item.updates as Record<string, unknown>;
        const filteredUpdates = constantFilter
          ? Object.fromEntries(
              Object.entries(updates).filter(
                ([key]) => !constantFilterKeys.includes(key),
              ),
            )
          : updates;
        updateDynamicItem(
          item.id as string | number,
          filteredUpdates as Partial<GenericItem>,
        );
      } else {
        // Create operation - merge constantFilter into new item
        const configuredCreateValues = {
          ...createActionDefaults,
          ...(item as Record<string, unknown>),
          ...createActionConstants,
        };
        const mergedItem = constantFilter
          ? { ...configuredCreateValues, ...constantFilter }
          : configuredCreateValues;
        createDynamicItem(mergedItem as GenericItem);
      }
    },
    [
      updateDynamicItem,
      createDynamicItem,
      constantFilter,
      constantFilterKeys,
      createActionDefaults,
      createActionConstants,
    ],
  );

  const addButton = useMemo(
    () => ({
      name: configuredCreateAction?.label || t("Add"),
      isModal: true,
      modal: (
        <GenericAddEditPanel
          isOpen={isAddOpen}
          close={() => setIsAddOpen(false)}
          inputs={createActionInputs}
          formKeys={createActionFormKeys}
          submitItem={handleSubmitItem}
          buttonName={
            configuredCreateAction?.buttonName ||
            configuredCreateAction?.label ||
            undefined
          }
          topClassName="flex flex-col gap-2"
          itemToEdit={
            constantFilter ||
            Object.keys(createActionDefaults).length > 0 ||
            Object.keys(createActionConstants).length > 0
              ? {
                  id: "",
                  updates: {
                    ...createActionDefaults,
                    ...createActionConstants,
                    ...(constantFilter || {}),
                    _id: "",
                  } as GenericItem,
                }
              : undefined
          }
        />
      ),
      isModalOpen: isAddOpen,
      setIsModal: setIsAddOpen,
      isPath: false,
      icon: null,
      className:
        configuredCreateAction?.buttonClassName ||
        configuredCreateAction?.className ||
        "bg-blue-500 hover:text-blue-500 hover:border-blue-500",
    }),
    [
      t,
      configuredCreateAction,
      isAddOpen,
      createActionInputs,
      createActionFormKeys,
      handleSubmitItem,
      constantFilter,
      createActionDefaults,
      createActionConstants,
    ],
  );

  const defaultActions = useMemo<ActionType<GenericItem>[]>(() => {
    if (!schemaActionsEnabled) return [];
    return [
      {
        name: t("Delete"),
        icon: <HiOutlineTrash />,
        setRow: setRowToAction as (value: GenericItem) => void,
        modal: rowToAction ? (
          <ConfirmationDialog
            isOpen={isDeleteOpen}
            close={() => setIsDeleteOpen(false)}
            confirm={() => {
              deleteDynamicItem(rowToAction._id);
              setIsDeleteOpen(false);
            }}
            title={t("Delete")}
            text={t("GeneralDeleteMessage")}
          />
        ) : null,
        className: "text-red-500 cursor-pointer text-2xl ml-auto",
        isModal: true,
        isModalOpen: isDeleteOpen,
        setIsModal: setIsDeleteOpen,
        isPath: false,
      },
      {
        name: t("Edit"),
        icon: <FiEdit />,
        className: "text-blue-500 cursor-pointer text-xl mr-auto",
        isModal: true,
        setRow: setRowToAction as (value: GenericItem) => void,
        modal: rowToAction
          ? (() => {
              const normalizedUpdates = normalizeRowForSubmit(rowToAction);

              return (
                <GenericAddEditPanel
                  isOpen={isEditOpen}
                  close={() => setIsEditOpen(false)}
                  inputs={inputs}
                  formKeys={formKeys}
                  submitItem={handleSubmitItem}
                  isEditMode
                  topClassName="flex flex-col gap-2"
                  itemToEdit={{
                    id: rowToAction._id,
                    updates: normalizedUpdates,
                  }}
                />
              );
            })()
          : null,
        isModalOpen: isEditOpen,
        setIsModal: setIsEditOpen,
        isPath: false,
      },
    ];
  }, [
    t,
    rowToAction,
    isDeleteOpen,
    isEditOpen,
    deleteDynamicItem,
    handleSubmitItem,
    formKeys,
    schemaActionsEnabled,
    inputs,
    normalizeRowForSubmit,
  ]);

  const actions = useMemo<ActionType<GenericItem>[]>(() => {
    if (!schemaActionsEnabled) return [];
    if (configuredActionDefinitions === undefined) return defaultActions;
    if (configuredActionDefinitions.length === 0) return [];

    return configuredActionDefinitions.map((actionConfig, index) => {
      const actionId = getActionId(actionConfig, index);
      const label =
        actionConfig.label ||
        (actionConfig.kind === "edit"
          ? t("Edit")
          : actionConfig.kind === "delete"
            ? t("Delete")
            : t("Action"));
      const modalType =
        actionConfig.modalType ||
        (actionConfig.kind === "edit" ? "form" : "none");
      const fallbackIcon =
        actionConfig.kind === "delete"
          ? "HiOutlineTrash"
          : actionConfig.kind === "edit"
            ? "FiEdit"
            : "MdTouchApp";
      const actionInputs = getActionInputs(actionConfig, actionId, rowToAction);
      const actionFormKeys = getActionFormKeys(actionConfig, actionInputs);
      const constants = getActionConstantValues(actionConfig);
      const defaultValues = getActionDefaultValues(actionConfig);
      const closeModal = () =>
        setActionModalOpen((current) => ({ ...current, [actionId]: false }));
      const openModal = (row: GenericItem) => {
        setRowToAction(row);
        setActionModalOpen((current) => ({ ...current, [actionId]: true }));
      };
      const isHidden = (row: GenericItem) =>
        !!actionConfig.hiddenCondition?.trim() &&
        evaluateRowCondition(row, actionConfig.hiddenCondition);
      const isDisabled = (row: GenericItem) =>
        (!!actionConfig.disabledCondition?.trim() &&
          evaluateRowCondition(row, actionConfig.disabledCondition)) ||
        (!!actionConfig.requiredCondition?.trim() &&
          !evaluateRowCondition(row, actionConfig.requiredCondition));
      const runAction = (row: GenericItem) => {
        if (isDisabled(row)) return;
        if (modalType === "confirm" || modalType === "form") {
          openModal(row);
          return;
        }

        if (actionConfig.kind === "delete") {
          deleteDynamicItem(row._id);
          return;
        }

        if (actionConfig.kind === "link" && actionConfig.linkTemplate) {
          const nextUrl = resolveActionTemplate(actionConfig.linkTemplate, row);
          if (actionConfig.linkType === "internal") {
            window.location.assign(nextUrl);
          } else {
            window.open(nextUrl, "_blank", "noopener,noreferrer");
          }
          return;
        }

        updateDynamicItem(row._id, constants as Partial<GenericItem>);
      };
      const submitConfiguredAction = (
        item: GenericItem | UpdatePayload<GenericItem>,
      ) => {
        if (!rowToAction) return;
        const rawUpdates =
          "updates" in item
            ? (item.updates as Record<string, unknown>)
            : (item as Record<string, unknown>);
        updateDynamicItem(rowToAction._id, {
          ...rawUpdates,
          ...constants,
        } as Partial<GenericItem>);
        closeModal();
      };

      return {
        name: label,
        icon: getActionIconElement(actionConfig, fallbackIcon),
        isModal: modalType === "confirm" || modalType === "form",
        isModalOpen: !!actionModalOpen[actionId],
        setIsModal: (value: boolean) =>
          setActionModalOpen((current) => ({ ...current, [actionId]: value })),
        modal:
          rowToAction && modalType === "confirm" ? (
            <ConfirmationDialog
              isOpen={!!actionModalOpen[actionId]}
              close={closeModal}
              confirm={() => {
                if (actionConfig.kind === "delete") {
                  deleteDynamicItem(rowToAction._id);
                } else {
                  updateDynamicItem(
                    rowToAction._id,
                    constants as Partial<GenericItem>,
                  );
                }
                closeModal();
              }}
              title={t(actionConfig.confirmTitle || label)}
              text={t(actionConfig.confirmText || "GeneralConfirmMessage")}
            />
          ) : rowToAction && modalType === "form" ? (
            <GenericAddEditPanel
              isOpen={!!actionModalOpen[actionId]}
              close={closeModal}
              inputs={actionInputs}
              formKeys={actionFormKeys}
              submitItem={submitConfiguredAction}
              isEditMode
              buttonName={
                actionConfig.buttonName || actionConfig.label || t("Update")
              }
              topClassName="flex flex-col gap-2"
              itemToEdit={{
                id: rowToAction._id,
                updates: {
                  ...normalizeRowForSubmit(rowToAction),
                  ...defaultValues,
                  ...constants,
                },
              }}
            />
          ) : null,
        isPath: false,
        node: (row: GenericItem) => {
          if (isHidden(row)) return null;
          const disabled = isDisabled(row);
          return (
            <button
              type="button"
              title={label}
              disabled={disabled}
              onClick={() => runAction(row)}
              className={
                actionConfig.isButton
                  ? actionConfig.buttonClassName ||
                    "px-2 py-1 rounded border border-neutral-200 text-xs disabled:opacity-50"
                  : `${
                      actionConfig.className ||
                      "text-blue-500 cursor-pointer text-xl"
                    } ${disabled ? "opacity-40 pointer-events-none" : ""}`
              }
            >
              {actionConfig.isButton
                ? label
                : getActionIconElement(actionConfig, fallbackIcon)}
            </button>
          );
        },
      };
    });
  }, [
    actionModalOpen,
    configuredActionDefinitions,
    defaultActions,
    deleteDynamicItem,
    getActionFormKeys,
    getActionInputs,
    normalizeRowForSubmit,
    rowToAction,
    schemaActionsEnabled,
    t,
    updateDynamicItem,
  ]);

  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [isBulkStepTwo, setIsBulkStepTwo] = useState(false);
  const [bulkSelectedKeys, setBulkSelectedKeys] = useState<string[]>([]);
  const [bulkForm, setBulkForm] = useState<Record<string, unknown>>({});

  // Filter out image fields from bulk edit options
  const bulkFieldOptions = useMemo(
    () =>
      displayFields
        .filter((f) => {
          const fieldType = (f.type || "").toLowerCase();
          if (fieldType === Types.Image || fieldType === Types.Image)
            return false;
          return !f.equation;
        })
        .map((f) => ({
          value: f.name,
          label: t(getFieldLabel(f)),
        })),
    [displayFields, t],
  );

  const bulkFormKeys = useMemo(() => {
    if (isBulkStepTwo) {
      // Step 2: only the selected fields
      return displayFields
        .filter((f) => bulkSelectedKeys.includes(f.name))
        .map((f) => {
          const m = fieldToInput(f);
          return { key: f.name, type: m.formKeyType };
        });
    } else {
      // Step 1: only the selector
      return [{ key: "bulkSelectedKeys", type: FormKeyTypeEnum.STRING }];
    }
  }, [displayFields, bulkSelectedKeys, isBulkStepTwo]);

  // Generate bulk edit inputs
  const bulkEditInputs = useMemo(() => {
    const selectInput = {
      type: InputTypes.SELECT,
      formKey: "bulkSelectedKeys",
      label: t("Edit Option Selection"),
      options: bulkFieldOptions,
      placeholder: t("Select fields to edit"),
      isMultiple: true,
      required: true,
      isDisabled: isBulkStepTwo,
    };

    const chosen = new Set(bulkSelectedKeys);
    const valueInputs = displayFields
      .filter((f) => chosen.has(f.name))
      .map((f) => {
        const m = fieldToInput(f);
        const label = t(getFieldLabel(f));
        const fieldType = (f.type || "").toLowerCase();

        // Check if field has populationSettings (objectId/autoIncrementId/objectIdArray with selection data)
        if (
          (fieldType === Types.ObjectId ||
            fieldType === Types.AutoIncrementId ||
            fieldType === Types.ObjectIdArray) &&
          f.populationSettings &&
          f.objectSchemaName
        ) {
          const selectionData = selectionDataMap.get(f.name) || [];
          const displayLabel = f.populationSettings.displayLabel || label;

          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label: t(displayLabel),
            placeholder: t(displayLabel),
            required: false,
            isDisabled: !isBulkStepTwo,
            isMultiple: fieldType === Types.ObjectIdArray, // Enable multi-select for objectIdArray
            options: selectionData.map((item) => ({
              value: String(item._id || ""),
              label: String(
                item[f.populationSettings!.inputSelectionField] ||
                  item._id ||
                  "",
              ),
            })),
          };
        }

        // Check if field has enumList
        if (f.enumList && f.enumList.length > 0) {
          const originalType = f.type || "";

          // Check if it's an array type
          const isStringArray =
            fieldType === Types.StringArray ||
            originalType === "stringArray" ||
            fieldType === "string[]" ||
            fieldType === "array<string>";
          const isIntArray =
            fieldType === Types.IntArray ||
            originalType === "intArray" ||
            fieldType === "int[]" ||
            fieldType === "array<int>";
          const isNumberArray =
            fieldType === Types.NumberArray ||
            originalType === "numberArray" ||
            fieldType === "number[]" ||
            fieldType === "array<number>";

          const isArrayType = isStringArray || isIntArray || isNumberArray;

          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label,
            placeholder: label,
            required: false,
            isDisabled: !isBulkStepTwo,
            isMultiple: isArrayType,
            options: f.enumList.map((item) => ({
              value: item,
              label: String(item),
            })),
          };
        }

        return {
          type: m.inputType,
          formKey: f.name,
          label,
          placeholder: label,
          required: false,
          isDisabled: !isBulkStepTwo,
        };
      });

    return [selectInput, ...valueInputs];
  }, [
    t,
    bulkFieldOptions,
    isBulkStepTwo,
    displayFields,
    bulkSelectedKeys,
    selectionDataMap,
  ]);

  // Memoize handlers to prevent recreating selection actions
  const handleBulkEditSubmit = useCallback(() => {
    // Only submit when in step 2
    if (!isBulkStepTwo) return;

    const chosen = new Set(bulkSelectedKeys);
    const updates: Partial<GenericItem> = {};

    // Convert values to proper types before submission
    for (const k of Object.keys(bulkForm)) {
      if (chosen.has(k)) {
        const formKey = bulkFormKeys.find((fk) => fk.key === k);
        let value = bulkForm[k];

        // Convert boolean values - ensure false default
        if (formKey?.type === FormKeyTypeEnum.BOOLEAN) {
          if (value === undefined || value === null || value === "") {
            value = false;
          } else if (typeof value === "string") {
            value = value === "true";
          } else if (typeof value !== "boolean") {
            value = false;
          }
        }

        // Convert number values from string to actual number
        if (formKey?.type === FormKeyTypeEnum.NUMBER) {
          if (typeof value === "string" && value !== "") {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
              value = numValue;
            }
          }
        }

        // Convert string array - split comma-separated values into array
        if (formKey?.type === FormKeyTypeEnum.STRING_ARRAY) {
          if (typeof value === "string" && value !== "") {
            value = value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "");
          } else if (!Array.isArray(value)) {
            value = [];
          }
        }

        // Convert int array - split comma-separated values and parse to integers
        if (formKey?.type === FormKeyTypeEnum.INT_ARRAY) {
          if (typeof value === "string" && value !== "") {
            value = value
              .split(",")
              .map((item) => parseInt(item.trim(), 10))
              .filter((item) => !isNaN(item));
          } else if (Array.isArray(value)) {
            value = value.map((item) =>
              typeof item === "string" ? parseInt(item, 10) : item,
            );
          } else {
            value = [];
          }
        }

        // Convert number array - split comma-separated values and parse to numbers
        if (formKey?.type === FormKeyTypeEnum.NUMBER_ARRAY) {
          if (typeof value === "string" && value !== "") {
            value = value
              .split(",")
              .map((item) => parseFloat(item.trim()))
              .filter((item) => !isNaN(item));
          } else if (Array.isArray(value)) {
            value = value.map((item) =>
              typeof item === "string" ? parseFloat(item) : item,
            );
          } else {
            value = [];
          }
        }

        updates[k] = value;
      }
    }

    const items = (selectedRows as GenericItem[]).map((r) => ({
      _id: r._id,
      updates,
    }));
    updateMultipleDynamicItem(items);
    setSelectedRows([]);
    setIsSelectionActive(false);
    setIsBulkStepTwo(false);
    setBulkSelectedKeys([]);
    setBulkForm({});
    setIsBulkEditOpen(false);
  }, [
    isBulkStepTwo,
    bulkForm,
    bulkSelectedKeys,
    bulkFormKeys,
    selectedRows,
    updateMultipleDynamicItem,
    setSelectedRows,
    setIsSelectionActive,
  ]);

  const handleBulkEditClose = useCallback(() => {
    setIsBulkEditOpen(false);
    setIsBulkStepTwo(false);
    setBulkSelectedKeys([]);
    setBulkForm({});
  }, []);

  const handleBulkFormChange = useCallback((f: Record<string, unknown>) => {
    setBulkForm((prev) => ({ ...prev, ...f }));
  }, []);

  const handleBulkEditBackOrForward = useCallback(() => {
    if (isBulkStepTwo) {
      // We're in step 2, go back to step 1
      setIsBulkStepTwo(false);
    } else {
      // We're in step 1, move forward to step 2
      const selectedKeys = Array.isArray(bulkForm.bulkSelectedKeys)
        ? (bulkForm.bulkSelectedKeys as string[])
        : [];
      if (selectedKeys.length > 0) {
        setBulkSelectedKeys(selectedKeys);

        // Initialize boolean fields to false for the selected fields
        const initialBulkValues: Record<string, unknown> = {};
        displayFields
          .filter((f) => selectedKeys.includes(f.name))
          .forEach((f) => {
            const m = fieldToInput(f);
            if (m.formKeyType === FormKeyTypeEnum.BOOLEAN) {
              initialBulkValues[f.name] = false;
            }
          });

        setBulkForm((prev) => ({ ...prev, ...initialBulkValues }));
        setIsBulkStepTwo(true);
      }
    }
  }, [isBulkStepTwo, bulkForm, displayFields]);

  const handleBulkDeleteConfirm = useCallback(() => {
    deleteMultipleDynamicItem(
      selectedRows.map((r) => ({ _id: (r as GenericItem)._id })),
    );
    setSelectedRows([]);
    setIsSelectionActive(false);
    setIsBulkDeleteOpen(false);
  }, [
    selectedRows,
    deleteMultipleDynamicItem,
    setSelectedRows,
    setIsSelectionActive,
  ]);

  const filterPanelInputs = useMemo(() => {
    const constantFilterKeys = constantFilter
      ? Object.keys(constantFilter)
      : [];

    const defaultInputs = displayFields
      .filter((f) => {
        const fieldType = (f.type || "").toLowerCase();
        // Exclude id, image fields, and constantFilter fields from filters
        return (
          !["_id", "id"].includes(f.name) &&
          fieldType !== Types.Image &&
          fieldType !== "img" &&
          !constantFilterKeys.includes(f.name)
        );
      })
      .map((f) => {
        const m = fieldToInput(f);
        const label = t(getFieldLabel(f));
        const fieldType = (f.type || "").toLowerCase();

        // Check if field is objectId/autoIncrementId/objectIdArray with populationSettings
        if (
          (fieldType === Types.ObjectId ||
            fieldType === Types.AutoIncrementId ||
            fieldType === Types.ObjectIdArray) &&
          f.populationSettings &&
          f.populationSettings.inputSelectionField &&
          selectionDataMap.has(f.name)
        ) {
          const selectionOptions = selectionDataMap.get(f.name) || [];
          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label,
            placeholder: label,
            required: false,
            isMultiple: fieldType === Types.ObjectIdArray, // Enable multi-select for objectIdArray
            options: selectionOptions.map((item) => ({
              value: String(item._id || ""),
              label: String(
                item[f.populationSettings!.inputSelectionField] ||
                  item._id ||
                  "",
              ),
            })),
          };
        }

        // Check if field has enumList
        if (f.enumList && f.enumList.length > 0) {
          const fieldType = (f.type || "").toLowerCase();
          const originalType = f.type || "";

          // Check if it's an array type
          const isStringArray =
            fieldType === Types.StringArray ||
            originalType === "stringArray" ||
            fieldType === "string[]" ||
            fieldType === "array<string>";
          const isIntArray =
            fieldType === Types.IntArray ||
            originalType === "intArray" ||
            fieldType === "int[]" ||
            fieldType === "array<int>";
          const isNumberArray =
            fieldType === Types.NumberArray ||
            originalType === "numberArray" ||
            fieldType === "number[]" ||
            fieldType === "array<number>";

          const isArrayType = isStringArray || isIntArray || isNumberArray;

          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label,
            placeholder: label,
            required: false,
            isMultiple: isArrayType,
            options: f.enumList.map((item) => ({
              value: item,
              label: String(item),
            })),
          };
        }

        // Convert boolean fields to SELECT input for filter panel
        if (m.inputType === InputTypes.CHECKBOX) {
          return {
            type: InputTypes.SELECT,
            formKey: f.name,
            label,
            placeholder: label,
            required: false,
            options: [
              { value: "true", label: t("True") },
              { value: "false", label: t("False") },
            ],
          };
        }

        return {
          type: m.inputType,
          formKey: f.name,
          label,
          placeholder: label,
          required: false,
        };
      });
    return buildConfiguredFilterInputs(
      configuredFilterInputs,
      defaultInputs,
      filterSelectionDataMap,
    );
  }, [
    displayFields,
    t,
    selectionDataMap,
    constantFilter,
    configuredFilterInputs,
    filterSelectionDataMap,
  ]);

  const filters = useMemo(
    () => [
      {
        label: t("Show Filters"),
        isUpperSide: true,
        node: (
          <SwitchButton
            checked={showFilters}
            onChange={() => setShowFilters(!showFilters)}
          />
        ),
      },
    ],
    [t, showFilters],
  );

  const filterPanel = useMemo(
    () => ({
      isFilterPanelActive: showFilters,
      inputs: filterPanelInputs,
      formElements: filterPanelFormElements,
      setFormElements: setFilterPanelFormElements,
      closeFilters: () => setShowFilters(false),
      isApplyButtonActive: true,
    }),
    [showFilters, filterPanelInputs, filterPanelFormElements],
  );

  const selectionActions = useMemo(
    () => [
      {
        name: t("Delete Selected"),
        isButton: true,
        buttonClassName:
          "px-2 ml-auto bg-red-500 hover:text-red-500 hover:border-red-500 sm:px-3 py-1 h-fit w-fit  text-white  hover:bg-white  transition-transform  border  rounded-md cursor-pointer",
        isModal: true,
        className: "cursor-pointer",
        isDisabled: !schemaActionsEnabled || !selectedRows?.length,
        modal:
          selectedRows?.length > 0 ? (
            <ConfirmationDialog
              isOpen={isBulkDeleteOpen}
              close={() => setIsBulkDeleteOpen(false)}
              confirm={handleBulkDeleteConfirm}
              title={t("Delete Selected")}
              text={t("Are you sure you want to delete the selected items?")}
            />
          ) : null,
        isModalOpen: isBulkDeleteOpen,
        setIsModal: setIsBulkDeleteOpen,
        isPath: false,
      },
      {
        name: t("Edit Selected"),
        isButton: true,
        buttonClassName:
          "px-2 ml-auto bg-blue-500 hover:text-blue-500 hover:border-blue-500 sm:px-3 py-1 h-fit w-fit text-white hover:bg-white transition-transform border rounded-md cursor-pointer",
        isModal: true,
        className: "cursor-pointer",
        modal: isBulkEditOpen ? (
          <GenericAddEditPanel
            isOpen={isBulkEditOpen}
            close={handleBulkEditClose}
            inputs={bulkEditInputs}
            formKeys={bulkFormKeys}
            setForm={handleBulkFormChange}
            submitItem={() => {}}
            isEditMode={false}
            topClassName="flex flex-col gap-2"
            generalClassName="overflow-visible"
            buttonName={t("Edit")}
            isSubmitButtonActive={isBulkStepTwo}
            submitFunction={handleBulkEditSubmit}
            additionalButtons={[
              {
                label: isBulkStepTwo ? t("Back") : t("Forward"),
                onClick: handleBulkEditBackOrForward,
              },
            ]}
          />
        ) : null,
        isModalOpen: isBulkEditOpen,
        setIsModal: setIsBulkEditOpen,
        isPath: false,
        isDisabled: !schemaActionsEnabled || !selectedRows?.length,
      },
    ],
    [
      t,
      schemaActionsEnabled,
      selectedRows,
      isBulkDeleteOpen,
      handleBulkDeleteConfirm,
      isBulkEditOpen,
      handleBulkEditClose,
      handleBulkFormChange,
      bulkEditInputs,
      bulkFormKeys,
      isBulkStepTwo,
      handleBulkEditSubmit,
      handleBulkEditBackOrForward,
    ],
  );

  return (
    <>
      <div className="w-[95%] mx-auto">
        <GenericTable
          rowKeys={rowKeys}
          actions={actions}
          columns={columns}
          rows={rows}
          rowStyleFunction={rowStyleFunction}
          title={customTitle || t(humanize(schemaName))}
          addButton={addButton}
          isCollapsible={false}
          isActionsActive={schemaActionsEnabled}
          isSearch={false}
          outsideSortProps={outsideSort}
          {...(pagination && { pagination })}
          outsideSearchProps={outsideSearchProps}
          selectionActions={selectionActions}
          isExcel={false}
          onExcelUpload={undefined}
          onExcelExport={undefined}
          filters={filters}
          filterPanel={filterPanel}
          containerFields={container?.fields}
        />
      </div>
    </>
  );
}
