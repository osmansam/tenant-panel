import type { ComponentNode, DisclosureNode } from "./nodes";

export function createSidebarPanel(ids: () => string, label: string, defaultOpen = false): DisclosureNode {
  return { id: ids(), type: "disclosure", defaultOpen, transition: "none", children: [
    { id: ids(), type: "slot", name: "trigger", children: [{ id: ids(), type: "text", text: label }] },
    { id: ids(), type: "slot", name: "content", children: [
      { id: ids(), type: "heading", level: 2, text: label },
      { id: ids(), type: "text", text: "Add text, images and other components to this panel." },
    ] },
  ] };
}

export function sidebarLabelNode(item: ComponentNode): Extract<ComponentNode, { type: "text" | "heading" }> | undefined {
  if (item.type === "text" || item.type === "heading") return item;
  if ("children" in item) {
    for (const child of item.children) {
      const label = sidebarLabelNode(child);
      if (label) return label;
    }
  }
}

export function sidebarPanelLabel(item: DisclosureNode): string {
  const trigger = item.children.find(child => child.type === "slot" && child.name === "trigger");
  return trigger ? sidebarLabelNode(trigger)?.text ?? "Sidebar item" : "Sidebar item";
}

export function sidebarTriggerHasName(node: ComponentNode): boolean {
  for (const key of ["text", "label", "alt", "accessibleLabel"] as const) {
    if (key in node && typeof (node as unknown as Record<string, unknown>)[key] === "string" && String((node as unknown as Record<string, unknown>)[key]).trim()) return true;
  }
  return "children" in node && node.children.some(sidebarTriggerHasName);
}
