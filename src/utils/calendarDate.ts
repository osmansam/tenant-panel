import { format, isValid, parse } from "date-fns";

export function parseCalendarDate(value: string, pattern: "MM/dd/yyyy" | "yyyy-MM-dd"): Date | undefined {
  const parsed = parse(value, pattern, new Date(2000, 0, 1));
  return isValid(parsed) && format(parsed, pattern) === value ? parsed : undefined;
}
