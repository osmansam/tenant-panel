import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select } from "../ui";
import { TableColumnConfig } from "../../types/page";
import { TABLE_NESTED_COLUMN_TYPE_OPTIONS } from "../../utils/pageDesignerTableConfig";
import type { Field } from "../../utils/api/container";
import type { TableComponentConfig } from "../../types/page";

export interface TableNestedRowsTabProps {
  containerOptions: { value: string; label: string }[];
  selectedFields: Field[];
  tableConfig: TableComponentConfig;
  arrayTableFields: Field[];
  arrayTableIdentityFields: Field[];
  selectedArrayTableField: Field | undefined;
  buildDefaultLookup: (fieldName: string) => { schemaName: string; matchField: string; labelField: string };
  getLookupFieldOptions: (lookupSchemaName?: string) => { value: string; label: string }[];
  addTableNestedRowColumn: () => void;
  removeTableNestedRowColumn: (columnIndex: number) => void;
  updateTableNestedRowColumn: (columnIndex: number, updates: Partial<NonNullable<NonNullable<TableComponentConfig["nestedRows"]>["columns"]>[number]>) => void;
  updateTableNestedRows: (updates: Partial<NonNullable<TableComponentConfig["nestedRows"]>>) => void;
  generateTableArraySource: () => void;
  updateTableArraySource: (updates: Partial<NonNullable<TableComponentConfig["arraySource"]>>) => void;
}

