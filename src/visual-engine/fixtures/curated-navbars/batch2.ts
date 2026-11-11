import type { ComponentDocument } from "../../model";

/**
 * BATCH 2 CURATED NAVBAR TEMPLATES
 *
 * #06: Editorial Newspaper Masthead (navbar-06-editorial-masthead)
 * #07: E-Commerce Retail Header (navbar-07-ecommerce-retail-hub)
 * #08: Luxury Atelier Minimalist Split (navbar-08-luxury-atelier-split)
 * #09: Command-Palette Search Centered Header (navbar-09-command-palette-center)
 * #10: Minimalist Full-Curtain Drawer Bar (navbar-10-minimal-drawer-trigger)
 */

export const NAVBAR_06_EDITORIAL_MASTHEAD: ComponentDocument = {
  version: 2,
  id: "navbar-06-editorial-masthead",
  name: "Editorial Newspaper Masthead",
  kind: "navbar",
  root: {
    id: "nav06-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "xs" },
      color: { background: "background", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      // Top Dateline & Weather Strip
      { gap: "md",
        id: "nav06-top-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        style: {
          spacing: { paddingY: "xs" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav06-dateline",
            type: "text",
            text: "Wednesday, October 12, 2026 · Vol. CXLIV · Global Edition",
            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
          },
          {
            id: "nav06-weather-markets",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav06-ticker",
                type: "badge",
                text: "S&P 500  +1.2%  ▲",
                style: { typography: { size: "sm" } },
              },
              { openInNewTab: false,
                id: "nav06-epaper",
                type: "link",
                label: "Today's Front Page (PDF)",
                href: "/edition",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
              },
            ],
          },
        ],
      },
      // Middle Masthead Row (Large Centered Brand)
      { gap: "md",
        id: "nav06-masthead-center",
        type: "flex",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          {
            id: "nav06-masthead-title",
            type: "site-name",
            style: {
              typography: { size: "4xl", weight: "bold", tracking: "wide" },
              color: { text: "text" },
            },
          },
          {
            id: "nav06-masthead-motto",
            type: "text",
            text: "“Independent Journalism & In-Depth International Analysis”",
            style: {
              typography: { size: "sm", weight: "medium" },
              color: { text: "text-subtle" },
              spacing: { paddingTop: "xs" },
            },
          },
        ],
      },
      // Bottom Topic Navigation & Subscribe Rule
      { gap: "md",
        id: "nav06-topic-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        style: {
          spacing: { paddingY: "xs" },
          border: { width: "thin", color: "border" },
        },
        children: [
          {
            id: "nav06-topic-links",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: false,
            style: {
              typography: { size: "sm", weight: "bold", tracking: "wide" },
              color: { text: "text" },
            },
          },
          {
            id: "nav06-subscribe-btn",
            type: "button",
            label: "Subscribe — $1 / week",
            href: "/subscribe",
            style: {
              color: { background: "primary", text: "primary-foreground" },
              border: { radius: "sm" },
              typography: { size: "sm", weight: "bold" },
              spacing: { paddingX: "md", paddingY: "xs" },
            },
          },
        ],
      },
    ],
  },
};

