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
    "border-transparent bg-ui-ink text-[hsl(var(--ui-ink-foreground))] shadow-ui-button hover:bg-ui-ink-hover active:bg-ui-ink-active",
  secondary:
    "border-transparent bg-ui-surface-subtle text-ui-foreground hover:bg-ui-neutral-subtle active:bg-ui-disabled",
  outline:
    "border-ui-border bg-ui-surface text-ui-foreground shadow-ui-sm hover:border-ui-border-hover hover:bg-ui-surface-subtle active:bg-ui-disabled",
  ghost:
    "border-transparent bg-transparent text-ui-foreground hover:bg-ui-surface-subtle active:bg-ui-disabled",
  destructive:
    "border-transparent bg-ui-danger text-white shadow-ui-button hover:bg-[hsl(var(--ui-danger-hover))] active:bg-[hsl(var(--ui-danger-active))]",
  success:
    "border-transparent bg-ui-success text-white shadow-ui-button hover:bg-[hsl(var(--ui-success-hover))] active:bg-[hsl(var(--ui-success-active))]",
  warning:
    "border-transparent bg-[hsl(var(--ui-warning))] text-white shadow-ui-button hover:bg-[hsl(var(--ui-warning-hover))] active:bg-[hsl(var(--ui-warning-active))]",
  icon:
    "border-transparent bg-transparent text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground active:bg-ui-disabled",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-ui-sm rounded-ui-md px-3 text-[13px] gap-1.5",
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
        "ui-focus-ring relative inline-flex items-center justify-center border font-medium tracking-tight select-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
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
