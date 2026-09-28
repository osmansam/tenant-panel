import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "mono"
  | "method-get"
  | "method-post"
  | "method-put"
  | "method-patch"
  | "method-delete";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-[hsl(var(--ui-neutral-subtle))] text-ui-muted border-transparent",
  info: "bg-[hsl(var(--ui-info-subtle))] text-[hsl(var(--ui-info))] border-transparent",
  success: "bg-[hsl(var(--ui-success-subtle))] text-ui-success border-transparent",
  warning: "bg-[hsl(var(--ui-warning-subtle))] text-[hsl(var(--ui-warning))] border-transparent",
  danger: "bg-ui-danger-subtle text-ui-danger border-transparent",
  outline: "bg-ui-surface text-ui-foreground border-ui-border",
  mono: "font-mono bg-ui-surface-subtle text-ui-foreground border-ui-border",
  "method-get": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25 font-mono font-semibold",
  "method-post": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/25 font-mono font-semibold",
  "method-put": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25 font-mono font-semibold",
  "method-patch": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25 font-mono font-semibold",
  "method-delete": "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25 font-mono font-semibold",
};

export function Badge({
  variant = "neutral",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-variant={variant}
      className={cn(
        "inline-flex max-w-full items-center border font-medium leading-none select-none tracking-tight",
        size === "sm" ? "min-h-5 rounded-ui-sm px-2 py-0.5 text-xs" : "min-h-6 rounded-ui-md px-2.5 py-1 text-xs",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
