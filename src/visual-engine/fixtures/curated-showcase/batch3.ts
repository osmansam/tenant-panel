import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED SHOWCASE — BATCH 3 (HOSPITALITY, DEV, OPS, PROPERTY, CLINIC)
 * ============================================================================
 */

/**
 * SHOWCASE-11: Hiring Pipeline Board
 * A recruiting team's weekly board: the funnel as real rows, progress bars
 * per role, and the current interview step highlighted. Copy from the
 * side of recruiting where the tool works and nobody wears a lanyard.
 */
export const HIRING_PIPELINE_BOARD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hiring-pipeline-board",
  name: "Hiring Pipeline Board",
  kind: "section",
  root: {
    id: "hire1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "hire1-stack",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "5xl", align: "center" } },
        children: [
          {
            id: "hire1-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "hire1-heading",
                type: "heading",
                level: 2,
                text: "Openings, honestly labelled",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "hire1-lede",
                type: "text",
                text: "Every role card shows the real stage count — including the offers we're waiting on and the rejections we haven't delivered yet.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "hire1-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
            children: [
              {
                id: "hire1-backend-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "hire1-backend-inner",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    style: { sizing: { width: "full" } },
                    children: [
                      {
                        id: "hire1-backend-heading",
                        type: "heading",
                        level: 3,
                        text: "Senior backend engineer · Elixir (remote EU)",
                        style: { typography: { size: "lg", weight: "semibold" } },
                      },
                      {
                        id: "hire1-backend-progress",
                        type: "progress",
                        value: 64,
                        label: "6 of 9 loop stages scheduled",
                        showValue: true,
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "hire1-backend-steps",
                        type: "steps",
                        items: ["Sourced", "Screened", "Tech deep-dive", "Offer"],
                        current: 2,
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "hire1-backend-note",
                        type: "text",
                        text: "Three candidates at debrief; two strong. Closing this loop before Thursday standup.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
              {
                id: "hire1-support-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "hire1-support-inner",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    style: { sizing: { width: "full" } },
                    children: [
                      {
                        id: "hire1-support-heading",
                        type: "heading",
                        level: 3,
                        text: "Support engineer · Manchester, on-site",
                        style: { typography: { size: "lg", weight: "semibold" } },
                      },
                      {
                        id: "hire1-support-progress",
                        type: "progress",
                        value: 28,
                        label: "22 applications in, 5 screened",
                        showValue: true,
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "hire1-support-steps",
                        type: "steps",
                        items: ["Sourced", "Screened", "Trial shift", "Offer"],
                        current: 1,
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "hire1-support-note",
                        type: "text",
                        text: "Trial shifts start Monday. If you applied and heard nothing yet — that's us, not the system.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "hire1-table",
            type: "table",
            headers: ["Role", "Applied", "Screened", "In loop", "Offers"],
            rows: [
              ["Senior backend", "31", "18", "6", "1 pending"],
              ["Support engineer", "22", "5", "2", "—"],
              ["Design systems", "14", "9", "3", "rejected 8, replies sent"],
            ],
            caption: "Counts as of Friday 09:00. 'Replies sent' means no silent rejections — we check this list every week.",
            style: { sizing: { width: "full" } },
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-12: Chef's Tasting Menu
 * Dinner as five courses with a real wine note per course, dietary tags
 * up front, and a reservation blurb that says the true closing time.
 */
export const CHEFS_TASTING_MENU_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "chefs-tasting-menu",
  name: "Chef's Tasting Menu",
  kind: "section",
  root: {
    id: "menu1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "menu1-inner",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: { sizing: { width: "full", maxWidth: "3xl", align: "center" } },
        children: [
          {
            id: "menu1-tags",
            type: "tags",
            items: ["Five courses", "£68", "Vegan version available", "Fish option per course"],
            style: { typography: { size: "sm" } },
          },
          {
            id: "menu1-heading",
            type: "heading",
            level: 1,
            text: "October, served in five",
            style: { typography: { size: "6xl", weight: "bold", tracking: "tight", leading: "tight", align: "center" } },
          },
          {
            id: "menu1-intro",
            type: "text",
            text: "The menu changes when the market changes it. Nothing is frozen; a lot of it is smoked in the old apple barrel out back. This is what the kiln gave us this week.",
            style: { typography: { size: "lg", leading: "relaxed", align: "center" }, color: { text: "text-muted" } },
          },
              {
                id: "menu1-courses",
                type: "steps",
                items: [
                  "1 · Cured sea trout, smoked butter, charred leeks",
                  "2 · Orecchiette, pumpkin, pecorino fogging the plate",
                  "3 · Orkney scallop in a broth of ceps (the sell-out course)",
                  "4 · Aged duck, quince, and a bit of budgio",
                  "5 · Roasted pear tart with a wine from Vienna",
                ],
                current: 0,
                style: { typography: { align: "center" } },
              },
          {
            id: "menu1-pairing",
            type: "quote",
            quote: "Tonight's pour we'd cheat on breakfast with: a Grüner from Nigl we opened at lunch and never got over.",
            author: "Ronny Alvarado",
            role: "lunch shift, standing at the pass",
          },
          {
            id: "menu1-reservation",
            type: "alert",
            variant: "success",
            body: "Tables seat from 17:00 to 20:30. Kitchen closes when the last course lands, not when the door does — walk-ins up top, cash and card both fine.",
            title: "How the room actually runs",
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-13: Developer Quickstart
 * The first five minutes with an API: download, key, first call, watch the
 * rate-window sparkline, and read the rate-limit alert before security sends
 * the email.
 */
export const DEVELOPER_QUICKSTART_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "developer-quickstart",
  name: "Developer Quickstart",
  kind: "section",
  root: {
    id: "quick1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "quick1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "quick1-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 12, desktop: 12 } },
            children: [
              {
                id: "quick1-badge",
                type: "badge",
                text: "SDK v3 · TOKEN AUTH · 400 RPS FREE",
                style: { color: { background: "surface-muted", text: "primary" }, border: { radius: "full" }, spacing: { paddingX: "md", paddingY: "xs" } },
              },
              {
                id: "quick1-heading",
                type: "heading",
                level: 1,
                text: "Shipped keys to your first call in under four minutes",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
            ],
          },
          {
            id: "quick1-steps-card",
            type: "card", element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
            style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border", shadow: "sm" }, spacing: { padding: "xl" } },
            children: [
              {
                id: "quick1-steps",
                type: "steps",
                items: [
                  "Install: brew install ozmi/tap/ozmi-cli",
                  "Auth: ozmi login (browser pops up, approve it)",
                  "Grab a key: ozmi key create --name dev-first-run",
                  "First call: ozmi query apps --where plan=free",
                ],
                current: 2,
                style: { sizing: { width: "full" } },
              },
              {
                id: "quick1-kbd-title",
                type: "text",
                text: "Live while you experiment",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "quick1-kbd",
                type: "kbd",
                keys: ["↑", "Run"],
              },
              {
                id: "quick1-kbd-caption",
                type: "text",
                text: "re-runs the last query with your edits — saves more retries than anything else this week.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "quick1-right-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
            children: [
              {
                id: "quick1-spark-heading",
                type: "text",
                text: "Your rate window, near-real-time",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "quick1-sparkline",
                type: "sparkline",
                points: [0.02, 0.05, 0.04, 0.09, 0.14, 0.12, 0.19, 0.24, 0.21, 0.28, 0.32, 0.29, 0.30, 0.28],
                ariaLabel: "Your requests per minute across the last 14 minutes",
                showArea: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "quick1-rate-alert",
                type: "alert",
                variant: "danger",
                body: "400 requests per minute on free plans. Bursts above this return 429 and eat 30 seconds of payment-run team resources — please don't hammer staging with load tests.",
                title: "Rate management is real",
              },
              {
                id: "quick1-docs-link",
                type: "link",
                label: "Full reference →",
                href: "/docs/reference",
                openInNewTab: false,
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-14: Property Listing Spec Sheet
 * A house listing's spec sheet: tour film, exact dimensions table,
 * neighbourhood tags, and the score of the neighbourhood — no
 * "nestled" clichés anywhere.
 */
export const PROPERTY_LISTING_SPEC_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "property-listing-spec",
  name: "Property Listing Spec Sheet",
  kind: "section",
  root: {
    id: "home1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "home1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          {
            id: "home1-film",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "home1-video",
                type: "video",
                src: "https://cdn.ozmi.example/properties/118-copper-row/tour.mp4",
                title: "118 Copper Row guided walkthrough, 3 minutes 40 seconds",
                poster: "https://cdn.ozmi.example/properties/118-copper-row/tour-poster.jpg",
                aspectRatio: "landscape",
                style: {
                  border: { radius: "lg", width: "thin", color: "border", shadow: "sm" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "home1-tags",
                type: "tags",
                items: ["Listed £740k", "Reduced twice — now ready", "Offers before 24th get response by 26th"],
                style: { typography: { size: "sm" } },
              },
            ],
          },
          {
            id: "home1-spec-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "home1-heading",
                type: "heading",
                level: 2,
                text: "118 Copper Row — two-up, two-down, a bathroom nobody skimped on",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "home1-par",
                type: "text",
                text: "Built 1911, re-wired 2023, re-roofed 2024. The vendor redid the cellar damp-proofing too, which they won't say because it sounds unromantic. Here it is on the sheet:",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "home1-spec-table",
                type: "table",
                headers: ["Room", "Dimensions", "Notes"],
                rows: [
                  ["Reception", "4.2m × 3.6m", "Bay front, plaster sash window repaired 2023"],
                  ["Kitchen", "3.9m × 2.7m", "Shaker fronts; oven stays"],
                  ["Bed 1", "4.1m × 3.3m", "Brick chimney revealed, painted white"],
                  ["Bed 2", "2.8m × 2.6m", "Currently the office"],
                  ["Bathroom", "2.6m × 1.9m", "Marchetti thermostatic shower, Triton back-up"],
                ],
                style: { sizing: { width: "full" } },
              },
              {
                id: "home1-area",
                type: "stat",
                value: "0.6",
                suffix: "mi",
                label: "to Grove Park station · walk 12 min, bus 6 min",
              },
              {
                id: "home1-cta",
                type: "button",
                label: "Book a viewing",
                href: "/properties/118-copper-row/book",
                accessibleLabel: "Book a viewing for 118 Copper Row",
                style: {
                  color: { background: "primary", text: "primary-foreground" },
                  border: { radius: "md" },
                  spacing: { padding: "md" },
                  typography: { size: "base", weight: "semibold" },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-15: Clinic Intake Journey
 * What happens at a first appointment as a patient-flow track, with an
 * insurance alert in the middle, the picks for what to bring, and a
 * duration estimate that adds up correctly.
 */
export const CLINIC_INTAKE_JOURNEY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "clinic-intake-journey",
  name: "Clinic Intake Journey",
  kind: "section",
  root: {
    id: "clinic1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "clinic1-card",
        type: "card",
        element: "article",
        style: {
          color: { background: "surface", text: "text" },
          border: { radius: "xl", width: "thin", color: "border", shadow: "md" },
          spacing: { padding: "2xl" },
          sizing: { width: "full", maxWidth: "3xl", align: "center" },
        },
        children: [
          {
            id: "clinic1-inner",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            style: { sizing: { width: "full" } },
            children: [
              {
                id: "clinic1-heading",
                type: "heading",
                level: 2,
                text: "Your first visit, step by step",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "clinic1-steps",
                type: "steps",
                items: [
                  "Paperwork — either online or arrive 15 minutes early",
                  "Vitals — height, weight, and one bashful blood pressure reading",
                  "Symptom mapping with the practitioner",
                  "Plan-of-care talk: what, when, and what to say no to",
                  "Booking — you leave with dates, not a leaflet",
                ],
                current: 2,
                style: { sizing: { width: "full" } },
              },
              {
                id: "clinic1-time",
                type: "progress",
                value: 55,
                label: "Typical first visit runs 50 minutes",
                showValue: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "clinic1-insurance",
                type: "alert",
                variant: "warning",
                body: "We're in-network with Aetna and Cigna, out-of-network elsewhere. Pre-approval can take 5 business days; email insurance@pinesclinic.example and we chase it for you.",
                title: "The coverage thing",
              },
              {
                id: "clinic1-bring",
                type: "tags",
                items: ["ID/card", "Current meds list (photos of boxes are fine)", "Any scans since 2022"],
              },
              {
                id: "clinic1-shortcut",
                type: "kbd",
                keys: ["Portal", "→", "Intake form"],
                style: { typography: { size: "sm" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const CURATED_SHOWCASE_BATCH_3: ComponentDocument[] = [
  HIRING_PIPELINE_BOARD_DOCUMENT,
  CHEFS_TASTING_MENU_DOCUMENT,
  DEVELOPER_QUICKSTART_DOCUMENT,
  PROPERTY_LISTING_SPEC_DOCUMENT,
  CLINIC_INTAKE_JOURNEY_DOCUMENT,
];
