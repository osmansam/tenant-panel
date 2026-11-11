import type { ComponentDocument } from "../../model";
import type { HeroFingerprint } from "./fingerprints";

export const BATCH_3_FINGERPRINTS: Record<string, HeroFingerprint> = {
  "hero-fullbleed-dock": {
    id: "hero-fullbleed-dock",
    name: "Full-Bleed Media Canvas · Floating Dock",
    layoutFamily: "full-bleed-media",
    alignment: "offset-dock-bottom-left",
    gridPattern: "canvas-backdrop-dock-overlay",
    mediaPlacement: "full-bleed-backdrop",
    contentHierarchy: "ambient-canvas-floating-dock",
    dominantElement: "full-bleed-visual-dock",
    ctaPattern: "floating-dock-action-cluster",
    interactionModel: "static-read",
    density: "cinematic-sparse",
  },
  "hero-mosaic-triptych": {
    id: "hero-mosaic-triptych",
    name: "Media Mosaic Triptych · Split Editorial",
    layoutFamily: "split-text-collage",
    alignment: "left-pitch-right-mosaic",
    gridPattern: "5-7-mosaic-split",
    mediaPlacement: "right-spanning-mosaic",
    contentHierarchy: "narrative-leading-mosaic",
    dominantElement: "geometric-image-mosaic",
    ctaPattern: "dual-action-cluster",
    interactionModel: "static-read",
    density: "balanced-standard",
  },
  "hero-quote-spotlight": {
    id: "hero-quote-spotlight",
    name: "Monumental Testimonial · Social Proof Spotlight",
    layoutFamily: "testimonial-led",
    alignment: "center-monograph-quote",
    gridPattern: "single-col-centered-wide",
    mediaPlacement: "avatar-social-proof",
    contentHierarchy: "quote-attribution-action",
    dominantElement: "testimonial-monument",
    ctaPattern: "centered-action-pair",
    interactionModel: "static-read",
    density: "airy-editorial",
  },
  "hero-pricing-trio": {
    id: "hero-pricing-trio",
    name: "Three-Tier Conversion · Pricing Launchpad",
    layoutFamily: "pricing-led",
    alignment: "header-over-3card-shelf",
    gridPattern: "3-tier-symmetrical-grid",
    mediaPlacement: "none",
    contentHierarchy: "tier-comparison-cta-anchored",
    dominantElement: "pricing-tier-cards",
    ctaPattern: "per-tier-conversion-button",
    interactionModel: "static-read",
    density: "dense-pricing-shelf",
  },
  "hero-cinematic-stage": {
    id: "hero-cinematic-stage",
    name: "Video Master Stage · Chapter Playback Rail",
    layoutFamily: "video-led",
    alignment: "center-stage-bottom-chapters",
    gridPattern: "stage-over-3col-chapters",
    mediaPlacement: "dominant-central-video",
    contentHierarchy: "header-stage-chapter-shelf",
    dominantElement: "cinematic-video-stage",
    ctaPattern: "video-play-trigger-with-shelf",
    interactionModel: "media-playback-trigger",
    density: "balanced-standard",
  },
};

/**
 * HERO-11: Full-Bleed Media Canvas · Floating Dock
 * Opening-screen architectural canvas framed by ambient telemetry with an offset
 * glass dock card anchored in the bottom-left corner.
 */
