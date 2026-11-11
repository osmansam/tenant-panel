import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 20: Vineyard, Olive Grove & Gastronomy (#96–#100)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 96: Asymmetric 70/30 Olive Protection Law No. 3573 Dossier (8/4: Zeytin Kanunu)
 * 97: 5-Stage Chronological Production Licensing Rail (TAPDK Winery Stepper)
 * 98: Parchment Master Chef Key-Person Agreement Workbench (Michelin Culinary)
 * 99: Tabular Terroir Geographical Indication Matrix (Coğrafi İşaret Registry)
 * 100: Dual Comparative Split Screen (6/6: Vintage Wine Duty vs Bonded Cellar)
 * ============================================================================
 */

/**
 * PRACTICE-96: Agricultural Law · Olive Grove Agro-Tourism Zoning Shield (Zeytin Kanunu)
 * Layout Archetype: Asymmetric 70/30 Olive Protection Law No. 3573 Dossier (8/4)
 */
export const PRACTICE_96_OLIVE_GROVE_ZONING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-96-olive-grove-agro-tourism-zoning-shield",
  name: "Agricultural Law · Olive Grove Agro-Tourism Zoning Shield (Zeytin Kanunu)",
  kind: "section",
  root: {
    id: "prac96-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac96-container",
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
            id: "prac96-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac96-badge",
                type: "badge",
                text: "AGRICULTURAL LAW NO. 3573 · OLIVE CONSERVATION · AGRO-TOURISM ZONING",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac96-heading",
                type: "heading",
                level: 2,
                text: "Olive Grove Estate Boutique Winery & Tasting Room Permitting",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac96-sub",
                type: "text",
                text: "Navigating strict 3-kilometer olive grove non-industrial buffers to permit luxury vineyard estates, olive oil mills, and farm-to-table culinary pavilions in Urla and Bodrum.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Grid */
          {
            id: "prac96-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): Law No. 3573 Compliance Dossier */
              {
                id: "prac96-main-dossier",
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
                    id: "prac96-md-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac96-md-b",
                        type: "badge",
                        text: "STATUTORY PROTECTION MANDATE · LAW 3573 ART. 20",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac96-md-t",
                        type: "heading",
                        level: 3,
                        text: "Agricultural Commission Non-Detriment Clearance",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac96-md-d",
                        type: "text",
                        text: "Law No. 3573 strictly prohibits any facility generating dust or chemical smoke within 3 km of olive groves. Agro-tourism facilities, artisanal olive oil pressing mills, and boutique tasting pavilions require Provincial Soil Conservation Board (Toprak Koruma Kurulu) authorization.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac96-step-1",
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
                            id: "prac96-s1-t",
                            type: "heading",
                            level: 4,
                            text: "1. Tarımsal Amaçlı Yapı (Agricultural Purpose Facility)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac96-s1-p",
                            type: "text",
                            text: "Drafting architectural site plans qualifying buildings under agricultural processing exemptions, preserving mature olive tree canopies with zero uprooting.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac96-step-2",
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
                            id: "prac96-s2-t",
                            type: "heading",
                            level: 4,
                            text: "2. Ministry Tourism Agro-Estate Operating Certificate",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac96-s2-p",
                            type: "text",
                            text: "Integrating boutique vineyard suites and tasting rooms under Special Accommodation Facility (Özel Konaklama Tesisi) status under Tourism Promotion Law No. 2634.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): Soil Conservation Board Desk */
              {
                id: "prac96-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac96-side-card",
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
                        id: "prac96-sc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac96-sc-b",
                            type: "badge",
                            text: "SOIL BOARD JURISDICTION",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac96-sc-t",
                            type: "heading",
                            level: 4,
                            text: "Zoning Exemption Docket",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac96-sc-item1",
                            type: "text",
                            text: "✓ Ministry Agriculture Soil Board Approval",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac96-sc-item2",
                            type: "text",
                            text: "✓ Zero Tree Uprooting Legal Covenant",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac96-sc-item3",
                            type: "text",
                            text: "✓ Tasting Room Commercial License",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac96-sc-divider",
                            type: "divider",
                            style: { sizing: { width: "full" } },
                          },
                          {
                            id: "prac96-btn-zoning",
                            type: "button",
                            label: "File Soil Board Agro-Zoning Petition",
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
 * PRACTICE-97: Viticulture Law · TAPDK Boutique Winery Commercial Production License
 * Layout Archetype: 5-Stage Chronological Production Licensing Rail (Horizontal Stepper)
 */
export const PRACTICE_97_WINERY_LICENSE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-97-boutique-winery-tapdk-production-license",
  name: "Viticulture Law · TAPDK Boutique Winery Commercial Production License",
  kind: "section",
  root: {
    id: "prac97-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac97-container",
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
            id: "prac97-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac97-badge",
                type: "badge",
                text: "ALCOHOL LAW NO. 4250 · TAPDK PRODUCTION LICENSE · BOUTIQUE WINERY PIPELINE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac97-heading",
                type: "heading",
                level: 2,
                text: "5-Stage Boutique Winery Production & Banderol Licensing Rail",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac97-sub",
                type: "text",
                text: "End-to-end legal structuring for commercial viticulture estates, fermentation vessel capacity audits, Ministry banderol allocation, and direct cellar door sales.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 5-Stage Horizontal Rail */
          {
            id: "prac97-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
            children: [
              /* Stage 1 */
              {
                id: "prac97-stage-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac97-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac97-s1-n", type: "badge", text: "01 · CAPACITY", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac97-s1-t", type: "heading", level: 4, text: "Capacity Report", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac97-s1-d", type: "text", text: "Chamber of Industry fermentation vat and stainless tank liter capacity certification.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 2 */
              {
                id: "prac97-stage-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac97-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac97-s2-n", type: "badge", text: "02 · GSM PERMIT", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac97-s2-t", type: "heading", level: 4, text: "Workplace GSM License", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac97-s2-d", type: "text", text: "Class 2 Non-Sanitary Enterprise (GSM) operating permit from District Municipality and Fire Dept.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 3 */
              {
                id: "prac97-stage-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac97-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac97-s3-n", type: "badge", text: "03 · TAPDK", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac97-s3-t", type: "heading", level: 4, text: "Facility Production Permit", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac97-s3-d", type: "text", text: "Ministry of Agriculture alcohol production facility license under Law No. 4250.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 4 */
              {
                id: "prac97-stage-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac97-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac97-s4-n", type: "badge", text: "04 · BANDEROL", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac97-s4-t", type: "heading", level: 4, text: "GİB Tax Banderol Quota", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac97-s4-d", type: "text", text: "Revenue Administration physical banderol stamp allocation and special consumption tax (ÖTV) escrow.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 5 */
              {
                id: "prac97-stage-5",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac97-s5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac97-s5-n", type: "badge", text: "05 · TASTING", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac97-s5-t", type: "heading", level: 4, text: "Cellar Door Sales", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac97-s5-d", type: "text", text: "Direct consumer tasting room license & on-premise retail permit.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac97-cta-strip",
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
                id: "prac97-cta-txt",
                type: "text",
                text: "Complete boutique winery licensing pipeline managed within 90 days across Aegean viticulture districts.",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac97-cta-btn",
                type: "button",
                label: "Retain Viticulture Licensing Counsel",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-98: Culinary IP · Michelin Master Chef Key-Person Residency Agreement
 * Layout Archetype: Parchment Master Chef Key-Person Agreement Workbench
 */
export const PRACTICE_98_MICHELIN_CHEF_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-98-michelin-star-chef-employment-franchise",
  name: "Culinary IP · Michelin Master Chef Key-Person Residency Agreement",
  kind: "section",
  root: {
    id: "prac98-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac98-container",
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
            id: "prac98-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac98-badge",
                type: "badge",
                text: "IP CODE NO. 6769 · CULINARY COPYRIGHT · MICHELIN RESIDENCY GOVERNANCE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac98-heading",
                type: "heading",
                level: 2,
                text: "Michelin-Star Celebrity Chef Residency & Recipe IP Workbench",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac98-sub",
                type: "text",
                text: "Drafting master culinary management agreements, menu trademark protection, key-person service covenants, and non-compete clauses for luxury Aegean resort restaurants.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 7 / 5 Workbench Grid */
          {
            id: "prac98-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): Master Chef Contract Parchment Box */
              {
                id: "prac98-box",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac98-b-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac98-b-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "sm",
                        style: { sizing: { width: "full" } },
                        children: [
                          {
                            id: "prac98-b-tag",
                            type: "badge",
                            text: "MASTER CULINARY FRANCHISE & SERVICE TERMS",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac98-b-venue",
                            type: "badge",
                            text: "GOVERNING LAW: TURKISH LAW (TBK)",
                            style: { color: { background: "primary", text: "background" } },
                          },
                        ],
                      },
                      {
                        id: "prac98-parchment-clause",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "lg" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac98-clause-text",
                            type: "text",
                            text: "“The Consulting Chef grants the Resort an exclusive license to operate the Signature Restaurant under the Chef’s personal brand and proprietary culinary recipes for the Summer Operating Season. The Chef covenants to personally attend the venue for a minimum of 45 operational service evenings and shall not consult for any competing dining venue within a 50 km coastal radius.”",
                            style: { typography: { size: "base" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac98-points-head",
                        type: "heading",
                        level: 4,
                        text: "Key Culinary IP Checkpoints & Exclusivity Terms",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac98-pt-1",
                        type: "text",
                        text: "• Recipe Copyright & Trade Secrets: Protecting proprietary sauces, plating schematics, and ingredient sourcing matrices under IP Code No. 6769.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac98-pt-2",
                        type: "text",
                        text: "• Quality Standards Default: Right to terminate license if kitchen execution fails to meet Michelin Guide benchmark standards.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac98-btn-row",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: true,
                        gap: "sm",
                        children: [
                          {
                            id: "prac98-btn-terms",
                            type: "button",
                            label: "Download Culinary Franchise Term Sheet",
                          },
                          {
                            id: "prac98-btn-retain",
                            type: "button",
                            label: "Retain Culinary IP Counsel",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Key-Person Risk Docket */
              {
                id: "prac98-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  {
                    id: "prac98-card-visa",
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
                        id: "prac98-cv-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          { id: "prac98-cv-b", type: "badge", text: "WORK PERMIT · TURQUOISE CARD", style: { color: { background: "surface-muted", text: "text" } } },
                          { id: "prac98-cv-t", type: "heading", level: 4, text: "Expat Celebrity Work Visa", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac98-cv-d", type: "text", text: "Fast-track Ministry of Labor work permits under high-skilled cultural workforce exemptions for foreign master chefs and sommeliers.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                    ],
                  },
                  {
                    id: "prac98-card-liquidated",
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
                        id: "prac98-cl-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          { id: "prac98-cl-b", type: "badge", text: "LIQUIDATED DAMAGES · CEZAİ ŞART", style: { color: { background: "primary", text: "background" } } },
                          { id: "prac98-cl-t", type: "heading", level: 4, text: "No-Show Key-Person Indemnity", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac98-cl-d", type: "text", text: "€250,000 liquidated damages clause enforceable if chef abandons season residency without documented force majeure.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
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
 * PRACTICE-99: Origin Law · Aegean Wine & Olive Oil Geographical Indication Registry
 * Layout Archetype: Tabular Terroir Geographical Indication Matrix (Table)
 */
export const PRACTICE_99_GEOGRAPHICAL_INDICATION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-99-geographical-indication-aegean-wine-audit",
  name: "Origin Law · Aegean Wine & Olive Oil Geographical Indication Registry",
  kind: "section",
  root: {
    id: "prac99-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac99-container",
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
            id: "prac99-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac99-badge",
                type: "badge",
                text: "IP CODE NO. 6769 · GEOGRAPHICAL INDICATIONS (COĞRAFİ İŞARET) · TERROIR DEFENSE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac99-heading",
                type: "heading",
                level: 2,
                text: "Aegean Protected Appellation & Terroir Audit Matrix",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac99-sub",
                type: "text",
                text: "Registration, export certification, and anti-counterfeiting enforcement for protected coastal wine appellations and olive oil geographical designations.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Tabular GI Matrix */
          {
            id: "prac99-matrix-card",
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
                id: "prac99-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Header Row */
                  {
                    id: "prac99-th-row",
                    type: "grid",
                    columns: 12,
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "surface-muted" },
                      border: { radius: "sm" },
                    },
                    children: [
                      { id: "prac99-th-1", type: "text", text: "PROTECTED APPELLATION", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac99-th-2", type: "text", text: "TERROIR BOUNDARY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac99-th-3", type: "text", text: "TÜRKPATENT GI STATUS", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac99-th-4", type: "text", text: "ENFORCEMENT ACTION", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 1: Urla Bağları */
                  {
                    id: "prac99-row-1",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      { id: "prac99-r1-c1", type: "text", text: "Urla Bağları Wine Route", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac99-r1-c2", type: "text", text: "Urla Peninsula microclimate, ancient Klazomenai basin", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac99-r1-c3", type: "text", text: "Registered Geographical Indication (Menşe Adı)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac99-r1-c4", type: "text", text: "Raids on deceptive labeling of non-Urla bulk grapes.", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac99-div-1", type: "divider", style: { sizing: { width: "full" } } },

                  /* Row 2: Milas Zeytinyağı (EU PDO) */
                  {
                    id: "prac99-row-2",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      { id: "prac99-r2-c1", type: "text", text: "Milas Olive Oil (EU PDO)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac99-r2-c2", type: "text", text: "Memecik olive variety across Milas & Bafa Basin", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac99-r2-c3", type: "text", text: "European Union Protected Designation of Origin (PDO)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac99-r2-c4", type: "text", text: "Customs seizure of counterfeit export consignments.", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac99-footer-card",
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
                id: "prac99-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac99-fc-text", type: "text", text: "Protect your estate's terroir rights under EU and Turkish patent regimes.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac99-btn-gi", type: "button", label: "Commission Terroir GI Audit", },
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
 * PRACTICE-100: Cellar Law · Sommelier Rare Vintage Wine Import & Bonded Storage Escrow
 * Layout Archetype: Dual Comparative Split Screen (6/6)
 */
export const PRACTICE_100_VINTAGE_WINE_IMPORT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-100-sommelier-rare-vintage-import-escrow",
  name: "Cellar Law · Sommelier Rare Vintage Wine Import & Bonded Storage Escrow",
  kind: "section",
  root: {
    id: "prac100-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac100-container",
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
            id: "prac100-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac100-badge",
                type: "badge",
                text: "CUSTOMS LAW NO. 4458 · ÖTV LIST III · GRAND CRU WINE IMPORT ESCROW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac100-heading",
                type: "heading",
                level: 2,
                text: "Rare Vintage Wine Customs Escrow & Bonded Cellar Storage",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac100-sub",
                type: "text",
                text: "Structuring legal import protocols, Special Consumption Tax (ÖTV) optimization, and climate-controlled bonded warehouse agreements for multi-million euro luxury hotel wine collections.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac100-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Customs Tariff & Tax Escrow */
              {
                id: "prac100-left-col",
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
                    id: "prac100-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac100-left-b", type: "badge", text: "TRACK A · CUSTOMS DUTY & ÖTV", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac100-left-t", type: "heading", level: 3, text: "Import Taxation & Valuation", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac100-left-d", type: "text", text: "Rare Bordeaux and Burgundy imports face steep compound taxation (Customs duty + ÖTV + 20% VAT). We structure auction invoice valuations and certificates of origin to avoid customs over-assessments.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac100-left-divider", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac100-lp-1", type: "text", text: "• Ministry Phytosanitary Clearance: Laboratory testing exemptions for vintage collector bottles with historical provenance.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac100-left-btn", type: "button", label: "Structure Wine Import Escrow", },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Bonded Temperature-Controlled Storage */
              {
                id: "prac100-right-col",
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
                    id: "prac100-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac100-right-b", type: "badge", text: "TRACK B · BONDED CELLAR ESCROW", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac100-right-t", type: "heading", level: 3, text: "Antrepo Bonded Cellar Custody", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac100-right-d", type: "text", text: "Operating private bonded antrepo cellars at Milas/Izmir customs zones where duty is deferred until bottles are uncorked for resort dining service.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac100-right-divider", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac100-rp-1", type: "text", text: "• Temperature & Humidity Warranty: Bailee liability terms holding warehouse strictly liable for cork oxidation or heat spike damage.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac100-right-btn", type: "button", label: "Retain Wine Custody Counsel", },
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

export const PRACTICE_LIBRARY_BATCH_20: ComponentDocument[] = [
  PRACTICE_96_OLIVE_GROVE_ZONING_DOCUMENT,
  PRACTICE_97_WINERY_LICENSE_DOCUMENT,
  PRACTICE_98_MICHELIN_CHEF_DOCUMENT,
  PRACTICE_99_GEOGRAPHICAL_INDICATION_DOCUMENT,
  PRACTICE_100_VINTAGE_WINE_IMPORT_DOCUMENT,
];
