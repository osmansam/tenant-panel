// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { CollectionDataInspector } from "../visual-engine/editor/CollectionDataInspector";
import { useVisualBuilder } from "../visual-engine/editor/useVisualBuilder";
import type { ComponentDocument, RepeaterNode } from "../visual-engine/model";
import { VisualDataContext } from "../visual-engine/host/DataContext";
import { planCollection } from "./data/collectionPlan";
const initial: ComponentDocument = { version: 2, id: "d", name: "Filters", root: { id: "root", type: "section", children: [{ id: "r", type: "repeater", source: { kind: "autotable", schemaName: "items", limit: 20 }, itemAlias: "item", children: [{ id: "slot", type: "slot", name: "item", children: [] }] }] } };
function Editor() {
 const { state, actions } = useVisualBuilder({ initialDocument: initial, storageMode: "external" });
 return <VisualDataContext.Provider value={[{ name: "items", fields: [{ name: "price", type: "float", path: ["price"] }, { name: "name", type: "string", path: ["name"] }, { name: "created", type: "date", path: ["created"] }] }]}><CollectionDataInspector node={state.document.root.children[0] as RepeaterNode} onUpdate={patch => actions.updateNode("r", patch)} /><button onClick={actions.undo}>Undo filter</button><output aria-label="Filter document">{JSON.stringify(state.document)}</output></VisualDataContext.Provider>;
}
const source = () => (JSON.parse(screen.getByLabelText("Filter document").textContent || "{}").root.children[0] as RepeaterNode).source;
it("authors negative decimal bounds through normal history and preserves a paired range", async () => {
 const user = userEvent.setup(); render(<Editor />);
 await user.click(screen.getByRole("button", { name: "Add filter" }));
 await user.selectOptions(screen.getByRole("combobox", { name: "Filter 1 operator" }), "gte");
 await user.type(screen.getByRole("textbox", { name: "Filter 1 value" }), "-0.5"); await user.tab();
 expect(source().filters?.[0]).toEqual({ field: "price", operator: "gte", value: -0.5 });
 await user.click(screen.getByRole("button", { name: "Add filter" }));
 await user.selectOptions(screen.getByRole("combobox", { name: "Filter 2 operator" }), "lt");
 await user.type(screen.getByRole("textbox", { name: "Filter 2 value" }), "100"); await user.tab();
 expect(planCollection(source(), { price: "float" }).ok).toBe(true);
 await user.click(screen.getByRole("button", { name: "Undo filter" }));
 expect(source().filters?.[1].value).toBe("");
});
it("offers type-aware comparisons and resets an incompatible operator when changing fields", () => {
 render(<Editor />); fireEvent.click(screen.getByRole("button", { name: "Add filter" }));
 const operator = () => screen.getByRole("combobox", { name: "Filter 1 operator" });
 expect(within(operator()).getAllByRole("option")).toHaveLength(6);
 fireEvent.change(operator(), { target: { value: "gt" } });
 fireEvent.change(screen.getByRole("textbox", { name: "Filter 1 field" }), { target: { value: "name" } });
 expect(source().filters?.[0].operator).toBe("eq"); expect(within(operator()).getAllByRole("option")).toHaveLength(2);
 fireEvent.change(screen.getByRole("textbox", { name: "Filter 1 field" }), { target: { value: "created" } });
 expect(within(operator()).queryByRole("option", { name: "One of" })).toBeNull();
 fireEvent.change(operator(), { target: { value: "gte" } });
 fireEvent.change(screen.getByLabelText("Filter 1 value"), { target: { value: "2026-11-01" } });
 fireEvent.blur(screen.getByLabelText("Filter 1 value"));
 expect(source().filters?.[0]).toEqual({ field: "created", operator: "gte", value: "2026-11-01" });
});
