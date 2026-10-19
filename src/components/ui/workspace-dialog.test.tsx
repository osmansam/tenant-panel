// @vitest-environment jsdom
import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
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

  it("closes only the top dialog with Escape", async () => {
    const user = userEvent.setup();
    const closeParent = vi.fn();
    const closeNested = vi.fn();

    render(
      <>
        <WorkspaceDialog open onClose={closeParent} title="Manage stock">
          Parent
        </WorkspaceDialog>
        <WorkspaceDialog
          open
          onClose={closeNested}
          title="Edit field: quantity"
          layer="nested"
        >
          Nested
        </WorkspaceDialog>
      </>,
    );

    await user.keyboard("{Escape}");

    expect(closeNested).toHaveBeenCalledTimes(1);
    expect(closeParent).not.toHaveBeenCalled();
  });

  it("keeps Tab and Shift+Tab within the active dialog", async () => {
    const user = userEvent.setup();
    render(<><button>Outside</button><WorkspaceDialog open onClose={vi.fn()} title="Edit project"><input aria-label="Project name" /><button>Save project</button></WorkspaceDialog></>);
    const close = screen.getByRole("button", { name: "Close dialog" });
    await waitFor(() => expect(close).toHaveFocus());
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Save project" })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
  });

  it("makes the page behind a dialog inert and restores it on close", () => {
    const { rerender } = render(<><main><button>Page action</button></main><WorkspaceDialog open onClose={vi.fn()} title="Edit project">Content</WorkspaceDialog></>);
    expect(screen.getByRole("main").closest("[inert]")).not.toBeNull();
    rerender(<><main><button>Page action</button></main><WorkspaceDialog open={false} onClose={vi.fn()} title="Edit project">Content</WorkspaceDialog></>);
    expect(screen.getByRole("main").closest("[inert]")).toBeNull();
  });


  it("keeps the top dialog interactive when parent and child mount together", () => {
    const close = vi.fn();
    const { rerender } = render(<><main>Workspace</main><WorkspaceDialog open onClose={close} title="Parent">Parent content</WorkspaceDialog><WorkspaceDialog open layer="nested" onClose={close} title="Nested">Nested content</WorkspaceDialog></>);
    const parent = screen.getByRole("dialog", { name: "Parent" });
    const nested = screen.getByRole("dialog", { name: "Nested" });
    expect(nested.closest("[inert]")).toBeNull();
    expect(parent.closest("[inert]")).not.toBeNull();
    rerender(<><main>Workspace</main><WorkspaceDialog open onClose={close} title="Parent">Parent content</WorkspaceDialog><WorkspaceDialog open={false} layer="nested" onClose={close} title="Nested">Nested content</WorkspaceDialog></>);
    expect(screen.getByRole("dialog", { name: "Parent" }).closest("[inert]")).toBeNull();
    expect(screen.getByRole("main").closest("[inert]")).not.toBeNull();
  });

});
