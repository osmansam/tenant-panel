import { Skeleton } from "./skeleton";

export function ResourceLoading({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="divide-y divide-ui-border overflow-hidden rounded-ui-lg border border-ui-border bg-ui-surface">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((row) => <div key={row} aria-hidden="true" className="flex items-center gap-3 p-4"><Skeleton className="size-9 shrink-0" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-40 max-w-full" /><Skeleton className="h-3 w-2/3 max-w-xs" /></div></div>)}
    </div>
  );
}
