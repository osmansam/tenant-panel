import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 4 (Templates #06, #11, #13, #22, #36)
 *
 * #06: Asymmetric Free / Pro / Enterprise Funnel (pricing-06-free-pro-enterprise)
 * #11: Headcount Seat Tier Allocation Ledger (pricing-11-per-seat-fixed-tier)
 * #13: Pre-Paid Compute Credit Wallet (pricing-13-credit-token-wallet)
 * #22: Modular Capability Plan Bundler (pricing-22-build-your-own-plan-bundler, visual-only)
 * #36: Fixed-Scope Deliverable Sprint Menu (pricing-36-project-package-menu)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_4: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #06: Asymmetric Free / Pro / Enterprise Funnel
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-06-free-pro-enterprise",
    name: "Asymmetric Free / Pro / Enterprise Funnel",
    kind: "section",
    root: {
      id: "price06-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price06-main-stack",
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
              id: "price06-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price06-eyebrow",
                  type: "badge",
                  text: "CONVERSION TIERS · ZERO BARRIERS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price06-title",
                  type: "heading",
                  level: 2,
                  text: "Start Free. Scale Without Friction.",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price06-subtitle",
                  type: "text",
                  text: "Launch your sandbox without a credit card. Upgrade instantly when production traffic expands.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Asymmetric Funnel Grid (3-5-4 columns) */
            {
              id: "price06-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Col 1: Free Sandbox (3 cols) */
                {
                  id: "price06-col-free",
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
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price06-free-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price06-free-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price06-free-badge",
                              type: "badge",
                              text: "ALWAYS FREE",
                              style: { color: { background: "surface", text: "text-muted" } },
                            },
                            {
                              id: "price06-free-title",
                              type: "text",
                              text: "Developer Sandbox",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price06-free-price",
                              type: "heading",
                              level: 3,
                              text: "$0",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price06-free-sub",
                              type: "text",
                              text: "For personal experiments",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price06-free-cta",
                          type: "button",
                          label: "Start with GitHub",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price06-free-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "1 active staging cluster",
                            "Up to 5,000 monthly active users",
                            "Community forum support",
                            "Shared edge gateway routing",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Pro Self-Serve (5 cols, HERO RAISED) */
                {
                  id: "price06-col-pro",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 4, columnSpan: 5, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price06-pro-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price06-pro-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price06-pro-badge",
                              type: "badge",
                              text: "MOST POPULAR FOR TEAMS",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price06-pro-title",
                              type: "text",
                              text: "Pro Self-Serve",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price06-pro-price",
                              type: "heading",
                              level: 3,
                              text: "$49 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price06-pro-sub",
                              type: "text",
                              text: "Billed annually · or $59 billed monthly",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price06-pro-cta",
                          type: "button",
                          label: "Start 14-Day Pro Trial",
                          style: {
                            color: { background: "primary", text: "primary" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price06-pro-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Unlimited production clusters",
                            "Up to 100,000 monthly active users",
                            "99.9% uptime financially-backed SLA",
                            "Automated rollbacks & blue-green deploys",
                            "Priority Slack & email ticket channels",
                            "Role-based team access controls",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Enterprise Direct (4 cols) */
                {
                  id: "price06-col-ent",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price06-ent-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price06-ent-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price06-ent-badge",
                              type: "badge",
                              text: "ENTERPRISE PROCUREMENT",
                              style: { color: { background: "surface", text: "text" } },
                            },
                            {
                              id: "price06-ent-title",
                              type: "text",
                              text: "Enterprise Direct",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price06-ent-price",
                              type: "heading",
                              level: 3,
                              text: "Custom",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price06-ent-sub",
                              type: "text",
                              text: "Tailored MSA & multi-cloud deployments",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price06-ent-cta",
                          type: "button",
                          label: "Book Architecture Review",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price06-ent-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Dedicated private VPC & custom BGP peering",
                            "SSO, SAML & custom SCIM provisioning",
                            "99.999% custom SLA with 15-minute response",
                            "Dedicated Principal Solutions Architect",
                            "SOC2 Type II, HIPAA, and ISO 27001 packages",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Customer Trust Proof Strip */
            {
              id: "price06-proof-strip",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "lg" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price06-proof-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price06-proof-label",
                      type: "text",
                      text: "Trusted by 12,000+ fast-moving product teams worldwide",
                      style: { typography: { size: "sm", weight: "bold" } },
                    },
                    {
                      id: "price06-proof-badges",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "end",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price06-b1",
                          type: "badge",
                          text: "Acme Cloud",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price06-b2",
                          type: "badge",
                          text: "HyperGrid",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price06-b3",
                          type: "badge",
                          text: "ScaleMetrics",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
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
  // TEMPLATE #11: Headcount Seat Tier Allocation Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-11-per-seat-fixed-tier",
    name: "Headcount Seat Tier Allocation Ledger",
    kind: "section",
    root: {
      id: "price11-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price11-main-stack",
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
              id: "price11-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price11-eyebrow",
                  type: "badge",
                  text: "TEAM SEAT ALLOCATION",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price11-title",
                  type: "heading",
                  level: 2,
                  text: "Headcount Tiered Workspace Ledger",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price11-subtitle",
                  type: "text",
                  text: "Predictable bundles engineered around team milestones. Add or reassign member licenses dynamically with prorated invoicing.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3 Horizontal Seat-Tier Cards */
            {
              id: "price11-cards-container",
              type: "stack",
              direction: "column",
              alignment: "stretch",
              distribution: "start",
              wrap: false,
              gap: "md",
              style: { sizing: { width: "full" } },
              children: [
                /* Tier 1: Crew (1-5 Seats) */
                {
                  id: "price11-t1-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price11-t1-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price11-t1-col-info",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t1-badge",
                              type: "badge",
                              text: "CREW PACK · 1–5 SEATS",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price11-t1-name",
                              type: "text",
                              text: "Small Studio Workspace",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price11-t1-desc",
                              type: "text",
                              text: "Core collaboration suite for startup founders.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price11-t1-col-rate",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t1-price",
                              type: "heading",
                              level: 3,
                              text: "$12 / seat / mo",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price11-t1-flat",
                              type: "text",
                              text: "$60 / mo billed annually (5 seats included)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price11-t1-col-action",
                          type: "stack",
                          direction: "column",
                          alignment: "end",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t1-cta",
                              type: "button",
                              label: "Provision Crew Workspace",
                              style: {
                                color: { background: "surface-muted", text: "text" },
                                sizing: { width: "full" },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Tier 2: Department (6-25 Seats, RECOMMENDED) */
                {
                  id: "price11-t2-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price11-t2-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price11-t2-col-info",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t2-badge",
                              type: "badge",
                              text: "MOST POPULAR · 6–25 SEATS",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price11-t2-name",
                              type: "text",
                              text: "Scaling Department Suite",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price11-t2-desc",
                              type: "text",
                              text: "Full team governance & granular permissions.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price11-t2-col-rate",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t2-price",
                              type: "heading",
                              level: 3,
                              text: "$10 / seat / mo",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price11-t2-flat",
                              type: "text",
                              text: "$150 / mo baseline (15 seats included + $10/add-on)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price11-t2-col-action",
                          type: "stack",
                          direction: "column",
                          alignment: "end",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t2-cta",
                              type: "button",
                              label: "Launch Department Suite",
                              style: {
                                color: { background: "primary", text: "primary" },
                                sizing: { width: "full" },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Tier 3: Division (26-100+ Seats) */
                {
                  id: "price11-t3-card",
                  type: "card",
                  element: "article",
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price11-t3-grid",
                      type: "grid",
                      columns: 12,
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "price11-t3-col-info",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t3-badge",
                              type: "badge",
                              text: "ENTERPRISE · 26–100+ SEATS",
                              style: { color: { background: "surface", text: "text" } },
                            },
                            {
                              id: "price11-t3-name",
                              type: "text",
                              text: "Organization-Wide Division",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price11-t3-desc",
                              type: "text",
                              text: "Centralized SCIM provisioning & audit vaults.",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price11-t3-col-rate",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t3-price",
                              type: "heading",
                              level: 3,
                              text: "$8 / seat / mo",
                              style: { typography: { size: "2xl", weight: "bold" } },
                            },
                            {
                              id: "price11-t3-flat",
                              type: "text",
                              text: "Custom volume invoicing (50 seat minimum)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price11-t3-col-action",
                          type: "stack",
                          direction: "column",
                          alignment: "end",
                          distribution: "center",
                          wrap: false,
                          gap: "xs",
                          layout: {
                            placement: {
                              desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                              tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                              mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                            },
                          },
                          children: [
                            {
                              id: "price11-t3-cta",
                              type: "button",
                              label: "Request Volume Quote",
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

            /* Seat Adjustment Guarantee Strip */
            {
              id: "price11-guarantee-bar",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "lg" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price11-bar-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price11-bar-text",
                      type: "text",
                      text: "Dynamic Seat Metering: Add or remove teammates anytime. Invoices adjust automatically down to the second.",
                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                    },
                    {
                      id: "price11-bar-badge",
                      type: "badge",
                      text: "✓ Zero Penalty Proration",
                      style: { color: { background: "surface-muted", text: "text" } },
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
  // TEMPLATE #13: Pre-Paid Compute Credit Wallet
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-13-credit-token-wallet",
    name: "Pre-Paid Compute Credit Wallet",
    kind: "section",
    root: {
      id: "price13-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price13-main-stack",
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
              id: "price13-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price13-eyebrow",
                  type: "badge",
                  text: "PRE-PAID TOKEN WALLET · NO EXPIRY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price13-title",
                  type: "heading",
                  level: 2,
                  text: "Compute Credit Fuel Packs",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price13-subtitle",
                  type: "text",
                  text: "Buy pre-paid GPU inference tokens when you need them. Unused credits never expire, with zero recurring subscription charges.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Pack Credit Cards */
            {
              id: "price13-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Pack 1: Starter (4 cols) */
                {
                  id: "price13-p1-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price13-p1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price13-p1-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price13-p1-badge",
                              type: "badge",
                              text: "STARTER RELOAD",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price13-p1-title",
                              type: "text",
                              text: "2,500 Credits",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price13-p1-price",
                              type: "heading",
                              level: 3,
                              text: "$25",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price13-p1-rate",
                              type: "text",
                              text: "$0.010 per compute credit",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price13-p1-cta",
                          type: "button",
                          label: "Top Up 2,500 Credits",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price13-p1-breakdown",
                          type: "text",
                          text: "Estimated Capacity: ~2,500 standard LLM queries or 125 high-resolution Diffusion renders.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Pack 2: Studio (4 cols, POPULAR +20% BONUS) */
                {
                  id: "price13-p2-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price13-p2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price13-p2-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price13-p2-badge",
                              type: "badge",
                              text: "POPULAR · +20% BONUS TOKENS",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price13-p2-title",
                              type: "text",
                              text: "12,000 Credits",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price13-p2-price",
                              type: "heading",
                              level: 3,
                              text: "$100",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price13-p2-rate",
                              type: "text",
                              text: "$0.0083 per compute credit (-17% discount)",
                              style: { typography: { size: "sm" }, color: { text: "primary" } },
                            },
                          ],
                        },
                        {
                          id: "price13-p2-cta",
                          type: "button",
                          label: "Top Up 12,000 Credits",
                          style: {
                            color: { background: "primary", text: "primary" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price13-p2-breakdown",
                          type: "text",
                          text: "Estimated Capacity: ~12,000 LLM queries, 600 ultra-res renders, or 4 hours real-time voice synthesis.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Pack 3: Production (4 cols, +40% BONUS) */
                {
                  id: "price13-p3-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price13-p3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price13-p3-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price13-p3-badge",
                              type: "badge",
                              text: "HIGH VOLUME · +40% BONUS",
                              style: { color: { background: "surface", text: "text" } },
                            },
                            {
                              id: "price13-p3-title",
                              type: "text",
                              text: "70,000 Credits",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price13-p3-price",
                              type: "heading",
                              level: 3,
                              text: "$500",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price13-p3-rate",
                              type: "text",
                              text: "$0.0071 per compute credit (-29% discount)",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price13-p3-cta",
                          type: "button",
                          label: "Top Up 70,000 Credits",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price13-p3-breakdown",
                          type: "text",
                          text: "Estimated Capacity: High-throughput background inference pipelines with priority GPU queuing.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Guarantee Bar */
            {
              id: "price13-footer-bar",
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
                  id: "price13-bar-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price13-terms-text",
                      type: "text",
                      text: "Pre-paid credits never expire · Instant API activation · Auto-reload thresholds configurable in console",
                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                    },
                    {
                      id: "price13-terms-badge",
                      type: "badge",
                      text: "✓ Zero Monthly Maintenance",
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

  // --------------------------------------------------------------------------
  // TEMPLATE #22: Modular Capability Plan Bundler (visual-only)
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-22-build-your-own-plan-bundler",
    name: "Modular Capability Plan Bundler",
    kind: "section",
    root: {
      id: "price22-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price22-main-stack",
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
              id: "price22-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price22-eyebrow",
                  type: "badge",
                  text: "COMPOSABLE ARCHITECTURE BUNDLER",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price22-title",
                  type: "heading",
                  level: 2,
                  text: "Build Your Modular Platform",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price22-subtitle",
                  type: "text",
                  text: "Select only the capability engines your stack actually consumes. Bundles automatically receive a 15% combined rebate.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* Base Core Engine Card */
            {
              id: "price22-base-card",
              type: "card",
              element: "article",
              style: {
                spacing: { padding: "lg" },
                border: { width: "thin", color: "border", radius: "xl" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price22-base-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price22-base-info",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price22-base-badge",
                          type: "badge",
                          text: "FOUNDATION ENGINE (MANDATORY)",
                          style: { color: { background: "surface-muted", text: "text" } },
                        },
                        {
                          id: "price22-base-title",
                          type: "text",
                          text: "Core Composable Gateway & Event Bus",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price22-base-desc",
                          type: "text",
                          text: "GraphQL router, edge cache invalidation, and 3 deployment environments included.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "price22-base-price",
                      type: "heading",
                      level: 3,
                      text: "$99 / mo",
                      style: { typography: { size: "2xl", weight: "bold" } },
                    },
                  ],
                },
              ],
            },

            /* 4 Add-On Modules Grid */
            {
              id: "price22-modules-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Module 1: B2B Wholesale */
                {
                  id: "price22-m1-card",
                  type: "card",
                  element: "div",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price22-m1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price22-m1-head",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price22-m1-title",
                              type: "text",
                              text: "✓ B2B Wholesale Portal",
                              style: { typography: { size: "base", weight: "bold" } },
                            },
                            {
                              id: "price22-m1-cost",
                              type: "badge",
                              text: "+$80 / mo",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                          ],
                        },
                        {
                          id: "price22-m1-desc",
                          type: "text",
                          text: "Tiered customer accounts, net-30 invoicing, and custom price book negotiation.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Module 2: Multi-Currency */
                {
                  id: "price22-m2-card",
                  type: "card",
                  element: "div",
                  layout: {
                    placement: {
                      desktop: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price22-m2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price22-m2-head",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price22-m2-title",
                              type: "text",
                              text: "✓ Multi-Currency Gateway",
                              style: { typography: { size: "base", weight: "bold" } },
                            },
                            {
                              id: "price22-m2-cost",
                              type: "badge",
                              text: "+$45 / mo",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                          ],
                        },
                        {
                          id: "price22-m2-desc",
                          type: "text",
                          text: "Automated FX conversions, localized tax compliance, and 135+ native payout rails.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Module 3: AI Vector Search */
                {
                  id: "price22-m3-card",
                  type: "card",
                  element: "div",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price22-m3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price22-m3-head",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price22-m3-title",
                              type: "text",
                              text: "✓ AI Semantic Search & Recs",
                              style: { typography: { size: "base", weight: "bold" } },
                            },
                            {
                              id: "price22-m3-cost",
                              type: "badge",
                              text: "+$60 / mo",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                          ],
                        },
                        {
                          id: "price22-m3-desc",
                          type: "text",
                          text: "Real-time vector search embeddings and personalized buyer recommendation clusters.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Module 4: Fraud Guard */
                {
                  id: "price22-m4-card",
                  type: "card",
                  element: "div",
                  layout: {
                    placement: {
                      desktop: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                      tablet: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "lg" },
                    border: { width: "thin", color: "primary", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price22-m4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price22-m4-head",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "price22-m4-title",
                              type: "text",
                              text: "✓ Advanced Fraud Shield",
                              style: { typography: { size: "base", weight: "bold" } },
                            },
                            {
                              id: "price22-m4-cost",
                              type: "badge",
                              text: "+$35 / mo",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                          ],
                        },
                        {
                          id: "price22-m4-desc",
                          type: "text",
                          text: "Machine-learning velocity checks, 3D Secure 2.0 biometric auth, and chargeback protection.",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Live Bundle Tally Card */
            {
              id: "price22-tally-card",
              type: "card",
              element: "article",
              style: {
                spacing: { padding: "xl" },
                border: { width: "thin", color: "border", radius: "xl" },
                color: { background: "surface-muted" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price22-tally-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "lg",
                  children: [
                    {
                      id: "price22-tally-info",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "price22-tally-badge",
                          type: "badge",
                          text: "CONFIGURED BUNDLE (4 MODULES SELECTED)",
                          style: { color: { background: "primary", text: "primary" } },
                        },
                        {
                          id: "price22-tally-math",
                          type: "text",
                          text: "Gross $319/mo · 15% Multi-Module Bundle Rebate (-$47.85/mo)",
                          style: { typography: { size: "sm", weight: "bold" } },
                        },
                        {
                          id: "price22-tally-price",
                          type: "heading",
                          level: 2,
                          text: "$271.15 / month",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                      ],
                    },
                    {
                      id: "price22-tally-action",
                      type: "button",
                      label: "Create Custom Bundle & Deploy",
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #36: Fixed-Scope Deliverable Sprint Menu
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-36-project-package-menu",
    name: "Fixed-Scope Deliverable Sprint Menu",
    kind: "section",
    root: {
      id: "price36-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price36-main-stack",
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
              id: "price36-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price36-eyebrow",
                  type: "badge",
                  text: "FIXED-FEE DIGITAL SPRINT PACKAGES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price36-title",
                  type: "heading",
                  level: 2,
                  text: "Product Studio Delivery Menu",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price36-subtitle",
                  type: "text",
                  text: "Guaranteed deliverable outcomes with strict calendar commitments. 50% deposit upon kickoff, 50% upon final production sign-off.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3 Package Cards Grid */
            {
              id: "price36-grid",
              type: "grid",
              columns: 12,
              style: { sizing: { width: "full" } },
              children: [
                /* Package 1: Brand Sprint (4 cols) */
                {
                  id: "price36-pkg1-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price36-pkg1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price36-pkg1-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price36-pkg1-badge",
                              type: "badge",
                              text: "2 WEEKS TURNAROUND",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price36-pkg1-title",
                              type: "text",
                              text: "Brand Identity Sprint",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price36-pkg1-price",
                              type: "heading",
                              level: 3,
                              text: "$4,800",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price36-pkg1-terms",
                              type: "text",
                              text: "Fixed fee · 50% deposit / 50% handover",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price36-pkg1-cta",
                          type: "button",
                          label: "Book Brand Sprint",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price36-pkg1-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "3 distinct creative direction boards",
                            "Complete vector logo & icon toolkit",
                            "Figma design token color & type system",
                            "Brand guidelines & usage manual PDF",
                            "Full IP transfer upon final payment",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Package 2: Marketing Website (4 cols, FLAGSHIP) */
                {
                  id: "price36-pkg2-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "primary", radius: "xl" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price36-pkg2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price36-pkg2-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price36-pkg2-badge",
                              type: "badge",
                              text: "FLAGSHIP · 4 WEEKS TURNAROUND",
                              style: { color: { background: "primary", text: "primary" } },
                            },
                            {
                              id: "price36-pkg2-title",
                              type: "text",
                              text: "Marketing Site & CMS",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price36-pkg2-price",
                              type: "heading",
                              level: 3,
                              text: "$9,500",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price36-pkg2-terms",
                              type: "text",
                              text: "Fixed fee · 50% deposit / 50% launch sign-off",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price36-pkg2-cta",
                          type: "button",
                          label: "Book Website Sprint",
                          style: {
                            color: { background: "primary", text: "primary" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price36-pkg2-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "8 bespoke responsive page templates",
                            "Headless CMS setup for marketing autonomy",
                            "Custom animations & micro-interactions",
                            "Technical SEO & Core Web Vitals optimization",
                            "Launch QA and 30 days post-launch warranty",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Package 3: MVP Launchpad (4 cols) */
                {
                  id: "price36-pkg3-card",
                  type: "card",
                  element: "article",
                  layout: {
                    placement: {
                      desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                      mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                    },
                  },
                  style: {
                    spacing: { padding: "xl" },
                    border: { width: "thin", color: "border", radius: "xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "price36-pkg3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price36-pkg3-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price36-pkg3-badge",
                              type: "badge",
                              text: "FULL-STACK · 6 WEEKS TURNAROUND",
                              style: { color: { background: "surface", text: "text" } },
                            },
                            {
                              id: "price36-pkg3-title",
                              type: "text",
                              text: "Full Product MVP Launch",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price36-pkg3-price",
                              type: "heading",
                              level: 3,
                              text: "$18,500",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price36-pkg3-terms",
                              type: "text",
                              text: "Fixed fee · 3 milestone payments",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price36-pkg3-cta",
                          type: "button",
                          label: "Book MVP Sprint",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price36-pkg3-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Full-stack Next.js web application",
                            "PostgreSQL database schema & migrations",
                            "Stripe recurring subscriptions & checkout",
                            "Authentication & role management",
                            "Production CI/CD deployment on AWS/Vercel",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Milestone Guarantee Strip */
            {
              id: "price36-guarantee-bar",
              type: "card",
              element: "div",
              style: {
                spacing: { padding: "md" },
                border: { width: "thin", color: "border", radius: "lg" },
                color: { background: "surface" },
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "price36-bar-stack",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: true,
                  gap: "md",
                  children: [
                    {
                      id: "price36-bar-text",
                      type: "text",
                      text: "Guaranteed calendar milestone delivery · 100% intellectual property transfer · No surprise hourly overages",
                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                    },
                    {
                      id: "price36-bar-badge",
                      type: "badge",
                      text: "✓ On-Time Delivery Guarantee",
                      style: { color: { background: "surface-muted", text: "text" } },
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
