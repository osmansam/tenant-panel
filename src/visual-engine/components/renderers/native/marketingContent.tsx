import { getOzmishowIconComponent } from "./iconCatalog";
import { normalizeImageUrl, normalizeLinkUrl } from "../../../model/urls";
import { InlineEditableText } from "../../../renderer/InlineTextEditor";
import { InlineEntryText } from "../../../renderer/InlineEntryText";
import type { ComponentNode } from "../../../model";
import type { ComponentRendererMap, SemanticRendererContext } from "../types";

function isInlineEditing(node: ComponentNode, context: SemanticRendererContext): boolean {
  return context.mode === "canvas" && context.inlineEditingNodeId === node.id && context.onInlineTextCommit !== undefined && context.onInlineTextCancel !== undefined;
}

export const marketingContentRenderers = {
  icon: (node, context) => {
    const Icon = getOzmishowIconComponent(node.iconId);
    const icon = <Icon width={node.size} height={node.size} aria-hidden="true" focusable="false" />;
    return node.decorative
      ? <span data-node-icon={node.id} aria-hidden="true" className={context.className} style={context.combineNodeStyles(node)}>{icon}</span>
      : <span data-node-icon={node.id} role="img" aria-label={node.accessibleLabel} className={context.className} style={context.combineNodeStyles(node)}>{icon}</span>;
  },
  badge: (node, context) => <span className={context.className} style={context.combineNodeStyles(node)}>{isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.text} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : node.text}</span>,
  link: (node, context) => {
    const target = normalizeLinkUrl(node.href);
    const common = { className: context.className, style: context.combineNodeStyles(node), "aria-label": node.accessibleLabel };
    const renderedLabel = isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.label} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : node.label;
    return target.success
      ? <a {...common} href={isInlineEditing(node, context) ? undefined : target.value} target={node.openInNewTab ? "_blank" : undefined} rel={node.openInNewTab ? "noopener noreferrer" : undefined}>{renderedLabel}</a>
      : <span {...common}>{renderedLabel}</span>;
  },
  avatar: (node, context) => {
    const source = normalizeImageUrl(node.src);
    return source.success
      ? <img className={context.className} style={context.combineNodeStyles(node)} src={source.value} alt={node.alt} />
      : <span className={context.className} style={context.combineNodeStyles(node)} role="img" aria-label={node.alt}>{node.fallback}</span>;
  },
  list: (node, context) => {
    const Tag = node.marker === "number" ? "ol" : "ul";
    const MarkerIcon = node.marker === "icon" && node.iconId ? getOzmishowIconComponent(node.iconId) : undefined;
    return <Tag className={context.className} style={context.combineNodeStyles(node)}>{node.items.map((item, index) => <li key={`${index}:${item}`} className="flex items-start gap-2">{node.marker === "check" ? <span aria-hidden="true">✓</span> : MarkerIcon ? <MarkerIcon width={18} height={18} aria-hidden="true" /> : null}<InlineEntryText node={node} target={{ base: "items", index }} context={context} /></li>)}</Tag>;
  },
  stat: (node, context) => <div className={context.className} style={context.combineNodeStyles(node)}><div data-stat-value><InlineEntryText node={node} target={{ base: "prefix" }} context={context} /><InlineEntryText node={node} target={{ base: "value" }} context={context} /><InlineEntryText node={node} target={{ base: "suffix" }} context={context} /></div><div data-stat-label><InlineEntryText node={node} target={{ base: "label" }} context={context} /></div></div>,
  rating: (node, context) => <div className={context.className} style={context.combineNodeStyles(node)} role="img" aria-label={node.accessibleLabel}><span aria-hidden="true" className="inline-flex">{Array.from({ length: node.max }, (_, index) => { const fill = Math.max(0, Math.min(1, node.value - index)); return fill === 0.5 ? <span key={index} className="relative inline-block" data-rating-fill="half"><span style={{ opacity: 0.3 }}>★</span><span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: "50%" }}>★</span></span> : <span key={index} data-rating-fill={fill === 1 ? "full" : "empty"} style={{ opacity: fill === 0 ? 0.3 : 1 }}>★</span>; })}</span>{node.showValue ? <span> {node.value}/{node.max}</span> : null}</div>,
  quote: (node, context) => {
    const avatar = node.avatarSrc ? normalizeImageUrl(node.avatarSrc) : undefined;
    return <figure className={context.className} style={context.combineNodeStyles(node)}><blockquote><InlineEntryText node={node} target={{ base: "quote" }} context={context} /></blockquote><figcaption className="flex items-center gap-2">{avatar?.success && node.avatarAlt ? <img src={avatar.value} alt={node.avatarAlt} /> : null}<span><InlineEntryText node={node} target={{ base: "author" }} context={context} />{node.role ? <span> — <InlineEntryText node={node} target={{ base: "role" }} context={context} /></span> : null}</span></figcaption></figure>;
  },
} satisfies Pick<ComponentRendererMap, "icon" | "badge" | "link" | "avatar" | "list" | "stat" | "rating" | "quote">;
