"use client";

import type { Breakpoint } from "../model";

const BREAKPOINTS = [
  { value: "mobile", label: "Mobile preview", name: "Mobile", width: "390px" },
  { value: "tablet", label: "Tablet preview", name: "Tablet", width: "768px" },
  {
    value: "desktop",
    label: "Desktop preview",
    name: "Desktop",
    width: "1280px",
  },
] as const satisfies readonly {
  value: Breakpoint;
  label: string;
  name: string;
  width: string;
}[];

export interface BreakpointSwitcherProps {
  value: Breakpoint;
  onChange(breakpoint: Breakpoint): void;
}

export function BreakpointSwitcher({
  value,
  onChange,
}: BreakpointSwitcherProps) {
  const active = BREAKPOINTS.find((breakpoint) => breakpoint.value === value);

  return (
    <div className="vb-viewport">
      <div
        className="vb-segmented flex flex-row gap-4 "
        role="group"
        aria-label="Preview breakpoint"
      >
        {BREAKPOINTS.map((breakpoint) => (
          <button
            key={breakpoint.value}
            type="button"
            className="vb-segmented__option"
            aria-label={breakpoint.label}
            aria-pressed={value === breakpoint.value}
            title={`${breakpoint.name} · ${breakpoint.width}`}
            onClick={() => onChange(breakpoint.value)}
          >
            {breakpoint.name}
          </button>
        ))}
      </div>
      <span className="vb-viewport__width" aria-hidden="true">
        {active?.width}
      </span>
    </div>
  );
}
