// @vitest-environment jsdom
import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ComponentDocument, ComponentNode, DisclosureNode, SidebarNode, TabsNode } from "../model";
import { updateNode, type NodePatch } from "../operations";
import { VisualRenderer } from "./VisualRenderer";
import { DisclosureRuntime, AccordionRuntime } from "./DisclosureRuntime";
import { TabsRuntime } from "./TabsRuntime";
import { SidebarRuntime } from "./SidebarRuntime";
import { InlineEditableText } from "./InlineTextEditor";

const disclosure = (id: string, defaultOpen = false): DisclosureNode => ({ id, type: "disclosure", defaultOpen, transition: "none", children: [] });
function Canvas({ node }: { node: ComponentNode }) {
  const [document, setDocument] = useState<ComponentDocument>({ version: 2, id: "doc", name: "Canvas", root: { id: "root", type: "section", children: [node] } });
  const patch = (id: string, changes: NodePatch) => {
    const updated = updateNode(document, id, changes);
    if (!updated.success) throw new Error(updated.message);
    setDocument(updated.document);
  };
  return <VisualRenderer document={document} mode="canvas" breakpoint="desktop" selectedNodeId={node.id} onNodePatch={patch} />;
}

describe("canvas edits render committed document state", () => {
  it("moves table columns and rows with their values, then adds and removes them", () => {
    render(<Canvas node={{ id: "table", type: "table", headers: ["Name", "Price"], rows: [["A", "10"], ["B", "20"]] }} />);
    fireEvent.click(screen.getByRole("button", { name: "Move column 1 right" }));
    expect(screen.getAllByRole("columnheader").map(element => element.textContent?.replace(/[←→×]/g, ""))).toEqual(["Price", "Name"]);
    fireEvent.click(screen.getByRole("button", { name: "Move row 1 down" }));
    expect(within(screen.getAllByRole("row")[1]).getAllByRole("cell")[0]).toHaveTextContent("20");
    fireEvent.click(screen.getByRole("button", { name: "Add column" }));
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "Remove column 3" }));
    fireEvent.click(screen.getByRole("button", { name: "Add row" }));
    expect(screen.getAllByRole("row")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Remove row 3" }));
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });
  it("supports bounded keyboard progress edits including coarse steps and endpoints", () => {
    render(<Canvas node={{ id: "progress", type: "progress", value: 50, showValue: true, label: "Complete" }} />);
    const slider = screen.getByRole("slider", { name: "Progress value" });
    for (const [key, value, shiftKey] of [["ArrowRight", 51, false], ["ArrowDown", 41, true], ["PageUp", 51, false], ["PageDown", 41, false], ["Home", 0, false], ["End", 100, false], ["ArrowUp", 100, false]] as const) {
      fireEvent.keyDown(slider, { key, shiftKey });
      expect(slider).toHaveAttribute("aria-valuenow", String(value));
    }
    fireEvent.keyDown(slider, { key: "a" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
  });
  it("edits chart values while keeping the original maximum available", () => {
    render(<Canvas node={{ id: "chart", type: "bar-chart", bars: [{ label: "A", value: 100 }, { label: "B", value: 20 }], showValues: true }} />);
    const slider = screen.getByRole("slider", { name: "Bar 1: A" });
    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    fireEvent.keyDown(slider, { key: "ArrowUp", shiftKey: true });
    expect(slider).toHaveAttribute("aria-valuenow", "10");
    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByRole("slider", { name: "Bar 2: B" })).toHaveAttribute("aria-valuenow", "20");
  });
  it("commits a dragged progress value after the pointer is released", () => {
    render(<Canvas node={{ id: "progress", type: "progress", value: 50, showValue: true }} />);
    const slider = screen.getByRole("slider", { name: "Progress value" });
    slider.getBoundingClientRect = () => ({ left: 0, width: 100, top: 0, right: 100, bottom: 20, height: 20, x: 0, y: 0, toJSON() {} });
    fireEvent(slider, new MouseEvent("pointerdown", { bubbles: true, clientX: 75, button: 0 }));
    expect(slider).toHaveAttribute("aria-valuenow", "75");
    fireEvent(slider, new MouseEvent("pointermove", { bubbles: true, clientX: 90 }));
    fireEvent(slider, new MouseEvent("pointerup", { bubbles: true, clientX: 90 }));
    expect(slider).toHaveAttribute("aria-valuenow", "90");
    expect(slider.closest("[data-progress]")).not.toHaveAttribute("data-progress-dragging");
  });
  it("commits bar drags and discards cancelled bar drags", () => {
    render(<Canvas node={{ id: "chart", type: "bar-chart", bars: [{ label: "A", value: 100 }, { label: "B", value: 20 }], showValues: true }} />);
    const slider = screen.getByRole("slider", { name: "Bar 2: B" });
    slider.getBoundingClientRect = () => ({ left: 0, width: 20, top: 0, right: 20, bottom: 100, height: 100, x: 0, y: 0, toJSON() {} });
    fireEvent(slider, new MouseEvent("pointerdown", { bubbles: true, clientY: 50, button: 0 }));
    fireEvent(slider, new MouseEvent("pointermove", { bubbles: true, clientY: 25 }));
    expect(slider).toHaveAttribute("aria-valuenow", "75");
    fireEvent(slider, new MouseEvent("pointerup", { bubbles: true, clientY: 25 }));
    expect(slider).toHaveAttribute("aria-valuenow", "75");
    fireEvent(slider, new MouseEvent("pointerdown", { bubbles: true, clientY: 90, button: 0 }));
    expect(slider).toHaveAttribute("aria-valuenow", "10");
    fireEvent(slider, new MouseEvent("pointercancel", { bubbles: true }));
    expect(slider).toHaveAttribute("aria-valuenow", "75");
  });
});

