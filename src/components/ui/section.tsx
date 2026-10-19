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
        "py-6",
        surface === "outlined" &&
          "rounded-ui-xl border border-ui-border bg-ui-surface p-5 shadow-ui-card sm:p-6",
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
        "mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-tight text-ui-foreground">{title}</h2>
        {description && <div className="mt-1 text-sm leading-6 text-ui-muted">{description}</div>}
      </div>
      {actions}
    </div>
  );
}
