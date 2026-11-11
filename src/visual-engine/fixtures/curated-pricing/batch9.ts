import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 9 (Templates #29, #33, #41, #42, #43)
 *
 * #29: Annual Contract Commitment & Core Licensing (pricing-29-annual-contract-only)
 * #33: Multi-Tier Professional Advisory Package Bundle (pricing-33-tier-service-bundle)
 * #41: Academic & Campus-Wide Licensing Schedule (pricing-41-education-student-campus)
 * #42: Venture Accelerator & Founder Tier Staircase (pricing-42-startup-accelerator-perk)
 * #43: Full-Scale Enterprise Multi-Capability Matrix Grid (pricing-43-enterprise-matrix-grid)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_9: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #29: Annual Contract Commitment & Core Licensing
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-29-annual-contract-only",
    name: "Annual Contract Commitment & Core Licensing",
    kind: "section",
    root: {
      id: "price29-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price29-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "5xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price29-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price29-eyebrow",
                  type: "badge",
                  text: "ENTERPRISE COMMITTED CORE LICENSING",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price29-title",
                  type: "heading",
                  level: 2,
                  text: "Annual Contract Architecture: Guaranteed Price Locks",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price29-subtitle",
                  type: "text",
                  text: "Strictly annual and multi-year licensing. We do not offer month-to-month contracts so we can guarantee dedicated engineering capacity, fixed renewal rates, and enterprise SLAs.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Tier Annual Contract Grid */
            {
              id: "price29-contract-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Tier 1: Commercial Core Annual */
                {
                  id: "price29-tier-commercial",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price29-com-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price29-com-badge",
                          type: "badge",
                          text: "12-MONTH FIXED TERM",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price29-com-title",
                          type: "heading",
                          level: 3,
                          text: "Commercial Core License",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price29-com-price",
                          type: "text",
                          text: "$14,000 / year",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price29-com-breakdown",
                          type: "text",
                          text: "Equivalent to $1,166/mo (Billed annually via corporate invoice)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price29-com-desc",
                          type: "text",
                          text: "Dedicated production cluster license for mid-market compliance teams requiring locked procurement pricing.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price29-com-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Annual Core License: Up to 50 enterprise seats included",
                            "Contract Term: 12-month fixed commitment with auto-lock",
                            "Payment Terms: Net-30 invoicing, ACH or wire transfer",
                            "Compliance Pack: SOC2 Type II, ISO 27001, and DPA included",
                            "Support SLA: 4-hour business hour response guarantee",
                            "Data Residency: Dedicated single-tenant regional storage",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price29-com-btn",
                          type: "button",
                          label: "Request Commercial Order Form",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "md" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 2: Multi-Year Enterprise Core (Highlighted) */
                {
                  id: "price29-tier-multiyear",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price29-ent-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price29-ent-badge",
                          type: "badge",
                          text: "36-MONTH LOCK • RECOMMENDED ENTERPRISE",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price29-ent-title",
                          type: "heading",
                          level: 3,
                          text: "Enterprise Multi-Year Core",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price29-ent-price",
                          type: "text",
                          text: "$36,000 / year",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price29-ent-breakdown",
                          type: "text",
                          text: "3-Year Multi-Year Contract ($108,000 total commitment, zero price increase)",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price29-ent-desc",
                          type: "text",
                          text: "Global corporate deployment with 36-month inflation immunity, dedicated TAM, and custom legal redlines.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price29-ent-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Annual Core License: Unlimited corporate subsidiary seats",
                            "Contract Term: 36-month multi-year rate freeze guarantee",
                            "Legal Redlines: Custom MSA, SLA, and security addenda accepted",
                            "Deployment: Private Cloud VPC or On-Premise Air-Gapped",
                            "Support SLA: 15-minute 24/7/365 critical incident response",
                            "Executive Enablement: Dedicated Technical Account Manager",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price29-ent-btn",
                          type: "button",
                          label: "Initiate Multi-Year Procurement MSA",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "md" },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Procurement Memorandum */
            {
              id: "price29-memo-card",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "md" },
                color: { background: "surface-muted" },
                sizing: { width: "full", maxWidth: "4xl" },
              },
              children: [
                {
                  id: "price29-memo-text",
                  type: "text",
                  text: "Procurement Assurance: All annual contracts feature guaranteed renewal caps (max 3% upon expiration), vendor security questionnaires completed within 48 hours, and automated certificates of insurance (COI).",
                  style: {
                    typography: { size: "sm", align: "center" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #33: Multi-Tier Professional Advisory Package Bundle
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-33-tier-service-bundle",
    name: "Multi-Tier Professional Advisory Package Bundle",
    kind: "section",
    root: {
      id: "price33-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price33-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price33-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price33-eyebrow",
                  type: "badge",
                  text: "FIXED-SCOPE STRATEGIC ENGAGEMENTS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price33-title",
                  type: "heading",
                  level: 2,
                  text: "Partner-Led Advisory Packages: Guaranteed Deliverables",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price33-subtitle",
                  type: "text",
                  text: "Zero open-ended hourly billing. Every strategic package includes defined milestone scopes, executive briefing deliverables, and senior partner oversight.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Package Grid */
            {
              id: "price33-bundle-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Package 1: Discovery Diagnostic */
                {
                  id: "price33-pkg-diagnostic",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price33-diag-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price33-diag-badge",
                          type: "badge",
                          text: "2-WEEK SPRINT",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price33-diag-title",
                          type: "heading",
                          level: 3,
                          text: "Diagnostic Audit",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price33-diag-price",
                          type: "text",
                          text: "$8,500",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price33-diag-terms",
                          type: "text",
                          text: "Fixed engagement fee (50% booking / 50% delivery)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price33-diag-desc",
                          type: "text",
                          text: "Deep-dive operational, architectural, and security benchmark report identifying friction points and risk vectors.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price33-diag-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Comprehensive systems & code audit",
                            "8 stakeholder executive interviews",
                            "Risk vulnerability matrix & heat map",
                            "Prioritized 90-day remediation roadmap",
                            "60-minute board presentation deck",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price33-diag-btn",
                          type: "button",
                          label: "Reserve Diagnostic Sprint",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Package 2: Architecture Sprint (Highlighted) */
                {
                  id: "price33-pkg-architecture",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price33-arch-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price33-arch-badge",
                          type: "badge",
                          text: "MOST REQUESTED • 6-WEEK PROGRAM",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price33-arch-title",
                          type: "heading",
                          level: 3,
                          text: "Architecture Sprint",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price33-arch-price",
                          type: "text",
                          text: "$22,500",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price33-arch-terms",
                          type: "text",
                          text: "Milestone tranche: 33% kick-off, 33% midterm, 34% sign-off",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price33-arch-desc",
                          type: "text",
                          text: "End-to-end technical restructuring blueprint with production reference implementations and team enablement.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price33-arch-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Full target state architecture specification",
                            "Production Docker & Terraform reference code",
                            "Data pipeline & disaster recovery topology",
                            "Weekly partner-led architectural reviews",
                            "Staff enablement workshops (3 sessions)",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price33-arch-btn",
                          type: "button",
                          label: "Book Architecture Sprint",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Package 3: Enterprise Transformation */
                {
                  id: "price33-pkg-transformation",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 4, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price33-trans-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price33-trans-badge",
                          type: "badge",
                          text: "12-WEEK COMPREHENSIVE OVERHAUL",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price33-trans-title",
                          type: "heading",
                          level: 3,
                          text: "Full Transformation",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price33-trans-price",
                          type: "text",
                          text: "$58,000",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price33-trans-terms",
                          type: "text",
                          text: "Four monthly milestone tranches ($14.5k / month)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price33-trans-desc",
                          type: "text",
                          text: "Executive embedded advisory overseeing complete legacy system overhaul, staff training, and go-live hypercare.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price33-trans-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Dedicated Partner + Principal Lead allocation",
                            "Direct engineering co-development sprints",
                            "C-level executive & board progress memos",
                            "Vendor selection & RFP management",
                            "60 days post-launch hypercare monitoring",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price33-trans-btn",
                          type: "button",
                          label: "Initiate Transformation Consultation",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Guarantee Strip */
            {
              id: "price33-guarantee-card",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "md" },
                color: { background: "surface-muted" },
                sizing: { width: "full", maxWidth: "4xl" },
              },
              children: [
                {
                  id: "price33-guarantee-text",
                  type: "text",
                  text: "Advisory Quality Guarantee: All engagements are led directly by Named Partners, not handed off to junior associates. Milestone deliverable acceptance criteria are explicitly documented in your statement of work.",
                  style: {
                    typography: { size: "sm", align: "center" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #41: Academic & Campus-Wide Licensing Schedule
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-41-education-student-campus",
    name: "Academic & Campus-Wide Licensing Schedule",
    kind: "section",
    root: {
      id: "price41-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price41-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price41-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price41-eyebrow",
                  type: "badge",
                  text: "HIGHER EDUCATION & RESEARCH INITIATIVE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price41-title",
                  type: "heading",
                  level: 2,
                  text: "Academic Licensing: From Individual Scholar to Campus Site",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price41-subtitle",
                  type: "text",
                  text: "Subsidized technology for accredited degree-granting colleges and universities. Verified .edu domain authentication with FERPA-compliant privacy protections.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Tier Academic Grid */
            {
              id: "price41-campus-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Tier 1: Student Scholar ($0) */
                {
                  id: "price41-tier-student",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price41-stu-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price41-stu-badge",
                          type: "badge",
                          text: "VERIFIED .EDU STUDENT",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price41-stu-title",
                          type: "heading",
                          level: 3,
                          text: "Student Scholar",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price41-stu-price",
                          type: "text",
                          text: "$0 / free",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price41-stu-eligibility",
                          type: "text",
                          text: "Active enrollment in accredited degree program",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price41-stu-desc",
                          type: "text",
                          text: "Full individual access for student coursework, senior capstone projects, and thesis research.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price41-stu-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Full core platform feature access",
                            "Up to 5 active personal project workspaces",
                            "10GB cloud compute & dataset storage",
                            "Community academic forum support",
                            "Instant SSO with university Google/MS account",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price41-stu-btn",
                          type: "button",
                          label: "Verify Student .EDU Email ($0)",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 2: Faculty & Lab ($18/seat/mo) */
                {
                  id: "price41-tier-faculty",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price41-fac-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price41-fac-badge",
                          type: "badge",
                          text: "MOST POPULAR FOR LABS",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price41-fac-title",
                          type: "heading",
                          level: 3,
                          text: "Faculty & Research Lab",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price41-fac-price",
                          type: "text",
                          text: "$18 / seat / mo",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price41-fac-eligibility",
                          type: "text",
                          text: "Billed annually ($216/seat/yr, 60% academic grant)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price41-fac-desc",
                          type: "text",
                          text: "Departmental research cohorts, shared laboratory compute clusters, and graduate teaching assistant seats.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price41-fac-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Shared lab workspace & role-based permissions",
                            "500GB shared research storage tier",
                            "Grant funding invoice & credit card support",
                            "Exportable citations & DOI dataset links",
                            "Priority academic email support (8h SLA)",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price41-fac-btn",
                          type: "button",
                          label: "Start Lab Subscription",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 3: Campus Site License ($12,500/yr) */
                {
                  id: "price41-tier-campus",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 4, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price41-cam-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price41-cam-badge",
                          type: "badge",
                          text: "INSTITUTION-WIDE DEPLOYMENT",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price41-cam-title",
                          type: "heading",
                          level: 3,
                          text: "Campus Site License",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price41-cam-price",
                          type: "text",
                          text: "$12,500 / year",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price41-cam-eligibility",
                          type: "text",
                          text: "Unlimited campus-wide seats (Students + Faculty + IT)",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price41-cam-desc",
                          type: "text",
                          text: "Turnkey institutional licensing covering all undergraduate, graduate, and faculty bodies with centralized IT provisioning.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price41-cam-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited university-wide user seats",
                            "Campus Shibboleth / InCommon SAML SSO",
                            "FERPA compliance certificate & institutional DPA",
                            "University Purchase Order & Net-60 payment",
                            "Dedicated Higher Ed Customer Success Director",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price41-cam-btn",
                          type: "button",
                          label: "Request Institutional Campus PO",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Compliance Footnote */
            {
              id: "price41-compliance-card",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "md" },
                color: { background: "surface-muted" },
                sizing: { width: "full", maxWidth: "4xl" },
              },
              children: [
                {
                  id: "price41-compliance-text",
                  type: "text",
                  text: "Student Privacy & Compliance: Full adherence to the Family Educational Rights and Privacy Act (FERPA). Student data is never monetized, indexed, or shared with third parties for commercial advertising.",
                  style: {
                    typography: { size: "sm", align: "center" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #42: Venture Accelerator & Founder Tier Staircase
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-42-startup-accelerator-perk",
    name: "Venture Accelerator & Founder Tier Staircase",
    kind: "section",
    root: {
      id: "price42-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price42-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price42-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price42-eyebrow",
                  type: "badge",
                  text: "ACCELERATOR PARTNER & FOUNDER LAUNCHPAD",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price42-title",
                  type: "heading",
                  level: 2,
                  text: "Venture Staircase: Grow with Capital-Efficient Perks",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price42-subtitle",
                  type: "text",
                  text: "Non-dilutive platform subsidies for venture-backed founders. Partnered with Y Combinator, Techstars, a16z, and 50+ leading global accelerators.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Tier Accelerator Grid */
            {
              id: "price42-stair-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Tier 1: Seed Cohort ($0 for 12 mos) */
                {
                  id: "price42-tier-seed",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price42-sd-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price42-sd-badge",
                          type: "badge",
                          text: "$100K CREDIT SPONSORSHIP",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price42-sd-title",
                          type: "heading",
                          level: 3,
                          text: "Seed Cohort",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price42-sd-price",
                          type: "text",
                          text: "$0 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price42-sd-eligibility",
                          type: "text",
                          text: "First 12 months free (Funded under $2M seed round)",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price42-sd-desc",
                          type: "text",
                          text: "Maximum runway preservation for early-stage teams building MVP to first commercial enterprise traction.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price42-sd-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "$100,000 platform compute credits",
                            "Up to 10 full engineering team seats",
                            "Priority founder Slack channel with CTO",
                            "Demo Day readiness & scalability review",
                            "Zero overage penalty lock for 12 months",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price42-sd-btn",
                          type: "button",
                          label: "Apply with Accelerator Code ($0)",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 2: Series A Scale ($299/mo, 70% Off) */
                {
                  id: "price42-tier-seriesa",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price42-sa-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price42-sa-badge",
                          type: "badge",
                          text: "70% FOUNDER DISCOUNT",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price42-sa-title",
                          type: "heading",
                          level: 3,
                          text: "Series A Scale",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price42-sa-price",
                          type: "text",
                          text: "$299 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price42-sa-eligibility",
                          type: "text",
                          text: "Standard commercial rate: $999/mo (Save $8,400/yr)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price42-sa-desc",
                          type: "text",
                          text: "High-throughput infrastructure for startups scaling commercial revenue and onboarding institutional customers.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price42-sa-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 30 team seats & multiple environments",
                            "10,000,000 monthly event throughput",
                            "SOC2 compliance audit logging enabled",
                            "Dedicated technical solutions architect",
                            "4-hour critical production SLA response",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price42-sa-btn",
                          type: "button",
                          label: "Claim Series A Discount ($299/mo)",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 3: Growth Venture ($899/mo, 40% Off) */
                {
                  id: "price42-tier-growth",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 4, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price42-gro-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price42-gro-badge",
                          type: "badge",
                          text: "SERIES B+ GROWTH STEP",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price42-gro-title",
                          type: "heading",
                          level: 3,
                          text: "Growth Venture",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price42-gro-price",
                          type: "text",
                          text: "$899 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price42-gro-eligibility",
                          type: "text",
                          text: "Standard commercial rate: $1,499/mo (Save $7,200/yr)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price42-gro-desc",
                          type: "text",
                          text: "Enterprise-grade scale for mature scaleups expanding into international markets with heavy security demands.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price42-gro-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited team seats across all branches",
                            "SAML SSO & SCIM directory automation",
                            "Dedicated database read replica cluster",
                            "Custom data retention & export pipelines",
                            "1-hour 24/7 emergency incident response",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price42-gro-btn",
                          type: "button",
                          label: "Select Growth Venture Tier",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Venture Partner Strip */
            {
              id: "price42-partner-card",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "md" },
                color: { background: "surface-muted" },
                sizing: { width: "full", maxWidth: "4xl" },
              },
              children: [
                {
                  id: "price42-partner-text",
                  type: "text",
                  text: "Partner Accelerator Verification: Validated instantly using your portfolio batch email or partner perk code. Verified partners include Y Combinator, Techstars, 500 Global, Entrepreneur First, and Antler.",
                  style: {
                    typography: { size: "sm", align: "center" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #43: Full-Scale Enterprise Multi-Capability Matrix Grid
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-43-enterprise-matrix-grid",
    name: "Full-Scale Enterprise Multi-Capability Matrix Grid",
    kind: "section",
    root: {
      id: "price43-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price43-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price43-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price43-eyebrow",
                  type: "badge",
                  text: "MISSION-CRITICAL GOVERNANCE & INFRASTRUCTURE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price43-title",
                  type: "heading",
                  level: 2,
                  text: "Enterprise Multi-Capability Governance Matrix",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price43-subtitle",
                  type: "text",
                  text: "A side-by-side capability evaluation for CISOs, Security Architects, and Procurement Directors. Calibrated to regulatory strictness, isolated tenant hosting, and compliance certifications.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Tier Enterprise Grid */
            {
              id: "price43-matrix-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Tier 1: Dedicated Cloud */
                {
                  id: "price43-tier-dedicated",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price43-ded-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price43-ded-badge",
                          type: "badge",
                          text: "SINGLE-TENANT CLOUD",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price43-ded-title",
                          type: "heading",
                          level: 3,
                          text: "Dedicated Cloud",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price43-ded-price",
                          type: "text",
                          text: "$2,400 / mo",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price43-ded-terms",
                          type: "text",
                          text: "Billed annually ($28,800/yr invoiced Net-30)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price43-ded-desc",
                          type: "text",
                          text: "Isolated single-tenant infrastructure with customer-managed encryption keys and standard compliance auditing.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price43-ded-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Isolated database & application pods",
                            "BYOK KMS envelope encryption",
                            "SOC2 Type II & ISO 27001 reports",
                            "SAML 2.0 / Okta / Azure AD integration",
                            "99.95% uptime SLA with financial credits",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price43-ded-btn",
                          type: "button",
                          label: "Select Dedicated Cloud",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 2: Sovereign VPC (Highlighted) */
                {
                  id: "price43-tier-sovereign",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price43-sov-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price43-sov-badge",
                          type: "badge",
                          text: "REGULATED BANKING & HEALTHCARE",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price43-sov-title",
                          type: "heading",
                          level: 3,
                          text: "Sovereign VPC",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price43-sov-price",
                          type: "text",
                          text: "$6,500 / mo",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price43-sov-terms",
                          type: "text",
                          text: "Billed annually ($78,000/yr with Master Services Agreement)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price43-sov-desc",
                          type: "text",
                          text: "Deployed directly inside your AWS GovCloud or Azure Government VPC with strict residency controls.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price43-sov-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Full VPC Peering & AWS PrivateLink",
                            "BAA HIPAA & PCI-DSS Level 1 compliance",
                            "Zero egress to external public internet",
                            "Automated vulnerability penetration audits",
                            "99.99% uptime SLA with 15-minute response",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price43-sov-btn",
                          type: "button",
                          label: "Schedule Sovereign Architecture Review",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 3: Air-Gapped Defense Custom RFP */
                {
                  id: "price43-tier-defense",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 4, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price43-def-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price43-def-badge",
                          type: "badge",
                          text: "DEFENSE & CRITICAL INFRASTRUCTURE",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price43-def-title",
                          type: "heading",
                          level: 3,
                          text: "Air-Gapped Defense",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price43-def-price",
                          type: "text",
                          text: "Custom Quote",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price43-def-terms",
                          type: "text",
                          text: "Perpetual license or multi-year defense agency contract",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price43-def-desc",
                          type: "text",
                          text: "Completely disconnected on-premise installation designed for intelligence, defense, and high-security utility SCADA networks.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price43-def-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "100% air-gapped offline binary distribution",
                            "ITAR, FedRAMP High & CMMC Level 3 ready",
                            "US-citizen security-cleared support engineers",
                            "Source code escrow & independent static review",
                            "On-site deployment & hardware verification",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price43-def-btn",
                          type: "button",
                          label: "Initiate Defense RFP / SCIF Scoping",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                            spacing: { paddingY: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Compliance Shield Certifications */
            {
              id: "price43-cert-card",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "md" },
                color: { background: "surface-muted" },
                sizing: { width: "full", maxWidth: "4xl" },
              },
              children: [
                {
                  id: "price43-cert-text",
                  type: "text",
                  text: "Regulatory Accreditations: Independently audited for SOC 1 Type II, SOC 2 Type II, SOC 3, ISO 27001:2022, FedRAMP Moderate In-Process, and HIPAA Security Rule compliance.",
                  style: {
                    typography: { size: "sm", align: "center" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
