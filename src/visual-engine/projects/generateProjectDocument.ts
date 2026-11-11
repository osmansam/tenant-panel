import { applyConfiguredDesign } from "../operations/designStyle";
import type { ComponentDocument, ComponentNode, ImageNode } from "../model";

export interface ProjectContent {
  title: string;
  description: string;
  images: Array<Pick<ImageNode, "src" | "alt">>;
}

const RESERVED_SLUGS = new Set([
  "admin", "api", "login", "logout", "auth", "home", "visual-builder", "robots", "sitemap", "favicon", "assets", "static",
]);

/** A single literal URL segment; locale-shaped names are reserved for routing. */
export function projectSlugError(slug: string): string | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 80) return "Use 1–80 lowercase letters, numbers and single hyphens.";
  if (RESERVED_SLUGS.has(slug) || /^[a-z]{2}(?:-[a-z]{2})?$/.test(slug)) return "This URL is reserved. Choose another project URL.";
  return null;
}

export function suggestProjectSlug(title: string): string {
  const base = title.replace(/[ıİ]/g, "i").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72).replace(/-$/, "") || "project";
  return projectSlugError(base) ? `${base}-project` : base;
}

/** Expandable-card details are deliberately excluded at every nesting level. */
export function extractProjectContent(slide: ComponentNode): ProjectContent {
  const visible: ComponentNode[] = [];
  function visit(node: ComponentNode) {
    if (node.type === "slot" && node.name === "details") return;
    if (node.responsive?.visibility && Object.values(node.responsive.visibility).every(value => !value)) return;
    visible.push(node);
    if ("children" in node) {
      const children = node.type === "expandable-card"
        ? node.children.filter(child => child.type === "slot" && child.name === "preview")
        : node.children;
      children.forEach(visit);
    }
  }
  visit(slide);
  const headings = visible.filter((node): node is Extract<ComponentNode, { type: "heading" }> => node.type === "heading" && !!node.text.trim());
  const texts = visible.filter((node): node is Extract<ComponentNode, { type: "text" }> => node.type === "text" && !!node.text.trim());
  const title = headings[0]?.text.trim() || texts[0]?.text.trim() || "Untitled project";
  const description = texts.find(node => node.text.trim() !== title && !/^[\d\s./-]+$/.test(node.text.trim()))?.text.trim() || "Tell the story behind this project.";
  const images = visible.flatMap(node => node.type === "image" && node.src.trim() ? [{ src: node.src, alt: node.alt }] : []);
  return { title, description, images };
}

/** Fresh content, IDs and style settings keep the generated page independently editable. */
export function generateProjectDocument(
  source: ComponentDocument,
  slide: ComponentNode,
  overrides: Partial<Pick<ProjectContent, "title" | "description">> = {},
  createId: () => string = () => crypto.randomUUID(),
): ComponentDocument {
  const content = { ...extractProjectContent(slide), ...overrides };
  const reserved = new Set<string>([source.id]);
  function remember(node: ComponentNode) { reserved.add(node.id); if ("children" in node) node.children.forEach(remember); }
  remember(source.root);
  const id = () => {
    let candidate = createId();
    // A misbehaving custom factory must never duplicate a source or generated ID.
    if (reserved.has(candidate)) candidate = crypto.randomUUID();
    while (reserved.has(candidate)) candidate = crypto.randomUUID();
    reserved.add(candidate);
    return candidate;
  };
  const generated: ComponentDocument = {
    version: 2, id: id(), name: content.title, kind: "section",
    root: {
      id: id(), type: "section",
      ...(source.root.designPreset ? { designPreset: source.root.designPreset } : {}),
      ...(source.root.designStyle ? { designStyle: JSON.parse(JSON.stringify(source.root.designStyle)) } : {}),
      style: { color: { background: "background", text: "text" }, spacing: { padding: "xl", gap: "lg" } },
      children: [
        { id: id(), type: "heading", level: 1, text: content.title, style: { typography: { size: "4xl", weight: "semibold", leading: "tight" } } },
        { id: id(), type: "text", text: content.description, style: { typography: { size: "lg", leading: "relaxed" } } },
        ...content.images.map(image => ({ id: id(), type: "image" as const, ...image, aspectRatio: "landscape" as const, objectFit: "cover" as const, style: { border: { radius: "lg" as const } } })),
      ],
    },
  };
  return source.root.designPreset ? applyConfiguredDesign(generated, source.root.designPreset, source.root.designStyle) : generated;
}
