import type { ComponentDocument } from "../../model";

/**
 * Curated Testimonials - Batch 5 (5 Templates)
 *
 * #22: Sticky Anchor Quote with Scrolling Feed
 * #23: Segmented Tabbed Enterprise Stories (Native compound tabs)
 * #24: Expandable Accordion Testimonial Rows (Native compound accordion)
 * #25: Client Logo Matrix with Active Callout
 * #26: Aggregate Star Scorecard & Customer Reviews
 */

// ============================================================================
// TEMPLATE 22: Sticky Anchor Quote with Scrolling Feed
// ============================================================================
export const TESTIMONIAL_22_STICKY_SCROLL: ComponentDocument = {
  id: "testimonial-22-sticky-quote-scrolling-customers",
  name: "Sticky Anchor Quote with Scrolling Feed",
  version: 2,
  root: {
    id: "test22-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test22-container",
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
            id: "test22-header-stack",
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
                id: "test22-badge",
                type: "badge",
                text: "ORGANIZATIONAL FEED",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test22-heading",
                type: "heading",
                level: 2,
                text: "Enterprise Alignment Across Every Squad",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* 12-Column Grid: Sticky Hero on Left (5 col), Feed Stack on Right (7 col) */
          { style: { spacing: { gap: "lg" } },
            id: "test22-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Left Column: Anchor Client Sticky Card (Span 5) */
              {
                id: "test22-anchor-card",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 5, desktop: 5 },
                },
                style: {
                  border: { width: "thin", color: "primary", radius: "xl" },
                  spacing: { padding: "xl" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test22-anchor-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test22-anchor-badge",
                        type: "badge",
                        text: "ANCHOR CLIENT PERSPECTIVE",
                        style: {
                          color: { background: "primary", text: "background" },
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                      {
                        id: "test22-anchor-quote",
                        type: "quote",
                        quote:
                          "Ozmishow became the connective tissue across 40 distributed engineering squads. We eliminated 3 redundant design tools in quarter one with zero regression risk.",
                        author: "Marcus Lindqvist",
                        role: "VP of Platform Architecture, Nordea Global Systems",
                        avatarSrc:
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
                        avatarAlt: "Marcus Lindqvist",
                        style: {
                          typography: { size: "lg", weight: "medium" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "test22-verified-badge",
                        type: "badge",
                        text: "✓ Tier-1 Enterprise Audit Verified",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          typography: { size: "sm" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Scrolling Feed Stack (Span 7) */
              {
                id: "test22-feed-container",
                type: "card",
                element: "div",
                layout: {
                  span: { mobile: 12, tablet: 7, desktop: 7 },
                },
                style: { sizing: { width: "full" } },
                children: [
                  {
                    id: "test22-feed-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      /* Item 1 */
                      {
                        id: "test22-feed-item-1",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "lg" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test22-f1-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test22-f1-quote",
                                type: "quote",
                                quote:
                                  "Deployment turnaround fell from 4 days to 15 minutes across our product squad.",
                                author: "Elena Rostova",
                                role: "Lead DevOps Architect",
                                style: { typography: { size: "sm" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Item 2 */
                      {
                        id: "test22-feed-item-2",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "lg" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test22-f2-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test22-f2-quote",
                                type: "quote",
                                quote:
                                  "The schema validation caught 14 breaking API mismatches in staging before hitting production.",
                                author: "Liam Chen",
                                role: "Senior Security Lead",
                                style: { typography: { size: "sm" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Item 3 */
                      {
                        id: "test22-feed-item-3",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "lg" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test22-f3-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test22-f3-quote",
                                type: "quote",
                                quote:
                                  "Marketing can now safely launch localized seasonal campaigns autonomously without engineering tickets.",
                                author: "Sarah Jenkins",
                                role: "VP Growth & Operations",
                                style: { typography: { size: "sm" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Item 4 */
                      {
                        id: "test22-feed-item-4",
                        type: "card",
                        element: "div",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "lg" },
                          color: { background: "background", text: "text" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "test22-f4-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test22-f4-quote",
                                type: "quote",
                                quote:
                                  "Zero hydration errors across 35 million monthly impressions. Stellar runtime reliability.",
                                author: "Kenji Sato",
                                role: "Staff Frontend Engineer",
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
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 23: Segmented Tabbed Enterprise Stories (Native compound tabs)
// ============================================================================
export const TESTIMONIAL_23_TABBED_STORIES: ComponentDocument = {
  id: "testimonial-23-tabbed-customer-stories",
  name: "Segmented Tabbed Enterprise Stories",
  version: 2,
  root: {
    id: "test23-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test23-container",
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
            id: "test23-header-stack",
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
                id: "test23-badge",
                type: "badge",
                text: "INDUSTRY CASE STUDIES",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test23-heading",
                type: "heading",
                level: 2,
                text: "Tailored Impact by Industry Sector",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Native Tabs Compound Node */
          {
            id: "test23-tabs",
            type: "tabs",
            style: { sizing: { width: "full" } },
            children: [
              /* Tab 1: FinTech */
              {
                id: "test23-tab-1",
                type: "disclosure",
                defaultOpen: true,
                transition: "height-fade",
                children: [
                  {
                    id: "test23-tab-1-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "test23-t1-label",
                        type: "text",
                        text: "FINTECH & BANKING",
                        style: {
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                    ],
                  },
                  {
                    id: "test23-tab-1-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "test23-t1-card",
                        type: "card",
                        element: "article",
                        style: {
                          border: { width: "thin", color: "primary", radius: "xl" },
                          spacing: { padding: "2xl" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test23-t1-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "md",
                            children: [
                              {
                                id: "test23-t1-badge",
                                type: "badge",
                                text: "TIER-1 FINANCIAL ADVISORY",
                                style: {
                                  color: { background: "primary", text: "background" },
                                  typography: { size: "sm", weight: "bold" },
                                },
                              },
                              {
                                id: "test23-t1-stat",
                                type: "stat",
                                value: "99.99%",
                                label: "Strict Core Banking SLA & Deterministic Governance",
                              },
                              {
                                id: "test23-t1-quote",
                                type: "quote",
                                quote:
                                  "Deploying Ozmishow across our cross-border compliance portals gave our institutional clients complete confidence in sovereign data governance.",
                                author: "Victoria Sterling",
                                role: "Chief Compliance Officer, Helvetica Bank",
                                style: {
                                  typography: { size: "lg" },
                                  color: { text: "text" },
                                },
                              },
                              {
                                id: "test23-t1-link",
                                type: "link",
                                label: "Read FinTech Sovereign Compliance Dossier →",
                                href: "#fintech",
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

              /* Tab 2: Logistics */
              {
                id: "test23-tab-2",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                children: [
                  {
                    id: "test23-tab-2-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "test23-t2-label",
                        type: "text",
                        text: "GLOBAL LOGISTICS",
                        style: {
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                    ],
                  },
                  {
                    id: "test23-tab-2-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "test23-t2-card",
                        type: "card",
                        element: "article",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "xl" },
                          spacing: { padding: "2xl" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test23-t2-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "md",
                            children: [
                              {
                                id: "test23-t2-badge",
                                type: "badge",
                                text: "SUPPLY CHAIN SCALE",
                                style: {
                                  color: { background: "surface-muted", text: "text" },
                                  typography: { size: "sm", weight: "bold" },
                                },
                              },
                              {
                                id: "test23-t2-stat",
                                type: "stat",
                                value: "140M+",
                                label: "Daily Global Real-Time Shipment Events",
                              },
                              {
                                id: "test23-t2-quote",
                                type: "quote",
                                quote:
                                  "Our fleet dispatch dashboards now render sub-second globally without client-side lag or memory leaks across rugged edge devices.",
                                author: "Carlos Mendoza",
                                role: "VP of Logistics Systems, TransOcean Global",
                                style: {
                                  typography: { size: "lg" },
                                  color: { text: "text" },
                                },
                              },
                              {
                                id: "test23-t2-link",
                                type: "link",
                                label: "Read Global Logistics Fleet Case Study →",
                                href: "#logistics",
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

              /* Tab 3: Health & BioTech */
              {
                id: "test23-tab-3",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                children: [
                  {
                    id: "test23-tab-3-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "test23-t3-label",
                        type: "text",
                        text: "HEALTH & BIOTECH",
                        style: {
                          typography: { size: "sm", weight: "bold" },
                        },
                      },
                    ],
                  },
                  {
                    id: "test23-tab-3-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "test23-t3-card",
                        type: "card",
                        element: "article",
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "xl" },
                          spacing: { padding: "2xl" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test23-t3-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "md",
                            children: [
                              {
                                id: "test23-t3-badge",
                                type: "badge",
                                text: "HIPAA COMPLIANT STACK",
                                style: {
                                  color: { background: "surface-muted", text: "text" },
                                  typography: { size: "sm", weight: "bold" },
                                },
                              },
                              {
                                id: "test23-t3-stat",
                                type: "stat",
                                value: "100%",
                                label: "Zero-Trust Schema Audit Rating",
                              },
                              {
                                id: "test23-t3-quote",
                                type: "quote",
                                quote:
                                  "Clinical patient portals require absolute deterministic markup. Ozmishow met our FDA digital therapeutics guidelines on day one.",
                                author: "Dr. Evelyn Wu",
                                role: "Head of Medical Informatics, BioGenix Health",
                                style: {
                                  typography: { size: "lg" },
                                  color: { text: "text" },
                                },
                              },
                              {
                                id: "test23-t3-link",
                                type: "link",
                                label: "Read Health Informatics Architecture Report →",
                                href: "#biotech",
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
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 24: Expandable Accordion Testimonial Rows (Native compound accordion)
// ============================================================================
export const TESTIMONIAL_24_ACCORDION: ComponentDocument = {
  id: "testimonial-24-accordion-testimonials",
  name: "Expandable Accordion Testimonial Rows",
  version: 2,
  root: {
    id: "test24-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test24-container",
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
            id: "test24-header-stack",
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
                id: "test24-badge",
                type: "badge",
                text: "DEEP-DIVE TESTIMONIAL AUDITS",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test24-heading",
                type: "heading",
                level: 2,
                text: "Architectural Verdicts from Principal Engineers",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Native Accordion Compound Node */
          {
            id: "test24-accordion",
            type: "accordion",
            openMode: "single",
            collapsible: true,
            style: { sizing: { width: "full" } },
            children: [
              /* Row 1 */
              {
                id: "test24-row-1",
                type: "disclosure",
                defaultOpen: true,
                transition: "height-fade",
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background" },
                },
                children: [
                  {
                    id: "test24-r1-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "test24-r1-title",
                        type: "text",
                        text: "HOW CYBERGUARD REDUCED ZERO-DAY MITIGATION TIME FROM 4 HOURS TO 8 MINUTES",
                        style: {
                          typography: { size: "base", weight: "semibold" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                  {
                    id: "test24-r1-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "test24-r1-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test24-r1-badge",
                            type: "badge",
                            text: "CYBERSECURITY INCIDENT RESPONSE",
                            style: {
                              color: { background: "primary", text: "background" },
                              typography: { size: "sm" },
                            },
                          },
                          {
                            id: "test24-r1-quote",
                            type: "quote",
                            quote:
                              "When critical zero-day vulnerabilities emerge, our alert response portal must deploy instantly with zero staging delays. Ozmishow allows security engineers to visually compose verified incident hubs directly to production CDN.",
                            author: "Tariq Mansoor",
                            role: "Head of Information Security, CyberGuard Global",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Row 2 */
              {
                id: "test24-row-2",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background" },
                },
                children: [
                  {
                    id: "test24-r2-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "test24-r2-title",
                        type: "text",
                        text: "WHY NORDIC WEALTH STANDARDIZED ON IMMUTABLE COMPONENT SCHEMAS",
                        style: {
                          typography: { size: "base", weight: "semibold" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                  {
                    id: "test24-r2-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "test24-r2-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test24-r2-badge",
                            type: "badge",
                            text: "SOVEREIGN WEALTH GOVERNANCE",
                            style: {
                              color: { background: "surface-muted", text: "text" },
                              typography: { size: "sm" },
                            },
                          },
                          {
                            id: "test24-r2-quote",
                            type: "quote",
                            quote:
                              "Treating visual layout documents as deterministic TypeScript schemas enabled continuous auditing across 3 European sovereign jurisdictions without UI discrepancies or unapproved styling.",
                            author: "Beatrice Moreau",
                            role: "General Counsel, Nordic Wealth Partners",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Row 3 */
              {
                id: "test24-row-3",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background" },
                },
                children: [
                  {
                    id: "test24-r3-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "test24-r3-title",
                        type: "text",
                        text: "SCALING TO 120M MONTHLY PAGE RENDERS WITHOUT PERFORMANCE REGRESSION",
                        style: {
                          typography: { size: "base", weight: "semibold" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                  {
                    id: "test24-r3-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "test24-r3-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "test24-r3-badge",
                            type: "badge",
                            text: "GLOBAL INFRASTRUCTURE",
                            style: {
                              color: { background: "surface-muted", text: "text" },
                              typography: { size: "sm" },
                            },
                          },
                          {
                            id: "test24-r3-quote",
                            type: "quote",
                            quote:
                              "Our engineering organization eliminated 60% of our frontend backlog while maintaining perfect Lighthouse 100 performance scores on every localized production domain.",
                            author: "Henrik Lindqvist",
                            role: "Chief Technology Officer, Apex Infrastructure",
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
    ],
  },
};

// ============================================================================
// TEMPLATE 25: Client Logo Matrix with Active Callout
// ============================================================================
export const TESTIMONIAL_25_LOGO_MATRIX: ComponentDocument = {
  id: "testimonial-25-logo-led-customer-stories",
  name: "Client Logo Matrix with Active Callout",
  version: 2,
  root: {
    id: "test25-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test25-container",
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
            id: "test25-header-stack",
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
                id: "test25-badge",
                type: "badge",
                text: "GLOBAL CLIENT ECOSYSTEM",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test25-heading",
                type: "heading",
                level: 2,
                text: "Powering the World's Most Demanding Interfaces",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Top Logo Grid (4 Partners) */
          { style: { spacing: { gap: "md" } },
            id: "test25-logo-grid",
            type: "grid",
            columns: 12,
            children: [
              {
                id: "test25-logo-1",
                type: "card",
                element: "div",
                layout: { span: { mobile: 6, tablet: 3, desktop: 3 } },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test25-l1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "center",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test25-l1-name",
                        type: "text",
                        text: "APEX CLOUD",
                        style: {
                          typography: { size: "sm", weight: "bold", align: "center" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              {
                id: "test25-logo-2",
                type: "card",
                element: "div",
                layout: { span: { mobile: 6, tablet: 3, desktop: 3 } },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test25-l2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "center",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test25-l2-name",
                        type: "text",
                        text: "LINEAR SYSTEMS",
                        style: {
                          typography: { size: "sm", weight: "bold", align: "center" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },

              {
                id: "test25-logo-3",
                type: "card",
                element: "div",
                layout: { span: { mobile: 6, tablet: 3, desktop: 3 } },
                style: {
                  border: { width: "thin", color: "primary", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "surface-muted", text: "text" },
                },
                children: [
                  {
                    id: "test25-l3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "center",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test25-l3-name",
                        type: "text",
                        text: "HORIZON DYNAMICS ★",
                        style: {
                          typography: { size: "sm", weight: "bold", align: "center" },
                          color: { text: "primary" },
                        },
                      },
                    ],
                  },
                ],
              },

              {
                id: "test25-logo-4",
                type: "card",
                element: "div",
                layout: { span: { mobile: 6, tablet: 3, desktop: 3 } },
                style: {
                  border: { width: "thin", color: "text-muted", radius: "lg" },
                  spacing: { padding: "md" },
                  color: { background: "background", text: "text" },
                },
                children: [
                  {
                    id: "test25-l4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "center",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "test25-l4-name",
                        type: "text",
                        text: "ZURICH SOVEREIGN",
                        style: {
                          typography: { size: "sm", weight: "bold", align: "center" },
                          color: { text: "text" },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Bottom Active Callout Card */
          {
            id: "test25-spotlight-card",
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
                id: "test25-spotlight-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "test25-spotlight-badge",
                    type: "badge",
                    text: "KEYNOTE PARTNER SPOTLIGHT: HORIZON DYNAMICS",
                    style: {
                      color: { background: "primary", text: "background" },
                      typography: { size: "sm", weight: "bold" },
                    },
                  },
                  {
                    id: "test25-spotlight-quote",
                    type: "quote",
                    quote:
                      "Ozmishow is the single source of truth for our visual product experiences. What our design systems team architects in the visual builder is precisely what compiles and renders in production.",
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
        ],
      },
    ],
  },
};

// ============================================================================
// TEMPLATE 26: Aggregate Star Scorecard & Customer Reviews
// ============================================================================
export const TESTIMONIAL_26_SCORECARD_WALL: ComponentDocument = {
  id: "testimonial-26-rating-led-review-section",
  name: "Aggregate Star Scorecard & Customer Reviews",
  version: 2,
  root: {
    id: "test26-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "test26-container",
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
            id: "test26-header-stack",
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
                id: "test26-badge",
                type: "badge",
                text: "VERIFIED CUSTOMER SCORECARD",
                style: {
                  color: { background: "primary", text: "background" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
              {
                id: "test26-heading",
                type: "heading",
                level: 2,
                text: "4.9 Out of 5 Across 1,420+ Verified Reviews",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* 12-Column Grid: Scorecard Left (4 col), Review Grid Right (8 col) */
          { style: { spacing: { gap: "lg" } },
            id: "test26-grid",
            type: "grid",
            columns: 12,
            children: [
              /* Left Column: Aggregated Scorecard (Span 4) */
              {
                id: "test26-scorecard-card",
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
                    id: "test26-scorecard-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "test26-overall-stat",
                        type: "stat",
                        value: "4.9 / 5.0",
                        label: "Overall Customer Satisfaction",
                      },
                      {
                        id: "test26-overall-rating",
                        type: "rating",
                        value: 5,
                        max: 5,
                        showValue: true,
                        accessibleLabel: "4.9 out of 5 stars",
                      },
                      {
                        id: "test26-verified-count-text",
                        type: "text",
                        text: "98% of customers recommend Ozmishow for visual component assembly.",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                      /* Distribution Bars */
                      {
                        id: "test26-dist-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        style: { sizing: { width: "full" }, spacing: { marginTop: "sm" } },
                        children: [
                          {
                            id: "test26-d5",
                            type: "text",
                            text: "★★★★★  5 Stars: 92% (1,306 reviews)",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "test26-d4",
                            type: "text",
                            text: "★★★★☆  4 Stars: 7% (99 reviews)",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "test26-d3",
                            type: "text",
                            text: "★★★☆☆  3 Stars: 1% (15 reviews)",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: 4 Review Cards in Nested Grid (Span 8) */
              {
                id: "test26-reviews-container",
                type: "card",
                element: "div",
                layout: {
                  span: { mobile: 12, tablet: 8, desktop: 8 },
                },
                style: { sizing: { width: "full" } },
                children: [
                  { style: { spacing: { gap: "md" } },
                    id: "test26-subgrid",
                    type: "grid",
                    columns: 12,
                    children: [
                      /* Review 1 */
                      {
                        id: "test26-rev-1",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test26-r1-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test26-r1-stars",
                                type: "rating",
                                value: 5,
                                max: 5,
                                showValue: true,
                                accessibleLabel: "5 stars",
                              },
                              {
                                id: "test26-r1-quote",
                                type: "quote",
                                quote:
                                  "Flawless developer ergonomics. What our design team drafts compiles cleanly into production.",
                                author: "Maya Lin",
                                role: "Design Systems Lead",
                                style: { typography: { size: "sm" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Review 2 */
                      {
                        id: "test26-rev-2",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test26-r2-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test26-r2-stars",
                                type: "rating",
                                value: 5,
                                max: 5,
                                showValue: true,
                                accessibleLabel: "5 stars",
                              },
                              {
                                id: "test26-r2-quote",
                                type: "quote",
                                quote:
                                  "Instant live CDN updates. No more waiting 3 weeks for frontend sprint tickets.",
                                author: "Kieran Blake",
                                role: "Growth Director",
                                style: { typography: { size: "sm" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Review 3 */
                      {
                        id: "test26-rev-3",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test26-r3-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test26-r3-stars",
                                type: "rating",
                                value: 5,
                                max: 5,
                                showValue: true,
                                accessibleLabel: "5 stars",
                              },
                              {
                                id: "test26-r3-quote",
                                type: "quote",
                                quote:
                                  "Saved our agency 20 hours a week on client landing page adjustments.",
                                author: "Marcus Holloway",
                                role: "Agency Founder",
                                style: { typography: { size: "sm" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Review 4 */
                      {
                        id: "test26-rev-4",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                        style: {
                          border: { width: "thin", color: "text-muted", radius: "lg" },
                          spacing: { padding: "md" },
                          color: { background: "background", text: "text" },
                        },
                        children: [
                          {
                            id: "test26-r4-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "test26-r4-stars",
                                type: "rating",
                                value: 5,
                                max: 5,
                                showValue: true,
                                accessibleLabel: "5 stars",
                              },
                              {
                                id: "test26-r4-quote",
                                type: "quote",
                                quote:
                                  "Unbeatable schema reliability. Zero regressions across production endpoints.",
                                author: "Julian Chen",
                                role: "Platform Tech Lead",
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
        ],
      },
    ],
  },
};

export const CURATED_TESTIMONIAL_BATCH_5: ComponentDocument[] = [
  TESTIMONIAL_22_STICKY_SCROLL,
  TESTIMONIAL_23_TABBED_STORIES,
  TESTIMONIAL_24_ACCORDION,
  TESTIMONIAL_25_LOGO_MATRIX,
  TESTIMONIAL_26_SCORECARD_WALL,
];
