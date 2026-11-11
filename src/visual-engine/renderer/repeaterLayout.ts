import type { CSSProperties } from "react";
import type { Breakpoint, RepeaterItemsLayout } from "../model";

export function repeaterGridStyle(layout: RepeaterItemsLayout, breakpoint?: Breakpoint): CSSProperties {
  return {
    "--ve-items-cols-mobile": layout.columns.mobile,
    "--ve-items-cols-tablet": layout.columns.tablet,
    "--ve-items-cols-desktop": layout.columns.desktop,
    "--ve-items-gap-mobile": `${layout.gap.mobile}px`,
    "--ve-items-gap-tablet": `${layout.gap.tablet}px`,
    "--ve-items-gap-desktop": `${layout.gap.desktop}px`,
    justifyItems: layout.alignment,
    alignItems: "start",
    ...(breakpoint ? { gridTemplateColumns: `repeat(${layout.columns[breakpoint]}, minmax(0, 1fr))`, gap: `${layout.gap[breakpoint]}px` } : {}),
  } as CSSProperties;
}
