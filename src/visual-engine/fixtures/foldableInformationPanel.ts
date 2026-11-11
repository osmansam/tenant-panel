import type { ComponentDocument } from "../model";

export const FOLDABLE_INFORMATION_PANEL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "foldable-information-panel",
  name: "Foldable information panel",
  root: {
    id: "foldable-section",
    type: "section",
    style: {
      spacing: { padding: "2xl" },
      color: { background: "gradient-surface", text: "text" },
      sizing: { height: "opening-screen" },
    },
    children: [
      {
        id: "foldable-intro",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "md",
        style: { spacing: { padding: "xl" }, sizing: { maxWidth: "4xl", align: "center" } },
        children: [
          {
            id: "foldable-eyebrow",
            type: "text",
            text: "FOLDABLE STORY",
            style: { color: { text: "primary" }, typography: { size: "sm", weight: "bold", tracking: "wide", align: "center" } },
          },
          {
            id: "foldable-heading",
            type: "heading",
            level: 1,
            text: "Keep the page simple. Reveal the detail when it matters.",
            style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight", align: "center" }, color: { text: "text" } },
          },
          {
            id: "foldable-summary",
            type: "text",
            text: "Select the panel title or any element inside the open area to customize this starter.",
            style: { typography: { size: "lg", leading: "relaxed", align: "center" }, color: { text: "text-muted" }, sizing: { maxWidth: "2xl", align: "center" } },
          },
        ],
      },
      {
        id: "foldable-panel",
        type: "disclosure",
        defaultOpen: true,
        transition: "height-fade",
        style: {
          spacing: { margin: "lg" },
          color: { background: "surface" },
          border: { radius: "3xl", width: "thin", color: "text-subtle", shadow: "xl" },
          sizing: { maxWidth: "6xl", align: "center" },
        },
        children: [
          {
            id: "foldable-trigger",
            type: "slot",
            name: "trigger",
            children: [{
              id: "foldable-trigger-title",
              type: "heading",
              level: 2,
              text: "Discover what makes this experience different",
              style: { typography: { size: "xl", weight: "semibold", tracking: "tight" }, color: { text: "text" } },
            }],
          },
          {
            id: "foldable-content",
            type: "slot",
            name: "content",
            children: [{
              id: "foldable-content-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { padding: "lg", gap: "xl" } },
              children: [
                {
                  id: "foldable-image",
                  type: "image",
                  src: "/visual-builder/placeholder.svg",
                  alt: "A customizable visual",
                  aspectRatio: "landscape",
                  objectFit: "cover",
                  layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                  style: { border: { radius: "xl", shadow: "sm" }, sizing: { width: "full", fit: "cover" } },
                },
                {
                  id: "foldable-copy",
                  type: "stack",
                  direction: "column",
                  alignment: "stretch",
                  distribution: "center",
                  wrap: false,
                  gap: "lg",
                  layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                  style: { spacing: { padding: "md" } },
                  children: [
                    {
                      id: "foldable-content-heading",
                      type: "heading",
                      level: 3,
                      text: "A complete content area inside one fold",
                      style: { typography: { size: "2xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
                    },
                    {
                      id: "foldable-content-body",
                      type: "text",
                      text: "Add paragraphs, images, buttons, grids, or stacks here. The content stays in the rendered HTML and opens with accessible keyboard controls.",
                      style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
                    },
                    {
                      id: "foldable-content-action",
                      type: "button",
                      label: "Explore the details",
                      href: "#details",
                      style: { spacing: { padding: "md" }, color: { background: "primary", text: "inverse" }, typography: { weight: "semibold" }, border: { radius: "lg", shadow: "sm" } },
                    },
                  ],
                },
              ],
            }],
          },
        ],
      },
    ],
  },
};
