import type { ComponentDocument, StackNode } from "../model";

function serviceCard(id: string, title: string, detail: string, featured = false): StackNode {
  return {
    id, type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "md",
    layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
    style: { spacing: { padding: "lg" }, border: { radius: "xl", width: "hairline", color: "text-subtle", shadow: "sm" } },
    children: [
      { id: `${id}-image`, type: "image", src: "/visual-builder/placeholder.svg", alt: title, objectFit: "cover", style: { sizing: { width: "full", height: "compact" }, border: { radius: "lg" } } },
      {
        id: `${id}-meta`, type: "flex", direction: "row", alignment: "center", distribution: "between", wrap: true, gap: "sm",
        children: [
          { id: `${id}-badge`, type: "text", text: featured ? "FEATURED" : "OPTION", style: { color: { text: "primary" }, typography: { size: "sm", weight: "bold", tracking: "wide" } } },
          { id: `${id}-availability`, type: "text", text: "Available now", style: { typography: { size: "sm", weight: "semibold" } } },
        ],
      },
      { id: `${id}-title`, type: "heading", level: 3, text: title, style: { typography: { size: "xl", weight: "bold", leading: "tight" } } },
      { id: `${id}-summary`, type: "text", text: "A carefully considered option with clear details and professional delivery.", style: { color: { text: "text-muted" }, typography: { size: "base", leading: "relaxed" } } },
      {
        id: `${id}-details`, type: "disclosure", defaultOpen: false, transition: "height-fade",
        children: [
          { id: `${id}-trigger`, type: "slot", name: "trigger", children: [{ id: `${id}-learn-more`, type: "text", text: "Learn more", style: { typography: { size: "sm", weight: "bold" } } }] },
          { id: `${id}-content`, type: "slot", name: "content", children: [
            { id: `${id}-body`, type: "text", text: detail, style: { color: { text: "text-muted" }, typography: { size: "base", leading: "relaxed" }, spacing: { padding: "sm" } } },
            { id: `${id}-contact`, type: "button", label: "Get in touch", href: "#contact", style: { color: { background: "primary", text: "surface" }, spacing: { padding: "md" }, border: { radius: "full" }, typography: { weight: "semibold" } } },
          ] },
        ],
      },
    ],
  };
}

export const EXPANDABLE_SERVICE_CARDS_DOCUMENT: ComponentDocument = {
  version: 2, id: "expandable-service-cards", name: "Expandable Service Cards",
  root: {
    id: "services-section", type: "section",
    style: { color: { background: "surface", text: "text" }, spacing: { padding: "xl" }, sizing: { height: "auto" } },
    children: [{
      id: "services-shell", type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "2xl",
      style: { sizing: { maxWidth: "6xl", align: "center" } },
      children: [
        {
          id: "services-intro", type: "stack", direction: "column", alignment: "start", distribution: "start", wrap: false, gap: "md",
          children: [
            { id: "services-eyebrow", type: "text", text: "WHAT WE DO", style: { color: { text: "primary" }, typography: { size: "sm", weight: "bold", tracking: "wide" } } },
            { id: "services-heading", type: "heading", level: 2, text: "Expert services built around your goals", style: { typography: { size: "4xl", weight: "bold", leading: "tight", tracking: "tight" } } },
            { id: "services-description", type: "text", text: "Explore the details and choose the option that fits your needs.", style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed" } } },
          ],
        },
        { id: "services-grid", type: "grid", columns: 12, style: { spacing: { gap: "lg" } }, children: [
          serviceCard("service-strategy", "Strategy consultation", "Start with a focused conversation about your goals. Together we review your priorities, identify opportunities, and create a practical plan for your next steps.", true),
          serviceCard("service-signature", "Signature service", "Turn your plan into a finished result with dedicated delivery, clear milestones, and regular updates. We tailor the scope and timeline to your needs."),
          serviceCard("service-support", "Ongoing support", "Keep moving forward with regular check-ins, practical guidance, and help when you need it. Choose a support rhythm that works for your team."),
        ] },
      ],
    }],
  },
};
