import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { Input, Select, Textarea } from "../ui";
import type { OptionType } from "../../types";
import type { TableActionConfig, TableActionFormFieldConfig, TableActionInputType, TableActionOptionsSource } from "../../types/page";
import type { ContainerModel } from "../../utils/api/container";
import { ACTION_INPUT_TYPES, ACTION_OPTIONS_SOURCES } from "./designerConstants";
import { formatSourceRequestFilters, parseSourceRequestFiltersInput } from "./designerCleaners";
import { formKeyTypeForActionInput, isActionNumberInput } from "./designerFieldDefaults";
import SelectInput from "../panelComponents/FormElements/SelectInput";
import FieldEditorTabs from "./FieldEditorTabs";

export interface TableAddButtonFieldsProps {
  containers: ContainerModel[];
  currentAddButton: TableActionConfig;
  activeAddButtonFieldIndex: number;
  setActiveAddButtonFieldIndex: (index: number) => void;
  addAddButtonFormField: () => void;
  removeAddButtonFormField: (index: number) => void;
  moveAddButtonFormField: (index: number, direction: -1 | 1) => void;
  updateAddButtonFormField: (index: number, updates: Partial<TableActionFormFieldConfig>) => void;
}

export function TableAddButtonFields({
  containers,
  currentAddButton,
  activeAddButtonFieldIndex,
  setActiveAddButtonFieldIndex,
  addAddButtonFormField,
  removeAddButtonFormField,
  moveAddButtonFormField,
  updateAddButtonFormField,
}: TableAddButtonFieldsProps) {
  return (
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
  );
}
