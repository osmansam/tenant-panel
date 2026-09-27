// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageNavigatorEditor } from "./PageNavigatorEditor";

describe("PageNavigatorEditor layout", () => {
  it("uses a compact disabled state instead of a full promotional card", () => {
    render(
      <PageNavigatorEditor
        value={undefined}
        pages={[]}
        currentPageId="page-1"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("region", { name: "Breadcrumb navigation" })).toHaveAttribute(
      "data-density",
      "compact",
    );
    expect(screen.getByText("Breadcrumb navigation")).toBeInTheDocument();
    expect(screen.queryByText("Page header")).not.toBeInTheDocument();
  });
});
