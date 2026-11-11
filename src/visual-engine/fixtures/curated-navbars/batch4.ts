import type { ComponentDocument } from "../../model";

/**
 * BATCH 4 CURATED NAVBAR TEMPLATES
 *
 * #16: Hospitality & Dining Reservation Bar (navbar-16-hospitality-reservation)
 * #17: Nonprofit Impact & Grant Header (navbar-17-nonprofit-donation-strip)
 * #18: Multi-Brand Umbrella Network Strip (navbar-18-multibrand-ecosystem-strip)
 * #19: Streaming Audio & Podcast Bar (navbar-19-streaming-media-player)
 * #20: Real Estate MLS Property Search Bar (navbar-20-realestate-mls-search)
 */

export const NAVBAR_16_HOSPITALITY_RESERVATION: ComponentDocument = {
  version: 2,
  id: "navbar-16-hospitality-reservation",
  name: "Hospitality & Dining Reservation Bar",
  kind: "navbar",
  root: {
    id: "nav16-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "sm" },
    },
    children: [
      {
        id: "nav16-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left Wing: Menus & Cellar Navigation
          {
            id: "nav16-left-nav",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xl",
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
                id: "nav16-menus-nav",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                style: {
                  typography: { size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text" },
                },
              },
            ],
          },
          // Center Wing: Restaurant Monogram
          { gap: "md",
            id: "nav16-center-brand",
            type: "flex",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 8, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav16-restaurant-name",
                type: "site-name",
                style: {
                  typography: { size: "xl", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav16-restaurant-sub",
                type: "text",
                text: "MICHELIN THREE STARS · NEW YORK",
                style: {
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          // Right Wing: Hours, Telephone & Table Reservation CTA
          {
            id: "nav16-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                mobile: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav16-hours-badge",
                type: "badge",
                text: "Dinner 5:30PM – 11:00PM",
                responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "nav16-btn-reserve",
                type: "button",
                label: "Reserve a Table",
                href: "/reservations",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "sm" },
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_17_NONPROFIT_DONATION_STRIP: ComponentDocument = {
  version: 2,
  id: "navbar-17-nonprofit-donation-strip",
  name: "Nonprofit Impact & Grant Header",
  kind: "navbar",
  root: {
    id: "nav17-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      // Top Emergency Campaign Impact Ribbon
      { gap: "md",
        id: "nav17-campaign-ribbon",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        style: {
          spacing: { paddingY: "xs" },
          color: { background: "surface-sunken", text: "text" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav17-campaign-progress",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav17-emergency-badge",
                type: "badge",
                text: "GLOBAL CRISIS APPEAL",
                style: { typography: { size: "sm", weight: "bold" } },
              },
              {
                id: "nav17-funding-stat",
                type: "text",
                text: "Clean Water & Nutrition Fund: $2.4M of $3.0M Goal Raised (80% Complete)",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
              },
            ],
          },
          { gap: "md",
            id: "nav17-charity-transparency",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            children: [
              { openInNewTab: false,
                id: "nav17-audit-link",
                type: "link",
                label: "100% Tax-Deductible · 2026 Audited Financials →",
                href: "/financials",
                style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
              },
            ],
          },
        ],
      },
      // Bottom Main Foundation Navigation
      {
        id: "nav17-main-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "xl",
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          // Foundation Logo
          {
            id: "nav17-brand-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav17-logo", type: "site-logo", style: { custom: {width: "2.25rem", height: "2.25rem"}, sizing: { } } },
              { gap: "md",
                id: "nav17-name-block",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                children: [
                  { id: "nav17-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" } } },
                  { id: "nav17-mission-sub", type: "text", text: "INTERNATIONAL RELIEF & RESILIENCE INITIATIVE", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-subtle" } } },
                ],
              },
            ],
          },
          // Programs & Mission Links
          {
            id: "nav17-program-links",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { text: "text" },
            },
          },
          // Highlighted Donate Now CTA Pill
          {
            id: "nav17-donation-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav17-btn-donate",
                type: "button",
                label: "Donate Now — Save Lives",
                href: "/donate",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full", shadow: "md" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "xl", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_18_MULTIBRAND_ECOSYSTEM_STRIP: ComponentDocument = {
  version: 2,
  id: "navbar-18-multibrand-ecosystem-strip",
  name: "Multi-Brand Umbrella Network Strip",
  kind: "navbar",
  root: {
    id: "nav18-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      // Top Umbrella Network Strip
      { gap: "md",
        id: "nav18-ecosystem-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        style: {
          spacing: { paddingY: "xs" },
          color: { background: "surface-muted", text: "text-muted" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav18-sister-brands",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            children: [
              { id: "nav18-brand-cloud", type: "badge", text: "AURA CLOUD", style: { typography: { size: "sm", weight: "semibold" } } },
              { id: "nav18-brand-ai", type: "badge", text: "NEXUS AI", style: { typography: { size: "sm", weight: "semibold" } } },
              { id: "nav18-brand-sec", type: "badge", text: "● CITADEL SECURITY", style: { typography: { size: "sm", weight: "bold" } } },
              { id: "nav18-brand-media", type: "badge", text: "KINETIC MEDIA", style: { typography: { size: "sm", weight: "semibold" } } },
            ],
          },
          { openInNewTab: false,
            id: "nav18-switch-org",
            type: "link",
            label: "Switch Organization ▾",
            href: "/switch-org",
            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
          },
        ],
      },
      // Bottom Active Division Bar
      {
        id: "nav18-active-division-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "xl",
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          {
            id: "nav18-active-brand-combo",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav18-logo", type: "site-logo", style: { custom: {width: "2rem", height: "2rem"}, sizing: { } } },
              {
                id: "nav18-division-title",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold" } },
              },
            ],
          },
          {
            id: "nav18-division-nav",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "text" },
            },
          },
          {
            id: "nav18-suite-action",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav18-btn-launch",
                type: "button",
                label: "Launch Suite Console",
                href: "/console",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_19_STREAMING_MEDIA_PLAYER: ComponentDocument = {
  version: 2,
  id: "navbar-19-streaming-media-player",
  name: "Streaming Audio & Podcast Bar",
  kind: "navbar",
  root: {
    id: "nav19-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "sm" },
      color: { background: "surface-sunken", text: "inverse" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav19-player-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        children: [
          // Left: Podcast Show Identity
          {
            id: "nav19-show-identity",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav19-logo", type: "site-logo", style: { custom: {width: "2rem", height: "2rem"}, sizing: { }, border: { radius: "md" } } },
              { gap: "md",
                id: "nav19-show-titles",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                children: [
                  { id: "nav19-name", type: "site-name", style: { typography: { size: "base", weight: "bold" }, color: { text: "inverse" } } },
                  { id: "nav19-network", type: "text", text: "WEEKLY AUDIO ESSAYS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "accent" } } },
                ],
              },
            ],
          },
          // Center: Mini Persistent Audio Player
          {
            id: "nav19-mini-player",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            style: {
              sizing: { maxWidth: "xl", width: "full" },
              spacing: { paddingX: "md", paddingY: "xs" },
              color: { background: "surface", text: "text" },
              border: { radius: "full", width: "hairline", color: "border" },
            },
            children: [
              {
                id: "nav19-play-btn",
                type: "badge",
                text: "▶ PLAY",
                style: { border: { radius: "full" }, typography: { size: "sm", weight: "bold" } },
              },
              {
                id: "nav19-current-ep",
                type: "text",
                text: "Ep. 184: Quantum Supremacy with Dr. Aris Thorne",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
              },
              {
                id: "nav19-time-stamp",
                type: "badge",
                text: "18:42 / 45:10",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: { typography: { size: "sm" } },
              },
            ],
          },
          // Right: Platform Subscribe Badges
          {
            id: "nav19-subscribe-platforms",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            children: [
              { openInNewTab: false,
                id: "nav19-apple-badge",
                type: "link",
                label: " Apple Podcasts",
                href: "/apple",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "inverse-muted" } },
              },
              { openInNewTab: false,
                id: "nav19-spotify-badge",
                type: "link",
                label: "Spotify",
                href: "/spotify",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "inverse-muted" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_20_REALESTATE_MLS_SEARCH: ComponentDocument = {
  version: 2,
  id: "navbar-20-realestate-mls-search",
  name: "Real Estate MLS Property Search Bar",
  kind: "navbar",
  root: {
    id: "nav20-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      {
        id: "nav20-main-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "xl",
        children: [
          // Brokerage Brand
          {
            id: "nav20-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav20-logo", type: "site-logo", style: { custom: {width: "2rem", height: "2rem"}, sizing: { } } },
              { id: "nav20-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" } } },
            ],
          },
          // Inline MLS Search Bar
          { gap: "md",
            id: "nav20-search-bar",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            style: {
              sizing: { maxWidth: "lg", width: "full" },
            },
            children: [
              { label: "Find properties", href: "/search", openInNewTab: false,
                id: "nav20-mls-input",
                type: "link",
                style: {
                  border: { radius: "full", width: "hairline", color: "border" },
                  color: { background: "surface-muted" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
          // Buy / Rent / Sell Links & List Property Action
          {
            id: "nav20-actions-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "lg",
            children: [
              {
                id: "nav20-prop-nav",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav20-btn-list",
                type: "button",
                label: "List a Property",
                href: "/list",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_NAVBAR_BATCH_4: ComponentDocument[] = [
  NAVBAR_16_HOSPITALITY_RESERVATION,
  NAVBAR_17_NONPROFIT_DONATION_STRIP,
  NAVBAR_18_MULTIBRAND_ECOSYSTEM_STRIP,
  NAVBAR_19_STREAMING_MEDIA_PLAYER,
  NAVBAR_20_REALESTATE_MLS_SEARCH,
];

