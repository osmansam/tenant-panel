import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 6: Foreign Nationals, Residency & Inheritance (#26–#30)
 * Coastal Turkish Legal Chambers (Fethiye, Göcek, Bodrum, Kalkan)
 * Aesthetic: Warm cream/linen surfaces, deep Mediterranean navy typography,
 * Aegean teal accents, structured citizenship dossiers, probate matrices.
 * ============================================================================
 */

/**
 * PRACTICE-26: Turkish Citizenship by Investment · $400k Real Estate Dossier
 * Layout: Split 12-Column Citizenship Dossier Matrix (7/5 cols)
 * Visual Family: Editorial Sovereign Citizenship Dossier
 */
export const PRACTICE_26_CITIZENSHIP_INVESTMENT_DOSSIER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-26-citizenship-investment-dossier",
  name: "Turkish Citizenship by Investment · $400k Real Estate Dossier",
  kind: "section",
  root: {
    id: "prac26-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac26-container",
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
            id: "prac26-header",
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
                id: "prac26-badge",
                type: "badge",
                text: "TURKISH CITIZENSHIP LAW NO. 5901",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac26-title",
                type: "heading",
                level: 2,
                text: "Turkish Citizenship by Investment ($400,000)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac26-subtitle",
                type: "text",
                text: "Full statutory dossier management from preliminary real estate valuation to passport delivery for the principal investor, spouse, and dependent children under 18.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Split 12-Column Grid */
          {
            id: "prac26-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Statutory Dossier Stages (7 cols) */
              {
                id: "prac26-stages-card",
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
                    id: "prac26-stages-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      {
                        id: "prac26-st-heading",
                        type: "heading",
                        level: 3,
                        text: "Statutory Dossier Requirements & Timeline",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac26-st1",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac26-st1-title",
                            type: "text",
                            text: "1. $400k Real Estate Acquisition & DAB Conversion",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac26-st1-desc",
                            type: "text",
                            text: "Purchasing one or multiple freehold properties with a cumulative valuation exceeding $400,000 USD. Monies must be routed through Central Bank DAB currency exchange.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac26-st2",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac26-st2-title",
                            type: "text",
                            text: "2. Certificate of Conformity (Uygunluk Belgesi)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac26-st2-desc",
                            type: "text",
                            text: "Issued by the Ministry of Environment, Urbanisation and Climate Change following an audit of Land Registry deeds and SPK appraisal reports.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac26-st3",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac26-st3-title",
                            type: "text",
                            text: "3. 3-Year Resale Restriction Annotation (Tapu Şerhi)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac26-st3-desc",
                            type: "text",
                            text: "Official annotation registered in TAKBİS prohibiting the transfer or sale of the property for exactly 36 months from title deed delivery.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Investor Passport Benefits (5 cols) */
              {
                id: "prac26-benefits-card",
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
                    id: "prac26-ben-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac26-ben-badge",
                        type: "badge",
                        text: "FAST-TRACK CITIZENSHIP",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac26-ben-heading",
                        type: "heading",
                        level: 3,
                        text: "Key Investor Privileges",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac26-ben-list",
                        type: "text",
                        text: "• Full Turkish citizenship and passport for whole family\n• No minimum physical residence or language requirement\n• Visa-free or visa-on-arrival access to 110+ countries\n• Rental income preservation during the 3-year holding period\n• Complete confidentiality throughout the interior ministry review",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac26-ben-btn",
                        type: "button",
                        label: "Request Citizenship Eligibility Audit",
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
 * PRACTICE-27: Ikamet Permits · Short-Term & Tapu-Linked Residency Checklist
 * Layout: 2-Column Split Ikamet Checklist (Property vs General)
 * Visual Family: Immigration & Residence Regulatory Guide
 */
export const PRACTICE_27_IKAMET_RESIDENCE_PERMIT_STAGES_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-27-ikamet-residence-permit-stages",
  name: "Ikamet Permits · Short-Term & Tapu-Linked Residency Checklist",
  kind: "section",
  root: {
    id: "prac27-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac27-container",
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
            id: "prac27-header",
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
                id: "prac27-badge",
                type: "badge",
                text: "IMMIGRATION & RESIDENCY PRACTICE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac27-title",
                type: "heading",
                level: 2,
                text: "Turkish Residence Permits (İkametgah)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac27-subtitle",
                type: "text",
                text: "Navigating new statutory thresholds enacted under Migration Law, including the $200,000 property valuation rule for real estate residency in coastal Muğla.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Split Grid */
          {
            id: "prac27-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Left Column: Tapu-Linked Residence ($200k) */
              {
                id: "prac27-tapu-card",
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
                    id: "prac27-tapu-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac27-tapu-badge",
                        type: "badge",
                        text: "PROPERTY-LINKED IKAMET",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac27-tapu-title",
                        type: "heading",
                        level: 3,
                        text: "$200,000 Real Estate Residency Rule",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac27-tapu-desc",
                        type: "text",
                        text: "For real estate acquired after October 16, 2023, the declared deed value must meet or exceed $200,000 USD based on official SPK valuation on the deed date to qualify for renewable short-term residence under Law No. 6458 Art. 31/1-b.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac27-tapu-docs",
                        type: "text",
                        text: "Mandatory: Original Tapu, SPK Valuation Report, DASK Earthquake Insurance, Municipal Numbering Certificate (Numarataj).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Biometrics & Appointment Protocol */
              {
                id: "prac27-bio-card",
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
                    id: "prac27-bio-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac27-bio-badge",
                        type: "badge",
                        text: "GÖÇ İDARESİ SUBMISSIONS",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac27-bio-title",
                        type: "heading",
                        level: 3,
                        text: "Biometrics & Directorate Protocol",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac27-bio-desc",
                        type: "text",
                        text: "Chambers prepares digital e-İkamet filings, arranges sworn translations of apostilled criminal records and birth certificates, and accompanies clients to in-person biometric appointments at Muğla, Fethiye, or Bodrum Migration Offices.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac27-bio-link",
                        type: "link",
                        label: "Verify Residency Eligibility with Immigration Advocate",
                        href: "mailto:residency@yanatmalaw.com",
                        openInNewTab: false,
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
 * PRACTICE-28: Estate Succession · Foreign Will Probate & Turkish Inheritance Taxes
 * Layout: Detailed Probate & Inheritance Tax Matrix Table
 * Visual Family: Cross-Border Probate Guide
 */
export const PRACTICE_28_CROSS_BORDER_PROBATE_INHERITANCE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-28-cross-border-probate-inheritance",
  name: "Estate Succession · Foreign Will Probate & Turkish Inheritance Taxes",
  kind: "section",
  root: {
    id: "prac28-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac28-container",
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
            id: "prac28-header",
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
                id: "prac28-badge",
                type: "badge",
                text: "PRIVATE INTERNATIONAL LAW · SUCCESSION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac28-title",
                type: "heading",
                level: 2,
                text: "Cross-Border Probate & Inheritance Tax Matrix",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac28-subtitle",
                type: "text",
                text: "Turkish immovable property (villas and land) is strictly governed by Turkish inheritance law (Lex Rei Sitae), irrespective of foreign nationality or overseas wills.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Matrix Table Card */
          {
            id: "prac28-table-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface", text: "text" },
              border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac28-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Tier 1 */
                  {
                    id: "prac28-p1",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac28-p1-title",
                        type: "text",
                        text: "1. Certificate of Inheritance (Veraset İlamı)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac28-p1-desc",
                        type: "text",
                        text: "Foreign heirs must petition the Turkish Civil Court of Peace (Sulh Hukuk Mahkemesi) for an official succession certificate declaring statutory heirs under Turkish Civil Code rules.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Tier 2 */
                  {
                    id: "prac28-p2",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac28-p2-title",
                        type: "text",
                        text: "2. Foreign Will Recognition (Tenfiz Davası) & Forced Heirship (Saklı Pay)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac28-p2-desc",
                        type: "text",
                        text: "Foreign wills excluding surviving spouses or biological children cannot override Turkish statutory forced shares. Descendants are guaranteed a statutory reserved portion of real property.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Tier 3 */
                  {
                    id: "prac28-p3",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac28-p3-title",
                        type: "text",
                        text: "3. Turkish Inheritance & Transfer Tax Rates (Veraset ve İntikal Vergisi)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac28-p3-desc",
                        type: "text",
                        text: "Tiered rates for direct lineal heirs range from 1% to 10% after deducting statutory tax-free allowances. Inheritance declarations must be lodged within 4 months of death.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* CTA Button */
                  {
                    id: "prac28-btn",
                    type: "button",
                    label: "Consult Cross-Border Probate Advocate",
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
        ],
      },
    ],
  },
};

/**
 * PRACTICE-29: Overseas POA · Notary & Turkish Consulate Power of Attorney Guide
 * Layout: 3-Column Notary Steps Grid (Giving POA from abroad)
 * Visual Family: International Notary & Consular Legal Guide
 */
export const PRACTICE_29_POWER_OF_ATTORNEY_NOTARY_GUIDE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-29-power-of-attorney-notary-guide",
  name: "Overseas POA · Notary & Turkish Consulate Power of Attorney Guide",
  kind: "section",
  root: {
    id: "prac29-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac29-container",
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
            id: "prac29-header",
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
                id: "prac29-badge",
                type: "badge",
                text: "CROSS-BORDER LEGAL REPRESENTATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac29-title",
                type: "heading",
                level: 2,
                text: "Executing Power of Attorney from Abroad",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac29-subtitle",
                type: "text",
                text: "Nonresident buyers and owners can empower chambers to manage property conveyancing, deed registry signing, and bank operations without traveling to Turkey.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Notary Grid */
          {
            id: "prac29-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Method 1: Turkish Consulate */
              {
                id: "prac29-m1-card",
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
                    id: "prac29-m1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac29-m1-badge",
                        type: "badge",
                        text: "METHOD A: RECOMMENDED",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac29-m1-title",
                        type: "heading",
                        level: 3,
                        text: "Turkish Consulate Appointment Abroad",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac29-m1-desc",
                        type: "text",
                        text: "Executing the POA at a Turkish Embassy or Consulate (London, Berlin, Dubai) directly in Turkish. Requires no Apostille and is instantly recognized by Turkish Land Registry Offices.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Method 2: Local Notary + Apostille */
              {
                id: "prac29-m2-card",
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
                    id: "prac29-m2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac29-m2-badge",
                        type: "badge",
                        text: "METHOD B: LOCAL NOTARY",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac29-m2-title",
                        type: "heading",
                        level: 3,
                        text: "Domestic Notary & Apostille Legalisation",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac29-m2-desc",
                        type: "text",
                        text: "Signing bilingual text prepared by chambers before a local notary public in your home country, followed by a Hague Apostille Certificate from the foreign ministry (FCDO / State Dept).",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Method 3: Real Estate Photo & Specificity */
              {
                id: "prac29-m3-card",
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
                    id: "prac29-m3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac29-m3-badge",
                        type: "badge",
                        text: "MANDATORY FORMALITIES",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac29-m3-title",
                        type: "heading",
                        level: 3,
                        text: "Biometric Photo & Property Specificity",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac29-m3-desc",
                        type: "text",
                        text: "POAs granting property purchase/sale powers must contain the principal's biometric photograph physically stamped by the notary, plus explicit authorizations for Tapu registry signing and DAB currency conversion.",
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
            id: "prac29-btn",
            type: "button",
            label: "Request Chambers Bilingual Power of Attorney Template",
            href: "mailto:poa@yanatmalaw.com",
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
 * PRACTICE-30: Expat Financial Onboarding · Turkish Vergi No & Bank Account Setup
 * Layout: 4-Column Banking Compliance Grid
 * Visual Family: Banking Legal Onboarding Roadmap
 */
export const PRACTICE_30_TAX_ID_BANK_OPENING_ROADMAP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-30-tax-id-bank-opening-roadmap",
  name: "Expat Financial Onboarding · Turkish Vergi No & Bank Account Setup",
  kind: "section",
  root: {
    id: "prac30-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac30-container",
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
            id: "prac30-header",
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
                id: "prac30-badge",
                type: "badge",
                text: "FINANCIAL & TAX COMPLIANCE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac30-title",
                type: "heading",
                level: 2,
                text: "Tax Number (Vergi No) & Bank Account Opening",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac30-subtitle",
                type: "text",
                text: "Establishing clean Turkish banking infrastructure for inbound foreign exchange, escrow payments, and property tax compliance under MASAK AML guidelines.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Column Banking Grid */
          {
            id: "prac30-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              /* Step 1 */
              {
                id: "prac30-b1-card",
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
                    id: "prac30-b1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac30-b1-badge",
                        type: "badge",
                        text: "STEP 01",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac30-b1-title",
                        type: "heading",
                        level: 3,
                        text: "Potential Tax Identification Number",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac30-b1-desc",
                        type: "text",
                        text: "Procuring official Potential Vergi Kimlik Numarası from the Turkish Revenue Administration (GİB) portal based on valid foreign passport.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Step 2 */
              {
                id: "prac30-b2-card",
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
                    id: "prac30-b2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac30-b2-badge",
                        type: "badge",
                        text: "STEP 02",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac30-b2-title",
                        type: "heading",
                        level: 3,
                        text: "Passport Translation & Notarisation",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac30-b2-desc",
                        type: "text",
                        text: "Sworn court interpreter translation of passport identity pages certified by Turkish Notary Public (Noter) for banking compliance.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Step 3 */
              {
                id: "prac30-b3-card",
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
                    id: "prac30-b3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac30-b3-badge",
                        type: "badge",
                        text: "STEP 03",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac30-b3-title",
                        type: "heading",
                        level: 3,
                        text: "KYC Dossier & Bank Account Opening",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac30-b3-desc",
                        type: "text",
                        text: "Opening personal multi-currency bank accounts (TRY, USD, EUR, GBP) at Garanti BBVA, İş Bankası, or Akbank under attorney POA.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Step 4 */
              {
                id: "prac30-b4-card",
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
                    id: "prac30-b4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac30-b4-badge",
                        type: "badge",
                        text: "STEP 04",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac30-b4-title",
                        type: "heading",
                        level: 3,
                        text: "DAB Currency Conversion Document",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac30-b4-desc",
                        type: "text",
                        text: "Generating the Central Bank Foreign Exchange Document (Döviz Alım Belgesi) directly from client bank account for Tapu registration clearance.",
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
            id: "prac30-link",
            type: "link",
            label: "Instruct Chambers for Remote Bank Account Opening Under Power of Attorney",
            href: "mailto:banking@yanatmalaw.com",
            openInNewTab: false,
          },
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_6 = [
  PRACTICE_26_CITIZENSHIP_INVESTMENT_DOSSIER_DOCUMENT,
  PRACTICE_27_IKAMET_RESIDENCE_PERMIT_STAGES_DOCUMENT,
  PRACTICE_28_CROSS_BORDER_PROBATE_INHERITANCE_DOCUMENT,
  PRACTICE_29_POWER_OF_ATTORNEY_NOTARY_GUIDE_DOCUMENT,
  PRACTICE_30_TAX_ID_BANK_OPENING_ROADMAP_DOCUMENT,
] as const;

