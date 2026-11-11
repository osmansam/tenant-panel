import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 1 (Templates #01, #04, #10, #34, #44)
 *
 * #01: Classic 3-Tier SaaS Subscription (pricing-01-classic-three-tier)
 * #04: Single-Plan All-Inclusive SaaS (pricing-04-single-plan-all-inclusive)
 * #10: Pay-As-You-Go Raw Infrastructure (pricing-10-pay-as-you-go-infra)
 * #34: Executive Consulting Retainer Ledger (pricing-34-consulting-retainer-ledger)
 * #44: Full-Fledged Feature Comparison Matrix Table (pricing-44-comparison-matrix-table)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_1: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #01: Classic 3-Tier SaaS Subscription
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-01-classic-three-tier",
    name: "Classic 3-Tier SaaS Subscription",
    kind: "section",
    root: {
      id: "price01-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price01-main-stack",
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
              id: "price01-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price01-eyebrow",
                  type: "badge",
                  text: "TRANSPARENT VALUE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price01-title",
                  type: "heading",
                  level: 2,
                  text: "Simple, Predictable Tiered Pricing",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price01-subtitle",
                  type: "text",
                  text: "Choose the ideal capacity for your team. Upgrade or downgrade at any time.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
                /* Cadence incentive pill */
                {
                  id: "price01-cadence-pill",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "center",
                  wrap: false,
                  gap: "sm",
                  style: { spacing: { marginTop: "sm" } },
                  children: [
                    {
                      id: "price01-cadence-label",
                      type: "text",
                      text: "Annual Billing:",
                      style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                    },
                    {
                      id: "price01-cadence-discount",
                      type: "badge",
                      text: "SAVE 20% WITH ANNUAL PLANS",
                      style: {
                        color: { background: "primary", text: "background" },
                        typography: { size: "sm", weight: "bold" },
                      },
                    },
                  ],
                },
              ],
            },

            /* 3-Column Equal Grid */
            {
              id: "price01-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Plan 1: Starter */
                {
                  id: "price01-card-starter",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "price01-starter-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price01-starter-badge",
                          type: "badge",
                          text: "STARTER",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price01-starter-price-row",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price01-starter-price",
                              type: "text",
                              text: "$29",
                              style: { typography: { size: "4xl", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price01-starter-cadence",
                              type: "text",
                              text: "/ month",
                              style: { typography: { size: "base" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price01-starter-desc",
                          type: "text",
                          text: "For solo builders and prototyping small customer campaigns.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price01-starter-btn",
                          type: "button",
                          label: "Start 14-Day Free Trial",
                          href: "#trial-starter",
                          style: { sizing: { width: "full" }, spacing: { marginY: "xs" } },
                        },
                        {
                          id: "price01-starter-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 3 active visual sites",
                            "10,000 monthly visual renders",
                            "All core design primitives",
                            "Standard community support",
                            "Automated CI/CD schema validation",
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Plan 2: Professional (Elevated Recommended Plan) */
                {
                  id: "price01-card-pro",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "primary", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price01-pro-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price01-pro-badge",
                          type: "badge",
                          text: "MOST POPULAR CHOICE",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price01-pro-price-row",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price01-pro-price",
                              type: "text",
                              text: "$79",
                              style: { typography: { size: "4xl", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price01-pro-cadence",
                              type: "text",
                              text: "/ month",
                              style: { typography: { size: "base" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price01-pro-desc",
                          type: "text",
                          text: "For fast-growing product teams deploying localized marketing experiences.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price01-pro-btn",
                          type: "button",
                          label: "Start 14-Day Free Trial",
                          href: "#trial-pro",
                          style: { sizing: { width: "full" }, spacing: { marginY: "xs" } },
                        },
                        {
                          id: "price01-pro-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited active visual sites",
                            "150,000 monthly visual renders",
                            "All 50 curated section templates",
                            "Custom domain mapping & SSL",
                            "Role-based workspace permissions",
                            "Priority SLA email & Slack support",
                            "Zero runtime bundle overhead",
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Plan 3: Enterprise */
                {
                  id: "price01-card-enterprise",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "price01-enterprise-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price01-enterprise-badge",
                          type: "badge",
                          text: "ENTERPRISE SCALE",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price01-enterprise-price-row",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price01-enterprise-price",
                              type: "text",
                              text: "$199",
                              style: { typography: { size: "4xl", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price01-enterprise-cadence",
                              type: "text",
                              text: "/ month",
                              style: { typography: { size: "base" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price01-enterprise-desc",
                          type: "text",
                          text: "For multinational fleets requiring SSO, audit logs, and sovereign SLAs.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price01-enterprise-btn",
                          type: "button",
                          label: "Contact Enterprise Sales",
                          href: "#contact-sales",
                          style: { sizing: { width: "full" }, spacing: { marginY: "xs" } },
                        },
                        {
                          id: "price01-enterprise-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited production renders",
                            "SAML 2.0 SSO & Okta / SCIM sync",
                            "Audit trail & immutable logs",
                            "Custom private component registries",
                            "99.99% Uptime runtime SLA",
                            "Dedicated Solutions Architect",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Reassurance Guarantee Footnote */
            {
              id: "price01-guarantee-text",
              type: "text",
              text: "All plans include a 14-day risk-free trial · No credit card required · Instant 1-click cancellation",
              style: {
                typography: { size: "sm" },
                color: { text: "text-muted" },
              },
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #04: Single-Plan All-Inclusive SaaS
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-04-single-plan-all-inclusive",
    name: "Single-Plan All-Inclusive SaaS",
    kind: "section",
    root: {
      id: "price04-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price04-main-stack",
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
              id: "price04-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price04-eyebrow",
                  type: "badge",
                  text: "ZERO COMPLICATION",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price04-title",
                  type: "heading",
                  level: 2,
                  text: "One Transparent Price. Everything Included.",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price04-subtitle",
                  type: "text",
                  text: "No artificial feature gates, no locked enterprise tiers, and no surprise add-on charges.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* Centered Monumental Spotlight Card */
            {
              id: "price04-card",
              type: "card",
              element: "article",
              style: {
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "2xl" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price04-card-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "center",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    {
                      id: "price04-pass-badge",
                      type: "badge",
                      text: "UNIVERSAL ALL-ACCESS MEMBERSHIP",
                      style: {
                        color: { background: "background", text: "text" },
                        typography: { size: "sm", weight: "bold" },
                      },
                    },
                    /* Big Display Price */
                    {
                      id: "price04-price-row",
                      type: "stack",
                      direction: "row",
                      alignment: "end",
                      distribution: "center",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price04-price-val",
                          type: "text",
                          text: "$49",
                          style: { typography: { size: "6xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price04-price-cadence",
                          type: "text",
                          text: "/ month all-in",
                          style: { typography: { size: "xl" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price04-pass-summary",
                      type: "text",
                      text: "Unlimited access across all current and future capabilities with zero seat limits.",
                      style: { typography: { size: "base" }, color: { text: "text-muted" } },
                    },
                    {
                      id: "price04-cta-btn",
                      type: "button",
                      label: "Get Instant All-Inclusive Access",
                      href: "#checkout-all-inclusive",
                      style: { sizing: { width: "full", maxWidth: "md" } },
                    },

                    /* Interior Divider */
                    {
                      id: "price04-divider",
                      type: "divider",
                      style: {
                        border: { color: "text-muted", width: "thin" },
                        sizing: { width: "full" },
                      },
                    },

                    /* What's Included 2-Column Grid */
                    {
                      id: "price04-features-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                      children: [
                        {
                          id: "price04-feat-col1",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                          children: [
                            {
                              id: "price04-list-1",
                              type: "list",
                              marker: "check",
                              items: [
                                "Unlimited production websites",
                                "Full access to all 50 template suites",
                                "Deterministic schema AST engine",
                                "Zero runtime bundle overhead",
                              ],
                            },
                          ],
                        },
                        {
                          id: "price04-feat-col2",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                          children: [
                            {
                              id: "price04-list-2",
                              type: "list",
                              marker: "check",
                              items: [
                                "Automated CI/CD validation suites",
                                "Unlimited team collaborators",
                                "Direct priority engineer support",
                                "All future feature drops included",
                              ],
                            },
                          ],
                        },
                      ],
                    },

                    /* Guarantee Seal */
                    {
                      id: "price04-guarantee-seal",
                      type: "badge",
                      text: "🛡️ 30-DAY UNCONDITIONAL MONEY-BACK GUARANTEE",
                      style: {
                        color: { background: "background", text: "text" },
                        typography: { size: "sm", weight: "bold" },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #10: Pay-As-You-Go Raw Infrastructure
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-10-pay-as-you-go-infra",
    name: "Pay-As-You-Go Raw Infrastructure",
    kind: "section",
    root: {
      id: "price10-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price10-main-stack",
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
              id: "price10-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price10-eyebrow",
                  type: "badge",
                  text: "TRUE UTILITY PRICING",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price10-title",
                  type: "heading",
                  level: 2,
                  text: "Pay by the Second. Scale to Zero.",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price10-subtitle",
                  type: "text",
                  text: "Zero base subscription fees, zero idle instance penalties, and no upfront commitments.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* Terminal Rate Console Card */
            {
              id: "price10-console-card",
              type: "card",
              element: "article",
              style: {
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "xl" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price10-console-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    /* Window Bar */
                    {
                      id: "price10-window-bar",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: false,
                      gap: "sm",
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price10-dots",
                          type: "text",
                          text: "● ● ●",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price10-term-title",
                          type: "text",
                          text: "cloud-runtime — metered compute rates",
                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                        },
                      ],
                    },

                    /* 3-Part Resource Rate Grid */
                    {
                      id: "price10-rates-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                      children: [
                        {
                          id: "price10-rate-cpu",
                          type: "card",
                          element: "div",
                          layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "lg" },
                            spacing: { padding: "lg" },
                            color: { background: "background" },
                          },
                          children: [
                            {
                              id: "price10-cpu-stack",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price10-cpu-label",
                                  type: "badge",
                                  text: "COMPUTE / VCPU",
                                  style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm" } },
                                },
                                {
                                  id: "price10-cpu-val",
                                  type: "text",
                                  text: "$0.000014",
                                  style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                                },
                                {
                                  id: "price10-cpu-sub",
                                  type: "text",
                                  text: "per vCPU-second (1ms increments)",
                                  style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "price10-rate-ram",
                          type: "card",
                          element: "div",
                          layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "lg" },
                            spacing: { padding: "lg" },
                            color: { background: "background" },
                          },
                          children: [
                            {
                              id: "price10-ram-stack",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price10-ram-label",
                                  type: "badge",
                                  text: "MEMORY / RAM",
                                  style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm" } },
                                },
                                {
                                  id: "price10-ram-val",
                                  type: "text",
                                  text: "$0.0000035",
                                  style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                                },
                                {
                                  id: "price10-ram-sub",
                                  type: "text",
                                  text: "per GB-second allocated",
                                  style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "price10-rate-egress",
                          type: "card",
                          element: "div",
                          layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "lg" },
                            spacing: { padding: "lg" },
                            color: { background: "background" },
                          },
                          children: [
                            {
                              id: "price10-egress-stack",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price10-egress-label",
                                  type: "badge",
                                  text: "GLOBAL EGRESS",
                                  style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm" } },
                                },
                                {
                                  id: "price10-egress-val",
                                  type: "text",
                                  text: "$0.02",
                                  style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                                },
                                {
                                  id: "price10-egress-sub",
                                  type: "text",
                                  text: "per GB (First 100GB free monthly)",
                                  style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },

                    /* Code block execution proof */
                    {
                      id: "price10-code",
                      type: "code",
                      language: "bash",
                      showLanguage: false,
                      showCopy: false,
                      wrap: true,
                      code: "$ ozmi deploy --autoscale=true\n✓ Deployed serverless function: edge-render-engine\n✓ Idle concurrency: 0 instances ($0.00/hr when idle)\n✓ Scale-out reaction: <8ms to 1,000 instances",
                    },

                    /* Action and incentives */
                    {
                      id: "price10-action-row",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price10-deploy-btn",
                          type: "button",
                          label: "Deploy Service in 30 Seconds",
                          href: "#deploy-cli",
                        },
                        {
                          id: "price10-credit-badge",
                          type: "badge",
                          text: "🎁 $100 FREE PLATFORM CREDITS INCLUDED",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
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
  // TEMPLATE #34: Executive Consulting Retainer Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-34-consulting-retainer-ledger",
    name: "Executive Consulting Retainer Ledger",
    kind: "section",
    root: {
      id: "price34-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price34-main-stack",
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
              id: "price34-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price34-eyebrow",
                  type: "badge",
                  text: "EXECUTIVE STRATEGIC ADVISORY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price34-title",
                  type: "heading",
                  level: 2,
                  text: "Bespoke Counsel for High-Growth Leaders",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price34-subtitle",
                  type: "text",
                  text: "Direct advisory sparring with former unicorn operators and corporate board directors.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* 2-Column Asymmetric Ledger Grid */
            {
              id: "price34-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Left Column: Advisor Pedigree & Provenance (Span 5) */
                {
                  id: "price34-col-pedigree",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price34-pedigree-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price34-counsel-title",
                          type: "heading",
                          level: 3,
                          text: "Principal Strategic Counsel",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price34-counsel-bio",
                          type: "text",
                          text: "Led by Alistair Vance, former Senior Partner at Bain & Co, 3x Tech Unicorn Board Member with $4.2B in cumulative exit realizations.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price34-quote",
                          type: "quote",
                          quote:
                            "Executive leverage isn't about working more hours. It's having crystalline clarity at the three critical inflection points your company faces this quarter.",
                          author: "Alistair Vance",
                          role: "Managing Principal, Vance Strategic",
                          style: { typography: { size: "sm" }, color: { text: "text" } },
                        },
                        {
                          id: "price34-badges-row",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price34-badge-1",
                              type: "badge",
                              text: "M&A READINESS & DUE DILIGENCE",
                              style: { color: { background: "background", text: "text" }, typography: { size: "sm" } },
                            },
                            {
                              id: "price34-badge-2",
                              type: "badge",
                              text: "ENTERPRISE SOFTWARE GO-TO-MARKET",
                              style: { color: { background: "background", text: "text" }, typography: { size: "sm" } },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Right Column: Retainer Tiers (Span 7) */
                {
                  id: "price34-col-retainers",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "2xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "price34-tiers-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "lg",
                      children: [
                        /* Retainer Tier 1 */
                        {
                          id: "price34-tier1-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price34-t1-badge",
                              type: "badge",
                              text: "QUARTERLY STRATEGIC SPAR",
                              style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "price34-t1-price-row",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "between",
                              wrap: true,
                              gap: "sm",
                              style: { sizing: { width: "full" } },
                              children: [
                                {
                                  id: "price34-t1-rate",
                                  type: "text",
                                  text: "$6,500 / month",
                                  style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                                },
                                {
                                  id: "price34-t1-btn",
                                  type: "button",
                                  label: "Request Engagement Scope",
                                  href: "#inquire-t1",
                                },
                              ],
                            },
                            {
                              id: "price34-t1-desc",
                              type: "text",
                              text: "4 hours monthly dedicated 1-on-1 strategic advisory + Asynchronous voice-note channel + Board meeting deck audits.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },

                        /* Divider */
                        {
                          id: "price34-tier-divider",
                          type: "divider",
                          style: {
                            border: { color: "text-muted", width: "thin" },
                            sizing: { width: "full" },
                          },
                        },

                        /* Retainer Tier 2 */
                        {
                          id: "price34-tier2-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price34-t2-badge",
                              type: "badge",
                              text: "EMBEDDED EXECUTIVE PARTNERSHIP",
                              style: { color: { background: "primary", text: "background" }, typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "price34-t2-price-row",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "between",
                              wrap: true,
                              gap: "sm",
                              style: { sizing: { width: "full" } },
                              children: [
                                {
                                  id: "price34-t2-rate",
                                  type: "text",
                                  text: "$15,000 / month",
                                  style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                                },
                                {
                                  id: "price34-t2-btn",
                                  type: "button",
                                  label: "Schedule Confidential Intake",
                                  href: "#inquire-t2",
                                },
                              ],
                            },
                            {
                              id: "price34-t2-desc",
                              type: "text",
                              text: "10 hours monthly executive partnership + Direct investor syndicate negotiations + Bi-weekly leadership sprint reviews.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },

                        /* Scarcity Notice */
                        {
                          id: "price34-scarcity-text",
                          type: "text",
                          text: "Active retainers strictly limited to 4 concurrent organizations. 1 advisory slot remaining for Q4.",
                          style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
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
  // TEMPLATE #44: Full-Fledged Feature Comparison Matrix Table
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-44-comparison-matrix-table",
    name: "Full-Fledged Feature Comparison Matrix Table",
    kind: "section",
    root: {
      id: "price44-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price44-main-stack",
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
              id: "price44-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price44-eyebrow",
                  type: "badge",
                  text: "COMPREHENSIVE SPECIFICATION",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price44-title",
                  type: "heading",
                  level: 2,
                  text: "Granular Architecture & Capability Matrix",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price44-subtitle",
                  type: "text",
                  text: "Detailed comparison across security, runtime constraints, compliance, and enterprise SLAs.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* Full Matrix Table Container */
            {
              id: "price44-table-card",
              type: "card",
              element: "article",
              style: {
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "xl" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price44-table-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  children: [
                    /* Table Header Row: 4 Columns (3 / 3 / 3 / 3) */
                    {
                      id: "price44-thead-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
                      children: [
                        {
                          id: "price44-th-col1",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "none",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          children: [
                            {
                              id: "price44-th-title",
                              type: "text",
                              text: "Evaluation Criteria",
                              style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-sub",
                              type: "text",
                              text: "Categorized specification",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price44-th-col2",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          children: [
                            {
                              id: "price44-th-p1-name",
                              type: "text",
                              text: "Starter",
                              style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-p1-price",
                              type: "text",
                              text: "$29 / mo",
                              style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-p1-btn",
                              type: "button",
                              label: "Choose Starter",
                              href: "#starter",
                            },
                          ],
                        },
                        {
                          id: "price44-th-col3",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          children: [
                            {
                              id: "price44-th-p2-badge",
                              type: "badge",
                              text: "RECOMMENDED",
                              style: { color: { background: "primary", text: "background" }, typography: { size: "sm" } },
                            },
                            {
                              id: "price44-th-p2-name",
                              type: "text",
                              text: "Professional",
                              style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-p2-price",
                              type: "text",
                              text: "$79 / mo",
                              style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-p2-btn",
                              type: "button",
                              label: "Choose Pro",
                              href: "#pro",
                            },
                          ],
                        },
                        {
                          id: "price44-th-col4",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          children: [
                            {
                              id: "price44-th-p3-name",
                              type: "text",
                              text: "Enterprise",
                              style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-p3-price",
                              type: "text",
                              text: "Custom Quote",
                              style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                            },
                            {
                              id: "price44-th-p3-btn",
                              type: "button",
                              label: "Talk to Sales",
                              href: "#enterprise",
                            },
                          ],
                        },
                      ],
                    },

                    {
                      id: "price44-div-1",
                      type: "divider",
                      style: { border: { color: "text-muted", width: "thin" }, sizing: { width: "full" } },
                    },

                    /* Category Section 1: RUNTIME & PLATFORM */
                    {
                      id: "price44-cat1-header",
                      type: "badge",
                      text: "01. RUNTIME & CAPACITY",
                      style: { color: { background: "background", text: "text" }, typography: { size: "sm", weight: "bold" } },
                    },

                    /* Row: Production Renders */
                    {
                      id: "price44-row-renders",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
                      children: [
                        {
                          id: "price44-rr-c1",
                          type: "text",
                          text: "Monthly Production Renders",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rr-c2",
                          type: "text",
                          text: "10,000 renders",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price44-rr-c3",
                          type: "text",
                          text: "150,000 renders",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rr-c4",
                          type: "text",
                          text: "Unlimited / Uncapped",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },

                    /* Row: Template Suites */
                    {
                      id: "price44-row-templates",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
                      children: [
                        {
                          id: "price44-rt-c1",
                          type: "text",
                          text: "Curated Section Templates",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rt-c2",
                          type: "text",
                          text: "Starter Pack (10 templates)",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price44-rt-c3",
                          type: "text",
                          text: "All 50 Curated Suites",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rt-c4",
                          type: "text",
                          text: "All 50 + Custom Components",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },

                    {
                      id: "price44-div-2",
                      type: "divider",
                      style: { border: { color: "text-muted", width: "thin" }, sizing: { width: "full" } },
                    },

                    /* Category Section 2: SECURITY & GOVERNANCE */
                    {
                      id: "price44-cat2-header",
                      type: "badge",
                      text: "02. SECURITY & GOVERNANCE",
                      style: { color: { background: "background", text: "text" }, typography: { size: "sm", weight: "bold" } },
                    },

                    /* Row: SSO & Identity */
                    {
                      id: "price44-row-sso",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
                      children: [
                        {
                          id: "price44-rs-c1",
                          type: "text",
                          text: "SAML 2.0 SSO / Okta / SCIM",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rs-c2",
                          type: "text",
                          text: "— (Not Included)",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price44-rs-c3",
                          type: "text",
                          text: "✓ Included",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rs-c4",
                          type: "text",
                          text: "✓ Included + Custom IdP",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },

                    /* Row: Audit Trails */
                    {
                      id: "price44-row-audit",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
                      children: [
                        {
                          id: "price44-ra-c1",
                          type: "text",
                          text: "Audit Trail & Activity Logs",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-ra-c2",
                          type: "text",
                          text: "7-day rolling history",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price44-ra-c3",
                          type: "text",
                          text: "90-day searchable history",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-ra-c4",
                          type: "text",
                          text: "Immutable 7-year retention",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },

                    {
                      id: "price44-div-3",
                      type: "divider",
                      style: { border: { color: "text-muted", width: "thin" }, sizing: { width: "full" } },
                    },

                    /* Category Section 3: SLA & SUPPORT */
                    {
                      id: "price44-cat3-header",
                      type: "badge",
                      text: "03. SLA & INFRASTRUCTURE",
                      style: { color: { background: "background", text: "text" }, typography: { size: "sm", weight: "bold" } },
                    },

                    /* Row: Uptime SLA */
                    {
                      id: "price44-row-sla",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
                      children: [
                        {
                          id: "price44-rsl-c1",
                          type: "text",
                          text: "Production Uptime Guarantee",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rsl-c2",
                          type: "text",
                          text: "99.9% Standard",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price44-rsl-c3",
                          type: "text",
                          text: "99.95% Priority",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "price44-rsl-c4",
                          type: "text",
                          text: "99.99% Financially-Backed SLA",
                          layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
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
      ],
    },
  },
];
