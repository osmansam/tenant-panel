// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getIconByName } from "./menuIcons";

describe("named menu icons", () => {
  it("renders requested icons from a deferred icon family", async () => {
    const Activity = getIconByName("FiActivity");
    const { container } = render(<Activity title="Activity" className="test-icon" />);
    await waitFor(() => expect(container.querySelector("polyline")).toHaveAttribute("points", "22 12 18 12 15 21 9 3 6 12 2 12"));
    expect(screen.getByTitle("Activity").parentElement).toHaveClass("test-icon");
  });
  it("uses the dashboard fallback for empty or unsupported icon names", () => {
    expect(getIconByName("")).toBe(getIconByName("MissingIcon"));
  });
});
