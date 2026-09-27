import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-[hsl(var(--ui-neutral-subtle))] text-ui-muted",
  info: "bg-[hsl(var(--ui-info-subtle))] text-[hsl(var(--ui-info))]",
  success: "bg-[hsl(var(--ui-success-subtle))] text-ui-success",
  warning: "bg-[hsl(var(--ui-warning-subtle))] text-[hsl(var(--ui-warning))]",
  danger: "bg-ui-danger-subtle text-ui-danger",
};

export function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      data-variant={variant}
      className={cn(
        "inline-flex min-h-5 max-w-full items-center rounded-ui-sm px-2 py-0.5 text-xs font-medium leading-4",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
