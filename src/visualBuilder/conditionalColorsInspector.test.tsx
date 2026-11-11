// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { ConditionalColorsInspector } from "../visual-engine/editor/ConditionalColorsInspector";
import { useVisualBuilder } from "../visual-engine/editor/useVisualBuilder";
import type { ComponentDocument } from "../visual-engine/model";
import { VisualDataContext } from "../visual-engine/host/DataContext";
const document: ComponentDocument = { version: 2, id: "d", name: "Price", root: { id: "root", type: "section", children: [{ id: "p", type: "text", text: "{{item.price}}" }] } };
function Editor() {
 const { state, actions } = useVisualBuilder({ initialDocument: document, storageMode: "external" });
 return <VisualDataContext.Provider value={[{ name: "items", fields: [{ name: "price", type: "float", path: ["price"] }, { name: "status", type: "string", path: ["status"] }] }]}><ConditionalColorsInspector node={state.document.root.children[0]} schemaName="items" onUpdate={patch => actions.updateNode("p", patch)} /><button onClick={actions.undo}>Undo rule change</button><output aria-label="Color document">{JSON.stringify(state.document)}</output></VisualDataContext.Provider>;
}
it("authors typed ranges and all three colors using the normal history path", () => {
 render(<Editor />);
 fireEvent.click(screen.getByRole("button", { name: "Add color rule" }));
 fireEvent.change(screen.getByRole("combobox", { name: "Rule 1 operator" }), { target: { value: "between" } });
 fireEvent.change(screen.getByRole("spinbutton", { name: "Rule 1 value" }), { target: { value: "20" } });
 fireEvent.blur(screen.getByRole("spinbutton", { name: "Rule 1 value" }));
 fireEvent.change(screen.getByRole("spinbutton", { name: "Rule 1 upper bound" }), { target: { value: "100" } });
 fireEvent.blur(screen.getByRole("spinbutton", { name: "Rule 1 upper bound" }));
 fireEvent.click(screen.getByRole("checkbox", { name: "Rule 1 background color" }));
 fireEvent.click(screen.getByRole("checkbox", { name: "Rule 1 border color" }));
 fireEvent.change(screen.getByRole("textbox", { name: "Rule 1 background" }), { target: { value: "#fef3c7" } });
 const saved = () => JSON.parse(screen.getByLabelText("Color document").textContent || "{}").root.children[0];
 expect(saved().conditionalColors[0]).toMatchObject({ path: ["price"], operator: "between", value: 20, upper: 100, colors: { text: { kind: "token", value: "success" }, background: { kind: "custom", value: "#fef3c7" }, border: { kind: "token", value: "border" } } });
 fireEvent.click(screen.getByRole("button", { name: "Undo rule change" }));
 expect(saved().conditionalColors[0].colors.background.kind).toBe("token");
 expect(document.root.children[0].conditionalColors).toBeUndefined();
});
it("reorders and removes rules and supports metadata and manually entered nested paths", () => {
 render(<Editor />);
 fireEvent.click(screen.getByRole("button", { name: "Add color rule" }));
 fireEvent.click(screen.getByRole("button", { name: "Add color rule" }));
 const saved = () => JSON.parse(screen.getByLabelText("Color document").textContent || "{}").root.children[0].conditionalColors;
 const firstId = saved()[0].id;
 fireEvent.change(screen.getByRole("combobox", { name: "Rule 2 field" }), { target: { value: '["status"]' } });
 fireEvent.change(screen.getByRole("textbox", { name: "Rule 2 item path" }), { target: { value: "item.details.price" } });
 fireEvent.blur(screen.getByRole("textbox", { name: "Rule 2 item path" }));
 expect(saved()[1].path).toEqual(["details", "price"]);
 fireEvent.click(screen.getByRole("button", { name: "Move rule 2 up" }));
 expect(saved()[1].id).toBe(firstId);
 fireEvent.click(screen.getByRole("button", { name: "Remove color rule 1" }));
 expect(saved()).toHaveLength(1);
 fireEvent.change(screen.getByRole("textbox", { name: "Rule 1 item path" }), { target: { value: "item.__proto__.bad" } });
 fireEvent.blur(screen.getByRole("textbox", { name: "Rule 1 item path" }));
 expect(within(screen.getByRole("group", { name: "Rule 1" })).getByRole("alert")).toBeTruthy();
 expect(saved()[0].path).toEqual(["price"]);
});
it("keeps invalid edits out of the saved document and supports boolean equality", () => {
 render(<Editor />);
 fireEvent.click(screen.getByRole("button", { name: "Add color rule" }));
 fireEvent.click(screen.getByRole("checkbox", { name: "Rule 1 text color" }));
 expect(screen.getByRole("checkbox", { name: "Rule 1 text color" })).toBeChecked();
 expect(screen.getByRole("alert")).toBeTruthy();
 fireEvent.change(screen.getByRole("combobox", { name: "Rule 1 operator" }), { target: { value: "eq" } });
 fireEvent.change(screen.getByRole("combobox", { name: "Rule 1 value type" }), { target: { value: "boolean" } });
 fireEvent.change(screen.getByRole("combobox", { name: "Rule 1 value" }), { target: { value: "false" } });
 const rule = JSON.parse(screen.getByLabelText("Color document").textContent || "{}").root.children[0].conditionalColors[0];
 expect(rule.value).toBe(false);
 expect(rule.operator).toBe("eq");
 expect(screen.queryByRole("alert")).toBeNull();
});

it("allows keyboard entry of negative and fractional numeric thresholds", async () => {
 const user = userEvent.setup(); render(<Editor />);
 await user.click(screen.getByRole("button", { name: "Add color rule" }));
 const value = screen.getByRole("spinbutton", { name: "Rule 1 value" });
 await user.clear(value); await user.type(value, "-5.25"); await user.tab();
 const rule = JSON.parse(screen.getByLabelText("Color document").textContent || "{}").root.children[0].conditionalColors[0];
 expect(rule.value).toBe(-5.25);
});
it("preserves the sign while typing negative values below one", async () => {
 const user = userEvent.setup(); render(<Editor />);
 await user.click(screen.getByRole("button", { name: "Add color rule" }));
 const value = screen.getByRole("spinbutton", { name: "Rule 1 value" });
 await user.clear(value); await user.type(value, "-0.5"); await user.tab();
 expect(JSON.parse(screen.getByLabelText("Color document").textContent || "{}").root.children[0].conditionalColors[0].value).toBe(-0.5);
});
it("never displays a rejected range bound as though it were saved", () => {
 render(<Editor />);
 fireEvent.click(screen.getByRole("button", { name: "Add color rule" }));
 fireEvent.change(screen.getByRole("combobox", { name: "Rule 1 operator" }), { target: { value: "between" } });
 const lower = screen.getByRole("spinbutton", { name: "Rule 1 value" }) as HTMLInputElement;
 const upper = screen.getByRole("spinbutton", { name: "Rule 1 upper bound" });
 fireEvent.change(lower, { target: { value: "200" } }); fireEvent.blur(lower);
 fireEvent.change(upper, { target: { value: "300" } }); fireEvent.blur(upper);
 const rule = () => JSON.parse(screen.getByLabelText("Color document").textContent || "{}").root.children[0].conditionalColors[0];
 expect(Number(lower.value)).toBe(rule().value);
 fireEvent.change(lower, { target: { value: "200" } }); fireEvent.blur(lower);
 expect(rule()).toMatchObject({ value: 200, upper: 300 });
});
