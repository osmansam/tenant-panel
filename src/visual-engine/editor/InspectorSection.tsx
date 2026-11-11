"use client";

import { createContext, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { isSafeCustomLength } from "../model/styles";
import { ChevronIcon } from "./icons";
import { humanizeToken } from "./tokenLabels";

/* ---------- Inspector tools (filter + collapse/expand all) ---------- */

export type InspectorCategory = "all" | "content" | "design" | "advanced";

export interface InspectorTools {
  category?: InspectorCategory;
  /** Section filter query. Empty string disables filtering. */
  query: string;
  /** Bump to collapse every open section. */
  collapseSignal: number;
  /** Bump to expand every section. */
  expandSignal: number;
}

export const InspectorToolsContext = createContext<InspectorTools>({ query: "", collapseSignal: 0, expandSignal: 0 });

/* ---------- Section ---------- */

export interface InspectorSectionProps {
  title: string;
  category?: Exclude<InspectorCategory, "all">;
  /** Overrides the category default (content opens, design and advanced collapse). */
  defaultOpen?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}

const InspectorHierarchyContext = createContext<{ category?: Exclude<InspectorCategory, "all">; ancestorMatch: boolean }>({ ancestorMatch: false });

function sectionCategory(title: string): Exclude<InspectorCategory, "all"> {
  if (/animation|responsive|data|binding|preview|effects|scroll story|scroll scene/i.test(title)) return "advanced";
  if (/layout|spacing|color|paint|typography|border|shadow|sizing|alignment|position|transform|divider length/i.test(title)) return "design";
  return "content";
}

/** Ordinary editing starts with the content visible; style and power controls wait collapsed. */
function categoryDefaultOpen(category: Exclude<InspectorCategory, "all">): boolean {
  return category === "content";
}

export function InspectorSection({ title, category, defaultOpen, actions, children }: InspectorSectionProps) {
  const tools = useContext(InspectorToolsContext);
  const hierarchy = useContext(InspectorHierarchyContext);
  const resolvedCategory = category ?? hierarchy.category ?? sectionCategory(title);
  const sectionRef = useRef<HTMLElement>(null);
  const bodyId = useId();
  const [searchText, setSearchText] = useState(title.toLowerCase());
  // Read the mounted subtree, including nested sections and accessible field labels.
  // Filtering never removes editors, so draft values survive a tab/search change.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const labels = Array.from(section.querySelectorAll("[aria-label]")).map(element => element.getAttribute("aria-label"));
    setSearchText(`${section.textContent ?? ""} ${labels.join(" ")}`.toLowerCase());
  });
  const [ownOpen, setOwnOpen] = useState(defaultOpen ?? categoryDefaultOpen(resolvedCategory));
  const lastCollapse = useRef(tools.collapseSignal);
  const lastExpand = useRef(tools.expandSignal);

  useEffect(() => {
    if (tools.collapseSignal !== lastCollapse.current) {
      lastCollapse.current = tools.collapseSignal;
      setOwnOpen(false);
    }
    if (tools.expandSignal !== lastExpand.current) {
      lastExpand.current = tools.expandSignal;
      setOwnOpen(true);
    }
  }, [tools.collapseSignal, tools.expandSignal]);

  const query = tools.query.trim().toLowerCase();
  const ownMatch = query !== "" && title.toLowerCase().includes(query);
  const matches = query ? hierarchy.ancestorMatch || ownMatch || searchText.includes(query) : tools.category === undefined || tools.category === "all" || tools.category === resolvedCategory;
  const open = query ? matches : ownOpen;

  return (
    <section ref={sectionRef} className="vb-inspector__section" data-category={resolvedCategory} aria-label={`${title} properties`} hidden={matches ? undefined : true}>
      <div className="vb-inspector__section-head">
        <button type="button" className="vb-inspector__section-toggle" aria-expanded={open} aria-controls={bodyId} onClick={() => setOwnOpen((current) => !current)}>
          <ChevronIcon open={open} size={12} />
          <span>{title}</span>
        </button>
        {actions !== undefined ? <div className="vb-inspector__section-actions">{actions}</div> : null}
      </div>
      <div id={bodyId} className="vb-inspector__section-body" hidden={!open}>
        <InspectorHierarchyContext.Provider value={{ category: resolvedCategory, ancestorMatch: hierarchy.ancestorMatch || ownMatch }}>{children}</InspectorHierarchyContext.Provider>
      </div>
    </section>
  );
}

/* ---------- Field chrome ---------- */

interface FieldProps {
  label: string;
  compact?: boolean;
  stacked?: boolean;
  children: ReactNode;
}

export function InspectorField({ label, compact, stacked, children }: FieldProps) {
  const className = [
    "vb-field",
    compact ? "vb-field--compact" : "",
    stacked ? "vb-field--stacked" : "",
  ].filter(Boolean).join(" ");

  return (
    <label className={className}>
      <span className="vb-field__label" title={label}>{label}</span>
      {children}
    </label>
  );
}

