import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ActionBarAlign = "start" | "between" | "end";

export interface ResponsiveActionBarProps extends HTMLAttributes<HTMLDivElement> {
  align?: ActionBarAlign;
}

const alignClasses: Record<ActionBarAlign, string> = {
  start: "justify-start",
  between: "justify-between",
  end: "justify-end",
};

export function ResponsiveActionBar({
  align = "end",
  className,
  children,
  ...props
}: ResponsiveActionBarProps) {
  return (
    <div
      role="group"
      data-layout="wrapping-actions"
      data-align={align}
      className={cn("flex flex-wrap items-center gap-2", alignClasses[align], className)}
      {...props}
    >
      {children}
    </div>
  );
}
