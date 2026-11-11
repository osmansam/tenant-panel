import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 2: Attorney & Team Profiles (#06–#10)
 * Inspired by Coastal Turkish Legal Practice (Yanatma Law, Fethiye)
 * Aesthetic: Warm cream/linen surfaces, deep navy serif typography,
 * Aegean teal accents, structured bar credentials, distinguished monographs.
 * ============================================================================
 */

/**
 * PRACTICE-06: Principal Advocate · Portrait & Bar Credentials Monograph
 * Layout: Split Portrait & Credentials Dossier (5/7 cols desktop)
 * Visual Family: Editorial Legal Monograph
 */
export const PRACTICE_06_ATTORNEY_BIO_MONOGRAPH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-06-attorney-bio-monograph",
  name: "Principal Advocate · Portrait & Bar Credentials Monograph",
  kind: "section",
  root: {
    id: "prac06-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac06-container",
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
            id: "prac06-header",
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
                id: "prac06-badge",
                type: "badge",
                text: "MANAGING PARTNER & FOUNDER",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac06-title",
                type: "heading",
                level: 2,
                text: "Advocate Seyfullah Yanatma",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac06-subtitle",
                type: "text",
                text: "Senior coastal litigation advocate with over two decades of focused representation in Turkish real estate title security, superyacht maritime law, and foreign national assets.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Split Grid */
          {
            id: "prac06-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Portrait & Bar Accolade Card (5 cols) */
              {
                id: "prac06-portrait-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "xl", shadow: "md" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac06-portrait-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "center",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      /* Portrait Image */
                      {
                        id: "prac06-portrait-img",
                        type: "image",
                        src: "/visual-builder/placeholder.svg",
                        alt: "Advocate Seyfullah Yanatma - Senior Turkish Coastal Barrister",
                        aspectRatio: "portrait",
                        objectFit: "cover",
                        style: {
                          sizing: { width: "full", maxWidth: "sm" },
                          border: { radius: "lg" },
                        },
                      },

                      /* Fast Registry Meta */
                      {
                        id: "prac06-meta-card",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { width: "hairline", color: "border", radius: "lg" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac06-meta-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "prac06-meta-bar",
                                type: "text",
                                text: "Bar: Muğla Bar Association (Sicil No: 1842)",
                                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                              },
                              {
                                id: "prac06-meta-tbb",
                                type: "text",
                                text: "TBB Roll: Union of Turkish Bar Associations Reg. 64291",
                                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                              },
                              {
                                id: "prac06-meta-langs",
                                type: "text",
                                text: "Working Languages: Turkish, English",
                                style: { typography: { size: "sm" }, color: { text: "primary" } },
                              },
                            ],
                          },
                        ],
                      },

                      /* Direct CTA Button */
                      {
                        id: "prac06-direct-btn",
                        type: "button",
                        label: "Request Direct Consultation",
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

              /* Right Column: Practice Monograph & Academic History (7 cols) */
              {
                id: "prac06-monograph-card",
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
                    id: "prac06-mono-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      /* Section Title */
                      {
                        id: "prac06-mono-heading",
                        type: "heading",
                        level: 3,
                        text: "Chambers Practice History & Juridical Focus",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },

                      /* Monograph Text */
                      {
                        id: "prac06-mono-p1",
                        type: "text",
                        text: "Founded under the principles of rigorous statutory diligence and unwavering client advocacy, the practice of Av. Seyfullah Yanatma has served high-net-worth foreign individuals, international yacht owners, and commercial hospitality operators along Turkey's southwestern littoral since 2004.",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text" } },
                      },
                      {
                        id: "prac06-mono-p2",
                        type: "text",
                        text: "Specializing in complex Title Deed (Tapu) disputes, cadastre boundary rectification, Turkish Citizenship by Investment dossiers, and maritime litigation, Av. Yanatma regularly appears before the Fethiye, Marmaris, and Bodrum Civil Courts of First Instance, as well as the Izmir Regional Court of Appeal (Bölge Adliye Mahkemesi).",
                        style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                      },

                      /* Key Practice Pillars */
                      {
                        id: "prac06-pillars-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        style: { sizing: { width: "full" } },
                        children: [
                          {
                            id: "prac06-p-label",
                            type: "text",
                            text: "CORE JURISDICTIONS & ACCREDITATIONS",
                            style: {
                              typography: { size: "sm", weight: "bold", tracking: "wide" },
                              color: { text: "text-muted" },
                            },
                          },
                          {
                            id: "prac06-p1-item",
                            type: "text",
                            text: "• Immovable Property Law: Turnkey conveyancing, TAKBİS lien audit, and developer dispute arbitration.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac06-p2-item",
                            type: "text",
                            text: "• Maritime & Admiralty: Transit Log compliance, yacht sale escrow, and emergency vessel arrest defense.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac06-p3-item",
                            type: "text",
                            text: "• Private International Law: Foreign probate recognition (Tenfiz) and Turkish citizenship dossiers.",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                        ],
                      },

                      /* Academic Education Footnote */
                      {
                        id: "prac06-edu-card",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted", text: "text" },
                          border: { width: "hairline", color: "border", radius: "lg" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac06-edu-stack",
                            type: "stack",
                            direction: "column",
                            alignment: "start",
                            distribution: "start",
                            wrap: false,
                            gap: "xs",
                            children: [
                              {
                                id: "prac06-edu-uni",
                                type: "text",
                                text: "Education: Ankara University Faculty of Law (LL.B. Hons)",
                                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
                              },
                              {
                                id: "prac06-edu-post",
                                type: "text",
                                text: "Postgraduate Studies: Private International Law & Admiralty Arbitration",
                                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
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

/**
 * PRACTICE-07: Senior Advocates · Dual Practice Heads Comparative Split
 * Layout: 2-Column Equal Partner Dossier Split (Real Estate vs Maritime)
 * Visual Family: Editorial Legal Chambers
 */
export const PRACTICE_07_PARTNERS_DUO_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-07-partners-duo-split",
  name: "Senior Advocates · Dual Practice Heads Comparative Split",
  kind: "section",
  root: {
    id: "prac07-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac07-container",
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
            id: "prac07-header",
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
                id: "prac07-badge",
                type: "badge",
                text: "PRACTICE LEADERSHIP",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac07-title",
                type: "heading",
                level: 2,
                text: "Heads of Practice Groups",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac07-subtitle",
                type: "text",
                text: "Dedicated leadership across real estate acquisition governance and superyacht admiralty law along the Turkish Riviera.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 2-Column Duo Grid */
          {
            id: "prac07-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Partner 1: Property & Real Estate Head */
              {
                id: "prac07-p1-card",
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
                    id: "prac07-p1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac07-p1-badge",
                        type: "badge",
                        text: "HEAD OF REAL ESTATE & PRIVATE CLIENTS",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac07-p1-name",
                        type: "heading",
                        level: 3,
                        text: "Av. Seyfullah Yanatma",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac07-p1-desc",
                        type: "text",
                        text: "Leads coastal villa purchases, military security clearance filings, cadastre boundary rectification, and foreign investment dossiers.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac07-p1-creds",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac07-p1-c1",
                            type: "text",
                            text: "Admitted: Muğla Bar Association (1842)",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "prac07-p1-c2",
                            type: "text",
                            text: "Focus: Conveyancing, TAKBİS Registry, Property Disputes",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac07-p1-email",
                        type: "link",
                        label: "Direct Email: s.yanatma@yanatmalaw.com",
                        href: "mailto:s.yanatma@yanatmalaw.com",
                        openInNewTab: false,
                      },
                    ],
                  },
                ],
              },

              /* Partner 2: Maritime & Superyacht Head */
              {
                id: "prac07-p2-card",
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
                    id: "prac07-p2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac07-p2-badge",
                        type: "badge",
                        text: "HEAD OF MARITIME & SUPERYACHT LAW",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac07-p2-name",
                        type: "heading",
                        level: 3,
                        text: "Av. Ece Demirkan",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac07-p2-desc",
                        type: "text",
                        text: "Oversees superyacht acquisitions, Turkish Transit Log navigation protocols, crew employment disputes, and Göcek marina lease contracts.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac07-p2-creds",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac07-p2-c1",
                            type: "text",
                            text: "Admitted: Istanbul Bar & Muğla Bar Maritime Commission",
                            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "prac07-p2-c2",
                            type: "text",
                            text: "Focus: Vessel Closings, Flag Deletion, Marine Insurance",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac07-p2-email",
                        type: "link",
                        label: "Direct Email: e.demirkan@yanatmalaw.com",
                        href: "mailto:e.demirkan@yanatmalaw.com",
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
 * PRACTICE-08: Practice Chambers · 4-Associate Practice Group Roster
 * Layout: 4-Column Associate Grid across Core Practice Areas
 * Visual Family: Professional Chambers Roster
 */
export const PRACTICE_08_CHAMBERS_TEAM_QUAD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-08-chambers-team-quad",
  name: "Practice Chambers · 4-Associate Practice Group Roster",
  kind: "section",
  root: {
    id: "prac08-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac08-container",
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
            id: "prac08-header",
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
                id: "prac08-badge",
                type: "badge",
                text: "CHAMBERS ASSOCIATES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac08-title",
                type: "heading",
                level: 2,
                text: "Resident Associate Advocates",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac08-subtitle",
                type: "text",
                text: "Dedicated bilingual practitioners managing daily court filings, land registry searches, immigration dossiers, and maritime clearances.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 4-Card Quad Grid */
          {
            id: "prac08-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Associate 1 */
              {
                id: "prac08-a1-card",
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
                    id: "prac08-a1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac08-a1-badge",
                        type: "badge",
                        text: "LITIGATION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac08-a1-name",
                        type: "heading",
                        level: 3,
                        text: "Av. Can Berk Arslan",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac08-a1-focus",
                        type: "text",
                        text: "Senior Litigation Associate · Civil Court Disputes & Enforcement",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac08-a1-bar",
                        type: "text",
                        text: "Muğla Bar No: 2314 · EN / TR",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Associate 2 */
              {
                id: "prac08-a2-card",
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
                    id: "prac08-a2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac08-a2-badge",
                        type: "badge",
                        text: "CONVEYANCING",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac08-a2-name",
                        type: "heading",
                        level: 3,
                        text: "Av. Selin Gökova",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac08-a2-focus",
                        type: "text",
                        text: "Title Deed Due Diligence · TAKBİS Registry & Cadastre Audits",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac08-a2-bar",
                        type: "text",
                        text: "Muğla Bar No: 2548 · EN / DE / TR",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Associate 3 */
              {
                id: "prac08-a3-card",
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
                    id: "prac08-a3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac08-a3-badge",
                        type: "badge",
                        text: "IMMIGRATION",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac08-a3-name",
                        type: "heading",
                        level: 3,
                        text: "Av. Murat Keskin",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac08-a3-focus",
                        type: "text",
                        text: "Turkish Citizenship $400k Dossiers & Residence Permit (İkamet)",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac08-a3-bar",
                        type: "text",
                        text: "Muğla Bar No: 2691 · RU / EN / TR",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Associate 4 */
              {
                id: "prac08-a4-card",
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
                    id: "prac08-a4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac08-a4-badge",
                        type: "badge",
                        text: "MARITIME PROTOCOL",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac08-a4-name",
                        type: "heading",
                        level: 3,
                        text: "Av. Yasemin Özer",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac08-a4-focus",
                        type: "text",
                        text: "Port Clearances, Harbour Master Liaison & Vessel Bill of Sale",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac08-a4-bar",
                        type: "text",
                        text: "Muğla Bar No: 2780 · EN / FR / TR",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
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
 * PRACTICE-09: Senior Academic Counsel · Constitutional Jurisprudence Spotlight
 * Layout: Distinguished Single-Column Centered Prose Monograph
 * Visual Family: Scholarly Legal Opinion Spotlight
 */
export const PRACTICE_09_OF_COUNSEL_ACADEMIC_SPOTLIGHT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-09-of-counsel-academic-spotlight",
  name: "Senior Academic Counsel · Constitutional Jurisprudence Spotlight",
  kind: "section",
  root: {
    id: "prac09-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac09-card",
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
            id: "prac09-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            style: { typography: { align: "center" } },
            children: [
              /* Academic Pill */
              {
                id: "prac09-badge",
                type: "badge",
                text: "SENIOR OF COUNSEL · MARITIME & PRIVATE INTERNATIONAL LAW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },

              /* Professor Heading */
              {
                id: "prac09-heading",
                type: "heading",
                level: 2,
                text: "Prof. Dr. Haluk Güngör, LL.M., Ph.D.",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },

              /* Chair Title */
              {
                id: "prac09-chair",
                type: "text",
                text: "Emeritus Professor of Admiralty Law · Istanbul University Faculty of Law\nArbitrator at the Turkish Maritime Law Association Panel",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "primary" },
                  sizing: { maxWidth: "2xl" },
                },
              },

              /* Scholarly Monograph */
              {
                id: "prac09-bio-text",
                type: "text",
                text: "Serving as Chambers Special Academic Counsel, Prof. Dr. Güngör delivers authoritative expert witness opinions on complex cross-border maritime liens, salvage apportionment under Lloyd's Open Form (LOF), and conflict-of-laws matters for high-stake appellate briefs before the Court of Cassation (Yargıtay 11. Hukuk Dairesi).",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "3xl" },
                },
              },

              /* Treatise Bibliography Link */
              {
                id: "prac09-link",
                type: "link",
                label: "Examine Published Treatises & Supreme Court Expert Opinions",
                href: "/academic-counsel",
                openInNewTab: false,
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * PRACTICE-10: Legal Credentials · Bar Associations & Court Licensures
 * Layout: Official Credential Wall (6-badge pedigree cluster)
 * Visual Family: Sovereign Legal Accreditation
 */
export const PRACTICE_10_BAR_ADMISSIONS_BADGE_CLUSTER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-10-bar-admissions-badge-cluster",
  name: "Legal Credentials · Bar Associations & Court Licensures",
  kind: "section",
  root: {
    id: "prac10-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac10-container",
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
            id: "prac10-header",
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
                id: "prac10-badge",
                type: "badge",
                text: "OFFICIAL ACCREDITATIONS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac10-title",
                type: "heading",
                level: 2,
                text: "Bar Admissions & Judicial Registrations",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac10-subtitle",
                type: "text",
                text: "Our advocates are actively enrolled in national and international legal associations, maintaining statutory rights of audience before all Turkish civil, criminal, and appellate courts.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 6-Badge Pedigree Grid */
          {
            id: "prac10-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              /* Credential 1 */
              {
                id: "prac10-c1-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac10-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac10-c1-title",
                        type: "heading",
                        level: 4,
                        text: "Muğla Bar Association",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac10-c1-detail",
                        type: "text",
                        text: "Primary Coastal Bar Roll · Registration No. 1842",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Credential 2 */
              {
                id: "prac10-c2-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac10-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac10-c2-title",
                        type: "heading",
                        level: 4,
                        text: "Union of Turkish Bar Associations",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac10-c2-detail",
                        type: "text",
                        text: "TBB Nationwide Licensure · Full Sovereign Audience Rights",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Credential 3 */
              {
                id: "prac10-c3-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac10-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac10-c3-title",
                        type: "heading",
                        level: 4,
                        text: "Turkish Maritime Law Association",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac10-c3-detail",
                        type: "text",
                        text: "Comité Maritime International (CMI) Affiliate Member",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Credential 4 */
              {
                id: "prac10-c4-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac10-c4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac10-c4-title",
                        type: "heading",
                        level: 4,
                        text: "International Bar Association",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac10-c4-detail",
                        type: "text",
                        text: "IBA Real Estate & Maritime Transport Commission",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Credential 5 */
              {
                id: "prac10-c5-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac10-c5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac10-c5-title",
                        type: "heading",
                        level: 4,
                        text: "Court of Cassation (Yargıtay)",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac10-c5-detail",
                        type: "text",
                        text: "Admitted for Supreme Appellate Advocacy & Review",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Credential 6 */
              {
                id: "prac10-c6-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac10-c6-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac10-c6-title",
                        type: "heading",
                        level: 4,
                        text: "Ministry of Justice Expert Roster",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac10-c6-detail",
                        type: "text",
                        text: "Certified Real Estate Cadastre & Maritime Valuer Panel",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Roll Verification Link */
          {
            id: "prac10-verify-link",
            type: "link",
            label: "Verify Active Bar Standing via Union of Turkish Bar Associations (TBB BaroLevha)",
            href: "https://www.barobirlik.org.tr",
            openInNewTab: true,
          },
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_2 = [
  PRACTICE_06_ATTORNEY_BIO_MONOGRAPH_DOCUMENT,
  PRACTICE_07_PARTNERS_DUO_SPLIT_DOCUMENT,
  PRACTICE_08_CHAMBERS_TEAM_QUAD_DOCUMENT,
  PRACTICE_09_OF_COUNSEL_ACADEMIC_SPOTLIGHT_DOCUMENT,
  PRACTICE_10_BAR_ADMISSIONS_BADGE_CLUSTER_DOCUMENT,
] as const;

