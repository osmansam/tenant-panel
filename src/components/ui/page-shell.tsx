import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type PageShellWidth = "content" | "wide" | "workspace";

export interface PageShellProps extends HTMLAttributes<HTMLElement> {
  width?: PageShellWidth;
}

const widthClasses: Record<PageShellWidth, string> = {
  content: "max-w-5xl",
  wide: "max-w-[1440px]",
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
        "mx-auto min-h-full w-full px-5 py-6 font-ui sm:px-8 sm:py-8 lg:px-10",
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
  contextClassName?: string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  context,
  contextClassName,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 border-b border-ui-border/80 pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <h1 className="break-words text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-ui-foreground sm:text-[32px] [overflow-wrap:anywhere]">
          {title}
        </h1>
        {description && (
          <div className="mt-2 max-w-2xl text-[15px] leading-6 text-ui-muted">
            {description}
          </div>
        )}
        {context && (
          <div className={cn("mt-3 flex flex-wrap items-center gap-2", contextClassName)}>
            {context}
          </div>
        )}
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
