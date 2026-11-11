import type { ComponentDocument } from "../../model";

/**
 * BATCH 1 CURATED NAVBAR TEMPLATES
 *
 * #01: Classic SaaS Balanced Header (navbar-01-classic-saas-balanced)
 * #02: Centered Brand Bilateral Split Header (navbar-02-centered-brand-split)
 * #03: Floating Pill Island Dock (navbar-03-floating-island-dock)
 * #04: Monospace DevTerminal Status Bar (navbar-04-developer-terminal-strip)
 * #05: Enterprise Dual-Tier Utility Header (navbar-05-enterprise-dual-tier)
 */

export const NAVBAR_01_CLASSIC_SAAS_BALANCED: ComponentDocument = {
  version: 2,
  id: "navbar-01-classic-saas-balanced",
  name: "Classic SaaS Balanced Header",
  kind: "navbar",
  root: {
    id: "nav01-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "sm" },
    },
    children: [
      {
        id: "nav01-desktop-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        children: [
          // Left: Brand
          {
            id: "nav01-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav01-logo",
                type: "site-logo",
                style: { custom: {width: "2rem", height: "2rem"}, sizing: { } },
              },
              {
                id: "nav01-site-name",
                type: "site-name",
                style: {
                  typography: { size: "lg", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav01-badge-tier",
                type: "badge",
                text: "PRO",
                style: { spacing: { paddingX: "xs", paddingY: "none" } },
              },
            ],
          },
          // Center: Primary Navigation Links
          {
            id: "nav01-nav-center",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            style: {
              typography: { size: "sm", weight: "medium" },
              color: { text: "text-muted" },
              spacing: { paddingX: "md" },
            },
          },
          // Right: Action Cluster
          {
            id: "nav01-actions-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav01-theme-switcher",
                type: "theme-switcher",
                presentation: "segmented",
                accessibleLabel: "Toggle visual color theme",
                labels: { light: "Light", dark: "Dark", system: "Auto" },
              },
              {
                id: "nav01-btn-signin",
                type: "button",
                label: "Sign in",
                href: "/login",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav01-btn-trial",
                type: "button",
                label: "Start Free Trial",
                href: "/signup",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full", shadow: "sm" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "lg", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
      // Mobile Top Bar
      { gap: "md",
        id: "nav01-mobile-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
        children: [
          {
            id: "nav01-mobile-brand",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              { id: "nav01-mobile-logo", type: "site-logo", style: { custom: {width: "1.75rem", height: "1.75rem"}, sizing: { } } },
              { id: "nav01-mobile-name", type: "site-name", style: { typography: { size: "base", weight: "bold" } } },
            ],
          },
          {
            id: "nav01-mobile-toggle",
            type: "menu-toggle",
            label: "Menu",
            targetId: "nav01-mobile-panel",
            style: {
              spacing: { paddingX: "sm", paddingY: "xs" },
              border: { radius: "md", width: "hairline", color: "border" },
              typography: { size: "sm", weight: "medium" },
            },
          },
        ],
      },
      // Mobile Menu Panel (Disclosure)
      {
        id: "nav01-mobile-panel",
        type: "menu-panel",
        responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
        style: {
          spacing: { paddingY: "md" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav01-mobile-links",
            type: "navigation-menu",
            orientation: "vertical",
            showChildren: true,
            style: { spacing: { paddingBottom: "md" } },
          },
          {
            id: "nav01-mobile-actions",
            type: "flex",
            direction: "column",
            alignment: "stretch",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav01-mobile-trial",
                type: "button",
                label: "Get Started Free",
                href: "/signup",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_02_CENTERED_BRAND_SPLIT: ComponentDocument = {
  version: 2,
  id: "navbar-02-centered-brand-split",
  name: "Centered Brand Bilateral Split Header",
  kind: "navbar",
  root: {
    id: "nav02-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "lg" },
      color: { background: "background", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav02-desktop-grid",
        type: "grid",
        columns: 12,
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        children: [
          // Left Wing: Navigation Links
          {
            id: "nav02-left-wing",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xl",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav02-left-links",
                type: "navigation-menu",
                orientation: "horizontal",
                showChildren: false,
                style: {
                  typography: { size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text-muted" },
                },
              },
              {
                id: "nav02-atelier-edition",
                type: "badge",
                text: "N° 14",
                style: { typography: { size: "sm" } },
              },
            ],
          },
          // Center Wing: Brand Identity
          {
            id: "nav02-center-brand",
            type: "flex",
            direction: "column",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav02-logo-mark",
                type: "site-name",
                style: {
                  typography: { size: "2xl", weight: "bold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav02-brand-sub",
                type: "text",
                text: "ARCHITECTURAL ATELIER · PARIS",
                style: {
                  typography: { size: "sm", weight: "medium", tracking: "wide" },
                  color: { text: "text-subtle" },
                },
              },
            ],
          },
          // Right Wing: Locale & Contact
          {
            id: "nav02-right-wing",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "nav02-languages",
                type: "language-switcher",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              { openInNewTab: false,
                id: "nav02-btn-inquiry",
                type: "link",
                label: "Inquire →",
                href: "/contact",
                style: {
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                  color: { text: "text" },
                },
              },
            ],
          },
        ],
      },
      // Mobile Bar
      { gap: "md",
        id: "nav02-mobile-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
        children: [
          {
            id: "nav02-mobile-brand",
            type: "site-name",
            style: { typography: { size: "lg", weight: "bold", tracking: "wide" } },
          },
          {
            id: "nav02-mobile-toggle",
            type: "menu-toggle",
            label: "Index",
            targetId: "nav02-mobile-drawer",
            style: {
              spacing: { paddingX: "md", paddingY: "xs" },
              border: { radius: "full", width: "hairline", color: "border" },
              typography: { size: "sm", weight: "medium" },
            },
          },
        ],
      },
      // Mobile Drawer Panel
      {
        id: "nav02-mobile-drawer",
        type: "menu-panel",
        responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
        style: {
          spacing: { paddingY: "lg" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav02-drawer-links",
            type: "navigation-menu",
            orientation: "vertical",
            showChildren: false,
            style: { spacing: { paddingBottom: "md" } },
          },
          { openInNewTab: false,
            id: "nav02-drawer-contact",
            type: "link",
            label: "Request Private Dossier",
            href: "/contact",
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { text: "text" },
            },
          },
        ],
      },
    ],
  },
};

export const NAVBAR_03_FLOATING_ISLAND_DOCK: ComponentDocument = {
  version: 2,
  id: "navbar-03-floating-island-dock",
  name: "Floating Pill Island Dock",
  kind: "navbar",
  root: {
    id: "nav03-root",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "sm" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "nav03-island-capsule",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        style: {
          sizing: { maxWidth: "6xl", align: "center", width: "full" },
          spacing: { paddingX: "lg", paddingY: "xs" },
          color: { background: "surface", text: "text" },
          border: { radius: "full", width: "hairline", color: "accent", shadow: "lg" },
        },
        children: [
          // Left: Symbol Logo & Name
          {
            id: "nav03-brand-capsule",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav03-logo",
                type: "site-logo",
                style: { custom: {width: "1.75rem", height: "1.75rem"},
                  sizing: { },
                  border: { radius: "full" },
                },
              },
              {
                id: "nav03-name",
                type: "site-name",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { text: "text" },
                },
              },
              {
                id: "nav03-status-pill",
                type: "badge",
                text: "v2.4",
                style: {
                  border: { radius: "full" },
                  typography: { size: "sm", weight: "bold" },
                },
              },
            ],
          },
          // Center: Pill Links
          {
            id: "nav03-menu-capsule",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: false,
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            style: {
              typography: { size: "sm", weight: "medium" },
              color: { text: "text-muted" },
              spacing: { paddingX: "sm" },
            },
          },
          // Right: Action Capsule
          {
            id: "nav03-action-capsule",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav03-btn-launch",
                type: "button",
                label: "Launch App",
                href: "/app",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full", shadow: "sm" },
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_04_DEVELOPER_TERMINAL_STRIP: ComponentDocument = {
  version: 2,
  id: "navbar-04-developer-terminal-strip",
  name: "Monospace DevTerminal Status Bar",
  kind: "navbar",
  root: {
    id: "nav04-root",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "xs" },
      color: { background: "surface-sunken", text: "inverse" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav04-terminal-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "md",
        children: [
          // Left: CLI Path & Status Ping
          {
            id: "nav04-left-cli",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav04-prompt-prefix",
                type: "badge",
                text: "~ ozmi/core",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  border: { radius: "sm" },
                },
              },
              {
                id: "nav04-status-ping",
                type: "badge",
                text: "● 99.99% operational",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "nav04-breadcrumb-path",
                type: "text",
                text: "docs / api / v3.1",
                responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { text: "text-muted" },
                },
              },
            ],
          },
          // Center: Monospace Navigation
          {
            id: "nav04-center-nav",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: false,
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            style: {
              typography: { size: "sm", weight: "medium" },
              color: { text: "inverse-muted" },
            },
          },
          // Right: Dev Tools (Cmd+K & Stars)
          {
            id: "nav04-right-tools",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav04-cmd-k-badge",
                type: "badge",
                text: "Search  ⌘K",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  spacing: { paddingX: "sm", paddingY: "none" },
                  border: { radius: "sm", width: "hairline" },
                },
              },
              { openInNewTab: false,
                id: "nav04-btn-github",
                type: "link",
                label: "★ 14.8k on GitHub",
                href: "https://github.com/ozmishow",
                style: {
                  typography: { size: "sm", weight: "semibold" },
                  color: { text: "accent" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const NAVBAR_05_ENTERPRISE_DUAL_TIER: ComponentDocument = {
  version: 2,
  id: "navbar-05-enterprise-dual-tier",
  name: "Enterprise Dual-Tier Utility Header",
  kind: "navbar",
  root: {
    id: "nav05-root",
    type: "section",
    style: {
      spacing: { paddingX: "none", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      // Top Tier: Utility Strip
      { gap: "md",
        id: "nav05-top-utility-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        style: {
          spacing: { paddingX: "xl", paddingY: "xs" },
          color: { background: "surface-muted", text: "text-muted" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          // Left: Compliance & Global Region
          {
            id: "nav05-utility-left",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav05-soc2-badge",
                type: "badge",
                text: "SOC-2 Type II Certified",
                style: { typography: { size: "sm", weight: "bold" } },
              },
              {
                id: "nav05-region-select",
                type: "text",
                text: "Global Cloud Region: US-East & EU-Central",
                style: { typography: { size: "sm" }, color: { text: "text-subtle" } },
              },
            ],
          },
          // Right: Telephone & Customer Portal
          {
            id: "nav05-utility-right",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "lg",
            children: [
              { openInNewTab: false,
                id: "nav05-phone-link",
                type: "link",
                label: "24/7 Enterprise Support: +1 (800) 555-0199",
                href: "tel:+18005550199",
                style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
              },
              { openInNewTab: false,
                id: "nav05-portal-login",
                type: "link",
                label: "Client Portal Login →",
                href: "/portal",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
              },
            ],
          },
        ],
      },
      // Bottom Tier: Primary Enterprise Navigation Bar
      { gap: "md",
        id: "nav05-bottom-primary-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        style: {
          spacing: { paddingX: "xl", paddingY: "md" },
        },
        children: [
          // Brand + Sub-Brand Descriptor
          {
            id: "nav05-brand-combo",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav05-logo", type: "site-logo", style: { custom: {width: "2.25rem", height: "2.25rem"}, sizing: { } } },
              { gap: "md",
                id: "nav05-brand-names",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                children: [
                  { id: "nav05-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" } } },
                  {
                    id: "nav05-division",
                    type: "text",
                    text: "ENTERPRISE CLOUD PLATFORM",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-subtle" } },
                  },
                ],
              },
            ],
          },
          // Mega-Menu Category Navigation
          {
            id: "nav05-primary-nav",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "text" },
            },
          },
          // Primary CTAs
          {
            id: "nav05-ctas",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav05-btn-sales",
                type: "button",
                label: "Talk to Sales",
                href: "/sales",
                style: {
                  border: { radius: "md", width: "hairline", color: "border" },
                  typography: { size: "sm", weight: "semibold" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "nav05-btn-demo",
                type: "button",
                label: "Schedule Briefing",
                href: "/demo",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md", shadow: "sm" },
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

export const CURATED_NAVBAR_BATCH_1: ComponentDocument[] = [
  NAVBAR_01_CLASSIC_SAAS_BALANCED,
  NAVBAR_02_CENTERED_BRAND_SPLIT,
  NAVBAR_03_FLOATING_ISLAND_DOCK,
  NAVBAR_04_DEVELOPER_TERMINAL_STRIP,
  NAVBAR_05_ENTERPRISE_DUAL_TIER,
];

