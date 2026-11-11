import type { PageModel, ComponentBlock } from "./pageTypes";
import type { ComponentDocument } from "../visual-engine/model";
export const sampleDocument: ComponentDocument = {
  version: 2, id: "visual-doc", name: "Inventory",
  root: { id: "root", type: "section", children: [{ id: "title", type: "heading", level: 2, text: "Products" }] },
};
export const visualComponent: ComponentBlock = { id: "visual", type: "custom", title: "Visual section", props: { visualBuilder: { document: sampleDocument } } };
export function samplePage(): PageModel {
  return { id: "page-1", name: "Inventory", slug: "inventory", isAuthenticated: true, isAuthorized: true, authorizeRole: ["admin"],
    filters: [], variables: [{ id: "var", key: "search", type: "string", initialValue: "keep" }],
    sections: [{ id: "table-section", type: "component", component: { id: "table", type: "table", props: { keep: "ProductSKU" } } },
      { id: "tabs", type: "tabs", tabs: { tabs: [{ id: "t", label: "Details", order: 0, sections: [{ id: "g", type: "grid", grid: { columns: 1, cells: [{ id: "cell", row: 1, column: 1, components: [{ id: "panel", type: "tabPanel", tabs: [{ title: "Visual", components: [structuredClone(visualComponent)] }] }] }] } }] }] } }],
  };
}
