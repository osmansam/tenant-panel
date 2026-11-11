import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 10 (Templates #45, #46, #47, #48, #50)
 *
 * #45: Compact Density Horizontal Strip Ledger (pricing-45-compact-horizontal-pricing-table)
 * #46: Horizontal Interactive Swipe Rail Pricing (pricing-46-horizontal-swipe-pricing-rail)
 * #47: Vertically Stacked Accordion Pricing Drawer (pricing-47-vertically-stacked-accordion-cards)
 * #48: Editorial Narrative Feature Pricing Spread (pricing-48-editorial-narrative-pricing-spread)
 * #50: Interactive ROI Payback Calculator & Value Hybrid (pricing-50-roi-calculator-investment-hybrid)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_10: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #45: Compact Density Horizontal Strip Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-45-compact-horizontal-pricing-table",
    name: "Compact Density Horizontal Strip Ledger",
    kind: "section",
    root: {
      id: "price45-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price45-main-stack",
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
              id: "price45-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price45-eyebrow",
                  type: "badge",
                  text: "DEVELOPER TOOLING & SYSADMIN UTILITY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price45-title",
                  type: "heading",
                  level: 2,
                  text: "High-Density Horizontal Pricing Matrix",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price45-subtitle",
                  type: "text",
                  text: "Maximum technical density with minimal vertical footprint. Compare daemon runtime limits, concurrency slots, and binary distribution across all tiers at a glance.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 4-Row Horizontal Strip Table Grid */
            {
              id: "price45-strip-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "sm" }, sizing: { width: "full" } },
              children: [
                /* Row 1: Community Tier */
                {
                  id: "price45-row-comm",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "border", radius: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price45-comm-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price45-comm-info-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "auto" } },
                          children: [
                            {
                              id: "price45-comm-name",
                              type: "heading",
                              level: 3,
                              text: "Community Edition",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price45-comm-desc",
                              type: "text",
                              text: "Open-source local CLI binary with standard SQLite storage engine.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price45-comm-specs",
                          type: "text",
                          text: "1 Local Daemon • 2 Concurrency Workers • Community Discord SLA",
                          style: { typography: { size: "sm", weight: "medium" } },
                        },
                        {
                          id: "price45-comm-rate",
                          type: "text",
                          text: "$0 / free",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price45-comm-btn",
                          type: "button",
                          label: "Install via Homebrew",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            spacing: { paddingX: "lg", paddingY: "xs" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Row 2: Pro Utility */
                {
                  id: "price45-row-pro",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "border", radius: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price45-pro-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price45-pro-info-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "auto" } },
                          children: [
                            {
                              id: "price45-pro-name",
                              type: "heading",
                              level: 3,
                              text: "Pro Developer",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price45-pro-desc",
                              type: "text",
                              text: "Cloud daemon syncing, telemetry exports, and unlimited workspace profiles.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price45-pro-specs",
                          type: "text",
                          text: "5 Remote Daemons • 16 Worker Threads • 24h Email Support SLA",
                          style: { typography: { size: "sm", weight: "medium" } },
                        },
                        {
                          id: "price45-pro-rate",
                          type: "text",
                          text: "$19 / mo",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price45-pro-btn",
                          type: "button",
                          label: "Start Pro Trial",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            spacing: { paddingX: "lg", paddingY: "xs" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Row 3: Team Gateway (Highlighted) */
                {
                  id: "price45-row-team",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "primary", radius: "md", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price45-team-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price45-team-info-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "auto" } },
                          children: [
                            {
                              id: "price45-team-name-row",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price45-team-name",
                                  type: "heading",
                                  level: 3,
                                  text: "Team Gateway",
                                  style: { typography: { size: "lg", weight: "bold" } },
                                },
                                {
                                  id: "price45-team-badge",
                                  type: "badge",
                                  text: "MOST POPULAR",
                                  style: {
                                    color: { background: "primary", text: "primary-foreground" },
                                    typography: { size: "sm", weight: "bold" },
                                  },
                                },
                              ],
                            },
                            {
                              id: "price45-team-desc",
                              type: "text",
                              text: "Shared team credentials, unified audit logging, and automated CI/CD runners.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price45-team-specs",
                          type: "text",
                          text: "25 Managed Daemons • 64 Concurrency Pipelines • 4h Priority SLA",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price45-team-rate",
                          type: "text",
                          text: "$49 / mo",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price45-team-btn",
                          type: "button",
                          label: "Provision Team",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            spacing: { paddingX: "lg", paddingY: "xs" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Row 4: Cluster Enterprise */
                {
                  id: "price45-row-cluster",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "md" },
                    border: { width: "thin", color: "border", radius: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price45-cluster-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price45-cluster-info-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "auto" } },
                          children: [
                            {
                              id: "price45-cluster-name",
                              type: "heading",
                              level: 3,
                              text: "Cluster Enterprise",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price45-cluster-desc",
                              type: "text",
                              text: "Self-hosted Kubernetes operator, custom SAML SCIM, and dedicated VPC relay.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price45-cluster-specs",
                          type: "text",
                          text: "Unlimited Daemons • Dedicated Private Relay • 99.99% Financed SLA",
                          style: { typography: { size: "sm", weight: "medium" } },
                        },
                        {
                          id: "price45-cluster-rate",
                          type: "text",
                          text: "$149 / mo",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price45-cluster-btn",
                          type: "button",
                          label: "Deploy Operator",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            spacing: { paddingX: "lg", paddingY: "xs" },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* CLI Copy Command Strip */
            {
              id: "price45-cli-strip",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "sm" },
                border: { width: "thin", color: "border", radius: "md" },
                color: { background: "surface-muted" },
                sizing: { width: "full", maxWidth: "4xl" },
              },
              children: [
                {
                  id: "price45-cli-text",
                  type: "text",
                  text: "Quick install: curl -fsSL https://get.ozmitools.sh/install | bash • Tested across macOS ARM/Intel, Ubuntu 22.04+, and Debian 12",
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
  // TEMPLATE #46: Horizontal Interactive Swipe Rail Pricing
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-46-horizontal-swipe-pricing-rail",
    name: "Horizontal Interactive Swipe Rail Pricing",
    kind: "section",
    root: {
      id: "price46-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price46-main-stack",
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
              id: "price46-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price46-eyebrow",
                  type: "badge",
                  text: "NEXT-GEN CARD TIERS & MOBILE PERKS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price46-title",
                  type: "heading",
                  level: 2,
                  text: "Swipe to Select Your Personal Metal Membership",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price46-subtitle",
                  type: "text",
                  text: "Designed for international spenders, founders, and creators. Instant virtual issuance on Apple Pay and Google Wallet with zero foreign transaction fees.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Card Swipe Rail Grid */
            {
              id: "price46-rail-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Card 1: Core Debit ($0/mo) */
                {
                  id: "price46-card-core",
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
                      id: "price46-core-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price46-core-badge",
                          type: "badge",
                          text: "DIGITAL DEBIT TIER",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price46-core-title",
                          type: "heading",
                          level: 3,
                          text: "Core Standard",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price46-core-price",
                          type: "text",
                          text: "$0 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price46-core-desc",
                          type: "text",
                          text: "Everyday smart banking with instant notifications, virtual disposable cards, and free local transfers.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price46-core-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Instant Apple Pay & Google Wallet",
                            "Free ATM withdrawals up to $400/mo",
                            "Zero account maintenance fees",
                            "1% cashback on supermarket spend",
                            "FDIC insured up to $250,000",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price46-core-btn",
                          type: "button",
                          label: "Activate Free Core Card",
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

                /* Card 2: Metal Premium ($16/mo, Highlighted) */
                {
                  id: "price46-card-metal",
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
                      id: "price46-met-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price46-met-badge",
                          type: "badge",
                          text: "18G BRUSHED STEEL • MOST POPULAR",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price46-met-title",
                          type: "heading",
                          level: 3,
                          text: "Metal Premium",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price46-met-price",
                          type: "text",
                          text: "$16 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price46-met-desc",
                          type: "text",
                          text: "Crafted 18g stainless steel card with unlimited global lounge access, travel medical insurance, and 3% cashback.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price46-met-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "18g solid stainless steel engraved card",
                            "Priority Pass airport lounge access",
                            "3% uncapped global travel cashback",
                            "Comprehensive multi-trip travel insurance",
                            "Free worldwide ATM withdrawals up to $2k/mo",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price46-met-btn",
                          type: "button",
                          label: "Order Metal Card ($16/mo)",
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

                /* Card 3: Sovereign Black ($45/mo) */
                {
                  id: "price46-card-black",
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
                      id: "price46-blk-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price46-blk-badge",
                          type: "badge",
                          text: "SOLID TITANIUM MEMBER",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price46-blk-title",
                          type: "heading",
                          level: 3,
                          text: "Sovereign Black",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price46-blk-price",
                          type: "text",
                          text: "$45 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price46-blk-desc",
                          type: "text",
                          text: "Matte black titanium card with 24/7 dedicated lifestyle concierge, private aviation discounts, and elevated deposit yield.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price46-blk-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Laser-cut matte black titanium card",
                            "Dedicated 24/7 private concierge desk",
                            "5.25% APY high-yield treasury savings",
                            "Global baggage & flight delay concierge",
                            "FDIC insured through partner sweep network",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price46-blk-btn",
                          type: "button",
                          label: "Apply for Sovereign Black",
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

            /* Bank Reassurance Footnote */
            {
              id: "price46-bank-card",
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
                  id: "price46-bank-text",
                  type: "text",
                  text: "Banking Security: Banking services provided by Coastal Community Bank, Member FDIC. Cards issued by Mastercard International. Deposits insured up to $250,000 per depositor.",
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
  // TEMPLATE #47: Vertically Stacked Accordion Pricing Drawer
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-47-vertically-stacked-accordion-cards",
    name: "Vertically Stacked Accordion Pricing Drawer",
    kind: "section",
    root: {
      id: "price47-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price47-main-stack",
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
              id: "price47-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price47-eyebrow",
                  type: "badge",
                  text: "COMMERCIAL FREIGHT & LOGISTICS LANES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price47-title",
                  type: "heading",
                  level: 2,
                  text: "Vertically Stacked Freight Carrier Lanes",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price47-subtitle",
                  type: "text",
                  text: "Expandable contract drawer rates for shippers, distributors, and supply chain operators. Transparent lane minimums with mileage-based fuel surcharge indexes.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Stacked Drawer Rail Grid */
            {
              id: "price47-stacked-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Drawer 1: LTL Regional Freight */
                {
                  id: "price47-drawer-ltl",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
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
                      id: "price47-ltl-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price47-ltl-top-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "price47-ltl-heading-stack",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price47-ltl-badge",
                                  type: "badge",
                                  text: "PARTIAL LOAD CONSOLIDATION",
                                  style: {
                                    color: { background: "surface-muted", text: "text" },
                                    typography: { size: "sm", weight: "bold" },
                                  },
                                },
                                {
                                  id: "price47-ltl-title",
                                  type: "heading",
                                  level: 3,
                                  text: "Regional LTL Freight Lane",
                                  style: { typography: { size: "2xl", weight: "bold" } },
                                },
                              ],
                            },
                            {
                              id: "price47-ltl-price",
                              type: "text",
                              text: "$450 Base / lane",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price47-ltl-desc",
                          type: "text",
                          text: "Palletized freight consolidation across 500-mile regional shipping corridors with daily terminal dispatch.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price47-ltl-specs",
                          type: "list",
                          marker: "check",
                          items: [
                            "1 to 6 standard pallets (up to 7,500 lbs gross)",
                            "Guaranteed 48-hour regional dock-to-dock transit",
                            "Real-time GPS pallet tracking via EDI 214 webhook",
                            "Liftgate pickup & residential delivery available",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price47-ltl-btn",
                          type: "button",
                          label: "Book LTL Regional Dispatch",
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

                /* Drawer 2: Dedicated Full Truckload (Highlighted) */
                {
                  id: "price47-drawer-ftl",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
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
                      id: "price47-ftl-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price47-ftl-top-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "price47-ftl-heading-stack",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price47-ftl-badge",
                                  type: "badge",
                                  text: "DEDICATED 53FT DRY VAN • MOST REQUESTED",
                                  style: {
                                    color: { background: "primary", text: "primary-foreground" },
                                    typography: { size: "sm", weight: "bold" },
                                  },
                                },
                                {
                                  id: "price47-ftl-title",
                                  type: "heading",
                                  level: 3,
                                  text: "Dedicated Full Truckload (FTL)",
                                  style: { typography: { size: "2xl", weight: "bold" } },
                                },
                              ],
                            },
                            {
                              id: "price47-ftl-price",
                              type: "text",
                              text: "$1,850 Base / lane",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price47-ftl-desc",
                          type: "text",
                          text: "Sole-occupancy 53ft air-ride dry van or refrigerated trailer with guaranteed next-day long-haul commitment.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price47-ftl-specs",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 26 pallets (45,000 lbs max legal payload)",
                            "Dedicated non-stop driver team for expedited cross-country",
                            "Cargo insurance included up to $250,000 per trailer",
                            "Direct yard drop-trailer scheduling & 2h detention free",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price47-ftl-btn",
                          type: "button",
                          label: "Dispatch Dedicated Full Truckload",
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

                /* Drawer 3: Intermodal Supply Chain */
                {
                  id: "price47-drawer-intermodal",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price47-int-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price47-int-top-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "price47-int-heading-stack",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "price47-int-badge",
                                  type: "badge",
                                  text: "RAIL + DRAYAGE HIGH-VOLUME",
                                  style: {
                                    color: { background: "surface-muted", text: "text" },
                                    typography: { size: "sm", weight: "bold" },
                                  },
                                },
                                {
                                  id: "price47-int-title",
                                  type: "heading",
                                  level: 3,
                                  text: "Intermodal Container Rail",
                                  style: { typography: { size: "2xl", weight: "bold" } },
                                },
                              ],
                            },
                            {
                              id: "price47-int-price",
                              type: "text",
                              text: "$4,200 Monthly contract",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                          ],
                        },
                        {
                          id: "price47-int-desc",
                          type: "text",
                          text: "Class-1 rail container contracts combined with port drayage for cross-continent volume cargo efficiency.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price47-int-specs",
                          type: "list",
                          marker: "check",
                          items: [
                            "Multi-container contracted monthly capacity reservations",
                            "40% carbon emission reduction versus highway haulage",
                            "Integrated port terminal drayage and customs bonded transit",
                            "Monthly volume fuel rebate rebate & Net-30 freight audit",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price47-int-btn",
                          type: "button",
                          label: "Initiate Intermodal Contract",
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

            /* Carrier DOT Seal */
            {
              id: "price47-dot-card",
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
                  id: "price47-dot-text",
                  type: "text",
                  text: "Freight Safety & Compliance: US DOT #3829104 • FMCSA MC-849201. Fully bonded $100,000 freight broker surety. Verified active primary liability cargo coverage on all contracted carriers.",
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
  // TEMPLATE #48: Editorial Narrative Feature Pricing Spread
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-48-editorial-narrative-pricing-spread",
    name: "Editorial Narrative Feature Pricing Spread",
    kind: "section",
    root: {
      id: "price48-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price48-main-stack",
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
              id: "price48-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price48-eyebrow",
                  type: "badge",
                  text: "HAUTE ARCHITECTURE & PRIVATE COMMISSIONS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price48-title",
                  type: "heading",
                  level: 2,
                  text: "The Atelier Monograph: Spatial Commissions",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price48-subtitle",
                  type: "text",
                  text: "We deliberately accept only four residential and civic commissions each calendar year. Architecture treated not as commodified square footage, but as enduring spatial sculpture.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Prose Spread Grid */
            {
              id: "price48-prose-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Column 1: Bespoke Residential Commission */
                {
                  id: "price48-col-bespoke",
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
                      id: "price48-bsp-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price48-bsp-badge",
                          type: "badge",
                          text: "COMMISSION CLAUSE I",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price48-bsp-title",
                          type: "heading",
                          level: 3,
                          text: "Bespoke Spatial Commission",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price48-bsp-price",
                          type: "text",
                          text: "$24,000 Design retainer",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price48-bsp-terms",
                          type: "text",
                          text: "Subordinated to total project construction budget (8% architectural fee)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price48-bsp-prose",
                          type: "text",
                          text: "An intimate six-month programmatic dialogue exploring topography, natural daylight angles, and reclaimed materials. Every joint, door handle, and acoustic envelope is custom drafted.",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price48-bsp-specs",
                          type: "list",
                          marker: "bullet",
                          items: [
                            "Comprehensive geological & daylight solar study",
                            "Three bespoke physical basswood architectural models",
                            "1:1 scale tactile material palette curation (stone, timber)",
                            "General contractor vetting & on-site supervision",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price48-bsp-btn",
                          type: "button",
                          label: "Initiate Private Atelier Inquiry",
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

                /* Column 2: Curated Civic Retainer */
                {
                  id: "price48-col-curated",
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
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price48-cur-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price48-cur-badge",
                          type: "badge",
                          text: "COMMISSION CLAUSE II",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price48-cur-title",
                          type: "heading",
                          level: 3,
                          text: "Civic & Museum Masterplan",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price48-cur-price",
                          type: "text",
                          text: "$65,000 Annual advisory",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price48-cur-terms",
                          type: "text",
                          text: "Quarterly advisory retainers dedicated to foundations and cultural trusts",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price48-cur-prose",
                          type: "text",
                          text: "Multi-year architectural stewardship for botanical gardens, historic preservation trusts, and private institutional galleries requiring masterplan zoning continuity.",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price48-cur-specs",
                          type: "list",
                          marker: "bullet",
                          items: [
                            "Long-range 25-year institutional spatial masterplan",
                            "Direct representation before municipal landmarks boards",
                            "Historic masonry preservation & passive environmental HVAC",
                            "Quarterly board of trustees architectural briefings",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price48-cur-btn",
                          type: "button",
                          label: "Request Institutional Monograph",
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
              ],
            },

            /* Atelier Pedigree Memorandum */
            {
              id: "price48-pedigree-card",
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
                  id: "price48-pedigree-text",
                  type: "text",
                  text: "Atelier Standards: All projects are registered with the Royal Institute of British Architects (RIBA) and American Institute of Architects (AIA). Works have been permanently cataloged in the Swiss Architectural Archives.",
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
  // TEMPLATE #50: Interactive ROI Payback Calculator & Value Hybrid
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-50-roi-calculator-investment-hybrid",
    name: "Interactive ROI Payback Calculator & Value Hybrid",
    kind: "section",
    root: {
      id: "price50-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price50-main-stack",
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
              id: "price50-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price50-eyebrow",
                  type: "badge",
                  text: "AUDITED ECONOMIC IMPACT & LABOR PRODUCTIVITY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price50-title",
                  type: "heading",
                  level: 2,
                  text: "Enterprise AI Copilot: Guaranteed 6.3x ROI Payback",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price50-subtitle",
                  type: "text",
                  text: "Stop evaluating software on vanity seat prices. Our audited economic model proves that automated engineering workflows reclaim 32 hours per engineer every month.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Inputs & ROI Receipt Grid */
            {
              id: "price50-calculator-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Column 1: Team Workforce Parameters */
                {
                  id: "price50-col-inputs",
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
                      id: "price50-inp-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price50-inp-badge",
                          type: "badge",
                          text: "ORGANIZATIONAL PARAMETERS",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price50-inp-title",
                          type: "heading",
                          level: 3,
                          text: "Workforce Investment Baseline",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price50-inp-fee-block",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price50-inp-rate",
                              type: "text",
                              text: "$4,500 / month",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price50-inp-unit",
                              type: "text",
                              text: "Enterprise Platform License (Covers up to 50 active engineers)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price50-inp-breakdown",
                          type: "list",
                          marker: "check",
                          items: [
                            "Average fully loaded engineer cost: $85 / hour",
                            "Current manual code review overhead: 12 hrs / week",
                            "Reclaimed capacity with Copilot: 32 hrs / engineer / mo",
                            "Gross monthly productivity value: $28,400 / month",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Column 2: Net Payback Receipt Card (Highlighted) */
                {
                  id: "price50-col-receipt",
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
                      id: "price50-rec-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price50-rec-badge",
                          type: "badge",
                          text: "AUDITED PAYBACK: 21 DAYS",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price50-rec-title",
                          type: "heading",
                          level: 3,
                          text: "Net Cashflow Delta",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price50-rec-metric-block",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price50-rec-delta",
                              type: "text",
                              text: "+ $23,900 / mo Net Savings",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price50-rec-annualized",
                              type: "text",
                              text: "$286,800 net annualized corporate return (6.3x cash multiple)",
                              style: { typography: { size: "sm", weight: "semibold" } },
                            },
                          ],
                        },
                        {
                          id: "price50-rec-specs",
                          type: "list",
                          marker: "check",
                          items: [
                            "Time to full capital payback: Exactly 21 business days",
                            "Annual engineering hours unlocked: 19,200 hours / year",
                            "Equivalent capacity addition: +4.2 full-time senior engineers",
                            "Contractual breakeven SLA: 90-day money-back guarantee",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price50-rec-btn",
                          type: "button",
                          label: "Deploy Copilot & Lock 6.3x ROI ($4,500/mo)",
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

            /* Forrester TEI Methodology Guarantee */
            {
              id: "price50-methodology-card",
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
                  id: "price50-methodology-text",
                  type: "text",
                  text: "Economic Proof Warranty: Methodology audited in accordance with the Forrester Total Economic Impact™ (TEI) framework. If your engineering team does not measure a minimum 3x labor efficiency gain within 90 days, cancel with a 100% refund.",
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
