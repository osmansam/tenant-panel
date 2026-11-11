import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 6 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-26: Safari Lodge · Game Reserve Circuit Hub
 * Industry: Hotels & Luxury Hospitality
 * Layout: 4-card reserve circuit hub with destination points
 * Visual Family: Safari Sanctuary / Private Game Reserve
 */
export const FEATURE_HOTEL_DESTINATION_HOTSPOTS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-26-hotel-destination-hotspots",
  name: "Safari Lodge · Game Reserve Circuit Hub",
  kind: "section",
  root: {
    id: "feat26-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat26-container",
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
            id: "feat26-header",
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
                id: "feat26-badge",
                type: "badge",
                text: "75,000-ACRE PRIVATE CONCESSION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat26-title",
                type: "heading",
                level: 2,
                text: "The wilderness circuit hub and private wildlife vantage points",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat26-desc",
                type: "text",
                text: "From the elevated riverine tree canopy to the rocky leopard kopjes, track our reserve's premier wildlife circuits, subterranean hides, and sundowner vantage points.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Hub Grid */
          {
            id: "feat26-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Hub 1 */
              {
                id: "feat26-c1-cell",
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
                    id: "feat26-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat26-c1-icon",
                        type: "icon",
                        iconId: "map-pin",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c1-loc",
                        type: "text",
                        text: "NORTHERN RIVER BEND · MILE 4",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c1-title",
                        type: "heading",
                        level: 3,
                        text: "Submerged Riverine Hide",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat26-c1-desc",
                        type: "text",
                        text: "Eye-level bunker hide overlooking deep hippo pools and crocodile basking sandbars. Ideal for professional telephoto photography.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Hub 2 */
              {
                id: "feat26-c2-cell",
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
                    id: "feat26-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat26-c2-icon",
                        type: "icon",
                        iconId: "star",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c2-loc",
                        type: "text",
                        text: "CENTRAL GRANITE RIDGE",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c2-title",
                        type: "heading",
                        level: 3,
                        text: "Leopard Kopje Lookout",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat26-c2-desc",
                        type: "text",
                        text: "Ancient granite boulder outcropping with 360-degree savanna panoramas. Prime territory for territorial leopard sightings at dusk.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Hub 3 */
              {
                id: "feat26-c3-cell",
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
                    id: "feat26-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat26-c3-icon",
                        type: "icon",
                        iconId: "sparkles",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c3-loc",
                        type: "text",
                        text: "EASTERN SAVANNA EXPANSES",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c3-title",
                        type: "heading",
                        level: 3,
                        text: "Acacia Plains Tracking Circuit",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat26-c3-desc",
                        type: "text",
                        text: "Open grasslands hosting migrating zebra herds and cheetah coalitions. Off-road tracking permitted under resident master ranger guidance.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Hub 4 */
              {
                id: "feat26-c4-cell",
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
                    id: "feat26-c4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat26-c4-icon",
                        type: "icon",
                        iconId: "building-library",
                        size: 24,
                        decorative: true,
                        style: { color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c4-loc",
                        type: "text",
                        text: "SOUTHERN SECTOR · PAVED RUNWAY",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat26-c4-title",
                        type: "heading",
                        level: 3,
                        text: "Private Bush Airstrip Hangar",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat26-c4-desc",
                        type: "text",
                        text: "Direct all-weather runway accommodating turboprop charters up to King Air 350. On-site customs clearance and safari vehicle staging.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Map Link */
          {
            id: "feat26-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat26-map-link",
                type: "link",
                label: "Download High-Resolution Topographic Reserve Map (PDF) →",
                href: "/sanctuary/map.pdf",
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
 * FEATURE-27: Trial Injury Law · No-Fee-Unless-We-Win Problem/Solution Split
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 2-column contrast split highlighting financial risk elimination
 * Visual Family: Catastrophic Injury / Mass Tort Bar
 */
export const FEATURE_LEGAL_FEE_CONTINGENCY_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-27-legal-fee-contingency-split",
  name: "Trial Injury Law · No-Fee-Unless-We-Win Problem/Solution Split",
  kind: "section",
  root: {
    id: "feat27-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat27-container",
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
            id: "feat27-header",
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
                id: "feat27-badge",
                type: "badge",
                text: "ZERO-FINANCIAL-RISK ADVOCACY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat27-title",
                type: "heading",
                level: 2,
                text: "The difference between hourly billing and complete contingency alignment",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat27-desc",
                type: "text",
                text: "When catastrophic corporate negligence strikes, Fortune 500 insurers bet on exhausting your capital with procedural delays. We eliminate that leverage entirely.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Problem/Solution Split Grid */
          {
            id: "feat27-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: The Problem (Hourly Retainer) */
              {
                id: "feat27-col-problem",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat27-prob-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      {
                        id: "feat27-prob-badge",
                        type: "badge",
                        text: "TRADITIONAL DEFENSE FIRMS",
                        style: {
                          color: { background: "surface", text: "text-muted" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat27-prob-title",
                        type: "heading",
                        level: 3,
                        text: "The Burden of Runaway Monthly Invoices",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat27-prob-list",
                        type: "list",
                        marker: "bullet",
                        items: [
                          "Upfront $75,000 to $150,000 retainer required before filing initial summons",
                          "Client pays out-of-pocket for accident reconstruction & expert medical witnesses",
                          "Insurers drag discovery out over 36 months to force lowball settlements",
                          "Legal bills accrue continuously even if the lawsuit is dismissed or lost at trial",
                        ],
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: The Solution (Contingency Guarantee) */
              {
                id: "feat27-col-solution",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "primary", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat27-sol-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      {
                        id: "feat27-sol-badge",
                        type: "badge",
                        text: "OUR TRIAL ADVOCACY PROTOCOL",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat27-sol-title",
                        type: "heading",
                        level: 3,
                        text: "100% Risk Elimination & Advanced Trial Capital",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat27-sol-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Zero retainer fee and zero upfront legal charges of any kind whatsoever",
                          "We advance 100% of biomechanical experts, engineering forensics, and 3D animations",
                          "Unmatched trial war chest gives us parity against multinational insurance defense panels",
                          "Strict no-recovery, no-fee guarantee: We receive zero compensation unless we win",
                        ],
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Action Contingency Evaluation Button */
          {
            id: "feat27-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            style: { spacing: { paddingTop: "lg" } },
            children: [
              {
                id: "feat27-cta-btn",
                type: "button",
                label: "Request Free Confidential Case Evaluation",
                href: "/evaluation/contingency",
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
 * FEATURE-28: Metropolitan Club · Private Resident Membership Tiers
 * Industry: Hotels & Luxury Hospitality
 * Layout: 2-column exclusive invitation tiers
 * Visual Family: Private City Club / Heritage Hotel
 */
export const FEATURE_HOTEL_WELLNESS_MEMBERSHIP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-28-hotel-wellness-membership",
  name: "Metropolitan Club · Private Resident Membership Tiers",
  kind: "section",
  root: {
    id: "feat28-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat28-container",
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
          /* Header */
          {
            id: "feat28-header",
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
                id: "feat28-badge",
                type: "badge",
                text: "BY INVITATION ONLY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat28-title",
                type: "heading",
                level: 2,
                text: "A sanctuary of sovereign privilege in the heart of the capital",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat28-desc",
                type: "text",
                text: "Limited to 150 resident patrons worldwide. Membership confers unencumbered access to private state suites, our sommelier reserve vault, and discreet summit dining salons.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Tier Grid */
          {
            id: "feat28-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Tier 1: Resident Fellow */
              {
                id: "feat28-t1-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat28-t1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat28-t1-badge",
                        type: "badge",
                        text: "ANNUAL MANDATE · £25,000",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat28-t1-title",
                        type: "heading",
                        level: 3,
                        text: "Resident Fellow Patron",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat28-t1-desc",
                        type: "text",
                        text: "Curated for metropolitan executives requiring private residential hosting, discreet boardroom salons, and wellness pavilion access.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat28-t1-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Guaranteed suite allocations with 48-hour release privilege",
                          "Access to subterranean hydrotherapy spa & private thermal lap pool",
                          "Private dining salon booking privileges with customized sommelier cellar pairing",
                          "Dedicated Resident Butler liaison during all on-property visits",
                        ],
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "feat28-t1-btn",
                        type: "button",
                        label: "Request Fellow Candidate Dossier",
                        href: "/membership/fellow",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "md" },
                          typography: { weight: "semibold" },
                          spacing: { paddingX: "lg", paddingY: "md" },
                        },
                      },
                    ],
                  },
                ],
              },

              /* Tier 2: Sovereign Patron */
              {
                id: "feat28-t2-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "primary", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat28-t2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat28-t2-badge",
                        type: "badge",
                        text: "ANNUAL MANDATE · £65,000",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat28-t2-title",
                        type: "heading",
                        level: 3,
                        text: "Sovereign Global Patron",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat28-t2-desc",
                        type: "text",
                        text: "Reserved for international family principals and sovereign ambassadors seeking complete privacy, security, and global reciprocation.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat28-t2-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Automatic complimentary upgrades to Grand Presidential Suites",
                          "Exclusive keycard access to rooftop cigar terrace & private spirits cellar",
                          "Direct tarmac helipad transfer service at all partner metropolitan airports",
                          "Reciprocal diplomatic privileges across 14 sovereign global partner clubs",
                        ],
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "feat28-t2-btn",
                        type: "button",
                        label: "Request Sponsor Introduction",
                        href: "/membership/sovereign",
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
        ],
      },
    ],
  },
};

/**
 * FEATURE-29: Patent Bar · IP Protection Pipeline Rail
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: 4-stage horizontal process rail with technical milestones
 * Visual Family: Patent Prosecution & Trade Secrets Bar
 */
export const FEATURE_LEGAL_INTELLECTUAL_PROPERTY_AUDIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-29-legal-intellectual-property-audit",
  name: "Patent Bar · IP Protection Pipeline Rail",
  kind: "section",
  root: {
    id: "feat29-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat29-container",
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
            id: "feat29-header",
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
                id: "feat29-badge",
                type: "badge",
                text: "GLOBAL PATENT PROSECUTION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat29-title",
                type: "heading",
                level: 2,
                text: "From invention disclosure to International Trade Commission enforcement",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat29-desc",
                type: "text",
                text: "We protect groundbreaking hardware architectures, biotechnology compounds, and algorithmic assets against state-sponsored misappropriation and counterfeit entry.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Stage Horizontal Pipeline Grid */
          {
            id: "feat29-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Stage 1 */
              {
                id: "feat29-s1-cell",
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
                    id: "feat29-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat29-s1-phase",
                        type: "text",
                        text: "PHASE 01 · CLEARANCE",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat29-s1-title",
                        type: "heading",
                        level: 3,
                        text: "Freedom-to-Operate",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat29-s1-desc",
                        type: "text",
                        text: "Exhaustive prior art landscape search across USPTO, EPO, and WIPO databases to uncover competitive patent thickets before commercial rollout.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "feat29-s2-cell",
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
                    id: "feat29-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat29-s2-phase",
                        type: "text",
                        text: "PHASE 02 · PROSECUTION",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat29-s2-title",
                        type: "heading",
                        level: 3,
                        text: "Fast-Track PCT Filings",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat29-s2-desc",
                        type: "text",
                        text: "Petitions to Make Special and Track One acceleration securing broad, enforceable claim allowances within 12 calendar months.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "feat29-s3-cell",
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
                    id: "feat29-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat29-s3-phase",
                        type: "text",
                        text: "PHASE 03 · PTAB DEFENSE",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat29-s3-title",
                        type: "heading",
                        level: 3,
                        text: "Inter Partes Review (IPR)",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat29-s3-desc",
                        type: "text",
                        text: "Formidable courtroom advocacy defending granted claim validity before administrative patent judges against competitor invalidation bids.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "feat29-s4-cell",
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
                    id: "feat29-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "feat29-s4-phase",
                        type: "text",
                        text: "PHASE 04 · ENFORCEMENT",
                        style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat29-s4-title",
                        type: "heading",
                        level: 3,
                        text: "ITC Section 337 Exclusion",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat29-s4-desc",
                        type: "text",
                        text: "Securing swift federal exclusion orders at U.S. ports of entry to block foreign infringing semiconductor, medical device, and software imports.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Action Audit CTA */
          {
            id: "feat29-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat29-cta-btn",
                type: "button",
                label: "Initiate Global Patent Portfolio Audit",
                href: "/patent/audit-request",
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
 * FEATURE-30: Island Resort · Yacht & Heli Charters Asymmetric Split
 * Industry: Hotels & Luxury Hospitality
 * Layout: Asymmetric split with 1 dominant expedition card and 2 monograph cards
 * Visual Family: Island Sanctuary / High-End Yachting
 */
export const FEATURE_HOTEL_CURATED_EXCURSIONS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-30-hotel-curated-excursions",
  name: "Island Resort · Yacht & Heli Charters Asymmetric Split",
  kind: "section",
  root: {
    id: "feat30-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat30-container",
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
            id: "feat30-header",
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
                id: "feat30-badge",
                type: "badge",
                text: "EXPEDITION MONOGRAPHS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat30-title",
                type: "heading",
                level: 2,
                text: "Private charters tailored beyond the edge of charted waters",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat30-desc",
                type: "text",
                text: "Unbound maritime and aerial expeditions coordinated exclusively by our resident expedition master for our private villa guests.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Asymmetric Split Grid */
          {
            id: "feat30-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Dominant Card (8 cols) */
              {
                id: "feat30-dominant-cell",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat30-dom-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "feat30-dom-badge",
                        type: "badge",
                        text: "FLAGSHIP MARITIME EXPEDITION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat30-dom-title",
                        type: "heading",
                        level: 3,
                        text: "Outer-Reef 120ft Superyacht Exploration",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "feat30-dom-desc",
                        type: "text",
                        text: "Sail beyond the lagoon barrier into uninhabited oceanic atolls. Equipped with full nitrox scuba decompression gear, resident marine biologist guide, open-deck teppanyaki master chef, and Seabob underwater scooters.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "feat30-dom-specs",
                        type: "text",
                        text: "10 Guests Max · 24-Hour Horizon Range · Full Tender Support · Private Staterooms",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                      {
                        id: "feat30-dom-link",
                        type: "link",
                        label: "Inquire Superyacht Charter Itinerary →",
                        href: "/charters/superyacht-120",
                        openInNewTab: false,
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Stacked Column (4 cols) */
              {
                id: "feat30-side-stack",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  /* Side Card 1 */
                  {
                    id: "feat30-side-c1",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat30-sc1-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "feat30-sc1-tag",
                            type: "text",
                            text: "AERIAL VOLCANO SAFARI",
                            style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "feat30-sc1-title",
                            type: "heading",
                            level: 4,
                            text: "Twin-Turbine Volcano Heli-Flight",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "feat30-sc1-desc",
                            type: "text",
                            text: "Aerial descent into active volcanic calderas with champagne landing on private black obsidian beaches.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  /* Side Card 2 */
                  {
                    id: "feat30-side-c2",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface", text: "text" },
                      border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                      spacing: { padding: "lg" },
                    },
                    children: [
                      {
                        id: "feat30-sc2-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "feat30-sc2-tag",
                            type: "text",
                            text: "BIG GAME EXPEDITION",
                            style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "feat30-sc2-title",
                            type: "heading",
                            level: 4,
                            text: "Deep-Sea Pelagic Game Fishing",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "feat30-sc2-desc",
                            type: "text",
                            text: "Tournament-rigged 45ft sportfisher pursuing blue marlin and yellowfin tuna with satellite telemetry.",
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

          /* Footer Charter Link */
          {
            id: "feat30-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "feat30-charter-link",
                type: "link",
                label: "View Full Seasonal Expedition Monograph →",
                href: "/expeditions/catalog",
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

export const CURATED_FEATURE_BATCH_6: ComponentDocument[] = [
  FEATURE_HOTEL_DESTINATION_HOTSPOTS_DOCUMENT,
  FEATURE_LEGAL_FEE_CONTINGENCY_SPLIT_DOCUMENT,
  FEATURE_HOTEL_WELLNESS_MEMBERSHIP_DOCUMENT,
  FEATURE_LEGAL_INTELLECTUAL_PROPERTY_AUDIT_DOCUMENT,
  FEATURE_HOTEL_CURATED_EXCURSIONS_DOCUMENT,
];

