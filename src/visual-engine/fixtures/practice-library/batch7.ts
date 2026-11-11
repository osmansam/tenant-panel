import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 7: Fee Transparency, Merits Assessment & Hospitality (#31–#35)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 * Aesthetic: Warm cream/linen surfaces, deep Mediterranean navy typography,
 * Aegean teal accents, structured fee benchmarks, resort concierge decks.
 * ============================================================================
 */

/**
 * PRACTICE-31: Statutory Fees · Bar Association Minimum Tariff & Fixed Quotes
 * Layout: 3-Column Tariff Benchmark Cards (Fee transparency)
 * Visual Family: Official Fee Transparency Matrix
 */
export const PRACTICE_31_BAR_TARIFF_FEE_TRANSPARENCY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-31-bar-tariff-fee-transparency",
  name: "Statutory Fees · Bar Association Minimum Tariff & Fixed Quotes",
  kind: "section",
  root: {
    id: "prac31-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac31-container",
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
            id: "prac31-header",
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
                id: "prac31-badge",
                type: "badge",
                text: "ATTORNEYSHIP LAW NO. 1136 · FEE BENCHMARK",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac31-title",
                type: "heading",
                level: 2,
                text: "Fee Transparency & Statutory Tariffs",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac31-subtitle",
                type: "text",
                text: "Our retainers strictly comply with the Muğla Bar Association Statutory Tariff (Avukatlık Asgari Ücret Tarifesi). Transparent itemised fee agreements with zero hidden costs.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Tariff Grid */
          {
            id: "prac31-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Card 1: Conveyancing */
              {
                id: "prac31-c1-card",
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
                    id: "prac31-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac31-c1-badge",
                        type: "badge",
                        text: "REAL ESTATE CONVEYANCING",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac31-c1-title",
                        type: "heading",
                        level: 3,
                        text: "Property Acquisition Retainer",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac31-c1-fee",
                        type: "text",
                        text: "1% to 1.5% of Purchase Price (Min. Statutory Bar Floor)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac31-c1-desc",
                        type: "text",
                        text: "Includes TAKBİS title registry search, encumbrance audit, contract drafting, SPK appraisal scrutiny, military clearance, and deed signing attendance.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Card 2: Yacht & Maritime */
              {
                id: "prac31-c2-card",
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
                    id: "prac31-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac31-c2-badge",
                        type: "badge",
                        text: "MARITIME & ESCROW CLOSING",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac31-c2-title",
                        type: "heading",
                        level: 3,
                        text: "Superyacht Conveyancing & Closing",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac31-c2-fee",
                        type: "text",
                        text: "Fixed Project Fee or Agreed Hourly Litigation Scale",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac31-c2-desc",
                        type: "text",
                        text: "Covers MoA review, independent client escrow management, survey liaison, flag deletion certificates, and Harbour Master Transit Log clearances.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Card 3: Litigation & Appeals */
              {
                id: "prac31-c3-card",
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
                    id: "prac31-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac31-c3-badge",
                        type: "badge",
                        text: "CIVIL & COMMERCIAL LITIGATION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac31-c3-title",
                        type: "heading",
                        level: 3,
                        text: "Court Dispute Representation",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac31-c3-fee",
                        type: "text",
                        text: "Statutory Official Tariff + Permitted Success Retainer",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "primary" } },
                      },
                      {
                        id: "prac31-c3-desc",
                        type: "text",
                        text: "Litigation disbursements, court expert fees (Bilirkişi), and notification costs are billed at net Ministry of Justice rates with detailed quarterly accountings.",
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
            id: "prac31-btn",
            type: "button",
            label: "Request Binding Retainer Proposal",
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
 * PRACTICE-32: Preliminary Review · Free 15-Minute Statutory Merits Assessment
 * Layout: Split 12-Column Merits Assessment Intake Card (Form-Submission)
 * Visual Family: Professional Legal Merits Triage
 */
export const PRACTICE_32_FREE_15MIN_MERITS_INTAKE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-32-free-15min-merits-intake",
  name: "Preliminary Review · Free 15-Minute Statutory Merits Assessment",
  kind: "section",
  root: {
    id: "prac32-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac32-container",
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
            id: "prac32-header",
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
                id: "prac32-badge",
                type: "badge",
                text: "PRELIMINARY CASE EVALUATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac32-title",
                type: "heading",
                level: 2,
                text: "Complimentary 15-Minute Legal Merits Review",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac32-subtitle",
                type: "text",
                text: "Before committing to litigation or conveyancing fees, submit your matter summary for an initial review by a senior advocate to determine jurisdiction, deadlines, and viability.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Split 12-Column Grid */
          {
            id: "prac32-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Scope & Privilege Guarantee (5 cols) */
              {
                id: "prac32-scope-card",
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
                    id: "prac32-scope-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac32-scope-heading",
                        type: "heading",
                        level: 3,
                        text: "Scope of Preliminary Review",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac32-sc1",
                        type: "text",
                        text: "✓ Jurisdictional suitability check (Court vs Arbitration)",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac32-sc2",
                        type: "text",
                        text: "✓ Statute of limitations deadline calculation (Zamanaşımı)",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac32-sc3",
                        type: "text",
                        text: "✓ Title deed risk classification & encumbrance flags",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac32-sc4",
                        type: "text",
                        text: "✓ Conflict of interest clearance across chambers register",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac32-sc5",
                        type: "text",
                        text: "✓ Response within 4 business hours by managing partner",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Active Intake Form (7 cols) */
              {
                id: "prac32-form-card",
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
                    id: "prac32-form",
                    type: "form",
                    action: "/api/practice-merits",
                    method: "post",
                    successMessage: "Thank you — your preliminary merits intake has been received.",
                    children: [
                      {
                        id: "prac32-fields-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "stretch",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "prac32-name",
                            type: "input",
                            fieldName: "client_name",
                            label: "Full Name / Nationality",
                            placeholder: "e.g. David Richardson (UK)",
                            inputType: "text",
                            required: true,
                          },
                          {
                            id: "prac32-email",
                            type: "input",
                            fieldName: "client_email",
                            label: "Email Address",
                            placeholder: "david@example.co.uk",
                            inputType: "email",
                            required: true,
                          },
                          {
                            id: "prac32-cat",
                            type: "select",
                            fieldName: "dispute_category",
                            label: "Matter Jurisdiction",
                            required: true,
                            options: [
                              { label: "Title Deed (Tapu) Purchase or Dispute", value: "tapu" },
                              { label: "Yacht Transaction, Charter or Salvage", value: "maritime" },
                              { label: "Turkish Citizenship $400k Dossier", value: "citizenship" },
                              { label: "Cross-Border Inheritance & Will Probate", value: "inheritance" },
                              { label: "Hotel Commercial Tenancy & Tourism License", value: "hospitality" },
                            ],
                          },
                          {
                            id: "prac32-summary",
                            type: "textarea",
                            fieldName: "case_summary",
                            label: "Brief Matter Summary & Critical Deadlines",
                            placeholder: "State key facts, parcel municipality, or any urgent court notice dates...",
                            rows: 4,
                            required: true,
                          },
                          {
                            id: "prac32-consent",
                            type: "checkbox",
                            fieldName: "merits_consent",
                            label: "I confirm the accuracy of information and request privileged advocate review.",
                            value: "yes",
                            checkedByDefault: false,
                            required: true,
                          },
                          {
                            id: "prac32-submit-btn",
                            type: "button",
                            label: "Transmit for 15-Minute Merits Review",
                            submit: true,
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
    ],
  },
};

/**
 * PRACTICE-33: Hospitality Protocol · Luxury Hotel Resident Legal Concierge Desk
 * Layout: 2-Column Luxury Hotel Concierge Split
 * Visual Family: High-End Hospitality & Resident Counsel
 */
export const PRACTICE_33_HOTEL_GUEST_LEGAL_CONCIERGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-33-hotel-guest-legal-concierge",
  name: "Hospitality Protocol · Luxury Hotel Resident Legal Concierge Desk",
  kind: "section",
  root: {
    id: "prac33-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac33-container",
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
            id: "prac33-header",
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
                id: "prac33-badge",
                type: "badge",
                text: "LUXURY RESORT RESIDENT CONCIERGE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac33-title",
                type: "heading",
                level: 2,
                text: "Hotel Resident Legal Concierge Desk",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac33-subtitle",
                type: "text",
                text: "Discreet on-property legal advisory for guests staying at 5-star coastal resorts and private villa estates across Göcek, Fethiye, Marmaris, and Bodrum.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Split Grid */
          {
            id: "prac33-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Hospitality Protocols (6 cols) */
              {
                id: "prac33-hosp-card",
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
                    id: "prac33-hosp-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac33-hosp-heading",
                        type: "heading",
                        level: 3,
                        text: "In-Suite & Resort Resident Services",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac33-hs1",
                        type: "text",
                        text: "• Private In-Suite Consultations: Senior advocate attendance at presidential suites or private resort lounges with non-disclosure protocols.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac33-hs2",
                        type: "text",
                        text: "• Lost Passport & Emergency Consular Escort: Immediate police station (Karakol) report coordination and expedited consular travel doc assistance.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac33-hs3",
                        type: "text",
                        text: "• On-Property Real Estate Assessment: Immediate review of prospective villa purchase contracts during guest scouting trips.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text" } },
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Hotel Partner Desk (6 cols) */
              {
                id: "prac33-desk-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac33-desk-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac33-desk-badge",
                        type: "badge",
                        text: "RESORT CONCIERGE DESK",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac33-desk-heading",
                        type: "heading",
                        level: 3,
                        text: "Partner Hotel Concierge Direct Line",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac33-desk-desc",
                        type: "text",
                        text: "Available to head concierges and general managers at partner hotels (D-Resort Göcek, Hillside Beach Club, Mandarin Oriental Bodrum) for urgent VIP guest legal emergencies.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac33-desk-btn",
                        type: "button",
                        label: "Connect with Hotel Resident Counsel: +90 532 745 11 22",
                        href: "tel:+905327451122",
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
 * PRACTICE-34: Commercial Hospitality · Hotel Resort Ground Lease & Concessions
 * Layout: 3-Column Commercial Concession Deck
 * Visual Family: Commercial Hospitality Legal Advisory
 */
export const PRACTICE_34_RESORT_COMMERCIAL_LEASE_DECK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-34-resort-commercial-lease-deck",
  name: "Commercial Hospitality · Hotel Resort Ground Lease & Concessions",
  kind: "section",
  root: {
    id: "prac34-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac34-container",
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
            id: "prac34-header",
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
                id: "prac34-badge",
                type: "badge",
                text: "COMMERCIAL HOSPITALITY TENANCY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac34-title",
                type: "heading",
                level: 2,
                text: "Boutique Hotel & Marina Commercial Leases",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac34-subtitle",
                type: "text",
                text: "Drafting, negotiating, and litigating long-term hotel operating leaseholds, beach club concessions, and marina commercial retail agreements along the Turkish Riviera.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Deck Grid */
          {
            id: "prac34-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* 1. Turnover Rent & Escalation */
              {
                id: "prac34-c1-card",
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
                    id: "prac34-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac34-c1-badge",
                        type: "badge",
                        text: "TURNOVER RENT CLAUSES",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac34-c1-title",
                        type: "heading",
                        level: 3,
                        text: "Turnover-Linked Leaseholds",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac34-c1-desc",
                        type: "text",
                        text: "Structuring hybrid base rent plus percentage of Gross Operating Revenue (GOP) leases, including seasonal indexation under CPI (TÜFE) statutory caps.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* 2. Tourism Operating Licensure */
              {
                id: "prac34-c2-card",
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
                    id: "prac34-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac34-c2-badge",
                        type: "badge",
                        text: "OPERATING LICENSES",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac34-c2-title",
                        type: "heading",
                        level: 3,
                        text: "Tourism Operation Permits",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac34-c2-desc",
                        type: "text",
                        text: "Securing Ministry of Tourism Operation Licences (Turizm İşletme Belgesi), municipal workplace licenses, and liquor permits (TAPDK) across coastal resort municipalities.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* 3. Eviction & TBK Protection */
              {
                id: "prac34-c3-card",
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
                    id: "prac34-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac34-c3-badge",
                        type: "badge",
                        text: "TENANCY DEFENSE",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac34-c3-title",
                        type: "heading",
                        level: 3,
                        text: "Commercial Eviction Safeguards",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac34-c3-desc",
                        type: "text",
                        text: "Protecting hotel operators against unlawful mid-season eviction actions (Tahliye Davası) and rent re-determination claims (Kira Tespit Davası) under Turkish Code of Obligations.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Retain Action Button */
          {
            id: "prac34-btn",
            type: "button",
            label: "Retain Commercial Hospitality Counsel",
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
 * PRACTICE-35: Court Proceedings · Turkish Civil Litigation Timeline & Rights Accordion
 * Layout: 2-Column Accordion Split (Interactive Procedural Accordion)
 * Visual Family: Civil Litigation Procedural Accordion
 */
export const PRACTICE_35_PROCEDURAL_TIMELINE_FAQ_ACCORDION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-35-procedural-timeline-faq-accordion",
  name: "Court Proceedings · Turkish Civil Litigation Timeline & Rights Accordion",
  kind: "section",
  root: {
    id: "prac35-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac35-container",
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
            id: "prac35-header",
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
                id: "prac35-badge",
                type: "badge",
                text: "CIVIL PROCEDURE CODE (HMK) · PROCEDURAL TIMELINE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac35-title",
                type: "heading",
                level: 2,
                text: "5 Stages of Turkish Civil Court Proceedings",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac35-subtitle",
                type: "text",
                text: "A structured walkthrough of litigation stages from initial petition filing to regional appellate review (İstinaf) before Turkish civil and commercial courts.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Split: Overview left, Interactive Accordion right */
          {
            id: "prac35-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Procedural Rights Overview (4 cols) */
              {
                id: "prac35-left-card",
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
                    id: "prac35-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac35-left-heading",
                        type: "heading",
                        level: 3,
                        text: "Litigant Statutory Safeguards",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac35-ls1",
                        type: "text",
                        text: "Foreign plaintiffs are entitled to registered sworn interpreters at all hearings under HMK Art. 263. Security for costs (Teminat) can be waived under bilateral reciprocity treaties.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac35-left-btn",
                        type: "button",
                        label: "Schedule Case Strategy Hearing",
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

              /* Right Column: Interactive 5-Stage Accordion (8 cols) */
              {
                id: "prac35-right-col",
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
                    id: "prac35-accordion",
                    type: "accordion",
                    openMode: "single",
                    collapsible: true,
                    children: [
                      /* Stage 1 */
                      {
                        id: "prac35-disc-s1",
                        type: "disclosure",
                        defaultOpen: true,
                        transition: "height-fade",
                        style: {
                          border: { radius: "lg", width: "hairline", color: "border" },
                          color: { background: "surface", text: "text" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "prac35-s1-trigger",
                            type: "slot",
                            name: "trigger",
                            children: [
                              {
                                id: "prac35-s1-title",
                                type: "heading",
                                level: 4,
                                text: "Stage 1: Petition Exchange Phase (Dilekçeler Teatisi)",
                                style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                              },
                            ],
                          },
                          {
                            id: "prac35-s1-content",
                            type: "slot",
                            name: "content",
                            children: [
                              {
                                id: "prac35-s1-body",
                                type: "text",
                                text: "Plaintiff files lawsuit petition (Dava Dilekçesi). Defendant has 2 weeks from notification to submit defense petition. Both parties exchange reply (Cevaba Cevap) and rebuttal (İkinci Cevap) briefs, fixing the scope of claims.",
                                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Stage 2 */
                      {
                        id: "prac35-disc-s2",
                        type: "disclosure",
                        defaultOpen: false,
                        transition: "height-fade",
                        style: {
                          border: { radius: "lg", width: "hairline", color: "border" },
                          color: { background: "surface", text: "text" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "prac35-s2-trigger",
                            type: "slot",
                            name: "trigger",
                            children: [
                              {
                                id: "prac35-s2-title",
                                type: "heading",
                                level: 4,
                                text: "Stage 2: Preliminary Examination Hearing (Ön İnceleme Duruşması)",
                                style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                              },
                            ],
                          },
                          {
                            id: "prac35-s2-content",
                            type: "slot",
                            name: "content",
                            children: [
                              {
                                id: "prac35-s2-body",
                                type: "text",
                                text: "Court examines formal lawsuit prerequisites, explores amicable settlement or mediation, determines contentious issues, and grants definitive time limits for submitting remaining documentary evidence.",
                                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Stage 3 */
                      {
                        id: "prac35-disc-s3",
                        type: "disclosure",
                        defaultOpen: false,
                        transition: "height-fade",
                        style: {
                          border: { radius: "lg", width: "hairline", color: "border" },
                          color: { background: "surface", text: "text" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "prac35-s3-trigger",
                            type: "slot",
                            name: "trigger",
                            children: [
                              {
                                id: "prac35-s3-title",
                                type: "heading",
                                level: 4,
                                text: "Stage 3: Evidence & Court Expert Investigation (Tahkikat & Bilirkişi)",
                                style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                              },
                            ],
                          },
                          {
                            id: "prac35-s3-content",
                            type: "slot",
                            name: "content",
                            children: [
                              {
                                id: "prac35-s3-body",
                                type: "text",
                                text: "Examination of witnesses, judicial on-site inspection (Keşif) at villa or vessel, and appointment of official court expert panels (Bilirkişi heyeti) for cadastral valuation or maritime technical audits.",
                                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Stage 4 */
                      {
                        id: "prac35-disc-s4",
                        type: "disclosure",
                        defaultOpen: false,
                        transition: "height-fade",
                        style: {
                          border: { radius: "lg", width: "hairline", color: "border" },
                          color: { background: "surface", text: "text" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "prac35-s4-trigger",
                            type: "slot",
                            name: "trigger",
                            children: [
                              {
                                id: "prac35-s4-title",
                                type: "heading",
                                level: 4,
                                text: "Stage 4: Oral Argument & Final Judgment (Sözlü Yargılama ve Hüküm)",
                                style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                              },
                            ],
                          },
                          {
                            id: "prac35-s4-content",
                            type: "slot",
                            name: "content",
                            children: [
                              {
                                id: "prac35-s4-body",
                                type: "text",
                                text: "Advocates present closing oral arguments. Court renders operative verdict (Kısa Karar) followed within 30 days by detailed reasoned judgment (Gerekçeli Karar).",
                                style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Stage 5 */
                      {
                        id: "prac35-disc-s5",
                        type: "disclosure",
                        defaultOpen: false,
                        transition: "height-fade",
                        style: {
                          border: { radius: "lg", width: "hairline", color: "border" },
                          color: { background: "surface", text: "text" },
                          spacing: { padding: "md" },
                        },
                        children: [
                          {
                            id: "prac35-s5-trigger",
                            type: "slot",
                            name: "trigger",
                            children: [
                              {
                                id: "prac35-s5-title",
                                type: "heading",
                                level: 4,
                                text: "Stage 5: Regional Appellate Review (İstinaf - Bölge Adliye Mahkemesi)",
                                style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                              },
                            ],
                          },
                          {
                            id: "prac35-s5-content",
                            type: "slot",
                            name: "content",
                            children: [
                              {
                                id: "prac35-s5-body",
                                type: "text",
                                text: "Appellate review before Izmir or Antalya Regional Court of Appeal (BAM). Final appeal on points of law lies with the Court of Cassation (Yargıtay) in Ankara for claims exceeding statutory monetary thresholds.",
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
            ],
          },
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_7 = [
  PRACTICE_31_BAR_TARIFF_FEE_TRANSPARENCY_DOCUMENT,
  PRACTICE_32_FREE_15MIN_MERITS_INTAKE_DOCUMENT,
  PRACTICE_33_HOTEL_GUEST_LEGAL_CONCIERGE_DOCUMENT,
  PRACTICE_34_RESORT_COMMERCIAL_LEASE_DECK_DOCUMENT,
  PRACTICE_35_PROCEDURAL_TIMELINE_FAQ_ACCORDION_DOCUMENT,
] as const;

