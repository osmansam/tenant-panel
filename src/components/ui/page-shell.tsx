import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type PageShellWidth = "content" | "wide" | "workspace";

export interface PageShellProps extends HTMLAttributes<HTMLElement> {
  width?: PageShellWidth;
}

const widthClasses: Record<PageShellWidth, string> = {
  content: "max-w-5xl",
  wide: "max-w-[1400px]",
  workspace: "max-w-none",
};

export function PageShell({
  width = "wide",
  className,
  children,
  ...props
}: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto min-h-full w-full px-4 py-5 font-ui sm:px-6 sm:py-6 lg:px-8",
        widthClasses[width],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  context?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  context,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-ui-border pb-5 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-ui-foreground">
          {title}
        </h1>
        {description && <div className="mt-1 text-sm text-ui-muted">{description}</div>}
        {context && <div className="mt-2 flex flex-wrap items-center gap-2">{context}</div>}
      </div>
      {actions}
    </header>
  );
}

export type PageActionsProps = HTMLAttributes<HTMLDivElement>;

export function PageActions({ className, children, ...props }: PageActionsProps) {
  return (
    <div
      role="group"
      className={cn("flex shrink-0 flex-wrap items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
