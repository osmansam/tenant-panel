import { componentRegistry } from "../core";
import type { ComponentNode, NodeType } from "../../model";
import { contentRenderers } from "./native/content";
import { layoutRenderers } from "./native/layout";
import { compoundRenderers } from "./ozmishow/compound";
import { siteRenderers } from "./ozmishow/site";
import { marketingContentRenderers } from "./native/marketingContent";
import { extendedContentRenderers } from "./native/extendedContent";
import { marketingLayoutRenderers } from "./native/marketingLayout";
import { marketingFormRenderers } from "./native/marketingForms";
import { ImageComparisonRenderer } from "./native/ImageComparisonRenderer";
import type { ComponentRenderer, ComponentRendererMap } from "./types";

const renderers = {
  "image-comparison": (node, context) => <ImageComparisonRenderer node={node} context={context} />,
  ...layoutRenderers,
  ...compoundRenderers,
  ...contentRenderers,
  ...marketingContentRenderers,
  ...extendedContentRenderers,
  ...marketingLayoutRenderers,
  ...marketingFormRenderers,
  ...siteRenderers,
} satisfies ComponentRendererMap;

const orderedTypes = Object.freeze(componentRegistry.list().map(({ type }) => type));

export function resolveComponentRenderer(type: string): ComponentRenderer | undefined {
  return componentRegistry.has(type) ? renderers[type] as ComponentRenderer : undefined;
}

export const componentRendererRegistry = Object.freeze({
  get<TType extends NodeType>(type: TType): ComponentRenderer<TType> {
    return renderers[type] as ComponentRenderer<TType>;
  },
  listTypes: (): readonly ComponentNode["type"][] => orderedTypes,
});
