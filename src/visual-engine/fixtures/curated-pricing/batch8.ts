import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 8 (Templates #20, #27, #28, #32, #40)
 *
 * #20: Modular Add-On Shelf & Capability Rack (pricing-20-modular-addon-rack)
 * #27: Annual Savings Switch & Cadence Comparison (pricing-27-annual-savings-switch)
 * #28: Monthly vs Annual Cashflow Comparison Spread (pricing-28-monthly-vs-annual-savings-breakdown)
 * #32: Subscription & Onboarding Setup Fee Ledger (pricing-32-subscription-setup-onboarding)
 * #40: Nonprofit & NGO Grant Subsidy Qualification Ladder (pricing-40-nonprofit-grant-subsidy)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_8: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #20: Modular Add-On Shelf & Capability Rack
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-20-modular-addon-rack",
    name: "Modular Add-On Shelf & Capability Rack",
    kind: "section",
    root: {
      id: "price20-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price20-main-stack",
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
              id: "price20-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price20-eyebrow",
                  type: "badge",
                  text: "HOT-SWAPPABLE INFRASTRUCTURE MODULES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price20-title",
                  type: "heading",
                  level: 2,
                  text: "Modular Capability Rack: Zero-Downtime Add-Ons",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price20-subtitle",
                  type: "text",
                  text: "Attach dedicated isolated capabilities to your production cluster on demand. Independent monthly cycles, hot-swappable provisioning, and zero cluster restarts.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 4-Card Module Shelf Grid */
            {
              id: "price20-shelf-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Module 1: Dedicated IP */
                {
                  id: "price20-mod-1",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price20-mod-1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price20-mod-1-badge",
                          type: "badge",
                          text: "NETWORKING",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price20-mod-1-title",
                          type: "heading",
                          level: 3,
                          text: "Dedicated IPv4 Subnet",
                          style: { typography: { size: "lg", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-1-desc",
                          type: "text",
                          text: "Clean reputation ARIN block with custom reverse DNS and BGP route optimization.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-1-price",
                          type: "text",
                          text: "$45 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-1-unit",
                          type: "text",
                          text: "per /30 subnet allocation",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-1-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Clean sender reputation",
                            "Custom PTR rDNS records",
                            "BYO-IP prefix routing",
                            "Automated failover IP swap",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price20-mod-1-btn",
                          type: "button",
                          label: "Attach Subnet",
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

                /* Module 2: Vector Search Engine */
                {
                  id: "price20-mod-2",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price20-mod-2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price20-mod-2-badge",
                          type: "badge",
                          text: "AI ACCELERATION",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price20-mod-2-title",
                          type: "heading",
                          level: 3,
                          text: "Vector Search Node",
                          style: { typography: { size: "lg", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-2-desc",
                          type: "text",
                          text: "HNSW embedded index accelerator for RAG embeddings with sub-5ms cosine retrieval.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-2-price",
                          type: "text",
                          text: "$120 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-2-unit",
                          type: "text",
                          text: "per 10M vector memory unit",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-2-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Sub-5ms cosine similarity",
                            "1536-dim embedding support",
                            "Quantized in-RAM caching",
                            "Live streaming sync hook",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price20-mod-2-btn",
                          type: "button",
                          label: "Attach Vector Node",
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

                /* Module 3: Immutable Audit Vault */
                {
                  id: "price20-mod-3",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price20-mod-3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price20-mod-3-badge",
                          type: "badge",
                          text: "COMPLIANCE & AUDIT",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price20-mod-3-title",
                          type: "heading",
                          level: 3,
                          text: "Immutable Audit Vault",
                          style: { typography: { size: "lg", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-3-desc",
                          type: "text",
                          text: "WORM write-once cryptographically sealed audit logging with 7-year regulatory compliance.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-3-price",
                          type: "text",
                          text: "$80 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-3-unit",
                          type: "text",
                          text: "per isolated tenant vault",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-3-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "WORM cryptographic seal",
                            "Automated SOC2 audit export",
                            "SIEM webhook forwarding",
                            "7-year retention guarantee",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price20-mod-3-btn",
                          type: "button",
                          label: "Attach Audit Vault",
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

                /* Module 4: Global Edge POP CDN */
                {
                  id: "price20-mod-4",
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
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price20-mod-4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price20-mod-4-badge",
                          type: "badge",
                          text: "GLOBAL CDN",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price20-mod-4-title",
                          type: "heading",
                          level: 3,
                          text: "Anycast Edge CDN",
                          style: { typography: { size: "lg", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-4-desc",
                          type: "text",
                          text: "280+ global Tier-1 POP locations with HTTP/3 QUIC termination and DDoS scrubbing.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-4-price",
                          type: "text",
                          text: "$65 / mo",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price20-mod-4-unit",
                          type: "text",
                          text: "per 5TB edge bandwidth tier",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price20-mod-4-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "280+ global Tier-1 POPs",
                            "HTTP/3 QUIC 0-RTT handshakes",
                            "Real-time DDoS scrubbing",
                            "Edge WebAssembly workers",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price20-mod-4-btn",
                          type: "button",
                          label: "Attach Edge POP",
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

            /* Reassurance Footnote */
            {
              id: "price20-footer-card",
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
                  id: "price20-footer-text",
                  type: "text",
                  text: "Hot-swappable architecture: Add or detach any capability module without restarting primary application services. Billed second-by-second prorated to your active billing cycle.",
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
  // TEMPLATE #27: Annual Savings Switch & Cadence Comparison
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-27-annual-savings-switch",
    name: "Annual Savings Switch & Cadence Comparison",
    kind: "section",
    root: {
      id: "price27-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price27-main-stack",
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
              id: "price27-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price27-eyebrow",
                  type: "badge",
                  text: "FLEXIBLE SUBSCRIPTION CADENCE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price27-title",
                  type: "heading",
                  level: 2,
                  text: "Scale Effortlessly with 2 Months Free on Annual",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price27-subtitle",
                  type: "text",
                  text: "Lock in an annual commitment and unlock immediate 20% savings across all tiers. Transparent dual-cadence pricing with instant proration.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Interactive Cadence Toggle Pill Representation */
            {
              id: "price27-cadence-pill-stack",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "center",
              wrap: false,
              gap: "sm",
              style: {
                spacing: { padding: "xs" },
                border: { width: "thin", color: "border", radius: "full" },
                color: { background: "surface-muted" },
              },
              children: [
                {
                  id: "price27-cadence-monthly",
                  type: "text",
                  text: "Monthly Billing",
                  style: {
                    typography: { size: "sm", weight: "medium" },
                    color: { text: "text-muted" },
                    spacing: { paddingX: "md", paddingY: "xs" },
                  },
                },
                {
                  id: "price27-cadence-annual",
                  type: "badge",
                  text: "Annual (Save 20% + 2 Months Free)",
                  style: {
                    color: { background: "primary", text: "primary-foreground" },
                    typography: { size: "sm", weight: "bold" },
                    spacing: { paddingX: "md", paddingY: "xs" },
                  },
                },
              ],
            },

            /* 3-Column Plan Grid */
            {
              id: "price27-plan-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Plan 1: Standard Starter */
                {
                  id: "price27-plan-standard",
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
                      id: "price27-std-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price27-std-name",
                          type: "heading",
                          level: 3,
                          text: "Standard",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price27-std-desc",
                          type: "text",
                          text: "Essential collaboration for small growing teams needing automated workflows.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price27-std-price-block",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price27-std-rate",
                              type: "text",
                              text: "$24",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price27-std-period",
                              type: "text",
                              text: "/ mo (billed $288/yr)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price27-std-savings-pill",
                          type: "badge",
                          text: "Save $60 vs monthly ($29/mo)",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "semibold" },
                          },
                        },
                        {
                          id: "price27-std-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 5 team seats included",
                            "10,000 monthly active events",
                            "Standard analytics dashboards",
                            "Email support (24-hour response)",
                            "14-day full version history",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price27-std-btn",
                          type: "button",
                          label: "Start 14-Day Free Trial",
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

                /* Plan 2: Growth Engine (Recommended) */
                {
                  id: "price27-plan-growth",
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
                      id: "price27-gro-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price27-gro-top-badge",
                          type: "badge",
                          text: "MOST POPULAR • SAVE 20%",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price27-gro-name",
                          type: "heading",
                          level: 3,
                          text: "Growth Engine",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price27-gro-desc",
                          type: "text",
                          text: "Complete scale toolkit for high-velocity teams running mission-critical operations.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price27-gro-price-block",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price27-gro-rate",
                              type: "text",
                              text: "$71",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price27-gro-period",
                              type: "text",
                              text: "/ mo (billed $852/yr)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price27-gro-savings-pill",
                          type: "badge",
                          text: "Save $216 vs monthly ($89/mo)",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price27-gro-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Up to 25 team seats included",
                            "100,000 monthly active events",
                            "Advanced cohort & funnel analytics",
                            "Outbound webhooks & REST API",
                            "Priority chat support (1-hour SLA)",
                            "Custom domain & brand theming",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price27-gro-btn",
                          type: "button",
                          label: "Start 14-Day Free Trial",
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

                /* Plan 3: Scale Velocity */
                {
                  id: "price27-plan-scale",
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
                      id: "price27-scl-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price27-scl-name",
                          type: "heading",
                          level: 3,
                          text: "Scale Velocity",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price27-scl-desc",
                          type: "text",
                          text: "High-volume infrastructure with dedicated database replica and enterprise compliance.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price27-scl-price-block",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price27-scl-rate",
                              type: "text",
                              text: "$159",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price27-scl-period",
                              type: "text",
                              text: "/ mo (billed $1,908/yr)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price27-scl-savings-pill",
                          type: "badge",
                          text: "Save $480 vs monthly ($199/mo)",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "semibold" },
                          },
                        },
                        {
                          id: "price27-scl-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited seats & workspaces",
                            "1,000,000 monthly events included",
                            "Dedicated database read replica",
                            "SAML SSO & SCIM directory sync",
                            "99.95% uptime SLA with financial backing",
                            "Dedicated technical account manager",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price27-scl-btn",
                          type: "button",
                          label: "Start 14-Day Free Trial",
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

            /* Proof Footnote Strip */
            {
              id: "price27-proof-strip",
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
                  id: "price27-proof-text",
                  type: "text",
                  text: "14-day zero-risk trial on all plans • No credit card required to start • Instant proration when switching tiers • Cancel anytime with 1-click in account settings",
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
  // TEMPLATE #28: Monthly vs Annual Cashflow Comparison Spread
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-28-monthly-vs-annual-savings-breakdown",
    name: "Monthly vs Annual Cashflow Comparison Spread",
    kind: "section",
    root: {
      id: "price28-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price28-main-stack",
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
              id: "price28-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price28-eyebrow",
                  type: "badge",
                  text: "CORPORATE TREASURY & PROCUREMENT ANALYSIS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price28-title",
                  type: "heading",
                  level: 2,
                  text: "Monthly Flexibility vs. Annual Capital Efficiency",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price28-subtitle",
                  type: "text",
                  text: "A transparent side-by-side breakdown of operational liquidity versus committed procurement savings. Designed for CFOs, Controllers, and Procurement Directors.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Cashflow Spread Grid */
            {
              id: "price28-spread-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Column 1: Monthly Flexibility */
                {
                  id: "price28-col-monthly",
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
                      id: "price28-mo-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price28-mo-badge",
                          type: "badge",
                          text: "OPERATIONAL AGILITY",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price28-mo-title",
                          type: "heading",
                          level: 3,
                          text: "Month-to-Month Flexibility",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price28-mo-price",
                          type: "text",
                          text: "$1,200 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price28-mo-annualized",
                          type: "text",
                          text: "Effective Annual Run-Rate: $14,400 / year",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price28-mo-desc",
                          type: "text",
                          text: "Preserve operational working capital and short-term liquidity with zero multi-month contract commitment.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price28-mo-specs",
                          type: "list",
                          marker: "bullet",
                          items: [
                            "Billing Cadence: Billed 1st of every calendar month",
                            "Commitment Term: 30-day rolling cancellation window",
                            "Cashflow Impact: Preserves monthly capital reserves",
                            "Contract Review: Standard click-through terms of service",
                            "Price Protection: 60-day advance notice for price revisions",
                            "Support Channel: Asynchronous corporate ticketing SLA",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price28-mo-btn",
                          type: "button",
                          label: "Choose Monthly Flexibility ($1,200/mo)",
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

                /* Column 2: Annual Capital Efficiency (Highlighted) */
                {
                  id: "price28-col-annual",
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
                      id: "price28-yr-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price28-yr-badge",
                          type: "badge",
                          text: "NET MARGIN PRESERVATION • SAVE $2,880",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price28-yr-title",
                          type: "heading",
                          level: 3,
                          text: "Annual Committed Capital",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price28-yr-price",
                          type: "text",
                          text: "$960 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price28-yr-annualized",
                          type: "text",
                          text: "Upfront Annual Contract: $11,520 / year (Paid Annually)",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price28-yr-desc",
                          type: "text",
                          text: "Lock in an immediate $2,880 corporate cash rebate with guaranteed multi-year pricing protection.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price28-yr-specs",
                          type: "list",
                          marker: "check",
                          items: [
                            "Immediate Savings: $2,880 net annual working capital retained",
                            "Billing Cadence: Single annual ACH / Wire corporate invoice",
                            "Commitment Term: 12-month fixed enterprise contract",
                            "Price Protection: 24-month contract renewal rate lock guaranteed",
                            "Dedicated Architect: Same-week migration kickoff call",
                            "Payment Terms: Net-30 invoicing available for qualified teams",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price28-yr-btn",
                          type: "button",
                          label: "Lock In Annual Savings ($11,520/yr)",
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

            /* Financial Memorandum */
            {
              id: "price28-memo-card",
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
                  id: "price28-memo-text",
                  type: "text",
                  text: "Procurement Notice: Both contract structures include complete SOC2 Type II compliance reports, automated vendor W-9 verification, and standard vendor security assessment responses within 48 hours.",
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
  // TEMPLATE #32: Subscription & Onboarding Setup Fee Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-32-subscription-setup-onboarding",
    name: "Subscription & Onboarding Setup Fee Ledger",
    kind: "section",
    root: {
      id: "price32-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price32-main-stack",
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
              id: "price32-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price32-eyebrow",
                  type: "badge",
                  text: "ENTERPRISE DEPLOYMENT ARCHITECTURE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price32-title",
                  type: "heading",
                  level: 2,
                  text: "Transparent SaaS License + White-Glove Implementation",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price32-subtitle",
                  type: "text",
                  text: "No hidden deployment costs. Contracts transparently separate monthly software licensing from milestone-contingent implementation and data migration engineering.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Tier Deployment Grid */
            {
              id: "price32-tier-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Tier 1: Managed Deployment */
                {
                  id: "price32-tier-managed",
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
                      id: "price32-mng-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price32-mng-badge",
                          type: "badge",
                          text: "MID-MARKET ACCELERATION",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price32-mng-title",
                          type: "heading",
                          level: 3,
                          text: "Managed Deployment",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price32-mng-rates-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price32-mng-license",
                              type: "text",
                              text: "$1,450 / month",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price32-mng-setup-pill",
                              type: "badge",
                              text: "+ $3,500 One-Time Setup & Migration Fee",
                              style: {
                                color: { background: "surface-muted", text: "text" },
                                typography: { size: "sm", weight: "semibold" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price32-mng-desc",
                          type: "text",
                          text: "Turnkey configuration for established companies migrating from spreadsheets or legacy relational databases.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price32-mng-deliverables",
                          type: "list",
                          marker: "check",
                          items: [
                            "Recurring License: Up to 50 active operational seats",
                            "Phase 1: CSV/SQL legacy schema audit (up to 500k rows)",
                            "Phase 2: 3 standard webhook API data synchronizations",
                            "Phase 3: 4 hours live group administrative training",
                            "Go-Live Guarantee: 14 business days to production launch",
                            "Hypercare Support: 30 days dedicated migration Slack channel",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price32-mng-btn",
                          type: "button",
                          label: "Select Managed Deployment",
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

                /* Tier 2: Custom Enterprise Architecture (Highlighted) */
                {
                  id: "price32-tier-enterprise",
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
                      id: "price32-ent-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price32-ent-badge",
                          type: "badge",
                          text: "RECOMMENDED • MISSION-CRITICAL SCALE",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price32-ent-title",
                          type: "heading",
                          level: 3,
                          text: "White-Glove Architecture",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price32-ent-rates-stack",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price32-ent-license",
                              type: "text",
                              text: "$3,800 / month",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price32-ent-setup-pill",
                              type: "badge",
                              text: "+ $9,500 One-Time White-Glove Engineering Fee",
                              style: {
                                color: { background: "surface-muted", text: "text" },
                                typography: { size: "sm", weight: "bold" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price32-ent-desc",
                          type: "text",
                          text: "Full-scale custom systems engineering, bi-directional ETL data validation, and dedicated on-site staff enablement.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price32-ent-deliverables",
                          type: "list",
                          marker: "check",
                          items: [
                            "Recurring License: Unlimited users across corporate subsidiaries",
                            "Phase 1: Bi-directional legacy ERP ETL pipeline engineering",
                            "Phase 2: Custom middleware connector & SCIM directory sync",
                            "Phase 3: 16 hours department certification workshops",
                            "Go-Live Guarantee: 30-day turnkey deployment with parallel testing",
                            "Hypercare Support: 90 days 24/7 dedicated Solutions Engineer",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price32-ent-btn",
                          type: "button",
                          label: "Schedule Architecture SOW Scoping",
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

            /* Milestone Payment Protection Callout */
            {
              id: "price32-milestone-card",
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
                  id: "price32-milestone-text",
                  type: "text",
                  text: "Milestone-contingent guarantee: Setup and onboarding fees are billed 50% upon initial contract execution, and 50% only after formal User Acceptance Testing (UAT) sign-off by your team.",
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
  // TEMPLATE #40: Nonprofit & NGO Grant Subsidy Qualification Ladder
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-40-nonprofit-grant-subsidy",
    name: "Nonprofit & NGO Grant Subsidy Qualification Ladder",
    kind: "section",
    root: {
      id: "price40-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price40-main-stack",
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
              id: "price40-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price40-eyebrow",
                  type: "badge",
                  text: "CIVIC & SOCIAL IMPACT INITIATIVE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price40-title",
                  type: "heading",
                  level: 2,
                  text: "Technology Grants for Verified Nonprofits & NGOs",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price40-subtitle",
                  type: "text",
                  text: "We commit 2% of platform capacity to mission-driven organizations. Subsidized pricing tiers calibrated to your operating budget and registered 501(c)(3) status.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Tier Grant Subsidy Grid */
            {
              id: "price40-grant-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Tier 1: Grassroots Grant ($0) */
                {
                  id: "price40-tier-grassroots",
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
                      id: "price40-grs-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price40-grs-badge",
                          type: "badge",
                          text: "100% SUBSIDIZED GRANT",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price40-grs-title",
                          type: "heading",
                          level: 3,
                          text: "Grassroots Grant",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price40-grs-eligibility",
                          type: "text",
                          text: "Eligibility: Annual operating budget under $250,000",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price40-grs-price",
                          type: "text",
                          text: "$0 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price40-grs-desc",
                          type: "text",
                          text: "Fully sponsored infrastructure for small community charities, animal rescues, and local civic volunteer groups.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price40-grs-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "1,000 active community beneficiaries",
                            "Donor management & automated receipts",
                            "Volunteer coordination & scheduling",
                            "Standard community support portal",
                            "Zero platform processing fees",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price40-grs-btn",
                          type: "button",
                          label: "Apply for 100% Grant ($0)",
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

                /* Tier 2: National Impact Program (Highlighted) */
                {
                  id: "price40-tier-national",
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
                      id: "price40-nat-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price40-nat-badge",
                          type: "badge",
                          text: "75% SUBSIDY • MOST POPULAR",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price40-nat-title",
                          type: "heading",
                          level: 3,
                          text: "National Impact",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price40-nat-eligibility",
                          type: "text",
                          text: "Eligibility: Annual budget between $250k and $2.5M",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price40-nat-price",
                          type: "text",
                          text: "$49 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price40-nat-commercial",
                          type: "text",
                          text: "Commercial Value: $199/mo (75% Grant Subsidy)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price40-nat-desc",
                          type: "text",
                          text: "Subsidized enterprise platform for established 501(c)(3) charities scaling multi-campaign donor development.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price40-nat-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "10,000 active beneficiary & donor records",
                            "Multi-campaign recurring donation pages",
                            "Grant reporting & outcome measurement",
                            "Priority 4-hour humanitarian support SLA",
                            "Custom branding & sub-domain hosting",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price40-nat-btn",
                          type: "button",
                          label: "Verify 501(c)(3) & Start ($49/mo)",
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

                /* Tier 3: Global Humanitarian Foundation */
                {
                  id: "price40-tier-global",
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
                      id: "price40-glo-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price40-glo-badge",
                          type: "badge",
                          text: "75% SUBSIDIZED ENTERPRISE",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price40-glo-title",
                          type: "heading",
                          level: 3,
                          text: "Global Humanitarian",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price40-glo-eligibility",
                          type: "text",
                          text: "Eligibility: Budget > $2.5M or UN / International NGO",
                          style: { typography: { size: "sm", weight: "semibold" } },
                        },
                        {
                          id: "price40-glo-price",
                          type: "text",
                          text: "$149 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price40-glo-commercial",
                          type: "text",
                          text: "Commercial Value: $599/mo (75% Grant Subsidy)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price40-glo-desc",
                          type: "text",
                          text: "Global scale infrastructure with multi-currency ledgers, offline field data sync, and dedicated migration.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price40-glo-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited beneficiaries & country chapters",
                            "Multi-currency donor ledger & OFAC screening",
                            "Cross-border data residency & offline field sync",
                            "Dedicated NGO account manager & data migration",
                            "Quarterly board governance impact summaries",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price40-glo-btn",
                          type: "button",
                          label: "Request Foundation Consultation",
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

            /* Verification Footnote */
            {
              id: "price40-footnote-card",
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
                  id: "price40-footnote-text",
                  type: "text",
                  text: "Verification Guarantee: Qualified automatically through TechSoup Global validation token or IRS 501(c)(3) determination letter. Annual renewal requires only standard public Form 990 or international audited equivalent.",
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
