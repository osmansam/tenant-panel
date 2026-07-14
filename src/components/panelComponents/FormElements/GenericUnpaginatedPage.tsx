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
import { TableActionConfig, TableComponentConfig } from "../../../types/page";
import { UpdatePayload } from "../../../utils/api";
import {
  ContainerModel,
  Field,
  Types,
  useGetContainers,
} from "../../../utils/api/container";
import {
  RawContainer,
  fieldToInput,
  getFieldLabel,
  getMatchingRowClassNames,
  humanize,
  isDisplayablePrimitive,
  normalizeContainer,
  normalizeField,
  tailwindBgToStyle,
  evaluateRowCondition,
} from "../../../utils/genericPageHelpers";
import {
  getComputedLabelValue,
  getProgressBarValue,
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
  buildActionFormInputs,
  buildActionFormKeys,
  filterActionFields,
  getActionConstantValues,
  getActionDefaultValues,
  getActionIconElement,
  getActionId,
  getConfiguredTableActions,
  resolveActionTemplate,
  useActionFormSelectionData,
} from "../../../utils/tableActions";
import { generateMockData } from "../../../utils/mockDataGenerator";
import {
  isFieldRequired,
  parseValidationRules,
} from "../../../utils/validationHelper";
import { LinkCell } from "../../LinkCell";
import SwitchButton from "../common/SwitchButton";
import { ActionType, FormKeyTypeEnum, GenericInputType, InputTypes } from "../shared/types";
import GenericTable from "../Tables/GenericTable";
import GenericAddEditPanel from "./GenericAddEditPanel";

type GenericItem = Record<string, unknown> & { _id: string };

type Props = {
  schemaName: string;
  includeFields?: string[];
  excludeFields?: string[];
  actionsEnabled?: boolean;
  isHeader?: boolean;
  tableConfig?: TableComponentConfig;
};

