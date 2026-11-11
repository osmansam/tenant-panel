import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 5 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-21: Boutique Chancery · Encrypted Client Vault & Dossier Portal
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: Split portal layout with simulated FIPS 140-3 case vault telemetry
 * Visual Family: Corporate Chancery / Secure Legal Tech
 */
export const FEATURE_LEGAL_CLIENT_PORTAL_MOCKUP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-21-legal-client-portal-mockup",
  name: "Boutique Chancery · Encrypted Client Vault & Dossier Portal",
  kind: "section",
  root: {
    id: "feat21-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat21-container",
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
            id: "feat21-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Editorial & Telemetry Overview (5 cols) */
              {
                id: "feat21-left-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  {
                    id: "feat21-badge",
                    type: "badge",
                    text: "FIPS 140-3 ENCRYPTED VAULT",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "full" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "md", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat21-title",
                    type: "heading",
                    level: 2,
                    text: "Direct sovereign access to your privileged case docket",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat21-desc",
                    type: "text",
                    text: "General Counsel and executive officers receive hardware-authenticated, end-to-end encrypted telemetry on active depositions, appellate motions, and settlement matrices in real time.",
                    style: {
                      typography: { size: "base", leading: "relaxed" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "feat21-features-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat21-feat-1",
                        type: "stack",
                        direction: "row",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "feat21-f1-icon",
                            type: "icon",
                            iconId: "shield-check",
                            size: 24,
                            decorative: true,
                            style: { color: { text: "primary" } },
                          },
                          {
                            id: "feat21-f1-text",
                            type: "text",
                            text: "Zero-knowledge cryptographic boundaries ensure confidential work-product remains uncompromised.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "feat21-feat-2",
                        type: "stack",
                        direction: "row",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "feat21-f2-icon",
                            type: "icon",
                            iconId: "check-badge",
                            size: 24,
                            decorative: true,
                            style: { color: { text: "primary" } },
                          },
                          {
                            id: "feat21-f2-text",
                            type: "text",
                            text: "Immutable audit log timestamps every document inspection with cryptographic SHA-256 proofs.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "feat21-cta-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat21-cta-btn",
                        type: "button",
                        label: "Request Client Portal Access",
                        href: "/portal/login",
                        style: {
                          color: { background: "primary", text: "primary-foreground" },
                          border: { radius: "md" },
                          typography: { weight: "semibold" },
                          spacing: { paddingX: "lg", paddingY: "md" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Simulated Client Portal UI Card (7 cols) */
              {
                id: "feat21-right-col",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                children: [
                  {
                    id: "feat21-portal-frame",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat21-portal-inner",
                        type: "stack",
                        direction: "column",
                        alignment: "stretch",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          /* Portal Top Header Bar */
                          {
                            id: "feat21-p-header",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            style: {
                              border: { width: "hairline", color: "border" },
                              spacing: { paddingY: "sm" },
                            },
                            children: [
                              {
                                id: "feat21-p-case",
                                type: "text",
                                text: "In re Meridian Sovereign Holdings Ltd. (SDNY No. 24-CV-8891)",
                                style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                              },
                              {
                                id: "feat21-p-meta",
                                type: "text",
                                text: "Lead Counsel: Vance & Thorne, P.C. · Classification: Top-Secret / Confidential Work Product",
                                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                              },
                            ],
                          },

                          /* Docket Entry 1 */
                          {
                            id: "feat21-entry-1",
                            type: "card",
                            element: "div",
                            style: {
                              color: { background: "surface-muted", text: "text" },
                              border: { radius: "md", width: "hairline", color: "border" },
                              spacing: { padding: "md" },
                            },
                            children: [
                              {
                                id: "feat21-e1-row",
                                type: "stack",
                                direction: "row",
                                alignment: "center",
                                distribution: "between",
                                wrap: false,
                                gap: "md",
                                children: [
                                  {
                                    id: "feat21-e1-text-stack",
                                    type: "stack",
                                    direction: "column",
                                    alignment: "start",
                                    distribution: "start",
                                    wrap: false,
                                    gap: "xs",
                                    children: [
                                      {
                                        id: "feat21-e1-title",
                                        type: "text",
                                        text: "Motion to Dismiss Contested Interrogatories",
                                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                                      },
                                      {
                                        id: "feat21-e1-court",
                                        type: "text",
                                        text: "Filed with SDNY Clerk · Assigned to Hon. Katherine Faulk",
                                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                      },
                                    ],
                                  },
                                  {
                                    id: "feat21-e1-badge",
                                    type: "badge",
                                    text: "GRANTED",
                                    style: {
                                      color: { background: "surface", text: "primary" },
                                      border: { radius: "full" },
                                      spacing: { paddingX: "sm", paddingY: "xs" },
                                    },
                                  },
                                ],
                              },
                            ],
                          },

                          /* Docket Entry 2 */
                          {
                            id: "feat21-entry-2",
                            type: "card",
                            element: "div",
                            style: {
                              color: { background: "surface-muted", text: "text" },
                              border: { radius: "md", width: "hairline", color: "border" },
                              spacing: { padding: "md" },
                            },
                            children: [
                              {
                                id: "feat21-e2-row",
                                type: "stack",
                                direction: "row",
                                alignment: "center",
                                distribution: "between",
                                wrap: false,
                                gap: "md",
                                children: [
                                  {
                                    id: "feat21-e2-text-stack",
                                    type: "stack",
                                    direction: "column",
                                    alignment: "start",
                                    distribution: "start",
                                    wrap: false,
                                    gap: "xs",
                                    children: [
                                      {
                                        id: "feat21-e2-title",
                                        type: "text",
                                        text: "Vol. IV Expert Forensic Audit & Damages Matrix",
                                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                                      },
                                      {
                                        id: "feat21-e2-court",
                                        type: "text",
                                        text: "284 Pages · Redacted Confidential Version (SHA-256 e8f4...b901)",
                                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                      },
                                    ],
                                  },
                                  {
                                    id: "feat21-e2-badge",
                                    type: "badge",
                                    text: "SEALED",
                                    style: {
                                      color: { background: "surface", text: "primary" },
                                      border: { radius: "full" },
                                      spacing: { paddingX: "sm", paddingY: "xs" },
                                    },
                                  },
                                ],
                              },
                            ],
                          },

                          /* Docket Entry 3 */
                          {
                            id: "feat21-entry-3",
                            type: "card",
                            element: "div",
                            style: {
                              color: { background: "surface-muted", text: "text" },
                              border: { radius: "md", width: "hairline", color: "border" },
                              spacing: { padding: "md" },
                            },
                            children: [
                              {
                                id: "feat21-e3-row",
                                type: "stack",
                                direction: "row",
                                alignment: "center",
                                distribution: "between",
                                wrap: false,
                                gap: "md",
                                children: [
                                  {
                                    id: "feat21-e3-text-stack",
                                    type: "stack",
                                    direction: "column",
                                    alignment: "start",
                                    distribution: "start",
                                    wrap: false,
                                    gap: "xs",
                                    children: [
                                      {
                                        id: "feat21-e3-title",
                                        type: "text",
                                        text: "Bilateral Settlement Term Sheet (In-Camera Review)",
                                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                                      },
                                      {
                                        id: "feat21-e3-court",
                                        type: "text",
                                        text: "Special Master Mediation Session · London Chambers Scheduled",
                                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                      },
                                    ],
                                  },
                                  {
                                    id: "feat21-e3-badge",
                                    type: "badge",
                                    text: "ACTIVE",
                                    style: {
                                      color: { background: "surface", text: "primary" },
                                      border: { radius: "full" },
                                      spacing: { paddingX: "sm", paddingY: "xs" },
                                    },
                                  },
                                ],
                              },
                            ],
                          },

                          /* Security Telemetry Footer */
                          {
                            id: "feat21-telemetry-bar",
                            type: "text",
                            text: "Live Telemetry: FIPS 140-3 Hardware Token Validated · Active Session ID: #MN-992-SEC",
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
    ],
  },
};

/**
 * FEATURE-22: Tropical Atoll · Overwater Villas Visual Showcase
 * Industry: Hotels & Luxury Hospitality
 * Layout: Horizontal showcase cards with flagship villa architectural specs
 * Visual Family: Island Sanctuary / Overwater Haven
 */
export const FEATURE_HOTEL_SIGNATURE_VILLAS_CAROUSEL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-22-hotel-signature-villas-carousel",
  name: "Tropical Atoll · Overwater Villas Visual Showcase",
  kind: "section",
  root: {
    id: "feat22-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat22-container",
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
            id: "feat22-header",
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
                id: "feat22-badge",
                type: "badge",
                text: "THE ATOLL RESIDENCES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat22-title",
                type: "heading",
                level: 2,
                text: "Architectural residences suspended above crystal waters",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat22-desc",
                type: "text",
                text: "Each standalone sanctuary features cantilevered ironwood decks, private saltwater infinity pools, and discrete tender moorings.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Card Villa Collection Grid */
          {
            id: "feat22-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Villa 1: Grand Coral Pavilion */
              {
                id: "feat22-v1-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat22-v1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat22-v1-badge",
                        type: "badge",
                        text: "FLAGSHIP RESIDENCE",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat22-v1-title",
                        type: "heading",
                        level: 3,
                        text: "Grand Coral Pavilion (3-Bed)",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat22-v1-desc",
                        type: "text",
                        text: "850 m² residence with dual private lap pools, glass-bottom dining salon, and dedicated 24-hour butler team.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat22-v1-spec",
                        type: "text",
                        text: "Direct reef mooring · Teppanyaki terrace · Private sauna",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat22-v1-link",
                        type: "link",
                        label: "View Pavilion Layout & Availability →",
                        href: "/villas/grand-coral",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Villa 2: Sunset Ocean Villa */
              {
                id: "feat22-v2-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat22-v2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat22-v2-badge",
                        type: "badge",
                        text: "SUNSET JETTY",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat22-v2-title",
                        type: "heading",
                        level: 3,
                        text: "Sunset Ocean Villa (1-Bed)",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat22-v2-desc",
                        type: "text",
                        text: "320 m² overwater retreat with western horizon exposure, outdoor rain shower, and sunken overwater sunbeds.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat22-v2-spec",
                        type: "text",
                        text: "Sunset vantage · Unrestricted snorkeling access",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat22-v2-link",
                        type: "link",
                        label: "View Villa Layout & Availability →",
                        href: "/villas/sunset-ocean",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Villa 3: Lagoon Wellness Villa */
              {
                id: "feat22-v3-cell",
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
                    id: "feat22-v3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat22-v3-badge",
                        type: "badge",
                        text: "AYURVEDIC SANCTUARY",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat22-v3-title",
                        type: "heading",
                        level: 3,
                        text: "Lagoon Wellness Villa",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat22-v3-desc",
                        type: "text",
                        text: "410 m² holistic compound featuring a private herbal steam room, ocean meditation deck, and direct treatment room.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat22-v3-spec",
                        type: "text",
                        text: "Private sauna · Dedicated practitioner treatment deck",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat22-v3-link",
                        type: "link",
                        label: "View Wellness Layout & Availability →",
                        href: "/villas/lagoon-wellness",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Navigation Note (visual-only showcase indicator) */
          {
            id: "feat22-note",
            type: "text",
            text: "Residence Enclave 01 of 03 · Private estate reservations require minimum 4-night stay",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

/**
 * FEATURE-23: Government Inquiries · 3-Stage Regulatory Defense Shield
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 3-stage vertical defense pipeline with timeline badges
 * Visual Family: White-Collar Defense / Special Investigations
 */
export const FEATURE_LEGAL_INVESTIGATION_DEFENSE_STEPS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-23-legal-investigation-defense-steps",
  name: "Government Inquiries · 3-Stage Regulatory Defense Shield",
  kind: "section",
  root: {
    id: "feat23-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat23-container",
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
          /* Header */
          {
            id: "feat23-header",
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
                id: "feat23-badge",
                type: "badge",
                text: "STATUTORY CRISIS PROTOCOLS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat23-title",
                type: "heading",
                level: 2,
                text: "The 3-stage defense shield when regulatory subpoenas land",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat23-desc",
                type: "text",
                text: "When the DOJ, SEC, or FTC serves unexpected civil investigative demands, uncoordinated responses guarantee liability. We seize procedural control immediately.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Stage Vertical Stack */
          {
            id: "feat23-stages-stack",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "lg",
            children: [
              /* Stage 1 */
              {
                id: "feat23-s1-card",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat23-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat23-s1-top",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "feat23-s1-badge",
                            type: "badge",
                            text: "STAGE 01 · HOURS 0–24",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "md" },
                              spacing: { paddingX: "sm", paddingY: "xs" },
                            },
                          },
                          {
                            id: "feat23-s1-title",
                            type: "heading",
                            level: 3,
                            text: "Preservation Holds & Investigator Interface",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "feat23-s1-desc",
                        type: "text",
                        text: "Issue sweeping litigation holds across all server backups and messaging platforms to defeat spoliation allegations. Enter formal appearances and establish that all staff interviews must proceed through defense counsel.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "feat23-s2-card",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat23-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat23-s2-top",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "feat23-s2-badge",
                            type: "badge",
                            text: "STAGE 02 · DAYS 2–14",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "md" },
                              spacing: { paddingX: "sm", paddingY: "xs" },
                            },
                          },
                          {
                            id: "feat23-s2-title",
                            type: "heading",
                            level: 3,
                            text: "Privileged Internal Fact-Finding & Upjohn Warnings",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "feat23-s2-desc",
                        type: "text",
                        text: "Deploy forensic accounting teams and independent investigators to unearth the factual record before government agents do. Conduct Upjohn-shielded interviews to protect corporate attorney-client privilege.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "feat23-s3-card",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat23-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat23-s3-top",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "feat23-s3-badge",
                            text: "STAGE 03 · DAYS 15–45",
                            type: "badge",
                            style: {
                              color: { background: "surface-muted", text: "primary" },
                              border: { radius: "md" },
                              spacing: { paddingX: "sm", paddingY: "xs" },
                            },
                          },
                          {
                            id: "feat23-s3-title",
                            type: "heading",
                            level: 3,
                            text: "Affirmative Proffers & Enforcement Preemption",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "feat23-s3-desc",
                        type: "text",
                        text: "Deliver persuasive white papers to Section Chiefs highlighting statutory deficiencies and compliance remediations. Negotiate declination of charges or sealed non-prosecution agreements.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Action Retainer CTA */
          {
            id: "feat23-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat23-cta-btn",
                type: "button",
                label: "Activate 24/7 Regulatory Defense Retainer",
                href: "/retainer/emergency",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { weight: "semibold" },
                  spacing: { paddingX: "lg", paddingY: "md" },
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
 * FEATURE-24: Eco-Luxury Reserve · Zero-Carbon Hospitality Pillars
 * Industry: Hotels & Luxury Hospitality
 * Layout: 4-pillar compact icon matrix with ESG metrics
 * Visual Family: Nature Sanctuary / Regenerative Reserve
 */
export const FEATURE_HOTEL_SUSTAINABLE_PRACTICES_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-24-hotel-sustainable-practices",
  name: "Eco-Luxury Reserve · Zero-Carbon Hospitality Pillars",
  kind: "section",
  root: {
    id: "feat24-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat24-container",
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
          /* Centered Header */
          {
            id: "feat24-header",
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
                id: "feat24-badge",
                type: "badge",
                text: "REGENERATIVE HOSPITALITY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat24-title",
                type: "heading",
                level: 2,
                text: "Preserving pristine biodiversity with zero carbon compromise",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat24-desc",
                type: "text",
                text: "Our ocean sanctuary generates 100% of its own solar power, desalinates local water with zero effluent discharge, and preserves 1,200 hectares of virgin barrier reef.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Pillar Grid */
          {
            id: "feat24-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Pillar 1 */
              {
                id: "feat24-p1-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat24-p1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat24-p1-icon",
                        type: "icon",
                        iconId: "sparkles",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p1-title",
                        type: "heading",
                        level: 3,
                        text: "100% Microgrid Solar",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat24-p1-stat",
                        type: "text",
                        text: "3.2 MW Island Array",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p1-desc",
                        type: "text",
                        text: "Silent off-grid solar and maritime battery storage powering every guest residence without diesel generators.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Pillar 2 */
              {
                id: "feat24-p2-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat24-p2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat24-p2-icon",
                        type: "icon",
                        iconId: "shield-check",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p2-title",
                        type: "heading",
                        level: 3,
                        text: "Zero-Single-Use Sanctuary",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat24-p2-stat",
                        type: "text",
                        text: "99.8% Waste Diversion",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p2-desc",
                        type: "text",
                        text: "Closed-loop organic composting, on-site glass bottling, and fully biodegradable organic amenities.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Pillar 3 */
              {
                id: "feat24-p3-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat24-p3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat24-p3-icon",
                        type: "icon",
                        iconId: "scale",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p3-title",
                        type: "heading",
                        level: 3,
                        text: "Marine Biologist Lab",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat24-p3-stat",
                        type: "text",
                        text: "14,000 Coral Frags",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p3-desc",
                        type: "text",
                        text: "Resident marine scientists conducting active reef restoration, available for private guest research expeditions.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Pillar 4 */
              {
                id: "feat24-p4-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat24-p4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat24-p4-icon",
                        type: "icon",
                        iconId: "star",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p4-title",
                        type: "heading",
                        level: 3,
                        text: "Local Terroir Sourcing",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat24-p4-stat",
                        type: "text",
                        text: "85% Within 50 Miles",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat24-p4-desc",
                        type: "text",
                        text: "Hyper-seasonal organic estate gardens and sustainable artisanal fishermen providing wild-caught seafood.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* ESG Audit Link */
          {
            id: "feat24-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat24-audit-link",
                type: "link",
                label: "Download Annual ESG & Marine Conservation Audit (PDF) →",
                href: "/sustainability/audit.pdf",
                openInNewTab: true,
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
 * FEATURE-25: International Bar · Chambers Honors & Bar Accolades
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 6-badge pedigree cluster with Band-1 rankings
 * Visual Family: Corporate Chancery / Appellate Bar
 */
export const FEATURE_LEGAL_CHAMBERS_PEDIGREE_LOGOS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-25-legal-chambers-pedigree-logos",
  name: "International Bar · Chambers Honors & Bar Accolades",
  kind: "section",
  root: {
    id: "feat25-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat25-container",
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
          /* Header Stack */
          {
            id: "feat25-header",
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
                id: "feat25-badge",
                type: "badge",
                text: "INDEPENDENT JUDICIAL STANDINGS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat25-title",
                type: "heading",
                level: 2,
                text: "Peerless trial pedigree across federal and international courts",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat25-desc",
                type: "text",
                text: "Consistently ranked in Band 1 across Chambers Global, The Legal 500, and Benchmark Litigation for bet-the-company commercial disputes.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 6-Badge Pedigree Grid */
          {
            id: "feat25-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Badge 1 */
              {
                id: "feat25-b1-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat25-b1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat25-b1-rank",
                        type: "text",
                        text: "CHAMBERS GLOBAL 2026",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat25-b1-title",
                        type: "heading",
                        level: 3,
                        text: "Band 1: High-Stakes Litigation",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat25-b1-desc",
                        type: "text",
                        text: "Celebrated for formidable courtroom presence and tactical precision in complex cross-border trials.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Badge 2 */
              {
                id: "feat25-b2-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat25-b2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat25-b2-rank",
                        type: "text",
                        text: "THE LEGAL 500",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat25-b2-title",
                        type: "heading",
                        level: 3,
                        text: "Tier 1: Supreme Court Advocacy",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat25-b2-desc",
                        type: "text",
                        text: "The gold standard for legal writing and constitutional jurisprudence in appellate challenges.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Badge 3 */
              {
                id: "feat25-b3-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat25-b3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat25-b3-rank",
                        type: "text",
                        text: "GLOBAL ARBITRATION REVIEW",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat25-b3-title",
                        type: "heading",
                        level: 3,
                        text: "GAR 30 Elite Arbitration Practice",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat25-b3-desc",
                        type: "text",
                        text: "Trusted lead counsel in bilateral investment treaty arbitrations exceeding $1B in sovereign disputes.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Badge 4 */
              {
                id: "feat25-b4-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat25-b4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat25-b4-rank",
                        type: "text",
                        text: "BENCHMARK LITIGATION",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat25-b4-title",
                        type: "heading",
                        level: 3,
                        text: "Trial Firm of the Year",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat25-b4-desc",
                        type: "text",
                        text: "Unrivaled track record defeating federal regulatory indictments and antitrust class actions.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Badge 5 */
              {
                id: "feat25-b5-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat25-b5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat25-b5-rank",
                        type: "text",
                        text: "AMERICAN COLLEGE OF TRIAL LAWYERS",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat25-b5-title",
                        type: "heading",
                        level: 3,
                        text: "14 Inducted Senior Fellows",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat25-b5-desc",
                        type: "text",
                        text: "Fellowship reserved exclusively for advocates who have demonstrated peerless master-level advocacy.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Badge 6 */
              {
                id: "feat25-b6-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "feat25-b6-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "feat25-b6-rank",
                        type: "text",
                        text: "FINANCIAL TIMES INNOVATIVE LAWYERS",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat25-b6-title",
                        type: "heading",
                        level: 3,
                        text: "Standout: Sovereign Restructuring",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat25-b6-desc",
                        type: "text",
                        text: "Pioneering creative treaty structures in multinational sovereign bond restructuring.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Citations Link */
          {
            id: "feat25-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat25-directory-link",
                type: "link",
                label: "Explore Full Chambers & Legal 500 Citations Directory →",
                href: "/credentials/accreditations",
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

export const CURATED_FEATURE_BATCH_5: ComponentDocument[] = [
  FEATURE_LEGAL_CLIENT_PORTAL_MOCKUP_DOCUMENT,
  FEATURE_HOTEL_SIGNATURE_VILLAS_CAROUSEL_DOCUMENT,
  FEATURE_LEGAL_INVESTIGATION_DEFENSE_STEPS_DOCUMENT,
  FEATURE_HOTEL_SUSTAINABLE_PRACTICES_DOCUMENT,
  FEATURE_LEGAL_CHAMBERS_PEDIGREE_LOGOS_DOCUMENT,
];
