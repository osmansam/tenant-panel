import { describe, expect, it } from "vitest";
import { resolveTableActionFormLayout } from "./tableActionFormLayout";

describe("resolveTableActionFormLayout", () => {
  it("preserves the caller defaults when an action has no layout settings", () => {
    expect(
      resolveTableActionFormLayout(undefined, {
        topClassName: "flex flex-col gap-2",
        generalClassName: "overflow-visible",
      }),
    ).toEqual({
      topClassName: "flex flex-col gap-2",
      generalClassName: "overflow-visible",
    });
  });

  it("resolves a responsive column preset and visible overflow", () => {
    expect(
      resolveTableActionFormLayout({
        formLayout: { columns: 3, allowOverflow: true },
      }),
    ).toEqual({
      topClassName: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
      generalClassName: "overflow-visible",
    });
  });

  it("appends advanced classes to the selected preset", () => {
    expect(
      resolveTableActionFormLayout({
        formLayout: {
          columns: 2,
          topClassName: "items-start",
          generalClassName: "w-full",
        },
      }),
    ).toEqual({
      topClassName: "grid grid-cols-1 md:grid-cols-2 gap-4 items-start",
      generalClassName: "w-full",
    });
  });

  it("can explicitly disable a caller's visible-overflow default", () => {
    expect(
      resolveTableActionFormLayout(
        { formLayout: { allowOverflow: false } },
        {
          topClassName: "flex flex-col gap-2",
          generalClassName: "overflow-visible",
        },
      ),
    ).toEqual({
      topClassName: "flex flex-col gap-2",
      generalClassName: undefined,
    });
  });
});
