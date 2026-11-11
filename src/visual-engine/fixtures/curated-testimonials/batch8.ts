import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Testimonials — Batch 8 (Templates #07, #37, #38, #39, #40)
 *
 * #07: Case Study Strategic Dossier (testimonial-07-case-study-testimonial)
 * #37: Accredited Review with Industry Crests (testimonial-37-testimonial-award-trust-badges)
 * #38: Stark Swiss Minimalist Typographic Manifesto (testimonial-38-minimal-typography-only-testimonial)
 * #39: Haute Luxury Folio & Silk Aesthetic (testimonial-39-luxury-editorial-testimonial)
 * #40: Developer CLI Terminal & Code Review (testimonial-40-developer-product-testimonial-code-context)
 * ============================================================================
 */

export const CURATED_TESTIMONIAL_BATCH_8: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #07: Case Study Strategic Dossier
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-07-case-study-testimonial",
    name: "Case Study Strategic Dossier",
    kind: "section",
    root: {
      id: "test07-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test07-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test07-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test07-eyebrow",
                  type: "badge",
                  text: "STRATEGIC ENTERPRISE DOSSIER",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test07-title",
                  type: "heading",
                  level: 2,
                  text: "From 18-Month Redesign to 3-Week Production Rollout",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test07-subtitle",
                  type: "text",
                  text: "How Global Logistics Titan Trans-Pacific Accelerated Unified UI Delivery across 140 countries.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* 2-Column Dossier Split Grid */
            {
              id: "test07-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Left Column: Organization & Executive Profile (Span 4) */
                {
                  id: "test07-col-profile",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 5, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "test07-profile-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test07-profile-img",
                          type: "image",
                          src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
                          alt: "Marcus Vance, Chief Digital Officer",
                          aspectRatio: "square",
                          objectFit: "cover",
                          style: {
                            border: { radius: "lg" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "test07-client-meta",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "test07-client-name",
                              type: "text",
                              text: "Trans-Pacific Logistics",
                              style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "test07-client-scale",
                              type: "text",
                              text: "85,000 Employees · 140 Countries",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "test07-client-industry",
                              type: "badge",
                              text: "FREIGHT & SUPPLY CHAIN TECH",
                              style: {
                                color: { background: "background", text: "text" },
                                typography: { size: "sm" },
                              },
                            },
                          ],
                        },
                        {
                          id: "test07-cta-btn",
                          type: "button",
                          label: "Download Full Case Dossier (PDF)",
                          href: "#case-study-pdf",
                          style: {
                            spacing: { marginTop: "sm" },
                            sizing: { width: "full" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Right Column: Structured Case Narrative & Outcomes (Span 8) */
                {
                  id: "test07-col-narrative",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 7, desktop: 8 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "2xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test07-narrative-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "lg",
                      children: [
                        {
                          id: "test07-challenge-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "test07-challenge-badge",
                              type: "badge",
                              text: "THE ARCHITECTURAL CHALLENGE",
                              style: {
                                color: { background: "surface-muted", text: "text" },
                                typography: { size: "sm", weight: "bold" },
                              },
                            },
                            {
                              id: "test07-challenge-desc",
                              type: "text",
                              text: "Maintaining 14 inconsistent regional design forks cost Trans-Pacific $4.8M annually in engineering rework and delayed critical shipment tracking interfaces across APAC and EMEA.",
                              style: { typography: { size: "base" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test07-quote",
                          type: "quote",
                          quote:
                            "Ozmishow provided the deterministic bridge between Figma design tokens and strict TypeScript schemas. We decoupled marketing and client tracking pages from frontend sprint backlogs, allowing regional teams to ship localized experiences in days instead of quarters.",
                          author: "Marcus Vance",
                          role: "Chief Digital Officer, Trans-Pacific Logistics",
                          style: { typography: { size: "lg" }, color: { text: "text" } },
                        },
                        {
                          id: "test07-stats-grid",
                          type: "grid",
                          columns: 12,
                          style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                          children: [
                            {
                              id: "test07-stat-1-cell",
                              type: "card",
                              element: "div",
                              layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                              style: {
                                border: { width: "thin", color: "text-muted", radius: "lg" },
                                spacing: { padding: "lg" },
                                color: { background: "surface-muted" },
                              },
                              children: [
                                {
                                  id: "test07-stat-1",
                                  type: "stat",
                                  value: "-82% Lead Time",
                                  label: "From Design Approval to Production Deploy",
                                },
                              ],
                            },
                            {
                              id: "test07-stat-2-cell",
                              type: "card",
                              element: "div",
                              layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                              style: {
                                border: { width: "thin", color: "text-muted", radius: "lg" },
                                spacing: { padding: "lg" },
                                color: { background: "surface-muted" },
                              },
                              children: [
                                {
                                  id: "test07-stat-2",
                                  type: "stat",
                                  value: "$3.4M Saved",
                                  label: "Annual Frontend Engineering Reallocation",
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
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #37: Accredited Review with Industry Crests
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-37-testimonial-award-trust-badges",
    name: "Accredited Review with Industry Crests",
    kind: "section",
    root: {
      id: "test37-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test37-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "5xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test37-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test37-eyebrow",
                  type: "badge",
                  text: "VERIFIED ENTERPRISE REPUTATION",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test37-title",
                  type: "heading",
                  level: 2,
                  text: "Ranked #1 Across Security & Architecture Audits",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* Dominant Center Quote Card */
            {
              id: "test37-quote-card",
              type: "card",
              element: "article",
              style: {
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "2xl" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "test37-quote-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "center",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  children: [
                    {
                      id: "test37-quote-badge",
                      type: "badge",
                      text: "GARTNER & FORRESTER VALIDATED INFRASTRUCTURE",
                      style: {
                        color: { background: "primary", text: "background" },
                        typography: { size: "sm", weight: "bold" },
                      },
                    },
                    {
                      id: "test37-quote",
                      type: "quote",
                      quote:
                        "In four enterprise cybersecurity RFP rounds, Ozmishow was the only visual authoring platform that satisfied our strict zero-trust runtime isolation and SOC 2 Type II audit criteria without requiring third-party browser plugins.",
                      author: "Dr. Aris Thorne",
                      role: "VP Cloud Security Architecture, Fortify Systems",
                      avatarSrc:
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&fit=crop&q=80",
                      avatarAlt: "Dr. Aris Thorne",
                      style: { typography: { size: "xl" }, color: { text: "text" } },
                    },
                  ],
                },
              ],
            },

            /* 3-Column Accreditation Crest Strip */
            {
              id: "test37-badges-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" }, spacing: { gap: "md" } },
              children: [
                {
                  id: "test37-badge-card-1",
                  type: "card",
                  element: "div",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test37-b1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test37-b1-badge",
                          type: "badge",
                          text: "LEADER 2026",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test37-b1-heading",
                          type: "heading",
                          level: 3,
                          text: "G2 Enterprise Grid",
                          style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test37-b1-desc",
                          type: "text",
                          text: "Highest Customer Satisfaction Score in Visual Development Runtimes.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "test37-badge-card-2",
                  type: "card",
                  element: "div",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test37-b2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test37-b2-badge",
                          type: "badge",
                          text: "INNOVATION AWARDEE",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test37-b2-heading",
                          type: "heading",
                          level: 3,
                          text: "Forrester Wave",
                          style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test37-b2-desc",
                          type: "text",
                          text: "Top Tier Performance in Deterministic Headless Schema Compilation.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "test37-badge-card-3",
                  type: "card",
                  element: "div",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test37-b3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test37-b3-badge",
                          type: "badge",
                          text: "SOC 2 TYPE II & ISO 27001",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test37-b3-heading",
                          type: "heading",
                          level: 3,
                          text: "Certified Compliant",
                          style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test37-b3-desc",
                          type: "text",
                          text: "Strict Data Residency & Zero Runtime Client Side Injections.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #38: Stark Swiss Minimalist Typographic Manifesto
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-38-minimal-typography-only-testimonial",
    name: "Stark Swiss Minimalist Typographic Manifesto",
    kind: "section",
    root: {
      id: "test38-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test38-main-stack",
          type: "stack",
          direction: "column",
          alignment: "start",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
          children: [
            /* Section index slug */
            {
              id: "test38-slug",
              type: "text",
              text: "01 / ARCHITECTURAL CRITIQUE",
              style: {
                typography: { size: "sm", weight: "bold" },
                color: { text: "text-muted" },
              },
            },

            /* Bold Display Lead */
            {
              id: "test38-headline",
              type: "heading",
              level: 2,
              text: "Good architecture is invisible. When visual tools impose runtime baggage, they fail.",
              style: {
                typography: { size: "6xl", weight: "bold" },
                color: { text: "text" },
              },
            },

            /* Unadorned Pure Typography Quote */
            {
              id: "test38-quote",
              type: "quote",
              quote:
                "Ozmishow eliminated the perpetual compromise between graphic designers and systems engineers. It produces pristine, deterministic markup without a single unnecessary wrapper node.",
              author: "Hanna Lindqvist",
              role: "Partner & Typography Director, Atelier Malmö",
              style: {
                typography: { size: "2xl" },
                color: { text: "text" },
              },
            },

            /* Minimal Horizontal Divider */
            {
              id: "test38-divider",
              type: "divider",
              style: {
                border: { color: "text-muted", width: "thin" },
                sizing: { width: "full" },
              },
            },

            /* Footnote provenance metadata */
            {
              id: "test38-footer-stack",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test38-citation",
                  type: "text",
                  text: "Published in International Journal of Digital Systems · Volume 14, Issue 2",
                  style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                },
                {
                  id: "test38-location",
                  type: "text",
                  text: "Stockholm / Zürich",
                  style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #39: Haute Luxury Folio & Silk Aesthetic
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-39-luxury-editorial-testimonial",
    name: "Haute Luxury Folio & Silk Aesthetic",
    kind: "section",
    root: {
      id: "test39-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test39-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
          children: [
            /* Framed Luxury Folio Card */
            {
              id: "test39-folio-card",
              type: "card",
              element: "article",
              style: {
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "2xl" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "test39-folio-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "center",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    {
                      id: "test39-monogram-badge",
                      type: "badge",
                      text: "✦ ATELIER HAUTE HORLOGERIE ✦",
                      style: {
                        color: { background: "background", text: "text" },
                        typography: { size: "sm", weight: "bold" },
                      },
                    },
                    {
                      id: "test39-salon-subtitle",
                      type: "text",
                      text: "PRIVATE COMMISSIONS & HERITAGE SALONS",
                      style: {
                        typography: { size: "sm", weight: "semibold" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "test39-quote",
                      type: "quote",
                      quote:
                        "True luxury resides in uncompromising discretion and flawless execution. For our high-jewelry and private client salons, Ozmishow delivers the precise typographic nuance and visual weight of a bespoke printed folio on every global screen.",
                      author: "Victoire de Saint-Germain",
                      role: "Directrice du Patrimoine, Maison Saint-Germain",
                      style: {
                        typography: { size: "xl" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "test39-seal-badge",
                      type: "badge",
                      text: "PARIS · GENÈVE · VENDÔME",
                      style: {
                        color: { background: "surface-muted", text: "text" },
                        typography: { size: "sm" },
                      },
                    },
                    {
                      id: "test39-auth-text",
                      type: "text",
                      text: "Authenticated Client Record · Private Client Portal Implementation",
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #40: Developer CLI Terminal & Code Review
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-40-developer-product-testimonial-code-context",
    name: "Developer CLI Terminal & Code Review",
    kind: "section",
    root: {
      id: "test40-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test40-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test40-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test40-eyebrow",
                  type: "badge",
                  text: "DEVELOPER PLATFORM SPOTLIGHT",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test40-title",
                  type: "heading",
                  level: 2,
                  text: "Built for Engineers Who Refuse Flaky WYSIWYGs",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test40-subtitle",
                  type: "text",
                  text: "Clean TypeScript schemas, zero hydration mismatch, Git-native version control.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* 2-Column Terminal & Quote Split Grid */
            {
              id: "test40-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Left Column: CLI Terminal Output Stage (Span 5) */
                {
                  id: "test40-col-terminal",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "test40-terminal-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test40-terminal-header",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test40-term-dots",
                              type: "text",
                              text: "● ● ●",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "test40-term-title",
                              type: "text",
                              text: "bash — ozmishow validate",
                              style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                            },
                          ],
                        },
                        {
                          id: "test40-code-block",
                          type: "code",
                          language: "bash",
                          showLanguage: false,
                          showCopy: false,
                          wrap: true,
                          code: "$ ozmishow validate ./campaign.json\n✓ Schema: ComponentDocument v2 valid\n✓ Deterministic AST (0 lint warnings)\n✓ Bundle overhead: 0.00 kB\n$ ozmishow deploy --region=global\n🚀 Deployed to 35 edge nodes in 420ms",
                        },
                        {
                          id: "test40-term-badge",
                          type: "badge",
                          text: "PR #4182 MERGED · 0 HYDRATION ERRORS",
                          style: {
                            color: { background: "background", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Right Column: Senior Engineer Endorsement (Span 7) */
                {
                  id: "test40-col-quote",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "2xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test40-quote-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "lg",
                      children: [
                        {
                          id: "test40-quote",
                          type: "quote",
                          quote:
                            "Every visual builder we tested generated hideous minified spaghetti HTML that broke SSR hydration. Ozmishow is the first tool where our senior engineers actually reviewed the emitted TypeScript schema and said: 'Yeah, this is better than what we would have hand-coded.'",
                          author: "Devon Miller",
                          role: "Staff Infrastructure Engineer, HyperScale DB",
                          avatarSrc:
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&fit=crop&q=80",
                          avatarAlt: "Devon Miller",
                          style: { typography: { size: "lg" }, color: { text: "text" } },
                        },
                        {
                          id: "test40-meta-strip",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "start",
                          wrap: true,
                          gap: "sm",
                          children: [
                            {
                              id: "test40-hash-badge",
                              type: "badge",
                              text: "COMMIT @a8f4c91",
                              style: {
                                color: { background: "surface-muted", text: "text" },
                                typography: { size: "sm", weight: "bold" },
                              },
                            },
                            {
                              id: "test40-verified-badge",
                              type: "badge",
                              text: "✓ VERIFIED MAINTAINER",
                              style: {
                                color: { background: "surface-muted", text: "text" },
                                typography: { size: "sm" },
                              },
                            },
                            {
                              id: "test40-prod-text",
                              type: "text",
                              text: "Deployed across 12M monthly active sessions",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
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
  },
];
