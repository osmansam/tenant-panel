import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "mono";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-transparent bg-[hsl(var(--ui-neutral-subtle))] text-ui-muted",
  info: "border-[hsl(var(--ui-info)/0.14)] bg-[hsl(var(--ui-info-subtle))] text-[hsl(var(--ui-info))]",
  success: "border-[hsl(var(--ui-success)/0.16)] bg-[hsl(var(--ui-success-subtle))] text-ui-success",
  warning: "border-[hsl(var(--ui-warning)/0.16)] bg-[hsl(var(--ui-warning-subtle))] text-[hsl(var(--ui-warning))]",
  danger: "border-[hsl(var(--ui-danger)/0.16)] bg-ui-danger-subtle text-ui-danger",
  outline: "border-ui-border bg-ui-surface text-ui-foreground shadow-ui-sm",
  mono: "border-ui-border bg-ui-surface-subtle font-mono text-ui-muted",
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
        "inline-flex max-w-full items-center gap-1 rounded-full border font-medium leading-none select-none tracking-tight",
        size === "sm" ? "min-h-[1.375rem] px-2.5 py-0.5 text-[11px]" : "min-h-6 px-3 py-1 text-xs",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
