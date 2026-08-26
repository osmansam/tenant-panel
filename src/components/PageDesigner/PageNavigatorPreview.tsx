import { FiChevronRight, FiExternalLink, FiHome, FiMoreHorizontal } from "react-icons/fi";
import type { ResolvedPageNavigatorItem } from "./pageNavigatorResolver";

export function PageNavigatorPreview({ items }: { items: ResolvedPageNavigatorItem[] }) {
  const compact = items.length > 4
    ? [items[0], { id: "ellipsis", label: "More", current: false, external: false, openInNewTab: false }, ...items.slice(-2)]
    : items;
  return (
    <div className="space-y-3">
      <nav aria-label="Breadcrumb preview" className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
        <ol className="flex min-w-0 items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.id} className="flex min-w-0 items-center gap-2">
              {index > 0 && <FiChevronRight aria-hidden className="shrink-0 text-neutral-300" />}
              <span className={item.current ? "truncate font-semibold text-neutral-900" : "truncate font-medium text-violet-700"}>
                {index === 0 && <FiHome className="mr-1.5 inline" aria-hidden />}
                {item.label}
                {item.external && <FiExternalLink className="ml-1 inline" aria-hidden />}
              </span>
            </li>
          ))}
        </ol>
      </nav>
      <nav aria-label="Compact breadcrumb preview" className="max-w-md rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2">
        <ol className="flex min-w-0 items-center gap-1.5 text-xs">
          {compact.map((item, index) => (
            <li key={item.id} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && <FiChevronRight aria-hidden className="shrink-0 text-neutral-300" />}
              {item.id === "ellipsis" ? <FiMoreHorizontal aria-label="Collapsed items" /> : (
                <span className={item.current ? "truncate font-semibold text-neutral-900" : "truncate text-neutral-500"}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

