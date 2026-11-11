import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 12: Expat Retirement & Healthcare (#56–#60)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * 
 * 5 Radically Distinct Architectural Archetypes:
 * 56: High-Density Side-by-Side Comparison Split (6/6 split: SGK Public vs Private Expat Policy)
 * 57: 4-Stage Touring Blue Plate Import Sequence Rail (Horizontal linear process rail)
 * 58: Tabular Veterinary Quarantine & Pet Import Registry Table (Hairline gazette table)
 * 59: Asymmetric 70/30 Driving License Conversion Dossier (8/4 split: Statutory analysis + NVİ Card)
 * 60: Minimalist Editorial Living Will & Healthcare Monograph with Pull-Quote (Parchment serif column)
 * ============================================================================
 */

/**
 * PRACTICE-56: Foreign Resident · SGK vs Private Health Insurance Policy Matrix
 * Layout Archetype: High-Density Side-by-Side Comparison Split (6/6 split)
 */
export const PRACTICE_56_EXPAT_HEALTH_INSURANCE_COMPARISON_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-56-expat-health-insurance-comparison",
  name: "Expat Residency · SGK Public Health vs Private Policy Dual Split Matrix",
  kind: "section",
  root: {
    id: "prac56-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac56-container",
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
            id: "prac56-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac56-badge",
                type: "badge",
                text: "HEALTH JURISPRUDENCE · SOCIAL SECURITY LAW NO. 5510 & IMMIGRATION ACT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac56-heading",
                type: "heading",
                level: 2,
                text: "Expat Residency: SGK Universal vs Private Health Policy Split",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac56-sub",
                type: "text",
                text: "Foreign retirees settling in Bodrum, Fethiye, and Antalya require mandatory healthcare coverage for residence permits (İkamet). Compare state universal coverage against Göç İdaresi approved private underwriting.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Comparative Split (6/6) */
          {
            id: "prac56-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: SGK State System (6-col) */
              {
                id: "prac56-col-sgk",
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
                    id: "prac56-sgk-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac56-sgk-tag",
                        type: "badge",
                        text: "TRACK 1: SGK GENERAL HEALTH INSURANCE (GSS)",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac56-sgk-title",
                        type: "heading",
                        level: 3,
                        text: "Universal Turkish Social Security System",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac56-sgk-desc",
                        type: "text",
                        text: "Foreign citizens who have resided in Turkey for 1 full continuous year on a valid residence permit are legally entitled to opt into SGK General Health Insurance (GSS) under Law No. 5510 Art. 60.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac56-sgk-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac56-sgk-box",
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
                            id: "prac56-sgk-box-label",
                            type: "text",
                            text: "FAMILY POOLING BENEFIT",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac56-sgk-box-val",
                            type: "text",
                            text: "Single Monthly Premium Covers Spouse & Dependents",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac56-sgk-box-note",
                            type: "text",
                            text: "Full coverage across all State Research & University Hospitals; chronic illness medications subsidized.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac56-sgk-btn",
                        type: "button",
                        label: "Verify 1-Year SGK Eligibility Prerequisite",
                        style: { sizing: { width: "full" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Private Expat Underwriting (6-col) */
              {
                id: "prac56-col-private",
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
                    id: "prac56-priv-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac56-priv-tag",
                        type: "badge",
                        text: "TRACK 2: COMPREHENSIVE PRIVATE EXPAT COVERAGE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac56-priv-title",
                        type: "heading",
                        level: 3,
                        text: "Göç İdaresi Accredited Private Insurance",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac56-priv-desc",
                        type: "text",
                        text: "Mandatory for first-year residence permit applicants under age 65. Underwritten by Turkish licensed insurers (Allianz, Axa, Anadolu Sigorta) fulfilling circular 16/2014 minimum tables.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac56-priv-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac56-priv-box",
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
                            id: "prac56-priv-box-label",
                            type: "text",
                            text: "PRIVATE NETWORK ACCESS",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac56-priv-box-val",
                            type: "text",
                            text: "Acıbadem, Memorial & American Hospital Network",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "prac56-priv-box-note",
                            type: "text",
                            text: "English-speaking staff, zero deductible emergency inpatient care, and optional international medical repatriation rider.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac56-priv-btn",
                        type: "button",
                        label: "Issue Certified İkamet Policy Packet",
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
 * PRACTICE-57: Foreign Vehicle Blue Plate (MA/MZ) 730-Day Import Sequence
 * Layout Archetype: 4-Stage Horizontal Linear Process Rail
 */
export const PRACTICE_57_FOREIGN_VEHICLE_BLUEPLATE_IMPORT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-57-foreign-vehicle-blueplate-import",
  name: "Touring Blue Plate (MA/MZ) 730-Day Vehicle Import Sequence Rail",
  kind: "section",
  root: {
    id: "prac57-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac57-container",
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
            id: "prac57-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac57-badge",
                type: "badge",
                text: "CUSTOMS LAW NO. 4458 · TEMPORARY IMPORTATION (YABANCI TAŞIT BELGESİ)",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac57-heading",
                type: "heading",
                level: 2,
                text: "4-Stage Touring Blue Plate (MA/MZ) Vehicle Import Rail",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac57-sub",
                type: "text",
                text: "Foreign retirees and working expats may drive their foreign-registered motor vehicle in Turkey for up to 730 days tax-free by securing an official Touring Blue Plate clearance.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Horizontal Linear Process Rail */
          {
            id: "prac57-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Stage 1 */
              {
                id: "prac57-stage-1",
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
                    id: "prac57-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac57-s1-num",
                        type: "badge",
                        text: "STAGE 01",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac57-s1-title",
                        type: "heading",
                        level: 4,
                        text: "185-Day Overseas Residence Audit",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac57-s1-desc",
                        type: "text",
                        text: "Owner must prove physical presence outside Turkey for at least 185 days within the past 365-day calendar cycle via E-Devlet entry/exit logs.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac57-stage-2",
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
                    id: "prac57-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac57-s2-num",
                        type: "badge",
                        text: "STAGE 02",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac57-s2-title",
                        type: "heading",
                        level: 4,
                        text: "TTOK Fiduciary Guarantee Deposit",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac57-s2-desc",
                        type: "text",
                        text: "Execution of bank letter of guarantee or cash bond deposited with Türkiye Turing ve Otomobil Kurumu (TTOK) calculated against vehicle engine displacement.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac57-stage-3",
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
                    id: "prac57-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac57-s3-num",
                        type: "badge",
                        text: "STAGE 03",
                        style: { color: { background: "surface-muted", text: "primary" } },
                      },
                      {
                        id: "prac57-s3-title",
                        type: "heading",
                        level: 4,
                        text: "Customs Directorate Clear-Pass",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac57-s3-desc",
                        type: "text",
                        text: "Issuance of Yabancı Taşıtlar Geçici Giriş Karnesi (Carnet de Passages) exempting vehicle from customs duty (Gümrük Vergisi) and Special Consumption Tax (ÖTV).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac57-stage-4",
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
                    id: "prac57-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac57-s4-num",
                        type: "badge",
                        text: "STAGE 04",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac57-s4-title",
                        type: "heading",
                        level: 4,
                        text: "MA/MZ Plate Traffic Registration",
                        style: {
                          typography: { size: "lg", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac57-s4-desc",
                        type: "text",
                        text: "Allotment of Guest Blue Plates (Misafir Araç MA-MZ) at Muğla/Antalya Trafik Tescil branch. Strictly restricted to owner and registered spouse.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Bottom Advisory Bar */
          {
            id: "prac57-bottom-bar",
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
                id: "prac57-bottom-txt",
                type: "text",
                text: "Unauthorized driving by non-family members triggers 4x customs penalty and vehicle seizure.",
                style: { typography: { size: "base", weight: "medium" }, color: { text: "text" } },
              },
              {
                id: "prac57-bottom-btn",
                type: "button",
                label: "Retain Blue Plate Customs Fiduciary",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-58: Expat Pet Relocation · Veterinary Rabies Titer Protocol Checklist
 * Layout Archetype: Tabular Gazette Matrix with Hairline Rows
 */
export const PRACTICE_58_EXPAT_PET_RELOCATION_HUB_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-58-expat-pet-relocation-hub",
  name: "Veterinary Quarantine & Pet Import Statutory Registry Table",
  kind: "section",
  root: {
    id: "prac58-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac58-container",
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
            id: "prac58-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac58-badge",
                type: "badge",
                text: "VETERINARY BORDER SANITATION · LAW NO. 5996 & TARIM BAKANLIĞI DIRECTIVE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac58-heading",
                type: "heading",
                level: 2,
                text: "Expat Pet Relocation & Rabies Titer Protocol Schedule",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac58-sub",
                type: "text",
                text: "Importing dogs and cats through Dalaman, Milas-Bodrum, or Istanbul airports requires strict adherence to Ministry of Agriculture quarantine benchmarks to avoid 21-day port isolation.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Gazette Tabular Matrix */
          {
            id: "prac58-table-card",
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
                id: "prac58-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                style: { sizing: { width: "full" } },
                children: [
                  /* Header Row */
                  {
                    id: "prac58-th",
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
                        id: "prac58-th-c1",
                        type: "text",
                        text: "PROTOCOL STAGE",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-th-c2",
                        type: "text",
                        text: "STATUTORY AGENCY",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-th-c3",
                        type: "text",
                        text: "TIMELINE WINDOW",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-th-c4",
                        type: "text",
                        text: "COMPLIANCE MANDATE",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Row 1: Microchip */
                  {
                    id: "prac58-r1",
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
                        id: "prac58-r1-c1",
                        type: "text",
                        text: "ISO 11784/11785 Microchip",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac58-r1-c2",
                        type: "text",
                        text: "Authorized International Vet",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-r1-c3",
                        type: "text",
                        text: "Prior to Rabies Vaccine",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac58-r1-c4",
                        type: "badge",
                        text: "Mandatory 15-Digit FDX-B",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 2: Inactivated Rabies */
                  {
                    id: "prac58-r2",
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
                        id: "prac58-r2-c1",
                        type: "text",
                        text: "Inactivated Rabies Inoculation",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac58-r2-c2",
                        type: "text",
                        text: "Official Veterinary Clinic",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-r2-c3",
                        type: "text",
                        text: "Min 30 days prior to blood draw",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac58-r2-c4",
                        type: "badge",
                        text: "Valid 1 Year Only",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 3: Rabies Antibody Titer Test */
                  {
                    id: "prac58-r3",
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
                        id: "prac58-r3-c1",
                        type: "text",
                        text: "FAVN Rabies Titer (RNATT)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac58-r3-c2",
                        type: "text",
                        text: "EU / Tarım Bakanlığı Approved Lab",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-r3-c3",
                        type: "text",
                        text: "90-Day Mandatory Waiting Period",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac58-r3-c4",
                        type: "badge",
                        text: "Min 0.50 IU/ml Antibody",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Row 4: Health Certificate & Customs Entry */
                  {
                    id: "prac58-r4",
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
                        id: "prac58-r4-c1",
                        type: "text",
                        text: "Annex II Health Certificate",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac58-r4-c2",
                        type: "text",
                        text: "State Veterinary Border Inspection",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-r4-c3",
                        type: "text",
                        text: "Issued within 10 days of travel",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac58-r4-c4",
                        type: "badge",
                        text: "Airport Port Clearance",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                    ],
                  },

                  /* Footer */
                  {
                    id: "prac58-footer",
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
                        id: "prac58-footer-info",
                        type: "text",
                        text: "Failure to produce 90-day titer test results in immediate return to origin country at pet owner expense.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac58-footer-btn",
                        type: "button",
                        label: "Commission Veterinary Relocation Audit",
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
 * PRACTICE-59: Driving in Turkey · Foreign Driver's License 6-Month Swap Protocol
 * Layout Archetype: Asymmetric 70/30 Legal Dossier with Document Verification Blueprint (8/4 split)
 */
export const PRACTICE_59_TURKISH_DRIVING_LICENSE_CONVERSION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-59-turkish-driving-license-conversion",
  name: "Foreign Driving License 6-Month Swap Asymmetric Dossier",
  kind: "section",
  root: {
    id: "prac59-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac59-container",
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
            id: "prac59-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac59-badge",
                type: "badge",
                text: "HIGHWAYS TRAFFIC LAW NO. 2918 · ARTICLE 39 LICENSING CONVERSION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac59-heading",
                type: "heading",
                level: 2,
                text: "Foreign Driver’s License 6-Month Conversion Mandate",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac59-sub",
                type: "text",
                text: "Foreign nationals resident in Turkey may only drive on their home country license for 6 continuous months from date of entry. Beyond 180 days, driving triggers unauthorized operation fines and invalidates auto insurance.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Blueprint Split */
          {
            id: "prac59-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column: Statutory Analysis & Dossier Mandate (8-col) */
              {
                id: "prac59-col-dossier",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac59-dossier-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac59-dossier-tag",
                        type: "badge",
                        text: "STATUTORY CONVERSION REQUIREMENTS",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac59-dossier-title",
                        type: "heading",
                        level: 3,
                        text: "Direct Conversion to Turkish B-Class Driving License",
                        style: {
                          typography: { size: "2xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac59-dossier-desc",
                        type: "text",
                        text: "Citizens of 84 signatory nations under the Vienna Convention on Road Traffic (including UK, EU member states, US, and Canada) may convert their national license without retaking practical driving exams. The file requires notarial Turkish translation, education certificate equivalency, official driver health report (Sürücü Sağlık Raporu), and certified blood type card.",
                        style: { typography: { size: "base" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac59-dossier-div",
                        type: "divider",
                        style: { spacing: { marginY: "sm" } },
                      },
                      {
                        id: "prac59-dossier-checkpoints",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac59-cp1",
                            type: "text",
                            text: "• Sworn Notarized Translation of Original License with Apostille Certification",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac59-cp2",
                            type: "text",
                            text: "• Sürücü Olur Medical Health Certificate issued by Family Physician or Private Clinic",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac59-cp3",
                            type: "text",
                            text: "• Clean Judicial Record Certificate (Adli Sicil Kaydı) retrieved from E-Devlet",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac59-cp4",
                            type: "text",
                            text: "• Surrender of Original Foreign Physical License to NVİ Directorate Archive",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: NVİ Submission Desk Card (4-col) */
              {
                id: "prac59-col-desk",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface-muted" },
                  border: { width: "hairline", radius: "lg", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac59-desk-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac59-desk-badge",
                        type: "badge",
                        text: "NVİ DIRECTORATE DESK",
                        style: { color: { background: "surface", text: "text" } },
                      },
                      {
                        id: "prac59-desk-title",
                        type: "heading",
                        level: 4,
                        text: "Expedited NVİ Filing & Escort",
                        style: {
                          typography: { size: "xl", weight: "bold", tracking: "tight" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac59-desk-desc",
                        type: "text",
                        text: "We book official biometric appointments at Nüfus ve Vatandaşlık İşleri (Bodrum, Fethiye, Marmaris), accompany foreign clients with sworn interpreters, and verify Turkish Tax Office fee clearances.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac59-desk-btn",
                        type: "button",
                        label: "Retain License Conversion Counsel",
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
 * PRACTICE-60: Cross-Border Will & Healthcare Power of Attorney Monograph
 * Layout Archetype: Minimalist Editorial Monograph with Inset Pull-Quote & Notarial Seal
 */
export const PRACTICE_60_LIVING_WILL_HEALTHCARE_PROXY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-60-living-will-healthcare-proxy",
  name: "Cross-Border Living Will & Healthcare Power of Attorney Monograph",
  kind: "section",
  root: {
    id: "prac60-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac60-container",
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
            id: "prac60-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "2xl" }, typography: { align: "center" } },
            children: [
              {
                id: "prac60-badge",
                type: "badge",
                text: "ESTATE JURISPRUDENCE · TURKISH CIVIL CODE (TMK ART. 538) & PRIVATE INTERNATIONAL LAW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac60-heading",
                type: "heading",
                level: 2,
                text: "Cross-Border Living Will & Healthcare Proxy Monograph",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
            ],
          },

          /* Monograph Column */
          {
            id: "prac60-card",
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
                id: "prac60-card-stack",
                type: "stack",
                direction: "column",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  /* Large Latin / Turkish Pull-Quote */
                  {
                    id: "prac60-pullquote-wrap",
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
                        id: "prac60-quote-txt",
                        type: "heading",
                        level: 3,
                        text: "“Türkiye’deki taşınmazların intikali münhasıran Türk Hukuku’na tabidir; yabancı vasiyetnameler tenfiz edilmedikçe Tapu Sicil Müdürlüğü intikal işlemi yapamaz.”",
                        style: {
                          typography: { size: "xl", weight: "normal" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac60-quote-cite",
                        type: "text",
                        text: "— MÖHUK Madde 43 (Miras Hukuku İntikali) & Türk Medeni Kanunu Madde 538",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },

                  /* Editorial Prose */
                  {
                    id: "prac60-prose",
                    type: "text",
                    text: "Foreign property owners in coastal Turkey frequently assume foreign probate orders automatically apply to Aegean real estate. Under Turkish Private International Law (MÖHUK Art. 43), immovable property in Turkey is governed strictly by the lex rei sitae. To shield heirs from protracted court disputes, we draft bilingual Notarial Official Wills (Resmi Vasiyetname) alongside enduring Healthcare Powers of Attorney (Sağlık Vekaleti) backed by state hospital mental capacity reports (Akli Meleke Raporu).",
                    style: { typography: { size: "base" }, color: { text: "text-muted" } },
                  },

                  /* Sign-off Seal */
                  {
                    id: "prac60-seal-row",
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
                        id: "prac60-seal-info",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac60-seal-title",
                            type: "text",
                            text: "ESTATE PLANNING & NOTARIAL PRACTICE GROUP",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac60-seal-sub",
                            type: "text",
                            text: "Senior Advocates · Cross-Border Inheritance & Elder Care",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac60-seal-btn",
                        type: "button",
                        label: "Draft Certified Turkish Will & Healthcare Proxy",
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

export const PRACTICE_LIBRARY_BATCH_12: ComponentDocument[] = [
  PRACTICE_56_EXPAT_HEALTH_INSURANCE_COMPARISON_DOCUMENT,
  PRACTICE_57_FOREIGN_VEHICLE_BLUEPLATE_IMPORT_DOCUMENT,
  PRACTICE_58_EXPAT_PET_RELOCATION_HUB_DOCUMENT,
  PRACTICE_59_TURKISH_DRIVING_LICENSE_CONVERSION_DOCUMENT,
  PRACTICE_60_LIVING_WILL_HEALTHCARE_PROXY_DOCUMENT,
];
