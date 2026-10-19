import { describe, expect, it } from "vitest";
import { createUrlSlug } from "./urlSlug";

describe("workspace URL identifiers", () => {
  it.each([
    [" Customer Success! ", "customer-success"],
    ["Şamil İstanbul Ofisi", "samil-istanbul-ofisi"],
    ["Café & Design", "cafe-design"],
    ["---North---Star---", "north-star"],
    ["🚀", ""],
  ])("makes a readable URL from %s", (input, expected) => {
    expect(createUrlSlug(input)).toBe(expected);
  });
});