export const NAVBAR_07_ECOMMERCE_RETAIL_HUB: ComponentDocument = {
  version: 2,
  id: "navbar-07-ecommerce-retail-hub",
  name: "E-Commerce Retail Header",
  kind: "navbar",
  root: {
    id: "nav07-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "sm" },
    },
    children: [
      // Top Promo Ribbon
      { gap: "md",
        id: "nav07-promo-ribbon",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "center",
        wrap: false,
        style: {
          spacing: { paddingY: "xs" },
          color: { background: "surface-sunken", text: "text-muted" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav07-promo-text",
            type: "text",
            text: "Complimentary global shipping on all orders over $150 · Use Code: AUTUMN26",
            style: { typography: { size: "sm", weight: "medium" } },
          },
        ],
      },
      // Middle Main Row: Brand, Search, User Basket
      {
        id: "nav07-main-row",
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
          // Left: Brand
          {
            id: "nav07-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              { id: "nav07-logo", type: "site-logo", style: { custom: {width: "2.25rem", height: "2.25rem"}, sizing: { } } },
              { id: "nav07-name", type: "site-name", style: { typography: { size: "xl", weight: "bold", tracking: "wide" } } },
            ],
          },
          // Center: Wide Live Search Input
          { gap: "md",
            id: "nav07-search-center",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            style: {
              sizing: { maxWidth: "2xl", width: "full" },
            },
            children: [
              { label: "Search catalog", href: "/search", openInNewTab: false,
                id: "nav07-search-input",
                type: "link",
                style: {
                  border: { radius: "full", width: "hairline", color: "border" },
                  color: { background: "surface-muted" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
          // Right: Customer Action Cluster (Wishlist, Account, Bag)
          {
            id: "nav07-user-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              { openInNewTab: false,
                id: "nav07-btn-wishlist",
                type: "link",
                label: "♡ Saved (3)",
                href: "/wishlist",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
              },
              { openInNewTab: false,
                id: "nav07-btn-account",
                type: "link",
                label: "Account",
                href: "/account",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
              },
              {
                id: "nav07-btn-cart",
                type: "button",
                label: "Bag (2)",
                href: "/checkout",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
      // Bottom Category Rail
      { gap: "md",
        id: "nav07-category-rail",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "start",
        wrap: false,
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        style: {
          spacing: { paddingY: "xs" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav07-categories",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "text" },
            },
          },
        ],
      },
    ],
  },
};

export const NAVBAR_08_LUXURY_ATELIER_SPLIT: ComponentDocument = {
  version: 2,
  id: "navbar-08-luxury-atelier-split",
  name: "Luxury Atelier Minimalist Split",
  kind: "navbar",
  root: {
    id: "nav08-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface-sunken", text: "inverse" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav08-split-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "xl",
        children: [
          // Left: Spaced Serif Caps Navigation
          {
            id: "nav08-left-serif-links",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: false,
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            style: {
              typography: { size: "sm", weight: "medium", tracking: "wide" },
              color: { text: "inverse-muted" },
            },
          },
          // Center: Refined Monogram / Brand Identity
          { gap: "md",
            id: "nav08-center-brand",
            type: "flex",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            children: [
              {
                id: "nav08-brand-title",
                type: "site-name",
                style: {
                  typography: { size: "xl", weight: "bold", tracking: "wide" },
                  color: { text: "inverse" },
                },
              },
              {
                id: "nav08-brand-motto",
                type: "text",
                text: "HAUTE HORLOGERIE · GENÈVE",
                style: {
                  typography: { size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "accent" },
                },
              },
            ],
          },
          // Right: Private Client Concierge & Currency
          {
            id: "nav08-right-concierge",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "lg",
            children: [
              {
                id: "nav08-currency-pill",
                type: "badge",
                text: "USD $ · EUR €",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              { openInNewTab: false,
                id: "nav08-btn-client-portal",
                type: "link",
                label: "Private Client Lounge →",
                href: "/lounge",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "inverse" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_09_COMMAND_PALETTE_CENTER: ComponentDocument = {
  version: 2,
  id: "navbar-09-command-palette-center",
  name: "Command-Palette Search Centered Header",
  kind: "navbar",
  root: {
    id: "nav09-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "sm" },
    },
    children: [
      {
        id: "nav09-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        children: [
          // Left: Brand + Docs Version Badge
          {
            id: "nav09-left-brand",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav09-logo", type: "site-logo", style: { custom: {width: "1.75rem", height: "1.75rem"}, sizing: { } } },
              { id: "nav09-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" } } },
              {
                id: "nav09-version-badge",
                type: "badge",
                text: "v4.2-LTS",
                style: { typography: { size: "sm", weight: "semibold" } },
              },
            ],
          },
          // Center: Dominant Command Palette Search Bar
          { gap: "md",
            id: "nav09-center-search",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            style: {
              sizing: { maxWidth: "xl", width: "full" },
            },
            children: [
              { label: "Search documentation", href: "/search", openInNewTab: false,
                id: "nav09-cmd-input",
                type: "link",
                style: {
                  color: { background: "surface-sunken" },
                  border: { radius: "lg", width: "hairline", color: "border" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
            ],
          },
          // Right: Secondary Links & GitHub Badge
          {
            id: "nav09-right-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav09-docs-nav",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              { openInNewTab: false,
                id: "nav09-btn-feedback",
                type: "link",
                label: "Feedback",
                href: "/feedback",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_10_MINIMAL_DRAWER_TRIGGER: ComponentDocument = {
  version: 2,
  id: "navbar-10-minimal-drawer-trigger",
  name: "Minimalist Full-Curtain Drawer Bar",
  kind: "navbar",
  root: {
    id: "nav10-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "md" },
      color: { background: "background", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      { gap: "md",
        id: "nav10-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        children: [
          // Left: Stark Brand
          {
            id: "nav10-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav10-logo", type: "site-logo", style: { custom: {width: "1.75rem", height: "1.75rem"}, sizing: { } } },
              {
                id: "nav10-name",
                type: "site-name",
                style: {
                  typography: { size: "xl", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
            ],
          },
          // Right: Studio Status + Audio Toggle + Drawer Trigger
          {
            id: "nav10-action-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "lg",
            children: [
              {
                id: "nav10-status-dot",
                type: "badge",
                text: "AVAILABLE FOR COMMISSIONS Q1 2027",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav10-audio-toggle",
                type: "text",
                text: "SOUND [OFF]",
                style: {
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav10-drawer-toggle",
                type: "menu-toggle",
                label: "MENU",
                targetId: "nav10-curtain-panel",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "full", width: "thin", color: "text" },
                  typography: { size: "sm", weight: "bold", tracking: "wide" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
      // Curtain Menu Panel
      {
        id: "nav10-curtain-panel",
        type: "menu-panel",
        style: {
          spacing: { paddingY: "xl" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav10-curtain-links",
            type: "navigation-menu",
            orientation: "vertical",
            showChildren: false,
            style: {
              typography: { size: "2xl", weight: "bold", tracking: "wide" },
              spacing: { paddingY: "md" },
            },
          },
        ],
      },
    ],
  },
};

export const CURATED_NAVBAR_BATCH_2: ComponentDocument[] = [
  NAVBAR_06_EDITORIAL_MASTHEAD,
  NAVBAR_07_ECOMMERCE_RETAIL_HUB,
  NAVBAR_08_LUXURY_ATELIER_SPLIT,
  NAVBAR_09_COMMAND_PALETTE_CENTER,
  NAVBAR_10_MINIMAL_DRAWER_TRIGGER,
];

