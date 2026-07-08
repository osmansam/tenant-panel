import React, { useMemo, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type {
  ComponentBlock,
  ComponentOutputDefinition,
  PageModel,
  ParameterBinding,
} from "../../utils/api/page";
import { formatBindingLabel, isSafeRuntimeName } from "../../utils/pageBindings";

interface ParameterBindingsEditorProps {
  page: PageModel;
  componentId: string;
  value: Record<string, ParameterBinding>;
  detectedParameterNames?: string[];
  issues?: { parameter?: string; message: string }[];
  onChange: (value: Record<string, ParameterBinding>) => void;
}

interface OutputOption {
  component: ComponentBlock;
  output: ComponentOutputDefinition;
}

function parseStaticValue(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+$/.test(trimmed)) return Number.parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return Number.parseFloat(trimmed);
  try {
    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      return JSON.parse(trimmed);
    }
  } catch {
    return value;
  }
  return value;
}

function stringifyStaticValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === undefined) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function collectOutputOptions(page: PageModel): OutputOption[] {
  const result: OutputOption[] = [];
  const visitComponent = (component?: ComponentBlock) => {
    if (!component) return;
    for (const output of component.outputs ?? []) {
      result.push({ component, output });
    }
    for (const tab of component.tabs ?? []) {
      for (const child of tab.components ?? []) visitComponent(child);
    }
  };
  const visitSection = (section: NonNullable<PageModel["sections"]>[number]) => {
    visitComponent(section.component);
    for (const cell of section.cells ?? []) {
      for (const component of cell.components ?? []) visitComponent(component);
    }
    for (const cell of section.grid?.cells ?? []) {
      for (const component of cell.components ?? []) visitComponent(component);
    }
    for (const tab of section.tabs?.tabs ?? []) {
      for (const child of tab.sections ?? []) visitSection(child);
    }
  };
  for (const section of page.sections ?? []) visitSection(section);
  return result;
}

function outputOptionValue(option: OutputOption): string {
  return `${option.component.id}:${option.output.id}`;
}

function labelForOutput(option: OutputOption): string {
  return `${option.component.stateKey || option.component.title || option.component.id}.${option.output.key}`;
}

