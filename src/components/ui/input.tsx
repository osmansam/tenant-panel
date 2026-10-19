import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  controlSize?: ControlSize;
}

export type ControlSize = "sm" | "md" | "lg";

const controlSizeClasses: Record<ControlSize, string> = {
  sm: "h-ui-sm",
  md: "h-ui-md",
  lg: "h-ui-lg",
};

function inferInputControlSize(className?: string): ControlSize | undefined {
  if (!className) return undefined;
  const tokens = className.trim().split(/\s+/);
  if (
    tokens.some(
      (token) =>
        token === "h-8" ||
        token === "h-7" ||
        token === "h-ui-sm" ||
        token === "py-1" ||
        token === "py-1.5",
    )
  ) {
    return "sm";
  }
  if (tokens.some((token) => token === "h-12" || token === "h-ui-lg")) {
    return "lg";
  }
  return undefined;
}

const LEGACY_INPUT_CHROME_TOKEN =
  /^(?:ui-control|border(?:-(?:neutral|gray|slate|violet)-(?:200|300|400|500)|-transparent)?|rounded(?:-(?:md|lg|xl))?|bg-white|py-(?:1|1\.5|2|2\.5|3)|px-(?:3|3\.5)|focus:(?:outline-none|ring(?:-\d+)?|ring-[a-z0-9-]+|border-[a-z0-9-]+)|transition(?:-all|-colors)?)$/;

function sanitizeInputClassName(className?: string): string | undefined {
  if (!className) return undefined;
  const kept = className
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !LEGACY_INPUT_CHROME_TOKEN.test(token));
  return kept.length > 0 ? kept.join(" ") : undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, controlSize, invalid = false, type, ...props }, ref) => {
    const isChoice = type === "checkbox" || type === "radio";
    const isColor = type === "color";
    const resolvedSize: ControlSize =
      controlSize ?? (!isChoice && !isColor ? inferInputControlSize(className) : undefined) ?? "md";
    const normalizedClassName =
      isChoice || isColor ? className : sanitizeInputClassName(className);
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        data-control-size={resolvedSize}
        className={cn(
          isChoice
            ? "ui-focus-ring shrink-0 cursor-pointer border-ui-border text-ui-primary accent-ui-primary disabled:cursor-not-allowed disabled:opacity-60"
            : "ui-control",
          isChoice
            ? resolvedSize === "sm"
              ? "size-3.5"
              : resolvedSize === "lg"
                ? "size-5"
                : "size-4"
            : controlSizeClasses[resolvedSize],
          type === "checkbox" && "rounded-ui-sm",
          type === "radio" && "rounded-full",
          invalid && (isChoice ? "ring-1 ring-ui-danger" : "ui-control-invalid"),
          normalizedClassName,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
