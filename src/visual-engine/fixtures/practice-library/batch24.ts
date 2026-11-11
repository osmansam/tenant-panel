import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 24: Private Wealth & Estate Planning (#116–#120)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 116: Parchment Official Notarial Will (Resmi Vasiyetname) Workbench (7/5 Grid)
 * 117: Dual Comparative Split Screen (6/6: Reserved Portion vs Discretionary Estate)
 * 118: Tabular Inheritance & Transfer Tax (VİVK) Multi-Tier Rate Matrix (12-Col Table)
 * 119: Asymmetric 8/4 Foreign Trust Coastal Real Estate Holding Dossier
 * 120: 4-Quadrant Executive Marital Property Separation Agreement Matrix (2x2 Grid)
 * ============================================================================
 */

/**
 * PRACTICE-116: Private Wealth · Official Notarial Will (Resmi Vasiyetname) Workbench
 * Layout Archetype: Parchment Official Notarial Will (Resmi Vasiyetname) Workbench (7/5 Grid)
 */
export const PRACTICE_116_NOTARIAL_WILL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-116-turkish-testamentary-will-foreign-assets",
  name: "Private Wealth · Turkish Notarial Will & Cross-Border Estate Succession",
  kind: "section",
  root: {
    id: "prac116-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac116-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac116-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac116-badge",
                type: "badge",
                text: "TURKISH CIVIL CODE (TMK) ART. 532 · RESMİ VASİYETNAME · MÖHUK ART. 20",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac116-title",
                type: "heading",
                level: 2,
                text: "Cross-Border Testamentary Succession & Official Notarial Will",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac116-subtitle",
                type: "text",
                text: "Drafting sworn bilingual notarial wills executed before certified Turkish Notary Publics with two sworn witnesses, harmonizing coastal Bodrum/Antalya real estate with UK, EU, and Swiss home country estate plans.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 7 / 5 Workbench Grid */
          {
            id: "prac116-workbench-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): Bilingual Will Execution Dossier */
              {
                id: "prac116-left-card",
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
                    id: "prac116-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac116-l-badge", type: "badge", text: "NOTARIAL SWORN EXECUTION PROTOCOL", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac116-l-heading", type: "heading", level: 3, text: "Bilingual Testamentary Instrument Architecture", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac116-l-desc", type: "text", text: "Under Turkish Private International Law (MÖHUK Art. 20), succession to immovable property located in Turkey is strictly governed by Turkish law (lex rei sitae). Foreign holographic wills frequently face probate rejection in Turkish civil courts without a dedicated Turkish Notarial Will.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac116-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac116-p1", type: "text", text: "• Sworn Translation & Notary: Concurrently drafted in Turkish and testator's native language, read aloud before notary with official sworn court translator.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac116-p2", type: "text", text: "• Mental Capacity Medical Report: Same-day state hospital medical fitness report (Akli Meleke Raporu) to permanently defeat undue influence & testamentary incapacity claims.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac116-p3", type: "text", text: "• Notaries Union Central Registry: Electronic registration with Türkiye Noterler Birliği (TNB), ensuring instant discovery across 81 provinces upon probate opening.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Probate Safeguard Panel */
              {
                id: "prac116-right-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac116-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac116-r-b", type: "badge", text: "PROBATE DISCLOSURE DESK", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac116-r-t", type: "heading", level: 4, text: "Turkish Immovables & Bank Accounts", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac116-r-d", type: "text", text: "We coordinate with testator's London, Geneva, or New York private client solicitors to eliminate conflicting revocatory clauses and harmonize global estate liquidity.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac116-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac116-btn-will", type: "button", label: "Schedule Notarial Will Execution", },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac116-footer-card",
            type: "card",
            element: "div",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac116-footer-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac116-footer-txt", type: "text", text: "Protect your Turkish coastal villa and yacht holdings with a bulletproof testamentary will.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac116-btn-inquiry", type: "button", label: "Consult Private Wealth Partner", },
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
 * PRACTICE-117: Inheritance Disputes · Forced Heirship & Reduction Action (Tenkis Davası)
 * Layout Archetype: Dual Comparative Split Screen (6/6: Reserved Portion vs Discretionary Estate)
 */
export const PRACTICE_117_FORCED_HEIRSHIP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-117-forced-heirship-sakli-pay-reduction-action",
  name: "Estate Litigation · Forced Heirship (Saklı Pay) Protection & Tenkis Reduction Defense",
  kind: "section",
  root: {
    id: "prac117-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac117-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac117-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac117-badge",
                type: "badge",
                text: "TURKISH CIVIL CODE (TMK) ART. 505–560 · SAKLI PAY · TENKİS DAVASI",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac117-title",
                type: "heading",
                level: 2,
                text: "Statutory Reserved Shares (Saklı Pay) vs Freedom of Disposition",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac117-subtitle",
                type: "text",
                text: "Turkish inheritance law severely restricts testamentary freedom through mandatory forced heirship. We defend foreign testators and surviving spouses against aggressive Tenkis (reduction) and Muris Muvazaası (sham sale) claims.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual 6/6 Comparative Grid */
          {
            id: "prac117-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Forced Heirship Statutory Quotas */
              {
                id: "prac117-left-card",
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
                    id: "prac117-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac117-l-b", type: "badge", text: "MANDATORY HEIRS · TMK ART. 506", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac117-l-t", type: "heading", level: 3, text: "Protected Statutory Reserved Quotas", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac117-l-d", type: "text", text: "A testator cannot disinherit protected statutory heirs regardless of nationality or foreign governing law clauses when dealing with Turkish immovables.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac117-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac117-lp-1", type: "text", text: "• Children & Descendants: 1/2 of statutory intestate inheritance share.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac117-lp-2", type: "text", text: "• Surviving Spouse (with children): 100% of statutory share (1/4 total).", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac117-lp-3", type: "text", text: "• Surviving Spouse (with parents): 3/4 of statutory share.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac117-lp-4", type: "text", text: "• Surviving Parents: 1/4 of their statutory share.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Discretionary Asset Planning & Tenkis Defense */
              {
                id: "prac117-right-card",
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
                    id: "prac117-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac117-r-b", type: "badge", text: "WEALTH STRUCTURING · TENKİS SHIELD", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac117-r-t", type: "heading", level: 3, text: "Discretionary Portion Optimization", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac117-r-d", type: "text", text: "Strategic lifetime planning maximizes the disposable portion (Tasarruf Nispeti) and defeats post-mortem Tenkis clawback lawsuits by disgruntled relatives.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac117-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac117-rp-1", type: "text", text: "✓ Lifetime Renunciation Contracts (Miras Feragat Sözleşmesi) signed before notary.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac117-rp-2", type: "text", text: "✓ Usufruct Retained Transfers (İntifa Hakkı) to protect surviving partners.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac117-btn-tenkis", type: "button", label: "Analyze Estate Forced Heirship Exposure", },
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
 * PRACTICE-118: Inheritance Tax · Cross-Border Transfer Tax Rate Matrix (VİVK)
 * Layout Archetype: Tabular Inheritance & Transfer Tax (VİVK) Multi-Tier Rate Matrix (12-Col Table)
 */
export const PRACTICE_118_INHERITANCE_TAX_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-118-crossborder-inheritance-tax-veraset-intikal",
  name: "Tax & Private Wealth · Inheritance & Gift Tax (VİVK) Multi-Tier Bracket Schedule",
  kind: "section",
  root: {
    id: "prac118-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac118-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac118-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac118-badge",
                type: "badge",
                text: "LAW NO. 7338 · INHERITANCE AND TRANSFER TAX (VİVK) RATES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac118-title",
                type: "heading",
                level: 2,
                text: "Turkish Inheritance & Gift Tax Rates for Foreign Beneficiaries",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac118-subtitle",
                type: "text",
                text: "Turkey imposes graduated inheritance tax rates on all Turkish-situs assets (real estate, Turkish bank balances, superyachts) ranging from 1% to 10% for inheritances, and 10% to 30% for lifetime gratuitous transfers.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 12-Column Tabular Matrix Card */
          {
            id: "prac118-table-card",
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
                id: "prac118-tbl-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Table Header */
                  {
                    id: "prac118-th-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac118-th-1", type: "text", text: "TAXABLE ESTATE BRACKET", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac118-th-2", type: "text", text: "INHERITANCE RATE (MİRAS)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac118-th-3", type: "text", text: "GIFT RATE (İVAZSIZ İNTİKAL)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac118-th-4", type: "text", text: "PAYMENT INSTALLMENTS", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac118-div-1", type: "divider", style: { sizing: { width: "full" } } },

                  /* Row 1 */
                  {
                    id: "prac118-r1-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac118-r1-c1", type: "text", text: "First 1,700,000 TRY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac118-r1-c2", type: "text", text: "1%", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac118-r1-c3", type: "text", text: "10%", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac118-r1-c4", type: "text", text: "Semi-annually over 3 years (6 installments)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 2 */
                  {
                    id: "prac118-r2-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac118-r2-c1", type: "text", text: "Next 4,000,000 TRY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac118-r2-c2", type: "text", text: "3%", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac118-r2-c3", type: "text", text: "15%", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac118-r2-c4", type: "text", text: "Semi-annually over 3 years (6 installments)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 3 */
                  {
                    id: "prac118-r3-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac118-r3-c1", type: "text", text: "Portion Exceeding 31,400,000 TRY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac118-r3-c2", type: "text", text: "10% (Maximum Cap)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac118-r3-c3", type: "text", text: "30%", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac118-r3-c4", type: "text", text: "Title transfer blocked without clearance", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac118-footer-card",
            type: "card",
            element: "div",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac118-footer-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac118-footer-txt", type: "text", text: "Under VİVK Art. 12, title deed transfer (Tapu devri) is legally impossible without an official Tax Clearance Certificate (İlişik Kesme Belgesi).", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac118-btn-tax", type: "button", label: "Calculate Estate Tax Clearance Filing", },
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
 * PRACTICE-119: Asset Holding Structures · Foreign Trust & Foundation Coastal Real Estate
 * Layout Archetype: Asymmetric 8/4 Foreign Trust Coastal Real Estate Holding Dossier
 */
export const PRACTICE_119_FOREIGN_TRUST_HOLDING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-119-trust-and-foundation-property-holding-veil",
  name: "Private Wealth · Foreign Trust & Liechtenstein Stiftung Turkish Property Veil",
  kind: "section",
  root: {
    id: "prac119-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac119-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac119-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac119-badge",
                type: "badge",
                text: "OFFSHORE WEALTH · LAND REGISTRY LAW ART. 36 · MASAK UBO CONDUIT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac119-title",
                type: "heading",
                level: 2,
                text: "Structuring Foreign Trusts & Foundations for Aegean Real Estate",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac119-subtitle",
                type: "text",
                text: "Turkey is not a party to the Hague Trust Convention and does not recognize trusts as separate legal entities. We engineer compliant Turkish corporate holding conduits for family trusts and stiftungs.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Grid */
          {
            id: "prac119-asymm-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* 8 cols: Corporate Conduit Structure */
              {
                id: "prac119-dossier-card",
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
                    id: "prac119-dos-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac119-dos-badge", type: "badge", text: "CORPORATE VEIL ARCHITECTURE · TURKISH A.Ş. CONDUIT", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac119-dos-title", type: "heading", level: 3, text: "The Turkish Anonymous Company (A.Ş.) Conduit Solution", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac119-dos-desc", type: "text", text: "Because a foreign trust cannot hold direct legal title in the Turkish Land Registry (Tapu Sicili), attempts to register real estate directly in trustee names trigger severe individual tax and probate risks.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac119-dos-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac119-p1", type: "text", text: "• Tier 1: Foreign Trust / Stiftung (Jersey, Guernsey, Liechtenstein) holding shares in intermediate EU vehicle.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac119-p2", type: "text", text: "• Tier 2: Wholly owned Turkish Anonim Şirket (A.Ş.) holding clean registered title in Bodrum, Göcek, or Kalkan.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac119-p3", type: "text", text: "• Governor Security Clearance: Article 36 clearance under Land Registry Law No. 2644 for foreign-capitalized Turkish companies.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* 4 cols: Trustee Opinion Desk */
              {
                id: "prac119-side-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac119-side-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac119-sb-1", type: "badge", text: "INSTITUTIONAL TRUSTEES", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac119-st-1", type: "heading", level: 4, text: "Trustee Legal Opinion & Audit", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac119-sd-1", type: "text", text: "We provide formal legal capacity opinions to institutional trustees (Zedra, JTC, Sanne) verifying asset security and enforceability in Turkey.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac119-side-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac119-btn-structure", type: "button", label: "Commission Trustee Legal Opinion", },
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
 * PRACTICE-120: Matrimonial Property · Prenuptial Property Separation Matrix (Mal Ayrılığı)
 * Layout Archetype: 4-Quadrant Executive Marital Property Separation Agreement Matrix (2x2 Grid)
 */
export const PRACTICE_120_PRENUP_SEPARATION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-120-matrimonial-property-regime-prenup-shield",
  name: "Family Law & Private Wealth · High-Net-Worth Prenuptial Property Separation (Mal Ayrılığı)",
  kind: "section",
  root: {
    id: "prac120-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac120-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac120-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac120-badge",
                type: "badge",
                text: "TURKISH CIVIL CODE (TMK) ART. 202–243 · MAL AYRILIĞI REJİMİ",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac120-title",
                type: "heading",
                level: 2,
                text: "High-Net-Worth Prenuptial Property Separation (Mal Ayrılığı Rejimi)",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac120-subtitle",
                type: "text",
                text: "Under Turkish law, the statutory default regime is Participation in Acquired Property (50/50 division of assets gained during marriage). We negotiate official notarial prenuptial and postnuptial contracts establishing absolute property separation.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Quadrant Executive 2x2 Matrix Grid */
          {
            id: "prac120-quad-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Quadrant 1 */
              {
                id: "prac120-q1-card",
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
                    id: "prac120-q1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac120-q1-b", type: "badge", text: "PILLAR I · REAL ESTATE RINGFENCING", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac120-q1-h", type: "heading", level: 3, text: "Coastal Luxury Real Estate & Villa Portfolios", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac120-q1-p", type: "text", text: "All present and future real estate acquisitions in Bodrum, Çeşme, and Istanbul remain exclusive separate property (Kişisel Mal). Complete exclusion of residual value claims (Artık Değere Katılma Alacağı).", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quadrant 2 */
              {
                id: "prac120-q2-card",
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
                    id: "prac120-q2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac120-q2-b", type: "badge", text: "PILLAR II · MARINE & AVIATION", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac120-q2-h", type: "heading", level: 3, text: "Superyachts, Tenders & Private Aviation", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac120-q2-p", type: "text", text: "Vessels registered in Turkish National Ship Registry, TUGS, or offshore registries (Marshall Islands / Cayman) remain entirely exempt from marital equalization audits and injunction freezes.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quadrant 3 */
              {
                id: "prac120-q3-card",
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
                    id: "prac120-q3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac120-q3-b", type: "badge", text: "PILLAR III · COMMERCIAL STAKES", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac120-q3-h", type: "heading", level: 3, text: "Operating Companies & Hospitality Dividend Yields", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac120-q3-p", type: "text", text: "Under TMK Art. 221, dividend earnings from separate property naturally become acquired property unless expressly waived. Our contracts explicitly waive dividend sharing, protecting hotel and venture equity.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quadrant 4 */
              {
                id: "prac120-q4-card",
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
                    id: "prac120-q4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac120-q4-b", type: "badge", text: "PILLAR IV · CROSS-BORDER ENFORCEABILITY", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac120-q4-h", type: "heading", level: 3, text: "Multi-Jurisdiction Hague Harmonization", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac120-q4-p", type: "text", text: "Executed in strict conformity with Turkish notarization formalities while satisfying UK Radmacher fairness rules and US UPAA disclosure standards to guarantee worldwide enforceability.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac120-btn-prenup", type: "button", label: "Draft Notarial Separation Agreement", },
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

export const PRACTICE_LIBRARY_BATCH_24: ComponentDocument[] = [
  PRACTICE_116_NOTARIAL_WILL_DOCUMENT,
  PRACTICE_117_FORCED_HEIRSHIP_DOCUMENT,
  PRACTICE_118_INHERITANCE_TAX_DOCUMENT,
  PRACTICE_119_FOREIGN_TRUST_HOLDING_DOCUMENT,
  PRACTICE_120_PRENUP_SEPARATION_DOCUMENT,
];
