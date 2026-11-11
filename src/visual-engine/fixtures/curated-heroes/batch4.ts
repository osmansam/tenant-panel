import type { ComponentDocument } from "../../model";
import type { HeroFingerprint } from "./fingerprints";

export const BATCH_4_FINGERPRINTS: Record<string, HeroFingerprint> = {
  "hero-catalog-repeater": {
    id: "hero-catalog-repeater",
    name: "Data Query Shelf · Live AutoTable Repeater",
    layoutFamily: "data-visualization-led",
    alignment: "left-filter-right-table",
    gridPattern: "4-8-data-split",
    mediaPlacement: "none",
    contentHierarchy: "query-filters-leading-records",
    dominantElement: "repeater-catalog-shelf",
    ctaPattern: "filter-search-submit-action",
    interactionModel: "repeater-data-query",
    density: "dense-table-dashboard",
  },
  "hero-layered-depth": {
    id: "hero-layered-depth",
    name: "Layered Spatial Elevation · Overlapping Deck",
    layoutFamily: "layered-cards",
    alignment: "left-pitch-right-card-stack",
    gridPattern: "5-7-depth-split",
    mediaPlacement: "nested-card-illustrations",
    contentHierarchy: "pitch-over-cascading-deck",
    dominantElement: "spatial-overlapping-deck",
    ctaPattern: "card-deck-launch-action",
    interactionModel: "static-read",
    density: "balanced-standard",
  },
  "hero-portal-hub": {
    id: "hero-portal-hub",
    name: "Command Gateway · Doorway Navigation Hub",
    layoutFamily: "navigation-portal-led",
    alignment: "top-command-bottom-doorways",
    gridPattern: "command-over-4col-doorways",
    mediaPlacement: "none",
    contentHierarchy: "omni-search-over-portals",
    dominantElement: "command-search-doorways",
    ctaPattern: "command-bar-input-trigger",
    interactionModel: "search-navigation-input",
    density: "balanced-standard",
  },
  "hero-trust-marquee": {
    id: "hero-trust-marquee",
    name: "Enterprise Trust Marquee · Dual Case Benchmark",
    layoutFamily: "trust-logo-led",
    alignment: "top-marquee-bottom-dual-proof",
    gridPattern: "marquee-over-dual-cards",
    mediaPlacement: "partner-logo-strip",
    contentHierarchy: "logo-strip-over-case-studies",
    dominantElement: "marquee-trust-banner",
    ctaPattern: "dual-card-case-study-links",
    interactionModel: "static-read",
    density: "balanced-standard",
  },
  "hero-conversion-dock": {
    id: "hero-conversion-dock",
    name: "High-Intent Action Launcher · Conversion Dock",
    layoutFamily: "form-led",
    alignment: "center-conversion-funnel",
    gridPattern: "single-col-centered-compact",
    mediaPlacement: "none",
    contentHierarchy: "value-pitch-input-dock-perks",
    dominantElement: "integrated-form-dock",
    ctaPattern: "unified-input-button-dock",
    interactionModel: "form-input-submission",
    density: "compact-conversion-funnel",
  },
};

/**
 * HERO-16: Data Query Shelf · Live AutoTable Repeater
 * Asymmetric 4:8 composition pairing query filters on the left with an active
 * repeater shelf displaying live data records on the right.
 */
