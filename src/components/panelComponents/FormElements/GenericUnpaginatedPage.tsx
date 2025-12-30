import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { ConfirmationDialog } from "../../../common/ConfirmationDialog";
import { useGeneralContext } from "../../../context/General.context";
import { useUserContext } from "../../../context/User.context";
import { useSelectionData } from "../../../hooks/useSelectionData";
import { FormElementsState } from "../../../types";
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
  humanize,
  isDisplayablePrimitive,
  normalizeContainer,
  normalizeField,
  tailwindBgToStyle,
} from "../../../utils/genericPageHelpers";
import { generateMockData } from "../../../utils/mockDataGenerator";
import {
  isFieldRequired,
  parseValidationRules,
} from "../../../utils/validationHelper";
import { LinkCell } from "../../LinkCell";
import SwitchButton from "../common/SwitchButton";
import { FormKeyTypeEnum, InputTypes } from "../shared/types";
import GenericTable from "../Tables/GenericTable";
import GenericAddEditPanel from "./GenericAddEditPanel";

type GenericItem = Record<string, unknown> & { _id: string };

type Props = {
  schemaName: string;
  includeFields?: string[];
  excludeFields?: string[];
  actionsEnabled?: boolean;
  isHeader?: boolean;
};

export default function GenericUnpaginatedPage({
  schemaName,
  includeFields,
  excludeFields,
  actionsEnabled = true,
  isHeader = false,
}: Props) {
  const { t } = useTranslation();
  const { selectedRows, setSelectedRows, setIsSelectionActive } =
    useGeneralContext();
  const { user } = useUserContext();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToAction, setRowToAction] = useState<GenericItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterFormElements, setFilterFormElements] =
    useState<FormElementsState>({});

  const rawContainers = useGetContainers();

  const container: ContainerModel | undefined = useMemo(() => {
    if (!rawContainers) return undefined;
    const normalized = rawContainers.map((c: RawContainer) =>
      normalizeContainer(c)
    );
    return normalized.find(
      (c: ContainerModel) =>
        (c.schemaName || "").toLowerCase() === schemaName.toLowerCase()
    );
  }, [rawContainers, schemaName]);

  const rowStyleFunction = useCallback(
    (row: GenericItem): React.CSSProperties => {
      const styles: React.CSSProperties = {};

      // Container level configs
      if (container?.frontend?.rowClassName) {
        container.frontend.rowClassName.forEach((config) => {
          if (evaluateRowCondition(row, config.condition)) {
            Object.assign(styles, tailwindBgToStyle(config.className));
          }
        });
      }

      // Field level configs
      container?.fields.forEach((field) => {
        if (field.frontend?.rowClassName) {
          field.frontend.rowClassName.forEach((config) => {
            if (evaluateRowCondition(row, config.condition)) {
              Object.assign(styles, tailwindBgToStyle(config.className));
            }
          });
        }
      });

      return styles;
    },
    [container]
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
    []
  );

  const deleteDynamicItem = useCallback((id: string | number) => {
    console.log("Preview mode: Delete item", id);
  }, []);

  const deleteMultipleDynamicItem = useCallback(
    (items: { _id: string | number }[]) => {
      console.log("Preview mode: Delete multiple items", items);
    },
    []
  );

  const updateMultipleDynamicItem = useCallback(
    (items: { _id: string | number; updates: Partial<GenericItem> }[]) => {
      console.log("Preview mode: Update multiple items", items);
    },
    []
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

        // Compute className based on rowKeyClassName conditions
        if (f.frontend?.rowKeyClassName) {
          rowKey.className = (row: GenericItem) => {
            let classNames = "";
            f.frontend!.rowKeyClassName!.forEach((config) => {
              if (evaluateRowCondition(row, config.condition)) {
                classNames += ` ${config.className}`;
              }
            });
            return classNames.trim();
          };
        }

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
            return f.frontend?.linkTemplate ? (
              <LinkCell field={f} row={row} />
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
                  (fieldName) => valueObj[fieldName]
                )
                .filter(Boolean)
                .map(String);
              content = displayValues.join(" - ") || String(valueObj._id || "");
            } else {
              content = String(value || "");
            }
            return f.frontend?.linkTemplate ? (
              <LinkCell field={f} row={row} />
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
                      (fieldName) => itemObj[fieldName]
                    )
                    .filter(Boolean)
                    .map(String);
                  return displayValues.join(" - ") || String(itemObj._id || "");
                } else if (typeof item === "string") {
                  // Handle ID strings by looking up in selectionDataMap
                  const selectionOptions = selectionDataMap.get(f.name) || [];
                  const foundOption = selectionOptions.find(
                    (opt) => opt._id === item
                  );
                  if (foundOption) {
                    return String(
                      foundOption[f.populationSettings!.inputSelectionField] ||
                        item
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
            return f.frontend?.linkTemplate ? (
              <LinkCell field={f} row={row} />
            ) : (
              <span>{content}</span>
            );
          };
        } else if (f.frontend?.linkTemplate) {
          // Handle all other field types with linkTemplate (e.g., regular strings, numbers)
          rowKey.node = (row: GenericItem) => <LinkCell field={f} row={row} />;
        }

        return rowKey;
      }),
    [displayFields, updateDynamicItem, selectionDataMap, t]
  );

  const columns = useMemo(() => {
    const baseCols = displayFields.map((f) => ({
      key: t(getFieldLabel(f)),
      isSortable: true,
      correspondingKey: f.name,
    }));
    if (actionsEnabled) {
      return [...baseCols, { key: t("Actions"), isSortable: false }];
    }
    return baseCols;
  }, [displayFields, t, actionsEnabled]);

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
                  ""
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
          item.updates as Partial<GenericItem>
        );
      } else {
        createDynamicItem(item as GenericItem);
      }
    },
    [updateDynamicItem, createDynamicItem]
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

  const actions = useMemo(() => {
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
              // Normalize the row data to extract IDs from populated fields
              const normalizedUpdates = { ...rowToAction };
              displayFields.forEach((f) => {
                const fieldType = (f.type || "").toLowerCase();
                if (
                  (fieldType === Types.ObjectId ||
                    fieldType === Types.AutoIncrementId) &&
                  f.populationSettings &&
                  normalizedUpdates[f.name] &&
                  typeof normalizedUpdates[f.name] === "object"
                ) {
                  // Extract the _id from the populated object
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
                  // Extract array of _ids from populated objects
                  const populatedArray = normalizedUpdates[f.name] as Array<
                    Record<string, unknown>
                  >;
                  normalizedUpdates[f.name] = populatedArray.map((item) =>
                    item && typeof item === "object" ? item._id : item
                  );
                }
              });

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
  ]);

  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [isBulkStepTwo, setIsBulkStepTwo] = useState(false);
  const [bulkSelectedKeys, setBulkSelectedKeys] = useState<string[]>([]);
  const [bulkForm, setBulkForm] = useState<Record<string, unknown>>({});
  const bulkFieldOptions = useMemo(
    () =>
      displayFields
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
        })),
    [displayFields, t]
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
                  ""
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
  }, [t, bulkFieldOptions, isBulkStepTwo, displayFields, bulkSelectedKeys]);

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
              typeof item === "string" ? parseInt(item, 10) : item
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
              typeof item === "string" ? parseFloat(item) : item
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
      selectedRows.map((r) => ({ _id: (r as GenericItem)._id }))
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
    return displayFields
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
                  ""
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
  }, [displayFields, t, selectionDataMap]);

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
    [t, showFilters]
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
    [showFilters, filterPanelInputs, filterFormElements]
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
        isDisabled: !actionsEnabled || !selectedRows?.length,
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
        isDisabled: !actionsEnabled || !selectedRows?.length,
      },
    ],
    [
      t,
      actionsEnabled,
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
    ]
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
