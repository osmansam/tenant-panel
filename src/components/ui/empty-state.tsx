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
        "flex min-h-40 flex-col items-center justify-center px-4 py-8 text-center",
        className,
      )}
      {...props}
    >
      {icon && <div className="mb-3 text-ui-muted" aria-hidden="true">{icon}</div>}
      <h3 className="text-sm font-semibold text-ui-foreground">{title}</h3>
      {description && <div className="mt-1 max-w-md text-sm text-ui-muted">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
