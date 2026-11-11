import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED TESTIMONIAL LIBRARY — BATCH 2 (EDITORIAL, MEDIA & TRANSFORMATION)
 * 5 Radically Distinct Architectural Archetypes:
 * 1. Oversized Editorial Typography Spread (Monochromatic Headline, Magazine)
 * 2. Editorial Split Quote & Portrait (50/50 Split Portrait, Warm Cream/Slate)
 * 3. Before & After Transformation Split (Comparative Dual Cards, Amber/Slate)
 * 4. In-Situ Product Screenshot Testimonial (Annotated Canvas Stage, Cobalt Blue)
 * 5. Compact Executive Quotation Ledger (Tabular Strip, 5 Quotes, Institutional)
 * ============================================================================
 */

// ============================================================================
// TEMPLATE 1: TESTIMONIAL-02-OVERSIZED-EDITORIAL-QUOTE
// ============================================================================

export const TESTIMONIAL_OVERSIZED_EDITORIAL_QUOTE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-02-oversized-editorial-quote",
  name: "Oversized Editorial Typography Spread",
  kind: "section",
  root: {
    id: "test02-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test02-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          /* Category Kicker */
          {
            id: "test02-kicker",
            type: "badge",
            text: "ARCHITECTURAL PERSPECTIVES · ESSAY 412",
            style: {
              color: { background: "background", text: "text-muted" },
              border: { width: "thin", color: "text-muted", radius: "sm" },
              typography: { size: "sm", weight: "bold" },
            },
          },

          /* Monumental Display Quote */
          {
            id: "test02-display-quote",
            type: "heading",
            level: 1,
            text: "“Good design is not what you add until nothing more can be added; it is what remains when nothing more can possibly be stripped away.”",
            style: {
              typography: {
                size: "4xl",
                weight: "medium",
                leading: "tight",
                align: "left",
              },
              color: { text: "text" },
            },
          },

          /* Elegant Fine Rule */
          {
            id: "test02-rule",
            type: "divider",
            style: {
              color: { text: "text-muted" },
              sizing: { width: "full" },
            },
          },

          /* Author Credit & Publication Footnote */
          {
            id: "test02-footer-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test02-author-credit",
                type: "text",
                text: "— Dieter Rams, Bauhaus Archive & Vitsoe Design Retrospective",
                style: {
                  typography: { size: "lg", weight: "medium" },
                  color: { text: "text" },
                },
              },
              {
                id: "test02-source-citation",
                type: "text",
                text: "ARCHITECTURAL REVIEW · GENEVA MONOGRAPH",
                style: {
                  typography: { size: "sm", weight: "bold" },
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

// ============================================================================
// TEMPLATE 2: TESTIMONIAL-03-SPLIT-QUOTE-PORTRAIT
// ============================================================================

export const TESTIMONIAL_SPLIT_QUOTE_PORTRAIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-03-split-quote-portrait",
  name: "Editorial Split Quote & Portrait",
  kind: "section",
  root: {
    id: "test03-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test03-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "2xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Left Column (6 cols): In-Depth Narrative Text */
          {
            id: "test03-left-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "test03-badge",
                type: "badge",
                text: "PRIVATE WEALTH & MARITIME ADVISORY",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
              {
                id: "test03-title",
                type: "heading",
                level: 2,
                text: "“A level of fiduciary rigor rare in modern digital platforms.”",
                style: {
                  typography: { size: "2xl", weight: "bold", leading: "snug" },
                  color: { text: "text" },
                },
              },
              {
                id: "test03-quote",
                type: "quote",
                quote:
                  "When orchestrating multi-jurisdictional acquisitions across Mediterranean maritime assets, our family office requires tools that respect strict privacy while delivering impeccable presentation quality. Ozmishow achieved both flawlessly.",
                author: "Lord Alistair Sterling",
                role: "Principal Trustee, Sterling Maritime Foundation",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "test03-cta-btn",
                type: "button",
                label: "Read Full Case Dossier",
                href: "#case-dossier-sterling",
                style: {
                  spacing: { marginTop: "sm" },
                },
              },
            ],
          },

          /* Right Column (6 cols): High-Resolution Square Environmental Portrait */
          {
            id: "test03-right-col",
            type: "card",
            element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            style: {
              color: { background: "background", text: "text" },
              border: { width: "thin", color: "text-muted", radius: "xl" },
              spacing: { padding: "md" },
            },
            children: [
              {
                id: "test03-portrait-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "test03-portrait-img",
                    type: "image",
                    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
                    alt: "Lord Alistair Sterling, Principal Trustee",
                    aspectRatio: "square",
                    objectFit: "cover",
                    style: {
                      border: { radius: "lg" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "test03-portrait-caption",
                    type: "text",
                    text: "Private Client Salon · Lake Geneva, Switzerland",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                      spacing: { paddingX: "xs", paddingTop: "xs" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 3: TESTIMONIAL-09-TESTIMONIAL-BEFORE-AFTER-RESULT
// ============================================================================

export const TESTIMONIAL_BEFORE_AFTER_RESULT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-09-testimonial-before-after-result",
  name: "Before & After Transformation Split",
  kind: "section",
  root: {
    id: "test09-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test09-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Section Header */
          {
            id: "test09-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "2xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "test09-badge",
                type: "badge",
                text: "WORKFLOW COMPARATIVE AUDIT",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test09-title",
                type: "heading",
                level: 2,
                text: "From Painful Handoffs to Instant Live Sync",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test09-sub",
                type: "text",
                text: "How the Apex Systems team replaced 14 hours of weekly code synchronization with autonomous visual generation.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Comparative 2-Column Split Cards */
          {
            id: "test09-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "xl" },
              sizing: { width: "full" },
            },
            children: [
              /* Card 1: Before State (Muted Grey / Friction) */
              {
                id: "test09-before-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "background", text: "text" },
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "test09-before-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test09-before-badge",
                        type: "badge",
                        text: "BEFORE OZMISHOW · LEGACY WORKFLOW",
                        style: {
                          color: { background: "background", text: "text-muted" },
                          border: { width: "thin", color: "text-muted", radius: "sm" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test09-before-stat",
                        type: "stat",
                        value: "14 Hours / Wk",
                        label: "Manual Figma-to-React markup translation",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "test09-before-img",
                        type: "image",
                        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
                        alt: "Legacy manual code review backlog",
                        aspectRatio: "landscape",
                        objectFit: "cover",
                        style: {
                          border: { radius: "md" },
                          sizing: { width: "full" },
                        },
                      },
                      {
                        id: "test09-before-quote",
                        type: "text",
                        text: "“Every small landing page adjustment required three developers, two pull requests, and a five-day staging cycle. Minor styling tweaks constantly delayed sprint goals.”",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Card 2: After State (Luminous Accent / Delight) */
              {
                id: "test09-after-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "background", text: "text" },
                  border: { width: "thin", color: "primary", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "test09-after-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test09-after-badge",
                        type: "badge",
                        text: "AFTER OZMISHOW · AUTONOMOUS DEPLOY",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test09-after-stat",
                        type: "stat",
                        value: "22 Minutes",
                        label: "Visual canvas edit directly to production CDN",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "primary" },
                        },
                      },
                      {
                        id: "test09-after-img",
                        type: "image",
                        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
                        alt: "Visual engine real-time deploy dashboard",
                        aspectRatio: "landscape",
                        objectFit: "cover",
                        style: {
                          border: { radius: "md" },
                          sizing: { width: "full" },
                        },
                      },
                      {
                        id: "test09-after-quote",
                        type: "text",
                        text: "“Now our growth team visually composes and verifies sections in real-time, confident that the schema engine protects design integrity and zero visual regressions occur.”",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Bottom Author Attribution & CTA */
          {
            id: "test09-action-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              sizing: { width: "full" },
              spacing: { marginTop: "md" },
            },
            children: [
              {
                id: "test09-author-meta",
                type: "text",
                text: "Verified Transformation by Kieran Blake · Lead Architect, Apex Systems",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "test09-calc-btn",
                type: "button",
                label: "Calculate Your Team's Time Savings",
                href: "#savings-calculator",
              },
            ],
          },
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 4: TESTIMONIAL-10-TESTIMONIAL-PRODUCT-SCREENSHOT
// ============================================================================

export const TESTIMONIAL_PRODUCT_SCREENSHOT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-10-testimonial-product-screenshot",
  name: "In-Situ Product Screenshot Testimonial",
  kind: "section",
  root: {
    id: "test10-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test10-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          /* Header Info */
          {
            id: "test10-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "2xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "test10-badge",
                type: "badge",
                text: "IN-SITU PRODUCT EXPERIENCE",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test10-title",
                type: "heading",
                level: 2,
                text: "Engineered for Product Designers & Builders",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test10-sub",
                type: "text",
                text: "See how world-class product teams interact live with the visual engine schema builder.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Browser Mockup Window with Annotated Screenshot & Review */
          {
            id: "test10-stage-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "background", text: "text" },
              border: { width: "thin", color: "text-muted", radius: "xl" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test10-stage-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Product Screenshot */
                  {
                    id: "test10-screenshot",
                    type: "image",
                    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
                    alt: "Live Visual Builder interface canvas in active production session",
                    aspectRatio: "wide",
                    objectFit: "cover",
                    style: {
                      border: { radius: "lg" },
                      sizing: { width: "full" },
                    },
                  },

                  /* Review Annotation Callout */
                  {
                    id: "test10-annotation-card",
                    type: "card",
                    element: "div",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "primary", radius: "lg" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "test10-annotation-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test10-feature-badge",
                            type: "badge",
                            text: "FEATURE IN-FOCUS: SCHEMA DATA BINDINGS",
                            style: {
                              color: { background: "primary", text: "background" },
                              typography: { size: "sm", weight: "bold" },
                            },
                          },
                          {
                            id: "test10-quote",
                            type: "quote",
                            quote:
                              "The breakthrough for us was component isolation. Our product designers can visually assemble high-converting pages, while our developers know every emitted node strictly conforms to our TypeScript schema.",
                            author: "Maya Lin",
                            role: "Head of Design Systems, Figma Ecosystem Partner",
                            avatarSrc:
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                            avatarAlt: "Maya Lin",
                            style: {
                              typography: { size: "base", leading: "relaxed" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "test10-demo-link",
                            type: "link",
                            label: "Launch live interactive builder playground →",
                            href: "#playground",
                            openInNewTab: false,
                            style: {
                              color: { text: "primary" },
                              typography: { size: "sm", weight: "semibold" },
                              spacing: { marginTop: "xs" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 5: TESTIMONIAL-16-COMPACT-QUOTE-LIST
// ============================================================================

export const TESTIMONIAL_COMPACT_QUOTE_LIST_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-16-compact-quote-list",
  name: "Compact Executive Quotation Ledger",
  kind: "section",
  root: {
    id: "test16-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test16-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "test16-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            children: [
              {
                id: "test16-badge",
                type: "badge",
                text: "INSTITUTIONAL PERSPECTIVES",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test16-title",
                type: "heading",
                level: 2,
                text: "Executive Governance & Client Commentary",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test16-sub",
                type: "text",
                text: "Direct feedback from managing directors, general counsels, and enterprise architects.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Top Divider */
          {
            id: "test16-rule-top",
            type: "divider",
            style: { color: { text: "text-muted" }, sizing: { width: "full" } },
          },

          /* 5 Tabular Rows */

          /* Row 1 */
          {
            id: "test16-row-1",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test16-r1-author",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                children: [
                  {
                    id: "test16-r1-name",
                    type: "text",
                    text: "Julian Thorne",
                    style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "test16-r1-role",
                    type: "text",
                    text: "Managing Director, Thorne & Co. Capital",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "test16-r1-quote",
                type: "text",
                text: "“The deterministic state isolation and strict token governance easily satisfied our tier-1 institutional risk audit.”",
                layout: { span: { mobile: 12, tablet: 8, desktop: 8 } },
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
              },
            ],
          },

          {
            id: "test16-rule-1",
            type: "divider",
            style: { color: { text: "text-muted" }, sizing: { width: "full" } },
          },

          /* Row 2 */
          {
            id: "test16-row-2",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test16-r2-author",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                children: [
                  {
                    id: "test16-r2-name",
                    type: "text",
                    text: "Beatrice Moreau",
                    style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "test16-r2-role",
                    type: "text",
                    text: "General Counsel, Aegis Risk Advisory",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "test16-r2-quote",
                type: "text",
                text: "“Data sovereignty and full auditability out-of-the-box allowed us to deploy client portal sections across three sovereign jurisdictions without legal friction.”",
                layout: { span: { mobile: 12, tablet: 8, desktop: 8 } },
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
              },
            ],
          },

          {
            id: "test16-rule-2",
            type: "divider",
            style: { color: { text: "text-muted" }, sizing: { width: "full" } },
          },

          /* Row 3 */
          {
            id: "test16-row-3",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test16-r3-author",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                children: [
                  {
                    id: "test16-r3-name",
                    type: "text",
                    text: "Henrik Lindqvist",
                    style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "test16-r3-role",
                    type: "text",
                    text: "Chief Technology Officer, Nordic Sovereign Bank",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "test16-r3-quote",
                type: "text",
                text: "“We cut live migration time across 80 corporate client landing portals down to a single weekend. Remarkable engineering resilience.”",
                layout: { span: { mobile: 12, tablet: 8, desktop: 8 } },
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
              },
            ],
          },

          {
            id: "test16-rule-3",
            type: "divider",
            style: { color: { text: "text-muted" }, sizing: { width: "full" } },
          },

          /* Row 4 */
          {
            id: "test16-row-4",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test16-r4-author",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                children: [
                  {
                    id: "test16-r4-name",
                    type: "text",
                    text: "Valeria Rossi",
                    style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "test16-r4-role",
                    type: "text",
                    text: "Head of M&A Strategy, Milan Asset Partners",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "test16-r4-quote",
                type: "text",
                text: "“Elevated the visual presentation of our deal room prospectuses while slashing turnaround time by 60%.”",
                layout: { span: { mobile: 12, tablet: 8, desktop: 8 } },
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
              },
            ],
          },

          {
            id: "test16-rule-4",
            type: "divider",
            style: { color: { text: "text-muted" }, sizing: { width: "full" } },
          },

          /* Row 5 */
          {
            id: "test16-row-5",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test16-r5-author",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                children: [
                  {
                    id: "test16-r5-name",
                    type: "text",
                    text: "David K. Chen",
                    style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "test16-r5-role",
                    type: "text",
                    text: "Senior Partner, Apex Private Equity",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "test16-r5-quote",
                type: "text",
                text: "“The gold standard by which modern digital enterprise infrastructure and visual generation will now be measured.”",
                layout: { span: { mobile: 12, tablet: 8, desktop: 8 } },
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
              },
            ],
          },

          /* Bottom Divider */
          {
            id: "test16-rule-bottom",
            type: "divider",
            style: { color: { text: "text-muted" }, sizing: { width: "full" } },
          },

          /* Footnote */
          {
            id: "test16-footnote",
            type: "text",
            text: "Detailed institutional client references and audited performance logs available upon formal NDA request.",
            style: {
              typography: { size: "sm" },
              color: { text: "text-muted" },
              spacing: { marginTop: "xs" },
            },
          },
        ],
      },
    ],
  },
};

// ============================================================================
// BATCH 2 EXPORT ARRAY
// ============================================================================

export const CURATED_TESTIMONIAL_BATCH_2: ComponentDocument[] = [
  TESTIMONIAL_OVERSIZED_EDITORIAL_QUOTE_DOCUMENT,
  TESTIMONIAL_SPLIT_QUOTE_PORTRAIT_DOCUMENT,
  TESTIMONIAL_BEFORE_AFTER_RESULT_DOCUMENT,
  TESTIMONIAL_PRODUCT_SCREENSHOT_DOCUMENT,
  TESTIMONIAL_COMPACT_QUOTE_LIST_DOCUMENT,
];
