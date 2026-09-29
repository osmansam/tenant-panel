import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success"
  | "warning"
  | "icon";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-ui-primary text-[hsl(var(--ui-primary-foreground))] hover:bg-ui-primary-hover active:bg-[hsl(var(--ui-primary-active))] shadow-ui-sm",
  secondary:
    "border-transparent bg-ui-surface-subtle text-ui-foreground hover:bg-ui-disabled active:bg-ui-neutral-subtle",
  outline:
    "border-ui-border bg-ui-surface text-ui-foreground hover:bg-ui-surface-subtle hover:border-ui-border-hover shadow-sm",
  ghost:
    "border-transparent bg-transparent text-ui-foreground hover:bg-ui-surface-subtle",
  destructive:
    "border-transparent bg-ui-danger text-white hover:bg-[hsl(var(--ui-danger-hover))] active:bg-[hsl(var(--ui-danger-active))] shadow-ui-sm",
  success:
    "border-transparent bg-ui-success text-white hover:bg-[hsl(var(--ui-success-hover))] active:bg-[hsl(var(--ui-success-active))] shadow-ui-sm",
  warning:
    "border-transparent bg-[hsl(var(--ui-warning))] text-white hover:bg-[hsl(var(--ui-warning-hover))] active:bg-[hsl(var(--ui-warning-active))] shadow-ui-sm",
  icon:
    "border-transparent bg-transparent text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-ui-sm rounded-ui-sm px-3 text-sm gap-1.5",
  md: "h-ui-md rounded-ui-md px-4 text-sm gap-2",
  lg: "h-ui-lg rounded-ui-md px-5 text-sm gap-2.5",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "aspect-square p-0",
  md: "aspect-square p-0",
  lg: "aspect-square p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      loading = false,
      size = "md",
      variant = "primary",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(
        "ui-focus-ring relative inline-flex items-center justify-center border font-medium select-none transition-[background-color,border-color,color,box-shadow] duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        variant === "icon" && iconSizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="absolute size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}
      <span
        className={cn(
          "inline-flex min-w-0 max-w-full items-center gap-2",
          loading && "opacity-0",
        )}
      >
        {children}
      </span>
    </button>
  ),
);
Button.displayName = "Button";
