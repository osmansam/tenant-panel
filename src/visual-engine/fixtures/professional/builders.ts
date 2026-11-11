import type { ComponentDocument, ComponentNode, GridNode, StackNode, StyleSpec, ColorToken } from "../../model";

export interface EffectOption {
  effectId: string;
  props: Record<string, string | number | boolean>;
}

/** These helpers compose existing editable nodes; they do not add a second renderer. */
export function design(
  id: string,
  name: string,
  build: (b: ReturnType<typeof blocks>) => ComponentNode[],
  dark = false,
  effect?: EffectOption,
): ComponentDocument {
  const b = blocks(id, dark);
  const effects = effect
    ? [{
        attachmentId: `${id}-effect`,
        effectId: effect.effectId,
        version: 1,
        enabled: true,
        props: effect.props,
      }]
    : undefined;
  return { version: 2, id, name, root: {
    id: `${id}-section`, type: "section",
    ...(effects ? { effects } : {}),
    style: { color: { background: dark ? "text" : "surface", text: dark ? "inverse" : "text" }, typography: { family: "system" }, custom: { padding: "5vw" } },
    children: [b.stack(build(b), { sizing: { width: "full", maxWidth: "6xl", align: "center" }, custom: { gap: "2rem" } })],
  } };
}

export function blocks(prefix: string, dark = false) {
  let sequence = 0;
  const id = () => `${prefix}-${++sequence}`;
  const ink: ColorToken = dark ? "inverse" : "text";
  const muted: ColorToken = dark ? "inverse-muted" : "text-muted";
  const stack = (children: ComponentNode[], style: StyleSpec = {}, gap: StackNode["gap"] = "lg"): StackNode => ({ id: id(), type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap, style, children });
  const text = (value: string, style: StyleSpec = {}): ComponentNode => ({ id: id(), type: "text", text: value, style: { color: { text: muted }, typography: { size: "base", leading: "relaxed" }, ...style } });
  const heading = (value: string, size: "xl" | "2xl" | "4xl" | "6xl" = "4xl", style: StyleSpec = {}): ComponentNode => ({ id: id(), type: "heading", level: size === "xl" || size === "2xl" ? 3 : 2, text: value, style: { color: { text: ink }, typography: { size, weight: "semibold", tracking: "tight", leading: "tight" }, ...style } });
  const eyebrow = (value: string) => text(value, { color: { text: dark ? "inverse-muted" : "primary" }, typography: { size: "sm", weight: "semibold", tracking: "wide" } });
  const button = (label: string, href = "mailto:hello@example.com", secondary = false): ComponentNode => ({ id: id(), type: "button", label, href, style: { spacing: { padding: "md" }, color: { background: secondary ? "transparent" : dark ? "surface" : "text", text: dark && !secondary ? "text" : secondary ? ink : "inverse" }, border: { radius: "md", width: "hairline", color: dark ? "inverse-muted" : "text-subtle" }, typography: { size: "sm", weight: "semibold" } } });
  const shimmerBadge = (value: string, color = "#2dd4bf", highlight = "#ffffff"): ComponentNode => {
    const nodeId = id();
    return {
      id: nodeId,
      type: "text",
      text: value,
      effects: [{
        attachmentId: `${nodeId}-shimmer`,
        effectId: "ozmishow.text.shimmer",
        version: 1,
        enabled: true,
        props: { color, highlight, duration: 2.2, width: 28 },
      }],
      style: {
        spacing: { padding: "xs", paddingX: "md" },
        border: { radius: "full", width: "thin", color: "text-subtle" },
        typography: { size: "sm", weight: "semibold", tracking: "wide" },
        color: { background: "surface-sunken", text: ink },
      },
    };
  };
  const shimmerHeading = (value: string, size: "xl" | "2xl" | "4xl" | "6xl" = "4xl", color = "#2dd4bf", highlight = "#ffffff", style: StyleSpec = {}): ComponentNode => {
    const nodeId = id();
    return {
      id: nodeId,
      type: "heading",
      level: size === "xl" || size === "2xl" ? 3 : 2,
      text: value,
      effects: [{
        attachmentId: `${nodeId}-shimmer`,
        effectId: "ozmishow.text.shimmer",
        version: 1,
        enabled: true,
        props: { color, highlight, duration: 2.5, width: 25 },
      }],
      style: {
        color: { text: ink },
        typography: { size, weight: "bold", tracking: "tight", leading: "tight" },
        ...style,
      },
    };
  };
  const magneticButton = (label: string, href = "mailto:hello@example.com", secondary = false, strength = 12): ComponentNode => {
    const nodeId = id();
    return {
      id: nodeId,
      type: "button",
      label,
      href,
      effects: [{
        attachmentId: `${nodeId}-magnetic`,
        effectId: "ozmishow.button.magnetic-lite",
        version: 1,
        enabled: true,
        props: { strength },
      }],
      style: {
        spacing: { padding: "md", paddingX: "lg" },
        color: { background: secondary ? "transparent" : "primary", text: "inverse" },
        border: { radius: "lg", width: "hairline", color: secondary ? "text-subtle" : "transparent" },
        typography: { size: "sm", weight: "semibold" },
      },
    };
  };
  const row = (children: ComponentNode[]): ComponentNode => ({ id: id(), type: "flex", direction: "row", alignment: "center", distribution: "start", wrap: true, gap: "md", children });
  const grid = (children: ComponentNode[], spans: number[], tablet?: number[]): GridNode => ({ id: id(), type: "grid", columns: 12, style: { spacing: { gap: "xl" }, sizing: { width: "full" } }, children: children.map((child, i) => ({ ...child, layout: { span: { mobile: 12, tablet: tablet?.[i] ?? spans[i], desktop: spans[i] } } })) });
  const panel = (children: ComponentNode[], accent = false) => stack(children, { color: { background: accent ? "primary-soft" : dark ? "transparent" : "surface-sunken", text: accent ? "text" : ink }, border: { radius: "xl", width: "hairline", color: "text-subtle" }, spacing: { padding: "xl" } });
  const glassPanel = (children: ComponentNode[], accent = false) => stack(children, { color: { background: accent ? "primary-soft" : "surface-sunken", text: ink }, border: { radius: "xl", width: "hairline", color: accent ? "primary" : "text-subtle" }, spacing: { padding: "xl" } });
  const line = (): ComponentNode => ({ id: id(), type: "divider", style: { sizing: { width: "full" }, color: { text: dark ? "text-muted" : "surface-muted" } } });
  const image = (src: string, alt: string, aspectRatio: "landscape" | "square" | "wide" | "portrait" = "landscape"): ComponentNode => ({ id: id(), type: "image", src, alt, aspectRatio, objectFit: "cover", style: { sizing: { width: "full" }, border: { radius: "lg" } } });
  const intro = (label: string, title: string, description?: string) => stack([eyebrow(label), heading(title), ...(description ? [text(description)] : [])], { sizing: { maxWidth: "3xl" } }, "md");
  const question = (title: string, answer: string, open = false): ComponentNode => ({ id: id(), type: "disclosure", defaultOpen: open, transition: "height-fade", style: { border: { radius: "md", width: "hairline", color: "text-subtle" }, color: { background: "surface", text: "text" } }, children: [
    { id: id(), type: "slot", name: "trigger", children: [heading(title, "xl")] },
    { id: id(), type: "slot", name: "content", children: [text(answer)] },
  ] });
  const faq = (pairs: [string, string][]): ComponentNode => ({ id: id(), type: "accordion", openMode: "single", collapsible: true, children: pairs.map(([title, answer], i) => question(title, answer, i === 0)), style: { spacing: { gap: "md" } } });
  return { stack, text, heading, eyebrow, button, shimmerBadge, shimmerHeading, magneticButton, row, grid, panel, glassPanel, line, image, intro, question, faq };
}
