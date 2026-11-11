import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 11: Water Sports & Yacht Charters (#51–#55)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 51: Dual-Concession Indemnity Split Screen (6/6 split: Concession Zone vs Operator Indemnity)
 * 52: MYBA Charter Agreement Term Sheet & 30% APA Escrow Ledger (Parchment term sheet & ledger)
 * 53: 4-Stage Port of Entry Transit Sequence (Horizontal process rail: Entry -> Transit -> Cabotage -> Clearance)
 * 54: Tabular Maritime Labor Registry & MLC Compliance Schedule (Hairline gazette table)
 * 55: Minimalist Archaeological Monograph with Dive Sanctuary Pull-Quote (Serif editorial with seal)
 * ============================================================================
 */

/**
 * PRACTICE-51: Beach Concessions & Water Sports Liability Deck
 * Layout Archetype: Dual-Concession Indemnity Split Screen (6/6 split)
 */
export const PRACTICE_51_WATERSPORTS_CONCESSION_LIABILITY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-51-watersports-concession-liability",
  name: "Beach Concessions · Jet Ski & Water Sports Dual Indemnity Split Screen",
  kind: "section",
  root: {
    id: "prac51-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac51-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac51-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac51-badge",
                type: "badge",
                text: "MARITIME TOURISM CONCESSION · LİMAN BAŞKANLIĞI SAFETY CIRCULARS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac51-heading",
                type: "heading",
                level: 2,
                text: "Resort Beach Concession & Water Sports Liability Split",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac51-sub",
                type: "text",
                text: "Operating jet skis, parasailing, and seabobs requires dual-layer statutory ringfencing: Port Authority maritime safety demarcations and guest bilateral indemnity defense.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Split Screen (6/6) */
          {
            id: "prac51-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Port Concession & Navigational Corridor (6-col) */
              {
                id: "prac51-col-left",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac51-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac51-left-tag",
                        type: "badge",
                        text: "ZONE A: MUNICIPAL & HARBOR CONCESSION",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "sm" },
                        },
                      },
                      {
                        id: "prac51-left-title",
                        type: "heading",
                        level: 3,
                        text: "200-Meter Motorized Safety Corridor Demarcation",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac51-left-desc",
                        type: "text",
                        text: "Under Ministry of Transport decrees, motorized craft must transit idle within 200m of the swimming boundary. Failure to maintain physical buoy lines triggers immediate criminal seizure and loss of hotel operating permit.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac51-left-divider",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac51-left-stat-box",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        style: {
                          color: { background: "surface-muted" },
                          border: { radius: "md" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac51-left-stat-label",
                            type: "text",
                            text: "MANDATORY HARBOR PERMIT HOLDER",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac51-left-stat-val",
                            type: "text",
                            text: "Turizm Amaçlı Sportif Faaliyet İzin Belgesi",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac51-left-stat-note",
                            type: "text",
                            text: "Requires annual seaworthiness inspection, certified rescue captain, and 24/7 dedicated rescue rib on station.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac51-left-btn",
                        type: "button",
                        label: "Audit Harbor Concession Boundary",
                        style: { sizing: { width: "full" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Operator Bilateral Waiver & Third-Party Policy (6-col) */
              {
                id: "prac51-col-right",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac51-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac51-right-tag",
                        type: "badge",
                        text: "ZONE B: BILATERAL INDEMNITY & WAIVER",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "sm" },
                        },
                      },
                      {
                        id: "prac51-right-title",
                        type: "heading",
                        level: 3,
                        text: "Multilingual Guest Assumption of Risk Matrix",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac51-right-desc",
                        type: "text",
                        text: "Enforceable waivers under Turkish Code of Obligations (TBK Art. 115) require affirmative acknowledgement of intrinsic marine risks, verified blood alcohol checks, and primary P&I insurance priority clauses.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac51-right-divider",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac51-right-stat-box",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        style: {
                          color: { background: "surface-muted" },
                          border: { radius: "md" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac51-right-stat-label",
                            type: "text",
                            text: "THIRD-PARTY CASUALTY ESCROW COVERAGE",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac51-right-stat-val",
                            type: "text",
                            text: "€2,500,000 P&I Marine Underwriting Limit",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac51-right-stat-note",
                            type: "text",
                            text: "Direct recourse exclusion shielding hotel master leaseholder against third-party concessionaire negligence.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac51-right-btn",
                        type: "button",
                        label: "Draft Enforceable Guest Waiver Protocol",
                        style: { sizing: { width: "full" } },
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
 * PRACTICE-52: Luxury Yachting · MYBA Superyacht Charter Agreement & Fuel Dispute Desk
 * Layout Archetype: MYBA Charter Agreement Term Sheet & 30% APA Escrow Ledger
 */
export const PRACTICE_52_MYBA_SUPERYACHT_CHARTER_DISPUTE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-52-myba-superyacht-charter-dispute",
  name: "MYBA Superyacht Charter Term Sheet & 30% APA Escrow Ledger",
  kind: "section",
  root: {
    id: "prac52-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac52-container",
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
            id: "prac52-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "2xl" }, typography: { align: "center" } },
            children: [
              {
                id: "prac52-badge",
                type: "badge",
                text: "WORLDWIDE YACHTING ASSOCIATION · MYBA MOA CHARTER TERMS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac52-heading",
                type: "heading",
                level: 2,
                text: "MYBA Superyacht Charter Terms & APA Escrow Ledger",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac52-sub",
                type: "text",
                text: "Legal audit and escrow reconciliation protocol for Mediterranean & Aegean charters departing Bodrum, Göcek, or Marmaris under standard MYBA provisions.",
                style: { typography: { size: "base" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Term Sheet Document Container */
          {
            id: "prac52-parchment",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "2xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac52-parchment-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  /* Summary Banner */
                  {
                    id: "prac52-summary-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingBottom: "md" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac52-cruising-zone",
                        type: "text",
                        text: "CRUISING AREA: Turkish Southern Aegean & Greek Dodecanese",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac52-vat-status",
                        type: "badge",
                        text: "VAT EXEMPTION: TTK Art. 940 Bunker Export Protocol",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                    ],
                  },

                  /* Table of Term Provisions */
                  {
                    id: "prac52-table-wrap",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    style: { sizing: { width: "full" } },
                    children: [
                      /* Row 1 */
                      {
                        id: "prac52-r1",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: {
                          sizing: { width: "full" },
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "surface-muted" },
                          border: { radius: "sm" },
                        },
                        children: [
                          {
                            id: "prac52-r1-name",
                            type: "text",
                            text: "Clause 1 · Advance Provisioning Allowance (APA)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac52-r1-val",
                            type: "text",
                            text: "30% – 35% of Gross Charter Fee",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "prac52-r1-desc",
                        type: "text",
                        text: "Managed by Captain in fiduciary trust. Covers customs transit log fees, private marina dockage (Yalıkavak/D-Marin Göcek), food & fine wines, and premium fuel bunkering.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" }, spacing: { paddingX: "md" } },
                      },

                      /* Row 2 */
                      {
                        id: "prac52-r2",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: {
                          sizing: { width: "full" },
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "surface-muted" },
                          border: { radius: "sm" },
                        },
                        children: [
                          {
                            id: "prac52-r2-name",
                            type: "text",
                            text: "Clause 7 · Fuel Consumption & Demurrage Dispute Escalation",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac52-r2-val",
                            type: "text",
                            text: "Disputed Ledger Binding Escrow Hold",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac52-r2-desc",
                        type: "text",
                        text: "In event of generator/engine fuel discrepancies or weather-induced layovers, disputed APA balance is retained in Istanbul/London escrow account pending 14-day technical log reconciliation.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" }, spacing: { paddingX: "md" } },
                      },

                      /* Row 3 */
                      {
                        id: "prac52-r3",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "md",
                        style: {
                          sizing: { width: "full" },
                          spacing: { paddingY: "sm", paddingX: "md" },
                          color: { background: "surface-muted" },
                          border: { radius: "sm" },
                        },
                        children: [
                          {
                            id: "prac52-r3-name",
                            type: "text",
                            text: "Clause 23 · Governing Law & Arbitration Choice",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac52-r3-val",
                            type: "text",
                            text: "ISTAC (Istanbul) or LMAA (London)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac52-r3-desc",
                        type: "text",
                        text: "Default MYBA English jurisdiction may be dual-pledged with Istanbul Arbitration Centre (ISTAC) for expedited enforcement against vessels berthed in Turkish territorial waters.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" }, spacing: { paddingX: "md" } },
                      },
                    ],
                  },

                  /* Action Footer */
                  {
                    id: "prac52-footer-action",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingTop: "lg" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac52-footer-info",
                        type: "text",
                        text: "Standard MYBA Special Provisions Rider prepared by Maritime Chambers.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac52-footer-btn",
                        type: "button",
                        label: "Download MYBA Rider & APA Escrow Protocol",
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
 * PRACTICE-53: Maritime Jurisdiction · Turkish Cabotage Law & Foreign Flag Transit Log Hub
 * Layout Archetype: 4-Stage Cross-Border Port of Entry Transit Sequence (Horizontal process rail)
 */
export const PRACTICE_53_CABOTAGE_LAW_TRANSIT_LOG_HUB_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-53-cabotage-law-transit-log-hub",
  name: "Turkish Cabotage Law & Foreign Flag Transit Sequence Rail",
  kind: "section",
  root: {
    id: "prac53-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac53-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac53-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac53-badge",
                type: "badge",
                text: "MARITIME JURISDICTION · LAW NO. 815 TURKISH CABOTAGE ACT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac53-heading",
                type: "heading",
                level: 2,
                text: "4-Stage Port Transit & Foreign Flag Navigation Sequence",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac53-sub",
                type: "text",
                text: "Foreign-flagged yachts (Cayman, Marshall Islands, Malta) operating along the Bodrum-Göcek-Antalya corridor must clear customs under strict Cabotage restrictions to avoid severe administrative confiscation.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Horizontal Linear Process Rail */
          {
            id: "prac53-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Stage 1 */
              {
                id: "prac53-stage-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac53-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac53-s1-num",
                        type: "badge",
                        text: "STAGE 01",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac53-s1-title",
                        type: "heading",
                        level: 4,
                        text: "First Port of Entry Customs Declaration",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac53-s1-desc",
                        type: "text",
                        text: "Vessel must proceed directly to designated Port of Entry (Bodrum, Datça, Marmaris, Kaş). Q-flag displayed until customs & passport clearance.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac53-stage-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac53-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac53-s2-num",
                        type: "badge",
                        text: "STAGE 02",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac53-s2-title",
                        type: "heading",
                        level: 4,
                        text: "Transit Log (YKB) & Blue Card Setup",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac53-s2-desc",
                        type: "text",
                        text: "Issuance of Yat Kayıt Belgesi (valid 1 year) and digital Mavi Kart wastewater tracking chip. Blackwater discharge strictly penalized in Aegean coves.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac53-stage-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac53-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac53-s3-num",
                        type: "badge",
                        text: "STAGE 03",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                      {
                        id: "prac53-s3-title",
                        type: "heading",
                        level: 4,
                        text: "Cabotage Envelope & Commercial Ban",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac53-s3-desc",
                        type: "text",
                        text: "Strict bar on foreign commercial passenger carriage between Turkish ports without Ministry of Culture & Tourism commercial charter permit.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac53-stage-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac53-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac53-s4-num",
                        type: "badge",
                        text: "STAGE 04",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac53-s4-title",
                        type: "heading",
                        level: 4,
                        text: "Schengen Outbound Customs Exit",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac53-s4-desc",
                        type: "text",
                        text: "Transit log surrender, crew exit stamps, and bonded duty-free fuel provisioning prior to crossing into Greek territorial waters (Kos, Symi, Rhodes).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Direct Advisory Link */
          {
            id: "prac53-bottom-strip",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: {
              sizing: { width: "full" },
              spacing: { padding: "md" },
              color: { background: "surface-muted" },
              border: { radius: "md" },
            },
            children: [
              {
                id: "prac53-bottom-txt",
                type: "text",
                text: "Facing transit log confiscation, cabotage fines, or crew visa infractions in Southern Aegean ports?",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac53-bottom-btn",
                type: "button",
                label: "Retain Maritime Harbor Counsel",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-54: Superyacht Crew · Maritime Labour Convention (MLC) & Seaman Contract Deck
 * Layout Archetype: Tabular Maritime Labor Registry & MLC Compliance Schedule (Hairline gazette table)
 */
export const PRACTICE_54_CREW_EMPLOYMENT_MLC_MARITIME_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-54-crew-employment-mlc-maritime",
  name: "Maritime Labour Convention (MLC) Crew Employment Schedule Table",
  kind: "section",
  root: {
    id: "prac54-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac54-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac54-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac54-badge",
                type: "badge",
                text: "SEAFARER LAW · MARITIME LABOUR CONVENTION (MLC 2006) & LAW NO. 854",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac54-heading",
                type: "heading",
                level: 2,
                text: "Superyacht Crew Employment Schedule & Rest Hours Registry",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac54-sub",
                type: "text",
                text: "Vessels over 500 GT and commercial charter yachts must comply with MLC 2006 Seafarer Employment Agreements (SEA), mandatory rest log certifications, and repatriation security bonds.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Gazette Tabular Matrix */
          {
            id: "prac54-table-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "lg", color: "border" },
              sizing: { width: "full" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "prac54-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                style: { sizing: { width: "full" } },
                children: [
                  /* Table Header Row */
                  {
                    id: "prac54-th",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingBottom: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac54-th-col1",
                        type: "text",
                        text: "CREW POST / BILLET",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-th-col2",
                        type: "text",
                        text: "STATUTORY REST MANDATE",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-th-col3",
                        type: "text",
                        text: "REPATRIATION & WAGE SECURITY",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-th-col4",
                        type: "text",
                        text: "GOVERNING STATUTE",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Table Row 1: Master / Captain */
                  {
                    id: "prac54-r1",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac54-r1-c1",
                        type: "text",
                        text: "Yacht Master (Kaptan)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac54-r1-c2",
                        type: "text",
                        text: "Min 10 hrs / 24h period (Max 77h/wk)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-r1-c3",
                        type: "text",
                        text: "P&I Club Financial Security Cert",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac54-r1-c4",
                        type: "badge",
                        text: "MLC Reg 2.3 / TTK 1088",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Table Row 2: Chief Engineer */
                  {
                    id: "prac54-r2",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac54-r2-c1",
                        type: "text",
                        text: "Chief Engineer (Baş Makinist)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac54-r2-c2",
                        type: "text",
                        text: "Emergency call-out compensatory rest",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-r2-c3",
                        type: "text",
                        text: "Escrow wage guarantee (2 months)",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac54-r2-c4",
                        type: "badge",
                        text: "MLC Reg 2.2 / Deniz İş K.",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Table Row 3: Bosun & Deckhands */
                  {
                    id: "prac54-r3",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac54-r3-c1",
                        type: "text",
                        text: "Bosun / Deckhand (Gemi Adamı)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac54-r3-c2",
                        type: "text",
                        text: "Watchkeeping rest verification log",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-r3-c3",
                        type: "text",
                        text: "Mandatory home country flight bond",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac54-r3-c4",
                        type: "badge",
                        text: "MLC Reg 2.5 Repatriation",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Table Row 4: Chief Stewardess */
                  {
                    id: "prac54-r4",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: false,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm" },
                    },
                    children: [
                      {
                        id: "prac54-r4-c1",
                        type: "text",
                        text: "Chief Stewardess (Kabin Amiri)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac54-r4-c2",
                        type: "text",
                        text: "Guest charter overtime cap (14h/day max)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-r4-c3",
                        type: "text",
                        text: "Turkish SGK or private international cover",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac54-r4-c4",
                        type: "badge",
                        text: "MLC Reg 4.2 Medical Care",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Footer Action */
                  {
                    id: "prac54-footer",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingTop: "md" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac54-footer-info",
                        type: "text",
                        text: "Port State Control (PSC) inspections at Marmaris & Bodrum audit rest sheets without prior warning.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac54-footer-btn",
                        type: "button",
                        label: "Audit Yacht Crew SEA Agreements",
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
 * PRACTICE-55: Marine Conservation · Underwater Cultural Heritage (Kültür Varlıkları) Diving Zone Monograph
 * Layout Archetype: Minimalist Archaeological Monograph with Dive Sanctuary Pull-Quote
 */
export const PRACTICE_55_UNDERWATER_CULTURAL_HERITAGE_DIVE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-55-underwater-cultural-heritage-dive",
  name: "Underwater Archaeological Sanctuary Monograph with Pull-Quote",
  kind: "section",
  root: {
    id: "prac55-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac55-container",
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
          /* Header */
          {
            id: "prac55-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "2xl" }, typography: { align: "center" } },
            children: [
              {
                id: "prac55-badge",
                type: "badge",
                text: "UNDERWATER ARCHAEOLOGY · LAW NO. 2863 KORUMA ALANLARI",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac55-heading",
                type: "heading",
                level: 2,
                text: "Aegean Submerged Antiquities & Dive Sanctuary Legal Shield",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Monograph Column */
          {
            id: "prac55-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "2xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac55-card-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  /* Large Latin / Turkish Pull-Quote */
                  {
                    id: "prac55-pullquote-wrap",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    style: {
                      spacing: { paddingY: "md", paddingX: "lg" },
                      sizing: { width: "full" },
                      typography: { align: "center" },
                      border: { width: "hairline", color: "border" },
                      color: { background: "surface-muted" },
                    },
                    children: [
                      {
                        id: "prac55-quote-txt",
                        type: "heading",
                        level: 3,
                        text: "“Sualtı kültür ve tabiat varlıkları Devlete aittir; izinsiz dalış, araştırma ve çıkarma eylemleri 2 ila 5 yıl hapis ve ağır para cezasına tabidir.”",
                        style: {
                          typography: { size: "xl", weight: "normal" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac55-quote-cite",
                        type: "text",
                        text: "— 2863 Sayılı Kültür ve Tabiat Varlıklarını Koruma Kanunu Madde 65 & Bodrum Sualtı Arkeoloji Müzesi Tebliği",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },

                  /* Editorial Prose */
                  {
                    id: "prac55-prose",
                    type: "text",
                    text: "Resort dive centers and visiting superyachts in Kaş, Kekova Sunken City, and Knidos operate under strict Coast Guard (Sahil Güvenlik) radar surveillance. Diving with breathing apparatus in Zone 1 Archaeological Sanctuaries is strictly prohibited. We secure formal scientific permits from the Ministry of Culture & Tourism for certified documentary and luxury maritime expeditions while safeguarding commercial operators against asset confiscation.",
                    style: { typography: { size: "base" }, color: { text: "text-muted" } },
                  },

                  /* Sign-off Seal */
                  {
                    id: "prac55-seal-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingTop: "md" },
                      border: { width: "hairline", color: "border" },
                    },
                    children: [
                      {
                        id: "prac55-seal-info",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac55-seal-title",
                            type: "text",
                            text: "AEGEAN MARITIME & ARCHAEOLOGY PRACTICE GROUP",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac55-seal-sub",
                            type: "text",
                            text: "Muğla & Antalya Bar Associations · Chambers of Marine Counsel",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac55-seal-btn",
                        type: "button",
                        label: "Request Archaeological Dive Clearance",
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

export const PRACTICE_LIBRARY_BATCH_11: ComponentDocument[] = [
  PRACTICE_51_WATERSPORTS_CONCESSION_LIABILITY_DOCUMENT,
  PRACTICE_52_MYBA_SUPERYACHT_CHARTER_DISPUTE_DOCUMENT,
  PRACTICE_53_CABOTAGE_LAW_TRANSIT_LOG_HUB_DOCUMENT,
  PRACTICE_54_CREW_EMPLOYMENT_MLC_MARITIME_DOCUMENT,
  PRACTICE_55_UNDERWATER_CULTURAL_HERITAGE_DIVE_DOCUMENT,
];
