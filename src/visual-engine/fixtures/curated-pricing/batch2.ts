import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 2 (Radically Differentiated Archetypes)
 *
 * #02: Editorial Studio Retainer Split (pricing-02-two-tier-simple-split)
 * #05: Open-Source Binary vs Cloud VPC Bridge (pricing-05-free-vs-paid-bridge)
 * #21: Hardware Appliance & Modular Capability Ledger (pricing-21-base-plus-modular-addons)
 * #35: Legal Counsel & Forensic Advisory Fee Schedule (pricing-35-hourly-day-rate-sheet)
 * #49: Executive ROI Payback Memo & Investment Scale (pricing-49-pricing-testimonial-hybrid)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_2: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #02: Editorial Studio Retainer Split
  // High-End Creative Studio / Architecture / Brand Consulting
  // No generic cards, no checkmarks. Clean editorial typography & rule dividers.
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-02-two-tier-simple-split",
    name: "Editorial Studio Retainer Split",
    kind: "section",
    root: {
      id: "price02-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price02-main-container",
          type: "stack",
          direction: "column",
          alignment: "start",
          distribution: "start",
          wrap: false,
          gap: "2xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Section Lead In */
            {
              id: "price02-lead-stack",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price02-eyebrow",
                  type: "badge",
                  text: "STUDIO ENGAGEMENT INDEX",
                  style: {
                    color: { background: "surface-muted", text: "text-muted" },
                    typography: { size: "sm", weight: "semibold" },
                  },
                },
                {
                  id: "price02-title",
                  type: "heading",
                  level: 2,
                  text: "Practice Retainers & Advisory Partnerships",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* Editorial Asymmetric Split (5 cols / 7 cols) */
            {
              id: "price02-editorial-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "2xl" },
                sizing: { width: "full" },
              },
              children: [
                /* Left Column: Studio Manifesto & Philosophy */
                {
                  id: "price02-manifesto-stack",
                  type: "stack",
                  layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    {
                      id: "price02-manifesto-p1",
                      type: "text",
                      text: "We intentionally accept no more than four active client engagements per calendar quarter. All work is conducted directly by founding partners without junior account managers or offshore intermediaries.",
                      style: {
                        typography: { size: "lg", leading: "relaxed" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "price02-manifesto-p2",
                      type: "text",
                      text: "Each retainer includes direct Slack access, weekly asynchronous design audits, and uncapped production delivery within sprint constraints.",
                      style: {
                        typography: { size: "base" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "price02-roster-note",
                      type: "text",
                      text: "Currently booking Q2/Q3 2026 engagements · 1 retainer allocation remaining.",
                      style: {
                        typography: { size: "sm", weight: "medium" },
                        color: { text: "primary" },
                      },
                    },
                    {
                      id: "price02-index-link",
                      type: "button",
                      label: "Request Complete 2026 Portfolio Index →",
                    },
                  ],
                },

                /* Right Column: Two Editorial Retainer Blocks */
                {
                  id: "price02-tiers-stack",
                  type: "stack",
                  layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "xl",
                  children: [
                    /* Tier 1: Design Direction Retainer */
                    {
                      id: "price02-tier1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price02-tier1-header",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "between",
                          wrap: true,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price02-tier1-title",
                              type: "heading",
                              level: 3,
                              text: "Design Direction Retainer",
                              style: {
                                typography: { size: "2xl", weight: "bold" },
                                color: { text: "text" },
                              },
                            },
                            {
                              id: "price02-tier1-price",
                              type: "text",
                              text: "$4,500 / month flat",
                              style: {
                                typography: { size: "xl", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price02-tier1-desc",
                          type: "text",
                          text: "For funded startups requiring seasoned art direction, token governance, and weekly executive design review. Includes up to 15 hours of direct principal execution per month.",
                          style: {
                            typography: { size: "base" },
                            color: { text: "text-muted" },
                          },
                        },
                        {
                          id: "price02-tier1-cta",
                          type: "button",
                          label: "Initiate Direction Retainer",
                        },
                      ],
                    },

                    /* Elegant Divider Rule */
                    {
                      id: "price02-divider",
                      type: "divider",
                      style: {
                        border: { color: "text-muted", width: "thin" },
                        sizing: { width: "full" },
                      },
                    },

                    /* Tier 2: Venture Immersion Retainer */
                    {
                      id: "price02-tier2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price02-tier2-header",
                          type: "stack",
                          direction: "row",
                          alignment: "end",
                          distribution: "between",
                          wrap: true,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price02-tier2-title",
                              type: "heading",
                              level: 3,
                              text: "Full-Cycle Venture Immersion",
                              style: {
                                typography: { size: "2xl", weight: "bold" },
                                color: { text: "text" },
                              },
                            },
                            {
                              id: "price02-tier2-price",
                              type: "text",
                              text: "$11,000 / month flat",
                              style: {
                                typography: { size: "xl", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price02-tier2-desc",
                          type: "text",
                          text: "Dedicated fractional Head of Design embedded inside your executive leadership. Complete visual system orchestration, hiring interview panels, and weekly board presentation decks.",
                          style: {
                            typography: { size: "base" },
                            color: { text: "text-muted" },
                          },
                        },
                        {
                          id: "price02-tier2-cta",
                          type: "button",
                          label: "Schedule Executive Briefing",
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
  // TEMPLATE #05: Open-Source Binary vs Cloud VPC Bridge
  // Technical / Developer Infrastructure Tool (Fly.io / Supabase / ClickHouse)
  // Terminal console styling, CLI install command, sub-second latency specs.
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-05-free-vs-paid-bridge",
    name: "Open-Source Binary vs Cloud VPC Bridge",
    kind: "section",
    root: {
      id: "price05-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price05-main-stack",
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
              id: "price05-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price05-eyebrow",
                  type: "badge",
                  text: "INFRASTRUCTURE RUNTIME",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price05-title",
                  type: "heading",
                  level: 2,
                  text: "Self-Host Open Binary or Spin Up Managed VPC",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price05-description",
                  type: "text",
                  text: "Apache 2.0 open daemon with zero telemetry, or resilient multi-region edge instances deployed in seconds.",
                  style: {
                    typography: { size: "lg" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Dual Console Grid (6 cols / 6 cols) */
            {
              id: "price05-console-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Left Console: Community Binary */
                {
                  id: "price05-console-oss",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price05-oss-inner-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price05-oss-tag-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price05-oss-badge",
                              type: "badge",
                              text: "LOCAL DAEMON · AGPLv3",
                              style: {
                                color: { background: "surface-muted", text: "text-muted" },
                                typography: { size: "sm", weight: "semibold" },
                              },
                            },
                            {
                              id: "price05-oss-rate",
                              type: "text",
                              text: "$0 Free Forever",
                              style: {
                                typography: { size: "lg", weight: "bold" },
                                color: { text: "text" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price05-oss-heading",
                          type: "heading",
                          level: 3,
                          text: "Standalone Community Binary",
                          style: {
                            typography: { size: "xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        /* Interactive CLI Terminal Block */
                        {
                          id: "price05-oss-cli",
                          type: "code",
                          code: "$ brew install ozmi/tap/ozmi-engine\n$ ozmi daemon start --port=8443\n[INFO] SQLite WAL mode enabled (0.2ms latency)\n[OK] Listening on 127.0.0.1:8443 (Zero telemetry)",
                          language: "bash",
                          showLanguage: false,
                          showCopy: true,
                          wrap: true,
                          style: {
                            spacing: { padding: "md" },
                            border: { width: "thin", color: "text-muted", radius: "md" },
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price05-oss-spec",
                          type: "text",
                          text: "Single compiled Go binary with embedded DuckDB. No phone-home telemetry. Unlimited local schema exports.",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                        {
                          id: "price05-oss-btn",
                          type: "button",
                          label: "Clone Repository on GitHub",
                          style: { sizing: { width: "full" } },
                        },
                      ],
                    },
                  ],
                },

                /* Right Console: Managed Cloud VPC */
                {
                  id: "price05-console-cloud",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price05-cloud-inner-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price05-cloud-tag-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price05-cloud-badge",
                              type: "badge",
                              text: "MANAGED EDGE RUNTIME",
                              style: {
                                color: { background: "primary", text: "background" },
                                typography: { size: "sm", weight: "bold" },
                              },
                            },
                            {
                              id: "price05-cloud-rate",
                              type: "text",
                              text: "$0.038 / hour (~$27/mo)",
                              style: {
                                typography: { size: "lg", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price05-cloud-heading",
                          type: "heading",
                          level: 3,
                          text: "Global Multi-AZ Cloud Cluster",
                          style: {
                            typography: { size: "xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        /* Interactive CLI Terminal Block */
                        {
                          id: "price05-cloud-cli",
                          type: "code",
                          code: "$ ozmi cloud provision --region=iad,fra\n[OK] Deployed cluster: 3x Edge Nodes\n[OK] Automatic NVMe snapshot replication\n[OK] Anycast IP: 198.51.100.24 (Sub-10ms P99)",
                          language: "bash",
                          showLanguage: false,
                          showCopy: true,
                          wrap: true,
                          style: {
                            spacing: { padding: "md" },
                            border: { width: "thin", color: "primary", radius: "md" },
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price05-cloud-spec",
                          type: "text",
                          text: "Financially backed 99.99% availability SLA. Automatic multi-region failover and point-in-time snapshot recovery.",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                        {
                          id: "price05-cloud-btn",
                          type: "button",
                          label: "Provision Cloud Cluster in 60s",
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #21: Hardware Appliance & Modular Capability Ledger
  // Datacenter / Hardware Infrastructure / Dedicated Telecom
  // Horizontal base cluster summary bar + modular attachable capability rows.
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-21-base-plus-modular-addons",
    name: "Hardware Appliance & Modular Capability Ledger",
    kind: "section",
    root: {
      id: "price21-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price21-main-stack",
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
              id: "price21-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price21-eyebrow",
                  type: "badge",
                  text: "BARE METAL INFRASTRUCTURE",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price21-title",
                  type: "heading",
                  level: 2,
                  text: "Hardware Appliance & Modular Capability Ledger",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price21-description",
                  type: "text",
                  text: "Provision dedicated 1U cluster nodes with predictable base pricing, then attach specialized hardware security and networking modules.",
                  style: {
                    typography: { size: "lg" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Horizontal Base Node Banner */
            {
              id: "price21-base-bar",
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
                  id: "price21-base-flex-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "lg",
                  children: [
                    {
                      id: "price21-base-left-meta",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price21-base-pill",
                          type: "badge",
                          text: "FOUNDATIONAL 1U RACK NODE",
                          style: {
                            color: { background: "surface-muted", text: "text-muted" },
                            typography: { size: "sm", weight: "semibold" },
                          },
                        },
                        {
                          id: "price21-base-h3",
                          type: "heading",
                          level: 3,
                          text: "Enterprise Edge Node (1U Rack Chassis)",
                          style: {
                            typography: { size: "2xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price21-base-hardware-spec",
                          type: "text",
                          text: "16 Dedicated vCPU · 64GB DDR5 ECC RAM · 2x 1TB Enterprise NVMe · 10Gbps Uplink",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                      ],
                    },
                    {
                      id: "price21-base-right-action",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "end",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price21-base-cost-text",
                          type: "text",
                          text: "$199 / mo",
                          style: {
                            typography: { size: "4xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price21-base-btn",
                          type: "button",
                          label: "Order Base Node",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Tabular Add-on Capabilities Rows */
            {
              id: "price21-addons-ledger-stack",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "md",
              style: { sizing: { width: "full" } },
              children: [
                {
                  id: "price21-addons-section-title",
                  type: "heading",
                  level: 3,
                  text: "Modular Add-On Hardware & Security Packs",
                  style: {
                    typography: { size: "xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },

                /* Module Row 1: HSM */
                {
                  id: "price21-row-hsm",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                    sizing: { width: "full" },
                  },
                  children: [
                    {
                      id: "price21-hsm-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      children: [
                        {
                          id: "price21-hsm-info",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price21-hsm-badge",
                              type: "badge",
                              text: "CRYPTOGRAPHY",
                              style: {
                                color: { background: "surface-muted", text: "text-muted" },
                                typography: { size: "sm", weight: "semibold" },
                              },
                            },
                            {
                              id: "price21-hsm-title",
                              type: "heading",
                              level: 4,
                              text: "Dedicated Hardware Security Module (HSM)",
                              style: {
                                typography: { size: "lg", weight: "bold" },
                                color: { text: "text" },
                              },
                            },
                            {
                              id: "price21-hsm-desc",
                              type: "text",
                              text: "FIPS 140-2 Level 3 certified cryptographic key storage with PCI-DSS compliance enclave.",
                              style: {
                                typography: { size: "sm" },
                                color: { text: "text-muted" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price21-hsm-action-stack",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "end",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "price21-hsm-rate",
                              type: "text",
                              text: "+$150 / mo",
                              style: {
                                typography: { size: "xl", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                            {
                              id: "price21-hsm-btn",
                              type: "button",
                              label: "+ Attach to Node",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Module Row 2: Anycast Transit */
                {
                  id: "price21-row-transit",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                    sizing: { width: "full" },
                  },
                  children: [
                    {
                      id: "price21-transit-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      children: [
                        {
                          id: "price21-transit-info",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price21-transit-badge",
                              type: "badge",
                              text: "NETWORKING",
                              style: {
                                color: { background: "surface-muted", text: "text-muted" },
                                typography: { size: "sm", weight: "semibold" },
                              },
                            },
                            {
                              id: "price21-transit-title",
                              type: "heading",
                              level: 4,
                              text: "Global Anycast BGP Routing & DDoS Scrubbing",
                              style: {
                                typography: { size: "lg", weight: "bold" },
                                color: { text: "text" },
                              },
                            },
                            {
                              id: "price21-transit-desc",
                              type: "text",
                              text: "BGP route announcement across 24 global Tier-1 Internet exchanges with sub-5ms deflection.",
                              style: {
                                typography: { size: "sm" },
                                color: { text: "text-muted" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price21-transit-action-stack",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "end",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "price21-transit-rate",
                              type: "text",
                              text: "+$75 / mo",
                              style: {
                                typography: { size: "xl", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                            {
                              id: "price21-transit-btn",
                              type: "button",
                              label: "+ Attach to Node",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Module Row 3: NVMe Cold Storage Expansion */
                {
                  id: "price21-row-storage",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                    sizing: { width: "full" },
                  },
                  children: [
                    {
                      id: "price21-storage-stack",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      children: [
                        {
                          id: "price21-storage-info",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price21-storage-badge",
                              type: "badge",
                              text: "BLOCK STORAGE",
                              style: {
                                color: { background: "surface-muted", text: "text-muted" },
                                typography: { size: "sm", weight: "semibold" },
                              },
                            },
                            {
                              id: "price21-storage-title",
                              type: "heading",
                              level: 4,
                              text: "10TB High-IOPS Cold Storage Volume",
                              style: {
                                typography: { size: "lg", weight: "bold" },
                                color: { text: "text" },
                              },
                            },
                            {
                              id: "price21-storage-desc",
                              type: "text",
                              text: "Direct PCIe 4.0 attachment with automated background replication across secondary chassis.",
                              style: {
                                typography: { size: "sm" },
                                color: { text: "text-muted" },
                              },
                            },
                          ],
                        },
                        {
                          id: "price21-storage-action-stack",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "end",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "price21-storage-rate",
                              type: "text",
                              text: "+$120 / mo",
                              style: {
                                typography: { size: "xl", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                            {
                              id: "price21-storage-btn",
                              type: "button",
                              label: "+ Attach to Node",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Disclosures & Terms */
            {
              id: "price21-disclosure-text",
              type: "text",
              text: "All add-on hardware modules are prorated daily and can be detached dynamically without re-imaging the underlying node.",
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
  // TEMPLATE #35: Legal Counsel & Forensic Advisory Fee Schedule
  // Corporate Law, Forensic Accounting, Litigation Advisory
  // Formal legal document structure, schedule of hourly rates by seniority, fixed audits.
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-35-hourly-day-rate-sheet",
    name: "Legal Counsel & Forensic Advisory Fee Schedule",
    kind: "section",
    root: {
      id: "price35-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price35-main-stack",
          type: "stack",
          direction: "column",
          alignment: "start",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "5xl", align: "center" } },
          children: [
            /* Legal Heading Block */
            {
              id: "price35-legal-header",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price35-firm-name",
                  type: "badge",
                  text: "CARTER, STERLING & VANCE LLP · NEW YORK & LONDON",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price35-doc-title",
                  type: "heading",
                  level: 2,
                  text: "Schedule of Professional Fees & Retainer Guidelines",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price35-doc-notice",
                  type: "text",
                  text: "Official billing schedule effective for calendar year 2026. All corporate matters require an executed Engagement Letter and advance trust retainer prior to substantive representation.",
                  style: {
                    typography: { size: "sm" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* Schedule I: Hourly Rates by Seniority */
            {
              id: "price35-sched1-stack",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "md",
              style: { sizing: { width: "full" } },
              children: [
                {
                  id: "price35-sched1-heading",
                  type: "heading",
                  level: 3,
                  text: "Schedule I · Hourly Rates by Seniority",
                  style: {
                    typography: { size: "xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },

                /* Partner Row */
                {
                  id: "price35-partner-row",
                  type: "stack",
                  direction: "row",
                  alignment: "end",
                  distribution: "between",
                  wrap: true,
                  gap: "sm",
                  style: { sizing: { width: "full" } },
                  children: [
                    {
                      id: "price35-partner-meta",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price35-partner-role",
                          type: "text",
                          text: "Senior Partner & Former Appellate Judge",
                          style: {
                            typography: { size: "lg", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price35-partner-desc",
                          type: "text",
                          text: "Lead counsel on cross-border litigation, regulatory enforcement inquiries, and board investigations.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price35-partner-rate",
                      type: "text",
                      text: "$950 / billable hour",
                      style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                    },
                  ],
                },

                {
                  id: "price35-div1",
                  type: "divider",
                  style: { border: { color: "text-muted", width: "thin" }, sizing: { width: "full" } },
                },

                /* Special Counsel Row */
                {
                  id: "price35-counsel-row",
                  type: "stack",
                  direction: "row",
                  alignment: "end",
                  distribution: "between",
                  wrap: true,
                  gap: "sm",
                  style: { sizing: { width: "full" } },
                  children: [
                    {
                      id: "price35-counsel-meta",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price35-counsel-role",
                          type: "text",
                          text: "Special Counsel & Forensic Economics Specialist",
                          style: {
                            typography: { size: "lg", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price35-counsel-desc",
                          type: "text",
                          text: "Complex damages modeling, intellectual property valuation, and expert witness depositions.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price35-counsel-rate",
                      type: "text",
                      text: "$650 / billable hour",
                      style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                    },
                  ],
                },

                {
                  id: "price35-div2",
                  type: "divider",
                  style: { border: { color: "text-muted", width: "thin" }, sizing: { width: "full" } },
                },

                /* Senior Associate Row */
                {
                  id: "price35-associate-row",
                  type: "stack",
                  direction: "row",
                  alignment: "end",
                  distribution: "between",
                  wrap: true,
                  gap: "sm",
                  style: { sizing: { width: "full" } },
                  children: [
                    {
                      id: "price35-associate-meta",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price35-associate-role",
                          type: "text",
                          text: "Senior Associate & Regulatory Counsel",
                          style: {
                            typography: { size: "lg", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price35-associate-desc",
                          type: "text",
                          text: "Discovery management, brief drafting, and administrative agency filing proceedings.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price35-associate-rate",
                      type: "text",
                      text: "$420 / billable hour",
                      style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                    },
                  ],
                },
              ],
            },

            /* Schedule II: Fixed-Fee Audits */
            {
              id: "price35-sched2-stack",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "md",
              style: { sizing: { width: "full" } },
              children: [
                {
                  id: "price35-sched2-heading",
                  type: "heading",
                  level: 3,
                  text: "Schedule II · Fixed-Fee Audits & Retainers",
                  style: {
                    typography: { size: "xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price35-audit-row",
                  type: "stack",
                  direction: "row",
                  alignment: "end",
                  distribution: "between",
                  wrap: true,
                  gap: "sm",
                  style: { sizing: { width: "full" } },
                  children: [
                    {
                      id: "price35-audit-meta",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price35-audit-title",
                          type: "text",
                          text: "Comprehensive Pre-Acquisition Corporate Governance Audit",
                          style: {
                            typography: { size: "lg", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price35-audit-desc",
                          type: "text",
                          text: "Complete 60-day corporate record diligence and formal legal risk memorandum for M&A boards.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price35-audit-price",
                      type: "text",
                      text: "$35,000 fixed fee",
                      style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                    },
                  ],
                },
              ],
            },

            /* Action Buttons */
            {
              id: "price35-actions-row",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "start",
              wrap: true,
              gap: "md",
              children: [
                {
                  id: "price35-intake-btn",
                  type: "button",
                  label: "Request Confidential Conflict Check & Intake",
                },
                {
                  id: "price35-pdf-btn",
                  type: "button",
                  label: "Download Formal PDF Fee Schedule",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #49: Executive ROI Payback Memo & Investment Scale
  // High-Growth B2B / Enterprise SaaS Financial Memo
  // Massive ROI metric callouts + payback period breakeven investment tiers.
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-49-pricing-testimonial-hybrid",
    name: "Executive ROI Payback Memo & Investment Scale",
    kind: "section",
    root: {
      id: "price49-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price49-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "2xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "price49-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price49-eyebrow",
                  type: "badge",
                  text: "AUDITED FINANCIAL OUTCOMES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price49-title",
                  type: "heading",
                  level: 2,
                  text: "Recover Your Entire Annual Investment in Under 45 Days",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "price49-description",
                  type: "text",
                  text: "Independent analysis of 120 enterprise deployments shows an average 3.4x net return on capital within the first 6 months.",
                  style: {
                    typography: { size: "lg" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Part Massive ROI Metric Proofboard */
            {
              id: "price49-metrics-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Metric 1 */
                {
                  id: "price49-card-m1",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price49-m1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price49-m1-stat",
                          type: "text",
                          text: "$184,000",
                          style: {
                            typography: { size: "4xl", weight: "bold" },
                            color: { text: "primary" },
                          },
                        },
                        {
                          id: "price49-m1-label",
                          type: "text",
                          text: "Annual engineering hours recovered",
                          style: {
                            typography: { size: "base", weight: "semibold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price49-m1-desc",
                          type: "text",
                          text: "Measured by eliminating repetitive UI boilerplate and custom CMS glue code across 35 repos.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Metric 2 */
                {
                  id: "price49-card-m2",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price49-m2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price49-m2-stat",
                          type: "text",
                          text: "3.4x",
                          style: {
                            typography: { size: "4xl", weight: "bold" },
                            color: { text: "primary" },
                          },
                        },
                        {
                          id: "price49-m2-label",
                          type: "text",
                          text: "Net return on capital (6-mo)",
                          style: {
                            typography: { size: "base", weight: "semibold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price49-m2-desc",
                          type: "text",
                          text: "Direct cost offset comparing external agency vendor fees vs in-house visual builder speed.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Metric 3 */
                {
                  id: "price49-card-m3",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price49-m3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price49-m3-stat",
                          type: "text",
                          text: "41 Days",
                          style: {
                            typography: { size: "4xl", weight: "bold" },
                            color: { text: "primary" },
                          },
                        },
                        {
                          id: "price49-m3-label",
                          type: "text",
                          text: "Average capital breakeven",
                          style: {
                            typography: { size: "base", weight: "semibold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price49-m3-desc",
                          type: "text",
                          text: "Point at which accumulated developer savings fully exceeded total annual upfront license fee.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Investment Rollout Tiers (6 cols / 6 cols) */
            {
              id: "price49-investment-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Level 1 */
                {
                  id: "price49-inv-level1",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price49-l1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price49-l1-badge",
                          type: "badge",
                          text: "COMMERCIAL ROLLOUT",
                          style: {
                            color: { background: "surface-muted", text: "text-muted" },
                            typography: { size: "sm", weight: "semibold" },
                          },
                        },
                        {
                          id: "price49-l1-title",
                          type: "heading",
                          level: 3,
                          text: "Mid-Market Production Suite",
                          style: {
                            typography: { size: "2xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price49-l1-price",
                          type: "text",
                          text: "$1,250 / mo ($15,000 / year)",
                          style: {
                            typography: { size: "xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price49-l1-roi-case",
                          type: "text",
                          text: "Breakeven achieved at 12 active developers. Eliminates 2 separate third-party headless CMS licenses ($18k/yr combined cost).",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                        {
                          id: "price49-l1-cta",
                          type: "button",
                          label: "Generate Custom Payback Model",
                          style: { sizing: { width: "full" } },
                        },
                      ],
                    },
                  ],
                },

                /* Level 2 */
                {
                  id: "price49-inv-level2",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price49-l2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price49-l2-badge",
                          type: "badge",
                          text: "ENTERPRISE TRANSFORMATION",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "price49-l2-title",
                          type: "heading",
                          level: 3,
                          text: "Global Multi-Org Enterprise Suite",
                          style: {
                            typography: { size: "2xl", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "price49-l2-price",
                          type: "text",
                          text: "$3,750 / mo ($45,000 / year)",
                          style: {
                            typography: { size: "xl", weight: "bold" },
                            color: { text: "primary" },
                          },
                        },
                        {
                          id: "price49-l2-roi-case",
                          type: "text",
                          text: "Uncapped developers across all business units. Includes dedicated fractional solutions architect and financially backed 99.99% runtime SLA.",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                        {
                          id: "price49-l2-cta",
                          type: "button",
                          label: "Schedule CFO Financial Review",
                          style: { sizing: { width: "full" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Executive Quote Attribution */
            {
              id: "price49-quote-card",
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
                  id: "price49-quote-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "sm",
                  children: [
                    {
                      id: "price49-exec-quote",
                      type: "quote",
                      quote:
                        "“From a CFO perspective, this software paid for itself before Q1 ended. We recovered 140+ hours per sprint and avoided hiring two specialized UI contract engineers.”",
                      author: "Marcus Lindqvist",
                      role: "Chief Financial Officer, Veloce Global Group",
                      style: {
                        typography: { size: "base" },
                        color: { text: "text" },
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
];
