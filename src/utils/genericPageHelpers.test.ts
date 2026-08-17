import { describe, expect, it } from "vitest";
import * as helpers from "./genericPageHelpers";

type Presentation = {
  className: string;
  style: Record<string, unknown>;
};

const resolve = (row: Record<string, unknown>, className: string) =>
  (
    helpers as unknown as {
      resolveRowClassPresentation?: (
        row: Record<string, unknown>,
        className: string,
      ) => Presentation;
    }
  ).resolveRowClassPresentation?.(row, className);

describe("row-aware cell class presentation", () => {
  it("uses a complete class stored in a top-level row value", () => {
    expect(resolve({ backgroundClass: "bg-red-500" }, "{{backgroundClass}}"))
      .toEqual({ className: "bg-red-500", style: {} });
  });

  it("turns a raw runtime arbitrary background color into an inline style", () => {
    expect(
      resolve(
        { backgroundColor: "#ff0000" },
        "text-white bg-[{{backgroundColor}}] font-semibold",
      ),
    ).toEqual({
      className: "text-white font-semibold",
      style: { backgroundColor: "#ff0000" },
    });
  });

  it("removes missing and non-scalar row values", () => {
    expect(
      resolve(
        { objectValue: { color: "red" }, arrayValue: ["bg-red-500"] },
        "p-2 {{missing}} {{objectValue}} {{arrayValue}}",
      ),
    ).toEqual({ className: "p-2", style: {} });
  });

  it("interpolates only classes from matched rules and preserves fallback rules", () => {
    expect(
      helpers.getMatchingRowClassNames(
        { _id: "1", status: "active", activeClass: "text-green-700" },
        [
          { condition: "status = active", className: "{{activeClass}}" },
          { condition: "", className: "text-gray-500" },
        ],
      ),
    ).toBe("text-green-700");

    expect(
      helpers.getMatchingRowClassNames(
        { _id: "2", status: "inactive" },
        [
          { condition: "status = active", className: "text-green-700" },
          { condition: "", className: "text-gray-500" },
        ],
      ),
    ).toBe("text-gray-500");
  });
});
