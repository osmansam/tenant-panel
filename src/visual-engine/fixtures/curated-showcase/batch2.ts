import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED SHOWCASE — BATCH 2 (CHANGELOG, STATUS, HEALTH, RECAP, DOCS)
 * ============================================================================
 */

/**
 * SHOWCASE-06: Weekly Changelog
 * A changelog as a company diary: dated entries on a rail, fix-note copy
 * that admits actual bugs, keyboard grab-bag, and a "known issues" alert.
 */
export const WEEKLY_CHANGELOG_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "weekly-changelog",
  name: "Weekly Changelog",
  kind: "section",
  root: {
    id: "log1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "log1-stack",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "3xl", align: "center" } },
        children: [
          {
            id: "log1-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "log1-tags",
                type: "tags",
                items: ["Week 41", "1 new", "3 fixes", "2 breaks"],
              },
              {
                id: "log1-heading",
                type: "heading",
                level: 2,
                text: "Changelog: week 41",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "log1-lede",
                type: "text",
                text: "Short one this week — two of us were at RustConf and the third shipped everything. Which is either a compliment or a staffing problem.",
                style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "log1-timeline",
            type: "timeline",
            entries: [
              { title: "Oct 9 — Saved views", description: "Pin any filtered list as a view. Renaming one is right-click now; last week you had to duplicate and delete, which was embarrassing." },
              { title: "Oct 7 — Fixed: Gregorian calendar parsing", description: "Dates like '24-10-03' weren't ambiguous to us either, but Excel disagreed. Now we read the sheet locale first. Affected 41 workspaces." },
              { title: "Oct 7 — Fixed: mobile keyboard crash", description: "The comment box on iOS 18.1 blanked the draft when the keyboard rotated. Repro'd on a borrowed SE. Gone." },
              { title: "Oct 4 — Breaking: API v1 rate limits", description: "v1 keys now share the same pool as v2 — combined budget, not double the room. Read the migration note before Nov 1." },
            ],
            style: { sizing: { width: "full" } },
          },
          {
            id: "log1-alert",
            type: "alert",
            variant: "warning",
            body: "The old /v1/rate-limit endpoint shows the wrong remaining quota for the first 60 seconds after a deploy. Client-side caching hides it. We're fixing it properly next week.",
            title: "Known issue",
          },
          {
            id: "log1-kbd-row",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            children: [
              {
                id: "log1-kbd-title",
                type: "text",
                text: "New shortcuts worth knowing",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "log1-kbd",
                type: "kbd",
                keys: ["⌥", "→"],
              },
              {
                id: "log1-kbd-explain",
                type: "text",
                text: "jumps between saved views without leaving the keyboard.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-07: SaaS Status Page
 * Current incidents with plain-language explanations, component health
 * bars, a 90-day uptime chart including the bad days, and where the
 * numbers live if someone wants to sue us for honesty.
 */
export const SAAS_STATUS_PAGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "saas-status-page",
  name: "SaaS Status Page",
  kind: "section",
  root: {
    id: "status1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "status1-stack",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
        children: [
          {
            id: "status1-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { sizing: { width: "full" } },
            children: [
              {
                id: "status1-heading",
                type: "heading",
                level: 1,
                text: "Mostly operational",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "status1-sub",
                type: "text",
                text: "One component degraded. Numbers below are the raw kind — no rounded corners, no nice averages.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "status1-alert",
            type: "alert",
            variant: "warning",
            body: "Touch ID sign-in on iOS is failing for roughly 6% of attempts since 09:20 UTC. Passwords work fine. We've traced it to a cert pinning change; rollback is staged for 13:00 UTC and we'll keep this banner up until the graph stays flat.",
            title: "Degraded — iOS biometric sign-in",
          },
          {
            id: "status1-health-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "md" }, sizing: { width: "full" } },
            children: [
              {
                id: "status1-api-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "status1-api-progress",
                    type: "progress",
                    value: 99,
                    label: "API · p99 latency 184ms",
                    showValue: true,
                  },
                ],
              },
              {
                id: "status1-db-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "status1-db-progress",
                    type: "progress",
                    value: 100,
                    label: "Postgres primary · replication lag 0.4s",
                    showValue: true,
                  },
                ],
              },
              {
                id: "status1-web-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "status1-web-progress",
                    type: "progress",
                    value: 100,
                    label: "Web app · 100% healthy",
                    showValue: true,
                  },
                ],
              },
              {
                id: "status1-auth-card",
                type: "card", element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
                children: [
                  {
                    id: "status1-auth-progress",
                    type: "progress",
                    value: 94,
                    label: "Auth (iOS biometrics) · degraded",
                    showValue: true,
                  },
                ],
              },
            ],
          },
          {
            id: "status1-uptime-block",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { sizing: { width: "full" } },
            children: [
              {
                id: "status1-bars-heading",
                type: "heading",
                level: 2,
                text: "90-day API success rate (%)",
                style: { typography: { size: "2xl", weight: "semibold" } },
              },
              {
                id: "status1-bars",
                type: "bar-chart",
                bars: [
                  { label: "Aug", value: 994 },
                  { label: "Sep", value: 972 },
                  { label: "Oct", value: 991 },
                ],
                showValues: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "status1-bars-note",
                type: "text",
                text: "Sep's 97.2% is the EU outage from the 14th. Postmortem is public; the short version is a bad S3 manifest and a change process we then rewrote.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "status1-history",
            type: "table",
            headers: ["Incident", "Window (UTC)", "Impact"],
            rows: [
              ["EU collection outage", "Sep 14, 08:02–10:41", "Ingest offline for EU workspaces"],
              ["Slow dashboard loads", "Oct 2, 03:15–03:40", "25-minute slowdown"],
              ["iOS biometric sign-in", "Oct 12, 09:20–ongoing", "6% sign-in attempts failing"],
            ],
            caption: "History is kept exactly as measured. Contract SLA reports go out on the 1st.",
            style: { sizing: { width: "full" } },
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-08: Transformation Tracker Card
 * A personal-training season in one card: week count progress, the plan for
 * the remaining weeks, strength bars, and one quote from the athlete that
 * isn't motivational-poster material.
 */
export const TRANSFORMATION_TRACKER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "transformation-tracker",
  name: "Personal Transformation Tracker",
  kind: "section",
  root: {
    id: "fit1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "fit1-card",
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
            id: "fit1-inner",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "lg",
            style: { sizing: { width: "full" } },
            children: [
              {
                id: "fit1-badge",
                type: "badge",
                text: "DANA · BLOCK 3 OF 3",
                style: { color: { background: "surface-muted", text: "primary" }, border: { radius: "full" }, spacing: { paddingX: "md", paddingY: "xs" } },
              },
              {
                id: "fit1-progress",
                type: "progress",
                value: 68,
                label: "Week 8 of 12 complete",
                showValue: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "fit1-steps",
                type: "steps",
                items: ["Reset the base", "Build the squat", "Peak and test"],
                current: 2,
                style: { sizing: { width: "full" } },
              },
              {
                id: "fit1-bars-heading",
                type: "text",
                text: "Strength change since week 1",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "fit1-bars",
                type: "bar-chart",
                bars: [
                  { label: "Barbell squat", value: 32 },
                  { label: "Deadlift", value: 41 },
                  { label: "Dip", value: 55 },
                  { label: "Bodyweight", value: 6 },
                ],
                showValues: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "fit1-quote",
                type: "quote",
                quote: "I came for squats. I stayed because Sam never asked me what I weigh.",
                author: "Dana M.",
                role: "Member since March",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-09: Webinar Recap
 * Recording embed up top, then the run-of-show as it actually happened,
 * attendee tags, and one stat. Written the day after, from the Q&A that
 * ran long, with the honest "we ran out of time" line.
 */
export const WEBINAR_RECAP_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "webinar-recap",
  name: "Webinar Recap",
  kind: "section",
  root: {
    id: "web1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "web1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          {
            id: "web1-video",
            type: "embed",
            src: "https://player.ozmi.example/videos/workshop-42-recap",
            title: "Live model workshop #42, recording, 53 minutes",
            aspectRatio: "wide",
            loading: "lazy",
            layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
            style: { border: { radius: "lg", width: "thin", color: "border", shadow: "sm" }, sizing: { width: "full" } },
          },
          {
            id: "web1-side",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
            children: [
              {
                id: "web1-tags",
                type: "tags",
                items: ["Recording", "Workshop #42", "53 min", "312 attendees"],
                style: { typography: { size: "sm" } },
              },
              {
                id: "web1-heading",
                type: "heading",
                level: 2,
                text: "Everything we demoed, in the order we demoed it",
                style: { typography: { size: "xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "web1-attendance",
                type: "stat",
                value: "78%",
                label: "stayed to the end — the dropout spike was at the DB migration part, we know",
              },
              {
                id: "web1-slides-link",
                type: "link",
                label: "Get the slides + sample repo →",
                href: "/workshops/42/materials",
                openInNewTab: false,
              },
            ],
          },
          {
            id: "web1-agenda",
            type: "timeline",
            entries: [
              { title: "00:00 — Cold open", description: "Why our retrieval lag doubled when we added caching, and what the dashboard hid from us for two weeks." },
              { title: "12:40 — The migration nobody wants to run", description: "Live migration on a 400M-row table with the failover script on screen. It failed once; you'll see when and why." },
              { title: "31:15 — Q&A that ran 18 minutes over", description: "Answered 14 of 23 questions on air. The rest are written up in the repo README under workshop/42/issues." },
            ],
            layout: { span: { mobile: 12, tablet: 12, desktop: 12 } },
            style: { sizing: { width: "full" } },
          },
          {
            id: "web1-note",
            type: "alert",
            variant: "info",
            body: "We ran out of time for the cost-per-query segment. Priya is covering it in the October office hours — that's next Thursday, not a new video. Sorry.",
            title: "One section missing",
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-10: Help Center Article
 * A support article as it should look: the error explained, the five-minute
 * fix table, the escalation boundary, and the keyboard path for people who
 * tab through everything.
 */
export const HELP_CENTER_ARTICLE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "help-center-article",
  name: "Help Center Article",
  kind: "section",
  root: {
    id: "help1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "help1-stack",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: { sizing: { width: "full", maxWidth: "3xl", align: "center" } },
        children: [
          {
            id: "help1-tags",
            type: "tags",
            items: ["Billing", "Stripe", "Invoices"],
          },
          {
            id: "help1-heading",
            type: "heading",
            level: 1,
            text: "Card declined but the invoice still shows paid?",
            style: { typography: { size: "2xl", weight: "bold", tracking: "tight", leading: "tight" } },
          },
          {
            id: "help1-body",
            type: "text",
            text: "This happens when your bank approves the pre-auth check after the retry attempt. The money isn't double-charged — there's a hold, not a payment. Here's how to clear it yourself in about five minutes.",
            style: { typography: { size: "lg", leading: "relaxed" }, color: { text: "text-muted" } },
          },
          {
            id: "help1-fixes",
            type: "table",
            headers: ["What you see", "What happened", "Wait time to clear"],
            rows: [
              ["Invoice paid, bank shows hold", "Pre-auth succeeded after the charge retried", "1–3 banking days — the hold drops itself"],
              ["Invoice unpaid, bank shows hold", "Both attempts bounced; only the hold was left", "Call the bank and release it manually"],
              ["Both, twice", "Two retry cycles ran against cards on file", "Contact billing@ — we'll void the cycle"],
            ],
            style: { sizing: { width: "full" } },
          },
          {
            id: "help1-evidence",
            type: "kbd",
            keys: ["Billing", "Invoices", "⟶", "Payment log"],
            style: { typography: { size: "sm" } },
          },
          {
            id: "help1-kbd-caption",
            type: "text",
            text: "tap where you'd click, if you're flying through with the keyboard.",
            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
          },
          {
            id: "help1-boundary",
            type: "alert",
            variant: "danger",
            body: "We can't release a bank hold. Nobody at Ozmi can — the hold sits with your bank until it expires. If an 'agent' claims otherwise, that's a scam attempt; report it to us and your bank.",
            title: "Honest boundary",
          },
        ],
      },
    ],
  },
};

export const CURATED_SHOWCASE_BATCH_2: ComponentDocument[] = [
  WEEKLY_CHANGELOG_DOCUMENT,
  SAAS_STATUS_PAGE_DOCUMENT,
  TRANSFORMATION_TRACKER_DOCUMENT,
  WEBINAR_RECAP_DOCUMENT,
  HELP_CENTER_ARTICLE_DOCUMENT,
];
