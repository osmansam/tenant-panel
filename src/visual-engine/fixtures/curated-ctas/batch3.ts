import type { ComponentDocument } from "../../model";

/**
 * CTA-11: Deep Void Cinematic Portal
 * Visual Family: Cinematic / Atmospheric Dark
 * Layout Family: Full-Bleed Monolith with Vignette
 * Distinctive: Inky obsidian canvas, star-white typography, faint cyan horizon line,
 * luminescent pill button, audio-visual trailer runtime badge.
 */
export const CTA_DEEP_VOID_CINEMATIC_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-11-deep-void-cinematic",
  name: "Deep Void Cinematic Portal",
  kind: "section",
  root: {
    id: "cta11-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta11-monolith-pillar",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
          typography: { align: "center" },
        },
        children: [
          {
            id: "cta11-eyebrow-pill",
            type: "text",
            text: "THE NEXT ERA OF SPATIAL COMPUTING",
            style: {
              typography: { family: "monospace", size: "sm", weight: "semibold", tracking: "wide" },
              color: { text: "text-muted" },
            },
          },
          {
            id: "cta11-headline",
            type: "heading",
            level: 2,
            text: "Beyond the Glass. Enter the Living Canvas.",
            style: {
              typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight", tracking: "tight" },
              color: { text: "text" },
            },
          },
          {
            id: "cta11-subline",
            type: "text",
            text: "A fully decentralized spatial operating layer designed for real-time human perception, zero perceptual lag, and quantum-safe neural synchronization.",
            style: {
              typography: { size: "lg", leading: "relaxed" },
              color: { text: "text-muted" },
              sizing: { maxWidth: "2xl" },
            },
          },
          {
            id: "cta11-actions-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            style: {
              spacing: { paddingTop: "sm" },
            },
            children: [
              {
                id: "cta11-btn-frontier",
                type: "button",
                label: "Experience The Frontier →",
                href: "/frontier",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#06B6D4" } }],
                  color: { text: "background" },
                  border: { radius: "full" },
                  spacing: { paddingY: "lg", paddingX: "2xl" },
                  typography: { family: "inter", size: "base", weight: "bold" },
                },
              },
              {
                id: "cta11-trailer-badge",
                type: "button",
                label: "▶ Spatial Keynote [ 01:42 4K ]",
                href: "/trailer",
                style: {
                  color: { background: "transparent", text: "text-muted" },
                  border: { radius: "full", width: "thin", color: "border" },
                  spacing: { paddingY: "xs", paddingX: "md" },
                  typography: { family: "monospace", size: "sm" },
                },
              },
            ],
          },
          {
            id: "cta11-footer-specs",
            type: "text",
            text: "Sub-10ms neural latency · Hardware independent · SDK available for developers",
            style: {
              typography: { family: "monospace", size: "sm" },
              color: { text: "text-subtle" },
            },
          },
        ],
      },
    ],
  },
};

/**
 * CTA-12: Private Advisory Concierge Desk
 * Visual Family: Consultation / Bespoke Advisory
 * Layout Family: Split 7/5 Expert Profile & Scheduler
 * Distinctive: Heritage burgundy & ivory palette, senior partner credential dossier,
 * direct strategy call reservation card with client scale metrics.
 */
