import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 5 (Templates #07, #08, #14, #24, #37)
 *
 * #07: Good / Better / Best Value Staircase (pricing-07-good-better-best-ladder)
 * #08: Milestone Company Stage Progression Rail (pricing-08-starter-team-biz-enterprise)
 * #14: Model Inference Token Consumption Rate Card (pricing-14-token-consumption-meter)
 * #24: Bespoke Enterprise Quote Specification Sheet (pricing-24-quote-based-enterprise-spec)
 * #37: Itemized A-La-Carte Service Menu Ledger (pricing-37-menu-service-catalog)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_5: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #07: Good / Better / Best Value Staircase
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-07-good-better-best-ladder",
    name: "Good / Better / Best Value Staircase",
    kind: "section",
    root: {
      id: "price07-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price07-main-stack",
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
              id: "price07-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price07-eyebrow",
                  type: "badge",
                  text: "ACOUSTIC HARDWARE & PRO DSP ECOSYSTEM",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price07-title",
                  type: "heading",
                  level: 2,
                  text: "Three Tiers of Studio Precision. One Unified Workflow.",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price07-subtitle",
                  type: "text",
                  text: "Select the active acoustic monitor and DSP calibration bundle tailored to your studio scale. 30-day risk-free in-room trial included with every tier.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Staircase Grid (4 - 4 - 4 columns) */
            {
              id: "price07-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Good (Essential) */
                {
                  id: "price07-col-good",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
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
                      id: "price07-good-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price07-good-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price07-good-badge",
                              type: "badge",
                              text: "TIER 1 · ESSENTIAL",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price07-good-title",
                              type: "text",
                              text: "Nearfield Studio Pair",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price07-good-price",
                              type: "heading",
                              level: 3,
                              text: "$199",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price07-good-sub",
                              type: "text",
                              text: "One-time complete hardware & DSP package",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price07-good-cta",
                          type: "button",
                          label: "Order Essential Setup",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price07-good-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "2x 4.5\" High-Dispersion Kevlar Drivers",
                            "Room Acoustic Correction DSP Lite plugin",
                            "USB-C, Bluetooth 5.3 & TRS Balanced inputs",
                            "24-bit / 96kHz High-Res Internal DAC",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Better (Advanced - Highlighted) */
                {
                  id: "price07-col-better",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
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
                      id: "price07-better-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price07-better-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price07-better-badge",
                              type: "badge",
                              text: "TIER 2 · RECOMMENDED SWEETSPOT",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price07-better-title",
                              type: "text",
                              text: "Reference 6.5\" Studio Suite",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price07-better-price",
                              type: "heading",
                              level: 3,
                              text: "$399",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price07-better-sub",
                              type: "text",
                              text: "One-time complete hardware & DSP package",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price07-better-cta",
                          type: "button",
                          label: "Order Advanced Setup",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price07-better-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Everything in Essential Tier, plus:",
                            "2x 6.5\" Carbon Fiber Active Reference Drivers",
                            "Omnidirectional Calibration Measurement Mic",
                            "Hardware Floating-Point DSP Processing Engine",
                            "Low-Latency Dante Audio-over-IP Support",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Best (Ultimate) */
                {
                  id: "price07-col-best",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
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
                      id: "price07-best-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price07-best-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price07-best-badge",
                              type: "badge",
                              text: "TIER 3 · MASTERING RIG",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price07-best-title",
                              type: "text",
                              text: "Tri-Amplified Atmos Suite",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price07-best-price",
                              type: "heading",
                              level: 3,
                              text: "$799",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price07-best-sub",
                              type: "text",
                              text: "One-time complete hardware & DSP package",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price07-best-cta",
                          type: "button",
                          label: "Order Ultimate Rig",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price07-best-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Everything in Advanced Tier, plus:",
                            "3-Way Coaxial Beryllium High-Frequency Dome",
                            "Dedicated 8\" Powered Subwoofer Included",
                            "Dolby Atmos 7.1.4 Spatial Authoring License",
                            "1-on-1 Remote Acoustic Engineering Session",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Proof Footnote Bar */
            {
              id: "price07-proof-bar",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "center",
              wrap: true,
              gap: "lg",
              children: [
                {
                  id: "price07-proof-1",
                  type: "text",
                  text: "✓ 30-Day In-Room Trial Guarantee",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
                {
                  id: "price07-proof-2",
                  type: "text",
                  text: "✓ 3-Year Factory Hardware Warranty",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
                {
                  id: "price07-proof-3",
                  type: "text",
                  text: "✓ Free Insured Expedited Shipping",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #08: Milestone Company Stage Progression Rail
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-08-starter-team-biz-enterprise",
    name: "Milestone Company Stage Progression Rail",
    kind: "section",
    root: {
      id: "price08-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price08-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price08-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price08-eyebrow",
                  type: "badge",
                  text: "VENTURE LIFECYCLE INFRASTRUCTURE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price08-title",
                  type: "heading",
                  level: 2,
                  text: "Fintech Core Platform Rail: Structured for Every Stage of Scale",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price08-subtitle",
                  type: "text",
                  text: "Annual platform commitments indexed to monthly transaction volume and capital raises. Predictable rates with zero unexpected overages.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 4-Stage Rail Grid (3 - 3 - 3 - 3 columns) */
            {
              id: "price08-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Seed */
                {
                  id: "price08-col-seed",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price08-seed-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price08-seed-badge",
                          type: "badge",
                          text: "< $1M ARR / SEED",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price08-seed-title",
                          type: "text",
                          text: "Seed Platform Rail",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price08-seed-price",
                          type: "heading",
                          level: 3,
                          text: "$450 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price08-seed-cta",
                          type: "button",
                          label: "Apply for Seed Rail",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price08-seed-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to $250k Monthly Volume",
                            "Instant Sandbox & Production Keys",
                            "2 ACH Corporate Accounts",
                            "Shared Developer Slack Channel",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Growth (Highlighted) */
                {
                  id: "price08-col-growth",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price08-growth-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price08-growth-badge",
                          type: "badge",
                          text: "$1M - $10M ARR / SERIES A-B",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price08-growth-title",
                          type: "text",
                          text: "Growth Platform Rail",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price08-growth-price",
                          type: "heading",
                          level: 3,
                          text: "$1,850 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price08-growth-cta",
                          type: "button",
                          label: "Deploy Growth Rail",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price08-growth-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to $2.5M Monthly Volume",
                            "FedNow Realtime Settlement",
                            "Multi-Entity Corporate Treasury",
                            "Assigned Solutions Engineer",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Scaleup */
                {
                  id: "price08-col-scale",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price08-scale-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price08-scale-badge",
                          type: "badge",
                          text: "$10M - $50M ARR / SERIES C+",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price08-scale-title",
                          type: "text",
                          text: "Scaleup Platform Rail",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price08-scale-price",
                          type: "heading",
                          level: 3,
                          text: "$4,500 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price08-scale-cta",
                          type: "button",
                          label: "Initiate Scaleup Setup",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price08-scale-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to $15M Monthly Volume",
                            "Dual-Bank Settlement Redundancy",
                            "SOC 1 Type II & ISO 27001 Pack",
                            "99.99% Availability Financial SLA",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 4: Global Enterprise */
                {
                  id: "price08-col-global",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price08-global-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price08-global-badge",
                          type: "badge",
                          text: "$50M+ ARR / CORPORATE",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price08-global-title",
                          type: "text",
                          text: "Global Scale Rail",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price08-global-price",
                          type: "heading",
                          level: 3,
                          text: "Bespoke Volume",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price08-global-cta",
                          type: "button",
                          label: "Speak with Managing Director",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price08-global-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited Custom Transaction Rails",
                            "On-Premises Ledger Vault Peering",
                            "Regulatory Trust Escrow Accounts",
                            "24/7 Dedicated War Room Pod",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Portfolio Footnote */
            {
              id: "price08-footnote",
              type: "text",
              text: "Trusted by 140+ venture-backed scaleups. Over $4.2B in annualized transaction volume settled across 18 countries.",
              style: {
                typography: { size: "sm", align: "center" },
                color: { text: "text-muted" },
              },
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #14: Model Inference Token Consumption Rate Card
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-14-token-consumption-meter",
    name: "Model Inference Token Consumption Rate Card",
    kind: "section",
    root: {
      id: "price14-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price14-main-stack",
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
              id: "price14-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price14-eyebrow",
                  type: "badge",
                  text: "REALTIME TOKEN INFERENCE API",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price14-title",
                  type: "heading",
                  level: 2,
                  text: "Frontier Intelligence Meter: Transparent Input & Output Rates",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price14-subtitle",
                  type: "text",
                  text: "Billed strictly per million prompt and output tokens. Zero minimum idle GPU cluster fees. Automatic 50% discount on off-peak batch completions.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Model Grid (3 columns) */
            {
              id: "price14-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: 8B Fast */
                {
                  id: "price14-col-8b",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
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
                      id: "price14-8b-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price14-8b-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price14-8b-badge",
                              type: "badge",
                              text: "FAST CLASSIFICATION & ROUTING",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price14-8b-title",
                              type: "text",
                              text: "Nova-8B Flash Engine",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price14-8b-rates",
                              type: "text",
                              text: "$0.10 in / $0.40 out",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price14-8b-sub",
                              type: "text",
                              text: "Rates per 1 Million Tokens",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price14-8b-cta",
                          type: "button",
                          label: "Deploy Nova-8B Endpoint",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price14-8b-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "128,000 Token Prompt Context Window",
                            "18ms Time-To-First-Token (TTFT)",
                            "71.4 MMLU General Knowledge Benchmark",
                            "Enforced Structured JSON Output Mode",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: 70B Reasoner (Highlighted) */
                {
                  id: "price14-col-70b",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
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
                      id: "price14-70b-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price14-70b-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price14-70b-badge",
                              type: "badge",
                              text: "LOGIC & CODE · RECOMMENDED",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price14-70b-title",
                              type: "text",
                              text: "Nova-70B Reasoner",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price14-70b-rates",
                              type: "text",
                              text: "$0.80 in / $2.40 out",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price14-70b-sub",
                              type: "text",
                              text: "Rates per 1 Million Tokens",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price14-70b-cta",
                          type: "button",
                          label: "Deploy Nova-70B Endpoint",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price14-70b-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "256,000 Token Prompt Context Window",
                            "32ms Time-To-First-Token (TTFT)",
                            "86.4 MMLU & 84.1 HumanEval Code Score",
                            "Parallel Tool Use & Function Calling",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: 405B Frontier */
                {
                  id: "price14-col-405b",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
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
                      id: "price14-405b-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price14-405b-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price14-405b-badge",
                              type: "badge",
                              text: "FRONTIER AUTONOMOUS REASONING",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price14-405b-title",
                              type: "text",
                              text: "Nova-405B Frontier",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price14-405b-rates",
                              type: "text",
                              text: "$3.50 in / $10.50 out",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price14-405b-sub",
                              type: "text",
                              text: "Rates per 1 Million Tokens",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price14-405b-cta",
                          type: "button",
                          label: "Deploy Nova-405B Endpoint",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price14-405b-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "512,000 Token Massive Context Window",
                            "58ms Time-To-First-Token (TTFT)",
                            "91.8 MMLU State-of-the-Art Benchmark",
                            "Multi-Agent Orchestration & Infinite Memory",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* SLA Footnote */
            {
              id: "price14-footnote",
              type: "text",
              text: "⚡ 99.995% Global Cluster Uptime SLA · Zero Customer Data Retention Guarantee · SOC 2 Type II Certified",
              style: {
                typography: { size: "sm", align: "center" },
                color: { text: "text-muted" },
              },
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #24: Bespoke Enterprise Quote Specification Sheet
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-24-quote-based-enterprise-spec",
    name: "Bespoke Enterprise Quote Specification Sheet",
    kind: "section",
    root: {
      id: "price24-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price24-main-stack",
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
              id: "price24-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price24-eyebrow",
                  type: "badge",
                  text: "ENTERPRISE PROCUREMENT & ARCHITECTURE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price24-title",
                  type: "heading",
                  level: 2,
                  text: "Dedicated Enterprise Deployment Specification",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price24-subtitle",
                  type: "text",
                  text: "For security-governed organizations requiring private VPC isolation, customized Master Services Agreements (MSA), and dedicated engineering reliability pods.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Asymmetric Grid (7 - 5 columns) */
            {
              id: "price24-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Scope & Governance Specs (7 cols) */
                {
                  id: "price24-col-scope",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
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
                      id: "price24-scope-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price24-scope-title",
                          type: "heading",
                          level: 3,
                          text: "Standard Enterprise Governance Inclusions",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price24-scope-item-1",
                          type: "text",
                          text: "1. Infrastructure Isolation: Dedicated AWS/GCP VPC Tenant with Private Link Peering & Customer-Managed Encryption Keys (CMEK).",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price24-scope-item-2",
                          type: "text",
                          text: "2. Reliability Commitment: 99.999% Service Availability SLA with 15-minute critical incident emergency response pod.",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price24-scope-item-3",
                          type: "text",
                          text: "3. Legal Procurement: Custom Master Services Agreement (MSA) redlines, Net-60 invoicing, and AWS/Azure Marketplace private offers.",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price24-scope-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "FedRAMP High Ready & HIPAA Business Associate Agreement (BAA)",
                            "Air-Gapped Kubernetes On-Premises Installation Option",
                            "Quarterly Disaster Recovery Simulation Verification",
                            "Dedicated Lead Solutions Architect & Onboarding Pod",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Procurement Proposal Card (5 cols) */
                {
                  id: "price24-col-dossier",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price24-dossier-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price24-dossier-badge",
                          type: "badge",
                          text: "CUSTOM ARCHITECTURE RFP",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price24-dossier-title",
                          type: "heading",
                          level: 3,
                          text: "Custom Commercial Proposal",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price24-dossier-price",
                          type: "text",
                          text: "Negotiated Annual Contract",
                          style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                        },
                        {
                          id: "price24-dossier-desc",
                          type: "text",
                          text: "Every agreement is tailored to your compute workload concurrency, user headcount, and compliance scope. Expect a full formal RFP proposal within 24 hours.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price24-dossier-cta",
                          type: "button",
                          label: "Request Commercial Proposal",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price24-dossier-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "24-Hour Formal RFP & Commercial Quote",
                            "Architecture Review Call with Principal Engineer",
                            "Full SOC 2 Type II Compliance Report Access",
                            "Guided 30-Day Enterprise Sandbox Pilot",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Trust Badges Strip */
            {
              id: "price24-trust-bar",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "center",
              wrap: true,
              gap: "lg",
              children: [
                {
                  id: "price24-t1",
                  type: "text",
                  text: "🔒 ISO 27001 Certified",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
                {
                  id: "price24-t2",
                  type: "text",
                  text: "🛡️ SOC 2 Type II Audited",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
                {
                  id: "price24-t3",
                  type: "text",
                  text: "⚖️ HIPAA & GDPR Compliant",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
                {
                  id: "price24-t4",
                  type: "text",
                  text: "☁️ AWS & Azure Marketplace Ready",
                  style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #37: Itemized A-La-Carte Service Menu Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-37-menu-service-catalog",
    name: "Itemized A-La-Carte Service Menu Ledger",
    kind: "section",
    root: {
      id: "price37-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price37-main-stack",
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
              id: "price37-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price37-eyebrow",
                  type: "badge",
                  text: "A-LA-CARTE ENGINEERING SERVICE MENU",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price37-title",
                  type: "heading",
                  level: 2,
                  text: "Performance & Reliability Advisory: Itemized Service Menu",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price37-subtitle",
                  type: "text",
                  text: "Select standalone engineering sprints or retained technical guardianship. Fixed milestone pricing with zero hourly scope creep.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Section Menu Grid (4 - 4 - 4 columns) */
            {
              id: "price37-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Diagnostic & Audit Menu */
                {
                  id: "price37-col-audit",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
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
                      id: "price37-audit-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price37-audit-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price37-audit-badge",
                              type: "badge",
                              text: "SECTION I · DIAGNOSTICS",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price37-audit-title",
                              type: "text",
                              text: "Diagnostic & Audit Menu",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price37-audit-sub",
                              type: "text",
                              text: "Comprehensive architectural inspections identifying system bottlenecks.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price37-audit-cta",
                          type: "button",
                          label: "Commission Audit Package",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price37-audit-list",
                          type: "list",
                          marker: "bullet",
                          items: [
                            "Full-Stack Bottleneck Audit — $1,500 (Heap, latency & slow queries)",
                            "Cloud FinOps Cost Audit — $1,200 (Identify compute waste & over-provisioning)",
                            "OWASP AppSec Penetration Audit — $2,200 (Vulnerability and auth testing)",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Targeted Sprint Execution Menu (Highlighted) */
                {
                  id: "price37-col-sprint",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
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
                      id: "price37-sprint-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price37-sprint-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price37-sprint-badge",
                              type: "badge",
                              text: "SECTION II · EXECUTION SPRINTS",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price37-sprint-title",
                              type: "text",
                              text: "Engineering Sprint Menu",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price37-sprint-sub",
                              type: "text",
                              text: "Hands-on engineering deliverables completed within 5-10 business days.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price37-sprint-cta",
                          type: "button",
                          label: "Book Execution Sprint",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price37-sprint-list",
                          type: "list",
                          marker: "bullet",
                          items: [
                            "DB Indexing & Query Tuning — $3,800 (Refactor top 15 slow queries & Redis)",
                            "CI/CD Pipeline Acceleration — $2,900 (Docker multi-stage caching: -65% build)",
                            "High-Availability Failover — $4,500 (Multi-region replica & automated failover)",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Retained Operational Guardianship */
                {
                  id: "price37-col-retainer",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
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
                      id: "price37-retainer-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price37-retainer-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price37-retainer-badge",
                              type: "badge",
                              text: "SECTION III · GUARDIANSHIP",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price37-retainer-title",
                              type: "text",
                              text: "Retained Guardianship",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price37-retainer-sub",
                              type: "text",
                              text: "Ongoing architectural oversight and secondary emergency on-call escalation.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price37-retainer-cta",
                          type: "button",
                          label: "Enroll in Guardianship",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price37-retainer-list",
                          type: "list",
                          marker: "bullet",
                          items: [
                            "Vulnerability Monitoring — $650 / mo (Continuous package & CVE scans)",
                            "Production Incident On-Call — $1,400 / mo (Secondary P1 30-min escalation)",
                            "Quarterly Architecture Pod — $1,800 / qtr (Tech debt & roadmap review)",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Guarantee Footnote */
            {
              id: "price37-footnote",
              type: "text",
              text: "🛡️ Every catalog engagement is governed by our 100% Fixed Deliverable Completion Guarantee.",
              style: {
                typography: { size: "sm", align: "center" },
                color: { text: "text-muted" },
              },
            },
          ],
        },
      ],
    },
  },
];
