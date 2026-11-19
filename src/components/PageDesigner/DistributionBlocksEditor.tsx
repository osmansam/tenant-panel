import type { DynamicWorkflow, PipelineStage } from "../../utils/api/container";
import React from "react";
import { INFO_BLOCK_SOURCES, resizeDistributionBlockItems } from "./designerConstants";
import { Input, Select } from "../ui";
import { DistributionBlockItemConfig, InfoBlocksSource } from "../../types/page";

export interface DistributionBlocksEditorProps {
  title: string;
  setTitle: (v: string) => void;
  containerOptions: { value: string; label: string }[];
  schemaName: string;
  setSchemaName: (v: string) => void;
  distributionBlocksSource: InfoBlocksSource;
  setDistributionBlocksSource: (v: InfoBlocksSource) => void;
  pipelineName: string;
  setPipelineName: (v: string) => void;
  pipelineOptions: { pipeline: PipelineStage; outputFields: string[] }[];
  workflowName: string;
  setWorkflowName: (v: string) => void;
  workflowOptions: { workflow: DynamicWorkflow; outputFields: string[] }[];
  isDynamic: boolean;
  setIsDynamic: (v: boolean) => void;
  dynamicLimit: number;
  setDynamicLimit: (v: number) => void;
  distributionBlockItems: DistributionBlockItemConfig[];
  setDistributionBlockItems: React.Dispatch<React.SetStateAction<DistributionBlockItemConfig[]>>;
  dynamicDistributionBlockItem: DistributionBlockItemConfig;
  setDynamicDistributionBlockItem: React.Dispatch<React.SetStateAction<DistributionBlockItemConfig>>;
  updateDistributionBlockItem: (blockIndex: number, updates: Partial<DistributionBlockItemConfig>) => void;
}

