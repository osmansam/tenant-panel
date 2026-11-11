// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import type { ComponentDocument } from "../visual-engine/model";
import { useVisualBuilder } from "../visual-engine/editor/useVisualBuilder";
import VisualActionTools from "./VisualActionTools";
const initial: ComponentDocument = { version: 2, id: "doc", name: "Cards", root: { id: "root", type: "section", children: [{ id: "list", type: "repeater", itemAlias: "item", source: { kind: "autotable", schemaName: "products", limit: 5 }, children: [{ id: "slot", type: "slot", name: "item", children: [{ id: "button", type: "button", label: "Edit", href: "/" }] }] }] } };
const schemas = [{ name: "products", fields: [{ name: "name", path: ["name"], type: "string" }, { name: "price", path: ["price"], type: "float" }] }];
function Editor() {
 const { state, actions } = useVisualBuilder({ initialDocument: initial, storageMode: "external" });
 return <><VisualActionTools document={state.document} selectedId="button" schemas={schemas} onReplace={doc => actions.importJson(JSON.stringify(doc))} onSelect={actions.selectNode} /><button onClick={actions.undo}>Undo action</button><output aria-label="Action document">{JSON.stringify(state.document)}</output></>;
}
it("configures hidden id passing without displaying it and applies as one undoable change", async () => {
 const user = userEvent.setup(); render(<Editor />);
 await user.click(screen.getByRole("button", { name: "Configure button action" }));
 await user.click(screen.getByRole("button", { name: "Add passed value" }));
 await user.type(screen.getByRole("textbox", { name: "Passed value 1 destination" }), "productId");
 const path = screen.getByRole("textbox", { name: "Passed value 1 item path" });
 await user.clear(path); await user.type(path, "item._id");
 await user.click(screen.getByRole("button", { name: "Apply action" }));
 let doc = JSON.parse(screen.getByLabelText("Action document").textContent || "{}");
 const button = doc.root.children[0].children[0].children[0];
 expect(button.action.config.valueBindings).toEqual({ productId: ["_id"] });
 expect(button.action.config.action.kind).toBe("edit");
 expect(button.action.config.action.formFields.map((field: { formKey: string }) => field.formKey)).toEqual(["name", "price"]);
 expect(button.href).toBeUndefined();
 await user.click(screen.getByRole("button", { name: "Undo action" }));
 doc = JSON.parse(screen.getByLabelText("Action document").textContent || "{}");
 expect(doc.root.children[0].children[0].children[0].action).toBeUndefined();
 expect(JSON.stringify(initial)).not.toContain('"action"');
});
it("discards dialog changes when cancelled", async () => {
 const user = userEvent.setup(); render(<Editor />);
 const before = screen.getByLabelText("Action document").textContent;
 await user.click(screen.getByRole("button", { name: "Configure button action" }));
 await user.click(screen.getByRole("button", { name: "Add passed value" }));
 await user.click(screen.getByRole("button", { name: "Cancel action" }));
 expect(screen.getByLabelText("Action document").textContent).toBe(before);
});
