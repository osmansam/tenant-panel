import type { ComponentBlock } from "../types/page";
import type { ComponentNode } from "../visual-engine/model";
import { createRuntimeId } from "../utils/pageBindings";
import { listVisualBlocks, readVisualBlock } from "./pageAdapter";
import type { PageModel } from "./pageTypes";
import type { ProjectScope, VisualBlockValue } from "./types";

export interface VisualDesign {
  key: string;
  pageId: string;
  pageName: string;
  componentId: string;
  name: string;
  value: VisualBlockValue;
}
export interface VisualDesignSelection { name: string; value: VisualBlockValue; scope: ProjectScope; currentCopy?: boolean; sourceKey?: string; sourceType?: "saved" | "browser" | "builtin" }
export function collectVisualDesigns(pages: PageModel[]): VisualDesign[] {
  return pages.flatMap(page => listVisualBlocks(page).flatMap(component => {
    try {
      const value = readVisualBlock(component);
      const pageId = page.id || page._id || "";
      return [{ key: JSON.stringify([pageId, component.id]), pageId, pageName: page.name, componentId: component.id, name: component.title || value.document.name, value }];
    } catch { return []; }
  }));
}
/** An insertion owns its document; source page metadata and permissions stay behind. */
export function copyVisualDesign(value: VisualBlockValue, name: string, idFactory = () => createRuntimeId("cmp")): ComponentBlock {
  const validated = structuredClone(readVisualBlock({ id: "source", type: "custom", props: { visualBuilder: value } }));
  const ids = new Map<string, string>();
  const collect = (node: ComponentNode) => {
    ids.set(node.id, idFactory());
    if ("children" in node) node.children.forEach(collect);
  };
  collect(validated.document.root);
  const remap = (node: ComponentNode): ComponentNode => {
    const copy = { ...node, id: ids.get(node.id)! };
    if (copy.type === "menu-toggle") copy.targetId = ids.get(copy.targetId) || copy.targetId;
    if ("href" in copy && typeof copy.href === "string" && copy.href.startsWith("#") && ids.has(copy.href.slice(1))) copy.href = `#${ids.get(copy.href.slice(1))}`;
    if (copy.slideLink?.href.startsWith("#") && ids.has(copy.slideLink.href.slice(1))) {
      copy.slideLink = { ...copy.slideLink, href: `#${ids.get(copy.slideLink.href.slice(1))}` };
    }
    if ("children" in copy) copy.children = copy.children.map(remap);
    return copy;
  };
  const root = remap(validated.document.root);
  if (root.type !== "section") throw new Error("Invalid visual root.");
  validated.document = { ...validated.document, id: idFactory(), name: name.trim() || validated.document.name, root };
  return { id: idFactory(), type: "custom", title: validated.document.name, props: { visualBuilder: validated } };
}
