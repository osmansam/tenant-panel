import type { ComponentDocument } from "../../model";

/**
 * Curated Testimonials - Batch 3 (5 Templates)
 *
 * #04: Full-Bleed Image Testimonial (Scenic Hospitality & Architecture Overlay)
 * #11: Two-Column Paired Testimonials (Dual Perspective Contrasting Duo)
 * #12: Three-Card Testimonial Grid (Trio Staggered Elevation Cards)
 * #13: Asymmetric Testimonial Grid (Dominant Hero Card + Satellite Quad Cards)
 * #15: Bento Testimonial Layout (Modular 4-Cell Social-Proof Mosaic)
 */

// ============================================================================
// TEMPLATE 04: Full-Bleed Scenic Visual Testimonial
// ============================================================================
export const TESTIMONIAL_04_FULL_BLEED_IMAGE: ComponentDocument = {
  id: "testimonial-04-full-bleed-image-testimonial",
  name: "Full-Bleed Scenic Visual Testimonial",
  version: 2,
  root: {
    id: "test04-root",
    type: "section",
    style: {
      spacing: { paddingY: "none" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test04-overlay",
        type: "overlay",
        alignment: "bottom-start",
        inset: "2xl",
        mobileFallback: "overlay",
        tint: {
          color: { kind: "token", value: "text" },
          opacity: 0.55,
        },
        style: {
          sizing: { width: "full" },
        },
        children: [
          /* Background Slot */
          {
            id: "test04-bg-slot",
            type: "slot",
            name: "background",
            children: [
              {
                id: "test04-bg-image",
                type: "image",
                src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&auto=format&fit=crop&q=80",
                alt: "Aman Kyoto serene forest sanctuary pavilion",
                aspectRatio: "wide",
                objectFit: "cover",
                style: {
                  sizing: { width: "full", height: "full" },
                },
              },
            ],
          },

          /* Content Slot */
          {
            id: "test04-content-slot",
            type: "slot",
            name: "content",
            children: [
              {
                id: "test04-content-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                style: {
                  sizing: { maxWidth: "3xl" },
                  color: { text: "background" },
                },
                children: [
                  {
                    id: "test04-location-badge",
                    type: "badge",
                    text: "AMAN SANCTUARY · KYOTO HIGASHIYAMA",
                    style: {
                      color: { background: "background", text: "text" },
                      typography: { size: "sm", weight: "bold" },
                    },
                  },
                  {
                    id: "test04-quote",
                    type: "quote",
                    quote:
                      "An encounter with architectural stillness that fundamentally altered our studio's understanding of space, natural cedar acoustics, and morning light. Unrivaled hospitality.",
                    author: "Kensuke Tanaka",
                    role: "Curator, Kyoto Architectural Monograph Biennial",
                    style: {
                      typography: { size: "xl", weight: "medium" },
                      color: { text: "background" },
                    },
                  },
                  {
                    id: "test04-link",
                    type: "link",
                    label: "Explore Higashiyama Architecture Dossier →",
                    href: "#explore",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "background" },
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
// TEMPLATE 11: Dual Perspective Paired Columns
// ============================================================================
export const TESTIMONIAL_11_TWO_COLUMN_PAIRED: ComponentDocument = {
  id: "testimonial-11-two-column-paired-testimonials",
  name: "Dual Perspective Paired Columns",
  version: 2,
  root: {
    id: "test11-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test11-container",
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
            id: "test11-header-stack",
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
                id: "test11-badge",
                type: "badge",
                text: "PERSPECTIVE SYNTHESIS",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test11-heading",
                type: "heading",
                level: 2,
                text: "Built for Designers. Loved by Engineers.",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test11-sub",
                type: "text",
                text: "How design systems and frontend infrastructure teams converge on a single immutable component tree.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Dual Paired Columns Grid */
          { style: { spacing: { gap: "lg" } },
            id: "test11-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Left Column: Design Perspective */
              {
                id: "test11-card-design",
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
                    id: "test11-design-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test11-badge-design",
                        type: "badge",
                        text: "DESIGN SYSTEMS VIEW",
                        style: {
                          color: { background: "secondary", text: "secondary-foreground" },
                          typography: { size: "sm", weight: "semibold" },
                        },
                      },
                      {
                        id: "test11-quote-design",
                        type: "quote",
                        quote:
                          "Finally, a visual canvas that does not mutilate our token hierarchy. What we prototype in the builder maps directly to design tokens without CSS overrides or fragile wrapper divs.",
                        author: "Siddharth Rao",
                        role: "Principal Designer, Linear Design Systems",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Siddharth Rao",
                        style: {
                          typography: { size: "lg" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "test11-verified-design",
                        type: "badge",
                        text: "✓ Verified Design Systems Lead",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Engineering Perspective */
              {
                id: "test11-card-eng",
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
                    id: "test11-eng-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test11-badge-eng",
                        type: "badge",
                        text: "INFRASTRUCTURE PLATFORM VIEW",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "semibold" },
                        },
                      },
                      {
                        id: "test11-quote-eng",
                        type: "quote",
                        quote:
                          "Zero arbitrary inline styles, zero runaway bundle size. Ozmishow emits deterministic TypeScript component trees that pass our CI linters cleanly on every production commit.",
                        author: "Clara Vance",
                        role: "Staff Infrastructure Engineer, Global Core Platform",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Clara Vance",
                        style: {
                          typography: { size: "lg" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "test11-verified-eng",
                        type: "badge",
                        text: "✓ Verified CI Production Deployer",
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

// ============================================================================
// TEMPLATE 12: Trio Staggered Elevation Cards
// ============================================================================
export const TESTIMONIAL_12_THREE_CARD_GRID: ComponentDocument = {
  id: "testimonial-12-three-card-testimonial-grid",
  name: "Trio Staggered Elevation Cards",
  version: 2,
  root: {
    id: "test12-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test12-container",
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
            id: "test12-header-stack",
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
                id: "test12-badge",
                type: "badge",
                text: "CUSTOMER VERIFICATION",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test12-heading",
                type: "heading",
                level: 2,
                text: "Rated 4.9/5 Across 850+ Growth Teams",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test12-sub",
                type: "text",
                text: "Direct commentary on conversion gains, sprint velocity, and design autonomy.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Staggered Trio Grid */
          { style: { spacing: { gap: "lg" } },
            id: "test12-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Card 1: Agency */
              {
                id: "test12-card-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "lg" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test12-card-1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "test12-rating-1",
                        type: "rating",
                        value: 5,
                        max: 5,
                        showValue: true,
                        accessibleLabel: "5 out of 5 stars",
                      },
                      {
                        id: "test12-quote-1",
                        type: "quote",
                        quote:
                          "We migrated 14 client landing pages in 48 hours. The speed gains across our agency were immediately noticeable.",
                        author: "Marcus Holloway",
                        role: "Head of Creative, Hyperdrive Agency",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Marcus Holloway",
                        style: {
                          typography: { size: "base" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Card 2: Featured & Elevated Center Card */
              {
                id: "test12-card-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "primary", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test12-card-2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "test12-badge-featured",
                        type: "badge",
                        text: "FEATURED HIGHLIGHT",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test12-rating-2",
                        type: "rating",
                        value: 5,
                        max: 5,
                        showValue: true,
                        accessibleLabel: "5 out of 5 stars",
                      },
                      {
                        id: "test12-quote-2",
                        type: "quote",
                        quote:
                          "The schema validation saved us countless production errors. Client marketing teams can make self-serve updates without breaking anything.",
                        author: "Amara Okonjo",
                        role: "Director of Growth, Luminance Health",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Amara Okonjo",
                        style: {
                          typography: { size: "base", weight: "medium" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Card 3: AI Startup */
              {
                id: "test12-card-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "lg" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test12-card-3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "test12-rating-3",
                        type: "rating",
                        value: 5,
                        max: 5,
                        showValue: true,
                        accessibleLabel: "5 out of 5 stars",
                      },
                      {
                        id: "test12-quote-3",
                        type: "quote",
                        quote:
                          "Sub-second live canvas re-renders make page composition feel effortless. Our conversion rate jumped 34% in the first sprint.",
                        author: "David Park",
                        role: "Founder & CEO, Kinetix AI",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "David Park",
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
// TEMPLATE 13: Asymmetric Anchor Hero & Quad Cards
// ============================================================================
export const TESTIMONIAL_13_ASYMMETRIC_GRID: ComponentDocument = {
  id: "testimonial-13-asymmetric-testimonial-grid",
  name: "Asymmetric Anchor Hero & Quad Cards",
  version: 2,
  root: {
    id: "test13-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test13-container",
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
            id: "test13-header-stack",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "2xl" },
            },
            children: [
              {
                id: "test13-badge",
                type: "badge",
                text: "ENTERPRISE PROOF",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test13-heading",
                type: "heading",
                level: 2,
                text: "Proven at Global Enterprise Scale",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test13-sub",
                type: "text",
                text: "How Horizon Dynamics streamlined 20 engineering squads and retired 4 legacy tools.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Asymmetric 12-Column Grid (7 col Hero + 5 col Satellite Stack) */
          { style: { spacing: { gap: "lg" } },
            id: "test13-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Left Dominant Hero Card (Span 7) */
              {
                id: "test13-hero-card",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 7 },
                },
                style: {
                  border: { width: "thin", color: "primary", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test13-hero-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test13-hero-badge",
                        type: "badge",
                        text: "KEYNOTE CLIENT TESTIMONIAL",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test13-hero-image",
                        type: "image",
                        src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
                        alt: "Dr. Evelyn Reed, CTO at Horizon Dynamics",
                        aspectRatio: "wide",
                        objectFit: "cover",
                        style: {
                          border: { radius: "lg" },
                          sizing: { width: "full" },
                        },
                      },
                      {
                        id: "test13-hero-quote",
                        type: "quote",
                        quote:
                          "Ozmishow allowed our distributed engineering and brand design teams across 12 countries to work from a single unified canvas. We retired 4 legacy tools in quarter one with zero downtime.",
                        author: "Dr. Evelyn Reed",
                        role: "Chief Technology Officer, Horizon Dynamics",
                        style: {
                          typography: { size: "lg", weight: "medium" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Right Satellite Stack (Span 5) */
              {
                id: "test13-satellite-container",
                type: "card",
                element: "div",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 5 },
                },
                style: {
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "test13-satellites-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      /* Satellite 1 */
                      {
                        id: "test13-sat-card-1",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test13-sat-1-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test13-sat-quote-1",
                                type: "quote",
                                quote:
                                  "The deterministic JSON schema gave our security compliance team instant sign-off.",
                                author: "Tariq Mansoor",
                                role: "Head of Information Security",
                                style: {
                                  typography: { size: "sm" },
                                },
                              },
                            ],
                          },
                        ],
                      },

                      /* Satellite 2 */
                      {
                        id: "test13-sat-card-2",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test13-sat-2-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test13-sat-quote-2",
                                type: "quote",
                                quote:
                                  "We cut landing page turnaround time from 2 weeks to 40 minutes across our regional marketing teams.",
                                author: "Chloe Dupuis",
                                role: "Brand Design Director",
                                style: {
                                  typography: { size: "sm" },
                                },
                              },
                            ],
                          },
                        ],
                      },

                      /* Satellite 3 */
                      {
                        id: "test13-sat-card-3",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test13-sat-3-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test13-sat-quote-3",
                                type: "quote",
                                quote:
                                  "Template instantiation is foolproof. Zero regressions across production endpoints.",
                                author: "Jonas Richter",
                                role: "Platform Tech Lead",
                                style: {
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
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 15: Bento Modular Social-Proof Mosaic
// ============================================================================
export const TESTIMONIAL_15_BENTO_LAYOUT: ComponentDocument = {
  id: "testimonial-15-bento-testimonial-layout",
  name: "Bento Modular Social-Proof Mosaic",
  version: 2,
  root: {
    id: "test15-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test15-container",
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
            id: "test15-header-stack",
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
                id: "test15-badge",
                type: "badge",
                text: "BENTO SOCIAL PROOF",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test15-heading",
                type: "heading",
                level: 2,
                text: "Metrics, Trust & Velocity in One View",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "test15-sub",
                type: "text",
                text: "Quantitative outcomes and verified executive feedback from tier-1 software leaders.",
                style: {
                  typography: { size: "base" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Bento 4-Cell Grid */
          { style: { spacing: { gap: "md" } },
            id: "test15-bento-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Cell 1: Dominant Story Card (Span 8) */
              {
                id: "test15-bento-card-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 8 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test15-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test15-c1-badge",
                        type: "badge",
                        text: "TIER-1 ENTERPRISE CLIENT",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test15-c1-stat",
                        type: "stat",
                        value: "99.8%",
                        label: "Verified Production Uptime Through Global Redesign",
                      },
                      {
                        id: "test15-c1-quote",
                        type: "quote",
                        quote:
                          "We migrated our core checkout funnel to Ozmishow components. Visual reliability and zero hydration mismatches gave us total operational confidence.",
                        author: "Alina Morozova",
                        role: "VP of Product Infrastructure, Veloce Global",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Alina Morozova",
                        style: {
                          typography: { size: "base" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Cell 2: Social Proof Counter Card (Span 4) */
              {
                id: "test15-bento-card-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test15-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test15-c2-badge",
                        type: "badge",
                        text: "GLOBAL BENCHMARK",
                        style: {
                          color: { background: "secondary", text: "secondary-foreground" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test15-c2-stat",
                        type: "stat",
                        value: "4.9/5",
                        label: "Average Rating Across 1,200+ Teams",
                      },
                      {
                        id: "test15-c2-rating",
                        type: "rating",
                        value: 5,
                        max: 5,
                        showValue: true,
                        accessibleLabel: "5 out of 5 stars",
                      },
                      {
                        id: "test15-c2-text",
                        type: "text",
                        text: "Over 45,000 production pages rendered worldwide with zero schema regressions.",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Cell 3: Speed & Velocity Card (Span 5) */
              {
                id: "test15-bento-card-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 5 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test15-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test15-c3-badge",
                        type: "badge",
                        text: "VELOCITY MULTIPLIER",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test15-c3-stat",
                        type: "stat",
                        value: "18 hrs/wk",
                        label: "Engineering Time Saved",
                      },
                      {
                        id: "test15-c3-quote",
                        type: "quote",
                        quote:
                          "Handing visual composition over to product marketing removed 80% of our ad-hoc ticket backlog.",
                        author: "Felix Bergmann",
                        role: "Lead Frontend Architect, NextWave Labs",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Felix Bergmann",
                        style: {
                          typography: { size: "base" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Cell 4: Security & Compliance Card (Span 7) */
              {
                id: "test15-bento-card-4",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 7 },
                },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test15-c4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test15-c4-badge",
                        type: "badge",
                        text: "SOC-2 TYPE II AUDITED",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test15-c4-quote",
                        type: "quote",
                        quote:
                          "The sandboxed renderer and strict schema boundary met our sovereign banking audit requirements on day one.",
                        author: "Nadia Kassem",
                        role: "Chief Compliance Officer, Zurich Sovereign Tech",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Nadia Kassem",
                        style: {
                          typography: { size: "base" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "test15-c4-link",
                        type: "link",
                        label: "Read Sovereign Banking Audit Case Study →",
                        href: "#case-study",
                        openInNewTab: false,
                        style: {
                          typography: { size: "sm", weight: "semibold" },
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
    ],
  },
};

export const CURATED_TESTIMONIAL_BATCH_3: ComponentDocument[] = [
  TESTIMONIAL_04_FULL_BLEED_IMAGE,
  TESTIMONIAL_11_TWO_COLUMN_PAIRED,
  TESTIMONIAL_12_THREE_CARD_GRID,
  TESTIMONIAL_13_ASYMMETRIC_GRID,
  TESTIMONIAL_15_BENTO_LAYOUT,
];
