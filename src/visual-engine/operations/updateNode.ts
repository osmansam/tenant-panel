import type { ComponentDocument } from "../model/document";
import type { ComponentNode } from "../model/nodes";
import { failure, finalizeDocument, type OperationResult } from "./result";
import { findNode, mapNode } from "./queryNode";
import { componentEditorRegistry } from "../components/editor";

type PatchFor<Node extends ComponentNode> = Partial<Omit<Node, "id" | "type" | "children">>;
export type NodePatch<Type extends ComponentNode["type"] = ComponentNode["type"]> =
  Type extends ComponentNode["type"] ? PatchFor<Extract<ComponentNode, { type: Type }>> : never;

const commonPatchFields = ["style", "responsive", "layout", "animation", "effects", "bindings", "conditionalColors", "slideLink"] as const;
const patchFieldsByType = {
  section: ["designPreset", "designStyle"],
  grid: ["columns", "mediaLayout"],
  stack: ["direction", "alignment", "distribution", "wrap", "gap"],
  flex: ["direction", "alignment", "distribution", "wrap", "gap"],
  slot: ["name"],
  disclosure: ["defaultOpen", "transition"],
  accordion: ["openMode", "collapsible"],
  tabs: [],
  sidebar: [],
  "infinite-slider": [],
  "scroll-story": ["transition", "mobileMode", "showProgress", "accessibleLabel"],
  "scroll-scene": ["length", "media"],
  repeater: ["source", "itemAlias", "itemsLayout"],
  card: [],
  "expandable-card": [],
  overlay: ["tint"],
  form: [],
  input: [],
  textarea: [],
  select: ["options"],
  checkbox: [],
  heading: [],
  text: [],
  code: ["code", "language", "showLanguage", "showCopy", "wrap"],
  image: [],
  "image-comparison": [],
  button: ["action"],
  icon: [],
  badge: [],
  link: [],
  avatar: [],
  list: ["items", "marker", "iconId"],
  stat: [],
  rating: [],
  quote: [],
  divider: [],
  video: [],
  audio: [],
  embed: [],
  table: ["headers", "rows"],
  progress: ["accentColor"],
  steps: ["items", "current"],
  timeline: ["entries"],
  alert: [],
  tags: ["items"],
  kbd: ["keys"],
  "bar-chart": ["bars", "showValues", "accentColor"],
  sparkline: ["points", "showArea", "ariaLabel", "accentColor"],
  "site-logo": [],
  "site-name": [],
  "navigation-menu": ["orientation", "showChildren", "activeColor", "hoverColor"],
  "language-switcher": [],
  "theme-switcher": ["presentation", "labels", "accessibleLabel"],
  "menu-toggle": ["label", "targetId"],
  "menu-panel": [],
  "footer-links": ["activeColor", "hoverColor"],
  copyright: [],
} as const satisfies Record<ComponentNode["type"], readonly string[]>;

export function updateNode(document: ComponentDocument, nodeId: string, patch: NodePatch): OperationResult {
  const node = findNode(document.root, nodeId);
  if (!node) return failure("operation.node_not_found", "The target node does not exist");
  if (!isRecord(patch)) return failure("operation.patch_invalid", "The node patch must be an object");
  if ("id" in patch || "type" in patch || "children" in patch) {
    return failure("operation.patch_protected", "Node identity, type, and children cannot be updated through a patch");
  }
  const allowedFields: readonly string[] = [...commonPatchFields, ...componentEditorRegistry.editableFieldKeys(node.type), ...patchFieldsByType[node.type]];
  if (Object.keys(patch).some((field) => !allowedFields.includes(field))) {
    return failure("operation.patch_field_invalid", `The patch contains a field that is not valid for ${node.type}`);
  }

  const root = mapNode(document.root, nodeId, (target) => ({ ...target, ...patch } as ComponentNode));
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: nodeId });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