export const HERO_CATALOG_REPEATER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-catalog-repeater",
  name: "Data Query Shelf · Live AutoTable Repeater",
  kind: "section",
  root: {
    id: "h16-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h16-main-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
          spacing: { gap: "xl" },
        },
        children: [
          // Left Column Query Filter Controls (Span 4 on Desktop)
          {
            id: "h16-query-deck",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 4 },
            },
            style: {
              spacing: { paddingY: "xl", paddingX: "lg" },
              color: { background: "surface-muted", text: "text" },
              border: { width: "thin", color: "border", radius: "xl" },
            },
            children: [
              {
                id: "h16-filter-kicker",
                type: "text",
                text: "TELEMETRY ENGINE · LIVE QUERY",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h16-filter-title",
                type: "heading",
                level: 1,
                text: "Query global edge compute nodes.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "h16-filter-desc",
                type: "text",
                text: "Filter live clusters, inspect memory allocation, and track sub-millisecond network latency across 42 availability zones.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "h16-filter-div",
                type: "divider",
                style: { border: { width: "hairline", color: "border" } },
              },
              {
                id: "h16-filter-pills",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  {
                    id: "h16-pill-region",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "xs",
                    style: {
                      spacing: { paddingY: "xs", paddingX: "sm" },
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                    },
                    children: [
                      {
                        id: "h16-pill-region-lbl",
                        type: "text",
                        text: "Region:",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "h16-pill-region-val",
                        type: "text",
                        text: "All 42 Zones ▾",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "h16-pill-status",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "xs",
                    style: {
                      spacing: { paddingY: "xs", paddingX: "sm" },
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                    },
                    children: [
                      {
                        id: "h16-pill-status-lbl",
                        type: "text",
                        text: "Node Status:",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "h16-pill-status-val",
                        type: "text",
                        text: "● Operational",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },
              {
                id: "h16-btn-apply",
                type: "button",
                label: "Apply Query Filter",
                href: "#query",
                style: {
                  color: { background: "primary", text: "surface" },
                  border: { radius: "md" },
                  spacing: { paddingY: "sm", paddingX: "lg" },
                  typography: { weight: "semibold" },
                },
              },
            ],
          },

          // Right Column Live Data Shelf (Span 8 on Desktop)
          {
            id: "h16-table-shelf",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 8 },
            },
            children: [
              // Shelf Header Bar
              {
                id: "h16-shelf-hdr",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "sm",
                style: {
                  spacing: { paddingY: "sm", paddingX: "md" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h16-shelf-title",
                    type: "text",
                    text: "LIVE CLUSTERS STREAM (AUTOTABLE COLLECTION)",
                    style: {
                      typography: { size: "sm", weight: "semibold", tracking: "wide" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h16-shelf-rate",
                    type: "text",
                    text: "Sync: 500ms · Deterministic CRDT",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "accent" },
                    },
                  },
                ],
              },

              // Data Card 1
              {
                id: "h16-node-card-1",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h16-node-info-1",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "h16-node-name-1",
                        type: "text",
                        text: "cluster-us-east-alpha",
                        style: { typography: { size: "base", weight: "semibold" }, color: { text: "text" } },
                      },
                      {
                        id: "h16-node-meta-1",
                        type: "text",
                        text: "Zone: us-east-1 · vCPUs: 128 · Mem: 512 GB",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h16-node-stats-1",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "end",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "h16-node-ping-1",
                        type: "text",
                        text: "0.8ms",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "h16-node-badge-1",
                        type: "button",
                        label: "Inspect Node",
                        href: "#node-1",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { width: "thin", color: "border", radius: "md" },
                          spacing: { paddingY: "xs", paddingX: "sm" },
                          typography: { size: "sm" },
                        },
                      },
                    ],
                  },
                ],
              },

              // Data Card 2
              {
                id: "h16-node-card-2",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h16-node-info-2",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "h16-node-name-2",
                        type: "text",
                        text: "cluster-eu-central-bravo",
                        style: { typography: { size: "base", weight: "semibold" }, color: { text: "text" } },
                      },
                      {
                        id: "h16-node-meta-2",
                        type: "text",
                        text: "Zone: eu-west-1 · vCPUs: 256 · Mem: 1024 GB",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h16-node-stats-2",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "end",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "h16-node-ping-2",
                        type: "text",
                        text: "1.2ms",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "h16-node-badge-2",
                        type: "button",
                        label: "Inspect Node",
                        href: "#node-2",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { width: "thin", color: "border", radius: "md" },
                          spacing: { paddingY: "xs", paddingX: "sm" },
                          typography: { size: "sm" },
                        },
                      },
                    ],
                  },
                ],
              },

              // Data Card 3
              {
                id: "h16-node-card-3",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h16-node-info-3",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "h16-node-name-3",
                        type: "text",
                        text: "cluster-ap-southeast-gamma",
                        style: { typography: { size: "base", weight: "semibold" }, color: { text: "text" } },
                      },
                      {
                        id: "h16-node-meta-3",
                        type: "text",
                        text: "Zone: ap-southeast-1 · vCPUs: 64 · Mem: 256 GB",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h16-node-stats-3",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "end",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "h16-node-ping-3",
                        type: "text",
                        text: "2.1ms",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "h16-node-badge-3",
                        type: "button",
                        label: "Inspect Node",
                        href: "#node-3",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { width: "thin", color: "border", radius: "md" },
                          spacing: { paddingY: "xs", paddingX: "sm" },
                          typography: { size: "sm" },
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
    ],
  },
};

