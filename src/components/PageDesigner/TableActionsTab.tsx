import type { DynamicWorkflow } from "../../utils/api/container";
import React from "react";
import { ACTION_MODAL_TYPES, ACTION_INPUT_TYPES, ACTION_OPTIONS_SOURCES, ACTION_ICON_OPTIONS } from "./designerConstants";
import { ActionFormLayoutEditor } from "./ActionFormLayoutEditor";
import { parseJsonObject, formatSourceRequestFilters, parseSourceRequestFiltersInput } from "./designerCleaners";
import { formKeyTypeForActionInput, isActionNumberInput, buildActionFormFieldsFromFields, buildDefaultCreateAction } from "./designerFieldDefaults";
import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { Input, Select, Textarea } from "../ui";
import type { OptionType } from "../../types";
import { TableActionConfig, TableActionFormFieldConfig, TableActionInputType, TableActionModalType, TableActionOptionsSource, TableComponentConfig } from "../../types/page";
import { ContainerModel } from "../../utils/api/container";
import { getIconByName } from "../../utils/menuIcons";
import { TABLE_ROW_ACTION_KIND_OPTIONS } from "../../utils/pageDesignerTableConfig";
import SelectInput from "../panelComponents/FormElements/SelectInput";
import ActionConstantValuesEditor from "./ActionConstantValuesEditor";
import ActionSettingsTabs, { ActionConditionsEditor, TableActionTabs } from "./ActionSettingsTabs";
import FieldEditorTabs from "./FieldEditorTabs";
import type { Field } from "../../utils/api/container";

export interface TableActionsTabProps {
  containers: ContainerModel[];
  selectedFields: Field[];
  tableConfig: TableComponentConfig;
  currentAddButton: TableActionConfig;
  projectWorkflowOptions: { schemaName: string; workflow: DynamicWorkflow }[];
  tableActionSettingsId: string;
  activeActionEditorId: string;
  setActiveActionEditorId: React.Dispatch<React.SetStateAction<string>>;
  activeAddButtonFieldIndex: number;
  setActiveAddButtonFieldIndex: React.Dispatch<React.SetStateAction<number>>;
  activeActionFieldIndexes: Record<string, number>;
  setActiveActionFieldIndexes: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addTableAction: () => void;
  moveTableAction: (actionIndex: number, direction: -1 | 1) => void;
  removeTableAction: (actionIndex: number) => void;
  updateTableAction: (actionIndex: number, updates: Partial<TableActionConfig>) => void;
  updateTableAddButton: (updates: Partial<TableActionConfig>) => void;
  addAddButtonFormField: () => void;
  removeAddButtonFormField: (fieldIndex: number) => void;
  moveAddButtonFormField: (fieldIndex: number, direction: -1 | 1) => void;
  updateAddButtonFormField: (fieldIndex: number, updates: Partial<TableActionFormFieldConfig>) => void;
  addActionFormField: (actionIndex: number) => void;
  removeActionFormField: (actionIndex: number, fieldIndex: number) => void;
  moveActionFormField: (actionIndex: number, fieldIndex: number, direction: -1 | 1) => void;
  updateActionFormField: (actionIndex: number, fieldIndex: number, updates: Partial<TableActionFormFieldConfig>) => void;
  addActionFieldOverride: (actionIndex: number) => void;
  removeActionFieldOverride: (actionIndex: number, overrideIndex: number) => void;
  updateActionFieldOverride: (actionIndex: number, overrideIndex: number, updates: Partial<NonNullable<TableActionConfig["fieldOverrides"]>[number]>) => void;
}

