import type { DynamicWorkflow, PipelineStage } from "../../utils/api/container";
import React from "react";
import { INFO_BLOCK_SOURCES, resizeInfoBlockItems, createInfoBlockColorRule } from "./designerConstants";
import { FiTrash2 } from "react-icons/fi";
import { Input, Select, Textarea } from "../ui";
import { InfoBlockColorRule, InfoBlockItemConfig, InfoBlocksSource } from "../../types/page";

export interface InfoBlocksEditorProps {
  title: string;
  setTitle: (v: string) => void;
  containerOptions: { value: string; label: string }[];
  schemaName: string;
  setSchemaName: (v: string) => void;
  infoBlocksSource: InfoBlocksSource;
  setInfoBlocksSource: (v: InfoBlocksSource) => void;
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
  infoBlockItems: InfoBlockItemConfig[];
  setInfoBlockItems: React.Dispatch<React.SetStateAction<InfoBlockItemConfig[]>>;
  dynamicInfoBlockItem: InfoBlockItemConfig;
  setDynamicInfoBlockItem: React.Dispatch<React.SetStateAction<InfoBlockItemConfig>>;
  addInfoBlockColorRule: (blockIndex: number, target: "titleColorRules" | "footerColorRules") => void;
  removeInfoBlockColorRule: (blockIndex: number, target: "titleColorRules" | "footerColorRules", ruleIndex: number) => void;
  updateInfoBlockColorRule: (blockIndex: number, target: "titleColorRules" | "footerColorRules", ruleIndex: number, updates: Partial<InfoBlockColorRule>) => void;
}

