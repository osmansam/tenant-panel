import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 5: Yacht, Marina & Maritime Law (#21–#25)
 * Inspired by Coastal Turkish Admiralty Chambers (Göcek, Fethiye, Bodrum)
 * Aesthetic: Warm cream/linen surfaces, deep Mediterranean navy typography,
 * Aegean nautical accents, superyacht transaction roadmaps, salvage defense.
 * ============================================================================
 */

/**
 * PRACTICE-21: Foreign Flagged Vessels · Turkish Transit Log & Customs Compliance
 * Layout: 3-Column Customs Compliance Deck (Transit log rules)
 * Visual Family: Maritime Legal Regulatory Guide
 */
export const PRACTICE_21_TRANSIT_LOG_CUSTOMS_PROTOCOL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-21-transit-log-customs-protocol",
  name: "Foreign Flagged Vessels · Turkish Transit Log & Customs Compliance",
  kind: "section",
  root: {
    id: "prac21-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac21-container",
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
            id: "prac21-header",
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
                id: "prac21-badge",
                type: "badge",
                text: "TURKISH MARITIME & CUSTOMS CODE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac21-title",
                type: "heading",
                level: 2,
                text: "Turkish Transit Log & Foreign Flag Protocols",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac21-subtitle",
                type: "text",
                text: "Cruising permit issuance, 5-year marina winter storage exemptions, Blue Card wastewater compliance, and Cabotage Law adherence for foreign yachts in Turkish waters.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Deck Grid */
          {
            id: "prac21-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* 1. Cruising Permit & Cabotage */
              {
                id: "prac21-c1-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac21-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac21-c1-badge",
                        type: "badge",
                        text: "TRANSIT LOG PROTOCOL",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac21-c1-title",
                        type: "heading",
                        level: 3,
                        text: "1-Year Cruising Permit (Seyir İzin Belgesi)",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac21-c1-desc",
                        type: "text",
                        text: "Foreign flagged yachts must obtain a Transit Log upon arrival at first Turkish port of entry (Liman). Valid for up to 1 year; requires crew list customs stamping and passport police visas.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* 2. 5-Year Marina Exemption */
              {
                id: "prac21-c2-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac21-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac21-c2-badge",
                        type: "badge",
                        text: "CUSTOMS EXEMPTION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac21-c2-title",
                        type: "heading",
                        level: 3,
                        text: "5-Year Marina Berth Storage Rule",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac21-c2-desc",
                        type: "text",
                        text: "Foreign flagged vessels holding a valid annual berthing contract at a licensed Turkish marina (D-Marin, Netsel, Bodrum) can remain in Turkey for up to 5 consecutive years without paying import customs duties.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* 3. Blue Card Waste Compliance */
              {
                id: "prac21-c3-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac21-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac21-c3-badge",
                        type: "badge",
                        text: "ENVIRONMENTAL REGULATION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac21-c3-title",
                        type: "heading",
                        level: 3,
                        text: "Blue Card (Mavi Kart) Waste Registry",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac21-c3-desc",
                        type: "text",
                        text: "Mandatory digital tracking chip for black/grey water disposal in Muğla waters. Coast Guard checks carry instant heavy administrative fines (up to 300,000 TRY) for irregular pump-out records.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Direct CTA Action */
          {
            id: "prac21-btn",
            type: "button",
            label: "Inquire on Transit Log Renewal & Port Clearance",
            href: "tel:+902526120088",
            style: {
              color: { background: "primary", text: "primary-foreground" },
              spacing: { paddingY: "md", paddingX: "xl" },
              border: { radius: "lg" },
              typography: { weight: "semibold" },
            },
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-22: Superyacht Commercial Charter · MYBA & Bareboat Dispute Shield
 * Layout: Split 12-Column Charter Dispute Spans (APA vs Crew Labour)
 * Visual Family: Superyacht Commercial Advisory
 */
export const PRACTICE_22_YACHT_CHARTER_CONTRACT_DISPUTE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-22-yacht-charter-contract-dispute",
  name: "Superyacht Commercial Charter · MYBA & Bareboat Dispute Shield",
  kind: "section",
  root: {
    id: "prac22-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac22-container",
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
            id: "prac22-header",
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
                id: "prac22-badge",
                type: "badge",
                text: "COMMERCIAL SUPERYACHT CHARTER",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac22-title",
                type: "heading",
                level: 2,
                text: "MYBA Charter Disputes & Crew Arbitration",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac22-subtitle",
                type: "text",
                text: "High-value commercial charter dispute defense for yacht managers, charterers, and owner holding companies operating out of Göcek, Bodrum, and Marmaris.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Split 12-Column Grid */
          {
            id: "prac22-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: APA & Breakdown Claims (7 cols) */
              {
                id: "prac22-apa-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac22-apa-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac22-apa-heading",
                        type: "heading",
                        level: 3,
                        text: "Advance Provisioning Allowance (APA) & Seaworthiness Disputes",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac22-apa-text1",
                        type: "text",
                        text: "Under standard Mediterranean Yacht Brokers Association (MYBA) terms, owner warranty of seaworthiness governs mechanical breakdowns, air conditioning failures, and generator outages during high-season charters.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac22-apa-text2",
                        type: "text",
                        text: "We represent owners and charterers in pro-rata hire deductions, fuel consumption APA auditing, berth fee apportionment, and international arbitration under LMAA (London Maritime Arbitrators Association) rules.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Crew Labour Claims (5 cols) */
              {
                id: "prac22-crew-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac22-crew-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac22-crew-badge",
                        type: "badge",
                        text: "MARITIME LABOUR CODE (MLC)",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac22-crew-heading",
                        type: "heading",
                        level: 3,
                        text: "Crew Employment Defense",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac22-crew-desc",
                        type: "text",
                        text: "Turkish Maritime Labour Code (Deniz İş Kanunu No. 854) claims regarding seafarer overtime, wrongful disembarkation, wage arrest liens, and social security SGK audits for Turkish and foreign yacht crew.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac22-crew-btn",
                        type: "button",
                        label: "Retain Maritime Counsel",
                        href: "tel:+902526120088",
                        style: {
                          sizing: { width: "full" },
                          color: { background: "primary", text: "primary-foreground" },
                          spacing: { paddingY: "md", paddingX: "xl" },
                          border: { radius: "lg" },
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
    ],
  },
};

/**
 * PRACTICE-23: Berthing Contracts · Marina Liability & Mooring Rights Audit
 * Layout: 2-Column Balanced Berthing Grid (Marina contract risks)
 * Visual Family: Marina Agreement Audit Checklist
 */
export const PRACTICE_23_MARINA_BERTHING_AGREEMENT_CHECKLIST_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-23-marina-berthing-agreement-checklist",
  name: "Berthing Contracts · Marina Liability & Mooring Rights Audit",
  kind: "section",
  root: {
    id: "prac23-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac23-container",
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
            id: "prac23-header",
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
                id: "prac23-badge",
                type: "badge",
                text: "MARINA BERTHING CONTRACT AUDIT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac23-title",
                type: "heading",
                level: 2,
                text: "Marina Berthing Liability & Mooring Rights Audit",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac23-subtitle",
                type: "text",
                text: "Scrutinizing standard-form marina annual mooring agreements before signature to identify one-sided damage waivers and unlawful berth relocation clauses.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Grid */
          {
            id: "prac23-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Left Column: Items 1 - 2 */
              {
                id: "prac23-col1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac23-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      /* Item 1 */
                      {
                        id: "prac23-i1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac23-i1-title",
                            type: "heading",
                            level: 3,
                            text: "1. Winter Hard-Standing & Haul-Out Liability Waivers",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac23-i1-desc",
                            type: "text",
                            text: "Marina travel-lift damage clauses often attempt to exclude operator negligence under Turkish Code of Obligations (TBK Art. 115). We ensure boat hoist liability is legally preserved.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Item 2 */
                      {
                        id: "prac23-i2",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac23-i2-title",
                            type: "heading",
                            level: 3,
                            text: "2. Force Majeure & Storm Surge Exceptions",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac23-i2-desc",
                            type: "text",
                            text: "Pontoon breakdown and pontoon cleat tear-out liability during southern storms (Lodos). Verifying marina P&I cover and pontoon engineering certifications.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Items 3 - 4 */
              {
                id: "prac23-col2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac23-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      /* Item 3 */
                      {
                        id: "prac23-i3",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac23-i3-title",
                            type: "heading",
                            level: 3,
                            text: "3. Discretionary Berth Relocation Protections",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac23-i3-desc",
                            type: "text",
                            text: "Removing boilerplate clauses allowing the marina to unilaterally relocate your vessel to exposed outer quays or outer anchorages without prior written consent.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Item 4 */
                      {
                        id: "prac23-i4",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac23-i4-title",
                            type: "heading",
                            level: 3,
                            text: "4. Utility & Shore Power Tariff Escalations",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac23-i4-desc",
                            type: "text",
                            text: "Reviewing kilowatt and water metered surcharges against EPDK regulated coastal enterprise tariffs to prevent unlawful overcharging.",
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

          /* Review Link */
          {
            id: "prac23-link",
            type: "link",
            label: "Request Pre-Signature Review of Marina Berthing Contract",
            href: "mailto:maritime@yanatmalaw.com",
            openInNewTab: false,
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-24: Yacht Conveyancing · 4-Stage Bill of Sale & Escrow Closing
 * Layout: 4-Column Stepped Escrow Rail
 * Visual Family: Superyacht Transaction Conveyancing
 */
export const PRACTICE_24_VESSEL_ESCROW_SALE_PIPELINE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-24-vessel-escrow-sale-pipeline",
  name: "Yacht Conveyancing · 4-Stage Bill of Sale & Escrow Closing",
  kind: "section",
  root: {
    id: "prac24-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac24-container",
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
            id: "prac24-header",
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
                id: "prac24-badge",
                type: "badge",
                text: "YACHT SALES & ESCROW PIPELINE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac24-title",
                type: "heading",
                level: 2,
                text: "4-Stage Yacht Transaction & Escrow Closing",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac24-subtitle",
                type: "text",
                text: "Turnkey legal conveyancing for motor yachts and sailing gulets, managing independent escrow, flag deletion, and Turkish port registry transfers.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Column Pipeline Grid */
          {
            id: "prac24-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              /* Stage 1 */
              {
                id: "prac24-s1-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac24-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac24-s1-badge",
                        type: "badge",
                        text: "STAGE 01",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac24-s1-title",
                        type: "heading",
                        level: 3,
                        text: "MoA Execution & Condition Survey",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac24-s1-desc",
                        type: "text",
                        text: "Drafting MYBA or Turkish standard Memorandum of Agreement with sea trial conditions and accredited marine surveyor haul-out inspection clauses.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac24-s2-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac24-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac24-s2-badge",
                        type: "badge",
                        text: "STAGE 02",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac24-s2-title",
                        type: "heading",
                        level: 3,
                        text: "10% Escrow Monies Deposit",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac24-s2-desc",
                        type: "text",
                        text: "Lodging buyer deposit funds into segregated attorney client escrow account, protected against vendor creditors and liens until satisfaction of survey.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac24-s3-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac24-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac24-s3-badge",
                        type: "badge",
                        text: "STAGE 03",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac24-s3-title",
                        type: "heading",
                        level: 3,
                        text: "Flag Deletion & Protocol of Delivery",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac24-s3-desc",
                        type: "text",
                        text: "Securing official certificate of deletion from existing flag state (Delaware, Malta, UK Part 1) and executing bilateral Protocol of Delivery & Acceptance.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac24-s4-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac24-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac24-s4-badge",
                        type: "badge",
                        text: "STAGE 04",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac24-s4-title",
                        type: "heading",
                        level: 3,
                        text: "Bill of Sale & Escrow Disbursement",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac24-s4-desc",
                        type: "text",
                        text: "Notarized Bill of Sale execution, release of net purchase proceeds to seller, and port authority registration under new beneficial ownership.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Action Button */
          {
            id: "prac24-btn",
            type: "button",
            label: "Initiate Vessel Escrow & Closing Protocol",
            href: "tel:+902526120088",
            style: {
              color: { background: "primary", text: "primary-foreground" },
              spacing: { paddingY: "md", paddingX: "xl" },
              border: { radius: "lg" },
              typography: { weight: "semibold" },
            },
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-25: Casualty Intervention · Maritime Collision & Salvage Lien Response
 * Layout: Urgent Emergency Maritime Intervention Dock
 * Visual Family: Maritime Casualty Emergency Banner
 */
export const PRACTICE_25_MARITIME_SALVAGE_EMERGENCY_DOCK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-25-maritime-salvage-emergency-dock",
  name: "Casualty Intervention · Maritime Collision & Salvage Lien Response",
  kind: "section",
  root: {
    id: "prac25-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac25-card",
        type: "card",
        element: "article",
        style: {
          color: { background: "surface", text: "text" },
          border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
          spacing: { padding: "2xl" },
          sizing: { width: "full", maxWidth: "5xl", align: "center" },
        },
        children: [
          {
            id: "prac25-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            style: { typography: { align: "center" } },
            children: [
              /* Alert Badge */
              {
                id: "prac25-badge",
                type: "badge",
                text: "EMERGENCY ADMIRALTY RESPONSE · ARREST OF SHIPS (İHTİYATİ HACİZ)",
                style: {
                  color: { background: "surface-muted", text: "danger" },
                  border: { radius: "full" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },

              /* Urgent Title */
              {
                id: "prac25-title",
                type: "heading",
                level: 2,
                text: "Maritime Collision, Salvage Liens & Ship Arrest",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },

              /* Description */
              {
                id: "prac25-desc",
                type: "text",
                text: "Immediate on-scene intervention under Turkish Commercial Code (TTK Art. 1352 et seq.) and 1999 International Convention on Arrest of Ships. 24/7 advocate attendance across Göcek, Marmaris, and Bodrum for Lloyd's Open Form (LOF) salvage disputes and urgent P&I Club Letters of Undertaking (LOU).",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "2xl" },
                },
              },

              /* Dispatch Buttons */
              {
                id: "prac25-btns",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac25-call-btn",
                    type: "button",
                    label: "24/7 MARITIME EMERGENCY: +90 532 745 11 22",
                    href: "tel:+905327451122",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      border: { radius: "lg" },
                      typography: { weight: "bold" },
                    },
                  },
                  {
                    id: "prac25-wa-btn",
                    type: "button",
                    label: "DISPATCH SALVAGE ADVOCATE ON WHATSAPP",
                    href: "https://wa.me/905327451122",
                    style: {
                      color: { background: "surface", text: "primary" },
                      border: { width: "hairline", color: "border", radius: "lg" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      typography: { weight: "bold" },
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

export const PRACTICE_LIBRARY_BATCH_5 = [
  PRACTICE_21_TRANSIT_LOG_CUSTOMS_PROTOCOL_DOCUMENT,
  PRACTICE_22_YACHT_CHARTER_CONTRACT_DISPUTE_DOCUMENT,
  PRACTICE_23_MARINA_BERTHING_AGREEMENT_CHECKLIST_DOCUMENT,
  PRACTICE_24_VESSEL_ESCROW_SALE_PIPELINE_DOCUMENT,
  PRACTICE_25_MARITIME_SALVAGE_EMERGENCY_DOCK_DOCUMENT,
] as const;

