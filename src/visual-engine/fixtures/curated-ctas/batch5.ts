import type { ComponentDocument } from "../../model";

/**
 * CTA-21: Open Source Contributor & Git Rail
 * Visual Family: Open Source Community / Git Hub
 * Layout Family: Multi-Tiered Contributor Strip with GitHub Star Action
 * Distinctive: GitHub charcoal dark terminal aesthetic, real-time commit SHA ticker,
 * star counter badge (★ Star 14.8k), Apache 2.0 license tag, and contributor avatar pills.
 */
export const CTA_OSS_CONTRIBUTOR_RAIL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-21-oss-contributor-rail",
  name: "Open Source Contributor & Git Rail",
  kind: "section",
  root: {
    id: "cta21-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta21-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "md",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          {
            id: "cta21-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "2xl" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "cta21-kicker",
                type: "text",
                text: "OPEN SOURCE · APACHE 2.0 DUAL LICENSED",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta21-title",
                type: "heading",
                level: 2,
                text: "Built in the open. Maintained by 380+ engineers.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta21-desc",
                type: "text",
                text: "Join the core runtime project on GitHub. Audit the source code, open issues, and ship your first pull request today.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
          {
            id: "cta21-rail-card",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta21-commit-ticker-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "sm",
                style: {
                  color: { background: "surface-muted" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "xs", paddingX: "sm" },
                },
                children: [
                  {
                    id: "cta21-commit-branch",
                    type: "text",
                    text: "⎇ main @ 4a9f1b2: feat(kernel): zero-copy IPC transport",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta21-build-passing",
                    type: "text",
                    text: "passing",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                ],
              },
              {
                id: "cta21-actions-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "cta21-btn-star",
                    type: "button",
                    label: "★ Star on GitHub [ 14.8k ]",
                    href: "https://github.com",
                    style: {
                      background: [{ kind: "solid", color: { kind: "custom", value: "#F1E05A" } }],
                      color: { text: "background" },
                      border: { radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                    },
                  },
                  {
                    id: "cta21-btn-pr",
                    type: "button",
                    label: "Contribute to Runtime →",
                    href: "https://github.com",
                    style: {
                      color: { background: "transparent", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { family: "inter", size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
              {
                id: "cta21-contributor-tally",
                type: "text",
                text: "382 contributors across 41 countries · 1,420 merged pull requests · Apache 2.0 License",
                style: { typography: { size: "sm", align: "center" }, color: { text: "text-subtle" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * CTA-22: Free Forever vs Pro Plan Comparison Switch
 * Visual Family: Transparent Pricing Contrast
 * Layout Family: Asymmetric Comparison Table with Anchor CTA
 * Distinctive: Side-by-side feature comparison checklists ($0 Free Forever vs $49 Pro),
 * transparent limits vs unlimited telemetry, and dual distinct activation buttons.
 */
export const CTA_FREE_VS_PRO_SWITCH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-22-free-vs-pro-switch",
  name: "Free Forever vs Pro Comparison Switch",
  kind: "section",
  root: {
    id: "cta22-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta22-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          {
            id: "cta22-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "2xl" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "cta22-kicker",
                type: "text",
                text: "TRANSPARENT PRICING TIERS",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta22-title",
                type: "heading",
                level: 2,
                text: "Start free today. Scale as your team expands.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },
          {
            id: "cta22-cards-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta22-card-free",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 1, row: 1, columnSpan: 6, rowSpan: 12 },
                    tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta22-free-tag",
                    type: "text",
                    text: "COMMUNITY DEVELOPER",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta22-free-price",
                    type: "heading",
                    level: 3,
                    text: "$0 / forever",
                    style: { typography: { family: "inter", size: "4xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta22-free-checklist",
                    type: "text",
                    text: "✓ Up to 3 active developer sandboxes\n✓ 500,000 monthly telemetry events\n✓ Community Discord support\n✓ Standard 14-day log retention",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta22-btn-free",
                    type: "button",
                    label: "Deploy Free Forever Sandbox →",
                    href: "/signup-free",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      typography: { size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta22-card-pro",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 7, row: 1, columnSpan: 6, rowSpan: 12 },
                    tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "primary", radius: "xl", shadow: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta22-pro-tag",
                    type: "text",
                    text: "★ HIGH-VELOCITY TEAM PRO",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta22-pro-price",
                    type: "heading",
                    level: 3,
                    text: "$49 / seat / mo",
                    style: { typography: { family: "inter", size: "4xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta22-pro-checklist",
                    type: "text",
                    text: "✓ Unlimited active sandboxes & clusters\n✓ 50,000,000 monthly telemetry events\n✓ Dedicated Slack architect channel\n✓ 1-year compliance log retention & SSO",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                  },
                  {
                    id: "cta22-btn-pro",
                    type: "button",
                    label: "Start 14-Day Pro Trial →",
                    href: "/signup-pro",
                    style: {
                      background: [{ kind: "solid", color: { kind: "custom", value: "#4F46E5" } }],
                      color: { text: "primary-foreground" },
                      border: { radius: "md" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      typography: { size: "sm", weight: "bold" },
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
};

/**
 * CTA-23: Hardware DevKit Blueprint & Reservation
 * Visual Family: Industrial IoT / Physical Tech
 * Layout Family: Spec-Sheet Blueprint with Pre-order Deposit
 * Distinctive: Blueprint deep cyan canvas, technical pinout specifications,
 * manufacturing batch schedule (Batch 04 shipping Q4), and refundable deposit card ($99).
 */
export const CTA_HARDWARE_KIT_UNBOXING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-23-hardware-kit-unboxing",
  name: "Hardware DevKit Blueprint & Reservation",
  kind: "section",
  root: {
    id: "cta23-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "md" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta23-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "lg" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta23-col-schematic",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 7, rowSpan: 12 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "cta23-schematic-kicker",
                type: "text",
                text: "SPECIFICATION SHEET · HARDWARE REV 3.2",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta23-schematic-title",
                type: "heading",
                level: 2,
                text: "Ozmishow Spatial Node Kit: Dual FPGA Architecture",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta23-schematic-specs",
                type: "text",
                text: "• Processor: Quad-Core ARM Cortex-A78 + 16 TOPS Neural Engine\n• Optical I/O: 4x 10GbE SFP+ Fiber Transceiver Slots\n• Thermal Envelope: Passive Convection Anodized Aluminum Enclosure\n• Dimensions: 142mm × 98mm × 24mm · Weight: 340g",
                style: {
                  typography: { family: "monospace", size: "sm", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
          {
            id: "cta23-col-deposit-card",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "center",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 8, row: 1, columnSpan: 5, rowSpan: 12 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "lg" },
              spacing: { padding: "lg" },
            },
            children: [
              {
                id: "cta23-batch-indicator",
                type: "text",
                text: "PRODUCTION BATCH 04 · 850 UNITS ALLOCATED",
                style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "cta23-deposit-price",
                type: "heading",
                level: 3,
                text: "$99 Priority Deposit",
                style: { typography: { family: "inter", size: "2xl", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "cta23-deposit-terms",
                type: "text",
                text: "Fully refundable prior to final production cutover. Ships November 2026 with complete developer cable kit and SDK access.",
                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "cta23-btn-reserve-hw",
                type: "button",
                label: "Reserve DevKit Batch 04 →",
                href: "/reserve-hardware",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#0284C7" } }],
                  color: { text: "primary-foreground" },
                  border: { radius: "md" },
                  spacing: { paddingY: "md", paddingX: "xl" },
                  typography: { family: "inter", size: "base", weight: "bold" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "cta23-deposit-seal",
                type: "text",
                text: "FCC & CE Pre-Certified · Guaranteed queue allocation",
                style: { typography: { size: "sm", align: "center" }, color: { text: "text-subtle" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * CTA-24: System Cutover & Maintenance Alert
 * Visual Family: Critical Infrastructure Alert
 * Layout Family: High-Visibility System Notice with Scheduled Cutover
 * Distinctive: Hazard amber indicator badge, live system telemetry check,
 * scheduled cutover countdown, CLI preflight check command, and cutover booking button.
 */
export const CTA_SYSTEM_MIGRATION_ALERT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-24-system-migration-alert",
  name: "System Cutover & Maintenance Alert",
  kind: "section",
  root: {
    id: "cta24-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "xl", paddingX: "md" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta24-panel-card",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "md",
        style: {
          color: { background: "surface" },
          border: { width: "thin", color: "border", radius: "xl", shadow: "lg" },
          spacing: { padding: "lg" },
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          {
            id: "cta24-alert-pill",
            type: "text",
            text: "⚠️ CRITICAL SYSTEM NOTICE · SCHEDULED ENGINE CUTOVER",
            style: {
              typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
              color: { text: "primary" },
            },
          },
          {
            id: "cta24-headline",
            type: "heading",
            level: 2,
            text: "Legacy API Sunset: Migrate by Dec 15",
            style: {
              typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight", align: "center" },
              color: { text: "text" },
            },
          },
          {
            id: "cta24-desc",
            type: "text",
            text: "All v1.x endpoints will reach end-of-life in 42 days. Verify backward compatibility with the automated pre-flight CLI check before cutover.",
            style: {
              typography: { size: "base", leading: "relaxed", align: "center" },
              color: { text: "text-muted" },
              sizing: { maxWidth: "2xl" },
            },
          },
          {
            id: "cta24-cli-check",
            type: "code",
            code: "npx ozmi-migrate preflight --cluster=prod-us-east-1",
            language: "bash",
            showLanguage: false,
            showCopy: true,
            wrap: false,
            style: {
              sizing: { width: "full", maxWidth: "xl" },
            },
          },
          {
            id: "cta24-actions-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "cta24-btn-schedule",
                type: "button",
                label: "Book Migration Window →",
                href: "/schedule-migration",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#D97706" } }],
                  color: { text: "primary-foreground" },
                  border: { radius: "md" },
                  spacing: { paddingY: "md", paddingX: "xl" },
                  typography: { family: "inter", size: "sm", weight: "bold" },
                },
              },
              {
                id: "cta24-btn-docs",
                type: "button",
                label: "Read Migration Specs ↗",
                href: "/migration-docs",
                style: {
                  color: { background: "transparent", text: "text" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "md", paddingX: "lg" },
                  typography: { size: "sm", weight: "medium" },
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
 * CTA-25: Ecosystem Nexus Citadel Hub
 * Visual Family: Monumental Ecosystem Commonwealth
 * Layout Family: Multi-Segment Triad Hub & Global Gateway
 * Distinctive: The grand finale commonwealth portal with 3 interconnected gateways:
 * (1) Visual Builder Lab, (2) Discord Commonwealth, (3) Whitepaper Codex,
 * anchored by global community census (250,000+ builders worldwide).
 */
export const CTA_ECOSYSTEM_NEXUS_CITADEL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-25-ecosystem-nexus-citadel",
  name: "Ecosystem Nexus Citadel Hub",
  kind: "section",
  root: {
    id: "cta25-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "md" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta25-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta25-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { maxWidth: "3xl" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "cta25-kicker",
                type: "text",
                text: "GLOBAL DEVELOPER ECOSYSTEM",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta25-title",
                type: "heading",
                level: 2,
                text: "One Unified Platform. Infinite Horizons.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta25-desc",
                type: "text",
                text: "Join over 250,000 developers, architects, and designers worldwide building the next century of visual web software.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
          {
            id: "cta25-triad-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta25-pillar-builder",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 1, row: 1, columnSpan: 4, rowSpan: 12 },
                    tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta25-pillar1-tag",
                    type: "text",
                    text: "01 · VISUAL BUILDER LAB",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta25-pillar1-title",
                    type: "heading",
                    level: 3,
                    text: "Explore Curated Components",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta25-pillar1-desc",
                    type: "text",
                    text: "Full suite of 25 curated CTAs and 20 hero templates with real-time responsive rendering.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta25-btn-lab",
                    type: "button",
                    label: "Launch Builder Lab →",
                    href: "/visual-builder",
                    style: {
                      background: [{ kind: "solid", color: { kind: "custom", value: "#7C3AED" } }],
                      color: { text: "primary-foreground" },
                      border: { radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { size: "sm", weight: "bold" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta25-pillar-community",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 5, row: 1, columnSpan: 4, rowSpan: 12 },
                    tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta25-pillar2-tag",
                    type: "text",
                    text: "02 · DEVELOPER COMMONWEALTH",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta25-pillar2-title",
                    type: "heading",
                    level: 3,
                    text: "Join 45,000+ on Discord",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta25-pillar2-desc",
                    type: "text",
                    text: "Connect with engine maintainers, share component layouts, and participate in weekly design crits.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta25-btn-discord",
                    type: "button",
                    label: "Join Discord Server ↗",
                    href: "https://discord.gg",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta25-pillar-whitepaper",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    desktop: { column: 9, row: 1, columnSpan: 4, rowSpan: 12 },
                    tablet: { column: 1, row: 3, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 3, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  color: { background: "surface" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta25-pillar3-tag",
                    type: "text",
                    text: "03 · ARCHITECTURAL CODEX",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta25-pillar3-title",
                    type: "heading",
                    level: 3,
                    text: "Read the 2026 Engine Paper",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta25-pillar3-desc",
                    type: "text",
                    text: "Deep technical dive into the AST schema, GPU background shader pipeline, and headless verification.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta25-btn-paper",
                    type: "button",
                    label: "Download Codex PDF ↗",
                    href: "/codex.pdf",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { size: "sm", weight: "medium" },
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
};

export const CURATED_CTA_BATCH_5: ComponentDocument[] = [
  CTA_OSS_CONTRIBUTOR_RAIL_DOCUMENT,
  CTA_FREE_VS_PRO_SWITCH_DOCUMENT,
  CTA_HARDWARE_KIT_UNBOXING_DOCUMENT,
  CTA_SYSTEM_MIGRATION_ALERT_DOCUMENT,
  CTA_ECOSYSTEM_NEXUS_CITADEL_DOCUMENT,
];
