import React from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type {
  ComponentBlock,
  ComponentOutputDefinition,
  PageModel,
} from "../../utils/api/page";
import {
  createRuntimeId,
  dependentBindings,
  outputTypeForFilter,
  uniqueOutputKey,
} from "../../utils/pageBindings";

interface ComponentOutputsEditorProps {
  page: PageModel;
  component: ComponentBlock;
  onChange: (component: ComponentBlock) => void;
}

function outputSourceKey(output: ComponentOutputDefinition): string {
  if (output.source.kind === "tableFilter") return `tableFilter:${output.source.filterId}`;
  return output.source.kind;
}

export const ComponentOutputsEditor: React.FC<ComponentOutputsEditorProps> = ({
  page,
  component,
  onChange,
}) => {
  if (component.type !== "table") return null;

  const outputs = component.outputs ?? [];
  const exposedSources = new Set(outputs.map(outputSourceKey));
  const filters = component.table?.filterPanel?.inputs ?? [];

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

  return (
    <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4">
      <div>
        <h4 className="text-sm font-semibold text-neutral-900">
          Component Outputs
        </h4>
        <p className="mt-1 text-xs text-neutral-500">
          Expose table interaction values so other component requests can bind to
          stable output IDs.
        </p>
      </div>

      <div className="space-y-2">
        {outputs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-500">
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
                className="grid grid-cols-[minmax(0,1fr)_140px_120px_32px] items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2"
              >
                <input
                  type="text"
                  value={output.key}
                  onChange={(event) =>
                    updateOutputKey(output.id, event.target.value)
                  }
                  className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
                  aria-label={`Output key for ${output.id}`}
                />
                <span className="rounded bg-white px-2 py-1 text-[11px] font-mono text-neutral-500">
                  {output.id}
                </span>
                <span className="rounded bg-white px-2 py-1 text-[11px] text-neutral-600">
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
                  className="rounded-md p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-neutral-400"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="space-y-2 border-t border-neutral-100 pt-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Table filters
        </div>
        {filters.length === 0 ? (
          <div className="text-xs text-neutral-500">
            Add table filters before exposing filter outputs.
          </div>
        ) : (
          filters.map((filter) => {
            const sourceKey = filter.id ? `tableFilter:${filter.id}` : "";
            const exposed = sourceKey && exposedSources.has(sourceKey);
            return (
              <div
                key={filter.id || filter.formKey}
                className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-2"
              >
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium text-neutral-800">
                    {filter.label || filter.formKey}
                  </div>
                  <div className="truncate text-[11px] font-mono text-neutral-500">
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
                      key: uniqueOutputKey(component, `${filter.formKey}Filter`),
                      type: outputTypeForFilter(filter),
                      source: { kind: "tableFilter", filterId: filter.id },
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
                >
                  <FiPlus size={13} />
                  {exposed ? "Exposed" : "Expose as component output"}
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 pt-3">
        <button
          type="button"
          disabled={exposedSources.has("tableSearch")}
          onClick={addTableSearch}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
        >
          Expose tableSearch
        </button>
        <button
          type="button"
          disabled={exposedSources.has("tableSelectedIds")}
          onClick={addSelectedIds}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
        >
          Expose tableSelectedIds
        </button>
      </div>
    </div>
  );
};

export default ComponentOutputsEditor;
