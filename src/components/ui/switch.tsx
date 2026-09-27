import { useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label: ReactNode;
  description?: ReactNode;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  description,
  className,
  ...props
}: SwitchProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const labelId = `switch-${id}-label`;
  const descriptionId = description ? `switch-${id}-description` : undefined;

  return (
    <div className={cn("flex min-w-0 items-start justify-between gap-4", className)} {...props}>
      <div className="min-w-0">
        <div id={labelId} className="text-sm font-medium text-ui-foreground">{label}</div>
        {description && <div id={descriptionId} className="mt-0.5 text-xs leading-5 text-ui-muted">{description}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative mt-0.5 inline-flex h-5 w-9 shrink-0 rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-ui-primary" : "bg-ui-border-strong",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none block h-4 w-4 translate-y-px rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[18px]" : "translate-x-px",
          )}
        />
      </button>
    </div>
  );
}
