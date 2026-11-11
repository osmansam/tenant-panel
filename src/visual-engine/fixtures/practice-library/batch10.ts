import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 10: Coastal Construction & Zoning (#46–#50)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 46: 3-Tier Environmental Conservation Stepper (ÖÇKK Natural Site 1-2-3 rail)
 * 47: Split Risk Audit Desk (Satellite date analysis vs Ministry cancellation defense)
 * 48: Architectural Monograph with Inset Pull-Quote (Anıtlar Kurulu stone restoration)
 * 49: 4-Stage Milestone Escrow Rail (Foundation → Frame → Finishing → İskan release)
 * 50: Full-Bleed Coastal Warning & Demolition Defense Bar (Kıyı Kanunu 50m barrier)
 * ============================================================================
 */

/**
 * PRACTICE-46: Natural Protected Area (ÖÇKK) Zoning Clearance Stepper
 * Layout Archetype: 3-Tier Environmental Conservation Stepper
 */
export const PRACTICE_46_TABIAT_VARLIKLARI_HERITAGE_MAP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-46-tabiat-varliklari-heritage-map",
  name: "Natural Protected Area (ÖÇKK) Zoning Clearance Stepper",
  kind: "section",
  root: {
    id: "prac46-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac46-container",
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
            id: "prac46-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac46-badge",
                type: "badge",
                text: "NATURAL HERITAGE PROTECTION · TABİAT VARLIKLARI (ÖÇKK)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac46-heading",
                type: "heading",
                level: 2,
                text: "Aegean Special Environmental Protection (ÖÇKK) Zoning Tiers",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac46-sub",
                type: "text",
                text: "Real estate in Göcek, Fethiye, and Datça is governed by Tabiat Varlıklarını Koruma Genel Müdürlüğü decrees. Development feasibility depends strictly on the parcel’s statutory conservation tier.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Linear Horizontal 3-Tier Conservation Stepper */
          {
            id: "prac46-stepper",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Tier 1: Kesin Korunacak Hassas Alan */
              {
                id: "prac46-t1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "danger", radius: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac46-t1-badge",
                    type: "text",
                    text: "TIER 01 · 1ST DEGREE NATURAL SITE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "danger" } },
                  },
                  {
                    id: "prac46-t1-title",
                    type: "heading",
                    level: 3,
                    text: "Strict Ecological Sanctuary",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac46-t1-desc",
                    type: "text",
                    text: "Zero construction permitted. No foundations, wooden decks, glamping, or utility connections allowed. Private ownership permitted but development is statutorily barred.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Tier 2: Nitelikli Doğal Koruma Alanı */
              {
                id: "prac46-t2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "primary", radius: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac46-t2-badge",
                    type: "text",
                    text: "TIER 02 · 2ND DEGREE NATURAL SITE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac46-t2-title",
                    type: "heading",
                    level: 3,
                    text: "Low-Impact Eco-Concessions",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac46-t2-desc",
                    type: "text",
                    text: "Non-permanent, demountable wooden pavilions, day-trip beach facilities, and certified organic farming permitted upon central Ministry Commission approval.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Tier 3: Sürdürülebilir Koruma ve Kontrollü Kullanım Alanı */
              {
                id: "prac46-t3",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac46-t3-badge",
                    type: "text",
                    text: "TIER 03 · 3RD DEGREE SUSTAINABLE USE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac46-t3-title",
                    type: "heading",
                    level: 3,
                    text: "Controlled Boutique Hospitality",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac46-t3-desc",
                    type: "text",
                    text: "Low-density boutique hotels and villas allowed subject to strict Floor Area Ratio (EMSAL) limits (0.10 to 0.15), two-story height caps, and regional stone cladding.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },

          /* Footer Action */
          {
            id: "prac46-footer",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "between",
            wrap: true,
            gap: "md",
            style: { sizing: { width: "full" } },
            children: [
              {
                id: "prac46-ft-p",
                type: "text",
                text: "Chambers verifies parcel coordinates against Tabiat Varlıkları GIS satellite databases prior to acquisition.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "prac46-ft-btn",
                type: "button",
                label: "Order Parcel ÖÇKK Conservation Tier Cadastral Audit",
                href: "#ockk-audit",
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
 * PRACTICE-47: İmar Barışı Yapı Kayıt Belgesi Verifier & Cancellation Risk Audit
 * Layout Archetype: Split Risk Audit Desk
 */
export const PRACTICE_47_IMAR_BARISI_CERTIFICATE_VERIFIER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-47-imar-barisi-certificate-verifier",
  name: "İmar Barışı Yapı Kayıt Belgesi Verifier & Cancellation Risk Audit",
  kind: "section",
  root: {
    id: "prac47-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac47-container",
        type: "grid",
        columns: 12,
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
          spacing: { gap: "xl" },
        },
        children: [
          /* Left Column (Span 6): Risk Exposition */
          {
            id: "prac47-left-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
            children: [
              {
                id: "prac47-badge",
                type: "badge",
                text: "ZONING PEACE AMNESTY · YAPI KAYIT BELGESİ AUDIT",
                style: {
                  color: { background: "surface-muted", text: "danger" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac47-title",
                type: "heading",
                level: 2,
                text: "Yapı Kayıt Belgesi Revocation & Criminal Prosecution Shield",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac47-desc",
                type: "text",
                text: "Purchasing a coastal luxury villa or boutique hotel relying on an amnesty Yapı Kayıt Belgesi is the highest-risk transaction in Turkey today. The Ministry actively compares historic satellite imagery: if construction was completed after 31 December 2017, the certificate is revoked, the building ordered demolished, and the owner prosecuted under TCK 184.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "prac47-list",
                type: "list",
                marker: "check",
                items: [
                  "Forensic Harita Genel Müdürlüğü satellite date certification (Pre-31.12.2017)",
                  "Verification of declared square meters vs. actual built footprint",
                  "Milli Emlak public land trespass exclusion verification",
                  "Administrative court defense against demolition notices",
                ],
                style: { typography: { size: "base" }, color: { text: "text" } },
              },
            ],
          },

          /* Right Column (Span 6): Verification Protocol Desk */
          {
            id: "prac47-right-card",
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
                id: "prac47-rc-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "prac47-rc-badge",
                    type: "badge",
                    text: "CHAMBERS DEFENSE PROTOCOL",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "prac47-rc-heading",
                    type: "heading",
                    level: 3,
                    text: "What Happens When a Certificate Is Challenged?",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac47-rc-p1",
                    type: "text",
                    text: "1. Ministry serves formal notice of revocation.\n2. Municipality issues demolition order (Yıkım Kararı) within 15 days.\n3. Public prosecutor opens criminal probe under Turkish Penal Code Art. 184.\n4. Our chambers files an urgent Administrative Court stay of execution (Yürütmeyi Durdurma) citing vested property rights.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac47-rc-divider",
                    type: "divider",
                  },
                  {
                    id: "prac47-rc-btn",
                    type: "button",
                    label: "Verify Property Yapı Kayıt Belgesi Before Signing Sale",
                    href: "#yapi-kayit-audit",
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

/**
 * PRACTICE-48: Sit Alanı Historical Stone House Restoration Guide
 * Layout Archetype: Architectural Monograph with Inset Pull-Quote
 */
export const PRACTICE_48_SIT_ALANI_STONE_HOUSE_GUIDE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-48-sit-alani-stone-house-guide",
  name: "Sit Alanı Historical Stone House Restoration Guide",
  kind: "section",
  root: {
    id: "prac48-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac48-monograph",
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
            id: "prac48-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { typography: { align: "center" } },
            children: [
              {
                id: "prac48-badge",
                type: "badge",
                text: "CULTURAL HERITAGE LAW NO. 2863 · ANITLAR KURULU GUIDELINES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac48-title",
                type: "heading",
                level: 2,
                text: "Restoring Heritage Stone Mansions in Aegean Sit Alanı Zones",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Prominent Architect / Counsel Pull-Quote */
          {
            id: "prac48-quote-box",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              color: { background: "surface-muted", text: "text" },
              border: { width: "hairline", color: "border", radius: "md" },
              spacing: { paddingX: "xl", paddingY: "lg" },
              typography: { align: "center" },
            },
            children: [
              {
                id: "prac48-quote-text",
                type: "text",
                text: "“In historical towns like Kayaköy, Alaçatı, and Kalkan, touching a single stone without an approved Rölöve, Restitüsyon, and Restorasyon project approved by the Monuments Board is a federal criminal offense under Law No. 2863.”",
                style: { typography: { size: "xl", leading: "relaxed" }, color: { text: "primary" } },
              },
              {
                id: "prac48-quote-author",
                type: "text",
                text: "— Historical Preservation Practice Group · Yanatma Chambers Fethiye",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Two-Column Editorial Text (Prose) */
          {
            id: "prac48-columns",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              {
                id: "prac48-col1",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                children: [
                  {
                    id: "prac48-c1-h",
                    type: "heading",
                    level: 3,
                    text: "Rölöve & Architectural Heritage Filings",
                    style: { typography: { size: "xl", weight: "bold" } },
                  },
                  {
                    id: "prac48-c1-p",
                    type: "text",
                    text: "Every licensed restoration requires laser-measured 3D point cloud architectural drawings documenting every existing timber beam and masonry lintel. Anıtlar Kurulu (Kültür Varlıklarını Koruma Bölge Kurulu) inspects the stone quarry origin and lime mortar mix ratios prior to approving structural work.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "prac48-col2",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                children: [
                  {
                    id: "prac48-c2-h",
                    type: "heading",
                    level: 3,
                    text: "Tax Exemptions & Boutique Conversion",
                    style: { typography: { size: "xl", weight: "bold" } },
                  },
                  {
                    id: "prac48-c2-p",
                    type: "text",
                    text: "Officially registered Grade 1 and Grade 2 cultural assets enjoy full Real Estate Tax (Emlak Vergisi) exemptions and zero title deed transfer tax fees. Properties converting into heritage boutique hotels qualify for subsidized development credits under Tourism Incentive Law No. 2634.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },

          /* Single Elegant Action */
          {
            id: "prac48-cta",
            type: "button",
            label: "Schedule Historical Mansion Restoration Legal Audit",
            href: "#restoration-audit",
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
 * PRACTICE-49: Construction Lien & Milestone Escrow Desk
 * Layout Archetype: 4-Stage Milestone Escrow Rail
 */
export const PRACTICE_49_CONSTRUCTION_LIEN_RETENTION_DESK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-49-construction-lien-retention-desk",
  name: "Construction Milestone Escrow & Contractor Defect Lien Desk",
  kind: "section",
  root: {
    id: "prac49-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac49-container",
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
            id: "prac49-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac49-badge",
                type: "badge",
                text: "CONSTRUCTION LAW & ESCROW · NOTARY RETENTION CONTRACTS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac49-title",
                type: "heading",
                level: 2,
                text: "Villa Construction Milestone Bank Escrow & Defect Retention",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac49-sub",
                type: "text",
                text: "Never pay custom villa builders in advance without milestone escrow releases tied to civil engineer structural certifications and a mandatory 12-month defect warranty retention.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Milestone Escrow Rail */
          {
            id: "prac49-escrow-rail",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Milestone 1 */
              {
                id: "prac49-m1",
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
                    id: "prac49-m1-tag",
                    type: "text",
                    text: "MILESTONE 01 · 25% RELEASE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac49-m1-h",
                    type: "heading",
                    level: 3,
                    text: "Sub-Structure & Foundation",
                    style: { typography: { size: "lg", weight: "bold" } },
                  },
                  {
                    id: "prac49-m1-p",
                    type: "text",
                    text: "Released only upon certified concrete core crush laboratory testing (C30/37) and waterproofing membrane sign-off.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Milestone 2 */
              {
                id: "prac49-m2",
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
                    id: "prac49-m2-tag",
                    type: "text",
                    text: "MILESTONE 02 · 25% RELEASE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac49-m2-h",
                    type: "heading",
                    level: 3,
                    text: "Reinforced Concrete Frame",
                    style: { typography: { size: "lg", weight: "bold" } },
                  },
                  {
                    id: "prac49-m2-p",
                    type: "text",
                    text: "Structural skeleton completion, roof timber truss installation, and brick masonry exterior perimeter walls.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Milestone 3 */
              {
                id: "prac49-m3",
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
                    id: "prac49-m3-tag",
                    type: "text",
                    text: "MILESTONE 03 · 30% RELEASE",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac49-m3-h",
                    type: "heading",
                    level: 3,
                    text: "Mechanical & Interior Fit-Out",
                    style: { typography: { size: "lg", weight: "bold" } },
                  },
                  {
                    id: "prac49-m3-p",
                    type: "text",
                    text: "Underfloor heating, electrical certification, marble tiling, double glazing joinery, and infinity pool mechanics.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Milestone 4: Final Retention */
              {
                id: "prac49-m4",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "sm",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "primary", radius: "md" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac49-m4-tag",
                    type: "text",
                    text: "MILESTONE 04 · 20% RETENTION",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "prac49-m4-h",
                    type: "heading",
                    level: 3,
                    text: "İskan & 12-Month Defect Lien",
                    style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac49-m4-p",
                    type: "text",
                    text: "Released strictly upon municipal Yapı Kullanma İzin Belgesi (İskan) issuance and 12-month latent defect audit.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },

          /* CTA */
          {
            id: "prac49-cta",
            type: "button",
            label: "Draft Notarized Construction Contract with Bank Escrow Terms",
            href: "#escrow-contract",
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
 * PRACTICE-50: Coastal Setback Line (Kıyı Kanunu 50m) Warning & Defense Bar
 * Layout Archetype: Full-Bleed Coastal Warning & Demolition Defense Bar
 */
export const PRACTICE_50_COASTAL_SETBACK_LINE_INFRINGEMENT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-50-coastal-setback-line-infringement",
  name: "Coastal Setback Line (Kıyı Kanunu 50m) Warning & Demolition Defense Bar",
  kind: "section",
  root: {
    id: "prac50-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac50-container",
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
          /* Full-Bleed Emergency Coastal Warning Bar */
          {
            id: "prac50-alert",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: {
              sizing: { width: "full" },
              color: { background: "surface-muted", text: "text" },
              border: { width: "hairline", color: "danger", radius: "md" },
              spacing: { paddingX: "xl", paddingY: "lg" },
            },
            children: [
              {
                id: "prac50-alert-badge",
                type: "badge",
                text: "EMERGENCY COASTAL STATUTE · LAW NO. 3621 ARTICLE 5",
                style: {
                  color: { background: "surface", text: "danger" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac50-alert-title",
                type: "heading",
                level: 3,
                text: "50-Meter Coastal Setback Prohibitions & Demolition Orders",
                style: {
                  typography: { size: "2xl", weight: "bold" },
                  color: { text: "danger" },
                },
              },
              {
                id: "prac50-alert-p",
                type: "text",
                text: "Under Turkish Coastal Law No. 3621, the first 50 meters from the coastal edge line (Kıyı Kenar Çizgisi) are strictly reserved for public use. Permanent fences, swimming pools, retaining walls, and villas constructed inside this boundary are void under constitutional law and cannot be protected by building amnesties.",
                style: { typography: { size: "sm" }, color: { text: "text" } },
              },
            ],
          },

          /* Bottom Defense Strategy Split (No cards, pure legal exposition) */
          {
            id: "prac50-defense-split",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Cadastral Boundary Correction */
              {
                id: "prac50-col-left",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                children: [
                  {
                    id: "prac50-cl-h",
                    type: "heading",
                    level: 3,
                    text: "Challenging Faulty Cadastral Edge Line Determinations",
                    style: { typography: { size: "xl", weight: "bold" } },
                  },
                  {
                    id: "prac50-cl-p",
                    type: "text",
                    text: "Many coastal setback demolition orders in Fethiye, Bodrum, and Marmaris rely on historical 1980s coastal boundary maps drawn before modern satellite bathymetry. Our chambers petitions the Ministry Valiliği Komisyonu to re-survey sea-bed topography and prove the genuine high-water mark.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Right Column: Pre-1992 Vested Rights Defense */
              {
                id: "prac50-col-right",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                children: [
                  {
                    id: "prac50-cr-h",
                    type: "heading",
                    level: 3,
                    text: "Pre-1992 Vested Rights (Kazanılmış Hak) Protection",
                    style: { typography: { size: "xl", weight: "bold" } },
                  },
                  {
                    id: "prac50-cr-p",
                    type: "text",
                    text: "Structures built with legitimate municipal construction permits prior to the 1992 Coastal Law amendments enjoy constitutional protection. If the municipality attempts expropriation without market-rate compensation, we file Danıştay precedent claims securing full compensation.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac50-cr-btn",
                    type: "button",
                    label: "File Coastal Injunction & Stay of Demolition",
                    href: "#coastal-injunction",
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
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_10: ComponentDocument[] = [
  PRACTICE_46_TABIAT_VARLIKLARI_HERITAGE_MAP_DOCUMENT,
  PRACTICE_47_IMAR_BARISI_CERTIFICATE_VERIFIER_DOCUMENT,
  PRACTICE_48_SIT_ALANI_STONE_HOUSE_GUIDE_DOCUMENT,
  PRACTICE_49_CONSTRUCTION_LIEN_RETENTION_DESK_DOCUMENT,
  PRACTICE_50_COASTAL_SETBACK_LINE_INFRINGEMENT_DOCUMENT,
];
