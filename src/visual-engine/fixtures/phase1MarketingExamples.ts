import type { ComponentDocument } from "../model";

/**
 * Four editable marketing-section examples built from the Phase 1 native nodes.
 * They intentionally remain ordinary version-2 documents so saving, copying,
 * templating, effects, animations, bindings, and future migrations all use the
 * same paths as every other Visual Builder document.
 */

export const TEACHER_PROFILE_HERO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-teacher-learning-path",
  name: "Teacher · Guided Learning Hero",
  kind: "section",
  root: {
    id: "teacher-hero-section",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "xl" },
      color: { background: "background", text: "text" },
    },
    children: [
      {
        id: "teacher-hero-overlay",
        type: "overlay",
        alignment: "center-start",
        inset: "xl",
        mobileFallback: "stack",
        tint: { color: { kind: "token", value: "background" }, opacity: 0.5 },
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
          border: { radius: "3xl", shadow: "xl" },
        },
        children: [
          {
            id: "teacher-hero-background-slot",
            type: "slot",
            name: "background",
            children: [
              {
                id: "teacher-hero-image",
                type: "image",
                src: "/visual-builder/placeholder.svg",
                alt: "Teacher guiding students through a collaborative lesson",
                aspectRatio: "wide",
                objectFit: "cover",
                style: { sizing: { width: "full", height: "40rem", fit: "cover" } },
              },
            ],
          },
          {
            id: "teacher-hero-content-slot",
            type: "slot",
            name: "content",
            children: [
              {
                id: "teacher-hero-content-card",
                type: "card",
                element: "article",
                style: {
                  spacing: { padding: "xl" },
                  color: { background: "surface", text: "text" },
                  border: { radius: "xl", width: "hairline", color: "border", shadow: "lg" },
                  sizing: { width: "full", maxWidth: "3xl" },
                },
                children: [
                  {
                    id: "teacher-hero-content-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "teacher-hero-badge",
                        type: "badge",
                        text: "Enrollment open · Fall cohort",
                        style: {
                          spacing: { paddingX: "md", paddingY: "xs" },
                          color: { background: "primary-soft", text: "primary-deep" },
                          border: { radius: "full" },
                          typography: { size: "sm", weight: "semibold" },
                        },
                      },
                      {
                        id: "teacher-hero-heading",
                        type: "heading",
                        level: 1,
                        text: "Build confidence that lasts beyond the classroom.",
                        style: {
                          typography: { family: "playfair-display", size: "6xl", weight: "bold", leading: "tight", tracking: "tight" },
                        },
                      },
                      {
                        id: "teacher-hero-copy",
                        type: "text",
                        text: "Personalized tutoring for curious learners, with clear milestones for students and parents at every step.",
                        style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed" } },
                      },
                      {
                        id: "teacher-hero-rating",
                        type: "rating",
                        value: 5,
                        max: 5,
                        showValue: true,
                        accessibleLabel: "Rated five out of five by families",
                        style: { color: { text: "warning" }, typography: { weight: "semibold" } },
                      },
                      {
                        id: "teacher-hero-list",
                        type: "list",
                        marker: "check",
                        items: [
                          "Weekly one-to-one learning plan",
                          "Progress notes after every session",
                          "Flexible online and in-person lessons",
                        ],
                        style: { spacing: { gap: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "teacher-hero-actions",
                        type: "flex",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: true,
                        gap: "sm",
                        children: [
                          {
                            id: "teacher-hero-primary-action",
                            type: "button",
                            label: "Book a discovery lesson",
                            href: "/book-a-lesson",
                            iconId: "calendar-days",
                            iconPosition: "start",
                            accessibleLabel: "Book a discovery lesson",
                            style: {
                              spacing: { paddingX: "lg", paddingY: "md" },
                              color: { background: "primary", text: "primary-foreground" },
                              border: { radius: "full" },
                              typography: { weight: "semibold" },
                            },
                          },
                          {
                            id: "teacher-hero-secondary-action",
                            type: "link",
                            label: "Explore the curriculum →",
                            href: "/curriculum",
                            openInNewTab: false,
                            accessibleLabel: "Explore the tutoring curriculum",
                            style: { color: { text: "primary" }, typography: { weight: "semibold" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const LAWYER_TRUST_HERO_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "hero-lawyer-trusted-counsel",
  name: "Lawyer · Trusted Counsel Hero",
  kind: "section",
  root: {
    id: "lawyer-hero-section",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "2xl" },
      color: { background: "surface-muted", text: "text" },
    },
    children: [
      {
        id: "lawyer-hero-grid",
        type: "grid",
        columns: 12,
        style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          {
            id: "lawyer-hero-copy-stack",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "center",
            wrap: false,
            gap: "lg",
            layout: {
              placement: {
                mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                desktop: { column: 1, row: 1, columnSpan: 7, rowSpan: 1 },
              },
            },
            children: [
              {
                id: "lawyer-hero-badge",
                type: "badge",
                text: "Practical counsel · Clear next steps",
                style: {
                  spacing: { paddingX: "md", paddingY: "xs" },
                  color: { background: "accent-soft", text: "text" },
                  border: { radius: "full" },
                  typography: { size: "sm", weight: "semibold", tracking: "wide" },
                },
              },
              {
                id: "lawyer-hero-icon-row",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: false,
                gap: "sm",
                children: [
                  {
                    id: "lawyer-hero-scale-icon",
                    type: "icon",
                    iconId: "scale",
                    size: 32,
                    decorative: false,
                    accessibleLabel: "Scales of justice",
                    style: { color: { text: "primary" } },
                  },
                  {
                    id: "lawyer-hero-kicker",
                    type: "text",
                    text: "HART & VALE LEGAL",
                    style: { typography: { size: "sm", weight: "bold", tracking: "wide" }, color: { text: "text-muted" } },
                  },
                ],
              },
              {
                id: "lawyer-hero-heading",
                type: "heading",
                level: 1,
                text: "Steady guidance when the stakes are high.",
                style: { typography: { family: "playfair-display", size: "6xl", weight: "bold", leading: "tight", tracking: "tight" } },
              },
              {
                id: "lawyer-hero-copy",
                type: "text",
                text: "Strategic representation for business, employment, and complex civil matters—explained in language you can act on.",
                style: { color: { text: "text-muted" }, typography: { size: "xl", leading: "relaxed" }, sizing: { maxWidth: "3xl" } },
              },
              {
                id: "lawyer-hero-benefits",
                type: "list",
                marker: "icon",
                iconId: "shield-check",
                items: ["Confidential case assessment", "Direct attorney access", "Transparent scope and fees"],
                style: { color: { text: "text-muted" }, typography: { size: "base" } },
              },
              {
                id: "lawyer-hero-actions",
                type: "flex",
                direction: "row",
                alignment: "center",
                distribution: "start",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "lawyer-hero-primary-action",
                    type: "button",
                    label: "Request a consultation",
                    href: "/consultation",
                    iconId: "arrow-right",
                    iconPosition: "end",
                    accessibleLabel: "Request a confidential legal consultation",
                    style: {
                      spacing: { paddingX: "lg", paddingY: "md" },
                      color: { background: "primary", text: "primary-foreground" },
                      border: { radius: "sm" },
                      typography: { weight: "semibold" },
                    },
                  },
                  {
                    id: "lawyer-hero-phone-link",
                    type: "link",
                    label: "Call (555) 014-2026",
                    href: "tel:+15550142026",
                    openInNewTab: false,
                    accessibleLabel: "Call Hart and Vale Legal",
                    style: { color: { text: "primary" }, typography: { weight: "semibold" } },
                  },
                ],
              },
            ],
          },
          {
            id: "lawyer-hero-proof-card",
            type: "card",
            element: "article",
            layout: {
              placement: {
                mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                desktop: { column: 8, row: 1, columnSpan: 5, rowSpan: 1 },
              },
            },
            style: {
              spacing: { padding: "xl" },
              color: { background: "surface", text: "text" },
              border: { radius: "xl", width: "hairline", color: "border", shadow: "lg" },
            },
            children: [
              {
                id: "lawyer-hero-proof-stack",
                type: "stack",
                direction: "column",
                alignment: "stretch",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  {
                    id: "lawyer-hero-proof-icon",
                    type: "icon",
                    iconId: "building-library",
                    size: 48,
                    decorative: false,
                    accessibleLabel: "Established law practice",
                    style: { color: { text: "primary" } },
                  },
                  { id: "lawyer-hero-proof-heading", type: "heading", level: 2, text: "Experience you can measure.", style: { typography: { size: "2xl", weight: "bold" } } },
                  {
                    id: "lawyer-hero-stats",
                    type: "flex",
                    direction: "row",
                    alignment: "start",
                    distribution: "between",
                    wrap: true,
                    gap: "lg",
                    children: [
                      { id: "lawyer-hero-stat-years", type: "stat", value: "18", suffix: "+", label: "Years in practice", style: { typography: { size: "xl", weight: "bold" }, color: { text: "primary" } } },
                      { id: "lawyer-hero-stat-matters", type: "stat", value: "1,200", suffix: "+", label: "Matters advised", style: { typography: { size: "xl", weight: "bold" }, color: { text: "primary" } } },
                    ],
                  },
                  { id: "lawyer-hero-divider", type: "divider", style: { color: { text: "border" } } },
                  { id: "lawyer-hero-proof-copy", type: "text", text: "Licensed counsel. Responsive communication. A strategy built around your real-world priorities.", style: { color: { text: "text-muted" }, typography: { leading: "relaxed" } } },
                  { id: "lawyer-hero-credentials-link", type: "link", label: "View credentials and practice areas →", href: "/about", openInNewTab: false, style: { color: { text: "primary" }, typography: { weight: "semibold" } } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const TEACHER_ENROLLMENT_CTA_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-teacher-enrollment",
  name: "Teacher · Enrollment Story CTA",
  kind: "section",
  root: {
    id: "teacher-cta-section",
    type: "section",
    style: { spacing: { paddingX: "lg", paddingY: "2xl" }, color: { background: "background", text: "text" } },
    children: [
      {
        id: "teacher-cta-card",
        type: "card",
        element: "article",
        style: {
          spacing: { padding: "xl" },
          color: { background: "gradient-surface", text: "text" },
          border: { radius: "3xl", width: "hairline", color: "border", shadow: "lg" },
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          {
            id: "teacher-cta-grid",
            type: "grid",
            columns: 12,
            style: { spacing: { gap: "xl" } },
            children: [
              {
                id: "teacher-cta-main",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "center",
                wrap: false,
                gap: "md",
                layout: {
                  placement: {
                    mobile: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                    tablet: { column: 1, row: 1, columnSpan: 12, rowSpan: 1 },
                    desktop: { column: 1, row: 1, columnSpan: 7, rowSpan: 1 },
                  },
                },
                children: [
                  { id: "teacher-cta-badge", type: "badge", text: "Only 6 places this term", style: { spacing: { paddingX: "md", paddingY: "xs" }, color: { background: "warning", text: "background" }, border: { radius: "full" }, typography: { size: "sm", weight: "bold" } } },
                  { id: "teacher-cta-heading", type: "heading", level: 2, text: "Give your learner a plan they feel excited to follow.", style: { typography: { family: "playfair-display", size: "4xl", weight: "bold", leading: "tight" } } },
                  { id: "teacher-cta-copy", type: "text", text: "Start with a friendly 30-minute assessment. You’ll leave with clear priorities, recommended sessions, and no pressure to enroll.", style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed" } } },
                  {
                    id: "teacher-cta-proof-row",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "lg",
                    children: [
                      { id: "teacher-cta-stat", type: "stat", value: "92", suffix: "%", label: "renew for another term", style: { color: { text: "primary" }, typography: { size: "xl", weight: "bold" } } },
                      { id: "teacher-cta-rating", type: "rating", value: 4.5, max: 5, showValue: true, accessibleLabel: "Average family rating is four and a half out of five", style: { color: { text: "warning" }, typography: { weight: "semibold" } } },
                    ],
                  },
                  {
                    id: "teacher-cta-actions",
                    type: "flex",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "md",
                    children: [
                      { id: "teacher-cta-primary-action", type: "button", label: "Reserve an assessment", href: "/assessment", iconId: "book-open", iconPosition: "start", accessibleLabel: "Reserve a learning assessment", style: { spacing: { paddingX: "lg", paddingY: "md" }, color: { background: "primary", text: "primary-foreground" }, border: { radius: "full" }, typography: { weight: "semibold" } } },
                      { id: "teacher-cta-link", type: "link", label: "Ask a question first", href: "mailto:hello@example.com", openInNewTab: false, accessibleLabel: "Email the teacher with a question", style: { color: { text: "primary" }, typography: { weight: "semibold" } } },
                    ],
                  },
                ],
              },
              {
                id: "teacher-cta-story-card",
                type: "card",
                element: "article",
                layout: {
                  placement: {
                    mobile: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                    tablet: { column: 1, row: 2, columnSpan: 12, rowSpan: 1 },
                    desktop: { column: 8, row: 1, columnSpan: 5, rowSpan: 1 },
                  },
                },
                style: { spacing: { padding: "lg" }, color: { background: "surface", text: "text" }, border: { radius: "xl", width: "hairline", color: "border" } },
                children: [
                  {
                    id: "teacher-cta-story-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "center",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "teacher-cta-avatar", type: "avatar", src: "/visual-builder/placeholder.svg", alt: "Portrait of Maya, a student's parent", fallback: "MK", style: { sizing: { fit: "cover" }, custom: { width: "4rem", height: "4rem" }, border: { radius: "full" } } },
                      { id: "teacher-cta-quote", type: "quote", quote: "For the first time, homework stopped feeling like a nightly argument. My daughter knows what to do—and believes she can do it.", author: "Maya K.", role: "Parent of a Year 8 student", style: { typography: { family: "merriweather", size: "lg", leading: "relaxed" } } },
                      { id: "teacher-cta-small-rating", type: "rating", value: 5, max: 5, showValue: false, accessibleLabel: "Maya rated the tutoring five out of five", style: { color: { text: "warning" } } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const LAWYER_CONSULTATION_CTA_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-lawyer-consultation",
  name: "Lawyer · Confidential Consultation CTA",
  kind: "section",
  root: {
    id: "lawyer-cta-section",
    type: "section",
    style: { spacing: { paddingX: "lg", paddingY: "2xl" }, color: { background: "background", text: "text" } },
    children: [
      {
        id: "lawyer-cta-overlay",
        type: "overlay",
        alignment: "center-end",
        inset: "xl",
        mobileFallback: "stack",
        tint: { color: { kind: "token", value: "background" }, opacity: 0.56 },
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" }, border: { radius: "3xl", shadow: "xl" } },
        children: [
          {
            id: "lawyer-cta-background-slot",
            type: "slot",
            name: "background",
            children: [
              { id: "lawyer-cta-image", type: "image", src: "/visual-builder/placeholder.svg", alt: "Quiet private meeting room prepared for a legal consultation", aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full", height: "40rem", fit: "cover" } } },
            ],
          },
          {
            id: "lawyer-cta-content-slot",
            type: "slot",
            name: "content",
            children: [
              {
                id: "lawyer-cta-card",
                type: "card",
                element: "article",
                style: { spacing: { padding: "xl" }, color: { background: "surface", text: "text" }, border: { radius: "xl", width: "hairline", color: "border", shadow: "lg" }, sizing: { width: "full", maxWidth: "3xl" } },
                children: [
                  {
                    id: "lawyer-cta-content",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "lawyer-cta-badge", type: "badge", text: "Confidential · No obligation", style: { spacing: { paddingX: "md", paddingY: "xs" }, color: { background: "success", text: "background" }, border: { radius: "full" }, typography: { size: "sm", weight: "semibold" } } },
                      { id: "lawyer-cta-heading", type: "heading", level: 2, text: "Know your options before you make your next move.", style: { typography: { family: "playfair-display", size: "4xl", weight: "bold", leading: "tight" } } },
                      { id: "lawyer-cta-copy", type: "text", text: "A focused consultation gives you a clear view of the risks, likely timelines, and practical routes forward.", style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed" } } },
                      { id: "lawyer-cta-list", type: "list", marker: "icon", iconId: "check-badge", items: ["A direct conversation with an attorney", "A plain-language assessment of your position", "Recommended next steps and likely costs"], style: { color: { text: "text-muted" } } },
                      { id: "lawyer-cta-availability", type: "stat", value: "24", suffix: " hrs", label: "Typical response time", style: { color: { text: "primary" }, typography: { size: "xl", weight: "bold" } } },
                      {
                        id: "lawyer-cta-actions",
                        type: "flex",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: true,
                        gap: "md",
                        children: [
                          { id: "lawyer-cta-primary-action", type: "button", label: "Schedule confidentially", href: "/consultation", iconId: "calendar-days", iconPosition: "start", accessibleLabel: "Schedule a confidential legal consultation", style: { spacing: { paddingX: "lg", paddingY: "md" }, color: { background: "primary", text: "primary-foreground" }, border: { radius: "sm" }, typography: { weight: "semibold" } } },
                          { id: "lawyer-cta-call-link", type: "link", label: "Call the office", href: "tel:+15550142026", openInNewTab: false, accessibleLabel: "Call the law office", style: { color: { text: "primary" }, typography: { weight: "semibold" } } },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const PHASE_1_MARKETING_EXAMPLES: ComponentDocument[] = [
  TEACHER_PROFILE_HERO_DOCUMENT,
  LAWYER_TRUST_HERO_DOCUMENT,
  TEACHER_ENROLLMENT_CTA_DOCUMENT,
  LAWYER_CONSULTATION_CTA_DOCUMENT,
];
