import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiInbox,
  FiSearch,
} from "react-icons/fi";
import { cn } from "../../../utils/cn";
import { Input } from "../../ui";
import type { ColumnType, FilterType, RowKeyType } from "../shared/types";

export type DataTableProps<T> = {
  rows: T[];
  columns: ColumnType[];
  rowKeys: RowKeyType<T>[];
  filters?: FilterType[];
  title?: string;
  isSearch?: boolean;
  searchPlaceholder?: string;
  rowsPerPage?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

type SortState = { columnIndex: number; direction: "asc" | "desc" } | null;

const readRowValue = <T,>(row: T, key: string): unknown =>
  (row as Record<string, unknown>)[key];

const compareValues = (a: unknown, b: unknown): number => {
  if (a === b) return 0;
  if (a === null || a === undefined || a === "") return 1;
  if (b === null || b === undefined || b === "") return -1;
  if (typeof a === "boolean" && typeof b === "boolean") {
    return a === b ? 0 : a ? 1 : -1;
  }
  if (typeof a === "number" && typeof b === "number") return a - b;
  const aText = String(a);
  const bText = String(b);
  const aNumber = Number(aText);
  const bNumber = Number(bText);
  if (Number.isFinite(aNumber) && Number.isFinite(bNumber)) {
    return aNumber - bNumber;
  }
  return aText.localeCompare(bText, undefined, { sensitivity: "base" });
};

const defaultCell = (value: unknown): ReactNode => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-ui-placeholder">—</span>;
  }
  if (typeof value === "boolean") {
    return value ? "True" : "False";
  }
  return String(value);
};

