import type { ComponentDocument } from "../../model";
import type { HeroFingerprint } from "./fingerprints";

export const BATCH_2_FINGERPRINTS: Record<string, HeroFingerprint> = {
  "hero-stat-triad": {
    id: "hero-stat-triad",
    name: "Quantitative Stat Triad",
    layoutFamily: "stat-led",
    alignment: "top-metric-bottom-anchor",
    gridPattern: "triad-metric-over-full-width",
    mediaPlacement: "none",
    contentHierarchy: "kpi-figures-lead-summary",
    dominantElement: "metric-kpi-counter",
    ctaPattern: "bottom-anchored-wide-bar",
    interactionModel: "static-read",
    density: "metric-heavy-compact",
  },
  "hero-process-rail": {
    id: "hero-process-rail",
    name: "Sequential Process Rail",
    layoutFamily: "process-timeline-led",
    alignment: "left-anchor-right-stepper",
    gridPattern: "4-8-stepped-rail",
    mediaPlacement: "none",
    contentHierarchy: "goal-intro-stepped-milestones",
    dominantElement: "stacked-process-rail",
    ctaPattern: "step-completion-trigger",
    interactionModel: "static-read",
    density: "balanced-standard",
  },
  "hero-comparison-matrix": {
    id: "hero-comparison-matrix",
    name: "Side-by-Side Contrast Matrix",
    layoutFamily: "comparison-led",
    alignment: "bifurcated-dual-column",
    gridPattern: "6-6-contrast-split",
    mediaPlacement: "none",
    contentHierarchy: "thesis-versus-antithesis",
    dominantElement: "comparison-matrix-cards",
    ctaPattern: "card-anchored-upgrade-button",
    interactionModel: "static-read",
    density: "balanced-standard",
  },
  "hero-accordion-insight": {
    id: "hero-accordion-insight",
    name: "Collapsible FAQ & Insight Rail",
    layoutFamily: "layered-cards",
    alignment: "pitch-left-accordion-right",
    gridPattern: "6-6-interactive-split",
    mediaPlacement: "none",
    contentHierarchy: "pitch-accordion-hesitations",
    dominantElement: "interactive-accordion-faq",
    ctaPattern: "inline-button-group",
    interactionModel: "accordion-disclosure-toggle",
    density: "balanced-standard",
  },
  "hero-brutalist-index": {
    id: "hero-brutalist-index",
    name: "Radical Typographic Index",
    layoutFamily: "minimal-typographic",
    alignment: "left-flush-stark",
    gridPattern: "single-col-full-bleed-rules",
    mediaPlacement: "none",
    contentHierarchy: "statement-then-directory-index",
    dominantElement: "monumental-typography",
    ctaPattern: "multi-link-index-row",
    interactionModel: "static-read",
    density: "ultra-sparse-minimal",
  },
};

/**
 * HERO-06: Quantitative Stat Triad
 * 3 prominent metric KPI cards dominate the top tier, resting on a full-width bottom
 * narrative banner with summary explanation and dual action bar.
 */
