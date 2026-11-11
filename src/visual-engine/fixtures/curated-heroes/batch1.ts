import type { ComponentDocument } from "../../model";
import type { HeroFingerprint } from "./fingerprints";

export const BATCH_1_FINGERPRINTS: Record<string, HeroFingerprint> = {
  "hero-centered-monolith": {
    id: "hero-centered-monolith",
    name: "Centered Monolith",
    layoutFamily: "centered-statement",
    alignment: "center-monolith",
    gridPattern: "single-col-centered-narrow",
    mediaPlacement: "none",
    contentHierarchy: "headline-lead-vertical-cta",
    dominantElement: "monumental-typography",
    ctaPattern: "vertical-button-stack",
    interactionModel: "static-read",
    density: "airy-editorial",
  },
  "hero-editorial-split": {
    id: "hero-editorial-split",
    name: "Asymmetric Editorial Split",
    layoutFamily: "asymmetric-editorial",
    alignment: "left-flush-narrative",
    gridPattern: "7-5-asymmetric-split",
    mediaPlacement: "right-spanning-portrait",
    contentHierarchy: "byline-serif-narrative-link",
    dominantElement: "portrait-editorial-frame",
    ctaPattern: "single-underlined-text-link",
    interactionModel: "static-read",
    density: "balanced-standard",
  },
  "hero-modular-bento": {
    id: "hero-modular-bento",
    name: "Modular Bento Grid",
    layoutFamily: "bento",
    alignment: "multi-cell-distributed",
    gridPattern: "4-cell-bento-matrix",
    mediaPlacement: "bento-slot-dispersed",
    contentHierarchy: "distributed-modular-cards",
    dominantElement: "bento-modular-tiles",
    ctaPattern: "per-card-contextual-actions",
    interactionModel: "static-read",
    density: "modular-bento-compact",
  },
  "hero-developer-terminal": {
    id: "hero-developer-terminal",
    name: "Developer Command Center",
    layoutFamily: "product-dashboard-dominant",
    alignment: "left-copy-right-terminal",
    gridPattern: "5-7-terminal-split",
    mediaPlacement: "none",
    contentHierarchy: "cli-heading-terminal-block",
    dominantElement: "terminal-code-block",
    ctaPattern: "cli-copy-pill-with-docs-btn",
    interactionModel: "copy-code-interaction",
    density: "dense-developer-hud",
  },
  "hero-tabbed-workspace": {
    id: "hero-tabbed-workspace",
    name: "Interactive Tabbed Workspace",
    layoutFamily: "tabbed-interactive",
    alignment: "top-centered-interactive-stage",
    gridPattern: "stacked-header-tabbed-stage",
    mediaPlacement: "tab-panel-contextual",
    contentHierarchy: "header-tabnav-panel",
    dominantElement: "interactive-tabs",
    ctaPattern: "tab-trigger-navigation",
    interactionModel: "tab-panel-switching",
    density: "balanced-standard",
  },
};

/**
 * HERO-01: Centered Monolith
 * A single, centered focal stack with monumental typography, vertical dual CTA dock,
 * and zero peripheral visual distraction.
 */
