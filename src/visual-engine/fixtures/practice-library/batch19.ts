import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 19: Beach Club Concessions & Noise (#91–#95)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 91: Asymmetric 70/30 Coastal Zoning Injunction Blueprint (8/4: Kıyı Kenar Pier)
 * 92: Acoustic Decibel Tiered Schedule Table (Hairline Matrix: Music Curfew)
 * 93: Editorial Luxury Hospitality Monograph with Inset Pull-Quote (VIP Cabana Charter)
 * 94: Dual Comparative Split Screen (6/6: Parasailing Accident vs Tort Defense)
 * 95: 4-Quadrant Executive Luxury Fleet Liability Matrix (2x2: Supercar Valet)
 * ============================================================================
 */

/**
 * PRACTICE-91: Beachfront Law · Overwater Sun Deck Demolition Injunction Defense
 * Layout Archetype: Asymmetric 70/30 Coastal Zoning Injunction Blueprint (8/4)
 */
export const PRACTICE_91_BEACH_CLUB_DEMOLITION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-91-beach-club-deck-demolition-defense",
  name: "Beachfront Law · Overwater Sun Deck Demolition Injunction Defense",
  kind: "section",
  root: {
    id: "prac91-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac91-container",
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
          /* Header */
          {
            id: "prac91-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac91-badge",
                type: "badge",
                text: "COASTAL LAW NO. 3621 · KIYI KENAR ÇİZGİSİ · PIER DEMOLITION DEFENSE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac91-heading",
                type: "heading",
                level: 2,
                text: "Beach Club Pier, Wooden Deck & Cabana Injunction Shield",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac91-sub",
                type: "text",
                text: "Securing emergency stay-of-execution injunctions (yürütmeyi durdurma) against municipal demolition notices for luxury resort overwater sun decks in Bodrum and Çeşme.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Grid */
          {
            id: "prac91-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): Administrative Law Defense Dossier */
              {
                id: "prac91-main-dossier",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac91-md-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac91-md-b",
                        type: "badge",
                        text: "ADMINISTRATIVE COURT REMEDY · IYUK ART. 27",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac91-md-t",
                        type: "heading",
                        level: 3,
                        text: "Same-Day Emergency Stay of Execution Protocol",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac91-md-d",
                        type: "text",
                        text: "Municipalities often issue summary demolition orders under Zoning Law No. 3194 Art. 32 targeting coastal wooden sun decks. We prove the structures are demountable seasonal piers (ahşap iskele) permitted under Ministry of Environment circulars.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac91-step-1",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac91-s1-t",
                            type: "heading",
                            level: 4,
                            text: "1. Demountable Structural Audit (Sökülüp Takılabilir Nitelik)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac91-s1-p",
                            type: "text",
                            text: "Architectural certification confirming zero reinforced concrete footings in the marine bed, qualifying the deck under temporary tourism beach concession guidelines.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac91-step-2",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac91-s2-t",
                            type: "heading",
                            level: 4,
                            text: "2. Ecrimisil Occupation Title Defense",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac91-s2-p",
                            type: "text",
                            text: "Documenting timely National Real Estate Directorate (Milli Emlak) ecrimisil payments establishing de facto recognized seasonal occupancy.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): Emergency Injunction Desk */
              {
                id: "prac91-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac91-side-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac91-sc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac91-sc-b",
                            type: "badge",
                            text: "URGENT LITIGATION ACTION",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac91-sc-t",
                            type: "heading",
                            level: 4,
                            text: "Demolition Stay Docket",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac91-sc-item1",
                            type: "text",
                            text: "✓ 24-Hour Administrative Court Injunction",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac91-sc-item2",
                            type: "text",
                            text: "✓ Police & Zabıta Enforcement Freeze",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac91-sc-item3",
                            type: "text",
                            text: "✓ Season-Long Operating Continuity",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac91-sc-divider",
                            type: "divider",
                            style: { sizing: { width: "full" } },
                          },
                          {
                            id: "prac91-btn-injunction",
                            type: "button",
                            label: "File Emergency Injunction Petition",
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
 * PRACTICE-92: Hospitality Noise · Live DJ Curfew & Acoustic Decibel Permit Matrix
 * Layout Archetype: Acoustic Decibel Tiered Schedule Table (Hairline Matrix)
 */
export const PRACTICE_92_MUSIC_CURFEW_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-92-after-hours-music-curfew-defense",
  name: "Hospitality Noise · Live DJ Curfew & Acoustic Decibel Permit Matrix",
  kind: "section",
  root: {
    id: "prac92-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac92-container",
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
          /* Header */
          {
            id: "prac92-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac92-badge",
                type: "badge",
                text: "ENVIRONMENTAL NOISE REGULATION · LIVE MUSIC PERMIT (CANLI MÜZİK İZNİ)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac92-heading",
                type: "heading",
                level: 2,
                text: "Beach Club Music Curfew & Electronic Decibel Limiter Matrix",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac92-sub",
                type: "text",
                text: "Compliance and administrative defense against Ministry of Environment sound inspections, closure notices, and curfew enforcement along coastal nightlife corridors.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Acoustic Decibel Matrix Table */
          {
            id: "prac92-matrix-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac92-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Header Row */
                  {
                    id: "prac92-th-row",
                    type: "grid",
                    columns: 12,
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "surface-muted" },
                      border: { radius: "sm" },
                    },
                    children: [
                      {
                        id: "prac92-th-1",
                        type: "text",
                        text: "OPERATIONAL ZONE",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-th-2",
                        type: "text",
                        text: "DAYTIME LIMIT (10:00–19:00)",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-th-3",
                        type: "text",
                        text: "NIGHT CURFEW (19:00–01:00)",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-th-4",
                        type: "text",
                        text: "STATUTORY COMPLIANCE MANDATE",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },

                  /* Row 1: Open-Air Beachfront */
                  {
                    id: "prac92-row-1",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac92-r1-c1",
                        type: "text",
                        text: "Open-Air Beach Club & Sun Pier",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-r1-c2",
                        type: "text",
                        text: "Max 70 dBA / Leq continuous sound",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-r1-c3",
                        type: "text",
                        text: "Music cutoff at 01:00 AM sharp",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-r1-c4",
                        type: "text",
                        text: "Sealed decibel logger recording to Ministry online server.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "prac92-div-1",
                    type: "divider",
                    style: { sizing: { width: "full" } },
                  },

                  /* Row 2: Enclosed Nightclub */
                  {
                    id: "prac92-row-2",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac92-r2-c1",
                        type: "text",
                        text: "Enclosed Soundproof Club Room",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-r2-c2",
                        type: "text",
                        text: "Internal max 95 dBA / Leq sound",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-r2-c3",
                        type: "text",
                        text: "Permitted until 04:00 AM if insulated",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac92-r2-c4",
                        type: "text",
                        text: "Certified acoustic report demonstrating zero boundary bleed.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac92-footer-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac92-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac92-fc-text",
                    type: "text",
                    text: "Chambers audits acoustic limiter calibration and challenges administrative fines within 15 days.",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "prac92-btn-limiter",
                    type: "button",
                    label: "Commission Acoustic Limiter Audit",
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
 * PRACTICE-93: Luxury Hospitality · VIP Cabana Minimum Spend & Consumer Charter
 * Layout Archetype: Editorial Luxury Hospitality Monograph with Inset Pull-Quote
 */
export const PRACTICE_93_VIP_CABANA_CHARTER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-93-vip-cabana-minimum-spend-consumer-charter",
  name: "Luxury Hospitality · VIP Cabana Minimum Spend & Consumer Charter",
  kind: "section",
  root: {
    id: "prac93-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac93-container",
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
          /* Centered Monograph Column */
          {
            id: "prac93-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { typography: { align: "center" }, sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac93-badge",
                type: "badge",
                text: "CONSUMER LAW NO. 6502 · TOURISM CONTRACTS · HARCAMA LİMİTİ PROTOCOL",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac93-heading",
                type: "heading",
                level: 2,
                text: "VIP Cabana Minimum Spend & Reservation Deposit Governance",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac93-sub",
                type: "text",
                text: "Drafting ironclad hospitality reservation contracts, minimum spend thresholds (€3,000–€15,000/day), and no-show deposit forfeiture terms conforming to Turkish Consumer Law.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          {
            id: "prac93-divider-top",
            type: "divider",
            style: { sizing: { width: "full" } },
          },

          /* Solemn Editorial Monograph Body */
          {
            id: "prac93-monograph-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac93-mono-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  {
                    id: "prac93-prose-1",
                    type: "text",
                    text: "Under the Law on the Protection of Consumers (Law No. 6502 Art. 5), contract clauses that impose disproportionate burdens on guests without clear pre-contractual information (Ön Bilgilendirme Formu) can be deemed unfair contract terms (haksız şart) and declared void by Turkish Consumer Arbitration Committees (Tüketici Hakem Heyeti). For premier beach clubs in Bodrum, Yalıkavak, and Çeşme, enforcing substantial daily cabana minimum spends requires rigorous statutory compliance.",
                    style: { typography: { size: "base" }, color: { text: "text" } },
                  },

                  /* Inset Pull-Quote Box */
                  {
                    id: "prac93-pullquote-box",
                    type: "card",
                    element: "div",
                    style: {
                      color: { background: "surface-muted" },
                      border: { width: "hairline", radius: "sm", color: "border" },
                      spacing: { padding: "xl" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac93-pq-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac93-pq-text",
                            type: "text",
                            text: "“A luxury cabana reservation constitutes a bespoke hospitality license. Clear written disclosure of non-refundable cancellation terms and service minimums eliminates chargeback exposure and ensures complete enforceability under Turkish civil jurisprudence.”",
                            style: {
                              typography: { size: "lg", weight: "medium" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "prac93-pq-author",
                            type: "text",
                            text: "— Senior Hospitality Counsel · Aegean Bar Association",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  {
                    id: "prac93-prose-2",
                    type: "text",
                    text: "Our hospitality chancellery structures: (1) Explicit bilingual reservation confirmation emails incorporating liquidated damages for failure to attend; (2) Credit card pre-authorization protocols compliant with Central Bank rules; (3) Transparent price schedules preventing allegations of arbitrary pricing under Ministry of Trade pricing circulars.",
                    style: { typography: { size: "base" }, color: { text: "text" } },
                  },

                  {
                    id: "prac93-actions",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "center",
                    wrap: true,
                    gap: "md",
                    style: { sizing: { width: "full" } },
                    children: [
                      {
                        id: "prac93-btn-charter",
                        type: "button",
                        label: "Draft Bespoke Cabana Booking Terms",
                      },
                      {
                        id: "prac93-btn-chargeback",
                        type: "button",
                        label: "Retain Chargeback Defense Desk",
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
 * PRACTICE-94: Watersports Law · Parasailing & Jet-Ski Accident Tort Liability
 * Layout Archetype: Dual Comparative Split Screen (6/6)
 */
export const PRACTICE_94_WATERSPORTS_ACCIDENT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-94-watersports-parasailing-accident-indemnity",
  name: "Watersports Law · Parasailing & Jet-Ski Accident Tort Liability",
  kind: "section",
  root: {
    id: "prac94-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac94-container",
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
          /* Header */
          {
            id: "prac94-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac94-badge",
                type: "badge",
                text: "TURKISH CODE OF OBLIGATIONS ART. 49–54 · WATERSPORTS ACCIDENT INDEMNITY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac94-heading",
                type: "heading",
                level: 2,
                text: "Parasailing, Jet-Ski & High-Speed Tow Tort Defense",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac94-sub",
                type: "text",
                text: "Defending luxury beach resort concessionaires and foreign guests in high-stakes maritime personal injury claims, tow line failure disputes, and insurance subrogation.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac94-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Operator Liability & Safety Protocols */
              {
                id: "prac94-left-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac94-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac94-left-b",
                        type: "badge",
                        text: "TRACK A · STATUTORY SAFETY DIRECTIVE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac94-left-t",
                        type: "heading",
                        level: 3,
                        text: "Ministry Watersports Safety Audit",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac94-left-d",
                        type: "text",
                        text: "Under the Maritime Tourism Watersports Directive, operators must hold certified skipper licenses, maintain mandatory third-party liability insurance, and enforce wind-speed limits (Beaufort scale 4+).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac94-left-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac94-lp-1",
                        type: "text",
                        text: "• Equipment Maintenance Logs: Routine winching cable and parasail harness stress inspection certificates.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac94-lp-2",
                        type: "text",
                        text: "• Assumption of Risk Disclaimers: Validating bilingual liability waivers under TBK Art. 115.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac94-left-btn",
                        type: "button",
                        label: "Audit Watersports Compliance",
                      },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Foreign Guest Medical & Legal Escrow */
              {
                id: "prac94-right-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac94-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac94-right-b",
                        type: "badge",
                        text: "TRACK B · TORT LITIGATION & SETTLEMENT",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac94-right-t",
                        type: "heading",
                        level: 3,
                        text: "Settlement Escrow & Insurance Claims",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac94-right-d",
                        type: "text",
                        text: "In the event of physical trauma, chambers coordinates immediate private hospital admission, P&I / commercial insurer notice, and negotiated settlement minutes (Sulh Protokolü) precluding court claims.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac94-right-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac94-rp-1",
                        type: "text",
                        text: "• Delil Tespiti Defense: Managing court expert inspections within 48 hours of any coastal incident.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac94-rp-2",
                        type: "text",
                        text: "• Criminal Defense: Representing boat captains before Coast Guard and Sulh Ceza Hakimliği hearings.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac94-right-btn",
                        type: "button",
                        label: "Retain Accident Defense Desk",
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
 * PRACTICE-95: Luxury Transport · Supercar Valet Parking Bailment & Liability Matrix
 * Layout Archetype: 4-Quadrant Executive Luxury Fleet Liability Matrix (2x2)
 */
export const PRACTICE_95_SUPERCAR_VALET_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-95-valet-parking-supercar-liability-desk",
  name: "Luxury Transport · Supercar Valet Parking Bailment & Liability Matrix",
  kind: "section",
  root: {
    id: "prac95-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac95-container",
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
          /* Header */
          {
            id: "prac95-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac95-badge",
                type: "badge",
                text: "TBK ART. 561 BAILMENT (VEDİA) · HIGH-VALUE FLEET OPERATIONS · VALET LIABILITY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac95-heading",
                type: "heading",
                level: 2,
                text: "Luxury Hotel & Marina Supercar Valet Governance",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac95-sub",
                type: "text",
                text: "Bespoke bailment contracts, high-value garage keepers liability coverage, and subrogation defense for multimillion-euro exotic vehicle fleets parked at Bodrum and Yalıkavak resort venues.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Quadrant 2x2 Matrix */
          {
            id: "prac95-matrix-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Quad 1: Bailment Law */
              {
                id: "prac95-quad-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac95-q1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac95-q1-b",
                        type: "badge",
                        text: "PILLAR I · STATUTORY BAILMENT (VEDİA)",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac95-q1-t",
                        type: "heading",
                        level: 3,
                        text: "Strict Custody Duties Under TBK 561",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac95-q1-d",
                        type: "text",
                        text: "Accepting supercar keys triggers strict commercial bailee liability. Hotel operators cannot rely on generic 'not responsible for damage' signs which are procedurally invalid under Turkish law.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quad 2: Digital Intake */
              {
                id: "prac95-quad-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac95-q2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac95-q2-b",
                        type: "badge",
                        text: "PILLAR II · 360° DIGITAL AUDIT",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac95-q2-t",
                        type: "heading",
                        level: 3,
                        text: "High-Definition Intake Scanner",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac95-q2-d",
                        type: "text",
                        text: "Establishing automated optical scanning of vehicle bodywork, carbon fiber splitters, and rims upon arrival to prevent fraudulent pre-existing damage claims.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quad 3: Garage Insurance */
              {
                id: "prac95-quad-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac95-q3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac95-q3-b",
                        type: "badge",
                        text: "PILLAR III · HIGH-LIMIT INSURANCE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac95-q3-t",
                        type: "heading",
                        level: 3,
                        text: "€5M+ Garage Keepers Policy",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac95-q3-d",
                        type: "text",
                        text: "Structuring bespoke commercial garage liability riders covering test-drive exclusions, valet employee age thresholds, and comprehensive fire/flood protection.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quad 4: Subrogation Defense */
              {
                id: "prac95-quad-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac95-q4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac95-q4-b",
                        type: "badge",
                        text: "PILLAR IV · RÜCU SUBROGATION DEFENSE",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac95-q4-t",
                        type: "heading",
                        level: 3,
                        text: "Insurance Recourse Protection",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac95-q4-d",
                        type: "text",
                        text: "Defending hotel operators against aggressive subrogation lawsuits filed by guest foreign comprehensive insurers (Kasko rücu davaları) before commercial courts.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac95-footer-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac95-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac95-fc-text",
                    type: "text",
                    text: "Establish an airtight valet bailment protocol for high-profile hospitality venues.",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "prac95-btn-valet",
                    type: "button",
                    label: "Retain Valet Liability Counsel",
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

export const PRACTICE_LIBRARY_BATCH_19: ComponentDocument[] = [
  PRACTICE_91_BEACH_CLUB_DEMOLITION_DOCUMENT,
  PRACTICE_92_MUSIC_CURFEW_DOCUMENT,
  PRACTICE_93_VIP_CABANA_CHARTER_DOCUMENT,
  PRACTICE_94_WATERSPORTS_ACCIDENT_DOCUMENT,
  PRACTICE_95_SUPERCAR_VALET_DOCUMENT,
];
