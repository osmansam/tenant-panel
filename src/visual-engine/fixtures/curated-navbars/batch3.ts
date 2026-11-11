import type { ComponentDocument } from "../../model";

/**
 * BATCH 3 CURATED NAVBAR TEMPLATES
 *
 * #11: Fintech Banking Portal Header (navbar-11-fintech-secure-portal)
 * #12: Urgent Care & Clinical Direct Dial Header (navbar-12-healthcare-clinic-urgent)
 * #13: Conference Countdown & Ticket Bar (navbar-13-event-conference-countdown)
 * #14: API Gateway & Systems Status Bar (navbar-14-api-gateway-status)
 * #15: University Multi-Audience Campus Bar (navbar-15-university-audience-tabs)
 */

export const NAVBAR_11_FINTECH_SECURE_PORTAL: ComponentDocument = {
  version: 2,
  id: "navbar-11-fintech-secure-portal",
  name: "Fintech Banking Portal Header",
  kind: "navbar",
  root: {
    id: "nav11-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "sm" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "sm" },
    },
    children: [
      {
        id: "nav11-desktop-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        children: [
          // Left: Brand + Segment Indicator
          {
            id: "nav11-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav11-logo", type: "site-logo", style: { custom: {width: "2rem", height: "2rem"}, sizing: { } } },
              { gap: "md",
                id: "nav11-brand-labels",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                children: [
                  { id: "nav11-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" } } },
                  {
                    id: "nav11-subdivision",
                    type: "text",
                    text: "TREASURY & COMMERCIAL BANK",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-subtle" } },
                  },
                ],
              },
            ],
          },
          // Center: Segmented Audience Tabs
          {
            id: "nav11-segment-links",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "center",
            wrap: false,
            gap: "md",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            children: [
              {
                id: "nav11-badge-personal",
                type: "badge",
                text: "Personal Banking",
                style: { typography: { size: "sm", weight: "semibold" } },
              },
              {
                id: "nav11-badge-business",
                type: "badge",
                text: "Corporate Treasury",
                style: { typography: { size: "sm", weight: "bold" } },
              },
              {
                id: "nav11-badge-global",
                type: "badge",
                text: "Global Payments",
                style: { typography: { size: "sm", weight: "semibold" } },
              },
            ],
          },
          // Right: Bank-Grade Security & Login Cluster
          {
            id: "nav11-secure-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav11-ssl-badge",
                type: "badge",
                text: "🔒 256-Bit SSL",
                style: { typography: { size: "sm", weight: "medium" } },
              },
              {
                id: "nav11-btn-open",
                type: "button",
                label: "Open Account",
                href: "/open-account",
                style: {
                  border: { radius: "md", width: "hairline", color: "border" },
                  typography: { size: "sm", weight: "semibold" },
                  spacing: { paddingX: "md", paddingY: "xs" },
                },
              },
              {
                id: "nav11-btn-login",
                type: "button",
                label: "Secure Login",
                href: "/login",
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

export const NAVBAR_12_HEALTHCARE_CLINIC_URGENT: ComponentDocument = {
  version: 2,
  id: "navbar-12-healthcare-clinic-urgent",
  name: "Urgent Care & Clinical Direct Dial Header",
  kind: "navbar",
  root: {
    id: "nav12-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      // Top Triage & Direct Hotline Strip
      { gap: "md",
        id: "nav12-triage-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        style: {
          spacing: { paddingY: "xs" },
          color: { background: "surface-sunken", text: "text-muted" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav12-emergency-alert",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav12-emergency-badge",
                type: "badge",
                text: "EMERGENCY: DIAL 911",
                style: { typography: { size: "sm", weight: "bold" } },
              },
              { openInNewTab: false,
                id: "nav12-nurse-phone",
                type: "link",
                label: "24/7 Clinical Nurse Advice: +1 (800) 555-CARE",
                href: "tel:+18005552273",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
              },
            ],
          },
          {
            id: "nav12-patient-portal",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            children: [
              { openInNewTab: false,
                id: "nav12-portal-link",
                type: "link",
                label: "MyChart Patient Portal →",
                href: "/mychart",
                style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "nav12-lang-pill",
                type: "badge",
                text: "Language: English / Español",
                style: { typography: { size: "sm" } },
              },
            ],
          },
        ],
      },
      // Main Hospital Bar
      {
        id: "nav12-main-bar",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          // Hospital Brand
          {
            id: "nav12-brand-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav12-logo", type: "site-logo", style: { custom: {width: "2.25rem", height: "2.25rem"}, sizing: { } } },
              { gap: "md",
                id: "nav12-name-group",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                children: [
                  { id: "nav12-name", type: "site-name", style: { typography: { size: "xl", weight: "bold" } } },
                  {
                    id: "nav12-desc",
                    type: "text",
                    text: "REGIONAL MEDICAL HEALTH NETWORK",
                    style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-subtle" } },
                  },
                ],
              },
            ],
          },
          // Clinical Specialties Links
          {
            id: "nav12-clinical-links",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "text" },
            },
          },
          // Urgent Appointment CTA
          {
            id: "nav12-appointment-action",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "nav12-btn-appointment",
                type: "button",
                label: "Book Appointment Today",
                href: "/appointments",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full", shadow: "md" },
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

export const NAVBAR_13_EVENT_CONFERENCE_COUNTDOWN: ComponentDocument = {
  version: 2,
  id: "navbar-13-event-conference-countdown",
  name: "Conference Countdown & Ticket Bar",
  kind: "navbar",
  root: {
    id: "nav13-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "lg" },
    },
    children: [
      // Top Scarcity & Countdown Banner Strip
      {
        id: "nav13-countdown-strip",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "center",
        wrap: false,
        gap: "md",
        style: {
          spacing: { paddingY: "xs" },
          color: { background: "surface-sunken", text: "text" },
          border: { width: "hairline", color: "border" },
        },
        children: [
          {
            id: "nav13-live-dot",
            type: "badge",
            text: "LIVE TICKER",
            style: { typography: { size: "sm", weight: "bold" } },
          },
          {
            id: "nav13-countdown-timer",
            type: "text",
            text: "SUMMIT 2026 KICKS OFF IN: 14 DAYS · 08 HOURS · 32 MINUTES · MOSCONE CENTER, SF",
            style: { typography: { size: "sm", weight: "bold" }, color: { text: "accent" } },
          },
        ],
      },
      // Main Conference Navigation Row
      {
        id: "nav13-main-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        style: {
          spacing: { paddingY: "md" },
        },
        children: [
          // Event Brand
          {
            id: "nav13-brand-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav13-logo", type: "site-logo", style: { custom: {width: "2rem", height: "2rem"}, sizing: { } } },
              { id: "nav13-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" } } },
              {
                id: "nav13-date-pill",
                type: "badge",
                text: "OCT 24-26, 2026",
                style: { typography: { size: "sm", weight: "bold" } },
              },
            ],
          },
          // Schedule & Speaker Navigation
          {
            id: "nav13-agenda-links",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: false,
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "text" },
            },
          },
          // Buy Tickets Action
          {
            id: "nav13-action-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav13-btn-tickets",
                type: "button",
                label: "Buy Passes — Tier 1 Selling Fast",
                href: "/tickets",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "full", shadow: "md" },
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

