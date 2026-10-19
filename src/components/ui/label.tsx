import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-[13px] font-medium tracking-tight text-ui-foreground", className)}
    {...props}
  />
));
Label.displayName = "Label";
