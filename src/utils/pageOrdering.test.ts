import { describe, expect, it } from "vitest";
import { buildPageOrderSwap, sortPagesForDisplay } from "./pageOrdering";

describe("page ordering", () => {
  const pages = [
    { id: "b", name: "B", order: 2 },
    { id: "a", name: "A", order: 1 },
    { id: "c", name: "C" },
  ];

  it("sorts pages by order with index fallback", () => {
    expect(sortPagesForDisplay(pages).map((page) => page.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("builds two update payloads when moving a page up", () => {
    expect(buildPageOrderSwap(sortPagesForDisplay(pages), 1, "up")).toEqual([
      { id: "b", order: 1 },
      { id: "a", order: 2 },
    ]);
  });

  it("does not move outside list bounds", () => {
    expect(buildPageOrderSwap(sortPagesForDisplay(pages), 0, "up")).toEqual([]);
    expect(buildPageOrderSwap(sortPagesForDisplay(pages), 2, "down")).toEqual([]);
  });
});
