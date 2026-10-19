import React, { useId, useMemo, useRef, useState } from "react";
import { useModalFocus } from "../../hooks/useModalFocus";
import type { PageFilterDefinition, RuntimeValueType } from "../../utils/api/page";
import { createRuntimeId } from "../../utils/pageBindings";
import { Input, Select, type SelectOption } from "../ui";

type CellOption = { id: string; label: string };

type PageFilterModalProps = {
  filter: PageFilterDefinition | null;
  defaultCellId: string;
  cells: CellOption[];
  onClose: () => void;
  onSave: (filter: PageFilterDefinition) => void;
};

const TYPE_OPTIONS: RuntimeValueType[] = [
  "string",
  "number",
  "boolean",
  "date",
  "monthYear",
  "dateRange",
  "stringArray",
  "numberArray",
];

type StringOption = SelectOption<string>;
const optionsFromValues = (values: readonly string[]): StringOption[] =>
  values.map((value) => ({ value, label: value }));

const ScalarSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly StringOption[];
  onChange: (value: string) => void;
}) => (
  <Select<StringOption>
    value={options.find((option) => option.value === value) || null}
    options={options}
    onChange={(selected) => {
      const option = selected as StringOption | null;
      if (option) onChange(option.value);
    }}
    aria-label={label}
    className="mt-1"
  />
);

const dateInputValue = (value: unknown): string => {
  if (typeof value !== "string") return "";
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value);
  return match?.[1] ?? "";
};

type DefaultMode = "none" | "static" | "preset";
const DATE_PRESETS = ["today", "yesterday", "tomorrow"] as const;
const MONTH_YEAR_PRESETS = ["currentMonthYear"] as const;
const DATE_RANGE_PRESETS = [
  "today",
  "yesterday",
  "thisWeek",
  "lastWeek",
  "thisMonth",
  "lastMonth",
  "thisYear",
  "lastYear",
] as const;
type DefaultPreset =
  | (typeof DATE_PRESETS)[number]
  | (typeof MONTH_YEAR_PRESETS)[number]
  | (typeof DATE_RANGE_PRESETS)[number];

