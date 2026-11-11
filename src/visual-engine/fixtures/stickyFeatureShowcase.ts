import type { ComponentDocument } from "../model";

export const STICKY_FEATURE_SHOWCASE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-sticky-split-showcase",
  name: "Sticky Split · Feature Showcase",
  kind: "section",
  root: {
    id: "sticky-showcase-section",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "sticky-showcase-grid",
        type: "grid",
        columns: 12,
        children: [
          {
            id: "sticky-left-content",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "xl",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 7 },
            },
            children: [
              {
                id: "sticky-header-badge",
                type: "badge",
                text: "FEATURE HIGHLIGHT",
                style: {
                  spacing: { marginBottom: "xs" },
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                },
              },
              {
                id: "sticky-main-heading",
                type: "heading",
                level: 2,
                text: "Everything you need to launch and scale",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                },
              },
              {
                id: "sticky-main-intro",
                type: "text",
                text: "Scroll through each step while the product preview remains pinned to the right side of the screen.",
                style: {
                  typography: { size: "lg" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "step-1-card",
                type: "card",
                element: "article",
                style: {
                  spacing: { padding: "xl", marginTop: "lg" },
                  border: { radius: "xl", width: "thin", color: "border" },
                  color: { background: "surface", text: "text" },
                },
                children: [
                  {
                    id: "step-1-badge",
                    type: "badge",
                    text: "Step 01",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "full" },
                    },
                  },
                  {
                    id: "step-1-title",
                    type: "heading",
                    level: 3,
                    text: "Intelligent Layouts & Visual Controls",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "sm", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "step-1-text",
                    type: "text",
                    text: "Position any component with precision. Toggle sticky behavior on cards, images, or media sidebars so visitors never lose context as they explore long-form storytelling or multi-step journeys.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "step-2-card",
                type: "card",
                element: "article",
                style: {
                  spacing: { padding: "xl", marginTop: "lg" },
                  border: { radius: "xl", width: "thin", color: "border" },
                  color: { background: "surface", text: "text" },
                },
                children: [
                  {
                    id: "step-2-badge",
                    type: "badge",
                    text: "Step 02",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "full" },
                    },
                  },
                  {
                    id: "step-2-title",
                    type: "heading",
                    level: 3,
                    text: "Synchronized AutoTable Data",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "sm", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "step-2-text",
                    type: "text",
                    text: "Connect collections and transactional pipelines directly into live site elements without coding custom APIs or complex backend plumbing.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "step-3-card",
                type: "card",
                element: "article",
                style: {
                  spacing: { padding: "xl", marginTop: "lg" },
                  border: { radius: "xl", width: "thin", color: "border" },
                  color: { background: "surface", text: "text" },
                },
                children: [
                  {
                    id: "step-3-badge",
                    type: "badge",
                    text: "Step 03",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "full" },
                    },
                  },
                  {
                    id: "step-3-title",
                    type: "heading",
                    level: 3,
                    text: "Production Performance & Multi-theme",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "sm", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "step-3-text",
                    type: "text",
                    text: "Adaptive contrast and full dark mode compatibility guarantee stunning visuals across mobile devices, tablets, and wide desktop displays.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "sticky-right-stage",
            type: "card",
            element: "div",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 5 },
            },
            style: {
              positioning: {
                position: "sticky",
                top: "xl",
              },
              border: { radius: "3xl", shadow: "xl", width: "thin", color: "border" },
              color: { background: "surface", text: "text" },
              spacing: { padding: "md" },
            },
            children: [
              {
                id: "sticky-stage-image",
                type: "image",
                src: "/visual-builder/placeholder.svg",
                alt: "Sticky Feature Preview",
                aspectRatio: "wide",
                objectFit: "cover",
                style: {
                  sizing: { width: "full", height: "30rem", fit: "cover" },
                  border: { radius: "xl" },
                },
              },
              {
                id: "sticky-stage-caption",
                type: "text",
                text: "Sticky Stage · Pinned to viewport top while reading through the story.",
                style: {
                  typography: { size: "sm", align: "center" },
                  spacing: { paddingTop: "sm" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

