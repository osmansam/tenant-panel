import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI CURATED SHOWCASE — BATCH 4 (EXPERIMENTS, HOME TECH, ONBOARDING,
 * LANGUAGE PRACTICE, FUNDRAISING)
 * ============================================================================
 */

/**
 * SHOWCASE-16: Experiment Log
 * A growth team's A/B test diary: the two variants as bars, confidence
 * progress, decision timeline, and the guardrail note most teams forget
 * to publish.
 */
export const EXPERIMENT_LOG_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "experiment-log",
  name: "A/B Experiment Log",
  kind: "section",
  root: {
    id: "exp1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "exp1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "exp1-left",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "exp1-badge",
                type: "badge",
                text: "EXP-041 · PRICING PAGE · STOPPED 3 DAYS EARLY",
                style: { color: { background: "surface-muted", text: "primary" }, border: { radius: "full" }, spacing: { paddingX: "md", paddingY: "xs" } },
              },
              {
                id: "exp1-heading",
                type: "heading",
                level: 2,
                text: "Anchor first, discounts never",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight" } },
              },
              {
                id: "exp1-bars",
                type: "bar-chart",
                bars: [
                  { label: "Control A", value: 412 },
                  { label: "Anchor B", value: 548 },
                ],
                showValues: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "exp1-bars-caption",
                type: "text",
                text: "Trial starts per 10,000 sessions over 26 days. uGEMM within the window echoed it: +31% on p95 claims.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
              {
                id: "exp1-confidence",
                type: "progress",
                value: 97,
                label: "Statistical confidence",
                showValue: true,
                style: { sizing: { width: "full" } },
              },
            ],
          },
          {
            id: "exp1-right",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "exp1-timeline-heading",
                type: "text",
                text: "How the call unfolded",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "exp1-timeline",
                type: "timeline",
                entries: [
                  { title: "Sep 18 — shipped", description: "Variants split 50/50 on the pricing page only, not checkout. Learned that the hard way in EXP-038." },
                  { title: "Sep 26 — peeked, regretted", description: "One peek on day 8 showed +9%. We logged it and walked away from the spreadsheet like adults." },
                  { title: "Oct 11 — called it", description: "Crossed 95% at the power we'd pre-registered. Ship B, day 3 early, with a guardrail still live in case support tickets spike." },
                ],
                style: { sizing: { width: "full" } },
              },
              {
                id: "exp1-guardrail",
                type: "alert",
                variant: "warning",
                body: "B made trial starts jump 7 points, but gross plan mix shifted down 2.1% — we're shipping it anyway and watching net revenue for two weeks before we call the pricing story done.",
                title: "Guardrail we're not ignoring",
              },
              {
                id: "exp1-tags",
                type: "tags",
                items: ["Pricing", "High traffic pages", "Owner: Priya"],
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-17: Smart Home Spec Sheet
 * A product-spec card for one wall controller: demo embed, the pairing
 * chords on real keys, the electrical table in mm and volts like an
 * electrician would draw it, and the honest compatibility line.
 */
export const SMART_HOME_SPEC_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "smart-home-spec",
  name: "Smart Home Spec Sheet",
  kind: "section",
  root: {
    id: "home2-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "home2-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "6xl", align: "center" } },
        children: [
          {
            id: "home2-film",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "home2-video",
                type: "video",
                src: "https://cdn.ozmi.example/hardware/scenario-bulb/demo.mp4",
                title: "Scenario Bulb S2 demo: one wall, four scenes, 51 seconds",
                poster: "https://cdn.ozmi.example/hardware/scenario-bulb/demo-poster.jpg",
                aspectRatio: "landscape",
                style: {
                  border: { radius: "lg", width: "thin", color: "border", shadow: "md" },
                  sizing: { width: "full" },
                },
              },
              {
                id: "home2-kbd-title",
                type: "text",
                text: "Pair a scene from a wall unit",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "home2-kbd",
                type: "kbd",
                keys: ["Touch", "🌗 3s", "Release", "Name it"],
                style: { typography: { size: "sm" } },
              },
              {
                id: "home2-kbd-caption",
                type: "text",
                text: "hold the third bulb's touch point until the ring blinks once — no app necessary for pairing.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "home2-spec",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "home2-heading",
                type: "heading",
                level: 2,
                text: "Scenario Bulb S2 — the wall unit that survived the dust test",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "home2-body",
                type: "text",
                text: "Thread and Matter both, BLE for first-run setup, and a relay rated for inductives like garage motors — the part most modules quietly don't publish, so we publish it:",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "home2-spec-table",
                type: "table",
                headers: ["Spec", "Value", "Where it's sourced"],
                rows: [
                  ["Standby draw", "0.6 W", "UL-verified measurement sheet, Rev 4"],
                  ["Relay max", "4 A inductive / 10 A resistive", "In-house bench + external lab (SGS, Jun 2026)"],
                  ["Wireless range", "Up to 44 m in indoor walls", "Matter mesh with typical bone-lath walls"],
                  ["Dimensions", "Ø 86 mm × 29 mm", "Fits standard 68/65/60 mm rings"],
                ],
                style: { sizing: { width: "full" } },
              },
              {
                id: "home2-compat-alert",
                type: "alert",
                variant: "info",
                body: "Matter control for lighting works with every current controller we've tested. Matter energy-tracking is firmware-gated and lands in the Q4 update — the spec sheet does not pretend it's ready yet.",
                title: "Honest compatibility",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-18: First-Week Onboarding Checklist
 * Day-by-day first week with the 'you're done' progress bar, peer tags,
 * and a subtle alert about what HR still owes you.
 */
export const FIRST_WEEK_ONBOARDING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "first-week-onboarding",
  name: "First-Week Onboarding Checklist",
  kind: "section",
  root: {
    id: "onb1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "onb1-inner",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        style: { sizing: { width: "full", maxWidth: "3xl", align: "center" } },
        children: [
          {
            id: "onb1-tags",
            type: "tags",
            items: ["Buddy: ferica.oyelaran", "Day 3 of 5", "Laptop on its second charger"],
            style: { typography: { size: "sm" } },
          },
          {
            id: "onb1-heading",
            type: "heading",
            level: 2,
            text: "You're an engineer here — this is how week one goes",
            style: { typography: { size: "2xl", weight: "bold", tracking: "tight", leading: "tight" } },
          },
          {
            id: "onb1-steps",
            type: "steps",
            items: [
              "Day 1 — accounts, dev env working, one tiny PR landed before lunch",
              "Day 2 — shadow the on-call for 90 minutes; nobody pages you",
              "Day 3 — pick a starter issue from the good-first-issue board",
              "Day 4 — pairing with your buddy on that issue",
              "Day 5 — demo whatever you shipped to the squad on Friday hangout",
            ],
            current: 3,
            style: { sizing: { width: "full" } },
          },
          {
            id: "onb1-progress",
            type: "progress",
            value: 60,
            label: "Three of five days complete",
            showValue: true,
            style: { sizing: { width: "full" } },
          },
          {
            id: "onb1-agenda-heading",
            type: "text",
            text: "What happens after the week one close",
            style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
          },
          {
            id: "onb1-after",
            type: "timeline",
            entries: [
              { title: "Week 2", description: "You take a full ticket through code review yourself. Your buddy can argue in the comments like anyone else." },
              { title: "Week 3", description: "First Friday hangout slot where you present your take on the roadmap deck — bring scepticism, it's useful." },
              { title: "Week 4", description: "On-call shadow turns into full join; the pager is week six, not before." },
            ],
            style: { sizing: { width: "full" } },
          },
          {
            id: "onb1-hr",
            type: "alert",
            variant: "warning",
            body: "Your pension provider form has a known paperwork delay — it's with finance, arrived there Tuesday. If it isn't sorted by Friday ping me, that's my chase, not yours.",
            title: "Still owed paperwork",
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-19: Language Practice Sprint
 * A two-week Spanish sprint card for the person restarting for the
 * fourth time: daily drill table, a streak sparkline that shows the
 * crash, and the mid-sprint bump alert.
 */
export const LANGUAGE_PRACTICE_SPRINT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "language-practice-sprint",
  name: "Language Practice Sprint",
  kind: "section",
  root: {
    id: "lang1-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "lang1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "lg" }, sizing: { width: "full", maxWidth: "5xl", align: "center" } },
        children: [
          {
            id: "lang1-left",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "lang1-tags",
                type: "tags",
                items: ["Spanish · B1 target", "Sprint ends Oct 26"],
              },
              {
                id: "lang1-heading",
                type: "heading",
                level: 2,
                text: "Third time lucky: the streak that survived the flu week",
                style: { typography: { size: "2xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "lang1-lede",
                type: "text",
                text: "The only rule: 20 minutes, anything counts — listening in the van, reading on the tram, or the drill app. On sick days the rule is 20 minutes of subtitles, nothing heroic.",
                style: { typography: { size: "base", leading: "relaxed" }, color: { text: "text-muted" } },
              },
              {
                id: "lang1-streak-heading",
                type: "text",
                text: "Minutes per day",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "lang1-sparkline",
                type: "sparkline",
                points: [28, 32, 26, 34, 31, 22, 6, 8, 14, 26, 30, 33, 35, 36],
                ariaLabel: "Minutes per day across 14 days, dip on days 7 and 8, recovering",
                showArea: true,
                style: { sizing: { width: "full" } },
              },
              {
                id: "lang1-flu",
                type: "alert",
                variant: "success",
                body: "Days 7–8 are the flu. Zero races to redeem, no lesson rescheduled, no money lost. Last time that crash ended the whole streak — this one survived it.",
                title: "The dip on the chart",
              },
            ],
          },
          {
            id: "lang1-right",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "sm",
            layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
            children: [
              {
                id: "lang1-table-heading",
                type: "heading",
                level: 3,
                text: "The daily rotation",
                style: { typography: { size: "lg", weight: "semibold" } },
              },
              {
                id: "lang1-rotation",
                type: "table",
                headers: ["Day", "Main 15 min", "Easy 5 min"],
                rows: [
                  ["Mon / Thu", "Vocabulary drills", "Music in Spanish"],
                  ["Tue / Fri", "Grammar: past tenses", "Telenovela subtitles"],
                  ["Wed", "Live italki session", "Nothing planned — chat is enough"],
                  ["Sat", "Reading the news", "Coffee-order practice"],
                  ["Sun", "1 real conversation", "Anything, in the sofa voice"],
                ],
                caption: "Rotation by block, so it changes when the schedule does.",
                style: { sizing: { width: "full" } },
              },
              {
                id: "lang1-progress",
                type: "progress",
                value: 71,
                label: "Sprint drills: 10 of 14 complete",
                showValue: true,
                style: { sizing: { width: "full" } },
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * SHOWCASE-20: Fundraising Milestone Board
 * A community campaign's money page: the thermometer as progress, the goal
 * curve as bars, milestone gates on a rail, and the closing quote from the
 * person who donated a rusty van.
 */
export const FUNDRAISING_MILESTONE_BOARD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "fundraising-milestone-board",
  name: "Fundraising Milestone Board",
  kind: "section",
  root: {
    id: "fund1-section",
    type: "section",
    style: {
      color: { background: "primary", text: "primary-foreground" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "fund1-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          {
            id: "fund1-top",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 12 } },
            children: [
              {
                id: "fund1-tags",
                type: "tags",
                items: ["44 days left", "312 backers", "£17,240 of £24,000"],
              },
              {
                id: "fund1-heading",
                type: "heading",
                level: 1,
                text: "Save the Greenway tool shed",
                style: { typography: { size: "6xl", weight: "bold", tracking: "tight", leading: "tight" } },
              },
              {
                id: "fund1-progress",
                type: "progress",
                value: 72,
                label: "Raised so far",
                showValue: true,
                style: { sizing: { width: "full", maxWidth: "3xl", align: "start" } },
              },
            ],
          },
          {
            id: "fund1-weekly-card",
            type: "card", element: "article",
            layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
            style: { color: { background: "surface", text: "text" }, border: { radius: "lg", width: "thin", color: "border" }, spacing: { padding: "lg" } },
            children: [
              {
                id: "fund1-bars-heading",
                type: "heading",
                level: 3,
                text: "Pledges by week (£)",
                style: { typography: { size: "lg", weight: "semibold" } },
              },
              {
                id: "fund1-bars",
                type: "bar-chart",
                bars: [
                  { label: "W1", value: 4820 },
                  { label: "W2", value: 2760 },
                  { label: "W3", value: 5880 },
                  { label: "W4", value: 3780 },
                ],
                showValues: true,
                style: { spacing: { paddingTop: "sm" }, sizing: { width: "full" } },
              },
              {
                id: "fund1-bars-caption",
                type: "text",
                text: "W4 is the parish newsletter printing the wrong email — 40 people replied to a dead inbox and we lost the weekend.",
                style: { typography: { size: "sm" }, color: { text: "text-muted" } },
              },
            ],
          },
          {
            id: "fund1-milestones",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "md",
            layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
            children: [
              {
                id: "fund1-timeline",
                type: "timeline",
                entries: [
                  { title: "£6,000 — roof estimate deposit", description: "Paid Oct 4. Bill from Hargreaves & Son, who fixed the joist in 1989 and is back for round two." },
                  { title: "£12,000 — roof + guttering", description: "Unlocked. Scaffold booking pencilled for Nov 3, weather decides the final weekday." },
                  { title: "£24,000 — rewire + full weather-proofing", description: "The finish line. Anything past the goal goes to the tools fund, not the project fund — in writing." },
                ],
                style: { sizing: { width: "full" } },
              },
              {
                id: "fund1-spark-heading",
                type: "text",
                text: "Backer count, last 12 days",
                style: { typography: { size: "sm", weight: "semibold", tracking: "wide" } },
              },
              {
                id: "fund1-sparkline",
                type: "sparkline",
                points: [88, 104, 119, 126, 143, 158, 171, 184, 206, 224, 239, 262],
                ariaLabel: "Backer count rising from 88 to 312 over 12 days",
                showArea: true,
              },
              {
                id: "fund1-quote",
                type: "quote",
                quote: "The van's old enough that I'd rather it did one good thing with someone who'll notice it's gone.",
                author: "Tom Ashworth",
                role: "donated a 1998 Transit in working order",
              },
              {
                id: "fund1-cta",
                type: "button",
                label: "Back the shed",
                href: "/campaign/greenway-shed/back",
                accessibleLabel: "Back the Greenway tool shed campaign",
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

export const CURATED_SHOWCASE_BATCH_4: ComponentDocument[] = [
  EXPERIMENT_LOG_DOCUMENT,
  SMART_HOME_SPEC_DOCUMENT,
  FIRST_WEEK_ONBOARDING_DOCUMENT,
  LANGUAGE_PRACTICE_SPRINT_DOCUMENT,
  FUNDRAISING_MILESTONE_BOARD_DOCUMENT,
];
