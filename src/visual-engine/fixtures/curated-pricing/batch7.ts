import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Pricing — Batch 7 (Templates #18, #19, #26, #30, #39)
 *
 * #18: Tiered Graduated Volume Step Ledger (pricing-18-tiered-volume-discount)
 * #19: Feature-Gated Security & Compliance Matrix (pricing-19-feature-gated-security)
 * #26: Hybrid Reserved Base Plus Burst Meter (pricing-26-hybrid-base-plus-usage)
 * #30: Early Backer Lifetime Founder Scarcity Pass (pricing-30-lifetime-founder-deal)
 * #39: Open-Source Patron & Community Support Ladder (pricing-39-patron-donation-tiers)
 * ============================================================================
 */

export const CURATED_PRICING_BATCH_7: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #18: Tiered Graduated Volume Step Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-18-tiered-volume-discount",
    name: "Tiered Graduated Volume Step Ledger",
    kind: "section",
    root: {
      id: "price18-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price18-main-stack",
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
              id: "price18-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price18-eyebrow",
                  type: "badge",
                  text: "TRANSACTIONAL TELECOM & SMS DISPATCH",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price18-title",
                  type: "heading",
                  level: 2,
                  text: "Graduated Volume Tiers: Automated Waterfall Savings",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price18-subtitle",
                  type: "text",
                  text: "The more messages you dispatch, the lower your marginal rate per delivery. Rates automatically step down across monthly volume brackets.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 4-Step Volume Grid */
            {
              id: "price18-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                /* Bracket 1 */
                {
                  id: "price18-col-b1",
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
                      id: "price18-b1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price18-b1-badge",
                          type: "badge",
                          text: "FIRST 10K UNITS",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price18-b1-title",
                          type: "text",
                          text: "Starter Volume Tier",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price18-b1-rate",
                          type: "heading",
                          level: 3,
                          text: "$0.0075",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price18-b1-sub",
                          type: "text",
                          text: "per dispatched delivery",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price18-b1-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Brackets: 1 - 10,000 units",
                            "Zero base commitment fee",
                            "Direct carrier routing",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Bracket 2 */
                {
                  id: "price18-col-b2",
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
                      id: "price18-b2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price18-b2-badge",
                          type: "badge",
                          text: "NEXT 90K UNITS",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price18-b2-title",
                          type: "text",
                          text: "Growth Volume Tier",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price18-b2-rate",
                          type: "heading",
                          level: 3,
                          text: "$0.0055",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price18-b2-sub",
                          type: "text",
                          text: "per unit (26% savings step)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price18-b2-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Brackets: 10,001 - 100,000 units",
                            "Automatic rate reduction",
                            "High-throughput delivery queue",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Bracket 3 */
                {
                  id: "price18-col-b3",
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
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price18-b3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price18-b3-badge",
                          type: "badge",
                          text: "NEXT 400K UNITS",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price18-b3-title",
                          type: "text",
                          text: "Scaleup Volume Tier",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price18-b3-rate",
                          type: "heading",
                          level: 3,
                          text: "$0.0035",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price18-b3-sub",
                          type: "text",
                          text: "per unit (53% savings step)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price18-b3-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Brackets: 100,001 - 500,000 units",
                            "Dedicated shortcode provisioning",
                            "Sub-second delivery receipt webhooks",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Bracket 4 */
                {
                  id: "price18-col-b4",
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
                      id: "price18-b4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "price18-b4-badge",
                          type: "badge",
                          text: "500K+ UNITS / MO",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price18-b4-title",
                          type: "text",
                          text: "Enterprise Volume Tier",
                          style: { typography: { size: "base", weight: "bold" } },
                        },
                        {
                          id: "price18-b4-rate",
                          type: "heading",
                          level: 3,
                          text: "$0.0018",
                          style: { typography: { size: "2xl", weight: "bold" } },
                        },
                        {
                          id: "price18-b4-sub",
                          type: "text",
                          text: "per unit (76% savings step)",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price18-b4-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Brackets: 500,001+ units monthly",
                            "Custom volume commit agreements",
                            "Dedicated carrier routing manager",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Action and Transparency Callout */
            {
              id: "price18-cta-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price18-cta",
                  type: "button",
                  label: "Calculate Your Monthly Volume & Start Free",
                  style: {
                    color: { background: "primary", text: "primary-foreground" },
                    border: { radius: "md" },
                    spacing: { paddingX: "xl", paddingY: "sm" },
                  },
                },
                {
                  id: "price18-footnote",
                  type: "text",
                  text: "✓ All tiers automatically blend on your end-of-month invoice. Zero manual tier upgrades needed.",
                  style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #19: Feature-Gated Security & Compliance Matrix
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-19-feature-gated-security",
    name: "Feature-Gated Security & Compliance Matrix",
    kind: "section",
    root: {
      id: "price19-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price19-main-stack",
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
              id: "price19-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price19-eyebrow",
                  type: "badge",
                  text: "ENTERPRISE IDENTITY & GOVERNANCE GATES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price19-title",
                  type: "heading",
                  level: 2,
                  text: "Security & Governance Tiers: Unlocked as You Grow",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price19-subtitle",
                  type: "text",
                  text: "Clear, predictable security gating. Social auth is free, enterprise SAML/SSO is unlocked for growth, and Zero-Trust SCIM is ready for audit compliance.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Column Security Grid */
            {
              id: "price19-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Col 1: Social & Passwordless */
                {
                  id: "price19-col-core",
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
                      id: "price19-core-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price19-core-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price19-core-badge",
                              type: "badge",
                              text: "UP TO 5,000 MAU",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price19-core-title",
                              type: "text",
                              text: "Core Identity",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price19-core-price",
                              type: "heading",
                              level: 3,
                              text: "$0 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price19-core-sub",
                              type: "text",
                              text: "Free forever for consumer & social apps",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price19-core-cta",
                          type: "button",
                          label: "Start with Core Auth",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price19-core-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Google, GitHub, Apple & Microsoft social login",
                            "Passwordless Magic Links & WebAuthn passkeys",
                            "Community security Discord support",
                            "Basic rate limiting and brute-force shields",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Enterprise SAML & SSO (Highlighted) */
                {
                  id: "price19-col-sso",
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
                      id: "price19-sso-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price19-sso-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price19-sso-badge",
                              type: "badge",
                              text: "B2B SSO GATE · RECOMMENDED",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price19-sso-title",
                              type: "text",
                              text: "Enterprise Single Sign-On",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price19-sso-price",
                              type: "heading",
                              level: 3,
                              text: "$190 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price19-sso-sub",
                              type: "text",
                              text: "Includes 5 corporate IdP connections & 25k MAU",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price19-sso-cta",
                          type: "button",
                          label: "Unlock Enterprise SSO",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price19-sso-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Okta, Azure AD, Ping, OneLogin SAML 2.0 & OIDC",
                            "Domain routing & automatic tenant discovery",
                            "Multi-Factor Auth (MFA) policy enforcement",
                            "Assigned security onboarding specialist",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Zero-Trust Governance */
                {
                  id: "price19-col-gov",
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
                      id: "price19-gov-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price19-gov-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price19-gov-badge",
                              type: "badge",
                              text: "ZERO-TRUST & COMPLIANCE",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price19-gov-title",
                              type: "text",
                              text: "Zero-Trust SCIM Suite",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price19-gov-price",
                              type: "heading",
                              level: 3,
                              text: "$590 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price19-gov-sub",
                              type: "text",
                              text: "Unlimited IdP connections & automated provisioning",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price19-gov-cta",
                          type: "button",
                          label: "Deploy Compliance Suite",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price19-gov-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "SCIM 2.0 automated employee provisioning & offboarding",
                            "Realtime SIEM audit stream webhook integration",
                            "Session anomaly detection & risk-based step-up MFA",
                            "SOC 2 Type II & HIPAA Business Associate Agreement",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Compliance Seal Footnote */
            {
              id: "price19-footnote",
              type: "text",
              text: "🛡️ OIDC Certified · SAML 2.0 Compliant · ISO 27001 & SOC 2 Type II Verified Architecture",
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
  // TEMPLATE #26: Hybrid Reserved Base Plus Burst Meter
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-26-hybrid-base-plus-usage",
    name: "Hybrid Reserved Base Plus Burst Meter",
    kind: "section",
    root: {
      id: "price26-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price26-main-stack",
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
              id: "price26-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price26-eyebrow",
                  type: "badge",
                  text: "HYBRID DATABASE CAPACITY MODEL",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price26-title",
                  type: "heading",
                  level: 2,
                  text: "Predictable Reserved Core + Elastic Burst Overage",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price26-subtitle",
                  type: "text",
                  text: "Lock in heavily discounted reserved compute for baseline production loads, while allowing automatic elastic burst during viral peaks. Zero throttling.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Hybrid Split Grid */
            {
              id: "price26-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Col 1: Reserved Base Cluster (6 cols) */
                {
                  id: "price26-col-base",
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
                    border: { width: "thin", color: "primary", radius: "lg", shadow: "md" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price26-base-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price26-base-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price26-base-badge",
                              type: "badge",
                              text: "RESERVED BASELINE CAPACITY",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price26-base-title",
                              type: "heading",
                              level: 3,
                              text: "Production Cluster Base",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price26-base-price",
                              type: "heading",
                              level: 2,
                              text: "$249 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price26-base-sub",
                              type: "text",
                              text: "Guaranteed dedicated compute resources reserved 24/7",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price26-base-cta",
                          type: "button",
                          label: "Provision Reserved Cluster",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price26-base-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "4 Dedicated vCPUs & 16 GB High-Bandwidth RAM",
                            "100 GB High-IOPS NVMe Persistent Storage",
                            "1,000,000 Monthly Read/Write Operations Included",
                            "Sub-millisecond query response SLA",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Transparent Burst Overage (6 cols) */
                {
                  id: "price26-col-burst",
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
                    border: { width: "thin", color: "border", radius: "lg" },
                    color: { background: "surface" },
                  },
                  children: [
                    {
                      id: "price26-burst-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price26-burst-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price26-burst-badge",
                              type: "badge",
                              text: "ON-DEMAND PEAK BURST",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price26-burst-title",
                              type: "heading",
                              level: 3,
                              text: "Elastic Burst Rates",
                              style: { typography: { size: "xl", weight: "bold" } },
                            },
                            {
                              id: "price26-burst-price",
                              type: "heading",
                              level: 2,
                              text: "$0.0035 / op",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price26-burst-sub",
                              type: "text",
                              text: "Billed strictly for queries exceeding the 1M base allowance",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price26-burst-features",
                          type: "list",
                          marker: "check",
                          items: [
                            "Instant auto-scaling up to 50,000 queries / second",
                            "Hard spend-cap protection rules configurable in UI",
                            "Realtime webhook alerts at 75%, 90% and 100% of budget",
                            "Zero connection dropouts or queue backpressure",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "price26-burst-cta",
                          type: "button",
                          label: "Review Capacity Calculator",
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

            /* Guarantee Footnote */
            {
              id: "price26-footnote",
              type: "text",
              text: "🛡️ Hard Spend Cap Protection: Your cluster will never exceed your configured monthly budget without explicit authorization.",
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
  // TEMPLATE #30: Early Backer Lifetime Founder Scarcity Pass
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-30-lifetime-founder-deal",
    name: "Early Backer Lifetime Founder Scarcity Pass",
    kind: "section",
    root: {
      id: "price30-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price30-main-stack",
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
              id: "price30-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price30-eyebrow",
                  type: "badge",
                  text: "STRICT SCARCITY · 250 FOUNDING SLOTS",
                  style: {
                    color: { background: "primary", text: "primary-foreground" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price30-title",
                  type: "heading",
                  level: 2,
                  text: "Lifetime Founder Pass: Never Pay a Subscription Again",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price30-subtitle",
                  type: "text",
                  text: "We are funding our independent product roadmap with lifetime founder backing. Pay once, own forever, and join our private roadmap council.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 2-Column Founder Tiers */
            {
              id: "price30-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Col 1: Solo Founder */
                {
                  id: "price30-col-solo",
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
                      id: "price30-solo-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price30-solo-badge",
                          type: "badge",
                          text: "INDIVIDUAL MAKER PASS",
                          style: { color: { background: "surface-muted", text: "text-muted" } },
                        },
                        {
                          id: "price30-solo-title",
                          type: "heading",
                          level: 3,
                          text: "Solo Founder Lifetime",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price30-solo-price",
                          type: "heading",
                          level: 2,
                          text: "$349",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price30-solo-sub",
                          type: "text",
                          text: "One-time payment · All future updates included forever",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price30-solo-cta",
                          type: "button",
                          label: "Claim Solo Founder Pass",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price30-solo-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "1 Lifetime Seat on all Pro capabilities",
                            "Perpetual updates & offline desktop binaries",
                            "Private Discord Founder role & channel",
                            "Special recognition in app release notes",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Studio Guild (Highlighted) */
                {
                  id: "price30-col-studio",
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
                      id: "price30-studio-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price30-studio-badge",
                          type: "badge",
                          text: "AGENCY & TEAM · MOST POPULAR",
                          style: { color: { background: "primary", text: "primary-foreground" } },
                        },
                        {
                          id: "price30-studio-title",
                          type: "heading",
                          level: 3,
                          text: "Studio Guild Lifetime",
                          style: { typography: { size: "xl", weight: "bold" } },
                        },
                        {
                          id: "price30-studio-price",
                          type: "heading",
                          level: 2,
                          text: "$899",
                          style: { typography: { size: "4xl", weight: "bold" } },
                        },
                        {
                          id: "price30-studio-sub",
                          type: "text",
                          text: "One-time payment · 5 Lifetime Team Seats included",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                        {
                          id: "price30-studio-cta",
                          type: "button",
                          label: "Claim Studio Guild Pass",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price30-studio-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "5 Lifetime Team Seats on all Pro & Team features",
                            "Quarterly Private Roadmap Council call with founders",
                            "Commercial client handover white-labeling license",
                            "Direct WhatsApp / Slack engineering concierge channel",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Live Counter Proof */
            {
              id: "price30-counter-strip",
              type: "text",
              text: "🔥 184 of 250 Lifetime Founder Passes have been claimed. Once sold out, pricing reverts to standard $49/mo.",
              style: {
                typography: { size: "sm", weight: "bold", align: "center" },
                color: { text: "primary" },
              },
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #39: Open-Source Patron & Community Support Ladder
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "pricing-39-patron-donation-tiers",
    name: "Open-Source Patron & Community Support Ladder",
    kind: "section",
    root: {
      id: "price39-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "price39-main-stack",
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
              id: "price39-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "price39-eyebrow",
                  type: "badge",
                  text: "OPEN-SOURCE ECOSYSTEM SUSTAINABILITY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "price39-title",
                  type: "heading",
                  level: 2,
                  text: "Support Public Software Infrastructure",
                  style: {
                    typography: { size: "4xl", weight: "bold", align: "center" },
                  },
                },
                {
                  id: "price39-subtitle",
                  type: "text",
                  text: "Our core library is 100% MIT-licensed open source. Community patrons and corporate sponsors enable full-time core maintainers to ensure long-term stability.",
                  style: {
                    typography: { size: "base", align: "center" },
                    color: { text: "text-muted" },
                    sizing: { maxWidth: "2xl" },
                  },
                },
              ],
            },

            /* 3-Column Patron Grid */
            {
              id: "price39-grid",
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
              children: [
                /* Col 1: Individual Backer */
                {
                  id: "price39-col-backer",
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
                      id: "price39-backer-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price39-backer-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price39-backer-badge",
                              type: "badge",
                              text: "INDIVIDUAL CONTRIBUTOR",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price39-backer-title",
                              type: "text",
                              text: "Community Backer",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price39-backer-price",
                              type: "heading",
                              level: 3,
                              text: "$10 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price39-backer-sub",
                              type: "text",
                              text: "Recurring monthly community pledge",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price39-backer-cta",
                          type: "button",
                          label: "Back as Individual",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price39-backer-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Name listed on official README & website",
                            "GitHub Sponsor badge on your profile",
                            "Access to monthly maintainer newsletter",
                            "Voting on minor community bugfix priorities",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 2: Project Sponsor (Highlighted) */
                {
                  id: "price39-col-sponsor",
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
                      id: "price39-sponsor-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price39-sponsor-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price39-sponsor-badge",
                              type: "badge",
                              text: "STARTUP & STUDIO SPONSOR",
                              style: { color: { background: "primary", text: "primary-foreground" } },
                            },
                            {
                              id: "price39-sponsor-title",
                              type: "text",
                              text: "Project Sponsor",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price39-sponsor-price",
                              type: "heading",
                              level: 3,
                              text: "$150 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price39-sponsor-sub",
                              type: "text",
                              text: "Recurring monthly organizational support",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price39-sponsor-cta",
                          type: "button",
                          label: "Sponsor Project",
                          style: {
                            color: { background: "primary", text: "primary-foreground" },
                            border: { radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price39-sponsor-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Medium logo on documentation site & GitHub README",
                            "Prioritized GitHub issue review & bug triage",
                            "Direct Discord channel with core maintainers",
                            "Annual tax deduction via Open Collective 501(c)(3)",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Col 3: Corporate Benefactor */
                {
                  id: "price39-col-corp",
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
                      id: "price39-corp-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "price39-corp-head",
                          type: "stack",
                          direction: "column",
                          alignment: "start",
                          distribution: "start",
                          wrap: false,
                          gap: "xs",
                          children: [
                            {
                              id: "price39-corp-badge",
                              type: "badge",
                              text: "ENTERPRISE STEWARD",
                              style: { color: { background: "surface-muted", text: "text-muted" } },
                            },
                            {
                              id: "price39-corp-title",
                              type: "text",
                              text: "Corporate Benefactor",
                              style: { typography: { size: "lg", weight: "bold" } },
                            },
                            {
                              id: "price39-corp-price",
                              type: "heading",
                              level: 3,
                              text: "$1,000 / mo",
                              style: { typography: { size: "4xl", weight: "bold" } },
                            },
                            {
                              id: "price39-corp-sub",
                              type: "text",
                              text: "Corporate sponsorship with advisory access",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "price39-corp-cta",
                          type: "button",
                          label: "Become Corporate Benefactor",
                          style: {
                            color: { background: "surface", text: "text" },
                            border: { width: "thin", color: "border", radius: "md" },
                            sizing: { width: "full" },
                          },
                        },
                        {
                          id: "price39-corp-list",
                          type: "list",
                          marker: "check",
                          items: [
                            "Prominent top-tier logo on all releases & docs",
                            "2 hours monthly 1-on-1 architecture consulting with core team",
                            "Roadmap Advisory Board seat & feature input",
                            "Custom corporate invoice & compliance procurement support",
                          ],
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* Fiscal Host Footnote */
            {
              id: "price39-footnote",
              type: "text",
              text: "❤️ Contributions processed transparently via Open Collective 501(c)(3) Fiscal Host. 100% of funds support maintainer salaries.",
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
