export type SelectFilterScalar = string | number | boolean;
export type SelectFilterValue =
 | { source: "literal"; value: SelectFilterScalar | SelectFilterScalar[] }
 | { source: "field"; fieldKey: string }
 | { source: "record"; fieldKey: string; path: string[] };
export interface SelectFilterBinding { id: string; field: string; operator: "eq" | "in"; value: SelectFilterValue }
