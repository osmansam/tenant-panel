import type { ComponentDocument } from "../../model";

/**
 * BATCH 5 CURATED NAVBAR TEMPLATES
 *
 * #21: Automotive Configurator & Dealer Bar (navbar-21-automotive-configurator)
 * #22: SaaS App Workspace & Breadcrumb Bar (navbar-22-dashboard-workspace-header)
 * #23: Crowdfunding Project Backer Header (navbar-23-crowdfunding-progress)
 * #24: Legal Counsel & Practice Direct Bar (navbar-24-legal-counsel-advisory)
 * #25: Web3 Token Ticker & Wallet Bar (navbar-25-web3-community-ticker)
 */

export const NAVBAR_21_AUTOMOTIVE_CONFIGURATOR: ComponentDocument = {
  version: 2,
  id: "navbar-21-automotive-configurator",
  name: "Automotive Configurator & Dealer Bar",
  kind: "navbar",
  root: {
    id: "nav21-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border", shadow: "md" },
    },
    children: [{ id: "navbar-21-automotive-configurator-mobile-menu", type: "menu-panel", responsive: { visibility: { mobile: true, tablet: false, desktop: false } }, children: [{ id: "navbar-21-automotive-configurator-mobile-menu-links", type: "navigation-menu", orientation: "vertical", showChildren: true }] },
      {
        id: "nav21-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left Wing: Vehicle Model Lineup Tabs
          {
            id: "nav21-left-models",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav21-models-nav",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav21-ev-badge",
                type: "badge",
                text: "100% ELECTRIC",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "surface-muted", text: "text-muted" },
                },
              },
            ],
          },

          // Center: Automotive Brand Crest
          {
            id: "nav21-center-brand",
            type: "flex",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "none",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 9, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav21-brand-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav21-brand-name",
                type: "site-name",
                style: {
                  typography: { size: "lg", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Right Wing: Test Drive Lead & Configurator CTA
          {
            id: "nav21-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { openInNewTab: false,
                id: "nav21-dealer-link",
                type: "link",
                href: "#dealers",
                label: "📍 Find Dealer",
                responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav21-build-btn",
                type: "button",
                label: "Build & Price →",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                },
              },
              { targetId: "navbar-21-automotive-configurator-mobile-menu", label: "Menu",
                id: "nav21-menu-toggle",
                type: "menu-toggle",
                responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
                style: {
                  color: { background: "surface", text: "text" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_22_DASHBOARD_WORKSPACE_HEADER: ComponentDocument = {
  version: 2,
  id: "navbar-22-dashboard-workspace-header",
  name: "SaaS App Workspace & Breadcrumb Bar",
  kind: "navbar",
  root: {
    id: "nav22-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "sm" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav22-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: App Icon & Deep Breadcrumbs
          {
            id: "nav22-left-breadcrumbs",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 8, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav22-app-icon",
                type: "badge",
                text: "◈",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "sm" },
                },
              },
              {
                id: "nav22-org-name",
                type: "site-name",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav22-crumb-divider-1",
                type: "text",
                text: "/",
                style: {
                  typography: { size: "sm", weight: "normal" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav22-workspace-name",
                type: "text",
                text: "Production",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav22-crumb-divider-2",
                type: "text",
                text: "/",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "normal" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav22-page-current",
                type: "badge",
                text: "API Keys",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "surface-muted", text: "text" },
                },
              },
            ],
          },

          // Right: Environment Badge, Notification Bell & User Avatar
          {
            id: "nav22-right-utilities",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                tablet: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav22-env-badge",
                type: "badge",
                text: "LIVE US-EAST",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "surface", text: "text-muted" },
                  border: { width: "hairline", color: "border" },
                },
              },
              {
                id: "nav22-notification-badge",
                type: "badge",
                text: "🔔 3",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "surface-muted", text: "text" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav22-user-profile-btn",
                type: "button",
                label: "alex@acme.io ▾",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text", background: "surface" },
                  border: { width: "hairline", color: "border" },
                },
              },
              {
                id: "nav22-avatar-circle",
                type: "badge",
                text: "AO",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_23_CROWDFUNDING_PROGRESS: ComponentDocument = {
  version: 2,
  id: "navbar-23-crowdfunding-progress",
  name: "Crowdfunding Project Backer Header",
  kind: "navbar",
  root: {
    id: "nav23-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      // Tier 1: Pinned Funding Progress Strip
      {
        id: "nav23-progress-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "md",
        style: {
          spacing: { paddingX: "lg", paddingY: "xs" },
          color: { background: "primary", text: "primary-foreground" },
        },
        children: [
          {
            id: "nav23-funded-amount",
            type: "text",
            text: "🔥 $1,420,890 pledged of $1,000,000 goal (142% Funded)",
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { text: "primary-foreground" },
            },
          },
          {
            id: "nav23-time-remaining",
            type: "badge",
            text: "⏱️ 8 DAYS LEFT · 4,210 BACKERS",
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { background: "surface", text: "primary" },
              border: { radius: "full" },
            },
          },
        ],
      },

      // Tier 2: Main Navigation & Pledge Action
      {
        id: "nav23-main-row",
        type: "grid",
        columns: 12,
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          // Left: Campaign Brand
          {
            id: "nav23-brand-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav23-brand-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "md" },
                },
              },
              {
                id: "nav23-brand-name",
                type: "site-name",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Center: Campaign Tabs (Story, Updates, FAQ, Community)
          {
            id: "nav23-center-nav",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "lg",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { openInNewTab: false,
                id: "nav23-story-link",
                type: "link",
                href: "#story",
                label: "The Story",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { text: "primary" },
                },
              },
              { openInNewTab: false,
                id: "nav23-updates-link",
                type: "link",
                href: "#updates",
                label: "Updates (12)",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text" },
                },
              },
              { openInNewTab: false,
                id: "nav23-rewards-link",
                type: "link",
                href: "#rewards",
                label: "Reward Tiers",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text" },
                },
              },
              { openInNewTab: false,
                id: "nav23-faq-link",
                type: "link",
                href: "#faq",
                label: "FAQ",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // Right: Back This Project CTA
          {
            id: "nav23-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { openInNewTab: false,
                id: "nav23-remind-link",
                type: "link",
                href: "#remind",
                label: "♡ Remind Me",
                responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav23-back-btn",
                type: "button",
                label: "Back This Project →",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_24_LEGAL_COUNSEL_ADVISORY: ComponentDocument = {
  version: 2,
  id: "navbar-24-legal-counsel-advisory",
  name: "Legal Counsel & Practice Direct Bar",
  kind: "navbar",
  root: {
    id: "nav24-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [{ id: "navbar-24-legal-counsel-advisory-mobile-menu", type: "menu-panel", responsive: { visibility: { mobile: true, tablet: false, desktop: false } }, children: [{ id: "navbar-24-legal-counsel-advisory-mobile-menu-links", type: "navigation-menu", orientation: "vertical", showChildren: true }] },
      {
        id: "nav24-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: Prestigious Law Firm Name & Foundation Year
          {
            id: "nav24-brand-col",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "none",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 9, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav24-firm-name",
                type: "site-name",
                style: {
                  typography: { size: "lg", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav24-firm-sub",
                type: "text",
                text: "ATTORNEYS AT LAW · EST. 1894",
                style: {
                  typography: { size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // Center: Practice Areas Navigation
          {
            id: "nav24-practice-nav-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "xl",
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav24-practice-nav",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Right: 24/7 Counsel Direct Dial & Confidential Consultation CTA
          {
            id: "nav24-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                tablet: { column: 6, columnSpan: 7, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav24-direct-phone",
                type: "text",
                text: "⚖️ (212) 555-0190",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav24-consult-btn",
                type: "button",
                label: "Request Consultation",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { text: "text", background: "surface" },
                  border: { width: "thin", color: "border", radius: "none" },
                },
              },
              { targetId: "navbar-24-legal-counsel-advisory-mobile-menu", label: "Menu",
                id: "nav24-menu-toggle",
                type: "menu-toggle",
                responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
                style: {
                  color: { background: "surface", text: "text" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_25_WEB3_COMMUNITY_TICKER: ComponentDocument = {
  version: 2,
  id: "navbar-25-web3-community-ticker",
  name: "Web3 Token Ticker & Wallet Bar",
  kind: "navbar",
  root: {
    id: "nav25-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "xs" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav25-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: Protocol Brand & Live Token Price Ticker
          {
            id: "nav25-left-ticker",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 7, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav25-token-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav25-token-name",
                type: "site-name",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav25-price-badge",
                type: "badge",
                text: "$4.82 (+14.2%)",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "surface", text: "primary" },
                  border: { width: "hairline", color: "border" },
                },
              },
            ],
          },

          // Center: Protocol, Staking, Docs Navigation
          {
            id: "nav25-center-nav",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "lg",
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav25-nav-menu",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Right: Gas Price, Network Pill & Connect Wallet CTA
          {
            id: "nav25-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 8, columnSpan: 5, row: 1, rowSpan: 1 },
                tablet: { column: 6, columnSpan: 7, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav25-gas-indicator",
                type: "badge",
                text: "⛽ 14 Gwei",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { background: "surface-muted", text: "text-muted" },
                },
              },
              {
                id: "nav25-network-pill",
                type: "badge",
                text: "● Ethereum",
                responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border" },
                },
              },
              {
                id: "nav25-connect-wallet-btn",
                type: "button",
                label: "⚡ Connect Wallet",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_NAVBAR_BATCH_5: ComponentDocument[] = [
  NAVBAR_21_AUTOMOTIVE_CONFIGURATOR,
  NAVBAR_22_DASHBOARD_WORKSPACE_HEADER,
  NAVBAR_23_CROWDFUNDING_PROGRESS,
  NAVBAR_24_LEGAL_COUNSEL_ADVISORY,
  NAVBAR_25_WEB3_COMMUNITY_TICKER,
];

