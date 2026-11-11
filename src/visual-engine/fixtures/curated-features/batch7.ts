import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 7 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-31: Corporate Chancery · M&A Transaction Types Deck
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 3-column deal structures deck with enterprise value parameters
 * Visual Family: Corporate Chancery / Cross-Border Mergers
 */
export const FEATURE_LEGAL_MERGERS_ACQUISITIONS_TRIO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-31-legal-mergers-acquisitions-trio",
  name: "Corporate Chancery · M&A Transaction Types Deck",
  kind: "section",
  root: {
    id: "feat31-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat31-container",
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
          /* Header */
          {
            id: "feat31-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { maxWidth: "3xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "feat31-badge",
                type: "badge",
                text: "STRATEGIC TRANSACTION ARCHITECTURE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat31-title",
                type: "heading",
                level: 2,
                text: "Sophisticated deal structures engineered for high-stakes corporate transitions",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat31-desc",
                type: "text",
                text: "We advise boards of directors, sovereign investment vehicles, and private equity sponsors through contested mergers, cross-border carve-outs, and defensive equity restructuring.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Deal Deck Grid */
          {
            id: "feat31-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Deal Type 1 */
              {
                id: "feat31-c1-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat31-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat31-c1-badge",
                        type: "badge",
                        text: "$2B – $25B ENTERPRISE VALUE",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat31-c1-title",
                        type: "heading",
                        level: 3,
                        text: "Hostile Takeover Defense & Rights Plans",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat31-c1-desc",
                        type: "text",
                        text: "Advising public company boards against creeping tender offers, enacting flip-in shareholder rights plans, and establishing Special Litigation Committees under Delaware corporate jurisprudence.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat31-c1-link",
                        type: "link",
                        label: "Explore Takeover Defense Track Record →",
                        href: "/practices/takeover-defense",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Deal Type 2 */
              {
                id: "feat31-c2-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat31-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat31-c2-badge",
                        type: "badge",
                        text: "$500M – $5B ENTERPRISE VALUE",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat31-c2-title",
                        type: "heading",
                        level: 3,
                        text: "Cross-Border Corporate Carve-Outs",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat31-c2-desc",
                        type: "text",
                        text: "Drafting multi-jurisdiction Transition Services Agreements (TSAs), intellectual property ring-fencing, and Section 338(h)(10) tax-advantaged asset separation treaties.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat31-c2-link",
                        type: "link",
                        label: "Explore Corporate Carve-Out Experience →",
                        href: "/practices/carve-outs",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Deal Type 3 */
              {
                id: "feat31-c3-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat31-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat31-c3-badge",
                        type: "badge",
                        text: "$1B – $10B DIRECT CO-INVESTMENT",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat31-c3-title",
                        type: "heading",
                        level: 3,
                        text: "Sovereign Wealth Fund Direct Mandates",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat31-c3-desc",
                        type: "text",
                        text: "Guiding Middle Eastern and Asian sovereign wealth funds through CFIUS national security reviews, foreign state immunity covenants, and bespoke governance governance structures.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat31-c3-link",
                        type: "link",
                        label: "Explore Sovereign Co-Investments →",
                        href: "/practices/sovereign-mandates",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Partner Consultation Link */
          {
            id: "feat31-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat31-partner-link",
                type: "link",
                label: "Request Confidential Advisory Briefing with Senior M&A Partner →",
                href: "/counsel/ma-briefing",
                openInNewTab: false,
                style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * FEATURE-32: Design Hotel · Curated Permanent Art Archive
 * Industry: Hotels & Luxury Hospitality
 * Layout: Monumental centered editorial monograph
 * Visual Family: Design Hotel / Museum Collection
 */
export const FEATURE_HOTEL_ART_COLLECTION_MONOGRAPH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-32-hotel-art-collection-monograph",
  name: "Design Hotel · Curated Permanent Art Archive",
  kind: "section",
  root: {
    id: "feat32-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat32-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
          typography: { align: "center" },
        },
        children: [
          /* Eyebrow & Main Monograph Title */
          {
            id: "feat32-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "feat32-badge",
                type: "badge",
                text: "THE PERMANENT ARCHIVE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat32-title",
                type: "heading",
                level: 2,
                text: "A living museum of post-war European abstraction",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Curatorial Essay Block */
          {
            id: "feat32-essay-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface", text: "text" },
              border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
              spacing: { padding: "2xl" },
            },
            children: [
              {
                id: "feat32-essay-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  {
                    id: "feat32-quote",
                    type: "text",
                    text: "“Art is not merely decorative ornamentation within these limestone walls; it constitutes the foundational philosophical architecture upon which every archway, private suite, and courtyard terrace is composed.”",
                    style: {
                      typography: { size: "xl", weight: "medium", leading: "relaxed" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat32-curator-attrib",
                    type: "text",
                    text: "— Julian De Vries, Conservator & Former Director of the Tate Collection",
                    style: {
                      typography: { family: "monospace", size: "sm", weight: "bold" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "feat32-body",
                    type: "text",
                    text: "Spread across our marble gallerias, private guest residences, and landscaped sculpture gardens, guests inhabit a permanent collection of 180 accessioned works spanning Alberto Burri, Lucio Fontana, and Eduardo Chillida. Private docent walkthroughs and catalog monographs are reserved for resident guests.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                ],
              },
            ],
          },

          /* Monograph Link */
          {
            id: "feat32-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat32-catalog-link",
                type: "link",
                label: "Request Private Curatorial Catalog & Gallery Viewing (Hardcover Edition) →",
                href: "/art/catalog-request",
                openInNewTab: false,
                style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * FEATURE-33: White-Collar Litigation · Rapid Subpoena Response Spotlight Banner
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: High-impact crisis callout card with direct emergency dispatch
 * Visual Family: Criminal Defense / Emergency Grand Jury Response
 */
export const FEATURE_LEGAL_CRISIS_HOTLINE_BANNER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-33-legal-crisis-hotline-banner",
  name: "White-Collar Litigation · Rapid Subpoena Response Spotlight Banner",
  kind: "section",
  root: {
    id: "feat33-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat33-container",
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
          /* Crisis Dock Card */
          {
            id: "feat33-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface", text: "text" },
              border: { radius: "xl", width: "thin", color: "primary", shadow: "sm" },
              spacing: { padding: "2xl" },
            },
            children: [
              {
                id: "feat33-card-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "lg",
                style: { typography: { align: "center" } },
                children: [
                  {
                    id: "feat33-badge",
                    type: "badge",
                    text: "24/7 STATUTORY DISPATCH · ZERO DELAY",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "full" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "md", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat33-heading",
                    type: "heading",
                    level: 2,
                    text: "Emergency Search Warrant or Federal Subpoena Served on Your Corporate Offices?",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat33-desc",
                    type: "text",
                    text: "Our senior trial defense partners deploy in person within 90 minutes across New York, London, Washington, and Zurich. Instruct security and executive staff not to consent to voluntary search or waive attorney-client privilege before lead defense counsel arrives.",
                    style: {
                      typography: { size: "lg", leading: "relaxed" },
                      color: { text: "text-muted" },
                      sizing: { maxWidth: "3xl" },
                    },
                  },
                  /* Primary Phone Dispatch Button */
                  {
                    id: "feat33-phone-btn",
                    type: "button",
                    label: "Emergency Dispatch Hotline: +1 (212) 555-0199",
                    href: "tel:+12125550199",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { size: "lg", weight: "bold" },
                      spacing: { paddingX: "2xl", paddingY: "lg" },
                    },
                  },
                  /* Encrypted Channel Link */
                  {
                    id: "feat33-signal-link",
                    type: "link",
                    label: "Encrypted Signal Dispatch Channel: @ChanceryEmergency →",
                    href: "https://signal.me/#p/chancery",
                    openInNewTab: true,
                    style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
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
 * FEATURE-34: Mountain Sanctuary · Corporate Board Summit Specs
 * Industry: Hotels & Luxury Hospitality
 * Layout: 3-column dense technical specs for sovereign summits
 * Visual Family: High-End Alpine Summit Retreat
 */
export const FEATURE_HOTEL_EXECUTIVE_RETREAT_SPECS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-34-hotel-executive-retreat-specs",
  name: "Mountain Sanctuary · Corporate Board Summit Specs",
  kind: "section",
  root: {
    id: "feat34-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat34-container",
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
          /* Header */
          {
            id: "feat34-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: {
              sizing: { maxWidth: "3xl", align: "center" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "feat34-badge",
                type: "badge",
                text: "SOVEREIGN SUMMIT INFRASTRUCTURE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat34-title",
                type: "heading",
                level: 2,
                text: "State-grade facilities for Fortune 50 boards and sovereign summits",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat34-desc",
                type: "text",
                text: "Combining five-star alpine hospitality with military-grade acoustic privacy, dedicated biometric perimeters, and redundant low-earth orbit telecommunications.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Dense Spec Grid */
          {
            id: "feat34-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Spec 1 */
              {
                id: "feat34-s1-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat34-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat34-s1-badge",
                        type: "badge",
                        text: "FACILITY SPECIFICATION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat34-s1-title",
                        type: "heading",
                        level: 3,
                        text: "Sovereign Boardroom Pavilion",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat34-s1-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "48 Handcrafted ergonomic Connolly leather armchairs",
                          "Dual 130-inch 4K Micro-LED telepresence wall with automated beamforming audio",
                          "STC 65 architectural acoustic isolation and white-noise perimeter baffling",
                          "Dedicated simultaneous translation and diplomatic stenography booths",
                        ],
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Spec 2 */
              {
                id: "feat34-s2-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat34-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat34-s2-badge",
                        type: "badge",
                        text: "TELECOM & TELEMETRY",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat34-s2-title",
                        type: "heading",
                        level: 3,
                        text: "SCIF-Ready Shielded Comms",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat34-s2-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Dual-redundant low-earth orbit satellite arrays with automatic failover",
                          "Dedicated 10Gbps symmetric dark fiber conduit to Zurich internet exchange",
                          "TEMPEST Level A RF shielding throughout sovereign annex suites",
                          "Private cryptographic switchboard with zero corporate network sharing",
                        ],
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Spec 3 */
              {
                id: "feat34-s3-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat34-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat34-s3-badge",
                        type: "badge",
                        text: "PHYSICAL SECURITY",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat34-s3-title",
                        type: "heading",
                        level: 3,
                        text: "VIP Dignitary Protection Protocols",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat34-s3-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Dual on-site ICAO-certified helipads with night instrument landing systems",
                          "Dedicated close-protection security officer quarters and weapons lockbox",
                          "Subterranean armored vehicle staging bay with private VIP elevator access",
                          "Biometric iris-scan authorization controlling entire executive summit wing",
                        ],
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer RFP Request Button */
          {
            id: "feat34-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat34-rfp-btn",
                type: "button",
                label: "Request Confidential Executive Summit RFP & Technical Dossier",
                href: "/summit/rfp",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { weight: "semibold" },
                  spacing: { paddingX: "xl", paddingY: "md" },
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
 * FEATURE-35: Boutique Appellate Bar · Chambers Creed & Jurisprudence
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: Minimalist, stark typography statement
 * Visual Family: Minimal / Pure Supreme Court Jurisprudence
 */
export const FEATURE_LEGAL_CHAMBERS_PHILOSOPHY_MINIMAL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-35-legal-chambers-philosophy-minimal",
  name: "Boutique Appellate Bar · Chambers Creed & Jurisprudence",
  kind: "section",
  root: {
    id: "feat35-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat35-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          /* Eyebrow */
          {
            id: "feat35-badge",
            type: "badge",
            text: "FOUNDING JURISPRUDENCE · EST. 1928",
            style: {
              color: { background: "surface-muted", text: "primary" },
              border: { radius: "full" },
              sizing: { width: "fit" },
              spacing: { paddingX: "md", paddingY: "xs" },
            },
          },

          /* Giant Monumental Creed */
          {
            id: "feat35-creed-headline",
            type: "heading",
            level: 2,
            text: "The law is not an exercise in procedural attrition. It is the unyielding pursuit of judicial clarity under constitutional scrutiny.",
            style: {
              typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" },
              color: { text: "text" },
            },
          },

          /* Explanatory Monograph */
          {
            id: "feat35-body",
            type: "text",
            text: "We do not maintain hundreds of billable associates. Our chambers accept exactly twelve appellate mandates each calendar year. When sovereign governments or the foundational survival of enterprise institutions hang in the balance, our senior advocates bring unrivaled intellectual mastery to the bar of the highest courts.",
            style: {
              typography: { size: "lg", leading: "relaxed" },
              color: { text: "text-muted" },
            },
          },

          /* Chambers Citation Bar */
          {
            id: "feat35-citation-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            style: {
              border: { width: "hairline", color: "border" },
              spacing: { paddingTop: "lg" },
            },
            children: [
              {
                id: "feat35-citation-text",
                type: "text",
                text: "Chambers of Senior Counsel · Lincoln's Inn, London · Supreme Court Bar, Washington D.C.",
                style: {
                  typography: { family: "monospace", size: "sm", weight: "medium" },
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

export const CURATED_FEATURE_BATCH_7: ComponentDocument[] = [
  FEATURE_LEGAL_MERGERS_ACQUISITIONS_TRIO_DOCUMENT,
  FEATURE_HOTEL_ART_COLLECTION_MONOGRAPH_DOCUMENT,
  FEATURE_LEGAL_CRISIS_HOTLINE_BANNER_DOCUMENT,
  FEATURE_HOTEL_EXECUTIVE_RETREAT_SPECS_DOCUMENT,
  FEATURE_LEGAL_CHAMBERS_PHILOSOPHY_MINIMAL_DOCUMENT,
];