describe("compound renderer navigation", () => {
  it("opens and closes disclosures while keeping static preview controls inert", () => {
    const { rerender } = render(<DisclosureRuntime node={disclosure("item")} trigger="Details" content="Content" />);
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByRole("region")).toHaveTextContent("Content");
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.queryByRole("region")).toBeNull();
    rerender(<DisclosureRuntime node={disclosure("item")} trigger="Details" content="Content" interactive={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByRole("button", { name: "Details" })).toHaveAttribute("aria-expanded", "false");
  });
  it("honors single, non-collapsible accordion selection", () => {
    render(<AccordionRuntime node={{ id: "accordion", type: "accordion", openMode: "single", collapsible: false, children: [disclosure("One", true), disclosure("Two")] }} renderItem={(node, open, onOpenChange) => <DisclosureRuntime node={node} trigger={node.id} content={`${node.id} content`} open={open} onOpenChange={onOpenChange} />} />);
    fireEvent.click(screen.getByRole("button", { name: "One" }));
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByRole("button", { name: "Two" }));
    expect(screen.getByRole("button", { name: "Two" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute("aria-expanded", "false");
  });
  it("wraps horizontal tab selection and follows Home/End and click activation", () => {
    const node: TabsNode = { id: "tabs", type: "tabs", children: [disclosure("One"), disclosure("Two")] };
    render(<TabsRuntime node={node} renderLabel={item => item.id} renderPanel={item => `${item.id} content`} />);
    const one = screen.getByRole("tab", { name: "One" }), two = screen.getByRole("tab", { name: "Two" });
    fireEvent.keyDown(one, { key: "ArrowLeft" });
    expect(two).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Two content");
    fireEvent.keyDown(two, { key: "ArrowRight" });
    expect(one).toHaveFocus();
    fireEvent.keyDown(one, { key: "End" });
    expect(two).toHaveFocus();
    fireEvent.keyDown(two, { key: "Home" });
    expect(one).toHaveFocus();
    fireEvent.click(two);
    expect(two).toHaveAttribute("aria-selected", "true");
  });
  it("navigates sidebar panels vertically and follows a nested canvas selection", () => {
    const first = disclosure("One", true), second = { ...disclosure("Two"), children: [{ id: "nested", type: "text" as const, text: "Selected" }] };
    const node: SidebarNode = { id: "sidebar", type: "sidebar", accessibleLabel: "Sections", navigationWidth: 240, children: [first, second] };
    const { rerender } = render(<SidebarRuntime node={node} renderLabel={item => item.id} renderPanel={item => `${item.id} content`} />);
    const one = screen.getByRole("tab", { name: "One" }), two = screen.getByRole("tab", { name: "Two" });
    fireEvent.keyDown(one, { key: "ArrowUp" });
    expect(two).toHaveFocus();
    fireEvent.keyDown(two, { key: "Home" });
    expect(one).toHaveFocus();
    fireEvent.click(two);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Two content");
    rerender(<SidebarRuntime node={node} selectedNodeId="nested" renderLabel={item => item.id} renderPanel={item => `${item.id} content`} />);
    expect(two).toHaveAttribute("aria-selected", "true");
  });
});

it("commits inline text once on Enter and cancels blank text or Escape", () => {
  const commits: string[] = [], cancels: string[] = [];
  const props = { onCommit: (_id: string, value: string) => { commits.push(value); }, onCancel: (id: string) => { cancels.push(id); } };
  const { rerender } = render(<InlineEditableText key="one" nodeId="one" value="Original" {...props} />);
  const editor = screen.getByTestId("inline-text-edit-one");
  editor.textContent = "Updated";
  fireEvent.input(editor);
  fireEvent.keyDown(editor, { key: "Enter" });
  fireEvent.blur(editor);
  expect(commits).toEqual(["Updated"]);
  rerender(<InlineEditableText key="two" nodeId="two" value="Original" {...props} />);
  fireEvent.keyDown(screen.getByTestId("inline-text-edit-two"), { key: "Escape" });
  expect(cancels).toEqual(["two"]);
  rerender(<InlineEditableText key="three" nodeId="three" value="Original" {...props} />);
  const blank = screen.getByTestId("inline-text-edit-three");
  blank.textContent = " ";
  fireEvent.blur(blank);
  expect(cancels).toEqual(["two", "three"]);
});
