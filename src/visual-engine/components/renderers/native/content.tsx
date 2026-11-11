import { createElement, type CSSProperties } from "react";
import type { ComponentNode, StyleSpec } from "../../../model";
import { normalizeLinkUrl } from "../../../model/urls";
import { pageTextPaintStyle } from "../../../renderer/paintStyles";
import { BUTTON_BASE_CLASSES, buttonHoverClass, HEADING_BASE_CLASSES, TEXT_BASE_CLASSES } from "../../../renderer/styleTokens";
import { VisualImage } from "../../../renderer/images/VisualImage";
import { imageDeliveryGeometry } from "../../../renderer/images/geometry";
import { InlineEditableText } from "../../../renderer/InlineTextEditor";
import type { ComponentRendererMap, SemanticRendererContext } from "../types";
import { CodeBlockRenderer } from "./CodeBlockRenderer";
import { getOzmishowIconComponent } from "./iconCatalog";

function isInlineEditing(node: ComponentNode, context: SemanticRendererContext): boolean {
  return context.mode === "canvas" && context.inlineEditingNodeId === node.id && context.onInlineTextCommit !== undefined && context.onInlineTextCancel !== undefined;
}

const INLINE_TOKEN_REGEX = /(`[^`]+`|\{\{[^}]+\}\}|\b[a-z0-9]+_[a-z0-9_]+\b|\bconfig\.[a-z0-9_.]+\b|\bsteps\.[a-z0-9_.]+\b|\bvars\.[a-z0-9_.]+\b|\b_id\b|\btargetSchema\b|\bstopOnError\b|\btimeoutSec\b|\breturnStep\b|\boutputFields\b|\bmatchedCount\b|\bmodifiedCount\b|\bupsertedCount\b|\bupsertedId\b|\bdeletedCount\b)/g;

function renderInlineContent(text: string) {
  if (!text) return text;
  const parts = text.split(INLINE_TOKEN_REGEX);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (!part) return null;
    const isBacktick = part.startsWith("`") && part.endsWith("`") && part.length > 2;
    const isToken = isBacktick || INLINE_TOKEN_REGEX.test(part);
    INLINE_TOKEN_REGEX.lastIndex = 0;

    if (isToken) {
      const display = isBacktick ? part.slice(1, -1) : part;
      return (
        <code
          key={index}
          className="rounded-[4px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700/80 mx-0.5 inline-block align-baseline leading-tight"
        >
          {display}
        </code>
      );
    }
    return part;
  });
}

export const contentRenderers = {
  heading: (node, context) => {
    const hasBg = !!node.style?.background?.length;
    const hasBorderRadius = !!(node.style?.border?.radius || node.style?.custom?.borderRadius);
    return createElement(`h${node.level}`, {
      id: node.id,
      className: withBaseline([context.className, hasBg ? "relative isolate" : "", hasBg && hasBorderRadius ? "overflow-hidden" : ""].filter(Boolean).join(" "), node.style?.typography, HEADING_BASE_CLASSES),
      style: context.combineNodeStyles(node, pageTextPaintStyle(node, context.site)),
    }, hasBg ? <>{context.backgrounds}<span className="relative z-10">{isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.text} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : renderInlineContent(node.text)}</span></> : isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.text} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : renderInlineContent(node.text));
  },
  text: (node, context) => {
    const hasBg = !!node.style?.background?.length;
    const hasBorderRadius = !!(node.style?.border?.radius || node.style?.custom?.borderRadius);
    return (
      <p className={[withBaseline(context.className, node.style?.typography, TEXT_BASE_CLASSES), hasBg ? "relative isolate" : "", hasBg && hasBorderRadius ? "overflow-hidden" : ""].filter(Boolean).join(" ")} style={context.combineNodeStyles(node, pageTextPaintStyle(node, context.site))}>
        {context.backgrounds}<span className={hasBg ? "relative z-10" : undefined}>{isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.text} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : renderInlineContent(node.text)}</span>
      </p>
    );
  },
  code: (node, context) => (
    <CodeBlockRenderer
      node={node}
      className={context.className}
      style={context.combineNodeStyles(node)}
      inlineEdit={isInlineEditing(node, context) ? { onCommit: context.onInlineTextCommit!, onCancel: context.onInlineTextCancel! } : undefined}
    />
  ),
  image: (node, context) => (
    <VisualImage className={[context.className, imageAspectClassName(node.aspectRatio), imageFitClassName(node.objectFit), "block"].filter(Boolean).join(" ")} src={node.src} alt={node.alt} priority={context.imagePriority} geometry={imageDeliveryGeometry(node)} style={context.combineNodeStyles(node, imageEffectStyle(node.style))} />
  ),
  button: (node, context) => {
    const href = node.href === undefined ? undefined : safeLinkTarget(node.href);
    const className = [context.className, BUTTON_BASE_CLASSES, buttonHoverClass(node.style?.color?.background), node.style?.background?.length ? "relative isolate" : ""].filter(Boolean).join(" ");
    const ButtonIcon = node.iconId ? getOzmishowIconComponent(node.iconId) : undefined;
    const icon = ButtonIcon ? <ButtonIcon width={18} height={18} aria-hidden="true" focusable="false" /> : null;
    const editing = isInlineEditing(node, context);
    const label = <>{context.backgrounds}<span className={[node.style?.background?.length ? "relative z-10" : "", ButtonIcon ? "inline-flex items-center gap-2" : ""].filter(Boolean).join(" ") || undefined} style={pageTextPaintStyle(node, context.site)}>{node.iconPosition !== "end" && icon}{editing ? <InlineEditableText nodeId={node.id} value={node.label} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : node.label}{node.iconPosition === "end" && icon}</span></>;
    if (node.action) return context.hostActionState?.hidden ? null : <button className={className} type="button" aria-label={node.accessibleLabel} disabled={context.mode === "preview" && (!context.onHostAction || context.hostActionState?.disabled)} title={context.hostActionState?.reason || (context.mode === "preview" && !context.onHostAction ? "Actions run on the published page." : undefined)} style={context.combineNodeStyles(node)} onClick={context.mode === "preview" ? context.onHostAction : undefined}>{label}</button>;
    return node.submit === true
      ? <button className={className} type="submit" aria-label={node.accessibleLabel} style={context.combineNodeStyles(node)}>{label}</button>
      : href === undefined
      ? <button className={className} type="button" aria-label={node.accessibleLabel} style={context.combineNodeStyles(node)}>{label}</button>
      : <a className={className} href={href} aria-label={node.accessibleLabel} target={node.openInNewTab ? "_blank" : undefined} rel={node.openInNewTab ? "noopener noreferrer" : undefined} style={context.combineNodeStyles(node)}>{label}</a>;
  },
  divider: (node, context) => <hr className={[context.className, node.style?.sizing?.width === undefined && !node.style?.custom?.width ? "w-full" : "", "my-0 border-0 border-t-2 border-current"].filter(Boolean).join(" ")} style={context.combineNodeStyles(node)} />,
} satisfies Pick<ComponentRendererMap, "heading" | "text" | "code" | "image" | "button" | "divider">;

function imageAspectClassName(aspectRatio: Extract<ComponentNode, { type: "image" }>["aspectRatio"]): string {
  return aspectRatio === "square" ? "aspect-square" : aspectRatio === "landscape" ? "aspect-[4/3]" : aspectRatio === "wide" ? "aspect-video" : aspectRatio === "portrait" ? "aspect-[3/4]" : "";
}

function imageFitClassName(objectFit: Extract<ComponentNode, { type: "image" }>["objectFit"]): string {
  return objectFit === "cover" ? "object-cover" : objectFit === "contain" ? "object-contain" : "";
}

function imageEffectStyle(style: StyleSpec | undefined): CSSProperties | undefined {
  const media = style?.media;
  if (media === undefined) return undefined;
  const filters = media.filters;
  const filter = filters === undefined ? undefined : [
    filters.blur === undefined ? "" : `blur(${filters.blur}px)`,
    filters.brightness === undefined ? "" : `brightness(${filters.brightness}%)`,
    filters.contrast === undefined ? "" : `contrast(${filters.contrast}%)`,
    filters.grayscale === undefined ? "" : `grayscale(${filters.grayscale}%)`,
    filters.saturation === undefined ? "" : `saturate(${filters.saturation}%)`,
  ].filter(Boolean).join(" ");
  return { opacity: media.opacity, filter };
}

function withBaseline(className: string, typography: StyleSpec["typography"] | undefined, baseline: string): string {
  const applied = baseline.split(" ").filter((token) => token.startsWith("tracking-") ? typography?.tracking === undefined : typography?.leading === undefined);
  return [className, ...applied].filter(Boolean).join(" ");
}

function safeLinkTarget(value: string): string | undefined {
  const result = normalizeLinkUrl(value);
  return result.success ? result.value : undefined;
}
