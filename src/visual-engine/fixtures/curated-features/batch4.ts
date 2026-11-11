import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED FEATURE LIBRARY — BATCH 4 (HOTELS & LAWYERS)
 * Focus: High-end Hospitality (Hotels/Resorts) and Legal Counsel (Lawyers)
 * ============================================================================
 */

/**
 * FEATURE-16: Heritage Chateau · Grand Estate Scale & Historic Legacy
 * Industry: Hotels & Luxury Hospitality
 * Layout: 3-column monumental heritage stat cards
 * Visual Family: European Historic Palace / Wine Chateau
 */
export const FEATURE_HOTEL_PROPERTY_STAT_TRIO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-16-hotel-property-stat-trio",
  name: "Heritage Chateau · Grand Estate Scale & Historic Legacy",
  kind: "section",
  root: {
    id: "feat16-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat16-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "feat16-header",
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
                id: "feat16-badge",
                type: "badge",
                text: "CENTURY ARCHIVES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat16-title",
                type: "heading",
                level: 2,
                text: "A legacy of aristocratic hospitality spanning three centuries",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat16-subtitle",
                type: "text",
                text: "Preserving historical architectural majesty while providing private contemporary sanctuaries for world leaders and discerning families.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3 Monumental Heritage Stat Cards */
          {
            id: "feat16-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Stat Card 1 */
              {
                id: "feat16-card-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat16-c1-stat",
                    type: "stat",
                    value: "1884",
                    label: "YEAR FOUNDED",
                    style: { typography: { size: "4xl", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "feat16-c1-title",
                    type: "heading",
                    level: 3,
                    text: "Built by the Duc de Rohan",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "xs" } },
                  },
                  {
                    id: "feat16-c1-desc",
                    type: "text",
                    text: "Constructed as a seasonal autumn hunting seat, featuring original Neo-Renaissance limestone facades, handcrafted tapestries, and ceiling frescoes.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Stat Card 2 */
              {
                id: "feat16-card-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat16-c2-stat",
                    type: "stat",
                    value: "450",
                    label: "PRIVATE ACRES",
                    style: { typography: { size: "4xl", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "feat16-c2-title",
                    type: "heading",
                    level: 3,
                    text: "Gated Forest Sanctuary",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "xs" } },
                  },
                  {
                    id: "feat16-c2-desc",
                    type: "text",
                    text: "Surrounded by ancient oak woodlands, formal French boxwood parterres, private equestrian trails, and private helipad landing grounds.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                ],
              },

              /* Stat Card 3 */
              {
                id: "feat16-card-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat16-c3-stat",
                    type: "stat",
                    value: "24",
                    label: "MINERAL SPRINGS",
                    style: { typography: { size: "4xl", weight: "bold" }, color: { text: "primary" } },
                  },
                  {
                    id: "feat16-c3-title",
                    type: "heading",
                    level: 3,
                    text: "Natural Thermal Hydrology",
                    style: { typography: { size: "xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "xs" } },
                  },
                  {
                    id: "feat16-c3-desc",
                    type: "text",
                    text: "Naturally emerging alpine thermal springs feeding the chateau's hydrotherapy pavilion, rich in sulfur and magnesium, first cataloged in Roman records.",
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
};

/**
 * FEATURE-17: Full-Service Chancery · Departmental Capabilities Tabs
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: Interactive multi-department tabs with trial practice specs
 * Visual Family: Corporate Chancery / Appellate Bar
 */
export const FEATURE_LEGAL_PRACTICE_TABS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-17-legal-practice-tabs",
  name: "Full-Service Chancery · Departmental Capabilities Tabs",
  kind: "section",
  root: {
    id: "feat17-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat17-container",
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
            id: "feat17-header",
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
                id: "feat17-badge",
                type: "badge",
                text: "DEPARTMENTAL PORTFOLIO",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat17-title",
                type: "heading",
                level: 2,
                text: "Specialized trial departments for high-stakes adversity",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat17-subtitle",
                type: "text",
                text: "Select a practice department to explore trial track records, lead partner profiles, and representative matter mandates.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Tabs Component */
          {
            id: "feat17-tabs",
            type: "tabs",
            children: [
              /* Tab 1: Antitrust & M&A Defense */
              {
                id: "feat17-tab-1",
                type: "disclosure",
                defaultOpen: true,
                transition: "none",
                children: [
                  {
                    id: "feat17-t1-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "feat17-t1-label",
                        type: "text",
                        text: "Antitrust & Competition Bar",
                        style: { typography: { size: "sm", weight: "bold" } },
                      },
                    ],
                  },
                  {
                    id: "feat17-t1-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "feat17-t1-panel",
                        type: "card",
                        element: "article",
                        style: {
                          color: { background: "surface", text: "text" },
                          border: { radius: "xl", width: "thin", color: "border", shadow: "md" },
                          spacing: { padding: "xl" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "feat17-t1-head",
                            type: "heading",
                            level: 3,
                            text: "Global Cartel Defense, FTC Injunctions & Hart-Scott-Rodino Clearance",
                            style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                          },
                          {
                            id: "feat17-t1-copy",
                            type: "text",
                            text: "Our antitrust trial advocates represent Fortune 50 corporations before the DOJ Antitrust Division, Federal Trade Commission, and European Commission DG COMP. We have secured unimpeded clearance for over $48B in contested cross-border acquisitions.",
                            style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                          },
                          {
                            id: "feat17-t1-list",
                            type: "list",
                            marker: "check",
                            items: [
                              "Lead defense counsel in 14 multi-district class action monopolization suits",
                              "CFIUS foreign investment clearance across critical semiconductor supply chains",
                              "Comprehensive economic modeling & behavioral antitrust remedies",
                            ],
                            style: { typography: { size: "sm" }, spacing: { marginBottom: "lg" } },
                          },
                          {
                            id: "feat17-t1-btn",
                            type: "button",
                            label: "Consult Antitrust Practice Lead",
                            href: "/practices/antitrust",
                            style: {
                              color: { background: "primary", text: "primary-foreground" },
                              border: { radius: "md" },
                              typography: { weight: "semibold" },
                              spacing: { paddingX: "lg", paddingY: "md" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Tab 2: Patent & Trade Secrets */
              {
                id: "feat17-tab-2",
                type: "disclosure",
                defaultOpen: false,
                transition: "none",
                children: [
                  {
                    id: "feat17-t2-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "feat17-t2-label",
                        type: "text",
                        text: "Patent & Trade Secrets Bar",
                        style: { typography: { size: "sm", weight: "bold" } },
                      },
                    ],
                  },
                  {
                    id: "feat17-t2-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "feat17-t2-panel",
                        type: "card",
                        element: "article",
                        style: {
                          color: { background: "surface", text: "text" },
                          border: { radius: "xl", width: "thin", color: "border", shadow: "md" },
                          spacing: { padding: "xl" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "feat17-t2-head",
                            type: "heading",
                            level: 3,
                            text: "ITC Section 337 Exclusion Orders & Federal Circuit Appeals",
                            style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                          },
                          {
                            id: "feat17-t2-copy",
                            type: "text",
                            text: "Representing life sciences and semiconductor leaders in catastrophic patent disputes. From emergency preliminary injunctions in Delaware to exclusion orders blocking infringing imports at US ports of entry.",
                            style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                          },
                          {
                            id: "feat17-t2-list",
                            type: "list",
                            marker: "check",
                            items: [
                              "Over $1.2B in patent licensing royalties recovered for corporate inventors",
                              "Complete defense jury verdicts in Marshall, Waco, and Wilmington federal courts",
                              "Phased PTAB Inter Partes Review (IPR) patent invalidation strategies",
                            ],
                            style: { typography: { size: "sm" }, spacing: { marginBottom: "lg" } },
                          },
                          {
                            id: "feat17-t2-btn",
                            type: "button",
                            label: "Consult IP Practice Lead",
                            href: "/practices/intellectual-property",
                            style: {
                              color: { background: "primary", text: "primary-foreground" },
                              border: { radius: "md" },
                              typography: { weight: "semibold" },
                              spacing: { paddingX: "lg", paddingY: "md" },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Tab 3: Sovereign Debt & Arbitrations */
              {
                id: "feat17-tab-3",
                type: "disclosure",
                defaultOpen: false,
                transition: "none",
                children: [
                  {
                    id: "feat17-t3-trigger",
                    type: "slot",
                    name: "trigger",
                    children: [
                      {
                        id: "feat17-t3-label",
                        type: "text",
                        text: "Sovereign Debt & Treaty Bar",
                        style: { typography: { size: "sm", weight: "bold" } },
                      },
                    ],
                  },
                  {
                    id: "feat17-t3-content",
                    type: "slot",
                    name: "content",
                    children: [
                      {
                        id: "feat17-t3-panel",
                        type: "card",
                        element: "article",
                        style: {
                          color: { background: "surface", text: "text" },
                          border: { radius: "xl", width: "thin", color: "border", shadow: "md" },
                          spacing: { padding: "xl" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "feat17-t3-head",
                            type: "heading",
                            level: 3,
                            text: "ICSID Bilateral Investment Treaties & Central Bank Asset Immunities",
                            style: { typography: { size: "xl", weight: "bold" }, spacing: { marginBottom: "sm" } },
                          },
                          {
                            id: "feat17-t3-copy",
                            type: "text",
                            text: "Advising nation states and multinational concession holders in treaty expropriation claims, sovereign bond restructurings, and Foreign Sovereign Immunities Act (FSIA) litigation.",
                            style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                          },
                          {
                            id: "feat17-t3-list",
                            type: "list",
                            marker: "check",
                            items: [
                              "Counsel in 9 landmark ICSID energy and mining arbitrations",
                              "Defending central bank foreign reserves against private judgment creditors",
                              "Bilateral treaty renegotiation under international public law",
                            ],
                            style: { typography: { size: "sm" }, spacing: { marginBottom: "lg" } },
                          },
                          {
                            id: "feat17-t3-btn",
                            type: "button",
                            label: "Consult Sovereign Practice Lead",
                            href: "/practices/sovereign-debt",
                            style: {
                              color: { background: "primary", text: "primary-foreground" },
                              border: { radius: "md" },
                              typography: { weight: "semibold" },
                              spacing: { paddingX: "lg", paddingY: "md" },
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
 * FEATURE-18: Lakeside Lodge · Curated Seasonal Retreat Packages
 * Industry: Hotels & Luxury Hospitality
 * Layout: 3-column seasonal retreat package cards
 * Visual Family: Alpine Lakeside Sanctuary
 */
export const FEATURE_HOTEL_SEASONAL_OFFER_CARDS_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-18-hotel-seasonal-offer-cards",
  name: "Lakeside Lodge · Curated Seasonal Retreat Packages",
  kind: "section",
  root: {
    id: "feat18-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat18-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "feat18-header",
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
                id: "feat18-badge",
                type: "badge",
                text: "SEASONAL RETREATS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat18-title",
                type: "heading",
                level: 2,
                text: "Curated seasonal escapes designed for restorative pace",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat18-subtitle",
                type: "text",
                text: "Limited residential reservations incorporating private mountain excursions, holistic body treatments, and sommelier dinners.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Card Grid */
          {
            id: "feat18-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* Package 1: Winter Alpine Ski & Thermal */
              {
                id: "feat18-p1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat18-p1-badge",
                    type: "badge",
                    text: "DECEMBER – APRIL",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat18-p1-title",
                    type: "heading",
                    level: 3,
                    text: "Alpine Glaciers & Thermal Hearth",
                    style: { typography: { size: "2xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "xs" } },
                  },
                  {
                    id: "feat18-p1-price",
                    type: "heading",
                    level: 4,
                    text: "$6,800 · 4 Nights All-Inclusive",
                    style: { typography: { size: "lg", weight: "semibold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat18-p1-desc",
                    type: "text",
                    text: "Private heli-skiing guided across pristine powder glaciers, followed by restorative hot stone massages and open hearth fondue dinners.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                  },
                  {
                    id: "feat18-p1-btn",
                    type: "button",
                    label: "Reserve Winter Escape",
                    href: "/seasonal/winter",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Package 2: Autumn Harvest & Wine (Featured) */
              {
                id: "feat18-p2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "primary", shadow: "lg" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat18-p2-badge",
                    type: "badge",
                    text: "SEPTEMBER – NOVEMBER · VINTAGE SEASON",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat18-p2-title",
                    type: "heading",
                    level: 3,
                    text: "Private Cru Harvest & Truffle Reserve",
                    style: { typography: { size: "2xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "xs" } },
                  },
                  {
                    id: "feat18-p2-price",
                    type: "heading",
                    level: 4,
                    text: "$7,400 · 4 Nights All-Inclusive",
                    style: { typography: { size: "lg", weight: "semibold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat18-p2-desc",
                    type: "text",
                    text: "Join our master vigneron for private morning vineyard harvest pickings, afternoon truffle foraging, and cellar barrel tastings.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                  },
                  {
                    id: "feat18-p2-btn",
                    type: "button",
                    label: "Reserve Autumn Vintage",
                    href: "/seasonal/autumn",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
                    },
                  },
                ],
              },

              /* Package 3: Summer Lake & Riva Yachting */
              {
                id: "feat18-p3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat18-p3-badge",
                    type: "badge",
                    text: "MAY – AUGUST",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "sm" },
                      spacing: { paddingX: "sm", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat18-p3-title",
                    type: "heading",
                    level: 3,
                    text: "Alpine Lake Sailing & Private Island Cabana",
                    style: { typography: { size: "2xl", weight: "bold" }, spacing: { marginTop: "md", marginBottom: "xs" } },
                  },
                  {
                    id: "feat18-p3-price",
                    type: "heading",
                    level: 4,
                    text: "$8,200 · 5 Nights All-Inclusive",
                    style: { typography: { size: "lg", weight: "semibold" }, color: { text: "primary" }, spacing: { marginBottom: "sm" } },
                  },
                  {
                    id: "feat18-p3-desc",
                    type: "text",
                    text: "Daily excursions aboard the estate's classic mahogany Riva yacht, secluded island picnics prepared by personal chefs, and sunset champagne cruises.",
                    style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" }, spacing: { marginBottom: "lg" } },
                  },
                  {
                    id: "feat18-p3-btn",
                    type: "button",
                    label: "Reserve Summer Escape",
                    href: "/seasonal/summer",
                    style: {
                      color: { background: "surface-muted", text: "text" },
                      border: { radius: "md", width: "thin", color: "border" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "lg", paddingY: "md" },
                      sizing: { width: "full" },
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
 * FEATURE-19: Compliance Advisory · Regulatory Sanction & Exposure Matrix
 * Industry: Lawyers & High-Stakes Legal Practices
 * Layout: Structured regulatory compliance exposure matrix across agencies
 * Visual Family: Corporate White-Collar Compliance
 */
export const FEATURE_LEGAL_RISK_ASSESSMENT_TABLE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-19-legal-risk-assessment-table",
  name: "Compliance Advisory · Regulatory Sanction & Exposure Matrix",
  kind: "section",
  root: {
    id: "feat19-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat19-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "feat19-header",
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
                id: "feat19-badge",
                type: "badge",
                text: "STATUTORY RISK GOVERNANCE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "feat19-title",
                type: "heading",
                level: 2,
                text: "Global enforcement exposure & affirmative defense protocols",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "feat19-subtitle",
                type: "text",
                text: "Comparative benchmark of corporate statutory exposure across US and European regulatory agencies with our pre-trial mitigation protocols.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Structured Exposure Matrix Rows */
          {
            id: "feat19-rows-stack",
            type: "stack",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "md",
            style: { sizing: { width: "full" } },
            children: [
              /* Row 1: FCPA */
              {
                id: "feat19-r1",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat19-r1-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      {
                        id: "feat19-r1-reg",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r1-agency",
                            type: "text",
                            text: "DOJ & SEC ENFORCEMENT",
                            style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "feat19-r1-name",
                            type: "heading",
                            level: 3,
                            text: "Foreign Corrupt Practices Act (FCPA)",
                            style: { typography: { size: "base", weight: "bold" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r1-trigger",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r1-t-label",
                            type: "text",
                            text: "AUDIT TRIGGER",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r1-t-val",
                            type: "text",
                            text: "Third-party intermediary fees, foreign state enterprise contracts, overseas customs facilitation.",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r1-stat",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r1-s-label",
                            type: "text",
                            text: "STATUTORY EXPOSURE",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r1-s-val",
                            type: "text",
                            text: "Up to $25M per criminal violation + disgorgement of gross profits and independent monitor.",
                            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r1-remedy",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r1-m-label",
                            type: "text",
                            text: "AFFIRMATIVE DEFENSE",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r1-m-val",
                            type: "text",
                            text: "Pre-acquisition anti-corruption diligence, transactional accounting controls, voluntary self-disclosure.",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Row 2: OFAC */
              {
                id: "feat19-r2",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat19-r2-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      {
                        id: "feat19-r2-reg",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r2-agency",
                            type: "text",
                            text: "US TREASURY OFAC & BIS",
                            style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "feat19-r2-name",
                            type: "heading",
                            level: 3,
                            text: "Economic Sanctions & Export Controls",
                            style: { typography: { size: "base", weight: "bold" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r2-trigger",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r2-t-label",
                            type: "text",
                            text: "AUDIT TRIGGER",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r2-t-val",
                            type: "text",
                            text: "Dual-use technology re-exports, transshipment through intermediary hubs, SDN screening gaps.",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r2-stat",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r2-s-label",
                            type: "text",
                            text: "STATUTORY EXPOSURE",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r2-s-val",
                            type: "text",
                            text: "Strict liability fines exceeding $350k per transaction or 2x transaction value + export denial orders.",
                            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r2-remedy",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r2-m-label",
                            type: "text",
                            text: "AFFIRMATIVE DEFENSE",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r2-m-val",
                            type: "text",
                            text: "End-user verification certificates, automated screening firewall integration, OFAC voluntary disclosure filings.",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Row 3: GDPR & EU AI Act */
              {
                id: "feat19-r3",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "feat19-r3-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      {
                        id: "feat19-r3-reg",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r3-agency",
                            type: "text",
                            text: "EUROPEAN DATA PROTECTION BOARD",
                            style: { typography: { family: "monospace", size: "sm", weight: "bold" }, color: { text: "primary" } },
                          },
                          {
                            id: "feat19-r3-name",
                            type: "heading",
                            level: 3,
                            text: "EU GDPR & High-Risk AI Act",
                            style: { typography: { size: "base", weight: "bold" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r3-trigger",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r3-t-label",
                            type: "text",
                            text: "AUDIT TRIGGER",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r3-t-val",
                            type: "text",
                            text: "Cross-border personal data transfers, biometric profiling models, consumer consent tracking lapses.",
                            style: { typography: { size: "sm" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r3-stat",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r3-s-label",
                            type: "text",
                            text: "STATUTORY EXPOSURE",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r3-s-val",
                            type: "text",
                            text: "Up to €35M or 7% of total worldwide annual turnover, whichever is higher, plus model bans.",
                            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                          },
                        ],
                      },
                      {
                        id: "feat19-r3-remedy",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                        children: [
                          {
                            id: "feat19-r3-m-label",
                            type: "text",
                            text: "AFFIRMATIVE DEFENSE",
                            style: { typography: { family: "monospace", size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "feat19-r3-m-val",
                            type: "text",
                            text: "Algorithmic risk impact assessments, Standard Contractual Clauses (SCCs), technical DPIA audits.",
                            style: { typography: { size: "sm" } },
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
 * FEATURE-20: Harbor Grand · Private Sovereign Summits & Ballroom Specs
 * Industry: Hotels & Luxury Hospitality
 * Layout: Asymmetrical split: venue monograph & photo card + capacity & security spec sheet
 * Visual Family: Grand Metropolitan Luxury Hotel
 */
export const FEATURE_HOTEL_EVENT_SPACES_SPLIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "feature-20-hotel-event-spaces-split",
  name: "Harbor Grand · Private Sovereign Summits & Ballroom Specs",
  kind: "section",
  root: {
    id: "feat20-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "feat20-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "2xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "feat20-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "2xl" },
            },
            children: [
              /* Left Column: Venue Monograph (7 cols) */
              {
                id: "feat20-left-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                children: [
                  {
                    id: "feat20-badge",
                    type: "badge",
                    text: "SOVEREIGN SUMMITS & GALAS",
                    style: {
                      color: { background: "surface-muted", text: "primary" },
                      border: { radius: "full" },
                      sizing: { width: "fit" },
                      spacing: { paddingX: "md", paddingY: "xs" },
                    },
                  },
                  {
                    id: "feat20-title",
                    type: "heading",
                    level: 2,
                    text: "The Grand Venetian Ballroom & Diplomatic Assembly",
                    style: {
                      typography: { size: "4xl", weight: "bold", tracking: "tight" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat20-desc",
                    type: "text",
                    text: "Engineered to host heads of state summits, bilateral treaty signings, and high-society philanthropic galas with absolute diplomatic discretion and fortified motorcade access.",
                    style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "feat20-checklist",
                    type: "list",
                    marker: "check",
                    items: [
                      "Direct subterranean armored motorcade tunnel entrance",
                      "Certified SCIF secure communication vault for diplomatic delegations",
                      "Acoustic isolation dampeners rated to STC 65 soundproofing standard",
                      "Dedicated private banquet kitchen staffed by 2 Michelin-starred culinary brigade",
                    ],
                    style: {
                      typography: { size: "sm", weight: "medium" },
                      color: { text: "text" },
                    },
                  },
                  {
                    id: "feat20-btn",
                    type: "button",
                    label: "Inquire Sovereign Summit Date",
                    iconId: "calendar-days",
                    iconPosition: "end",
                    href: "/events/venetian-ballroom",
                    style: {
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "md" },
                      typography: { weight: "semibold" },
                      spacing: { paddingX: "xl", paddingY: "md" },
                    },
                  },
                ],
              },

              /* Right Column: Capacity & Security Spec Card (5 cols) */
              {
                id: "feat20-right-col",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "center",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  {
                    id: "feat20-spec-card",
                    type: "card",
                    element: "article",
                    style: {
                      background: [
                        { kind: "solid", color: { kind: "custom", value: "#0B1528" } },
                      ],
                      border: { radius: "xl", width: "thin", color: "border", shadow: "xl" },
                      spacing: { padding: "xl" },
                    },
                    children: [
                      {
                        id: "feat20-sc-badge",
                        type: "badge",
                        text: "TECHNICAL SPECIFICATIONS",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "sm" },
                          typography: { family: "monospace", size: "sm" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "feat20-sc-title",
                        type: "heading",
                        level: 3,
                        text: "Venue Dimensions & Floor Layout",
                        style: {
                          typography: { size: "xl", weight: "bold" },
                          textPaint: { kind: "custom", value: "#F8FAFC" },
                          spacing: { marginTop: "md", marginBottom: "md" },
                        },
                      },
                      {
                        id: "feat20-spec-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "stretch",
                        distribution: "start",
                        wrap: false,
                        gap: "md",
                        children: [
                          {
                            id: "feat20-spec-1",
                            type: "stat",
                            value: "9,600 sq ft",
                            label: "Column-free grand hall with 24ft ceiling clearance",
                            style: { typography: { size: "xl", weight: "bold" }, textPaint: { kind: "custom", value: "#38BDF8" } },
                          },
                          {
                            id: "feat20-spec-2",
                            type: "stat",
                            value: "650 Guests",
                            label: "Seated gala dinner capacity with royal head table",
                            style: { typography: { size: "xl", weight: "bold" }, textPaint: { kind: "custom", value: "#4ADE80" } },
                          },
                          {
                            id: "feat20-spec-3",
                            type: "stat",
                            value: "1,200 Delegates",
                            label: "Theater plenary assembly configuration with simultaneous interpretation booths",
                            style: { typography: { size: "xl", weight: "bold" }, textPaint: { kind: "custom", value: "#FCD34D" } },
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

export const CURATED_FEATURE_BATCH_4: readonly ComponentDocument[] = [
  FEATURE_HOTEL_PROPERTY_STAT_TRIO_DOCUMENT,
  FEATURE_LEGAL_PRACTICE_TABS_DOCUMENT,
  FEATURE_HOTEL_SEASONAL_OFFER_CARDS_DOCUMENT,
  FEATURE_LEGAL_RISK_ASSESSMENT_TABLE_DOCUMENT,
  FEATURE_HOTEL_EVENT_SPACES_SPLIT_DOCUMENT,
];
