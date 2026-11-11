import type { ComponentDocument } from "../../model";

/**
 * CTA-06: Enterprise Stakeholder Matrix
 * Visual Family: Enterprise / Executive
 * Layout Family: 3-Column Role Selector Grid
 * Distinctive: Sober corporate navy & steel blue palette, tri-card stakeholder
 * branching (CTO, CFO, SecOps) with dedicated whitepapers, compliance trust bar.
 */
export const CTA_ENTERPRISE_ROLE_MATRIX_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-06-enterprise-role-matrix",
  name: "Enterprise Stakeholder Matrix",
  kind: "section",
  root: {
    id: "cta06-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta06-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta06-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { maxWidth: "3xl" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "cta06-eyebrow",
                type: "text",
                text: "ENTERPRISE ARCHITECTURE EVALUATION",
                style: {
                  typography: { family: "inter", size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta06-headline",
                type: "heading",
                level: 2,
                text: "Tailored Procurement Paths for Technical Leadership",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta06-subhead",
                type: "text",
                text: "Select your stakeholder focus to receive specialized architectural specs, security dossiers, and financial TCO analysis.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
          {
            id: "cta06-roles-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta06-card-cto",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 1, row: 1, columnSpan: 4, rowSpan: 1 },
                    tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "lg", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "cta06-cto-role-tag",
                    type: "text",
                    text: "FOR CHIEF TECHNOLOGY OFFICERS",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta06-cto-title",
                    type: "heading",
                    level: 3,
                    text: "Engineering Velocity & Edge Topology",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta06-cto-desc",
                    type: "text",
                    text: "Full zero-downtime migration blueprint, distributed raft consensus benchmarks, and custom WASM runtime specs.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta06-cto-btn",
                    type: "button",
                    label: "CTO Architecture Pack →",
                    href: "/cto-pack",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta06-card-cfo",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 5, row: 1, columnSpan: 4, rowSpan: 1 },
                    tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "lg", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "cta06-cfo-role-tag",
                    type: "text",
                    text: "FOR CHIEF FINANCIAL OFFICERS",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta06-cfo-title",
                    type: "heading",
                    level: 3,
                    text: "Total Cost of Ownership & ROI",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta06-cfo-desc",
                    type: "text",
                    text: "Comparative infra spend calculator, egress fee reduction models, and committed-use volume discount schedules.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta06-cfo-btn",
                    type: "button",
                    label: "CFO Financial Model →",
                    href: "/cfo-model",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "secondary", text: "secondary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta06-card-secops",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 9, row: 1, columnSpan: 4, rowSpan: 1 },
                    tablet: { column: 1, row: 3, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 3, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "lg", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "cta06-secops-role-tag",
                    type: "text",
                    text: "FOR CHIEF INFORMATION SECURITY",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta06-secops-title",
                    type: "heading",
                    level: 3,
                    text: "Governance, SOC2 & Zero-Trust",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta06-secops-desc",
                    type: "text",
                    text: "Audited SOC2 Type II reports, HIPAA BAA agreements, air-gapped VPC peering, and hardware cryptographic attestations.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta06-secops-btn",
                    type: "button",
                    label: "Security Audit Dossier →",
                    href: "/security-dossier",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "secondary", text: "secondary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "cta06-compliance-bar",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "lg",
            style: {
              spacing: { paddingTop: "sm" },
            },
            children: [
              {
                id: "cta06-badge-soc2",
                type: "text",
                text: "🔒 SOC2 TYPE II CERTIFIED",
                style: { typography: { family: "monospace", size: "sm", weight: "medium" }, color: { text: "text-subtle" } },
              },
              {
                id: "cta06-badge-iso",
                type: "text",
                text: "🛡️ ISO 27001 COMPLIANT",
                style: { typography: { family: "monospace", size: "sm", weight: "medium" }, color: { text: "text-subtle" } },
              },
              {
                id: "cta06-badge-hipaa",
                type: "text",
                text: "⚕️ HIPAA BAA READY",
                style: { typography: { family: "monospace", size: "sm", weight: "medium" }, color: { text: "text-subtle" } },
              },
              {
                id: "cta06-badge-uptime",
                type: "text",
                text: "⚡ 99.995% ENTERPRISE SLA",
                style: { typography: { family: "monospace", size: "sm", weight: "medium" }, color: { text: "text-subtle" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * CTA-07: Playful Neo-Pop Sticker Stack
 * Visual Family: Playful Startup / Creative Tech
 * Layout Family: Layered Badges & Offset Card
 * Distinctive: Warm peach, coral & marigold palette, pillowy-soft card with
 * tilted playful sticker badges, friendly emoji button, avatar proof cluster.
 */
export const CTA_PLAYFUL_STICKER_STACK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-07-playful-sticker-stack",
  name: "Playful Neo-Pop Sticker Stack",
  kind: "section",
  root: {
    id: "cta07-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta07-outer-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "lg",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          {
            id: "cta07-pillowy-card",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "lg",
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "3xl", shadow: "lg" },
              spacing: { paddingY: "2xl", paddingX: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta07-sticker-pills-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "cta07-pill-time",
                    type: "text",
                    text: "⚡ Setup in 2 mins",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "full", width: "thin", color: "border" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                  {
                    id: "cta07-pill-nocard",
                    type: "text",
                    text: "🎉 No credit card required",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "full", width: "thin", color: "border" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                  {
                    id: "cta07-pill-export",
                    type: "text",
                    text: "✨ 1-click export",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "full", width: "thin", color: "border" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
              {
                id: "cta07-headline",
                type: "heading",
                level: 2,
                text: "Build your ideas with zero friction and 100% joy.",
                style: {
                  typography: { family: "poppins", size: "4xl", weight: "bold", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta07-body",
                type: "text",
                text: "Everything you need to launch beautiful landing pages, interactive apps, and viral projects before your coffee gets cold.",
                style: {
                  typography: { size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "2xl" },
                },
              },
              {
                id: "cta07-action-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "cta07-btn-launch",
                    type: "button",
                    label: "Start Building for Free 🚀",
                    href: "/signup",
                    style: {
                      background: [{ kind: "solid", color: { kind: "custom", value: "#FB7185" } }],
                      color: { text: "primary-foreground" },
                      border: { radius: "full" },
                      spacing: { paddingY: "lg", paddingX: "2xl" },
                      typography: { family: "poppins", size: "lg", weight: "bold" },
                    },
                  },
                  {
                    id: "cta07-creator-proof",
                    type: "text",
                    text: "⭐⭐⭐⭐⭐  Loved by 12,000+ indie makers, designers & founders",
                    style: {
                      typography: { size: "sm", weight: "medium", align: "center" },
                      color: { text: "text-subtle" },
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
};

/**
 * CTA-08: Data-Driven Milestone Gauge
 * Visual Family: Data-Led / FinTech
 * Layout Family: Split 6/6 Metric & Conversion
 * Distinctive: FinTech emerald & charcoal palette, live volume milestone tally,
 * benchmark progress indicator, instant signup with transparent pricing.
 */
export const CTA_DATA_MILESTONE_GAUGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-08-data-milestone-gauge",
  name: "Data-Driven Milestone Gauge",
  kind: "section",
  root: {
    id: "cta08-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta08-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta08-col-metrics",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 6, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface-sunken" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "cta08-metric-tag",
                type: "text",
                text: "LIVE NETWORK BENCHMARK",
                style: { typography: { family: "monospace", size: "sm", weight: "semibold" }, color: { text: "success" } },
              },
              {
                id: "cta08-metric-big-num",
                type: "heading",
                level: 3,
                text: "$14.8B+",
                style: {
                  typography: { family: "monospace", size: "6xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta08-metric-big-label",
                type: "text",
                text: "ANNUAL VOLUME PROCESSED ACROSS 38 REGIONS",
                style: { typography: { family: "monospace", size: "sm", weight: "medium" }, color: { text: "text-muted" } },
              },
              {
                id: "cta08-divider",
                type: "divider",
                style: { sizing: { width: "full" } },
              },
              {
                id: "cta08-sub-metrics-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "cta08-sub-metric-1",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "cta08-sub-1-val",
                        type: "text",
                        text: "42ms",
                        style: { typography: { family: "monospace", size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "cta08-sub-1-label",
                        type: "text",
                        text: "AVG SETTLEMENT LATENCY",
                        style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-subtle" } },
                      },
                    ],
                  },
                  {
                    id: "cta08-sub-metric-2",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "cta08-sub-2-val",
                        type: "text",
                        text: "99.999%",
                        style: { typography: { family: "monospace", size: "2xl", weight: "bold" }, color: { text: "success" } },
                      },
                      {
                        id: "cta08-sub-2-label",
                        type: "text",
                        text: "HARDWARE CONSENSUS SLA",
                        style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-subtle" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "cta08-col-action",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 7, row: 1, columnSpan: 6, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              spacing: { paddingLeft: "md" },
            },
            children: [
              {
                id: "cta08-action-kicker",
                type: "text",
                text: "INSTANT INFRASTRUCTURE ACCESS",
                style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "cta08-action-headline",
                type: "heading",
                level: 2,
                text: "Treasury Management Built for Modern Internet Companies",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta08-action-desc",
                type: "text",
                text: "Automate liquidity routing, multi-currency payouts, and programmable yield accounts without opening separate banking entities.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "cta08-action-btn-group",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "cta08-btn-open-acct",
                    type: "button",
                    label: "Open Account in 3 Mins →",
                    href: "/open-account",
                    style: {
                      spacing: { paddingY: "md", paddingX: "xl" },
                      color: { background: "success", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "base", weight: "semibold" },
                    },
                  },
                  {
                    id: "cta08-btn-fee-calc",
                    type: "button",
                    label: "Transparent Fee Schedule",
                    href: "/fees",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "secondary", text: "secondary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm" },
                    },
                  },
                ],
              },
              {
                id: "cta08-fdic-note",
                type: "text",
                text: "🛡️ Up to $5M FDIC insurance through partner bank sweep network · Zero monthly maintenance fees",
                style: { typography: { size: "sm" }, color: { text: "text-subtle" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * CTA-09: Nordic Minimalist Forest Strip
 * Visual Family: Warm Neutral / Scandinavian Minimal
 * Layout Family: Compact Horizontal Utility Strip
 * Distinctive: Muted moss green & warm oat palette, low-height horizontal utility strip,
 * single-line proposition, docked square action button with email input.
 */
export const CTA_NORDIC_MINIMAL_STRIP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-09-nordic-minimal-strip",
  name: "Nordic Minimalist Forest Strip",
  kind: "section",
  root: {
    id: "cta09-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta09-strip-card",
        type: "stack",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "lg",
        style: {
          color: { background: "surface" },
          border: { width: "thin", color: "border", radius: "md", shadow: "sm" },
          spacing: { paddingY: "lg", paddingX: "xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta09-left-narrative",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "2xl" },
            },
            children: [
              {
                id: "cta09-kicker",
                type: "text",
                text: "NORDIC ARCHITECTURE RETREAT · COHORT 07",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta09-headline",
                type: "heading",
                level: 3,
                text: "Quiet Design, Intentional Engineering & Spatial Systems",
                style: {
                  typography: { family: "inter", size: "2xl", weight: "semibold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta09-meta",
                type: "text",
                text: "Nov 12–16, 2026 · Stockholm Archipelago · 14 of 24 places remaining",
                style: {
                  typography: { size: "sm" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          {
            id: "cta09-right-action",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "cta09-btn-reserve",
                type: "button",
                label: "Reserve Seat — €1,850",
                href: "/reserve",
                style: {
                  spacing: { paddingY: "md", paddingX: "xl" },
                  color: { background: "text", text: "background" },
                  border: { radius: "sm" },
                  typography: { size: "sm", weight: "medium" },
                },
              },
              {
                id: "cta09-btn-syllabus",
                type: "button",
                label: "Download Syllabus (PDF)",
                href: "/syllabus",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "transparent", text: "text" },
                  border: { radius: "sm", width: "thin", color: "border" },
                  typography: { size: "sm" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * CTA-10: Flash Drop Commerce Countdown
 * Visual Family: Commerce / Streetwear Drop
 * Layout Family: Full-Bleed Urgent Banner Strip
 * Distinctive: Safety hazard orange & pitch black palette, live countdown clock units,
 * claimed edition progress tracker, instant checkout lock button.
 */
export const CTA_FLASH_COMMERCE_COUNTDOWN_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-10-flash-commerce-countdown",
  name: "Flash Drop Commerce Countdown",
  kind: "section",
  root: {
    id: "cta10-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta10-banner-box",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "lg",
        style: {
          color: { background: "surface" },
          border: { width: "thin", color: "border", radius: "xl", shadow: "lg" },
          spacing: { paddingY: "2xl", paddingX: "xl" },
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          {
            id: "cta10-countdown-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "cta10-clock-hours",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                style: {
                  color: { background: "surface-muted" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "sm", paddingX: "md" },
                  sizing: { width: "fit" },
                },
                children: [
                  {
                    id: "cta10-num-hours",
                    type: "text",
                    text: "04",
                    style: { typography: { family: "monospace", size: "2xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta10-lbl-hours",
                    type: "text",
                    text: "HOURS",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "cta10-clock-mins",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                style: {
                  color: { background: "surface-muted" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "sm", paddingX: "md" },
                  sizing: { width: "fit" },
                },
                children: [
                  {
                    id: "cta10-num-mins",
                    type: "text",
                    text: "18",
                    style: { typography: { family: "monospace", size: "2xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta10-lbl-mins",
                    type: "text",
                    text: "MINUTES",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "cta10-clock-secs",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                style: {
                  color: { background: "surface-muted" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "sm", paddingX: "md" },
                  sizing: { width: "fit" },
                },
                children: [
                  {
                    id: "cta10-num-secs",
                    type: "text",
                    text: "42",
                    style: { typography: { family: "monospace", size: "2xl", weight: "bold" }, color: { text: "warning" } },
                  },
                  {
                    id: "cta10-lbl-secs",
                    type: "text",
                    text: "SECONDS",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },
          {
            id: "cta10-headline",
            type: "heading",
            level: 2,
            text: "Titanium Mechanical Cyberdeck Edition // 01",
            style: {
              typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight", align: "center" },
              color: { text: "text" },
            },
          },
          {
            id: "cta10-status-bar",
            type: "text",
            text: "🔥 73% OF FIRST RUN CLAIMED · ONLY 27 UNITS REMAINING",
            style: {
              typography: { family: "monospace", size: "sm", weight: "bold", align: "center" },
              color: { text: "warning" },
            },
          },
          {
            id: "cta10-action-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { width: "full", maxWidth: "md" },
            },
            children: [
              {
                id: "cta10-btn-lock",
                type: "button",
                label: "Lock In Edition — $189",
                href: "/checkout",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#FF5500" } }],
                  color: { text: "primary-foreground" },
                  border: { radius: "md" },
                  spacing: { paddingY: "lg", paddingX: "xl" },
                  typography: { size: "base", weight: "bold" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "cta10-subtext",
                type: "text",
                text: "Complimentary global courier shipping · Ships next business day",
                style: {
                  typography: { size: "sm", align: "center" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_CTA_BATCH_2: ComponentDocument[] = [
  CTA_ENTERPRISE_ROLE_MATRIX_DOCUMENT,
  CTA_PLAYFUL_STICKER_STACK_DOCUMENT,
  CTA_DATA_MILESTONE_GAUGE_DOCUMENT,
  CTA_NORDIC_MINIMAL_STRIP_DOCUMENT,
  CTA_FLASH_COMMERCE_COUNTDOWN_DOCUMENT,
];
