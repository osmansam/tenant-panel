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

export interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md";

    // Variant styles
    const variantStyles: Record<GenericButtonVariant, string> = {
      primary:
        "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-300",
      secondary:
        "bg-gray-500 text-white hover:bg-gray-600 focus-visible:ring-gray-300",
      danger:
        "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300",
      success:
        "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-300",
      warning:
        "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-300",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300",
      outline:
        "bg-white text-blue-500 hover:bg-blue-50 focus-visible:ring-blue-300 border border-blue-500",
      black:
        "bg-black text-white hover:bg-white hover:text-black focus-visible:ring-gray-400",
      icon:
        "bg-transparent text-gray-500 hover:bg-gray-50 focus-visible:ring-gray-300 p-2",
      clear:
        "absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg focus-visible:ring-0 focus-visible:ring-offset-0",
    };

    // Size styles
    const sizeStyles: Record<GenericButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-2.5",
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
            className="animate-spin h-4 w-4"
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
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconLeft}
          </span>
        )}

        {children && <span>{children}</span>}

        {!isLoading && iconRight && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

GenericButton.displayName = "GenericButton";

export { GenericButton };
