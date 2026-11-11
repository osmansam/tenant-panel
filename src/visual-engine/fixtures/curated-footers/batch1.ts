import type { ComponentDocument } from "../../model";

/**
 * BATCH 1 CURATED FOOTER TEMPLATES
 *
 * #01: Classic 5-Column SaaS Enterprise Footer (footer-01-classic-saas-columns)
 * #02: Minimalist Monoline Centered Footer (footer-02-minimalist-monoline-center)
 * #03: Mobile App Direct Download Deck (footer-03-mobile-app-storefront)
 * #04: Monospace Terminal Dev Status Deck (footer-04-developer-terminal-deck)
 * #05: Enterprise Mega-Footer & Compliance Matrix (footer-05-enterprise-legal-matrix)
 */

export const FOOTER_01_CLASSIC_SAAS_COLUMNS: ComponentDocument = {
  version: 2,
  id: "footer-01-classic-saas-columns",
  name: "Classic 5-Column SaaS Enterprise Footer",
  kind: "footer",
  root: {
    id: "foot01-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Main 5-Column Layout Grid
      {
        id: "foot01-grid",
        type: "grid",
        columns: 12,
        children: [
          // Col 1 & 2 (Span 4): Brand, Value Proposition & Newsletter
          {
            id: "foot01-brand-col",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot01-brand-header",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "foot01-logo",
                    type: "site-logo",
                    style: { color: { background: "primary" }, border: { radius: "md" } },
                  },
                  {
                    id: "foot01-name",
                    type: "site-name",
                    style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                  },
                ],
              },
              {
                id: "foot01-mission",
                type: "text",
                text: "Next-generation analytics infrastructure powering mission-critical workflows across 10,000+ high-growth teams worldwide.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
              // Newsletter Mini Lead-Magnet Card
              {
                id: "foot01-nl-box",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "xs",
                style: {
                  spacing: { padding: "xs" },
                  color: { background: "surface", text: "text" },
                  border: { width: "hairline", color: "border", radius: "md" },
                },
                children: [
                  { label: "Enter work email...", href: "/contact", openInNewTab: false,
                    id: "foot01-nl-input",
                    type: "link",
                    style: {
                      typography: { size: "sm", weight: "normal" },
                      color: { background: "surface", text: "text" },
                    },
                  },
                  {
                    id: "foot01-nl-btn",
                    type: "button",
                    label: "Subscribe",
                    style: {
                      typography: { size: "sm", weight: "bold" },
                      color: { background: "primary", text: "primary-foreground" },
                    },
                  },
                ],
              },
            ],
          },

          // Col 2 (Span 2): Product
          {
            id: "foot01-col-product",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 3, row: 2, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot01-hdr-product",
                type: "text",
                text: "PRODUCT",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot01-link-features", type: "link", href: "#features", label: "Core Features", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-realtime", type: "link", href: "#realtime", label: "Real-time Engine", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-integrations", type: "link", href: "#integrations", label: "Integrations (140+)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-changelog", type: "link", href: "#changelog", label: "Changelog v4.2", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-roadmap", type: "link", href: "#roadmap", label: "Public Roadmap", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 3 (Span 2): Developers
          {
            id: "foot01-col-dev",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 4, columnSpan: 3, row: 2, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot01-hdr-dev",
                type: "text",
                text: "DEVELOPERS",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot01-link-docs", type: "link", href: "#docs", label: "Documentation", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-api", type: "link", href: "#api", label: "REST & GraphQL API", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-sdks", type: "link", href: "#sdks", label: "Client SDKs", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-github", type: "link", href: "#github", label: "GitHub Repositories", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-cli", type: "link", href: "#cli", label: "CLI Tooling", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 4 (Span 2): Resources
          {
            id: "foot01-col-res",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 3, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 3, row: 2, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot01-hdr-res",
                type: "text",
                text: "RESOURCES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot01-link-guides", type: "link", href: "#guides", label: "Tutorials & Guides", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-cases", type: "link", href: "#cases", label: "Customer Stories", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-webinars", type: "link", href: "#webinars", label: "Live Masterclasses", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-bench", type: "link", href: "#benchmarks", label: "Performance Benchmarks", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-comm", type: "link", href: "#community", label: "Discord Community", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 5 (Span 2): Legal & Trust
          {
            id: "foot01-col-legal",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 3, rowSpan: 1 },
                tablet: { column: 10, columnSpan: 3, row: 2, rowSpan: 1 },
                desktop: { column: 11, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot01-hdr-trust",
                type: "text",
                text: "TRUST & COMPLIANCE",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              { openInNewTab: false, id: "foot01-link-security", type: "link", href: "#security", label: "SOC2 Type II Report", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-privacy", type: "link", href: "#privacy", label: "Privacy Policy", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-terms", type: "link", href: "#terms", label: "Terms of Service", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot01-link-gdpr", type: "link", href: "#gdpr", label: "GDPR DPA Addendum", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              {
                id: "foot01-badge-soc2",
                type: "badge",
                text: "🔒 SOC2 CERTIFIED",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" }, border: { width: "hairline", color: "border" } },
              },
            ],
          },
        ],
      },

      // Bottom Bar: Copyright & Compliance Badges
      {
        id: "foot01-bottom-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingTop: "xl", marginTop: "xl" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot01-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot01-ssl-badge",
            type: "badge",
            text: "ISO 27001 · 99.99% UPTIME SLA GUARANTEED",
            style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface-muted", text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_02_MINIMALIST_MONOLINE_CENTER: ComponentDocument = {
  version: 2,
  id: "footer-02-minimalist-monoline-center",
  name: "Minimalist Monoline Centered Footer",
  kind: "footer",
  root: {
    id: "foot02-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "lg" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "foot02-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "lg",
        children: [
          // Left: Monogram Mark & Brand Name
          {
            id: "foot02-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "foot02-mark",
                type: "badge",
                text: "✦",
                style: {
                  typography: { size: "base", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full" },
                },
              },
              {
                id: "foot02-name",
                type: "site-name",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot02-copy",
                type: "copyright",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Center: Inline Bullet Links
          {
            id: "foot02-links-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "lg",
            children: [
              { openInNewTab: false, id: "foot02-link-work", type: "link", href: "#work", label: "Selected Work", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot02-link-manifesto", type: "link", href: "#manifesto", label: "Studio Manifesto", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot02-link-journal", type: "link", href: "#journal", label: "Journal", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot02-link-privacy", type: "link", href: "#privacy", label: "Privacy", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Right: Back to Top Floating Anchor
          { openInNewTab: false,
            id: "foot02-top-anchor",
            type: "link",
            href: "#top",
            label: "Back to top ↑",
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "text-muted" },
            },
          },
        ],
      },
    ],
  },
};

export const FOOTER_03_MOBILE_APP_STOREFRONT: ComponentDocument = {
  version: 2,
  id: "footer-03-mobile-app-storefront",
  name: "Mobile App Direct Download Deck",
  kind: "footer",
  root: {
    id: "foot03-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border", shadow: "md" },
    },
    children: [
      {
        id: "foot03-grid-deck",
        type: "grid",
        columns: 12,
        children: [
          // Left: App Mascot, Tagline & Rating
          {
            id: "foot03-left-col",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot03-brand-row",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "foot03-app-icon",
                    type: "site-logo",
                    style: { color: { background: "primary" }, border: { radius: "lg" } },
                  },
                  {
                    id: "foot03-app-name",
                    type: "site-name",
                    style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                  },
                ],
              },
              {
                id: "foot03-tagline",
                type: "text",
                text: "Everything in one pocket. Track assets, send borderless payments in seconds, and stay in control of your financial destiny.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
              {
                id: "foot03-rating-badge",
                type: "badge",
                text: "★★★★★ 4.9 OUT OF 5 (214K+ REVIEWS)",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" }, border: { radius: "full" } },
              },
            ],
          },

          // Center: Pill Tag Cloud Feature Links
          {
            id: "foot03-center-cloud",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 6, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot03-features-title",
                type: "text",
                text: "POPULAR IN-APP FEATURES",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot03-pill-tags",
                type: "flex",
                direction: "row",
                alignment: "start",
                distribution: "start",
                wrap: true,
                gap: "xs",
                children: [
                  { id: "foot03-tag-cards", type: "badge", text: "Virtual Cards", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                  { id: "foot03-tag-crypto", type: "badge", text: "Multi-Currency", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                  { id: "foot03-tag-budget", type: "badge", text: "Smart Budgets", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                  { id: "foot03-tag-rewards", type: "badge", text: "3% Cash Back", style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" } } },
                  { id: "foot03-tag-split", type: "badge", text: "Bill Split", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                ],
              },
            ],
          },

          // Right: Official Store Badges & QR Trigger
          {
            id: "foot03-right-download",
            type: "flex",
            direction: "column",
            alignment: "end",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot03-store-title",
                type: "text",
                text: "DOWNLOAD COMPANION APP",
                style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot03-app-store-btn",
                type: "button",
                label: " Download on App Store",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" }, border: { radius: "md" } },
              },
              {
                id: "foot03-play-store-btn",
                type: "button",
                label: "▶ Get it on Google Play",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text", background: "surface" }, border: { width: "thin", color: "border", radius: "md" } },
              },
              {
                id: "foot03-qr-pill",
                type: "badge",
                text: "📱 Scan QR Code to Install Instantly",
                style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface-muted", text: "text-muted" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_04_DEVELOPER_TERMINAL_DECK: ComponentDocument = {
  version: 2,
  id: "footer-04-developer-terminal-deck",
  name: "Monospace Terminal Dev Status Deck",
  kind: "footer",
  root: {
    id: "foot04-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "md" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot04-rail-grid",
        type: "grid",
        columns: 12,
        children: [
          // Left: Monospace Command Prompt Brand & Status
          {
            id: "foot04-prompt-col",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot04-ping-badge",
                type: "badge",
                text: "● SYSTEM HEALTHY",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" }, border: { width: "hairline", color: "border" } },
              },
              {
                id: "foot04-prompt-text",
                type: "text",
                text: "engine@v4.8.2:~ $ git commit -m 'deploy'",
                style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Center: Quick Monospace Path Links
          {
            id: "foot04-path-links",
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
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 6, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { openInNewTab: false, id: "foot04-lnk-specs", type: "link", href: "#specs", label: "specs.json", style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot04-lnk-status", type: "link", href: "#status", label: "status.log", style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot04-lnk-cve", type: "link", href: "#cve", label: "security.txt", style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot04-lnk-license", type: "link", href: "#license", label: "LICENSE.md", style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } } },
            ],
          },

          // Right: Monospace CLI Quick-Copy Command
          {
            id: "foot04-install-cmd",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot04-cmd-badge",
                type: "badge",
                text: "npm i -g @engine/cli",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" }, border: { width: "hairline", color: "border" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_05_ENTERPRISE_LEGAL_MATRIX: ComponentDocument = {
  version: 2,
  id: "footer-05-enterprise-legal-matrix",
  name: "Enterprise Mega-Footer & Compliance Matrix",
  kind: "footer",
  root: {
    id: "foot05-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Tier: Global Entity Notice & International Locale Picker
      {
        id: "foot05-top-tier",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingBottom: "lg", marginBottom: "xl" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot05-holding-notice",
            type: "text",
            text: "GLOBEX AEROSPACE & INFRASTRUCTURE GROUP · NYSE: GBX · EDGAR CIK: 0001894210",
            style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
          },
          {
            id: "foot05-locale-select",
            type: "language-switcher",
            style: { color: { text: "text", background: "surface" } },
          },
        ],
      },

      // Middle: 6-Column Deep Index Matrix
      {
        id: "foot05-sitemap-grid",
        type: "grid",
        columns: 12,
        children: [
          // Col 1 (Span 2): Defense Systems
          {
            id: "foot05-col-defense",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot05-h-def", type: "text", text: "AEROSPACE", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot05-l-sat", type: "link", href: "#satellite", label: "Orbital Satellites", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-prop", type: "link", href: "#propulsion", label: "Cryogenic Propulsion", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-nav", type: "link", href: "#avionics", label: "Guidance Avionics", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 2 (Span 2): Energy
          {
            id: "foot05-col-energy",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 3, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot05-h-energy", type: "text", text: "CLEAN ENERGY", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot05-l-grid", type: "link", href: "#grid", label: "Next-Gen Microgrids", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-fusion", type: "link", href: "#fusion", label: "Compact Fusion", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-storage", type: "link", href: "#storage", label: "Battery Storage", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 3 (Span 2): Government Solutions
          {
            id: "foot05-col-gov",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot05-h-gov", type: "text", text: "GOVERNMENT", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot05-l-proc", type: "link", href: "#gsa", label: "GSA Schedule 70", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-clear", type: "link", href: "#fedramp", label: "FedRAMP High Auth", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-cmmc", type: "link", href: "#cmmc", label: "CMMC 2.0 Compliance", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 4 (Span 2): Investors
          {
            id: "foot05-col-invest",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 2, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot05-h-inv", type: "text", text: "INVESTORS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot05-l-sec", type: "link", href: "#sec", label: "SEC Filings 10-K", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-earn", type: "link", href: "#earnings", label: "Quarterly Earnings", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-esg", type: "link", href: "#esg", label: "ESG Sustainability", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 5 (Span 2): Careers
          {
            id: "foot05-col-career",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 3, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 2, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot05-h-car", type: "text", text: "CAREERS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot05-l-open", type: "link", href: "#openings", label: "Open Requisitions", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-vet", type: "link", href: "#veterans", label: "Military Veterans", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-intern", type: "link", href: "#fellows", label: "Research Fellows", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 6 (Span 2): Legal Notices
          {
            id: "foot05-col-notices",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 3, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 2, rowSpan: 1 },
                desktop: { column: 11, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot05-h-legal", type: "text", text: "LEGAL NOTICES", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot05-l-itar", type: "link", href: "#itar", label: "ITAR Regulations", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-whistle", type: "link", href: "#ethics", label: "Ethics Hotline", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot05-l-export", type: "link", href: "#export", label: "Export Compliance", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Disclaimer & Seals
      {
        id: "foot05-bottom-legal",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingTop: "lg", marginTop: "xl" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot05-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot05-seals",
            type: "badge",
            text: "EQUAL OPPORTUNITY EMPLOYER · ITAR REGISTERED · DOD SECURE",
            style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const CURATED_FOOTER_BATCH_1: ComponentDocument[] = [
  FOOTER_01_CLASSIC_SAAS_COLUMNS,
  FOOTER_02_MINIMALIST_MONOLINE_CENTER,
  FOOTER_03_MOBILE_APP_STOREFRONT,
  FOOTER_04_DEVELOPER_TERMINAL_DECK,
  FOOTER_05_ENTERPRISE_LEGAL_MATRIX,
];

