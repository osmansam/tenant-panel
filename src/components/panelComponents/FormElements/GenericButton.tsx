import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

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
      className = "",
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    // Base styles - refined for modern look
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none active:scale-[0.98]";

    // Variant styles - inspired by Linear, Vercel, Apple
    const variantStyles: Record<GenericButtonVariant, string> = {
      primary:
        "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700 focus-visible:ring-neutral-900 shadow-sm border border-transparent",
      secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:ring-neutral-400 border border-transparent",
      danger:
        "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500 shadow-sm border border-transparent",
      success:
        "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-500 shadow-sm border border-transparent",
      warning:
        "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus-visible:ring-amber-500 shadow-sm border border-transparent",
      ghost:
        "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-400 border border-transparent",
      outline:
        "bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-400 border border-neutral-300 shadow-sm",
      black:
        "bg-black text-white hover:bg-neutral-900 active:bg-neutral-800 focus-visible:ring-neutral-900 shadow-sm border border-transparent",
      icon: "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 focus-visible:ring-neutral-400 p-0 border border-transparent",
      clear:
        "absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md p-1 border border-transparent",
    };

    // Size styles - pixel-perfect spacing
    const sizeStyles: Record<GenericButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm gap-1.5 rounded-lg h-8",
      md: "px-4 py-2 text-sm gap-2 rounded-lg h-9",
      lg: "px-5 py-2.5 text-base gap-2.5 rounded-xl h-11",
    };

    // Width style
    const widthStyle = fullWidth ? "w-full" : "w-fit";

    // Combine all styles
    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${widthStyle}
      ${className}
    `.trim();

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
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
          <span className="inline-flex shrink-0 -ml-0.5" aria-hidden="true">
            {iconLeft}
          </span>
        )}

        {children && <span className="truncate">{children}</span>}

        {!isLoading && iconRight && (
          <span className="inline-flex shrink-0 -mr-0.5" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

GenericButton.displayName = "GenericButton";

export { GenericButton };
