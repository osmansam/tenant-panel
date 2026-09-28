import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from "../../ui/button";
import { cn } from "../../../utils/cn";

export type GenericButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "ghost"
  | "outline"
  | "black"
  | "icon"
  | "clear";

export type GenericButtonSize = "sm" | "md" | "lg";

export interface GenericButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default "primary"
   */
  variant?: GenericButtonVariant;

  /**
   * Size of the button
   * @default "md"
   */
  size?: GenericButtonSize;

  /**
   * Loading state - shows spinner and disables button
   * @default false
   */
  isLoading?: boolean;

  /**
   * Icon to display before the button text
   */
  iconLeft?: ReactNode;

  /**
   * Icon to display after the button text
   */
  iconRight?: ReactNode;

  /**
   * Makes the button take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
  children?: ReactNode;
}

const sharedVariant: Record<GenericButtonVariant, ButtonVariant> = {
  primary: "primary",
  secondary: "secondary",
  danger: "destructive",
  success: "success",
  warning: "warning",
  ghost: "ghost",
  outline: "outline",
  black: "primary",
  icon: "icon",
  clear: "icon",
};

const contentGap: Record<GenericButtonSize, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

const GenericButton = forwardRef<HTMLButtonElement, GenericButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      className,
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const sharedSize: ButtonSize = variant === "clear" ? "sm" : size;

    return (
      <Button
        {...props}
        ref={ref}
        type={type}
        variant={sharedVariant[variant]}
        size={sharedSize}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(
          fullWidth
            ? "w-full"
            : variant !== "icon" && variant !== "clear" && "w-fit",
          variant === "clear" &&
            "absolute right-2 top-1/2 -translate-y-1/2 text-lg shadow-none",
          className,
        )}
      >
        <span className={cn("inline-flex min-w-0 items-center", contentGap[size])}>
          {isLoading && (
            <svg
              className="h-4 w-4 shrink-0 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          {!isLoading && iconLeft && (
            <span className="-ml-0.5 inline-flex shrink-0" aria-hidden="true">
              {iconLeft}
            </span>
          )}

          {children && <span className="truncate">{children}</span>}

          {!isLoading && iconRight && (
            <span className="-mr-0.5 inline-flex shrink-0" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </span>
      </Button>
    );
  },
);

GenericButton.displayName = "GenericButton";

export { GenericButton };
