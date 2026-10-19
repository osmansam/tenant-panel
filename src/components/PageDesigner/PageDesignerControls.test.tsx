// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import type { PageNavigatorConfig } from "../../types/page";
import PageFilterModal from "./PageFilterModal";
import { PageNavigatorEditor } from "./PageNavigatorEditor";

describe("Page Designer shared controls", () => {
  it("keeps page-filter values while using shared inputs and selects", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <PageFilterModal
        filter={null}
        defaultCellId="cell-1"
        cells={[{ id: "cell-1", label: "Main cell" }]}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    const label = screen.getByRole("textbox", { name: "Label" });
    expect(label).toHaveAttribute("data-control-size", "md");
    await user.type(label, "Status");

    const type = screen.getByRole("combobox", { name: "Type" });
    expect(type.closest("[data-control-size]"))?.toHaveAttribute(
      "data-control-size",
      "md",
    );
    await user.click(type);
    await user.click(screen.getByRole("option", { name: "number" }));
    await user.click(screen.getByRole("button", { name: "Save filter" }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ label: "Status", type: "number" }),
    );
  });

  it("keeps navigator boolean and scalar updates through shared controls", async () => {
    const user = userEvent.setup();
    const Harness = () => {
      const [value, setValue] = useState<PageNavigatorConfig | undefined>();
      return (
        <PageNavigatorEditor
          value={value}
          pages={[]}
          currentPageId="page-1"
          onChange={setValue}
        />
      );
    };
    render(<Harness />);

    const enabled = screen.getByRole("checkbox", { name: "Disabled" });
    expect(enabled).toHaveAttribute("data-control-size", "md");
    await user.click(enabled);

    const mode = screen.getByRole("combobox", { name: "Mode" });
    expect(mode.closest("[data-control-size]"))?.toHaveAttribute(
      "data-control-size",
      "md",
    );
    await user.click(mode);
    await user.click(screen.getByRole("option", { name: "Custom trail" }));

    const homeLabel = screen.getByRole("textbox", { name: "Home label" });
    await user.clear(homeLabel);
    await user.type(homeLabel, "Dashboard");
    expect(homeLabel).toHaveValue("Dashboard");
  });
});
