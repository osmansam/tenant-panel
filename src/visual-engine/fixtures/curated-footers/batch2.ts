import type { ComponentDocument } from "../../model";

/**
 * BATCH 2 CURATED FOOTER TEMPLATES
 *
 * #06: E-Commerce Retail Trust & Payment Ledger (footer-06-ecommerce-retail-ledger)
 * #07: Editorial Broadsheet Masthead Archive (footer-07-editorial-broadsheet-archive)
 * #08: Luxury Atelier Negative Space Split (footer-08-luxury-atelier-split)
 * #09: Dedicated Newsletter Lead-Magnet Anchor (footer-09-newsletter-lead-magnet)
 * #10: B-Corp Impact Sustainability Ledger (footer-10-bcorp-sustainability-ledger)
 */

export const FOOTER_06_ECOMMERCE_RETAIL_LEDGER: ComponentDocument = {
  version: 2,
  id: "footer-06-ecommerce-retail-ledger",
  name: "E-Commerce Retail Trust & Payment Ledger",
  kind: "footer",
  root: {
    id: "foot06-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Tier: Promotional Newsletter Incentive Strip
      {
        id: "foot06-top-incentive",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "lg",
        style: {
          spacing: { paddingBottom: "xl", marginBottom: "xl" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot06-promo-copy",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            children: [
              {
                id: "foot06-promo-h",
                type: "text",
                text: "JOIN THE INNER CIRCLE · GET 15% OFF YOUR FIRST ORDER",
                style: { typography: { size: "base", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot06-promo-sub",
                type: "text",
                text: "Be the first to know about seasonal collection drops, private archive sales, and VIP events.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "foot06-promo-form",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            children: [
              { label: "Your email address...", href: "/contact", openInNewTab: false,
                id: "foot06-email-input",
                type: "link",
                style: {
                  typography: { size: "sm", weight: "normal" },
                  color: { background: "surface", text: "text" },
                  border: { width: "thin", color: "border" },
                },
              },
              {
                id: "foot06-claim-btn",
                type: "button",
                label: "Claim 15% Off",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "primary", text: "primary-foreground" },
                },
              },
            ],
          },
        ],
      },

      // Middle Tier: 4-Column Retail Links Grid
      {
        id: "foot06-cols-grid",
        type: "grid",
        columns: 12,
        children: [
          // Col 1 (Span 3): Customer Care
          {
            id: "foot06-col-care",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot06-h-care", type: "text", text: "CUSTOMER CARE", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot06-l-track", type: "link", href: "#track", label: "Track My Shipment", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-returns", type: "link", href: "#returns", label: "Returns & Exchanges", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-faq", type: "link", href: "#faq", label: "Shipping FAQ", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-size", type: "link", href: "#sizing", label: "Interactive Size Guide", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 2 (Span 3): Collections
          {
            id: "foot06-col-colls",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot06-h-colls", type: "text", text: "COLLECTIONS", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot06-l-new", type: "link", href: "#new", label: "New Arrivals Autumn 26", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-mens", type: "link", href: "#mens", label: "Men's Outerwear", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-womens", type: "link", href: "#womens", label: "Women's Knitwear", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-collab", type: "link", href: "#collab", label: "Artisan Collaborations", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 3 (Span 3): Stores & Atelier
          {
            id: "foot06-col-stores",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot06-h-stores", type: "text", text: "STORES & FLAGSHIPS", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot06-l-nyc", type: "link", href: "#soho", label: "New York · SoHo Flagship", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-tokyo", type: "link", href: "#ginza", label: "Tokyo · Ginza 6", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-paris", type: "link", href: "#marais", label: "Paris · Le Marais", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-appts", type: "link", href: "#appointments", label: "Book Private Fitting", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 4 (Span 3): Sustainability & Trust
          {
            id: "foot06-col-trust",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot06-h-trust", type: "text", text: "ETHICAL PRACTICES", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot06-l-trace", type: "link", href: "#trace", label: "100% Traceable Wool", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-repair", type: "link", href: "#repair", label: "Lifetime Repair Guarantee", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot06-l-recycled", type: "link", href: "#circular", label: "Circular Trade-In", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { id: "foot06-l-cert", type: "badge", text: "CERTIFIED B-CORP", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },

      // Bottom Payment Gateways & Copyright
      {
        id: "foot06-bottom-bar",
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
            id: "foot06-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot06-payments",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "xs",
            children: [
              { id: "foot06-pay-visa", type: "badge", text: "VISA", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
              { id: "foot06-pay-mc", type: "badge", text: "MASTERCARD", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
              { id: "foot06-pay-amex", type: "badge", text: "AMEX", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
              { id: "foot06-pay-apple", type: "badge", text: "PAY", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_07_EDITORIAL_BROADSHEET_ARCHIVE: ComponentDocument = {
  version: 2,
  id: "footer-07-editorial-broadsheet-archive",
  name: "Editorial Broadsheet Masthead Archive",
  kind: "footer",
  root: {
    id: "foot07-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Inverted Broadsheet Crest
      {
        id: "foot07-masthead-crest",
        type: "flex",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "xs",
        style: {
          spacing: { paddingBottom: "lg", marginBottom: "lg" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot07-paper-name",
            type: "site-name",
            style: { typography: { size: "2xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
          },
          {
            id: "foot07-motto",
            type: "text",
            text: "FOUNDED 1886 · INDEPENDENT JOURNALISM · PRINT & DIGITAL EDITION",
            style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "text-muted" } },
          },
        ],
      },

      // Middle: Topic Bureau Directory Grid
      {
        id: "foot07-bureaus-grid",
        type: "grid",
        columns: 12,
        children: [
          // News Bureaus
          {
            id: "foot07-col-news",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot07-h-news", type: "text", text: "NEWS BUREAUS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot07-l-world", type: "link", href: "#world", label: "International Affairs", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-econ", type: "link", href: "#econ", label: "Global Economics", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-tech", type: "link", href: "#tech", label: "Technology & AI", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },

          // Opinions & Analysis
          {
            id: "foot07-col-op",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot07-h-op", type: "text", text: "OPINION & ESSAYS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot07-l-ed", type: "link", href: "#editorial", label: "The Editorial Board", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-column", type: "link", href: "#columnists", label: "Guest Columnists", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-letters", type: "link", href: "#letters", label: "Letters to the Editor", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },

          // Archives & Standards
          {
            id: "foot07-col-archive",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot07-h-arch", type: "text", text: "ARCHIVES & INTEGRITY", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot07-l-1886", type: "link", href: "#history", label: "1886–Present Archive", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-ethics", type: "link", href: "#standards", label: "Code of Ethics", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-corrections", type: "link", href: "#corrections", label: "Corrections Ledger", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },

          // Print Subscriptions & Syndication
          {
            id: "foot07-col-sub",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot07-h-sub", type: "text", text: "SUBSCRIBE & RSS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot07-l-print", type: "link", href: "#print", label: "Home Delivery Print", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-rss", type: "link", href: "#rss", label: "Full RSS Feed XML", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot07-l-reprints", type: "link", href: "#reprints", label: "Permissions & Reprints", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Bar: Dual Timezone Clocks & Copyright
      {
        id: "foot07-clocks-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingTop: "lg", marginTop: "lg" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot07-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot07-clocks",
            type: "text",
            text: "LONDON 14:42 GMT · NEW YORK 09:42 EST · TOKYO 23:42 JST",
            style: { typography: { size: "sm", weight: "medium", tracking: "wide" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_08_LUXURY_ATELIER_SPLIT: ComponentDocument = {
  version: 2,
  id: "footer-08-luxury-atelier-split",
  name: "Luxury Atelier Negative Space Split",
  kind: "footer",
  root: {
    id: "foot08-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "foot08-split-row",
        type: "grid",
        columns: 12,
        children: [
          // Left Wing: High-Couture Wordmark & Salon Inquiries
          {
            id: "foot08-left-wing",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "between",
            wrap: false,
            gap: "xl",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot08-atelier-name",
                type: "site-name",
                style: { typography: { size: "2xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot08-salon-card",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  { id: "foot08-salon-city", type: "text", text: "PARIS · PLACE VENDÔME", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
                  { id: "foot08-salon-desc", type: "text", text: "By appointment only. Private haute horlogerie commissions and bespoke leather goods.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
                  { id: "foot08-concierge-btn", type: "button", label: "Request Private Salon Invitation →", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text", background: "surface" } } },
                ],
              },
              {
                id: "foot08-copy",
                type: "copyright",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Right Wing: Spaced-Caps Minimal Navigation & Social Icons
          {
            id: "foot08-right-wing",
            type: "flex",
            direction: "column",
            alignment: "end",
            distribution: "between",
            wrap: false,
            gap: "xl",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot08-nav-links",
                type: "flex",
                direction: "column",
                alignment: "end",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  { openInNewTab: false, id: "foot08-lnk-bespoke", type: "link", href: "#bespoke", label: "BESPOKE COMMISSIONS", style: { typography: { size: "sm", weight: "medium", tracking: "wide" }, color: { text: "text" } } },
                  { openInNewTab: false, id: "foot08-lnk-heritage", type: "link", href: "#heritage", label: "THE ATELIER HERITAGE", style: { typography: { size: "sm", weight: "medium", tracking: "wide" }, color: { text: "text" } } },
                  { openInNewTab: false, id: "foot08-lnk-archive", type: "link", href: "#archive", label: "HISTORICAL ARCHIVE", style: { typography: { size: "sm", weight: "medium", tracking: "wide" }, color: { text: "text" } } },
                  { openInNewTab: false, id: "foot08-lnk-legal", type: "link", href: "#legal", label: "LEGAL & AUTHENTICITY", style: { typography: { size: "sm", weight: "medium", tracking: "wide" }, color: { text: "text-muted" } } },
                ],
              },
              {
                id: "foot08-social-dock",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "end",
                wrap: false,
                gap: "sm",
                children: [
                  { id: "foot08-soc-ig", type: "badge", text: "INSTAGRAM", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
                  { id: "foot08-soc-wb", type: "badge", text: "WEIBO", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_09_NEWSLETTER_LEAD_MAGNET: ComponentDocument = {
  version: 2,
  id: "footer-09-newsletter-lead-magnet",
  name: "Dedicated Newsletter Lead-Magnet Anchor",
  kind: "footer",
  root: {
    id: "foot09-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Lead-Magnet Hero Card
      {
        id: "foot09-lead-card",
        type: "flex",
        direction: "column",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "md",
        style: {
          spacing: { padding: "xl" },
          color: { background: "primary", text: "primary-foreground" },
          border: { radius: "xl", shadow: "lg" },
        },
        children: [
          {
            id: "foot09-sub-pill",
            type: "badge",
            text: "WEEKLY INTEL FOR 45,000+ TECH FOUNDERS",
            style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" }, border: { radius: "full" } },
          },
          {
            id: "foot09-card-h",
            type: "text",
            text: "Supercharge your strategic decisions every Sunday morning.",
            style: { typography: { size: "xl", weight: "bold" }, color: { text: "primary-foreground" } },
          },
          {
            id: "foot09-input-row",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "sm",
            children: [
              { label: "name@company.com", href: "/contact", openInNewTab: false,
                id: "foot09-email-in",
                type: "link",
                style: {
                  typography: { size: "sm", weight: "medium" },
                  color: { background: "surface", text: "text" },
                  border: { radius: "full" },
                },
              },
              {
                id: "foot09-sub-btn",
                type: "button",
                label: "Subscribe for Free →",
                style: {
                  typography: { size: "sm", weight: "bold" },
                  color: { background: "surface", text: "text" },
                  border: { radius: "full" },
                },
              },
            ],
          },
        ],
      },

      // Bottom Row: Brand Wings, Topic Pills & Copyright
      {
        id: "foot09-bottom-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "lg",
        style: {
          spacing: { paddingTop: "xl", marginTop: "xl" },
        },
        children: [
          {
            id: "foot09-brand-wing",
            type: "site-name",
            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
          },
          {
            id: "foot09-topics",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: true,
            gap: "sm",
            children: [
              { openInNewTab: false, id: "foot09-tp-ai", type: "link", href: "#ai", label: "#ArtificialIntelligence", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot09-tp-vc", type: "link", href: "#vc", label: "#VentureCapital", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot09-tp-growth", type: "link", href: "#growth", label: "#SaaSMetrics", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
          {
            id: "foot09-bcorp-seal",
            type: "badge",
            text: "🌿 100% SPAM-FREE · ONE-CLICK UNSUBSCRIBE",
            style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_10_BCORP_SUSTAINABILITY_LEDGER: ComponentDocument = {
  version: 2,
  id: "footer-10-bcorp-sustainability-ledger",
  name: "B-Corp Impact Sustainability Ledger",
  kind: "footer",
  root: {
    id: "foot10-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot10-tri-grid",
        type: "grid",
        columns: 12,
        children: [
          // Col 1: Carbon Offset Status
          {
            id: "foot10-col-carbon",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot10-carbon-h", type: "text", text: "CLIMATE POSITIVE IMPACT", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { id: "foot10-carbon-p", type: "text", text: "Net-zero emissions across Scopes 1, 2, and 3 certified through Gold Standard verified offsets.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { id: "foot10-carbon-badge", type: "badge", text: "🌱 -12,480 TONS CO2e RETIRED", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } } },
            ],
          },

          // Col 2: Labor & Supply Chain Ethics
          {
            id: "foot10-col-labor",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
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
              { id: "foot10-labor-h", type: "text", text: "SUPPLY CHAIN TRANSPARENCY", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { id: "foot10-labor-p", type: "text", text: "100% Living Wage guaranteed across all primary manufacturing partners in 14 countries.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot10-labor-link", type: "link", href: "#audit", label: "Download 2026 Audit Report (PDF) →", style: { typography: { size: "sm", weight: "semibold" }, color: { text: "primary" } } },
            ],
          },

          // Col 3: Anonymous Whistleblower Hotline
          {
            id: "foot10-col-hotline",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot10-hotline-h", type: "text", text: "ETHICS & WHISTLEBLOWER LINE", style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text" } } },
              { id: "foot10-hotline-p", type: "text", text: "Confidential 24/7 reporting line operated by independent third-party ombudsman.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              { id: "foot10-hotline-badge", type: "badge", text: "📞 1-800-555-ETHIC (TOLL-FREE)", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot10-bot-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { paddingTop: "lg", marginTop: "lg" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot10-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot10-legal-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "md",
            children: [
              { openInNewTab: false, id: "foot10-l-bylaws", type: "link", href: "#bylaws", label: "Benefit Corp Bylaws", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot10-l-privacy", type: "link", href: "#privacy", label: "Privacy Standards", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_FOOTER_BATCH_2: ComponentDocument[] = [
  FOOTER_06_ECOMMERCE_RETAIL_LEDGER,
  FOOTER_07_EDITORIAL_BROADSHEET_ARCHIVE,
  FOOTER_08_LUXURY_ATELIER_SPLIT,
  FOOTER_09_NEWSLETTER_LEAD_MAGNET,
  FOOTER_10_BCORP_SUSTAINABILITY_LEDGER,
];

