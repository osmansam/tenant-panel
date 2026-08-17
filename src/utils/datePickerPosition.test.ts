import { describe, expect, it } from "vitest";
import { getDatePickerPopupPosition } from "./datePickerPosition";

describe("getDatePickerPopupPosition", () => {
  it("places the popup below the input when it fits", () => {
    expect(
      getDatePickerPopupPosition(
        { left: 100, top: 100, bottom: 140, width: 220 },
        { width: 1200, height: 900 },
      ),
    ).toEqual({ left: 100, top: 144 });
  });

  it("flips above and keeps the popup inside the viewport", () => {
    expect(
      getDatePickerPopupPosition(
        { left: 1100, top: 700, bottom: 740, width: 220 },
        { width: 1200, height: 760 },
      ),
    ).toEqual({ left: 872, top: 376 });
  });
});