export const HERO_STAT_TRIAD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-stat-triad",
  name: "Quantitative Stat Triad · Metric Dashboard",
  kind: "section",
  root: {
    id: "h06-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h06-shell",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Top Triad Grid (3 x span 4)
          {
            id: "h06-triad-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
            children: [
              {
                id: "h06-card-volume",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "h06-volume-label",
                    type: "text",
                    text: "TRANSACTION VOLUME",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h06-volume-stat",
                    type: "heading",
                    level: 2,
                    text: "$4.8B+",
                    style: { typography: { size: "6xl", weight: "bold", tracking: "tight" }, color: { text: "accent" } },
                  },
                  {
                    id: "h06-volume-desc",
                    type: "text",
                    text: "Processed on-chain across 14,000 smart contract executions daily.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h06-card-velocity",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "h06-velocity-label",
                    type: "text",
                    text: "SETTLEMENT VELOCITY",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h06-velocity-stat",
                    type: "heading",
                    level: 2,
                    text: "380ms",
                    style: { typography: { size: "6xl", weight: "bold", tracking: "tight" }, color: { text: "primary" } },
                  },
                  {
                    id: "h06-velocity-desc",
                    type: "text",
                    text: "Deterministic cross-chain consensus with mathematical finality.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "h06-card-uptime",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "h06-uptime-label",
                    type: "text",
                    text: "UPTIME SLA",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h06-uptime-stat",
                    type: "heading",
                    level: 2,
                    text: "99.999%",
                    style: { typography: { size: "6xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
                  },
                  {
                    id: "h06-uptime-desc",
                    type: "text",
                    text: "Zero unscheduled outages recorded across 3 consecutive fiscal years.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },
          // Bottom Spanning Narrative Box
          {
            id: "h06-bottom-banner",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            style: {
              color: { background: "surface-sunken", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "h06-banner-heading",
                type: "heading",
                level: 1,
                text: "Verified protocol performance. Zero marketing fluff.",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "h06-banner-copy",
                type: "text",
                text: "When critical infrastructure processes billions in global settlement, reliability is not a marketing talking point—it is the baseline contract. Audit our real-time telemetry pipelines and historical SLA archives.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "h06-banner-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "h06-btn-telemetry",
                    type: "button",
                    label: "Inspect Live Ledger Telemetry",
                    href: "/ledger",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                  {
                    id: "h06-btn-audit",
                    type: "button",
                    label: "Download SOC2 Type II Audit",
                    href: "/audit",
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
        ],
      },
    ],
  },
};

/**
 * HERO-07: Sequential Process Rail
 * 4:8 split pairing an anchor project brief with a progressive 3-step timeline rail.
 */
export const HERO_PROCESS_RAIL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-process-rail",
  name: "Sequential Process Rail · Chronological Stepper",
  kind: "section",
  root: {
    id: "h07-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h07-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Left Column (span 4): Anchor Pitch & CTA
          {
            id: "h07-left-pitch",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
            children: [
              {
                id: "h07-eyebrow",
                type: "text",
                text: "ACCELERATION ROADMAP",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "primary" } },
              },
              {
                id: "h07-heading",
                type: "heading",
                level: 1,
                text: "From raw schema to edge production in three phases.",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "h07-copy",
                type: "text",
                text: "Our deterministic architecture eliminates migration guesswork with verified staged milestones and sub-second feedback loops.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "h07-btn-kickoff",
                type: "button",
                label: "Initiate Phase 1 Deployment →",
                href: "/deploy",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
            ],
          },
          // Right Column (span 8): 3-Step Timeline Rail Grid
          {
            id: "h07-right-rail",
            type: "grid",
            columns: 12,
            layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
            style: { spacing: { gap: "md" }, sizing: { width: "full" } },
            children: [
              // Phase 1 Card
              {
                id: "h07-step-1",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "h07-p1-tag",
                    type: "text",
                    text: "PHASE 01 // INGESTION",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "h07-p1-title",
                    type: "heading",
                    level: 3,
                    text: "Schema Introspection",
                    style: { typography: { size: "xl", weight: "semibold" } },
                  },
                  {
                    id: "h07-p1-desc",
                    type: "text",
                    text: "Extract existing Mongo, Postgres, or GraphQL topologies in 12ms with strict type contracts.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h07-p1-status",
                    type: "text",
                    text: "STATUS: AUTOMATED",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "accent" } },
                  },
                ],
              },
              // Phase 2 Card
              {
                id: "h07-step-2",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "h07-p2-tag",
                    type: "text",
                    text: "PHASE 02 // COMPOSE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "h07-p2-title",
                    type: "heading",
                    level: 3,
                    text: "Visual Composition",
                    style: { typography: { size: "xl", weight: "semibold" } },
                  },
                  {
                    id: "h07-p2-desc",
                    type: "text",
                    text: "Assemble interactive user interfaces and bind reactive state with hot canvas updates.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h07-p2-status",
                    type: "text",
                    text: "STATUS: COLLABORATIVE",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "accent" } },
                  },
                ],
              },
              // Phase 3 Card
              {
                id: "h07-step-3",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "h07-p3-tag",
                    type: "text",
                    text: "PHASE 03 // SHIP",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "h07-p3-title",
                    type: "heading",
                    level: 3,
                    text: "Edge Compilation",
                    style: { typography: { size: "xl", weight: "semibold" } },
                  },
                  {
                    id: "h07-p3-desc",
                    type: "text",
                    text: "Distribute static binaries and serverless routes to 280 edge points with zero warm-up lag.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h07-p3-status",
                    type: "text",
                    text: "STATUS: SUB-SECOND",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "accent" } },
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
 * HERO-08: Side-by-Side Comparison Matrix
 * 6:6 juxtaposed comparison ("The Fragile Legacy" vs "The Autonomous Architecture")
 * beneath a central thesis statement.
 */