const DataTable = <T,>({
  rows,
  columns,
  rowKeys,
  filters,
  title,
  isSearch = true,
  searchPlaceholder,
  rowsPerPage = 8,
  emptyTitle,
  emptyDescription,
  className,
}: DataTableProps<T>) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortState, setSortState] = useState<SortState>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      rowKeys.some((rowKey) => {
        const value = readRowValue(row, rowKey.key);
        if (value === null || value === undefined) return false;
        if (Array.isArray(value)) {
          return value.some((item) =>
            String(item).toLowerCase().includes(query),
          );
        }
        return String(value).toLowerCase().includes(query);
      }),
    );
  }, [rows, rowKeys, searchQuery]);

  const sortedRows = useMemo(() => {
    if (!sortState) return filteredRows;
    const sortKey =
      columns[sortState.columnIndex]?.correspondingKey ??
      rowKeys[sortState.columnIndex]?.key;
    if (!sortKey) return filteredRows;
    const sorted = [...filteredRows].sort((a, b) =>
      compareValues(readRowValue(a, sortKey), readRowValue(b, sortKey)),
    );
    return sortState.direction === "asc" ? sorted : sorted.reverse();
  }, [filteredRows, sortState, columns, rowKeys]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const visibleRows = useMemo(
    () =>
      sortedRows.slice(
        (activePage - 1) * rowsPerPage,
        activePage * rowsPerPage,
      ),
    [sortedRows, activePage, rowsPerPage],
  );
  const rangeStart = sortedRows.length === 0 ? 0 : (activePage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(activePage * rowsPerPage, sortedRows.length);

  const toggleSort = (columnIndex: number) => {
    setCurrentPage(1);
    setSortState((previous) => {
      if (previous?.columnIndex === columnIndex) {
        return {
          columnIndex,
          direction: previous.direction === "asc" ? "desc" : "asc",
        };
      }
      return { columnIndex, direction: "asc" };
    });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasVisibleFilters = Boolean(
    filters?.some((filter) => !filter.isDisabled),
  );
  const hasColumns = columns.length > 0;
  const showToolbar = Boolean(title) || isSearch || hasVisibleFilters;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-ui-xl border border-ui-border bg-ui-surface shadow-ui-card",
        className,
      )}
    >
      {showToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ui-border px-5 py-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3">
            {title && (
              <span className="truncate text-sm font-semibold text-ui-foreground">
                {title}
              </span>
            )}
            {filters
              ?.filter((filter) => !filter.isDisabled)
              .map((filter, index) => (
                <div
                  key={filter.label ?? index}
                  className="flex items-center gap-2"
                >
                  {filter.label && (
                    <span className="whitespace-nowrap text-xs font-medium text-ui-muted">
                      {filter.label}
                    </span>
                  )}
                  {filter.node}
                </div>
              ))}
          </div>
          {isSearch && (
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ui-placeholder" />
              <Input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder ?? t("Search")}
                className="w-56 pl-9"
              />
            </div>
          )}
        </div>
      )}

      {hasColumns && sortedRows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-ui-border bg-ui-surface-subtle/80">
                {columns.map((column, columnIndex) => {
                  const isActive = sortState?.columnIndex === columnIndex;
                  return (
                    <th
                      key={`${column.key}-${columnIndex}`}
                      className={cn(
                        "whitespace-nowrap px-5 py-3 text-left",
                        column.className,
                      )}
                    >
                      <div className="flex flex-col items-start gap-1.5">
                        {column.isSortable ? (
                          <button
                            type="button"
                            onClick={() => toggleSort(columnIndex)}
                            className={cn(
                              "group inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
                              isActive
                                ? "text-ui-foreground"
                                : "text-ui-muted hover:text-ui-foreground",
                            )}
                          >
                            <span>{column.label ?? column.key}</span>
                            {isActive ? (
                              sortState.direction === "asc" ? (
                                <FiChevronUp className="h-3 w-3" />
                              ) : (
                                <FiChevronDown className="h-3 w-3" />
                              )
                            ) : (
                              <FiChevronDown className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-40" />
                            )}
                          </button>
                        ) : (
                          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ui-muted">
                            {column.label ?? column.key}
                          </span>
                        )}
                        {column.headerNode && (
                          <div className="flex items-center text-ui-foreground">
                            {column.headerNode}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-ui-border/70">
              {visibleRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition-colors hover:bg-ui-surface-subtle/70"
                >
                  {rowKeys.map((rowKey) => (
                    <td
                      key={rowKey.key}
                      className={cn(
                        "px-5 py-3.5 align-middle text-ui-muted",
                        typeof rowKey.className === "string"
                          ? rowKey.className
                          : undefined,
                      )}
                      style={
                        typeof rowKey.style === "function"
                          ? rowKey.style(row)
                          : rowKey.style
                      }
                    >
                      {rowKey.node
                        ? rowKey.node(row)
                        : defaultCell(readRowValue(row, rowKey.key))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ui-surface-muted text-ui-muted">
            <FiInbox className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-ui-foreground">
            {emptyTitle ??
              (hasColumns ? t("No matching records") : t("No records to display"))}
          </p>
          <p className="text-xs text-ui-muted">
            {emptyDescription ??
              (hasColumns
                ? t("Try a different search term.")
                : t("There is nothing here yet."))}
          </p>
        </div>
      )}

      {sortedRows.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ui-border px-5 py-3">
          <div className="text-xs text-ui-muted">
            {t("Showing")}{" "}
            <span className="font-medium tabular-nums text-ui-foreground">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            {t("of")}{" "}
            <span className="font-medium tabular-nums text-ui-foreground">
              {sortedRows.length.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={t("Previous page")}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={activePage <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-ui-md border border-ui-border bg-ui-surface text-ui-muted transition hover:border-ui-border-hover hover:bg-ui-surface-subtle hover:text-ui-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={page === activePage ? "page" : undefined}
                className={cn(
                  "flex h-8 min-w-8 items-center justify-center rounded-ui-md px-2 text-xs font-medium tabular-nums transition",
                  page === activePage
                    ? "bg-ui-ink text-white"
                    : "text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground",
                )}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              aria-label={t("Next page")}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={activePage >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-ui-md border border-ui-border bg-ui-surface text-ui-muted transition hover:border-ui-border-hover hover:bg-ui-surface-subtle hover:text-ui-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
