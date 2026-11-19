import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select } from "../ui";
import type { TableColumnConfig, TableComponentConfig } from "../../types/page";
import { TABLE_COLUMN_TYPE_OPTIONS, TABLE_DATE_FORMAT_OPTIONS } from "../../utils/pageDesignerTableConfig";

export interface TableColumnsTabProps {
  containerOptions: { value: string; label: string }[];
  tableConfig: TableComponentConfig;
  buildDefaultLookup: (fieldName: string) => { schemaName: string; matchField: string; labelField: string };
  getLookupFieldOptions: (lookupSchemaName?: string) => { value: string; label: string }[];
  addTableColumn: () => void;
  removeTableColumn: (fieldName: string) => void;
  updateTableColumn: (fieldName: string, updates: Partial<TableColumnConfig>) => void;
  addTableComputedLabelRule: (fieldName: string) => void;
  removeTableComputedLabelRule: (fieldName: string, ruleIndex: number) => void;
  updateTableComputedLabelRule: (fieldName: string, ruleIndex: number, updates: Partial<NonNullable<TableColumnConfig["computedLabelRules"]>[number]>) => void;
  addTableProgressBarColorRule: (fieldName: string) => void;
  removeTableProgressBarColorRule: (fieldName: string, ruleIndex: number) => void;
  updateTableProgressBar: (fieldName: string, updates: Partial<NonNullable<TableColumnConfig["progressBar"]>>) => void;
  updateTableProgressBarColorRule: (fieldName: string, ruleIndex: number, updates: Partial<NonNullable<NonNullable<TableColumnConfig["progressBar"]>["colorRules"]>[number]>) => void;
}

