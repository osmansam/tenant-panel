import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED TESTIMONIAL LIBRARY — BATCH 1 (STRUCTURAL ANCHORS)
 * 5 Radically Distinct Architectural Archetypes:
 * 1. Centered Pull Quote (Single Column, Spacious, SaaS Minimal)
 * 2. Enterprise Anchor Quote with Logo (70/30 Split, Cloud Governance)
 * 3. Founder & Executive Spotlight Dossier (40/60 Sidebar, Editorial Luxury)
 * 4. Metric-Led Outcome Callout (30/70 Metric Hero, FinTech Data-Led)
 * 5. Masonry Customer Social Wall (3-Column Masonry Wall, Consumer E-Commerce)
 * ============================================================================
 */

// ============================================================================
// TEMPLATE 1: TESTIMONIAL-01-SINGLE-CENTERED-QUOTE
// ============================================================================

export const TESTIMONIAL_SINGLE_CENTERED_QUOTE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-01-single-centered-quote",
  name: "Classic Centered Pull Quote",
  kind: "section",
  root: {
    id: "test01-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test01-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          /* Client Logo Anchor */
          {
            id: "test01-logo",
            type: "image",
            src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80",
            alt: "Apex Cloud Enterprise",
            aspectRatio: "square",
            objectFit: "contain",
            style: {
              sizing: { maxWidth: "xs", align: "center" },
              border: { radius: "md" },
              spacing: { marginBottom: "sm" },
            },
          },

          /* Centered Pull Quote */
          {
            id: "test01-quote-node",
            type: "quote",
            quote:
              "Ozmishow completely shifted how our design systems team bridges product specs and production layouts. We shipped an entire global redesign three months ahead of schedule without a single visual regression.",
            author: "Elena Rostova",
            role: "VP of Product Engineering, Apex Cloud",
            avatarSrc:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
            avatarAlt: "Elena Rostova",
            style: {
              typography: {
                size: "2xl",
                weight: "medium",
                align: "center",
                leading: "relaxed",
              },
              color: { text: "text" },
              sizing: { maxWidth: "3xl", align: "center" },
            },
          },

          /* Verification Citation & Link */
          {
            id: "test01-action-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "md",
            style: {
              spacing: { marginTop: "md" },
            },
            children: [
              {
                id: "test01-badge",
                type: "badge",
                text: "VERIFIED CASE STUDY",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
              {
                id: "test01-link",
                type: "link",
                label: "Read full Apex Cloud transformation report →",
                href: "#case-study-apex",
                openInNewTab: false,
                style: {
                  color: { text: "primary" },
                  typography: { size: "sm", weight: "medium" },
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
// TEMPLATE 2: TESTIMONIAL-05-LARGE-QUOTE-COMPANY-LOGO
// ============================================================================

export const TESTIMONIAL_LARGE_QUOTE_COMPANY_LOGO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-05-large-quote-company-logo",
  name: "Enterprise Anchor Quote with Logo",
  kind: "section",
  root: {
    id: "test05-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test05-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "2xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Left Column (8 cols): Monumental Quote & Author */
          {
            id: "test05-quote-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
            children: [
              {
                id: "test05-badge",
                type: "badge",
                text: "FORTUNE 100 STRATEGIC DEPLOYMENT",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
              {
                id: "test05-quote-node",
                type: "quote",
                quote:
                  "At our scale, adopting new design and site generation infrastructure is typically a multi-year risk. Ozmishow achieved complete SOC2 compliance and zero-downtime cutover across 14 global business units in under six weeks.",
                author: "Marcus Vance",
                role: "Chief Technology Officer, Vanguard Logistics International",
                style: {
                  typography: {
                    size: "2xl",
                    weight: "semibold",
                    leading: "snug",
                    align: "left",
                  },
                  color: { text: "text" },
                },
              },
              {
                id: "test05-link-row",
                type: "link",
                label: "Download the Vanguard Logistics Technical Architecture Whitepaper →",
                href: "#whitepaper",
                openInNewTab: false,
                style: {
                  color: { text: "primary" },
                  typography: { size: "base", weight: "medium" },
                  spacing: { marginTop: "sm" },
                },
              },
            ],
          },

          /* Right Column (4 cols): Institutional Anchor Card */
          {
            id: "test05-card-col",
            type: "card",
            element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
            style: {
              color: { background: "background", text: "text" },
              border: { width: "thin", color: "primary", radius: "lg" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "test05-card-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "test05-card-logo",
                    type: "image",
                    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=320&auto=format&fit=crop&q=80",
                    alt: "Vanguard Logistics Brand Seal",
                    aspectRatio: "landscape",
                    objectFit: "cover",
                    style: {
                      border: { radius: "md" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "test05-card-heading",
                    type: "heading",
                    level: 4,
                    text: "Vanguard Global Infrastructure",
                    style: {
                      typography: { size: "lg", weight: "bold" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "test05-card-stat",
                    type: "stat",
                    value: "140,000+",
                    label: "Enterprise seats under active governance",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "test05-card-compliance-badge",
                    type: "badge",
                    text: "SOC2 TYPE II · ISO 27001 AUDITED",
                    style: {
                      color: { background: "background", text: "text-muted" },
                      border: { width: "thin", color: "text-muted", radius: "sm" },
                      typography: { size: "sm" },
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
// TEMPLATE 3: TESTIMONIAL-06-FOUNDER-CUSTOMER-SPOTLIGHT
// ============================================================================

export const TESTIMONIAL_FOUNDER_CUSTOMER_SPOTLIGHT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-06-founder-customer-spotlight",
  name: "Founder & Executive Spotlight Dossier",
  kind: "section",
  root: {
    id: "test06-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test06-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "2xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Left Column (5 cols): Executive Portrait & Dossier Card */
          {
            id: "test06-dossier-card",
            type: "card",
            element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
            style: {
              color: { background: "background", text: "text" },
              border: { width: "thin", color: "text-muted", radius: "xl" },
              spacing: { padding: "lg" },
            },
            children: [
              {
                id: "test06-dossier-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "test06-portrait",
                    type: "image",
                    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
                    alt: "Sora Takahashi, Founder & CEO",
                    aspectRatio: "portrait",
                    objectFit: "cover",
                    style: {
                      border: { radius: "lg" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "test06-founder-name",
                    type: "heading",
                    level: 3,
                    text: "Sora Takahashi",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "test06-founder-role",
                    type: "text",
                    text: "Founder & CEO, Kinetix AI Dynamics · Series B ($42M Raised)",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "test06-press-badge",
                    type: "badge",
                    text: "TECHCRUNCH DISRUPT 2025 WINNER",
                    style: {
                      color: { background: "primary", text: "background" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                  {
                    id: "test06-watch-btn",
                    type: "button",
                    label: "Watch Sora's 4-Minute Interview",
                    href: "#watch-interview",
                    style: {
                      spacing: { marginTop: "sm" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
            ],
          },

          /* Right Column (7 cols): Editorial Narrative Quote */
          {
            id: "test06-narrative-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
            children: [
              {
                id: "test06-kicker",
                type: "badge",
                text: "EXECUTIVE VOICES",
                style: {
                  color: { background: "background", text: "text-muted" },
                  border: { width: "thin", color: "text-muted", radius: "sm" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test06-headline-quote",
                type: "heading",
                level: 2,
                text: "“When you're building state-of-the-art neural interfaces, you cannot afford your customer-facing digital presence to feel like a generic SaaS template.”",
                style: {
                  typography: { size: "2xl", weight: "semibold", leading: "snug" },
                  color: { text: "text" },
                },
              },
              {
                id: "test06-body-quote",
                type: "text",
                text: "We tested four separate site builders and custom React frameworks before choosing Ozmishow. Nothing else allowed our design leads to craft hyper-tailored editorial layouts while strictly enforcing our design tokens and high-performance server delivery. It paid for itself within the first quarter.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "test06-stats-row",
                type: "grid",
                columns: 12,
                style: {
          spacing: { gap: "md", marginTop: "md" },
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "test06-stat-1",
                    type: "stat",
                    layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                    value: "14 Days",
                    label: "From blank canvas to global live launch",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "test06-stat-2",
                    type: "stat",
                    layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                    value: "99.4%",
                    label: "Lighthouse performance score preserved",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      color: { text: "primary" },
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
// TEMPLATE 4: TESTIMONIAL-08-TESTIMONIAL-METRIC-RESULT
// ============================================================================

export const TESTIMONIAL_METRIC_RESULT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-08-testimonial-metric-result",
  name: "Metric-Led Outcome Callout",
  kind: "section",
  root: {
    id: "test08-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test08-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "2xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Left Column (4 cols): Massive Metric Hero Card */
          {
            id: "test08-metric-card",
            type: "card",
            element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
            style: {
              color: { background: "background", text: "text" },
              border: { width: "thin", color: "primary", radius: "xl" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "test08-metric-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "test08-metric-kicker",
                    type: "badge",
                    text: "AUDITED FINANCIAL OUTCOME",
                    style: {
                      color: { background: "primary", text: "background" },
                      typography: { size: "sm", weight: "bold" },
                    },
                  },
                  {
                    id: "test08-hero-stat",
                    type: "stat",
                    value: "$4.2M",
                    label: "Direct reduction in annual vendor licensing & dev overhead",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "test08-roi-badge",
                    type: "badge",
                    text: "+312% 12-MONTH NET ROI",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text", radius: "sm" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                  {
                    id: "test08-audit-footnote",
                    type: "text",
                    text: "Independently audited by Apex Financial Advisory · Q3 2025 benchmark audit.",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                      spacing: { marginTop: "sm" },
                    },
                  },
                ],
              },
            ],
          },

          /* Right Column (8 cols): Contextual Quote & Author */
          {
            id: "test08-quote-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
            children: [
              {
                id: "test08-heading",
                type: "heading",
                level: 2,
                text: "“We eliminated six fragmented web design tools and consolidated onto Ozmishow in one procurement cycle.”",
                style: {
                  typography: { size: "2xl", weight: "bold", leading: "snug" },
                  color: { text: "text" },
                },
              },
              {
                id: "test08-quote-node",
                type: "quote",
                quote:
                  "Before Ozmishow, our digital marketing and engineering divisions were trapped in an endless backlog loop. Handing marketing true visual authoring power while keeping engineering in full control of component schemas unlocked unprecedented velocity and substantial fiscal yield.",
                author: "Jonathan Brand",
                role: "Chief Financial Officer, Horizon Global Energy",
                avatarSrc:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
                avatarAlt: "Jonathan Brand",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "test08-link",
                type: "link",
                label: "View our interactive CFO ROI Model & calculator →",
                href: "#roi-calculator",
                openInNewTab: false,
                style: {
                  color: { text: "primary" },
                  typography: { size: "base", weight: "semibold" },
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
// TEMPLATE 5: TESTIMONIAL-14-MASONRY-TESTIMONIAL-WALL
// ============================================================================

export const TESTIMONIAL_MASONRY_TESTIMONIAL_WALL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "testimonial-14-masonry-testimonial-wall",
  name: "Masonry Customer Social Wall",
  kind: "section",
  root: {
    id: "test14-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "test14-container",
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
          /* Header Banner */
          {
            id: "test14-header-stack",
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
                id: "test14-badge",
                type: "badge",
                text: "VERIFIED COMMUNITY FEEDBACK",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test14-title",
                type: "heading",
                level: 2,
                text: "Loved by Over 10,000 Creators & Teams",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test14-sub",
                type: "text",
                text: "Real unedited experiences from customers shipping real production web experiences every single day.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Masonry Wall */
          {
            id: "test14-masonry-grid",
            type: "grid",
            columns: 12,
        style: {
          spacing: { gap: "lg" },
              sizing: { width: "full" },
            },
            children: [
              /* Column 1 (4 cols) */
              {
                id: "test14-col-1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  /* Card 1: Review + Rating */
                  {
                    id: "test14-card-1",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text-muted", radius: "lg" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "test14-c1-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test14-c1-rating",
                            type: "rating",
                            value: 5,
                            max: 5,
                            showValue: false,
                            accessibleLabel: "5 out of 5 stars",
                          },
                          {
                            id: "test14-c1-quote",
                            type: "quote",
                            quote:
                              "We redesigned our company storefront in 48 hours. The component isolation and native theme tokens saved us endless CSS troubleshooting.",
                            author: "Liam K.",
                            role: "Indie Maker & Developer",
                            avatarSrc:
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
                            avatarAlt: "Liam K.",
                            style: {
                              typography: { size: "sm", leading: "relaxed" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "test14-c1-verified",
                            type: "badge",
                            text: "VERIFIED BUYER",
                            style: {
                              color: { background: "background", text: "primary" },
                              typography: { size: "sm" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                  /* Card 2: Photo + Review */
                  {
                    id: "test14-card-2",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text-muted", radius: "lg" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "test14-c2-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test14-c2-photo",
                            type: "image",
                            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80",
                            alt: "Production site workstation",
                            aspectRatio: "landscape",
                            objectFit: "cover",
                            style: {
                              border: { radius: "md" },
                              sizing: { width: "full" },
                            },
                          },
                          {
                            id: "test14-c2-rating",
                            type: "rating",
                            value: 5,
                            max: 5,
                            showValue: false,
                            accessibleLabel: "5 out of 5 stars",
                          },
                          {
                            id: "test14-c2-quote",
                            type: "quote",
                            quote:
                              "Live on our multi-monitor setup shipping new customer campaigns daily. The Visual Builder feels completely solid.",
                            author: "Clara Nguyen",
                            role: "Product Designer, Bloom Studio",
                            avatarSrc:
                              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
                            avatarAlt: "Clara Nguyen",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Column 2 (4 cols) */
              {
                id: "test14-col-2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  /* Card 3: Deep Review */
                  {
                    id: "test14-card-3",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text-muted", radius: "lg" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "test14-c3-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test14-c3-rating",
                            type: "rating",
                            value: 5,
                            max: 5,
                            showValue: false,
                            accessibleLabel: "5 out of 5 stars",
                          },
                          {
                            id: "test14-c3-quote",
                            type: "quote",
                            quote:
                              "Most website builders produce messy, unmaintainable markup under the hood. Ozmishow's ComponentDocument schema emits pristine, semantic HTML that our senior engineers actually love inspecting.",
                            author: "Devon Reed",
                            role: "Head of Web Infrastructure, Synthetix",
                            avatarSrc:
                              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
                            avatarAlt: "Devon Reed",
                            style: {
                              typography: { size: "sm", leading: "relaxed" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "test14-c3-badge",
                            type: "badge",
                            text: "VERIFIED ENGINEERING TEAM",
                            style: {
                              color: { background: "background", text: "primary" },
                              typography: { size: "sm" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                  /* Card 4: Short Punchy */
                  {
                    id: "test14-card-4",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text-muted", radius: "lg" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "test14-c4-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test14-c4-rating",
                            type: "rating",
                            value: 5,
                            max: 5,
                            showValue: false,
                            accessibleLabel: "5 out of 5 stars",
                          },
                          {
                            id: "test14-c4-quote",
                            type: "quote",
                            quote:
                              "Conversion jumped 28% the very first week after we replaced our legacy landing page with an Ozmishow section layout.",
                            author: "Sarah Lindqvist",
                            role: "Growth Director, Nordic SaaS",
                            style: {
                              typography: { size: "sm", weight: "medium" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "test14-c4-time",
                            type: "text",
                            text: "Reviewed 3 days ago",
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

              /* Column 3 (4 cols) */
              {
                id: "test14-col-3",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  /* Card 5: Photo + Review */
                  {
                    id: "test14-card-5",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text-muted", radius: "lg" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "test14-c5-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test14-c5-photo",
                            type: "image",
                            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
                            alt: "Analytics dashboard results",
                            aspectRatio: "landscape",
                            objectFit: "cover",
                            style: {
                              border: { radius: "md" },
                              sizing: { width: "full" },
                            },
                          },
                          {
                            id: "test14-c5-rating",
                            type: "rating",
                            value: 5,
                            max: 5,
                            showValue: false,
                            accessibleLabel: "5 out of 5 stars",
                          },
                          {
                            id: "test14-c5-quote",
                            type: "quote",
                            quote:
                              "The responsive stacking on tablet and mobile is completely seamless. No strange overflow or broken paddings.",
                            author: "Mateo Alvarez",
                            role: "Frontend Lead, FinStream",
                            avatarSrc:
                              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                            avatarAlt: "Mateo Alvarez",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                  /* Card 6: Punchline Card */
                  {
                    id: "test14-card-6",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "background", text: "text" },
                      border: { width: "thin", color: "text-muted", radius: "lg" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "test14-c6-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test14-c6-rating",
                            type: "rating",
                            value: 5,
                            max: 5,
                            showValue: false,
                            accessibleLabel: "5 out of 5 stars",
                          },
                          {
                            id: "test14-c6-quote",
                            type: "quote",
                            quote:
                              "Easily the best investment our marketing team made this quarter. Client approvals that used to take 2 weeks now happen in 20 minutes.",
                            author: "Zoe Chen",
                            role: "Founder, Zenith Media",
                            avatarSrc:
                              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                            avatarAlt: "Zoe Chen",
                            style: {
                              typography: { size: "sm", leading: "relaxed" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "test14-c6-verified",
                            type: "badge",
                            text: "VERIFIED AGENCY CLIENT",
                            style: {
                              color: { background: "background", text: "primary" },
                              typography: { size: "sm" },
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

          /* Footer Action Button */
          {
            id: "test14-footer-btn",
            type: "button",
            label: "Load More Verified Customer Reviews",
            href: "#all-reviews",
            style: {
              spacing: { marginTop: "md" },
            },
          },
        ],
      },
    ],
  },
};

// ============================================================================
// BATCH 1 EXPORT ARRAY
// ============================================================================

export const CURATED_TESTIMONIAL_BATCH_1: ComponentDocument[] = [
  TESTIMONIAL_SINGLE_CENTERED_QUOTE_DOCUMENT,
  TESTIMONIAL_LARGE_QUOTE_COMPANY_LOGO_DOCUMENT,
  TESTIMONIAL_FOUNDER_CUSTOMER_SPOTLIGHT_DOCUMENT,
  TESTIMONIAL_METRIC_RESULT_DOCUMENT,
  TESTIMONIAL_MASONRY_TESTIMONIAL_WALL_DOCUMENT,
];