export function TableNestedRowsTab({
  containerOptions,
  selectedFields,
  tableConfig,
  arrayTableFields,
  arrayTableIdentityFields,
  selectedArrayTableField,
  buildDefaultLookup,
  getLookupFieldOptions,
  addTableNestedRowColumn,
  removeTableNestedRowColumn,
  updateTableNestedRowColumn,
  updateTableNestedRows,
  generateTableArraySource,
  updateTableArraySource,
}: TableNestedRowsTabProps) {
  return (
                              <div className="space-y-4">
                                <div className="space-y-3 rounded-xl border border-ui-border bg-ui-surface-subtle p-4">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                        Array Source Rows
                                      </span>
                                      <p className="mt-1 text-xs text-ui-muted">
                                        Render each item in a parent array as a
                                        table row.
                                      </p>
                                    </div>
                                    <label className="flex items-center gap-2 rounded-lg border border-ui-border bg-white px-3 py-2 text-xs font-medium text-ui-foreground">
                                      <Input
                                        type="checkbox"
                                        checked={
                                          tableConfig.arraySource?.enabled ===
                                          true
                                        }
                                        onChange={(e) =>
                                          updateTableArraySource({
                                            enabled: e.target.checked,
                                          })
                                        }
                                      />
                                      Enabled
                                    </label>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                        Parent Array Field
                                      </span>
                                      <Input
                                        type="text"
                                        list="table-array-source-fields"
                                        value={tableConfig.arraySource?.field || ""}
                                        onChange={(e) =>
                                          updateTableArraySource({
                                            field: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                        placeholder="products"
                                      /></label>
                                      <datalist id="table-array-source-fields">
                                        {arrayTableFields.map((field) => (
                                          <option
                                            key={field.name}
                                            value={field.name}
                                          />
                                        ))}
                                      </datalist>
                                    </div>
                                    <div>
                                      <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                        Row Identity Field
                                      </span>
                                      <Select
                                        value={
                                          tableConfig.arraySource
                                            ?.rowIdentityField || ""
                                        }
                                        onChange={(e) =>
                                          updateTableArraySource({
                                            rowIdentityField: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                      >
                                        <option value="">Select identity</option>
                                        {arrayTableIdentityFields.map((field) => (
                                          <option key={field.name} value={field.name}>
                                            {field.frontend?.displayName || field.name}
                                          </option>
                                        ))}
                                      </Select></label>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                                    <div>
                                      <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                        Parent ID
                                      </span>
                                      <Input
                                        type="text"
                                        value={String(
                                          tableConfig.arraySource?.parentId?.source === "static"
                                            ? tableConfig.arraySource.parentId.value ?? ""
                                            : "",
                                        )}
                                        onChange={(e) =>
                                          updateTableArraySource({
                                            parentId: { source: "static", value: e.target.value },
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                        placeholder="{{route.id}}"
                                      /></label>
                                    </div>
                                    <button
                                      type="button"
                                      disabled={
                                        !selectedArrayTableField ||
                                        !tableConfig.arraySource?.rowIdentityField ||
                                        !tableConfig.arraySource?.parentId
                                      }
                                      onClick={generateTableArraySource}
                                      className="rounded-lg bg-ui-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                                    >
                                      Generate CRUD
                                    </button>
                                  </div>
                                </div>

                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                      Nested Rows
                                    </span>
                                    <p className="mt-1 text-xs text-ui-muted">
                                      Expand each table row with records from an
                                      array field.
                                    </p>
                                  </div>
                                  <label className="flex items-center gap-2 rounded-lg border border-ui-border bg-ui-surface-subtle px-3 py-2 text-xs font-medium text-ui-foreground">
                                    <Input
                                      type="checkbox"
                                      checked={
                                        tableConfig.nestedRows?.enabled === true
                                      }
                                      onChange={(e) =>
                                        updateTableNestedRows({
                                          enabled: e.target.checked,
                                        })
                                      }
                                    />
                                    Enabled
                                  </label>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                      Array Field
                                    </span>
                                    <Input
                                      type="text"
                                      list="table-nested-array-fields"
                                      value={tableConfig.nestedRows?.field || ""}
                                      onChange={(e) =>
                                        updateTableNestedRows({
                                          field: e.target.value,
                                        })
                                      }
                                      className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                      placeholder="product"
                                    /></label>
                                    <datalist id="table-nested-array-fields">
                                      {selectedFields.map((field) => (
                                        <option
                                          key={field.name}
                                          value={field.name}
                                        />
                                      ))}
                                    </datalist>
                                  </div>
                                  <div>
                                    <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                      Header
                                    </span>
                                    <Input
                                      type="text"
                                      value={
                                        tableConfig.nestedRows?.header || ""
                                      }
                                      onChange={(e) =>
                                        updateTableNestedRows({
                                          header: e.target.value,
                                        })
                                      }
                                      className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                      placeholder="Products"
                                    /></label>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                    Child Columns
                                  </span>
                                  <button
                                    type="button"
                                    onClick={addTableNestedRowColumn}
                                    className="inline-flex items-center gap-2 rounded-lg border border-ui-border bg-ui-active-subtle px-3 py-2 text-sm font-semibold text-ui-foreground hover:bg-ui-active-subtle"
                                  >
                                    <FiPlus size={14} />
                                    Add column
                                  </button>
                                </div>

                                {(tableConfig.nestedRows?.columns || [])
                                  .length === 0 ? (
                                  <div className="text-sm text-ui-muted border border-dashed border-ui-border rounded-lg p-4">
                                    Add child columns such as
                                    productDavinciId, productId, and quantity.
                                  </div>
                                ) : (
                                  (tableConfig.nestedRows?.columns || []).map(
                                    (column, columnIndex) => (
                                      <div
                                        key={`nested-column-${columnIndex}`}
                                        className="grid grid-cols-[minmax(160px,1fr)_minmax(160px,1fr)_150px_auto] gap-3 rounded-xl border border-ui-border p-4"
                                      >
                                        <div>
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Field
                                          </span>
                                          <Input
                                            type="text"
                                            value={column.field}
                                            onChange={(e) =>
                                              updateTableNestedRowColumn(
                                                columnIndex,
                                                { field: e.target.value },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            placeholder="quantity"
                                          /></label>
                                        </div>
                                        <div>
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Display Name
                                          </span>
                                          <Input
                                            type="text"
                                            value={column.displayName || ""}
                                            onChange={(e) =>
                                              updateTableNestedRowColumn(
                                                columnIndex,
                                                {
                                                  displayName: e.target.value,
                                                },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            placeholder={column.field}
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
                                              updateTableNestedRowColumn(
                                                columnIndex,
                                                {
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
                                                },
                                              );
                                            }}
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus bg-white"
                                          >
                                            {TABLE_NESTED_COLUMN_TYPE_OPTIONS.map(
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
                                        <div className="flex items-end">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTableNestedRowColumn(
                                                columnIndex,
                                              )
                                            }
                                            className="rounded-lg bg-ui-danger-subtle px-3 py-2 text-ui-danger hover:bg-ui-danger-subtle"
                                            title="Remove nested column"
                                          >
                                            <FiTrash2 size={16} />
                                          </button>
                                        </div>
                                        {(column.type || "field") ===
                                          "lookupLabel" && (
                                          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-3 rounded-lg border border-ui-border bg-ui-surface-subtle p-3">
                                            <div>
                                              <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                                Lookup Schema
                                              </span>
                                              <Select
                                                value={
                                                  column.lookup?.schemaName ||
                                                  ""
                                                }
                                                onChange={(e) =>
                                                  updateTableNestedRowColumn(
                                                    columnIndex,
                                                    {
                                                      lookup: {
                                                        ...(column.lookup ||
                                                          buildDefaultLookup(
                                                            column.field,
                                                          )),
                                                        schemaName:
                                                          e.target.value,
                                                        matchField:
                                                          column.lookup
                                                            ?.matchField ||
                                                          "_id",
                                                        labelField:
                                                          column.lookup
                                                            ?.labelField || "",
                                                      },
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus bg-white"
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
                                                  updateTableNestedRowColumn(
                                                    columnIndex,
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
                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus bg-white"
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
                                                  updateTableNestedRowColumn(
                                                    columnIndex,
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
                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus bg-white"
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
                                                  updateTableNestedRowColumn(
                                                    columnIndex,
                                                    {
                                                      fallbackValue:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                placeholder="Raw value"
                                              /></label>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ),
                                  )
                                )}
                              </div>
  );
}
