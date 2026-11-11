import type { ComponentDocument } from "../model/document";

const heroSpans = { mobile: 12, tablet: 12, desktop: 6 } as const;

export const RESPONSIVE_HERO_DOCUMENT: ComponentDocument = {
  version: 1,
  id: "responsive-hero",
  name: "Responsive product hero",
  root: {
    id: "hero-section",
    type: "section",
    style: { spacing: { padding: "2xl" }, color: { background: "surface" } },
    children: [
      {
        id: "hero-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" } },
        children: [
          {
            id: "hero-content",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: { span: heroSpans },
            children: [
              {
                id: "hero-heading",
                type: "heading",
                text: "Build a better storefront",
                level: 1,
                style: { typography: { size: "4xl", weight: "bold" } },
              },
              {
                id: "hero-copy",
                type: "text",
                text: "Create polished product experiences with a responsive visual component system.",
                style: { typography: { size: "lg", align: "left" }, color: { text: "text-muted" } },
              },
              {
                id: "hero-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "hero-primary-action",
                    type: "button",
                    label: "Get started",
                    href: "/signup",
                    style: { color: { background: "primary", text: "inverse" }, border: { radius: "md" } },
                  },
                  {
                    id: "hero-secondary-action",
                    type: "button",
                    label: "View examples",
                    href: "/examples",
                    style: { color: { background: "surface-muted", text: "text" }, border: { radius: "md" } },
                  },
                ],
              },
            ],
          },
          {
            id: "hero-media",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "none",
            layout: { span: heroSpans },
            children: [
              {
                id: "hero-product-image",
                type: "image",
                src: "/visual-builder/hero-product.svg",
                alt: "Product analytics dashboard preview",
                style: { border: { radius: "lg" }, sizing: { width: "full" } },
              },
            ],
          },
        ],
      },
    ],
  },
};