export default function GenericUnpaginatedPage({
  schemaName,
  includeFields,
  excludeFields,
  actionsEnabled = true,
  isHeader = false,
  tableConfig,
}: Props) {
  const { t } = useTranslation();
  const { selectedRows, setSelectedRows, setIsSelectionActive } =
    useGeneralContext();
  const { user } = useUserContext();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState<Record<string, boolean>>(
    {},
  );
  const [rowToAction, setRowToAction] = useState<GenericItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterFormElements, setFilterFormElements] =
    useState<FormElementsState>({});
  const configuredFilterInputs = tableConfig?.filterPanel?.inputs;
  const filterSelectionDataMap =
    useFilterPanelSelectionData(configuredFilterInputs);
  const configuredFilterDefaults = useMemo(
    () => getFilterDefaultValues(configuredFilterInputs),
    [configuredFilterInputs],
  );

  useEffect(() => {
    if (!Object.keys(configuredFilterDefaults).length) return;

    setFilterFormElements((prev) => {
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

  const rowStyleFunction = useCallback(
    (row: GenericItem): React.CSSProperties => {
      const styles: React.CSSProperties = {};
      const rowClassName = tableConfig?.rows?.className;

      if (rowClassName) {
        Object.assign(styles, tailwindBgToStyle(getMatchingRowClassNames(row, rowClassName)));
        return styles;
      }

      // Container level configs
      if (container?.frontend?.rowClassName) {
        Object.assign(
          styles,
          tailwindBgToStyle(getMatchingRowClassNames(row, container.frontend.rowClassName)),
        );
      }

      // Field level configs
      container?.fields.forEach((field) => {
        if (field.frontend?.rowClassName) {
          Object.assign(
            styles,
            tailwindBgToStyle(getMatchingRowClassNames(row, field.frontend.rowClassName)),
          );
        }
      });

      return styles;
    },
    [container, tableConfig],
  );

  // Generate mock data based on container fields (10 items)
  const items = useMemo(() => {
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
  const executeWorkflow = useCallback(
    (payload: {
      workflowName: string;
      workflowSchema?: string;
      record: Record<string, unknown>;
      oldRecord?: Record<string, unknown>;
    }) => {
      console.log("Preview mode: Execute workflow", payload);
    },
    [],
  );

  const displayFields: Field[] = useMemo(() => {
    if (!container?.fields) return [];
    let fields = container.fields
      .map(normalizeField)
      .filter(isDisplayablePrimitive);
    if (includeFields?.length) {
      fields = includeFields
        .map((name) => fields.find((f) => f.name === name))
        .filter((f): f is Field => Boolean(f));
    }
    if (excludeFields?.length) {
      const ex = new Set(excludeFields);
      fields = fields.filter((f) => !ex.has(f.name));
    }
    fields = fields.filter((f) => f.name !== "_id" && f.name !== "id");

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
  }, [container, includeFields, excludeFields, user]);

  // Fetch selection data for objectId/autoIncrementId fields with populationSettings
  const selectionDataMap = useSelectionData(container?.fields || []);

  const rowKeys = useMemo(
    () =>
      displayFields.map((f) => {
        const fieldType = (f.type || "").toLowerCase();
        const originalType = f.type || "";
        const isStringArray =
          fieldType === Types.StringArray ||
          originalType === Types.StringArray ||
          fieldType === "string[]" ||
          fieldType === "array<string>";
        const isIntArray =
          fieldType === Types.IntArray ||
          originalType === Types.IntArray ||
          fieldType === "int[]" ||
          fieldType === "array<int>";
        const isNumberArray =
          fieldType === Types.NumberArray ||
          originalType === Types.NumberArray ||
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

        // Add node function for boolean fields
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
      }),
    [displayFields, updateDynamicItem, selectionDataMap, t, tableConfig],
  );

  const columns = useMemo(() => {
    const baseCols = displayFields.map((f) => ({
      key: t(getTableDisplayName(tableConfig, f) || getFieldLabel(f)),
      isSortable:
        tableConfig?.columns?.find((column) => column.field === f.name)
          ?.type !== "computedLabel",
      correspondingKey: f.name,
    }));
    if (actionsEnabled) {
      return [...baseCols, { key: t("Actions"), isSortable: false }];
    }
    return baseCols;
  }, [displayFields, t, actionsEnabled, tableConfig]);

  const { inputs, formKeys } = useMemo(() => {
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
            fieldType === Types.StringArray ||
            originalType === Types.StringArray ||
            fieldType === "string[]" ||
            fieldType === "array<string>";
          const isIntArray =
            fieldType === Types.IntArray ||
            originalType === Types.IntArray ||
            fieldType === "int[]" ||
            fieldType === "array<int>";
          const isNumberArray =
            fieldType === Types.NumberArray ||
            originalType === Types.NumberArray ||
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

    return { inputs: ins, formKeys: fks };
  }, [displayFields, t, selectionDataMap]);

  const handleSubmitItem = useCallback(
    (item: GenericItem | UpdatePayload<GenericItem>) => {
      if ("id" in item && "updates" in item) {
        updateDynamicItem(
          item.id as string | number,
          item.updates as Partial<GenericItem>,
        );
      } else {
        createDynamicItem(item as GenericItem);
      }
    },
    [updateDynamicItem, createDynamicItem],
  );

  const addButton = useMemo(() => {
    return {
      name: t("Add"),
      isModal: true,
      modal: (
        <GenericAddEditPanel
          isOpen={isAddOpen}
          close={() => setIsAddOpen(false)}
          inputs={inputs}
          formKeys={formKeys}
          submitItem={handleSubmitItem}
          topClassName="flex flex-col gap-2"
        />
      ),
      isModalOpen: isAddOpen,
      setIsModal: setIsAddOpen,
      isPath: false,
      icon: null,
      className: "bg-blue-500 hover:text-blue-500 hover:border-blue-500",
    };
  }, [t, isAddOpen, inputs, formKeys, handleSubmitItem]);

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

  const configuredActionDefinitions = useMemo(
    () => getConfiguredTableActions(tableConfig, container?.frontend?.actions),
    [container?.frontend?.actions, tableConfig],
  );
  const bulkEditActionConfig = tableConfig?.bulkActions?.edit;
  const bulkDeleteActionConfig = tableConfig?.bulkActions?.delete;
  const configuredBulkEditFields = bulkEditActionConfig?.formFields || [];
  const bulkActionSelectionDataMap = useActionFormSelectionData(
    bulkEditActionConfig ? [bulkEditActionConfig] : [],
  );
  const actionSelectionDataMap = useActionFormSelectionData(
    configuredActionDefinitions || [],
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

  const defaultActions = useMemo<ActionType<GenericItem>[]>(() => {
    if (!actionsEnabled) return [];
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
    inputs,
    formKeys,
    actionsEnabled,
    normalizeRowForSubmit,
  ]);

  const actions = useMemo<ActionType<GenericItem>[]>(() => {
    if (!actionsEnabled) return [];
    if (!configuredActionDefinitions?.length) return defaultActions;

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
              buttonName={actionConfig.buttonName || actionConfig.label || t("Update")}
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
    actionsEnabled,
    configuredActionDefinitions,
    defaultActions,
    deleteDynamicItem,
    getActionFormKeys,
    getActionInputs,
    normalizeRowForSubmit,
    rowToAction,
    t,
    updateDynamicItem,
  ]);

  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [isBulkStepTwo, setIsBulkStepTwo] = useState(false);
  const [bulkSelectedKeys, setBulkSelectedKeys] = useState<string[]>([]);
  const [bulkForm, setBulkForm] = useState<Record<string, unknown>>({});
  const bulkFieldOptions = useMemo(
    () => {
      if (configuredBulkEditFields.length) {
        return configuredBulkEditFields
          .filter((field) => field.formKey)
          .map((field) => ({
            value: field.formKey,
            label: t(field.label || field.formKey),
          }));
      }

      return displayFields
        .filter((f) => {
          const fieldType = (f.type || "").toLowerCase();
          return (
            fieldType !== Types.Image &&
            fieldType !== Types.Image &&
            !f.equation
          );
        })
        .map((f) => ({
          value: f.name,
          label: t(getFieldLabel(f)),
        }));
    },
    [configuredBulkEditFields, displayFields, t],
  );

  const bulkFormKeys = useMemo(() => {
    if (isBulkStepTwo) {
      if (configuredBulkEditFields.length) {
        return buildActionFormKeys({
          ...(bulkEditActionConfig || {
            kind: "update",
          }),
          formFields: configuredBulkEditFields.filter((field) =>
            bulkSelectedKeys.includes(field.formKey),
          ),
        } as TableActionConfig);
      }

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
  }, [
    bulkEditActionConfig,
    configuredBulkEditFields,
    displayFields,
    bulkSelectedKeys,
    isBulkStepTwo,
  ]);

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
    if (configuredBulkEditFields.length) {
      const valueInputs = buildActionFormInputs(
        {
          ...(bulkEditActionConfig || { kind: "update" }),
          formFields: configuredBulkEditFields.filter((field) =>
            chosen.has(field.formKey),
          ),
        } as TableActionConfig,
        getActionId(bulkEditActionConfig || { kind: "update" }, 0),
        null,
        bulkActionSelectionDataMap,
      ).map((input) => ({
        ...input,
        required: false,
        isDisabled: !isBulkStepTwo,
      }));

      return [selectInput, ...valueInputs];
    }

    const valueInputs = displayFields
      .filter((f) => chosen.has(f.name))
      .map((f) => {
        const m = fieldToInput(f);
        const label = t(getFieldLabel(f));
        const fieldType = (f.type || "").toLowerCase();

        // Check if field has populationSettings (objectId/autoIncrementId/objectIdArray with selection data)
        if (
          (fieldType === "objectid" ||
            fieldType === "autoincrementid" ||
            fieldType === "objectidarray") &&
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
            isMultiple: fieldType === "objectidarray", // Enable multi-select for objectIdArray
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
    configuredBulkEditFields,
    bulkEditActionConfig,
    bulkActionSelectionDataMap,
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
    if (bulkEditActionConfig?.submit?.workflowName) {
      executeWorkflow({
        workflowName: bulkEditActionConfig.submit.workflowName,
        workflowSchema: bulkEditActionConfig.submit.workflowSchema || schemaName,
        record: {
          selectedIds: (selectedRows as GenericItem[]).map((r) => r._id),
          updates,
          items,
          functionName: bulkEditActionConfig.submit.functionName,
        },
      });
    } else {
      updateMultipleDynamicItem(items);
    }
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
    bulkEditActionConfig,
    selectedRows,
    schemaName,
    executeWorkflow,
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
        if (configuredBulkEditFields.length) {
          buildActionFormKeys({
            ...(bulkEditActionConfig || { kind: "update" }),
            formFields: configuredBulkEditFields.filter((field) =>
              selectedKeys.includes(field.formKey),
            ),
          } as TableActionConfig).forEach((fieldKey) => {
            if (fieldKey.type === FormKeyTypeEnum.BOOLEAN) {
              initialBulkValues[fieldKey.key] = false;
            }
          });
        } else {
          displayFields
            .filter((f) => selectedKeys.includes(f.name))
            .forEach((f) => {
              const m = fieldToInput(f);
              if (m.formKeyType === FormKeyTypeEnum.BOOLEAN) {
                initialBulkValues[f.name] = false;
              }
            });
        }

        setBulkForm((prev) => ({ ...prev, ...initialBulkValues }));
        setIsBulkStepTwo(true);
      }
    }
  }, [
    isBulkStepTwo,
    bulkForm,
    bulkEditActionConfig,
    configuredBulkEditFields,
    displayFields,
  ]);

  const handleBulkDeleteConfirm = useCallback(() => {
    const items = selectedRows.map((r) => ({ _id: (r as GenericItem)._id }));
    if (bulkDeleteActionConfig?.submit?.workflowName) {
      executeWorkflow({
        workflowName: bulkDeleteActionConfig.submit.workflowName,
        workflowSchema:
          bulkDeleteActionConfig.submit.workflowSchema || schemaName,
        record: {
          selectedIds: items.map((item) => item._id),
          items,
          functionName: bulkDeleteActionConfig.submit.functionName,
        },
      });
    } else {
      deleteMultipleDynamicItem(items);
    }
    setSelectedRows([]);
    setIsSelectionActive(false);
    setIsBulkDeleteOpen(false);
  }, [
    selectedRows,
    bulkDeleteActionConfig,
    schemaName,
    executeWorkflow,
    deleteMultipleDynamicItem,
    setSelectedRows,
    setIsSelectionActive,
  ]);

  const filterPanelInputs = useMemo(() => {
    const defaultInputs = displayFields
      .filter((f) => {
        const fieldType = (f.type || "").toLowerCase();
        // Exclude id, image fields from filters
        return (
          !["_id", "id"].includes(f.name) &&
          fieldType !== "image" &&
          fieldType !== "img"
        );
      })
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
      formElements: filterFormElements,
      setFormElements: setFilterFormElements,
      closeFilters: () => setShowFilters(false),
      isApplyButtonActive: true,
    }),
    [showFilters, filterPanelInputs, filterFormElements],
  );

  const selectionActions = useMemo(
    () => [
      ...(bulkDeleteActionConfig && bulkDeleteActionConfig.enabled !== false
        ? [
            {
              name: t(bulkDeleteActionConfig?.label || "Delete Selected"),
        isButton: true,
        buttonClassName:
                bulkDeleteActionConfig?.buttonClassName ||
                "px-2 ml-auto bg-red-500 hover:text-red-500 hover:border-red-500 sm:px-3 py-1 h-fit w-fit  text-white  hover:bg-white  transition-transform  border  rounded-md cursor-pointer",
        isModal: true,
        className: "cursor-pointer",
        isDisabled: !actionsEnabled || !selectedRows?.length,
        modal:
          selectedRows?.length > 0 ? (
            <ConfirmationDialog
              isOpen={isBulkDeleteOpen}
              close={() => setIsBulkDeleteOpen(false)}
              confirm={handleBulkDeleteConfirm}
                    title={t(
                      bulkDeleteActionConfig?.confirmTitle ||
                        bulkDeleteActionConfig?.label ||
                        "Delete Selected",
                    )}
                    text={t(
                      bulkDeleteActionConfig?.confirmText ||
                        "Are you sure you want to delete the selected items?",
                    )}
            />
          ) : null,
        isModalOpen: isBulkDeleteOpen,
        setIsModal: setIsBulkDeleteOpen,
        isPath: false,
            },
          ]
        : []),
      ...(bulkEditActionConfig && bulkEditActionConfig.enabled !== false
        ? [
            {
              name: t(bulkEditActionConfig?.label || "Edit Selected"),
        isButton: true,
        buttonClassName:
                bulkEditActionConfig?.buttonClassName ||
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
                  buttonName={t(
                    bulkEditActionConfig?.buttonName ||
                      bulkEditActionConfig?.label ||
                      "Edit",
                  )}
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
        isDisabled: !actionsEnabled || !selectedRows?.length,
            },
          ]
        : []),
    ],
    [
      t,
      actionsEnabled,
      selectedRows,
      bulkDeleteActionConfig,
      isBulkDeleteOpen,
      handleBulkDeleteConfirm,
      bulkEditActionConfig,
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

  const rows = useMemo(() => items || [], [items]);

  return (
    <>
      <div className="w-[95%] mx-auto">
        <GenericTable
          rowKeys={rowKeys}
          actions={actions}
          columns={columns}
          rows={rows || []}
          rowStyleFunction={rowStyleFunction}
          title={t(humanize(schemaName))}
          addButton={addButton}
          isCollapsible={false}
          isActionsActive={actionsEnabled}
          selectionActions={selectionActions}
          isExcel={false}
          onExcelUpload={undefined}
          filters={filters}
          filterPanel={filterPanel}
          containerFields={container?.fields}
        />
      </div>
    </>
  );
}
