// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DOM test environment", () => {
  it("renders accessible React content", () => {
    render(<button type="button">Save</button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