export function TableColumnsTab({
  containerOptions,
  tableConfig,
  buildDefaultLookup,
  getLookupFieldOptions,
  addTableColumn,
  removeTableColumn,
  updateTableColumn,
  addTableComputedLabelRule,
  removeTableComputedLabelRule,
  updateTableComputedLabelRule,
  addTableProgressBarColorRule,
  removeTableProgressBarColorRule,
  updateTableProgressBar,
  updateTableProgressBarColorRule,
}: TableColumnsTabProps) {
  return (
                              <div className="space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
                                  <div>
                                    <h5 className="text-xs font-semibold uppercase tracking-wide text-ui-foreground">
                                      Output Columns
                                    </h5>
                                    <p className="mt-0.5 text-xs text-ui-muted">
                                      Define field keys, display types, headers, and conditional visibility.
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={addTableColumn}
                                    className="inline-flex h-9 items-center gap-1.5 rounded-ui-md border border-ui-primary/25 bg-ui-primary-soft px-3.5 text-xs font-semibold text-ui-primary shadow-ui-sm hover:opacity-90 transition-opacity"
                                  >
                                    <FiPlus size={14} />
                                    Add output field
                                  </button>
                                </div>
                                {(tableConfig.columns || []).map(
                                  (column, columnIndex) => (
                                    <div
                                      key={`column-${columnIndex}`}
                                      className="rounded-xl border border-ui-border bg-ui-surface p-4 shadow-ui-sm hover:border-ui-border-hover transition-colors space-y-3"
                                    >
                                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(140px,1fr)_minmax(140px,0.9fr)_minmax(150px,1fr)_minmax(160px,0.95fr)_110px_40px] items-end">
                                        <div>
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Field
                                          </span>
                                          <Input
                                            type="text"
                                            value={column.field}
                                            onChange={(e) =>
                                              updateTableColumn(column.field, {
                                                field: e.target.value,
                                              })
                                            }
                                            className="w-full"
                                          /></label>
                                        </div>
                                        <div>
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Type
                                          </span>
                                          <Select
                                            value={column.type || "field"}
                                            onChange={(e) => {
                                              const nextType = e.target
                                                .value as TableColumnConfig["type"];
                                              updateTableColumn(column.field, {
                                                type: nextType,
                                                ...(nextType ===
                                                "lookupLabel"
                                                  ? {
                                                      lookup:
                                                        column.lookup ||
                                                        buildDefaultLookup(
                                                          column.field,
                                                        ),
                                                    }
                                                  : {}),
                                                ...(nextType ===
                                                  "progressBar" &&
                                                !column.progressBar
                                                  ? {
                                                      progressBar: {
                                                        sourceField:
                                                          column.field,
                                                        max: 8,
                                                        color: "#4d9f24",
                                                        trackColor: "#e7e5df",
                                                        height: 12,
                                                        width: 260,
                                                        showValue: true,
                                                        colorRules: [],
                                                      },
                                                    }
                                                  : {}),
                                              });
                                            }}
                                            className="w-full"
                                          >
                                            {TABLE_COLUMN_TYPE_OPTIONS.map(
                                              (option) => (
                                                <option
                                                  key={option.value}
                                                  value={option.value}
                                                >
                                                  {option.label}
                                                </option>
                                              ),
                                            )}
                                          </Select></label>
                                        </div>
                                        <div>
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Display Name
                                          </span>
                                          <Input
                                            type="text"
                                            value={column.displayName || ""}
                                            onChange={(e) =>
                                              updateTableColumn(column.field, {
                                                displayName: e.target.value,
                                              })
                                            }
                                            className="w-full"
                                            placeholder={column.field}
                                          /></label>
                                        </div>
                                        <label className="block">
                                          <span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Visibility toggle
                                          </span>
                                          <Select
                                            value={
                                              column.visibilityToggle
                                                ?.toggleId || ""
                                            }
                                            onChange={(e) =>
                                              updateTableColumn(
                                                column.field,
                                                {
                                                  visibilityToggle: e.target
                                                    .value
                                                    ? {
                                                        toggleId:
                                                          e.target.value,
                                                        when:
                                                          column
                                                            .visibilityToggle
                                                            ?.when ?? true,
                                                      }
                                                    : undefined,
                                                },
                                              )
                                            }
                                            className="w-full"
                                          >
                                            <option value="">Always visible</option>
                                            {(tableConfig.toggles || []).map(
                                              (toggle) => (
                                                <option
                                                  key={toggle.id}
                                                  value={toggle.id}
                                                >
                                                  {toggle.label || toggle.id}
                                                </option>
                                              ),
                                            )}
                                          </Select>
                                        </label>
                                        <label className="block">
                                          <span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Visible when
                                          </span>
                                          <Select
                                            value={String(
                                              column.visibilityToggle
                                                ?.when ?? true,
                                            )}
                                            disabled={
                                              !column.visibilityToggle
                                                ?.toggleId
                                            }
                                            onChange={(e) =>
                                              updateTableColumn(
                                                column.field,
                                                {
                                                  visibilityToggle: column
                                                    .visibilityToggle
                                                    ? {
                                                        ...column.visibilityToggle,
                                                        when:
                                                          e.target.value ===
                                                          "true",
                                                      }
                                                    : undefined,
                                                },
                                              )
                                            }
                                            className="w-full"
                                          >
                                            <option value="true">On</option>
                                            <option value="false">Off</option>
                                          </Select>
                                        </label>
                                        <div className="flex items-end justify-end">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTableColumn(column.field)
                                            }
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-ui-md border border-ui-danger/20 bg-ui-danger-soft text-ui-danger transition-colors hover:bg-ui-danger-subtle"
                                            title="Remove field"
                                          >
                                            <FiTrash2 size={16} />
                                          </button>
                                        </div>
                                      </div>
                                      {column.type === "date" && (
                                        <div className="rounded-lg border border-ui-border/80 bg-ui-surface-subtle/60 p-3.5">
                                          <label className="block max-w-xs space-y-1">
                                            <span className="text-[11px] font-medium text-ui-muted">
                                              Date Format
                                            </span>
                                            <Select
                                              value={column.dateFormat || "MM-DD-YYYY"}
                                              onChange={(e) =>
                                                updateTableColumn(column.field, {
                                                  dateFormat: e.target.value as TableColumnConfig["dateFormat"],
                                                })
                                              }
                                              className="w-full"
                                            >
                                              {TABLE_DATE_FORMAT_OPTIONS.map((format) => (
                                                <option key={format} value={format}>{format}</option>
                                              ))}
                                            </Select>
                                          </label>
                                        </div>
                                      )}
                                      {(column.type || "field") ===
                                        "booleanSwitch" && (
                                        <div className="grid grid-cols-1 gap-3 rounded-lg border border-ui-border/80 bg-ui-surface-subtle/60 p-3.5 md:grid-cols-2">
                                          <div className="grid grid-cols-[1fr_120px] gap-2">
                                            <label className="space-y-1">
                                              <span className="text-[11px] font-medium text-ui-muted">
                                                Boolean display toggle
                                              </span>
                                              <Select
                                                value={
                                                  column.booleanDisplayToggle
                                                    ?.toggleId || ""
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      booleanDisplayToggle: e
                                                        .target.value
                                                        ? {
                                                            toggleId:
                                                              e.target.value,
                                                            when:
                                                              column
                                                                .booleanDisplayToggle
                                                                ?.when ?? true,
                                                          }
                                                        : undefined,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                              >
                                                <option value="">
                                                  Always show switch
                                                </option>
                                                {(tableConfig.toggles || []).map(
                                                  (toggle) => (
                                                    <option
                                                      key={toggle.id}
                                                      value={toggle.id}
                                                    >
                                                      {toggle.label || toggle.id}
                                                    </option>
                                                  ),
                                                )}
                                              </Select>
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-[11px] font-medium text-ui-muted">
                                                Show switch when
                                              </span>
                                              <Select
                                                value={String(
                                                  column.booleanDisplayToggle
                                                    ?.when ?? true,
                                                )}
                                                disabled={
                                                  !column.booleanDisplayToggle
                                                    ?.toggleId
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      booleanDisplayToggle: column
                                                        .booleanDisplayToggle
                                                        ? {
                                                            ...column.booleanDisplayToggle,
                                                            when:
                                                              e.target.value ===
                                                              "true",
                                                          }
                                                        : undefined,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                              >
                                                <option value="true">On</option>
                                                <option value="false">Off</option>
                                              </Select>
                                            </label>
                                          </div>
                                          <div className="grid grid-cols-[1fr_120px] gap-2">
                                            <label className="space-y-1">
                                              <span className="text-[11px] font-medium text-ui-muted">
                                                Editable toggle
                                              </span>
                                              <Select
                                                value={
                                                  column.booleanEditToggle
                                                    ?.toggleId || ""
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      booleanEditToggle: e
                                                        .target.value
                                                        ? {
                                                            toggleId:
                                                              e.target.value,
                                                            when:
                                                              column
                                                                .booleanEditToggle
                                                                ?.when ?? true,
                                                          }
                                                        : undefined,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                              >
                                                <option value="">
                                                  Always editable
                                                </option>
                                                {(tableConfig.toggles || []).map(
                                                  (toggle) => (
                                                    <option
                                                      key={toggle.id}
                                                      value={toggle.id}
                                                    >
                                                      {toggle.label || toggle.id}
                                                    </option>
                                                  ),
                                                )}
                                              </Select>
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-[11px] font-medium text-ui-muted">
                                                Editable when
                                              </span>
                                              <Select
                                                value={String(
                                                  column.booleanEditToggle
                                                    ?.when ?? true,
                                                )}
                                                disabled={
                                                  !column.booleanEditToggle
                                                    ?.toggleId
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      booleanEditToggle: column
                                                        .booleanEditToggle
                                                        ? {
                                                            ...column.booleanEditToggle,
                                                            when:
                                                              e.target.value ===
                                                              "true",
                                                          }
                                                        : undefined,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                              >
                                                <option value="true">On</option>
                                                <option value="false">Off</option>
                                              </Select>
                                            </label>
                                          </div>
                                        </div>
                                      )}
                                      {(column.type || "field") ===
                                        "lookupLabel" && (
                                        <div className="space-y-3 rounded-lg border border-ui-border/80 bg-ui-surface-subtle/60 p-3.5">
                                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Lookup Schema
                                              </span>
                                              <Select
                                                value={
                                                  column.lookup?.schemaName ||
                                                  ""
                                                }
                                                onChange={(e) => {
                                                  const nextSchemaName =
                                                    e.target.value;
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      lookup: {
                                                        ...(column.lookup ||
                                                          buildDefaultLookup(
                                                            column.field,
                                                          )),
                                                        schemaName:
                                                          nextSchemaName,
                                                        matchField:
                                                          column.lookup
                                                            ?.matchField ||
                                                          "_id",
                                                        labelField:
                                                          column.lookup
                                                            ?.labelField || "",
                                                      },
                                                    },
                                                  );
                                                }}
                                                className="w-full"
                                              >
                                                <option value="">
                                                  Select schema
                                                </option>
                                                {containerOptions.map(
                                                  (option) => (
                                                    <option
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </option>
                                                  ),
                                                )}
                                              </Select></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Match Field
                                              </span>
                                              <Select
                                                value={
                                                  column.lookup?.matchField ||
                                                  "_id"
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      lookup: {
                                                        ...(column.lookup ||
                                                          buildDefaultLookup(
                                                            column.field,
                                                          )),
                                                        matchField:
                                                          e.target.value,
                                                      },
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                              >
                                                <option value="_id">_id</option>
                                                {getLookupFieldOptions(
                                                  column.lookup?.schemaName,
                                                ).map((option) => (
                                                  <option
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                              </Select></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Label Field
                                              </span>
                                              <Select
                                                value={
                                                  column.lookup?.labelField ||
                                                  ""
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      lookup: {
                                                        ...(column.lookup ||
                                                          buildDefaultLookup(
                                                            column.field,
                                                          )),
                                                        labelField:
                                                          e.target.value,
                                                      },
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                              >
                                                <option value="">
                                                  Select label
                                                </option>
                                                {getLookupFieldOptions(
                                                  column.lookup?.schemaName,
                                                ).map((option) => (
                                                  <option
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                              </Select></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Fallback Value
                                              </span>
                                              <Input
                                                type="text"
                                                value={
                                                  column.fallbackValue || ""
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      fallbackValue:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                placeholder="Raw value"
                                              /></label>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {(column.type || "field") ===
                                        "template" && (
                                        <div className="space-y-2 rounded-lg border border-ui-border/80 bg-ui-surface-subtle/60 p-3.5">
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted">
                                            Template
                                          </span>
                                          <Input
                                            type="text"
                                            value={column.template || ""}
                                            onChange={(event) =>
                                              updateTableColumn(column.field, {
                                                template: event.target.value,
                                              })
                                            }
                                            className="w-full"
                                            placeholder="{{name}} {{surname}}"
                                          /></label>
                                          <p className="text-xs text-ui-muted">
                                            Use {"{{fieldName}}"} placeholders to
                                            combine values from the same row.
                                          </p>
                                        </div>
                                      )}
                                      {(column.type || "field") ===
                                        "computedLabel" && (
                                        <div className="space-y-2 rounded-lg border border-ui-border/80 bg-ui-surface-subtle/60 p-3.5">
                                          <div className="grid grid-cols-[1fr_auto] gap-3">
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Fallback Value
                                              </span>
                                              <Input
                                                type="text"
                                                value={
                                                  column.fallbackValue || ""
                                                }
                                                onChange={(e) =>
                                                  updateTableColumn(
                                                    column.field,
                                                    {
                                                      fallbackValue:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                placeholder="Optional"
                                              /></label>
                                            </div>
                                            <div className="flex items-end">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  addTableComputedLabelRule(
                                                    column.field,
                                                  )
                                                }
                                                className="inline-flex h-10 items-center rounded-ui-md border border-ui-primary/25 bg-ui-surface px-3 text-xs font-semibold text-ui-primary hover:bg-ui-primary-soft"
                                              >
                                                Add rule
                                              </button>
                                            </div>
                                          </div>
                                          {(
                                            column.computedLabelRules || []
                                          ).map((rule, ruleIndex) => (
                                            <div
                                              key={ruleIndex}
                                              className="grid grid-cols-[1fr_1fr_40px] gap-2"
                                            >
                                              <Input
                                                type="text"
                                                value={rule.condition || ""}
                                                onChange={(e) =>
                                                  updateTableComputedLabelRule(
                                                    column.field,
                                                    ruleIndex,
                                                    {
                                                      condition: e.target.value,
                                                    },
                                                  )
                                                }
                                                placeholder="stock == 1"
                                              />
                                              <Input
                                                type="text"
                                                value={rule.value || ""}
                                                onChange={(e) =>
                                                  updateTableComputedLabelRule(
                                                    column.field,
                                                    ruleIndex,
                                                    { value: e.target.value },
                                                  )
                                                }
                                                placeholder="critical"
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeTableComputedLabelRule(
                                                    column.field,
                                                    ruleIndex,
                                                  )
                                                }
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-ui-md border border-ui-danger/20 bg-ui-danger-soft text-ui-danger hover:bg-ui-danger-subtle"
                                                title="Remove rule"
                                              >
                                                <FiTrash2 size={14} />
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {(column.type || "field") ===
                                        "progressBar" && (
                                        <div className="space-y-3 rounded-lg border border-ui-border/80 bg-ui-surface-subtle/60 p-3.5">
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Source Field
                                              </span>
                                              <Input
                                                type="text"
                                                value={
                                                  column.progressBar
                                                    ?.sourceField ||
                                                  column.field
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      sourceField:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                placeholder="stock"
                                              /></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Max
                                              </span>
                                              <Input
                                                type="number"
                                                value={
                                                  column.progressBar?.max ?? 8
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      max:
                                                        e.target.value === ""
                                                          ? undefined
                                                          : Number(
                                                              e.target.value,
                                                            ),
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                min={0}
                                              /></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Max Field
                                              </span>
                                              <Input
                                                type="text"
                                                value={
                                                  column.progressBar
                                                    ?.maxField || ""
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      maxField: e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                placeholder="Optional"
                                              /></label>
                                            </div>
                                            <label className="flex items-end gap-2 pb-2 text-sm text-ui-foreground">
                                              <Input
                                                type="checkbox"
                                                checked={
                                                  column.progressBar
                                                    ?.showValue !== false
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      showValue:
                                                        e.target.checked,
                                                    },
                                                  )
                                                }
                                              />
                                              Show value
                                            </label>
                                          </div>
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Default Color
                                              </span>
                                              <Input
                                                type="color"
                                                value={
                                                  column.progressBar?.color ||
                                                  "#4d9f24"
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    { color: e.target.value },
                                                  )
                                                }
                                                className="h-10 w-full rounded-lg border border-ui-border bg-white px-2"
                                              /></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Track Color
                                              </span>
                                              <Input
                                                type="color"
                                                value={
                                                  column.progressBar
                                                    ?.trackColor || "#e7e5df"
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      trackColor:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="h-10 w-full rounded-lg border border-ui-border bg-white px-2"
                                              /></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Height
                                              </span>
                                              <Input
                                                type="number"
                                                value={
                                                  column.progressBar?.height ??
                                                  12
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      height: Number(
                                                        e.target.value,
                                                      ),
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                min={4}
                                              /></label>
                                            </div>
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Width
                                              </span>
                                              <Input
                                                type="number"
                                                value={
                                                  column.progressBar?.width ??
                                                  260
                                                }
                                                onChange={(e) =>
                                                  updateTableProgressBar(
                                                    column.field,
                                                    {
                                                      width: Number(
                                                        e.target.value,
                                                      ),
                                                    },
                                                  )
                                                }
                                                className="w-full"
                                                min={80}
                                              /></label>
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <div className="text-xs font-semibold text-ui-foreground">
                                              Color Rules
                                            </div>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                addTableProgressBarColorRule(
                                                  column.field,
                                                )
                                              }
                                              className="inline-flex h-8 items-center rounded-ui-md border border-ui-primary/25 bg-ui-surface px-3 text-xs font-semibold text-ui-primary hover:bg-ui-primary-soft"
                                            >
                                              Add rule
                                            </button>
                                          </div>
                                          {(
                                            column.progressBar?.colorRules || []
                                          ).map((rule, ruleIndex) => (
                                            <div
                                              key={ruleIndex}
                                              className="grid grid-cols-[1fr_120px_40px] gap-2"
                                            >
                                              <Input
                                                type="text"
                                                value={rule.condition || ""}
                                                onChange={(e) =>
                                                  updateTableProgressBarColorRule(
                                                    column.field,
                                                    ruleIndex,
                                                    {
                                                      condition: e.target.value,
                                                    },
                                                  )
                                                }
                                                placeholder="stock < 2"
                                              />
                                              <Input
                                                type="color"
                                                value={rule.color || "#4d9f24"}
                                                onChange={(e) =>
                                                  updateTableProgressBarColorRule(
                                                    column.field,
                                                    ruleIndex,
                                                    { color: e.target.value },
                                                  )
                                                }
                                                className="h-10 w-full rounded-lg border border-ui-border bg-white px-2"
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeTableProgressBarColorRule(
                                                    column.field,
                                                    ruleIndex,
                                                  )
                                                }
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-ui-md border border-ui-danger/20 bg-ui-danger-soft text-ui-danger hover:bg-ui-danger-subtle"
                                                title="Remove rule"
                                              >
                                                <FiTrash2 size={14} />
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ),
                                )}
                              </div>
  );
}
