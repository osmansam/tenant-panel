import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 2 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-06: Alpine Sanctuary · Guest Journey & Experience Timeline
 * Industry: Hotels & Luxury Hospitality
 * Layout: Vertical Itinerary Timeline with sticky contextual header
 * Visual Family: Warm Luxury Hospitality
 */
export const FEATURE_HOTEL_EXPERIENCE_TIMELINE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-06-hotel-experience-timeline",
  name: "Alpine Sanctuary · Guest Journey & Experience Timeline",
  kind: "section",
  root: {
    id: "feat06-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat06-container",
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
          {
            id: "feat06-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "2xl" },
            },
            children: [
              /* Left Column: Context & Itinerary Request (4 cols) */
              {
                id: "feat06-left-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                children: [
                  {
                    id: "feat06-badge",
                    type: "badge",
                    text: "CURATED GUEST JOURNEY",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "full" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "md", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat06-title",
                    type: "heading",
                    level: 2,
                    text: "A day of quiet restoration at Silvretta Lodge",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat06-desc",
                    type: "text",
                    text: "From sunrise mindfulness across private alpine meadows to candlelit cellar tastings, every hour is orchestrated with tranquil discretion.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "feat06-cta-btn",
                    type: "button",
                    label: "Request bespoke stay itinerary",
                    iconId: "calendar-days",
                    iconPosition: "end",
                    href: "/concierge/itinerary",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "xl", paddingY: "md" },
                    },
                  },
                ],
              },

              /* Right Column: Timeline Rail (8 cols) */
              {
                id: "feat06-right-timeline",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 8 },
                },
                children: [
                  /* Milestone 1 */
                  {
                    id: "feat06-m1-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "xl" },
                    },
                    children: [
                      {
                        id: "feat06-m1-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: { spacing: { marginBottom: "sm" } },
                        children: [
                          {
                            id: "feat06-m1-badge",
                            type: "badge",
                            text: "07:30 AM · SUNRISE",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "sm" },
                              typography: { family: "monospace", size: "sm" },
                            },
                          },
                          {
                            id: "feat06-m1-loc",
                            type: "text",
                            text: "Mountain Cedar Deck",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat06-m1-title",
                        type: "heading",
                        level: 3,
                        text: "Alpine Sunrise Pranayama & Thermal Dip",
                        style: {
                          typography: { size: "xl", weight: "bold" },
                          spacing: { marginBottom: "xs" },
                        },
                      },
                      {
                        id: "feat06-m1-desc",
                        type: "text",
                        text: "Guided breathwork on our heated larch-wood terrace facing Mount Cristallo, followed by private mineral spring immersions and freshly pressed herbal elixirs.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },

                  /* Milestone 2 */
                  {
                    id: "feat06-m2-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "xl" },
                    },
                    children: [
                      {
                        id: "feat06-m2-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: { spacing: { marginBottom: "sm" } },
                        children: [
                          {
                            id: "feat06-m2-badge",
                            type: "badge",
                            text: "11:00 AM · MORNING",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "sm" },
                              typography: { family: "monospace", size: "sm" },
                            },
                          },
                          {
                            id: "feat06-m2-loc",
                            type: "text",
                            text: "Private Pine Reserves",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat06-m2-title",
                        type: "heading",
                        level: 3,
                        text: "Old-Growth Forest Truffle & Botanicals Forage",
                        style: {
                          typography: { size: "xl", weight: "bold" },
                          spacing: { marginBottom: "xs" },
                        },
                      },
                      {
                        id: "feat06-m2-desc",
                        type: "text",
                        text: "Accompanied by our resident estate naturalist and trained Lagotto hounds through protected pine groves, gathering rare wild mushrooms and seasonal herbs.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },

                  /* Milestone 3 */
                  {
                    id: "feat06-m3-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "xl" },
                    },
                    children: [
                      {
                        id: "feat06-m3-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: { spacing: { marginBottom: "sm" } },
                        children: [
                          {
                            id: "feat06-m3-badge",
                            type: "badge",
                            text: "04:30 PM · AFTERNOON",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "sm" },
                              typography: { family: "monospace", size: "sm" },
                            },
                          },
                          {
                            id: "feat06-m3-loc",
                            type: "text",
                            text: "Thermal Spa Pavilion",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat06-m3-title",
                        type: "heading",
                        level: 3,
                        text: "Therapeutic Mineral Salt Flotation & Body Work",
                        style: {
                          typography: { size: "xl", weight: "bold" },
                          spacing: { marginBottom: "xs" },
                        },
                      },
                      {
                        id: "feat06-m3-desc",
                        type: "text",
                        text: "Weightless sensory recovery in individual salt caves, followed by deep tissue alpine stone therapy with custom mountain arnica essential oils.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },

                  /* Milestone 4 */
                  {
                    id: "feat06-m4-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "xl" },
                    },
                    children: [
                      {
                        id: "feat06-m4-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: { spacing: { marginBottom: "sm" } },
                        children: [
                          {
                            id: "feat06-m4-badge",
                            type: "badge",
                            text: "08:00 PM · EVENING",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "sm" },
                              typography: { family: "monospace", size: "sm" },
                            },
                          },
                          {
                            id: "feat06-m4-loc",
                            type: "text",
                            text: "The Cellar Vault",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat06-m4-title",
                        type: "heading",
                        level: 3,
                        text: "Private Cru Degustation & Alpine Hearth Dinner",
                        style: {
                          typography: { size: "xl", weight: "bold" },
                          spacing: { marginBottom: "xs" },
                        },
                      },
                      {
                        id: "feat06-m4-desc",
                        type: "text",
                        text: "Seven-course seasonal tasting curated by Executive Chef Marcella Vane, featuring vintage cellar pairings and open wood-fire preparations.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
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
    ],
  },
};

/**
 * FEATURE-07: Corporate Counsel · Retainer & Fee Structure Matrix
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 3-column asymmetric tier comparison with explicit scope and SLA metrics
 * Visual Family: Corporate Counsel / Financial Litigation
 */
export const FEATURE_LEGAL_FEE_STRUCTURE_HYBRID_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-07-legal-fee-structure-hybrid",
  name: "Corporate Counsel · Retainer & Fee Structure Matrix",
  kind: "section",
  root: {
    id: "feat07-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat07-container",
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
          /* Header */
          {
            id: "feat07-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { maxWidth: "3xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "feat07-badge",
                type: "badge",
                text: "TRANSPARENT RETAINER MODELS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat07-title",
                type: "heading",
                level: 2,
                text: "Predictable fee structures for institutional counsel",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat07-subtitle",
                type: "text",
                text: "Guaranteed partner response times, capped milestone budgets, and transparent billing designed for board accountability.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Card Grid */
          {
            id: "feat07-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Tier 1: Corporate Advisory Retainer */
              {
                id: "feat07-tier-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat07-t1-badge",
                    type: "badge",
                    text: "GENERAL ADVISORY",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat07-t1-title",
                    type: "heading",
                    level: 3,
                    text: "Outside General Counsel",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "md", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat07-t1-price",
                    type: "heading",
                    level: 4,
                    text: "$18,500 / month",
                    style: {
                      typography: { size: "xl", weight: "semibold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat07-t1-desc",
                    type: "text",
                    text: "Ongoing day-to-day counsel for board governance, commercial vendor contracts, and employment compliance.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat07-t1-list",
                    type: "list",
                    marker: "check",
                    items: [
                      "Up to 25 monthly partner & senior associate hours",
                      "Guaranteed same-day contract turnaround",
                      "Quarterly board compliance & risk audits",
                      "Direct senior partner emergency access",
                    ],
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "xl" },
                    },
                  },
                  {
                    id: "feat07-t1-btn",
                    type: "button",
                    label: "Engage Advisory Counsel",
                    href: "/retainer/advisory",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Tier 2: Landmark Litigation Defense (Featured) */
              {
                id: "feat07-tier-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "primary", shadow: "lg" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat07-t2-badge",
                    type: "badge",
                    text: "PRIORITY TRIAL MOBILIZATION",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat07-t2-title",
                    type: "heading",
                    level: 3,
                    text: "High-Stakes Trial Defense",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "md", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat07-t2-price",
                    type: "heading",
                    level: 4,
                    text: "Blended Hourly + Milestone",
                    style: {
                      typography: { size: "xl", weight: "semibold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat07-t2-desc",
                    type: "text",
                    text: "Immediate courtroom deployment for shareholder derivative suits, trade secret theft, and preliminary injunction hearings.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat07-t2-list",
                    type: "list",
                    marker: "check",
                    items: [
                      "< 2-Hour emergency TRO injunction filings",
                      "Chambers Band 1 lead trial counsel in court",
                      "Full-service e-discovery & evidence war room",
                      "Capped phase budgets with strict expense audits",
                    ],
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "xl" },
                    },
                  },
                  {
                    id: "feat07-t2-btn",
                    type: "button",
                    label: "Retain Trial Team",
                    href: "/retainer/trial-defense",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Tier 3: Transactional M&A Counsel */
              {
                id: "feat07-tier-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat07-t3-badge",
                    type: "badge",
                    text: "DEAL STRUCTURING",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat07-t3-title",
                    type: "heading",
                    level: 3,
                    text: "M&A & Deal Counsel",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "md", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat07-t3-price",
                    type: "heading",
                    level: 4,
                    text: "Fixed Milestone Retainer",
                    style: {
                      typography: { size: "xl", weight: "semibold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat07-t3-desc",
                    type: "text",
                    text: "Comprehensive legal representation from term sheet negotiation through regulatory clearance and final escrow closing.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat07-t3-list",
                    type: "list",
                    marker: "check",
                    items: [
                      "Full-scope IP, tax & liability diligence",
                      "CFIUS & FTC antitrust regulatory filings",
                      "Executive compensation & retention agreements",
                      "Post-closing indemnification escrow protection",
                    ],
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "xl" },
                    },
                  },
                  {
                    id: "feat07-t3-btn",
                    type: "button",
                    label: "Consult Deal Lead",
                    href: "/retainer/mergers",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
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

/**
 * FEATURE-08: Oceanfront Haven · Thalassotherapy Sanctuary Spotlight
 * Industry: Hotels & Luxury Hospitality
 * Layout: Full-width spotlight hero card + 3 subordinate capability cards below
 * Visual Family: Coastal Sanctuary / Luxury Spa
 */
export const FEATURE_HOTEL_WELLNESS_SPOTLIGHT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-08-hotel-wellness-spotlight",
  name: "Oceanfront Haven · Thalassotherapy Sanctuary Spotlight",
  kind: "section",
  root: {
    id: "feat08-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat08-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Dominant Full-Width Spotlight Card */
          {
            id: "feat08-hero-card",
            type: "card",
            element: "article",
            style: {
              background: [
                {
                  kind: "solid",
                  color: { kind: "custom", value: "#0B1528" },
                },
              ],
              border: { radius: "3xl", width: "thin", color: "border", shadow: "xl" },
              spacing: { padding: "2xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "feat08-hero-grid",
                type: "grid",
                columns: 12,
                style: {
                  sizing: { width: "full" },
                  spacing: { gap: "xl" },
                },
                children: [
                  /* Left Spotlight Copy (7 cols) */
                  {
                    id: "feat08-hero-left",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    layout: {
                      span: { mobile: 12, tablet: 12, desktop: 7 },
                    },
                    children: [
                      {
                        id: "feat08-hero-badge",
                        type: "badge",
                        text: "FLAGSHIP HYDROTHERAPY SANCTUARY",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          typography: { size: "sm" },
                          spacing: { paddingX: "md", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat08-hero-title",
                        type: "heading",
                        level: 2,
                        text: "The 12,000 sq ft Coastal Thalassotherapy Pavilion",
                        style: {
                          typography: { size: "4xl", weight: "bold", tracking: "tight" },
                          textPaint: { kind: "custom", value: "#F8FAFC" },
                        },
                      },
                      {
                        id: "feat08-hero-desc",
                        type: "text",
                        text: "Harnessing pristine Atlantic seawater pumped from 80 meters depth, our nine mineral temperature pools and heated ocean cascades restore cellular vitality and calm the nervous system.",
                        style: {
                          typography: { size: "base", leading: "relaxed" },
                          textPaint: { kind: "custom", value: "#94A3B8" },
                          spacing: { marginBottom: "sm" },
                        },
                      },
                      {
                        id: "feat08-hero-btn",
                        type: "button",
                        label: "Reserve Thalassotherapy Pass",
                        iconId: "sparkles",
                        iconPosition: "end",
                        href: "/spa/thalasso",
                        style: {
                          color: { background: "primary", text: "primary-foreground" },
                          border: { radius: "md" },
                          typography: { weight: "semibold" },
                          spacing: { paddingX: "xl", paddingY: "md" },
                        },
                      },
                    ],
                  },

                  /* Right Spotlight Metrics Card (5 cols) */
                  {
                    id: "feat08-hero-right",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "center",
                    wrap: false,
                    gap: "md",
                    layout: {
                      span: { mobile: 12, tablet: 12, desktop: 5 },
                    },
                    children: [
                      {
                        id: "feat08-stat-1",
                        type: "card",
                        element: "div",
                        style: {
                          background: [
                            { kind: "solid", color: { kind: "custom", value: "#1E293B" } },
                          ],
                          border: { radius: "xl" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "feat08-s1-num",
                            type: "stat",
                            value: "80m",
                            label: "Atlantic deep-water suction depth for pure marine minerals",
                            style: {
                              typography: { size: "2xl", weight: "bold" },
                              textPaint: { kind: "custom", value: "#38BDF8" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat08-stat-2",
                        type: "card",
                        element: "div",
                        style: {
                          background: [
                            { kind: "solid", color: { kind: "custom", value: "#1E293B" } },
                          ],
                          border: { radius: "xl" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "feat08-s2-num",
                            type: "stat",
                            value: "34°C",
                            label: "Constant physiological temperature across heated cascades",
                            style: {
                              typography: { size: "2xl", weight: "bold" },
                              textPaint: { kind: "custom", value: "#4ADE80" },
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

          /* Bottom 3 Subordinate Capability Cards (4 / 4 / 4) */
          {
            id: "feat08-sub-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Sub Card 1 */
              {
                id: "feat08-sub-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat08-sub1-title",
                    type: "heading",
                    level: 3,
                    text: "Sub-Zero Alpine Cryotherapy",
                    style: {
                      typography: { size: "lg", weight: "bold" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat08-sub1-desc",
                    type: "text",
                    text: "Three-minute whole-body exposure at -110°C to accelerate muscular regeneration and stimulate endorphin synthesis.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Sub Card 2 */
              {
                id: "feat08-sub-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat08-sub2-title",
                    type: "heading",
                    level: 3,
                    text: "Sensory Seawater Flotation",
                    style: {
                      typography: { size: "lg", weight: "bold" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat08-sub2-desc",
                    type: "text",
                    text: "Zero-gravity Epsom and marine mineral flotation pools with soothing underwater acoustic resonance therapy.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Sub Card 3 */
              {
                id: "feat08-sub-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat08-sub3-title",
                    type: "heading",
                    level: 3,
                    text: "Private Sunset Cliff Cabanas",
                    style: {
                      typography: { size: "lg", weight: "bold" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat08-sub3-desc",
                    type: "text",
                    text: "Open-air oceanfront treatment suites with direct Pacific vistas, private soaking tubs, and organic botanical body wraps.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
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
};

/**
 * FEATURE-09: Regulatory Defense · Government Inquiry Rights Accordion
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 2-column split with left crisis dispatch hotline & right interactive disclosure accordion
 * Visual Family: High-Stakes Trial / White-Collar Defense
 */
export const FEATURE_LEGAL_DEFENSE_FAQ_ACCORDION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-09-legal-defense-faq-accordion",
  name: "Regulatory Defense · Government Inquiry Rights Accordion",
  kind: "section",
  root: {
    id: "feat09-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat09-container",
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
          {
            id: "feat09-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "2xl" },
            },
            children: [
              /* Left Column: 24/7 Crisis Response Card (5 cols) */
              {
                id: "feat09-left-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 5 },
                },
                children: [
                  {
                    id: "feat09-badge",
                    type: "badge",
                    text: "24/7 CRISIS DISPATCH HOTLINE",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      typography: { size: "sm" },
                      spacing: { paddingX: "md", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat09-title",
                    type: "heading",
                    level: 2,
                    text: "Facing a government inquiry or federal grand jury subpoena?",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat09-desc",
                    type: "text",
                    text: "Immediate counsel representation is critical within the first 24 hours of agency contact. Do not consent to interviews or disclose corporate records without trial counsel present.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat09-stat-card",
                    type: "card",
                    element: "div",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "feat09-stat-val",
                        type: "stat",
                        value: "< 60 min",
                        label: "Average response deployment for federal agency inquiries nationwide",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                        },
                      },
                    ],
                  },
                  {
                    id: "feat09-btn",
                    type: "button",
                    label: "Connect to Emergency Crisis Line",
                    iconId: "phone",
                    iconPosition: "start",
                    href: "tel:+18005550199",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "xl", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Right Column: Disclosure Stack (7 cols) */
              {
                id: "feat09-right-col",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 7 },
                },
                children: [
                  /* Panel 1 */
                  {
                    id: "feat09-disc-1",
                    type: "disclosure",
                    defaultOpen: true,
                    transition: "height-fade",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat09-d1-trigger",
                        type: "slot",
                        name: "trigger",
                        children: [
                          {
                            id: "feat09-d1-head",
                            type: "heading",
                            level: 3,
                            text: "What steps must officers take upon service of a Subpoena Duces Tecum?",
                            style: {
                              typography: { size: "base", weight: "bold" },
                              color: { text: "text" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat09-d1-content",
                        type: "slot",
                        name: "content",
                        children: [
                          {
                            id: "feat09-d1-body",
                            type: "text",
                            text: "Immediately institute a mandatory corporate legal hold across all email servers, chat records, and cloud documents. Suspend all automated data destruction routines immediately to prevent spoliation penalties. Contact lead defense counsel before contacting the government prosecutor.",
                            style: {
                              typography: { size: "sm", leading: "relaxed" },
                              color: { text: "text-muted" },
                              spacing: { paddingTop: "sm" },
                            },
                          },
                        ],
                      },
                    ],
                  },

                  /* Panel 2 */
                  {
                    id: "feat09-disc-2",
                    type: "disclosure",
                    defaultOpen: false,
                    transition: "height-fade",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat09-d2-trigger",
                        type: "slot",
                        name: "trigger",
                        children: [
                          {
                            id: "feat09-d2-head",
                            type: "heading",
                            level: 3,
                            text: "How should personnel respond if federal agents execute an unannounced search warrant?",
                            style: {
                              typography: { size: "base", weight: "bold" },
                              color: { text: "text" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat09-d2-content",
                        type: "slot",
                        name: "content",
                        children: [
                          {
                            id: "feat09-d2-body",
                            type: "text",
                            text: "Request official credentials and a copy of the search warrant. Immediately verify the warrant's jurisdictional scope and address. Do not interfere with agents, but make it clear that all staff decline voluntary interviews until external counsel arrives at the premises.",
                            style: {
                              typography: { size: "sm", leading: "relaxed" },
                              color: { text: "text-muted" },
                              spacing: { paddingTop: "sm" },
                            },
                          },
                        ],
                      },
                    ],
                  },

                  /* Panel 3 */
                  {
                    id: "feat09-disc-3",
                    type: "disclosure",
                    defaultOpen: false,
                    transition: "height-fade",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat09-d3-trigger",
                        type: "slot",
                        name: "trigger",
                        children: [
                          {
                            id: "feat09-d3-head",
                            type: "heading",
                            level: 3,
                            text: "How does external counsel protect board directors from individual civil and criminal exposure?",
                            style: {
                              typography: { size: "base", weight: "bold" },
                              color: { text: "text" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat09-d3-content",
                        type: "slot",
                        name: "content",
                        children: [
                          {
                            id: "feat09-d3-body",
                            type: "text",
                            text: "We establish independent special board committees shielded by absolute attorney-client privilege. Our team evaluates D&O insurance indemnification triggers, prevents conflicts between corporate and officer representation, and prepares proactive mitigation presentations for agency prosecutors.",
                            style: {
                              typography: { size: "sm", leading: "relaxed" },
                              color: { text: "text-muted" },
                              spacing: { paddingTop: "sm" },
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

/**
 * FEATURE-10: Grand Palace · Suite Collection Category Comparison
 * Industry: Hotels & Luxury Hospitality
 * Layout: Side-by-side room specification comparison matrix across 3 tiers
 * Visual Family: Palace Luxury Hospitality
 */
export const FEATURE_HOTEL_ROOM_CATEGORY_MATRIX_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-10-hotel-room-category-matrix",
  name: "Grand Palace · Suite Collection Category Comparison",
  kind: "section",
  root: {
    id: "feat10-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat10-container",
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
          /* Header */
          {
            id: "feat10-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { maxWidth: "3xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "feat10-badge",
                type: "badge",
                text: "SUITE PORTFOLIO COMPARISON",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat10-title",
                type: "heading",
                level: 2,
                text: "Compare our signature suites & private residences",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat10-subtitle",
                type: "text",
                text: "Every suite includes twice-daily housekeeping, private marble bathrooms, and dedicated concierge access.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Comparison Matrix */
          {
            id: "feat10-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Tier 1: Deluxe Forest Suite */
              {
                id: "feat10-card-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat10-c1-badge",
                    type: "badge",
                    text: "ESTATE WING",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat10-c1-title",
                    type: "heading",
                    level: 3,
                    text: "Deluxe Forest Suite",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "md", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat10-c1-price",
                    type: "heading",
                    level: 4,
                    text: "From $1,250 / night",
                    style: {
                      typography: { size: "xl", weight: "semibold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat10-c1-list",
                    type: "list",
                    marker: "check",
                    items: [
                      "850 sq ft (79 m²) Private Living Area",
                      "Private cedar balcony overlooking pine reserves",
                      "Deep Carrara marble soaking bath",
                      "Afternoon tea & evening turn-down service",
                      "Full access to Alpine Thermal Spa",
                    ],
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "xl" },
                    },
                  },
                  {
                    id: "feat10-c1-btn",
                    type: "button",
                    label: "Reserve Forest Suite",
                    href: "/suites/deluxe-forest",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Tier 2: Executive Panoramic Suite (Featured) */
              {
                id: "feat10-card-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "primary", shadow: "lg" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat10-c2-badge",
                    type: "badge",
                    text: "MOST CELEBRATED",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat10-c2-title",
                    type: "heading",
                    level: 3,
                    text: "Executive Panoramic Suite",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "md", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat10-c2-price",
                    type: "heading",
                    level: 4,
                    text: "From $2,600 / night",
                    style: {
                      typography: { size: "xl", weight: "semibold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat10-c2-list",
                    type: "list",
                    marker: "check",
                    items: [
                      "1,850 sq ft (172 m²) Salon & Master Bedroom",
                      "Heated wraparound terrace with valley vistas",
                      "Private wood-burning hearth & sommelier bar",
                      "Dedicated floor concierge & luggage unpacking",
                      "Complimentary chauffeured estate transfers",
                    ],
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "xl" },
                    },
                  },
                  {
                    id: "feat10-c2-btn",
                    type: "button",
                    label: "Reserve Panoramic Suite",
                    href: "/suites/panoramic",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Tier 3: Royal Alpine Chalet */
              {
                id: "feat10-card-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat10-c3-badge",
                    type: "badge",
                    text: "STANDALONE RESIDENCE",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat10-c3-title",
                    type: "heading",
                    level: 3,
                    text: "Royal Alpine Chalet",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginTop: "md", marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat10-c3-price",
                    type: "heading",
                    level: 4,
                    text: "From $5,400 / night",
                    style: {
                      typography: { size: "xl", weight: "semibold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat10-c3-list",
                    type: "list",
                    marker: "check",
                    items: [
                      "4,200 sq ft (390 m²) Private 3-Bedroom Residence",
                      "Private heated outdoor infinity plunge pool",
                      "Dedicated 24/7 Butler & Resident Executive Chef",
                      "Direct private helipad transfers & ski-in lift",
                      "Private 200-bottle Grand Cru reserve cellar",
                    ],
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "xl" },
                    },
                  },
                  {
                    id: "feat10-c3-btn",
                    type: "button",
                    label: "Inquire Private Chalet",
                    href: "/suites/royal-chalet",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
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

export const CURATED_FEATURE_BATCH_2: readonly ComponentDocument[] = [
  FEATURE_HOTEL_EXPERIENCE_TIMELINE_DOCUMENT,
  FEATURE_LEGAL_FEE_STRUCTURE_HYBRID_DOCUMENT,
  FEATURE_HOTEL_WELLNESS_SPOTLIGHT_DOCUMENT,
  FEATURE_LEGAL_DEFENSE_FAQ_ACCORDION_DOCUMENT,
  FEATURE_HOTEL_ROOM_CATEGORY_MATRIX_DOCUMENT,
];
