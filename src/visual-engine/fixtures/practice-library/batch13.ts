import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 13: Tenancy & Property Disputes (#61–#65)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 61: High-Density Side-by-Side Rent Cap Split (6/6 split: Formula vs Claims Desk)
 * 62: Asymmetric 70/30 Eviction Undertaking Dossier (8/4 split: Statutory analysis + Execution Desk)
 * 63: Tabular Kat Mülkiyeti Aidat Matrix Table (Hairline gazette table)
 * 64: Dual Comparative Landlocked Easement Split (6/6 split: Necessity test vs Valuation escrow)
 * 65: 3-Stage Shared Title Pre-Emption Rail (Horizontal linear stepper rail)
 * ============================================================================
 */

/**
 * PRACTICE-61: Tenancy Law · CPI (TÜFE) Legal Rent Cap & Rent Determination Desk
 * Layout Archetype: High-Density Side-by-Side Rent Cap Split (6/6 split)
 */
export const PRACTICE_61_TENANCY_RENT_CAP_CALCULATOR_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-61-tenancy-rent-cap-calculator",
  name: "Statutory 12-Month TÜFE Rent Cap & 5-Year Readjustment Split",
  kind: "section",
  root: {
    id: "prac61-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac61-container",
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
            id: "prac61-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac61-badge",
                type: "badge",
                text: "TENANCY LAW · TURKISH CODE OF OBLIGATIONS (TBK ART. 344) & MANDATORY MEDIATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac61-heading",
                type: "heading",
                level: 2,
                text: "12-Month TÜFE CPI Rent Cap & 5-Year Judicial Reset Split",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac61-sub",
                type: "text",
                text: "Navigating residential villa and commercial hospitality lease escalations along the Aegean coast: statutory inflation indexing vs 5-year market readjustment lawsuits (Kira Tespit Davası).",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Comparative Split (6/6) */
          {
            id: "prac61-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Statutory Annual Formula (6-col) */
              {
                id: "prac61-col-formula",
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
                    id: "prac61-formula-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac61-formula-tag",
                        type: "badge",
                        text: "TRACK 1: ANNUAL STATUTORY ESCALATION",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac61-formula-title",
                        type: "heading",
                        level: 3,
                        text: "12-Month Average TÜFE CPI Inflation Ceiling",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac61-formula-desc",
                        type: "text",
                        text: "Under TBK Art. 344/1, residential lease renewals cannot exceed the official 12-month average TÜFE rate announced by TÜİK. Any lease clause demanding higher increases (e.g. fixed Euro indexing or 100% markup) is null and void by operation of law.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac61-formula-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac61-formula-stat-box",
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
                            id: "prac61-formula-stat-label",
                            type: "text",
                            text: "COMMERCIAL LEASE FREEDOM EXCEPTION",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac61-formula-stat-val",
                            type: "text",
                            text: "TBK Art. 344/4 Contractual Freedom for Corporate Lessees",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac61-formula-stat-note",
                            type: "text",
                            text: "Hotel and commercial boutique tenants may contractually peg rent increases to FX currency (USD/EUR) or agreed revenue formulas.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac61-formula-btn",
                        type: "button",
                        label: "Audit Lease Escalation Legality",
                        style: { sizing: { width: "full" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: 5-Year Judicial Rent Determination (6-col) */
              {
                id: "prac61-col-judicial",
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
                    id: "prac61-judicial-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac61-judicial-tag",
                        type: "badge",
                        text: "TRACK 2: 5-YEAR MARKET RESET LAWSUIT",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac61-judicial-title",
                        type: "heading",
                        level: 3,
                        text: "Kira Tespit Davası Fair Market Re-Appraisal",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac61-judicial-desc",
                        type: "text",
                        text: "Once a tenancy surpasses 5 continuous years, the landlord is entitled to petition the Sulh Hukuk Mahkemesi to reset rent to prevailing open-market villa comparables, irrespective of past TÜFE inflation caps.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac61-judicial-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac61-judicial-stat-box",
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
                            id: "prac61-judicial-stat-label",
                            type: "text",
                            text: "JUDICIAL EQUITABLE DISCOUNT (HAKKANİYET İNDİRİMİ)",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac61-judicial-stat-val",
                            type: "text",
                            text: "10% – 20% Judicial Discount for Existing Tenants",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac61-judicial-stat-note",
                            type: "text",
                            text: "Court expert appraisal is subjected to statutory tenant loyalty reduction before judicial ruling becomes binding.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac61-judicial-btn",
                        type: "button",
                        label: "Initiate Mandatory Mediation Filing",
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
 * PRACTICE-62: Eviction Undertaking (Tahliye Taahhütnamesi) Dissection & Defense Dossier
 * Layout Archetype: Asymmetric 70/30 Legal Dossier with Document Blueprint (8/4 split)
 */
export const PRACTICE_62_EVICTION_UNDERTAKING_AUDIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-62-eviction-undertaking-audit",
  name: "Tahliye Taahhütnamesi Dissection & Statutory Defenses Dossier",
  kind: "section",
  root: {
    id: "prac62-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac62-container",
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
            id: "prac62-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac62-badge",
                type: "badge",
                text: "EVICTION ENFORCEMENT · TBK ART. 352 & EXECUTION AND BANKRUPTCY LAW (İİK ART. 272)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac62-heading",
                type: "heading",
                level: 2,
                text: "Tahliye Taahhütnamesi Validity Audit & Invalidation Defenses",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac62-sub",
                type: "text",
                text: "Landlords enforce written undertakings of eviction via expedited execution orders. We dissect document validity against supreme court precedents (Yargıtay İçtihatları) to shield tenants against summary removal.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Blueprint Split */
          {
            id: "prac62-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Statutory Invalidation Defenses (8-col) */
              {
                id: "prac62-col-dossier",
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
                    id: "prac62-dossier-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac62-dossier-tag",
                        type: "badge",
                        text: "GROUNDS FOR STATUTORY INVALIDATION",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac62-dossier-title",
                        type: "heading",
                        level: 3,
                        text: "Three Fatal Defects in Eviction Undertakings",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac62-dossier-desc",
                        type: "text",
                        text: "Under Turkish jurisprudence, an eviction undertaking is strictly invalid if signed prior to or simultaneously with the initial lease contract. We forensic-audit ink age, date stamps, and spousal signatures to challenge enforcement.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac62-dossier-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac62-dossier-points",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac62-dp1",
                            type: "text",
                            text: "• Defect 1 · Simultaneous Signing with Lease: If executed on the day of lease creation, duress is presumed and the undertaking is void ab initio.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac62-dp2",
                            type: "text",
                            text: "• Defect 2 · Blank Date Abuse (Beyaza İmza): Undertakings signed with blank eviction dates filled in later by landlords can be contested with forensic handwriting analysis.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac62-dp3",
                            type: "text",
                            text: "• Defect 3 · Family Home Shield (Aile Konutu Şerhi TMK 194): If the property is a matrimonial home, an undertaking signed without the explicit written consent of the non-tenant spouse is legally invalid.",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Execution Office 30-Day Emergency Desk (4-col) */
              {
                id: "prac62-col-desk",
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
                    id: "prac62-desk-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac62-desk-badge",
                        type: "badge",
                        text: "7-DAY OBJECTION WINDOW",
                        style: { color: { background: "surface", text: "text" } },
                      },
                      {
                        id: "prac62-desk-title",
                        type: "heading",
                        level: 4,
                        text: "İcra Emri Summary Objection",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac62-desk-desc",
                        type: "text",
                        text: "Upon receipt of Form No. 14 Eviction Order (Tahliye Emri), the tenant has exactly 7 days to lodge formal objections at the Execution Directorate. Failure to object allows physical eviction within 15 days.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac62-desk-btn",
                        type: "button",
                        label: "File Emergency Execution Objection",
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
 * PRACTICE-63: Kat Mülkiyeti Statutory Enforcement Notice (Villa Aidat & Common Maintenance Matrix)
 * Layout Archetype: Tabular Gazette Matrix with Hairline Rows
 */
export const PRACTICE_63_AIDAT_MAINTENANCE_LIEN_ENFORCEMENT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-63-aidat-maintenance-lien-enforcement",
  name: "Kat Mülkiyeti Aidat Dispute & Statutory Hypothec Registry Table",
  kind: "section",
  root: {
    id: "prac63-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac63-container",
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
            id: "prac63-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac63-badge",
                type: "badge",
                text: "CONDOMINIUM LAW · CONDOMINIUM PROPERTY ACT NO. 634 (KMK ART. 20) & DEBT RECOVERY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac63-heading",
                type: "heading",
                level: 2,
                text: "Villa Compound Aidat Allocation & Statutory Hypothec Registry",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac63-sub",
                type: "text",
                text: "In luxury gated communities and coastal villa sites (Bodrum, Göcek, Kalkan), maintenance fee defaults trigger statutory 5% monthly penalty interest and immediate legal hypothec (Kanuni İpotek) registration against the unit title deed.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Gazette Tabular Matrix */
          {
            id: "prac63-table-card",
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
                id: "prac63-table-stack",
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
                    id: "prac63-th",
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
                        id: "prac63-th-c1",
                        type: "text",
                        text: "EXPENSE ALLOCATION CATEGORY",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-th-c2",
                        type: "text",
                        text: "STATUTORY APPORTIONMENT (KMK 20)",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-th-c3",
                        type: "text",
                        text: "DEFAULT PENALTY RATE",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-th-c4",
                        type: "text",
                        text: "LEGAL REMEDY & SANCTION",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Row 1: Site Personnel */
                  {
                    id: "prac63-r1",
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
                        id: "prac63-r1-c1",
                        type: "text",
                        text: "Security & Grounds Personnel",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac63-r1-c2",
                        type: "text",
                        text: "Equal division per unit (Eşit Paylaşım)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-r1-c3",
                        type: "text",
                        text: "5% monthly statutory interest",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac63-r1-c4",
                        type: "badge",
                        text: "İcra Takibi & Bank Blockage",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 2: Common Facilities */
                  {
                    id: "prac63-r2",
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
                        id: "prac63-r2-c1",
                        type: "text",
                        text: "Infinity Pool & Private Marina Dock",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac63-r2-c2",
                        type: "text",
                        text: "Proportional to land share (Arsa Payı)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-r2-c3",
                        type: "text",
                        text: "Compounded monthly interest",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac63-r2-c4",
                        type: "badge",
                        text: "Service Disconnection Notice",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 3: Luxury Renovation & Capex */
                  {
                    id: "prac63-r3",
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
                        id: "prac63-r3-c1",
                        type: "text",
                        text: "Luxury Capex & Aesthetic Facelift",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac63-r3-c2",
                        type: "text",
                        text: "Requires 4/5 or unanimous board vote",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-r3-c3",
                        type: "text",
                        text: "Non-approving owners exempt if luxury",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac63-r3-c4",
                        type: "badge",
                        text: "KMK Board Resolution Appeal",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 4: Default Hypothec */
                  {
                    id: "prac63-r4",
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
                        id: "prac63-r4-c1",
                        type: "text",
                        text: "Delinquent Aidat Arrears (> 3 Months)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac63-r4-c2",
                        type: "text",
                        text: "Enforceable by Site Management Board",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-r4-c3",
                        type: "text",
                        text: "Cumulative principal + 5% monthly fee",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac63-r4-c4",
                        type: "badge",
                        text: "Kanuni İpotek Deed Registration",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Footer */
                  {
                    id: "prac63-footer",
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
                        id: "prac63-footer-info",
                        type: "text",
                        text: "Statutory hypothecs take priority over subsequent mortgages upon Title Deed registration.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac63-footer-btn",
                        type: "button",
                        label: "Register Legal Hypothec Against Unit",
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
 * PRACTICE-64: Landlocked Coastal Parcel Right-of-Way (Geçit Hakkı) Split Screen
 * Layout Archetype: Dual Comparative Split Screen (6/6: Necessity Test vs Valuation Escrow)
 */
export const PRACTICE_64_RIGHT_OF_WAY_EASEMENT_DISPUTE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-64-right-of-way-easement-dispute",
  name: "Landlocked Coastal Parcel Right-of-Way (Geçit Hakkı) Split Screen",
  kind: "section",
  root: {
    id: "prac64-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac64-container",
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
            id: "prac64-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac64-badge",
                type: "badge",
                text: "PROPERTY JURISPRUDENCE · TURKISH CIVIL CODE (TMK ART. 747) RIGHT OF WAY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac64-heading",
                type: "heading",
                level: 2,
                text: "Landlocked Coastal Parcel: Mandatory Right of Way (Geçit Hakkı)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac64-sub",
                type: "text",
                text: "Parcels in rugged Aegean coves without direct public road access are legally entitled to mandatory access easements over neighboring land upon fair compensation payment.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Split Screen (6/6) */
          {
            id: "prac64-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Judicial Necessity Test (7-col) */
              {
                id: "prac64-col-necessity",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac64-nec-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac64-nec-tag",
                        type: "badge",
                        text: "CRITERION 1: STATUTORY NECESSITY TEST",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac64-nec-title",
                        type: "heading",
                        level: 3,
                        text: "Complete Lack of Public Road Connection",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac64-nec-desc",
                        type: "text",
                        text: "Under TMK Art. 747, the applicant must establish that their property has no connection to the public highway network or that existing access is wholly inadequate. The court selects the neighbor whose parcel suffers the least economic detriment.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac64-nec-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac64-nec-box",
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
                            id: "prac64-nec-box-label",
                            type: "text",
                            text: "MINIMAL DAMAGE DOCTRINE",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac64-nec-box-val",
                            type: "text",
                            text: "Courts Will Not Cut Through Productive Olive Groves or Buildings",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac64-nec-box-note",
                            type: "text",
                            text: "Access easement route is restricted to the boundary perimeter and minimum width necessary for vehicular passage.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac64-nec-btn",
                        type: "button",
                        label: "Commission Cadastral Route Feasibility Survey",
                        style: { sizing: { width: "full" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Court Valuation Escrow (5-col) */
              {
                id: "prac64-col-escrow",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac64-esc-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac64-esc-tag",
                        type: "badge",
                        text: "CRITERION 2: COMPENSATION & REGISTRATION",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac64-esc-title",
                        type: "heading",
                        level: 3,
                        text: "Geçit Bedeli Deposition & Tapu Inscription",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac64-esc-desc",
                        type: "text",
                        text: "Before judgment is rendered, a court expert committee evaluates the land value of the easement corridor plus severance damage to the burdened parcel. The claimant deposits this sum into court escrow, whereupon the easement is inscribed on both Title Deeds.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac64-esc-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac64-esc-box",
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
                            id: "prac64-esc-box-label",
                            type: "text",
                            text: "PERPETUAL IN REM RIGHTS",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac64-esc-box-val",
                            type: "text",
                            text: "Permanent Real Estate Easement Attached to Parcel",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac64-esc-box-note",
                            type: "text",
                            text: "Right of way survives property sale and binds all future purchasers of both tracts indefinitely.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac64-esc-btn",
                        type: "button",
                        label: "File Zorunlu Geçit Hakkı Petition",
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
 * PRACTICE-65: Shared Title Pre-Emption Right (Şufa Hakkı) 3-Stage Process Rail
 * Layout Archetype: 3-Stage Horizontal Linear Process Rail
 */
export const PRACTICE_65_PREEMPTION_RIGHT_SUFA_HAKKI_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-65-preemption-right-sufa-hakki",
  name: "Shared Title Pre-Emption Right (Şufa Hakkı) 3-Stage Process Rail",
  kind: "section",
  root: {
    id: "prac65-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac65-container",
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
            id: "prac65-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac65-badge",
                type: "badge",
                text: "CO-OWNERSHIP JURISPRUDENCE · TURKISH CIVIL CODE (TMK ART. 732) LEGAL PRE-EMPTION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac65-heading",
                type: "heading",
                level: 2,
                text: "Shared Title Pre-Emption Right (Şufa Hakkı) 3-Stage Rail",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac65-sub",
                type: "text",
                text: "When a co-owner in a shared title deed (Hisseli Tapu) sells their share to a third-party stranger, other co-owners hold a statutory right to seize the share at the deed-declared price.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 3-Stage Horizontal Linear Process Rail */
          {
            id: "prac65-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Stage 1 */
              {
                id: "prac65-stage-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac65-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac65-s1-num",
                        type: "badge",
                        text: "STAGE 01",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac65-s1-title",
                        type: "heading",
                        level: 4,
                        text: "Third-Party Sale & Notarial Notice",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac65-s1-desc",
                        type: "text",
                        text: "The buyer or seller must formally notify all other co-owners via Sworn Notary Notice (Noter İhtarnamesi). Service triggers the strict 3-month statutory countdown.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac65-stage-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac65-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac65-s2-num",
                        type: "badge",
                        text: "STAGE 02",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                      {
                        id: "prac65-s2-title",
                        type: "heading",
                        level: 4,
                        text: "3-Month / 2-Year Lawsuit Filing",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac65-s2-desc",
                        type: "text",
                        text: "Co-owners must file an Önalım Davası at the Civil Court of Peace. If no notary notice was served, the absolute statute of repose extends to 2 full years from deed registration.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac65-stage-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac65-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac65-s3-num",
                        type: "badge",
                        text: "STAGE 03",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac65-s3-title",
                        type: "heading",
                        level: 4,
                        text: "Deed Price Escrow & Title Deposition",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac65-s3-desc",
                        type: "text",
                        text: "Claimant deposits the declared title deed sales price plus official transfer taxes into the court escrow bank. Court ruling cancels the stranger’s deed and vests title in co-owner.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Bottom Advisory Bar */
          {
            id: "prac65-bottom-bar",
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
                id: "prac65-bottom-txt",
                type: "text",
                text: "Purchasing a share in an undivided coastal parcel without signed co-owner waivers (Feragatname) carries severe title loss risk.",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac65-bottom-btn",
                type: "button",
                label: "Audit Co-Ownership Pre-Emption Risk",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_13: ComponentDocument[] = [
  PRACTICE_61_TENANCY_RENT_CAP_CALCULATOR_DOCUMENT,
  PRACTICE_62_EVICTION_UNDERTAKING_AUDIT_DOCUMENT,
  PRACTICE_63_AIDAT_MAINTENANCE_LIEN_ENFORCEMENT_DOCUMENT,
  PRACTICE_64_RIGHT_OF_WAY_EASEMENT_DISPUTE_DOCUMENT,
  PRACTICE_65_PREEMPTION_RIGHT_SUFA_HAKKI_DOCUMENT,
];
