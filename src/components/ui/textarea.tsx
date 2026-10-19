import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import type { ControlSize } from "./input";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  controlSize?: ControlSize;
}

const minimumHeightClasses: Record<ControlSize, string> = {
  sm: "min-h-20",
  md: "min-h-24",
  lg: "min-h-28",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, controlSize = "md", invalid = false, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      data-control-size={controlSize}
      className={cn(
        "ui-control h-auto resize-y py-2",
        minimumHeightClasses[controlSize],
        invalid && "ui-control-invalid",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
