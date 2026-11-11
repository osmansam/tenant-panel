import type { ComponentDocument } from "../model";

export const STICKY_SIDEBAR_EDITORIAL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-sticky-sidebar-editorial",
  name: "Sticky Editorial · Article & Contact Sidebar",
  kind: "section",
  root: {
    id: "sticky-article-section",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "2xl" },
      background: [
        {
          kind: "solid",
          color: { kind: "custom", value: "#FAF8F5" },
        },
      ],
      color: { text: "text" },
    },
    children: [
      {
        id: "sticky-article-grid",
        type: "grid",
        columns: 12,
        style: {
          sizing: {
            width: "full",
            maxWidth: "6xl",
            align: "center",
          },
          spacing: {
            gap: "2xl",
          },
        },
        children: [
          /* LEFT COLUMN: Long editorial article writings (8 cols) */
          {
            id: "article-content-column",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 8 },
            },
            children: [
              {
                id: "article-intro-meta",
                type: "text",
                text: "2017. He is registered with the Muğla Bar Association.",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "article-intro-p1",
                type: "text",
                text: "His local connection helps clients who need a lawyer familiar with the Fethiye setting while applying Turkish law and procedure. Clients may live in Fethiye, visit briefly, manage property from another country or deal with a public-authority decision. The relevant court, office, document and deadline depend on the matter, so start with the facts rather than assume every foreign-client issue follows the same route.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text" },
                },
              },
              {
                id: "article-h1",
                type: "heading",
                level: 2,
                text: "Working with foreign clients in English and Turkish",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight", family: "serif" },
                  spacing: { marginTop: "lg", marginBottom: "xs" },
                },
              },
              {
                id: "article-p2",
                type: "text",
                text: "Av. Yanatma works in English and Turkish. A foreign client can describe the problem and receive an explanation of relevant Turkish terms, documents and procedural choices in a language the client understands. Official records and proceedings may still require Turkish documents, an authorised translation or an interpreter, depending on the authority and step. Legal representation and interpretation are separate roles.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "article-p3",
                type: "text",
                text: "Foreign clients commonly ask about property, title deeds, residence permits, citizenship, family matters, inheritance, criminal allegations, administrative decisions, business, work permits, accidents, tenancy and maritime matters. Each subject groups specific legal obligations while providing dated general information for readers who want to understand the terminology before sending documents.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "article-p4",
                type: "text",
                text: "A client outside Türkiye may be able to give defined authority through a power of attorney, subject to the wording and formalities accepted for the intended act. Sets of instructions can be organised from abroad, while ensuring questions to consider before signing are resolved thoroughly.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "article-h2",
                type: "heading",
                level: 3,
                text: "Practical steps for property, residence & business",
                style: {
                  typography: { size: "2xl", weight: "bold", family: "serif" },
                  spacing: { marginTop: "xl", marginBottom: "xs" },
                },
              },
              {
                id: "article-p5",
                type: "text",
                text: "Navigating local administrative registries, cadastral filings, notarizations, and municipal permits requires structured procedural coordination. Having clear visibility on legal milestones prevents delays and guarantees compliance across regional jurisdictions in Muğla and throughout Turkey.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "article-p6",
                type: "text",
                text: "Clients receive proactive updates, itemized schedules, and direct bilingual communications at every stage of the representation. Whether negotiating contracts, drafting dispute filings, or managing closing formalities, the emphasis remains on transparency, meticulous documentation, and local legal precision.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* RIGHT COLUMN: Stable sticky sidebar box (4 cols) */
          {
            id: "sticky-sidebar-column",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: {
              span: { mobile: 12, tablet: 12, desktop: 4 },
            },
            style: {
              positioning: {
                position: "sticky",
                top: "lg",
              },
            },
            children: [
              /* Card 1: Contact / Info Box ("Talk to Av. Yanatma") */
              {
                id: "sticky-contact-card",
                type: "card",
                element: "article",
                style: {
                  spacing: { padding: "xl" },
                  background: [
                    {
                      kind: "solid",
                      color: { kind: "custom", value: "#FFFFFF" },
                    },
                  ],
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  color: { text: "text" },
                },
                children: [
                  {
                    id: "contact-card-title",
                    type: "heading",
                    level: 3,
                    text: "Talk to Av. Yanatma",
                    style: {
                      typography: { size: "xl", weight: "bold", family: "serif" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  /* Field: Lawyer */
                  {
                    id: "meta-lawyer-label",
                    type: "text",
                    text: "LAWYER",
                    style: {
                      typography: { size: "sm", weight: "bold", tracking: "wide" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "meta-lawyer-val",
                    type: "text",
                    text: "Av. Seyfullah Yanatma",
                    style: {
                      typography: { size: "base", weight: "medium" },
                      spacing: { marginBottom: "md" },
                    },
                  },
                  /* Field: Office */
                  {
                    id: "meta-office-label",
                    type: "text",
                    text: "OFFICE",
                    style: {
                      typography: { size: "sm", weight: "bold", tracking: "wide" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "meta-office-val",
                    type: "text",
                    text: "Akarca Mah. 878. Sk. No:55/1/2\n48300 Fethiye / Muğla",
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "md" },
                    },
                  },
                  /* Field: Office Hours */
                  {
                    id: "meta-hours-label",
                    type: "text",
                    text: "OFFICE HOURS",
                    style: {
                      typography: { size: "sm", weight: "bold", tracking: "wide" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "meta-hours-val",
                    type: "text",
                    text: "Monday–Friday, 09:00–17:00",
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "md" },
                    },
                  },
                  /* Field: Languages */
                  {
                    id: "meta-languages-label",
                    type: "text",
                    text: "LANGUAGES",
                    style: {
                      typography: { size: "sm", weight: "bold", tracking: "wide" },
                      color: { text: "text-muted" },
                    },
                  },
                  {
                    id: "meta-languages-val",
                    type: "text",
                    text: "English and Turkish",
                    style: {
                      typography: { size: "sm" },
                      spacing: { marginBottom: "lg" },
                    },
                  },
                  /* Action Buttons */
                  {
                    id: "btn-phone-call",
                    type: "button",
                    label: "+90 531 507 41 44",
                    iconId: "phone",
                    iconPosition: "start",
                    href: "tel:+905315074144",
                    style: {
                      background: [
                        {
                          kind: "solid",
                          color: { kind: "custom", value: "#13505B" },
                        },
                      ],
                      textPaint: { kind: "custom", value: "#FFFFFF" },
                      border: { radius: "md" },
                      spacing: { paddingX: "lg", paddingY: "sm", marginBottom: "sm" },
                      sizing: { width: "full" },
                      typography: { weight: "semibold" },
                    },
                  },
                  {
                    id: "btn-whatsapp",
                    type: "button",
                    label: "WhatsApp",
                    iconId: "arrow-right",
                    iconPosition: "start",
                    href: "https://wa.me/905315074144",
                    openInNewTab: true,
                    style: {
                      background: [
                        {
                          kind: "solid",
                          color: { kind: "custom", value: "#1E7E48" },
                        },
                      ],
                      textPaint: { kind: "custom", value: "#FFFFFF" },
                      border: { radius: "md" },
                      spacing: { paddingX: "lg", paddingY: "sm", marginBottom: "sm" },
                      sizing: { width: "full" },
                      typography: { weight: "semibold" },
                    },
                  },
                  {
                    id: "btn-email",
                    type: "button",
                    label: "info@yanatmalaw.com",
                    iconId: "envelope",
                    iconPosition: "start",
                    href: "mailto:info@yanatmalaw.com",
                    style: {
                      background: [
                        {
                          kind: "solid",
                          color: { kind: "custom", value: "#FFFFFF" },
                        },
                      ],
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingX: "lg", paddingY: "sm", marginBottom: "sm" },
                      sizing: { width: "full" },
                      typography: { weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "btn-directions",
                    type: "button",
                    label: "Get directions",
                    iconId: "map-pin",
                    iconPosition: "start",
                    href: "https://maps.google.com",
                    openInNewTab: true,
                    style: {
                      background: [
                        {
                          kind: "solid",
                          color: { kind: "custom", value: "#FFFFFF" },
                        },
                      ],
                      border: { radius: "md", width: "thin", color: "border" },
                      spacing: { paddingX: "lg", paddingY: "sm" },
                      sizing: { width: "full" },
                      typography: { weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                ],
              },

              /* Card 2: Related Pages */
              {
                id: "sticky-related-card",
                type: "card",
                element: "div",
                style: {
                  spacing: { padding: "lg" },
                  background: [
                    {
                      kind: "solid",
                      color: { kind: "custom", value: "#FFFFFF" },
                    },
                  ],
                  border: { radius: "xl", width: "thin", color: "border" },
                  color: { text: "text" },
                },
                children: [
                  {
                    id: "related-pages-title",
                    type: "heading",
                    level: 4,
                    text: "Related pages",
                    style: {
                      typography: { size: "lg", weight: "bold", family: "serif" },
                      spacing: { marginBottom: "md" },
                    },
                  },
                  {
                    id: "related-link-home",
                    type: "link",
                    label: "Home",
                    href: "/",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      spacing: { paddingY: "xs" },
                      border: { width: "thin", color: "border" },
                      sizing: { width: "full" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "related-link-foreign",
                    type: "link",
                    label: "Foreign clients",
                    href: "/foreign-clients",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      spacing: { paddingY: "xs" },
                      border: { width: "thin", color: "border" },
                      sizing: { width: "full" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "related-link-services",
                    type: "link",
                    label: "Services",
                    href: "/services",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      spacing: { paddingY: "xs" },
                      border: { width: "thin", color: "border" },
                      sizing: { width: "full" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "related-link-guides",
                    type: "link",
                    label: "Guides",
                    href: "/guides",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      spacing: { paddingY: "xs" },
                      border: { width: "thin", color: "border" },
                      sizing: { width: "full" },
                      color: { text: "primary" },
                    },
                  },
                  {
                    id: "related-link-contact",
                    type: "link",
                    label: "Contact",
                    href: "/contact",
                    openInNewTab: false,
                    style: {
                      typography: { size: "sm" },
                      spacing: { paddingY: "xs" },
                      sizing: { width: "full" },
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
