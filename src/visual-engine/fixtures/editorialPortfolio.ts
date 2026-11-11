import type { ComponentDocument, ComponentNode } from "../model";
import { applyEditorialPreset } from "../operations/designPreset";

function work(id: string, title: string, description: string): ComponentNode {
  return {
    id: `editorial-${id}`, type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "sm",
    children: [
      { id: `editorial-${id}-image`, type: "image", src: `/visual-builder/editorial-${id}.svg`, alt: description, aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full" }, border: { radius: "3xl" }, custom: { borderRadius: "32px" } } },
      { id: `editorial-${id}-caption`, type: "flex", direction: "row", alignment: "center", distribution: "between", wrap: false, gap: "sm", children: [
        { id: `editorial-${id}-title`, type: "text", text: title },
        { id: `editorial-${id}-year`, type: "text", text: "2026", style: { color: { text: "text-muted" } } },
      ] },
    ],
  };
}

export const EDITORIAL_PORTFOLIO_DOCUMENT: ComponentDocument = applyEditorialPreset({
  version: 2, id: "editorial-portfolio", name: "Editorial portfolio",
  root: {
    id: "editorial-section", type: "section",
    style: { spacing: { paddingX: "lg", paddingY: "xl", gap: "2xl" }, color: { background: "background", text: "text" } },
    children: [
      {
        id: "editorial-intro-shell", type: "stack", direction: "column", alignment: "center", distribution: "start", wrap: false, gap: "none",
        style: { spacing: { paddingY: "2xl" } },
        children: [{
          id: "editorial-intro", type: "stack", direction: "column", alignment: "start", distribution: "start", wrap: false, gap: "lg",
          style: { sizing: { maxWidth: "full" }, custom: { width: "640px" } },
          children: [
            { id: "editorial-availability", type: "text", text: "Independent studio · Open for thoughtful projects", style: { color: { text: "text-muted" }, spacing: { marginBottom: "sm" } } },
            { id: "editorial-heading", type: "heading", level: 1, text: "Considered design for people and the way they live." },
            { id: "editorial-about", type: "text", text: "We bring clarity to complex ideas. From the first conversation to the last small detail, we make digital experiences that feel natural, useful, and quietly distinctive." },
            { id: "editorial-actions", type: "flex", direction: "row", alignment: "center", distribution: "start", wrap: true, gap: "sm", style: { spacing: { marginTop: "sm" } }, children: [
              { id: "editorial-contact", type: "button", label: "Start a conversation", href: "mailto:hello@example.com", style: { color: { background: "primary", text: "primary-foreground" }, border: { radius: "full", shadow: "sm" }, spacing: { paddingX: "lg", paddingY: "sm" } } },
              { id: "editorial-work-link", type: "button", label: "Selected work ↗", href: "#editorial-work", style: { color: { background: "transparent", text: "text" }, border: { radius: "full", width: "hairline", color: "border" }, spacing: { paddingX: "lg", paddingY: "sm" } } },
            ] },
          ],
        }],
      },
      { id: "editorial-work", type: "infinite-slider", accessibleLabel: "Selected work", autoPlay: true, speed: 35, direction: "left", slideWidth: 420, gap: 20, pauseOnHover: true, fadeEdges: true, centerEmphasis: true, children: [
        work("forma", "Forma — A calmer way to work", "Original Forma dashboard illustration with a weekly activity chart"),
        work("fieldwork", "Fieldwork — Notes from outside", "Original Fieldwork editorial cover with a leaf illustration"),
        work("studio", "Studio — A home for good ideas", "Original Studio portfolio illustration with a minimal project grid"),
      ] },
      { id: "editorial-footer", type: "text", text: "Made with care. Built to last.", style: { typography: { align: "center" }, color: { text: "text-muted" }, spacing: { marginTop: "lg", marginBottom: "xl" } } },
    ],
  },
});