/**
 * HERO-17: Layered Spatial Elevation · Overlapping Deck
 * Asymmetric 5:7 split pairing a left-aligned product narrative with an
 * overlapping 3-card spatial deck on the right creating tactile elevation.
 */
export const HERO_LAYERED_DEPTH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-layered-depth",
  name: "Layered Spatial Elevation · Overlapping Deck",
  kind: "section",
  root: {
    id: "h17-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface-sunken", text: "text" },
    },
    children: [
      {
        id: "h17-main-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
          spacing: { gap: "xl" },
        },
        children: [
          // Left Column Pitch Stack (Span 5 on Desktop)
          {
            id: "h17-pitch-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 5 },
            },
            children: [
              {
                id: "h17-kicker",
                type: "text",
                text: "SPATIAL COMPOSITION ARCHITECTURE",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h17-title",
                type: "heading",
                level: 1,
                text: "Interface design with architectural depth.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "h17-desc",
                type: "text",
                text: "Stack, nest, and layer intelligent components that maintain spatial hierarchy without losing performance, rendering clarity, or responsive responsiveness.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "h17-div",
                type: "divider",
                style: { border: { width: "hairline", color: "border" } },
              },
              {
                id: "h17-specs",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  {
                    id: "h17-spec-1",
                    type: "text",
                    text: "✓ Hardware accelerated sub-pixel elevation",
                    style: { typography: { size: "sm" }, color: { text: "text" } },
                  },
                  {
                    id: "h17-spec-2",
                    type: "text",
                    text: "✓ Adaptive z-index collision prevention",
                    style: { typography: { size: "sm" }, color: { text: "text" } },
                  },
                  {
                    id: "h17-spec-3",
                    type: "text",
                    text: "✓ Zero cumulative layout shift across breakpoints",
                    style: { typography: { size: "sm" }, color: { text: "text" } },
                  },
                ],
              },
              {
                id: "h17-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                style: { spacing: { paddingTop: "sm" } },
                children: [
                  {
                    id: "h17-btn-build",
                    type: "button",
                    label: "Build Spatial Deck",
                    href: "#build",
                    style: {
                      color: { background: "primary", text: "surface" },
                      border: { radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "semibold" },
                    },
                  },
                  {
                    id: "h17-btn-specs",
                    type: "button",
                    label: "View Elevation Specs",
                    href: "#specs",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "medium" },
                    },
                  },
                ],
              },
            ],
          },

          // Right Column 3-Card Cascading Elevation Deck (Span 7 on Desktop)
          {
            id: "h17-deck-col",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 7 },
            },
            children: [
              // Layer 1: Base Deck Card
              {
                id: "h17-layer-1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h17-l1-badge",
                    type: "text",
                    text: "LAYER 01 · DATA FOUNDATION",
                    style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h17-l1-title",
                    type: "text",
                    text: "Immutable Schema Store",
                    style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "h17-l1-desc",
                    type: "text",
                    text: "Synchronized document trees with automatic reconciliation and deterministic rollbacks.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              // Layer 2: Middle Elevated Card
              {
                id: "h17-layer-2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingY: "lg", paddingX: "xl" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "primary", radius: "xl", shadow: "md" },
                },
                children: [
                  {
                    id: "h17-l2-badge",
                    type: "text",
                    text: "LAYER 02 · REACTIVE STATE LAYER",
                    style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "primary" } },
                  },
                  {
                    id: "h17-l2-title",
                    type: "text",
                    text: "Bidirectional Property Binding",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "h17-l2-desc",
                    type: "text",
                    text: "Dynamic props propagate seamlessly between Visual Builder AST nodes and compiled React 19 server components.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              // Layer 3: Top Hero Card
              {
                id: "h17-layer-3",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingY: "xl", paddingX: "xl" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "accent", radius: "xl", shadow: "xl" },
                },
                children: [
                  {
                    id: "h17-l3-badge",
                    type: "text",
                    text: "LAYER 03 · HARDWARE PRESENTATION",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "accent" } },
                  },
                  {
                    id: "h17-l3-title",
                    type: "text",
                    text: "Hardware Accelerated Canvas",
                    style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "h17-l3-desc",
                    type: "text",
                    text: "Instant 60fps gesture dragging, multi-touch scaling, and spatial positioning executed at full display refresh rates.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
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
 * HERO-18: Command Gateway · Doorway Navigation Hub
 * Search-first command bar input dock dominating the top, resting over
 * 4 quick-access doorway destination cards ([3, 3, 3, 3]) for direct workspace access.
 */
export const HERO_PORTAL_HUB_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-portal-hub",
  name: "Command Gateway · Doorway Navigation Hub",
  kind: "section",
  root: {
    id: "h18-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h18-shell",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          // Header & Command Bar Stack
          {
            id: "h18-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { width: "full", maxWidth: "4xl" },
            },
            children: [
              {
                id: "h18-kicker",
                type: "text",
                text: "UNIFIED DEVELOPER GATEWAY",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide", align: "center" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h18-title",
                type: "heading",
                level: 1,
                text: "Where would you like to build today?",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "h18-subtitle",
                type: "text",
                text: "Jump directly into any studio module, or search components, schemas, endpoints, and deployment targets instantly.",
                style: {
                  typography: { size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                },
              },
              // Search Command Bar Dock
              {
                id: "h18-cmd-bar",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "md",
                style: {
                  spacing: { paddingY: "sm", paddingX: "lg" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "full", shadow: "md" },
                  sizing: { width: "full", maxWidth: "3xl" },
                },
                children: [
                  {
                    id: "h18-cmd-placeholder",
                    type: "text",
                    text: "🔍 Search components, models, routes, or press ⌘K...",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "h18-cmd-keybadge",
                    type: "button",
                    label: "⌘K QUICK JUMP",
                    href: "#command-palette",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
            ],
          },

          // 4 Doorway Gateway Cards Grid
          {
            id: "h18-doorways-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              // Doorway 1
              {
                id: "h18-doorway-1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  spacing: { paddingY: "lg", paddingX: "md" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h18-d1-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h18-d1-num",
                        type: "text",
                        text: "01 / STUDIO",
                        style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "primary" } },
                      },
                      {
                        id: "h18-d1-title",
                        type: "text",
                        text: "Visual Canvas",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "h18-d1-desc",
                        type: "text",
                        text: "Direct AST drag-and-drop component tree composition.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h18-d1-btn",
                    type: "button",
                    label: "Open Studio →",
                    href: "#studio",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },

              // Doorway 2
              {
                id: "h18-doorway-2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  spacing: { paddingY: "lg", paddingX: "md" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h18-d2-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h18-d2-num",
                        type: "text",
                        text: "02 / SCHEMAS",
                        style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "primary" } },
                      },
                      {
                        id: "h18-d2-title",
                        type: "text",
                        text: "Model Topology",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "h18-d2-desc",
                        type: "text",
                        text: "Interactive AutoTable relations and schema migrations.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h18-d2-btn",
                    type: "button",
                    label: "Explore Models →",
                    href: "#schemas",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },

              // Doorway 3
              {
                id: "h18-doorway-3",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  spacing: { paddingY: "lg", paddingX: "md" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h18-d3-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h18-d3-num",
                        type: "text",
                        text: "03 / PIPELINES",
                        style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "primary" } },
                      },
                      {
                        id: "h18-d3-title",
                        type: "text",
                        text: "Automations",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "h18-d3-desc",
                        type: "text",
                        text: "Deterministic state workflows and external webhooks.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h18-d3-btn",
                    type: "button",
                    label: "View Pipelines →",
                    href: "#automations",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },

              // Doorway 4
              {
                id: "h18-doorway-4",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 3 },
                },
                style: {
                  spacing: { paddingY: "lg", paddingX: "md" },
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                },
                children: [
                  {
                    id: "h18-d4-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h18-d4-num",
                        type: "text",
                        text: "04 / EDGE MESH",
                        style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "primary" } },
                      },
                      {
                        id: "h18-d4-title",
                        type: "text",
                        text: "Global Routers",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "h18-d4-desc",
                        type: "text",
                        text: "Worldwide multi-region DNS and automatic edge SSL.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "h18-d4-btn",
                    type: "button",
                    label: "Inspect Mesh →",
                    href: "#mesh",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "xs", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
            ],
          },

          // Bottom Session Footnote
          {
            id: "h18-session-note",
            type: "text",
            text: "All 4 workspaces connected to current tenant context · Authenticated session: active",
            style: {
              typography: { size: "sm", align: "center" },
              color: { text: "text-muted" },
            },
          },
        ],
      },
    ],
  },
};

