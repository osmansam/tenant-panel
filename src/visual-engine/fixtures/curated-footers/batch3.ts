import type { ComponentDocument } from "../../model";

/**
 * BATCH 3 CURATED FOOTER TEMPLATES
 *
 * #11: Fintech Banking Encrypted Vault Footer (footer-11-fintech-banking-vault)
 * #12: Healthcare Clinical & Direct Hotline Footer (footer-12-healthcare-clinic-hotline)
 * #13: University Campus Directory Footer (footer-13-university-campus-directory)
 * #14: Event Conference Countdown & Venue Deck (footer-14-conference-countdown-venue)
 * #15: API Platform Systems SLA Status Deck (footer-15-api-platform-status-deck)
 */

export const FOOTER_11_FINTECH_BANKING_VAULT: ComponentDocument = {
  version: 2,
  id: "footer-11-fintech-banking-vault",
  name: "Fintech Banking Encrypted Vault Footer",
  kind: "footer",
  root: {
    id: "foot11-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Security Clearance Strip
      {
        id: "foot11-sec-strip",
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
            id: "foot11-sec-badge",
            type: "badge",
            text: "🔒 FDIC INSURED TO $250,000 · 256-BIT TLS ENCRYPTION · BANCORP PARTNER",
            style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" }, border: { width: "hairline", color: "border" } },
          },
          {
            id: "foot11-routing-info",
            type: "text",
            text: "ABA ROUTING: 021000089 · SWIFT: METRUS33",
            style: { typography: { size: "sm", weight: "semibold", tracking: "wide" }, color: { text: "text-muted" } },
          },
        ],
      },

      // Middle: Banking Navigation Columns
      {
        id: "foot11-grid",
        type: "grid",
        columns: 12,
        children: [
          // Brand & Charter
          {
            id: "foot11-col-brand",
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
                id: "foot11-name",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot11-charter-desc",
                type: "text",
                text: "Commercial treasury and institutional liquidity management designed for venture-backed enterprises and multinational operations.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Commercial Treasury
          {
            id: "foot11-col-treasury",
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
                desktop: { column: 5, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot11-h-tr", type: "text", text: "TREASURY", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot11-l-sweeps", type: "link", href: "#sweeps", label: "Multi-Bank Sweeps", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot11-l-yield", type: "link", href: "#yield", label: "5.18% T-Bill Yield", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot11-l-wires", type: "link", href: "#wires", label: "Global Fedwire", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Lending & Capital
          {
            id: "foot11-col-capital",
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
                desktop: { column: 7, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot11-h-cap", type: "text", text: "VENTURE CREDIT", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot11-l-revolve", type: "link", href: "#revolving", label: "Revolving Lines", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot11-l-runway", type: "link", href: "#runway", label: "Runway Extension", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot11-l-capex", type: "link", href: "#capex", label: "Equipment CapEx", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Security & Regulatory
          {
            id: "foot11-col-sec",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot11-h-reg", type: "text", text: "REGULATORY DISCLOSURES", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { id: "foot11-p-reg", type: "text", text: "Banking services provided by Evolve Bank & Trust and Cross River Bank, Members FDIC. The Visa Commercial Card is issued pursuant to license from Visa U.S.A. Inc.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot11-bot-bar",
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
            id: "foot11-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot11-seal",
            type: "badge",
            text: "EQUAL HOUSING LENDER · NMLS #194820",
            style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_12_HEALTHCARE_CLINIC_HOTLINE: ComponentDocument = {
  version: 2,
  id: "footer-12-healthcare-clinic-hotline",
  name: "Healthcare Clinical & Direct Hotline Footer",
  kind: "footer",
  root: {
    id: "foot12-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top 24/7 Clinical Emergency Hotline Strip
      {
        id: "foot12-hotline-strip",
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
            id: "foot12-hotline-left",
            type: "text",
            text: "🚑 IMMEDIATE MEDICAL EMERGENCY: CALL 911 · 24/7 NURSE ADVICE LINE: (800) 555-CARE",
            style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary-foreground" } },
          },
          {
            id: "foot12-portal-btn",
            type: "button",
            label: "Patient Portal Login (MyChart) →",
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { background: "surface", text: "primary" },
            },
          },
        ],
      },

      // Middle: Clinical Specialties & Directories
      {
        id: "foot12-grid",
        type: "grid",
        columns: 12,
        children: [
          // Hospital Crest & Accreditation
          {
            id: "foot12-crest-col",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 1, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 1, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "foot12-hospital-name",
                type: "site-name",
                style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot12-joint-commission",
                type: "badge",
                text: "★ JOINT COMMISSION ACCREDITED · MAGNET HOSPITAL",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } },
              },
              {
                id: "foot12-address",
                type: "text",
                text: "Main Campus: 500 Pasteur Drive, Medical Center District, Building A",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },

          // Clinical Departments
          {
            id: "foot12-col-depts",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot12-h-dept", type: "text", text: "CLINICAL SPECIALTIES", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot12-l-cardio", type: "link", href: "#cardio", label: "Cardiovascular Institute", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot12-l-onco", type: "link", href: "#oncology", label: "Comprehensive Cancer Center", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot12-l-neuro", type: "link", href: "#neuro", label: "Neurosciences & Stroke Center", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot12-l-ortho", type: "link", href: "#ortho", label: "Orthopedics & Sports Medicine", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Patient Resources & HIPAA
          {
            id: "foot12-col-hipaa",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot12-h-hipaa", type: "text", text: "PATIENT RIGHTS & PRIVACY", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot12-l-records", type: "link", href: "#records", label: "Medical Records Request", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot12-l-notice", type: "link", href: "#hipaa", label: "Notice of Privacy Practices (HIPAA)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot12-l-billing", type: "link", href: "#billing", label: "Financial Assistance & Charity Care", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot12-l-non-discrim", type: "link", href: "#nondiscrim", label: "Non-Discrimination Policy (ACA 1557)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot12-bot-bar",
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
            id: "foot12-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot12-hipaa-badge",
            type: "badge",
            text: "🔒 HIPAA VERIFIED SECURE PORTAL",
            style: { typography: { size: "sm", weight: "medium" }, color: { background: "surface", text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_13_UNIVERSITY_CAMPUS_DIRECTORY: ComponentDocument = {
  version: 2,
  id: "footer-13-university-campus-directory",
  name: "University Campus Directory Footer",
  kind: "footer",
  root: {
    id: "foot13-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "2xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Campus Crest Banner
      {
        id: "foot13-crest-row",
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
            id: "foot13-crest-group",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "foot13-crest-logo",
                type: "site-logo",
                style: { color: { background: "primary" }, border: { radius: "full" } },
              },
              {
                id: "foot13-univ-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
              },
            ],
          },
          {
            id: "foot13-motto-badge",
            type: "badge",
            text: "VERITAS ET SCIENTIA · CHARTERED 1789",
            style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { background: "surface", text: "text" } },
          },
        ],
      },

      // Middle: Quad-Column Campus Directory
      {
        id: "foot13-quad-grid",
        type: "grid",
        columns: 12,
        children: [
          // Col 1: Academics
          {
            id: "foot13-col-acad",
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
              { id: "foot13-h-acad", type: "text", text: "ACADEMICS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot13-l-colleges", type: "link", href: "#colleges", label: "Schools & Colleges", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-grad", type: "link", href: "#graduate", label: "Graduate Studies", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-faculty", type: "link", href: "#directory", label: "Faculty Directory", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-registrar", type: "link", href: "#registrar", label: "Academic Calendar", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 2: Admissions
          {
            id: "foot13-col-adm",
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
              { id: "foot13-h-adm", type: "text", text: "ADMISSIONS & AID", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot13-l-apply", type: "link", href: "#apply", label: "Undergraduate Application", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-tuition", type: "link", href: "#tuition", label: "Tuition & Financial Aid", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-tours", type: "link", href: "#tours", label: "Campus Tours & Visits", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-intl", type: "link", href: "#international", label: "International Scholars", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 3: Research & Libraries
          {
            id: "foot13-col-res",
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
              { id: "foot13-h-res", type: "text", text: "RESEARCH & LIBRARIES", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot13-l-lib", type: "link", href: "#libraries", label: "University Libraries Catalog", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-grants", type: "link", href: "#grants", label: "Sponsored Research Office", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-tech", type: "link", href: "#techtransfer", label: "Technology Licensing", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-press", type: "link", href: "#press", label: "University Press Publications", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Col 4: Campus Life & Emergency
          {
            id: "foot13-col-life",
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
              { id: "foot13-h-life", type: "text", text: "CAMPUS & EMERGENCY", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot13-l-police", type: "link", href: "#police", label: "Campus Police: (555) 0199", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-titleix", type: "link", href: "#titleix", label: "Title IX Office & Compliance", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-housing", type: "link", href: "#housing", label: "Residential Life & Dining", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot13-l-athletics", type: "link", href: "#athletics", label: "NCAA Athletics Tickets", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot13-bot-bar",
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
            id: "foot13-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot13-clery",
            type: "text",
            text: "ANNUAL SECURITY & FIRE SAFETY REPORT (CLERY ACT) AVAILABLE ONLINE",
            style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const FOOTER_14_CONFERENCE_COUNTDOWN_VENUE: ComponentDocument = {
  version: 2,
  id: "footer-14-conference-countdown-venue",
  name: "Event Conference Countdown & Venue Deck",
  kind: "footer",
  root: {
    id: "foot14-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      // Top Tier: Countdown Ticket Alert
      {
        id: "foot14-countdown-tier",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "md",
        style: {
          spacing: { padding: "lg", marginBottom: "xl" },
          color: { background: "primary", text: "primary-foreground" },
          border: { radius: "lg" },
        },
        children: [
          {
            id: "foot14-alert-text",
            type: "text",
            text: "⏳ 14 DAYS UNTIL TECH SUMMIT LIVE 2026 · TIER 2 PASSES 88% SOLD OUT",
            style: { typography: { size: "base", weight: "bold" }, color: { text: "primary-foreground" } },
          },
          {
            id: "foot14-buy-btn",
            type: "button",
            label: "Secure Your Pass Now →",
            style: {
              typography: { size: "sm", weight: "bold" },
              color: { background: "surface", text: "primary" },
            },
          },
        ],
      },

      // Middle: Venue & Schedule Grid
      {
        id: "foot14-grid",
        type: "grid",
        columns: 12,
        children: [
          // Event Brand & Venue
          {
            id: "foot14-col-venue",
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
                id: "foot14-event-name",
                type: "site-name",
                style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
              },
              {
                id: "foot14-venue-location",
                type: "text",
                text: "OCTOBER 24–26, 2026 · MOSCONE CENTER WEST · SAN FRANCISCO, CA",
                style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text" } },
              },
              { openInNewTab: false,
                id: "foot14-directions-link",
                type: "link",
                href: "#directions",
                label: "📍 Venue Directions & Parking Maps →",
                style: { typography: { size: "sm", weight: "medium" }, color: { text: "primary" } },
              },
            ],
          },

          // Schedule & Speaker Inquiries
          {
            id: "foot14-col-sched",
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
                desktop: { column: 6, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot14-h-prog", type: "text", text: "PROGRAM", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot14-l-agenda", type: "link", href: "#agenda", label: "Full 3-Day Agenda", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot14-l-speakers", type: "link", href: "#speakers", label: "Keynote Speakers (42)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot14-l-stages", type: "link", href: "#stages", label: "Workshops & Breakouts", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Travel & Hotel Blocks
          {
            id: "foot14-col-hotel",
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
              { id: "foot14-h-travel", type: "text", text: "TRAVEL & HOTELS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot14-l-hotel", type: "link", href: "#hotels", label: "Discounted Hotel Blocks (Save 30%)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot14-l-conduct", type: "link", href: "#conduct", label: "Anti-Harassment Code of Conduct", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot14-l-sponsor", type: "link", href: "#sponsor", label: "Become an Official Sponsor", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot14-bot-bar",
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
            id: "foot14-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          {
            id: "foot14-socials",
            type: "flex",
            direction: "row",
            alignment: "center",
            distribution: "end",
            wrap: false,
            gap: "xs",
            children: [
              { id: "foot14-soc-x", type: "badge", text: "𝕏 / TWITTER", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
              { id: "foot14-soc-li", type: "badge", text: "LINKEDIN", style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "text" } } },
            ],
          },
        ],
      },
    ],
  },
};

export const FOOTER_15_API_PLATFORM_STATUS_DECK: ComponentDocument = {
  version: 2,
  id: "footer-15-api-platform-status-deck",
  name: "API Platform Systems SLA Status Deck",
  kind: "footer",
  root: {
    id: "foot15-root",
    type: "section",
    style: {
      spacing: { paddingX: "2xl", paddingY: "xl" },
      color: { background: "surface", text: "text" },
      border: { width: "thin", color: "border" },
    },
    children: [
      {
        id: "foot15-grid",
        type: "grid",
        columns: 12,
        children: [
          // Left: Real-time SLA Ping & Changelog Hero
          {
            id: "foot15-sla-col",
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
                id: "foot15-logo-row",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  { id: "foot15-logo", type: "site-logo", style: { color: { background: "primary" }, border: { radius: "md" } } },
                  { id: "foot15-name", type: "site-name", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                ],
              },
              {
                id: "foot15-uptime-badge",
                type: "badge",
                text: "🟢 99.995% UPTIME OVER LAST 90 DAYS",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "surface", text: "primary" }, border: { width: "hairline", color: "border" } },
              },
              {
                id: "foot15-latency-info",
                type: "text",
                text: "Global Median Latency: 18ms across 28 edge edge datacenters.",
                style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
              },
            ],
          },

          // SDKs & Clients
          {
            id: "foot15-col-sdks",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 6, columnSpan: 3, row: 1, rowSpan: 1 },
                desktop: { column: 5, columnSpan: 2, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot15-h-sdks", type: "text", text: "SDK CLIENTS", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot15-l-node", type: "link", href: "#node", label: "Node.js / TypeScript", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot15-l-python", type: "link", href: "#python", label: "Python 3.12+", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot15-l-go", type: "link", href: "#go", label: "Go (Golang)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot15-l-rust", type: "link", href: "#rust", label: "Rust Crates", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // API Documentation
          {
            id: "foot15-col-api",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 7, columnSpan: 6, row: 2, rowSpan: 1 },
                tablet: { column: 9, columnSpan: 4, row: 1, rowSpan: 1 },
                desktop: { column: 7, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot15-h-api", type: "text", text: "API REFERENCES", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { openInNewTab: false, id: "foot15-l-auth", type: "link", href: "#oauth", label: "OAuth2 & JWT Bearer", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot15-l-hooks", type: "link", href: "#webhooks", label: "Webhook Signatures (HMAC)", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot15-l-limits", type: "link", href: "#ratelimits", label: "Rate Limits & Bursting", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
              { openInNewTab: false, id: "foot15-l-postman", type: "link", href: "#postman", label: "Download Postman Collection", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text-muted" } } },
            ],
          },

          // Changelog Lead Magnet
          {
            id: "foot15-col-sub",
            type: "flex",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            layout: {
              placement: {
                mobile: { column: 1, columnSpan: 12, row: 3, rowSpan: 1 },
                tablet: { column: 1, columnSpan: 12, row: 2, rowSpan: 1 },
                desktop: { column: 10, columnSpan: 3, row: 1, rowSpan: 1 },
              },
            },
            children: [
              { id: "foot15-h-sub", type: "text", text: "CHANGELOG DISPATCH", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
              { id: "foot15-p-sub", type: "text", text: "Get release notes for breaking schema changes 48h in advance.", style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } } },
              {
                id: "foot15-btn-key",
                type: "button",
                label: "Get Developer API Key →",
                style: { typography: { size: "sm", weight: "bold" }, color: { background: "primary", text: "primary-foreground" } },
              },
            ],
          },
        ],
      },

      // Bottom Bar
      {
        id: "foot15-bot-bar",
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
            id: "foot15-copy",
            type: "copyright",
            style: { typography: { size: "sm", weight: "normal" }, color: { text: "text-muted" } },
          },
          { openInNewTab: false,
            id: "foot15-top-link",
            type: "link",
            href: "#top",
            label: "Back to top ↑",
            style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
          },
        ],
      },
    ],
  },
};

export const CURATED_FOOTER_BATCH_3: ComponentDocument[] = [
  FOOTER_11_FINTECH_BANKING_VAULT,
  FOOTER_12_HEALTHCARE_CLINIC_HOTLINE,
  FOOTER_13_UNIVERSITY_CAMPUS_DIRECTORY,
  FOOTER_14_CONFERENCE_COUNTDOWN_VENUE,
  FOOTER_15_API_PLATFORM_STATUS_DECK,
];

