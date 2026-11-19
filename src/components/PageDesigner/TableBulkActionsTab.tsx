import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { Input, Select, Textarea } from "../ui";
import type { TableActionConfig, TableActionFormFieldConfig, TableActionInputType } from "../../types/page";
import type { ContainerModel, DynamicWorkflow, Field } from "../../utils/api/container";
import { ACTION_ICON_OPTIONS, ACTION_INPUT_TYPES } from "./designerConstants";
import { actionInputTypeFromField, formKeyTypeForActionInput } from "./designerFieldDefaults";
import { formatSourceRequestFilters, parseSourceRequestFiltersInput } from "./designerCleaners";
import { ActionFormLayoutEditor } from "./ActionFormLayoutEditor";
import ActionConstantValuesEditor from "./ActionConstantValuesEditor";
import ActionSettingsTabs, { ActionConditionsEditor, TableActionTabs } from "./ActionSettingsTabs";
import FieldEditorTabs from "./FieldEditorTabs";

export interface TableBulkActionsTabProps {
  containers: ContainerModel[];
  selectedFields: Field[];
  schemaName: string;
  projectWorkflowOptions: { schemaName: string; workflow: DynamicWorkflow }[];
  tableActionSettingsId: string;
  activeBulkActionEditorId: string;
  setActiveBulkActionEditorId: (id: string) => void;
  activeBulkEditFieldIndex: number;
  setActiveBulkEditFieldIndex: (index: number) => void;
  currentBulkEditAction: TableActionConfig;
  currentBulkDeleteAction: TableActionConfig;
  updateTableBulkAction: (key: "edit" | "delete", updates: Partial<TableActionConfig>) => void;
  addBulkEditFormField: () => void;
  updateBulkEditFormField: (index: number, updates: Partial<TableActionFormFieldConfig>) => void;
  moveBulkEditFormField: (index: number, direction: -1 | 1) => void;
  removeBulkEditFormField: (index: number) => void;
}