export const HERO_CENTERED_MONOLITH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-centered-monolith",
  name: "Centered Monolith · Keynote Hero",
  kind: "section",
  root: {
    id: "h01-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h01-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "lg" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "h01-center-col",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 3, row: 1, columnSpan: 8, rowSpan: 1 },
                tablet: { column: 2, row: 1, columnSpan: 10, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: { typography: { align: "center" }, sizing: { width: "full" } },
            children: [
              {
                id: "h01-eyebrow-badge",
                type: "text",
                text: "✦ AUTONOMOUS SYSTEMS 2026",
                style: {
                  spacing: { paddingY: "xs", paddingX: "md" },
                  border: { radius: "full", width: "hairline", color: "border" },
                  color: { background: "surface-muted", text: "primary" },
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                },
              },
              {
                id: "h01-headline",
                type: "heading",
                level: 1,
                text: "The definitive platform for autonomous execution.",
                style: {
                  typography: { size: "6xl", weight: "bold", tracking: "tight", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "h01-lead-copy",
                type: "text",
                text: "Coordinate autonomous engineering pods, self-healing data pipelines, and real-time enterprise telemetry with absolute mathematical determinism.",
                style: {
                  typography: { size: "xl", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "2xl", align: "center" },
                },
              },
              {
                id: "h01-action-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "xs",
                style: { sizing: { width: "fit", align: "center" } },
                children: [
                  {
                    id: "h01-btn-primary",
                    type: "button",
                    label: "Deploy autonomous cluster now",
                    href: "/deploy",
                    style: {
                      spacing: { paddingY: "md", paddingX: "xl" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "full" },
                      typography: { size: "base", weight: "semibold" },
                    },
                  },
                  {
                    id: "h01-btn-secondary",
                    type: "button",
                    label: "Read architectural whitepaper →",
                    href: "/whitepaper",
                    style: {
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "transparent", text: "text-muted" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
              {
                id: "h01-divider",
                type: "divider",
                style: { sizing: { width: "10rem", align: "center" }, color: { text: "border" } },
              },
              {
                id: "h01-trust-strip",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "h01-proof-soc2",
                    type: "text",
                    text: "✓ SOC2 Type II Certified",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h01-proof-latency",
                    type: "text",
                    text: "✓ Sub-5ms edge latency",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h01-proof-airgap",
                    type: "text",
                    text: "✓ Air-gapped VPC support",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
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
 * HERO-02: Asymmetric Editorial Split
 * An unbalanced 7:5 ratio pairing long-form serif narrative with publication issue
 * headers and a vertical portrait photography study.
 */
export const HERO_EDITORIAL_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-editorial-split",
  name: "Editorial Journal · Asymmetric Cover Story",
  kind: "section",
  root: {
    id: "h02-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h02-shell",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "h02-issue-header",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "h02-journal-title",
                type: "text",
                text: "FORM & FIELD // AN INDEPENDENT MONOGRAPH",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "primary" } },
              },
              {
                id: "h02-journal-meta",
                type: "text",
                text: "ISSUE 08 · AUTUMN 2026 EDITION",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "h02-top-rule",
            type: "divider",
            style: { sizing: { width: "full" }, color: { text: "border" } },
          },
          {
            id: "h02-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "xl" }, sizing: { width: "full" } },
            children: [
              {
                id: "h02-left-essay",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                children: [
                  {
                    id: "h02-eyebrow",
                    type: "text",
                    text: "DESIGN / CULTURE / TOPOGRAPHY",
                    style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "accent" } },
                  },
                  {
                    id: "h02-heading",
                    type: "heading",
                    level: 1,
                    text: "Architecture for a world that cannot sit still.",
                    style: {
                      typography: { family: "serif", size: "6xl", weight: "normal", leading: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h02-lead-para",
                    type: "text",
                    text: "The software architectures we construct are not merely instruments of operational throughput; they are the physical topography of human coordination. When digital environments mirror contemplation rather than anxiety, velocity ceases to be an obsession and becomes an effortless outcome.",
                    style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text" } },
                  },
                  {
                    id: "h02-sub-para",
                    type: "text",
                    text: "In this opening chapter, we deconstruct twelve resilient organizations that replaced fragmented toolchains with cohesive, observable visual canvases.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h02-action-link",
                    type: "button",
                    label: "Read the full 18-minute monograph →",
                    href: "/monograph",
                    style: {
                      spacing: { paddingY: "sm", paddingX: "none" },
                      color: { background: "transparent", text: "primary" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                ],
              },
              {
                id: "h02-right-media",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                children: [
                  {
                    id: "h02-portrait-image",
                    type: "image",
                    src: "/visual-builder/architecture-study.svg",
                    alt: "Architectural study of monolithic concrete columns and light",
                    aspectRatio: "portrait",
                    objectFit: "cover",
                    style: {
                      border: { radius: "lg", width: "hairline", color: "border" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "h02-image-caption",
                    type: "text",
                    text: "Figure 1.1 — Spatial balance between declarative structure and runtime state.",
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
};

/**
 * HERO-03: Modular Bento Grid
 * A 4-cell asymmetric Bento box composed of modular cards with distinct aspect ratios,
 * metrics, and live visual telemetry.
 */
export const HERO_MODULAR_BENTO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-modular-bento",
  name: "Modular Bento Grid · Multi-Cell Matrix",
  kind: "section",
  root: {
    id: "h03-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h03-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "lg" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Cell 1: Hero Anchor Card (desktop span 8)
          {
            id: "h03-cell-anchor",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "between",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 8, desktop: 8 } },
            style: {
              color: { background: "surface-muted", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "h03-anchor-badge",
                type: "text",
                text: "SYSTEM CORE 4.0 RELEASE",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "primary" } },
              },
              {
                id: "h03-anchor-heading",
                type: "heading",
                level: 1,
                text: "The unified canvas for modern application engineering.",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "h03-anchor-copy",
                type: "text",
                text: "Compose multi-tenant cloud applications visually, bind reactive database schemas, and ship production bundles in seconds.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "h03-anchor-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "h03-btn-start",
                    type: "button",
                    label: "Start Building Free",
                    href: "/signup",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                  {
                    id: "h03-btn-sandbox",
                    type: "button",
                    label: "Open Live Sandbox",
                    href: "/sandbox",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "surface", text: "text" },
                      border: { radius: "md", width: "hairline", color: "border" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
            ],
          },
          // Cell 2: Latency KPI Tile (desktop span 4)
          {
            id: "h03-cell-latency",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "between",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
            style: {
              color: { background: "surface-sunken", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "h03-kpi-eyebrow",
                type: "text",
                text: "LATENCY BUDGET",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
              },
              {
                id: "h03-kpi-figure",
                type: "heading",
                level: 2,
                text: "1.8ms",
                style: { typography: { size: "6xl", weight: "bold", tracking: "tight" }, color: { text: "accent" } },
              },
              {
                id: "h03-kpi-desc",
                type: "text",
                text: "P99 Global Edge Render across 280 points of presence.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "h03-kpi-divider",
                type: "divider",
                style: { sizing: { width: "full" }, color: { text: "border" } },
              },
              {
                id: "h03-kpi-sla",
                type: "text",
                text: "✓ 99.999% SLA Uptime Guarantee",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
              },
            ],
          },
          // Cell 3: Schema Capability Card (desktop span 5)
          {
            id: "h03-cell-schema",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "between",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
            style: {
              color: { background: "surface-sunken", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "h03-schema-eyebrow",
                type: "text",
                text: "SCHEMA REPOSITORIES",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
              },
              {
                id: "h03-schema-heading",
                type: "heading",
                level: 3,
                text: "Zero-Boilerplate AutoTable Sync",
                style: { typography: { size: "xl", weight: "semibold" } },
              },
              {
                id: "h03-schema-desc",
                type: "text",
                text: "Connect Mongo, PostgreSQL, or libSQL with bi-directional streaming mutations and reactive validation.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "h03-schema-link",
                type: "button",
                label: "Explore schema catalog →",
                href: "/schemas",
                style: {
                  spacing: { paddingY: "xs", paddingX: "none" },
                  color: { background: "transparent", text: "primary" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
            ],
          },
          // Cell 4: Visual Telemetry Card (desktop span 7)
          {
            id: "h03-cell-telemetry",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
            style: {
              color: { background: "surface-muted", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "h03-telemetry-header",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "h03-telemetry-title",
                    type: "text",
                    text: "LIVE VISUAL TELEMETRY",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h03-telemetry-status",
                    type: "text",
                    text: "CLUSTER STATE: HEALTHY",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "accent" } },
                  },
                ],
              },
              {
                id: "h03-telemetry-image",
                type: "image",
                src: "/visual-builder/hero-product.svg",
                alt: "Visual Telemetry monitor preview",
                aspectRatio: "landscape",
                objectFit: "cover",
                style: { border: { radius: "lg" }, sizing: { width: "full" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * HERO-04: Developer Command Center
 * A 5:7 split pairing a CLI value proposition and quick-install action with a syntax-highlighted
 * executable code terminal.
 */
export const HERO_DEVELOPER_TERMINAL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-developer-terminal",
  name: "Developer Hub · Terminal Command Center",
  kind: "section",
  root: {
    id: "h04-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h04-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Left Column (span 5): CLI Narrative & Actions
          {
            id: "h04-left-col",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
            children: [
              {
                id: "h04-badge",
                type: "text",
                text: "TERMINAL RUNTIME v2.8",
                style: {
                  spacing: { paddingY: "xs", paddingX: "md" },
                  border: { radius: "full", width: "hairline", color: "border" },
                  color: { background: "surface-muted", text: "primary" },
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  sizing: { width: "fit" },
                },
              },
              {
                id: "h04-heading",
                type: "heading",
                level: 1,
                text: "Ship code at terminal velocity.",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "h04-copy",
                type: "text",
                text: "The command-line orchestration layer for distributed edge applications. Boot isolated sandboxes in 14ms and deploy globally with zero ceremony.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "h04-cli-pill",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "sm",
                style: {
                  spacing: { padding: "sm", paddingX: "md" },
                  color: { background: "surface-sunken", text: "primary" },
                  border: { radius: "md", width: "hairline", color: "border" },
                },
                children: [
                  {
                    id: "h04-cli-cmd",
                    type: "text",
                    text: "$ curl -sSL https://ozmi.run/install | sh",
                    style: { typography: { family: "monospace", size: "sm" } },
                  },
                ],
              },
              {
                id: "h04-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "h04-btn-docs",
                    type: "button",
                    label: "Developer Quickstart",
                    href: "/quickstart",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                  {
                    id: "h04-btn-github",
                    type: "button",
                    label: "GitHub (★ 14.8k)",
                    href: "https://github.com",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "hairline", color: "border" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
              {
                id: "h04-perks-stack",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  {
                    id: "h04-perk-1",
                    type: "text",
                    text: "✓ Zero runtime dependencies (single 14MB binary)",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h04-perk-2",
                    type: "text",
                    text: "✓ Cross-platform Linux / macOS / WASM target",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },
          // Right Column (span 7): Code Terminal Console Window
          {
            id: "h04-right-console",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
            style: {
              color: { background: "surface-sunken", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border" },
              spacing: { padding: "lg" },
            },
            children: [
              {
                id: "h04-window-header",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "h04-window-dots",
                    type: "text",
                    text: "● ● ●",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h04-window-file",
                    type: "text",
                    text: "cluster.config.ts",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h04-window-status",
                    type: "text",
                    text: "LIVE EXECUTION",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "accent" } },
                  },
                ],
              },
              {
                id: "h04-terminal-code",
                type: "code",
                code: `import { cluster, autoScale } from '@ozmishow/runtime';\n\nexport default cluster({\n  nodes: 64,\n  regions: ['iad', 'fra', 'sin'],\n  failover: 'sub-second',\n  strategy: autoScale({ min: 8, max: 256, targetCpu: 0.70 }),\n});\n\n// Ready in 14ms across 3 regions`,
                language: "typescript",
                showLanguage: true,
                showCopy: true,
                wrap: false,
                style: { border: { radius: "md" } },
              },
              {
                id: "h04-telemetry-footer",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "h04-stat-nodes",
                    type: "text",
                    text: "STATUS: 64 NODES HEALTHY",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "primary" } },
                  },
                  {
                    id: "h04-stat-throughput",
                    type: "text",
                    text: "THROUGHPUT: 48,200 REQ/SEC",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
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
 * HERO-05: Interactive Tabbed Workspace
 * Top centered intro stack commanding a full-width interactive tabs container with 3 selectable
 * feature lenses, each swapping contextual copy and graphic previews.
 */
export const HERO_TABBED_WORKSPACE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-tabbed-workspace",
  name: "Interactive Workspace · Tabbed Feature Stage",
  kind: "section",
  root: {
    id: "h05-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h05-shell",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Centered Header Stack
          {
            id: "h05-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "sm",
            style: { typography: { align: "center" }, sizing: { maxWidth: "3xl", align: "center" } },
            children: [
              {
                id: "h05-eyebrow",
                type: "text",
                text: "WORKFLOW LENSES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "primary" } },
              },
              {
                id: "h05-heading",
                type: "heading",
                level: 1,
                text: "One unified engine. Three specialized lenses.",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "h05-copy",
                type: "text",
                text: "Switch between visual composition, schema mapping, and pipeline automation without context switching.",
                style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
              },
            ],
          },
          // Interactive Tabs Component
          {
            id: "h05-tabs",
            type: "tabs",
            children: [
              // Tab 1: Visual Studio
              {
                id: "h05-tab-studio",
                type: "disclosure",
                defaultOpen: true,
                transition: "height-fade",
                children: [
                  {
                    id: "h05-studio-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "h05-studio-label",
                        type: "heading",
                        level: 3,
                        text: "01 / Visual Studio",
                        style: { typography: { size: "base", weight: "semibold" } },
                      },
                    ],
                  },
                  {
                    id: "h05-studio-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "h05-studio-grid",
                        type: "grid",
                        columns: 12,
                        style: {
                          spacing: { padding: "xl", gap: "lg" },
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "xl", width: "hairline", color: "border" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "h05-studio-text-col",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "between",
                            wrap: false,
                            gap: "md",
                            layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                            children: [
                              {
                                id: "h05-studio-panel-heading",
                                type: "heading",
                                level: 2,
                                text: "Direct manipulation for component systems",
                                style: { typography: { size: "2xl", weight: "bold" } },
                              },
                              {
                                id: "h05-studio-panel-copy",
                                type: "text",
                                text: "Edit layout spans, responsive tokens, and nested compound slots directly on the interactive canvas with instantaneous hot preview.",
                                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                              {
                                id: "h05-studio-panel-btn",
                                type: "button",
                                label: "Open Visual Studio →",
                                href: "/studio",
                                style: {
                                  spacing: { paddingY: "md", paddingX: "lg" },
                                  color: { background: "primary", text: "primary-foreground" },
                                  border: { radius: "md" },
                                  typography: { size: "sm", weight: "semibold" },
                                },
                              },
                            ],
                          },
                          {
                            id: "h05-studio-media-col",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "center",
                            wrap: false,
                            gap: "none",
                            layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                            children: [
                              {
                                id: "h05-studio-img",
                                type: "image",
                                src: "/visual-builder/hero-product.svg",
                                alt: "Visual Studio canvas preview",
                                aspectRatio: "landscape",
                                objectFit: "cover",
                                style: { border: { radius: "lg" }, sizing: { width: "full" } },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Tab 2: Schema Engine
              {
                id: "h05-tab-schemas",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                children: [
                  {
                    id: "h05-schemas-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "h05-schemas-label",
                        type: "heading",
                        level: 3,
                        text: "02 / Schema Engine",
                        style: { typography: { size: "base", weight: "semibold" } },
                      },
                    ],
                  },
                  {
                    id: "h05-schemas-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "h05-schemas-grid",
                        type: "grid",
                        columns: 12,
                        style: {
                          spacing: { padding: "xl", gap: "lg" },
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "xl", width: "hairline", color: "border" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "h05-schemas-text-col",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "between",
                            wrap: false,
                            gap: "md",
                            layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                            children: [
                              {
                                id: "h05-schemas-panel-heading",
                                type: "heading",
                                level: 2,
                                text: "Live database models without migrations",
                                style: { typography: { size: "2xl", weight: "bold" } },
                              },
                              {
                                id: "h05-schemas-panel-copy",
                                type: "text",
                                text: "Declare collections, validation policies, and real-time field bindings with automatic TypeScript typings and zero downtime.",
                                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                              {
                                id: "h05-schemas-panel-btn",
                                type: "button",
                                label: "Inspect Schema Engine →",
                                href: "/schemas",
                                style: {
                                  spacing: { paddingY: "md", paddingX: "lg" },
                                  color: { background: "primary", text: "primary-foreground" },
                                  border: { radius: "md" },
                                  typography: { size: "sm", weight: "semibold" },
                                },
                              },
                            ],
                          },
                          {
                            id: "h05-schemas-media-col",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "center",
                            wrap: false,
                            gap: "none",
                            layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                            children: [
                              {
                                id: "h05-schemas-img",
                                type: "image",
                                src: "/visual-builder/architecture-study.svg",
                                alt: "Schema engine relational topology preview",
                                aspectRatio: "landscape",
                                objectFit: "cover",
                                style: { border: { radius: "lg" }, sizing: { width: "full" } },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Tab 3: Automation Pipelines
              {
                id: "h05-tab-pipelines",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                children: [
                  {
                    id: "h05-pipelines-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "h05-pipelines-label",
                        type: "heading",
                        level: 3,
                        text: "03 / Automation Pipelines",
                        style: { typography: { size: "base", weight: "semibold" } },
                      },
                    ],
                  },
                  {
                    id: "h05-pipelines-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "h05-pipelines-grid",
                        type: "grid",
                        columns: 12,
                        style: {
                          spacing: { padding: "xl", gap: "lg" },
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "xl", width: "hairline", color: "border" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "h05-pipelines-text-col",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "between",
                            wrap: false,
                            gap: "md",
                            layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                            children: [
                              {
                                id: "h05-pipelines-panel-heading",
                                type: "heading",
                                level: 2,
                                text: "Deterministic event-driven execution",
                                style: { typography: { size: "2xl", weight: "bold" } },
                              },
                              {
                                id: "h05-pipelines-panel-copy",
                                type: "text",
                                text: "Connect webhook triggers, transactional outboxes, and aggregation pipelines with sub-millisecond edge queue processing.",
                                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                              {
                                id: "h05-pipelines-panel-btn",
                                type: "button",
                                label: "Configure Pipelines →",
                                href: "/pipelines",
                                style: {
                                  spacing: { paddingY: "md", paddingX: "lg" },
                                  color: { background: "primary", text: "primary-foreground" },
                                  border: { radius: "md" },
                                  typography: { size: "sm", weight: "semibold" },
                                },
                              },
                            ],
                          },
                          {
                            id: "h05-pipelines-media-col",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "center",
                            wrap: false,
                            gap: "none",
                            layout: { span: { mobile: 12, tablet: 7, desktop: 7 } },
                            children: [
                              {
                                id: "h05-pipelines-img",
                                type: "image",
                                src: "/visual-builder/hero-product.svg",
                                alt: "Pipeline telemetry flow preview",
                                aspectRatio: "landscape",
                                objectFit: "cover",
                                style: { border: { radius: "lg" }, sizing: { width: "full" } },
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
        ],
      },
    ],
  },
};

export const CURATED_HERO_BATCH_1: ComponentDocument[] = [
  HERO_CENTERED_MONOLITH_DOCUMENT,
  HERO_EDITORIAL_SPLIT_DOCUMENT,
  HERO_MODULAR_BENTO_DOCUMENT,
  HERO_DEVELOPER_TERMINAL_DOCUMENT,
  HERO_TABBED_WORKSPACE_DOCUMENT,
];