export const NAVBAR_14_API_GATEWAY_STATUS: ComponentDocument = {
  version: 2,
  id: "navbar-14-api-gateway-status",
  name: "API Gateway & Systems Status Bar",
  kind: "navbar",
  root: {
    id: "nav14-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "xs" },
      color: { background: "surface-sunken", text: "inverse" },
      border: { width: "hairline", color: "border" },
    },
    children: [
      {
        id: "nav14-gateway-row",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: false,
        gap: "lg",
        children: [
          // Left: API Brand + Latency Ping
          {
            id: "nav14-left-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav14-name", type: "site-name", style: { typography: { size: "base", weight: "bold" }, color: { text: "inverse" } } },
              {
                id: "nav14-uptime-badge",
                type: "badge",
                text: "● 99.99% UPTIME · 12ms EDGE",
                style: { typography: { size: "sm", weight: "bold" }, border: { radius: "sm" } },
              },
            ],
          },
          // Center: Protocol Switcher (REST, GraphQL, gRPC)
          {
            id: "nav14-protocol-links",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: false,
            responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
            style: {
              typography: { size: "sm", weight: "semibold" },
              color: { text: "inverse-muted" },
            },
          },
          // Right: Documentation & API Key Generator
          {
            id: "nav14-right-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              { openInNewTab: false,
                id: "nav14-btn-changelog",
                type: "link",
                label: "API Changelog",
                href: "/changelog",
                style: { typography: { size: "sm", weight: "medium" }, color: { text: "inverse-muted" } },
              },
              {
                id: "nav14-btn-key",
                type: "button",
                label: "Generate API Key",
                href: "/keys",
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
    ],
  },
};

