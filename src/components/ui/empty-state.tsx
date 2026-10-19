import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  const accessibleName = typeof title === "string" ? title : undefined;

  return (
    <div
      role="status"
      aria-label={accessibleName}
      className={cn(
        "flex min-h-44 flex-col items-center justify-center px-5 py-10 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div
          className="mb-4 flex size-12 items-center justify-center rounded-full border border-ui-border bg-ui-surface-subtle text-ui-muted shadow-ui-sm"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="text-[15px] font-semibold tracking-tight text-ui-foreground">{title}</h3>
      {description && <div className="mt-1.5 max-w-md text-sm leading-6 text-ui-muted">{description}</div>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