export const HERO_COMPARISON_MATRIX_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-comparison-matrix",
  name: "Side-by-Side Contrast Matrix · Before & After",
  kind: "section",
  root: {
    id: "h08-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h08-shell",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Header Stack
          {
            id: "h08-header-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "sm",
            style: { typography: { align: "center" }, sizing: { maxWidth: "3xl", align: "center" } },
            children: [
              {
                id: "h08-eyebrow",
                type: "text",
                text: "ARCHITECTURAL PARADIGM SHIFT",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "primary" } },
              },
              {
                id: "h08-heading",
                type: "heading",
                level: 1,
                text: "Stop maintaining glue code. Start composing systems.",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "h08-copy",
                type: "text",
                text: "Compare conventional manual stack assembly against declarative autonomous execution.",
                style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
              },
            ],
          },
          // 6:6 Contrast Grid
          {
            id: "h08-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
            children: [
              // Left Card: Legacy
              {
                id: "h08-card-legacy",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface-sunken", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "h08-legacy-badge",
                    type: "text",
                    text: "⚠ THE CONVENTIONAL STACK",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "warning" } },
                  },
                  {
                    id: "h08-legacy-heading",
                    type: "heading",
                    level: 2,
                    text: "Manual, Brittle, Fragmented",
                    style: { typography: { size: "2xl", weight: "semibold" } },
                  },
                  {
                    id: "h08-legacy-b1",
                    type: "text",
                    text: "✕ 40+ disparate tools with conflicting configuration schemas",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h08-legacy-b2",
                    type: "text",
                    text: "✕ Multi-week migration downtime and fragile ORM migrations",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h08-legacy-b3",
                    type: "text",
                    text: "✕ Disconnected design files that drift from production code",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "h08-legacy-b4",
                    type: "text",
                    text: "✕ 120ms average cold-start latency on traditional serverless",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              // Right Card: Ozmishow Autonomous
              {
                id: "h08-card-autonomous",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "primary" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "h08-auto-badge",
                    type: "text",
                    text: "✦ THE AUTONOMOUS FOUNDATION",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "h08-auto-heading",
                    type: "heading",
                    level: 2,
                    text: "Unified, Resilient, Deterministic",
                    style: { typography: { size: "2xl", weight: "bold" } },
                  },
                  {
                    id: "h08-auto-b1",
                    type: "text",
                    text: "✓ Single declarative engine for UI, schema, and pipelines",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "h08-auto-b2",
                    type: "text",
                    text: "✓ Zero-downtime reactive AutoTable schema bindings",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "h08-auto-b3",
                    type: "text",
                    text: "✓ 100% production code parity directly on the canvas",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "h08-auto-b4",
                    type: "text",
                    text: "✓ Sub-2ms global edge render across 280 points of presence",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "h08-btn-upgrade",
                    type: "button",
                    label: "Upgrade to Autonomous Architecture →",
                    href: "/upgrade",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "semibold" },
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
 * HERO-09: Collapsible FAQ & Insight Rail
 * 6:6 split pairing an executive urgency pitch on the left with an interactive 3-question
 * accordion resolving buyer hesitations on the right.
 */
export const HERO_ACCORDION_INSIGHT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-accordion-insight",
  name: "Collapsible FAQ & Insight Rail · Executive Pitch",
  kind: "section",
  root: {
    id: "h09-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h09-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Left Column (span 6): Executive Pitch
          {
            id: "h09-left-col",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "h09-badge",
                type: "text",
                text: "ENTERPRISE ADOPTION BRIEF",
                style: {
                  spacing: { paddingY: "xs", paddingX: "md" },
                  border: { radius: "full", width: "hairline", color: "border" },
                  color: { background: "surface-muted", text: "primary" },
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  sizing: { width: "fit" },
                },
              },
              {
                id: "h09-heading",
                type: "heading",
                level: 1,
                text: "Everything your executive team needs to know.",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "h09-copy",
                type: "text",
                text: "Evaluating next-generation visual orchestration raises natural questions around security compliance, vendor lock-in, and backward compatibility. We address each directly.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "h09-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "h09-btn-schedule",
                    type: "button",
                    label: "Schedule Architecture Review",
                    href: "/review",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "sm", weight: "semibold" },
                    },
                  },
                  {
                    id: "h09-btn-security",
                    type: "button",
                    label: "Security Whitepaper",
                    href: "/security",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "hairline", color: "border" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
            ],
          },
          // Right Column (span 6): Interactive Accordion Disclosures
          {
            id: "h09-right-accordion",
            type: "accordion",
            openMode: "single",
            collapsible: true,
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            style: { spacing: { gap: "md" }, sizing: { width: "full" } },
            children: [
              // Q1 (Default Open)
              {
                id: "h09-disc-lockin",
                type: "disclosure",
                defaultOpen: true,
                transition: "height-fade",
                style: {
                  border: { radius: "lg", width: "hairline", color: "border" },
                  color: { background: "surface-muted", text: "text" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "h09-lockin-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "h09-lockin-q",
                        type: "heading",
                        level: 3,
                        text: "How does Ozmishow prevent vendor lock-in?",
                        style: { typography: { size: "base", weight: "semibold" } },
                      },
                    ],
                  },
                  {
                    id: "h09-lockin-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "h09-lockin-a",
                        type: "text",
                        text: "Every visual document compiles to standard, clean TypeScript code and AST definitions. You can export complete standalone Next.js codebases at any point with zero proprietary runtime lock-in.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
              // Q2
              {
                id: "h09-disc-compliance",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                style: {
                  border: { radius: "lg", width: "hairline", color: "border" },
                  color: { background: "surface-muted", text: "text" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "h09-compliance-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "h09-compliance-q",
                        type: "heading",
                        level: 3,
                        text: "What security compliance standards are certified?",
                        style: { typography: { size: "base", weight: "semibold" } },
                      },
                    ],
                  },
                  {
                    id: "h09-compliance-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "h09-compliance-a",
                        type: "text",
                        text: "Ozmishow maintains annual SOC2 Type II, ISO 27001, and HIPAA compliance certifications. We support air-gapped on-premise VPC deployments for heavily regulated banking and healthcare partners.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
              // Q3
              {
                id: "h09-disc-legacy",
                type: "disclosure",
                defaultOpen: false,
                transition: "height-fade",
                style: {
                  border: { radius: "lg", width: "hairline", color: "border" },
                  color: { background: "surface-muted", text: "text" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "h09-legacy-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "h09-legacy-q",
                        type: "heading",
                        level: 3,
                        text: "Can we integrate existing legacy SQL/NoSQL databases?",
                        style: { typography: { size: "base", weight: "semibold" } },
                      },
                    ],
                  },
                  {
                    id: "h09-legacy-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "h09-legacy-a",
                        type: "text",
                        text: "Yes. AutoTable connects directly to existing PostgreSQL, MongoDB, MySQL, and DynamoDB instances without modifying existing table schemas or breaking existing foreign keys.",
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
    ],
  },
};

/**
 * HERO-10: Radical Typographic Index
 * Ultra-sparse, brutalist-inspired single-plane typographic manifest with hairline dividers
 * and an integrated horizontal directory index.
 */
export const HERO_BRUTALIST_INDEX_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-brutalist-index",
  name: "Radical Typographic Index · Studio Manifesto",
  kind: "section",
  root: {
    id: "h10-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h10-shell",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          // Index Ticker Header
          {
            id: "h10-ticker-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "h10-ticker-title",
                type: "text",
                text: "STUDIO ARCHIVE // VOL. IV",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "primary" } },
              },
              {
                id: "h10-ticker-meta",
                type: "text",
                text: "GLOBAL DIRECTORY · AUTONOMOUS SYSTEMS 2026",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          // Hairline Divider 1
          {
            id: "h10-rule-top",
            type: "divider",
            style: { sizing: { width: "full" }, color: { text: "border" } },
          },
          // Massive Display Typography
          {
            id: "h10-heading",
            type: "heading",
            level: 1,
            text: "We compose digital instruments of uncompromised clarity.",
            style: {
              typography: { family: "serif", size: "6xl", weight: "normal", leading: "tight" },
              color: { text: "text" },
            },
          },
          // Hairline Divider 2
          {
            id: "h10-rule-bottom",
            type: "divider",
            style: { sizing: { width: "full" }, color: { text: "border" } },
          },
          // 4-Item Directory Index Link Bar
          {
            id: "h10-directory-bar",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "h10-link-1",
                type: "button",
                label: "01 / Selected Monograph →",
                href: "/monograph",
                style: {
                  spacing: { paddingY: "xs", paddingX: "none" },
                  color: { background: "transparent", text: "text" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
              {
                id: "h10-link-2",
                type: "button",
                label: "02 / Visual Engineering →",
                href: "/engineering",
                style: {
                  spacing: { paddingY: "xs", paddingX: "none" },
                  color: { background: "transparent", text: "text" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
              {
                id: "h10-link-3",
                type: "button",
                label: "03 / Spatial Interfaces →",
                href: "/interfaces",
                style: {
                  spacing: { paddingY: "xs", paddingX: "none" },
                  color: { background: "transparent", text: "text" },
                  typography: { size: "sm", weight: "semibold" },
                },
              },
              {
                id: "h10-link-4",
                type: "button",
                label: "04 / Inquire Partnership →",
                href: "/contact",
                style: {
                  spacing: { paddingY: "xs", paddingX: "none" },
                  color: { background: "transparent", text: "primary" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_HERO_BATCH_2: ComponentDocument[] = [
  HERO_STAT_TRIAD_DOCUMENT,
  HERO_PROCESS_RAIL_DOCUMENT,
  HERO_COMPARISON_MATRIX_DOCUMENT,
  HERO_ACCORDION_INSIGHT_DOCUMENT,
  HERO_BRUTALIST_INDEX_DOCUMENT,
];
