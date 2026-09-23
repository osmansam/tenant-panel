import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      aria-invalid={invalid || undefined}
      className={cn(
        "ui-focus-ring size-4 shrink-0 cursor-pointer rounded-ui-sm border-ui-border text-ui-primary accent-ui-primary disabled:cursor-not-allowed disabled:opacity-60",
        invalid && "ring-1 ring-ui-danger",
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";