/* ---------- Controls ---------- */

interface ControlBase {
  /** Visible label. */
  label: string;
  /** Accessible name when it should differ from the visible label. */
  ariaLabel?: string;
  /** Compact 1-line label mode for 2-column grids. */
  compact?: boolean;
  /** Stacked label mode. */
  stacked?: boolean;
}

export interface InspectorInputProps extends ControlBase {
  value: string;
  onChange(value: string): void;
}

export function InspectorInput({ label, ariaLabel, compact, stacked, value, onChange }: InspectorInputProps) {
  return (
    <InspectorField label={label} compact={compact} stacked={stacked}>
      <input className="vb-field__control" aria-label={ariaLabel ?? label} value={value} onChange={(event) => onChange(event.target.value)} />
    </InspectorField>
  );
}

export function InspectorTextarea({ label, ariaLabel, compact, stacked, value, onChange }: InspectorInputProps) {
  return (
    <InspectorField label={label} compact={compact} stacked={stacked ?? true}>
      <textarea className="vb-field__control" aria-label={ariaLabel ?? label} rows={10} value={value} onChange={(event) => onChange(event.target.value)} />
    </InspectorField>
  );
}

const LENGTH_UNITS = ["px", "rem", "em", "%", "vh", "vw", "vmin", "vmax", "ch"] as const;
type LengthUnit = typeof LENGTH_UNITS[number];

function parseLengthValue(raw: string): { num: string; unit: LengthUnit } | null {
  const match = raw.trim().match(/^(-?\d*\.?\d+)(px|rem|em|%|vh|vw|vmin|vmax|ch)$/i);
  if (!match) return null;
  return { num: match[1], unit: match[2].toLowerCase() as LengthUnit };
}

export function InspectorLengthInput({ label, ariaLabel, compact, stacked, value, onChange }: ControlBase & { value?: string; onChange(value: string | undefined): void }) {
  const parsed = useMemo(() => value ? parseLengthValue(value) : null, [value]);

  // Structured mode: number + unit
  const [num, setNum] = useState(parsed?.num ?? "");
  const [unit, setUnit] = useState<LengthUnit>(parsed?.unit ?? "px");

  // Free-text fallback draft (for values we can't parse, e.g. calc())
  const [freeDraft, setFreeDraft] = useState(!parsed && value ? value : "");

  // Keep structured state in sync with external value changes
  const prevValue = useRef(value);
  useEffect(() => {
    if (prevValue.current === value) return;
    prevValue.current = value;
    const p = value ? parseLengthValue(value) : null;
    if (p) {
      setNum(p.num);
      setUnit(p.unit);
      setFreeDraft("");
    } else {
      setNum("");
      setFreeDraft(value ?? "");
    }
  }, [value]);

  const emitStructured = (nextNum: string, nextUnit: LengthUnit) => {
    if (nextNum === "" || nextNum === "-") {
      onChange(undefined);
    } else {
      const composed = `${nextNum}${nextUnit}`;
      if (isSafeCustomLength(composed)) onChange(composed);
    }
  };

  const handleNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setNum(next);
    emitStructured(next, unit);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as LengthUnit;
    setUnit(next);
    emitStructured(num, next);
  };

  const handleNumKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const step = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
      const current = parseFloat(num) || 0;
      const next = event.key === "ArrowUp" ? current + step : current - step;
      const rounded = parseFloat(next.toFixed(3)).toString();
      setNum(rounded);
      emitStructured(rounded, unit);
    }
  };

  const handleClear = () => {
    setNum("");
    setFreeDraft("");
    onChange(undefined);
  };

  // Use free-text mode only when there's an existing value we can't parse
  const isFreeText = freeDraft !== "";
  const freeDraftValid = freeDraft === "" || isSafeCustomLength(freeDraft);

  return (
    <InspectorField label={label} compact={compact} stacked={stacked}>
      {isFreeText ? (
        <div className="vb-length-free">
          <input
            className="vb-field__control"
            aria-label={ariaLabel ?? label}
            value={freeDraft}
            aria-invalid={!freeDraftValid || undefined}
            onChange={(event) => {
              const next = event.target.value;
              setFreeDraft(next);
              if (next === "") { onChange(undefined); setFreeDraft(""); }
              else if (isSafeCustomLength(next)) onChange(next.trim());
            }}
          />
          <button type="button" className="vb-length-clear" aria-label="Clear" onClick={handleClear} title="Clear">✕</button>
          {!freeDraftValid ? <small role="status" className="vb-length-hint">Use px, rem, em, %, vh, vw, vmin, vmax, or ch.</small> : null}
        </div>
      ) : (
        <div className={`vb-length${num !== "" ? " vb-length--active" : ""}`}>
          <div className="vb-length__pill">
            <input
              className="vb-length__num"
              type="text"
              inputMode="decimal"
              aria-label={ariaLabel ?? label}
              value={num}
              placeholder="0"
              onChange={handleNumChange}
              onKeyDown={handleNumKeyDown}
            />
            {num !== "" ? (
              <button type="button" className="vb-length__clear-btn" aria-label="Clear" onClick={handleClear} title="Clear value">
                ✕
              </button>
            ) : null}
            <div className="vb-length__unit-wrap">
              <select
                className="vb-length__unit-select"
                aria-label={`${ariaLabel ?? label} unit`}
                value={unit}
                onChange={handleUnitChange}
              >
                {LENGTH_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}
    </InspectorField>
  );
}

export interface InspectorNumberProps extends ControlBase {
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange(value: number): void;
}

export function InspectorNumber({ label, ariaLabel, compact, stacked, value, min, max, step = 1, unit, onChange }: InspectorNumberProps) {
  return (
    <InspectorField label={label} compact={compact} stacked={stacked}>
      <span className="vb-field__number">
        <input
          className="vb-field__control"
          type="number"
          inputMode="numeric"
          aria-label={ariaLabel ?? label}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            onChange(Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min);
          }}
        />
        {unit !== undefined ? <span className="vb-field__unit" aria-hidden="true">{unit}</span> : null}
      </span>
    </InspectorField>
  );
}