/**
 * HERO-19: Enterprise Trust Marquee · Dual Case Benchmark
 * Top marquee trust strip featuring 6 verified global enterprise partner badges,
 * resting above dual flagship case study benchmark cards ([6, 6]).
 */
export const HERO_TRUST_MARQUEE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-trust-marquee",
  name: "Enterprise Trust Marquee · Dual Case Benchmark",
  kind: "section",
  root: {
    id: "h19-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface-sunken", text: "text" },
    },
    children: [
      {
        id: "h19-shell",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          // Header Stack
          {
            id: "h19-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { width: "full", maxWidth: "4xl" },
            },
            children: [
              {
                id: "h19-kicker",
                type: "text",
                text: "MISSION CRITICAL PRODUCTION VERIFICATION",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide", align: "center" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h19-title",
                type: "heading",
                level: 1,
                text: "Trusted by engineering teams at global scale.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "h19-subtitle",
                type: "text",
                text: "From Fortune 50 platforms to fast-growing startups, Ozmishow powers billions of deterministic user interactions every month.",
                style: {
                  typography: { size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // 6-Partner Trust Marquee Banner
          {
            id: "h19-marquee-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "sm", paddingY: "md", paddingX: "lg" },
              color: { background: "surface", text: "text" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
            },
            children: [
              {
                id: "h19-partner-1",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 6, tablet: 4, desktop: 2 } },
                children: [
                  {
                    id: "h19-p1-text",
                    type: "text",
                    text: "ACME CORP",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h19-partner-2",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 6, tablet: 4, desktop: 2 } },
                children: [
                  {
                    id: "h19-p2-text",
                    type: "text",
                    text: "CYBERDYNE",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h19-partner-3",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 6, tablet: 4, desktop: 2 } },
                children: [
                  {
                    id: "h19-p3-text",
                    type: "text",
                    text: "NOVAGEN",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h19-partner-4",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 6, tablet: 4, desktop: 2 } },
                children: [
                  {
                    id: "h19-p4-text",
                    type: "text",
                    text: "STRATOS AI",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h19-partner-5",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 6, tablet: 4, desktop: 2 } },
                children: [
                  {
                    id: "h19-p5-text",
                    type: "text",
                    text: "VERTEX LABS",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h19-partner-6",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                layout: { span: { mobile: 6, tablet: 4, desktop: 2 } },
                children: [
                  {
                    id: "h19-p6-text",
                    type: "text",
                    text: "HELIOS SYS",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },

          // Dual Flagship Case Benchmark Cards Grid ([6, 6])
          {
            id: "h19-case-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              // Case Study 1
              {
                id: "h19-case-card-1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 6 },
                },
                style: {
                  spacing: { paddingY: "xl", paddingX: "xl" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                },
                children: [
                  {
                    id: "h19-c1-content",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h19-c1-tag",
                        type: "text",
                        text: "FINANCIAL SERVICES · ENTERPRISE BENCHMARK",
                        style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "accent" } },
                      },
                      {
                        id: "h19-c1-title",
                        type: "text",
                        text: "Apex Capital: 85% Drop in Release Latency",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "h19-c1-desc",
                        type: "text",
                        text: "Migrated 250 high-concurrency trading dashboards to Ozmishow without a single minute of customer downtime or regulatory disruption.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "h19-c1-div",
                        type: "divider",
                        style: { border: { width: "hairline", color: "border" } },
                      },
                      {
                        id: "h19-c1-metrics",
                        type: "flex",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: false,
                        gap: "xl",
                        children: [
                          {
                            id: "h19-c1-m1",
                            type: "text",
                            text: "380ms P99 Latency",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "h19-c1-m2",
                            type: "text",
                            text: "$1.8M OpEx Savings",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "h19-c1-btn",
                    type: "button",
                    label: "Read Apex Capital Case Study →",
                    href: "#apex-study",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "semibold" },
                    },
                  },
                ],
              },

              // Case Study 2
              {
                id: "h19-case-card-2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 6 },
                },
                style: {
                  spacing: { paddingY: "xl", paddingX: "xl" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                },
                children: [
                  {
                    id: "h19-c2-content",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h19-c2-tag",
                        type: "text",
                        text: "CLOUD INFRASTRUCTURE · SCALE BENCHMARK",
                        style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "accent" } },
                      },
                      {
                        id: "h19-c2-title",
                        type: "text",
                        text: "Pulse Telemetry: 10M Events / Second",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "h19-c2-desc",
                        type: "text",
                        text: "Eliminated fragmented UI pipelines across 300 engineering pods with deterministic component schemas and instant visual review cycles.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "h19-c2-div",
                        type: "divider",
                        style: { border: { width: "hairline", color: "border" } },
                      },
                      {
                        id: "h19-c2-metrics",
                        type: "flex",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: false,
                        gap: "xl",
                        children: [
                          {
                            id: "h19-c2-m1",
                            type: "text",
                            text: "99.999% SLA Uptime",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "h19-c2-m2",
                            type: "text",
                            text: "10x Release Velocity",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "h19-c2-btn",
                    type: "button",
                    label: "Read Pulse Telemetry Case Study →",
                    href: "#pulse-study",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "semibold" },
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
 * HERO-20: High-Intent Action Launcher · Conversion Dock
 * High-intent centered conversion hero centered around an integrated input dock pill
 * (email placeholder text + active "Get Started Free" button) flanked by assurance perks.
 */
export const HERO_CONVERSION_DOCK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-conversion-dock",
  name: "High-Intent Action Launcher · Conversion Dock",
  kind: "section",
  root: {
    id: "h20-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h20-shell",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          // Header Pitch Stack
          {
            id: "h20-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            children: [
              {
                id: "h20-kicker",
                type: "text",
                text: "INSTANT ACCESS · ZERO CONFIGURATION",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide", align: "center" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h20-title",
                type: "heading",
                level: 1,
                text: "Ship production interfaces in sixty seconds.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "h20-subtitle",
                type: "text",
                text: "Connect your existing repository, compose high-fidelity layouts visually, and deploy directly to edge nodes without manual build boilerplate.",
                style: {
                  typography: { size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // Integrated Input Dock Pill
          {
            id: "h20-conversion-dock",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "xs",
            style: {
              spacing: { paddingY: "xs", paddingX: "xs" },
              color: { background: "surface-muted", text: "text" },
              border: { width: "thin", color: "primary", radius: "full", shadow: "lg" },
              sizing: { width: "full", maxWidth: "2xl" },
            },
            children: [
              {
                id: "h20-input-placeholder",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingX: "md" },
                },
                children: [
                  {
                    id: "h20-input-text",
                    type: "text",
                    text: "✉ Enter your work email (e.g. alex@company.com)...",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "h20-submit-btn",
                type: "button",
                label: "Claim Free Account →",
                href: "#register",
                style: {
                  color: { background: "primary", text: "surface" },
                  border: { radius: "full" },
                  spacing: { paddingY: "sm", paddingX: "lg" },
                  typography: { weight: "semibold" },
                },
              },
            ],
          },

          // Assurance Perks Row
          {
            id: "h20-perks-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "lg",
            children: [
              {
                id: "h20-perk-1",
                type: "text",
                text: "✓ No credit card required",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "h20-perk-2",
                type: "text",
                text: "✓ 14-day Pro trial included",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "h20-perk-3",
                type: "text",
                text: "✓ 1-click GitHub repository import",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Social Verification Strip
          {
            id: "h20-social-strip",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "xs",
            style: {
              spacing: { paddingY: "xs", paddingX: "md" },
              color: { background: "surface-muted", text: "text" },
              border: { width: "thin", color: "border", radius: "full" },
            },
            children: [
              {
                id: "h20-social-text",
                type: "text",
                text: "Joined by over 40,000+ developers shipping production software globally.",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_HERO_BATCH_4: ComponentDocument[] = [
  HERO_CATALOG_REPEATER_DOCUMENT,
  HERO_LAYERED_DEPTH_DOCUMENT,
  HERO_PORTAL_HUB_DOCUMENT,
  HERO_TRUST_MARQUEE_DOCUMENT,
  HERO_CONVERSION_DOCK_DOCUMENT,
];
