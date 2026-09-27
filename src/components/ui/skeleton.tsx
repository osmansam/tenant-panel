import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-ui-md bg-ui-surface-subtle",
        className,
      )}
      {...props}
    />
  );
}
