import type { ComponentDocument } from "../../model";

/**
 * BATCH 5 CURATED FOOTER TEMPLATES
 *
 * #21: Automotive Configurator & Dealer Locator (footer-21-automotive-dealer-locator)
 * #22: Corporate Law Firm Attorney Practice Ledger (footer-22-legal-counsel-ledger)
 * #23: Crowdfunding Project Backer Milestone Bar (footer-23-crowdfunding-backer-milestones)
 * #24: Web3 DAO Governance Protocol Rail (footer-24-web3-dao-protocol-rail)
 * #25: Cloud Workspace SaaS Utility Rail (footer-25-cloud-workspace-utility-rail)
 */

export const FOOTER_21_AUTOMOTIVE_DEALER_LOCATOR: ComponentDocument = {
  version: 2,
  id: "footer-21-automotive-dealer-locator",
  name: "Automotive Configurator & Dealer Locator Footer",
  kind: "footer",
  root: {
    id: "foot21-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: Dealer Locator & Test Drive Bar
      {
        id: "foot21-dealer-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingY: "md", marginY: "none" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "foot21-dealer-left",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            children: [
              {
                id: "foot21-dealer-title",
                type: "text",
                text: "READY FOR THE NEXT GENERATION DRIVE?",
                style: { typography: { size: "lg", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot21-dealer-sub",
                type: "text",
                text: "Locate one of 380+ certified experience centers or book a home delivery trial.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "foot21-dealer-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              { label: "Enter ZIP or Postal Code", href: "/contact", openInNewTab: false,
                id: "foot21-input-zip",
                type: "link",
                style: { typography: { size: "sm" } },
              },
              {
                id: "foot21-btn-find",
                type: "button",
                label: "Find Dealer",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "foot21-btn-drive",
                type: "button",
                label: "Book Test Drive",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Middle: 4 Columns (Vehicles, Configurator, Charging & Infra, Corporate & Fleet)
      {
        id: "foot21-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { marginY: "xl" } },
        children: [
          // Col 1: Brand & Safety
          {
            id: "foot21-col-brand",
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
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot21-site-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot21-badge-nhtsa",
                type: "badge",
                text: "★★★★★ NHTSA 5-STAR SAFETY CERTIFIED",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot21-brand-desc",
                type: "text",
                text: "Aura Motors Global Inc. · Nasdaq: AURA · Precision electric performance crafted with zero compromise.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Col 2: Vehicle Lineup
          {
            id: "foot21-col-lineup",
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
                desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot21-lineup-heading",
                type: "text",
                text: "VEHICLES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot21-link-v1", type: "link", label: "Aura GT Sedan (420mi)", href: "/models/gt", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-v2", type: "link", label: "Aura Apex SUV AWD", href: "/models/apex", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-v3", type: "link", label: "Aura HyperSport Coupe", href: "/models/hypersport", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-v4", type: "link", label: "Aura Carrier Commercial", href: "/models/carrier", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 3: Configurator & Charging
          {
            id: "foot21-col-infra",
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
                desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot21-infra-heading",
                type: "text",
                text: "OWNERSHIP & INFRA",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot21-link-c1", type: "link", label: "3D Vehicle Configurator", href: "/build", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-c2", type: "link", label: "Supercharger Network Map", href: "/charging", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-c3", type: "link", label: "Home Charging Wallbox", href: "/home-power", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-c4", type: "link", label: "Warranty & Battery Health", href: "/warranty", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 4: Fleet & App Links
          {
            id: "foot21-col-app",
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
                id: "foot21-app-heading",
                type: "text",
                text: "MOBILE COMPANION",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot21-badge-app-store",
                type: "badge",
                text: " Download on App Store",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
              {
                id: "foot21-badge-google-play",
                type: "badge",
                text: "▶ Get it on Google Play",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
              { openInNewTab: false, id: "foot21-link-fleet", type: "link", label: "Fleet & Government Sales", href: "/fleet", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },

      // Bottom Bar: EPA Disclosures & Legal
      {
        id: "foot21-bottom-bar",
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
            id: "foot21-legal-text",
            type: "text",
            text: "© 2026 Aura Motors Global Inc. All rights reserved. Actual range may vary based on weather, driving conditions, and battery age.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
          {
            id: "foot21-bottom-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot21-link-safety", type: "link", label: "Safety Recalls", href: "/recalls", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-terms", type: "link", label: "Order Agreement", href: "/terms", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot21-link-privacy", type: "link", label: "Consumer Privacy", href: "/privacy", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_22_LEGAL_COUNSEL_LEDGER: ComponentDocument = {
  version: 2,
  id: "footer-22-legal-counsel-ledger",
  name: "Corporate Law Firm Attorney Practice Ledger",
  kind: "footer",
  root: {
    id: "foot22-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: Emergency Injunction & Bar Admissions Strip
      {
        id: "foot22-top-strip",
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
            id: "foot22-top-title",
            type: "text",
            text: "VANDERBILT & HAWTHORNE LLP · COUNSELLORS AT LAW · EST. 1894",
            style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
          },
          {
            id: "foot22-top-hotline",
            type: "badge",
            text: "EMERGENCY 24/7 INJUNCTION DESK: +1 (800) 555-LEGAL",
            style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
          },
        ],
      },

      // Middle: Practice Ledger Columns
      {
        id: "foot22-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { marginY: "xl" } },
        children: [
          // Col 1: Firm Mission & Bar Notices
          {
            id: "foot22-col-about",
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
                id: "foot22-site-name",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot22-firm-desc",
                type: "text",
                text: "Global corporate representation across mergers, cross-border securities, antitrust clearance, and complex intellectual property trials.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "foot22-badge-chambers",
                type: "badge",
                text: "CHAMBERS GLOBAL BAND 1 CORPORATE / M&A 2026",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } },
              },
            ],
          },

          // Col 2: Core Practice Areas
          {
            id: "foot22-col-practices",
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
                id: "foot22-head-practices",
                type: "text",
                text: "PRACTICES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot22-link-p1", type: "link", label: "Mergers & Acquisitions", href: "/practices/ma", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-p2", type: "link", label: "Cross-Border Securities", href: "/practices/securities", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-p3", type: "link", label: "Antitrust & Competition", href: "/practices/antitrust", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-p4", type: "link", label: "Patent Trial & Appellate", href: "/practices/ip", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 3: Global Offices
          {
            id: "foot22-col-offices",
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
                id: "foot22-head-offices",
                type: "text",
                text: "OFFICES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot22-link-o1", type: "link", label: "New York (HQ)", href: "/offices/ny", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-o2", type: "link", label: "London (City)", href: "/offices/london", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-o3", type: "link", label: "Tokyo (Marunouchi)", href: "/offices/tokyo", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-o4", type: "link", label: "Frankfurt (Main)", href: "/offices/frankfurt", style: { typography: { size: "sm" } } },
            ],
          },

          // Col 4: Extranet & Disclosures
          {
            id: "foot22-col-extranet",
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
                id: "foot22-head-clients",
                type: "text",
                text: "CLIENT RESOURCES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot22-link-c1", type: "link", label: "Encrypted Extranet Portal", href: "/portal", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-c2", type: "link", label: "Legal Briefings & Memos", href: "/insights", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-c3", type: "link", label: "Attorney Directory Search", href: "/attorneys", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },

      // Bottom Bar: Attorney Advertising Notice
      {
        id: "foot22-bottom-bar",
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
            id: "foot22-disclaimer",
            type: "text",
            text: "ATTORNEY ADVERTISING: Prior results do not guarantee a similar outcome. Transmitting information via this site does not establish an attorney-client relationship.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
          {
            id: "foot22-bottom-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot22-link-legal", type: "link", label: "Disclaimer", href: "/disclaimer", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-privacy", type: "link", label: "Privacy Policy", href: "/privacy", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot22-link-sra", type: "link", label: "SRA Regulatory Code", href: "/regulatory", style: { typography: { size: "sm" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_23_CROWDFUNDING_BACKER_MILESTONES: ComponentDocument = {
  version: 2,
  id: "footer-23-crowdfunding-backer-milestones",
  name: "Crowdfunding Project Backer Milestone Bar",
  kind: "footer",
  root: {
    id: "foot23-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top: Live Funding Milestones Deck
      {
        id: "foot23-milestone-bar",
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
            id: "foot23-stats-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "foot23-badge-funded",
                type: "badge",
                text: "★ 1,480% FUNDED · $1,842,900 USD",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot23-text-backers",
                type: "text",
                text: "14,290 BACKERS WORLDWIDE · 7 DAYS REMAINING",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot23-badge-stretch",
                type: "badge",
                text: "STRETCH GOAL #4 UNLOCKED: CNC TITANIUM CHASSIS",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
            ],
          },
          {
            id: "foot23-status-pill",
            type: "badge",
            text: "● DVT TOOLING VERIFIED · SHIPPING NOV 2026",
            style: { typography: { size: "sm", weight: "semibold" }, color: { background: "surface", text: "text-muted" } },
          },
        ],
      },

      // Middle: Incentive Signup Bar
      {
        id: "foot23-incentive-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: { spacing: { marginY: "md" } },
        children: [
          {
            id: "foot23-incentive-left",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            children: [
              {
                id: "foot23-site-name",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot23-incentive-sub",
                type: "text",
                text: "Join the VIP backer waitlist for early stretch goal voting & 25% production batch discount.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "foot23-form-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              { label: "backer@community.org", href: "/contact", openInNewTab: false,
                id: "foot23-input-email",
                type: "link",
                style: { typography: { size: "sm" } },
              },
              {
                id: "foot23-btn-join",
                type: "button",
                label: "Claim Perk",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Bottom Bar: Bullet Row Links & Legal
      {
        id: "foot23-bottom-bar",
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
            id: "foot23-links-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot23-link-1", type: "link", label: "Kickstarter Page", href: "/campaign", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot23-link-2", type: "link", label: "BackerKit Pledge Manager", href: "/backerkit", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot23-link-3", type: "link", label: "Production Updates (#18)", href: "/updates", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot23-link-4", type: "link", label: "Open Hardware GitHub", href: "/github", style: { typography: { size: "sm" } } },
            ],
          },
          {
            id: "foot23-legal-text",
            type: "text",
            text: "© 2026 Lumen Core Open Hardware. Backer pledges are subject to crowdfunding terms.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_24_WEB3_DAO_PROTOCOL_RAIL: ComponentDocument = {
  version: 2,
  id: "footer-24-web3-dao-protocol-rail",
  name: "Web3 DAO Governance Protocol Rail",
  kind: "footer",
  root: {
    id: "foot24-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Rail: Multisig & Audit Badges
      {
        id: "foot24-top-bar",
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
            id: "foot24-protocol-brand",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "foot24-site-name",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot24-badge-dao",
                type: "badge",
                text: "DECENTRALIZED GOVERNANCE PROTOCOL",
                style: { typography: { size: "sm", weight: "semibold" }, color: { background: "surface", text: "primary" } },
              },
            ],
          },
          {
            id: "foot24-badges-right",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot24-badge-treasury",
                type: "badge",
                text: "TREASURY: $48.2M (4/7 MULTISIG)",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } },
              },
              {
                id: "foot24-badge-audit",
                type: "badge",
                text: "AUDITED: TRAIL OF BITS & CERTIK",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
            ],
          },
        ],
      },

      // Middle: Governance Links & Contract Address
      {
        id: "foot24-mid-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: { spacing: { marginY: "md" } },
        children: [
          {
            id: "foot24-contract-box",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            children: [
              {
                id: "foot24-contract-label",
                type: "text",
                text: "CORE PROTOCOL ADDRESS (ETHEREUM MAINNET)",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
              },
              {
                id: "foot24-contract-hash",
                type: "text",
                text: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } },
              },
            ],
          },
          {
            id: "foot24-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot24-btn-snapshot",
                type: "button",
                label: "Vote on Snapshot",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "foot24-btn-app",
                type: "button",
                label: "Launch Protocol App",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Bottom Bar: Dual Column Category Links & Status
      {
        id: "foot24-bottom-bar",
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
            id: "foot24-links-protocol",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot24-link-1", type: "link", label: "Governance Forum", href: "/forum", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot24-link-2", type: "link", label: "Ecosystem Grants", href: "/grants", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot24-link-3", type: "link", label: "Smart Contract Specs", href: "/docs", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot24-link-4", type: "link", label: "Bug Bounty ($500k)", href: "/bounty", style: { typography: { size: "sm" } } },
            ],
          },
          {
            id: "foot24-bottom-legal",
            type: "text",
            text: "Kairos DAO is an autonomous protocol. No central entity guarantees returns.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_25_CLOUD_WORKSPACE_UTILITY_RAIL: ComponentDocument = {
  version: 2,
  id: "footer-25-cloud-workspace-utility-rail",
  name: "Cloud Workspace SaaS Utility Rail",
  kind: "footer",
  root: {
    id: "foot25-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot25-main-dock",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        children: [
          // Left: Monogram, Session Status, Region
          {
            id: "foot25-left-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "sm",
            children: [
              {
                id: "foot25-badge-version",
                type: "badge",
                text: "WORKSPACE OS v4.18.2",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot25-status-session",
                type: "badge",
                text: "● SESSION ACTIVE (US-EAST-1 · 12ms)",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text-muted" } },
              },
              {
                id: "foot25-badge-soc2",
                type: "badge",
                text: "SOC2 TYPE II VERIFIED",
                style: { typography: { size: "sm" }, color: { background: "surface", text: "text" } },
              },
            ],
          },

          // Center: Quick Utility Links
          {
            id: "foot25-links-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot25-link-kdb", type: "link", label: "⌘K Shortcuts", href: "/shortcuts", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot25-link-status", type: "link", label: "System Health", href: "/health", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot25-link-settings", type: "link", label: "Org Preferences", href: "/settings", style: { typography: { size: "sm" } } },
              { openInNewTab: false, id: "foot25-link-privacy", type: "link", label: "Telemetry & Privacy", href: "/privacy", style: { typography: { size: "sm" } } },
            ],
          },

          // Right: Modal Trigger & Quick Help
          {
            id: "foot25-right-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "foot25-btn-changelog",
                type: "button",
                label: "What's New in v4.18",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "foot25-btn-help",
                type: "button",
                label: "Live Help",
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

export const BATCH_5_FOOTERS: ComponentDocument[] = [
  FOOTER_21_AUTOMOTIVE_DEALER_LOCATOR,
  FOOTER_22_LEGAL_COUNSEL_LEDGER,
  FOOTER_23_CROWDFUNDING_BACKER_MILESTONES,
  FOOTER_24_WEB3_DAO_PROTOCOL_RAIL,
  FOOTER_25_CLOUD_WORKSPACE_UTILITY_RAIL,
];

export const CURATED_FOOTER_BATCH_5 = BATCH_5_FOOTERS;
