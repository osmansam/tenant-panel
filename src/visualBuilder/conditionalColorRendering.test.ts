// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import type { CardNode, ComponentDocument, ConditionalColorRule, SlotNode } from "../visual-engine/model";
import { VisualRenderer } from "../visual-engine/renderer";
const rules: ConditionalColorRule[] = [
 { id: "low", path: ["price"], operator: "lt", value: 20, colors: { text: { kind: "custom", value: "#006400" }, background: { kind: "custom", value: "#dcfce7" }, border: { kind: "custom", value: "#16a34a" } } },
 { id: "middle", path: ["price"], operator: "between", value: 20, upper: 100, colors: { text: { kind: "custom", value: "#92400e" }, background: { kind: "custom", value: "#fef3c7" }, border: { kind: "custom", value: "#d97706" } } },
 { id: "high", path: ["price"], operator: "gte", value: 100, colors: { text: { kind: "custom", value: "#991b1b" }, background: { kind: "custom", value: "#fee2e2" }, border: { kind: "custom", value: "#dc2626" } } },
];
const document: ComponentDocument = { version: 2, id: "d", name: "Conditional prices", root: { id: "root", type: "section", children: [{ id: "list", type: "repeater", itemAlias: "item", source: { kind: "autotable", schemaName: "items", limit: 5 }, children: [{ id: "slot", type: "slot", name: "item", children: [{ id: "card", type: "card", element: "article", conditionalColors: rules, style: { color: { background: "surface", text: "text" }, background: [{ kind: "solid", color: { kind: "custom", value: "#ffffff" } }], border: { width: "thin", color: "border" } }, children: [{ id: "price", type: "text", text: "{{item.price}}", conditionalColors: rules, style: { textPaint: { kind: "linear-gradient", angle: 90, stops: [{ position: 0, color: { kind: "custom", value: "#ff0000" } }, { position: 100, color: { kind: "custom", value: "#0000ff" } }] } } }] }] }] }] } };
const records = [{ price: 0 }, { price: 20 }, { price: 100 }, { name: "Missing" }];
afterEach(cleanup);
it("colors each rendered record separately, replaces matching paints and leaves unmatched records unchanged", () => {
 const before = JSON.stringify(document), data = JSON.stringify(records);
 render(createElement(VisualRenderer, { document, resolvedCollections: { items: records }, mode: "preview" }));
 const cards = screen.getAllByRole("article");
 expect(cards[0].style.backgroundColor).toBe("rgb(220, 252, 231)");
 expect(cards[0].style.borderColor).toBe("rgb(22, 163, 74)");
 expect(cards[1].style.backgroundColor).toBe("rgb(254, 243, 199)");
 expect(cards[2].style.backgroundColor).toBe("rgb(254, 226, 226)");
 expect(screen.getByText("20").closest("p")!.style.color).toBe("rgb(146, 64, 14)");
 expect(screen.getByText("20").closest("p")!.style.backgroundImage).toBe("");
 expect(cards[3].style.backgroundColor).toBe("");
 expect(JSON.stringify(document)).toBe(before); expect(JSON.stringify(records)).toBe(data);
});
it("keeps default paints in the design canvas with no item context", () => {
 render(createElement(VisualRenderer, { document, mode: "canvas", breakpoint: "desktop" }));
 expect(screen.getAllByRole("article")).toHaveLength(1);
 expect(screen.getByRole("article").style.backgroundColor).toBe("");
 expect(screen.getByText("{{item.price}}").closest("p")!.style.backgroundImage).toContain("linear-gradient");
});
it("keeps explicit conditional text on buttons when the page uses adaptive component colors", () => {
 const buttonDoc: ComponentDocument = { version: 2, id: "b", name: "Button", root: { id: "root", type: "section", children: [{ id: "button", type: "button", label: "Buy", conditionalColors: rules }] } };
 render(createElement(VisualRenderer, { document: buttonDoc, publicContext: { rootId: "root", item: { price: 20 } }, site: { siteName: "Site", navigation: [], locales: [], copyright: "", pageComponentColors: true } }));
 expect(screen.getByRole("button", { name: "Buy" }).style.color).toBe("rgb(146, 64, 14)");
 expect(screen.getByText("Buy").style.color).toBe("rgb(146, 64, 14)");
});
it("preserves the page's root background policy while applying other matching colors", () => {
 const rootDoc: ComponentDocument = { version: 2, id: "root-doc", name: "Root", root: { id: "r", type: "section", conditionalColors: rules, children: [{ id: "label", type: "text", text: "Root content" }] } };
 const view = render(createElement(VisualRenderer, { document: rootDoc, publicContext: { rootId: "r", item: { price: 0 } }, site: { siteName: "Site", navigation: [], locales: [], copyright: "", pageHasBackground: true } }));
 const section = view.container.querySelector("section")!;
 expect(section.style.backgroundColor).toBe("");
 expect(section.style.color).toBe("rgb(0, 100, 0)");
});

it("keeps colored text markup valid when read as HTML", () => {
 const html = renderToStaticMarkup(createElement(VisualRenderer, { document, resolvedCollections: { items: records }, mode: "preview" }));
 const parsed = window.document.createElement("div"); parsed.innerHTML = html;
 expect(parsed.querySelectorAll("p")).toHaveLength(4);
});
it("colors bound text in disclosure triggers inside a repeated item", () => {
 const triggerDoc = structuredClone(document);
 if (triggerDoc.root.children[0].type !== "repeater") throw new Error("Fixture");
 (triggerDoc.root.children[0].children[0] as SlotNode).children = [{ id: "details", type: "disclosure", defaultOpen: false, transition: "none", children: [{ id: "trigger", type: "slot", name: "trigger", children: [{ id: "label", type: "text", text: "{{item.price}}", conditionalColors: rules }] }, { id: "body", type: "slot", name: "content", children: [{ id: "content", type: "text", text: "Details" }] }] }];
 render(createElement(VisualRenderer, { document: triggerDoc, resolvedCollections: { items: [{ price: 20 }] } }));
 expect(screen.getByRole("button", { name: "20" })).toBeTruthy();
 expect(screen.getByText("20").style.color).toBe("rgb(146, 64, 14)");
});
it("paints a transparent matching background once", () => {
 const alpha = structuredClone(document);
 if (alpha.root.children[0].type !== "repeater") throw new Error("Fixture");
 const card = (alpha.root.children[0].children[0] as SlotNode).children[0] as CardNode;
 card.conditionalColors = [{ id: "alpha", path: ["price"], operator: "eq", value: 20, colors: { background: { kind: "custom", value: "rgba(255,0,0,0.5)" } } }];
 card.children = [];
 render(createElement(VisualRenderer, { document: alpha, resolvedCollections: { items: [{ price: 20 }] } }));
 expect(screen.getByRole("article").style.backgroundColor).toBe("rgba(255, 0, 0, 0.5)");
 expect(screen.getByRole("article").querySelector("[data-background-layer]")).toBeNull();
});
