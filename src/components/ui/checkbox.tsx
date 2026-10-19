import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import type { ControlSize } from "./input";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
  controlSize?: ControlSize;
}

const checkboxSizeClasses: Record<ControlSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, controlSize = "md", invalid = false, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      aria-invalid={invalid || undefined}
      data-control-size={controlSize}
      className={cn(
        "ui-focus-ring shrink-0 cursor-pointer rounded-ui-sm border-ui-border text-ui-primary accent-ui-primary disabled:cursor-not-allowed disabled:opacity-60",
        checkboxSizeClasses[controlSize],
        invalid && "ring-1 ring-ui-danger",
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";
