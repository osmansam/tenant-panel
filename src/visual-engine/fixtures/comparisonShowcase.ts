import type { CardNode, ComponentDocument } from "../model";
import type { DesignPresetId } from "../model/designPresets";
import { applyDesignPreset } from "../operations/designPreset";

function storyCard(id: string, number: string, title: string, text: string): CardNode {
  return {
    id, type: "card", element: "article",
    layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
    style: { spacing: { padding: "lg" }, color: { background: "surface", text: "text" } },
    children: [
      { id: `${id}-number`, type: "text", text: number, style: { color: { text: "accent" }, spacing: { marginBottom: "lg" } } },
      { id: `${id}-title`, type: "heading", level: 3, text: title, style: { spacing: { marginBottom: "sm" } } },
      { id: `${id}-copy`, type: "text", text, style: { color: { text: "text-muted" } } },
    ],
  };
}

const studio: ComponentDocument = {
  version: 2, id: "before-after-studio", name: "Before & after studio",
  root: {
    id: "studio-section", type: "section",
    style: { color: { background: "background", text: "text" }, spacing: { paddingX: "lg", paddingY: "2xl" } },
    children: [{
      id: "studio-shell", type: "stack", direction: "column", alignment: "stretch", distribution: "start", gap: "xl", wrap: false,
      style: { sizing: { maxWidth: "5xl", align: "center" } },
      children: [
        { id: "studio-intro", type: "stack", direction: "column", alignment: "start", distribution: "start", gap: "md", wrap: false,
          style: { sizing: { maxWidth: "2xl" } }, children: [
            { id: "studio-eyebrow", type: "text", text: "FORM & FUNCTION / A REDESIGN STORY", style: { color: { text: "accent" } } },
            { id: "studio-title", type: "heading", level: 1, text: "See what a little clarity can change." },
            { id: "studio-description", type: "text", text: "The same workspace, thoughtfully reimagined. Drag the divider to explore the transformation, one detail at a time.", style: { color: { text: "text-muted" } } },
          ] },
        { id: "studio-comparison", type: "image-comparison", beforeSrc: "/visual-builder/comparison-before.svg", afterSrc: "/visual-builder/comparison-after.svg", beforeAlt: "Original workspace dashboard with dense navigation, gray data panels and a crowded activity table", afterAlt: "Redesigned workspace dashboard with clear navigation, a green activity chart and spacious project cards", beforeLabel: "Before", afterLabel: "After", accessibleLabel: "Workspace redesign", position: 50, showLabels: true, aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full" }, border: { radius: "xl", width: "hairline", color: "border" } } },
        { id: "studio-caption", type: "text", text: "A fictional workspace, illustrated for this template. Replace both images with your own work.", style: { color: { text: "text-muted" } } },
        { id: "studio-story", type: "grid", columns: 12, style: { spacing: { gap: "md" } }, children: [
          storyCard("studio-challenge", "01 / THE CHALLENGE", "Make room to focus.", "Too many competing details made everyday work harder than it needed to be."),
          storyCard("studio-change", "02 / THE APPROACH", "Keep what matters.", "A clearer hierarchy, considered spacing and a calmer palette bring the essentials forward."),
          storyCard("studio-result", "03 / THE RESULT", "A better daily rhythm.", "An approachable workspace that helps people see their progress and find their next step."),
        ] },
        { id: "studio-footer", type: "flex", direction: "row", alignment: "center", distribution: "between", gap: "md", wrap: true,
          style: { spacing: { paddingY: "lg" } }, children: [
            { id: "studio-footer-copy", type: "text", text: "Have something worth reimagining?" },
            { id: "studio-contact", type: "button", label: "Let’s make it happen ↗", href: "mailto:hello@example.com", style: { spacing: { paddingX: "lg", paddingY: "md" }, color: { background: "primary", text: "primary-foreground" } } },
          ] },
      ],
    }],
  },
};

export const BEFORE_AFTER_STUDIO_DOCUMENT = applyDesignPreset(studio, "editorial");

function styledStudio(preset: DesignPresetId, name: string): ComponentDocument {
  return applyDesignPreset({ ...studio, id: `${preset}-studio`, name }, preset);
}

export const STYLE_KIT_STARTERS: ComponentDocument[] = [
  BEFORE_AFTER_STUDIO_DOCUMENT,
  styledStudio("swiss-minimal", "Swiss Minimal studio"),
  styledStudio("playful", "Playful studio"),
  styledStudio("luxury", "Luxury studio"),
  styledStudio("neo-brutalist", "Neo Brutalist studio"),
  styledStudio("soft-ui", "Soft UI studio"),
  styledStudio("terminal", "Terminal studio"),
  styledStudio("retro", "Retro studio"),
  styledStudio("nordic", "Nordic studio"),
  styledStudio("coastal", "Coastal studio"),
  styledStudio("botanical", "Botanical studio"),
  styledStudio("art-deco", "Art Deco studio"),
  styledStudio("midnight", "Midnight studio"),
  styledStudio("sunset", "Sunset studio"),
  styledStudio("blueprint", "Blueprint studio"),
  styledStudio("sakura", "Sakura studio"),
];
