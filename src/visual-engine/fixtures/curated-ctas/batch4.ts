import type { ComponentDocument } from "../../model";

/**
 * CTA-16: Enterprise Security & Compliance Vault
 * Visual Family: Trust / Compliance Security
 * Layout Family: Security Badge Shield with Download Wall
 * Distinctive: Cobalt navy canvas, emerald verification ring, SOC2/ISO/HIPAA badges,
 * SHA-256 cryptographic checksum block, and instant compliance dossier download.
 */
export const CTA_SECURITY_COMPLIANCE_VAULT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-16-security-compliance-vault",
  name: "Enterprise Security & Compliance Vault",
  kind: "section",
  root: {
    id: "cta16-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta16-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          {
            id: "cta16-header",
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
                id: "cta16-kicker",
                type: "text",
                text: "🛡️ CONTINUOUS THIRD-PARTY AUDIT VERIFICATION",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta16-title",
                type: "heading",
                level: 2,
                text: "Enterprise-Grade Security Architecture. Independently Audited.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta16-desc",
                type: "text",
                text: "Download our complete 142-page compliance dossier, penetration test summaries, and vendor risk assessment packages.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
          {
            id: "cta16-vault-card",
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
                id: "cta16-badges-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: true,
                gap: "sm",
                children: [
                  {
                    id: "cta16-badge-soc2",
                    type: "text",
                    text: "✓ SOC 2 TYPE II CERTIFIED",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                    },
                  },
                  {
                    id: "cta16-badge-iso",
                    type: "text",
                    text: "✓ ISO/IEC 27001:2022",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                    },
                  },
                  {
                    id: "cta16-badge-hipaa",
                    type: "text",
                    text: "✓ HIPAA COMPLIANT",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingY: "xs", paddingX: "sm" },
                    },
                  },
                ],
              },
              {
                id: "cta16-checksum-block",
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
                    id: "cta16-hash-val",
                    type: "text",
                    text: "SHA-256: 8f4b7a19...d0e1f2a3",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta16-verified-tag",
                    type: "text",
                    text: "VERIFIED",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                ],
              },
              {
                id: "cta16-btn-download",
                type: "button",
                label: "Download Full Security Dossier (.ZIP) →",
                href: "/compliance-dossier.zip",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#059669" } }],
                  color: { text: "primary-foreground" },
                  border: { radius: "md" },
                  spacing: { paddingY: "md", paddingX: "xl" },
                  typography: { family: "inter", size: "base", weight: "bold" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "cta16-auditor-seal",
                type: "text",
                text: "Audited by Coalfire & Schellman · Quarterly penetration tests by Bishop Fox",
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
 * CTA-17: Interactive ROI Value Calculator
 * Visual Family: Analytical / ROI Calculator
 * Layout Family: Split Slider & Computed Value Output
 * Distinctive: Charcoal canvas with solar amber accents, parameter slider rows,
 * giant computed annual savings metric ($184,000 / yr), and instant payback period.
 */
export const CTA_INTERACTIVE_ROI_CALCULATOR_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-17-interactive-roi-calculator",
  name: "Interactive ROI Value Calculator",
  kind: "section",
  root: {
    id: "cta17-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta17-grid",
        type: "grid",
        columns: 12,
        style: {
          spacing: { gap: "lg" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "cta17-col-inputs",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                desktop: { column: 1, row: 1, columnSpan: 6, rowSpan: 12 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "cta17-kicker",
                type: "text",
                text: "INSTANT ROI & SAVINGS ESTIMATOR",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta17-headline",
                type: "heading",
                level: 2,
                text: "Calculate your annual engineering time & egress savings.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta17-param-team",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "md",
                style: {
                  color: { background: "surface" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "sm", paddingX: "md" },
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "cta17-team-label",
                    type: "text",
                    text: "Engineering Team Size",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "cta17-team-val",
                    type: "text",
                    text: "50 Engineers",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                ],
              },
              {
                id: "cta17-param-spend",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "md",
                style: {
                  color: { background: "surface" },
                  border: { radius: "md", width: "thin", color: "border" },
                  spacing: { paddingY: "sm", paddingX: "md" },
                  sizing: { width: "full" },
                },
                children: [
                  {
                    id: "cta17-spend-label",
                    type: "text",
                    text: "Current Monthly Cloud Spend",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "cta17-spend-val",
                    type: "text",
                    text: "$45,000 / mo",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                ],
              },
            ],
          },
          {
            id: "cta17-col-output",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "center",
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
              border: { width: "thin", color: "border", radius: "xl", shadow: "lg" },
              spacing: { padding: "lg" },
            },
            children: [
              {
                id: "cta17-output-tag",
                type: "text",
                text: "PROJECTED ANNUAL NET GAIN",
                style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "text-muted" } },
              },
              {
                id: "cta17-output-number",
                type: "heading",
                level: 3,
                text: "$184,000 / yr",
                style: {
                  typography: { family: "inter", size: "6xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "cta17-output-breakdown",
                type: "text",
                text: "+ 1,420 developer hours reclaimed from build queues · 52% egress cost reduction",
                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "cta17-output-payback",
                type: "text",
                text: "⚡ Estimated Payback Period: 1.8 months",
                style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "cta17-btn-claim-roi",
                type: "button",
                label: "Lock In Custom ROI Quote →",
                href: "/custom-roi-quote",
                style: {
                  background: [{ kind: "solid", color: { kind: "custom", value: "#D97706" } }],
                  color: { text: "primary-foreground" },
                  border: { radius: "md" },
                  spacing: { paddingY: "md", paddingX: "xl" },
                  typography: { family: "inter", size: "base", weight: "bold" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "cta17-telemetry-note",
                type: "text",
                text: "Calculated from aggregate benchmarks across 400+ production migrations.",
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
 * CTA-18: Dual Persona Fork Portal
 * Visual Family: Bifurcated Persona Choice
 * Layout Family: Equal Split Dual-Door Cards
 * Distinctive: Side-by-side developer terminal door vs executive boardroom door,
 * giving two distinct personas tailored conversion journeys with dedicated styling.
 */
export const CTA_DUAL_PERSONA_FORK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-18-dual-persona-fork",
  name: "Dual Persona Fork Portal",
  kind: "section",
  root: {
    id: "cta18-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta18-container",
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
            id: "cta18-header",
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
                id: "cta18-kicker",
                type: "text",
                text: "CHOOSE YOUR EVALUATION TRACK",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "primary" },
                },
              },
              {
                id: "cta18-title",
                type: "heading",
                level: 2,
                text: "Built for engineers. Approved by leadership.",
                style: {
                  typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },
          {
            id: "cta18-doors-grid",
            type: "grid",
            columns: 12,
            style: {
              spacing: { gap: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "cta18-door-dev",
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
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta18-dev-tag",
                    type: "text",
                    text: "FOR DEVELOPERS & ARCHITECTS",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta18-dev-title",
                    type: "heading",
                    level: 3,
                    text: "Spin up a cluster in under 60 seconds",
                    style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta18-dev-cmd",
                    type: "code",
                    code: "curl -fsSL https://get.ozmi.dev | sh",
                    language: "bash",
                    showLanguage: false,
                    showCopy: true,
                    wrap: false,
                    style: {
                      color: { background: "surface-muted" },
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { padding: "sm" },
                      sizing: { width: "full" },
                    },
                  },
                  {
                    id: "cta18-dev-desc",
                    type: "text",
                    text: "Instant local sandbox, zero credit card required, pre-loaded with Docker compose and sample telemetry.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta18-dev-btn",
                    type: "button",
                    label: "Launch Local Sandbox →",
                    href: "/dev-sandbox",
                    style: {
                      spacing: { paddingY: "md", paddingX: "xl" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },
              {
                id: "cta18-door-exec",
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
                  border: { width: "thin", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "cta18-exec-tag",
                    type: "text",
                    text: "FOR DIRECTORS & VPs",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta18-exec-title",
                    type: "heading",
                    level: 3,
                    text: "Evaluate architecture & procurement RFP",
                    style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "cta18-exec-bullets",
                    type: "text",
                    text: "✓ 99.999% SLA Guarantee · Dedicated VPC isolation\n✓ Custom MSA with reciprocal indemnification terms",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta18-exec-desc",
                    type: "text",
                    text: "Schedule a high-level briefing with our enterprise solutions team to review migration blueprints and contract terms.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta18-exec-btn",
                    type: "button",
                    label: "Schedule Leadership Briefing →",
                    href: "/executive-briefing",
                    style: {
                      background: [{ kind: "solid", color: { kind: "custom", value: "#2563EB" } }],
                      color: { text: "primary-foreground" },
                      border: { radius: "md" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      typography: { family: "inter", size: "sm", weight: "bold" },
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
 * CTA-19: Media Audio Episode Streamer Dock
 * Visual Family: Media / Creator Streaming
 * Layout Family: Horizontal Audio Player Dock
 * Distinctive: Pitch noir canvas, electric violet playback controls, audiogram waveform
 * progress bar simulation, episode timing metadata, and direct podcast subscription pills.
 */
export const CTA_MEDIA_PODCAST_DOCK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-19-media-podcast-dock",
  name: "Media Audio Episode Streamer Dock",
  kind: "section",
  root: {
    id: "cta19-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta19-container",
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
            id: "cta19-kicker",
            type: "text",
            text: "🎙️ EPISODE 84 · ARCHITECTURE OF SCALE",
            style: {
              typography: { family: "monospace", size: "sm", weight: "bold", tracking: "wide" },
              color: { text: "primary" },
            },
          },
          {
            id: "cta19-title",
            type: "heading",
            level: 2,
            text: "Listen: Scaling to 10M QPS with Zero Downtime",
            style: {
              typography: { family: "inter", size: "4xl", weight: "bold", leading: "tight", align: "center" },
              color: { text: "text" },
            },
          },
          {
            id: "cta19-dock-card",
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
                id: "cta19-scrubber-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "cta19-time-current",
                    type: "text",
                    text: "▶ 00:00",
                    style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "cta19-waveform-track",
                    type: "text",
                    text: "|||ll||||l|ll||||ll|||",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "cta19-time-total",
                    type: "text",
                    text: "48:22",
                    style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-subtle" } },
                  },
                ],
              },
              {
                id: "cta19-actions-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "cta19-btn-play",
                    type: "button",
                    label: "▶ Play Full Episode (48m)",
                    href: "/listen/ep84",
                    style: {
                      background: [{ kind: "solid", color: { kind: "custom", value: "#E11D48" } }],
                      color: { text: "primary-foreground" },
                      border: { radius: "full" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      typography: { family: "inter", size: "sm", weight: "bold" },
                    },
                  },
                  {
                    id: "cta19-sub-pills-stack",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "end",
                    wrap: true,
                    gap: "xs",
                    children: [
                      {
                        id: "cta19-btn-apple",
                        type: "button",
                        label: "Apple Podcasts ↗",
                        href: "https://podcasts.apple.com",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "full", width: "thin", color: "border" },
                          spacing: { paddingY: "xs", paddingX: "md" },
                          typography: { family: "monospace", size: "sm" },
                        },
                      },
                      {
                        id: "cta19-btn-spotify",
                        type: "button",
                        label: "Spotify ↗",
                        href: "https://spotify.com",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "full", width: "thin", color: "border" },
                          spacing: { paddingY: "xs", paddingX: "md" },
                          typography: { family: "monospace", size: "sm" },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "cta19-hosts-meta",
                type: "text",
                text: "Hosted by Elena Rostova · Guest: Dr. Sean Mercer, VP Systems Engineering",
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
 * CTA-20: VIP Founder Salon Wax-Seal Invitation
 * Visual Family: Exclusive / Intimate Salon
 * Layout Family: Centered Deckle-Edge Formal Invitation
 * Distinctive: Deep espresso canvas, antique gold typography, wax-seal crest styling,
 * strictly limited 18-seat founder dinner notification, and formal seat request CTA.
 */
export const CTA_FOUNDER_SALON_INVITATION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-20-founder-salon-invitation",
  name: "VIP Founder Salon Wax-Seal Invitation",
  kind: "section",
  root: {
    id: "cta20-section",
    type: "section",
    style: {
      color: { background: "surface-muted", text: "text" },
      spacing: { paddingY: "xl", paddingX: "md" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "cta20-invitation-card",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "md",
        style: {
          color: { background: "surface" },
          border: { width: "thin", color: "border", radius: "md", shadow: "lg" },
          spacing: { padding: "lg" },
          sizing: { width: "full", maxWidth: "2xl", align: "center" },
          typography: { align: "center" },
        },
        children: [
          {
            id: "cta20-crest-badge",
            type: "text",
            text: "⚜ PRIVATE SALON · NO. 14",
            style: {
              typography: { family: "serif", size: "sm", weight: "bold", tracking: "wide" },
              color: { text: "primary" },
            },
          },
          {
            id: "cta20-headline",
            type: "heading",
            level: 2,
            text: "An Intimate Evening on Autonomous Systems & Capital Architecture",
            style: {
              typography: { family: "playfair-display", size: "2xl", weight: "medium", leading: "tight" },
              color: { text: "text" },
            },
          },
          {
            id: "cta20-venue-details",
            type: "text",
            text: "Thursday, November 19, 2026 · The Penthouse at Aman New York",
            style: {
              typography: { family: "monospace", size: "sm" },
              color: { text: "text-muted" },
            },
          },
          {
            id: "cta20-curated-roster-notice",
            type: "text",
            text: "Strict capacity of 18 founders and managing partners. Private four-course dining and unrecorded dialogue under Chatham House Rule.",
            style: {
              typography: { family: "serif", size: "base", leading: "relaxed" },
              color: { text: "text-muted" },
              sizing: { maxWidth: "lg" },
            },
          },
          {
            id: "cta20-btn-request-seat",
            type: "button",
            label: "Request Seat at the Table →",
            href: "/salon-request",
            style: {
              background: [{ kind: "solid", color: { kind: "custom", value: "#D97706" } }],
              color: { text: "primary-foreground" },
              border: { radius: "none" },
              spacing: { paddingY: "md", paddingX: "2xl" },
              typography: { family: "serif", size: "base", weight: "medium" },
            },
          },
          {
            id: "cta20-confidential-footer",
            type: "text",
            text: "Invitations are non-transferable · Guest list finalized 72 hours prior",
            style: { typography: { size: "sm" }, color: { text: "text-subtle" } },
          },
        ],
      },
    ],
  },
};

export const CURATED_CTA_BATCH_4: ComponentDocument[] = [
  CTA_SECURITY_COMPLIANCE_VAULT_DOCUMENT,
  CTA_INTERACTIVE_ROI_CALCULATOR_DOCUMENT,
  CTA_DUAL_PERSONA_FORK_DOCUMENT,
  CTA_MEDIA_PODCAST_DOCK_DOCUMENT,
  CTA_FOUNDER_SALON_INVITATION_DOCUMENT,
];
