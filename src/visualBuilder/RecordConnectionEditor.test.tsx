// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import RecordConnectionEditor from "./RecordConnectionEditor";
import { ComponentOutputsEditor } from "../components/PageDesigner/ComponentOutputsEditor";
import { samplePage, visualComponent } from "./testFixtures";
const connection = { source: "componentOutput" as const, componentId: "table", outputId: "selected" };
function connectedPage() {
 const page = samplePage(); page.sections[0].component!.title = "Customer table";
 page.sections[0].component!.outputs = [{ id: "selected", key: "selectedRecord", type: "record", source: { kind: "tableSelectedRecord" } }]; return page;
}
it("keeps optional connection controls out of the canvas and saves selected-record IDs from its dialog", async () => {
 const page = samplePage(), table = page.sections[0].component!; table.title = "Customer table";
 const onChange = vi.fn();
 const view = render(<ComponentOutputsEditor page={page} component={table} onChange={onChange} />);
 await userEvent.click(screen.getByRole("button", { name: "Expose selected record" }));
 const updated = onChange.mock.calls[0][0]; expect(updated.outputs[0]).toMatchObject({ type: "record", source: { kind: "tableSelectedRecord" } });
 page.sections[0].component = updated; view.unmount();
 const save = vi.fn().mockResolvedValue(undefined);
 render(<RecordConnectionEditor page={page} component={visualComponent} disabled={false} onSave={save} />);
 expect(screen.queryByRole("combobox")).toBeNull(); expect(screen.queryByText(/Expose/)).toBeNull();
 await userEvent.click(screen.getByRole("button", { name: "Data connection" }));
 expect(screen.getByRole("dialog", { name: "Data connection" })).toBeInTheDocument();
 await userEvent.click(screen.getByRole("combobox", { name: "Selected record source" }));
 await userEvent.click(screen.getByRole("option", { name: /Customer table/ }));
 await userEvent.click(screen.getByRole("button", { name: "Save connection" }));
 await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
 expect(save).toHaveBeenCalledWith({ source: "componentOutput", componentId: table.id, outputId: updated.outputs[0].id });
});
it("allows viewing settings with unsaved design changes, but prevents saving the connection", async () => {
 render(<RecordConnectionEditor page={samplePage()} component={visualComponent} disabled onSave={vi.fn()} />);
 await userEvent.click(screen.getByRole("button", { name: "Data connection" }));
 expect(screen.getByLabelText("Selected record source")).toBeDisabled();
 expect(screen.getByRole("button", { name: "Save connection" })).toBeDisabled();
 await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
 expect(screen.queryByRole("dialog")).toBeNull();
});
it("discards a draft on cancel and disconnects an existing table or malformed item binding", async () => {
 const save = vi.fn().mockResolvedValue(undefined), page = connectedPage();
 const view = render(<RecordConnectionEditor page={page} component={visualComponent} disabled={false} onSave={save} />);
 await userEvent.click(screen.getByRole("button", { name: "Data connection" }));
 await userEvent.click(screen.getByRole("combobox")); await userEvent.click(screen.getByRole("option", { name: /Customer table/ }));
 await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
 await userEvent.click(screen.getByRole("button", { name: "Data connection" }));
 expect(screen.getByText("No connection")).toBeInTheDocument();
 await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
 view.rerender(<RecordConnectionEditor page={page} component={{ ...visualComponent, dataBinding: { kind: "schema", parameters: { item: { source: "static", value: "invalid" } } } }} disabled={false} onSave={save} />);
 await userEvent.click(screen.getByRole("button", { name: "Data connection" }));
 await userEvent.click(screen.getByRole("combobox")); await userEvent.click(screen.getByRole("option", { name: "No connection" }));
 await userEvent.click(screen.getByRole("button", { name: "Save connection" }));
 expect(save).toHaveBeenLastCalledWith(null);
});
it("keeps a failed connection save open with a local error and the draft intact", async () => {
 const save = vi.fn().mockRejectedValue(new Error("Connection could not be saved"));
 render(<RecordConnectionEditor page={connectedPage()} component={{ ...visualComponent, dataBinding: { kind: "schema", parameters: { item: connection } } }} disabled={false} onSave={save} />);
 await userEvent.click(screen.getByRole("button", { name: "Data connection" }));
 await userEvent.click(screen.getByRole("combobox")); await userEvent.click(screen.getByRole("option", { name: "No connection" }));
 await userEvent.click(screen.getByRole("button", { name: "Save connection" }));
 expect(await screen.findByRole("alert")).toHaveTextContent("Connection could not be saved");
 expect(screen.getByRole("dialog")).toBeInTheDocument(); expect(screen.getByText("No connection")).toBeInTheDocument();
});
