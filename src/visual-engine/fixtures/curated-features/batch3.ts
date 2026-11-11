import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 3 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-11: Global Chancery · Cross-Border Jurisdictions & Bar Network
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 6-cell jurisdiction network matrix with bar admission credentials
 * Visual Family: International Corporate Chancery
 */
export const FEATURE_LEGAL_CROSS_BORDER_NETWORK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-11-legal-cross-border-network",
  name: "Global Chancery · Cross-Border Jurisdictions & Bar Network",
  kind: "section",
  root: {
    id: "feat11-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat11-container",
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
            id: "feat11-header",
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
                id: "feat11-badge",
                type: "badge",
                text: "CROSS-BORDER ADVOCACY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat11-title",
                type: "heading",
                level: 2,
                text: "Dual-qualified counsel across key financial jurisdictions",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat11-subtitle",
                type: "text",
                text: "Seamless multi-jurisdictional trial litigation and sovereign regulatory coordination across the world's leading arbitral and commercial centers.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 6-Cell Matrix (3 cols x 2 rows) */
          {
            id: "feat11-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Cell 1: London */
              {
                id: "feat11-c1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat11-c1-city",
                    type: "text",
                    text: "LONDON · ROLLS BUILDING",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat11-c1-title",
                    type: "heading",
                    level: 3,
                    text: "English Commercial Court & LCIA",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat11-c1-desc",
                    type: "text",
                    text: "Barristers and solicitors advocating before the High Court of Justice, commercial fraud injunctions, and maritime charter disputes.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Cell 2: New York & Delaware */
              {
                id: "feat11-c2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat11-c2-city",
                    type: "text",
                    text: "NEW YORK & DELAWARE",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat11-c2-title",
                    type: "heading",
                    level: 3,
                    text: "SDNY & Court of Chancery",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat11-c2-desc",
                    type: "text",
                    text: "Specialized corporate governance trial counsel, hostile takeover defense, securities fraud, and federal antitrust enforcement.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Cell 3: Zurich & Geneva */
              {
                id: "feat11-c3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat11-c3-city",
                    type: "text",
                    text: "ZURICH & GENEVA",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat11-c3-title",
                    type: "heading",
                    level: 3,
                    text: "Swiss Arbitral Chambers (SCAI)",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat11-c3-desc",
                    type: "text",
                    text: "Confidential international asset tracing, sovereign wealth fund representation, and bilateral investment treaty (BIT) arbitrations.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Cell 4: Singapore */
              {
                id: "feat11-c4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat11-c4-city",
                    type: "text",
                    text: "SINGAPORE · MAXWELL CHAMBERS",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat11-c4-title",
                    type: "heading",
                    level: 3,
                    text: "SIAC Commercial Arbitration",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat11-c4-desc",
                    type: "text",
                    text: "Pan-Asian infrastructure disputes, cross-border joint venture dissolutions, and intellectual property licensing trials.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Cell 5: Dubai */
              {
                id: "feat11-c5",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat11-c5-city",
                    type: "text",
                    text: "DUBAI · DIFC COURTS",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat11-c5-title",
                    type: "heading",
                    level: 3,
                    text: "DIFC & DIAC Court of First Instance",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat11-c5-desc",
                    type: "text",
                    text: "Common law advocacy in the Middle East, Islamic finance dispute resolution, and cross-border commercial enforcement.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Cell 6: Tokyo */
              {
                id: "feat11-c6",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat11-c6-city",
                    type: "text",
                    text: "TOKYO · MARUNOUCHI",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                      spacing: { marginBottom: "xs" },
                    },
                  },
                  {
                    id: "feat11-c6-title",
                    type: "heading",
                    level: 3,
                    text: "JCAA & IP High Court of Japan",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat11-c6-desc",
                    type: "text",
                    text: "Bespoke semiconductor patent litigation, foreign investment national security reviews, and multinational trade compliance.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
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
 * FEATURE-12: Estate Grounds · Michelin Gastronomy & Terroir Showcase
 * Industry: Hotels & Luxury Hospitality
 * Layout: Asymmetric 3-part terroir culinary collage with tasting notes
 * Visual Family: Warm Wine Country Luxury
 */
export const FEATURE_HOTEL_DINING_GALLERY_COLLAGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-12-hotel-dining-gallery-collage",
  name: "Estate Grounds · Michelin Gastronomy & Terroir Showcase",
  kind: "section",
  root: {
    id: "feat12-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat12-container",
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
            id: "feat12-header",
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
                id: "feat12-badge",
                type: "badge",
                text: "ESTATE GASTRONOMY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat12-title",
                type: "heading",
                level: 2,
                text: "Culinary heritage rooted in private estate terroir",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat12-subtitle",
                type: "text",
                text: "From our 3-Michelin-starred dining room to subterranean limestone cellars, every course honors our historic soil.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Asymmetric Collage Grid (7 cols / 5 cols top, 12 cols bottom) */
          {
            id: "feat12-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Card 1: 3-Star Flagship (7 cols) */
              {
                id: "feat12-card-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat12-c1-badge",
                    type: "badge",
                    text: "THREE MICHELIN STARS · 2026",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat12-c1-title",
                    type: "heading",
                    level: 3,
                    text: "Le Sommet Restaurant & Panoramic Terrace",
                    style: { typography: { size: "2xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "sm" } },
                  },
                  {
                    id: "feat12-c1-desc",
                    type: "text",
                    text: "Executive Chef Marcella Vane orchestrates nine-course blind tastings harmonizing alpine forage, rare caviar, and heritage estate cattle. Sunset seatings overlook thirty miles of private pine valley.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                  },
                  {
                    id: "feat12-c1-btn",
                    type: "button",
                    label: "Reserve Chef's Tasting Table",
                    iconId: "star",
                    iconPosition: "start",
                    href: "/dining/le-sommet",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                    },
                  },
                ],
              },

              /* Card 2: Subterranean Vault Cellar (5 cols) */
              {
                id: "feat12-card-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                style: {
                  background: [
                    { kind: "solid", color: { kind: "custom", value: "#1C1917" } },
                  ],
                  border: { radius: "xl", width: "thin", color: "border", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat12-c2-badge",
                    type: "badge",
                    text: "14,000 BOTTLE VAULT",
                    style: {
                      color: { background: "surface", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat12-c2-title",
                    type: "heading",
                    level: 3,
                    text: "The Roman Limestone Cellar",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      textPaint: { kind: "custom", value: "#F5F5F4" },
                      spacing: { marginTop: "md", marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat12-c2-desc",
                    type: "text",
                    text: "Carved directly into valley bedrock in 1892, housing single-vintage verticals of Romanée-Conti, Château Latour, and rare Jura vin jaune overseen by our Head Sommelier.",
                    style: {
                      typography: { size: "sm", leading: "relaxed" },
                      textPaint: { kind: "custom", value: "#A8A29E" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  {
                    id: "feat12-c2-link",
                    type: "link",
                    label: "Inquire Private Cellar Tour →",
                    href: "/dining/wine-vault",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      textPaint: { kind: "custom", value: "#FBBF24" },
                    },
                  },
                ],
              },

              /* Card 3: Biodynamic Kitchen Gardens (12 cols full width) */
              {
                id: "feat12-card-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 12 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat12-c3-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
                    children: [
                      {
                        id: "feat12-c3-left",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                        children: [
                          {
                            id: "feat12-c3-kicker",
                            type: "text",
                            text: "ZERO-KILOMETER HARVEST",
                            style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "feat12-c3-title",
                            type: "heading",
                            level: 3,
                            text: "Walled Organic Micro-Farms & Greenhouse Apiary",
                            style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "xs" } },
                          },
                          {
                            id: "feat12-c3-desc",
                            type: "text",
                            text: "Eighty percent of all dinner ingredients originate within 400 meters of the kitchen hearth. Over 140 heirloom vegetable cultivars, wild mountain thyme, and raw honey cultivated directly on estate grounds.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "feat12-c3-right",
                        type: "stack",
                        direction: "column",
                        alignment: "stretch",
                        distribution: "center",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                        children: [
                          {
                            id: "feat12-c3-stat",
                            type: "stat",
                            value: "100%",
                            label: "Biodynamic estate certification across all 450 cultivated acres",
                            style: { typography: { size: "2xl", weight: "bold" }, color: { text: "primary" } },
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
 * FEATURE-13: Commercial Arbitration · 4-Phase Dispute Resolution Pipeline
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: Horizontal 4-step sequence with procedural timelines and remedies
 * Visual Family: International Dispute Resolution
 */
export const FEATURE_LEGAL_CASE_STUDY_STEPS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-13-legal-case-study-steps",
  name: "Commercial Arbitration · 4-Phase Dispute Resolution Pipeline",
  kind: "section",
  root: {
    id: "feat13-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat13-container",
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
            id: "feat13-header",
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
                id: "feat13-badge",
                type: "badge",
                text: "ARBITRAL METHODOLOGY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat13-title",
                type: "heading",
                level: 2,
                text: "The institutional roadmap from dispute to global enforcement",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat13-subtitle",
                type: "text",
                text: "A disciplined 4-phase trial lifecycle engineered for multi-billion dollar joint venture dissolutions and sovereign arbitrations.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Column Pipeline Grid */
          {
            id: "feat13-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Step 1 */
              {
                id: "feat13-step-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat13-s1-num",
                    type: "text",
                    text: "PHASE 01",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat13-s1-title",
                    type: "heading",
                    level: 3,
                    text: "Emergency Injunction & Asset Freeze",
                    style: { typography: { size: "lg", weight: "bold" }, spacing: { marginBottom: "xs" } },
                  },
                  {
                    id: "feat13-s1-desc",
                    type: "text",
                    text: "Immediate worldwide Mareva injunction filings to prevent opposing party asset dissipation across foreign tax havens.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Step 2 */
              {
                id: "feat13-step-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat13-s2-num",
                    type: "text",
                    text: "PHASE 02",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat13-s2-title",
                    type: "heading",
                    level: 3,
                    text: "Forensic Discovery & Witness Statements",
                    style: { typography: { size: "lg", weight: "bold" }, spacing: { marginBottom: "xs" } },
                  },
                  {
                    id: "feat13-s2-desc",
                    type: "text",
                    text: "Targeted document production under IBA Rules of Evidence, financial damages modeling, and key officer depositions.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Step 3 */
              {
                id: "feat13-step-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat13-s3-num",
                    type: "text",
                    text: "PHASE 03",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat13-s3-title",
                    type: "heading",
                    level: 3,
                    text: "Merits Hearing Before Tribunal",
                    style: { typography: { size: "lg", weight: "bold" }, spacing: { marginBottom: "xs" } },
                  },
                  {
                    id: "feat13-s3-desc",
                    type: "text",
                    text: "Multi-week oral evidentiary advocacy before senior arbitrators, hostile cross-examinations, and post-hearing legal briefs.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Step 4 */
              {
                id: "feat13-step-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat13-s4-num",
                    type: "text",
                    text: "PHASE 04",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat13-s4-title",
                    type: "heading",
                    level: 3,
                    text: "New York Convention Enforcement",
                    style: { typography: { size: "lg", weight: "bold" }, spacing: { marginBottom: "xs" } },
                  },
                  {
                    id: "feat13-s4-desc",
                    type: "text",
                    text: "Direct execution of final arbitral awards across 170+ signatory nations, attaching commercial vessels, aircraft, and escrow funds.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
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
 * FEATURE-14: Private Island Villa · Pre-Arrival VIP Concierge Checklist
 * Industry: Hotels & Luxury Hospitality
 * Layout: 2-column verified checklist with head butler service SLA
 * Visual Family: Island Sanctuary Luxury
 */
export const FEATURE_HOTEL_CONCIERGE_CHECKLIST_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-14-hotel-concierge-checklist",
  name: "Private Island Villa · Pre-Arrival VIP Concierge Checklist",
  kind: "section",
  root: {
    id: "feat14-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat14-container",
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
            id: "feat14-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "2xl" },
            },
            children: [
              /* Left Column: Pre-Arrival Preferences Checklist (7 cols) */
              {
                id: "feat14-left-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                children: [
                  {
                    id: "feat14-badge",
                    type: "badge",
                    text: "BESPOKE PRE-ARRIVAL PROTOCOL",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "full" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "md", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat14-title",
                    type: "heading",
                    level: 2,
                    text: "Every nuance anticipated prior to your island touchdown",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat14-desc",
                    type: "text",
                    text: "Two weeks before check-in, our Head Butler contacts your personal office to curate villa climate, private cellar selections, and marine excursion schedules.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "feat14-checklist",
                    type: "list",
                    marker: "check",
                    items: [
                      "Direct airport tarmac seaplane transfer without terminal queues",
                      "Pre-stocked private bar with specified Grand Cru and single-malt labels",
                      "Personalized pillow menu (hypoallergenic down, mulberry silk, cedarwood)",
                      "Bespoke dietary degustations planned with Executive Nutritionist",
                      "Exclusive 60ft Riva motor yacht reserved at your villa's private dock",
                      "Complimentary unpacking and garment pressing upon arrival",
                    ],
                    style: {
                      typography: { size: "sm", weight: "medium" },
                      color: { text: "text" },
                      spacing: { marginBottom: "sm" },
                    },
                  },
                  {
                    id: "feat14-btn",
                    type: "button",
                    label: "Submit VIP Pre-Arrival Dossier",
                    iconId: "check-badge",
                    iconPosition: "end",
                    href: "/concierge/pre-arrival",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "xl", paddingY: "md" },
                    },
                  },
                ],
              },

              /* Right Column: Butler Monograph & SLA Card (5 cols) */
              {
                id: "feat14-right-col",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "center",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  {
                    id: "feat14-butler-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "lg" },
                      spacing: { padding: "xl" },
                    },
                    children: [
                      {
                        id: "feat14-b-badge",
                        type: "badge",
                        text: "RESIDENTIAL BUTLER CORPS",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "sm" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat14-b-title",
                        type: "heading",
                        level: 3,
                        text: "Discreet 24-Hour Residential Butler",
                        style: { typography: { size: "xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "sm" } },
                      },
                      {
                        id: "feat14-b-desc",
                        type: "text",
                        text: "Graduates of the International Butler Academy stationed in private quarters adjacent to your residence, providing seamless service without intruding on family privacy.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                      },
                      {
                        id: "feat14-stat-box",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "xl" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "feat14-stat",
                            type: "stat",
                            value: "3 min",
                            label: "Guaranteed discreet response to private in-villa paging",
                            style: { typography: { size: "2xl", weight: "bold" }, color: { text: "primary" } },
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
 * FEATURE-15: Appellate Litigation · Supreme Court Advocacy & Judicial Precedent
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: Prominent editorial judicial endorsement quote + 3 appellate proof stats below
 * Visual Family: Supreme Court Bar / Precedent Litigation
 */
export const FEATURE_LEGAL_COUNSEL_QUOTE_PROOF_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-15-legal-counsel-quote-proof",
  name: "Appellate Litigation · Supreme Court Advocacy & Judicial Precedent",
  kind: "section",
  root: {
    id: "feat15-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat15-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          /* Dominant Editorial Quote Card */
          {
            id: "feat15-quote-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface", text: "text" },
              border: { radius: "xl", width: "thin", color: "border", shadow: "lg" },
              spacing: { padding: "2xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "feat15-quote-badge",
                type: "badge",
                text: "APPELLATE BENCHMARK",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat15-quote-body",
                type: "quote",
                quote: "In thirty-two years on the federal appellate bench, I have rarely encountered briefs composed with such lethal analytical clarity. They do not merely argue the law — they establish the durable intellectual framework adopted by the court.",
                author: "Hon. Sterling Montgomery",
                role: "Retired Senior Circuit Judge, United States Court of Appeals for the Second Circuit",
                style: {
                  typography: { size: "xl", leading: "relaxed" },
                  spacing: { marginTop: "lg", marginBottom: "lg" },
                },
              },
              {
                id: "feat15-quote-btn",
                type: "button",
                label: "Review Selected Appellate Briefs",
                iconId: "book-open",
                iconPosition: "start",
                href: "/appellate/precedents",
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "md", width: "thin", color: "border" },
                  typography: { weight: "semibold" },
                  spacing: { paddingX: "lg", paddingY: "md" },
                },
              },
            ],
          },

          /* 3 Appellate Proof Stats Below */
          {
            id: "feat15-stats-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Stat 1 */
              {
                id: "feat15-stat-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat15-s1",
                    type: "stat",
                    value: "94.2%",
                    label: "Precedent affirmance rate across federal and state courts of appeal",
                    style: { typography: { size: "4xl", weight: "bold" }, color: { text: "primary" } },
                  },
                ],
              },

              /* Stat 2 */
              {
                id: "feat15-stat-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat15-s2",
                    type: "stat",
                    value: "18",
                    label: "Direct oral arguments delivered before the United States Supreme Court",
                    style: { typography: { size: "4xl", weight: "bold" }, color: { text: "primary" } },
                  },
                ],
              },

              /* Stat 3 */
              {
                id: "feat15-stat-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat15-s3",
                    type: "stat",
                    value: "0",
                    label: "Patent injunction reversals before the Federal Circuit en banc (2020–2026)",
                    style: { typography: { size: "4xl", weight: "bold" }, color: { text: "primary" } },
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

export const CURATED_FEATURE_BATCH_3: readonly ComponentDocument[] = [
  FEATURE_LEGAL_CROSS_BORDER_NETWORK_DOCUMENT,
  FEATURE_HOTEL_DINING_GALLERY_COLLAGE_DOCUMENT,
  FEATURE_LEGAL_CASE_STUDY_STEPS_DOCUMENT,
  FEATURE_HOTEL_CONCIERGE_CHECKLIST_DOCUMENT,
  FEATURE_LEGAL_COUNSEL_QUOTE_PROOF_DOCUMENT,
];
