import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 8: Hotel Operations & Statutory Compliance (#36–#40)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 36: Sticky Editorial Article & Chambers Action Dossier (like StickySidebarArticle)
 * 37: Statutory Warning Banner & Coastal Defense Split (No cards, 50/50 statutory formula)
 * 38: Tabular Statutory Registry Matrix (Clean legal gazette table layout)
 * 39: Asymmetric 70/30 Legal Dossier with Digital Scanner Blueprint
 * 40: Minimalist Monochrome Legal Monograph with Execution Signature
 * ============================================================================
 */

/**
 * PRACTICE-36: Ministry of Tourism · Boutique Hotel Operating Certificate Audit
 * Layout Archetype: Sticky Editorial Article & Chambers Action Dossier
 */
export const PRACTICE_36_MINISTRY_TOURSISM_AUDIT_LICENSE_DOCUMENT: ComponentDocument =
  {
    version: 2,
    id: "practice-36-ministry-tourism-audit-license",
    name: "Ministry of Tourism · Boutique Hotel Operating Certificate Audit",
    kind: "section",
    root: {
      id: "prac36-section",
      type: "section",
      style: {
        color: { background: "background", text: "text" },
        spacing: { paddingY: "2xl", paddingX: "lg" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "prac36-grid",
          type: "grid",
          columns: 12,
          style: {
            sizing: { width: "full", maxWidth: "7xl", align: "center" },
            spacing: { gap: "xl" },
          },
          children: [
            /* Left Column (Span 8): Editorial Legal Article */
            {
              id: "prac36-article",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "lg",
              layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
              style: {
                sizing: { maxWidth: "3xl" },
              },
              children: [
                {
                  id: "prac36-kicker",
                  type: "text",
                  text: "TURKISH TOURISM PROMOTION LAW NO. 2634 · STATUTORY AUDIT DOSSIER",
                  style: {
                    typography: {
                      size: "sm",
                      weight: "semibold",
                      tracking: "wide",
                    },
                    color: { text: "primary" },
                  },
                },
                {
                  id: "prac36-title",
                  type: "heading",
                  level: 1,
                  text: "Boutique Hotel Statutory Operating License & Ministry Certification",
                  style: {
                    typography: {
                      size: "4xl",
                      weight: "bold",
                      tracking: "tight",
                    },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac36-lead",
                  type: "text",
                  text: "Operating a luxury boutique hotel or heritage stone resort along the Aegean and Mediterranean coast requires navigating the statutory transition from municipal simple accommodation permits to the mandatory Ministry of Culture and Tourism Operating License (Turizm İşletme Belgesi).",
                  style: {
                    typography: { size: "lg", leading: "relaxed" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac36-section-1-heading",
                  type: "heading",
                  level: 2,
                  text: "1. Municipal Clearances & Fire Safety Verification",
                  style: {
                    typography: { size: "2xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac36-section-1-text",
                  type: "text",
                  text: "Before lodging the central Ministry application in Ankara, the property must possess a spotless İşyeri Açma ve Çalışma Ruhsatı issued by the local municipality, alongside the mandatory Muğla Metropolitan Fire Department (İtfaiye) Seismic & Fire Compliance Protocol. Failure to document fire escape egress widths or kitchen suppression systems will result in immediate file rejection.",
                  style: {
                    typography: { size: "base", leading: "relaxed" },
                    color: { text: "text-muted" },
                  },
                },
                {
                  id: "prac36-section-2-heading",
                  type: "heading",
                  level: 2,
                  text: "2. Ministry Room Dimension & Physical Standards",
                  style: {
                    typography: { size: "2xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac36-section-2-text",
                  type: "text",
                  text: "Boutique status demands compliance with Regulation on Tourism Facilities: minimum net bedroom square meters excluding bathroom, dedicated breakfast pavilions, sound insulation between suites, and certified potable water filtration cisterns. Historical stone mansions in Sit Alanı zones require special dispensation waivers from the Anıtlar Kurulu.",
                  style: {
                    typography: { size: "base", leading: "relaxed" },
                    color: { text: "text-muted" },
                  },
                },
                {
                  id: "prac36-checklist",
                  type: "list",
                  marker: "check",
                  items: [
                    "Yapı Kullanma İzin Belgesi (İskan) architectural audit",
                    "Muğla Metropolitan Fire Department suppression protocol",
                    "Acoustic noise barrier report under Çevre Mevzuatı",
                    "Backup generator and water reservoir capacity certification",
                  ],
                  style: {
                    typography: { size: "base" },
                    color: { text: "text" },
                    spacing: { paddingY: "sm" },
                  },
                },
              ],
            },

            /* Right Column (Span 4): Pinned Sticky Chambers Action Dossier */
            {
              id: "prac36-sidebar-card",
              type: "card",
              element: "article",
              layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
              style: {
                positioning: { position: "sticky", top: "lg" },
                color: { background: "surface", text: "text" },
                border: {
                  width: "hairline",
                  color: "border",
                  radius: "lg",
                  shadow: "md",
                },
                spacing: { padding: "xl" },
              },
              children: [
                {
                  id: "prac36-sidebar-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  children: [
                    {
                      id: "prac36-sb-badge",
                      type: "badge",
                      text: "OFFICIAL AUDIT DESK",
                      style: {
                        color: { background: "surface-muted", text: "primary" },
                        border: { radius: "sm" },
                        spacing: { paddingX: "sm", paddingY: "xs" },
                      },
                    },
                    {
                      id: "prac36-sb-title",
                      type: "heading",
                      level: 3,
                      text: "Consult Hospitality Practice Counsel",
                      style: {
                        typography: { size: "xl", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac36-sb-desc",
                      type: "text",
                      text: "Representing boutique hotel owners across Fethiye, Göcek, Kalkan, and Kaş before the Ministry of Culture & Tourism.",
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac36-sb-divider",
                      type: "divider",
                    },
                    {
                      id: "prac36-sb-lawyer",
                      type: "text",
                      text: "Managing Advocate: Av. Seyfullah Yanatma\nMuğla Bar Association · Registration No. 1842",
                      style: {
                        typography: { size: "sm", weight: "medium" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac36-sb-office",
                      type: "text",
                      text: "Chambers: Akarca Mah. 878. Sk. No:55/1/2\n48300 Fethiye / Muğla",
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac36-sb-whatsapp-btn",
                      type: "button",
                      label: "Direct WhatsApp: +90 531 507 41 44",
                      href: "https://wa.me/905315074144",
                      style: {
                        color: { background: "primary", text: "background" },
                        border: { radius: "md" },
                        sizing: { width: "full" },
                        spacing: { paddingY: "md" },
                        typography: { weight: "semibold" },
                      },
                    },
                    {
                      id: "prac36-sb-email-link",
                      type: "link",
                      label: "Email: info@yanatmalaw.com",
                      href: "mailto:info@yanatmalaw.com",
                      openInNewTab: false,
                      style: {
                        typography: { size: "sm" },
                        color: { text: "primary" },
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
 * PRACTICE-37: Beachfront Ecrimisil Advisory · Milli Emlak Coastal Penalty Defense
 * Layout Archetype: High-Visibility Warning Banner + Coastal Defense Split (No cards)
 */
export const PRACTICE_37_BEACHFRONT_ECRIMISIL_ADVISORY_DOCUMENT: ComponentDocument =
  {
    version: 2,
    id: "practice-37-beachfront-ecrimisil-advisory",
    name: "Beachfront Ecrimisil Advisory · Milli Emlak Coastal Penalty Defense",
    kind: "section",
    root: {
      id: "prac37-section",
      type: "section",
      style: {
        color: { background: "background", text: "text" },
        spacing: { paddingY: "2xl", paddingX: "lg" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "prac37-container",
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
            /* Top Urgent Warning Banner */
            {
              id: "prac37-alert-banner",
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
                  id: "prac37-alert-badge",
                  type: "badge",
                  text: "STATUTORY WARNING · 30-DAY INJUNCTION DEADLINE",
                  style: {
                    color: { background: "surface", text: "danger" },
                    border: { radius: "sm" },
                    spacing: { paddingX: "sm", paddingY: "xs" },
                  },
                },
                {
                  id: "prac37-alert-title",
                  type: "heading",
                  level: 3,
                  text: "Milli Emlak Ecrimisil Notice Received? An Ecrimisil Payment Is NOT a Valid Beach Lease",
                  style: {
                    typography: { size: "xl", weight: "bold" },
                    color: { text: "danger" },
                  },
                },
                {
                  id: "prac37-alert-sub",
                  type: "text",
                  text: "Under Turkish State Property Law No. 2886 and Kıyı Kanunu No. 3621, paying an Ecrimisil trespass fine grants zero leasehold rights. The Ministry preserves full legal power to demolish sun decks, beach cabanas, and piers without prior hearing.",
                  style: {
                    typography: { size: "sm" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* Bottom 50/50 Dual-Track Defense Split (No cards, pure architectural typography) */
            {
              id: "prac37-split",
              type: "grid",
              columns: 12,
              style: {
                sizing: { width: "full" },
                spacing: { gap: "xl" },
              },
              children: [
                /* Left Column: Penalty Calculation & Defense */
                {
                  id: "prac37-col-left",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  children: [
                    {
                      id: "prac37-left-heading",
                      type: "heading",
                      level: 2,
                      text: "Statutory Penalty Calculation & Administrative Appeal",
                      style: {
                        typography: { size: "2xl", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac37-left-p1",
                      type: "text",
                      text: "Milli Emlak calculates retro-active occupation penalties using estimated commercial turnover rather than square meter value. Our chambers files administrative objections (Düzeltme Talebi) within 30 days of service to reduce over-assessed penalty tariffs.",
                      style: {
                        typography: { size: "base", leading: "relaxed" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac37-formula-box",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      style: {
                        sizing: { width: "full" },
                        color: { background: "surface", text: "text" },
                        border: {
                          width: "hairline",
                          color: "border",
                          radius: "md",
                        },
                        spacing: { padding: "lg" },
                      },
                      children: [
                        {
                          id: "prac37-formula-label",
                          type: "text",
                          text: "STATUTORY CHALLENGE FORMULA",
                          style: {
                            typography: { size: "sm", weight: "bold" },
                            color: { text: "primary" },
                          },
                        },
                        {
                          id: "prac37-formula-body",
                          type: "text",
                          text: "Appeals must prove seasonal non-occupation (winter months), dispute designated high-water setback coordinates, and establish prior municipal allocation.",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Right Column: Legitimate Coastal Concession Leasing */
                {
                  id: "prac37-col-right",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  children: [
                    {
                      id: "prac37-right-heading",
                      type: "heading",
                      level: 2,
                      text: "Transitioning to a Long-Term Coastal Lease",
                      style: {
                        typography: { size: "2xl", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac37-right-p1",
                      type: "text",
                      text: "Rather than risking annual demolish orders, coastal boutique hotels can secure 10-to-30-year operational concession contracts through Ministry of Environment (Çevre ve Şehircilik Bakanlığı) and MUÇEV public tender procedures.",
                      style: {
                        typography: { size: "base", leading: "relaxed" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac37-right-list",
                      type: "list",
                      marker: "check",
                      items: [
                        "MUÇEV coastal tender pre-qualification dossier",
                        "Removable wooden sun deck (Ahşap İskele) permitting",
                        "Kıyı Kenar Çizgisi cadastral border verification",
                        "Immediate administrative court stay of execution (Yürütmeyi Durdurma)",
                      ],
                      style: {
                        typography: { size: "base" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac37-right-cta",
                      type: "button",
                      label: "File Emergency Administrative Stay of Execution",
                      href: "#coastal-defense",
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

/**
 * PRACTICE-38: Hotel Expat Staff & Executive Work Permit Quotas
 * Layout Archetype: Clean Tabular Statutory Registry Matrix
 */
export const PRACTICE_38_HOTEL_STAFF_WORK_PERMIT_HUB_DOCUMENT: ComponentDocument =
  {
    version: 2,
    id: "practice-38-hotel-staff-work-permit-hub",
    name: "Hotel Expat Staff & Executive Work Permit Quotas",
    kind: "section",
    root: {
      id: "prac38-section",
      type: "section",
      style: {
        color: { background: "background", text: "text" },
        spacing: { paddingY: "2xl", paddingX: "lg" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "prac38-container",
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
              id: "prac38-header",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "xs",
              style: {
                sizing: { maxWidth: "3xl" },
              },
              children: [
                {
                  id: "prac38-badge",
                  type: "badge",
                  text: "INTERNATIONAL LABOUR LAW NO. 6735 · STATUTORY REGISTRY",
                  style: {
                    color: { background: "surface-muted", text: "primary" },
                    border: { radius: "sm" },
                    spacing: { paddingX: "sm", paddingY: "xs" },
                  },
                },
                {
                  id: "prac38-title",
                  type: "heading",
                  level: 2,
                  text: "Hospitality Foreign Staffing Quotas & Work Permit Protocol",
                  style: {
                    typography: {
                      size: "4xl",
                      weight: "bold",
                      tracking: "tight",
                    },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac38-sub",
                  type: "text",
                  text: "Ministry of Labour regulations enforce a strict 5:1 Turkish-to-foreign employee quota. Boutique luxury hotels and Michelin-recognized restaurants must structure specialized executive exemptions for foreign sommeliers, chefs, and general managers.",
                  style: {
                    typography: { size: "lg" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* Tabular Registry Grid (Table Rows with hairline borders) */
            {
              id: "prac38-table",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "none",
              style: {
                sizing: { width: "full" },
                border: { width: "hairline", color: "border", radius: "lg" },
                color: { background: "surface", text: "text" },
              },
              children: [
                /* Table Header */
                {
                  id: "prac38-th",
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
                      id: "prac38-th1",
                      type: "text",
                      text: "HOSPITALITY ROLE",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "sm", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac38-th2",
                      type: "text",
                      text: "STATUTORY SALARY MULTIPLIER",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "sm", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac38-th3",
                      type: "text",
                      text: "5:1 QUOTA EXEMPTION BASIS",
                      layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                      style: {
                        typography: { size: "sm", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                    {
                      id: "prac38-th4",
                      type: "text",
                      text: "PROCESSING TIMELINE",
                      layout: { span: { mobile: 12, tablet: 2, desktop: 2 } },
                      style: {
                        typography: { size: "sm", weight: "bold" },
                        color: { text: "text" },
                      },
                    },
                  ],
                },

                /* Row 1: Executive Chef / Head Sommelier */
                {
                  id: "prac38-r1",
                  type: "grid",
                  columns: 12,
                  style: {
                    sizing: { width: "full" },
                    spacing: { paddingX: "lg", paddingY: "lg" },
                    border: { width: "hairline", color: "border" },
                  },
                  children: [
                    {
                      id: "prac38-r1-role",
                      type: "text",
                      text: "Executive Chef / Sommelier",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "base", weight: "semibold" },
                      },
                    },
                    {
                      id: "prac38-r1-sal",
                      type: "text",
                      text: "3x Minimum Wage (Net)",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac38-r1-basis",
                      type: "text",
                      text: "Specialized Gastronomy Certification; Ministry of Tourism facility permit required.",
                      layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac38-r1-time",
                      type: "text",
                      text: "4 to 6 Weeks",
                      layout: { span: { mobile: 12, tablet: 2, desktop: 2 } },
                      style: {
                        typography: { size: "sm", weight: "medium" },
                        color: { text: "primary" },
                      },
                    },
                  ],
                },

                /* Row 2: General Manager */
                {
                  id: "prac38-r2",
                  type: "grid",
                  columns: 12,
                  style: {
                    sizing: { width: "full" },
                    spacing: { paddingX: "lg", paddingY: "lg" },
                    border: { width: "hairline", color: "border" },
                  },
                  children: [
                    {
                      id: "prac38-r2-role",
                      type: "text",
                      text: "Resort General Manager",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "base", weight: "semibold" },
                      },
                    },
                    {
                      id: "prac38-r2-sal",
                      type: "text",
                      text: "6.5x Minimum Wage (Net)",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac38-r2-basis",
                      type: "text",
                      text: "Direct Board Signature Authority; exempt from 5:1 quota for first 12 months.",
                      layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac38-r2-time",
                      type: "text",
                      text: "3 to 4 Weeks",
                      layout: { span: { mobile: 12, tablet: 2, desktop: 2 } },
                      style: {
                        typography: { size: "sm", weight: "medium" },
                        color: { text: "primary" },
                      },
                    },
                  ],
                },

                /* Row 3: Wellness & Spa Specialists */
                {
                  id: "prac38-r3",
                  type: "grid",
                  columns: 12,
                  style: {
                    sizing: { width: "full" },
                    spacing: { paddingX: "lg", paddingY: "lg" },
                  },
                  children: [
                    {
                      id: "prac38-r3-role",
                      type: "text",
                      text: "Certified Spa / Thalasso Therapist",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "base", weight: "semibold" },
                      },
                    },
                    {
                      id: "prac38-r3-sal",
                      type: "text",
                      text: "2x Minimum Wage (Net)",
                      layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac38-r3-basis",
                      type: "text",
                      text: "Apostilled national physiotherapy / hydrotherapy diploma; Ministry of Health registration.",
                      layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                    {
                      id: "prac38-r3-time",
                      type: "text",
                      text: "5 to 7 Weeks",
                      layout: { span: { mobile: 12, tablet: 2, desktop: 2 } },
                      style: {
                        typography: { size: "sm", weight: "medium" },
                        color: { text: "primary" },
                      },
                    },
                  ],
                },
              ],
            },

            /* Footer Action */
            {
              id: "prac38-footer-action",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "between",
              wrap: true,
              gap: "md",
              style: {
                sizing: { width: "full" },
              },
              children: [
                {
                  id: "prac38-ft-note",
                  type: "text",
                  text: "Ministry of Labour portal e-İmza filing managed directly under advocate power of attorney.",
                  style: {
                    typography: { size: "sm" },
                    color: { text: "text-muted" },
                  },
                },
                {
                  id: "prac38-ft-btn",
                  type: "button",
                  label: "Audit Hotel Staff Quota & Prepare Expat Filings",
                  href: "#work-permits",
                  style: {
                    color: { background: "primary", text: "background" },
                    border: { radius: "md" },
                    spacing: { paddingX: "lg", paddingY: "sm" },
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
 * PRACTICE-39: Guest Privacy, KVKK & Identity Reporting (KBS) Compliance
 * Layout Archetype: Asymmetric 70/30 Legal Dossier with Blueprint
 */
export const PRACTICE_39_GUEST_KVKK_PASSPORT_DATA_PANEL_DOCUMENT: ComponentDocument =
  {
    version: 2,
    id: "practice-39-guest-kvkk-passport-data-panel",
    name: "Guest Privacy, KVKK & Identity Reporting (KBS) Compliance",
    kind: "section",
    root: {
      id: "prac39-section",
      type: "section",
      style: {
        color: { background: "background", text: "text" },
        spacing: { paddingY: "2xl", paddingX: "lg" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "prac39-grid",
          type: "grid",
          columns: 12,
          style: {
            sizing: { width: "full", maxWidth: "7xl", align: "center" },
            spacing: { gap: "xl" },
          },
          children: [
            /* Left Side (Span 8): Heavy Regulatory Exposition */
            {
              id: "prac39-left-dossier",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "lg",
              layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
              children: [
                {
                  id: "prac39-badge",
                  type: "badge",
                  text: "IDENTITY NOTIFICATION LAW NO. 1774 · KVKK PRIVACY MANDATE",
                  style: {
                    color: { background: "surface-muted", text: "primary" },
                    border: { radius: "sm" },
                    spacing: { paddingX: "sm", paddingY: "xs" },
                  },
                },
                {
                  id: "prac39-heading",
                  type: "heading",
                  level: 2,
                  text: "Guest Identity Reporting vs. KVKK Data Protection Conflict",
                  style: {
                    typography: {
                      size: "4xl",
                      weight: "bold",
                      tracking: "tight",
                    },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac39-p1",
                  type: "text",
                  text: "Turkish boutique hotels operate at the direct crossroad of two competing statutory mandates: Identity Notification Law No. 1774 (requiring immediate electronic lodging of all guest passport records to the Gendarmerie/Police KBS system) and Personal Data Protection Law No. 6698 (KVKK, which strictly penalizes unauthorized biometric scanning or retaining physical passport photocopies).",
                  style: {
                    typography: { size: "base", leading: "relaxed" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac39-p2",
                  type: "text",
                  text: "Retaining unredacted credit card copies or holding passports at reception after check-in exposes hoteliers to administrative fines exceeding 2,000,000 TRY per breach. We draft bilingual check-in privacy declarations and front-desk protocols reconciling KBS statutory duties with KVKK data minimization rules.",
                  style: {
                    typography: { size: "base", leading: "relaxed" },
                    color: { text: "text-muted" },
                  },
                },
                {
                  id: "prac39-checklist",
                  type: "list",
                  marker: "check",
                  items: [
                    "Bilingual English / Turkish KVKK Aydınlatma Metni at check-in",
                    "Prohibition on retaining physical guest passports or credit card CVC photocopies",
                    "VERBİS Data Controllers' Registry compliance for hospitality chains",
                    "Encrypted local network transmission to Emniyet / Jandarma KBS gateway",
                  ],
                  style: {
                    typography: { size: "base" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* Right Side (Span 4): Front-Desk Scanner Protocol Blueprint */
            {
              id: "prac39-right-blueprint",
              type: "stack",
              direction: "column",
              alignment: "start",
              distribution: "start",
              wrap: false,
              gap: "md",
              layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
              style: {
                color: { background: "surface", text: "text" },
                border: { width: "hairline", color: "border", radius: "lg" },
                spacing: { padding: "xl" },
              },
              children: [
                {
                  id: "prac39-bp-badge",
                  type: "badge",
                  text: "RECEPTION BLUEPRINT",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    border: { radius: "sm" },
                    spacing: { paddingX: "sm", paddingY: "xs" },
                  },
                },
                {
                  id: "prac39-bp-title",
                  type: "heading",
                  level: 3,
                  text: "Standard Front-Desk Operational Checklist",
                  style: {
                    typography: { size: "xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac39-bp-rule1",
                  type: "text",
                  text: "1. Scan MRZ code only for real-time KBS upload.\n2. Do NOT store passport image files on reception desktop.\n3. Return physical document to guest immediately upon key handover.\n4. Execute separate consent form for optional hotel marketing emails.",
                  style: {
                    typography: { size: "sm", leading: "relaxed" },
                    color: { text: "text-muted" },
                  },
                },
                {
                  id: "prac39-bp-sep",
                  type: "divider",
                },
                {
                  id: "prac39-bp-cta",
                  type: "button",
                  label: "Request Complete Hotel KVKK Compliance Packet",
                  href: "#kvkk-audit",
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
  };

/**
 * PRACTICE-40: Resort Spa, Hammam & Thermal Springs Liability Disclaimer
 * Layout Archetype: Minimalist Monochrome Legal Monograph with Execution Signature
 */
export const PRACTICE_40_RESORT_SPA_LIABILITY_WAIVER_DOCUMENT: ComponentDocument =
  {
    version: 2,
    id: "practice-40-resort-spa-liability-waiver",
    name: "Resort Spa, Hammam & Thermal Springs Liability Disclaimer",
    kind: "section",
    root: {
      id: "prac40-section",
      type: "section",
      style: {
        color: { background: "background", text: "text" },
        spacing: { paddingY: "2xl", paddingX: "lg" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "prac40-monograph",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "lg",
          style: {
            sizing: { width: "full", maxWidth: "4xl", align: "center" },
            typography: { align: "center" },
          },
          children: [
            {
              id: "prac40-kicker",
              type: "text",
              text: "TURKISH CODE OF OBLIGATIONS (TBK) · ARTICLE 115 STATUTORY DISCLOSURE",
              style: {
                typography: {
                  size: "sm",
                  weight: "semibold",
                  tracking: "wide",
                },
                color: { text: "text-muted" },
              },
            },
            {
              id: "prac40-title",
              type: "heading",
              level: 2,
              text: "Luxury Resort Wellness, Hammam & Thermal Spring Liability Standards",
              style: {
                typography: { size: "4xl", weight: "bold", tracking: "tight" },
                color: { text: "text" },
              },
            },
            {
              id: "prac40-quote",
              type: "text",
              text: "“Under Turkish Law, a blanket ‘use at your own risk’ sign has zero legal force against claims of gross negligence (Ağır Kusur). Luxury wellness resorts must implement statutory medical questionnaires and bilingual health waivers to satisfy TBK Art. 115 standards.”",
              style: {
                typography: { size: "xl", leading: "relaxed" },
                color: { text: "primary" },
              },
            },
            {
              id: "prac40-divider",
              type: "divider",
              style: {
                sizing: { width: "50%", align: "center" },
              },
            },
            {
              id: "prac40-legal-body",
              type: "text",
              text: "Operating heated thalassotherapy pools, authentic Turkish hammams, and high-temperature Finnish saunas creates heightened statutory duties of care for luxury hoteliers. Guests suffering cardiovascular conditions, pregnancy, or dermatological reactions frequently initiate tort claims unless pre-treatment medical screening declarations (Sağlık Beyan Formu) are formally countersigned prior to thermal immersion.",
              style: {
                typography: { size: "base", leading: "relaxed", align: "left" },
                color: { text: "text-muted" },
              },
            },
            {
              id: "prac40-signature-block",
              type: "stack",
              direction: "row",
              alignment: "center",
              distribution: "between",
              wrap: true,
              gap: "lg",
              style: {
                sizing: { width: "full" },
                spacing: { paddingTop: "lg" },
              },
              children: [
                {
                  id: "prac40-sig-left",
                  type: "text",
                  text: "COUNSEL PROTOCOL:\nAv. Seyfullah Yanatma · Fethiye & Bodrum Practice Group",
                  style: {
                    typography: {
                      size: "sm",
                      weight: "semibold",
                      align: "left",
                    },
                    color: { text: "text" },
                  },
                },
                {
                  id: "prac40-sig-right",
                  type: "button",
                  label: "Download Multilingual Spa Waiver Dossier",
                  href: "#spa-waivers",
                  style: {
                    color: { background: "surface", text: "text" },
                    border: {
                      width: "hairline",
                      color: "border",
                      radius: "md",
                    },
                    spacing: { paddingX: "lg", paddingY: "sm" },
                    typography: { weight: "medium" },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

export const PRACTICE_LIBRARY_BATCH_8: ComponentDocument[] = [
  PRACTICE_36_MINISTRY_TOURSISM_AUDIT_LICENSE_DOCUMENT,
  PRACTICE_37_BEACHFRONT_ECRIMISIL_ADVISORY_DOCUMENT,
  PRACTICE_38_HOTEL_STAFF_WORK_PERMIT_HUB_DOCUMENT,
  PRACTICE_39_GUEST_KVKK_PASSPORT_DATA_PANEL_DOCUMENT,
  PRACTICE_40_RESORT_SPA_LIABILITY_WAIVER_DOCUMENT,
];
