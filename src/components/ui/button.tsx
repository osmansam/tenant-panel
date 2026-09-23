import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "icon";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-ui-primary text-white hover:bg-ui-primary-hover",
  secondary:
    "border-transparent bg-ui-surface-subtle text-ui-foreground hover:bg-ui-disabled",
  outline:
    "border-ui-border bg-ui-surface text-ui-foreground hover:border-ui-border-hover",
  ghost:
    "border-transparent bg-transparent text-ui-foreground hover:bg-ui-surface-subtle",
  destructive:
    "border-transparent bg-ui-danger text-white hover:bg-ui-danger/90",
  icon:
    "border-transparent bg-transparent text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-ui-sm rounded-ui-sm px-3 text-sm",
  md: "h-ui-md rounded-ui-md px-4 text-sm",
  lg: "h-ui-lg rounded-ui-md px-5 text-sm",
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
        "ui-focus-ring relative inline-flex items-center justify-center gap-2 border font-medium shadow-ui-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
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
      <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  ),
);
Button.displayName = "Button";
