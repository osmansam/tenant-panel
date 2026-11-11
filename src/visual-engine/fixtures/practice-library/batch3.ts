import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 3: Areas Served & Regional Jurisdictions (#11–#15)
 * Coastal Turkish Legal Chambers & Hospitality (Muğla & Antalya Riviera)
 * Aesthetic: Warm cream/linen surfaces, deep navy serif typography,
 * Aegean teal accents, structured municipal registry cards, customs protocols.
 * ============================================================================
 */

/**
 * PRACTICE-11: Regional Jurisdiction · 8-District Coastal Communities Directory
 * Layout: 8-District Grid (4 cols desktop, 2 cols tablet, 1 col mobile)
 * Visual Family: Editorial Legal Chambers Directory
 */
export const PRACTICE_11_COASTAL_RESORTS_GRID_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-11-coastal-resorts-grid",
  name: "Regional Jurisdiction · 8-District Coastal Communities Directory",
  kind: "section",
  root: {
    id: "prac11-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac11-container",
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
            id: "prac11-header",
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
                id: "prac11-badge",
                type: "badge",
                text: "REGIONAL JURISDICTIONS SERVED",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac11-title",
                type: "heading",
                level: 2,
                text: "Coastal Resorts & Municipal Coverage",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac11-subtitle",
                type: "text",
                text: "Full court representation and real estate due diligence across Muğla and Antalya coastal districts, with regular attendance at local Land Registry Offices and District Courthouses.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 8-District Grid */
          {
            id: "prac11-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "md" },
            },
            children: [
              /* 1. Fethiye */
              {
                id: "prac11-d1-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d1-title",
                        type: "heading",
                        level: 4,
                        text: "Fethiye District",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d1-locs",
                        type: "text",
                        text: "Çalış Beach, Ovacık, Hisarönü, Kayaköy, Faralya",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d1-court",
                        type: "text",
                        text: "Fethiye Adliyesi & Tapu Müdürlüğü",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 2. Göcek */
              {
                id: "prac11-d2-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d2-title",
                        type: "heading",
                        level: 4,
                        text: "Göcek Bay & Marinas",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d2-locs",
                        type: "text",
                        text: "D-Marin Göcek, Skopea Bay, Port Göcek, İnlice",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d2-court",
                        type: "text",
                        text: "Göcek Harbour Master & Fethiye Tapu",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 3. Marmaris */
              {
                id: "prac11-d3-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d3-title",
                        type: "heading",
                        level: 4,
                        text: "Marmaris Gulf",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d3-locs",
                        type: "text",
                        text: "Netsel Marina, İçmeler, Turunç, Bozburun, Selimiye",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d3-court",
                        type: "text",
                        text: "Marmaris Adliyesi & Tapu Dairesi",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 4. Bodrum */
              {
                id: "prac11-d4-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d4-title",
                        type: "heading",
                        level: 4,
                        text: "Bodrum Peninsula",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d4-locs",
                        type: "text",
                        text: "Yalıkavak, Türkbükü, Gümüşlük, Turgutreis, Bitez",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d4-court",
                        type: "text",
                        text: "Bodrum Adliyesi & Bitez Tapu",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 5. Kaş & Kalkan */
              {
                id: "prac11-d5-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d5-title",
                        type: "heading",
                        level: 4,
                        text: "Kalkan & Kaş Riviera",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d5-locs",
                        type: "text",
                        text: "Kalamar Bay, Kızıltaş, İslamlar, Çukurbağ Yarımadası",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d5-court",
                        type: "text",
                        text: "Kaş Adliyesi & Kaş Tapu Müdürlüğü",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 6. Datça */
              {
                id: "prac11-d6-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d6-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d6-title",
                        type: "heading",
                        level: 4,
                        text: "Datça Peninsula",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d6-locs",
                        type: "text",
                        text: "Old Datça (Eski Datça), Palamutbükü, Mesudiye",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d6-court",
                        type: "text",
                        text: "Datça Adliyesi & Datça Tapu",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 7. Köyceğiz & Dalyan */
              {
                id: "prac11-d7-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d7-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d7-title",
                        type: "heading",
                        level: 4,
                        text: "Dalyan & Köyceğiz",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d7-locs",
                        type: "text",
                        text: "Dalyan Delta, Iztuzu Protected Belt, Köyceğiz Lake",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d7-court",
                        type: "text",
                        text: "Ortaca Adliyesi & Köyceğiz Tapu",
                        style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 8. Dalaman */
              {
                id: "prac11-d8-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac11-d8-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac11-d8-title",
                        type: "heading",
                        level: 4,
                        text: "Dalaman & Sarıgerme",
                        style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac11-d8-locs",
                        type: "text",
                        text: "Dalaman International Airport, Sarıgerme Resort Belt",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac11-d8-court",
                        type: "text",
                        text: "Ortaca Adliyesi & Dalaman Tapu",
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
 * PRACTICE-12: Judicial Venues · Courthouse & Tapu Land Registry Venues
 * Layout: Split 60/40 Matrix (Venues list left, Authority Card right)
 * Visual Family: Official Court Registry
 */
export const PRACTICE_12_COURT_LAND_REGISTRY_MAP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-12-court-land-registry-map",
  name: "Judicial Venues · Courthouse & Tapu Land Registry Venues",
  kind: "section",
  root: {
    id: "prac12-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac12-container",
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
            id: "prac12-header",
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
                id: "prac12-badge",
                type: "badge",
                text: "JUDICIAL & ADMINISTRATIVE VENUES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac12-title",
                type: "heading",
                level: 2,
                text: "Courthouses, Land Registry & Cadastre Venues",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac12-subtitle",
                type: "text",
                text: "Official registry of courts of first instance, enforcement directorates, and cadastral authorities where our advocates maintain active caseloads.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 60/40 Split Grid */
          {
            id: "prac12-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "xl" },
            },
            children: [
              /* Left Column: Venues Roster (7 cols) */
              {
                id: "prac12-venues-card",
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
                    id: "prac12-v-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      {
                        id: "prac12-v-heading",
                        type: "heading",
                        level: 3,
                        text: "Active Court & Land Registry Roll",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },

                      /* Venue Item 1 */
                      {
                        id: "prac12-v1-item",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac12-v1-name",
                            type: "text",
                            text: "Fethiye Adalet Sarayı (Courthouse of Fethiye)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac12-v1-sub",
                            type: "text",
                            text: "Civil Courts of First Instance (Asliye Hukuk) · Cadastre Court (Kadastro Mahkemesi) · Enforcement Directorate (İcra Dairesi) · Cumhuriyet Başsavcılığı",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Venue Item 2 */
                      {
                        id: "prac12-v2-item",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac12-v2-name",
                            type: "text",
                            text: "Fethiye & Seydikemer Tapu ve Kadastro Müdürlüğü",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac12-v2-sub",
                            type: "text",
                            text: "Official TAKBİS Registry Archive · Official Conveyancing & Deed Signing Rooms · Cadastral Boundary Rectification Department",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },

                      /* Venue Item 3 */
                      {
                        id: "prac12-v3-item",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac12-v3-name",
                            type: "text",
                            text: "Marmaris & Ortaca Adalet Sarayları",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac12-v3-sub",
                            type: "text",
                            text: "Jurisdiction over Göcek, Köyceğiz, Ortaca, and Marmaris resort litigation and hotel tenancy contract disputes.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right Column: Venue Authority & Procedure Card (5 cols) */
              {
                id: "prac12-auth-card",
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
                    id: "prac12-auth-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "lg",
                    children: [
                      {
                        id: "prac12-auth-badge",
                        type: "badge",
                        text: "VENUE PROTOCOL",
                        style: {
                          color: { background: "surface", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "md", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac12-auth-heading",
                        type: "heading",
                        level: 3,
                        text: "Statutory Audience Rights",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac12-auth-desc",
                        type: "text",
                        text: "Under Turkish Code of Civil Procedure (HMK), foreign nationals require registered advocate power of attorney (Vekâletname) for all contentious court filings, registry audits, and deed transfers.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac12-auth-btn",
                        type: "button",
                        label: "Request Court Representation",
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
 * PRACTICE-13: Maritime Jurisdictions · Yacht Marina & Harbour Master Points
 * Layout: 3-Column Marina Rail (Göcek, Marmaris, Bodrum)
 * Visual Family: Aegean Nautical Legal Directory
 */
export const PRACTICE_13_MARINA_PORT_TERRITORY_MATRIX_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-13-marina-port-territory-matrix",
  name: "Maritime Jurisdictions · Yacht Marina & Harbour Master Points",
  kind: "section",
  root: {
    id: "prac13-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac13-container",
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
            id: "prac13-header",
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
                id: "prac13-badge",
                type: "badge",
                text: "MARITIME HUBS & HARBOUR OFFICES",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac13-title",
                type: "heading",
                level: 2,
                text: "Southwest Coast Marinas & Port Authorities",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac13-subtitle",
                type: "text",
                text: "Immediate on-site legal liaison for international superyacht owners, charter brokers, and marine insurers across key Turkish Riviera marinas.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* 3-Column Marina Grid */
          {
            id: "prac13-grid",
            type: "grid",
            columns: 12,
            style: {
              sizing: { width: "full" },
              spacing: { gap: "lg" },
            },
            children: [
              /* 1. Göcek Basin */
              {
                id: "prac13-m1-card",
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
                    id: "prac13-m1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac13-m1-badge",
                        type: "badge",
                        text: "GÖCEK & FETHIYE BASIN",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac13-m1-name",
                        type: "heading",
                        level: 3,
                        text: "D-Marin Göcek & Port Göcek",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac13-m1-desc",
                        type: "text",
                        text: "Göcek Liman Başkanlığı (Harbour Master) · Skopea Marina · Ece Saray Fethiye Marina · Yacht Classic Berths.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac13-m1-lead",
                        type: "text",
                        text: "Port Action: Berthing agreement disputes, Blue Card waste records, and Cabotage Law exemptions.",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 2. Marmaris Gulf */
              {
                id: "prac13-m2-card",
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
                    id: "prac13-m2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac13-m2-badge",
                        type: "badge",
                        text: "MARMARIS & GULF OF HISARÖNÜ",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac13-m2-name",
                        type: "heading",
                        level: 3,
                        text: "Netsel Marina & Yacht Marine",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac13-m2-desc",
                        type: "text",
                        text: "Marmaris Liman Başkanlığı · Martı Marina Orhaniye · Bozburun Gulet Shipyards · Datça Limanı.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac13-m2-lead",
                        type: "text",
                        text: "Port Action: Gulet refit contract disputes, shipyard maritime liens, and winter lay-up covenants.",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* 3. Bodrum Peninsula */
              {
                id: "prac13-m3-card",
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
                    id: "prac13-m3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac13-m3-badge",
                        type: "badge",
                        text: "BODRUM & YALIKAVAK PENINSULA",
                        style: {
                          color: { background: "surface-muted", text: "primary" },
                          border: { radius: "full" },
                          spacing: { paddingX: "sm", paddingY: "xs" },
                        },
                      },
                      {
                        id: "prac13-m3-name",
                        type: "heading",
                        level: 3,
                        text: "Yalıkavak Marina & Milta Port",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac13-m3-desc",
                        type: "text",
                        text: "Bodrum Liman Başkanlığı · D-Marin Turgutreis · İskelesi Customs Gate · Güllük Port Authority.",
                        style: { typography: { size: "sm", leading: "relaxed" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac13-m3-lead",
                        type: "text",
                        text: "Port Action: Megayacht customs clearances, Greek island crossing protocols, and crew employment claims.",
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
};

/**
 * PRACTICE-14: Protected Zones · Sit Alanı Natural Heritage Legal Classification
 * Layout: Detailed Classification Table (Statutory protected zones guide)
 * Visual Family: Technical Administrative Law Guide
 */
export const PRACTICE_14_ZONING_SIT_ALANI_GUIDE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-14-zoning-sit-alani-guide",
  name: "Protected Zones · Sit Alanı Natural Heritage Legal Classification",
  kind: "section",
  root: {
    id: "prac14-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac14-container",
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
            id: "prac14-header",
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
                id: "prac14-badge",
                type: "badge",
                text: "CONSTRUCTION & ENVIRONMENTAL LAW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  sizing: { width: "fit" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "prac14-title",
                type: "heading",
                level: 2,
                text: "Protected Zones (Sit Alanı) Due Diligence",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac14-subtitle",
                type: "text",
                text: "Purchasing coastal land or villas requires rigorous verification against Ministry of Environment and Culture protected classifications to avoid demolition orders and building bans.",
                style: {
                  typography: { size: "lg", leading: "relaxed" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          /* Table Deck */
          {
            id: "prac14-table-card",
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
                id: "prac14-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Tier 1 */
                  {
                    id: "prac14-r1",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac14-r1-title",
                        type: "text",
                        text: "1. 1st Degree Natural Protected Zone (1. Derece Doğal Sit)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac14-r1-desc",
                        type: "text",
                        text: "Statutory Status: Absolute construction prohibition. No residential or commercial building permits issued. Any existing unpermitted works subject to demolition under Law No. 2863.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Tier 2 */
                  {
                    id: "prac14-r2",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac14-r2-title",
                        type: "text",
                        text: "2. 2nd & 3rd Degree Sustainable Natural Zones (Sürdürülebilir Koruma)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac14-r2-desc",
                        type: "text",
                        text: "Statutory Status: Conditional low-density zoning permitted subject to Provincial Environment Commission (Tabiat Varlıklarını Koruma Komisyonu) unanimous project approval.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Tier 3 */
                  {
                    id: "prac14-r3",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac14-r3-title",
                        type: "text",
                        text: "3. Coastal Strip Law Compliance (Kıyı Kanunu No. 3621)",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac14-r3-desc",
                        type: "text",
                        text: "Statutory Status: First 50 meters from shoreline is public easement; subsequent 50 meters strictly restricted to public amenities. Private residential fencing prohibited.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },

                  /* Action Button */
                  {
                    id: "prac14-btn",
                    type: "button",
                    label: "Commission Official Cadastral & Sit Alanı Audit",
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
 * PRACTICE-15: Border Gateways · Airport Customs & Immigration Legal Support
 * Layout: Asymmetric Split Gateway Card (Dalaman DLM & Bodrum BJV)
 * Visual Family: Official Border Customs Assistance
 */
export const PRACTICE_15_AIRPORT_CUSTOMS_TRANSIT_DESK_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-15-airport-customs-transit-desk",
  name: "Border Gateways · Airport Customs & Immigration Legal Support",
  kind: "section",
  root: {
    id: "prac15-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac15-card",
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
            id: "prac15-stack",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            style: { typography: { align: "center" } },
            children: [
              /* Badge */
              {
                id: "prac15-badge",
                type: "badge",
                text: "DALAMAN (DLM) & MILAS-BODRUM (BJV) BORDER ASSISTANCE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "full" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },

              /* Heading */
              {
                id: "prac15-heading",
                type: "heading",
                level: 2,
                text: "Airport Customs & Border Police Legal Response",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },

              /* Description */
              {
                id: "prac15-desc",
                type: "text",
                text: "Immediate on-site advocate attendance at airport passport control and customs inspection zones for currency export/import declaration investigations, inadmissible passenger (INAD) hearings, and transit visas.",
                style: {
                  typography: { size: "base", leading: "relaxed" },
                  color: { text: "text-muted" },
                  sizing: { maxWidth: "2xl" },
                },
              },

              /* Currency Notice */
              {
                id: "prac15-notice-card",
                type: "card",
                element: "div",
                style: {
                  color: { background: "surface-muted", text: "text" },
                  border: { width: "hairline", color: "border", radius: "lg" },
                  spacing: { padding: "md" },
                  sizing: { width: "full", maxWidth: "xl" },
                },
                children: [
                  {
                    id: "prac15-notice-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac15-n1",
                        type: "text",
                        text: "Currency Regulation (Decree 32): Cash exceeding 25,000 TRY or €10,000 equivalent must be formally declared upon departure.",
                        style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                      },
                      {
                        id: "prac15-n2",
                        type: "text",
                        text: "Customs Hotline: +90 532 745 11 22 (24/7 Rapid Deployment)",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
                      },
                    ],
                  },
                ],
              },

              /* Action Button */
              {
                id: "prac15-btn",
                type: "button",
                label: "Dispatch Border Advocate to Dalaman or Bodrum Airport",
                href: "tel:+905327451122",
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
};

export const PRACTICE_LIBRARY_BATCH_3 = [
  PRACTICE_11_COASTAL_RESORTS_GRID_DOCUMENT,
  PRACTICE_12_COURT_LAND_REGISTRY_MAP_DOCUMENT,
  PRACTICE_13_MARINA_PORT_TERRITORY_MATRIX_DOCUMENT,
  PRACTICE_14_ZONING_SIT_ALANI_GUIDE_DOCUMENT,
  PRACTICE_15_AIRPORT_CUSTOMS_TRANSIT_DESK_DOCUMENT,
] as const;
