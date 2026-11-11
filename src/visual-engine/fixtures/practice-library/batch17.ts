import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 17: VIP Concierge & Aviation (#81–#85)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 81: Asymmetric 70/30 Apron Clearance Blueprint (8/4: SHGM GAT Tarmac Escort)
 * 82: Dual Comparative Split Screen (6/6: CAP 437 Helideck vs Coastal Flight Plan)
 * 83: Tabular Archaeological Gazette Matrix (Law No. 2863 Cultural Goods Table)
 * 84: Minimalist Solemn Editorial Monograph with Inset Pull-Quote (HNW Privacy Shield)
 * 85: 4-Quadrant Executive Family Office Advisory Matrix (2x2 Multi-Disciplinary Deck)
 * ============================================================================
 */

/**
 * PRACTICE-81: Private Aviation · Dalaman & Bodrum VIP Jet Handling & Customs Escort
 * Layout Archetype: Asymmetric 70/30 Apron Clearance Blueprint (8/4)
 */
export const PRACTICE_81_DALAMAN_BODRUM_VIP_AVIATION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-81-dalaman-bodrum-vip-aviation",
  name: "Private Aviation · Dalaman & Bodrum VIP Jet Handling & Customs Escort",
  kind: "section",
  root: {
    id: "prac81-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac81-container",
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
            id: "prac81-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac81-badge",
                type: "badge",
                text: "PRIVATE AVIATION · SHGM DÜZENSİZ UÇUŞ İZNİ · DALAMAN & BODRUM GAT ESCORT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac81-heading",
                type: "heading",
                level: 2,
                text: "Private Jet Handling, Diplomatic Tarmac & Customs Clearance",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac81-sub",
                type: "text",
                text: "Expedited airside flight clearance, non-scheduled landing permits, and dedicated VIP customs escort for private aircraft arriving at Dalaman and Milas-Bodrum Airports.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Grid */
          {
            id: "prac81-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): SHGM Flight Clearance Blueprint */
              {
                id: "prac81-main-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac81-mc-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac81-mc-badge",
                        type: "badge",
                        text: "FLIGHT AUTHORIZATION PIPELINE · AIP TURKEY",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac81-mc-title",
                        type: "heading",
                        level: 3,
                        text: "Civil Aviation (SHGM) Non-Scheduled Landing Protocol",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac81-mc-desc",
                        type: "text",
                        text: "Under SHGM circulars and DHMİ airport slot regulations, all non-scheduled private flights into Dalaman (LTBS) and Milas-Bodrum (LTFE) require formal regulatory clearance, passenger manifest approval, and FBO handling coordination.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac81-stage-1",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac81-s1-h",
                            type: "heading",
                            level: 4,
                            text: "1. SHGM Landing & Overflight Clearances",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-s1-p",
                            type: "text",
                            text: "Filing irregular flight applications 48 hours prior to ETA. Diplomatic aircraft clearance via Ministry of Foreign Affairs (Dışişleri Bakanlığı) and DHMİ slot allocation.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac81-stage-2",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac81-s2-h",
                            type: "heading",
                            level: 4,
                            text: "2. General Aviation Terminal (GAT) Airside Escort",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-s2-p",
                            type: "text",
                            text: "Dedicated GAT tarmac protocol: direct ramp vehicle access, private VIP lounge reception, and avoidance of public commercial concourses at LTBS and LTFE.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac81-stage-3",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac81-s3-h",
                            type: "heading",
                            level: 4,
                            text: "3. Airside Customs & Passport Border Control",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-s3-p",
                            type: "text",
                            text: "Sworn chambers escort during immigration processing, GenDec crew validation, 72-hour shore pass stamps, and high-value personal effects customs declarations.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): FBO Operations Docket */
              {
                id: "prac81-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac81-ops-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac81-ops-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac81-ops-badge",
                            type: "badge",
                            text: "24/7 GAT FLIGHT DISPATCH",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac81-ops-title",
                            type: "heading",
                            level: 4,
                            text: "FBO Coordination Docket",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-item-1",
                            type: "text",
                            text: "✓ Dalaman (LTBS) GAT Ramp Access",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-item-2",
                            type: "text",
                            text: "✓ Milas-Bodrum (LTFE) VIP Apron Slots",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-item-3",
                            type: "text",
                            text: "✓ Crew Temporary Shore Pass Visas",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-item-4",
                            type: "text",
                            text: "✓ Tarmac-to-Helipad Direct Transfer",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac81-ops-divider",
                            type: "divider",
                            style: { sizing: { width: "full" } },
                          },
                          {
                            id: "prac81-ops-timing",
                            type: "text",
                            text: "FBO lead time: 24 to 48 hours for international non-scheduled flights under AIP Turkey.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac81-btn-permit",
                            type: "button",
                            label: "File SHGM Landing Permit Request",
                          },
                          {
                            id: "prac81-btn-guide",
                            type: "button",
                            label: "Download AIP GAT Protocol",
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
 * PRACTICE-82: Superyacht Aviation · Shipboard Helideck Landing & SHGM Flight Clearance
 * Layout Archetype: Dual Comparative Split Screen (6/6)
 */
export const PRACTICE_82_SUPERYACHT_HELIDECK_LANDING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-82-superyacht-helideck-landing-permit",
  name: "Superyacht Aviation · Shipboard Helideck Landing & SHGM Flight Clearance",
  kind: "section",
  root: {
    id: "prac82-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac82-container",
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
            id: "prac82-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac82-badge",
                type: "badge",
                text: "MARITIME AVIATION · SHGM SHT-OPS & CAP 437 · SUPERYACHT HELIDECK COMPLIANCE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac82-heading",
                type: "heading",
                level: 2,
                text: "Shipboard Helideck Certification & Coastal Flight Clearance",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac82-sub",
                type: "text",
                text: "Permitting and operational compliance for private helicopter landings on foreign-flagged superyachts navigating the Bodrum Peninsula, Göcek Bays, and Marmaris sound.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac82-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): CAP 437 Helideck Technical Certification */
              {
                id: "prac82-left-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac82-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac82-left-badge",
                        type: "badge",
                        text: "TRACK A · MARITIME HELIDECK TECHNICAL AUDIT",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac82-left-title",
                        type: "heading",
                        level: 3,
                        text: "CAP 437 & SHGM Technical Standards",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-left-desc",
                        type: "text",
                        text: "Shipboard landing areas must conform to UK CAA CAP 437 and SHGM regulations governing maximum takeoff mass (MTOM), D-value rotor diameters, and emergency response.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac82-left-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac82-lp-1",
                        type: "text",
                        text: "• D-Value & Load Rating: Deck structural load certification for Airbus H130/H145 or Leonardo AW109/AW169 airframes.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-lp-2",
                        type: "text",
                        text: "• Firefighting & Foam System: Compressed Air Foam System (CAFS) and certified maritime helideck rescue apparatus.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-lp-3",
                        type: "text",
                        text: "• Perimeter Safety Netting: Inward-sloping nets and certified recessed tie-down points to secure aircraft in swell.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-left-btn",
                        type: "button",
                        label: "Schedule Helideck Safety Audit",
                      },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Coastal Flight Plan & Coast Guard Notice */
              {
                id: "prac82-right-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac82-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac82-right-badge",
                        type: "badge",
                        text: "TRACK B · FLIGHT AUTHORIZATION & MARITIME NOTICE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac82-right-title",
                        type: "heading",
                        level: 3,
                        text: "Territorial Airspace Flight Permits",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-right-desc",
                        type: "text",
                        text: "Authorizing coastal helicopter transfers between regional airports (LTFE/LTBS), luxury resort villas, and anchored superyachts in Turkish territorial waters.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac82-right-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac82-rp-1",
                        type: "text",
                        text: "• Anchorage GPS Notification: Daily filing of yacht anchor coordinates with Liman Başkanlığı & Sahil Güvenlik.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-rp-2",
                        type: "text",
                        text: "• Low-Altitude VFR Corridors: Coordination with Milas and Dalaman Radar for coastal bay approach flight plans.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-rp-3",
                        type: "text",
                        text: "• Customs Border Clearance: International arrivals on yacht helideck require designated seaport customs clearance.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac82-right-btn",
                        type: "button",
                        label: "File Coastal Flight Plan",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Bottom Banner */
          {
            id: "prac82-banner",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac82-b-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac82-b-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac82-b-badge",
                        type: "badge",
                        text: "STATUTORY SAFETY MANDATE",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac82-b-text",
                        type: "text",
                        text: "Uncertified helideck landings trigger immediate SHGM flight bans and harbor arrest under Maritime Port Directives.",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "prac82-b-btn",
                    type: "button",
                    label: "Connect with Maritime Aviation Counsel",
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
 * PRACTICE-83: High-Value Assets · Ottoman Antique & Art Import Customs Escort
 * Layout Archetype: Tabular Archaeological Gazette Matrix (Law No. 2863 Table)
 */
export const PRACTICE_83_ANTIQUE_ART_CUSTOMS_ESCORT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-83-luxury-antique-art-customs-escort",
  name: "High-Value Assets · Ottoman Antique & Art Import Customs Escort",
  kind: "section",
  root: {
    id: "prac83-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac83-container",
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
            id: "prac83-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac83-badge",
                type: "badge",
                text: "HIGH-VALUE ASSETS · LAW NO. 2863 · CULTURAL PROPERTY & ART ESCORT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac83-heading",
                type: "heading",
                level: 2,
                text: "Ottoman Artifact, Fine Art & Antique Customs Certification",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac83-sub",
                type: "text",
                text: "Navigating Ministry of Culture museum expert commissions, import declarations, and non-prohibited export licenses for high-value collections, yachts, and private estates.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Tabular Archaeological Gazette Matrix Table */
          {
            id: "prac83-matrix-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac83-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Table Header Row */
                  {
                    id: "prac83-th-row",
                    type: "grid",
                    columns: 12,
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "surface-muted" },
                      border: { radius: "sm" },
                    },
                    children: [
                      {
                        id: "prac83-th-col1",
                        type: "text",
                        text: "ASSET CLASSIFICATION",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-th-col2",
                        type: "text",
                        text: "STATUTORY REGIME (LAW 2863)",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-th-col3",
                        type: "text",
                        text: "EXPORT & TRANSFER ELIGIBILITY",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-th-col4",
                        type: "text",
                        text: "CHAMBERS ESCORT PROTOCOL",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },

                  /* Row 1: Ottoman Antiques (Pre-1923) */
                  {
                    id: "prac83-row-1",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac83-r1-c1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        children: [
                          {
                            id: "prac83-r1-title",
                            type: "text",
                            text: "Ottoman Antiques (Pre-1923)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac83-r1-sub",
                            type: "text",
                            text: "Carpets, ceramics, manuscripts, coins",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac83-r1-c2",
                        type: "text",
                        text: "Mandatory Museum Commission audit; private ownership allowed with registration.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r1-c3",
                        type: "text",
                        text: "Absolute Export Ban (Art. 68); criminal offense under Art. 67 to export abroad.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r1-c4",
                        type: "text",
                        text: "Bodrum/Muğla Museum Directorate inventory registration & private collector license.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "prac83-div-1",
                    type: "divider",
                    style: { sizing: { width: "full" } },
                  },

                  /* Row 2: European & Foreign Antiques */
                  {
                    id: "prac83-row-2",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac83-r2-c1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        children: [
                          {
                            id: "prac83-r2-title",
                            type: "text",
                            text: "European & Foreign Antiques",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac83-r2-sub",
                            type: "text",
                            text: "Imported furniture, sculpture, silver",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac83-r2-c2",
                        type: "text",
                        text: "Temporary admission under ATA Carnet or bonded customs declaration.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r2-c3",
                        type: "text",
                        text: "Free Re-Export upon proof of foreign importation and customs clearance certificate.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r2-c4",
                        type: "text",
                        text: "Pre-arrival customs filing, valuation appraisal, and bonded escort to villa.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "prac83-div-2",
                    type: "divider",
                    style: { sizing: { width: "full" } },
                  },

                  /* Row 3: Contemporary Fine Art (Post-1923) */
                  {
                    id: "prac83-row-3",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac83-r3-c1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        children: [
                          {
                            id: "prac83-r3-title",
                            type: "text",
                            text: "Contemporary Fine Art (Post-1923)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac83-r3-sub",
                            type: "text",
                            text: "Paintings, modern installations, prints",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac83-r3-c2",
                        type: "text",
                        text: "Unrestricted private ownership; living artist certification.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r3-c3",
                        type: "text",
                        text: "Exportable with Museum Non-Cultural Property Certificate (İhracında Sakınca Yoktur).",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r3-c4",
                        type: "text",
                        text: "Fast-track 48-hour expert commission inspection and certified export seal.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "prac83-div-3",
                    type: "divider",
                    style: { sizing: { width: "full" } },
                  },

                  /* Row 4: Shipboard Art & Luxury Decor */
                  {
                    id: "prac83-row-4",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac83-r4-c1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        children: [
                          {
                            id: "prac83-r4-title",
                            type: "text",
                            text: "Shipboard Art & Superyacht Decor",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac83-r4-sub",
                            type: "text",
                            text: "Permanent fixtures on foreign yachts",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac83-r4-c2",
                        type: "text",
                        text: "Treated as vessel equipment under Yacht Transit Log regulations.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r4-c3",
                        type: "text",
                        text: "Departs with vessel; must not be offloaded onto Turkish soil without customs clearance.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac83-r4-c4",
                        type: "text",
                        text: "Vessel inventory declaration and marina customs endorsement in Göcek/Bodrum.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac83-footer-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac83-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac83-fc-info",
                    type: "text",
                    text: "Commission an authorized museum expert appraisal prior to international transport to prevent customs seizure.",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "prac83-fc-actions",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "sm",
                    children: [
                      {
                        id: "prac83-btn-audit",
                        type: "button",
                        label: "Commission Museum Directorate Audit",
                      },
                      {
                        id: "prac83-btn-schedule",
                        type: "button",
                        label: "Download Law 2863 Art Schedule",
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
 * PRACTICE-84: Private Sanctuary · Celebrity & HNW Villa Rental Privacy & Drone Shield
 * Layout Archetype: Minimalist Solemn Editorial Monograph with Inset Pull-Quote
 */
export const PRACTICE_84_CELEBRITY_HNW_PRIVACY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-84-celebrity-hnw-privacy-nda-shield",
  name: "Private Sanctuary · Celebrity & HNW Villa Rental Privacy & Drone Shield",
  kind: "section",
  root: {
    id: "prac84-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac84-container",
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
          /* Centered Monograph Column */
          {
            id: "prac84-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { typography: { align: "center" }, sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac84-badge",
                type: "badge",
                text: "SANCTUARY PROTOCOL · TMK ART. 24 & TCK ART. 134 · HNW PRIVACY SHIELD",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac84-heading",
                type: "heading",
                level: 2,
                text: "Celebrity & Ultra-HNW Villa Privacy Charter & Paparazzi Shield",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac84-sub",
                type: "text",
                text: "Enforcing ironclad confidentiality charters, anti-drone exclusion zones, and injunctive publication bans for high-profile residents and summer guests along the Aegean coast.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          {
            id: "prac84-divider-top",
            type: "divider",
            style: { sizing: { width: "full" } },
          },

          /* Solemn Editorial Monograph Body */
          {
            id: "prac84-monograph-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac84-mono-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  {
                    id: "prac84-prose-1",
                    type: "text",
                    text: "Under Turkish Civil Code (TMK) Art. 24 and the European Convention on Human Rights (Art. 8), the right to personal privacy within residential perimeters is an inviolable constitutional entitlement. In luxury coastal enclaves such as Bodrum’s Cennet Koyu, Göcek islands, and Yalıkavak ridges, high-profile guests require rigorous preemptive legal protection against invasive commercial paparazzi, unauthorized drone overflights, and staff disclosures.",
                    style: { typography: { size: "base" }, color: { text: "text" } },
                  },

                  /* Inset Pull-Quote Box */
                  {
                    id: "prac84-pullquote-box",
                    type: "card",
                    element: "div",
                    style: {
                      color: { background: "surface-muted" },
                      border: { width: "hairline", radius: "sm", color: "border" },
                      spacing: { padding: "xl" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac84-pq-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac84-pq-text",
                            type: "text",
                            text: "“The privacy of family life and the sanctity of private sanctuaries along the Aegean coast are protected under constitutional guarantee. Any unauthorized aerial surveillance, photography, or disclosure by service staff triggers immediate injunctive asset freezing and criminal prosecution.”",
                            style: {
                              typography: { size: "lg", weight: "medium" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "prac84-pq-author",
                            type: "text",
                            text: "— Chambers Senior Privacy Counsel · Mediterranean Bar Chancellery",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  {
                    id: "prac84-prose-2",
                    type: "text",
                    text: "Our sanctuary shield protocol operates across three immediate operational axes: (1) Liquidated damages non-disclosure charters signed by all estate personnel, private chefs, and yacht crew with €250,000 penalties; (2) Preemptive SHGM / Kaymakamlık temporary anti-drone flight exclusion petitions over designated villa coordinates; (3) 4-hour emergency ex-parte injunctions (İhtiyati Tedbir) under TCK Art. 134 commanding the immediate seizure of paparazzi media files and statutory broadcast takedowns.",
                    style: { typography: { size: "base" }, color: { text: "text" } },
                  },

                  {
                    id: "prac84-actions",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "center",
                    wrap: true,
                    gap: "md",
                    style: { sizing: { width: "full" } },
                    children: [
                      {
                        id: "prac84-btn-nda",
                        type: "button",
                        label: "Draft Bespoke Sanctuary NDA Protocol",
                      },
                      {
                        id: "prac84-btn-counsel",
                        type: "button",
                        label: "Retain 24/7 Privacy Defense Counsel",
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
 * PRACTICE-85: Private Client · Mediterranean Family Office & Concierge Legal Retainer
 * Layout Archetype: 4-Quadrant Executive Family Office Advisory Matrix (2x2)
 */
export const PRACTICE_85_COASTAL_FAMILY_OFFICE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-85-coastal-family-office-retainer",
  name: "Private Client · Mediterranean Family Office & Concierge Legal Retainer",
  kind: "section",
  root: {
    id: "prac85-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac85-container",
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
            id: "prac85-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac85-badge",
                type: "badge",
                text: "PRIVATE CLIENT CHANCELLERY · MEDITERRANEAN FAMILY OFFICE RETAINER",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac85-heading",
                type: "heading",
                level: 2,
                text: "Comprehensive Coastal Family Office & Concierge Legal Retainer",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac85-sub",
                type: "text",
                text: "Providing dedicated partner-level legal chancellery, cross-border holding management, and 24/7 rapid emergency intervention for international families residing along the Turkish Riviera.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Quadrant Executive 2x2 Matrix */
          {
            id: "prac85-matrix-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Quadrant 1: Cross-Border Tax & Real Estate */
              {
                id: "prac85-quad-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac85-q1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac85-q1-badge",
                        type: "badge",
                        text: "PILLAR I · TAX & REAL ESTATE CHANCELLERY",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac85-q1-title",
                        type: "heading",
                        level: 3,
                        text: "Cross-Border Wealth & Property Holding",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac85-q1-desc",
                        type: "text",
                        text: "Structuring Turkish Limited Şirket (LTD) asset-holding entities, double tax treaty dividend withholding optimization, and Tapu land registry title defense for luxury villa estates.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quadrant 2: Superyacht & Aviation Operations */
              {
                id: "prac85-quad-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac85-q2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac85-q2-badge",
                        type: "badge",
                        text: "PILLAR II · MARITIME & AVIATION RETAINER",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac85-q2-title",
                        type: "heading",
                        level: 3,
                        text: "Superyacht & Jet Flight Management",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac85-q2-desc",
                        type: "text",
                        text: "Continuous oversight of MYBA charter terms, APA escrow accounts, foreign crew maritime labor contracts, shipyard refit escrow agreements, and SHGM private aviation permits.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quadrant 3: Family Governance & Residency */
              {
                id: "prac85-quad-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac85-q3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac85-q3-badge",
                        type: "badge",
                        text: "PILLAR III · FAMILY GOVERNANCE & SUCCESSION",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac85-q3-title",
                        type: "heading",
                        level: 3,
                        text: "Succession, Living Wills & Expat Life",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac85-q3-desc",
                        type: "text",
                        text: "Bespoke Turkish testamentary wills, healthcare power of attorney proxies, long-term residence permits, and international school placement compliance for family dependents.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Quadrant 4: 24/7 Crisis Command */
              {
                id: "prac85-quad-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac85-q4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac85-q4-badge",
                        type: "badge",
                        text: "PILLAR IV · 24/7 CRISIS INTERVENTION",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac85-q4-title",
                        type: "heading",
                        level: 3,
                        text: "Direct Partner Hotline & Rapid Dispatch",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac85-q4-desc",
                        type: "text",
                        text: "Direct partner mobile and encrypted messaging access, 45-minute on-site advocate dispatch to Bodrum, Göcek, or Marmaris authorities, and emergency ex-parte court relief.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Retainer Structure Footer */
          {
            id: "prac85-footer-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac85-fc-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "prac85-fc-title",
                    type: "heading",
                    level: 4,
                    text: "Retainer Structure & Chambers Terms",
                    style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac85-fc-desc",
                    type: "text",
                    text: "Our family office retainers are customized under the Turkish Bar Association Official Tariff with fixed quarterly billing and unlimited urgent crisis interventions. Each client family is assigned a dedicated senior partner advocate.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac85-fc-actions",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "md",
                    children: [
                      {
                        id: "prac85-btn-consult",
                        type: "button",
                        label: "Schedule Confidential Partner Consultation",
                      },
                      {
                        id: "prac85-btn-terms",
                        type: "button",
                        label: "Request Family Office Retainer Term Sheet",
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

export const PRACTICE_LIBRARY_BATCH_17: ComponentDocument[] = [
  PRACTICE_81_DALAMAN_BODRUM_VIP_AVIATION_DOCUMENT,
  PRACTICE_82_SUPERYACHT_HELIDECK_LANDING_DOCUMENT,
  PRACTICE_83_ANTIQUE_ART_CUSTOMS_ESCORT_DOCUMENT,
  PRACTICE_84_CELEBRITY_HNW_PRIVACY_DOCUMENT,
  PRACTICE_85_COASTAL_FAMILY_OFFICE_DOCUMENT,
];
