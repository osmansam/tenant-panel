import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 6 (Templates #15, #16, #17, #25, #38)
 *
 * #15: API Request Volume Meter & Rate Limit Card (pricing-15-api-request-volume)
 * #16: Multi-Tier Object Storage Scale Ledger (pricing-16-storage-cloud-scale)
 * #17: Merchant Transaction Fee & Interchange Schedule (pricing-17-transaction-fee-schedule)
 * #25: Private Concierge & Ultra-HNW Sales Card (pricing-25-contact-sales-concierge)
 * #38: Athletic Club & Private Membership Pass (pricing-38-membership-club-pass)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_6: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #15: API Request Volume Meter & Rate Limit Card
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-15-api-request-volume",
    name: "API Request Volume Meter & Rate Limit Card",
    kind: "section",
    root: {
      id: "price15-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price15-main-stack",
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
              id: "price15-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price15-eyebrow",
                  type: "badge",
                  text: "EDGE API GATEWAY USAGE METERS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price15-title",
                  type: "heading",
                  level: 2,
                  text: "API Request Volume Meter & Concurrency Tiers",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price15-subtitle",
                  type: "text",
                  text: "Scale seamlessly from your first webhook to hundreds of millions of monthly requests. Transparent volume metering with burst rate protection.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Column API Grid */
            {
              id: "price15-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Developer Hobby */
                {
                  id: "price15-col-dev",
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
                      id: "price15-dev-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price15-dev-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price15-dev-badge",
                              type: "badge",
                              text: "UP TO 100K CALLS / MO",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price15-dev-title",
                              type: "text",
                              text: "Developer Sandbox",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price15-dev-price",
                              type: "heading",
                              level: 3,
                              text: "$0 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price15-dev-sub",
                              type: "text",
                              text: "Free forever for building & testing",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price15-dev-cta",
                          type: "button",
                          label: "Generate Free API Key",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price15-dev-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "100,000 monthly API calls included",
                            "Rate Limit: 25 requests / second",
                            "Global CDN edge caching enabled",
                            "Community Discord & GitHub support",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Production Team (Highlighted) */
                {
                  id: "price15-col-team",
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
                      id: "price15-team-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price15-team-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price15-team-badge",
                              type: "badge",
                              text: "100K - 10M CALLS · RECOMMENDED",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price15-team-title",
                              type: "text",
                              text: "Production Gateway",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price15-team-price",
                              type: "heading",
                              level: 3,
                              text: "$49 + $0.0015",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price15-team-sub",
                              type: "text",
                              text: "$49 base includes 1M calls, then $1.50 / 1k overage",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price15-team-cta",
                          type: "button",
                          label: "Deploy Production Gateway",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price15-team-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "1,000,000 monthly calls included",
                            "Rate Limit: 500 requests / second",
                            "Sub-5ms global Edge routing SLA",
                            "Webhook retries & dead-letter queue",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: High-Scale Platform */
                {
                  id: "price15-col-scale",
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
                      id: "price15-scale-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price15-scale-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price15-scale-badge",
                              type: "badge",
                              text: "10M+ CALLS / MO",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price15-scale-title",
                              type: "text",
                              text: "Platform Scale",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price15-scale-price",
                              type: "heading",
                              level: 3,
                              text: "$290 + $0.0006",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price15-scale-sub",
                              type: "text",
                              text: "$290 base includes 10M calls, then $0.60 / 1k calls",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price15-scale-cta",
                          type: "button",
                          label: "Scale Enterprise Gateway",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price15-scale-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "10,000,000 monthly calls included",
                            "Rate Limit: 5,000 requests / second",
                            "Dedicated IP endpoints & VPC peering",
                            "99.99% Financial Uptime Guarantee",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Latency Proof */
            {
              id: "price15-proof-bar",
              type: "text",
              text: "⚡ 99.99% SLA · Sub-5ms Edge Gateway Latency · Automatic Failover across 42 Global Regions",
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
  // TEMPLATE #16: Multi-Tier Object Storage Scale Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-16-storage-cloud-scale",
    name: "Multi-Tier Object Storage Scale Ledger",
    kind: "section",
    root: {
      id: "price16-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price16-main-stack",
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
              id: "price16-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price16-eyebrow",
                  type: "badge",
                  text: "OBJECT STORAGE INFRASTRUCTURE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price16-title",
                  type: "heading",
                  level: 2,
                  text: "Multi-Tier Cloud Object Storage Rate Card",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price16-subtitle",
                  type: "text",
                  text: "S3-compatible distributed object storage. Pay per GB-month based on retrieval frequency with zero egress fee penalties.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Column Storage Tiers */
            {
              id: "price16-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Standard Hot */
                {
                  id: "price16-col-hot",
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
                      id: "price16-hot-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price16-hot-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price16-hot-badge",
                              type: "badge",
                              text: "ACTIVE ASSETS & CDN",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price16-hot-title",
                              type: "text",
                              text: "Hot Standard Tier",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price16-hot-price",
                              type: "heading",
                              level: 3,
                              text: "$0.015 / GB",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price16-hot-sub",
                              type: "text",
                              text: "per month · Zero retrieval charges",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price16-hot-cta",
                          type: "button",
                          label: "Create Standard Bucket",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price16-hot-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Millisecond first-byte retrieval latency",
                            "Free unlimited read and write operations",
                            "Zero minimum retention period",
                            "Automatic WebP/AVIF edge media transforms",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Warm Infrequent (Highlighted) */
                {
                  id: "price16-col-warm",
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
                      id: "price16-warm-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price16-warm-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price16-warm-badge",
                              type: "badge",
                              text: "BACKUPS & LOG ARCHIVES · POPULAR",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price16-warm-title",
                              type: "text",
                              text: "Warm Infrequent Tier",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price16-warm-price",
                              type: "heading",
                              level: 3,
                              text: "$0.007 / GB",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price16-warm-sub",
                              type: "text",
                              text: "per month · $0.001 / GB retrieval",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price16-warm-cta",
                          type: "button",
                          label: "Create Warm Bucket",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price16-warm-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Instant sub-second access upon request",
                            "50% storage cost reduction vs Standard",
                            "30-day minimum object lifecycle",
                            "Ideal for weekly database snapshots",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Cold Glacier Archive */
                {
                  id: "price16-col-cold",
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
                      id: "price16-cold-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price16-cold-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price16-cold-badge",
                              type: "badge",
                              text: "LONG-TERM COMPLIANCE",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price16-cold-title",
                              type: "text",
                              text: "Deep Cold Vault",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price16-cold-price",
                              type: "heading",
                              level: 3,
                              text: "$0.0018 / GB",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price16-cold-sub",
                              type: "text",
                              text: "per month · $0.005 / GB retrieval",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price16-cold-cta",
                          type: "button",
                          label: "Create Vault Bucket",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price16-cold-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "90% storage cost reduction vs Standard",
                            "Immutable WORM (Write Once Read Many)",
                            "SEC Rule 17a-4 & HIPAA compliance lock",
                            "3-5 hour retrieval window guarantee",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Durability Seal Footnote */
            {
              id: "price16-footnote",
              type: "text",
              text: "🛡️ 99.999999999% (11 9's) Data Durability · S3 API Native · Multi-Region Erasure Coding",
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
  // TEMPLATE #17: Merchant Transaction Fee & Interchange Schedule
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-17-transaction-fee-schedule",
    name: "Merchant Transaction Fee & Interchange Schedule",
    kind: "section",
    root: {
      id: "price17-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price17-main-stack",
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
              id: "price17-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price17-eyebrow",
                  type: "badge",
                  text: "GLOBAL PAYMENT ACQUIRING & SETTLEMENT",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price17-title",
                  type: "heading",
                  level: 2,
                  text: "Transparent Payment Acquiring Schedules",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price17-subtitle",
                  type: "text",
                  text: "Choose between simple flat-rate processing or wholesale Interchange-Plus pricing. Zero hidden gateway fees, monthly minimums, or refund penalties.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Fee Split Grid */
            {
              id: "price17-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Col 1: Flat Rate */
                {
                  id: "price17-col-flat",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price17-flat-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price17-flat-badge",
                          type: "badge",
                          text: "SIMPLICITY · ZERO MONTHLY FEES",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price17-flat-title",
                          type: "heading",
                          level: 3,
                          text: "Standard Flat Blended Rate",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price17-flat-rate",
                          type: "heading",
                          level: 2,
                          text: "2.7% + 25¢",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price17-flat-sub",
                          type: "text",
                          text: "per successful domestic card charge · $0 monthly platform fee",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price17-flat-cta",
                          type: "button",
                          label: "Start Merchant Onboarding",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price17-flat-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Visa, Mastercard, Amex & Apple Pay included",
                            "Next-day automated rolling bank payouts",
                            "Automated chargeback defense toolkit",
                            "Free hosted checkout & mobile SDKs",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Interchange-Plus (Highlighted) */
                {
                  id: "price17-col-ic",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price17-ic-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price17-ic-badge",
                          type: "badge",
                          text: "HIGH VOLUME · DIRECT INTERCHANGE",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price17-ic-title",
                          type: "heading",
                          level: 3,
                          text: "Interchange-Plus Wholesale",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price17-ic-rate",
                          type: "heading",
                          level: 2,
                          text: "IC + 0.15% + 10¢",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price17-ic-sub",
                          type: "text",
                          text: "Raw interchange pass-through · $99 / mo gateway access",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price17-ic-cta",
                          type: "button",
                          label: "Apply for Interchange-Plus",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price17-ic-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Wholesale card network cost transparency",
                            "Multi-currency settlement in 32 global currencies",
                            "Card brand optimization & Level 3 data processing",
                            "Dedicated risk underwriting specialist",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* PCI DSS Proof */
            {
              id: "price17-footnote",
              type: "text",
              text: "🔒 PCI-DSS Level 1 Certified Service Provider · End-to-End AES-256 Tokenization · Zero Card Data Storage Liability",
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
  // TEMPLATE #25: Private Concierge & Ultra-HNW Sales Card
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-25-contact-sales-concierge",
    name: "Private Concierge & Ultra-HNW Sales Card",
    kind: "section",
    root: {
      id: "price25-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price25-main-stack",
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
              id: "price25-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price25-eyebrow",
                  type: "badge",
                  text: "PRIVATE CLIENT ADVISORY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price25-title",
                  type: "heading",
                  level: 2,
                  text: "Global Concierge & Principal Asset Advisory",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price25-subtitle",
                  type: "text",
                  text: "Discreet advisory and global coordination for family offices, single principals, and private foundations. Engagements initiated strictly by mandate.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Single Luxury Concierge Dossier Card */
            {
              id: "price25-card",
              type: "card",
              element: "article",
              style: {
                spacing: { padding: "2xl" },
                border: { width: "thin", color: "border", radius: "xl" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price25-card-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    {
                      id: "price25-card-head",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price25-card-badge",
                          type: "badge",
                          text: "BESPOKE ANNUAL MANDATE",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price25-card-heading",
                          type: "heading",
                          level: 3,
                          text: "Retained Principal Advisory Mandate",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price25-card-price",
                          type: "text",
                          text: "By Private Mandate · $50,000 Annual Retainer Minimum",
                          style: { typography: { size: "lg", weight: "semibold" }, color: { text: "primary" } },
                        },
                        {
                          id: "price25-card-desc",
                          type: "text",
                          text: "Full-spectrum cross-border asset management coordination, private aviation logistics, and bespoke confidential acquisitions. Fully customizable scope.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price25-privileges-list",
                      type: "list",
                      marker: "check",
                      items: [
                        "Direct 24/7 personal access to Managing Partner & Private Advisory Desk",
                        "Off-market luxury real estate, fine art, and private collection acquisition",
                        "Dedicated charter clearing for private aviation, superyachts & discreet transport",
                        "Cross-border legal and taxation advisory coordination across 14 jurisdictions",
                        "Absolute discretion protected by strict Swiss-standard Non-Disclosure Agreements",
                      ],
                      style: { typography: { size: "base" } },
                    },
                    {
                      id: "price25-cta",
                      type: "button",
                      label: "Request Confidential Principal Consultation",
                      style: {
                        color: { background: "primary", text: "primary-foreground" },
                        border: { radius: "md" },
                        sizing: { width: "full" },
                      },
                    },
                  ],
                },
              ],
            },

            /* Discretion Pledge */
            {
              id: "price25-footnote",
              type: "text",
              text: "🔒 Inquiries handled under strict legal non-disclosure. No third-party solicitation or data sharing.",
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
  // TEMPLATE #38: Athletic Club & Private Membership Pass
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-38-membership-club-pass",
    name: "Athletic Club & Private Membership Pass",
    kind: "section",
    root: {
      id: "price38-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price38-main-stack",
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
              id: "price38-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price38-eyebrow",
                  type: "badge",
                  text: "PRIVATE ATHLETIC & SOCIAL CLUB",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price38-title",
                  type: "heading",
                  level: 2,
                  text: "Curated Membership Tiers & Clubhouse Access",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price38-subtitle",
                  type: "text",
                  text: "Experience premier recovery hydrotherapy, private wellness studios, and members-only social spaces. Applications reviewed bi-weekly by the Admissions Board.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Membership Split */
            {
              id: "price38-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Col 1: Resident Athletic Pass */
                {
                  id: "price38-col-resident",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price38-resident-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price38-resident-badge",
                          type: "badge",
                          text: "PRIMARY RESIDENCE PASS",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price38-resident-title",
                          type: "heading",
                          level: 3,
                          text: "Resident Athletic Membership",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price38-resident-price",
                          type: "heading",
                          level: 2,
                          text: "$220 / mo",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price38-resident-sub",
                          type: "text",
                          text: "+ $350 one-time initiation fee upon board acceptance",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price38-resident-cta",
                          type: "button",
                          label: "Apply for Resident Pass",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price38-resident-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited access to home clubhouse & gym floor",
                            "Contrast therapy: Infrared sauna & cold plunges",
                            "Daily Reformer Pilates & functional strength classes",
                            "Locker room grooming amenities & towel service",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Global Founder Executive Pass (Highlighted) */
                {
                  id: "price38-col-founder",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price38-founder-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price38-founder-badge",
                          type: "badge",
                          text: "GLOBAL RECIPROCAL ACCESS · EXECUTIVE",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price38-founder-title",
                          type: "heading",
                          level: 3,
                          text: "Founder Executive Passport",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price38-founder-price",
                          type: "heading",
                          level: 2,
                          text: "$480 / mo",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price38-founder-sub",
                          type: "text",
                          text: "+ $750 one-time initiation fee upon board acceptance",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price38-founder-cta",
                          type: "button",
                          label: "Apply for Founder Passport",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price38-founder-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Reciprocal access to all 12 clubhouses globally",
                            "Private executive conference & dining room reservations",
                            "Permanent dedicated locker with laundry service",
                            "4 monthly guest day passes included",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Board Review Footnote */
            {
              id: "price38-footnote",
              type: "text",
              text: "🏛️ Membership is subject to committee review. 30-Day unconditional resignation guarantee.",
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
