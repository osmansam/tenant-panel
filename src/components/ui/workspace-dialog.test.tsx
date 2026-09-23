// @vitest-environment jsdom
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WorkspaceDialog } from "./workspace-dialog";

describe("WorkspaceDialog", () => {
  it("does not render while closed", () => {
    render(
      <WorkspaceDialog open={false} onClose={vi.fn()} title="Manage stock">
        Body
      </WorkspaceDialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("provides an accessible name and closes with Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <WorkspaceDialog open onClose={onClose} title="Manage stock">
        Body
      </WorkspaceDialog>,
    );

    expect(
      screen.getByRole("dialog", { name: "Manage stock" }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes from the close button and backdrop", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <WorkspaceDialog open onClose={onClose} title="Manage stock">
        Body
      </WorkspaceDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    await user.click(screen.getByTestId("workspace-dialog-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("restores focus to the control that opened it", async () => {
    const user = userEvent.setup();

    const Harness = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Edit stock
          </button>
          <WorkspaceDialog
            open={open}
            onClose={() => setOpen(false)}
            title="Manage stock"
          >
            Body
          </WorkspaceDialog>
        </>
      );
    };

    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Edit stock" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Close dialog" }));

    expect(trigger).toHaveFocus();
  });
});