export const ParameterBindingsEditor: React.FC<ParameterBindingsEditorProps> = ({
  page,
  componentId,
  value,
  detectedParameterNames = [],
  issues = [],
  onChange,
}) => {
  const [customParameter, setCustomParameter] = useState("");
  const outputOptions = useMemo(
    () => collectOutputOptions(page).filter((option) => option.component.id !== componentId),
    [componentId, page],
  );
  const pageFilters = page.filters ?? [];
  const parameterNames = useMemo(
    () =>
      Array.from(new Set([...detectedParameterNames, ...Object.keys(value)])).sort(),
    [detectedParameterNames, value],
  );

  const updateParameter = (name: string, binding: ParameterBinding) => {
    onChange({ ...value, [name]: binding });
  };

  const renameParameter = (previousName: string, nextName: string) => {
    const trimmed = nextName.trim();
    if (!isSafeRuntimeName(trimmed) || trimmed === previousName || value[trimmed]) return;
    const next = { ...value };
    next[trimmed] = next[previousName] ?? { source: "static", value: "" };
    delete next[previousName];
    onChange(next);
  };

  const removeParameter = (name: string) => {
    const next = { ...value };
    delete next[name];
    onChange(next);
  };

  const addParameter = () => {
    const trimmed = customParameter.trim();
    if (!isSafeRuntimeName(trimmed) || value[trimmed]) return;
    onChange({ ...value, [trimmed]: { source: "static", value: "" } });
    setCustomParameter("");
  };

  const firstOutput = outputOptions[0];
  const trimmedCustomParameter = customParameter.trim();
  const customParameterError =
    trimmedCustomParameter && !isSafeRuntimeName(trimmedCustomParameter)
      ? "Use a request parameter name like pageSize or productId. Do not use the component id."
      : trimmedCustomParameter && value[trimmedCustomParameter]
        ? "This request parameter is already added."
        : "";

  return (
    <div className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
      <div>
        <h4 className="text-sm font-semibold text-neutral-900">
          Request Parameter Bindings
        </h4>
        <p className="mt-1 text-xs text-neutral-500">
          Bind the pipeline/workflow request parameter name to a value. The
          left field is the request parameter sent to the backend, for example
          pageSize, productId, or selectedCategory. It is not the component id.
        </p>
      </div>

      <div className="space-y-3">
        {parameterNames.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 bg-white p-3 text-xs text-neutral-500">
            No request parameters detected. Add a custom parameter below.
          </div>
        ) : (
          parameterNames.map((name) => {
            const binding = value[name] ?? { source: "static", value: "" };
            const parameterIssues = issues.filter((issue) => issue.parameter === name);
            const selectedOutput =
              binding.source === "componentOutput"
                ? outputOptions.find(
                    (option) =>
                      option.component.id === binding.componentId &&
                      option.output.id === binding.outputId,
                  )
                : undefined;
            const selectedValue = selectedOutput
              ? outputOptionValue(selectedOutput)
              : "";

            return (
              <div
                key={name}
                className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_160px] gap-2">
                  <label className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                      Request parameter name
                    </span>
                    <input
                      type="text"
                      defaultValue={name}
                      onBlur={(event) => renameParameter(name, event.target.value)}
                      className="w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs font-mono focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
                      aria-label={`Request parameter ${name}`}
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                      Value source
                    </span>
                    <select
                    value={
                      binding.source === "componentOutput" || binding.source === "pageFilter"
                        ? binding.source
                        : "static"
                    }
                    onChange={(event) => {
                      if (event.target.value === "componentOutput" && firstOutput) {
                        updateParameter(name, {
                          source: "componentOutput",
                          componentId: firstOutput.component.id,
                          outputId: firstOutput.output.id,
                        });
                      } else if (event.target.value === "pageFilter" && pageFilters[0]) {
                        updateParameter(name, {
                          source: "pageFilter",
                          filterId: pageFilters[0].id,
                        });
                      } else {
                        updateParameter(name, { source: "static", value: "" });
                      }
                    }}
                    className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="static">Static</option>
                      <option value="componentOutput" disabled={outputOptions.length === 0}>
                        Component output
                      </option>
                      <option value="pageFilter" disabled={pageFilters.length === 0}>
                        Page filter
                      </option>
                    </select>
                  </label>
                </div>

                {binding.source === "componentOutput" ? (
                  <div className="grid grid-cols-[minmax(0,1fr)_150px_32px] gap-2">
                    <select
                      value={selectedValue}
                      onChange={(event) => {
                        const option = outputOptions.find(
                          (candidate) => outputOptionValue(candidate) === event.target.value,
                        );
                        if (!option) return;
                        updateParameter(name, {
                          source: "componentOutput",
                          componentId: option.component.id,
                          outputId: option.output.id,
                        });
                      }}
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      {outputOptions.map((option) => (
                        <option key={outputOptionValue(option)} value={outputOptionValue(option)}>
                          {labelForOutput(option)}
                        </option>
                      ))}
                    </select>
                    <select
                      value={binding.field ?? ""}
                      disabled={selectedOutput?.output.type !== "dateRange"}
                      onChange={(event) =>
                        updateParameter(name, {
                          source: "componentOutput",
                          componentId: binding.componentId,
                          outputId: binding.outputId,
                          ...(event.target.value
                            ? {
                                field: event.target.value as
                                  | "start"
                                  | "end"
                                  | "preset"
                                  | "timezone",
                              }
                            : {}),
                        })
                      }
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:bg-neutral-100 disabled:text-neutral-400"
                    >
                      <option value="">Whole value</option>
                      <option value="start">start</option>
                      <option value="end">end</option>
                      <option value="preset">preset</option>
                      <option value="timezone">timezone</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeParameter(name)}
                      className="rounded-md p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ) : binding.source === "pageFilter" ? (
                  <div className="grid grid-cols-[minmax(0,1fr)_150px_32px] gap-2">
                    <select
                      value={binding.filterId || ""}
                      onChange={(event) =>
                        updateParameter(name, {
                          source: "pageFilter",
                          filterId: event.target.value,
                        })
                      }
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="">Select page filter...</option>
                      {pageFilters.map((filter) => (
                        <option key={filter.id} value={filter.id}>
                          {filter.label || filter.key}
                        </option>
                      ))}
                    </select>
                    <select
                      value={binding.field ?? ""}
                      disabled={
                        pageFilters.find((filter) => filter.id === binding.filterId)?.type !==
                        "dateRange"
                      }
                      onChange={(event) =>
                        updateParameter(name, {
                          source: "pageFilter",
                          filterId: binding.filterId,
                          ...(event.target.value
                            ? {
                                field: event.target.value as
                                  | "value"
                                  | "start"
                                  | "end"
                                  | "preset"
                                  | "timezone",
                              }
                            : {}),
                        })
                      }
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:bg-neutral-100 disabled:text-neutral-400"
                    >
                      <option value="">Whole value</option>
                      <option value="start">start</option>
                      <option value="end">end</option>
                      <option value="preset">preset</option>
                      <option value="timezone">timezone</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeParameter(name)}
                      className="rounded-md p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-[minmax(0,1fr)_32px] gap-2">
                    <input
                      type="text"
                      value={stringifyStaticValue(
                        (binding as Extract<ParameterBinding, { source: "static" }>).value,
                      )}
                      onChange={(event) =>
                        updateParameter(name, {
                          source: "static",
                          value: parseStaticValue(event.target.value),
                        })
                      }
                      placeholder="Static value"
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeParameter(name)}
                      className="rounded-md p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}

                <div className="rounded bg-neutral-50 px-2 py-1 text-[11px] text-neutral-500">
                  Preview:{" "}
                  {binding.source === "componentOutput"
                    ? formatBindingLabel(page, binding)
                    : binding.source === "pageFilter"
                      ? formatBindingLabel(page, binding)
                    : "static"}
                </div>
                {parameterIssues.map((issue) => (
                  <div key={issue.message} className="text-xs text-red-600">
                    {issue.message}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-start gap-2 border-t border-neutral-200 pt-3">
        <label className="flex-1 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Add request parameter name
          </span>
          <input
            type="text"
            value={customParameter}
            onChange={(event) => setCustomParameter(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addParameter();
              }
            }}
            placeholder="pageSize"
            className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs focus:border-transparent focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
          <span className={customParameterError ? "block text-[11px] text-red-600" : "block text-[11px] text-neutral-500"}>
            {customParameterError || "Use letters, numbers, and underscores. Start with a letter or underscore."}
          </span>
        </label>
        <button
          type="button"
          onClick={addParameter}
          disabled={!trimmedCustomParameter || Boolean(customParameterError)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          <FiPlus size={13} />
          Add
        </button>
      </div>

      <div className="text-[11px] text-neutral-500">
        Editing component id: <span className="font-mono">{componentId}</span>
      </div>
    </div>
  );
};

export default ParameterBindingsEditor;
