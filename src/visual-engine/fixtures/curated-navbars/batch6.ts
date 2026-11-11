import type { ComponentDocument } from "../../model";

/**
 * BATCH 6 CURATED NAVBAR TEMPLATES
 *
 * #26: Segmented Section Horizon Tabs Header (navbar-26-segmented-horizon-tabs)
 * #27: Full-Bleed Transparent Hero Overlay Header (navbar-27-transparent-hero-overlay)
 * #28: Global Trade Dual-Language Header (navbar-28-b2b-trade-multilingual)
 * #29: Compact Floating Micro-Rail (navbar-29-micro-rail-floating)
 * #30: Member Club & Community Portal Header (navbar-30-member-community-hub)
 */

export const NAVBAR_26_SEGMENTED_HORIZON_TABS: ComponentDocument = {
  version: 2,
  id: "navbar-26-segmented-horizon-tabs",
  name: "Segmented Section Horizon Tabs Header",
  kind: "navbar",
  root: {
    id: "nav26-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "sm" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "sm" },
    },
    children: [
      {
        id: "nav26-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: Brand Logo & Name
          {
            id: "nav26-brand-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 8, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav26-brand-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "md" },
                },
              },
              {
                id: "nav26-brand-name",
                type: "site-name",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Center: Segmented Horizon Step Tabs
          {
            id: "nav26-center-tabs",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "sm",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 4, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 6, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav26-tab-1",
                type: "badge",
                text: "01 Overview",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { background: "surface", text: "text-muted" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav26-tab-2",
                type: "badge",
                text: "02 Architecture",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav26-tab-3",
                type: "badge",
                text: "03 Security",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { background: "surface", text: "text-muted" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav26-tab-4",
                type: "badge",
                text: "04 Pricing",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { background: "surface", text: "text-muted" },
                  border: { radius: "full" },
                },
              },
            ],
          },

          // Right: Step Indicator & Interactive Demo CTA
          {
            id: "nav26-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav26-step-badge",
                type: "badge",
                text: "STEP 2 OF 4",
                responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { background: "surface-muted", text: "text-muted" },
                },
              },
              {
                id: "nav26-demo-btn",
                type: "button",
                label: "Try Demo →",
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

export const NAVBAR_27_TRANSPARENT_HERO_OVERLAY: ComponentDocument = {
  version: 2,
  id: "navbar-27-transparent-hero-overlay",
  name: "Full-Bleed Transparent Hero Overlay Header",
  kind: "navbar",
  root: {
    id: "nav27-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "none" },
    },
    children: [{ id: "navbar-27-transparent-hero-overlay-mobile-menu", type: "menu-panel", responsive: { visibility: { mobile: true, tablet: false, desktop: false } }, children: [{ id: "navbar-27-transparent-hero-overlay-mobile-menu-links", type: "navigation-menu", orientation: "vertical", showChildren: true }] },
      {
        id: "nav27-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: Cinematic Brand Logo & Name
          {
            id: "nav27-brand-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 8, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav27-brand-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "sm" },
                },
              },
              {
                id: "nav27-brand-name",
                type: "site-name",
                style: {
                  typography: { size: "lg", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Center: Minimal High-Contrast Ghost Nav
          {
            id: "nav27-center-nav",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "xl",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav27-ghost-menu",
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

          // Right: Frosted Glass Pill CTA
          {
            id: "nav27-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav27-preorder-btn",
                type: "button",
                label: "Pre-Order Edition",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { text: "text", background: "surface" },
                  border: { width: "hairline", color: "border", radius: "full" },
                },
              },
              { targetId: "navbar-27-transparent-hero-overlay-mobile-menu", label: "Menu",
                id: "nav27-menu-toggle",
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

export const NAVBAR_28_B2B_TRADE_MULTILINGUAL: ComponentDocument = {
  version: 2,
  id: "navbar-28-b2b-trade-multilingual",
  name: "Global Trade Dual-Language Header",
  kind: "navbar",
  root: {
    id: "nav28-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Tier 1: Port Bulletins & Language Switcher
      {
        id: "nav28-top-tier",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "md",
        style: {
          spacing: { paddingX: "md", paddingY: "xs" },
          color: { background: "surface-muted", text: "text-muted" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav28-port-status",
            type: "text",
            text: "⚓ ROTTERDAM TERMINAL 4 OPEN · EUR/USD 1.084 · BDI 1,842",
            style: {
              typography: { size: "sm", weight: "medium" },
              color: { text: "text-muted" },
            },
          },
          {
            id: "nav28-lang-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav28-lang-switcher",
                type: "language-switcher",
                style: {
                  color: { text: "text", background: "surface" },
                },
              },
            ],
          },
        ],
      },

      // Tier 2: Freight Brand, Tracking Search & Nav
      {
        id: "nav28-main-tier",
        type: "grid",
        columns: 12,
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          // Left: Carrier Brand
          {
            id: "nav28-brand-col",
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
                id: "nav28-carrier-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "sm" },
                },
              },
              {
                id: "nav28-carrier-name",
                type: "site-name",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { text: "text" },
                },
              },
            ],
          },

          // Center: Quick Shipment Tracking Input
          {
            id: "nav28-center-track",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "xs",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { label: "Enter B/L or Container #", href: "/contact", openInNewTab: false,
                id: "nav28-track-input",
                type: "link",
                style: {
                  typography: { size: "sm", weight: "normal" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border" },
                },
              },
              {
                id: "nav28-track-btn",
                type: "button",
                label: "Track",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },

          // Right: Schedules & Rate Quote CTA
          {
            id: "nav28-right-actions",
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
                id: "nav28-schedule-link",
                type: "link",
                href: "#schedules",
                label: "Schedules",
                responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav28-quote-btn",
                type: "button",
                label: "Get Rate Quote →",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { text: "text", background: "surface" },
                  border: { width: "thin", color: "border" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_29_MICRO_RAIL_FLOATING: ComponentDocument = {
  version: 2,
  id: "navbar-29-micro-rail-floating",
  name: "Compact Floating Micro-Rail",
  kind: "navbar",
  root: {
    id: "nav29-root",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "xs" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", radius: "full", shadow: "lg" },
    },
    children: [
      {
        id: "nav29-dock-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        children: [
          // Left: Micro Identity Indicator
          {
            id: "nav29-dot-badge",
            type: "badge",
            text: "✦",
            style: {
              typography: { size: "base", weight: "bold" },
              color: { background: "primary", text: "primary-foreground" },
              border: { radius: "full" },
            },
          },

          // Center: Minimal Icon Links
          {
            id: "nav29-links-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            children: [
              { openInNewTab: false,
                id: "nav29-work-link",
                type: "link",
                href: "#work",
                label: "Work",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { text: "text" },
                },
              },
              { openInNewTab: false,
                id: "nav29-writing-link",
                type: "link",
                href: "#writing",
                label: "Writing",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              { openInNewTab: false,
                id: "nav29-about-link",
                type: "link",
                href: "#about",
                label: "About",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },

          // Right: Theme Toggle & Quick Contact Trigger
          {
            id: "nav29-right-tools",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              { accessibleLabel: "Color theme", labels: { light: "Light", dark: "Dark", system: "System" }, presentation: "segmented",
                id: "nav29-theme-toggle",
                type: "theme-switcher",
                style: {
                  color: { text: "text", background: "surface" },
                },
              },
              {
                id: "nav29-contact-btn",
                type: "button",
                label: "Contact",
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

export const NAVBAR_30_MEMBER_COMMUNITY_HUB: ComponentDocument = {
  version: 2,
  id: "navbar-30-member-community-hub",
  name: "Member Club & Community Portal Header",
  kind: "navbar",
  root: {
    id: "nav30-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [{ id: "navbar-30-member-community-hub-mobile-menu", type: "menu-panel", responsive: { visibility: { mobile: true, tablet: false, desktop: false } }, children: [{ id: "navbar-30-member-community-hub-mobile-menu-links", type: "navigation-menu", orientation: "vertical", showChildren: true }] },
      {
        id: "nav30-grid-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: Live Online Presence Pill & Club Crest
          {
            id: "nav30-brand-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 8, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav30-club-logo",
                type: "site-logo",
                style: {
                  color: { background: "primary" },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav30-club-name",
                type: "site-name",
                style: {
                  typography: { size: "base", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav30-online-badge",
                type: "badge",
                text: "🟢 1,429 Online",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { background: "surface", text: "primary" },
                  border: { width: "hairline", color: "border" },
                },
              },
            ],
          },

          // Center: Community Navigation Menu
          {
            id: "nav30-center-nav",
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
                id: "nav30-community-menu",
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

          // Right: Member Lounge Login & Apply for Membership CTA
          {
            id: "nav30-right-actions",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                tablet: { column: 6, columnSpan: 7, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { openInNewTab: false,
                id: "nav30-lounge-link",
                type: "link",
                href: "#lounge",
                label: "Member Lounge",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav30-apply-btn",
                type: "button",
                label: "Apply for Club Pass",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                },
              },
              { targetId: "navbar-30-member-community-hub-mobile-menu", label: "Menu",
                id: "nav30-menu-toggle",
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

export const CURATED_NAVBAR_BATCH_6: ComponentDocument[] = [
  NAVBAR_26_SEGMENTED_HORIZON_TABS,
  NAVBAR_27_TRANSPARENT_HERO_OVERLAY,
  NAVBAR_28_B2B_TRADE_MULTILINGUAL,
  NAVBAR_29_MICRO_RAIL_FLOATING,
  NAVBAR_30_MEMBER_COMMUNITY_HUB,
];