export function TableActionsTab({
  containers,
  selectedFields,
  tableConfig,
  currentAddButton,
  projectWorkflowOptions,
  tableActionSettingsId,
  activeActionEditorId,
  setActiveActionEditorId,
  activeAddButtonFieldIndex,
  setActiveAddButtonFieldIndex,
  activeActionFieldIndexes,
  setActiveActionFieldIndexes,
  addTableAction,
  moveTableAction,
  removeTableAction,
  updateTableAction,
  updateTableAddButton,
  addAddButtonFormField,
  removeAddButtonFormField,
  moveAddButtonFormField,
  updateAddButtonFormField,
  addActionFormField,
  removeActionFormField,
  moveActionFormField,
  updateActionFormField,
  addActionFieldOverride,
  removeActionFieldOverride,
  updateActionFieldOverride,
}: TableActionsTabProps) {
  return (
                              <TableActionTabs
                                value={activeActionEditorId}
                                onValueChange={setActiveActionEditorId}
                                onAdd={addTableAction}
                                tabs={[
                                  {
                                    value: "add",
                                    label: "Add Button",
                                    render: (isSelected: boolean) => (
                                      <div
                                        role="group"
                                        aria-label="Add Button"
                                        className="space-y-4 border border-ui-border bg-ui-active-subtle/60 rounded-xl overflow-hidden"
                                      >
                                        <div className="flex items-center justify-between gap-3 px-4 py-3">
                                          <div className="flex flex-1 items-center gap-2 text-left">
                                            <span className="min-w-0">
                                              <span className="block text-sm font-semibold text-ui-foreground">
                                                Add Button
                                              </span>
                                              <span className="block text-xs text-ui-foreground">
                                                Controls the top table add button,
                                                not row actions.
                                              </span>
                                            </span>
                                          </div>
                                          <label className="flex h-9 items-center gap-2 text-xs text-ui-foreground">
                                            <Input
                                              type="checkbox"
                                              checked={
                                                (
                                                  tableConfig.addButton ||
                                                  buildDefaultCreateAction(
                                                    selectedFields,
                                                  )
                                                ).enabled !== false
                                              }
                                              onChange={(e) =>
                                                updateTableAddButton({
                                                  enabled: e.target.checked,
                                                })
                                              }
                                            />
                                            On
                                          </label>
                                        </div>
                                        <ActionSettingsTabs
                                          expanded={isSelected}
                                          id={`${tableActionSettingsId}-add`}
                                          label="Add Button settings"
                                          className="px-4 pb-4 pt-4 border-t border-ui-border"
                                          actionContent={
                                            <>
                                              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <div>
                                                  <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                    Kind
                                                  </span>
                                                  <Select
                                                    value="create"
                                                    disabled
                                                    className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                  >
                                                    <option value="create">Create</option>
                                                  </Select></label>
                                                  <p className="mt-1 text-[11px] text-ui-muted">
                                                    Add Button always creates a new record
                                                    or runs a create workflow.
                                                  </p>
                                                </div>
                                                <div>
                                                  <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                    Label
                                                  </span>
                                                  <Input
                                                    type="text"
                                                    value={
                                                      (
                                                        tableConfig.addButton ||
                                                        buildDefaultCreateAction(
                                                          selectedFields,
                                                        )
                                                      ).label || ""
                                                    }
                                                    onChange={(e) =>
                                                      updateTableAddButton({
                                                        label: e.target.value,
                                                      })
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                  /></label>
                                                </div>
                                              </div>
                                              <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                  <label className="block text-[11px] font-medium text-ui-muted mb-1">
                                                    {/* Workflow / dynamic function */}
                                                    Workflow
                                                  </label>
                                                  <Select
                                                    value={
                                                      currentAddButton.submit
                                                        ?.workflowSchema &&
                                                        currentAddButton.submit?.workflowName
                                                        ? `${currentAddButton.submit.workflowSchema}::${currentAddButton.submit.workflowName}`
                                                        : ""
                                                    }
                                                    onChange={(e) => {
                                                      const [workflowSchema, workflowName] =
                                                        e.target.value.split("::");
                                                      updateTableAddButton({
                                                        submit:
                                                          workflowSchema && workflowName
                                                            ? {
                                                              workflowSchema,
                                                              workflowName,
                                                            }
                                                            : undefined,
                                                      });
                                                    }}
                                                    className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                  >
                                                    <option value="">
                                                      Regular dynamic create
                                                    </option>
                                                    {projectWorkflowOptions.map(
                                                      ({ schemaName, workflow }) => (
                                                        <option
                                                          key={`${schemaName}::${workflow.name}`}
                                                          value={`${schemaName}::${workflow.name}`}
                                                        >
                                                          {schemaName} / {workflow.name}
                                                        </option>
                                                      ),
                                                    )}
                                                  </Select>
                                                  <p className="mt-1 text-[11px] text-ui-muted">
                                                    {/* Select a workflow that contains a
                                                    dynamic-function step. */}
                                                    Select a workflow to handle record creation.
                                                  </p>
                                                </div>
                                              </div>
                                            </>
                                          }
                                          formContent={{
                                            fields: (
                                              <div className="space-y-3 rounded-lg border border-ui-border bg-white p-3">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs font-semibold text-ui-foreground">
                                                    Add Form Fields
                                                  </span>
                                                  <button
                                                    type="button"
                                                    onClick={addAddButtonFormField}
                                                    className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                                                  >
                                                    + Add field
                                                  </button>
                                                </div>
                                                <FieldEditorTabs
                                                  fields={currentAddButton.formFields || []}
                                                  label="Add button form fields"
                                                  activeIndex={activeAddButtonFieldIndex}
                                                  onActiveIndexChange={setActiveAddButtonFieldIndex}
                                                >
                                                  {(field, fieldIndex) => (
                                                    <div
                                                      key={fieldIndex}
                                                      className="space-y-3 rounded-lg border border-ui-border bg-white p-3"
                                                    >
                                                      <div className="grid grid-cols-[1fr_160px_auto] gap-2">
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Form key
                                                          </span>
                                                          <Input
                                                            type="text"
                                                            value={field.formKey}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                { formKey: e.target.value },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            placeholder="form key"
                                                          />
                                                        </label>
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Input type
                                                          </span>
                                                          <Select
                                                            value={field.type}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  type: e.target
                                                                    .value as TableActionInputType,
                                                                  formKeyType:
                                                                    formKeyTypeForActionInput(
                                                                      e.target
                                                                        .value as TableActionInputType,
                                                                      field.isMultiple,
                                                                    ),
                                                                  isNumberButtonsActive:
                                                                    isActionNumberInput(
                                                                      e.target.value,
                                                                    )
                                                                      ? field.isNumberButtonsActive
                                                                      : false,
                                                                },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                          >
                                                            {ACTION_INPUT_TYPES.map(
                                                              (inputType) => (
                                                                <option
                                                                  key={inputType.value}
                                                                  value={inputType.value}
                                                                >
                                                                  {inputType.label}
                                                                </option>
                                                              ),
                                                            )}
                                                          </Select>
                                                        </label>
                                                        <div className="flex items-stretch gap-1">
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              moveAddButtonFormField(
                                                                fieldIndex,
                                                                -1,
                                                              )
                                                            }
                                                            disabled={fieldIndex === 0}
                                                            className="px-2 text-ui-muted bg-ui-surface-subtle hover:bg-ui-surface-subtle rounded-lg disabled:cursor-not-allowed disabled:opacity-40"
                                                            aria-label="Move field up"
                                                            title="Move field up"
                                                          >
                                                            <FiChevronUp size={15} />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              moveAddButtonFormField(
                                                                fieldIndex,
                                                                1,
                                                              )
                                                            }
                                                            disabled={
                                                              fieldIndex ===
                                                              (currentAddButton.formFields
                                                                ?.length || 0) -
                                                              1
                                                            }
                                                            className="px-2 text-ui-muted bg-ui-surface-subtle hover:bg-ui-surface-subtle rounded-lg disabled:cursor-not-allowed disabled:opacity-40"
                                                            aria-label="Move field down"
                                                            title="Move field down"
                                                          >
                                                            <FiChevronDown size={15} />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              removeAddButtonFormField(
                                                                fieldIndex,
                                                              )
                                                            }
                                                            className="px-2 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
                                                            aria-label="Remove field"
                                                            title="Remove field"
                                                          >
                                                            <FiTrash2 size={14} />
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <div className="grid grid-cols-4 gap-2">
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Label
                                                          </span>
                                                          <Input
                                                            type="text"
                                                            value={field.label || ""}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                { label: e.target.value },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            placeholder="label"
                                                          />
                                                        </label>
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Placeholder
                                                          </span>
                                                          <Input
                                                            type="text"
                                                            value={field.placeholder || ""}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  placeholder:
                                                                    e.target.value,
                                                                },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            placeholder="placeholder"
                                                          />
                                                        </label>
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Disabled condition
                                                          </span>
                                                          <Input
                                                            type="text"
                                                            value={
                                                              field.disabledCondition || ""
                                                            }
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  disabledCondition:
                                                                    e.target.value,
                                                                },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            placeholder="disabled condition"
                                                          />
                                                        </label>
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Required condition
                                                          </span>
                                                          <Input
                                                            type="text"
                                                            value={
                                                              field.requiredCondition || ""
                                                            }
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  requiredCondition:
                                                                    e.target.value,
                                                                },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            placeholder="required condition"
                                                          />
                                                        </label>
                                                      </div>
                                                      <div className="grid grid-cols-[auto_auto_auto_1fr] gap-3">
                                                        <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                          <Input
                                                            type="checkbox"
                                                            checked={!!field.required}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  required:
                                                                    e.target.checked,
                                                                },
                                                              )
                                                            }
                                                          />
                                                          Required
                                                        </label>
                                                        <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                          <Input
                                                            type="checkbox"
                                                            checked={!!field.isDisabled}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  isDisabled:
                                                                    e.target.checked,
                                                                },
                                                              )
                                                            }
                                                          />
                                                          Disabled
                                                        </label>
                                                        <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                          <Input
                                                            type="checkbox"
                                                            checked={!!field.isMultiple}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  isMultiple:
                                                                    e.target.checked,
                                                                  formKeyType:
                                                                    formKeyTypeForActionInput(
                                                                      field.type,
                                                                      e.target.checked,
                                                                    ),
                                                                },
                                                              )
                                                            }
                                                          />
                                                          Multiple
                                                        </label>
                                                        {isActionNumberInput(
                                                          field.type,
                                                        ) && (
                                                            <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                              <Input
                                                                type="checkbox"
                                                                checked={
                                                                  !!field.isNumberButtonsActive
                                                                }
                                                                onChange={(e) =>
                                                                  updateAddButtonFormField(
                                                                    fieldIndex,
                                                                    {
                                                                      isNumberButtonsActive:
                                                                        e.target.checked,
                                                                    },
                                                                  )
                                                                }
                                                              />
                                                              Number buttons
                                                            </label>
                                                          )}
                                                        <label className="space-y-1">
                                                          <span className="text-xs font-medium text-ui-muted">
                                                            Default value
                                                          </span>
                                                          <Input
                                                            type="text"
                                                            value={String(
                                                              field.defaultValue ?? "",
                                                            )}
                                                            onChange={(e) =>
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  defaultValue:
                                                                    e.target.value,
                                                                },
                                                              )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            placeholder="default value"
                                                          />
                                                        </label>
                                                      </div>

                                                      {isActionNumberInput(field.type) && (
                                                        <div className="grid grid-cols-2 gap-2">
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Min value
                                                            </span>
                                                            <Input
                                                              type="number"
                                                              value={field.min ?? ""}
                                                              onChange={(e) =>
                                                                updateAddButtonFormField(
                                                                  fieldIndex,
                                                                  {
                                                                    min: e.target.value
                                                                      ? Number(
                                                                        e.target.value,
                                                                      )
                                                                      : undefined,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="min"
                                                            />
                                                          </label>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Max value
                                                            </span>
                                                            <Input
                                                              type="number"
                                                              value={field.max ?? ""}
                                                              onChange={(e) =>
                                                                updateAddButtonFormField(
                                                                  fieldIndex,
                                                                  {
                                                                    max: e.target.value
                                                                      ? Number(
                                                                        e.target.value,
                                                                      )
                                                                      : undefined,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="max"
                                                            />
                                                          </label>
                                                        </div>
                                                      )}

                                                      {field.type === "select" && (
                                                        <div className="space-y-2 rounded-lg border border-ui-border bg-ui-surface-subtle p-3">
                                                          <div className="grid grid-cols-4 gap-2">
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Options source
                                                              </span>
                                                              <Select
                                                                value={
                                                                  field.optionsSource ||
                                                                  "static"
                                                                }
                                                                onChange={(e) =>
                                                                  updateAddButtonFormField(
                                                                    fieldIndex,
                                                                    {
                                                                      optionsSource: e
                                                                        .target
                                                                        .value as TableActionOptionsSource,
                                                                    },
                                                                  )
                                                                }
                                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              >
                                                                {ACTION_OPTIONS_SOURCES.map(
                                                                  (source) => (
                                                                    <option
                                                                      key={source.value}
                                                                      value={source.value}
                                                                    >
                                                                      {source.label}
                                                                    </option>
                                                                  ),
                                                                )}
                                                              </Select>
                                                            </label>
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Source schema
                                                              </span>
                                                              <Select
                                                                value={
                                                                  field.sourceSchemaName ||
                                                                  ""
                                                                }
                                                                onChange={(e) =>
                                                                  updateAddButtonFormField(
                                                                    fieldIndex,
                                                                    {
                                                                      sourceSchemaName:
                                                                        e.target.value,
                                                                      sourceValueField:
                                                                        "_id",
                                                                      sourceLabelField: "",
                                                                    },
                                                                  )
                                                                }
                                                                disabled={
                                                                  field.optionsSource !==
                                                                  "schema"
                                                                }
                                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus disabled:bg-ui-surface-subtle"
                                                              >
                                                                <option value="">
                                                                  Source schema...
                                                                </option>
                                                                {containers.map(
                                                                  (container) => (
                                                                    <option
                                                                      key={
                                                                        container.schemaName
                                                                      }
                                                                      value={
                                                                        container.schemaName
                                                                      }
                                                                    >
                                                                      {container.schemaName}
                                                                    </option>
                                                                  ),
                                                                )}
                                                              </Select>
                                                            </label>
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Value field
                                                              </span>
                                                              <Select
                                                                value={
                                                                  field.sourceValueField ||
                                                                  "_id"
                                                                }
                                                                onChange={(e) =>
                                                                  updateAddButtonFormField(
                                                                    fieldIndex,
                                                                    {
                                                                      sourceValueField:
                                                                        e.target.value,
                                                                    },
                                                                  )
                                                                }
                                                                disabled={
                                                                  field.optionsSource !==
                                                                  "schema" ||
                                                                  !field.sourceSchemaName
                                                                }
                                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus disabled:bg-ui-surface-subtle"
                                                              >
                                                                <option value="_id">
                                                                  _id
                                                                </option>
                                                                {(
                                                                  containers.find(
                                                                    (container) =>
                                                                      container.schemaName ===
                                                                      field.sourceSchemaName,
                                                                  )?.fields || []
                                                                ).map((sourceField) => (
                                                                  <option
                                                                    key={sourceField.name}
                                                                    value={sourceField.name}
                                                                  >
                                                                    {sourceField.name}
                                                                  </option>
                                                                ))}
                                                              </Select>
                                                            </label>
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Label field
                                                              </span>
                                                              <Select
                                                                value={
                                                                  field.sourceLabelField ||
                                                                  ""
                                                                }
                                                                onChange={(e) =>
                                                                  updateAddButtonFormField(
                                                                    fieldIndex,
                                                                    {
                                                                      sourceLabelField:
                                                                        e.target.value,
                                                                    },
                                                                  )
                                                                }
                                                                disabled={
                                                                  field.optionsSource !==
                                                                  "schema" ||
                                                                  !field.sourceSchemaName
                                                                }
                                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus disabled:bg-ui-surface-subtle"
                                                              >
                                                                <option value="">
                                                                  Label field...
                                                                </option>
                                                                <option value="_id">
                                                                  _id
                                                                </option>
                                                                {(
                                                                  containers.find(
                                                                    (container) =>
                                                                      container.schemaName ===
                                                                      field.sourceSchemaName,
                                                                  )?.fields || []
                                                                ).map((sourceField) => (
                                                                  <option
                                                                    key={sourceField.name}
                                                                    value={sourceField.name}
                                                                  >
                                                                    {sourceField.name}
                                                                  </option>
                                                                ))}
                                                              </Select>
                                                            </label>
                                                          </div>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Option filter condition
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={
                                                                field.sourceFilterCondition ||
                                                                ""
                                                              }
                                                              onChange={(e) =>
                                                                updateAddButtonFormField(
                                                                  fieldIndex,
                                                                  {
                                                                    sourceFilterCondition:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="option filter condition"
                                                            />
                                                          </label>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Request filters
                                                            </span>
                                                            <Textarea
                                                              defaultValue={formatSourceRequestFilters(
                                                                field.sourceRequestFilters,
                                                              )}
                                                              onChange={(e) => {
                                                                const raw =
                                                                  e.target.value;
                                                                const parsed =
                                                                  parseSourceRequestFiltersInput(
                                                                    raw,
                                                                    field,
                                                                  );
                                                                if (
                                                                  !raw.trim() ||
                                                                  parsed
                                                                ) {
                                                                  updateAddButtonFormField(
                                                                    fieldIndex,
                                                                    {
                                                                      sourceRequestFilters:
                                                                        parsed,
                                                                    },
                                                                  );
                                                                }
                                                              }}
                                                              onBlur={(e) =>
                                                                updateAddButtonFormField(
                                                                  fieldIndex,
                                                                  {
                                                                    sourceRequestFilters:
                                                                      parseSourceRequestFiltersInput(
                                                                        e.target.value,
                                                                        field,
                                                                      ),
                                                                  },
                                                                )
                                                              }
                                                              className="min-h-[72px] w-full px-3 py-2 text-sm font-mono border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder={
                                                                '{{product.item._id}}=item._id or {"active": true}'
                                                              }
                                                            />
                                                          </label>
                                                          <SelectInput
                                                            label="Invalidate keys"
                                                            options={(
                                                              currentAddButton.formFields ||
                                                              []
                                                            )
                                                              .filter(
                                                                (
                                                                  candidate,
                                                                  candidateIndex,
                                                                ) =>
                                                                  candidateIndex !==
                                                                  fieldIndex &&
                                                                  candidate.formKey.trim(),
                                                              )
                                                              .map((candidate) => ({
                                                                value: candidate.formKey,
                                                                label:
                                                                  candidate.label ||
                                                                  candidate.formKey,
                                                              }))}
                                                            value={(
                                                              field.invalidateKeys || []
                                                            ).map((key) => {
                                                              const candidate = (
                                                                currentAddButton.formFields ||
                                                                []
                                                              ).find(
                                                                (formField) =>
                                                                  formField.formKey === key,
                                                              );
                                                              return {
                                                                value: key,
                                                                label:
                                                                  candidate?.label || key,
                                                              };
                                                            })}
                                                            onChange={(selectedOptions) => {
                                                              const selected =
                                                                Array.isArray(
                                                                  selectedOptions,
                                                                )
                                                                  ? selectedOptions
                                                                  : [];
                                                              updateAddButtonFormField(
                                                                fieldIndex,
                                                                {
                                                                  invalidateKeys:
                                                                    selected.map(
                                                                      (
                                                                        option: OptionType,
                                                                      ) =>
                                                                        String(
                                                                          option.value,
                                                                        ),
                                                                    ),
                                                                },
                                                              );
                                                            }}
                                                            isMultiple
                                                            isAutoFill={false}
                                                            placeholder="Select fields to clear"
                                                          />
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Static options JSON
                                                            </span>
                                                            <Textarea
                                                              value={
                                                                field.staticOptionsJson ||
                                                                "[]"
                                                              }
                                                              onChange={(e) =>
                                                                updateAddButtonFormField(
                                                                  fieldIndex,
                                                                  {
                                                                    staticOptionsJson:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="min-h-20 w-full px-3 py-2 text-sm font-mono border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder='[{"value":"active","label":"Active"}]'
                                                            />
                                                          </label>
                                                        </div>
                                                      )}
                                                    </div>
                                                  )}
                                                </FieldEditorTabs>
                                              </div>
                                            ),
                                            layout: (
                                              <>
                                                <div>
                                                  <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                    Form button
                                                  </span>
                                                  <Input aria-label="Form button"
                                                    type="text"
                                                    value={
                                                      (
                                                        tableConfig.addButton ||
                                                        buildDefaultCreateAction(
                                                          selectedFields,
                                                        )
                                                      ).buttonName || ""
                                                    }
                                                    onChange={(e) =>
                                                      updateTableAddButton({
                                                        buttonName: e.target.value,
                                                      })
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                  /></label>
                                                </div>
                                                <ActionFormLayoutEditor
                                                  action={currentAddButton}
                                                  onChange={(formLayout) =>
                                                    updateTableAddButton({ formLayout })
                                                  }
                                                />
                                              </>
                                            ),
                                            defaultValues: (
                                              <ActionConstantValuesEditor
                                                values={currentAddButton.constantValues || {}}
                                                onChange={(constantValues) =>
                                                  updateTableAddButton({ constantValues })
                                                }
                                              />
                                            )
                                          }}
                                          conditionsContent={
                                            <ActionConditionsEditor
                                              action={currentAddButton}
                                              onChange={updateTableAddButton}
                                            />
                                          }
                                        />
                                      </div>
                                    ),
                                  },
                                  ...(tableConfig.actions || []).map((action, actionIndex) => {
                                    const actionCollapseId =
                                      action.id || action.key || `action-index-${actionIndex}`;
                                    return {
                                      value: `row-${actionCollapseId}`,
                                      label: action.label || action.kind,
                                      render: (isSelected: boolean) => (
                                        <div
                                          key={actionCollapseId}
                                          role="group"
                                          aria-label={`Action ${actionIndex + 1}: ${action.label || action.kind}`}
                                          className="border border-ui-border rounded-xl bg-white overflow-hidden"
                                        >
                                          <div className="flex items-center gap-2 px-3 py-2 bg-ui-surface-subtle/80">

                                            <span
                                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ui-surface-subtle text-[11px] font-semibold text-ui-muted"
                                              title={`Order ${actionIndex + 1} (auto)`}
                                            >
                                              {actionIndex + 1}
                                            </span>
                                            <Select
                                              value={action.kind}
                                              onChange={(e) => {
                                                const kind = e.target
                                                  .value as TableActionConfig["kind"];
                                                updateTableAction(actionIndex, {
                                                  kind,
                                                  label:
                                                    kind === "create"
                                                      ? "Add"
                                                      : kind === "edit"
                                                        ? "Edit"
                                                        : kind === "delete"
                                                          ? "Delete"
                                                          : action.label ||
                                                          "Action",
                                                  buttonName:
                                                    kind === "create"
                                                      ? "Create"
                                                      : action.buttonName,
                                                  icon:
                                                    kind === "create"
                                                      ? "FiPlus"
                                                      : kind === "edit"
                                                        ? "FiEdit"
                                                        : kind === "delete"
                                                          ? "HiOutlineTrash"
                                                          : action.icon ||
                                                          "MdTouchApp",
                                                  modalType:
                                                    kind === "create" ||
                                                      kind === "edit"
                                                      ? "form"
                                                      : kind === "delete"
                                                        ? "confirm"
                                                        : action.modalType ||
                                                        "none",
                                                  formFields:
                                                    (kind === "create" ||
                                                      kind === "edit") &&
                                                      action.formFields ===
                                                      undefined
                                                      ? buildActionFormFieldsFromFields(
                                                        selectedFields,
                                                      )
                                                      : action.formFields,
                                                });
                                              }}
                                              className="w-[130px] shrink-0 px-2 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            >
                                              {TABLE_ROW_ACTION_KIND_OPTIONS.map(
                                                (kind) => (
                                                  <option
                                                    key={kind.value}
                                                    value={kind.value}
                                                  >
                                                    {kind.label}
                                                  </option>
                                                ),
                                              )}
                                            </Select>
                                            <Input
                                              type="text"
                                              aria-label="Action label"
                                              value={action.label || ""}
                                              onChange={(e) =>
                                                updateTableAction(actionIndex, {
                                                  label: e.target.value,
                                                })
                                              }
                                              className="flex-1 min-w-0 px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                              placeholder="Action label"
                                            />
                                            <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                              <Input
                                                type="checkbox"
                                                checked={action.enabled !== false}
                                                onChange={(e) =>
                                                  updateTableAction(actionIndex, {
                                                    enabled: e.target.checked,
                                                  })
                                                }
                                              />
                                              On
                                            </label>
                                            <div className="flex items-center gap-1">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  moveTableAction(actionIndex, -1)
                                                }
                                                disabled={actionIndex === 0}
                                                className="px-2 h-9 text-ui-muted bg-ui-surface-subtle hover:bg-ui-surface-subtle rounded-lg disabled:cursor-not-allowed disabled:opacity-40"
                                                aria-label="Move action up"
                                                title="Move action up"
                                              >
                                                <FiChevronUp size={15} />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  moveTableAction(actionIndex, 1)
                                                }
                                                disabled={
                                                  actionIndex ===
                                                  (tableConfig.actions || [])
                                                    .length -
                                                  1
                                                }
                                                className="px-2 h-9 text-ui-muted bg-ui-surface-subtle hover:bg-ui-surface-subtle rounded-lg disabled:cursor-not-allowed disabled:opacity-40"
                                                aria-label="Move action down"
                                                title="Move action down"
                                              >
                                                <FiChevronDown size={15} />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeTableAction(actionIndex)
                                                }
                                                className="px-2 h-9 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
                                                aria-label="Remove action"
                                                title="Remove action"
                                              >
                                                <FiTrash2 size={14} />
                                              </button>
                                            </div>
                                          </div>
                                          <ActionSettingsTabs
                                            expanded={isSelected}
                                            id={`${tableActionSettingsId}-${actionIndex}`}
                                            label={`${action.label || action.kind} settings`}
                                            className="p-4 border-t border-ui-border"
                                            actionContent={
                                              <>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                  <div>
                                                    <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                      Modal
                                                    </span>
                                                    <Select
                                                      value={
                                                        action.modalType || "none"
                                                      }
                                                      onChange={(e) =>
                                                        updateTableAction(
                                                          actionIndex,
                                                          {
                                                            modalType: e.target
                                                              .value as TableActionModalType,
                                                          },
                                                        )
                                                      }
                                                      className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                    >
                                                      {ACTION_MODAL_TYPES.map(
                                                        (modal) => (
                                                          <option
                                                            key={modal.value}
                                                            value={modal.value}
                                                          >
                                                            {modal.label}
                                                          </option>
                                                        ),
                                                      )}
                                                    </Select></label>
                                                  </div>
                                                  <div className="flex items-center text-[11px] text-ui-muted self-end pb-2">
                                                    Order is set by the position
                                                    of this card in the list.
                                                  </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                                  <div>
                                                    <span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                      Icon
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ui-border bg-ui-surface-subtle text-ui-foreground">
                                                        {React.createElement(
                                                          getIconByName(
                                                            action.icon || "MdTouchApp",
                                                          ),
                                                          { size: 16 },
                                                        )}
                                                      </div>
                                                      <Select
                                                        value={
                                                          action.icon || "MdTouchApp"
                                                        }
                                                        onChange={(e) =>
                                                          updateTableAction(actionIndex, {
                                                            icon: e.target.value,
                                                          })
                                                        }
                                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                      >
                                                        {ACTION_ICON_OPTIONS.map(
                                                          (icon) => (
                                                            <option
                                                              key={icon.value}
                                                              value={icon.value}
                                                            >
                                                              {icon.label}
                                                            </option>
                                                          ),
                                                        )}
                                                      </Select>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="space-y-3">
                                                  <Select
                                                    value={
                                                      action.submit?.workflowSchema &&
                                                        action.submit?.workflowName
                                                        ? `${action.submit.workflowSchema}::${action.submit.workflowName}`
                                                        : ""
                                                    }
                                                    onChange={(e) => {
                                                      const [
                                                        workflowSchema,
                                                        workflowName,
                                                      ] = e.target.value.split("::");
                                                      updateTableAction(actionIndex, {
                                                        submit:
                                                          workflowSchema && workflowName
                                                            ? {
                                                              workflowSchema,
                                                              workflowName,
                                                            }
                                                            : undefined,
                                                      });
                                                    }}
                                                    className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                  >
                                                    <option value="">
                                                      Regular dynamic{" "}
                                                      {action.kind === "edit"
                                                        ? "edit"
                                                        : "action"}
                                                    </option>
                                                    {projectWorkflowOptions.map(
                                                      ({ schemaName, workflow }) => (
                                                        <option
                                                          key={`${schemaName}::${workflow.name}`}
                                                          value={`${schemaName}::${workflow.name}`}
                                                        >
                                                          {schemaName} / {workflow.name}
                                                        </option>
                                                      ),
                                                    )}
                                                  </Select>
                                                  <Input
                                                    type="text"
                                                    value={action.confirmText || ""}
                                                    onChange={(e) =>
                                                      updateTableAction(actionIndex, {
                                                        confirmText: e.target.value,
                                                      })
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                    placeholder="Confirm text"
                                                  />
                                                  <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                    <Input
                                                      type="checkbox"
                                                      checked={!!action.isButton}
                                                      onChange={(e) =>
                                                        updateTableAction(actionIndex, {
                                                          isButton: e.target.checked,
                                                        })
                                                      }
                                                    />
                                                    Render as text button
                                                  </label>
                                                </div>
                                              </>
                                            }
                                            formContent={{
                                              fields: (
                                                <div className="space-y-3 rounded-lg border border-ui-border bg-ui-surface-subtle p-3">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-ui-foreground">
                                                      Form Fields
                                                    </span>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        addActionFormField(actionIndex)
                                                      }
                                                      className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                                                    >
                                                      + Add field
                                                    </button>
                                                  </div>
                                                  <FieldEditorTabs
                                                    fields={action.formFields || []}
                                                    label="Action form fields"
                                                    activeIndex={activeActionFieldIndexes[actionCollapseId] ?? 0}
                                                    onActiveIndexChange={(index) =>
                                                      setActiveActionFieldIndexes((current) => ({
                                                        ...current,
                                                        [actionCollapseId]: index,
                                                      }))
                                                    }
                                                  >
                                                    {(field, fieldIndex) => (
                                                      <div
                                                        key={fieldIndex}
                                                        className="space-y-3 rounded-lg border border-ui-border bg-white p-3"
                                                      >
                                                        <div className="grid grid-cols-[1fr_160px_auto] gap-2">
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Form key
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={field.formKey}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    formKey:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="form key"
                                                            />
                                                          </label>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Input type
                                                            </span>
                                                            <Select
                                                              value={field.type}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    type: e.target
                                                                      .value as TableActionInputType,
                                                                    formKeyType:
                                                                      formKeyTypeForActionInput(
                                                                        e.target
                                                                          .value as TableActionInputType,
                                                                        field.isMultiple,
                                                                      ),
                                                                    isNumberButtonsActive:
                                                                      isActionNumberInput(
                                                                        e.target.value,
                                                                      )
                                                                        ? field.isNumberButtonsActive
                                                                        : false,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                            >
                                                              {ACTION_INPUT_TYPES.map(
                                                                (inputType) => (
                                                                  <option
                                                                    key={inputType.value}
                                                                    value={
                                                                      inputType.value
                                                                    }
                                                                  >
                                                                    {inputType.label}
                                                                  </option>
                                                                ),
                                                              )}
                                                            </Select>
                                                          </label>
                                                          <div className="flex items-stretch gap-1">
                                                            <button
                                                              type="button"
                                                              onClick={() =>
                                                                moveActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  -1,
                                                                )
                                                              }
                                                              disabled={fieldIndex === 0}
                                                              className="px-2 text-ui-muted bg-ui-surface-subtle hover:bg-ui-surface-subtle rounded-lg disabled:cursor-not-allowed disabled:opacity-40"
                                                              aria-label="Move field up"
                                                              title="Move field up"
                                                            >
                                                              <FiChevronUp size={15} />
                                                            </button>
                                                            <button
                                                              type="button"
                                                              onClick={() =>
                                                                moveActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  1,
                                                                )
                                                              }
                                                              disabled={
                                                                fieldIndex ===
                                                                (action.formFields
                                                                  ?.length || 0) -
                                                                1
                                                              }
                                                              className="px-2 text-ui-muted bg-ui-surface-subtle hover:bg-ui-surface-subtle rounded-lg disabled:cursor-not-allowed disabled:opacity-40"
                                                              aria-label="Move field down"
                                                              title="Move field down"
                                                            >
                                                              <FiChevronDown size={15} />
                                                            </button>
                                                            <button
                                                              type="button"
                                                              onClick={() =>
                                                                removeActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                )
                                                              }
                                                              className="px-2 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
                                                              aria-label="Remove field"
                                                              title="Remove field"
                                                            >
                                                              <FiTrash2 size={14} />
                                                            </button>
                                                          </div>
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Label
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={field.label || ""}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    label: e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="label"
                                                            />
                                                          </label>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Placeholder
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={
                                                                field.placeholder || ""
                                                              }
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    placeholder:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="placeholder"
                                                            />
                                                          </label>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Disabled condition
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={
                                                                field.disabledCondition ||
                                                                ""
                                                              }
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    disabledCondition:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="disabled condition"
                                                            />
                                                          </label>
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Required condition
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={
                                                                field.requiredCondition ||
                                                                ""
                                                              }
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    requiredCondition:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="required condition"
                                                            />
                                                          </label>
                                                        </div>
                                                        <div className="grid grid-cols-[auto_auto_auto_1fr] gap-3">
                                                          <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                            <Input
                                                              type="checkbox"
                                                              checked={!!field.required}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    required:
                                                                      e.target.checked,
                                                                  },
                                                                )
                                                              }
                                                            />
                                                            Required
                                                          </label>
                                                          <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                            <Input
                                                              type="checkbox"
                                                              checked={!!field.isDisabled}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    isDisabled:
                                                                      e.target.checked,
                                                                  },
                                                                )
                                                              }
                                                            />
                                                            Disabled
                                                          </label>
                                                          <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                            <Input
                                                              type="checkbox"
                                                              checked={!!field.isMultiple}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    isMultiple:
                                                                      e.target.checked,
                                                                    formKeyType:
                                                                      formKeyTypeForActionInput(
                                                                        field.type,
                                                                        e.target.checked,
                                                                      ),
                                                                  },
                                                                )
                                                              }
                                                            />
                                                            Multiple
                                                          </label>
                                                          {isActionNumberInput(
                                                            field.type,
                                                          ) && (
                                                              <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                                                <Input
                                                                  type="checkbox"
                                                                  checked={
                                                                    !!field.isNumberButtonsActive
                                                                  }
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        isNumberButtonsActive:
                                                                          e.target.checked,
                                                                      },
                                                                    )
                                                                  }
                                                                />
                                                                Number buttons
                                                              </label>
                                                            )}
                                                          <label className="space-y-1">
                                                            <span className="text-xs font-medium text-ui-muted">
                                                              Default value
                                                            </span>
                                                            <Input
                                                              type="text"
                                                              value={String(
                                                                field.defaultValue ?? "",
                                                              )}
                                                              onChange={(e) =>
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    defaultValue:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }
                                                              className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                              placeholder="default value"
                                                            />
                                                          </label>
                                                        </div>

                                                        {isActionNumberInput(
                                                          field.type,
                                                        ) && (
                                                            <div className="grid grid-cols-2 gap-2">
                                                              <label className="space-y-1">
                                                                <span className="text-xs font-medium text-ui-muted">
                                                                  Min value
                                                                </span>
                                                                <Input
                                                                  type="number"
                                                                  value={field.min ?? ""}
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        min: e.target.value
                                                                          ? Number(
                                                                            e.target
                                                                              .value,
                                                                          )
                                                                          : undefined,
                                                                      },
                                                                    )
                                                                  }
                                                                  className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                                  placeholder="min"
                                                                />
                                                              </label>
                                                              <label className="space-y-1">
                                                                <span className="text-xs font-medium text-ui-muted">
                                                                  Max value
                                                                </span>
                                                                <Input
                                                                  type="number"
                                                                  value={field.max ?? ""}
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        max: e.target.value
                                                                          ? Number(
                                                                            e.target
                                                                              .value,
                                                                          )
                                                                          : undefined,
                                                                      },
                                                                    )
                                                                  }
                                                                  className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                                  placeholder="max"
                                                                />
                                                              </label>
                                                            </div>
                                                          )}

                                                        {field.type === "select" && (
                                                          <div className="space-y-2 rounded-lg border border-ui-border bg-ui-surface-subtle p-3">
                                                            <div className="grid grid-cols-4 gap-2">
                                                              <label className="space-y-1">
                                                                <span className="text-xs font-medium text-ui-muted">
                                                                  Options source
                                                                </span>
                                                                <Select
                                                                  value={
                                                                    field.optionsSource ||
                                                                    "static"
                                                                  }
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        optionsSource: e
                                                                          .target
                                                                          .value as TableActionOptionsSource,
                                                                      },
                                                                    )
                                                                  }
                                                                  className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                                >
                                                                  {ACTION_OPTIONS_SOURCES.map(
                                                                    (source) => (
                                                                      <option
                                                                        key={source.value}
                                                                        value={
                                                                          source.value
                                                                        }
                                                                      >
                                                                        {source.label}
                                                                      </option>
                                                                    ),
                                                                  )}
                                                                </Select>
                                                              </label>
                                                              <label className="space-y-1">
                                                                <span className="text-xs font-medium text-ui-muted">
                                                                  Source schema
                                                                </span>
                                                                <Select
                                                                  value={
                                                                    field.sourceSchemaName ||
                                                                    ""
                                                                  }
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        sourceSchemaName:
                                                                          e.target.value,
                                                                        sourceValueField:
                                                                          "_id",
                                                                        sourceLabelField:
                                                                          "",
                                                                      },
                                                                    )
                                                                  }
                                                                  disabled={
                                                                    field.optionsSource !==
                                                                    "schema"
                                                                  }
                                                                  className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus disabled:bg-ui-surface-subtle"
                                                                >
                                                                  <option value="">
                                                                    Source schema...
                                                                  </option>
                                                                  {containers.map(
                                                                    (container) => (
                                                                      <option
                                                                        key={
                                                                          container.schemaName
                                                                        }
                                                                        value={
                                                                          container.schemaName
                                                                        }
                                                                      >
                                                                        {
                                                                          container.schemaName
                                                                        }
                                                                      </option>
                                                                    ),
                                                                  )}
                                                                </Select>
                                                              </label>
                                                              <label className="space-y-1">
                                                                <span className="text-xs font-medium text-ui-muted">
                                                                  Value field
                                                                </span>
                                                                <Select
                                                                  value={
                                                                    field.sourceValueField ||
                                                                    "_id"
                                                                  }
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        sourceValueField:
                                                                          e.target.value,
                                                                      },
                                                                    )
                                                                  }
                                                                  disabled={
                                                                    field.optionsSource !==
                                                                    "schema" ||
                                                                    !field.sourceSchemaName
                                                                  }
                                                                  className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus disabled:bg-ui-surface-subtle"
                                                                >
                                                                  <option value="_id">
                                                                    _id
                                                                  </option>
                                                                  {(
                                                                    containers.find(
                                                                      (container) =>
                                                                        container.schemaName ===
                                                                        field.sourceSchemaName,
                                                                    )?.fields || []
                                                                  ).map((sourceField) => (
                                                                    <option
                                                                      key={
                                                                        sourceField.name
                                                                      }
                                                                      value={
                                                                        sourceField.name
                                                                      }
                                                                    >
                                                                      {sourceField.name}
                                                                    </option>
                                                                  ))}
                                                                </Select>
                                                              </label>
                                                              <label className="space-y-1">
                                                                <span className="text-xs font-medium text-ui-muted">
                                                                  Label field
                                                                </span>
                                                                <Select
                                                                  value={
                                                                    field.sourceLabelField ||
                                                                    ""
                                                                  }
                                                                  onChange={(e) =>
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        sourceLabelField:
                                                                          e.target.value,
                                                                      },
                                                                    )
                                                                  }
                                                                  disabled={
                                                                    field.optionsSource !==
                                                                    "schema" ||
                                                                    !field.sourceSchemaName
                                                                  }
                                                                  className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus disabled:bg-ui-surface-subtle"
                                                                >
                                                                  <option value="">
                                                                    Label field...
                                                                  </option>
                                                                  <option value="_id">
                                                                    _id
                                                                  </option>
                                                                  {(
                                                                    containers.find(
                                                                      (container) =>
                                                                        container.schemaName ===
                                                                        field.sourceSchemaName,
                                                                    )?.fields || []
                                                                  ).map((sourceField) => (
                                                                    <option
                                                                      key={
                                                                        sourceField.name
                                                                      }
                                                                      value={
                                                                        sourceField.name
                                                                      }
                                                                    >
                                                                      {sourceField.name}
                                                                    </option>
                                                                  ))}
                                                                </Select>
                                                              </label>
                                                            </div>
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Option filter condition
                                                              </span>
                                                              <Input
                                                                type="text"
                                                                value={
                                                                  field.sourceFilterCondition ||
                                                                  ""
                                                                }
                                                                onChange={(e) =>
                                                                  updateActionFormField(
                                                                    actionIndex,
                                                                    fieldIndex,
                                                                    {
                                                                      sourceFilterCondition:
                                                                        e.target.value,
                                                                    },
                                                                  )
                                                                }
                                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                                placeholder="option filter condition"
                                                              />
                                                            </label>
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Request filters
                                                              </span>
                                                              <Textarea
                                                                defaultValue={formatSourceRequestFilters(
                                                                  field.sourceRequestFilters,
                                                                )}
                                                                onChange={(e) => {
                                                                  const raw =
                                                                    e.target.value;
                                                                  const parsed =
                                                                    parseSourceRequestFiltersInput(
                                                                      raw,
                                                                      field,
                                                                    );
                                                                  if (
                                                                    !raw.trim() ||
                                                                    parsed
                                                                  ) {
                                                                    updateActionFormField(
                                                                      actionIndex,
                                                                      fieldIndex,
                                                                      {
                                                                        sourceRequestFilters:
                                                                          parsed,
                                                                      },
                                                                    );
                                                                  }
                                                                }}
                                                                onBlur={(e) =>
                                                                  updateActionFormField(
                                                                    actionIndex,
                                                                    fieldIndex,
                                                                    {
                                                                      sourceRequestFilters:
                                                                        parseSourceRequestFiltersInput(
                                                                          e.target.value,
                                                                          field,
                                                                        ),
                                                                    },
                                                                  )
                                                                }
                                                                className="min-h-[72px] w-full px-3 py-2 text-sm font-mono border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                                placeholder={
                                                                  '{{product.item._id}}=item._id or {"active": true}'
                                                                }
                                                              />
                                                            </label>
                                                            <SelectInput
                                                              label="Invalidate keys"
                                                              options={(
                                                                action.formFields || []
                                                              )
                                                                .filter(
                                                                  (
                                                                    candidate,
                                                                    candidateIndex,
                                                                  ) =>
                                                                    candidateIndex !==
                                                                    fieldIndex &&
                                                                    candidate.formKey.trim(),
                                                                )
                                                                .map((candidate) => ({
                                                                  value:
                                                                    candidate.formKey,
                                                                  label:
                                                                    candidate.label ||
                                                                    candidate.formKey,
                                                                }))}
                                                              value={(
                                                                field.invalidateKeys || []
                                                              ).map((key) => {
                                                                const candidate = (
                                                                  action.formFields || []
                                                                ).find(
                                                                  (formField) =>
                                                                    formField.formKey ===
                                                                    key,
                                                                );
                                                                return {
                                                                  value: key,
                                                                  label:
                                                                    candidate?.label ||
                                                                    key,
                                                                };
                                                              })}
                                                              onChange={(
                                                                selectedOptions,
                                                              ) => {
                                                                const selected =
                                                                  Array.isArray(
                                                                    selectedOptions,
                                                                  )
                                                                    ? selectedOptions
                                                                    : [];
                                                                updateActionFormField(
                                                                  actionIndex,
                                                                  fieldIndex,
                                                                  {
                                                                    invalidateKeys:
                                                                      selected.map(
                                                                        (
                                                                          option: OptionType,
                                                                        ) =>
                                                                          String(
                                                                            option.value,
                                                                          ),
                                                                      ),
                                                                  },
                                                                );
                                                              }}
                                                              isMultiple
                                                              isAutoFill={false}
                                                              placeholder="Select fields to clear"
                                                            />
                                                            <label className="space-y-1">
                                                              <span className="text-xs font-medium text-ui-muted">
                                                                Static options JSON
                                                              </span>
                                                              <Textarea
                                                                value={
                                                                  field.staticOptionsJson ||
                                                                  "[]"
                                                                }
                                                                onChange={(e) =>
                                                                  updateActionFormField(
                                                                    actionIndex,
                                                                    fieldIndex,
                                                                    {
                                                                      staticOptionsJson:
                                                                        e.target.value,
                                                                    },
                                                                  )
                                                                }
                                                                className="min-h-20 w-full px-3 py-2 text-sm font-mono border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                                placeholder='[{"value":"active","label":"Active"}]'
                                                              />
                                                            </label>
                                                          </div>
                                                        )}
                                                      </div>
                                                    )}
                                                  </FieldEditorTabs>
                                                </div>
                                              ),
                                              layout: (
                                                <>
                                                  <div>
                                                    <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                      Form button
                                                    </span>
                                                    <Input aria-label="Form button"
                                                      type="text"
                                                      value={action.buttonName || ""}
                                                      onChange={(e) =>
                                                        updateTableAction(
                                                          actionIndex,
                                                          {
                                                            buttonName:
                                                              e.target.value,
                                                          },
                                                        )
                                                      }
                                                      className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                      placeholder="Update"
                                                    /></label>
                                                  </div>
                                                  {(action.kind === "create" ||
                                                    action.kind === "edit" ||
                                                    action.modalType === "form") && (
                                                      <ActionFormLayoutEditor
                                                        action={action}
                                                        onChange={(formLayout) =>
                                                          updateTableAction(actionIndex, {
                                                            formLayout,
                                                          })
                                                        }
                                                      />
                                                    )}
                                                </>
                                              ),
                                              defaultValues: (
                                                <ActionConstantValuesEditor
                                                  values={
                                                    action.constantValues ||
                                                    parseJsonObject(
                                                      action.constantValuesJson,
                                                    ) ||
                                                    {}
                                                  }
                                                  onChange={(constantValues) =>
                                                    updateTableAction(actionIndex, {
                                                      constantValues,
                                                      constantValuesJson: undefined,
                                                    })
                                                  }
                                                />
                                              ),
                                              overrides: (
                                                <div className="space-y-2">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-ui-foreground">
                                                      Field Overrides
                                                    </span>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        addActionFieldOverride(
                                                          actionIndex,
                                                        )
                                                      }
                                                      className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                                                    >
                                                      + Add override
                                                    </button>
                                                  </div>
                                                  {(action.fieldOverrides || []).map(
                                                    (override, overrideIndex) => (
                                                      <div
                                                        key={overrideIndex}
                                                        className="grid grid-cols-[1fr_auto_1fr_auto] gap-2"
                                                      >
                                                        <Input
                                                          type="text"
                                                          value={override.field}
                                                          onChange={(e) =>
                                                            updateActionFieldOverride(
                                                              actionIndex,
                                                              overrideIndex,
                                                              { field: e.target.value },
                                                            )
                                                          }
                                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                          placeholder="field"
                                                        />
                                                        <label className="flex items-center gap-2 px-2 text-xs text-ui-foreground">
                                                          <Input
                                                            type="checkbox"
                                                            checked={!!override.required}
                                                            onChange={(e) =>
                                                              updateActionFieldOverride(
                                                                actionIndex,
                                                                overrideIndex,
                                                                {
                                                                  required:
                                                                    e.target.checked,
                                                                },
                                                              )
                                                            }
                                                          />
                                                          Required
                                                        </label>
                                                        <Input
                                                          type="text"
                                                          value={
                                                            override.disabledCondition ||
                                                            ""
                                                          }
                                                          onChange={(e) =>
                                                            updateActionFieldOverride(
                                                              actionIndex,
                                                              overrideIndex,
                                                              {
                                                                disabledCondition:
                                                                  e.target.value,
                                                              },
                                                            )
                                                          }
                                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                          placeholder="disabled condition"
                                                        />
                                                        <button
                                                          type="button"
                                                          onClick={() =>
                                                            removeActionFieldOverride(
                                                              actionIndex,
                                                              overrideIndex,
                                                            )
                                                          }
                                                          className="px-2 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
                                                        >
                                                          <FiTrash2 size={14} />
                                                        </button>
                                                      </div>
                                                    ),
                                                  )}
                                                </div>
                                              )
                                            }}
                                            conditionsContent={
                                              <ActionConditionsEditor
                                                action={action}
                                                onChange={(updates) => updateTableAction(actionIndex, updates)}
                                              />
                                            }
                                          />
                                        </div>
                                      ),
                                    };
                                  }),
                                ]}
                              />
  );
}
