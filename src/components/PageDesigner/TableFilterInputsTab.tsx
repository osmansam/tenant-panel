import { ACTION_INPUT_TYPES, ACTION_OPTIONS_SOURCES } from "./designerConstants";
import { formatSourceRequestFilters, parseSourceRequestFiltersInput } from "./designerCleaners";
import { formKeyTypeForActionInput, isActionNumberInput } from "./designerFieldDefaults";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select, Textarea } from "../ui";
import type { OptionType } from "../../types";
import { TableActionInputType, TableActionOptionsSource } from "../../types/page";
import SelectInput from "../panelComponents/FormElements/SelectInput";
import FieldEditorTabs from "./FieldEditorTabs";
import type { ContainerModel } from "../../utils/api/container";
import type { TableComponentConfig, TableFilterPanelInputConfig } from "../../types/page";

export interface TableFilterInputsTabProps {
  containers: ContainerModel[];
  tableConfig: TableComponentConfig;
  addFilterPanelInput: () => void;
  removeFilterPanelInput: (inputIndex: number) => void;
  updateFilterPanelInput: (inputIndex: number, updates: Partial<TableFilterPanelInputConfig>) => void;
  areDefaultFilterPanelInputsActive: () => boolean;
  setDefaultFilterPanelInputsActive: (isActive: boolean) => void;
}

export function TableFilterInputsTab({
  containers,
  tableConfig,
  addFilterPanelInput,
  removeFilterPanelInput,
  updateFilterPanelInput,
  areDefaultFilterPanelInputsActive,
  setDefaultFilterPanelInputsActive,
}: TableFilterInputsTabProps) {
  return (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                      Filter Panel Inputs
                                    </span>
                                    <p className="mt-1 text-xs text-ui-muted">
                                      Use defaults from the selected source or
                                      customize the list manually.
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-2 rounded-lg border border-ui-border bg-ui-surface-subtle px-3 py-2 text-xs font-medium text-ui-foreground">
                                      <Input
                                        type="checkbox"
                                        checked={areDefaultFilterPanelInputsActive()}
                                        onChange={(e) =>
                                          setDefaultFilterPanelInputsActive(
                                            e.target.checked,
                                          )
                                        }
                                      />
                                      Use defaults
                                    </label>
                                    <button
                                      type="button"
                                      onClick={addFilterPanelInput}
                                      className="inline-flex items-center gap-2 rounded-lg border border-ui-border bg-ui-active-subtle px-3 py-2 text-sm font-semibold text-ui-foreground hover:bg-ui-active-subtle"
                                    >
                                      <FiPlus size={14} />
                                      Add input
                                    </button>
                                  </div>
                                </div>

                                <FieldEditorTabs
                                  fields={tableConfig.filterPanel?.inputs || []}
                                  label="Filter inputs"
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
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  formKey: e.target.value,
                                                },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            placeholder="field name"
                                          />
                                        </label>
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-ui-muted">
                                            Input type
                                          </span>
                                          <Select
                                            value={field.type}
                                            onChange={(e) =>
                                              updateFilterPanelInput(
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
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeFilterPanelInput(fieldIndex)
                                          }
                                          className="px-2 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
                                        >
                                          <FiTrash2 size={14} />
                                        </button>
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
                                              updateFilterPanelInput(
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
                                            value={field.placeholder || ""}
                                            onChange={(e) =>
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  placeholder: e.target.value,
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
                                              updateFilterPanelInput(
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
                                              updateFilterPanelInput(
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

                                      <div className="grid grid-cols-[auto_auto_auto_auto_1fr] gap-3">
                                        <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                          <Input
                                            type="checkbox"
                                            checked={!!field.required}
                                            onChange={(e) =>
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  required: e.target.checked,
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
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  isDisabled: e.target.checked,
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
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  isMultiple: e.target.checked,
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
                                        {isActionNumberInput(field.type) && (
                                          <label className="flex items-center gap-2 text-xs text-ui-foreground">
                                            <Input
                                              type="checkbox"
                                              checked={
                                                !!field.isNumberButtonsActive
                                              }
                                              onChange={(e) =>
                                                updateFilterPanelInput(
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
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  defaultValue: e.target.value,
                                                },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            placeholder="default value"
                                          />
                                        </label>
                                      </div>

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
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      optionsSource: e.target
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
                                                  field.sourceSchemaName || ""
                                                }
                                                onChange={(e) =>
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      sourceSchemaName:
                                                        e.target.value,
                                                      sourceValueField: "_id",
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
                                                {containers.map((container) => (
                                                  <option
                                                    key={container.schemaName}
                                                    value={container.schemaName}
                                                  >
                                                    {container.schemaName}
                                                  </option>
                                                ))}
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
                                                  updateFilterPanelInput(
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
                                                <option value="_id">_id</option>
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
                                                  field.sourceLabelField || ""
                                                }
                                                onChange={(e) =>
                                                  updateFilterPanelInput(
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
                                                <option value="_id">_id</option>
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
                                                updateFilterPanelInput(
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
                                                const raw = e.target.value;
                                                const parsed =
                                                  parseSourceRequestFiltersInput(
                                                    raw,
                                                    field,
                                                  );
                                                if (!raw.trim() || parsed) {
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      sourceRequestFilters:
                                                        parsed,
                                                    },
                                                  );
                                                }
                                              }}
                                              onBlur={(e) =>
                                                updateFilterPanelInput(
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
                                              tableConfig.filterPanel?.inputs ||
                                              []
                                            )
                                              .filter(
                                                (candidate, candidateIndex) =>
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
                                                tableConfig.filterPanel
                                                  ?.inputs || []
                                              ).find(
                                                (input) =>
                                                  input.formKey === key,
                                              );
                                              return {
                                                value: key,
                                                label: candidate?.label || key,
                                              };
                                            })}
                                            onChange={(selectedOptions) => {
                                              const selected = Array.isArray(
                                                selectedOptions,
                                              )
                                                ? selectedOptions
                                                : [];
                                              updateFilterPanelInput(
                                                fieldIndex,
                                                {
                                                  invalidateKeys: selected.map(
                                                    (option: OptionType) =>
                                                      String(option.value),
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
                                                field.staticOptionsJson || "[]"
                                              }
                                              onChange={(e) =>
                                                updateFilterPanelInput(
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

                                      <div className="grid grid-cols-5 gap-2">
                                        <Input
                                          type="number"
                                          value={field.min ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              min: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                          placeholder="min"
                                        />
                                        <Input
                                          type="number"
                                          value={field.max ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              max: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                          placeholder="max"
                                        />
                                        <Input
                                          type="number"
                                          value={field.minLength ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              minLength: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                          placeholder="min length"
                                        />
                                        <Input
                                          type="number"
                                          value={field.maxLength ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              maxLength: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                          placeholder="max length"
                                        />
                                        <Input
                                          type="text"
                                          value={field.pattern || ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              pattern: e.target.value,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                          placeholder="pattern"
                                        />
                                      </div>
                                      <Input
                                        type="text"
                                        value={field.validationMessage || ""}
                                        onChange={(e) =>
                                          updateFilterPanelInput(fieldIndex, {
                                            validationMessage: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                        placeholder="validation message"
                                      />
                                    </div>
                                  )}
                                </FieldEditorTabs>
                              </div>
  );
}
