import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ToolbarProps = HTMLAttributes<HTMLDivElement>;

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <div
      role="toolbar"
      className={cn(
        "flex flex-wrap items-center gap-2 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
