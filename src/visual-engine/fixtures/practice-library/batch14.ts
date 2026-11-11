import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 14: Hotel Acquisitions & Due Diligence (#66–#70)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 66: 4-Quadrant Executive Due Diligence Matrix (2x2 grid: Corporate, Title, Licenses, Labor)
 * 67: International Hotel Brand Franchise Management Term Sheet & Escrow (Parchment ledger)
 * 68: Geothermal & Mineral Water Concession 4-Stage Licensing Stepper (Horizontal process rail)
 * 69: Eco-Resort Agricultural Development & Glamping Zoning Blueprint (8/4 asymmetric split)
 * 70: Urgent Hospitality Restructuring & Concordat Debt Moratorium Deck (6/6 dual split)
 * ============================================================================
 */

/**
 * PRACTICE-66: Hospitality M&A · Boutique Hotel Commercial Acquisition Due Diligence
 * Layout Archetype: 4-Quadrant Executive Due Diligence Matrix
 */
export const PRACTICE_66_HOTEL_ACQUISITION_DUE_DILIGENCE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-66-hotel-acquisition-due-diligence",
  name: "Hospitality M&A · 4-Quadrant Executive Due Diligence Matrix",
  kind: "section",
  root: {
    id: "prac66-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac66-container",
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
            id: "prac66-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac66-badge",
                type: "badge",
                text: "HOSPITALITY M&A · COMMERCIAL DUE DILIGENCE & ASSET PURCHASE (TTK / TBK)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac66-heading",
                type: "heading",
                level: 2,
                text: "Hotel Acquisition 4-Quadrant Executive Legal Audit",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac66-sub",
                type: "text",
                text: "Acquiring a boutique hotel or luxury resort in Bodrum, Göcek, or Kalkan requires four-dimensional risk mitigation before binding escrow deposits.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Quadrant Executive Grid (2x2) */
          {
            id: "prac66-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Quadrant 1: Corporate & Shareholding */
              {
                id: "prac66-q1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac66-q1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac66-q1-badge",
                        type: "badge",
                        text: "QUADRANT 01 · CORPORATE & EQUITY",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac66-q1-title",
                        type: "heading",
                        level: 3,
                        text: "Share Transfer & Hidden Liability Audit",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac66-q1-desc",
                        type: "text",
                        text: "Full audit of Trade Registry Gazettes (TTSG), board resolutions, undisclosed shareholder pledge agreements, tax liens, and director guarantee bonds.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quadrant 2: Real Estate & Title Verification */
              {
                id: "prac66-q2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac66-q2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac66-q2-badge",
                        type: "badge",
                        text: "QUADRANT 02 · TITLE & ZONING (İMAR)",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac66-q2-title",
                        type: "heading",
                        level: 3,
                        text: "Title Encumbrances & Coastal Setbacks",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac66-q2-desc",
                        type: "text",
                        text: "Verification of Tapu Takyidat records, bank mortgages, Kıyı Kenar Çizgisi setback infringements, Building Registration Certificate (Yapı Kayıt) legality, and İskan occupancy.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quadrant 3: Municipal & Tourism Licensing */
              {
                id: "prac66-q3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac66-q3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac66-q3-badge",
                        type: "badge",
                        text: "QUADRANT 03 · OPERATING CERTIFICATES",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                      {
                        id: "prac66-q3-title",
                        type: "heading",
                        level: 3,
                        text: "Ministry Star Quotas & Municipal Permits",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac66-q3-desc",
                        type: "text",
                        text: "Validation of Turizm İşletme Belgesi transferability under Law No. 2634, municipal Business License (Ruhsat), fire safety compliance, and TAPDK liquor authorization.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quadrant 4: Labor & Environmental Compliance */
              {
                id: "prac66-q4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac66-q4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac66-q4-badge",
                        type: "badge",
                        text: "QUADRANT 04 · LABOR & ENVIRONMENT",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac66-q4-title",
                        type: "heading",
                        level: 3,
                        text: "Staff Severance Reserves & Blue Card Audit",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac66-q4-desc",
                        type: "text",
                        text: "Actuarial calculation of accrued severance (Kıdem Tazminatı) under Labor Law No. 4857, foreign employee work permits, and wastewater marine discharge compliance.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Direct CTA Strip */
          {
            id: "prac66-cta-strip",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              sizing: { width: "full" },
              spacing: { padding: "md" },
              color: { background: "surface-muted" },
              border: { radius: "md" },
            },
            children: [
              {
                id: "prac66-cta-txt",
                type: "text",
                text: "Commission comprehensive M&A due diligence report prior to signing Share Purchase Agreement (SPA).",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac66-cta-btn",
                type: "button",
                label: "Order Hospitality M&A Audit Dossier",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-67: Hotel Franchise & Management Agreement Term Sheet
 * Layout Archetype: International Hotel Brand Franchise Management Term Sheet & Escrow
 */
export const PRACTICE_67_HOTEL_FRANCHISE_MANAGEMENT_TERMS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-67-hotel-franchise-management-terms",
  name: "International Hotel Brand Franchise Management Term Sheet & Escrow",
  kind: "section",
  root: {
    id: "prac67-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac67-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "5xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac67-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "2xl" }, typography: { align: "center" } },
            children: [
              {
                id: "prac67-badge",
                type: "badge",
                text: "BRAND LICENSING · HMA & FRANCHISE ROYALTY ESCROW PROTOCOL",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac67-heading",
                type: "heading",
                level: 2,
                text: "Hotel Franchise & Brand Management Term Sheet",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac67-sub",
                type: "text",
                text: "Standard contractual framework for luxury Aegean resort owners negotiating with international operators (Marriott, Accor, Hyatt, IHG) under Turkish Commercial Law.",
                style: { typography: { size: "base" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Parchment Container */
          {
            id: "prac67-parchment",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "2xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac67-parchment-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  /* Summary Banner */
                  {
                    id: "prac67-summary-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingBottom: "md" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac67-agreement-type",
                        type: "text",
                        text: "INSTRUMENT: Hotel Management Agreement (HMA) & Franchise Rider",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac67-arbitration-badge",
                        type: "badge",
                        text: "ISTAC (Istanbul) / LCIA (London) Arbitration",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                    ],
                  },

                  /* Table of Provisions */
                  {
                    id: "prac67-terms-list",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    style: { sizing: { width: "full" } },
                    children: [
                      /* Term 1: Base Fee */
                      {
                        id: "prac67-t1",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: {
                          sizing: { width: "full" },
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "surface-muted" },
                          border: { radius: "sm" },
                        },
                        children: [
                          {
                            id: "prac67-t1-label",
                            type: "text",
                            text: "Clause 3 · Base Management & Royalty Fee",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac67-t1-val",
                            type: "text",
                            text: "2.5% – 3.5% of Gross Operating Revenue",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "prac67-t1-desc",
                        type: "text",
                        text: "Calculated monthly against total room, F&B, spa, and marina concession revenues. Includes brand reservation system access and international loyalty marketing.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" }, spacing: { paddingX: "md" } },
                      },

                      /* Term 2: Incentive Fee */
                      {
                        id: "prac67-t2",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: {
                          sizing: { width: "full" },
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "surface-muted" },
                          border: { radius: "sm" },
                        },
                        children: [
                          {
                            id: "prac67-t2-label",
                            type: "text",
                            text: "Clause 4 · Incentive Management Performance Fee",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac67-t2-val",
                            type: "text",
                            text: "8.0% – 10.0% of Adjusted AGOP",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac67-t2-desc",
                        type: "text",
                        text: "Payable only upon owner achieving a baseline statutory return threshold (Owner’s Priority Return) calculated against total hotel capital expenditure.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" }, spacing: { paddingX: "md" } },
                      },

                      /* Term 3: FF&E Escrow */
                      {
                        id: "prac67-t3",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: {
                          sizing: { width: "full" },
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "surface-muted" },
                          border: { radius: "sm" },
                        },
                        children: [
                          {
                            id: "prac67-t3-label",
                            type: "text",
                            text: "Clause 8 · Furniture, Fixtures & Equipment (FF&E) Escrow",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac67-t3-val",
                            type: "text",
                            text: "4.0% Gross Revenue Fiduciary Escrow",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac67-t3-desc",
                        type: "text",
                        text: "Deposited into a joint tripartite bank escrow account. Withdrawals require dual signatures from owner and brand representative for brand-standard refurbishments.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" }, spacing: { paddingX: "md" } },
                      },
                    ],
                  },

                  /* Footer */
                  {
                    id: "prac67-footer-action",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingTop: "lg" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac67-footer-info",
                        type: "text",
                        text: "Negotiate brand standards, performance test hurdles, and non-disturbance agreements (SNDA).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac67-footer-btn",
                        type: "button",
                        label: "Download Master Franchise Term Sheet",
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
 * PRACTICE-68: Geothermal & Mineral Water Concession 4-Stage Licensing Stepper
 * Layout Archetype: 4-Stage Horizontal Linear Process Rail
 */
export const PRACTICE_68_GEOTHERMAL_MINERAL_SPA_CONCESSION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-68-geothermal-mineral-spa-concession",
  name: "Geothermal & Mineral Water Concession 4-Stage Licensing Stepper",
  kind: "section",
  root: {
    id: "prac68-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac68-container",
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
            id: "prac68-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac68-badge",
                type: "badge",
                text: "NATURAL RESOURCES · GEOTHERMAL RESOURCES LAW NO. 5686 & THERMAL TOURISM",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac68-heading",
                type: "heading",
                level: 2,
                text: "4-Stage Geothermal & Mineral Spring Concession Sequence",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac68-sub",
                type: "text",
                text: "Securing 30-year subterranean mineral spring exploration and exploitation concessions for luxury thermal wellness resorts in the Aegean geothermal belt (İzmir, Muğla, Denizli).",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Horizontal Linear Process Rail */
          {
            id: "prac68-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Stage 1 */
              {
                id: "prac68-stage-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac68-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac68-s1-num",
                        type: "badge",
                        text: "STAGE 01",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac68-s1-title",
                        type: "heading",
                        level: 4,
                        text: "Exploration Permit (Arama Ruhsatı)",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac68-s1-desc",
                        type: "text",
                        text: "3-year exclusive exploratory drilling license issued by the Provincial Special Administration (İl Özel İdaresi) covering designated geological coordinates.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac68-stage-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac68-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac68-s2-num",
                        type: "badge",
                        text: "STAGE 02",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac68-s2-title",
                        type: "heading",
                        level: 4,
                        text: "EIA Environmental Clearance (ÇED)",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac68-s2-desc",
                        type: "text",
                        text: "Securing 'ÇED Gerekli Değildir' or 'ÇED Olumlu' decree from the Ministry of Environment, establishing statutory aquifer recharge protection zones.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac68-stage-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac68-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac68-s3-num",
                        type: "badge",
                        text: "STAGE 03",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                      {
                        id: "prac68-s3-title",
                        type: "heading",
                        level: 4,
                        text: "30-Year Operating Concession",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac68-s3-desc",
                        type: "text",
                        text: "Issuance of statutory İşletme Ruhsatı (30 years) with defined flow rate (lt/sec), temperature guarantees, and mineral royalty fee framework (İdare Payı).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac68-stage-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac68-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac68-s4-num",
                        type: "badge",
                        text: "STAGE 04",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac68-s4-title",
                        type: "heading",
                        level: 4,
                        text: "Ministry Thermal Cure Facility Permit",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac68-s4-desc",
                        type: "text",
                        text: "Ministry of Health Kaplıca Tesis İzin Belgesi certifying balneological balneotherapy indications for luxury resort wellness and medical tourism.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Bottom Action Bar */
          {
            id: "prac68-bottom-strip",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              sizing: { width: "full" },
              spacing: { padding: "md" },
              color: { background: "surface-muted" },
              border: { radius: "md" },
            },
            children: [
              {
                id: "prac68-bottom-txt",
                type: "text",
                text: "Operating a thermal spa without Ministry of Health concession permits incurs immediate facility seal and penal sanctions.",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac68-bottom-btn",
                type: "button",
                label: "Commission Geothermal Concession Audit",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-69: Eco-Resort Agricultural Development & Glamping Zoning Blueprint
 * Layout Archetype: Asymmetric 70/30 Legal Dossier with Zoning Blueprint (8/4 split)
 */
export const PRACTICE_69_GLAMPING_AGRI_TOURISM_ZONING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-69-glamping-agri-tourism-zoning",
  name: "Eco-Resort Agricultural Development & Glamping Zoning Blueprint",
  kind: "section",
  root: {
    id: "prac69-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac69-container",
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
            id: "prac69-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac69-badge",
                type: "badge",
                text: "AGRITOURISM ZONING · SOIL CONSERVATION LAW NO. 5403 & ECO-TOURISM DIRECTIVE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac69-heading",
                type: "heading",
                level: 2,
                text: "Eco-Resort & Luxury Glamping Agricultural Zoning Blueprint",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac69-sub",
                type: "text",
                text: "Developing tented safari suites, geodesic domes, and agritourism lodges on rural Aegean parcels without triggering illegal construction demolition decrees.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Blueprint Split */
          {
            id: "prac69-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Agricultural Statutory Limits (8-col) */
              {
                id: "prac69-col-dossier",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac69-dossier-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac69-dossier-tag",
                        type: "badge",
                        text: "STATUTORY DEVELOPMENT PARAMETERS",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac69-dossier-title",
                        type: "heading",
                        level: 3,
                        text: "Non-Agricultural Usage Permit (Tarım Dışı Kullanım İzni)",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac69-dossier-desc",
                        type: "text",
                        text: "Under Law No. 5403, construction on designated agricultural soil is prohibited unless formal Non-Agricultural Usage approval is granted by the Soil Conservation Board. For glamping resorts, structures must strictly qualify as demountable timber/canvas without concrete foundations.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac69-dossier-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac69-dossier-rules",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac69-r1",
                            type: "text",
                            text: "• Rule 1 · 5% Ground Footprint Cap: Maximum built footprint cannot exceed 5% of the total parcel area (minimum parcel size 5,000 m²).",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac69-r2",
                            type: "text",
                            text: "• Rule 2 · Olive Grove Absolute Barrier: Parcels containing olive trees are governed by Law No. 3573; no tourist development within 3 km of active olive groves without Special Exemption.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac69-r3",
                            type: "text",
                            text: "• Rule 3 · Demountable Pilotis Construction: Structures must be elevated on screw-pile or timber pilotis; poured concrete foundation slabs trigger immediate criminal demolition orders.",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Agricultural Board Filing Desk (4-col) */
              {
                id: "prac69-col-desk",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface-muted" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac69-desk-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac69-desk-badge",
                        type: "badge",
                        text: "PROVINCIAL BOARD DESK",
                        style: { color: { background: "surface", text: "text" } },
                      },
                      {
                        id: "prac69-desk-title",
                        type: "heading",
                        level: 4,
                        text: "İl Tarım Kurulu Clearance",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac69-desk-desc",
                        type: "text",
                        text: "We file comprehensive agritourism project dossiers before the Provincial Soil Conservation Board, coordinate agronomic field surveys, and secure fast-track approvals for boutique eco-resorts.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac69-desk-btn",
                        type: "button",
                        label: "Submit Glamping Zoning Audit",
                        style: { sizing: { width: "full" } },
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
 * PRACTICE-70: Distressed Hotel Restructuring & Concordat Debt Moratorium Deck
 * Layout Archetype: High-Density Side-by-Side Split Screen (6/6: Temporary Moratorium vs Debt Settlement Matrix)
 */
export const PRACTICE_70_HOTEL_DISTRESSED_NPL_RESTRUCTURE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-70-hotel-distressed-npl-restructure",
  name: "Urgent Hospitality Restructuring & Concordat Debt Moratorium Deck",
  kind: "section",
  root: {
    id: "prac70-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac70-container",
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
            id: "prac70-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac70-badge",
                type: "badge",
                text: "INSOLVENCY & RESTRUCTURING · ENFORCEMENT & BANKRUPTCY ACT (İİK ART. 285 KONKORDATO)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac70-heading",
                type: "heading",
                level: 2,
                text: "Hotel Concordat Restructuring & Asset Freeze Moratorium",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac70-sub",
                type: "text",
                text: "Shielding distressed Aegean hotel assets from bank foreclosure and supplier auctions while negotiating structured multi-year debt haircut projects under court supervision.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Comparative Split (6/6) */
          {
            id: "prac70-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: 3-Month Temporary Moratorium (6-col) */
              {
                id: "prac70-col-moratorium",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac70-mor-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac70-mor-tag",
                        type: "badge",
                        text: "PHASE 1: 3-MONTH TEMPORARY STAY (GEÇİCİ MÜHLET)",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac70-mor-title",
                        type: "heading",
                        level: 3,
                        text: "Immediate Injunction Against Creditor Actions",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac70-mor-desc",
                        type: "text",
                        text: "Upon filing the Concordat Preliminary Project with the Commercial Court (Asliye Ticaret Mahkemesi), the court immediately grants a 3-month temporary stay halting all pending executions, bank account freezes, and auction proceedings.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac70-mor-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac70-mor-box",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        style: {
                          color: { background: "surface-muted" },
                          border: { radius: "md" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac70-mor-box-label",
                            type: "text",
                            text: "OPERATIONAL CONTINUITY SHIELD",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac70-mor-box-val",
                            type: "text",
                            text: "Hotel Continues Operating Under Court Commissioner Supervision",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac70-mor-box-note",
                            type: "text",
                            text: "Seasonal guest bookings, F&B operations, and staff payroll proceed unencumbered by debt service.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac70-mor-btn",
                        type: "button",
                        label: "File Emergency Concordat Petition",
                        style: { sizing: { width: "full" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Definitive Concordat Settlement Project (6-col) */
              {
                id: "prac70-col-settlement",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac70-set-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac70-set-tag",
                        type: "badge",
                        text: "PHASE 2: 1-YEAR DEFINITIVE SETTLEMENT (KESİN MÜHLET)",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac70-set-title",
                        type: "heading",
                        level: 3,
                        text: "Creditor Quorum & Structured Debt Haircut",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac70-set-desc",
                        type: "text",
                        text: "Approval requires securing a double majority under İİK Art. 302: more than half of affected creditors representing at least half of total verified debts, or one quarter of creditors representing two-thirds of debt claims.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac70-set-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac70-set-box",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        style: {
                          color: { background: "surface-muted" },
                          border: { radius: "md" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac70-set-box-label",
                            type: "text",
                            text: "BANK CONSORTIUM RESTRUCTURING",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac70-set-box-val",
                            type: "text",
                            text: "Up to 3-Year Grace Period + 5-Year Term Extension",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac70-set-box-note",
                            type: "text",
                            text: "Negotiated pursuant to Banking Regulation (BDDK) framework agreements and judicial debt composition.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac70-set-btn",
                        type: "button",
                        label: "Retain Distressed Debt Restructuring Counsel",
                        style: { sizing: { width: "full" } },
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

export const PRACTICE_LIBRARY_BATCH_14: ComponentDocument[] = [
  PRACTICE_66_HOTEL_ACQUISITION_DUE_DILIGENCE_DOCUMENT,
  PRACTICE_67_HOTEL_FRANCHISE_MANAGEMENT_TERMS_DOCUMENT,
  PRACTICE_68_GEOTHERMAL_MINERAL_SPA_CONCESSION_DOCUMENT,
  PRACTICE_69_GLAMPING_AGRI_TOURISM_ZONING_DOCUMENT,
  PRACTICE_70_HOTEL_DISTRESSED_NPL_RESTRUCTURE_DOCUMENT,
];
