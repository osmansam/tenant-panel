import { describe, expect, it } from "vitest";
import type { ComponentBlock, TabPanelTab } from "../types/page";
import {
  canAddTabChild,
  removeTabChild,
  saveSingleTabChild,
} from "./tabChildComponents";

const table = { id: "table-1", type: "table" } as ComponentBlock;
const matrix = {
  id: "matrix-1",
  type: "relationMatrix",
} as ComponentBlock;
const emptyTab = (): TabPanelTab => ({ id: "tab-1", title: "Products", components: [] });

describe("single tab child operations", () => {
  it("accepts either supported component in an empty tab", () => {
    expect(saveSingleTabChild(emptyTab(), table).components).toEqual([table]);
    expect(saveSingleTabChild(emptyTab(), matrix).components).toEqual([matrix]);
  });

  it("does not append another component to a populated tab", () => {
    const populated = { ...emptyTab(), components: [table] };
    expect(canAddTabChild(populated)).toBe(false);
    expect(saveSingleTabChild(populated, matrix)).toEqual(populated);
  });

  it("replaces an edited child and restores empty state on removal", () => {
    const populated = { ...emptyTab(), components: [table] };
    expect(saveSingleTabChild(populated, matrix, "table-1").components).toEqual([matrix]);
    expect(removeTabChild(populated, "table-1").components).toEqual([]);
  });
});
