// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import CellSizingEditor from "./CellSizingEditor";
import { visualComponent } from "./testFixtures";
it("saves fill per placement and discards cancelled drafts", async () => {
 const save = vi.fn().mockResolvedValue(undefined);
 render(<CellSizingEditor component={visualComponent} disabled={false} onSave={save} />);
 const open = () => userEvent.click(screen.getByRole("button", { name: "Cell sizing" }));
 await open();
 await userEvent.click(screen.getByRole("combobox", { name: "Visual component size" }));
 await userEvent.click(screen.getByRole("option", { name: "Fill page cell" }));
 await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
 await open(); expect(screen.getByText("Design size")).toBeInTheDocument();
 await userEvent.click(screen.getByRole("combobox", { name: "Visual component size" }));
 await userEvent.click(screen.getByRole("option", { name: "Fill page cell" }));
 await userEvent.click(screen.getByRole("button", { name: "Save sizing" }));
 await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
 expect(save).toHaveBeenCalledTimes(1); expect(save).toHaveBeenCalledWith("fill");
});
it("locks unsaved design changes and keeps failed saves available for retry", async () => {
 const save = vi.fn().mockRejectedValue(new Error("Newer page copy exists"));
 const view = render(<CellSizingEditor component={visualComponent} disabled onSave={save} />);
 await userEvent.click(screen.getByRole("button", { name: "Cell sizing" }));
 expect(screen.getByLabelText("Visual component size")).toBeDisabled();
 expect(screen.getByRole("button", { name: "Save sizing" })).toBeDisabled();
 await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
 view.rerender(<CellSizingEditor component={{ ...visualComponent, props: { ...visualComponent.props, visualCellSizing: "fill" } }} disabled={false} onSave={save} />);
 await userEvent.click(screen.getByRole("button", { name: "Cell sizing" }));
 await userEvent.click(screen.getByRole("combobox", { name: "Visual component size" }));
 await userEvent.click(screen.getByRole("option", { name: "Design size" }));
 await userEvent.click(screen.getByRole("button", { name: "Save sizing" }));
 expect(await screen.findByRole("alert")).toHaveTextContent("Newer page copy exists");
 expect(screen.getByRole("dialog")).toBeInTheDocument();
 expect(save).toHaveBeenCalledWith("natural");
});
