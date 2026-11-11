import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 3 (Templates #03, #09, #12, #23, #31)
 *
 * #03: 4-Tier Enterprise SaaS Ladder (pricing-03-four-tier-enterprise-ladder)
 * #09: Usage-Based Metered Tier Scale (pricing-09-usage-based-tier-scale)
 * #12: Per-User Seat Slider Shell (pricing-12-per-seat-slider-shell, visual-only)
 * #23: Multi-Variable Cloud Estimator Matrix (pricing-23-pricing-calculator-matrix, visual-only)
 * #31: One-Time Purchase Perpetual License (pricing-31-lifetime-perpetual-license)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_3: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #03: 4-Tier Enterprise SaaS Ladder
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-03-four-tier-enterprise-ladder",
    name: "4-Tier Enterprise SaaS Ladder",
    kind: "section",
    root: {
      id: "price03-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price03-main-stack",
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
              id: "price03-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price03-eyebrow",
                  type: "badge",
                  text: "PLANS & CAPABILITIES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price03-title",
                  type: "heading",
                  level: 2,
                  text: "Engineered for each inflection point",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price03-subtitle",
                  type: "text",
                  text: "From single developer sandboxes to mission-critical global infrastructures. Transparent stepping stones with zero hidden boundaries.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
                /* Billing pill toggle */
                {
                  id: "price03-cadence-pill",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "center",
                  wrap: false,
                  gap: "sm",
                  style: {
                    spacing: { paddingX: "sm", paddingY: "xs", marginY: "sm" },
                    border: { width: "thin", color: "border", radius: "full" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price03-pill-monthly",
                      type: "text",
                      text: "Monthly",
                      style: {
                        typography: { size: "sm", weight: "medium" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "price03-pill-annual",
                      type: "badge",
                      text: "Annual Billing · Save 20%",
                      style: {
                        color: { background: "primary", text: "primary" },
                        typography: { size: "sm", weight: "bold" },
                      },
                    },
                  ],
                },
              ],
            },

            /* 4-Column Stepped Grid */
            {
              id: "price03-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Tier 1: Community */
                {
                  id: "price03-col-1",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price03-t1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price03-t1-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price03-t1-name",
                              type: "text",
                              text: "Community",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price03-t1-price",
                              type: "heading",
                              level: 3,
                              text: "$0",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price03-t1-period",
                              type: "text",
                              text: "Free forever for individuals",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price03-t1-cta",
                          type: "button",
                          label: "Start Free",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price03-t1-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 3 active projects",
                            "Community Discord support",
                            "Public cloud regions",
                            "1 GB artifact storage",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 2: Developer */
                {
                  id: "price03-col-2",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
                      desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price03-t2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price03-t2-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price03-t2-name",
                              type: "text",
                              text: "Developer",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price03-t2-price",
                              type: "heading",
                              level: 3,
                              text: "$29",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price03-t2-period",
                              type: "text",
                              text: "per month billed annually",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price03-t2-cta",
                          type: "button",
                          label: "Start 14-Day Trial",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price03-t2-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited personal projects",
                            "Email ticket support (24h)",
                            "Automated daily backups",
                            "50 GB artifact storage",
                            "Custom domain mappings",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 3: Scale (RECOMMENDED / RAISED) */
                {
                  id: "price03-col-3",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
                      desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price03-t3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price03-t3-badge",
                          type: "badge",
                          text: "RECOMMENDED FOR TEAMS",
                          style: {
                            color: { background: "primary", text: "primary" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price03-t3-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price03-t3-name",
                              type: "text",
                              text: "Team Scale",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price03-t3-price",
                              type: "heading",
                              level: 3,
                              text: "$149",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price03-t3-period",
                              type: "text",
                              text: "per month billed annually",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price03-t3-cta",
                          type: "button",
                          label: "Start Team Trial",
                          style: {
                            color: { background: "primary", text: "primary" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price03-t3-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 15 team seats included",
                            "Priority Slack support channel",
                            "Multi-region failover",
                            "500 GB NVMe storage",
                            "SSO & Audit logs",
                            "Role-based access controls",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Tier 4: Enterprise Grid */
                {
                  id: "price03-col-4",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                      tablet: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                      desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price03-t4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price03-t4-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price03-t4-name",
                              type: "text",
                              text: "Enterprise Grid",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price03-t4-price",
                              type: "heading",
                              level: 3,
                              text: "Custom",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price03-t4-period",
                              type: "text",
                              text: "Tailored multi-cloud contracts",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price03-t4-cta",
                          type: "button",
                          label: "Contact Solutions",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price03-t4-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited seats & clusters",
                            "Dedicated technical account manager",
                            "99.99% uptime financial SLA",
                            "Custom VPC peering & BGP",
                            "SOC2 Type II & HIPAA BAA",
                            "Custom billing & PO invoicing",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Compliance & Trust Strip */
            {
              id: "price03-trust-strip",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "center",
              wrap: true,
              gap: "lg",
              style: {
                spacing: { paddingTop: "md" },
                border: { width: "thin", color: "border" },
              },
              children: [
                {
                  id: "price03-trust-1",
                  type: "badge",
                  text: "✓ SOC2 Type II Certified",
                  style: { color: { background: "surface-muted", text: "text-muted" } },
                },
                {
                  id: "price03-trust-2",
                  type: "badge",
                  text: "✓ HIPAA Ready with BAA",
                  style: { color: { background: "surface-muted", text: "text-muted" } },
                },
                {
                  id: "price03-trust-3",
                  type: "badge",
                  text: "✓ ISO 27001 Audited",
                  style: { color: { background: "surface-muted", text: "text-muted" } },
                },
                {
                  id: "price03-trust-4",
                  type: "badge",
                  text: "✓ 99.99% Financially-Backed SLA",
                  style: { color: { background: "surface-muted", text: "text-muted" } },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #09: Usage-Based Metered Tier Scale
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-09-usage-based-tier-scale",
    name: "Usage-Based Metered Tier Scale",
    kind: "section",
    root: {
      id: "price09-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price09-main-stack",
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
              id: "price09-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price09-eyebrow",
                  type: "badge",
                  text: "ZERO BASE COMMITMENT · PURE UTILITY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price09-title",
                  type: "heading",
                  level: 2,
                  text: "Metered Ingestion Rates",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price09-subtitle",
                  type: "text",
                  text: "Pay exclusively for operations processed. Rates automatically discount as your pipeline volume advances through thresholds.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Horizontal Volume Bracket Ledger */
            {
              id: "price09-brackets-container",
              type: "stack",
              direction: "column",
              alignment: "stretch",
              distribution: "start",
              wrap: false,
              gap: "md",
              style: { sizing: { width: "full" } },
              children: [
                /* Bracket 1: Baseline Ingestion */
                {
                  id: "price09-b1-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price09-b1-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price09-b1-col-range",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b1-tier-tag",
                              type: "badge",
                              text: "TIER 01 · STARTER RANGE",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price09-b1-range-text",
                              type: "text",
                              text: "0 to 10M Operations / mo",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price09-b1-col-rate",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b1-rate-val",
                              type: "heading",
                              level: 3,
                              text: "$0.00040",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price09-b1-rate-unit",
                              type: "text",
                              text: "per 1,000 executed queries (First 1M free)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price09-b1-col-specs",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b1-spec-1",
                              type: "text",
                              text: "Standard shared edge routers",
                              style: { typography: { size: "sm" } },
                            },
                            {
                              id: "price09-b1-spec-2",
                              type: "text",
                              text: "Community support SLA",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Bracket 2: Growth Volume */
                {
                  id: "price09-b2-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price09-b2-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price09-b2-col-range",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b2-tier-tag",
                              type: "badge",
                              text: "TIER 02 · ACCELERATED VOLUME",
                              style: { color: { background: "surface-muted", text: "text" } },
                            },
                            {
                              id: "price09-b2-range-text",
                              type: "text",
                              text: "10M to 100M Operations / mo",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price09-b2-col-rate",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b2-rate-val",
                              type: "heading",
                              level: 3,
                              text: "$0.00025",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price09-b2-rate-unit",
                              type: "text",
                              text: "per 1,000 executed queries (-37% marginal saving)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price09-b2-col-specs",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b2-spec-1",
                              type: "text",
                              text: "Global low-latency priority nodes",
                              style: { typography: { size: "sm" } },
                            },
                            {
                              id: "price09-b2-spec-2",
                              type: "text",
                              text: "Automated rate limiting alerts",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Bracket 3: Hyper-Scale Volume */
                {
                  id: "price09-b3-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price09-b3-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price09-b3-col-range",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b3-tier-tag",
                              type: "badge",
                              text: "TIER 03 · HYPER-SCALE",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price09-b3-range-text",
                              type: "text",
                              text: "100M+ Operations / mo",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price09-b3-col-rate",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b3-rate-val",
                              type: "heading",
                              level: 3,
                              text: "$0.00010",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price09-b3-rate-unit",
                              type: "text",
                              text: "per 1,000 executed queries (-75% maximum volume rebate)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price09-b3-col-specs",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                    },
                          },
                          children: [
                            {
                              id: "price09-b3-spec-1",
                              type: "text",
                              text: "Dedicated VPC peering & custom BGP",
                              style: { typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "price09-b3-spec-2",
                              type: "text",
                              text: "Custom reserved instance pooling & 99.999% SLA",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Overage Protection & API Action Bar */
            {
              id: "price09-action-bar",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "lg" },
                border: { width: "thin", color: "border", radius: "lg" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price09-action-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price09-action-info",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price09-guard-badge",
                          type: "badge",
                          text: "BUDGET GUARD ENABLED",
                          style: { color: { background: "surface-muted", text: "text" } },
                        },
                        {
                          id: "price09-guard-desc",
                          type: "text",
                          text: "Configure hard spending caps to eliminate unexpected billing spikes. Invoices generate post-usage on the 1st of every month.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price09-btn-group",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "end",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price09-btn-docs",
                          type: "button",
                          label: "Read Metering Specs",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                          },
                        },
                        {
                          id: "price09-btn-primary",
                          type: "button",
                          label: "Provision API Key",
                          style: {
                            color: { background: "primary", text: "primary" },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #12: Per-User Seat Slider Shell (visual-only)
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-12-per-seat-slider-shell",
    name: "Per-User Seat Slider Shell",
    kind: "section",
    root: {
      id: "price12-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price12-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price12-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price12-eyebrow",
                  type: "badge",
                  text: "COLLABORATIVE SEAT SCALING",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price12-title",
                  type: "heading",
                  level: 2,
                  text: "Team Seat Multiplier",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price12-subtitle",
                  type: "text",
                  text: "Transparent tier discounts apply automatically as your team headcount grows. Prorated by the second whenever teammates join or leave.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Interactive Seat Slider Shell Card */
            {
              id: "price12-slider-card",
              type: "card",
              element: "article",
              style: {
                spacing: { padding: "xl" },
                border: { width: "thin", color: "border", radius: "xl" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price12-slider-content",
                  type: "stack",
                  direction: "column",
                  alignment: "stretch",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    /* Seat count callout */
                    {
                      id: "price12-seat-hero-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "end",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      children: [
                        {
                          id: "price12-seat-indicator",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price12-seat-label",
                              type: "text",
                              text: "ACTIVE TEAM SEATS",
                              style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "price12-seat-number",
                              type: "heading",
                              level: 2,
                              text: "25 Seats",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price12-subtotal-indicator",
                          type: "stack",
                          direction: "column",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price12-rate-formula",
                              type: "text",
                              text: "$14 / seat / mo · Tier 2 Volume Discount (-22%)",
                              style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                            },
                            {
                              id: "price12-total-price",
                              type: "heading",
                              level: 3,
                              text: "$350 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                          ],
                        },
                      ],
                    },

                    /* Visual Slider Track Representation */
                    {
                      id: "price12-track-container",
                      type: "stack",
                      direction: "column",
                      alignment: "stretch",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        /* The bar with active fill */
                        {
                          id: "price12-track-bar",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "start",
                          wrap: false,
                          gap: "none",
                          style: {
                            spacing: { padding: "none" },
                            border: { width: "thin", color: "border", radius: "full" },
                            color: { background: "surface-muted" },
                            sizing: { height: "auto" },
                          },
                          children: [
                            {
                              id: "price12-track-filled",
                              type: "badge",
                              text: "● Drag to scale seats",
                              style: {
                                color: { background: "primary", text: "primary" },
                                sizing: { width: "auto" },
                                typography: { size: "sm", weight: "bold" },
                              },
                            },
                          ],
                        },
                        /* Scale labels */
                        {
                          id: "price12-track-labels",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "none",
                          children: [
                            {
                              id: "price12-step-1",
                              type: "text",
                              text: "1 seat ($18)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "price12-step-10",
                              type: "text",
                              text: "10 seats ($16)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "price12-step-25",
                              type: "text",
                              text: "25 seats ($14) [CURRENT]",
                              style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                            },
                            {
                              id: "price12-step-50",
                              type: "text",
                              text: "50 seats ($12)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "price12-step-100",
                              type: "text",
                              text: "100+ (Custom)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },

                    /* Inclusions Checklist */
                    {
                      id: "price12-inclusions-grid",
                      type: "grid",
                      columns: 12,
                      style: {
                        spacing: { paddingY: "md" },
                        border: { width: "thin", color: "border" },
                      },
                      children: [
                        {
                          id: "price12-inc-1",
                          type: "text",
                          text: "✓ Unlimited team workspaces & boards",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                    },
                          },
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price12-inc-2",
                          type: "text",
                          text: "✓ Centralized admin billing & invoices",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      desktop: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                    },
                          },
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price12-inc-3",
                          type: "text",
                          text: "✓ Role-based permissions (Admin, Member, Guest)",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                    },
                          },
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price12-inc-4",
                          type: "text",
                          text: "✓ SSO, SAML & SCIM directory synchronization",
                          layout: {
                            placement: {
                      mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                      desktop: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                    },
                          },
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },

                    /* Action buttons & footnote */
                    {
                      id: "price12-footer-action",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      children: [
                        {
                          id: "price12-reassurance",
                          type: "text",
                          text: "No credit card required for 14-day team trial · Instant invitation links",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price12-cta-button",
                          type: "button",
                          label: "Start 14-Day Trial with 25 Seats",
                          style: {
                            color: { background: "primary", text: "primary" },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #23: Multi-Variable Cloud Estimator Matrix (visual-only)
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-23-pricing-calculator-matrix",
    name: "Multi-Variable Cloud Estimator Matrix",
    kind: "section",
    root: {
      id: "price23-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price23-main-stack",
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
              id: "price23-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price23-eyebrow",
                  type: "badge",
                  text: "MULTI-DIMENSIONAL CLOUD ESTIMATOR",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price23-title",
                  type: "heading",
                  level: 2,
                  text: "Workload Cost Architecture Matrix",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price23-subtitle",
                  type: "text",
                  text: "Model compute, distributed NVMe storage, egress bandwidth, and VPC gateways simultaneously before provisioning clusters.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Split Layout: Controls on Left (7 cols), Receipt Card on Right (5 cols) */
            {
              id: "price23-split-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Left Column: Input Sliders / Dimension Controls (7 cols) */
                {
                  id: "price23-left-controls",
                  type: "stack",
                  direction: "column",
                  alignment: "stretch",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
                    },
                  },
                  children: [
                    /* Dimension 1: Compute Nodes */
                    {
                      id: "price23-dim-compute",
                      type: "card",
                      element: "div",
                      style: {
                        spacing: { padding: "md" },
                        border: { width: "thin", color: "border", radius: "lg" },
                        color: { background: "surface" },
                      },
                      children: [
                        {
                          id: "price23-compute-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "stretch",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price23-compute-head",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "between",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "price23-compute-title",
                                  type: "text",
                                  text: "Compute Instances (Dedicated vCPU)",
                                  style: { typography: { size: "sm", weight: "bold" } },
                                },
                                {
                                  id: "price23-compute-val",
                                  type: "badge",
                                  text: "8 Nodes (32 vCPU / 128 GB) · $480/mo",
                                  style: { color: { background: "surface-muted", text: "text" } },
                                },
                              ],
                            },
                            {
                              id: "price23-compute-desc",
                              type: "text",
                              text: "AMD EPYC 9654 bare-metal virtualization with dedicated NUMA isolation.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },

                    /* Dimension 2: Distributed NVMe */
                    {
                      id: "price23-dim-storage",
                      type: "card",
                      element: "div",
                      style: {
                        spacing: { padding: "md" },
                        border: { width: "thin", color: "border", radius: "lg" },
                        color: { background: "surface" },
                      },
                      children: [
                        {
                          id: "price23-storage-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "stretch",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price23-storage-head",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "between",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "price23-storage-title",
                                  type: "text",
                                  text: "Distributed NVMe Storage (Gen4)",
                                  style: { typography: { size: "sm", weight: "bold" } },
                                },
                                {
                                  id: "price23-storage-val",
                                  type: "badge",
                                  text: "2.5 TB Distributed · $175/mo",
                                  style: { color: { background: "surface-muted", text: "text" } },
                                },
                              ],
                            },
                            {
                              id: "price23-storage-desc",
                              type: "text",
                              text: "Triple-replicated Ceph NVMe block volumes with continuous snapshotting.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },

                    /* Dimension 3: Global Egress Bandwidth */
                    {
                      id: "price23-dim-egress",
                      type: "card",
                      element: "div",
                      style: {
                        spacing: { padding: "md" },
                        border: { width: "thin", color: "border", radius: "lg" },
                        color: { background: "surface" },
                      },
                      children: [
                        {
                          id: "price23-egress-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "stretch",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price23-egress-head",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "between",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "price23-egress-title",
                                  type: "text",
                                  text: "Global Egress Bandwidth",
                                  style: { typography: { size: "sm", weight: "bold" } },
                                },
                                {
                                  id: "price23-egress-val",
                                  type: "badge",
                                  text: "15 TB Egress / mo · $90/mo",
                                  style: { color: { background: "surface-muted", text: "text" } },
                                },
                              ],
                            },
                            {
                              id: "price23-egress-desc",
                              type: "text",
                              text: "Multi-homed Tier 1 transit across Cloudflare and Lumen backbones. Ingress is always free.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },

                    /* Dimension 4: Private VPC Gateway */
                    {
                      id: "price23-dim-vpc",
                      type: "card",
                      element: "div",
                      style: {
                        spacing: { padding: "md" },
                        border: { width: "thin", color: "border", radius: "lg" },
                        color: { background: "surface" },
                      },
                      children: [
                        {
                          id: "price23-vpc-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "stretch",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price23-vpc-head",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "between",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "price23-vpc-title",
                                  type: "text",
                                  text: "Dedicated HA VPC Gateway",
                                  style: { typography: { size: "sm", weight: "bold" } },
                                },
                                {
                                  id: "price23-vpc-val",
                                  type: "badge",
                                  text: "1 Active Pair · $45/mo",
                                  style: { color: { background: "surface-muted", text: "text" } },
                                },
                              ],
                            },
                            {
                              id: "price23-vpc-desc",
                              type: "text",
                              text: "WireGuard point-to-point mesh with hardware HSM cryptographic key storage.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Right Column: Workload Estimate Receipt (5 cols) */
                {
                  id: "price23-receipt-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface-muted" },
                  },
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
                      desktop: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
                    },
                  },
                  children: [
                    {
                      id: "price23-receipt-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "stretch",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price23-rcpt-header",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price23-rcpt-tag",
                              type: "badge",
                              text: "CONFIGURED SPEC RECEIPT",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price23-rcpt-title",
                              type: "heading",
                              level: 3,
                              text: "Estimated Monthly Spend",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                          ],
                        },

                        /* Line items list */
                        {
                          id: "price23-line-items",
                          type: "stack",
                          direction: "column",
                          alignment: "stretch",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price23-li-compute",
                              type: "text",
                              text: "• Compute (8 Dedicated Instances) — $480.00",
                              style: { typography: { size: "sm" } },
                            },
                            {
                              id: "price23-li-storage",
                              type: "text",
                              text: "• Storage (2.5 TB Distributed NVMe) — $175.00",
                              style: { typography: { size: "sm" } },
                            },
                            {
                              id: "price23-li-egress",
                              type: "text",
                              text: "• Bandwidth (15 TB Global Egress) — $90.00",
                              style: { typography: { size: "sm" } },
                            },
                            {
                              id: "price23-li-vpc",
                              type: "text",
                              text: "• Security (HA VPC Gateway Mesh) — $45.00",
                              style: { typography: { size: "sm" } },
                            },
                            {
                              id: "price23-li-subtotal",
                              type: "text",
                              text: "Gross Subtotal: $790.00 / mo",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                            {
                              id: "price23-li-rebate",
                              type: "text",
                              text: "Annual Reserved Pool Rebate (-20%): -$158.00",
                              style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                            },
                          ],
                        },

                        /* Grand total numeric */
                        {
                          id: "price23-total-box",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "none",
                          style: {
                            spacing: { paddingY: "sm" },
                            border: { width: "thin", color: "border" },
                          },
                          children: [
                            {
                              id: "price23-total-figure",
                              type: "heading",
                              level: 2,
                              text: "$632.00 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price23-total-hourly",
                              type: "text",
                              text: "Billed hourly at $0.877 / hr · Cancel or downscale anytime",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },

                        /* Action buttons */
                        {
                          id: "price23-rcpt-actions",
                          type: "stack",
                          direction: "column",
                          alignment: "stretch",
                          distribution: "start",
                          wrap: false,
                          gap: "sm",
                          children: [
                            {
                              id: "price23-btn-deploy",
                              type: "button",
                              label: "Deploy Cluster with this Spec",
                              style: {
                                color: { background: "primary", text: "primary" },
                                sizing: { width: "full" },
                              },
                            },
                            {
                              id: "price23-btn-export",
                              type: "button",
                              label: "Export Spec as Terraform / JSON",
                              style: {
                                color: { background: "surface", text: "text" },
                                border: { width: "thin", color: "border", radius: "md" },
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
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #31: One-Time Purchase Perpetual License
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-31-lifetime-perpetual-license",
    name: "One-Time Purchase Perpetual License",
    kind: "section",
    root: {
      id: "price31-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price31-main-stack",
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
              id: "price31-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price31-eyebrow",
                  type: "badge",
                  text: "NO SUBSCRIPTION FATIGUE · ZERO RENT",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price31-title",
                  type: "heading",
                  level: 2,
                  text: "Pay Once. Own Forever.",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price31-subtitle",
                  type: "text",
                  text: "Professional creative instruments should belong entirely to the craftsperson. No forced cloud sync, no recurring monthly fees, no license server phone-home.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2 Distinct Edition Certificates */
            {
              id: "price31-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Edition 1: Standard Perpetual License */
                {
                  id: "price31-ed1-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      desktop: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price31-ed1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price31-ed1-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price31-ed1-badge",
                              type: "badge",
                              text: "INDIVIDUAL CREATOR",
                              style: { color: { background: "surface-muted", text: "text" } },
                            },
                            {
                              id: "price31-ed1-title",
                              type: "text",
                              text: "Standard Perpetual License",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price31-ed1-price",
                              type: "heading",
                              level: 3,
                              text: "$129",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price31-ed1-terms",
                              type: "text",
                              text: "Single one-time payment · Own forever",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price31-ed1-cta",
                          type: "button",
                          label: "Buy Standard License ($129)",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price31-ed1-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Perpetual offline license key",
                            "Activation on 2 personal machines",
                            "All v4.x minor updates included forever",
                            "1 year of complimentary feature updates",
                            "Local offline documentation & manual",
                            "Standard email support",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Edition 2: Studio Master Suite [HIGHLIGHTED] */
                {
                  id: "price31-ed2-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      desktop: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price31-ed2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price31-ed2-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price31-ed2-badge",
                              type: "badge",
                              text: "STUDIO & PRO SUITE · BEST VALUE",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price31-ed2-title",
                              type: "text",
                              text: "Studio Master Perpetual License",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price31-ed2-price",
                              type: "heading",
                              level: 3,
                              text: "$249",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price31-ed2-terms",
                              type: "text",
                              text: "Single one-time payment · Own forever",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price31-ed2-cta",
                          type: "button",
                          label: "Buy Studio License ($249)",
                          style: {
                            color: { background: "primary", text: "primary" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price31-ed2-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Commercial studio perpetual license key",
                            "Activation on 5 workstations (macOS, Win, Linux)",
                            "All v4.x AND future v5.x major releases included",
                            "Native Apple Silicon & NVIDIA CUDA acceleration",
                            "Priority lossless DSP / Rendering plugins",
                            "Direct private Discord access to core authors",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Platform Support & Money-Back Guarantee Strip */
            {
              id: "price31-platform-strip",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "lg" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price31-strip-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price31-os-list",
                      type: "text",
                      text: "Cross-Platform: macOS (Apple Silicon & Intel) · Windows 11 (x64/ARM) · Linux (Universal AppImage)",
                      style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                    },
                    {
                      id: "price31-guarantee-badge",
                      type: "badge",
                      text: "30-Day Money-Back Guarantee",
                      style: { color: { background: "surface", text: "text" } },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
