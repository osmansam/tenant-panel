import type { ComponentDocument, DisclosureNode } from "../model";

function disclosure(id: string, title: string, body: string, defaultOpen = false): DisclosureNode {
  return {
    id,
    type: "disclosure",
    defaultOpen,
    transition: "height-fade",
    style: {
      color: { background: "surface" },
      border: { radius: "xl", width: "hairline", color: "text-subtle", shadow: "sm" },
    },
    children: [
      {
        id: `${id}-trigger`,
        type: "slot",
        name: "trigger",
        children: [{
          id: `${id}-title`,
          type: "text",
          text: title,
          style: { typography: { size: "lg", weight: "semibold" }, color: { text: "text" } },
        }],
      },
      {
        id: `${id}-content`,
        type: "slot",
        name: "content",
        children: [{
          id: `${id}-body`,
          type: "text",
          text: body,
          style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
        }],
      },
    ],
  };
}

export const EXPANDABLE_COLLECTION_SHOWCASE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "expandable-collection-showcase",
  name: "Expandable collection showcase",
  root: {
    id: "showcase-section",
    type: "section",
    style: {
      spacing: { padding: "2xl" },
      color: { background: "surface-sunken", text: "text" },
      sizing: { height: "opening-screen" },
    },
    children: [
      {
        id: "showcase-intro",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "md",
        style: { spacing: { padding: "xl" }, sizing: { maxWidth: "4xl", align: "center" } },
        children: [
          {
            id: "showcase-eyebrow",
            type: "text",
            text: "EDITABLE CONTENT SYSTEM",
            style: { color: { text: "primary" }, typography: { size: "sm", weight: "bold", tracking: "wide", align: "center" } },
          },
          {
            id: "showcase-heading",
            type: "heading",
            level: 1,
            text: "Answers and products, built once.",
            style: { color: { text: "text" }, typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight", align: "center" } },
          },
          {
            id: "showcase-description",
            type: "text",
            text: "Edit the accordion content directly, then connect the product template to your AutoTable fields.",
            style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed", align: "center" }, sizing: { maxWidth: "2xl", align: "center" } },
          },
        ],
      },
      {
        id: "showcase-accordion",
        type: "accordion",
        openMode: "single",
        collapsible: true,
        style: { spacing: { padding: "md" }, sizing: { maxWidth: "4xl", align: "center" } },
        children: [
          disclosure("showcase-disclosure-one", "How do I edit these sections?", "Select this title or its content on the canvas, then edit it in the properties inspector.", true),
          disclosure("showcase-disclosure-two", "Can I add another item?", "Select the Accordion layer and press Add item. The new disclosure receives its own unique node IDs."),
          disclosure("showcase-disclosure-three", "Where do the products come from?", "The repeater below reads the products AutoTable schema and applies each record to one reusable visual item template."),
        ],
      },
      {
        id: "showcase-product-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { padding: "lg", gap: "lg" }, sizing: { width: "full" } },
        children: [{
          id: "showcase-repeater",
          type: "repeater",
          source: { kind: "autotable", schemaName: "products", limit: 6, sort: [{ field: "name", direction: "asc" }] },
          itemAlias: "product",
          layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
          children: [{
            id: "showcase-item-template",
            type: "slot",
            name: "item",
            children: [{
              id: "showcase-product-card",
              type: "stack",
              direction: "column",
              alignment: "stretch",
              distribution: "between",
              wrap: false,
              gap: "md",
              style: {
                spacing: { padding: "lg" },
                color: { background: "surface" },
                border: { radius: "xl", width: "hairline", color: "text-subtle", shadow: "md" },
                sizing: { height: "full" },
              },
              children: [
                {
                  id: "showcase-product-image",
                  type: "image",
                  src: "/visual-builder/placeholder.svg",
                  alt: "Example product",
                  aspectRatio: "landscape",
                  objectFit: "cover",
                  bindings: {
                    src: { source: "item", path: ["image"] },
                    alt: { source: "item", path: ["name"] },
                  },
                  style: { border: { radius: "lg" }, sizing: { width: "full", fit: "cover" } },
                },
                {
                  id: "showcase-product-name",
                  type: "heading",
                  level: 3,
                  text: "Example product",
                  bindings: { text: { source: "item", path: ["name"] } },
                  style: { color: { text: "text" }, typography: { size: "2xl", weight: "semibold", tracking: "tight" } },
                },
                {
                  id: "showcase-product-description",
                  type: "text",
                  text: "This fallback card stays editable in the builder.",
                  bindings: { text: { source: "item", path: ["description"] } },
                  style: { color: { text: "text-muted" }, typography: { leading: "relaxed" } },
                },
                {
                  id: "showcase-product-link",
                  type: "button",
                  label: "View product",
                  href: "/",
                  bindings: { href: { source: "item", path: ["url"] } },
                  style: { spacing: { padding: "md" }, color: { background: "primary", text: "inverse" }, typography: { weight: "semibold" }, border: { radius: "lg" } },
                },
              ],
            }],
          }],
        }],
      },
    ],
  },
};
