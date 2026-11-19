import React from "react";
import { EMPTY_GROUP_BY } from "./designerConstants";
import { FiEdit2, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { MdTab, MdTableChart } from "react-icons/md";
import { Input, Select } from "../ui";
import type { GroupBy, TabPanelTab } from "../../types/page";
import type { Field } from "../../utils/api/container";
import { canAddTabChild } from "../../utils/tabChildComponents";

export interface TabPanelEditorProps {
  schemas: string[];
  setSchemaName: (v: string) => void;
  tabs: TabPanelTab[];
  setTabs: React.Dispatch<React.SetStateAction<TabPanelTab[]>>;
  groupBy: GroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<GroupBy>>;
  groupByTemplateSchemaName: string;
  groupByGroupedFields: { name: string; label: string }[];
  groupByValueFields: { name: string; label: string }[];
  groupByLabelFields: Field[];
  addTab: () => void;
  removeTab: (tabIndex: number) => void;
  removeTableFromTab: (tabIndex: number, componentId: string) => void;
  openTabExcelUpload: () => void;
  resetTableColumnsForSchema: (nextSchemaName: string) => void;
  setTableEditorTarget: React.Dispatch<
    React.SetStateAction<{
      tabIndex: number;
      componentId?: string;
      componentType?: "table" | "relationMatrix" | "custom";
    } | null>
  >;
}

export function TabPanelEditor({
  schemas,
  setSchemaName,
  tabs,
  setTabs,
  groupBy,
  setGroupBy,
  groupByTemplateSchemaName,
  groupByGroupedFields,
  groupByValueFields,
  groupByLabelFields,
  addTab,
  removeTab,
  removeTableFromTab,
  openTabExcelUpload,
  resetTableColumnsForSchema,
  setTableEditorTarget,
}: TabPanelEditorProps) {
  return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="block text-sm font-medium text-ui-foreground">
                    Tabs Configuration
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={addTab}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-ui-ink text-white text-xs font-medium rounded-lg hover:bg-ui-ink active:scale-95 transition-all shadow-sm"
                    >
                      <FiPlus size={14} strokeWidth={2.5} />
                      <span>Add Tab</span>
                    </button>
                    <button
                      onClick={openTabExcelUpload}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-ui-success text-white text-xs font-medium rounded-lg hover:bg-ui-success active:scale-95 transition-all shadow-sm"
                      title="Upload Excel as new tab with table"
                    >
                      <FiUpload size={14} strokeWidth={2.5} />
                      <span>Excel</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-ui-border bg-white p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="block text-sm font-medium text-ui-foreground">
                        Group By
                      </span>
                      <p className="text-xs text-ui-muted mt-1">
                        Optional. Uses the first table tab as the template for
                        dynamic tabs.
                      </p>
                    </div>
                    {(groupBy.groupedSchemaName ||
                      groupBy.groupedField ||
                      groupBy.sourceSchemaName ||
                      groupBy.groupByObjectId ||
                      (groupBy.sourceValueField &&
                        groupBy.sourceValueField !== "_id") ||
                      groupBy.sourceLabelField ||
                      groupBy.groupByField ||
                      groupBy.filterField) && (
                      <button
                        type="button"
                        onClick={() => setGroupBy(EMPTY_GROUP_BY)}
                        className="px-2.5 py-1 text-xs font-medium text-ui-foreground bg-ui-surface-subtle rounded-lg hover:bg-ui-surface-subtle transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block"><span className="block text-xs font-medium text-ui-muted mb-1.5">
                        Grouped schema
                      </span>
                      <Select
                        value={
                          groupBy.groupedSchemaName ||
                          groupByTemplateSchemaName ||
                          ""
                        }
                        onChange={(e) => {
                          setSchemaName(e.target.value);
                          resetTableColumnsForSchema(e.target.value);
                          setGroupBy((current) => ({
                            ...current,
                            groupedSchemaName: e.target.value,
                            groupedField: "",
                            groupByObjectId: "",
                            filterField: "",
                          }));
                        }}
                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent bg-white"
                      >
                        <option value="">Select grouped schema...</option>
                        {schemas.map((schema) => (
                          <option key={schema} value={schema}>
                            {schema}
                          </option>
                        ))}
                      </Select></label>
                    </div>

                    <div>
                      <label className="block"><span className="block text-xs font-medium text-ui-muted mb-1.5">
                        Grouped field
                      </span>
                      <Select
                        value={
                          groupBy.groupedField ||
                          groupBy.filterField ||
                          groupBy.groupByObjectId ||
                          ""
                        }
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            groupedField: e.target.value,
                            filterField: e.target.value,
                            groupByObjectId: e.target.value,
                          }))
                        }
                        disabled={
                          !(
                            groupBy.groupedSchemaName ||
                            groupByTemplateSchemaName
                          )
                        }
                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent bg-white disabled:bg-ui-surface-subtle disabled:text-ui-placeholder"
                      >
                        <option value="">Select grouped field...</option>
                        {(groupBy.groupedField ||
                          groupBy.filterField ||
                          groupBy.groupByObjectId) &&
                          !groupByGroupedFields.some(
                            (field) =>
                              field.name ===
                              (groupBy.groupedField ||
                                groupBy.filterField ||
                                groupBy.groupByObjectId),
                          ) && (
                            <option
                              value={
                                groupBy.groupedField ||
                                groupBy.filterField ||
                                groupBy.groupByObjectId
                              }
                            >
                              {groupBy.groupedField ||
                                groupBy.filterField ||
                                groupBy.groupByObjectId}
                            </option>
                          )}
                        {groupByGroupedFields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.label}
                          </option>
                        ))}
                      </Select></label>
                    </div>

                    <div>
                      <label className="block"><span className="block text-xs font-medium text-ui-muted mb-1.5">
                        Source schema
                      </span>
                      <Select
                        value={groupBy.sourceSchemaName || ""}
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            sourceSchemaName: e.target.value,
                            sourceValueField: "_id",
                            sourceLabelField: "",
                            groupByField: "",
                          }))
                        }
                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent bg-white"
                      >
                        <option value="">Select source schema...</option>
                        {schemas.map((schema) => (
                          <option key={schema} value={schema}>
                            {schema}
                          </option>
                        ))}
                      </Select></label>
                    </div>

                    <div>
                      <label className="block"><span className="block text-xs font-medium text-ui-muted mb-1.5">
                        Source value field
                      </span>
                      <Select
                        value={groupBy.sourceValueField || "_id"}
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            sourceValueField: e.target.value,
                          }))
                        }
                        disabled={!groupBy.sourceSchemaName}
                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent bg-white disabled:bg-ui-surface-subtle disabled:text-ui-placeholder"
                      >
                        {groupByValueFields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.label}
                          </option>
                        ))}
                      </Select></label>
                    </div>

                    <div>
                      <label className="block"><span className="block text-xs font-medium text-ui-muted mb-1.5">
                        Source label field
                      </span>
                      <Select
                        value={
                          groupBy.sourceLabelField || groupBy.groupByField || ""
                        }
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            sourceLabelField: e.target.value,
                            groupByField: e.target.value,
                          }))
                        }
                        disabled={!groupBy.sourceSchemaName}
                        className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent bg-white disabled:bg-ui-surface-subtle disabled:text-ui-placeholder"
                      >
                        <option value="">Select label field...</option>
                        {groupByLabelFields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.frontend?.displayName || field.name}
                          </option>
                        ))}
                      </Select></label>
                    </div>
                  </div>
                </div>

                {tabs.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-ui-border rounded-xl">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-ui-surface-subtle flex items-center justify-center">
                      <MdTab className="text-ui-placeholder" size={24} />
                    </div>
                    <p className="text-sm text-ui-muted mb-3">No tabs yet</p>
                    <button
                      onClick={addTab}
                      className="text-sm text-ui-foreground font-medium hover:underline"
                    >
                      Add your first tab
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tabs.map((tab, index) => (
                      <div
                        key={index}
                        className="border border-ui-border rounded-xl p-4 space-y-3 bg-ui-surface-subtle/50"
                      >
                        {/* Tab Title */}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-ui-active-subtle rounded-md">
                            <MdTab className="text-ui-primary" size={16} />
                          </div>
                          <Input
                            type="text"
                            value={tab.title}
                            onChange={(e) => {
                              const updated = [...tabs];
                              updated[index].title = e.target.value;
                              setTabs(updated);
                            }}
                            className="flex-1 px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent"
                            placeholder="Tab title"
                          />
                          <button
                            onClick={() => removeTab(index)}
                            className="p-1.5 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg transition-colors"
                            title="Remove tab"
                          >
                            <FiTrash2 size={14} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Tables in Tab */}
                        <div className="space-y-2">
                          {canAddTabChild(tab) && (
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <button
                                type="button"
                                onClick={() => setTableEditorTarget({ tabIndex: index, componentType: "table" })}
                                className="w-full px-3 py-2 text-sm font-medium text-ui-foreground border border-dashed border-ui-border rounded-lg hover:bg-ui-active-subtle transition-colors flex items-center justify-center gap-2"
                              >
                                <FiPlus size={15} strokeWidth={2.5} />
                                Add Table
                              </button>
                              <button
                                type="button"
                                onClick={() => setTableEditorTarget({ tabIndex: index, componentType: "relationMatrix" })}
                                className="w-full px-3 py-2 text-sm font-medium text-ui-foreground border border-dashed border-ui-border rounded-lg hover:bg-ui-active-subtle transition-colors flex items-center justify-center gap-2"
                              >
                                <FiPlus size={15} strokeWidth={2.5} />
                                Add Relation Matrix
                              </button>
                              <button type="button" onClick={() => setTableEditorTarget({ tabIndex: index, componentType: "custom" })} className="w-full px-3 py-2 text-sm font-medium text-ui-foreground border border-dashed border-ui-border rounded-lg hover:bg-ui-active-subtle flex items-center justify-center gap-2"><FiPlus size={15} />Add Visual component</button>
                            </div>
                          )}

                          {tab.components.length > 0 && (
                            <div className="space-y-1.5">
                              {tab.components.map((comp) => (
                                <div
                                  key={comp.id}
                                  className="flex items-center justify-between px-3 py-2 bg-white border border-ui-border rounded-lg text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <MdTableChart
                                      className={comp.type === "relationMatrix" ? "text-ui-primary" : "text-ui-primary"}
                                      size={16}
                                    />
                                    <span className="text-ui-foreground font-medium">
                                      {comp.type === "relationMatrix"
                                        ? comp.title || `${comp.relationMatrix?.rowSchemaName} × ${comp.relationMatrix?.columnSchemaName}`
                                        : comp.title || comp.dataBinding?.schemaName}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setTableEditorTarget({
                                          tabIndex: index,
                                          componentId: comp.id,
                                        })
                                      }
                                      className="p-1 text-ui-foreground bg-ui-active-subtle hover:bg-ui-active-subtle rounded transition-colors"
                                      title={`Edit ${comp.type === "custom" ? "visual component" : comp.type === "relationMatrix" ? "relation matrix" : "table"}`}
                                    >
                                      <FiEdit2 size={13} strokeWidth={2} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeTableFromTab(index, comp.id)
                                      }
                                      className="p-1 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded transition-colors"
                                      title="Remove component"
                                    >
                                      <FiTrash2 size={13} strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
  );
}
