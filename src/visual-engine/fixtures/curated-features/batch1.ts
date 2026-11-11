import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 1 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-01: Luxury Hotel · Curated Guest Amenities Trio
 * Industry: Hotels & Luxury Hospitality
 * Layout: Symmetrical 3-card amenity deck with icon badges and inquiry links
 * Visual Family: Warm Luxury Hospitality
 */
export const FEATURE_HOTEL_AMENITIES_TRIO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-01-hotel-amenities-trio",
  name: "Luxury Hotel · Curated Guest Amenities Trio",
  kind: "section",
  root: {
    id: "feat01-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat01-container",
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
          /* Header block */
          {
            id: "feat01-header",
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
                id: "feat01-badge",
                type: "badge",
                text: "BESPOKE HOSPITALITY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat01-title",
                type: "heading",
                level: 2,
                text: "Every stay defined by quiet luxury and restorative care",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat01-subtitle",
                type: "text",
                text: "Curated sanctuary experiences designed for restorative rejuvenation, culinary excellence, and discreet service.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Card Symmetrical Grid */
          {
            id: "feat01-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Amenity 1: Thermal Spa */
              {
                id: "feat01-card-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat01-c1-icon-wrap",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    style: {
                      spacing: { marginBottom: "lg" },
                    },
                    children: [
                      {
                        id: "feat01-c1-icon-card",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "lg" },
                          spacing: { padding: "sm" },
                        },
                        children: [
                          {
                            id: "feat01-c1-icon",
                            type: "icon",
                            iconId: "sparkles",
                            size: 24,
                            decorative: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "feat01-c1-title",
                    type: "heading",
                    level: 3,
                    text: "Private Thermal Spa",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      color: { text: "text" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat01-c1-desc",
                    type: "text",
                    text: "Deep mineral soak pools, custom herbal saunas, and holistic alpine therapies guided by resident practitioners.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat01-c1-link",
                    type: "link",
                    label: "Reserve thermal session →",
                    href: "/spa/thermal-suites",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "primary" },
                    },
                  },
                ],
              },

              /* Amenity 2: Michelin Dining */
              {
                id: "feat01-card-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat01-c2-icon-wrap",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    style: {
                      spacing: { marginBottom: "lg" },
                    },
                    children: [
                      {
                        id: "feat01-c2-icon-card",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "lg" },
                          spacing: { padding: "sm" },
                        },
                        children: [
                          {
                            id: "feat01-c2-icon",
                            type: "icon",
                            iconId: "star",
                            size: 24,
                            decorative: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "feat01-c2-title",
                    type: "heading",
                    level: 3,
                    text: "Michelin-Starred Dining",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      color: { text: "text" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat01-c2-desc",
                    type: "text",
                    text: "Seven-course seasonal degustations highlighting private estate gardens, rare cellar vintages, and terrace sunset views.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat01-c2-link",
                    type: "link",
                    label: "View dinner menus →",
                    href: "/dining/le-sommet",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "primary" },
                    },
                  },
                ],
              },

              /* Amenity 3: Concierge & Chauffeur */
              {
                id: "feat01-card-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat01-c3-icon-wrap",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    style: {
                      spacing: { marginBottom: "lg" },
                    },
                    children: [
                      {
                        id: "feat01-c3-icon-card",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "lg" },
                          spacing: { padding: "sm" },
                        },
                        children: [
                          {
                            id: "feat01-c3-icon",
                            type: "icon",
                            iconId: "map-pin",
                            size: 24,
                            decorative: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "feat01-c3-title",
                    type: "heading",
                    level: 3,
                    text: "24/7 Bespoke Concierge",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      color: { text: "text" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat01-c3-desc",
                    type: "text",
                    text: "Airport helicopter transfers, private alpine guides, yacht charters, and curated museum access tailored to your schedule.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat01-c3-link",
                    type: "link",
                    label: "Contact Head Concierge →",
                    href: "/concierge/guest-services",
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
};

/**
 * FEATURE-02: Litigation Chambers · Senior Counsel Monograph
 * Industry: Lawyers & Legal Practices
 * Layout: Asymmetric 7/5 editorial narrative with warm paper aesthetic
 * Visual Family: High-End Legal Monograph / Chambers Partner Perspective
 */
export const FEATURE_LEGAL_COUNSEL_EDITORIAL_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-02-legal-counsel-editorial-split",
  name: "Litigation Chambers · Senior Counsel Monograph",
  kind: "section",
  root: {
    id: "feat02-section",
    type: "section",
    style: {
      color: { background: "surface-sunken", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat02-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
          spacing: { gap: "2xl" },
        },
        children: [
          /* Left Column: Longform Legal Prose (7 cols) */
          {
            id: "feat02-left-prose",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 7 },
            },
            children: [
              {
                id: "feat02-kicker",
                type: "text",
                text: "SENIOR COUNSEL MONOGRAPH · VOL. 18",
                style: {
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "feat02-heading",
                type: "heading",
                level: 2,
                text: "The discipline of trial precision in complex commercial litigation",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight", family: "serif" },
                  color: { text: "text" },
                  spacing: { marginTop: "xs", marginBottom: "sm" },
                },
              },
              {
                id: "feat02-p1",
                type: "text",
                text: "In high-stakes corporate disputes, victory is rarely decided by volume. It is achieved through institutional discipline, meticulous evidentiary control, and unyielding tactical clarity before judges and regulatory bodies.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat02-p2",
                type: "text",
                text: "Our senior trial partners represent global enterprises, private equity leaders, and boards in multi-district proceedings where financial exposure and institutional reputation are existential concerns.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "feat02-p3",
                type: "text",
                text: "Rather than inflating billable hours with bureaucratic motion practice, our chambers focuses on pinpoint dispositive motions, decisive deposition strikes, and rigorous trial readiness from day one.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Right Column: Pull Quote & Practice Areas Card (5 cols) */
          {
            id: "feat02-right-sidebar",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 5 },
            },
            children: [
              /* Pull Quote Card */
              {
                id: "feat02-quote-card",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat02-quote-node",
                    type: "quote",
                    quote: "The advocate’s greatest duty is clarity under pressure. A courtroom rewards precision, never pretense.",
                    author: "Arthur R. Sterling, Senior Litigation Partner",
                    role: "Former Federal Appellate Clerk · Chambers Band 1",
                    style: {
                      typography: { family: "serif", size: "xl", leading: "relaxed" },
                      color: { text: "text" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat02-quote-divider",
                    type: "divider",
                    style: {
                      border: { width: "thin", color: "border" },
                      spacing: { marginBottom: "md" },
                    },
                  },
                  {
                    id: "feat02-quote-annotation",
                    type: "text",
                    text: "Named Trial Lawyer of the Year by the National Law Journal (2024–2026).",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Footnote Card */
              {
                id: "feat02-meta-card",
                type: "card",
                element: "div",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat02-meta-title",
                    type: "heading",
                    level: 4,
                    text: "Primary Practice Chambers",
                    style: {
                      typography: { size: "base", weight: "bold", family: "serif" },
                      color: { text: "text" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat02-meta-link-1",
                    type: "link",
                    label: "01 / Securities & Shareholder Derivative Defense →",
                    href: "/practice/securities-defense",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      color: { text: "primary" },
                      spacing: { paddingY: "xs" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "feat02-meta-link-2",
                    type: "link",
                    label: "02 / Cross-Border Antitrust & Regulatory Enforcement →",
                    href: "/practice/antitrust-enforcement",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      color: { text: "primary" },
                      spacing: { paddingY: "xs" },
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
 * FEATURE-03: Presidential Suite · Architectural Residence & Specs
 * Industry: Hotels & Luxury Hospitality
 * Layout: 5/7 Split with room specifications, private floor plan card, and reservation inquiry
 * Visual Family: High-End Hospitality Suite Showcase
 */
export const FEATURE_HOTEL_SUITE_SPEC_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-03-hotel-suite-spec-split",
  name: "Presidential Suite · Architectural Residence & Specs",
  kind: "section",
  root: {
    id: "feat03-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat03-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
          spacing: { gap: "2xl" },
        },
        children: [
          /* Left Column: Residence Overview (5 cols) */
          {
            id: "feat03-left-dev",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 5 },
            },
            children: [
              {
                id: "feat03-badge",
                type: "badge",
                text: "SIGNATURE RESIDENCE · SUITE 701",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "md" },
                  typography: { family: "monospace", size: "sm" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat03-title",
                type: "heading",
                level: 2,
                text: "Unrivaled sanctuary above the valley canopy",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                },
              },
              {
                id: "feat03-desc",
                type: "text",
                text: "Spanning 3,800 square feet across the estate's top floor, the Presidential Penthouse features wraparound cedar terraces, dual marble fireplaces, and dedicated 24-hour butler quarters.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "feat03-checklist",
                type: "list",
                marker: "check",
                items: [
                  "3,800 sq ft private indoor living & salon",
                  "Dedicated 24/7 personal butler & sommelier",
                  "Heated rooftop plunge pool with alpine views",
                ],
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat03-cta-btn",
                type: "button",
                label: "Inquire suite availability",
                iconId: "calendar-days",
                iconPosition: "end",
                href: "/reservations/suite-701",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { weight: "semibold" },
                  spacing: { paddingX: "xl", paddingY: "md" },
                },
              },
            ],
          },

          /* Right Column: Architectural Residence Spec Window (7 cols) */
          {
            id: "feat03-right-terminal",
            type: "card",
            element: "div",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 7 },
            },
            style: {
              background: [
                {
                  kind: "solid",
                  color: { kind: "custom", value: "#0F172A" },
                },
              ],
              border: { radius: "xl", width: "thin", color: "border", shadow: "xl" },
              sizing: { width: "full" },
            },
            children: [
              /* Residence Spec Header */
              {
                id: "feat03-term-header",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "none",
                style: {
                  spacing: { paddingX: "lg", paddingY: "md" },
                  border: { width: "thin", color: "border" },
                },
                children: [
                  {
                    id: "feat03-term-title",
                    type: "text",
                    text: "ARCHITECTURAL RESIDENCE SPECIFICATION",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                      textPaint: { kind: "custom", value: "#94A3B8" },
                    },
                  },
                  {
                    id: "feat03-lang-badge",
                    type: "badge",
                    text: "Floor 7 · Penthouse Wing",
                    style: {
                      color: { background: "surface", text: "primary" },
                      border: { radius: "sm" },
                      typography: { family: "monospace", size: "sm" },
                    },
                  },
                ],
              },

              /* Architectural Specification Body */
              {
                id: "feat03-term-body",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "md",
                style: {
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat03-spec-row-1",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    style: { spacing: { marginBottom: "sm" } },
                    children: [
                      {
                        id: "feat03-spec-k1",
                        type: "text",
                        text: "RESIDENCE FOOTPRINT & LIVING SPACE",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                          textPaint: { kind: "custom", value: "#64748B" },
                        },
                      },
                      {
                        id: "feat03-spec-v1",
                        type: "text",
                        text: "3,800 sq ft (353 m²) Indoor Living · 1,200 sq ft Wraparound Cedar Terrace",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "semibold" },
                          textPaint: { kind: "custom", value: "#F8FAFC" },
                        },
                      },
                    ],
                  },
                  {
                    id: "feat03-spec-row-2",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    style: { spacing: { marginBottom: "sm" } },
                    children: [
                      {
                        id: "feat03-spec-k2",
                        type: "text",
                        text: "MASTER ACCOMMODATIONS",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                          textPaint: { kind: "custom", value: "#64748B" },
                        },
                      },
                      {
                        id: "feat03-spec-v2",
                        type: "text",
                        text: "Emperor King Master Suite · Italian Cashmere Linens · Dual Carrara Dressing Rooms",
                        style: {
                          typography: { family: "monospace", size: "sm" },
                          textPaint: { kind: "custom", value: "#38BDF8" },
                        },
                      },
                    ],
                  },
                  {
                    id: "feat03-spec-row-3",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    style: { spacing: { marginBottom: "sm" } },
                    children: [
                      {
                        id: "feat03-spec-k3",
                        type: "text",
                        text: "PRIVATE HYDROTHERAPY & WELLNESS",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                          textPaint: { kind: "custom", value: "#64748B" },
                        },
                      },
                      {
                        id: "feat03-spec-v3",
                        type: "text",
                        text: "Heated Rooftop Alpine Plunge Pool · Finnish Cedar Sauna · Deep Marble Soaking Tub",
                        style: {
                          typography: { family: "monospace", size: "sm" },
                          textPaint: { kind: "custom", value: "#4ADE80" },
                        },
                      },
                    ],
                  },
                  {
                    id: "feat03-spec-row-4",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat03-spec-k4",
                        type: "text",
                        text: "DISCREET BUTLER & CELLAR SERVICE",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                          textPaint: { kind: "custom", value: "#64748B" },
                        },
                      },
                      {
                        id: "feat03-spec-v4",
                        type: "text",
                        text: "24/7 Dedicated Butler & Sommelier · 120-Bottle Private Cru Cellar · Direct Helipad Lift",
                        style: {
                          typography: { family: "monospace", size: "sm" },
                          textPaint: { kind: "custom", value: "#FCD34D" },
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
 * FEATURE-04: High-Stakes Law · Practice Area Bento Matrix
 * Industry: Lawyers & Legal Practices
 * Layout: Inverted diagonal [8-4 / 4-8] bento matrix with practice areas, recovery stat, and emergency disclosure
 * Visual Family: Corporate Counsel / White-Collar Defense
 */
export const FEATURE_LEGAL_PRACTICE_BENTO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-04-legal-practice-bento",
  name: "High-Stakes Law · Practice Area Bento Matrix",
  kind: "section",
  root: {
    id: "feat04-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat04-container",
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
          /* Header */
          {
            id: "feat04-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "3xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "feat04-badge",
                type: "badge",
                text: "PRACTICE MATRIX",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat04-title",
                type: "heading",
                level: 2,
                text: "Multi-disciplinary counsel for high-stakes matters",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                },
              },
            ],
          },

          /* Bento Grid */
          {
            id: "feat04-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Cell 1: Dominant 8-col Tile with Transaction Pipeline */
              {
                id: "feat04-cell-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 8 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat04-c1-tag",
                    type: "badge",
                    text: "CORPORATE TRANSACTIONS",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "full" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "md", paddingY: "xs", marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat04-c1-heading",
                    type: "heading",
                    level: 3,
                    text: "Mergers, Acquisitions & Cross-Border Joint Ventures",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat04-c1-desc",
                    type: "text",
                    text: "Structuring multi-jurisdiction asset purchases, leveraged buyouts, and sovereign fund partnerships with complete regulatory clearance.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  /* Visual Transaction Protocol Bar */
                  {
                    id: "feat04-c1-flow",
                    type: "card",
                    element: "div",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "lg", width: "thin", color: "border" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat04-c1-flow-text",
                        type: "text",
                        text: "⚡ Term Sheet Negotiation → Regulatory Review (CFIUS / FTC) → Escrow Closing",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "semibold" },
                          color: { text: "primary" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Cell 2: Tall 4-col Stat Tile */
              {
                id: "feat04-cell-2",
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
                    id: "feat04-c2-stat",
                    type: "stat",
                    prefix: "$",
                    value: "1.8",
                    suffix: "B+",
                    label: "Deal Volume Advised in 2025",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat04-c2-desc",
                    type: "text",
                    text: "Ranked Band 1 by Chambers USA and Legal 500 across corporate and commercial dispute resolution.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Cell 3: Compact 4-col Tile */
              {
                id: "feat04-cell-3",
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
                    id: "feat04-c3-badge",
                    type: "badge",
                    text: "REGULATORY DEFENSE",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "sm" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "sm", paddingY: "xs", marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat04-c3-heading",
                    type: "heading",
                    level: 3,
                    text: "White-Collar & SEC Inquiries",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat04-c3-desc",
                    type: "text",
                    text: "Defending boards and audit committees against DOJ, SEC, and international regulatory inquiries with absolute discretion.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Cell 4: Wide 8-col Tile with Interactive Disclosure */
              {
                id: "feat04-cell-4",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 8 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat04-c4-heading",
                    type: "heading",
                    level: 3,
                    text: "Emergency Injunction & Restraining Order Protocol",
                    style: {
                      typography: { size: "xl", weight: "bold" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat04-c4-desc",
                    type: "text",
                    text: "Immediate 24/7 mobilization for trade secret exfiltration, emergency asset freeze orders, and preliminary court injunctions.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                      spacing: { marginBottom: "md" },
                    },
                  },
                  {
                    id: "feat04-c4-disclosure",
                    type: "disclosure",
                    defaultOpen: false,
                    transition: "height-fade",
                    children: [
                      {
                        id: "feat04-disc-trigger-slot",
                        type: "slot",
                        name: "trigger",
                        children: [
                          {
                            id: "feat04-disc-trigger-text",
                            type: "text",
                            text: "► View emergency rapid response timetable",
                            style: {
                              typography: { size: "sm", weight: "semibold" },
                              color: { text: "primary" },
                            },
                          },
                        ],
                      },
                      {
                        id: "feat04-disc-content-slot",
                        type: "slot",
                        name: "content",
                        children: [
                          {
                            id: "feat04-disc-body",
                            type: "text",
                            text: "Our crisis trial team prepares verified complaints, temporary restraining order (TRO) declarations, and emergency bond motions within four hours of client engagement.",
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
 * FEATURE-05: Trial Advocacy · Landmark Verdicts & Track Record
 * Industry: Lawyers & Legal Practices
 * Layout: 4 giant monospaced metric blocks with benchmark context and report download action
 * Visual Family: High-Impact Legal Track Record
 */
export const FEATURE_LEGAL_VERDICTS_METRICS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-05-legal-verdicts-metrics",
  name: "Trial Advocacy · Landmark Verdicts & Track Record",
  kind: "section",
  root: {
    id: "feat05-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat05-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header and unified action row */
          {
            id: "feat05-header-row",
            type: "stack",
            direction: "row",
            alignment: "end",
            distribution: "between",
            wrap: true,
            gap: "lg",
            style: {
              sizing: { width: "full" },
              spacing: { paddingBottom: "lg" },
              border: { width: "thin", color: "border" },
            },
            children: [
              {
                id: "feat05-head-left",
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
                    id: "feat05-kicker",
                    type: "text",
                    text: "MEASURED COURTROOM RECORD",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "feat05-title",
                    type: "heading",
                    level: 2,
                    text: "Decades of trial advocacy. Decisive client outcomes.",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                    },
                  },
                ],
              },
              {
                id: "feat05-head-cta",
                type: "button",
                label: "Download Litigation Track Record",
                iconId: "arrow-right",
                iconPosition: "end",
                href: "/reports/trial-verdicts",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { size: "sm", weight: "semibold" },
                  spacing: { paddingX: "lg", paddingY: "sm" },
                },
              },
            ],
          },

          /* 4 Equal Stat Columns */
          {
            id: "feat05-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Metric 1 */
              {
                id: "feat05-stat-1",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat05-s1-node",
                    type: "stat",
                    prefix: "$",
                    value: "2.4",
                    suffix: "B+",
                    label: "Cumulative Verdicts & Recoveries",
                    style: {
                      typography: { size: "4xl", weight: "bold", family: "monospace" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat05-s1-desc",
                    type: "text",
                    text: "Secured for corporate plaintiffs and commercial partners across federal and state courts.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Metric 2 */
              {
                id: "feat05-stat-2",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat05-s2-node",
                    type: "stat",
                    value: "98.4",
                    suffix: "%",
                    label: "Defense Summary Dismissals",
                    style: {
                      typography: { size: "4xl", weight: "bold", family: "monospace" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat05-s2-desc",
                    type: "text",
                    text: "In multi-district class actions and complex commercial claims prior to trial jury empanelment.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Metric 3 */
              {
                id: "feat05-stat-3",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat05-s3-node",
                    type: "stat",
                    value: "42",
                    suffix: " yrs",
                    label: "Chambers Practice History",
                    style: {
                      typography: { size: "4xl", weight: "bold", family: "monospace" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat05-s3-desc",
                    type: "text",
                    text: "Trusted by Fortune 500 boards, institutional lenders, and founding family offices.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },

              /* Metric 4 */
              {
                id: "feat05-stat-4",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat05-s4-node",
                    type: "stat",
                    prefix: "$",
                    value: "0.00",
                    label: "Toxic Tort Client Liability",
                    style: {
                      typography: { size: "4xl", weight: "bold", family: "monospace" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat05-s4-desc",
                    type: "text",
                    text: "Complete defense verdicts returned across 28 multi-district jury trials.",
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

export const CURATED_FEATURE_BATCH_1: ComponentDocument[] = [
  FEATURE_HOTEL_AMENITIES_TRIO_DOCUMENT,
  FEATURE_LEGAL_COUNSEL_EDITORIAL_SPLIT_DOCUMENT,
  FEATURE_HOTEL_SUITE_SPEC_SPLIT_DOCUMENT,
  FEATURE_LEGAL_PRACTICE_BENTO_DOCUMENT,
  FEATURE_LEGAL_VERDICTS_METRICS_DOCUMENT,
];
