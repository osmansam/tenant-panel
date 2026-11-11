import type { ComponentDocument, ComponentNode } from "../model";
import { ADVANCED_GALLERY_DOCUMENT } from "./advancedGallery";

/** A JSON-only vertical slice covering bounded media plus all first-party runtime-effect layers. */
export const EFFECT_SHOWCASE_DOCUMENT: ComponentDocument = createShowcase();

function createShowcase(): ComponentDocument {
  const document = structuredClone(ADVANCED_GALLERY_DOCUMENT);
  document.id = "registered-effect-showcase";
  document.name = "Registered effects showcase";
  document.root.effects = [{
    attachmentId: "showcase-gradient",
    effectId: "ozmishow.background.animated-gradient",
    version: 1,
    enabled: true,
    props: { colorA: "#07090d", colorB: "#172554", duration: 10, angle: 135, opacity: 1 },
  }];
  visit(document.root, (node) => {
    if (node.id === "gallery-title") node.effects = [{
      attachmentId: "showcase-shimmer",
      effectId: "ozmishow.text.shimmer",
      version: 1,
      enabled: true,
      props: { color: "#3478ff", highlight: "#ffffff", duration: 2.5, width: 24 },
    }];
    if (node.id === "gallery-copy" && "children" in node) node.children.push({
      id: "gallery-action",
      type: "button",
      label: "Explore the collection",
      href: "#collection",
      effects: [{ attachmentId: "showcase-magnetic", effectId: "ozmishow.button.magnetic-lite", version: 1, enabled: true, props: { strength: 12 } }],
      style: { color: { background: "accent", text: "inverse" }, spacing: { padding: "md" }, border: { radius: "full" } },
    });
  });
  return document;
}

function visit(node: ComponentNode, callback: (node: ComponentNode) => void): void {
  callback(node);
  if ("children" in node) node.children.forEach((child) => visit(child, callback));
}
