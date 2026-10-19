import React, { useMemo, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type {
  ComponentBlock,
  ComponentOutputDefinition,
  PageModel,
  ParameterBinding,
} from "../../utils/api/page";
import { formatBindingLabel, isSafeRuntimeName } from "../../utils/pageBindings";
import { Input, Select, type SelectOption } from "../ui";

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

type StringOption = SelectOption<string>;
const ScalarSelect = ({ label, value, options, disabled, onChange, className }: {
  label: string;
  value: string;
  options: readonly StringOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
  className?: string;
}) => (
  <Select<StringOption>
    value={options.find((option) => option.value === value) || null}
    options={options}
    disabled={disabled}
    onChange={(selected) => {
      const option = selected as StringOption | null;
      if (option) onChange(option.value);
    }}
    aria-label={label}
    className={className}
  />
);

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
    <div className="space-y-4 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
      <div>
        <h4 className="text-sm font-semibold text-ui-foreground">
          Request Parameter Bindings
        </h4>
        <p className="mt-1 text-xs text-ui-muted">
          Bind the pipeline/workflow request parameter name to a value. The
          left field is the request parameter sent to the backend, for example
          pageSize, productId, or selectedCategory. It is not the component id.
        </p>
      </div>

      <div className="space-y-3">
        {parameterNames.length === 0 ? (
          <div className="rounded-lg border border-dashed border-ui-border bg-white p-3 text-xs text-ui-muted">
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
            const selectedPageFilter =
              binding.source === "pageFilter"
                ? pageFilters.find((filter) => filter.id === binding.filterId)
                : undefined;
            const pageFilterFieldOptions =
              selectedPageFilter?.type === "dateRange"
                ? ["start", "end", "preset", "timezone"]
                : selectedPageFilter?.type === "monthYear"
                  ? ["month", "year"]
                  : [];

            return (
              <div
                key={name}
                className="space-y-2 rounded-lg border border-ui-border bg-white p-3 shadow-sm"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_160px] gap-2">
                  <label className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-ui-muted">
                      Request parameter name
                    </span>
                    <Input
                      type="text"
                      defaultValue={name}
                      onBlur={(event) => renameParameter(name, event.target.value)}
                      className="w-full font-mono text-xs"
                      aria-label={`Request parameter ${name}`}
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-ui-muted">
                      Value source
                    </span>
                    <ScalarSelect
                    label={`Value source for ${name}`}
                    value={
                      binding.source === "componentOutput" || binding.source === "pageFilter"
                        ? binding.source
                        : "static"
                    }
                    onChange={(nextSource) => {
                      if (nextSource === "componentOutput" && firstOutput) {
                        updateParameter(name, {
                          source: "componentOutput",
                          componentId: firstOutput.component.id,
                          outputId: firstOutput.output.id,
                        });
                      } else if (nextSource === "pageFilter" && pageFilters[0]) {
                        updateParameter(name, {
                          source: "pageFilter",
                          filterId: pageFilters[0].id,
                        });
                      } else {
                        updateParameter(name, { source: "static", value: "" });
                      }
                    }}
                    options={[
                      { value: "static", label: "Static" },
                      { value: "componentOutput", label: "Component output", disabled: outputOptions.length === 0 },
                      { value: "pageFilter", label: "Page filter", disabled: pageFilters.length === 0 },
                    ]}
                    />
                  </label>
                </div>

                {binding.source === "componentOutput" ? (
                  <div className="grid grid-cols-[minmax(0,1fr)_150px_32px] gap-2">
                    <ScalarSelect
                      label={`Component output for ${name}`}
                      value={selectedValue}
                      onChange={(nextValue) => {
                        const option = outputOptions.find(
                          (candidate) => outputOptionValue(candidate) === nextValue,
                        );
                        if (!option) return;
                        updateParameter(name, {
                          source: "componentOutput",
                          componentId: option.component.id,
                          outputId: option.output.id,
                        });
                      }}
                      options={outputOptions.map((option) => ({ value: outputOptionValue(option), label: labelForOutput(option) }))}
                    />
                    <ScalarSelect
                      label={`Output field for ${name}`}
                      value={binding.field ?? ""}
                      disabled={selectedOutput?.output.type !== "dateRange"}
                      onChange={(field) =>
                        updateParameter(name, {
                          source: "componentOutput",
                          componentId: binding.componentId,
                          outputId: binding.outputId,
                          ...(field
                            ? {
                                field: field as
                                  | "start"
                                  | "end"
                                  | "preset"
                                  | "timezone",
                              }
                            : {}),
                        })
                      }
                      options={["", "start", "end", "preset", "timezone"].map((field) => ({ value: field, label: field || "Whole value" }))}
                    />
                    <button
                      type="button"
                      onClick={() => removeParameter(name)}
                      className="rounded-md p-1.5 text-ui-placeholder transition hover:bg-ui-danger-subtle hover:text-ui-danger"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ) : binding.source === "pageFilter" ? (
                  <div className="grid grid-cols-[minmax(0,1fr)_150px_32px] gap-2">
                    <ScalarSelect
                      label={`Page filter for ${name}`}
                      value={binding.filterId || ""}
                      onChange={(filterId) =>
                        updateParameter(name, {
                          source: "pageFilter",
                          filterId,
                        })
                      }
                      options={[
                        { value: "", label: "Select page filter..." },
                        ...pageFilters.map((filter) => ({ value: filter.id, label: (filter.label || "").trim() || filter.key })),
                      ]}
                    />
                    <ScalarSelect
                      label={`Page filter field for ${name}`}
                      value={binding.field ?? ""}
                      disabled={pageFilterFieldOptions.length === 0}
                      onChange={(field) =>
                        updateParameter(name, {
                          source: "pageFilter",
                          filterId: binding.filterId,
                          ...(field
                            ? {
                                field: field as
                                  | "value"
                                  | "month"
                                  | "year"
                                  | "start"
                                  | "end"
                                  | "preset"
                                  | "timezone",
                              }
                            : {}),
                        })
                      }
                      options={[
                        { value: "", label: "Whole value" },
                        ...pageFilterFieldOptions.map((field) => ({ value: field, label: field })),
                      ]}
                    />
                    <button
                      type="button"
                      onClick={() => removeParameter(name)}
                      className="rounded-md p-1.5 text-ui-placeholder transition hover:bg-ui-danger-subtle hover:text-ui-danger"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-[minmax(0,1fr)_32px] gap-2">
                    <Input
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
                      className="text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeParameter(name)}
                      className="rounded-md p-1.5 text-ui-placeholder transition hover:bg-ui-danger-subtle hover:text-ui-danger"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}

                <div className="rounded bg-ui-surface-subtle px-2 py-1 text-[11px] text-ui-muted">
                  Preview:{" "}
                  {binding.source === "componentOutput"
                    ? formatBindingLabel(page, binding)
                    : binding.source === "pageFilter"
                      ? formatBindingLabel(page, binding)
                    : "static"}
                </div>
                {parameterIssues.map((issue) => (
                  <div key={issue.message} className="text-xs text-ui-danger">
                    {issue.message}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-start gap-2 border-t border-ui-border pt-3">
        <label className="flex-1 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ui-muted">
            Add request parameter name
          </span>
          <Input
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
            className="w-full text-xs"
          />
          <span className={customParameterError ? "block text-[11px] text-ui-danger" : "block text-[11px] text-ui-muted"}>
            {customParameterError || "Use letters, numbers, and underscores. Start with a letter or underscore."}
          </span>
        </label>
        <button
          type="button"
          onClick={addParameter}
          disabled={!trimmedCustomParameter || Boolean(customParameterError)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-ui-ink-hover px-3 py-1.5 text-xs font-medium text-white transition hover:bg-ui-ink-hover disabled:cursor-not-allowed disabled:bg-ui-border-strong"
        >
          <FiPlus size={13} />
          Add
        </button>
      </div>

      <div className="text-[11px] text-ui-muted">
        Editing component id: <span className="font-mono">{componentId}</span>
      </div>
    </div>
  );
};

export default ParameterBindingsEditor;
