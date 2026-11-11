import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED SHOWCASE — BATCH 1 (MEDIA, LEARNING, ROADMAP, DASHBOARD)
 * Focus: sections built around the media, data, messaging, and chart families.
 * Copy is written to sound like a real person wrote it, not a template engine.
 * ============================================================================
 */

/**
 * SHOWCASE-01: Podcast Episode Spotlight
 * A single episode page: big episode number, the playable episode itself,
 * chapter progress, an honest pull-quote, and topic tags. Reads like
 * Transistor or The Idle — quiet typography around one strong player.
 */
export const PODCAST_EPISODE_SPOTLIGHT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "podcast-episode-spotlight",
  name: "Podcast Episode Spotlight",
  kind: "section",
  root: {
    id: "pod1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "pod1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "5xl", align: "center" } },
        children: [
          {
            id: "pod1-intro",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
            children: [
              {
                id: "pod1-tags",
                type: "tags",
                items: ["Season 4", "Interviews", "48 min"],
                style: { typography: { size: "sm" } },
              },
              {
                id: "pod1-title",
                type: "heading",
                level: 1,
                text: "Ep. 63 — Frank kept the receipts",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" }, color: { text: "text" } },
              },
              {
                id: "pod1-standfirst",
                type: "text",
                text: "Eleven years ago Frank stopped invoicing a client who kept paying him. This week we go through the spreadsheet — every deposit, every apology email — and ask what you owe someone who overpays you by accident.",
                style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "pod1-progress",
                type: "progress",
                value: 62,
                label: "Your place: 29:47 of 48:12",
                showValue: false,
                style: { spacing: { paddingTop: "md" } },
              },
            ],
          },
          {
            id: "pod1-player-col",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
            children: [
              {
                id: "pod1-player",
                type: "audio",
                src: "https://cdn.ozmi.example/episodes/ep63-frank-receipts.mp3",
                accessibleLabel: "Episode 63 — Frank kept the receipts, 48 minutes",
                style: { sizing: { width: "full" } },
              },
              {
                id: "pod1-guest-card",
                type: "card",
                element: "article",
                style: {
                  color: { background: "surface", text: "text" },
                  border: { radius: "lg", width: "thin", color: "border", shadow: "sm" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "pod1-guest-quote",
                    type: "quote",
                    quote: "I didn't keep the receipts because I'm organized. I kept them because I couldn't stop watching the number go up.",
                    author: "Frank Osei",
                    role: "Guest, structural engineer",
                  },
                ],
              },
              {
                id: "pod1-sub-link",
                type: "link",
                label: "Read the full transcript →",
                href: "/transcripts/ep-63",
                openInNewTab: false,
                style: { typography: { size: "sm", weight: "medium" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-02: Launch Film Hero
 * A launch-day hero that pins a 40-second film to the right and keeps the
 * left column honest: what shipped, for whom, and three keyboard-first
 * power moves for the people who already downloaded the beta.
 */
export const LAUNCH_FILM_HERO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "launch-film-hero",
  name: "Launch Film Hero",
  kind: "section",
  root: {
    id: "launch1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "launch1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          {
            id: "launch1-copy",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "launch1-tags",
                type: "tags",
                items: ["Shipped today", "macOS + Windows", "0.9.0"],
                style: { typography: { size: "sm" } },
              },
              {
                id: "launch1-heading",
                type: "heading",
                level: 1,
                text: "Drafts now keep every version you didn't send.",
                style: { typography: { size: "6xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "launch1-body",
                type: "text",
                text: "Version history used to live in the trash. It still does — we just stopped emptying it. Restore anything from the last 90 days with one search.",
                style: { typography: { size: "xl", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "launch1-actions",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "sm",
                style: { spacing: { paddingTop: "sm" } },
                children: [
                  {
                    id: "launch1-cta",
                    type: "button",
                    label: "Download 0.9.0",
                    href: "/downloads/0.9.0",
                    accessibleLabel: "Download Drafts version 0.9.0",
                    style: {
                      color: { background: "surface", text: "primary" },
                      border: { radius: "md" },
                      spacing: { padding: "md" },
                      typography: { size: "base", weight: "semibold" },
                    },
                  },
                  {
                    id: "launch1-beta-link",
                    type: "link",
                    label: "What's still broken",
                    href: "/changelog",
                    openInNewTab: false,
                    style: { typography: { size: "sm" } },
                  },
                ],
              },
              {
                id: "launch1-kbd",
                type: "kbd",
                keys: ["⌘", "⇧", "H"],
                style: { typography: { size: "sm" } },
              },
              {
                id: "launch1-kbd-hint",
                type: "text",
                text: "opens version history anywhere — even mid-sentence.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "launch1-film",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "launch1-video",
                type: "video",
                src: "https://cdn.ozmi.example/launch/0.9.0-film-40s.mp4",
                title: "Drafts 0.9.0 launch film, 40 seconds",
                poster: "https://cdn.ozmi.example/launch/0.9.0-film-poster.jpg",
                aspectRatio: "landscape",
                style: {
                  border: { radius: "lg", width: "thin", color: "border", shadow: "md" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "launch1-stat",
                type: "stat",
                value: "2,140",
                label: "drafts rescued from the trash during the beta",
                style: { typography: { align: "center" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-03: Course Syllabus Breakdown
 * Twelve weeks as an honest table, a progress bar for what the learner has
 * finished, and the current module called out mid-flow. Personnel-manager
 * copy, no courserap.
 */
export const COURSE_SYLLABUS_TABLE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "course-syllabus-table",
  name: "Course Syllabus Breakdown",
  kind: "section",
  root: {
    id: "course1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "course1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "course1-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 10, desktop: 10 } },
            children: [
              {
                id: "course1-badge",
                type: "badge",
                text: "SPRING COHORT · 34 SEATS LEFT",
                style: { color: { background: "surface-muted", text: "primary" }, border: { radius: "full" }, spacing: { paddingX: "md", paddingY: "xs" } },
              },
              {
                id: "course1-heading",
                type: "heading",
                level: 2,
                text: "Type design, from a blank .glyphs file",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "course1-lede",
                type: "text",
                text: "Twelve weeks, thirteen critique sessions, and one finished typeface with a real license. You draw the b first. The rest argues about it for eleven weeks.",
                style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "course1-progress",
                type: "progress",
                value: 35,
                label: "Module 4 of 12 complete",
                showValue: true,
                style: { spacing: { paddingTop: "sm" }, sizing: { width: "full", maxWidth: "lg", align: "start" } },
              },
            ],
          },
          {
            id: "course1-table-col",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 12 } },
            children: [
              {
                id: "course1-table",
                type: "table",
                headers: ["Week", "Critique topic", "Deliverable due"],
                rows: [
                  ["1–2", "Lowercase a, g, s — the three fights of every typeface", ".glyphs file with three glyphs"],
                  ["3–4", "Weights: how many and when to stop", "Light + Bold from the same b"],
                  ["5–7", "Spacing, kerning, and the staredown method", "AA EZ CET KOX samples"],
                  ["8–9", "Diacritics the market you're selling to actually uses", "Latin Extended coverage"],
                  ["10–12", "Naming, license, and selling without a distributor", "MyFonts-ready package"],
                ],
                caption: "Schedule from the Spring 2026 cohort; labs run Thursdays 18:00 GMT.",
                style: { sizing: { width: "full" } },
              },
              {
                id: "course1-disclaimer",
                type: "alert",
                variant: "warning",
                body: "No audits after week 4. Late crit is worse than wrong crit — if you miss a session you get the recording, not the room.",
                title: "Attendance means attendance",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-04: Startup Roadmap Timeline
 * Four quarters on a vertical rail with shipped markers, current work
 * highlighted, and a blunt caveat banner refusing to call anything a date.
 */
export const STARTUP_ROADMAP_TIMELINE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "startup-roadmap-timeline",
  name: "Startup Roadmap Timeline",
  kind: "section",
  root: {
    id: "roadmap1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "roadmap1-inner",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
        children: [
          {
            id: "roadmap1-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { sizing: { maxWidth: "3xl", align: "start" } },
            children: [
              {
                id: "roadmap1-label",
                type: "text",
                text: "Public roadmap · updated weekly (for real)",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "roadmap1-heading",
                type: "heading",
                level: 2,
                text: "What's shipped, what's on the machine, what's wishful",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
            ],
          },
          {
            id: "roadmap1-timeline",
            type: "timeline",
            entries: [
              { title: "Q4 2025 — shipped", description: "CSV import, shared dashboards, and the schema diff tool that killed 60% of our support tickets." },
              { title: "Q1 2026 — in progress", description: "Row-level permissions with audit trails. Two enterprise pilots are live on the nightly build and finding things we'd rather not find." },
              { title: "Q2 2026 — design underway", description: "Offline-first sync for field crews. If the queue merge survives the Peru mining depot test we'll announce properly." },
              { title: "Q3 2026 — idea stage", description: "Query builder v2. Honestly it might slip. We'd rather ship v1 of it right than v2 of it early." },
            ],
            style: { typography: { align: "left" }, spacing: { paddingTop: "md" }, sizing: { width: "full" } },
          },
          {
            id: "roadmap1-alert",
            type: "alert",
            variant: "info",
            body: "Anything above Q2 can move. Commit dates are written the week they're built — we've been burned promising quarters before.",
            title: "No quarter promises",
          },
          {
            id: "roadmap1-cta-row",
            type: "stack",
            direction: "row",
            alignment: "center",
            distribution: "start",
            wrap: true,
            gap: "md",
            children: [
              {
                id: "roadmap1-link",
                type: "link",
                label: "Vote on the backlog →",
                href: "/roadmap/vote",
                openInNewTab: false,
              },
              {
                id: "roadmap1-github",
                type: "link",
                label: "Follow the repo",
                href: "/github",
                openInNewTab: true,
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-05: Sales One-Pager Dashboard
 * The quarter on one screen: tall bar comparisons, a trended weekly
 * sparkline, three big numbers, and the pipeline table a CFO would
 * actually look at. Numbers are ugly on purpose so it doesn't read fake.
 */
export const SALES_ONE_PAGER_DASHBOARD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "sales-one-pager-dashboard",
  name: "Sales One-Pager Dashboard",
  kind: "section",
  root: {
    id: "sales1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "sales1-stack",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "sales1-heading",
            type: "heading",
            level: 2,
            text: "Q3 FY26 · how the quarter actually went",
            style: { typography: { size: "2xl", weight: "bold", tracking: "tight" } },
          },
          {
            id: "sales1-stats-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "md" }, sizing: { width: "full" } },
            children: [
              {
                id: "sales1-rev",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "sales1-rev-stat",
                    type: "stat",
                    value: "1.42",
                    prefix: "$",
                    suffix: "M",
                    label: "Closed revenue · +18% vs plan",
                    style: { typography: { align: "left" } },
                  },
                  {
                    id: "sales1-rev-spark",
                    type: "sparkline",
                    points: [0.21, 0.24, 0.23, 0.31, 0.34, 0.32, 0.38, 0.41, 0.39, 0.44, 0.51, 0.58],
                    ariaLabel: "Average weekly deal size, 12 weeks, trending up",
                    showArea: true,
                    style: { spacing: { paddingTop: "sm" } },
                  },
                ],
              },
              {
                id: "sales1-pipeline",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "sales1-pipe-stat",
                    type: "stat",
                    value: "$3.1M",
                    label: "Qualified pipeline · 28 open deals",
                  },
                  {
                    id: "sales1-pipe-progress",
                    type: "progress",
                    value: 54,
                    label: "Pipeline coverage (aim for 3x)",
                    showValue: true,
                    style: { spacing: { paddingTop: "sm" }, sizing: { width: "full" } },
                  },
                ],
              },
              {
                id: "sales1-churn",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "sales1-churn-stat",
                    type: "stat",
                    value: "2.3%",
                    label: "Net churn · down three points",
                  },
                  {
                    id: "sales1-churn-note",
                    type: "text",
                    text: "Coverage target missed twice this quarter. Flagged for Q4 planning, not hidden.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                ],
              },
            ],
          },
          {
            id: "sales1-lower-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
            children: [
              {
                id: "sales1-bars-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "sales1-bars-heading",
                    type: "heading",
                    level: 3,
                    text: "Revenue by segment ($K)",
                    style: { typography: { size: "lg", weight: "semibold" } },
                  },
                  {
                    id: "sales1-bars",
                    type: "bar-chart",
                    bars: [
                      { label: "SMB", value: 312 },
                      { label: "Mid", value: 640 },
                      { label: "Ent", value: 468 },
                    ],
                    showValues: true,
                    style: { spacing: { paddingTop: "md" }, sizing: { width: "full" } },
                  },
                ],
              },
              {
                id: "sales1-table-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "sales1-table-heading",
                    type: "heading",
                    level: 3,
                    text: "Top 5 open deals",
                    style: { typography: { size: "lg", weight: "semibold" } },
                  },
                  {
                    id: "sales1-open-deals",
                    type: "table",
                    headers: ["Account", "Stage", "Owner"],
                    rows: [
                      ["Kestrel Freight", "Legal", "M. Ferreira"],
                      ["Harrow Foods", "Trial (d22)", "J. Okafor"],
                      ["Bluestone Clinics", "Pilot", "M. Ferreira"],
                      ["Vanta Rail", "Proposal", "S. Lindqvist"],
                      ["Copperline", "Discovery", "S. Lindqvist"],
                    ],
                    caption: "Pulled from CRM Oct 14. Slipped deals hidden on purpose — see the churn note.",
                    style: { sizing: { width: "full" }, spacing: { paddingTop: "sm" } },
                  },
                ],
              },
            ],
          },
          {
            id: "sales1-footer-link",
            type: "link",
            label: "See the same numbers in the live board →",
            href: "/sales/board/2026-10-14",
            openInNewTab: false,
          },
        ],
      },
    ],
  },
};

export const CURATED_SHOWCASE_BATCH_1: ComponentDocument[] = [
  PODCAST_EPISODE_SPOTLIGHT_DOCUMENT,
  LAUNCH_FILM_HERO_DOCUMENT,
  COURSE_SYLLABUS_TABLE_DOCUMENT,
  STARTUP_ROADMAP_TIMELINE_DOCUMENT,
  SALES_ONE_PAGER_DASHBOARD_DOCUMENT,
];
