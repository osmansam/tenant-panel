import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 9: Gastronomy & TAPDK Licensing (#41–#45)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 41: Side-by-Side Dual-Track Statutory Comparison Matrix (Açık İçki vs Perakende)
 * 42: Acoustic Decibel Timeline & Midnight Curfew Rail (Horizontal linear timeline)
 * 43: Formal Contractual Agreement Preview with Execution Signature Block
 * 44: Tiered Cancellation Penalty Schedule Table (Formal hospitality fee schedule)
 * 45: Asymmetric Technical Inspection Hub with Witness Sample Blueprint
 * ============================================================================
 */

/**
 * PRACTICE-41: TAPDK Alcohol Sales Licensing · On-Premise vs Retail Distance Audit
 * Layout Archetype: Side-by-Side Dual-Track Statutory Comparison Matrix
 */
export const PRACTICE_41_TAPDK_ALCOHOL_SALES_LICENSING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-41-tapdk-alcohol-sales-licensing",
  name: "Hospitality F&B · TAPDK Alcohol Licensing Distance & Venue Audit",
  kind: "section",
  root: {
    id: "prac41-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac41-container",
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
            id: "prac41-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac41-badge",
                type: "badge",
                text: "LAW NO. 4250 · TOBACCO & ALCOHOL REGULATION (TAPDK)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac41-heading",
                type: "heading",
                level: 2,
                text: "Hotel & Restaurant TAPDK Licensing: Dual-Track Statutory Comparison",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac41-sub",
                type: "text",
                text: "Tarım ve Orman Bakanlığı regulations distinguish sharply between restaurant table service and boutique hotel gift-shop retail sales. Each statutory license follows independent distance, outdoor perimeter, and inspection standards.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual-Track Comparative Matrix (2 Wide Parallel Columns) */
          {
            id: "prac41-matrix",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Track A: Açık İçki Satış (On-Premise Service) */
              {
                id: "prac41-track-a",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "primary", radius: "lg", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac41-ta-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac41-ta-badge",
                        type: "badge",
                        text: "TRACK A · ON-PREMISE (AÇIK ALKOLLÜ İÇKİ)",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "sm" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac41-ta-title",
                        type: "heading",
                        level: 3,
                        text: "Restaurant & Beach Club Table Service",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac41-ta-desc",
                        type: "text",
                        text: "Authorizes open-bottle wine and spirit service within designated dining boundaries, pool decks, and licensed beachfront sun lounger zones.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac41-ta-divider",
                        type: "divider",
                      },
                      {
                        id: "prac41-ta-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Exempt from 100m school/mosque distance rule if holding Ministry Tourism License",
                          "Mandatory closed perimeter fencing for outdoor garden bars",
                          "Quarterly Tarım İl Müdürlüğü bottle tax stamp (Bandrol) audits",
                          "Annual municipal İşyeri Ruhsatı renewal synchronization",
                        ],
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                    ],
                  },
                ],
              },

              /* Track B: Perakende Satış (Retail Boutique Sales) */
              {
                id: "prac41-track-b",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac41-tb-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac41-tb-badge",
                        type: "badge",
                        text: "TRACK B · RETAIL BOUTIQUE (PERAKENDE SATIŞ)",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { radius: "sm" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac41-tb-title",
                        type: "heading",
                        level: 3,
                        text: "Resort Wine Cellar & Boutique Shop Sales",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac41-tb-desc",
                        type: "text",
                        text: "Applies to packaged sealed wine bottles purchased by guests to take off-property or consume inside private residential villas.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac41-tb-divider",
                        type: "divider",
                      },
                      {
                        id: "prac41-tb-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "STRICT 100-meter door-to-door radial distance rule applies from schools and places of worship",
                          "Prohibition of retail sales between 22:00 and 06:00 daily",
                          "Direct street access or distinct retail storefront cadastral designation required",
                          "Heavy administrative fines for unsealed takeaway bottles",
                        ],
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Desk */
          {
            id: "prac41-footer",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: { sizing: { width: "full" }, spacing: { paddingTop: "md" } },
            children: [
              {
                id: "prac41-ft-text",
                type: "text",
                text: "Chambers audits cadastral distance maps and resolves TAPDK revocation notices.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "prac41-ft-btn",
                type: "button",
                label: "Audit Property Distance & File TAPDK Application",
                href: "#tapdk-audit",
                style: {
                  color: { background: "primary", text: "background" },
                  border: { radius: "md" },
                  spacing: { paddingX: "xl", paddingY: "sm" },
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

/**
 * PRACTICE-42: Live Music Decibel Curfew Permit
 * Layout Archetype: Acoustic Decibel Timeline & Midnight Curfew Rail (Horizontal linear timeline)
 */
export const PRACTICE_42_LIVE_MUSIC_DECIBEL_PERMIT_CARD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-42-live-music-decibel-permit-card",
  name: "Live Music Decibel Curfew Permit & Acoustic Engineering Audit",
  kind: "section",
  root: {
    id: "prac42-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac42-container",
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
            id: "prac42-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac42-badge",
                type: "badge",
                text: "ENVIRONMENTAL NOISE REGULATION · CANLI MÜZİK İZNİ",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac42-title",
                type: "heading",
                level: 2,
                text: "Coastal Resort Acoustic Timeline: Decibel Limits & Midnight Curfew",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac42-sub",
                type: "text",
                text: "Hospitality venues in Muğla and Antalya must obtain the official Canlı Müzik İzin Belgesi from Çevre ve Şehircilik İl Müdürlüğü. Ambient outdoor music is strictly governed by a 4-stage chronological decibel timetable.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Horizontal 4-Stage Acoustic Curfew Rail (Linear flow, no vertical cards) */
          {
            id: "prac42-timeline",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Stage 1: Daytime Ambient */
              {
                id: "prac42-st1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac42-st1-tag",
                    type: "text",
                    text: "PHASE 01 · 10:00 – 19:00",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac42-st1-h",
                    type: "heading",
                    level: 3,
                    text: "Daytime Poolside Ambient",
                    style: { typography: { size: "lg", weight: "bold" } },
                  },
                  {
                    id: "prac42-st1-p",
                    type: "text",
                    text: "65 dB max at boundary. Background acoustic music permitted without live stage equipment.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Stage 2: Evening Dining */
              {
                id: "prac42-st2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac42-st2-tag",
                    type: "text",
                    text: "PHASE 02 · 19:00 – 23:59",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac42-st2-h",
                    type: "heading",
                    level: 3,
                    text: "Dinner Service & Live Vocal",
                    style: { typography: { size: "lg", weight: "bold" } },
                  },
                  {
                    id: "prac42-st2-p",
                    type: "text",
                    text: "70 dB limit. Certified acoustic engineering report must be filed with the municipal police.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Stage 3: Midnight Outdoor Curfew */
              {
                id: "prac42-st3",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "danger", radius: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac42-st3-tag",
                    type: "text",
                    text: "PHASE 03 · 23:59 SHARP",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "danger" } },
                  },
                  {
                    id: "prac42-st3-h",
                    type: "heading",
                    level: 3,
                    text: "Mandatory Outdoor Curfew",
                    style: { typography: { size: "lg", weight: "bold" }, color: { text: "danger" } },
                  },
                  {
                    id: "prac42-st3-p",
                    type: "text",
                    text: "All outdoor amplification must cease immediately. Gendarmerie issues spot fines of 120,000+ TRY.",
                    style: { typography: { size: "sm" }, color: { text: "text" } },
                  },
                ],
              },

              /* Stage 4: Indoor Soundproof Club */
              {
                id: "prac42-st4",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac42-st4-tag",
                    type: "text",
                    text: "PHASE 04 · 00:00 – 04:00",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac42-st4-h",
                    type: "heading",
                    level: 3,
                    text: "Enclosed Soundproof Club",
                    style: { typography: { size: "lg", weight: "bold" } },
                  },
                  {
                    id: "prac42-st4-p",
                    type: "text",
                    text: "Requires double airlock entrance doors, soundproof acoustic glass, and certified decibel limiter boxes.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },

          /* Call to Action */
          {
            id: "prac42-cta",
            type: "button",
            label: "Prepare Acoustic Engineering Report & Canlı Müzik İzni Dossier",
            href: "#decibel-permit",
            style: {
              color: { background: "primary", text: "background" },
              border: { radius: "md" },
              spacing: { paddingX: "xl", paddingY: "md" },
              typography: { weight: "semibold" },
            },
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-43: Farm-To-Table Supplier Contract & Indemnity Protocol
 * Layout Archetype: Formal Contractual Agreement Preview with Execution Signature Block
 */
export const PRACTICE_43_FARM_TO_TABLE_SUPPLIER_CONTRACT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-43-farm-to-table-supplier-contract",
  name: "Farm-to-Table Hospitality Supply Contract & Product Liability Protocol",
  kind: "section",
  root: {
    id: "prac43-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac43-contract-container",
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
          /* Contract Header Block */
          {
            id: "prac43-c-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { typography: { align: "center" } },
            children: [
              {
                id: "prac43-badge",
                type: "badge",
                text: "MODEL MASTER AGREEMENT · TÜRK BORÇLAR KANUNU",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac43-title",
                type: "heading",
                level: 2,
                text: "Agricultural & Seafood Master Procurement Agreement",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac43-sub",
                type: "text",
                text: "Formal procurement terms between boutique coastal hotels and local Aegean agricultural producers, olive oil mills, and artisanal fisheries.",
                style: { typography: { size: "base" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Contract Body (Articles 1, 2, 3 in legal parchment format) */
          {
            id: "prac43-contract-parchment",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            style: {
              sizing: { width: "full" },
              color: { background: "surface", text: "text" },
              border: { width: "hairline", color: "border", radius: "lg", shadow: "sm" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "prac43-art1-title",
                type: "heading",
                level: 3,
                text: "Article 1: Cold-Chain Verification & Seafood Origin Certification",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "prac43-art1-body",
                type: "text",
                text: "The Supplier warrants that all Mediterranean catch delivered to the Resort possesses legal Fishing Vessel Registration (Balıkçı Gemisi Ruhsat Tezkeresi) and complies with continuous digital temperature datalogger records below +2°C throughout transit.",
                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "prac43-art2-title",
                type: "heading",
                level: 3,
                text: "Article 2: Pesticide & Organic Chemical Zero-Tolerance Warranty",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "prac43-art2-body",
                type: "text",
                text: "All heritage olive oils, citrus, and vegetables marketed as ‘Organik’ or ‘Çiftlikten Sofraya’ must carry certified Tarım Bakanlığı laboratory pesticide residue assay certificates. Detection of synthetic chemical fertilizers triggers an immediate contractual penalty of 50,000 EUR plus indemnification against guest consumer claims.",
                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "prac43-art3-title",
                type: "heading",
                level: 3,
                text: "Article 3: Governing Law & Jurisdiction",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "prac43-art3-body",
                type: "text",
                text: "This agreement is governed by the Turkish Code of Obligations (TBK). Any dispute arising from defective deliveries or food safety violations shall be submitted to the exclusive jurisdiction of the Fethiye Commercial Courts and Enforcement Directorates.",
                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "prac43-divider",
                type: "divider",
              },

              /* Execution Signature Blocks */
              {
                id: "prac43-signatures",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "lg",
                style: { sizing: { width: "full" }, spacing: { paddingTop: "sm" } },
                children: [
                  {
                    id: "prac43-sig-resort",
                    type: "text",
                    text: "ON BEHALF OF RESORT:\nManaging Hoteller / F&B Director\nAuthorized MERSİS Signatory",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "prac43-sig-supplier",
                    type: "text",
                    text: "ON BEHALF OF PRODUCER:\nLicensed Agricultural Cooperative\nTax ID & Signature Circular",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                ],
              },
            ],
          },

          /* Action */
          {
            id: "prac43-cta",
            type: "button",
            label: "Download Bilingual Master Agricultural Supply Agreement",
            href: "#supplier-contract",
            style: {
              color: { background: "primary", text: "background" },
              border: { radius: "md" },
              spacing: { paddingX: "xl", paddingY: "md" },
              typography: { weight: "semibold" },
            },
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-44: Fine Dining Cancellation Policy & Event Buyout Terms
 * Layout Archetype: Tiered Cancellation Penalty Schedule Table (Formal hospitality fee schedule)
 */
export const PRACTICE_44_FINE_DINING_CANCELLATION_POLICY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-44-fine-dining-cancellation-policy",
  name: "Fine Dining Cancellation Policy & Private Event Buyout Terms",
  kind: "section",
  root: {
    id: "prac44-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac44-container",
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
            id: "prac44-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac44-badge",
                type: "badge",
                text: "CONSUMER LAW NO. 6502 · STATUTORY CANCELLATION SCHEDULE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac44-title",
                type: "heading",
                level: 2,
                text: "Fine Dining Tasting Menu & Private Buyout Cancellation Schedule",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac44-sub",
                type: "text",
                text: "Under Turkish Consumer Law, dining cancellation penalties are legally unenforceable unless explicitly consented to via dual-opt-in credit card pre-authorization protocols at the time of reservation.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Formal Schedule Table */
          {
            id: "prac44-schedule-table",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            style: {
              sizing: { width: "full" },
              color: { background: "surface", text: "text" },
              border: { width: "hairline", color: "border", radius: "lg" },
            },
            children: [
              /* Table Head */
              {
                id: "prac44-th",
                type: "grid",
                columns: 12,
                style: {
                  sizing: { width: "full" },
                  color: { background: "surface-muted", text: "text" },
                  spacing: { paddingX: "lg", paddingY: "md" },
                  border: { width: "hairline", color: "border" },
                },
                children: [
                  {
                    id: "prac44-th1",
                    type: "text",
                    text: "CANCELLATION TIMEFRAME",
                    layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                    style: { typography: { size: "sm", weight: "bold" } },
                  },
                  {
                    id: "prac44-th2",
                    type: "text",
                    text: "INDIVIDUAL TABLE (TASTING MENU)",
                    layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                    style: { typography: { size: "sm", weight: "bold" } },
                  },
                  {
                    id: "prac44-th3",
                    type: "text",
                    text: "EXCLUSIVE RESTAURANT BUYOUT",
                    layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                    style: { typography: { size: "sm", weight: "bold" } },
                  },
                ],
              },

              /* Tier 1: 72+ Hours */
              {
                id: "prac44-tr1",
                type: "grid",
                columns: 12,
                style: {
                  sizing: { width: "full" },
                  spacing: { paddingX: "lg", paddingY: "lg" },
                  border: { width: "hairline", color: "border" },
                },
                children: [
                  {
                    id: "prac44-tr1-time",
                    type: "text",
                    text: "72+ Hours Before Seating",
                    layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                    style: { typography: { size: "base", weight: "semibold" } },
                  },
                  {
                    id: "prac44-tr1-indiv",
                    type: "text",
                    text: "0% Penalty · Full pre-authorization deposit released immediately to card.",
                    layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac44-tr1-buyout",
                    type: "text",
                    text: "25% Non-refundable administration retainer retained; balance refunded.",
                    layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Tier 2: 24 to 72 Hours */
              {
                id: "prac44-tr2",
                type: "grid",
                columns: 12,
                style: {
                  sizing: { width: "full" },
                  spacing: { paddingX: "lg", paddingY: "lg" },
                  border: { width: "hairline", color: "border" },
                },
                children: [
                  {
                    id: "prac44-tr2-time",
                    type: "text",
                    text: "24 – 72 Hours Prior",
                    layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                    style: { typography: { size: "base", weight: "semibold" } },
                  },
                  {
                    id: "prac44-tr2-indiv",
                    type: "text",
                    text: "50% Tasting Menu Fee charged per guest seat reserved.",
                    layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac44-tr2-buyout",
                    type: "text",
                    text: "50% Total Minimum Food & Beverage Spend forfeiture.",
                    layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Tier 3: Under 24 Hours / No Show */
              {
                id: "prac44-tr3",
                type: "grid",
                columns: 12,
                style: {
                  sizing: { width: "full" },
                  spacing: { paddingX: "lg", paddingY: "lg" },
                },
                children: [
                  {
                    id: "prac44-tr3-time",
                    type: "text",
                    text: "Under 24 Hours / No Show",
                    layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                    style: { typography: { size: "base", weight: "semibold" }, color: { text: "danger" } },
                  },
                  {
                    id: "prac44-tr3-indiv",
                    type: "text",
                    text: "100% Full Tasting Menu Price billed to pre-authorized card.",
                    layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                    style: { typography: { size: "sm" }, color: { text: "text" } },
                  },
                  {
                    id: "prac44-tr3-buyout",
                    type: "text",
                    text: "100% Guaranteed Minimum Event Buyout Contract billed under TBK Art. 112.",
                    layout: { span: { mobile: 12, tablet: 5, desktop: 5 } },
                    style: { typography: { size: "sm" }, color: { text: "text" } },
                  },
                ],
              },
            ],
          },

          /* Footer Legal Note */
          {
            id: "prac44-footer-action",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: { sizing: { width: "full" } },
            children: [
              {
                id: "prac44-ft-desc",
                type: "text",
                text: "Enforceability requires bilingual 3D-Secure payment tokenization compliant with BDDK rules.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "prac44-ft-btn",
                type: "button",
                label: "Review Restaurant Reservation Terms & Payment Terms",
                href: "#restaurant-terms",
                style: {
                  color: { background: "primary", text: "background" },
                  border: { radius: "md" },
                  spacing: { paddingX: "xl", paddingY: "sm" },
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

/**
 * PRACTICE-45: HACCP Kitchen Food Safety & 72-Hour Witness Sample Dossier
 * Layout Archetype: Asymmetric Technical Inspection Hub with Witness Sample Blueprint
 */
export const PRACTICE_45_HACCP_FOOD_HYGIENE_DOSSIER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-45-haccp-food-hygiene-dossier",
  name: "Kitchen HACCP Food Safety & 72-Hour Witness Sample Dossier",
  kind: "section",
  root: {
    id: "prac45-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac45-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
          spacing: { gap: "xl" },
        },
        children: [
          /* Left Column (Span 7): Inspection Requirements */
          {
            id: "prac45-left-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
            children: [
              {
                id: "prac45-badge",
                type: "badge",
                text: "VETERINARY & FOOD LAW NO. 5996 · KITCHEN DOSSIER",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac45-title",
                type: "heading",
                level: 2,
                text: "Boutique Hotel Commercial Kitchen HACCP Regulatory Standards",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac45-lead",
                type: "text",
                text: "Tarım ve Orman Bakanlığı conducts surprise forensic inspections on coastal luxury kitchens. Failure to produce continuous HACCP logs, portör staff stool tests, or mandatory 72-hour witness food samples incurs immediate operating bans.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
              },
              {
                id: "prac45-checklist",
                type: "list",
                marker: "check",
                items: [
                  "Mandatory 72-hour sterile food witness sample retention (250g per dish at +4°C)",
                  "Staff Portör examinations: Lung X-rays, stool salmonella/shigella laboratory cultures",
                  "Monthly certified pest control bait station mapping and chemical log sheets",
                  "Quarterly microbiological laboratory tests for cocktail ice machines and water cisterns",
                ],
                style: { typography: { size: "base" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Right Column (Span 5): 72-Hour Witness Sample Locker Protocol */
          {
            id: "prac45-right-locker",
            type: "card",
            element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
            style: {
              color: { background: "surface", text: "text" },
              border: { width: "hairline", color: "border", radius: "lg", shadow: "sm" },
              spacing: { padding: "xl" },
            },
            children: [
              {
                id: "prac45-rl-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "prac45-rl-badge",
                    type: "badge",
                    text: "WITNESS LOCKER PROTOCOL",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "prac45-rl-title",
                    type: "heading",
                    level: 3,
                    text: "72-Hour Food Poisoning Defense Shield",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac45-rl-p",
                    type: "text",
                    text: "When a guest files an administrative food poisoning complaint, the public prosecutor immediately impounds the witness sample locker. Properly preserved samples are the hotelier's sole conclusive legal defense against civil indemnification claims under the Consumer Protection Law.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac45-rl-divider",
                    type: "divider",
                  },
                  {
                    id: "prac45-rl-cta",
                    type: "button",
                    label: "Retain Practice Counsel for Kitchen Food Safety Audit",
                    href: "#haccp-audit",
                    style: {
                      color: { background: "primary", text: "background" },
                      border: { radius: "md" },
                      sizing: { width: "full" },
                      spacing: { paddingY: "md" },
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
};

export const PRACTICE_LIBRARY_BATCH_9: ComponentDocument[] = [
  PRACTICE_41_TAPDK_ALCOHOL_SALES_LICENSING_DOCUMENT,
  PRACTICE_42_LIVE_MUSIC_DECIBEL_PERMIT_CARD_DOCUMENT,
  PRACTICE_43_FARM_TO_TABLE_SUPPLIER_CONTRACT_DOCUMENT,
  PRACTICE_44_FINE_DINING_CANCELLATION_POLICY_DOCUMENT,
  PRACTICE_45_HACCP_FOOD_HYGIENE_DOSSIER_DOCUMENT,
];