export function TableBulkActionsTab({
  containers,
  selectedFields,
  schemaName,
  projectWorkflowOptions,
  tableActionSettingsId,
  activeBulkActionEditorId,
  setActiveBulkActionEditorId,
  activeBulkEditFieldIndex,
  setActiveBulkEditFieldIndex,
  currentBulkEditAction,
  currentBulkDeleteAction,
  updateTableBulkAction,
  addBulkEditFormField,
  updateBulkEditFormField,
  moveBulkEditFormField,
  removeBulkEditFormField,
}: TableBulkActionsTabProps) {
  return (
    <TableActionTabs
      label="Bulk actions"
      value={activeBulkActionEditorId}
      onValueChange={setActiveBulkActionEditorId}
      tabs={
        [
          {
            key: "edit" as const,
            title: "Bulk Edit",
            description:
              "Controls the selected-row edit operation and the fields users can choose.",
            action: currentBulkEditAction,
          },
          {
            key: "delete" as const,
            title: "Bulk Delete",
            description:
              "Controls the selected-row delete operation.",
            action: currentBulkDeleteAction,
          },
        ].map(({ key, title, description, action }) => ({
          value: key,
          label: title,
          render: (isSelected: boolean) => (
            <div role="group" aria-label={title} className="space-y-4 rounded-xl border border-ui-border bg-ui-surface-subtle/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2 text-left">
                  <span>
                    <span className="block text-sm font-semibold text-ui-foreground">
                      {title}
                    </span>
                    <span className="block text-xs text-ui-muted">
                      {description}
                    </span>
                  </span>
                </div>
                <label className="flex h-9 items-center gap-2 text-xs text-ui-foreground">
                  <Input
                    type="checkbox"
                    checked={action.enabled !== false}
                    onChange={(e) =>
                      updateTableBulkAction(key, {
                        enabled: e.target.checked,
                      })
                    }
                  />
                  On
                </label>
              </div>
              <ActionSettingsTabs
                expanded={isSelected}
                id={`${tableActionSettingsId}-bulk-${key}`}
                label={`${title} settings`}
                actionContent={
                  <>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <label className="space-y-1">
                        <span className="text-xs font-medium text-ui-muted">
                          Label
                        </span>
                        <Input
                          type="text"
                          value={action.label || ""}
                          onChange={(e) =>
                            updateTableBulkAction(key, {
                              label: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                        />
                      </label>
                      {key === "delete" && (<label className="space-y-1">
                        <span className="text-xs font-medium text-ui-muted">
                          Button text
                        </span>
                        <Input
                          type="text"
                          value={action.buttonName || ""}
                          onChange={(e) =>
                            updateTableBulkAction(key, {
                              buttonName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                          placeholder=""
                        />
                      </label>)}
                      <label className="space-y-1">
                        <span className="text-xs font-medium text-ui-muted">
                          Icon
                        </span>
                        <Select
                          value={
                            action.icon ||
                            (key === "edit"
                              ? "FiEdit"
                              : "HiOutlineTrash")
                          }
                          onChange={(e) =>
                            updateTableBulkAction(key, {
                              icon: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                        >
                          {ACTION_ICON_OPTIONS.map((icon) => (
                            <option
                              key={icon.value}
                              value={icon.value}
                            >
                              {icon.label}
                            </option>
                          ))}
                        </Select>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <label className="space-y-1">
                        <span className="text-xs font-medium text-ui-muted">
                          Workflow
                        </span>
                        <Select
                          value={
                            action.submit?.workflowName
                              ? `${action.submit.workflowSchema || schemaName}::${action.submit.workflowName}`
                              : ""
                          }
                          onChange={(e) => {
                            const [
                              workflowSchema,
                              workflowName,
                            ] = e.target.value.split("::");
                            updateTableBulkAction(key, {
                              submit: {
                                ...action.submit,
                                workflowSchema:
                                  workflowSchema || undefined,
                                workflowName:
                                  workflowName || undefined,
                              },
                            });
                          }}
                          className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                        >
                          <option value="">
                            Built-in bulk {key}
                          </option>
                          {projectWorkflowOptions.map(
                            ({ schemaName, workflow }) => (
                              <option
                                key={`${key}-workflow-${schemaName}::${workflow.name}`}
                                value={`${schemaName}::${workflow.name}`}
                              >
                                {schemaName} / {workflow.name}
                              </option>
                            ),
                          )}
                        </Select>
                      </label>
                      {/* Dynamic functions are paused; retain this editor for future use.
                      <label className="space-y-1">
                        <span className="text-xs font-medium text-ui-muted">
                          Function
                        </span>
                        <Select
                          value={action.submit?.functionName || ""}
                          onChange={(e) =>
                            updateTableBulkAction(key, {
                              submit: {
                                ...action.submit,
                                functionName:
                                  e.target.value || undefined,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                        >
                          <option value="">
                            No direct function
                          </option>
                          {projectFunctionOptions.map(
                            ({ schemaName, dynamicFunction }) => (
                              <option
                                key={`${key}-function-${schemaName}::${dynamicFunction.name}`}
                                value={dynamicFunction.name}
                              >
                                {schemaName} /{" "}
                                {dynamicFunction.name}
                              </option>
                            ),
                          )}
                        </Select>
                      </label>
                      */}
                    </div>
                    {key === "delete" && (
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Input
                          type="text"
                          value={action.confirmTitle || ""}
                          onChange={(e) =>
                            updateTableBulkAction("delete", {
                              confirmTitle: e.target.value,
                            })
                          }
                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                          placeholder="Confirm title"
                        />
                        <Input
                          type="text"
                          value={action.confirmText || ""}
                          onChange={(e) =>
                            updateTableBulkAction("delete", {
                              confirmText: e.target.value,
                            })
                          }
                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                          placeholder="Confirm text"
                        />
                      </div>
                    )}
                  </>
                }
                formContent={
                  key === "edit" ? {
                    fields: (
                      <div className="space-y-3 rounded-lg border border-ui-border bg-white p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-ui-foreground">
                            Bulk Edit Fields
                          </span>
                          <button
                            type="button"
                            onClick={addBulkEditFormField}
                            className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                          >
                            + Add field
                          </button>
                        </div>
                        <FieldEditorTabs
                          fields={currentBulkEditAction.formFields || []}
                          label="Bulk edit form fields"
                          activeIndex={activeBulkEditFieldIndex}
                          onActiveIndexChange={setActiveBulkEditFieldIndex}
                        >
                          {(field, fieldIndex) => (
                            <div
                              key={fieldIndex}
                              className="grid grid-cols-[1fr_150px_1fr_auto] gap-2"
                            >
                              <Select
                                aria-label="Form key" value={field.formKey}
                                onChange={(e) => {
                                  const selectedField =
                                    selectedFields.find(
                                      (candidate) =>
                                        candidate.name ===
                                        e.target.value,
                                    );
                                  const nextType =
                                    selectedField
                                      ? actionInputTypeFromField(
                                        selectedField,
                                      )
                                      : field.type;
                                  updateBulkEditFormField(
                                    fieldIndex,
                                    {
                                      formKey: e.target.value,
                                      type: nextType,
                                      formKeyType:
                                        formKeyTypeForActionInput(
                                          nextType,
                                          field.isMultiple,
                                        ),
                                      label:
                                        selectedField?.frontend
                                          ?.displayName ||
                                        e.target.value,
                                      placeholder:
                                        selectedField?.frontend
                                          ?.displayName ||
                                        e.target.value,
                                    },
                                  );
                                }}
                                className="px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
                              >
                                <option value="">Field</option>
                                {selectedFields
                                  .filter(
                                    (candidate) =>
                                      candidate.name &&
                                      !["_id", "id"].includes(
                                        candidate.name,
                                      ) &&
                                      !candidate.equation,
                                  )
                                  .map((candidate) => (
                                    <option
                                      key={candidate.name}
                                      value={candidate.name}
                                    >
                                      {candidate.frontend
                                        ?.displayName ||
                                        candidate.name}
                                    </option>
                                  ))}
                              </Select>
                              <Select
                                aria-label="Input type" value={field.type}
                                onChange={(e) =>
                                  updateBulkEditFormField(
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
                                    },
                                  )
                                }
                                className="px-3 py-2 text-sm border border-ui-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ui-focus"
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
                              <Input
                                type="text"
                                aria-label="Field label" value={field.label || ""}
                                onChange={(e) =>
                                  updateBulkEditFormField(
                                    fieldIndex,
                                    { label: e.target.value },
                                  )
                                }
                                className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                placeholder="Label"
                              />
                              <div className="flex items-stretch gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    moveBulkEditFormField(
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
                                    moveBulkEditFormField(
                                      fieldIndex,
                                      1,
                                    )
                                  }
                                  disabled={
                                    fieldIndex ===
                                    (currentBulkEditAction
                                      .formFields?.length ||
                                      0) -
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
                                    removeBulkEditFormField(
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
                              {field.type ===
                                "select" && (
                                <div className="col-span-full space-y-2 rounded-lg border border-ui-border bg-ui-surface-subtle p-3">
                                  <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                                    <label className="space-y-1">
                                      <span className="text-xs font-medium text-ui-muted">
                                        Options source
                                      </span>
                                      <Select
                                        value={
                                          field.optionsSource ||
                                          "static"
                                        }
                                        onChange={(
                                          e,
                                        ) =>
                                          updateBulkEditFormField(
                                            fieldIndex,
                                            {
                                              optionsSource:
                                                e
                                                  .target
                                                  .value as
                                                  | "static"
                                                  | "schema",
                                            },
                                          )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white"
                                      >
                                        <option value="static">
                                          Static
                                        </option>
                                        <option value="schema">
                                          Schema
                                        </option>
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
                                        disabled={
                                          field.optionsSource !==
                                          "schema"
                                        }
                                        onChange={(
                                          e,
                                        ) =>
                                          updateBulkEditFormField(
                                            fieldIndex,
                                            {
                                              sourceSchemaName:
                                                e
                                                  .target
                                                  .value,
                                              sourceValueField:
                                                "_id",
                                              sourceLabelField:
                                                "",
                                            },
                                          )
                                        }
                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg bg-white"
                                      >
                                        <option value="">
                                          Source schema...
                                        </option>
                                        {containers.map(
                                          (
                                            container,
                                          ) => (
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
                                      <Input
                                        value={
                                          field.sourceValueField ||
                                          "_id"
                                        }
                                        disabled={
                                          field.optionsSource !==
                                          "schema"
                                        }
                                        onChange={(
                                          e,
                                        ) =>
                                          updateBulkEditFormField(
                                            fieldIndex,
                                            {
                                                sourceValueField:
                                                  e
                                                    .target
                                                    .value,
                                            },
                                          )
                                        }
                                      />
                                    </label>
                                    <label className="space-y-1">
                                      <span className="text-xs font-medium text-ui-muted">
                                        Label field
                                      </span>
                                      <Input
                                        value={
                                          field.sourceLabelField ||
                                          ""
                                        }
                                        disabled={
                                          field.optionsSource !==
                                          "schema"
                                        }
                                        onChange={(
                                          e,
                                        ) =>
                                          updateBulkEditFormField(
                                            fieldIndex,
                                            {
                                              sourceLabelField:
                                                e
                                                  .target
                                                  .value,
                                            },
                                          )
                                        }
                                      />
                                    </label>
                                  </div>
                                  <label className="space-y-1">
                                    <span className="text-xs font-medium text-ui-muted">
                                      Request filters
                                    </span>
                                    <Textarea
                                      defaultValue={formatSourceRequestFilters(
                                        field.sourceRequestFilters,
                                      )}
                                      disabled={
                                        field.optionsSource !==
                                        "schema"
                                      }
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
                                          updateBulkEditFormField(
                                            fieldIndex,
                                            {
                                              sourceRequestFilters:
                                                parsed,
                                            },
                                          );
                                        }
                                      }}
                                      onBlur={(e) =>
                                        updateBulkEditFormField(
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
                                </div>
                              )}
                            </div>
                          )}
                        </FieldEditorTabs>
                      </div>
                    ),
                    layout: (
                      <>
                        <label className="space-y-1">
                          <span className="text-xs font-medium text-ui-muted">
                            Button text
                          </span>
                          <Input
                            type="text"
                            value={action.buttonName || ""}
                            onChange={(e) =>
                              updateTableBulkAction(key, {
                                buttonName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                            placeholder={key === "edit" ? "Edit" : ""}
                          />
                        </label>
                        <ActionFormLayoutEditor
                          action={currentBulkEditAction}
                          defaultAllowOverflow
                          onChange={(formLayout) =>
                            updateTableBulkAction("edit", {
                              formLayout,
                            })
                          }
                        />
                      </>
                    ),
                    defaultValues: (
                      <ActionConstantValuesEditor
                        values={
                          currentBulkEditAction.constantValues ||
                          {}
                        }
                        onChange={(constantValues) =>
                          updateTableBulkAction("edit", {
                            constantValues,
                          })
                        }
                      />
                    ),
                  } : undefined
                }
                conditionsContent={
                  <ActionConditionsEditor action={action} onChange={(updates) => updateTableBulkAction(key, updates)} />
                }
              />
            </div>
          ),
        }))
      }
    />
  );
}