export function InfoBlocksEditor({
  title,
  setTitle,
  containerOptions,
  schemaName,
  setSchemaName,
  infoBlocksSource,
  setInfoBlocksSource,
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
  infoBlockItems,
  setInfoBlockItems,
  dynamicInfoBlockItem,
  setDynamicInfoBlockItem,
  addInfoBlockColorRule,
  removeInfoBlockColorRule,
  updateInfoBlockColorRule,
}: InfoBlocksEditorProps) {
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
                      placeholder="Optional component title"
                    /></label>
                  </div>

                  <div>
                    <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                      Source
                    </span>
                    <Select
                      value={infoBlocksSource}
                      onChange={(e) => {
                        const nextSource = e.target.value as InfoBlocksSource;
                        setInfoBlocksSource(nextSource);
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

                  {infoBlocksSource !== "static" && (
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

                  {!isDynamic || infoBlocksSource === "static" ? (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                        Blocks
                      </span>
                      <Select
                        value={infoBlockItems.length}
                        onChange={(e) =>
                          setInfoBlockItems((current) =>
                            resizeInfoBlockItems(
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

                  {infoBlocksSource !== "static" && (
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

                  {infoBlocksSource === "pipeline" && (
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

                  {infoBlocksSource === "workflow" && (
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

                {!isDynamic || infoBlocksSource === "static" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {infoBlockItems.map((item, index) => {
                      return (
                        <div
                          key={`info-block-editor-${index}`}
                          className="rounded-xl border border-ui-border bg-ui-surface-subtle p-4"
                        >
                          <div className="mb-3 text-sm font-semibold text-ui-foreground">
                            Block {index + 1}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                              type="text"
                              value={item.title || ""}
                              onChange={(e) =>
                                setInfoBlockItems((current) =>
                                  current.map((block, itemIndex) =>
                                    itemIndex === index
                                      ? { ...block, title: e.target.value }
                                      : block,
                                  ),
                                )
                              }
                              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                              placeholder="Upper text"
                            />
                            <Input
                              type="text"
                              value={item.value || ""}
                              onChange={(e) =>
                                setInfoBlockItems((current) =>
                                  current.map((block, itemIndex) =>
                                    itemIndex === index
                                      ? { ...block, value: e.target.value }
                                      : block,
                                  ),
                                )
                              }
                              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                              placeholder="{{quantity}}"
                            />
                            <Input
                              type="text"
                              value={item.footer || ""}
                              onChange={(e) =>
                                setInfoBlockItems((current) =>
                                  current.map((block, itemIndex) =>
                                    itemIndex === index
                                      ? { ...block, footer: e.target.value }
                                      : block,
                                  ),
                                )
                              }
                              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                              placeholder="Lower text"
                            />
                            <Input
                              type="color"
                              value={item.color || "#ffffff"}
                              onChange={(e) =>
                                setInfoBlockItems((current) =>
                                  current.map((block, itemIndex) =>
                                    itemIndex === index
                                      ? { ...block, color: e.target.value }
                                      : block,
                                  ),
                                )
                              }
                              className="h-[42px] w-full cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                              title="Side color"
                            />
                            <Textarea
                              key={`click-values-${index}-${JSON.stringify(item.clickValues || {})}`}
                              defaultValue={
                                item.clickValues && Object.keys(item.clickValues).length
                                  ? JSON.stringify(item.clickValues, null, 2)
                                  : ""
                              }
                              onBlur={(event) => {
                                const value = event.target.value.trim();
                                if (!value) {
                                  setInfoBlockItems((current) =>
                                    current.map((block, itemIndex) =>
                                      itemIndex === index
                                        ? { ...block, clickValues: undefined }
                                        : block,
                                    ),
                                  );
                                  return;
                                }
                                try {
                                  const parsed = JSON.parse(value);
                                  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                                    setInfoBlockItems((current) =>
                                      current.map((block, itemIndex) =>
                                        itemIndex === index
                                          ? { ...block, clickValues: parsed }
                                          : block,
                                      ),
                                    );
                                  }
                                } catch {
                                  // Keep the previous valid value; validation happens on blur.
                                }
                              }}
                              className="min-h-24 w-full rounded-lg border border-ui-border bg-white px-3.5 py-2.5 font-mono text-xs md:col-span-2"
                              placeholder={'Click values JSON, e.g. {"minimum": 3, "maximum": 5}'}
                            />
                            <div className="md:col-span-2 rounded-lg border border-ui-border bg-white p-3">
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted">
                                  Upper text color rules
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    addInfoBlockColorRule(
                                      index,
                                      "titleColorRules",
                                    )
                                  }
                                  className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                                >
                                  + Add rule
                                </button>
                              </div>
                              <div className="space-y-2">
                                {(item.titleColorRules || []).map(
                                  (rule, ruleIndex) => (
                                    <div
                                      key={ruleIndex}
                                      className="grid grid-cols-[1fr_96px_auto] gap-2"
                                    >
                                      <Input
                                        type="text"
                                        value={rule.condition || ""}
                                        onChange={(e) =>
                                          updateInfoBlockColorRule(
                                            index,
                                            "titleColorRules",
                                            ruleIndex,
                                            { condition: e.target.value },
                                          )
                                        }
                                        className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                        placeholder="{{high}} > 4 or default"
                                      />
                                      <Input
                                        type="color"
                                        value={rule.color || "#16a34a"}
                                        onChange={(e) =>
                                          updateInfoBlockColorRule(
                                            index,
                                            "titleColorRules",
                                            ruleIndex,
                                            { color: e.target.value },
                                          )
                                        }
                                        className="h-[38px] w-full cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                                        title="Upper text color"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeInfoBlockColorRule(
                                            index,
                                            "titleColorRules",
                                            ruleIndex,
                                          )
                                        }
                                        className="rounded-lg bg-ui-danger-subtle px-2 text-ui-danger hover:bg-ui-danger-subtle"
                                      >
                                        <FiTrash2 size={14} />
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                            <div className="md:col-span-2 rounded-lg border border-ui-border bg-white p-3">
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted">
                                  Lower text color rules
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    addInfoBlockColorRule(
                                      index,
                                      "footerColorRules",
                                    )
                                  }
                                  className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                                >
                                  + Add rule
                                </button>
                              </div>
                              <div className="space-y-2">
                                {(item.footerColorRules || []).map(
                                  (rule, ruleIndex) => (
                                    <div
                                      key={ruleIndex}
                                      className="grid grid-cols-[1fr_96px_auto] gap-2"
                                    >
                                      <Input
                                        type="text"
                                        value={rule.condition || ""}
                                        onChange={(e) =>
                                          updateInfoBlockColorRule(
                                            index,
                                            "footerColorRules",
                                            ruleIndex,
                                            { condition: e.target.value },
                                          )
                                        }
                                        className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                        placeholder="{{high}} > 4 or default"
                                      />
                                      <Input
                                        type="color"
                                        value={rule.color || "#16a34a"}
                                        onChange={(e) =>
                                          updateInfoBlockColorRule(
                                            index,
                                            "footerColorRules",
                                            ruleIndex,
                                            { color: e.target.value },
                                          )
                                        }
                                        className="h-[38px] w-full cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                                        title="Lower text color"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeInfoBlockColorRule(
                                            index,
                                            "footerColorRules",
                                            ruleIndex,
                                          )
                                        }
                                        className="rounded-lg bg-ui-danger-subtle px-2 text-ui-danger hover:bg-ui-danger-subtle"
                                      >
                                        <FiTrash2 size={14} />
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-ui-border bg-ui-active-subtle/50 p-4">
                    <div className="mb-3 text-sm font-semibold text-ui-foreground flex items-center justify-between">
                      <span>Dynamic Block Template</span>
                      <span className="text-xs font-normal text-ui-muted font-mono">
                        Maps over array items
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-ui-muted mb-1">
                          Upper text (e.g. {"{"}
                          {"{"}categoryName{"}"}
                          {"}"})
                        </label>
                        <Input
                          type="text"
                          value={dynamicInfoBlockItem.title || ""}
                          onChange={(e) =>
                            setDynamicInfoBlockItem((current) => ({
                              ...current,
                              title: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                          placeholder="Upper text template"
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
                          value={dynamicInfoBlockItem.value || ""}
                          onChange={(e) =>
                            setDynamicInfoBlockItem((current) => ({
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
                          Lower text (e.g. {"{"}
                          {"{"}orderCount{"}"}
                          {"}"} adet)
                        </label>
                        <Input
                          type="text"
                          value={dynamicInfoBlockItem.footer || ""}
                          onChange={(e) =>
                            setDynamicInfoBlockItem((current) => ({
                              ...current,
                              footer: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                          placeholder="Lower text template"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-ui-muted mb-1">
                          Side color (hex, {"{"}
                          {"{"}colorField{"}"}
                          {"}"} or "random")
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={dynamicInfoBlockItem.color || ""}
                            onChange={(e) =>
                              setDynamicInfoBlockItem((current) => ({
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
                              dynamicInfoBlockItem.color?.startsWith("#")
                                ? dynamicInfoBlockItem.color
                                : "#4f46e5"
                            }
                            onChange={(e) =>
                              setDynamicInfoBlockItem((current) => ({
                                ...current,
                                color: e.target.value,
                              }))
                            }
                            className="h-[42px] w-[50px] cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 rounded-lg border border-ui-border bg-white p-3">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted">
                            Upper text color rules
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setDynamicInfoBlockItem((current) => ({
                                ...current,
                                titleColorRules: [
                                  ...(current.titleColorRules || []),
                                  createInfoBlockColorRule(),
                                ],
                              }))
                            }
                            className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                          >
                            + Add rule
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(dynamicInfoBlockItem.titleColorRules || []).map(
                            (rule, ruleIndex) => (
                              <div
                                key={ruleIndex}
                                className="grid grid-cols-[1fr_96px_auto] gap-2"
                              >
                                <Input
                                  type="text"
                                  value={rule.condition || ""}
                                  onChange={(e) =>
                                    setDynamicInfoBlockItem((current) => {
                                      const rules = [
                                        ...(current.titleColorRules || []),
                                      ];
                                      rules[ruleIndex] = {
                                        ...rules[ruleIndex],
                                        condition: e.target.value,
                                      };
                                      return {
                                        ...current,
                                        titleColorRules: rules,
                                      };
                                    })
                                  }
                                  className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                  placeholder="{{orderCount}} > 4 or default"
                                />
                                <Input
                                  type="color"
                                  value={rule.color || "#16a34a"}
                                  onChange={(e) =>
                                    setDynamicInfoBlockItem((current) => {
                                      const rules = [
                                        ...(current.titleColorRules || []),
                                      ];
                                      rules[ruleIndex] = {
                                        ...rules[ruleIndex],
                                        color: e.target.value,
                                      };
                                      return {
                                        ...current,
                                        titleColorRules: rules,
                                      };
                                    })
                                  }
                                  className="h-[38px] w-full cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDynamicInfoBlockItem((current) => ({
                                      ...current,
                                      titleColorRules: (
                                        current.titleColorRules || []
                                      ).filter((_, idx) => idx !== ruleIndex),
                                    }))
                                  }
                                  className="rounded-lg bg-ui-danger-subtle px-2 text-ui-danger hover:bg-ui-danger-subtle"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="md:col-span-2 rounded-lg border border-ui-border bg-white p-3">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted">
                            Lower text color rules
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setDynamicInfoBlockItem((current) => ({
                                ...current,
                                footerColorRules: [
                                  ...(current.footerColorRules || []),
                                  createInfoBlockColorRule(),
                                ],
                              }))
                            }
                            className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                          >
                            + Add rule
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(dynamicInfoBlockItem.footerColorRules || []).map(
                            (rule, ruleIndex) => (
                              <div
                                key={ruleIndex}
                                className="grid grid-cols-[1fr_96px_auto] gap-2"
                              >
                                <Input
                                  type="text"
                                  value={rule.condition || ""}
                                  onChange={(e) =>
                                    setDynamicInfoBlockItem((current) => {
                                      const rules = [
                                        ...(current.footerColorRules || []),
                                      ];
                                      rules[ruleIndex] = {
                                        ...rules[ruleIndex],
                                        condition: e.target.value,
                                      };
                                      return {
                                        ...current,
                                        footerColorRules: rules,
                                      };
                                    })
                                  }
                                  className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                  placeholder="{{orderCount}} > 4 or default"
                                />
                                <Input
                                  type="color"
                                  value={rule.color || "#16a34a"}
                                  onChange={(e) =>
                                    setDynamicInfoBlockItem((current) => {
                                      const rules = [
                                        ...(current.footerColorRules || []),
                                      ];
                                      rules[ruleIndex] = {
                                        ...rules[ruleIndex],
                                        color: e.target.value,
                                      };
                                      return {
                                        ...current,
                                        footerColorRules: rules,
                                      };
                                    })
                                  }
                                  className="h-[38px] w-full cursor-pointer rounded-lg border border-ui-border bg-white px-2"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDynamicInfoBlockItem((current) => ({
                                      ...current,
                                      footerColorRules: (
                                        current.footerColorRules || []
                                      ).filter((_, idx) => idx !== ruleIndex),
                                    }))
                                  }
                                  className="rounded-lg bg-ui-danger-subtle px-2 text-ui-danger hover:bg-ui-danger-subtle"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
  );
}