export const NAVBAR_15_UNIVERSITY_AUDIENCE_TABS: ComponentDocument = {
  version: 2,
  id: "navbar-15-university-audience-tabs",
  name: "University Multi-Audience Campus Bar",
  kind: "navbar",
  root: {
    id: "nav15-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "none" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", shadow: "md" },
    },
    children: [
      // Top Audience Segment Strip
      { gap: "md",
        id: "nav15-audience-strip",
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
            id: "nav15-audience-tabs",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "lg",
            children: [
              { openInNewTab: false, id: "nav15-tab-prospective", type: "link", label: "Prospective Students", href: "/admissions", style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
              { openInNewTab: false, id: "nav15-tab-current", type: "link", label: "Current Students", href: "/students", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "nav15-tab-faculty", type: "link", label: "Faculty & Staff", href: "/faculty", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "nav15-tab-alumni", type: "link", label: "Alumni & Giving", href: "/alumni", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
          { openInNewTab: false,
            id: "nav15-quick-portal",
            type: "link",
            label: "Campus Directory & Map →",
            href: "/directory",
            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
          },
        ],
      },
      // Bottom Primary Academic Bar
      {
        id: "nav15-primary-bar",
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
          // Crest & University Name
          {
            id: "nav15-crest-cluster",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            children: [
              { id: "nav15-logo", type: "site-logo", style: { custom: {width: "2.5rem", height: "2.5rem"}, sizing: { } } },
              { gap: "md",
                id: "nav15-name-block",
                type: "flex",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                children: [
                  { id: "nav15-name", type: "site-name", style: { typography: { size: "xl", weight: "bold", tracking: "wide" } } },
                  { id: "nav15-founded", type: "text", text: "FOUNDED 1888 · CAMBRIDGE", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-subtle" } } },
                ],
              },
            ],
          },
          // Main Academic Navigation Links
          {
            id: "nav15-academic-nav",
            type: "navigation-menu",
            orientation: "horizontal",
            showChildren: true,
            responsive: { visibility: { mobile: false, tablet: false, desktop: true } },
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { text: "text" },
            },
          },
          // Admissions Action
          {
            id: "nav15-admissions-action",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "md",
            children: [
              {
                id: "nav15-btn-apply",
                type: "button",
                label: "Apply for Fall 2027",
                href: "/apply",
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

export const CURATED_NAVBAR_BATCH_3: ComponentDocument[] = [
  NAVBAR_11_FINTECH_SECURE_PORTAL,
  NAVBAR_12_HEALTHCARE_CLINIC_URGENT,
  NAVBAR_13_EVENT_CONFERENCE_COUNTDOWN,
  NAVBAR_14_API_GATEWAY_STATUS,
  NAVBAR_15_UNIVERSITY_AUDIENCE_TABS,
];

