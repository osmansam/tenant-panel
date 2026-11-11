import type { ComponentDocument } from "../model";

export const REACT_BITS_SHOWCASE_DOCUMENT: ComponentDocument = {
  version: 1,
  id: "react-bits-showcase",
  name: "React Bits background lab",
  root: {
    id: "reactbits-hero",
    type: "section",
    effects: [{ attachmentId: "reactbits-active-background", effectId: "reactbits.background.threads", version: 1, enabled: true, props: { colorA: "#ffffff", amplitude: 1, distance: 0, enableMouseInteraction: true } }],
    style: { spacing: { padding: "2xl" }, color: { background: "transparent", text: "inverse" }, border: { radius: "3xl", width: "thin", color: "text-subtle" } },
    children: [{
      id: "reactbits-shell", type: "stack", direction: "column", alignment: "stretch", distribution: "between", wrap: false, gap: "2xl", style: { spacing: { gap: "2xl" }, sizing: { width: "full" } }, children: [
        { id: "reactbits-nav", type: "flex", direction: "row", alignment: "center", distribution: "between", wrap: true, gap: "lg", style: { spacing: { padding: "lg" }, color: { background: "transparent" }, background: [{ kind: "solid", color: { kind: "custom", value: "#17151f" }, opacity: 0.92 }], border: { radius: "xl", width: "thin", color: "text-subtle", shadow: "lg" } }, children: [
          { id: "reactbits-brand", type: "text", text: "✦  Ozmishow Effects", style: { typography: { size: "xl", weight: "semibold" }, color: { text: "inverse" } } },
          { id: "reactbits-nav-actions", type: "flex", direction: "row", alignment: "center", distribution: "end", wrap: true, gap: "lg", children: [
            { id: "reactbits-features", type: "text", text: "Features", style: { color: { text: "inverse-muted" }, typography: { weight: "medium" } } },
            { id: "reactbits-about", type: "text", text: "About", style: { color: { text: "inverse-muted" }, typography: { weight: "medium" } } },
            { id: "reactbits-signup", type: "button", label: "Sign up", href: "#signup", style: { spacing: { padding: "md" }, color: { background: "surface", text: "text" }, border: { radius: "lg" } } },
          ] },
        ] },
        { id: "reactbits-content", type: "stack", direction: "column", alignment: "center", distribution: "center", wrap: false, gap: "xl", style: { spacing: { padding: "2xl" }, sizing: { maxWidth: "2xl", align: "center" } }, children: [
          { id: "reactbits-badge", type: "text", text: "NEW  ·  Creative backgrounds", style: { spacing: { padding: "sm" }, color: { background: "transparent", text: "inverse-muted" }, typography: { size: "sm", weight: "semibold", tracking: "wide", align: "center" }, border: { radius: "full", width: "thin", color: "text-subtle" } } },
          { id: "reactbits-title", type: "heading", level: 1, text: "Make every background feel alive.", style: { color: { text: "inverse" }, typography: { size: "4xl", weight: "bold", leading: "tight", align: "center" } } },
          { id: "reactbits-description", type: "text", text: "Choose a React Bits effect in the inspector and tune it without writing code.", style: { color: { text: "inverse-muted" }, typography: { size: "lg", leading: "relaxed", align: "center" } } },
          { id: "reactbits-cta", type: "flex", direction: "row", alignment: "center", distribution: "center", wrap: true, gap: "md", children: [
            { id: "reactbits-primary", type: "button", label: "Get started", href: "#start", style: { spacing: { padding: "lg" }, color: { background: "surface", text: "text" }, border: { radius: "lg" } } },
            { id: "reactbits-secondary", type: "button", label: "Learn more", href: "#learn", style: { spacing: { padding: "lg" }, color: { background: "transparent", text: "inverse-muted" }, background: [{ kind: "solid", color: { kind: "custom", value: "#17151f" }, opacity: 0.9 }], border: { radius: "lg", width: "thin", color: "text-subtle" } } },
          ] },
        ] },
      ],
    }],
  },
};
