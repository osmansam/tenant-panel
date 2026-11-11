import type { SlotNode } from "../../../model";
import { AccordionRuntime } from "../../../renderer/DisclosureRuntime";
import { ScrollStoryRuntime } from "../../../renderer/ScrollStoryRuntime";
import { InfiniteSliderRenderer } from "./InfiniteSliderRenderer";
import { ExpandableCardRenderer } from "./ExpandableCardRenderer";
import { repeaterGridStyle } from "../../../renderer/repeaterLayout";
import type { ComponentRendererMap } from "../types";

export const compoundRenderers = {
  "expandable-card": (node, context) => <ExpandableCardRenderer node={node} context={context} />,
  disclosure: (node, context) => context.renderDisclosure(node),
  accordion: (node, context) => (
    <AccordionRuntime
      node={node}
      preview={context.mode === "canvas" ? context.disclosurePreview : undefined}
      interactive={context.mode === "preview" || context.interactiveDisclosures === true}
      renderItem={(item, open, onOpenChange, forcedState) => context.renderDisclosure(item, open, onOpenChange, forcedState)}
    />
  ),
  tabs: (node, context) => context.renderTabs(node),
  sidebar: (node, context) => <div data-sidebar-surface="" className={`${context.className}${node.style?.background?.length ? " relative isolate" : ""}`} style={context.combineNodeStyles(node)}>
    {context.backgrounds}
    <div className={node.style?.background?.length ? "relative z-10" : undefined}>{context.renderTabs(node)}</div>
  </div>,
  "infinite-slider": (node, context) => <InfiniteSliderRenderer node={node} context={context} />,
  "scroll-story": (node, context) => {
    const stage = node.children.find((child): child is SlotNode => child.type === "slot" && child.name === "stage");
    return <ScrollStoryRuntime node={node} mode={context.mode} stage={stage ? context.renderStructuralChildren(stage) : null} renderScene={(scene) => context.renderNode(scene)} />;
  },
  "scroll-scene": (node, context) => context.renderStructuralChildren(node),
  repeater: (node, context) => {
    const item = node.children.find((child): child is SlotNode => child.type === "slot" && child.name === "item");
    if (context.mode !== "canvas" || !item) return null;
    const template = context.renderStructuralChildren(item);
    return <div className={context.className} style={context.combineNodeStyles(node)}>{node.itemsLayout ? <div className="ve-repeater-grid" data-repeater-grid={node.id} style={repeaterGridStyle(node.itemsLayout, context.breakpoint)}><div className="ve-repeater-item">{template}</div></div> : template}</div>;
  },
} satisfies Pick<ComponentRendererMap, "disclosure" | "accordion" | "tabs" | "sidebar" | "infinite-slider" | "expandable-card" | "scroll-story" | "scroll-scene" | "repeater">;
