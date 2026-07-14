import React, { useMemo, useState } from "react";
import type { PageFilterDefinition, RuntimeValueType } from "../../utils/api/page";
import { createRuntimeId } from "../../utils/pageBindings";

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-neutral-900">
          {filter ? "Edit Page Filter" : "Add Page Filter"}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          Page filters can be placed in this cell or in the page navbar, then bound to component request parameters.
        </p>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-medium text-neutral-700">
            Label
            <input
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Status"
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Key
            <input
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm font-mono"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              placeholder="status"
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Type
            <select
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              value={type}
              onChange={(event) => setType(event.target.value as RuntimeValueType)}
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Default mode
            <select
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              value={defaultMode}
              onChange={(event) => setDefaultMode(event.target.value as DefaultMode)}
            >
              <option value="none">No default</option>
              <option value="static">Static value</option>
              {(type === "date" || type === "monthYear" || type === "dateRange") && (
                <option value="preset">Preset</option>
              )}
            </select>
          </label>
          {defaultMode === "static" && (
            <label className="block text-sm font-medium text-neutral-700">
              Default value
              <input
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                type={type === "date" ? "date" : "text"}
                value={defaultValue}
                onChange={(event) => setDefaultValue(event.target.value)}
                placeholder="optional"
              />
            </label>
          )}
          {defaultMode === "preset" && (type === "date" || type === "monthYear" || type === "dateRange") && (
            <label className="block text-sm font-medium text-neutral-700">
              Default preset
              <select
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                value={effectiveDefaultPreset}
                onChange={(event) => setDefaultPreset(event.target.value as DefaultPreset)}
              >
                {presetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          )}
          {(type === "stringArray" || type === "numberArray") && (
            <label className="block text-sm font-medium text-neutral-700">
              Array request format
              <select
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                value={arraySerialization}
                onChange={(event) => setArraySerialization(event.target.value as "comma" | "repeat")}
              >
                <option value="comma">Comma separated: test=10,23</option>
                <option value="repeat">Repeated params: test=10&amp;test=23</option>
              </select>
            </label>
          )}
          <label className="block text-sm font-medium text-neutral-700">
            Placement
            <select
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              value={placementKind}
              onChange={(event) => setPlacementKind(event.target.value as "navbar" | "cell")}
            >
              <option value="cell">Cell</option>
              <option value="navbar">Navbar</option>
            </select>
          </label>
          {placementKind === "cell" && (
            <label className="block text-sm font-medium text-neutral-700">
              Cell
              <select
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                value={cellId}
                onChange={(event) => setCellId(event.target.value)}
              >
                {cells.map((cell) => (
                  <option key={cell.id} value={cell.id}>
                    {cell.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="rounded-lg px-4 py-2 text-sm text-neutral-700" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white"
            onClick={() =>
              onSave({
                id: filter?.id ?? createRuntimeId("pfl"),
                key: key.trim(),
                label: label.trim(),
                type,
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
