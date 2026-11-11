import type { ComponentDocument } from "../../model";

/**
 * CTA-01: The Minimal Mono Editorial
 * Visual Family: Editorial / High-Contrast
 * Layout Family: Split Asymmetric (7/5)
 * Distinctive: Monumental Playfair headline, stark black/white contrast, hairline divider,
 * book volume metadata, and restrained serif text link.
 */
export const CTA_MINIMAL_MONO_EDITORIAL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-01-minimal-mono-editorial",
  name: "The Minimal Mono Editorial",
  kind: "section",
  root: {
    id: "cta01-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "xl" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta01-container",
        type: "stack",
        direction: "column",
        alignment: "stretch",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta01-top-meta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              spacing: { paddingBottom: "sm" },
              border: { width: "thin", color: "border" },
            },
            children: [
              {
                id: "cta01-meta-kicker",
                type: "text",
                text: "VOL. 24 / ISSUE 08 — THE EDITORIAL MONOGRAPH",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta01-meta-curator",
                type: "text",
                text: "OCTOBER 2026 EDITION · WORLDWIDE RELEASE",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "normal", tracking: "wide" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          {
            id: "cta01-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta01-col-left",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "between",
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
                    id: "cta01-headline",
                    type: "heading",
                    level: 2,
                    text: "Architecture is not just space. It is the pause between decisions.",
                    style: {
                      typography: {
                        family: "playfair-display",
                        size: "6xl",
                        weight: "bold",
                        leading: "tight",
                        tracking: "tight",
                      },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "cta01-lead-narrative",
                    type: "text",
                    text: "A quarterly compendium investigating systems architecture, typography, and human-computer ergonomics. Curated by independent practitioners worldwide.",
                    style: {
                      typography: { family: "merriweather", size: "lg", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "cta01-col-right",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "between",
                wrap: false,
                gap: "lg",
                layout: {
                  placement: {
                    desktop: { column: 8, row: 1, columnSpan: 5, rowSpan: 1 },
                    tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                    mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                  },
                },
                style: {
                  spacing: { paddingLeft: "lg", paddingTop: "sm" },
                  border: { width: "thin", color: "border" },
                },
                children: [
                  {
                    id: "cta01-specs-card",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "cta01-specs-heading",
                        type: "text",
                        text: "EDITION SPECIFICATIONS",
                        style: {
                          typography: { family: "monospace", size: "sm", weight: "semibold", tracking: "wide" },
                          color: { text: "text-subtle" },
                        },
                      },
                      {
                        id: "cta01-specs-item-1",
                        type: "text",
                        text: "• 480 Smyth-sewn archival pages on 140gsm Fedrigoni paper",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "cta01-specs-item-2",
                        type: "text",
                        text: "• Blind debossed linen hardcover with ribbon marker",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "cta01-specs-item-3",
                        type: "text",
                        text: "• Strictly limited printing of 1,200 hand-numbered copies",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "cta01-action-group",
                    type: "stack",
                    direction: "column",
                    alignment: "stretch",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    style: {
                      spacing: { paddingTop: "md" },
                    },
                    children: [
                      {
                        id: "cta01-btn-order",
                        type: "button",
                        label: "Acquire Volume 24 — $48",
                        href: "/acquire",
                        style: {
                          spacing: { paddingY: "md", paddingX: "xl" },
                          color: { background: "text", text: "background" },
                          border: { radius: "none" },
                          typography: { size: "base", weight: "semibold" },
                        },
                      },
                      {
                        id: "cta01-btn-read-sample",
                        type: "button",
                        label: "Read Curator's Foreword →",
                        href: "/foreword",
                        style: {
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "transparent", text: "text" },
                          typography: { family: "serif", size: "sm" },
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
 * CTA-02: Warm Atelier Reserve
 * Visual Family: Luxury / Warm Neutral
 * Layout Family: Floating Framed Canvas
 * Distinctive: Sand & espresso palette, Roman capitals, double-inset border frame,
 * private patron reserve invitation, zero tech cliches.
 */
export const CTA_WARM_ATELIER_RESERVE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-02-warm-atelier-reserve",
  name: "Warm Atelier Reserve",
  kind: "section",
  root: {
    id: "cta02-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta02-outer-card",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "xl",
        style: {
          color: { background: "surface" },
          border: { width: "thin", color: "border", radius: "sm", shadow: "sm" },
          spacing: { paddingY: "xl", paddingX: "md" },
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          {
            id: "cta02-inner-frame",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "lg",
            style: {
              border: { width: "thin", color: "border", radius: "none" },
              spacing: { paddingY: "lg", paddingX: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta02-monogram",
                type: "text",
                text: "— ATELIER DE HAUTE CRÉATION —",
                style: {
                  typography: { family: "serif", size: "sm", weight: "medium", tracking: "wide", align: "center" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta02-headline",
                type: "heading",
                level: 2,
                text: "Private Commissions & Horological Reserves",
                style: {
                  typography: { family: "playfair-display", size: "4xl", weight: "medium", leading: "tight", align: "center" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta02-divider",
                type: "divider",
                style: {
                  sizing: { width: "20rem", align: "center" },
                },
              },
              {
                id: "cta02-body",
                type: "text",
                text: "Each bespoke timepiece requires six to twelve months of meticulous handcrafting in our Geneva workshop. We accept a strictly limited number of patrons annually to preserve uncompromising artisanal integrity.",
                style: {
                  typography: { family: "serif", size: "base", leading: "relaxed", align: "center" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "2xl" },
                },
              },
              {
                id: "cta02-action-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: true,
                gap: "md",
                style: {
                  spacing: { paddingTop: "sm" },
                },
                children: [
                  {
                    id: "cta02-btn-invite",
                    type: "button",
                    label: "Request Private Invitation",
                    href: "/invitation",
                    style: {
                      spacing: { paddingY: "md", paddingX: "xl" },
                      color: { background: "transparent", text: "text" },
                      border: { radius: "none", width: "thin", color: "text" },
                      typography: { family: "serif", size: "base", weight: "medium" },
                    },
                  },
                  {
                    id: "cta02-concierge-phone",
                    type: "text",
                    text: "Direct Salon Desk: +41 22 819 9000",
                    style: {
                      typography: { family: "serif", size: "sm" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "cta02-footnote",
                type: "text",
                text: "Strict discretion guaranteed · Salon viewings arranged by advance appointment only",
                style: {
                  typography: { size: "sm", tracking: "wide", align: "center" },
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

/**
 * CTA-03: DevTerminal QuickProbe
 * Visual Family: Developer-Tool / Utility
 * Layout Family: Split Monospace Console (5/7)
 * Distinctive: Dark slate code terminal window with real copyable CodeNode curl snippet,
 * tabular live node diagnostic logs, runtime badges.
 */
export const CTA_DEV_TERMINAL_PROBE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-03-dev-terminal-probe",
  name: "DevTerminal QuickProbe",
  kind: "section",
  root: {
    id: "cta03-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta03-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta03-col-pitch",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 5, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "cta03-badge",
                type: "text",
                text: "⚡ v4.18.2 PRODUCTION READY",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "semibold" },
                  color: { text: "success" },
                },
              },
              {
                id: "cta03-headline",
                type: "heading",
                level: 2,
                text: "Zero-Latency State Sync Across Global Edge Nodes",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta03-desc",
                type: "text",
                text: "Spin up stateful WebSocket clusters across 38 global edge regions in under 60 milliseconds. Backed by durable NVMe consensus and zero cold starts.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta03-btn-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "cta03-btn-deploy",
                    type: "button",
                    label: "Deploy Free Sandbox",
                    href: "/sandbox",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "base", weight: "medium" },
                    },
                  },
                  {
                    id: "cta03-btn-docs",
                    type: "button",
                    label: "API Documentation →",
                    href: "/docs",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "secondary", text: "secondary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "base" },
                    },
                  },
                ],
              },
              {
                id: "cta03-runtime-list",
                type: "text",
                text: "Supported Runtimes: Node.js 20+ · Bun · Deno · Cloudflare Workers",
                style: {
                  typography: { family: "monospace", size: "sm" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          {
            id: "cta03-col-terminal",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 6, row: 1, columnSpan: 7, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface-sunken" },
              border: { width: "thin", color: "border", radius: "lg", shadow: "lg" },
              spacing: { padding: "lg" },
            },
            children: [
              {
                id: "cta03-term-header",
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
                    id: "cta03-term-dots",
                    type: "text",
                    text: "● ● ●  bash — worker-cluster@edge-01",
                    style: {
                      typography: { family: "monospace", size: "sm" },
                      color: { text: "text-subtle" },
                    },
                  },
                  {
                    id: "cta03-term-status-pill",
                    type: "text",
                    text: "CONNECTED",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "success" },
                    },
                  },
                ],
              },
              {
                id: "cta03-code-block",
                type: "code",
                code: "curl -fsSL https://get.ozmishow.sh/v4 | bash\nozmi cluster provision --region ord,fra,sin --nodes 3",
                language: "bash",
                showLanguage: true,
                showCopy: true,
                wrap: false,
                style: {
                  border: { radius: "md" },
                  typography: { family: "monospace", size: "sm" },
                },
              },
              {
                id: "cta03-term-logs",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { paddingTop: "xs" },
                },
                children: [
                  {
                    id: "cta03-log-1",
                    type: "text",
                    text: "[✓] Authenticated via edge key (ed25519_8f9c)",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta03-log-2",
                    type: "text",
                    text: "[✓] Region ord (Chicago) live in 18ms",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "success" } },
                  },
                  {
                    id: "cta03-log-3",
                    type: "text",
                    text: "[✓] Region fra (Frankfurt) live in 24ms",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "success" } },
                  },
                  {
                    id: "cta03-log-4",
                    type: "text",
                    text: "[✓] Quorum consensus established across 3 distributed peers.",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-subtle" } },
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
 * CTA-04: Asymmetric Visual Showcase
 * Visual Family: Image-Led / Studio Product
 * Layout Family: Asymmetric Split Bleed (4/8)
 * Distinctive: Cool glacier background, compact 4-column left vertical action spine,
 * expansive 8-column hardware render with technical acoustic specs.
 */
export const CTA_ASYMMETRIC_MEDIA_SHOWCASE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-04-asymmetric-media-showcase",
  name: "Asymmetric Visual Showcase",
  kind: "section",
  root: {
    id: "cta04-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta04-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "xl" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta04-col-spine",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 4, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "cta04-eyebrow",
                type: "text",
                text: "STUDIO SERIES 09 // ACOUSTICS",
                style: {
                  typography: { family: "inter", size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta04-headline",
                type: "heading",
                level: 2,
                text: "Pure Beryllium Diaphragm Studio Monitors",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta04-body",
                type: "text",
                text: "Engineered with zero linear phase distortion and 120dB dynamic headroom for critical mastering suites.",
                style: {
                  typography: { size: "sm", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta04-specs-list",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  {
                    id: "cta04-spec-1",
                    type: "text",
                    text: "• Frequency Response: 18Hz – 42kHz ±1.5dB",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta04-spec-2",
                    type: "text",
                    text: "• Custom Class-D DSP Amplification: 850W RMS",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta04-spec-3",
                    type: "text",
                    text: "• Billet CNC Aluminum Baffle Enclosure",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "cta04-action-stack",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "sm",
                style: {
                  spacing: { paddingTop: "sm" },
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "cta04-btn-order",
                    type: "button",
                    label: "Order Studio Pair — $3,450",
                    href: "/order",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "base", weight: "semibold" },
                    },
                  },
                  {
                    id: "cta04-btn-demo",
                    type: "button",
                    label: "Book Studio Listening Session",
                    href: "/listening-session",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      color: { background: "secondary", text: "secondary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "base" },
                    },
                  },
                ],
              },
              {
                id: "cta04-guarantee",
                type: "text",
                text: "30-Day In-Studio Trial · 5-Year Factory Warranty",
                style: {
                  typography: { size: "sm" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          {
            id: "cta04-col-media",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "center",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                desktop: { column: 5, row: 1, columnSpan: 8, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface" },
              border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
              spacing: { padding: "md" },
            },
            children: [
              {
                id: "cta04-image",
                type: "image",
                src: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1400&q=80",
                alt: "Precision Acoustic Studio Monitor System in Billet Aluminum",
                style: {
                  border: { radius: "lg" },
                  sizing: { width: "full", height: "20rem", fit: "cover" },
                },
              },
              {
                id: "cta04-media-footer",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "sm",
                style: {
                  spacing: { paddingTop: "xs" },
                },
                children: [
                  {
                    id: "cta04-media-caption",
                    type: "text",
                    text: "CALIBRATION CERTIFICATE: SN-90412-GEN3",
                    style: {
                      typography: { family: "monospace", size: "sm" },
                      color: { text: "text-subtle" },
                    },
                  },
                  {
                    id: "cta04-media-status",
                    type: "text",
                    text: "LAB TUNED: 0.02% THD",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "semibold" },
                      color: { text: "success" },
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
 * CTA-05: Industrial Brutalist Action Slab
 * Visual Family: Brutalist / High-Contrast
 * Layout Family: 3-Column Partitioned Ribbon
 * Distinctive: Heavy 3px solid borders, electric lime accent, zero border radius,
 * hard drop-shadow tactile buttons, metric partitions.
 */
export const CTA_BRUTALIST_ACTION_SLAB_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-05-brutalist-action-slab",
  name: "Industrial Brutalist Action Slab",
  kind: "section",
  root: {
    id: "cta05-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta05-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "none" },
          border: { width: "thin", color: "text" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta05-col-manifesto",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "between",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 5, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface" },
              spacing: { padding: "xl" },
              border: { width: "thin", color: "text" },
            },
            children: [
              {
                id: "cta05-kicker",
                type: "text",
                text: "/// PROTOCOL DISPATCH // V2.9",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "cta05-headline",
                type: "heading",
                level: 2,
                text: "STOP REINVENTING THE ENGINE. SHIP YOUR CORE NOW.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta05-warning-note",
                type: "text",
                text: "Unverified nodes are auto-purged after 72 hours of consensus drift.",
                style: {
                  typography: { family: "monospace", size: "sm" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          {
            id: "cta05-col-metrics",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                desktop: { column: 6, row: 1, columnSpan: 3, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 6, rowSpan: 1 },
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface-muted" },
              spacing: { padding: "xl" },
              border: { width: "thin", color: "text" },
            },
            children: [
              {
                id: "cta05-metric-1-group",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  {
                    id: "cta05-metric-1-num",
                    type: "text",
                    text: "99.992%",
                    style: {
                      typography: { family: "monospace", size: "4xl", weight: "bold" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "cta05-metric-1-label",
                    type: "text",
                    text: "GLOBAL CONSENSUS RATE",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "semibold" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
              {
                id: "cta05-metric-2-group",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  {
                    id: "cta05-metric-2-num",
                    type: "text",
                    text: "0.00 MS",
                    style: {
                      typography: { family: "monospace", size: "2xl", weight: "bold" },
                      color: { text: "warning" },
                    },
                  },
                  {
                    id: "cta05-metric-2-label",
                    type: "text",
                    text: "UNPLANNED DRIFT DOWNTIME",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "semibold" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "cta05-col-action",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "center",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 9, row: 1, columnSpan: 4, rowSpan: 1 },
                tablet: { column: 7, row: 2, columnSpan: 6, rowSpan: 1 },
                mobile: { column: 1, row: 3, columnSpan: 12, rowSpan: 1 },
              },
            },
            style: {
              color: { background: "surface" },
              spacing: { padding: "xl" },
              border: { width: "thin", color: "text" },
            },
            children: [
              {
                id: "cta05-btn-execute",
                type: "button",
                label: "EXECUTE SHIP PROTOCOL [↵]",
                href: "/ship",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#E2F952" } }],
                  color: { text: "text" },
                  border: { radius: "none", width: "thin", color: "text" },
                  spacing: { paddingY: "lg", paddingX: "xl" },
                  typography: { family: "monospace", size: "base", weight: "bold" },
                },
              },
              {
                id: "cta05-btn-specs",
                type: "button",
                label: "DOWNLOAD PROTOCOL SPEC [PDF]",
                href: "/specs",
                style: {
                  spacing: { paddingY: "md", paddingX: "lg" },
                  color: { background: "transparent", text: "text" },
                  border: { radius: "none", width: "thin", color: "text" },
                  typography: { family: "monospace", size: "sm" },
                },
              },
              {
                id: "cta05-node-count",
                type: "text",
                text: "● ACTIVE CONSENSUS NODES: 4,819",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "semibold" },
                  color: { text: "success" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_CTA_BATCH_1: ComponentDocument[] = [
  CTA_MINIMAL_MONO_EDITORIAL_DOCUMENT,
  CTA_WARM_ATELIER_RESERVE_DOCUMENT,
  CTA_DEV_TERMINAL_PROBE_DOCUMENT,
  CTA_ASYMMETRIC_MEDIA_SHOWCASE_DOCUMENT,
  CTA_BRUTALIST_ACTION_SLAB_DOCUMENT,
];