export const CTA_CONCIERGE_ADVISORY_DESK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-12-concierge-advisory-desk",
  name: "Private Advisory Concierge Desk",
  kind: "section",
  root: {
    id: "cta12-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta12-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta12-col-bio",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 7, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "cta12-kicker",
                type: "text",
                text: "PARTNER-LEVEL STRATEGIC COUNSEL",
                style: {
                  typography: { family: "serif", size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta12-headline",
                type: "heading",
                level: 2,
                text: "Board-Level Advisory for Complex Mergers & Global Restructuring",
                style: {
                  typography: { family: "playfair-display", size: "4xl", weight: "medium", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta12-narrative",
                type: "text",
                text: "Directly counsel with senior practice leaders who have steered over $3.2B in cross-border acquisitions and regulatory reviews across London, Zurich, and New York.",
                style: {
                  typography: { family: "serif", size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta12-stats-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "xl",
                style: {
                  spacing: { paddingTop: "sm" },
                },
                children: [
                  {
                    id: "cta12-stat-1",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "cta12-stat-1-val",
                        type: "text",
                        text: "$3.2B+",
                        style: { typography: { family: "playfair-display", size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "cta12-stat-1-lbl",
                        type: "text",
                        text: "TRANSACTION RECORD",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "cta12-stat-2",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "none",
                    children: [
                      {
                        id: "cta12-stat-2-val",
                        type: "text",
                        text: "100%",
                        style: { typography: { family: "playfair-display", size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "cta12-stat-2-lbl",
                        type: "text",
                        text: "PARTNER-LED EXECUTION",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "cta12-col-card",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 8, row: 1, columnSpan: 5, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "lg", shadow: "md" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "cta12-card-heading",
                type: "heading",
                level: 3,
                text: "Schedule Preliminary Strategy Call",
                style: {
                  typography: { family: "playfair-display", size: "xl", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta12-card-sub",
                type: "text",
                text: "Confidential 30-minute initial scoping session with a Senior Managing Director.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "cta12-slots-group",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "cta12-slot-1",
                    type: "text",
                    text: "📅 Tomorrow, 14:00 GMT · Virtual Scoping",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                  {
                    id: "cta12-slot-2",
                    type: "text",
                    text: "📅 Thursday, 10:30 GMT · Zurich Salon",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      typography: { size: "sm", weight: "medium" },
                    },
                  },
                ],
              },
              {
                id: "cta12-btn-confirm",
                type: "button",
                label: "Confirm Executive Consultation",
                href: "/advisory-consultation",
                style: {
                  spacing: { paddingY: "md", paddingX: "xl" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { family: "serif", size: "base", weight: "semibold" },
                },
              },
              {
                id: "cta12-nda-note",
                type: "text",
                text: "Standard reciprocal NDA auto-executed prior to consultation.",
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
 * CTA-13: Wall of Advocates Social Proof Citadel
 * Visual Family: Social-Proof-Led / Community
 * Layout Family: Inverted Stack (Testimonial Grid Over Action)
 * Distinctive: Soft lavender & deep indigo palette, 3 customer quote cards arching
 * above a docked bottom signup anchor bar, verified badges.
 */
export const CTA_WALL_OF_ADVOCATES_CITADEL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-13-wall-of-advocates-citadel",
  name: "Wall of Advocates Social Proof Citadel",
  kind: "section",
  root: {
    id: "cta13-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "lg", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta13-container",
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
            id: "cta13-header",
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
                id: "cta13-kicker",
                type: "text",
                text: "TRUSTED BY HIGH-VELOCITY ENGINEERING TEAMS",
                style: {
                  typography: { family: "inter", size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta13-title",
                type: "heading",
                level: 2,
                text: "Here's what leaders say after their first 30 days.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },
          {
            id: "cta13-quotes-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta13-card-quote-1",
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
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "cta13-q1-text",
                    type: "text",
                    text: "\"We migrated 40 microservices over a weekend without a single dropped packet. Our deployment cycle went from 45 minutes to 38 seconds.\"",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                  },
                  {
                    id: "cta13-q1-author",
                    type: "text",
                    text: "— Elena Rostova, VP Infrastructure @ Veloce",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                  },
                ],
              },
              {
                id: "cta13-card-quote-2",
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
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "cta13-q2-text",
                    type: "text",
                    text: "\"The developer ergonomics are unreal. What used to take two dedicated DevOps engineers is now handled autonomously at the edge.\"",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                  },
                  {
                    id: "cta13-q2-author",
                    type: "text",
                    text: "— Marcus Chen, Chief Architect @ Helix Data",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                  },
                ],
              },
              {
                id: "cta13-card-quote-3",
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
                  border: { width: "thin", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "cta13-q3-text",
                    type: "text",
                    text: "\"Our egress cloud bills were slashed by 64% in month one. The ROI paid for our entire annual contract inside three weeks.\"",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                  },
                  {
                    id: "cta13-q3-author",
                    type: "text",
                    text: "— Sarah Lindqvist, Head of Eng @ Solstice",
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                  },
                ],
              },
            ],
          },
          {
            id: "cta13-bottom-anchor-bar",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
              spacing: { paddingY: "md", paddingX: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta13-anchor-proof-text",
                type: "text",
                text: "🚀 Join 18,000+ engineering leaders building on the modern edge stack",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "cta13-anchor-action-btn",
                type: "button",
                label: "Start Free 14-Day Trial →",
                href: "/trial",
                style: {
                  spacing: { paddingY: "md", paddingX: "xl" },
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
};

/**
 * CTA-14: Command Palette Navigation Portal
 * Visual Family: Portal / Navigation-Led
 * Layout Family: Floating Search & Intent Selector
 * Distinctive: Dark mode neutral gray command palette modal UI, monospace [⌘K]
 * shortcut hints, 4 multi-intent routing action rows.
 */
export const CTA_COMMAND_PALETTE_PORTAL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-14-command-palette-portal",
  name: "Command Palette Navigation Portal",
  kind: "section",
  root: {
    id: "cta14-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta14-palette-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "lg",
        style: {
          sizing: { width: "full", maxWidth: "3xl", align: "center" },
        },
        children: [
          {
            id: "cta14-palette-card",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "lg" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta14-search-bar",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "sm",
                style: {
                  color: { background: "surface-muted" },
                  border: { width: "thin", color: "border", radius: "lg" },
                  spacing: { paddingY: "sm", paddingX: "md" },
                },
                children: [
                  {
                    id: "cta14-search-placeholder",
                    type: "text",
                    text: "🔍 What would you like to explore?",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta14-search-kbd",
                    type: "text",
                    text: "⌘K",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { background: "surface", text: "text-subtle" },
                      border: { width: "thin", color: "border", radius: "sm" },
                      spacing: { paddingY: "xs", paddingX: "xs" },
                    },
                  },
                ],
              },
              {
                id: "cta14-intent-rows-stack",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingTop: "xs" },
                },
                children: [
                  {
                    id: "cta14-intent-1",
                    type: "button",
                    label: "1. Enterprise Pricing & Tiers →",
                    href: "/pricing",
                    style: {
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "transparent", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { family: "monospace", size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "cta14-intent-2",
                    type: "button",
                    label: "2. Technical Docs & Edge SDKs →",
                    href: "/docs",
                    style: {
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "transparent", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { family: "monospace", size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "cta14-intent-3",
                    type: "button",
                    label: "3. Speak with Solutions Architect →",
                    href: "/contact-architect",
                    style: {
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "transparent", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { family: "monospace", size: "sm", weight: "medium" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "cta14-intent-4",
                    type: "button",
                    label: "4. Launch Edge Sandbox in 60s →",
                    href: "/sandbox",
                    style: {
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta14-footer-hint",
                type: "text",
                text: "ProTip: Press ↵ or select any destination to navigate instantly",
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
 * CTA-15: Architectural Gallery Exhibition Pass
 * Visual Family: Luxury Editorial / Architecture
 * Layout Family: Asymmetric Frame with Overlapping Plate
 * Distinctive: Terracotta & raw limestone palette, perforated ticket pass card,
 * numbered limited reservation pass [No. 0842], biennial curator notes.
 */
export const CTA_ARCHITECTURAL_GALLERY_PASS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-15-architectural-gallery-pass",
  name: "Architectural Gallery Exhibition Pass",
  kind: "section",
  root: {
    id: "cta15-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "md" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta15-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta15-col-manifesto",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 7, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "cta15-exhibition-kicker",
                type: "text",
                text: "VENICE ARCHITECTURE BIENNIAL · PAVILION 04",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta15-title",
                type: "heading",
                level: 2,
                text: "Tectonic Shadows & The Ergonomics of Inhabited Void",
                style: {
                  typography: { family: "playfair-display", size: "4xl", weight: "medium", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta15-curator-note",
                type: "text",
                text: "An immersive retrospective exploring monolith masonry, raw terracotta thermal masses, and computational brutalism. Curated across six subterranean galleries.",
                style: {
                  typography: { family: "serif", size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta15-venue-dates",
                type: "text",
                text: "📍 Giardini della Biennale, Venezia · 14 October – 28 November 2026",
                style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-subtle" } },
              },
            ],
          },
          {
            id: "cta15-col-pass",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 8, row: 1, columnSpan: 5, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface-muted" },
              border: { width: "thin", color: "border", radius: "lg", shadow: "md" },
              spacing: { padding: "lg" },
            },
            children: [
              {
                id: "cta15-pass-header",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "sm",
                style: {
                  spacing: { paddingBottom: "xs" },
                  border: { width: "thin", color: "border" },
                },
                children: [
                  {
                    id: "cta15-pass-num",
                    type: "text",
                    text: "PASS NO. 0842-VEN",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta15-pass-tier",
                    type: "text",
                    text: "VIP PREVIEW ACCESS",
                    style: { typography: { family: "monospace", size: "sm", weight: "semibold" }, color: { text: "primary" } },
                  },
                ],
              },
              {
                id: "cta15-pass-details",
                type: "text",
                text: "Includes private after-hours vernissage, hardcover monograph catalog, and curator symposium discussion panel.",
                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "cta15-btn-reserve-pass",
                type: "button",
                label: "Reserve Admission Pass — €45",
                href: "/reserve-pass",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#C85A32" } }],
                  color: { text: "primary-foreground" },
                  border: { radius: "none" },
                  spacing: { paddingY: "md", paddingX: "xl" },
                  typography: { family: "serif", size: "base", weight: "medium" },
                },
              },
              {
                id: "cta15-pass-disclaimer",
                type: "text",
                text: "Strict capacity of 120 guests per viewing window · Timed entry pass",
                style: { typography: { size: "sm", align: "center" }, color: { text: "text-subtle" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_CTA_BATCH_3: ComponentDocument[] = [
  CTA_DEEP_VOID_CINEMATIC_DOCUMENT,
  CTA_CONCIERGE_ADVISORY_DESK_DOCUMENT,
  CTA_WALL_OF_ADVOCATES_CITADEL_DOCUMENT,
  CTA_COMMAND_PALETTE_PORTAL_DOCUMENT,
  CTA_ARCHITECTURAL_GALLERY_PASS_DOCUMENT,
];
