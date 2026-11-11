import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 1: Contact & Office Hubs (#01–#05)
 * Inspired by Coastal Turkish Legal Chambers (Yanatma Law, Fethiye)
 * Aesthetic: Warm cream/linen surfaces, deep navy serif typography,
 * Aegean teal accents, WhatsApp direct integration, bilingual coastal practice.
 * ============================================================================
 */

/**
 * PRACTICE-01: Coastal Law Chambers · Split Intake Form & Office Registry
 * Layout: Asymmetric 60/40 Split (Intake Form left, Chambers Registry right)
 * Visual Family: Editorial Legal Chambers
 */
export const PRACTICE_01_CONTACT_SPLIT_FORM_OFFICE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-01-contact-split-form-office",
  name: "Coastal Law Chambers · Split Intake Form & Office Registry",
  kind: "section",
  root: {
    id: "prac01-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac01-container",
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
            id: "prac01-header",
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
                id: "prac01-eyebrow",
                type: "badge",
                text: "LEGAL CONSULTATION & CHAMBERS INTAKE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac01-title",
                type: "heading",
                level: 2,
                text: "Direct Legal Intake & Chambers Registry",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac01-subtitle",
                type: "text",
                text: "Schedule an in-person consultation at our Fethiye chambers or initiate an urgent foreign national brief. All inquiries are strictly protected under Turkish attorney-client privilege.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 60/40 Split Grid */
          {
            id: "prac01-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Intake Form (7/12 cols desktop) */
              {
                id: "prac01-form-card",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 7 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac01-form-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    style: { sizing: { width: "full" } },
                    children: [
                      {
                        id: "prac01-form-header",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac01-form-heading",
                            type: "heading",
                            level: 3,
                            text: "Submit Confidential Case Brief",
                            style: {
                              typography: { size: "2xl", weight: "bold" },
                              color: { text: "text" },
                            },
                          },
                          {
                            id: "prac01-form-subtext",
                            type: "text",
                            text: "Preliminary merit assessments are evaluated by senior advocate within 4 business hours.",
                            style: {
                              typography: { size: "sm" },
                              color: { text: "text-muted" },
                            },
                          },
                        ],
                      },
                      {
                        id: "prac01-form",
                        type: "form",
                        action: "/api/practice-intake",
                        method: "post",
                        successMessage: "Thank you — your confidential brief has been transmitted securely.",
                        children: [
                          {
                            id: "prac01-fields-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "stretch",
                            distribution: "start",
                            wrap: false,
                            gap: "md",
                            style: { sizing: { width: "full" } },
                            children: [
                              {
                                id: "prac01-name-field",
                                type: "input",
                                fieldName: "full_name",
                                label: "Full Name / Passport Name",
                                placeholder: "e.g. William J. Hastings",
                                inputType: "text",
                                required: true,
                              },
                              {
                                id: "prac01-email-field",
                                type: "input",
                                fieldName: "email",
                                label: "Email Address",
                                placeholder: "william@example.co.uk",
                                inputType: "email",
                                required: true,
                              },
                              {
                                id: "prac01-tel-field",
                                type: "input",
                                fieldName: "telephone",
                                label: "Direct Telephone / WhatsApp (with Country Code)",
                                placeholder: "+44 7700 900077",
                                inputType: "tel",
                                required: true,
                              },
                              {
                                id: "prac01-practice-field",
                                type: "select",
                                fieldName: "practice_area",
                                label: "Primary Practice Jurisdiction",
                                required: true,
                                options: [
                                  { label: "Coastal Villa & Land Purchase (Tapu Diligence)", value: "real-estate" },
                                  { label: "Yacht Registration, Transit Log & Maritime Law", value: "maritime" },
                                  { label: "Turkish Citizenship by Investment ($400k)", value: "citizenship" },
                                  { label: "Cross-Border Inheritance & Turkish Will", value: "inheritance" },
                                  { label: "Commercial Hospitality & Lease Disputes", value: "hospitality" },
                                  { label: "Criminal Custody & Urgent Detainment Defense", value: "criminal" },
                                ],
                              },
                              {
                                id: "prac01-brief-field",
                                type: "textarea",
                                fieldName: "matter_summary",
                                label: "Summary of Matter / Property Details / Port of Vessel",
                                placeholder: "Provide brief summary including parcel numbers, cadastral municipality, or vessel LOA if applicable...",
                                rows: 4,
                                required: true,
                              },
                              {
                                id: "prac01-consent-field",
                                type: "checkbox",
                                fieldName: "privilege_consent",
                                label: "I confirm the accuracy of information and request privileged advocate review under Attorneyship Law No. 1136.",
                                value: "yes",
                                checkedByDefault: false,
                                required: true,
                              },
                              {
                                id: "prac01-submit-btn",
                                type: "button",
                                label: "Transmit Confidential Case Brief",
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

              /* Right Column: Office Registry & Quick Comms (5/12 cols desktop) */
              {
                id: "prac01-office-card",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 5 },
                },
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac01-registry-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    style: { sizing: { width: "full" } },
                    children: [
                      /* Bar Badge */
                      {
                        id: "prac01-bar-badge",
                        type: "badge",
                        text: "MUĞLA BAR ASSOCIATION · REG. NO 1842",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "md", paddingY: "xs" },
                        },
                      },

                      {
                        id: "prac01-registry-heading",
                        type: "heading",
                        level: 3,
                        text: "Central Chambers Registry",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },

                      /* Physical Office Card */
                      {
                        id: "prac01-address-subcard",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface", text: "text" },
                          border: { width: "hairline", color: "border", radius: "lg" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac01-addr-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "prac01-addr-label",
                                type: "text",
                                text: "OFFICE LOCATION",
                                style: {
                                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                                  color: { text: "text-muted" },
                                },
                              },
                              {
                                id: "prac01-addr-text",
                                type: "text",
                                text: "Cumhuriyet Mah. Atatürk Cad. No: 48, Kat: 2, Daire: 4, 48300 Fethiye / Muğla, Turkey",
                                style: {
                                  typography: { size: "sm", weight: "medium" },
                                  color: { text: "text" },
                                },
                              },
                              {
                                id: "prac01-addr-landmark",
                                type: "text",
                                text: "Adjacent to Fethiye Port Authority & 300m from District Courthouse",
                                style: {
                                  typography: { size: "sm" },
                                  color: { text: "text-muted" },
                                },
                              },
                            ],
                          },
                        ],
                      },

                      /* Fast Telecoms Dock */
                      {
                        id: "prac01-telecom-subcard",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface", text: "text" },
                          border: { width: "hairline", color: "border", radius: "lg" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac01-telecom-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "prac01-tel-label",
                                type: "text",
                                text: "DIRECT TELECOMMUNICATIONS",
                                style: {
                                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                                  color: { text: "text-muted" },
                                },
                              },
                              {
                                id: "prac01-phone-link",
                                type: "link",
                                label: "+90 (252) 612 00 88 (Chambers Switchboard)",
                                href: "tel:+902526120088",
                                openInNewTab: false,
                              },
                              {
                                id: "prac01-mobile-link",
                                type: "link",
                                label: "+90 (532) 745 11 22 (Direct Attorney Mobile)",
                                href: "tel:+905327451122",
                                openInNewTab: false,
                              },
                            ],
                          },
                        ],
                      },

                      /* WhatsApp Direct Action */
                      {
                        id: "prac01-wa-btn",
                        type: "button",
                        label: "Message on WhatsApp (+90 532 745 11 22)",
                        href: "https://wa.me/905327451122",
                        style: {
                          sizing: { width: "full" },
                          color: { background: "surface", text: "primary" },
                          border: { width: "hairline", color: "border", radius: "lg" },
                          spacing: { paddingY: "md", paddingX: "lg" },
                          typography: { weight: "semibold" },
                        },
                      },

                      /* Working Hours */
                      {
                        id: "prac01-hours-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac01-hours-label",
                            type: "text",
                            text: "OFFICE HOURS & JURISDICTION",
                            style: {
                              typography: { size: "sm", weight: "bold", tracking: "wide" },
                              color: { text: "text-muted" },
                            },
                          },
                          {
                            id: "prac01-hours-val",
                            type: "text",
                            text: "Monday – Friday: 09:00 – 18:30 · Saturday: By Prior Appointment",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac01-emergency-val",
                            type: "text",
                            text: "24/7 Police Custody & Vessel Arrest Urgent Duty Line available",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
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
 * PRACTICE-02: Mediterranean Bar · 3-Branch Regional Office Registry
 * Layout: Multi-Office Trio (3-column regional cards across coastal hubs)
 * Visual Family: Editorial Legal Chambers
 */
export const PRACTICE_02_MULTI_OFFICE_REGIONAL_HUB_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-02-multi-office-regional-hub",
  name: "Mediterranean Bar · 3-Branch Regional Office Registry",
  kind: "section",
  root: {
    id: "prac02-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac02-container",
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
            id: "prac02-header",
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
                id: "prac02-badge",
                type: "badge",
                text: "REGIONAL CHAMBERS DIRECTORY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac02-title",
                type: "heading",
                level: 2,
                text: "Southwest Coast Practice Locations",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac02-subtitle",
                type: "text",
                text: "Active resident chambers in Fethiye, Göcek Marina, and Bodrum to ensure seamless courtroom presence and immediate port authority liaison.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Office Grid */
          {
            id: "prac02-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Branch 1: Fethiye Central Chambers */
              {
                id: "prac02-card-fethiye",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac02-fethiye-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac02-fethiye-badge",
                        type: "badge",
                        text: "CENTRAL PRACTICE HEADQUARTERS",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac02-fethiye-name",
                        type: "heading",
                        level: 3,
                        text: "Fethiye Central Chambers",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac02-fethiye-desc",
                        type: "text",
                        text: "Full civil litigation, Title Deed (Tapu) conveyancing department, and criminal defense headquarters.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "prac02-fethiye-details",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac02-fethiye-addr",
                            type: "text",
                            text: "Atatürk Cad. No: 48/4, Fethiye / Muğla",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "prac02-fethiye-court",
                            type: "text",
                            text: "Court: Fethiye Adliyesi (200m)",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac02-fethiye-lead",
                            type: "text",
                            text: "Managing Partner: Av. Seyfullah Yanatma",
                            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "prac02-fethiye-tel",
                        type: "link",
                        label: "+90 (252) 612 00 88",
                        href: "tel:+902526120088",
                        openInNewTab: false,
                      },
                    ],
                  },
                ],
              },

              /* Branch 2: Göcek Marina Desk */
              {
                id: "prac02-card-gocek",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 6, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac02-gocek-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac02-gocek-badge",
                        type: "badge",
                        text: "SUPERYACHT & MARITIME LIAISON",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac02-gocek-name",
                        type: "heading",
                        level: 3,
                        text: "Göcek Marina & Port Desk",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac02-gocek-desc",
                        type: "text",
                        text: "Dedicated vessel closings, Transit Log renewals, D-Marin berth dispute arbitration, and charter compliance.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "prac02-gocek-details",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac02-gocek-addr",
                            type: "text",
                            text: "Cumhuriyet Meydanı Marina Suite B2, Göcek",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "prac02-gocek-court",
                            type: "text",
                            text: "Port: Göcek Harbour Master (150m)",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac02-gocek-lead",
                            type: "text",
                            text: "Maritime Counsel: Av. Ece Demirkan",
                            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "prac02-gocek-tel",
                        type: "link",
                        label: "+90 (252) 645 19 44",
                        href: "tel:+902526451944",
                        openInNewTab: false,
                      },
                    ],
                  },
                ],
              },

              /* Branch 3: Bodrum Maritime Chambers */
              {
                id: "prac02-card-bodrum",
                type: "card",
                element: "article",
                layout: {
                  span: { mobile: 12, tablet: 12, desktop: 4 },
                },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac02-bodrum-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac02-bodrum-badge",
                        type: "badge",
                        text: "LUXURY ASSETS & RESORT PRACTICE",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac02-bodrum-name",
                        type: "heading",
                        level: 3,
                        text: "Bodrum Peninsula Office",
                        style: {
                          typography: { size: "2xl", weight: "bold" },
                          color: { text: "text" },
                        },
                      },
                      {
                        id: "prac02-bodrum-desc",
                        type: "text",
                        text: "High-value resort commercial leaseholds, foreign citizenship dossiers, and Yalıkavak luxury estate conveyancing.",
                        style: {
                          typography: { size: "sm", leading: "relaxed" },
                          color: { text: "text-muted" },
                        },
                      },
                      {
                        id: "prac02-bodrum-details",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac02-bodrum-addr",
                            type: "text",
                            text: "Neyzen Tevfik Cad. No: 112, Bodrum / Muğla",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "prac02-bodrum-court",
                            type: "text",
                            text: "Court: Bodrum Adliyesi (Bitez)",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac02-bodrum-lead",
                            type: "text",
                            text: "Partner: Av. Kaan Yalçın",
                            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "prac02-bodrum-tel",
                        type: "link",
                        label: "+90 (252) 316 48 20",
                        href: "tel:+902523164820",
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
 * PRACTICE-03: 24/7 Police Custody & Detention Rapid Response Dispatch
 * Layout: Urgent Emergency Legal Response Dock
 * Visual Family: High-Urgency Legal Protection Banner
 */
export const PRACTICE_03_EMERGENCY_POLICE_DISPATCH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-03-emergency-police-dispatch",
  name: "24/7 Police Custody & Detention Rapid Response Dispatch",
  kind: "section",
  root: {
    id: "prac03-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac03-card",
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
            id: "prac03-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            style: { typography: { align: "center" } },
            children: [
              /* Alert Pill */
              {
                id: "prac03-pill",
                type: "badge",
                text: "CRIMINAL PROCEDURE LAW (CMK) · IMMEDIATE ON-SCENE ADVOCATE DEPLOYMENT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },

              /* Urgent Heading */
              {
                id: "prac03-heading",
                type: "heading",
                level: 2,
                text: "Detained by Turkish Police or Gendarmerie?",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },

              /* Statutory Rights Subtext */
              {
                id: "prac03-desc",
                type: "text",
                text: "Under Turkish Criminal Procedure Code (CMK Art. 147–154), you have the absolute legal right to remain silent and refuse interrogation until your appointed advocate arrives in person. We provide 24/7 rapid deployment across Fethiye, Marmaris, and Bodrum police stations (Karakol).",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "2xl" },
                },
              },

              /* Dual Action Hotline Buttons */
              {
                id: "prac03-btn-row",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "center",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac03-call-btn",
                    type: "button",
                    label: "CALL EMERGENCY ADVOCATE: +90 532 745 11 22",
                    href: "tel:+905327451122",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      spacing: { paddingY: "md", paddingX: "xl" },
                      border: { radius: "lg" },
                      typography: { weight: "bold" },
                    },
                  },
                  {
                    id: "prac03-wa-btn",
                    type: "button",
                    label: "URGENT WHATSAPP DISPATCH",
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

              /* Police Stations Covered */
              {
                id: "prac03-coverage-note",
                type: "text",
                text: "Average arrival time: Fethiye Emniyet Müdürlüğü (15 min) · Göcek Karakolu (25 min) · Dalaman Airport Police (40 min) · Marmaris & Bodrum (by dispatch network)",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
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
 * PRACTICE-04: In-Person & Remote Case Assessment Scheduler
 * Layout: Multi-Channel Consultation Scheduler Card
 * Visual Family: Structured Service Booking
 */
export const PRACTICE_04_CONSULTATION_SCHEDULER_CARD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-04-consultation-scheduler-card",
  name: "In-Person & Remote Case Assessment Scheduler",
  kind: "section",
  root: {
    id: "prac04-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac04-container",
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
            id: "prac04-header",
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
                id: "prac04-badge",
                type: "badge",
                text: "CASE EVALUATION & SCHEDULING",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac04-title",
                type: "heading",
                level: 2,
                text: "Schedule an In-Depth Legal Consultation",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac04-subtitle",
                type: "text",
                text: "Select your preferred consultation venue. All formal consultations include a written statutory risk assessment and procedural roadmap.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Modalities Grid */
          {
            id: "prac04-modalities-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              /* Modality 1: Chambers */
              {
                id: "prac04-mod1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac04-m1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac04-m1-title",
                        type: "heading",
                        level: 3,
                        text: "In-Chambers Fethiye",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac04-m1-desc",
                        type: "text",
                        text: "Face-to-face review with physical deed files, cadastral maps, and original contract scrutiny.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac04-m1-rate",
                        type: "text",
                        text: "Muğla Bar Statutory Tariff Compliant",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Modality 2: Video Conference */
              {
                id: "prac04-mod2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac04-m2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac04-m2-title",
                        type: "heading",
                        level: 3,
                        text: "Secure Video Conference",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac04-m2-desc",
                        type: "text",
                        text: "Encrypted Zoom or Teams session for international buyers resident in the UK, EU, or Gulf region.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac04-m2-rate",
                        type: "text",
                        text: "Includes Prior Document Scrutiny",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Modality 3: On-Board Marina Visit */
              {
                id: "prac04-mod3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac04-m3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac04-m3-title",
                        type: "heading",
                        level: 3,
                        text: "On-Board Marina Attendance",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac04-m3-desc",
                        type: "text",
                        text: "Senior advocate presence at Göcek, Fethiye Ece Saray, or Marmaris Netsel Marina aboard your vessel.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac04-m3-rate",
                        type: "text",
                        text: "Discreet Maritime & Superyacht Protocol",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Direct CTA Action */
          {
            id: "prac04-action-card",
            type: "card",
            element: "div",
            style: {
              color: { background: "surface-muted", text: "text" },
              border: { width: "hairline", color: "border", radius: "xl" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac04-act-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac04-act-text-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac04-act-title",
                        type: "heading",
                        level: 4,
                        text: "Request Appointment Slot with Senior Advocate",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac04-act-sub",
                        type: "text",
                        text: "Earliest available slots typically within 24 to 48 hours. Urgent maritime matters attended immediately.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                  {
                    id: "prac04-act-btn",
                    type: "button",
                    label: "Book Appointment Slot",
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
 * PRACTICE-05: International Client Concierge & Language Desk
 * Layout: Full-Width Multilingual Banner with Flag / Sworn Translation Badges
 * Visual Family: Sovereign Expat Legal Services
 */
export const PRACTICE_05_MULTILINGUAL_INTAKE_BANNER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-05-multilingual-intake-banner",
  name: "International Client Concierge & Language Desk",
  kind: "section",
  root: {
    id: "prac05-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac05-container",
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
            id: "prac05-header",
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
                id: "prac05-badge",
                type: "badge",
                text: "FOREIGN NATIONALS DESK",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac05-title",
                type: "heading",
                level: 2,
                text: "Multilingual Legal Representation in English, German & Russian",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac05-subtitle",
                type: "text",
                text: "Foreign investors and residents receive direct advocate communication without language barriers. Sworn Turkish court interpreters and in-house notary apostille translation available.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Language Cards Trio */
          {
            id: "prac05-langs-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* English Desk */
              {
                id: "prac05-en-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac05-en-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac05-en-badge",
                        type: "badge",
                        text: "ENGLISH PRACTICE DESK",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac05-en-title",
                        type: "heading",
                        level: 3,
                        text: "UK & Commonwealth Counsel",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac05-en-text",
                        type: "text",
                        text: "Direct bilingual advocates trained in English Common Law contracts, cross-border wills, and Fethiye villa conveyancing.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac05-en-link",
                        type: "link",
                        label: "Direct English Line: +90 532 745 11 22",
                        href: "tel:+905327451122",
                        openInNewTab: false,
                      },
                    ],
                  },
                ],
              },

              /* German Desk */
              {
                id: "prac05-de-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac05-de-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac05-de-badge",
                        type: "badge",
                        text: "DEUTSCHSPRACHIGE BERATUNG",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac05-de-title",
                        type: "heading",
                        level: 3,
                        text: "DACH & European Desk",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac05-de-text",
                        type: "text",
                        text: "Deutsche Rechtsberatung für Immobilienkauf, Erbrecht, Nachlassabwicklung und Aufenthaltstitel (Ikamet).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac05-de-link",
                        type: "link",
                        label: "Deutsch Desk: +90 252 612 00 88",
                        href: "tel:+902526120088",
                        openInNewTab: false,
                      },
                    ],
                  },
                ],
              },

              /* Russian Desk */
              {
                id: "prac05-ru-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac05-ru-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac05-ru-badge",
                        type: "badge",
                        text: "РУССКОЯЗЫЧНЫЙ ОТДЕЛ",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac05-ru-title",
                        type: "heading",
                        level: 3,
                        text: "CIS & International Desk",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac05-ru-text",
                        type: "text",
                        text: "Юридическое сопровождение инвестиций, получение ВНЖ (икамет), покупка вилл и оформление ТАПУ.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac05-ru-link",
                        type: "link",
                        label: "WhatsApp CIS: +90 532 745 11 22",
                        href: "https://wa.me/905327451122",
                        openInNewTab: true,
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

export const PRACTICE_LIBRARY_BATCH_1 = [
  PRACTICE_01_CONTACT_SPLIT_FORM_OFFICE_DOCUMENT,
  PRACTICE_02_MULTI_OFFICE_REGIONAL_HUB_DOCUMENT,
  PRACTICE_03_EMERGENCY_POLICE_DISPATCH_DOCUMENT,
  PRACTICE_04_CONSULTATION_SCHEDULER_CARD_DOCUMENT,
  PRACTICE_05_MULTILINGUAL_INTAKE_BANNER_DOCUMENT,
] as const;
