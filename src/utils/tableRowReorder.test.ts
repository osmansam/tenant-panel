import { describe, expect, it } from "vitest";
import {
  reorderCurrentPageRows,
  resolveTableDragState,
} from "./tableRowReorder";

const rows = Array.from({ length: 50 }, (_, index) => ({
  _id: String(index + 1),
  order: index + 1,
}));

describe("reorderCurrentPageRows", () => {
  it("enables configured dragging and rejects conflicting sorts", () => {
    expect(
      resolveTableDragState(
        { enabled: true, orderField: "order" },
        "",
        undefined,
      ),
    ).toEqual({ enabled: true, orderField: "order", defaultSort: "order" });
    expect(
      resolveTableDragState(
        { enabled: true, orderField: "order" },
        "name",
        undefined,
      ),
    ).toEqual({ enabled: false, orderField: "order" });
  });

  it("moves order 30 to 10 and shifts the intervening range", () => {
    const result = reorderCurrentPageRows(
      rows,
      rows[29],
      rows[9],
      "order",
      1,
    );

    expect(result.rows.map((row) => row._id).slice(9, 12)).toEqual([
      "30",
      "10",
      "11",
    ]);
    expect(result.rows.map((row) => row.order)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1),
    );
    expect(result.updates).toHaveLength(21);
  });

  it("moves upward and downward using the target position", () => {
    const downward = reorderCurrentPageRows(
      rows.slice(0, 5),
      rows[1],
      rows[4],
      "order",
      1,
    );
    expect(downward.rows.map((row) => row._id)).toEqual([
      "1",
      "3",
      "4",
      "5",
      "2",
    ]);
    expect(downward.updates).toHaveLength(4);
  });

  it("normalizes missing and non-contiguous values from a page offset", () => {
    const pageRows = [
      { _id: "a", rank: 10 },
      { _id: "b" },
      { _id: "c", rank: 30 },
    ];
    const result = reorderCurrentPageRows(
      pageRows,
      pageRows[2],
      pageRows[0],
      "rank",
      51,
    );

    expect(result.rows).toEqual([
      { _id: "c", rank: 51 },
      { _id: "a", rank: 52 },
      { _id: "b", rank: 53 },
    ]);
    expect(result.updates).toHaveLength(3);
  });

  it("does nothing for self drops or missing identities", () => {
    expect(
      reorderCurrentPageRows(rows, rows[0], rows[0], "order", 1).updates,
    ).toEqual([]);
    expect(
      reorderCurrentPageRows(
        rows,
        { _id: "missing", order: 4 },
        rows[0],
        "order",
        1,
      ).updates,
    ).toEqual([]);
  });
});
