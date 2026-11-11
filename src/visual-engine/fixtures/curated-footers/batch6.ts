import type { ComponentDocument } from "../../model";

/**
 * BATCH 6 CURATED FOOTER TEMPLATES
 *
 * #26: Compact Floating Micro-Dock Capsule (footer-26-micro-dock-floating-capsule)
 * #27: Global Maritime Trade Multilingual Footer (footer-27-global-trade-multilingual)
 * #28: Private Member Club Lounge & Guild Registry (footer-28-private-member-club-registry)
 * #29: Cybersecurity Incident & Status War Room Footer (footer-29-cybersecurity-incident-war-room)
 * #30: Open Source Foundation & Sponsors Matrix (footer-30-opensource-foundation-sponsors)
 */

export const FOOTER_26_MICRO_DOCK_FLOATING_CAPSULE: ComponentDocument = {
  version: 2,
  id: "footer-26-micro-dock-floating-capsule",
  name: "Compact Floating Micro-Dock Capsule",
  kind: "footer",
  root: {
    id: "foot26-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot26-capsule-island",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingX: "xl", paddingY: "md" },
          border: { width: "thin", color: "border" },
        },
        children: [
          // Monogram & Availability Status
          {
            id: "foot26-status-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "foot26-site-logo",
                type: "site-logo",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot26-badge-available",
                type: "badge",
                text: "● OPEN FOR COMMISSIONS Q4 2026",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
            ],
          },

          // Center: Quick Nav Links
          {
            id: "foot26-links-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "lg",
            children: [
              { openInNewTab: false, id: "foot26-link-1", type: "link", label: "Selected Works", href: "/works", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot26-link-2", type: "link", label: "Design Manifesto", href: "/manifesto", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot26-link-3", type: "link", label: "Experimental Lab", href: "/lab", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot26-link-4", type: "link", label: "Colophon", href: "/colophon", style: { typography: { size: "sm" } } },
            ],
          },

          // Right: Social Links & Action Button
          {
            id: "foot26-actions-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              { openInNewTab: false, id: "foot26-link-x", type: "link", label: "X / Twitter", href: "https://x.com", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot26-link-gh", type: "link", label: "GitHub", href: "https://github.com", style: { typography: { size: "sm" } } },
              {
                id: "foot26-btn-book",
                type: "button",
                label: "Book 1:1 Call",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_27_GLOBAL_TRADE_MULTILINGUAL: ComponentDocument = {
  version: 2,
  id: "footer-27-global-trade-multilingual",
  name: "Global Maritime Trade Multilingual Footer",
  kind: "footer",
  root: {
    id: "foot27-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: Live Port Congestion Strip
      {
        id: "foot27-port-status-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingY: "sm", marginY: "none" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot27-port-left",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot27-badge-rotterdam",
                type: "badge",
                text: "● PORT OF ROTTERDAM: FLOW NORMAL",
                style: { typography: { size: "sm", weight: "semibold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot27-badge-singapore",
                type: "badge",
                text: "▲ SINGAPORE TUAS: CONGESTION LVL 2 (14H DELAY)",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text-muted" } },
              },
              {
                id: "foot27-badge-shanghai",
                type: "badge",
                text: "● SHANGHAI YANGSHAN: BERTH CLEAR",
                style: { typography: { size: "sm", weight: "semibold" }, color: { background: "surface", text: "primary" } },
              },
            ],
          },
          {
            id: "foot27-port-lang",
            type: "language-switcher",
            style: { typography: { size: "sm" } },
          },
        ],
      },

      // Middle: Bilateral Dual-Language Shipping Grid
      {
        id: "foot27-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { marginY: "xl" } },
        children: [
          // Col 1: Bilateral Dual-Crest Brand
          {
            id: "foot27-col-brand",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot27-site-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot27-text-bilingual",
                type: "text",
                text: "远洋航运与多式联运联盟 · GLOBAL INTERMODAL MARITIME ALLIANCE · IMO LICENSED CARRIER #984210",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } },
              },
              {
                id: "foot27-brand-desc",
                type: "text",
                text: "Operating 620 container vessels across transpacific, transatlantic, and maritime silk road freight corridors.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Col 2: Container Fleet & Liner Routes
          {
            id: "foot27-col-fleet",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot27-head-fleet",
                type: "text",
                text: "LINER SERVICES (航线班轮)",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot27-link-f1", type: "link", label: "Transpacific Express (TPX-1)", href: "/routes/tpx", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-f2", type: "link", label: "Asia-North Europe (AEX-4)", href: "/routes/aex", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-f3", type: "link", label: "Reefer Cold Chain Cargo", href: "/cargo/reefer", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-f4", type: "link", label: "Breakbulk & Project Heavy Lift", href: "/cargo/breakbulk", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 3: Customs & Incoterms Compliance
          {
            id: "foot27-col-compliance",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                desktop: { column: 8, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot27-head-comp",
                type: "text",
                text: "TRADE COMPLIANCE",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot27-link-c1", type: "link", label: "Incoterms 2020 Rules", href: "/incoterms", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-c2", type: "link", label: "Customs Clearance EDI", href: "/customs", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-c3", type: "link", label: "FMC Tariff Filings", href: "/tariffs", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-c4", type: "link", label: "B/L Terms & Conditions", href: "/bill-of-lading", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 4: Container Live Tracking Input
          {
            id: "foot27-col-track",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot27-head-track",
                type: "text",
                text: "CONTAINER TRACKING",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { label: "Container / B/L # (e.g. OMAU-82910)", href: "/contact", openInNewTab: false,
                id: "foot27-input-bkg",
                type: "link",
                style: { typography: { size: "sm" } },
              },
              {
                id: "foot27-btn-track",
                type: "button",
                label: "Track Container",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Bottom Bar: Maritime Law Disclosures
      {
        id: "foot27-bottom-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "sm",
        style: {
          spacing: { paddingY: "md" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot27-legal-text",
            type: "text",
            text: "© 2026 Oceanic Maritime Alliance. Carriage is governed by Hague-Visby Rules & Hamburg Protocol.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
          {
            id: "foot27-bottom-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot27-link-s1", type: "link", label: "SOLAS VGM Guidelines", href: "/vgm", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-s2", type: "link", label: "IMO 2020 Low Sulphur", href: "/imo2020", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot27-link-s3", type: "link", label: "Carrier Liability", href: "/liability", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_28_PRIVATE_MEMBER_CLUB_REGISTRY: ComponentDocument = {
  version: 2,
  id: "footer-28-private-member-club-registry",
  name: "Private Member Club Lounge & Guild Registry",
  kind: "footer",
  root: {
    id: "foot28-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: Dual Timezone Clocks & Club Monogram
      {
        id: "foot28-top-clocks",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingY: "sm", marginY: "none" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot28-top-charter",
            type: "text",
            text: "THE TRAVELLERS & GUILD CLUB · FOUNDED 1882 · ROYAL CHARTER INCORPORATED",
            style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
          },
          {
            id: "foot28-top-timezones",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot28-clock-london",
                type: "badge",
                text: "LONDON (PALL MALL): 22:45 GMT",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
              {
                id: "foot28-clock-geneva",
                type: "badge",
                text: "GENEVA (QUAI DU MONT-BLANC): 23:45 CET",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
            ],
          },
        ],
      },

      // Middle: Club Registry Columns
      {
        id: "foot28-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { marginY: "xl" } },
        children: [
          // Col 1: Crest & Decorum
          {
            id: "foot28-col-decorum",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot28-site-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot28-badge-dresscode",
                type: "badge",
                text: "FORMAL DRESS CODE STRICTLY OBSERVED AT ALL HOURS",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot28-decorum-text",
                type: "text",
                text: "Mobile telephony, photography, and commercial solicitation are prohibited in the library, smoking room, and dining salon.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Col 2: Reciprocal Affiliated Clubs
          {
            id: "foot28-col-reciprocal",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot28-head-recip",
                type: "text",
                text: "RECIPROCAL CLUBS",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot28-link-r1", type: "link", label: "The Tokyo Club (Marunouchi)", href: "/reciprocal/tokyo", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-r2", type: "link", label: "Automobile Club de France (Paris)", href: "/reciprocal/paris", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-r3", type: "link", label: "Hong Kong Club (Central)", href: "/reciprocal/hk", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-r4", type: "link", label: "Union Club of New York", href: "/reciprocal/ny", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 3: Guild Chambers
          {
            id: "foot28-col-chambers",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                desktop: { column: 8, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot28-head-cham",
                type: "text",
                text: "CHAMBERS & WINE",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot28-link-c1", type: "link", label: "Private Dining Salon", href: "/dining", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-c2", type: "link", label: "Sommelier Reserve Cellar", href: "/cellar", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-c3", type: "link", label: "Bedrooms & Suites", href: "/suites", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-c4", type: "link", label: "The Library Archives", href: "/library", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 4: Candidate Membership Card
          {
            id: "foot28-col-cand",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot28-head-cand",
                type: "text",
                text: "CANDIDATE PROSPECTUS",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot28-cand-desc",
                type: "text",
                text: "Membership is exclusively by proposal from two sitting life members.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "foot28-btn-inquiry",
                type: "button",
                label: "Request Club Secretary Contact",
                style: { typography: { size: "sm", weight: "medium" } },
              },
            ],
          },
        ],
      },

      // Bottom Bar: By-Laws & Seal
      {
        id: "foot28-bottom-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "sm",
        style: {
          spacing: { paddingY: "md" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot28-legal-text",
            type: "text",
            text: "© 2026 The Travellers & Guild Club. Incorporate by Royal Charter. All rights reserved.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
          {
            id: "foot28-bottom-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot28-link-b1", type: "link", label: "Club By-Laws", href: "/bylaws", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-b2", type: "link", label: "Member Extranet", href: "/extranet", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot28-link-b3", type: "link", label: "Reciprocal Letter of Introduction", href: "/intro", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_29_CYBERSECURITY_INCIDENT_WAR_ROOM: ComponentDocument = {
  version: 2,
  id: "footer-29-cybersecurity-incident-war-room",
  name: "Cybersecurity Incident & Status War Room Footer",
  kind: "footer",
  root: {
    id: "foot29-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: War Room Emergency Hotline & Threat Level
      {
        id: "foot29-emergency-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingY: "sm", marginY: "none" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot29-threat-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "foot29-badge-threat",
                type: "badge",
                text: "● DEFCON 3: THREAT LEVEL ELEVATED",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot29-badge-soc",
                type: "badge",
                text: "SOC WAR ROOM: 24/7 ACTIVE SURVEILLANCE",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
            ],
          },
          {
            id: "foot29-badge-hotline",
            type: "badge",
            text: "🚨 EMERGENCY RANSOMWARE BREACH DESK: +1 (888) 911-CYBER",
            style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
          },
        ],
      },

      // Middle: PGP Key Fingerprint & CVE Disclosures
      {
        id: "foot29-mid-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: { spacing: { marginY: "md" } },
        children: [
          {
            id: "foot29-pgp-block",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            children: [
              {
                id: "foot29-pgp-label",
                type: "text",
                text: "INCIDENT RESPONSE PGP PUBLIC KEY FINGERPRINT (RFC 4880)",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
              },
              {
                id: "foot29-pgp-val",
                type: "text",
                text: "4A8F B302 91C0 DE71 5289  9F10 3B78 6A04 E210 88BC",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
              },
            ],
          },
          {
            id: "foot29-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot29-btn-pgp",
                type: "button",
                label: "Download Public Key",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "foot29-btn-report",
                type: "button",
                label: "Submit Encrypted Vulnerability (CVE)",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Bottom Bar: Infosec Priority Links & Compliance
      {
        id: "foot29-bottom-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "sm",
        style: {
          spacing: { paddingY: "sm" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot29-links-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot29-link-1", type: "link", label: "CISA Advisory Bulletins", href: "/advisories", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot29-link-2", type: "link", label: "SOC2 Type II Report", href: "/soc2", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot29-link-3", type: "link", label: "ISO-27001 Certificate", href: "/iso", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot29-link-4", type: "link", label: "Bug Bounty Program ($250k)", href: "/bounty", style: { typography: { size: "sm" } } },
            ],
          },
          {
            id: "foot29-legal-text",
            type: "text",
            text: "© 2026 CyberDefense Command LLC. Real-time telemetry encrypted in transit & at rest.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_30_OPENSOURCE_FOUNDATION_SPONSORS: ComponentDocument = {
  version: 2,
  id: "footer-30-opensource-foundation-sponsors",
  name: "Open Source Foundation & Sponsors Matrix",
  kind: "footer",
  root: {
    id: "foot30-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: Sponsor Tiers Matrix (Platinum, Gold, Silver)
      {
        id: "foot30-sponsors-section",
        type: "flex",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xs",
        style: {
          spacing: { paddingY: "sm", marginY: "none" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot30-sponsors-head",
            type: "text",
            text: "SUPPORTED BY OUR GLOBAL SPONSOR ECOSYSTEM",
            style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
          },
          // Platinum Badges
          {
            id: "foot30-sponsors-platinum",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot30-badge-plat-title",
                type: "badge",
                text: "PLATINUM SPONSORS:",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              { id: "foot30-badge-p1", type: "badge", text: "Google Cloud", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
              { id: "foot30-badge-p2", type: "badge", text: "Red Hat", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
              { id: "foot30-badge-p3", type: "badge", text: "Microsoft", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
              { id: "foot30-badge-p4", type: "badge", text: "Linux Foundation", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
            ],
          },
          // Gold Badges
          {
            id: "foot30-sponsors-gold",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot30-badge-gold-title",
                type: "badge",
                text: "GOLD SPONSORS:",
                style: { typography: { size: "sm", weight: "semibold" }, color: { background: "surface", text: "text-muted" } },
              },
              { id: "foot30-badge-g1", type: "badge", text: "Amazon AWS", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
              { id: "foot30-badge-g2", type: "badge", text: "Intel", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
              { id: "foot30-badge-g3", type: "badge", text: "Mozilla", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
              { id: "foot30-badge-g4", type: "badge", text: "Cloudflare", style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },

      // Middle: Foundation Governance & RFC Grid
      {
        id: "foot30-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { marginY: "xl" } },
        children: [
          // Col 1: Foundation Mission
          {
            id: "foot30-col-about",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot30-site-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot30-foundation-legal",
                type: "badge",
                text: "501(c)(3) NON-PROFIT OPEN PROTOCOLS ALLIANCE",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot30-foundation-desc",
                type: "text",
                text: "Stewarding neutral, vendor-independent standards for the open web, distributed computing, and decentralized infrastructure.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Col 2: Governance & RFCs
          {
            id: "foot30-col-governance",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot30-head-gov",
                type: "text",
                text: "GOVERNANCE",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot30-link-g1", type: "link", label: "Technical Steering Committee", href: "/tsc", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-g2", type: "link", label: "Active RFC Proposals", href: "/rfcs", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-g3", type: "link", label: "Contributor License (CLA)", href: "/cla", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-g4", type: "link", label: "Foundation By-Laws", href: "/bylaws", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 3: Community & Releases
          {
            id: "foot30-col-community",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                desktop: { column: 8, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot30-head-com",
                type: "text",
                text: "COMMUNITY",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot30-link-m1", type: "link", label: "Developer Discord", href: "/discord", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-m2", type: "link", label: "Weekly Meeting Notes", href: "/notes", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-m3", type: "link", label: "Code of Conduct", href: "/conduct", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-m4", type: "link", label: "Security Disclosure", href: "/security", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 4: Sponsor CTA & Feed
          {
            id: "foot30-col-sponsorship",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 4, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot30-head-join",
                type: "text",
                text: "BECOME A SPONSOR",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot30-join-desc",
                type: "text",
                text: "Help fund critical infrastructure maintenance, security audits, and developer fellowships.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "foot30-btn-sponsor",
                type: "button",
                label: "Apply for Foundation Tier",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Bottom Bar: Licenses & Disclaimers
      {
        id: "foot30-bottom-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "sm",
        style: {
          spacing: { paddingY: "md" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot30-legal-text",
            type: "text",
            text: "© 2026 Open Web Protocols Foundation. All code is released under the Apache 2.0 and MIT Licenses.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
          {
            id: "foot30-bottom-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot30-link-l1", type: "link", label: "Apache 2.0 License", href: "/license", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-l2", type: "link", label: "Trademark Guidelines", href: "/trademarks", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot30-link-l3", type: "link", label: "IRS Form 990", href: "/financials", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const BATCH_6_FOOTERS: ComponentDocument[] = [
  FOOTER_26_MICRO_DOCK_FLOATING_CAPSULE,
  FOOTER_27_GLOBAL_TRADE_MULTILINGUAL,
  FOOTER_28_PRIVATE_MEMBER_CLUB_REGISTRY,
  FOOTER_29_CYBERSECURITY_INCIDENT_WAR_ROOM,
  FOOTER_30_OPENSOURCE_FOUNDATION_SPONSORS,
];

export const CURATED_FOOTER_BATCH_6 = BATCH_6_FOOTERS;

