import { expect, it } from "vitest";
import { parseCalendarDate } from "./calendarDate";
import { addDays, format } from "date-fns";

it.each(["02/29/2025", "02/30/2024", "2/1/2026", "13/01/2026", "", "2026-11-18"])("rejects invalid or incomplete displayed dates: %s", value => {
  expect(parseCalendarDate(value, "MM/dd/yyyy")).toBeUndefined();
});
it("parses leap days and serializes without UTC date shifts", () => {
  const date = parseCalendarDate("02/29/2024", "MM/dd/yyyy");
  expect(date).toBeInstanceOf(Date);
  expect(format(date!, "yyyy-MM-dd")).toBe("2024-02-29");
});
it("adds calendar days over month boundaries", () => {
  const date = parseCalendarDate("2026-03-08", "yyyy-MM-dd");
  expect(format(addDays(date!, 1), "yyyy-MM-dd")).toBe("2026-03-09");
});
