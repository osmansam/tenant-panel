import type { ComponentDocument } from "../../model";

/**
 * Curated Testimonials - Batch 4 (5 Templates)
 *
 * #17: Horizontal Quote Rail (Continuous Scannable Excerpts)
 * #18: Testimonial Carousel (Stage Slider with Step Indicators - requires-capability)
 * #19: Stacked Card Carousel (Z-Index Layered Depth Deck - visual-only)
 * #20: Overlapping Testimonial Cards (Staggered Offset Duo)
 * #21: Layered Portrait + Quote (Elevated Floating Card Over Portrait Backdrop)
 */

// ============================================================================
// TEMPLATE 17: Continuous Horizontal Quote Ribbon
// ============================================================================
export const TESTIMONIAL_17_HORIZONTAL_RAIL: ComponentDocument = {
  id: "testimonial-17-horizontal-quote-rail",
  name: "Continuous Horizontal Quote Ribbon",
  version: 2,
  root: {
    id: "test17-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test17-container",
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
          /* Header Info */
          {
            id: "test17-header-stack",
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
                id: "test17-badge",
                type: "badge",
                text: "COMMUNITY VELOCITY",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test17-heading",
                type: "heading",
                level: 2,
                text: "Rapid Adoption Across Modern Engineering Teams",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test17-sub",
                type: "text",
                text: "Bite-sized feedback from platform architects, indie founders, and product directors.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 6-Card Horizontal Rail Grid */
          { style: { spacing: { gap: "md" } },
            id: "test17-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Item 1 */
              {
                id: "test17-card-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test17-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test17-b1",
                        type: "badge",
                        text: "FINTECH CORE",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                      {
                        id: "test17-q1",
                        type: "quote",
                        quote:
                          "Ozmishow cut our weekly release cycle in half. Zero CSS conflicts across teams.",
                        author: "Alex Rivera",
                        role: "Staff Architect, PayGrid",
                        style: { typography: { size: "sm" } },
                      },
                    ],
                  },
                ],
              },

              /* Item 2 */
              {
                id: "test17-card-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test17-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test17-b2",
                        type: "badge",
                        text: "AI INFRASTRUCTURE",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                      {
                        id: "test17-q2",
                        type: "quote",
                        quote:
                          "The JSON schema boundary is impenetrable. We finally trust marketing to edit pages live.",
                        author: "Sora Takahashi",
                        role: "Head of Infrastructure, NeuralScale",
                        style: { typography: { size: "sm" } },
                      },
                    ],
                  },
                ],
              },

              /* Item 3 */
              {
                id: "test17-card-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test17-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test17-b3",
                        type: "badge",
                        text: "ECOMMERCE GLOBAL",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                      {
                        id: "test17-q3",
                        type: "quote",
                        quote:
                          "We built 20 localized storefronts in a single weekend. Remarkable visual ergonomics.",
                        author: "Maria Santos",
                        role: "Growth Director, CartFlux",
                        style: { typography: { size: "sm" } },
                      },
                    ],
                  },
                ],
              },

              /* Item 4 */
              {
                id: "test17-card-4",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test17-c4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test17-b4",
                        type: "badge",
                        text: "DEVTOOLS",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                      {
                        id: "test17-q4",
                        type: "quote",
                        quote:
                          "Zero runtime hydration bloat. Our Lighthouse accessibility and performance stayed at 100.",
                        author: "Liam O'Connor",
                        role: "Frontend Tech Lead, Voxel",
                        style: { typography: { size: "sm" } },
                      },
                    ],
                  },
                ],
              },

              /* Item 5 */
              {
                id: "test17-card-5",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test17-c5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test17-b5",
                        type: "badge",
                        text: "CYBERSECURITY",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                      {
                        id: "test17-q5",
                        type: "quote",
                        quote:
                          "Deterministic markup generation satisfied our strict zero-trust sandbox mandates instantly.",
                        author: "Karin Lindholm",
                        role: "Security Officer, AegisVault",
                        style: { typography: { size: "sm" } },
                      },
                    ],
                  },
                ],
              },

              /* Item 6 */
              {
                id: "test17-card-6",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test17-c6-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test17-b6",
                        type: "badge",
                        text: "HEALTH TECH",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                      {
                        id: "test17-q6",
                        type: "quote",
                        quote:
                          "Consistent semantic tokens allow us to enforce strict WCAG AAA guidelines company-wide.",
                        author: "Dr. Anita Desai",
                        role: "VP Experience, PulseMed",
                        style: { typography: { size: "sm" } },
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
// TEMPLATE 18: Paged Testimonial Stage Carousel (requires-capability)
// ============================================================================
export const TESTIMONIAL_18_CAROUSEL_STAGE: ComponentDocument = {
  id: "testimonial-18-testimonial-carousel",
  name: "Paged Testimonial Stage Carousel",
  version: 2,
  root: {
    id: "test18-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test18-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "5xl", align: "center" },
        },
        children: [
          /* Header Info */
          {
            id: "test18-header-stack",
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
                id: "test18-badge",
                type: "badge",
                text: "ENTERPRISE PERSPECTIVES",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test18-heading",
                type: "heading",
                level: 2,
                text: "What Global Technology Leaders Say",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Active Carousel Slide Card */
          {
            id: "test18-stage-card",
            type: "card",
            element: "article",
            style: {
              border: { width: "thin", color: "primary", radius: "xl" },
              spacing: { padding: "2xl" },
              color: { background: "background", text: "text" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "test18-stage-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  /* Meta Top Strip: Slide Counter + Capability Tag */
                  {
                    id: "test18-meta-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "sm",
                    style: { sizing: { width: "full" } },
                    children: [
                      {
                        id: "test18-counter-badge",
                        type: "badge",
                        text: "STORY 01 OF 03 · ENTERPRISE CLOUD",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test18-capability-badge",
                        type: "badge",
                        text: "STAGE CAROUSEL ACTIVE",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                    ],
                  },

                  /* Hero Pullquote */
                  {
                    id: "test18-quote",
                    type: "quote",
                    quote:
                      "Migrating our enterprise cloud console to Ozmishow components reduced frontend technical debt across 18 scrum teams by 42%. We ship weekly updates with zero regressions.",
                    author: "Helena Rostova",
                    role: "Senior Vice President of Cloud Engineering, Zenith Systems",
                    avatarSrc:
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
                    avatarAlt: "Helena Rostova",
                    style: {
                      typography: { size: "xl", weight: "medium" },
                      color: { text: "text" },
                    },
                  },

                  /* Carousel Controls / Pagination Strip */
                  {
                    id: "test18-controls-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { marginTop: "md" },
                    },
                    children: [
                      {
                        id: "test18-prev-btn",
                        type: "button",
                        label: "← Previous Story",
                        href: "#prev",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                          border: { radius: "md" },
                        },
                      },
                      {
                        id: "test18-dots-text",
                        type: "text",
                        text: "● ○ ○",
                        style: {
                          typography: { size: "lg", weight: "bold" },
                          color: { text: "primary" },
                        },
                      },
                      {
                        id: "test18-next-btn",
                        type: "button",
                        label: "Next Story →",
                        href: "#next",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm" },
                          border: { radius: "md" },
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
};

// ============================================================================
// TEMPLATE 19: Stacked Depth Deck Cards (visual-only)
// ============================================================================
export const TESTIMONIAL_19_STACKED_DECK: ComponentDocument = {
  id: "testimonial-19-stacked-card-carousel",
  name: "Stacked Depth Deck Cards",
  version: 2,
  root: {
    id: "test19-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test19-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          /* Header Info */
          {
            id: "test19-header-stack",
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
                id: "test19-badge",
                type: "badge",
                text: "DEPTH CARD STACK",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test19-heading",
                type: "heading",
                level: 2,
                text: "Swipe Through Verified Creator Stories",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Depth Deck Stack (Back Layer + Front Layer) */
          {
            id: "test19-deck-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { sizing: { width: "full" } },
            children: [
              /* Active Front Card */
              {
                id: "test19-front-card",
                type: "card",
                element: "article",
                style: {
                  border: { width: "thin", color: "primary", radius: "xl", shadow: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "test19-front-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test19-card-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "sm",
                        style: { sizing: { width: "full" } },
                        children: [
                          {
                            id: "test19-card-badge",
                            type: "badge",
                            text: "CARD 01 OF 03",
                            style: {
                              color: { background: "primary", text: "background" },
                              typography: { size: "sm", weight: "bold" },
                            },
                          },
                          {
                            id: "test19-deck-status",
                            type: "badge",
                            text: "VERIFIED CREATOR",
                            style: {
                              color: { background: "surface-muted", text: "text" },
                              typography: { size: "sm" },
                            },
                          },
                        ],
                      },
                      {
                        id: "test19-quote",
                        type: "quote",
                        quote:
                          "Ozmishow changed the trajectory of our creative studio. We went from delivering 2 client sites a month to 11 without expanding our design team.",
                        author: "Julian Chen",
                        role: "Founder, Studio Origami & Tokyo Arts Collective",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Julian Chen",
                        style: {
                          typography: { size: "lg" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Background Layer Preview Pill */
              {
                id: "test19-back-card-pill",
                type: "card",
                element: "div",
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "sm" },
                  color: { background: "surface-muted", text: "text-muted" },
                  sizing: { maxWidth: "2xl" },
                },
                children: [
                  {
                    id: "test19-back-text",
                    type: "text",
                    text: "Card 02 / 03: \"The live canvas performance is jaw-dropping...\" — Click to advance stack",
                    style: {
                      typography: { size: "sm", align: "center" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Deck Controls */
              {
                id: "test19-controls",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "md",
                style: { spacing: { marginTop: "sm" } },
                children: [
                  {
                    id: "test19-prev-deck-btn",
                    type: "button",
                    label: "← Previous Deck Item",
                    href: "#prev",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      typography: { size: "sm" },
                      border: { radius: "md" },
                    },
                  },
                  {
                    id: "test19-next-deck-btn",
                    type: "button",
                    label: "Next Deck Item →",
                    href: "#next",
                    style: {
                      color: { background: "primary", text: "background" },
                      typography: { size: "sm" },
                      border: { radius: "md" },
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
// TEMPLATE 20: Overlapping Staggered Duo Cards
// ============================================================================
export const TESTIMONIAL_20_OVERLAPPING_CARDS: ComponentDocument = {
  id: "testimonial-20-overlapping-testimonial-cards",
  name: "Overlapping Staggered Duo Cards",
  version: 2,
  root: {
    id: "test20-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test20-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          /* Header Info */
          {
            id: "test20-header-stack",
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
                id: "test20-badge",
                type: "badge",
                text: "LEADERSHIP DIALOGUE",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test20-heading",
                type: "heading",
                level: 2,
                text: "The Founder and the Lead Investor",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test20-sub",
                type: "text",
                text: "Two perspectives on navigating rapid hypergrowth with strict design systems discipline.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Overlapping Duo Grid */
          { style: { spacing: { gap: "lg" } },
            id: "test20-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Card 1: Founder Perspective */
              {
                id: "test20-card-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 6 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test20-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test20-b1",
                        type: "badge",
                        text: "FINANCIAL TIMES INTERVIEW",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test20-img-1",
                        type: "image",
                        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
                        alt: "Isabella Rossi, Founder & CEO at Chronos Biotech",
                        aspectRatio: "wide",
                        objectFit: "cover",
                        style: {
                          border: { radius: "lg" },
                          sizing: { width: "full" },
                        },
                      },
                      {
                        id: "test20-q1",
                        type: "quote",
                        quote:
                          "When scaling from Series A to Series C, our greatest operational bottleneck was visual landing page delivery. Ozmishow restored our team's creative freedom.",
                        author: "Isabella Rossi",
                        role: "Founder & CEO, Chronos Biotech",
                        style: {
                          typography: { size: "base" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Card 2: Investor Perspective (Offset & Primary Highlight) */
              {
                id: "test20-card-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 6 },
                },
                style: {
                  border: { width: "thin", color: "primary", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test20-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test20-b2",
                        type: "badge",
                        text: "FORBES LEADERSHIP ESSAY",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test20-img-2",
                        type: "image",
                        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
                        alt: "Marcus Vance, General Partner at Horizon Ventures",
                        aspectRatio: "wide",
                        objectFit: "cover",
                        style: {
                          border: { radius: "lg" },
                          sizing: { width: "full" },
                        },
                      },
                      {
                        id: "test20-q2",
                        type: "quote",
                        quote:
                          "We mandate Ozmishow across our enterprise portfolio. It eliminates millions in redundant front-end tooling while ensuring zero-regression schema compliance.",
                        author: "Marcus Vance",
                        role: "General Partner, Horizon Ventures",
                        style: {
                          typography: { size: "base" },
                          color: { text: "text" },
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
};

// ============================================================================
// TEMPLATE 21: Layered Image Backdrop & Floating Card
// ============================================================================
export const TESTIMONIAL_21_LAYERED_PORTRAIT: ComponentDocument = {
  id: "testimonial-21-layered-portrait-quote",
  name: "Layered Image Backdrop & Floating Card",
  version: 2,
  root: {
    id: "test21-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test21-container",
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
          /* 12-Column Grid with Portrait Backdrop on Left & Floating Card on Right */
          { style: { spacing: { gap: "xl" } },
            id: "test21-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Left Column: Full-Height Portrait (Span 6) */
              {
                id: "test21-image-card",
                type: "card",
                element: "div",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 6 },
                },
                style: {
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "test21-portrait-img",
                    type: "image",
                    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
                    alt: "Lord Henry Sterling, Managing Partner at Sterling Capital",
                    aspectRatio: "square",
                    objectFit: "cover",
                    style: {
                      border: { radius: "xl" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Right Column: Floating Elevated Quote Card (Span 6) */
              {
                id: "test21-floating-card",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 6 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl", shadow: "lg" },
                  spacing: { padding: "2xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test21-card-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      {
                        id: "test21-roi-badge",
                        type: "badge",
                        text: "+320% ANNUAL ENTERPRISE ARR",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test21-quote",
                        type: "quote",
                        quote:
                          "Ozmishow fundamentally changed how our global private investment portfolio operates across 14 asset classes. The presentation rigor and deterministic typography are unparalleled.",
                        author: "Lord Henry Sterling",
                        role: "Managing Partner, Sterling Capital Private Equity",
                        style: {
                          typography: { size: "xl", weight: "medium" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "test21-fiduciary-badge",
                        type: "badge",
                        text: "✓ Tier-1 Sovereign Fiduciary Partner",
                        style: {
                          color: { background: "surface-muted", text: "text" },
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
    ],
  },
};

export const CURATED_TESTIMONIAL_BATCH_4: ComponentDocument[] = [
  TESTIMONIAL_17_HORIZONTAL_RAIL,
  TESTIMONIAL_18_CAROUSEL_STAGE,
  TESTIMONIAL_19_STACKED_DECK,
  TESTIMONIAL_20_OVERLAPPING_CARDS,
  TESTIMONIAL_21_LAYERED_PORTRAIT,
];