export function DistributionBlocksEditor({
  title,
  setTitle,
  containerOptions,
  schemaName,
  setSchemaName,
  distributionBlocksSource,
  setDistributionBlocksSource,
  pipelineName,
  setPipelineName,
  pipelineOptions,
  workflowName,
  setWorkflowName,
  workflowOptions,
  isDynamic,
  setIsDynamic,
  dynamicLimit,
  setDynamicLimit,
  distributionBlockItems,
  setDistributionBlockItems,
  dynamicDistributionBlockItem,
  setDynamicDistributionBlockItem,
  updateDistributionBlockItem,
}: DistributionBlocksEditorProps) {
  return (
              <div className="space-y-5 rounded-2xl border border-ui-border bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                      Title
                    </span>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                      placeholder="Kategori Dağılımı (adet)"
                    /></label>
                  </div>

                  <div>
                    <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                      Source
                    </span>
                    <Select
                      value={distributionBlocksSource}
                      onChange={(e) => {
                        const nextSource = e.target.value as InfoBlocksSource;
                        setDistributionBlocksSource(nextSource);
                        setPipelineName("");
                        setWorkflowName("");
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                    >
                      {INFO_BLOCK_SOURCES.map((source) => (
                        <option key={source.value} value={source.value}>
                          {source.label}
                        </option>
                      ))}
                    </Select></label>
                  </div>

                  {distributionBlocksSource !== "static" && (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Generation Mode
                      </span>
                      <Select
                        value={isDynamic ? "dynamic" : "static"}
                        onChange={(e) =>
                          setIsDynamic(e.target.value === "dynamic")
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                      >
                        <option value="static">Static blocks</option>
                        <option value="dynamic">
                          Dynamic (from array data)
                        </option>
                      </Select></label>
                    </div>
                  )}

                  {!isDynamic || distributionBlocksSource === "static" ? (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Blocks
                      </span>
                      <Select
                        value={distributionBlockItems.length}
                        onChange={(e) =>
                          setDistributionBlockItems((current) =>
                            resizeDistributionBlockItems(
                              Number(e.target.value),
                              current,
                            ),
                          )
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                      >
                        {[1, 2, 3, 4, 5].map((count) => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </Select></label>
                    </div>
                  ) : (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Max Blocks (Limit)
                      </span>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        value={dynamicLimit}
                        onChange={(e) =>
                          setDynamicLimit(Math.max(1, Number(e.target.value)))
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                      /></label>
                    </div>
                  )}

                  {distributionBlocksSource !== "static" && (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Schema Name
                        <span className="text-ui-danger ml-0.5">*</span>
                      </span>
                      <Select
                        value={schemaName}
                        onChange={(e) => setSchemaName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                      >
                        <option value="">Select a schema...</option>
                        {containerOptions.map((container) => (
                          <option key={container.value} value={container.value}>
                            {container.label}
                          </option>
                        ))}
                      </Select></label>
                    </div>
                  )}

                  {distributionBlocksSource === "pipeline" && (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Pipeline Name
                        <span className="text-ui-danger ml-0.5">*</span>
                      </span>
                      <Select
                        value={pipelineName}
                        onChange={(e) => setPipelineName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                      >
                        <option value="">
                          {pipelineOptions.length > 0
                            ? "Select a pipeline..."
                            : "No data-returning pipelines"}
                        </option>
                        {pipelineOptions.map(({ pipeline }) => (
                          <option key={pipeline.name} value={pipeline.name}>
                            {pipeline.name}
                          </option>
                        ))}
                      </Select></label>
                    </div>
                  )}

                  {distributionBlocksSource === "workflow" && (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Workflow Name
                        <span className="text-ui-danger ml-0.5">*</span>
                      </span>
                      <Select
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                      >
                        <option value="">
                          {workflowOptions.length > 0
                            ? "Select a workflow..."
                            : "No data-returning workflows"}
                        </option>
                        {workflowOptions.map(({ workflow }) => (
                          <option key={workflow.name} value={workflow.name}>
                            {workflow.name}
                          </option>
                        ))}
                      </Select></label>
                    </div>
                  )}
                </div>

                {!isDynamic || distributionBlocksSource === "static" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {distributionBlockItems.map((item, index) => (
                      <div
                        key={`distribution-block-editor-${index}`}
                        className="rounded-xl border border-ui-border bg-ui-surface-subtle p-4"
                      >
                        <div className="mb-3 text-sm font-semibold text-ui-foreground">
                          Block {index + 1}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            type="text"
                            value={item.label || ""}
                            onChange={(e) =>
                              updateDistributionBlockItem(index, {
                                label: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                            placeholder='{{high > 4 ? "↑ Strateji" : "Strateji"}}'
                          />
                          <Input
                            type="text"
                            value={item.value || ""}
                            onChange={(e) =>
                              updateDistributionBlockItem(index, {
                                value: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                            placeholder="{{strategyCount}}"
                          />
                          <Input
                            type="text"
                            value={item.percent || ""}
                            onChange={(e) =>
                              updateDistributionBlockItem(index, {
                                percent: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                            placeholder="{{strategyPercent}}"
                          />
                          <Input
                            type="color"
                            value={item.color || "#4f46e5"}
                            onChange={(e) =>
                              updateDistributionBlockItem(index, {
                                color: e.target.value,
                              })
                            }
                            className="h-[42px] w-full cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                            title="Block color"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-ui-border bg-ui-surface-subtle p-4">
                    <div className="mb-3 text-sm font-semibold text-ui-foreground flex items-center justify-between">
                      <span>Dynamic Row Template</span>
                      <span className="text-xs font-normal text-ui-muted font-mono">
                        Generates rows from array items
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-ui-muted mb-1">
                          Label (e.g. {"{"}
                          {"{"}categoryName{"}"}
                          {"}"})
                        </label>
                        <Input
                          type="text"
                          value={dynamicDistributionBlockItem.label || ""}
                          onChange={(e) =>
                            setDynamicDistributionBlockItem((current) => ({
                              ...current,
                              label: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                          placeholder="Label template"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-ui-muted mb-1">
                          Value (e.g. {"{"}
                          {"{"}totalQuantitySold{"}"}
                          {"}"})
                        </label>
                        <Input
                          type="text"
                          value={dynamicDistributionBlockItem.value || ""}
                          onChange={(e) =>
                            setDynamicDistributionBlockItem((current) => ({
                              ...current,
                              value: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                          placeholder="Value template"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-ui-muted mb-1">
                          Percent (e.g. {"{"}
                          {"{"}totalQuantitySold{"}"}
                          {"}"}% or {"{"}
                          {"{"}percentField{"}"}
                          {"}"})
                        </label>
                        <Input
                          type="text"
                          value={dynamicDistributionBlockItem.percent || ""}
                          onChange={(e) =>
                            setDynamicDistributionBlockItem((current) => ({
                              ...current,
                              percent: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                          placeholder="Percent template"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-ui-muted mb-1">
                          Color (hex, {"{"}
                          {"{"}colorField{"}"}
                          {"}"} or "random")
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={dynamicDistributionBlockItem.color || ""}
                            onChange={(e) =>
                              setDynamicDistributionBlockItem((current) => ({
                                ...current,
                                color: e.target.value,
                              }))
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                            placeholder="e.g. #4f46e5, {{color}} or random"
                          />
                          <Input
                            type="color"
                            value={
                              dynamicDistributionBlockItem.color?.startsWith(
                                "#",
                              )
                                ? dynamicDistributionBlockItem.color
                                : "#4f46e5"
                            }
                            onChange={(e) =>
                              setDynamicDistributionBlockItem((current) => ({
                                ...current,
                                color: e.target.value,
                              }))
                            }
                            className="h-[42px] w-[50px] cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
  );
}
