import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  surface?: "plain" | "outlined";
}

export function Section({
  surface = "plain",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-5",
        surface === "outlined" && "rounded-ui-lg border border-ui-border bg-ui-surface p-5 sm:p-6",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function SectionHeader({
  title,
  description,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-ui-foreground">{title}</h2>
        {description && <div className="mt-1 text-sm text-ui-muted">{description}</div>}
      </div>
      {actions}
    </div>
  );
}
