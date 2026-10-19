import React from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type {
  ComponentBlock,
  ComponentOutputDefinition,
  PageModel,
} from "../../utils/api/page";
import type { InfoBlockItemConfig } from "../../types/page";
import {
  createRuntimeId,
  dependentBindings,
  outputTypeForFilter,
  uniqueOutputKey,
} from "../../utils/pageBindings";
import { Input } from "../ui";

interface ComponentOutputsEditorProps {
  page: PageModel;
  component: ComponentBlock;
  onChange: (component: ComponentBlock) => void;
  infoBlockItems?: InfoBlockItemConfig[];
}

function outputSourceKey(output: ComponentOutputDefinition): string {
  if (output.source.kind === "tableFilter") return `tableFilter:${output.source.filterId}`;
  if (output.source.kind === "infoBlockSelection") return `infoBlockSelection:${output.source.valueKey}`;
  return output.source.kind;
}

export const ComponentOutputsEditor: React.FC<ComponentOutputsEditorProps> = ({
  page,
  component,
  onChange,
  infoBlockItems = [],
}) => {
  if (component.type !== "table" && component.type !== "infoBlocks") return null;

  const outputs = component.outputs ?? [];
  const exposedSources = new Set(outputs.map(outputSourceKey));
  const filters = component.table?.filterPanel?.inputs ?? [];
  const infoBlockValues = new Map<string, unknown>();
  infoBlockItems.forEach((item) =>
    Object.entries(item.clickValues || {}).forEach(([key, value]) => {
      if (!infoBlockValues.has(key)) infoBlockValues.set(key, value);
    }),
  );

  const addOutput = (output: ComponentOutputDefinition) => {
    onChange({ ...component, outputs: [...outputs, output] });
  };

  const updateOutputKey = (outputId: string, key: string) => {
    onChange({
      ...component,
      outputs: outputs.map((output) =>
        output.id === outputId ? { ...output, key } : output,
      ),
    });
  };

  const removeOutput = (output: ComponentOutputDefinition) => {
    if (
      dependentBindings(page, {
        kind: "output",
        componentId: component.id,
        outputId: output.id,
      }).length > 0
    ) {
      return;
    }
    onChange({
      ...component,
      outputs: outputs.filter((candidate) => candidate.id !== output.id),
    });
  };

  const addTableSearch = () =>
    addOutput({
      id: createRuntimeId("out"),
      key: uniqueOutputKey(component, "tableSearch"),
      type: "string",
      source: { kind: "tableSearch" },
    });

  const addSelectedIds = () =>
    addOutput({
      id: createRuntimeId("out"),
      key: uniqueOutputKey(component, "tableSelectedIds"),
      type: "stringArray",
      source: { kind: "tableSelectedIds" },
    });

  const addInfoBlockOutput = (valueKey: string, value: unknown) =>
    addOutput({
      id: createRuntimeId("out"),
      key: uniqueOutputKey(component, valueKey),
      type:
        typeof value === "number"
          ? "number"
          : typeof value === "boolean"
            ? "boolean"
            : "string",
      source: { kind: "infoBlockSelection", valueKey },
    });

  return (
    <div className="md:col-span-full rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ui-foreground">
            Component Outputs
          </h4>
          <p className="mt-0.5 text-xs text-ui-muted">
            Expose interaction values so other component requests can bind to
            stable output IDs.
          </p>
        </div>

        {component.type === "table" && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={exposedSources.has("tableSearch")}
              onClick={addTableSearch}
              className="inline-flex h-8 items-center rounded-ui-md border border-ui-border bg-ui-surface px-3 text-xs font-medium text-ui-foreground shadow-ui-sm transition-colors hover:bg-ui-surface-subtle hover:border-ui-border-hover disabled:cursor-not-allowed disabled:bg-ui-surface-muted disabled:text-ui-subtle"
            >
              Expose tableSearch
            </button>
            <button
              type="button"
              disabled={exposedSources.has("tableSelectedIds")}
              onClick={addSelectedIds}
              className="inline-flex h-8 items-center rounded-ui-md border border-ui-border bg-ui-surface px-3 text-xs font-medium text-ui-foreground shadow-ui-sm transition-colors hover:bg-ui-surface-subtle hover:border-ui-border-hover disabled:cursor-not-allowed disabled:bg-ui-surface-muted disabled:text-ui-subtle"
            >
              Expose tableSelectedIds
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="space-y-2">
          {outputs.length === 0 ? (
            <div className="flex h-full min-h-[42px] items-center rounded-ui-md border border-dashed border-ui-border bg-ui-surface/70 px-3 py-2 text-xs text-ui-muted">
              No outputs exposed yet.
            </div>
          ) : (
            outputs.map((output) => {
              const dependents = dependentBindings(page, {
                kind: "output",
                componentId: component.id,
                outputId: output.id,
              });
              return (
                <div
                  key={output.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto_32px] items-center gap-2 rounded-ui-md border border-ui-border bg-ui-surface p-2"
                >
                  <Input
                    type="text"
                    controlSize="sm"
                    value={output.key}
                    onChange={(event) =>
                      updateOutputKey(output.id, event.target.value)
                    }
                    className="w-full font-mono text-xs"
                    aria-label={`Output key for ${output.id}`}
                  />
                  <span className="rounded bg-ui-surface-subtle px-2 py-1 text-[11px] font-mono text-ui-muted">
                    {output.id}
                  </span>
                  <span className="rounded bg-ui-surface-subtle px-2 py-1 text-[11px] text-ui-muted">
                    {output.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeOutput(output)}
                    disabled={dependents.length > 0}
                    title={
                      dependents.length > 0
                        ? "This output is used by request parameters."
                        : "Delete output"
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-ui-md text-ui-muted transition hover:bg-ui-danger-soft hover:text-ui-danger disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ui-muted"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {component.type === "table" && (
          <div className="space-y-1.5 rounded-ui-md border border-ui-border/80 bg-ui-surface/70 px-3 py-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ui-muted">
              Table filters
            </div>
            {filters.length === 0 ? (
              <div className="text-xs text-ui-muted">
                Add table filters before exposing filter outputs.
              </div>
            ) : (
              filters.map((filter) => {
                const sourceKey = filter.id ? `tableFilter:${filter.id}` : "";
                const exposed = sourceKey && exposedSources.has(sourceKey);
                return (
                  <div
                    key={filter.id || filter.formKey}
                    className="flex items-center justify-between gap-3 rounded-ui-md border border-ui-border bg-ui-surface p-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium text-ui-foreground">
                        {filter.label || filter.formKey}
                      </div>
                      <div className="truncate text-[11px] font-mono text-ui-muted">
                        {filter.id || "Missing immutable filter ID"}
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={!filter.id || !!exposed}
                      onClick={() =>
                        filter.id &&
                        addOutput({
                          id: createRuntimeId("out"),
                          key: uniqueOutputKey(
                            component,
                            `${filter.formKey}Filter`,
                          ),
                          type: outputTypeForFilter(filter),
                          source: { kind: "tableFilter", filterId: filter.id },
                        })
                      }
                      className="inline-flex h-7 items-center gap-1.5 rounded-ui-sm bg-ui-primary px-2.5 text-xs font-medium text-white transition hover:bg-ui-primary-hover disabled:cursor-not-allowed disabled:bg-ui-surface-muted disabled:text-ui-subtle"
                    >
                      <FiPlus size={13} />
                      {exposed ? "Exposed" : "Expose as component output"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {component.type === "infoBlocks" && (
          <div className="space-y-1.5 rounded-ui-md border border-ui-border/80 bg-ui-surface/70 px-3 py-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ui-muted">
              Click values
            </div>
            {infoBlockValues.size === 0 ? (
              <div className="text-xs text-ui-muted">
                Add click-value JSON to a block before exposing outputs.
              </div>
            ) : (
              Array.from(infoBlockValues.entries()).map(([valueKey, value]) => {
                const exposed = exposedSources.has(
                  `infoBlockSelection:${valueKey}`,
                );
                return (
                  <div
                    key={valueKey}
                    className="flex items-center justify-between gap-3 rounded-ui-md border border-ui-border bg-ui-surface p-2"
                  >
                    <span className="text-xs font-mono text-ui-foreground">
                      {valueKey}
                    </span>
                    <button
                      type="button"
                      disabled={exposed}
                      onClick={() => addInfoBlockOutput(valueKey, value)}
                      className="inline-flex h-7 items-center rounded-ui-sm bg-ui-primary px-2.5 text-xs font-medium text-white disabled:bg-ui-surface-muted disabled:text-ui-subtle"
                    >
                      {exposed ? "Exposed" : "Expose as component output"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentOutputsEditor;
