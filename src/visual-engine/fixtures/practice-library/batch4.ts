import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 4: Property, Title Deed (Tapu) & Real Estate (#16–#20)
 * Coastal Turkish Legal Chambers (Fethiye, Göcek, Kalkan, Bodrum)
 * Aesthetic: Warm cream/linen surfaces, deep navy serif typography,
 * Aegean teal accents, structured cadastral checklists, statutory warning cards.
 * ============================================================================
 */

/**
 * PRACTICE-16: Foreign Buyer Protection · 6-Step Title Deed (Tapu) Verification
 * Layout: 2-Column Due Diligence Checklist Split
 * Visual Family: Editorial Real Estate Audit
 */
export const PRACTICE_16_TAPU_DUE_DILIGENCE_CHECKLIST_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-16-tapu-due-diligence-checklist",
  name: "Foreign Buyer Protection · 6-Step Title Deed (Tapu) Verification",
  kind: "section",
  root: {
    id: "prac16-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac16-container",
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
            id: "prac16-header",
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
                id: "prac16-badge",
                type: "badge",
                text: "CONVEYANCING DUE DILIGENCE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac16-title",
                type: "heading",
                level: 2,
                text: "6-Step Title Deed (Tapu) Verification",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac16-subtitle",
                type: "text",
                text: "Essential statutory searches conducted before paying a property reservation deposit or signing developer contracts in Fethiye, Kalkan, or Bodrum.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Split Checklist */
          {
            id: "prac16-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Left Column: Steps 1 - 3 */
              {
                id: "prac16-col1",
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
                    id: "prac16-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      /* Step 1 */
                      {
                        id: "prac16-s1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac16-s1-title",
                            type: "heading",
                            level: 3,
                            text: "1. TAKBİS Registry Archive Audit",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac16-s1-desc",
                            type: "text",
                            text: "Full digital interrogation of the General Directorate of Land Registry (TKGM) archive to verify true registered freehold title and ownership chain.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Step 2 */
                      {
                        id: "prac16-s2",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac16-s2-title",
                            type: "heading",
                            level: 3,
                            text: "2. Encumbrance & Mortgage Search (İpotek / Haciz)",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac16-s2-desc",
                            type: "text",
                            text: "Confirmation that the parcel is free of bank liens, enforcement attachment orders (İcra Haczi), tax department restrictions, or third-party usufruct rights.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Step 3 */
                      {
                        id: "prac16-s3",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac16-s3-title",
                            type: "heading",
                            level: 3,
                            text: "3. Habitation Certificate (İskan / Yapı Kullanma İzni)",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac16-s3-desc",
                            type: "text",
                            text: "Physical inspection of municipal building occupancy permits to ensure the villa is completed strictly in accordance with approved architectural plans.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Steps 4 - 6 */
              {
                id: "prac16-col2",
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
                    id: "prac16-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      /* Step 4 */
                      {
                        id: "prac16-s4",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac16-s4-title",
                            type: "heading",
                            level: 3,
                            text: "4. Cadastral Boundary Alignment (Kadastro Aplikasyonu)",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac16-s4-desc",
                            type: "text",
                            text: "Cross-referencing boundary stones with licensed cadastre engineers (LİHKAB) to confirm physical garden walls do not encroach on public forest or neighbor land.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Step 5 */
                      {
                        id: "prac16-s5",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac16-s5-title",
                            type: "heading",
                            level: 3,
                            text: "5. Military & Strategic Zone Clearance",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac16-s5-desc",
                            type: "text",
                            text: "Verifying the property is situated outside military forbidden zones (Askeri Yasak Bölge) and strategic security installations under Law No. 2565.",
                            style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Step 6 */
                      {
                        id: "prac16-s6",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac16-s6-title",
                            type: "heading",
                            level: 3,
                            text: "6. Foreign Acquisition Eligibility (Yabancıya Satış)",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac16-s6-desc",
                            type: "text",
                            text: "Ensuring foreign ownership does not breach the statutory 10% district private land cap or the 30-hectare national individual limit under Land Registry Law Art. 35.",
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

          /* Bottom Action */
          {
            id: "prac16-action",
            type: "button",
            label: "Commission Comprehensive Title Deed (Tapu) Audit",
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
 * PRACTICE-17: Conveyancing Protocol · 4-Phase Cross-Border Villa Purchase
 * Layout: 4-Column Horizontal Conveyancing Pipeline
 * Visual Family: Editorial Real Estate Roadmap
 */
export const PRACTICE_17_VILLA_PURCHASE_SAFEGUARD_STEPS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-17-villa-purchase-safeguard-steps",
  name: "Conveyancing Protocol · 4-Phase Cross-Border Villa Purchase",
  kind: "section",
  root: {
    id: "prac17-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac17-container",
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
            id: "prac17-header",
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
                id: "prac17-badge",
                type: "badge",
                text: "CONVEYANCING ROADMAP",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac17-title",
                type: "heading",
                level: 2,
                text: "4-Phase Coastal Villa Conveyancing Protocol",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac17-subtitle",
                type: "text",
                text: "The structured procedural path from initial reservation to physical title deed handover, ensuring zero fund exposure during conveyance.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Column Pipeline Grid */
          {
            id: "prac17-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              /* Phase 1 */
              {
                id: "prac17-p1-card",
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
                    id: "prac17-p1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac17-p1-badge",
                        type: "badge",
                        text: "PHASE 01",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac17-p1-title",
                        type: "heading",
                        level: 3,
                        text: "Preliminary Contract & Registry Search",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac17-p1-desc",
                        type: "text",
                        text: "Drafting bilingual sales contract with penalty clauses, confirming TAKBİS title status, and executing client Power of Attorney (Vekâletname).",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Phase 2 */
              {
                id: "prac17-p2-card",
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
                    id: "prac17-p2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac17-p2-badge",
                        type: "badge",
                        text: "PHASE 02",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac17-p2-title",
                        type: "heading",
                        level: 3,
                        text: "SPK Valuation & DAB Currency Certificate",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac17-p2-desc",
                        type: "text",
                        text: "Commissioning Capital Markets Board (SPK) licensed property valuation and securing Central Bank foreign exchange certificate (DAB).",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Phase 3 */
              {
                id: "prac17-p3-card",
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
                    id: "prac17-p3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac17-p3-badge",
                        type: "badge",
                        text: "PHASE 03",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac17-p3-title",
                        type: "heading",
                        level: 3,
                        text: "Tax ID Issuance & Escrow Protection",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac17-p3-desc",
                        type: "text",
                        text: "Opening buyer Turkish tax number, client bank accounts, and lodging purchase monies into attorney escrow account (Bloke Çek / Emanet).",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Phase 4 */
              {
                id: "prac17-p4-card",
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
                    id: "prac17-p4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac17-p4-badge",
                        type: "badge",
                        text: "PHASE 04",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac17-p4-title",
                        type: "heading",
                        level: 3,
                        text: "Land Registry Deed Execution & Keys Handover",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac17-p4-desc",
                        type: "text",
                        text: "Attending Land Registry Office with sworn interpreter, executing official title deed register, releasing escrow funds, and collecting original Tapu.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Conveyancing Guide Link */
          {
            id: "prac17-guide-link",
            type: "link",
            label: "Download Full 2026 Coastal Conveyancing Guide & Retainer Terms (PDF)",
            href: "/conveyancing-guide",
            openInNewTab: false,
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-18: Off-Plan Construction · Developer Contract Red-Flag Warnings
 * Layout: 3-Column Warning Matrix (Off-plan buyer risk audit)
 * Visual Family: High-Caution Legal Warning Cards
 */
export const PRACTICE_18_CONSTRUCTION_CONTRACT_REDFLAGS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-18-construction-contract-redflags",
  name: "Off-Plan Construction · Developer Contract Red-Flag Warnings",
  kind: "section",
  root: {
    id: "prac18-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac18-container",
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
            id: "prac18-header",
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
                id: "prac18-badge",
                type: "badge",
                text: "CONSTRUCTION CONTRACT SAFEGUARDS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac18-title",
                type: "heading",
                level: 2,
                text: "Off-Plan Developer Contract Red-Flags",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac18-subtitle",
                type: "text",
                text: "Critical legal defects in standard developer sales contracts that leave off-plan buyers without proprietary title protection under Turkish Law.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Card Warning Grid */
          {
            id: "prac18-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Red-Flag 1 */
              {
                id: "prac18-w1-card",
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
                    id: "prac18-w1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac18-w1-badge",
                        type: "badge",
                        text: "FATAL DEFECT: NULLITY",
                        style: {
                          color: { background: "surface-muted", text: "danger" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac18-w1-title",
                        type: "heading",
                        level: 3,
                        text: "Unnotarized Promise of Sale Contracts",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac18-w1-desc",
                        type: "text",
                        text: "Under Turkish Civil Code (TMK Art. 706) and Notary Law (Art. 60), simple written contracts signed at estate agency offices are legally void for conveying real estate rights.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Red-Flag 2 */
              {
                id: "prac18-w2-card",
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
                    id: "prac18-w2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac18-w2-badge",
                        type: "badge",
                        text: "FINANCIAL EXPOSURE",
                        style: {
                          color: { background: "surface-muted", text: "warning" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac18-w2-title",
                        type: "heading",
                        level: 3,
                        text: "Absence of Builder Completion Guarantee",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac18-w2-desc",
                        type: "text",
                        text: "Never release staged construction installments without an irrevocable bank guarantee letter (Banka Teminat Mektubu) or independent architect progress certifications.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Red-Flag 3 */
              {
                id: "prac18-w3-card",
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
                    id: "prac18-w3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac18-w3-badge",
                        type: "badge",
                        text: "DELIVERY LOOPHOLES",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac18-w3-title",
                        type: "heading",
                        level: 3,
                        text: "Omission of Daily Delay Penalty Clauses",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac18-w3-desc",
                        type: "text",
                        text: "Contracts must stipulate liquidated daily delay damages (Cezai Şart) pegged to fair rental values and define precise sunset cancellation dates.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Retainer Link */
          {
            id: "prac18-review-link",
            type: "link",
            label: "Instruct Chambers to Review & Amend Proposed Developer Contract",
            href: "mailto:contracts@yanatmalaw.com",
            openInNewTab: false,
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-19: Tourism Residence · Turizm Konut Short-Term Rental Licensing
 * Layout: Split 65/35 Content-Heavy Card (Law No. 7464 Compliance)
 * Visual Family: Hospitality Statutory Compliance
 */
export const PRACTICE_19_HOLIDAY_LETTING_LICENSING_CARD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-19-holiday-letting-licensing-card",
  name: "Tourism Residence · Turizm Konut Short-Term Rental Licensing",
  kind: "section",
  root: {
    id: "prac19-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac19-container",
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
            id: "prac19-header",
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
                id: "prac19-badge",
                type: "badge",
                text: "LAW NO. 7464 · TOURISM HOUSING PERMITS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac19-title",
                type: "heading",
                level: 2,
                text: "Short-Term Villa Rental Licensing (Turizm Konut)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac19-subtitle",
                type: "text",
                text: "Foreign and domestic villa owners letting residential premises for under 100 days must secure an official Ministry of Culture & Tourism license to avoid statutory fines up to 1,000,000 TRY.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Split 65/35 Grid */
          {
            id: "prac19-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Statutory Requirements (8 cols) */
              {
                id: "prac19-criteria-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac19-crit-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac19-crit-heading",
                        type: "heading",
                        level: 3,
                        text: "Mandatory Statutory Licensing Prerequisites",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac19-cr1",
                        type: "text",
                        text: "1. 100% Unanimous Co-Owner Approval (Kat Malikleri Oybirliği): For apartments and shared compounds, unanimous written consent from all building unit owners is mandatory before submitting Ministry applications.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac19-cr2",
                        type: "text",
                        text: "2. Ministry Identification Plaque: Official brass permit plaque issued by the Ministry of Culture and Tourism must be permanently mounted at the property entrance.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac19-cr3",
                        type: "text",
                        text: "3. Police Identity Reporting System (KBS Integration): All guest check-ins must be digitally transmitted to the Gendarmerie/Police identity registry within 24 hours under Law No. 1774.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac19-cr4",
                        type: "text",
                        text: "4. Fire Safety & Liability Insurance: Mandatory smoke detectors, carbon monoxide monitors, emergency exit signage, and commercial third-party guest liability policies.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Ministry Application Desk (4 cols) */
              {
                id: "prac19-apply-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac19-apply-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac19-apply-badge",
                        type: "badge",
                        text: "LEGAL APPLICATION DESK",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac19-apply-heading",
                        type: "heading",
                        level: 3,
                        text: "Full License Filing Service",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac19-apply-desc",
                        type: "text",
                        text: "Chambers handles e-Devlet government portal submissions, building management assembly notifications, and municipal inspections on behalf of nonresident owners.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac19-apply-btn",
                        type: "button",
                        label: "Apply for Rental License",
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
 * PRACTICE-20: Land Boundary · Cadastral Encroachment & Co-Ownership Resolution
 * Layout: 2-Column Split Contrast Dichotomy (Boundary Rectification vs Partition)
 * Visual Family: Contentious Property Dispute Resolution
 */
export const PRACTICE_20_CADASTRAL_BOUNDARY_DISPUTE_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-20-cadastral-boundary-dispute-split",
  name: "Land Boundary · Cadastral Encroachment & Co-Ownership Resolution",
  kind: "section",
  root: {
    id: "prac20-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac20-container",
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
            id: "prac20-header",
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
                id: "prac20-badge",
                type: "badge",
                text: "CONTENTIOUS REAL ESTATE LITIGATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac20-title",
                type: "heading",
                level: 2,
                text: "Cadastral Boundary & Co-Ownership Lawsuits",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac20-subtitle",
                type: "text",
                text: "Strategic representation before the Fethiye and Muğla Civil Courts for border determination, forest boundary overlaps, and forced partition of shared estates.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Split Action Grid */
          {
            id: "prac20-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Action 1: Boundary Determination (Sınır Tespiti) */
              {
                id: "prac20-a1-card",
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
                    id: "prac20-a1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac20-a1-badge",
                        type: "badge",
                        text: "BOUNDARY & TRESPASS ACTIONS",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac20-a1-heading",
                        type: "heading",
                        level: 3,
                        text: "Boundary Determination & Encroachment (Elatmanın Önlenmesi)",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac20-a1-desc",
                        type: "text",
                        text: "Resolution of physical encroachments by neighboring landowners, unrecorded agricultural boundary shifting, and overlapping forestry cadastre borders (2/B arazisi) through judicial on-site surveys (Keşif) with court-appointed expert surveyors.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac20-a1-actions",
                        type: "text",
                        text: "Remedies: Court injunctions against illegal construction, removal of encroachments (Kal Kararı), and retroactive compensation for unlawful occupation (Ecrimisil).",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Action 2: Partition of Shared Estates (İzale-i Şüyu) */
              {
                id: "prac20-a2-card",
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
                    id: "prac20-a2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac20-a2-badge",
                        type: "badge",
                        text: "CO-OWNERSHIP PARTITION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac20-a2-heading",
                        type: "heading",
                        level: 3,
                        text: "Dissolution of Joint Property (İzale-i Şüyu Davası)",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac20-a2-desc",
                        type: "text",
                        text: "Where multiple heirs or co-owners disagree on property disposal or development, any single shareholder has the absolute legal right under Turkish Civil Code (TMK Art. 698) to petition the court to partition or auction the asset.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac20-a2-actions",
                        type: "text",
                        text: "Remedies: Judicial physical division (Aynen Taksim) or court public auction with distribution of sales proceeds to registered shareholders.",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Retain Action Button */
          {
            id: "prac20-btn",
            type: "button",
            label: "Retain Chambers for Land Litigation & Court Survey",
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

export const PRACTICE_LIBRARY_BATCH_4 = [
  PRACTICE_16_TAPU_DUE_DILIGENCE_CHECKLIST_DOCUMENT,
  PRACTICE_17_VILLA_PURCHASE_SAFEGUARD_STEPS_DOCUMENT,
  PRACTICE_18_CONSTRUCTION_CONTRACT_REDFLAGS_DOCUMENT,
  PRACTICE_19_HOLIDAY_LETTING_LICENSING_CARD_DOCUMENT,
  PRACTICE_20_CADASTRAL_BOUNDARY_DISPUTE_SPLIT_DOCUMENT,
] as const;

