import { BindingKind } from "../types/page";

export type TableDataMode = "paginated" | "all";

export const resolveTableDataMode = (value: unknown): TableDataMode =>
  value === "all" ? "all" : "paginated";

export const shouldUseAllItemsTable = (
  kind: BindingKind | undefined,
  value: unknown,
): boolean => kind === "schema" && resolveTableDataMode(value) === "all";

export const resolveTableComponentMode = (
  kind: BindingKind | undefined,
  value: unknown,
): "paginated" | "unpaginated" =>
  shouldUseAllItemsTable(kind, value) ? "unpaginated" : "paginated";
