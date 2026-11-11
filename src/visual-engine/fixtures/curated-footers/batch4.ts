import type { ComponentDocument } from "../../model";

/**
 * BATCH 4 CURATED FOOTER TEMPLATES
 *
 * #16: Hospitality & Dining Concierge Footer (footer-16-hospitality-dining-concierge)
 * #17: PropTech Real Estate MLS Disclosures Footer (footer-17-proptech-brokerage-disclosures)
 * #18: Creator Podcast Network Player Footer (footer-18-creator-podcast-network)
 * #19: Non-Profit Foundation 501(c)(3) Ledger (footer-19-nonprofit-charity-ledger)
 * #20: Multi-Brand Holding Ecosystem Deck (footer-20-multibrand-ecosystem-deck)
 */

export const FOOTER_16_HOSPITALITY_DINING_CONCIERGE: ComponentDocument = {
  version: 2,
  id: "footer-16-hospitality-dining-concierge",
  name: "Hospitality & Dining Concierge Footer",
  kind: "footer",
  root: {
    id: "foot16-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot16-split-row",
        type: "grid",
        columns: 12,
        children: [
          // Left: Michelin Stars Crest & Hours
          {
            id: "foot16-col-crest",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot16-dining-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold", tracking: "wide" }, color: { text: "text" } },
              },
              {
                id: "foot16-michelin-stars",
                type: "badge",
                text: "★★★ THREE MICHELIN STARS · RELAIS & CHÂTEAUX",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } },
              },
              {
                id: "foot16-hours",
                type: "text",
                text: "Dinner: Tuesday – Saturday 17:30 – 23:00 · Cellar Tasting: 16:00 – 18:00",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
              {
                id: "foot16-address",
                type: "text",
                text: "42 Rue de l'Université, 75007 Paris · Concierge: +33 1 42 68 55 00",
                style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Center: Bullet Navigation Links
          {
            id: "foot16-col-links",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                desktop: { column: 6, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { openInNewTab: false, id: "foot16-l-menus", type: "link", href: "#menus", label: "Autumn Tasting Menus & Pairings", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot16-l-cellar", type: "link", href: "#cellar", label: "Private Reserve Wine Cellar", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot16-l-events", type: "link", href: "#private", label: "Private Dining Salon (Up to 18 Guests)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
              { id: "foot16-l-dress", type: "text", text: "Dress Code: Business Elegant · Valet Parking Available", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },

          // Right: Reservation Booking CTA
          {
            id: "foot16-col-reserve",
            type: "flex",
            direction: "column",
            alignment: "end",
            distribution: "center",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot16-reserve-btn",
                type: "button",
                label: "Reserve Table (SevenRooms) →",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" } },
              },
              {
                id: "foot16-cancellation",
                type: "text",
                text: "48-Hour Cancellation Policy Applies",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_17_PROPTECH_BROKERAGE_DISCLOSURES: ComponentDocument = {
  version: 2,
  id: "footer-17-proptech-brokerage-disclosures",
  name: "PropTech Real Estate MLS Disclosures Footer",
  kind: "footer",
  root: {
    id: "foot17-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Tier: Exclusive Off-Market Lead Magnet Strip
      {
        id: "foot17-offmarket-strip",
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
            id: "foot17-strip-text",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "none",
            children: [
              { id: "foot17-strip-h", type: "text", text: "ACCESS UNLISTED & PRIVATE POCKET LISTINGS", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
              { id: "foot17-strip-p", type: "text", text: "Receive verified luxury estates before public MLS syndication across Aspen, Manhattan, and Beverly Hills.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },
          {
            id: "foot17-strip-form",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "xs",
            children: [
              { label: "Enter client email...", href: "/contact", openInNewTab: false,
                id: "foot17-strip-in",
                type: "link",
                style: { typography: { size: "sm", weight: "normal" }, color: { background: "surface", text: "text" }, border: { width: "thin", color: "border" } },
              },
              {
                id: "foot17-strip-btn",
                type: "button",
                label: "Request Access",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" } },
              },
            ],
          },
        ],
      },

      // Middle: Prime Market Columns
      {
        id: "foot17-markets-grid",
        type: "grid",
        columns: 12,
        children: [
          // Markets
          {
            id: "foot17-col-ny",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot17-h-ny", type: "text", text: "GREATER NEW YORK", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot17-l-tribeca", type: "link", href: "#tribeca", label: "Tribeca & SoHo Lofts", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-cpw", type: "link", href: "#cpw", label: "Central Park West Penthouses", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-hamptons", type: "link", href: "#hamptons", label: "The Hamptons Oceanfront", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          {
            id: "foot17-col-ca",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot17-h-ca", type: "text", text: "CALIFORNIA & COASTAL", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot17-l-bh", type: "link", href: "#bh", label: "Beverly Hills Trousdale", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-malibu", type: "link", href: "#malibu", label: "Malibu Colony Beach", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-montecito", type: "link", href: "#montecito", label: "Montecito Historical Ranches", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          {
            id: "foot17-col-fl",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot17-h-fl", type: "text", text: "SOUTH FLORIDA", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot17-l-star", type: "link", href: "#starisland", label: "Star Island Estates", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-palm", type: "link", href: "#palmbeach", label: "Palm Beach Lakefront", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-brickell", type: "link", href: "#brickell", label: "Brickell Key Condos", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          {
            id: "foot17-col-co",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot17-h-co", type: "text", text: "MOUNTAIN & RESORT", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot17-l-aspen", type: "link", href: "#aspen", label: "Aspen Red Mountain", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-vail", type: "link", href: "#vail", label: "Vail Village Ski Chalets", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot17-l-tahoe", type: "link", href: "#tahoe", label: "Lake Tahoe Lakefront", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Mandatory Real Estate MLS Disclosures
      {
        id: "foot17-mls-disclosures",
        type: "flex",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xs",
        style: {
          spacing: { paddingTop: "lg", marginTop: "xl" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "foot17-equal-housing",
            type: "badge",
            text: "⌂ EQUAL HOUSING OPPORTUNITY · REALTOR® LICENSED BROKERAGE",
            style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } },
          },
          {
            id: "foot17-idx-text",
            type: "text",
            text: "Based on information from California Regional Multiple Listing Service, Inc. (CRMLS) and OneKey® MLS as of 2026. Display of MLS data is deemed reliable but is not guaranteed accurate by the MLS. All properties are subject to prior sale, change, or withdrawal. Neither listing broker(s) nor this site shall be responsible for any typographical errors, misinformation, or misprints and shall be held totally harmless.",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot17-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_18_CREATOR_PODCAST_NETWORK: ComponentDocument = {
  version: 2,
  id: "footer-18-creator-podcast-network",
  name: "Creator Podcast Network Player Footer",
  kind: "footer",
  root: {
    id: "foot18-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot18-grid",
        type: "grid",
        columns: 12,
        children: [
          // Left: Podcast Show Artwork & Subscribe Badges
          {
            id: "foot18-col-show",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot18-show-header",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  { id: "foot18-art", type: "site-logo", style: { color: { background: "primary" }, border: { radius: "lg" } } },
                  { id: "foot18-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                ],
              },
              {
                id: "foot18-desc",
                type: "text",
                text: "In-depth conversations on frontier science, artificial intelligence, and philosophical sovereignty. Over 14 million downloads annually.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
              {
                id: "foot18-sub-badges",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "xs",
                children: [
                  { id: "foot18-b-apple", type: "badge", text: " Apple Podcasts", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
                  { id: "foot18-b-spotify", type: "badge", text: "🟢 Spotify", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
                  { id: "foot18-b-yt", type: "badge", text: "▶ YouTube Studio", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
                ],
              },
            ],
          },

          // Center: Genre Tag Cloud
          {
            id: "foot18-col-genres",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                tablet: { column: 6, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot18-h-genres", type: "text", text: "DISCOVER BY TOPIC", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              {
                id: "foot18-genre-pills",
                type: "flex",
                direction: "row",
                alignment: "start",
                distribution: "start",
                wrap: true,
                gap: "xs",
                children: [
                  { id: "foot18-pill-ai", type: "badge", text: "Neural Architectures", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                  { id: "foot18-pill-bio", type: "badge", text: "Longevity Biology", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                  { id: "foot18-pill-macro", type: "badge", text: "Geopolitical Systems", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                  { id: "foot18-pill-crypto", type: "badge", text: "Zero-Knowledge Proofs", style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text" } } },
                ],
              },
            ],
          },

          // Right: Member Community & Patreon Access
          {
            id: "foot18-col-patreon",
            type: "flex",
            direction: "column",
            alignment: "end",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot18-h-patron", type: "text", text: "PATRON PASS ACCESS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { id: "foot18-patron-p", type: "text", text: "Ad-free releases 48h early, raw audio stems, and quarterly virtual town halls.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              {
                id: "foot18-join-btn",
                type: "button",
                label: "Join Community ($9/mo) →",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" } },
              },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot18-bot-bar",
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
            id: "foot18-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot18-feed-url",
            type: "text",
            text: "RSS DIRECT: https://feed.creatornetwork.io/audio.xml",
            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_19_NONPROFIT_CHARITY_LEDGER: ComponentDocument = {
  version: 2,
  id: "footer-19-nonprofit-charity-ledger",
  name: "Non-Profit Foundation 501(c)(3) Ledger",
  kind: "footer",
  root: {
    id: "foot19-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Tier: Matching Grant Campaign Progress
      {
        id: "foot19-campaign-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { padding: "md", marginBottom: "xl" },
          color: { background: "primary", text: "primary-foreground" },
          border: { radius: "md" },
        },
        children: [
          {
            id: "foot19-grant-text",
            type: "text",
            text: "🤝 $500,000 ANNUAL MATCHING GRANT: $482,100 RAISED · 100% OF PUBLIC GIFTS GO DIRECTLY TO FIELD WORK",
            style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary-foreground" } },
          },
          {
            id: "foot19-donate-btn",
            type: "button",
            label: "Double Your Impact: Donate Now →",
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { background: "surface", text: "primary" },
            },
          },
        ],
      },

      // Middle: Financial Transparency & 501(c)(3) Disclosures
      {
        id: "foot19-grid",
        type: "grid",
        columns: 12,
        children: [
          // Foundation Mission
          {
            id: "foot19-col-mission",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 5, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot19-name",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot19-ein",
                type: "badge",
                text: "501(C)(3) TAX-EXEMPT ENTITY · EIN: 13-9482103",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } },
              },
              {
                id: "foot19-deductible-p",
                type: "text",
                text: "All donations are tax-deductible to the full extent allowable under United States IRS regulations.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Governance & Audits
          {
            id: "foot19-col-audits",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 6, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot19-h-gov", type: "text", text: "GOVERNANCE & FINANCIALS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot19-l-990", type: "link", href: "#form990", label: "IRS Form 990 (2025 Filing)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot19-l-audit", type: "link", href: "#audit", label: "Independent Auditor's Report (KPMG)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot19-l-trustees", type: "link", href: "#trustees", label: "Board of Trustees & Fiduciary Charter", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot19-l-privacy", type: "link", href: "#privacy", label: "Donor Privacy Policy (Never Sold)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Charity Ratings & Seals
          {
            id: "foot19-col-ratings",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot19-h-watch", type: "text", text: "INDEPENDENT CHARITY WATCHDOGS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { id: "foot19-b-cn", type: "badge", text: "★★★★ CHARITY NAVIGATOR (100% PERFECT SCORE)", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" } } },
              { id: "foot19-b-gs", type: "badge", text: "PLATINUM TRANSPARENCY 2026 · GUIDESTAR", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot19-bot-bar",
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
            id: "foot19-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot19-cfc",
            type: "text",
            text: "COMBINED FEDERAL CAMPAIGN (CFC) #48102",
            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_20_MULTIBRAND_ECOSYSTEM_DECK: ComponentDocument = {
  version: 2,
  id: "footer-20-multibrand-ecosystem-deck",
  name: "Multi-Brand Holding Ecosystem Deck",
  kind: "footer",
  root: {
    id: "foot20-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Tier: Ecosystem Division Switcher
      {
        id: "foot20-network-bar",
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
            id: "foot20-holding-name",
            type: "site-name",
            style: { typography: { size: "lg", weight: "bold", tracking: "wide" }, color: { text: "text" } },
          },
          {
            id: "foot20-subsidiaries",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: true,
            gap: "sm",
            children: [
              { id: "foot20-sub-cloud", type: "badge", text: "Atlas Cloud", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
              { id: "foot20-sub-pay", type: "badge", text: "Atlas Pay", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
              { id: "foot20-sub-ai", type: "badge", text: "Atlas AI Studio", style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" } } },
              { id: "foot20-sub-sec", type: "badge", text: "Atlas Vault", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },

      // Middle: Dual Column Division Directory
      {
        id: "foot20-dir-grid",
        type: "grid",
        columns: 12,
        children: [
          {
            id: "foot20-col-cloud",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot20-h-cloud", type: "text", text: "CLOUD SUITE", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot20-l-c1", type: "link", href: "#kubernetes", label: "Managed Kubernetes", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-c2", type: "link", href: "#edge", label: "Global CDN Edge", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-c3", type: "link", href: "#storage", label: "Encrypted Blob Storage", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          {
            id: "foot20-col-ai",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 1, rowSpan: 1 },
                tablet: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 4, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot20-h-ai", type: "text", text: "AI & INTELLIGENCE", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot20-l-a1", type: "link", href: "#llm", label: "Foundation LLM Endpoints", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-a2", type: "link", href: "#fine-tune", label: "Private LoRA Tuning", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-a3", type: "link", href: "#inference", label: "Low-Latency GPU Clusters", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          {
            id: "foot20-col-pay",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot20-h-pay", type: "text", text: "GLOBAL PAYMENTS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot20-l-p1", type: "link", href: "#fx", label: "Multi-Currency Settlement", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-p2", type: "link", href: "#payroll", label: "Contractor Payouts in 120+ Countries", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-p3", type: "link", href: "#tax", label: "Automated VAT & Sales Tax", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          {
            id: "foot20-col-corp",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot20-h-corp", type: "text", text: "HOLDING GOVERNANCE", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot20-l-inv", type: "link", href: "#investors", label: "Investor Relations & Filings", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-press", type: "link", href: "#press", label: "Consolidated Newsroom", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot20-l-unified", type: "link", href: "#unified-terms", label: "Unified Master Services Agreement", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot20-bot-bar",
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
            id: "foot20-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot20-apps-switcher-btn",
            type: "button",
            label: "❖ Atlas App Switcher (Single Sign-On)",
            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text", background: "surface" } },
          },
        ],
      },
    ],
  },
};

export const CURATED_FOOTER_BATCH_4: ComponentDocument[] = [
  FOOTER_16_HOSPITALITY_DINING_CONCIERGE,
  FOOTER_17_PROPTECH_BROKERAGE_DISCLOSURES,
  FOOTER_18_CREATOR_PODCAST_NETWORK,
  FOOTER_19_NONPROFIT_CHARITY_LEDGER,
  FOOTER_20_MULTIBRAND_ECOSYSTEM_DECK,
];