export interface InspectorOption {
  value: string;
  label: string;
}

export interface InspectorSelectProps extends ControlBase {
  value: string;
  options: readonly (string | InspectorOption)[];
  onChange(value: string): void;
}

export function InspectorSelect({ label, ariaLabel, compact, stacked, value, options, onChange }: InspectorSelectProps) {
  return (
    <InspectorField label={label} compact={compact} stacked={stacked}>
      <select className="vb-field__control" aria-label={ariaLabel ?? label} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => {
          const resolved = typeof option === "string" ? { value: option, label: humanizeToken(option) } : option;
          return <option key={resolved.value} value={resolved.value}>{resolved.label}</option>;
        })}
      </select>
    </InspectorField>
  );
}

export interface InspectorTokenSelectProps extends ControlBase {
  value: string | undefined;
  tokens: readonly string[];
  /** Optional token → CSS colour/gradient map; shows a swatch for the current value. */
  swatches?: Record<string, string>;
  onChange(value: string): void;
}

/** Token picker: stored values stay raw; labels are humanised for display only. */
export function InspectorTokenSelect({ label, ariaLabel, compact, stacked, value, tokens, swatches, onChange }: InspectorTokenSelectProps) {
  const swatch = swatches !== undefined && value !== undefined ? swatches[value] : undefined;
  return (
    <InspectorField label={label} compact={compact} stacked={stacked}>
      <span className={`vb-field__token${swatches !== undefined ? " vb-field__token--swatch" : ""}`}>
        {swatches !== undefined ? (
          <span
            className={`vb-swatch${swatch === undefined ? " vb-swatch--empty" : ""}`}
            style={swatch === undefined ? undefined : { background: swatch }}
            aria-hidden="true"
          />
        ) : null}
        <select className="vb-field__control" aria-label={ariaLabel ?? label} value={value ?? ""} onChange={(event) => onChange(event.target.value)}>
          <option value="">Default</option>
          {tokens.map((token) => <option key={token} value={token}>{humanizeToken(token)}</option>)}
        </select>
      </span>
    </InspectorField>
  );
}

export interface InspectorCheckboxProps extends ControlBase {
  checked: boolean;
  onChange(checked: boolean): void;
}

export function InspectorCheckbox({ label, ariaLabel, compact, stacked, checked, onChange }: InspectorCheckboxProps) {
  return (
    <label className={`vb-field vb-field--check${compact ? " vb-field--compact" : ""}${stacked ? " vb-field--stacked" : ""}`}>
      <input type="checkbox" aria-label={ariaLabel ?? label} checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export interface InspectorButtonRowProps {
  upDisabled?: boolean;
  downDisabled?: boolean;
  removeDisabled?: boolean;
  onUp(): void;
  onDown(): void;
  onRemove(): void;
  onAdd(): void;
}

/** Row of Up / Down / Remove / Add ordering and collection controls shared by item editors. */
export function InspectorButtonRow({ upDisabled, downDisabled, removeDisabled, onUp, onDown, onRemove, onAdd }: InspectorButtonRowProps) {
  return (
    <div className="flex gap-1">
      <button type="button" className="vb-button" aria-label="Move up" disabled={upDisabled} onClick={onUp}>Up</button>
      <button type="button" className="vb-button" aria-label="Move down" disabled={downDisabled} onClick={onDown}>Down</button>
      <button type="button" className="vb-button" aria-label="Remove" disabled={removeDisabled} onClick={onRemove}>Remove</button>
      <button type="button" className="vb-button" aria-label="Add" onClick={onAdd}>Add</button>
    </div>
  );
}