export const HERO_FULLBLEED_DOCK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-fullbleed-dock",
  name: "Full-Bleed Media Canvas · Floating Dock",
  kind: "section",
  root: {
    id: "h11-section",
    type: "section",
    style: {
      spacing: { paddingY: "xl", paddingX: "lg" },
      color: { background: "surface-sunken", text: "text" },
    },
    children: [
      {
        id: "h11-canvas-shell",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "between",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
        },
        children: [
          // Top Ambient Telemetry Bar
          {
            id: "h11-ambient-bar",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "h11-status-pill",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingY: "xs", paddingX: "sm" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "full" },
                },
                children: [
                  {
                    id: "h11-status-dot",
                    type: "text",
                    text: "● LIVE TELEMETRY",
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "accent" },
                    },
                  },
                  {
                    id: "h11-status-metric",
                    type: "text",
                    text: "99.999% SLA across 42 global regions",
                    style: {
                      typography: { size: "sm", weight: "normal" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "h11-release-tag",
                type: "text",
                text: "HYBRID ENGINE V4.2",
                style: {
                  typography: { size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // Center Media Backdrop
          {
            id: "h11-media-backdrop",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "center",
            wrap: false,
            gap: "none",
            style: {
              sizing: { width: "full" },
              border: { radius: "xl", width: "thin", color: "border", shadow: "lg" },
            },
            children: [
              {
                id: "h11-backdrop-image",
                type: "image",
                src: "/visual-builder/architecture-study.svg",
                alt: "Global Autonomous Cluster Visual Map",
                aspectRatio: "wide",
                objectFit: "cover",
                style: {
                  sizing: { width: "full", height: "15rem" },
                },
              },
            ],
          },

          // Bottom Offset Floating Dock Container
          {
            id: "h11-dock-container",
            type: "flex",
            direction: "row",
            alignment: "end",
            distribution: "start",
            wrap: false,
            gap: "none",
            style: {
              sizing: { width: "full" },
            },
            children: [
              {
                id: "h11-floating-dock-card",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "md",
                style: {
                  spacing: { paddingY: "lg", paddingX: "xl" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "xl", shadow: "xl" },
                  sizing: { width: "full", maxWidth: "2xl" },
                },
                children: [
                  {
                    id: "h11-dock-kicker",
                    type: "text",
                    text: "AUTONOMOUS COMPUTE INFRASTRUCTURE",
                    style: {
                      typography: { size: "sm", weight: "semibold", tracking: "wide" },
                      color: { text: "accent" },
                    },
                  },
                  {
                    id: "h11-dock-title",
                    type: "heading",
                    level: 1,
                    text: "Deploy stateless workloads without regional friction.",
                    style: {
                      typography: { size: "4xl", weight: "bold", leading: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h11-dock-desc",
                    type: "text",
                    text: "Automated traffic steering, instant cold-start elimination, and deterministic edge consensus out of the box.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "h11-dock-actions",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "sm",
                    children: [
                      {
                        id: "h11-cta-primary",
                        type: "button",
                        label: "Launch Cluster Node",
                        href: "#deploy",
                        style: {
                          color: { background: "primary", text: "surface" },
                          border: { radius: "md" },
                          spacing: { paddingY: "sm", paddingX: "lg" },
                          typography: { weight: "semibold" },
                        },
                      },
                      {
                        id: "h11-cta-secondary",
                        type: "button",
                        label: "Inspect Live Graph",
                        href: "#telemetry",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { width: "thin", color: "border", radius: "md" },
                          spacing: { paddingY: "sm", paddingX: "lg" },
                          typography: { weight: "medium" },
                        },
                      },
                    ],
                  },
                  {
                    id: "h11-dock-specs",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "md",
                    children: [
                      {
                        id: "h11-spec-1",
                        type: "text",
                        text: "✓ Sub-millisecond latency",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h11-spec-2",
                        type: "text",
                        text: "✓ SOC2 Type II Certified",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
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
 * HERO-12: Media Mosaic Triptych · Split Editorial
 * Asymmetric 5:7 split pairing a compelling narrative column on the left with a
 * 3-tile geometric image mosaic on the right utilizing Ozmishow's native mediaLayout.
 */
export const HERO_MOSAIC_TRIPTYCH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-mosaic-triptych",
  name: "Media Mosaic Triptych · Split Editorial",
  kind: "section",
  root: {
    id: "h12-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h12-main-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "6xl", align: "center" },
          spacing: { gap: "xl" },
        },
        children: [
          // Left Column Narrative Stack (Span 5 on Desktop)
          {
            id: "h12-narrative-col",
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
                id: "h12-kicker",
                type: "text",
                text: "DESIGN RETROSPECTIVE · 2026 ARCHIVE",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h12-title",
                type: "heading",
                level: 1,
                text: "Tangible form shaped by computational rigor.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight", family: "serif" },
                  color: { text: "text" },
                },
              },
              {
                id: "h12-desc",
                type: "text",
                text: "Exploring the boundary between material craftsmanship and generative spatial systems across thirty international installations.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "h12-divider",
                type: "divider",
                style: {
                  border: { width: "hairline", color: "border" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "h12-meta-row",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "xl",
                children: [
                  {
                    id: "h12-stat-stack-1",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "h12-stat-num-1",
                        type: "text",
                        text: "34+",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "h12-stat-lbl-1",
                        type: "text",
                        text: "Exhibitions",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },
                  {
                    id: "h12-stat-stack-2",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "h12-stat-num-2",
                        type: "text",
                        text: "128k",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "h12-stat-lbl-2",
                        type: "text",
                        text: "Catalogued Works",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "h12-action-cluster",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                style: {
                  spacing: { paddingY: "sm" },
                },
                children: [
                  {
                    id: "h12-btn-primary",
                    type: "button",
                    label: "Explore the Exhibition",
                    href: "#collection",
                    style: {
                      color: { background: "primary", text: "surface" },
                      border: { radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "semibold" },
                    },
                  },
                  {
                    id: "h12-btn-secondary",
                    type: "button",
                    label: "Curatorial Monograph",
                    href: "#monograph",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "medium" },
                    },
                  },
                ],
              },
            ],
          },

          // Right Column 3-Tile Geometric Mosaic Grid (Span 7 on Desktop)
          {
            id: "h12-mosaic-grid",
            type: "grid",
            columns: 12,
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 7 },
            },
            mediaLayout: {
              mode: "slots",
              preset: "featured-left",
              aspectRatio: "landscape",
              overflow: "hidden",
              breakpoints: {
                mobile: {
                  columns: 1,
                  rows: 3,
                  slots: [
                    { id: "h12-img-1", columnStart: 1, rowStart: 1, columnSpan: 1, rowSpan: 1 },
                    { id: "h12-img-2", columnStart: 1, rowStart: 2, columnSpan: 1, rowSpan: 1 },
                    { id: "h12-img-3", columnStart: 1, rowStart: 3, columnSpan: 1, rowSpan: 1 },
                  ],
                },
                desktop: {
                  columns: 2,
                  rows: 2,
                  slots: [
                    { id: "h12-img-1", columnStart: 1, rowStart: 1, columnSpan: 1, rowSpan: 2 },
                    { id: "h12-img-2", columnStart: 2, rowStart: 1, columnSpan: 1, rowSpan: 1 },
                    { id: "h12-img-3", columnStart: 2, rowStart: 2, columnSpan: 1, rowSpan: 1 },
                  ],
                },
              },
            },
            style: {
              border: { radius: "xl", shadow: "md" },
            },
            children: [
              {
                id: "h12-img-1",
                type: "image",
                src: "/visual-builder/product-study.svg",
                alt: "Featured Sculptural Monolith",
                objectFit: "cover",
              },
              {
                id: "h12-img-2",
                type: "image",
                src: "/visual-builder/brand-study.svg",
                alt: "Material Swatch Study",
                objectFit: "cover",
              },
              {
                id: "h12-img-3",
                type: "image",
                src: "/visual-builder/hero-product.svg",
                alt: "Spatial Kinetic Geometry",
                objectFit: "cover",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * HERO-13: Monumental Testimonial · Social Proof Spotlight
 * Inverted hierarchy leading with a monumental customer endorsement (4xl italic serif)
 * inside a centered 10-column stage, followed by an executive avatar card, trust badges,
 * and conversion actions.
 */
export const HERO_QUOTE_SPOTLIGHT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-quote-spotlight",
  name: "Monumental Testimonial · Social Proof Spotlight",
  kind: "section",
  root: {
    id: "h13-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface-muted", text: "text" },
    },
    children: [
      {
        id: "h13-shell",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "5xl", align: "center" },
        },
        children: [
          // Social Proof Kicker Pill
          {
            id: "h13-trust-pill",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "xs",
            style: {
              spacing: { paddingY: "xs", paddingX: "md" },
              color: { background: "surface", text: "text" },
              border: { width: "thin", color: "border", radius: "full", shadow: "sm" },
            },
            children: [
              {
                id: "h13-stars",
                type: "text",
                text: "★★★★★",
                style: {
                  typography: { size: "sm" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h13-kicker",
                type: "text",
                text: "INDEPENDENT AUDIT · APEX GLOBAL FINANCIAL",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Monumental Quote Statement
          {
            id: "h13-quote-heading",
            type: "heading",
            level: 1,
            text: "“Ozmishow cut our core release verification from twelve days down to forty minutes. We will never go back.”",
            style: {
              typography: {
                size: "4xl",
                weight: "medium",
                leading: "tight",
                family: "playfair-display",
                align: "center",
              },
              color: { text: "text" },
            },
          },

          // Attribution Flex Card
          {
            id: "h13-attribution-card",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "md",
            style: {
              spacing: { paddingY: "sm", paddingX: "lg" },
              color: { background: "surface", text: "text" },
              border: { width: "thin", color: "border", radius: "full", shadow: "sm" },
            },
            children: [
              {
                id: "h13-avatar-wrapper",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "none",
                style: {
                  custom: { width: "48px", height: "48px" },
                  border: { radius: "full" },
                },
                children: [
                  {
                    id: "h13-avatar",
                    type: "image",
                    src: "/visual-builder/placeholder.svg",
                    alt: "Elena Rostova CTO",
                    aspectRatio: "square",
                    objectFit: "cover",
                    style: {
                      custom: { width: "48px", height: "48px", borderRadius: "9999px" },
                      border: { radius: "full" },
                    },
                  },
                ],
              },
              {
                id: "h13-author-details",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "none",
                children: [
                  {
                    id: "h13-author-name",
                    type: "text",
                    text: "Elena Rostova",
                    style: {
                      typography: { size: "base", weight: "semibold" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h13-author-title",
                    type: "text",
                    text: "Chief Information Officer, Apex Global Asset Management",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
            ],
          },

          // Hairline Divider
          {
            id: "h13-divider",
            type: "divider",
            style: {
              border: { width: "hairline", color: "border" },
              sizing: { width: "full", maxWidth: "4xl" },
            },
          },

          // 3-Column Proof Metrics Grid
          {
            id: "h13-proof-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full", maxWidth: "4xl", align: "center" },
              spacing: { gap: "md" },
            },
            children: [
              {
                id: "h13-metric-card-1",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "xs",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "md", paddingX: "md" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h13-metric-val-1",
                    type: "text",
                    text: "99.8%",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "h13-metric-lbl-1",
                    type: "text",
                    text: "Reduction in release regression tickets",
                    style: {
                      typography: { size: "sm", align: "center" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "h13-metric-card-2",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "xs",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "md", paddingX: "md" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h13-metric-val-2",
                    type: "text",
                    text: "40 min",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "h13-metric-lbl-2",
                    type: "text",
                    text: "Production release turnaround",
                    style: {
                      typography: { size: "sm", align: "center" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "h13-metric-card-3",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "center",
                wrap: false,
                gap: "xs",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "md", paddingX: "md" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h13-metric-val-3",
                    type: "text",
                    text: "$2.4M",
                    style: {
                      typography: { size: "2xl", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "h13-metric-lbl-3",
                    type: "text",
                    text: "Documented annual operational ROI",
                    style: {
                      typography: { size: "sm", align: "center" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
            ],
          },

          // Centered Action Buttons
          {
            id: "h13-action-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "h13-btn-case-study",
                type: "button",
                label: "Download Full Case Study (PDF)",
                href: "#case-study",
                style: {
                  color: { background: "primary", text: "surface" },
                  border: { radius: "md" },
                  spacing: { paddingY: "sm", paddingX: "lg" },
                  typography: { weight: "semibold" },
                },
              },
              {
                id: "h13-btn-demo",
                type: "button",
                label: "Schedule Technical Consultation",
                href: "#briefing",
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
    ],
  },
};

/**
 * HERO-14: Three-Tier Conversion · Pricing Launchpad
 * Symmetrical 3-column pricing grid ([4, 4, 4]) acting as the primary conversion hero,
 * with an elevated "Pro" tier card and immediate subscription actions.
 */
export const HERO_PRICING_TRIO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-pricing-trio",
  name: "Three-Tier Conversion · Pricing Launchpad",
  kind: "section",
  root: {
    id: "h14-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface", text: "text" },
    },
    children: [
      {
        id: "h14-shell",
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
            id: "h14-header-stack",
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
                id: "h14-kicker",
                type: "text",
                text: "TRANSPARENT VALUE · UNCOMPLICATED TIERS",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide", align: "center" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h14-title",
                type: "heading",
                level: 1,
                text: "Transparent pricing tailored for scale.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "h14-subtitle",
                type: "text",
                text: "Every plan includes complete API access, unlimited preview environments, and enterprise-grade encryption.",
                style: {
                  typography: { size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "h14-billing-pill",
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
                    id: "h14-billing-text",
                    type: "text",
                    text: "⚡ Annual commitment includes 2 months free + custom domain routing",
                    style: {
                      typography: { size: "sm", weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                ],
              },
            ],
          },

          // 3-Tier Grid
          {
            id: "h14-pricing-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              // Tier 1: Starter Developer
              {
                id: "h14-card-starter",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
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
                    id: "h14-starter-content",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "h14-tier-name-1",
                        type: "text",
                        text: "COMMUNITY DEVELOPER",
                        style: {
                          typography: { size: "sm", weight: "semibold", tracking: "wide" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h14-price-row-1",
                        type: "flex",
                        direction: "row",
                        alignment: "end",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-price-1",
                            type: "text",
                            text: "$0",
                            style: {
                              typography: { size: "4xl", weight: "bold" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "h14-freq-1",
                            type: "text",
                            text: "/ month forever",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "h14-desc-1",
                        type: "text",
                        text: "Everything individual engineers need to prototype and ship production applications.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h14-div-1",
                        type: "divider",
                        style: { border: { width: "hairline", color: "border" } },
                      },
                      {
                        id: "h14-features-1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-feat-1a",
                            type: "text",
                            text: "✓ Up to 3 active projects",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-1b",
                            type: "text",
                            text: "✓ 50,000 monthly API calls",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-1c",
                            type: "text",
                            text: "✓ Community support channels",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-1d",
                            type: "text",
                            text: "✓ Automated SSL certificates",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "h14-cta-starter",
                    type: "button",
                    label: "Start Free Today",
                    href: "#free-signup",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { width: "thin", color: "border", radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "medium" },
                    },
                  },
                ],
              },

              // Tier 2: Elevated Pro Tier
              {
                id: "h14-card-pro",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "md",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "xl", paddingX: "lg" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "primary", radius: "xl", shadow: "xl" },
                },
                children: [
                  {
                    id: "h14-pro-content",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "h14-badge-pro",
                        type: "flex",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-badge-pro-text",
                            type: "text",
                            text: "★ MOST POPULAR CHOICE",
                            style: {
                              typography: { size: "sm", weight: "bold", tracking: "wide" },
                              color: { text: "primary" },
                            },
                          },
                        ],
                      },
                      {
                        id: "h14-tier-name-2",
                        type: "text",
                        text: "GROWTH PRO",
                        style: {
                          typography: { size: "sm", weight: "semibold", tracking: "wide" },
                          color: { text: "primary" },
                        },
                      },
                      {
                        id: "h14-price-row-2",
                        type: "flex",
                        direction: "row",
                        alignment: "end",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-price-2",
                            type: "text",
                            text: "$49",
                            style: {
                              typography: { size: "4xl", weight: "bold" },
                              color: { text: "primary" },
                            },
                          },
                          {
                            id: "h14-freq-2",
                            type: "text",
                            text: "/ seat per month",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "h14-desc-2",
                        type: "text",
                        text: "High-performance compute and team workflows for scaling multi-tenant platforms.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h14-div-2",
                        type: "divider",
                        style: { border: { width: "hairline", color: "border" } },
                      },
                      {
                        id: "h14-features-2",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-feat-2a",
                            type: "text",
                            text: "✓ Unlimited active projects",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-2b",
                            type: "text",
                            text: "✓ 2,500,000 monthly API calls",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-2c",
                            type: "text",
                            text: "✓ 99.99% uptime guarantee",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-2d",
                            type: "text",
                            text: "✓ Priority 2-hour SLA response",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-2e",
                            type: "text",
                            text: "✓ Branch preview environments",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "h14-cta-pro",
                    type: "button",
                    label: "Start 14-Day Free Pro Trial",
                    href: "#pro-trial",
                    style: {
                      color: { background: "primary", text: "surface" },
                      border: { radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "semibold" },
                    },
                  },
                ],
              },

              // Tier 3: Enterprise
              {
                id: "h14-card-enterprise",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
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
                    id: "h14-enterprise-content",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "h14-tier-name-3",
                        type: "text",
                        text: "GLOBAL ENTERPRISE",
                        style: {
                          typography: { size: "sm", weight: "semibold", tracking: "wide" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h14-price-row-3",
                        type: "flex",
                        direction: "row",
                        alignment: "end",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-price-3",
                            type: "text",
                            text: "Custom",
                            style: {
                              typography: { size: "4xl", weight: "bold" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "h14-freq-3",
                            type: "text",
                            text: "billed annually",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "h14-desc-3",
                        type: "text",
                        text: "Dedicated infrastructure, custom security compliance, and dedicated technical architects.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h14-div-3",
                        type: "divider",
                        style: { border: { width: "hairline", color: "border" } },
                      },
                      {
                        id: "h14-features-3",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "h14-feat-3a",
                            type: "text",
                            text: "✓ Dedicated private infrastructure",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-3b",
                            type: "text",
                            text: "✓ Unlimited team members & seats",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-3c",
                            type: "text",
                            text: "✓ Custom 99.999% SLA commitment",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-3d",
                            type: "text",
                            text: "✓ SOC2 Type II, ISO27001, HIPAA",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "h14-feat-3e",
                            type: "text",
                            text: "✓ 24/7 designated engineering pod",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "h14-cta-enterprise",
                    type: "button",
                    label: "Contact Enterprise Sales",
                    href: "#enterprise",
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

          // Trust Reassurance Note
          {
            id: "h14-reassurance",
            type: "text",
            text: "All plans include 30-day money-back guarantee · No credit card required for developer tier",
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
 * HERO-15: Video Master Stage · Chapter Playback Rail
 * Monumental 16:9 cinematic video stage card with play trigger overlay, anchored above
 * a 3-column chapter selection shelf for deep technical product walkthroughs.
 */
export const HERO_CINEMATIC_STAGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-cinematic-stage",
  name: "Video Master Stage · Chapter Playback Rail",
  kind: "section",
  root: {
    id: "h15-section",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "lg" },
      color: { background: "surface-sunken", text: "text" },
    },
    children: [
      {
        id: "h15-shell",
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
          // Header Stack
          {
            id: "h15-header-stack",
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
                id: "h15-kicker",
                type: "text",
                text: "CINEMATIC PRODUCT WALKTHROUGH · 4K",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide", align: "center" },
                  color: { text: "accent" },
                },
              },
              {
                id: "h15-title",
                type: "heading",
                level: 1,
                text: "Experience the next evolution of visual interfaces.",
                style: {
                  typography: { size: "4xl", weight: "bold", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "h15-subtitle",
                type: "text",
                text: "An in-depth video exploration demonstrating how deterministic state synchronization powers enterprise software at global scale.",
                style: {
                  typography: { size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // Video Stage Card
          {
            id: "h15-stage-card",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "none",
            style: {
              sizing: { width: "full", maxWidth: "5xl" },
              color: { background: "surface", text: "text" },
              border: { width: "thin", color: "border", radius: "3xl", shadow: "xl" },
            },
            children: [
              {
                id: "h15-stage-image",
                type: "image",
                src: "/visual-builder/hero-product.svg",
                alt: "Cinematic Video Preview Frame",
                aspectRatio: "wide",
                objectFit: "cover",
                style: {
                  sizing: { width: "full", height: "15rem" },
                },
              },
              {
                id: "h15-stage-ctrl-bar",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border" },
                },
                children: [
                  {
                    id: "h15-play-trigger-btn",
                    type: "button",
                    label: "▶ Play Video Demonstration (04:18)",
                    href: "#play-video",
                    style: {
                      color: { background: "primary", text: "surface" },
                      border: { radius: "md" },
                      spacing: { paddingY: "sm", paddingX: "lg" },
                      typography: { weight: "semibold" },
                    },
                  },
                  {
                    id: "h15-video-specs",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "end",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "h15-spec-res",
                        type: "text",
                        text: "4K UHD 60FPS",
                        style: {
                          typography: { size: "sm", weight: "semibold" },
                          color: { text: "accent" },
                        },
                      },
                      {
                        id: "h15-spec-sep",
                        type: "text",
                        text: "·",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "h15-spec-audio",
                        type: "text",
                        text: "Dolby Atmos Audio",
                        style: {
                          typography: { size: "sm" },
                          color: { text: "text-muted" },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // 3-Column Chapter Rail Grid
          {
            id: "h15-chapters-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full", maxWidth: "5xl" },
              spacing: { gap: "md" },
            },
            children: [
              {
                id: "h15-chapter-card-1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "md", paddingX: "md" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h15-ch1-stamp",
                    type: "text",
                    text: "01 · COMPOSITION [00:00]",
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "h15-ch1-title",
                    type: "text",
                    text: "Deterministic Document Model",
                    style: {
                      typography: { size: "base", weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h15-ch1-desc",
                    type: "text",
                    text: "How immutable trees eliminate rendering race conditions and drift.",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "h15-ch1-link",
                    type: "button",
                    label: "Jump to 00:00 →",
                    href: "#ch1",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { width: "thin", color: "border", radius: "sm" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                      typography: { size: "sm" },
                    },
                  },
                ],
              },
              {
                id: "h15-chapter-card-2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "md", paddingX: "md" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h15-ch2-stamp",
                    type: "text",
                    text: "02 · CONSENSUS [01:45]",
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "h15-ch2-title",
                    type: "text",
                    text: "Multi-Region CRDT Engine",
                    style: {
                      typography: { size: "base", weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h15-ch2-desc",
                    type: "text",
                    text: "Sub-10ms state synchronisation across edge datacenters worldwide.",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "h15-ch2-link",
                    type: "button",
                    label: "Jump to 01:45 →",
                    href: "#ch2",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { width: "thin", color: "border", radius: "sm" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                      typography: { size: "sm" },
                    },
                  },
                ],
              },
              {
                id: "h15-chapter-card-3",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                layout: {
                  span: { mobile: 12, tablet: 4, desktop: 4 },
                },
                style: {
                  spacing: { paddingY: "md", paddingX: "md" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "lg" },
                },
                children: [
                  {
                    id: "h15-ch3-stamp",
                    type: "text",
                    text: "03 · CODEGEN [03:12]",
                    style: {
                      typography: { size: "sm", weight: "semibold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "h15-ch3-title",
                    type: "text",
                    text: "Production React 19 Emission",
                    style: {
                      typography: { size: "base", weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "h15-ch3-desc",
                    type: "text",
                    text: "Instant zero-overhead TypeScript and Tailwind export without manual glue.",
                    style: {
                      typography: { size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "h15-ch3-link",
                    type: "button",
                    label: "Jump to 03:12 →",
                    href: "#ch3",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { width: "thin", color: "border", radius: "sm" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                      typography: { size: "sm" },
                    },
                  },
                ],
              },
            ],
          },

          // Footer Action Strip
          {
            id: "h15-footer-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "h15-btn-whitepaper",
                type: "button",
                label: "Read Architecture Whitepaper (PDF)",
                href: "#whitepaper",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border", radius: "md" },
                  spacing: { paddingY: "sm", paddingX: "lg" },
                  typography: { weight: "medium" },
                },
              },
              {
                id: "h15-btn-sandbox",
                type: "button",
                label: "Request Interactive Sandbox Access",
                href: "#sandbox",
                style: {
                  color: { background: "primary", text: "surface" },
                  border: { radius: "md" },
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
};

export const CURATED_HERO_BATCH_3: ComponentDocument[] = [
  HERO_FULLBLEED_DOCK_DOCUMENT,
  HERO_MOSAIC_TRIPTYCH_DOCUMENT,
  HERO_QUOTE_SPOTLIGHT_DOCUMENT,
  HERO_PRICING_TRIO_DOCUMENT,
  HERO_CINEMATIC_STAGE_DOCUMENT,
];
