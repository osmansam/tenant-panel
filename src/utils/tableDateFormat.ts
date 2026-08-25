import type { TableDateFormat } from "../types/page";

export const DEFAULT_TABLE_DATE_FORMAT: TableDateFormat = "MM-DD-YYYY";

const calendarParts = (
  value: unknown,
): { year: string; month: string; day: string } | null => {
  if (typeof value === "string") {
    const iso = /^(\d{4})[-/](\d{2})[-/](\d{2})(?:$|T)/.exec(value.trim());
    if (iso) return { year: iso[1], month: iso[2], day: iso[3] };
  }
  const date = value instanceof Date ? value : new Date(value as string | number);
  if (Number.isNaN(date.getTime())) return null;
  return {
    year: String(date.getFullYear()).padStart(4, "0"),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
  };
};

export const formatTableDate = (
  value: unknown,
  format: TableDateFormat = DEFAULT_TABLE_DATE_FORMAT,
): string | null => {
  if (value === undefined || value === null || value === "") return null;
  const parts = calendarParts(value);
  if (!parts) return null;
  const { year, month, day } = parts;
  switch (format) {
    case "DD/MM/YYYY": return `${day}/${month}/${year}`;
    case "YYYY/MM/DD": return `${year}/${month}/${day}`;
    case "DD-MM-YYYY": return `${day}-${month}-${year}`;
    case "YYYY-MM-DD": return `${year}-${month}-${day}`;
    case "MM/DD/YYYY": return `${month}/${day}/${year}`;
    case "MM-DD-YYYY": return `${month}-${day}-${year}`;
  }
};
