import React from "react";
import { FiPlus } from "react-icons/fi";
import { Input, Select } from "../ui";
import { cleanDesignerTableDataMode, isIntegerTableOrderField } from "../../utils/pageDesignerTableConfig";
import EditorSectionTabs from "./EditorSectionTabs";
import type { Field } from "../../utils/api/container";
import type { TableComponentConfig } from "../../types/page";

export interface TableRequestTabProps {
  selectedFields: Field[];
  tableSourceType: "schema" | "pipeline" | "workflow";
  tableConfig: TableComponentConfig;
  setTableConfig: React.Dispatch<React.SetStateAction<TableComponentConfig>>;
  addTableConstantFilter: () => void;
  removeTableConstantFilter: (key: string) => void;
  updateTableConstantFilter: (previousKey: string, nextKey: string, nextValue: unknown) => void;
  updateTableConstantSort: (updates: NonNullable<TableComponentConfig["constantSort"]>) => void;
}

export function TableRequestTab({
  selectedFields,
  tableSourceType,
  tableConfig,
  setTableConfig,
  addTableConstantFilter,
  removeTableConstantFilter,
  updateTableConstantFilter,
  updateTableConstantSort,
}: TableRequestTabProps) {
  return (
                              <EditorSectionTabs
                                label="Request settings"
                                sections={[
                                  ...(tableSourceType === "schema" ? [{
                                    value: "loading", label: "Data loading", content: (
                                      <div className="space-y-3 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                                        <div>
                                          <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                            Data loading
                                          </span>
                                          <p className="mt-1 text-xs text-ui-muted">
                                            Loads the all-items response in one request.
                                            Use with care for large schemas.
                                          </p>
                                        </div>
                                        <Select
                                          aria-label="Data loading"
                                          value={cleanDesignerTableDataMode(
                                            tableConfig.dataMode,
                                          )}
                                          onChange={(event) =>
                                            setTableConfig((current) => ({
                                              ...current,
                                              dataMode: cleanDesignerTableDataMode(
                                                event.target.value,
                                              ),
                                            }))
                                          }
                                          className="w-full"
                                        >
                                          <option value="paginated">Paginated</option>
                                          <option value="all">All items</option>
                                          <option value="arrayField">Array field rows</option>
                                        </Select>
                                      </div>
                                    ),
                                  }] : []),
                                  {
                                    value: "fields",
                                    label: "Data fields",
                                    content: (
                                      <div className="space-y-3 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                                        <div>
                                          <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                            Additional data fields
                                          </span>
                                          <p className="mt-1 text-xs text-ui-muted">
                                            Fetch these values with every row without
                                            displaying them as table columns. Fields
                                            referenced by supported action and row
                                            conditions are included automatically.
                                          </p>
                                        </div>
                                        <Select
                                          multiple
                                          aria-label="Additional data fields"
                                          value={tableConfig.dataFields || []}
                                          onChange={(event) => {
                                            const dataFields = Array.from(
                                              event.currentTarget.selectedOptions,
                                              (option) => option.value,
                                            );
                                            setTableConfig((current) => ({
                                              ...current,
                                              dataFields: dataFields.length
                                                ? dataFields
                                                : undefined,
                                            }));
                                          }}
                                          className="w-full"
                                        >
                                          {selectedFields.map((field) => (
                                            <option key={field.name} value={field.name}>
                                              {field.frontend?.displayName || field.name}
                                            </option>
                                          ))}
                                        </Select>
                                        <p className="text-xs text-ui-muted">
                                          Hold Ctrl or Command to select multiple fields.
                                        </p>
                                      </div>
                                    ),
                                  },
                                  {
                                    value: "filters",
                                    label: "Constant filters",
                                    content: (
                                      <div className="space-y-3 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                          <div>
                                            <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                              Constant Filters
                                            </span>
                                            <p className="mt-1 text-xs text-ui-muted">
                                              Send these hidden filters with every table
                                              data request.
                                            </p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={addTableConstantFilter}
                                            className="inline-flex h-9 items-center gap-1.5 rounded-ui-md border border-ui-primary/25 bg-ui-surface px-3 text-xs font-semibold text-ui-primary shadow-ui-sm hover:bg-ui-primary-soft transition-colors"
                                          >
                                            <FiPlus size={14} />
                                            Add filter
                                          </button>
                                        </div>

                                        {Object.entries(
                                          tableConfig.constantFilters || {},
                                        ).length === 0 ? (
                                          <div className="rounded-lg border border-dashed border-ui-border bg-ui-surface p-3 text-sm text-ui-muted">
                                            No constant filters configured.
                                          </div>
                                        ) : (
                                          <div className="space-y-2">
                                            {Object.entries(
                                              tableConfig.constantFilters || {},
                                            ).map(([filterKey, filterValue]) => (
                                              <div
                                                key={filterKey}
                                                className="grid grid-cols-[minmax(160px,0.9fr)_minmax(180px,1fr)_auto] gap-2"
                                              >
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-ui-muted">
                                                    Field
                                                  </span>
                                                  <Input
                                                    type="text"
                                                    value={filterKey}
                                                    onChange={(e) =>
                                                      updateTableConstantFilter(
                                                        filterKey,
                                                        e.target.value,
                                                        filterValue,
                                                      )
                                                    }
                                                    className="w-full"
                                                    placeholder="status"
                                                  />
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-ui-muted">
                                                    Value
                                                  </span>
                                                  <Input
                                                    type="text"
                                                    value={
                                                      filterValue === undefined ||
                                                        filterValue === null
                                                        ? ""
                                                        : String(filterValue)
                                                    }
                                                    onChange={(e) =>
                                                      updateTableConstantFilter(
                                                        filterKey,
                                                        filterKey,
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-full"
                                                    placeholder="active"
                                                  />
                                                </label>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeTableConstantFilter(filterKey)
                                                  }
                                                  className="self-end inline-flex h-10 items-center rounded-ui-md border border-ui-danger/20 bg-ui-danger-soft px-3 text-xs font-semibold text-ui-danger hover:opacity-90"
                                                >
                                                  Remove
                                                </button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ),
                                  },
                                  {
                                    value: "sort",
                                    label: "Constant sort",
                                    content: (
                                      <div className="space-y-3 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                                        <div>
                                          <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                            Constant Sort
                                          </span>
                                          <p className="mt-1 text-xs text-ui-muted">
                                            Use this sort for the initial request until
                                            the table user chooses another sort.
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-[minmax(180px,1fr)_180px_auto] gap-3">
                                          <label className="space-y-1">
                                            <span className="text-xs font-medium text-ui-muted">
                                              Sort field
                                            </span>
                                            <Select
                                              aria-label="Sort field"
                                              value={tableConfig.constantSort?.sort || ""}
                                              onChange={(e) =>
                                                e.target.value
                                                  ? updateTableConstantSort({
                                                    sort: e.target.value,
                                                  })
                                                  : setTableConfig((current) => ({
                                                    ...current,
                                                    constantSort: undefined,
                                                  }))
                                              }
                                              className="w-full"
                                            >
                                              <option value="">No constant sort</option>
                                              {selectedFields.map((field) => {
                                                const fieldName =
                                                  typeof field === "string"
                                                    ? field
                                                    : field.name;
                                                return (
                                                  <option
                                                    key={fieldName}
                                                    value={fieldName}
                                                  >
                                                    {fieldName}
                                                  </option>
                                                );
                                              })}
                                            </Select>
                                          </label>
                                          <label className="space-y-1">
                                            <span className="text-xs font-medium text-ui-muted">
                                              Direction
                                            </span>
                                            <Select
                                              aria-label="Direction"
                                              value={String(
                                                tableConfig.constantSort?.asc ?? 1,
                                              )}
                                              onChange={(e) =>
                                                updateTableConstantSort({
                                                  sort:
                                                    tableConfig.constantSort?.sort ||
                                                    (typeof selectedFields[0] ===
                                                      "string"
                                                      ? selectedFields[0]
                                                      : selectedFields[0]?.name) ||
                                                    "",
                                                  asc: Number(e.target.value),
                                                })
                                              }
                                              disabled={!tableConfig.constantSort?.sort}
                                              className="w-full"
                                            >
                                              <option value="1">Ascending</option>
                                              <option value="0">Descending</option>
                                            </Select>
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setTableConfig((current) => ({
                                                ...current,
                                                constantSort: undefined,
                                              }))
                                            }
                                            className="self-end inline-flex h-10 items-center rounded-ui-md border border-ui-border bg-ui-surface px-3 text-xs font-semibold text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground"
                                          >
                                            Clear
                                          </button>
                                        </div>
                                      </div>
                                    ),
                                  },
                                  {
                                    value: "reordering",
                                    label: "Row reordering",
                                    content: (
                                      <div className="space-y-3 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                                        <div>
                                          <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                            Row Drag Reordering
                                          </span>
                                          <p className="mt-1 text-xs text-ui-muted">
                                            Drag visible rows and persist their position in an integer field.
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                          <label className="flex items-center gap-2 text-sm text-ui-foreground">
                                            <Input
                                              type="checkbox"
                                              checked={tableConfig.drag?.enabled === true}
                                              onChange={(event) =>
                                                setTableConfig((current) => ({
                                                  ...current,
                                                  drag: event.target.checked
                                                    ? {
                                                      enabled: true,
                                                      orderField:
                                                        current.drag?.orderField ||
                                                        "",
                                                    }
                                                    : undefined,
                                                }))
                                              }
                                            />
                                            Enable row dragging
                                          </label>
                                          <label className="space-y-1">
                                            <span className="text-xs font-medium text-ui-muted">
                                              Order field
                                            </span>
                                            <Select
                                              value={tableConfig.drag?.orderField || ""}
                                              disabled={!tableConfig.drag?.enabled}
                                              onChange={(event) =>
                                                setTableConfig((current) => ({
                                                  ...current,
                                                  drag: {
                                                    enabled: true,
                                                    orderField: event.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full"
                                            >
                                              <option value="">
                                                Select integer field
                                              </option>
                                              {selectedFields
                                                .filter(isIntegerTableOrderField)
                                                .map((field) => (
                                                  <option
                                                    key={field.name}
                                                    value={field.name}
                                                  >
                                                    {field.frontend?.displayName ||
                                                      field.name}
                                                  </option>
                                                ))}
                                            </Select>
                                          </label>
                                        </div>
                                      </div>
                                    ),
                                  },
                                ]}
                              />
  );
}
