import { describe, expect, it } from "vitest";
import { getContainerDetailsContentClass } from "./containerDetailsModalLayout";

describe("container details modal content layout", () => {
  it.each(["routes", "permissions"])(
    "makes the %s view vertically scrollable within its fixed height",
    (viewMode) => {
      expect(getContainerDetailsContentClass(viewMode)).toBe(
        "h-[70vh] overflow-y-auto",
      );
    },
  );

  it("keeps non-management views bounded and scrollable", () => {
    expect(getContainerDetailsContentClass("json")).toBe(
      "max-h-[70vh] overflow-y-auto",
    );
  });
});
