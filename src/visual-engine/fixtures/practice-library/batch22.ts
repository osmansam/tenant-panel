import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 22: Hotel M&A & Distressed Resorts (#106–#110)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 106: Asymmetric 70/30 Ministry Tourism Concession Assignment Dossier (8/4)
 * 107: Parchment Cross-Border SPA & Escrow Workbench (Hotel Mergers)
 * 108: Dual Comparative Split Screen (6/6: UYAP Auction vs Concordat Moratorium)
 * 109: Tabular Property Improvement Plan (PIP) Capex Matrix (Table)
 * 110: 4-Quadrant Executive Branded Residences Governance Matrix (2x2)
 * ============================================================================
 */

/**
 * PRACTICE-106: Hospitality Concessions · 49-Year State Forest Hotel Lease Transfer
 * Layout Archetype: Asymmetric 70/30 Ministry Tourism Concession Assignment Dossier (8/4)
 */
export const PRACTICE_106_HOTEL_GROUND_LEASE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-106-hotel-ground-lease-forestry-transfer",
  name: "Hospitality Concessions · 49-Year State Forest Hotel Lease Transfer",
  kind: "section",
  root: {
    id: "prac106-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac106-container",
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
            id: "prac106-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac106-badge",
                type: "badge",
                text: "TOURISM LAW NO. 2634 ART. 8 · 49-YEAR CONCESSION TRANSFER (TAHSİS DEVRİ)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac106-heading",
                type: "heading",
                level: 2,
                text: "Ministry Forestry Land Allocation Assignment & Lease Extension",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac106-sub",
                type: "text",
                text: "Managing complex institutional assignments of 49-year beachfront resort allocations from the Ministry of Culture & Tourism and General Directorate of Forestry.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Grid */
          {
            id: "prac106-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): Concession Assignment Dossier */
              {
                id: "prac106-main-dossier",
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
                    id: "prac106-md-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac106-md-b", type: "badge", text: "MINISTRY JURISDICTION · LAW 2634", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac106-md-t", type: "heading", level: 3, text: "Tahsis Devri Regulatory Conditions", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac106-md-d", type: "text", text: "State tourism land allocations cannot be assigned via simple private contract. They require formal approval from the Ministry of Culture & Tourism, payment of statutory transfer premiums (devir payı), and extension of the lease term back to 49 years.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      {
                        id: "prac106-step-1",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          { id: "prac106-s1-t", type: "heading", level: 4, text: "1. Tourism Operating Investment Certificate Audit", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac106-s1-p", type: "text", text: "Verifying hotel star rating, bed capacity compliance, and zero structural encroachment outside designated forest parcel boundaries.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                      {
                        id: "prac106-step-2",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          { id: "prac106-s2-t", type: "heading", level: 4, text: "2. 49-Year Term Reset (Süre Uzatımı)", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac106-s2-p", type: "text", text: "Negotiating statutory lease reset under Law No. 7153 to reinstate remaining leases back to a full 49-year term, unlocking international project financing.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): Concession Assignment Desk */
              {
                id: "prac106-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac106-side-card",
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
                        id: "prac106-sc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          { id: "prac106-sc-b", type: "badge", text: "MINISTRY ESCROW DESK", style: { color: { background: "primary", text: "background" } } },
                          { id: "prac106-sc-t", type: "heading", level: 4, text: "Lease Assignment Docket", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac106-sc-i1", type: "text", text: "✓ Ministry Culture & Tourism Clearance", style: { typography: { size: "sm" }, color: { text: "text" } } },
                          { id: "prac106-sc-i2", type: "text", text: "✓ Forestry Directorate Lease Novation", style: { typography: { size: "sm" }, color: { text: "text" } } },
                          { id: "prac106-sc-i3", type: "text", text: "✓ National Real Estate Premium Deposit", style: { typography: { size: "sm" }, color: { text: "text" } } },
                          { id: "prac106-sc-div", type: "divider", style: { sizing: { width: "full" } } },
                          { id: "prac106-btn-lease", type: "button", label: "File Ministry Allocation Transfer", },
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
 * PRACTICE-107: Hotel M&A · Cross-Border Boutique Hotel Share Purchase Agreement (SPA)
 * Layout Archetype: Parchment Cross-Border SPA & Escrow Workbench
 */
export const PRACTICE_107_HOTEL_SPA_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-107-boutique-hotel-share-purchase-agreement",
  name: "Hotel M&A · Cross-Border Boutique Hotel Share Purchase Agreement (SPA)",
  kind: "section",
  root: {
    id: "prac107-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac107-container",
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
            id: "prac107-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac107-badge",
                type: "badge",
                text: "CORPORATE M&A · TURKISH COMMERCIAL CODE (TTK) · TAKASBANK PURCHASE ESCROW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac107-heading",
                type: "heading",
                level: 2,
                text: "Cross-Border Boutique Hotel Share Purchase Agreement (SPA)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac107-sub",
                type: "text",
                text: "Drafting bilingual share transfer agreements, representation & warranty indemnities, locked-box financial adjustments, and escrow closings for coastal resort assets.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 7 / 5 Workbench Grid */
          {
            id: "prac107-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): SPA Model Clause Box */
              {
                id: "prac107-box",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac107-b-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac107-b-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "sm",
                        style: { sizing: { width: "full" } },
                        children: [
                          { id: "prac107-b-tag", type: "badge", text: "HOTEL SHARE PURCHASE MODEL COVENANT", style: { color: { background: "surface-muted", text: "text" } } },
                          { id: "prac107-b-escrow", type: "badge", text: "CLOSING: TAKASBANK ESCROW", style: { color: { background: "primary", text: "background" } } },
                        ],
                      },
                      {
                        id: "prac107-parchment-clause",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "lg" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac107-clause-text",
                            type: "text",
                            text: "“Seller represents and warrants that the Target Company owns valid, unencumbered title to the Boutique Hotel Facility and holds all required Ministry of Tourism Operating Certificates, GSM workplace opening licenses, and environmental permits with zero unrectified citations. Buyer shall deposit the Purchase Price into a designated Takasbank Escrow Account, released upon registration of the share transfer before the Trade Registry.”",
                            style: { typography: { size: "base" }, color: { text: "text" } },
                          },
                        ],
                      },
                      { id: "prac107-points-head", type: "heading", level: 4, text: "Closing Deliverables & Due Diligence Conditions", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac107-pt-1", type: "text", text: "• Environmental & Zoning Warranty: Full indemnity against unpermitted coastal sun decks, ecrimisil arrears, or building registration certificate (İmar Barışı) revocations.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac107-pt-2", type: "text", text: "• Staff Severance Indemnity Reserve: Escrowing accrued kıdem tazminatı liabilities for seasonal hotel personnel.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      {
                        id: "prac107-btn-row",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: true,
                        gap: "sm",
                        children: [
                          { id: "prac107-btn-spa", type: "button", label: "Download Hotel SPA Checklist", },
                          { id: "prac107-btn-retain", type: "button", label: "Retain Hotel M&A Counsel", },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (5 cols): M&A Closing Docket */
              {
                id: "prac107-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  {
                    id: "prac107-card-tax",
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
                        id: "prac107-ct-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          { id: "prac107-ct-b", type: "badge", text: "TAX STRUCTURING · SHARE VS ASSET", style: { color: { background: "surface-muted", text: "text" } } },
                          { id: "prac107-ct-t", type: "heading", level: 4, text: "A.Ş. Share Sale Tax Exemption", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac107-ct-d", type: "text", text: "Transferring shares of Joint Stock Companies (A.Ş.) held for over 2 years completely eliminates 20% VAT and capital gains tax under Income Tax Law Art. 80.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                    ],
                  },
                  {
                    id: "prac107-card-escrow",
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
                        id: "prac107-ce-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          { id: "prac107-ce-b", type: "badge", text: "ESCROW SECURITY · TAKASBANK", style: { color: { background: "primary", text: "background" } } },
                          { id: "prac107-ce-t", type: "heading", level: 4, text: "Indemnity Retention Escrow", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac107-ce-d", type: "text", text: "15% of purchase price retained in dual-signature escrow account for 18 months to cover hidden tax or labor liabilities.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
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
 * PRACTICE-108: Distressed Hospitality · Hotel Concordat Restructuring & Judicial Auction
 * Layout Archetype: Dual Comparative Split Screen (6/6)
 */
export const PRACTICE_108_DISTRESSED_RESORT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-108-distressed-resort-concordat-auction-bid",
  name: "Distressed Hospitality · Hotel Concordat Restructuring & Judicial Auction",
  kind: "section",
  root: {
    id: "prac108-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac108-container",
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
            id: "prac108-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac108-badge",
                type: "badge",
                text: "INSOLVENCY & BANKRUPTCY LAW (İİK) · KONKORDATO & UYAP E-SATIŞ AUCTIONS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac108-heading",
                type: "heading",
                level: 2,
                text: "Distressed Resort Debt Moratorium & Electronic Auction Acquisition",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac108-sub",
                type: "text",
                text: "Strategic representation for distressed debt investors acquiring insolvent coastal hotels out of court concordat moratoriums or judicial execution auctions with clean title transfer.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac108-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Concordat Moratorium Buyout */
              {
                id: "prac108-left-col",
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
                    id: "prac108-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac108-left-b", type: "badge", text: "TRACK A · CONCORDAT MORATORIUM DEBT BUYOUT", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac108-left-t", type: "heading", level: 3, text: "Court-Supervised Debt Haircut (Tenzilat)", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac108-left-d", type: "text", text: "Under İİK Art. 289, hotels under definitive concordat enjoy complete protection against bank foreclosure. Investors negotiate debt haircuts (30%–60% reduction) ratified by Commercial Court.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac108-left-divider", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac108-lp-1", type: "text", text: "• Concordat Commissioner Sign-Off: Obtaining commissioner consent for emergency operating asset transfers.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac108-left-btn", type: "button", label: "Structure Concordat Moratorium Buyout", },
                    ],
                  },
                ],
              },

              /* Right (6 cols): UYAP Electronic Auction Bid */
              {
                id: "prac108-right-col",
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
                    id: "prac108-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac108-right-b", type: "badge", text: "TRACK B · UYAP E-SATIŞ FORECLOSURE AUCTION", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac108-right-t", type: "heading", level: 3, text: "Judicial Auction Free of Liens (Ari İhale)", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac108-right-d", type: "text", text: "Bidding on distressed beachfront hotels via Ministry of Justice UYAP electronic auction portal. Title deeds transfer completely cleansed of prior bank mortgages and tax liens.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac108-right-divider", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac108-rp-1", type: "text", text: "• 50% Valuation Floor: Starting bid opens at 50% of court-appraised value under İİK Art. 115.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac108-right-btn", type: "button", label: "Participate in UYAP Hotel Auction", },
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
 * PRACTICE-109: Hotel Franchising · International Brand Property Improvement Plan (PIP)
 * Layout Archetype: Tabular Property Improvement Plan (PIP) Capex Matrix (Table)
 */
export const PRACTICE_109_HOTEL_PIP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-109-international-hotel-operator-pip-audit",
  name: "Hotel Franchising · International Brand Property Improvement Plan (PIP)",
  kind: "section",
  root: {
    id: "prac109-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac109-container",
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
            id: "prac109-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac109-badge",
                type: "badge",
                text: "HOSPITALITY FRANCHISING · BRAND PIP AUDIT · LUXURY HOTEL STANDARDS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac109-heading",
                type: "heading",
                level: 2,
                text: "International Hotel Brand Property Improvement Plan (PIP) Matrix",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac109-sub",
                type: "text",
                text: "Navigating mandatory capex renovation requirements, brand standard inspections, and liquidated default damages for conversions to Marriott Luxury Collection, Accor, or IHG.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Tabular PIP Matrix */
          {
            id: "prac109-matrix-card",
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
                id: "prac109-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Header Row */
                  {
                    id: "prac109-th-row",
                    type: "grid",
                    columns: 12,
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "surface-muted" },
                      border: { radius: "sm" },
                    },
                    children: [
                      { id: "prac109-th-1", type: "text", text: "HOTEL OPERATIONAL ZONE", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac109-th-2", type: "text", text: "MANDATORY BRAND SPECIFICATION", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac109-th-3", type: "text", text: "COMPLETION TIMELINE", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac109-th-4", type: "text", text: "LEGAL DEFAULT REMEDY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 1: Guest Suites */
                  {
                    id: "prac109-row-1",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      { id: "prac109-r1-c1", type: "text", text: "Guest Suites & Marble Bathrooms", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac109-r1-c2", type: "text", text: "Acoustic STC 55 soundproofing, smart lighting, rain showers", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac109-r1-c3", type: "text", text: "Prior to Summer Season Opening (May 1)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac109-r1-c4", type: "text", text: "Daily liquidated damages + room off-market penalty.", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac109-div-1", type: "divider", style: { sizing: { width: "full" } } },

                  /* Row 2: Life Safety Systems */
                  {
                    id: "prac109-row-2",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      { id: "prac109-r2-c1", type: "text", text: "Fire & Life Safety (NFPA / Turkish Code)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac109-r2-c2", type: "text", text: "Automated addressable sprinklers, emergency diesel generator", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac109-r2-c3", type: "text", text: "Absolute prerequisite for flag hoisting", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac109-r2-c4", type: "text", text: "Immediate brand de-flagging & franchise termination.", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac109-footer-card",
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
                id: "prac109-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac109-fc-text", type: "text", text: "Audit PIP franchise obligations to prevent costly brand default notices.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac109-btn-pip", type: "button", label: "Commission Hotel PIP Audit", },
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
 * PRACTICE-110: Real Estate Hospitality · Branded Residences Rental Pool & HOA Governance
 * Layout Archetype: 4-Quadrant Executive Branded Residences Governance Matrix (2x2)
 */
export const PRACTICE_110_BRANDED_RESIDENCES_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-110-mixed-use-resort-branded-residences-hoa",
  name: "Real Estate Hospitality · Branded Residences Rental Pool & HOA Governance",
  kind: "section",
  root: {
    id: "prac110-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac110-container",
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
            id: "prac110-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac110-badge",
                type: "badge",
                text: "CONDOMINIUM LAW NO. 634 · BRANDED RESIDENCES · RENTAL POOL REVENUE ALLOCATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac110-heading",
                type: "heading",
                level: 2,
                text: "Branded Residences Rental Pool Governance & HOA Covenants",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac110-sub",
                type: "text",
                text: "Establishing condominium management plans (Yönetim Planı), hotel brand usage standards, owner blackout date covenants, and rental pool revenue splits for luxury coastal resort villas.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Quadrant 2x2 Matrix */
          {
            id: "prac110-matrix-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Quad 1: Management Plan */
              {
                id: "prac110-quad-1",
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
                    id: "prac10-q1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac110-q1-b", type: "badge", text: "PILLAR I · BINDING MANAGEMENT PLAN", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac110-q1-t", type: "heading", level: 3, text: "Yönetim Planı Tapu Registration", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac110-q1-d", type: "text", text: "Registering the bespoke Management Plan directly onto the Tapu Land Registry under Kat Mülkiyeti Kanunu Art. 28, binding all current and future villa buyers to hotel brand covenants.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quad 2: Rental Pool */
              {
                id: "prac110-quad-2",
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
                    id: "prac110-q2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac110-q2-b", type: "badge", text: "PILLAR II · RENTAL POOL STRUCTURE", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac110-q2-t", type: "heading", level: 3, text: "Net Revenue Split & FF&E Reserve", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac110-q2-d", type: "text", text: "Structuring standard 60/40 or 50/50 net room revenue distribution, deducting hotel management fees, marketing assessments, and mandatory 5% FF&E escrow reserve.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quad 3: Owner Usage */
              {
                id: "prac110-quad-3",
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
                    id: "prac110-q3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac110-q3-b", type: "badge", text: "PILLAR III · OWNER COVENANTS", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac110-q3-t", type: "heading", level: 3, text: "Peak Season Blackout Dates", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac110-q3-d", type: "text", text: "Restricting private owner occupancy to 60 days per calendar year (max 14 days in peak July/August) to protect resort inventory and maximize ADR returns.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quad 4: HOA Dispute Resolution */
              {
                id: "prac110-quad-4",
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
                    id: "prac110-q4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac110-q4-b", type: "badge", text: "PILLAR IV · CONDO EXPULSION", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac110-q4-t", type: "heading", level: 3, text: "Forced Devir & Dues Foreclosure", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac110-q4-d", type: "text", text: "Enforcing statutory aidat maintenance liens and forced share buyout lawsuits (KMK Art. 25 devir davası) against owners who persistently violate brand décor rules.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac110-footer-card",
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
                id: "prac110-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac110-fc-text", type: "text", text: "Structure a legally compliant branded residence scheme balancing developer, operator, and buyer interests.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac110-btn-hoa", type: "button", label: "Draft Branded Residences Plan", },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_22: ComponentDocument[] = [
  PRACTICE_106_HOTEL_GROUND_LEASE_DOCUMENT,
  PRACTICE_107_HOTEL_SPA_DOCUMENT,
  PRACTICE_108_DISTRESSED_RESORT_DOCUMENT,
  PRACTICE_109_HOTEL_PIP_DOCUMENT,
  PRACTICE_110_BRANDED_RESIDENCES_DOCUMENT,
];
