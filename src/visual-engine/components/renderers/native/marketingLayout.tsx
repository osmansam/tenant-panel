import { createElement } from "react";
import type { ComponentRendererMap } from "../types";
import { colorCss } from "../../../renderer/paintStyles";
import { GAP_CLASSES, PADDING_CLASSES } from "../../../renderer/styleTokens";

const overlayAlignment = {
  "top-start": "items-start justify-items-start", "top-center": "items-start justify-items-center", "top-end": "items-start justify-items-end",
  "center-start": "items-center justify-items-start", center: "items-center justify-items-center", "center-end": "items-center justify-items-end",
  "bottom-start": "items-end justify-items-start", "bottom-center": "items-end justify-items-center", "bottom-end": "items-end justify-items-end",
} as const;

export const marketingLayoutRenderers = {
  card: (node, context) => {
    const hasChildGap = node.style?.spacing?.gap !== undefined || node.style?.custom?.gap !== undefined || context.responsiveChildGapClassName !== undefined;
    const children = context.renderStructuralChildren(node);
    const content = hasChildGap || node.style?.background?.length
      ? <div
          className={[
            node.style?.background?.length ? "relative z-10" : "",
            hasChildGap ? "flex flex-col" : "",
            hasChildGap && node.style?.spacing?.gap !== undefined ? GAP_CLASSES[node.style.spacing.gap] : "",
            context.responsiveChildGapClassName,
          ].filter(Boolean).join(" ") || undefined}
          style={hasChildGap && node.style?.custom?.gap !== undefined ? { gap: node.style.custom.gap } : undefined}
        >{children}</div>
      : children;
    return createElement(
      node.element || "div",
      {
        className: [context.className, node.style?.background?.length ? "relative isolate" : ""].filter(Boolean).join(" "),
        style: context.combineNodeStyles(node),
      },
      context.backgrounds,
      content,
    );
  },
  overlay: (node, context) => {
    const background = node.children.find((child) => child.type === "slot" && child.name === "background");
    const content = node.children.find((child) => child.type === "slot" && child.name === "content");
    const stack = context.breakpoint === "mobile" && node.mobileFallback === "stack";
    return <div className={[context.className, stack ? "flex flex-col" : "grid", !stack ? overlayAlignment[node.alignment] : ""].filter(Boolean).join(" ")} style={context.combineNodeStyles(node)} data-overlay-mode={stack ? "stack" : "overlay"} data-overlay-alignment={node.alignment}>
      {context.backgrounds}
      {background ? <div data-overlay-slot="background" className={stack ? undefined : "col-start-1 row-start-1 h-full w-full"}>{context.renderNode(background)}</div> : null}
      {!stack && node.tint ? <div data-overlay-tint className="col-start-1 row-start-1 h-full w-full" aria-hidden="true" style={{ backgroundColor: colorCss(node.tint.color), opacity: node.tint.opacity, pointerEvents: "none" }} /> : null}
      {content ? <div data-overlay-slot="content" className={[stack ? "" : "col-start-1 row-start-1 relative z-10", PADDING_CLASSES[node.inset]].filter(Boolean).join(" ")}>{context.renderNode(content)}</div> : null}
    </div>;
  },
} satisfies Pick<ComponentRendererMap, "card" | "overlay">;
