import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 15: Cross-Border Corporate & Tax (#71–#75)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 71: 5-Stage MERSİS Foreign Incorporation Rail (Horizontal linear stepper rail)
 * 72: Tabular Cross-Border Tax Treaty (DTAA) Matrix Table (Hairline gazette table)
 * 73: Central Bank DAB Forex Remittance Split Screen (6/6 dual comparative split)
 * 74: Asymmetric 70/30 Free Trade Zone Yacht Refit Dossier (8/4 split: Tax rules + Entry card)
 * 75: Minimalist Editorial Director E-İmza Monograph with Pull-Quote (Parchment serif column)
 * ============================================================================
 */

/**
 * PRACTICE-71: Company Law · Turkish Limited Şirket (LTD) Foreign Formation Package
 * Layout Archetype: 5-Stage MERSİS Foreign Incorporation Rail
 */
export const PRACTICE_71_TURKISH_LTD_FOREIGN_INVESTOR_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-71-turkish-ltd-foreign-investor",
  name: "Trade Registry (MERSİS) 5-Stage Cross-Border Incorporation Rail",
  kind: "section",
  root: {
    id: "prac71-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac71-container",
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
            id: "prac71-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac71-badge",
                type: "badge",
                text: "FOREIGN DIRECT INVESTMENT · LAW NO. 4875 & TURKISH COMMERCIAL CODE (TTK)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac71-heading",
                type: "heading",
                level: 2,
                text: "5-Stage MERSİS Foreign Company Incorporation Rail",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac71-sub",
                type: "text",
                text: "Turnkey establishment of Turkish Limited Liability Companies (Ltd. Şti.) and Joint Stock Corporations (A.Ş.) for non-resident investors, hotel holding entities, and yacht charter operators.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 5-Stage Horizontal Linear Process Rail */
          {
            id: "prac71-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
            children: [
              /* Stage 1 */
              {
                id: "prac71-stage-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac71-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac71-s1-num",
                        type: "badge",
                        text: "01 · TAX ID",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac71-s1-title",
                        type: "heading",
                        level: 4,
                        text: "Potential Tax ID Assignment",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac71-s1-desc",
                        type: "text",
                        text: "Securing corporate and personal potential tax numbers for non-resident shareholders via Interaktif Vergi Dairesi.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac71-stage-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac71-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac71-s2-num",
                        type: "badge",
                        text: "02 · MERSİS DRAFT",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac71-s2-title",
                        type: "heading",
                        level: 4,
                        text: "Articles of Association Filing",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac71-s2-desc",
                        type: "text",
                        text: "Drafting bilingual company charter in Central Trade Registry (MERSİS) and sworn notarization of manager signature declarations.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac71-stage-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac71-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac71-s3-num",
                        type: "badge",
                        text: "03 · CAPITAL",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                      {
                        id: "prac71-s3-title",
                        type: "heading",
                        level: 4,
                        text: "Capital Blockage Deposition",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac71-s3-desc",
                        type: "text",
                        text: "Bank capital escrow deposit (25% initial cash blockage for A.Ş. entities; statutory minimum capital verification).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac71-stage-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac71-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac71-s4-num",
                        type: "badge",
                        text: "04 · REGISTRY",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac71-s4-title",
                        type: "heading",
                        level: 4,
                        text: "Chamber Inscription & Gazette",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac71-s4-desc",
                        type: "text",
                        text: "Final registration at Bodrum/Muğla Chamber of Commerce (BODTO/MUTSO) and publication in Turkish Trade Registry Gazette (TTSG).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 5 */
              {
                id: "prac71-stage-5",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac71-s5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac71-s5-num",
                        type: "badge",
                        text: "05 · TAX DESK",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac71-s5-title",
                        type: "heading",
                        level: 4,
                        text: "Tax Office Physical Audit",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac71-s5-desc",
                        type: "text",
                        text: "Yoklama physical inspection at registered headquarters, procurement of director E-İmza, and corporate bank activation.",
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
            id: "prac71-cta-strip",
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
                id: "prac71-cta-txt",
                type: "text",
                text: "Complete foreign investor company setup within 5 to 7 business days via bilateral consular power of attorney.",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac71-cta-btn",
                type: "button",
                label: "Retain Corporate Incorporation Counsel",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-72: Cross-Border Tax Treaty (DTAA) Withholding Tax Registry Table
 * Layout Archetype: Tabular Cross-Border Tax Treaty (DTAA) Matrix Table
 */
export const PRACTICE_72_DOUBLE_TAXATION_WITHHOLDING_OPTIMIZER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-72-double-taxation-withholding-optimizer",
  name: "Cross-Border Tax Treaty (DTAA) Withholding Tax Registry Table",
  kind: "section",
  root: {
    id: "prac72-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac72-container",
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
            id: "prac72-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac72-badge",
                type: "badge",
                text: "INTERNATIONAL TAX LAW · DOUBLE TAXATION CONVENTIONS (ÇVÖA) & OECD MODEL",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac72-heading",
                type: "heading",
                level: 2,
                text: "Cross-Border Tax Treaty Withholding Tax Rate Matrix",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac72-sub",
                type: "text",
                text: "Structuring outbound dividend remittances, IP brand royalties, and hotel management fee payouts under bilateral Double Tax Avoidance Agreements ratified by Turkey.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Gazette Tabular Matrix */
          {
            id: "prac72-table-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "lg", color: "border" },
              sizing: { width: "full" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "prac72-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                style: { sizing: { width: "full" } },
                children: [
                  /* Header Row */
                  {
                    id: "prac72-th",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingBottom: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac72-th-c1",
                        type: "text",
                        text: "TREATY PARTNER JURISDICTION",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-th-c2",
                        type: "text",
                        text: "DIVIDEND WITHHOLDING (STOPAJ)",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-th-c3",
                        type: "text",
                        text: "IP ROYALTY / FRANCHISE CAP",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-th-c4",
                        type: "text",
                        text: "TREATY APPLICABILITY RIDER",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Row 1: United Kingdom */
                  {
                    id: "prac72-r1",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac72-r1-c1",
                        type: "text",
                        text: "United Kingdom (UK)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac72-r1-c2",
                        type: "text",
                        text: "15% (Reduced from domestic 10%-20%)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-r1-c3",
                        type: "text",
                        text: "10% Maximum Treaty Withholding",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac72-r1-c4",
                        type: "badge",
                        text: "HMRC Certificate of Residence",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 2: Germany */
                  {
                    id: "prac72-r2",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac72-r2-c1",
                        type: "text",
                        text: "Germany (Deutschland)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac72-r2-c2",
                        type: "text",
                        text: "15% (Parent Co 5% if > 25% equity)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-r2-c3",
                        type: "text",
                        text: "10% Maximum Trademark/IP Fee",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac72-r2-c4",
                        type: "badge",
                        text: "Bundeszentralamt für Steuern",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 3: Netherlands */
                  {
                    id: "prac72-r3",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac72-r3-c1",
                        type: "text",
                        text: "Netherlands (Holland)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac72-r3-c2",
                        type: "text",
                        text: "10% Participation Exemption Rate",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-r3-c3",
                        type: "text",
                        text: "10% Know-How & Technology Fee",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac72-r3-c4",
                        type: "badge",
                        text: "Belastingdienst Tax Certificate",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 4: United States */
                  {
                    id: "prac72-r4",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                    },
                    children: [
                      {
                        id: "prac72-r4-c1",
                        type: "text",
                        text: "United States (US)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac72-r4-c2",
                        type: "text",
                        text: "15% General (20% Portfolio)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-r4-c3",
                        type: "text",
                        text: "10% Industrial Royalties Rate",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac72-r4-c4",
                        type: "badge",
                        text: "IRS Form 6166 Residency Proof",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Footer */
                  {
                    id: "prac72-footer",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingTop: "md" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac72-footer-info",
                        type: "text",
                        text: "Claiming treaty rates requires presenting an apostilled Tax Residency Certificate (Mukimlik Belgesi) to the Turkish Tax Office.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac72-footer-btn",
                        type: "button",
                        label: "Structure Cross-Border Royalty Outflow",
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
 * PRACTICE-73: Central Bank DAB (Döviz Alım Belgesi) Foreign Currency Exchange Split
 * Layout Archetype: High-Density Side-by-Side Split Screen (6/6: TCMB DAB Conversion vs Tapu Wire Reconciliation)
 */
export const PRACTICE_73_FOREIGN_EXCHANGE_KAMBIYO_AUDIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-73-foreign-exchange-kambiyo-audit",
  name: "Central Bank DAB (Döviz Alım Belgesi) Foreign Currency Exchange Split",
  kind: "section",
  root: {
    id: "prac73-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac73-container",
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
            id: "prac73-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac73-badge",
                type: "badge",
                text: "FOREIGN EXCHANGE LAW · CENTRAL BANK (TCMB) CAPITAL MOVEMENTS CIRCULAR ART. 13",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac73-heading",
                type: "heading",
                level: 2,
                text: "Central Bank DAB Forex Remittance & Title Deed Split",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac73-sub",
                type: "text",
                text: "Under Turkish Foreign Exchange regulations, foreign buyers must sell foreign currency directly to the Central Bank (TCMB) via an authorized Turkish deposit bank to procure a mandatory Döviz Alım Belgesi (DAB) prior to Title Deed closing.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Split Screen (6/6) */
          {
            id: "prac73-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: TCMB Banking Protocol (6-col) */
              {
                id: "prac73-col-bank",
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
                    id: "prac73-bank-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac73-bank-tag",
                        type: "badge",
                        text: "TRACK 1: CENTRAL BANK FOREX CONVERSION",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac73-bank-title",
                        type: "heading",
                        level: 3,
                        text: "Döviz Alım Belgesi (DAB) Execution Protocol",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac73-bank-desc",
                        type: "text",
                        text: "The foreign buyer’s currency (USD/EUR/GBP) must be wire-transferred from an overseas bank directly to an intermediary Turkish bank account and converted to Turkish Lira at the TCMB official bid rate. The bank issues a digitally authenticated DAB stating the exact buyer passport number and purpose.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac73-bank-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac73-bank-box",
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
                            id: "prac73-bank-box-label",
                            type: "text",
                            text: "CRITICAL COMPLIANCE THRESHOLD",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac73-bank-box-val",
                            type: "text",
                            text: "Exact Consideration Matching Title Deed Valuation",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac73-bank-box-note",
                            type: "text",
                            text: "Any shortfall between DAB declared amount and Deed sales price halts Tapu transaction immediately.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac73-bank-btn",
                        type: "button",
                        label: "Audit Interbank DAB Wire Route",
                        style: { sizing: { width: "full" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Title Deed Reconciliation (6-col) */
              {
                id: "prac73-col-tapu",
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
                    id: "prac73-tapu-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac73-tapu-tag",
                        type: "badge",
                        text: "TRACK 2: TITLE DEED DIRECTORATE CLEARANCE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac73-tapu-title",
                        type: "heading",
                        level: 3,
                        text: "Tapu Sicil DAB Reconciliation & Safe Closing",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac73-tapu-desc",
                        type: "text",
                        text: "The Title Deed Directorate uploads the electronic DAB receipt into Web-Tapu. The converted Turkish Lira must be wired to the seller via Turkish Central Bank Takasbank escrow or blocking protocols to ensure safe handover.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac73-tapu-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac73-tapu-box",
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
                            id: "prac73-tapu-box-label",
                            type: "text",
                            text: "CITIZENSHIP INVESTMENT CRITERIA",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac73-tapu-box-val",
                            type: "text",
                            text: "Minimum $400,000 USD Equivalent DAB for Citizenship",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac73-tapu-box-note",
                            type: "text",
                            text: "Requires Uygunluk Belgesi certificate of conformity issued by Land Registry General Directorate.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac73-tapu-btn",
                        type: "button",
                        label: "Execute Takasbank Title Escrow Closing",
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
 * PRACTICE-74: Free Trade Zone (Serbest Bölge) Zero-VAT Yacht Refit Concession Split
 * Layout Archetype: Asymmetric 70/30 Legal Dossier with Customs Concession Blueprint (8/4 split)
 */
export const PRACTICE_74_FREE_TRADE_ZONE_YACHT_REFIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-74-free-trade-zone-yacht-refit",
  name: "Free Trade Zone Zero-VAT Yacht Refit Concession Dossier",
  kind: "section",
  root: {
    id: "prac74-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac74-container",
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
            id: "prac74-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac74-badge",
                type: "badge",
                text: "CUSTOMS EXEMPTIONS · FREE TRADE ZONES LAW NO. 3218 & MARITIME REFIT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac74-heading",
                type: "heading",
                level: 2,
                text: "Free Trade Zone Zero-VAT Superyacht Refit Dossier",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac74-sub",
                type: "text",
                text: "Structuring multi-million Euro luxury yacht refits in Antalya Free Zone (ASBAŞ) or Ege Serbest Bölge under statutory exemptions from Value Added Tax (0% KDV) and customs tariffs.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Blueprint Split */
          {
            id: "prac74-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Statutory Free Zone Concession Rules (8-col) */
              {
                id: "prac74-col-dossier",
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
                    id: "prac74-dossier-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac74-dossier-tag",
                        type: "badge",
                        text: "STATUTORY TAX PRIVILEGES",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac74-dossier-title",
                        type: "heading",
                        level: 3,
                        text: "Exemption from 20% VAT & Import Tariffs on Marine Equipment",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac74-dossier-desc",
                        type: "text",
                        text: "Under Free Zones Law No. 3218, transactions within Turkish Free Trade Zones are deemed outside the national customs perimeter. Marine electronics, navigation systems, teak timber, and engine parts imported directly into the zone are 100% exempt from Value Added Tax and customs duties.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac74-dossier-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac74-dossier-points",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac74-p1",
                            type: "text",
                            text: "• Privilege 1 · Zero VAT (0% KDV) on Drydock & Engineering Labor: Refit labor performed inside the free zone by certified shipyard personnel is exempt from domestic VAT.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac74-p2",
                            type: "text",
                            text: "• Privilege 2 · Duty-Free Bunkering & Re-Export: Finished vessels depart under Transit Customs documentation without domestic customs duties or Special Consumption Tax.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac74-p3",
                            type: "text",
                            text: "• Privilege 3 · Corporate Income Tax Exemption for Shipbuilders: Shipyards exporting 85%+ of output enjoy 100% corporate tax exemption under Law No. 3218.",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Free Zone Entry Card (4-col) */
              {
                id: "prac74-col-desk",
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
                    id: "prac74-desk-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac74-desk-badge",
                        type: "badge",
                        text: "CUSTOMS ENTRY PERMIT",
                        style: { color: { background: "surface", text: "text" } },
                      },
                      {
                        id: "prac74-desk-title",
                        type: "heading",
                        level: 4,
                        text: "Free Zone Refit Contract Escrow",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac74-desk-desc",
                        type: "text",
                        text: "We draft shipyard Master Refit Agreements, secure Free Zone Directorate Entry Permits (Giriş İzin Belgesi), and structure stage-payment escrow accounts governed by international maritime arbitration.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac74-desk-btn",
                        type: "button",
                        label: "Draft Free Zone Refit Escrow Contract",
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
 * PRACTICE-75: Non-Resident Director E-İmza & Board Resolution Digital Monograph
 * Layout Archetype: Minimalist Editorial Monograph with Inset Pull-Quote & Electronic Signature Seal
 */
export const PRACTICE_75_FOREIGN_DIRECTOR_E_IMZA_GOVERNANCE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-75-foreign-director-e-imza-governance",
  name: "Non-Resident Director E-İmza & Board Resolution Digital Monograph",
  kind: "section",
  root: {
    id: "prac75-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac75-container",
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
          /* Header */
          {
            id: "prac75-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "2xl" }, typography: { align: "center" } },
            children: [
              {
                id: "prac75-badge",
                type: "badge",
                text: "DIGITAL CORPORATE GOVERNANCE · ELECTRONIC SIGNATURE LAW NO. 5070 & TTK ART. 390",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac75-heading",
                type: "heading",
                level: 2,
                text: "Non-Resident Director E-İmza & Board Governance Monograph",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Monograph Column */
          {
            id: "prac75-card",
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
                id: "prac75-card-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  /* Large Latin / Turkish Pull-Quote */
                  {
                    id: "prac75-pullquote-wrap",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      sizing: { width: "full" },
                      typography: { align: "center" },
                      border: { width: "hairline", color: "border" },
                      color: { background: "surface-muted" },
                    },
                    children: [
                      {
                        id: "prac75-quote-txt",
                        type: "heading",
                        level: 3,
                        text: "“Güvenli elektronik imza, elle atılan ıslak imzanın bütün hukuki sonuçlarını doğurur; elektronik ortamda alınan yönetim kurulu kararları Ticaret Sicilinde tescile amadedir.”",
                        style: {
                          typography: { size: "xl", weight: "normal" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac75-quote-cite",
                        type: "text",
                        text: "— 5070 Sayılı Elektronik İmza Kanunu Madde 5 & Türk Ticaret Kanunu Madde 390",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },

                  /* Editorial Prose */
                  {
                    id: "prac75-prose",
                    type: "text",
                    text: "Foreign investors owning Turkish hotel operating companies and maritime assets are not required to travel physically to Turkey for corporate governance. We procure Qualified Electronic Signature (Nitelikli Elektronik Sertifika - NES) hardware tokens for non-resident directors. Authorized board members execute MERSİS corporate resolutions, capital increases, manager appointments, and banking instructions remotely with 100% legal validity under Turkish commercial law.",
                    style: { typography: { size: "base" }, color: { text: "text-muted" } },
                  },

                  /* Sign-off Seal */
                  {
                    id: "prac75-seal-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingTop: "md" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac75-seal-info",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac75-seal-title",
                            type: "text",
                            text: "DIGITAL CORPORATE GOVERNANCE PRACTICE GROUP",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac75-seal-sub",
                            type: "text",
                            text: "Chambers of Commercial Counsel · MERSİS & E-İmza Fiduciary Practice",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac75-seal-btn",
                        type: "button",
                        label: "Procure Non-Resident E-İmza Token",
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

export const PRACTICE_LIBRARY_BATCH_15: ComponentDocument[] = [
  PRACTICE_71_TURKISH_LTD_FOREIGN_INVESTOR_DOCUMENT,
  PRACTICE_72_DOUBLE_TAXATION_WITHHOLDING_OPTIMIZER_DOCUMENT,
  PRACTICE_73_FOREIGN_EXCHANGE_KAMBIYO_AUDIT_DOCUMENT,
  PRACTICE_74_FREE_TRADE_ZONE_YACHT_REFIT_DOCUMENT,
  PRACTICE_75_FOREIGN_DIRECTOR_E_IMZA_GOVERNANCE_DOCUMENT,
];