export const PageFilterModal: React.FC<PageFilterModalProps> = ({
  filter,
  defaultCellId,
  cells,
  onClose,
  onSave,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useModalFocus(dialogRef, true, onClose);
  const [language, setLanguage] = useState(filter?.language ?? "en");
  const [key, setKey] = useState(filter?.key ?? "filter");
  const [label, setLabel] = useState(filter?.label ?? "");
  const [type, setType] = useState<RuntimeValueType>(filter?.type ?? "string");
  const [arraySerialization, setArraySerialization] = useState<"comma" | "repeat">(
    filter?.arraySerialization ?? "comma",
  );
  const [defaultMode, setDefaultMode] = useState<DefaultMode>(
    filter?.defaultPreset
      ? "preset"
      : filter && Object.prototype.hasOwnProperty.call(filter, "defaultValue")
        ? "static"
        : "none",
  );
  const [defaultPreset, setDefaultPreset] = useState<DefaultPreset>(
    filter?.defaultPreset ?? (filter?.type === "monthYear" ? "currentMonthYear" : "today"),
  );
  const [placementKind, setPlacementKind] = useState<"navbar" | "cell">(
    filter?.placement.kind ?? "cell",
  );
  const [cellId, setCellId] = useState(filter?.placement.cellId ?? defaultCellId);
  const [defaultValue, setDefaultValue] = useState(
    filter?.type === "date"
      ? dateInputValue(filter.defaultValue)
      : Array.isArray(filter?.defaultValue)
      ? filter.defaultValue.join(", ")
      : String(filter?.defaultValue ?? ""),
  );

  const normalizedDefaultValue = useMemo(() => {
    if (defaultMode !== "static") return undefined;
    if (!defaultValue.trim()) return undefined;
    if (type === "number") return Number(defaultValue);
    if (type === "boolean") return defaultValue === "true";
    if (type === "date") return `${defaultValue}T00:00:00.000Z`;
    if (type === "stringArray") {
      return defaultValue.split(",").map((value) => value.trim()).filter(Boolean);
    }
    if (type === "numberArray") {
      return defaultValue
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value));
    }
    return defaultValue;
  }, [defaultMode, defaultValue, type]);
  const presetOptions =
    type === "date"
      ? DATE_PRESETS
      : type === "monthYear"
        ? MONTH_YEAR_PRESETS
        : type === "dateRange"
          ? DATE_RANGE_PRESETS
          : [];
  const effectiveDefaultPreset = (
    (presetOptions as readonly string[]).includes(defaultPreset)
      ? defaultPreset
      : presetOptions[0]
  ) as DefaultPreset;

  return (
    <div data-modal-layer="110" className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-ui-lg border border-ui-border bg-ui-surface p-6 text-ui-foreground shadow-ui-dialog">
        <h3 id={titleId} className="text-lg font-semibold text-ui-foreground">
          {filter ? "Edit Page Filter" : "Add Page Filter"}
        </h3>
        <p className="mt-1 text-sm text-ui-muted">
          Page filters can be placed in this cell or in the page navbar, then bound to component request parameters.
        </p>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-medium text-ui-foreground">
            Label
            <Input
              className="mt-1 w-full"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Status"
            />
          </label>
          <label className="block text-sm font-medium text-ui-foreground">
            Key
            <Input
              className="mt-1 w-full font-mono"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              placeholder="status"
            />
          </label>
          <label className="block text-sm font-medium text-ui-foreground">
            Type
            <ScalarSelect
              label="Type"
              value={type}
              options={optionsFromValues(TYPE_OPTIONS)}
              onChange={(next) => setType(next as RuntimeValueType)}
            />
          </label>
          {type === "monthYear" && (
            <label className="block text-sm font-medium text-ui-foreground">
              Language
              <ScalarSelect
                label="Language"
                value={language}
                options={[
                  { value: "tr", label: "Türkçe" },
                  { value: "en", label: "English" },
                ]}
                onChange={setLanguage}
              />
            </label>
          )}
          <label className="block text-sm font-medium text-ui-foreground">
            Default mode
            <ScalarSelect
              label="Default mode"
              value={defaultMode}
              options={[
                { value: "none", label: "No default" },
                { value: "static", label: "Static value" },
                ...((type === "date" || type === "monthYear" || type === "dateRange")
                  ? [{ value: "preset", label: "Preset" }]
                  : []),
              ]}
              onChange={(next) => setDefaultMode(next as DefaultMode)}
            />
          </label>
          {defaultMode === "static" && (
            <label className="block text-sm font-medium text-ui-foreground">
              Default value
              <Input
                className="mt-1 w-full"
                type={type === "date" ? "date" : "text"}
                value={defaultValue}
                onChange={(event) => setDefaultValue(event.target.value)}
                placeholder="optional"
              />
            </label>
          )}
          {defaultMode === "preset" && (type === "date" || type === "monthYear" || type === "dateRange") && (
            <label className="block text-sm font-medium text-ui-foreground">
              Default preset
              <ScalarSelect
                label="Default preset"
                value={effectiveDefaultPreset}
                options={optionsFromValues(presetOptions)}
                onChange={(next) => setDefaultPreset(next as DefaultPreset)}
              />
            </label>
          )}
          {(type === "stringArray" || type === "numberArray") && (
            <label className="block text-sm font-medium text-ui-foreground">
              Array request format
              <ScalarSelect
                label="Array request format"
                value={arraySerialization}
                options={[
                  { value: "comma", label: "Comma separated: test=10,23" },
                  { value: "repeat", label: "Repeated params: test=10&test=23" },
                ]}
                onChange={(next) => setArraySerialization(next as "comma" | "repeat")}
              />
            </label>
          )}
          <label className="block text-sm font-medium text-ui-foreground">
            Placement
            <ScalarSelect
              label="Placement"
              value={placementKind}
              options={[
                { value: "cell", label: "Cell" },
                { value: "navbar", label: "Navbar" },
              ]}
              onChange={(next) => setPlacementKind(next as "navbar" | "cell")}
            />
          </label>
          {placementKind === "cell" && (
            <label className="block text-sm font-medium text-ui-foreground">
              Cell
              <ScalarSelect
                label="Cell"
                value={cellId}
                options={cells.map((cell) => ({ value: cell.id, label: cell.label }))}
                onChange={setCellId}
              />
            </label>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="rounded-lg px-4 py-2 text-sm text-ui-foreground" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-ui-ink px-4 py-2 text-sm font-medium text-white"
            onClick={() =>
              onSave({
                id: filter?.id ?? createRuntimeId("pfl"),
                key: key.trim(),
                label: label.trim(),
                type,
                ...(type === "monthYear" ? { language } : {}),
                ...(defaultMode === "static" && normalizedDefaultValue !== undefined
                  ? { defaultValue: normalizedDefaultValue }
                  : {}),
                ...(defaultMode === "preset" && (type === "date" || type === "monthYear" || type === "dateRange")
                  ? { defaultPreset: effectiveDefaultPreset }
                  : {}),
                ...((type === "stringArray" || type === "numberArray")
                  ? { arraySerialization }
                  : {}),
                placement:
                  placementKind === "navbar"
                    ? { kind: "navbar" }
                    : { kind: "cell", cellId },
              })
            }
          >
            Save filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageFilterModal;
