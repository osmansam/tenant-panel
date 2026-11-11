import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Testimonials — Batch 6 (Templates #27 to #31)
 *
 * #27: Marketplace & App Store Review Deck (testimonial-27-marketplace-app-store-review)
 * #28: Conversational Live Chat Testimonials (testimonial-28-chat-message-testimonials)
 * #29: Social Stream Feed Wall (testimonial-29-social-post-testimonials)
 * #30: Cinema Video Theater & Transcript (testimonial-30-video-testimonial-spotlight)
 * #31: Audiogram Podcast Clip & Key Takeaway (testimonial-31-audio-podcast-testimonial)
 * ============================================================================
 */

export const CURATED_TESTIMONIAL_BATCH_6: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #27: Marketplace & App Store Review Deck
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-27-marketplace-app-store-review",
    name: "App Store & Marketplace Feedback Deck",
    kind: "section",
    root: {
      id: "test27-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test27-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Section Header & App Store Aggregate Score */
            {
              id: "test27-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "sm",
              children: [
                {
                  id: "test27-eyebrow",
                  type: "badge",
                  text: "APP STORE REVIEWS & ACCREDITATIONS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test27-title",
                  type: "heading",
                  level: 2,
                  text: "Rated 4.9 Stars Across 14,000+ Teams",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test27-aggregate-row",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "center",
                  wrap: true,
                  gap: "md",
                  style: {
                    spacing: { padding: "sm" },
                  },
                  children: [
                    {
                      id: "test27-agg-rating",
                      type: "rating",
                      value: 5,
                      max: 5,
                      showValue: true,
                      accessibleLabel: "4.9 out of 5 stars based on verified store reviews",
                    },
                    {
                      id: "test27-agg-badge",
                      type: "badge",
                      text: "APPLE APP STORE EDITORS CHOICE",
                      style: {
                        color: { background: "primary", text: "background" },
                        typography: { size: "sm", weight: "semibold" },
                      },
                    },
                    {
                      id: "test27-agg-count",
                      type: "text",
                      text: "14,280 Verified Customer Ratings",
                      style: {
                        typography: { size: "sm" },
                        color: { text: "text-muted" },
                      },
                    },
                  ],
                },
              ],
            },

            /* 3-Column Equal Reviews Deck via 12-col Grid */
            {
              id: "test27-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "md" },
                sizing: { width: "full" },
              },
              children: [
                /* Review 1 */
                {
                  id: "test27-card-1",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test27-c1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test27-c1-top",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test27-c1-rating",
                              type: "rating",
                              value: 5,
                              max: 5,
                              showValue: false,
                              accessibleLabel: "5 out of 5 stars",
                            },
                            {
                              id: "test27-c1-date",
                              type: "text",
                              text: "Oct 8, 2026",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test27-c1-headline",
                          type: "heading",
                          level: 3,
                          text: "Essential for our engineering workflow",
                          style: {
                            typography: { size: "base", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "test27-c1-quote",
                          type: "quote",
                          quote:
                            "The visual engine handles deterministic updates seamlessly. We migrated our entire marketing suite in under a week with zero runtime hydration issues.",
                          author: "alex_dev_99",
                          role: "Verified iOS Pro Subscriber",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Review 2 */
                {
                  id: "test27-card-2",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test27-c2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test27-c2-top",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test27-c2-rating",
                              type: "rating",
                              value: 5,
                              max: 5,
                              showValue: false,
                              accessibleLabel: "5 out of 5 stars",
                            },
                            {
                              id: "test27-c2-date",
                              type: "text",
                              text: "Oct 2, 2026",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test27-c2-headline",
                          type: "heading",
                          level: 3,
                          text: "Finally a schema-first visual builder",
                          style: {
                            typography: { size: "base", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "test27-c2-quote",
                          type: "quote",
                          quote:
                            "Zero layout shifts and flawless TypeScript compilation. Our design team and engineering squad finally speak the exact same declarative language.",
                          author: "sarah_m_design",
                          role: "Verified Mac App Store Buyer",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Review 3 */
                {
                  id: "test27-card-3",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test27-c3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test27-c3-top",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "xs",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test27-c3-rating",
                              type: "rating",
                              value: 5,
                              max: 5,
                              showValue: false,
                              accessibleLabel: "5 out of 5 stars",
                            },
                            {
                              id: "test27-c3-date",
                              type: "text",
                              text: "Sep 27, 2026",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test27-c3-headline",
                          type: "heading",
                          level: 3,
                          text: "10x faster sprint deployment times",
                          style: {
                            typography: { size: "base", weight: "bold" },
                            color: { text: "text" },
                          },
                        },
                        {
                          id: "test27-c3-quote",
                          type: "quote",
                          quote:
                            "Replaced 4 disconnected landing page tools with one immutable visual canvas. Clean code exports, instant preview speeds, and stellar stability.",
                          author: "dev_markus_ch",
                          role: "Verified Enterprise User",
                          style: {
                            typography: { size: "sm" },
                            color: { text: "text-muted" },
                          },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #28: Conversational Live Chat Testimonials
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-28-chat-message-testimonials",
    name: "Conversational Live Chat Testimonials",
    kind: "section",
    root: {
      id: "test28-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test28-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test28-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test28-eyebrow",
                  type: "badge",
                  text: "LIVE SLACK COMMUNITY FEEDBACK",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test28-title",
                  type: "heading",
                  level: 2,
                  text: "Real Conversations from Real Builders",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test28-desc",
                  type: "text",
                  text: "Live messages from our verified developer community Slack workspace #customer-wins channel.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* Chat Window Container Card */
            {
              id: "test28-chat-window",
              type: "card",
              element: "div",
              style: {
                sizing: { width: "full" },
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "none" },
                color: { background: "background" },
              },
              children: [
                /* Chat Window Header Bar */
                {
                  id: "test28-bar",
                  type: "stack",
                  direction: "row",
                  alignment: "center",
                  distribution: "between",
                  wrap: false,
                  gap: "sm",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "none" },
                    spacing: { padding: "md" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "test28-bar-left",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test28-channel-badge",
                          type: "badge",
                          text: "#customer-wins",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test28-online-status",
                          type: "text",
                          text: "● 4,812 members active now",
                          style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                    {
                      id: "test28-bar-right",
                      type: "badge",
                      text: "VERIFIED COMMUNITY LOG",
                      style: {
                        color: { background: "surface-muted", text: "text" },
                        typography: { size: "sm" },
                      },
                    },
                  ],
                },

                /* Chat Bubbles Stack */
                {
                  id: "test28-thread-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "stretch",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  style: {
                    spacing: { padding: "xl" },
                  },
                  children: [
                    /* Bubble 1 */
                    {
                      id: "test28-msg-1",
                      type: "stack",
                      direction: "row",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test28-m1-avatar",
                          type: "avatar",
                          src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
                          alt: "Maya Tanaka",
                          fallback: "MT",
                          style: {
                            border: { radius: "full" },
                            custom: { width: "44px", height: "44px" },
                            sizing: { fit: "cover" },
                          },
                        },
                        {
                          id: "test28-m1-bubble",
                          type: "card",
                          element: "div",
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "lg" },
                            spacing: { padding: "md" },
                            color: { background: "surface-muted" },
                            sizing: { width: "full" },
                          },
                          children: [
                            {
                              id: "test28-m1-content",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "test28-m1-header",
                                  type: "stack",
                                  direction: "row",
                                  alignment: "center",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "sm",
                                  children: [
                                    {
                                      id: "test28-m1-name",
                                      type: "text",
                                      text: "Maya Tanaka",
                                      style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                                    },
                                    {
                                      id: "test28-m1-role",
                                      type: "text",
                                      text: "Staff Systems Engineer @ Vertex Cloud",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                    {
                                      id: "test28-m1-time",
                                      type: "text",
                                      text: "10:14 AM",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                  ],
                                },
                                {
                                  id: "test28-m1-text",
                                  type: "text",
                                  text: "Just deployed our Q3 enterprise portal using Ozmishow schemas. 0 staging incidents and our lead architect approved it in 10 minutes flat. 🚀",
                                  style: { typography: { size: "sm" }, color: { text: "text" } },
                                },
                                {
                                  id: "test28-m1-reactions",
                                  type: "stack",
                                  direction: "row",
                                  alignment: "center",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "xs",
                                  children: [
                                    {
                                      id: "test28-m1-r1",
                                      type: "badge",
                                      text: "👍 14",
                                      style: { color: { background: "background", text: "text" }, typography: { size: "sm" } },
                                    },
                                    {
                                      id: "test28-m1-r2",
                                      type: "badge",
                                      text: "🔥 8",
                                      style: { color: { background: "background", text: "text" }, typography: { size: "sm" } },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },

                    /* Bubble 2 (Reply style) */
                    {
                      id: "test28-msg-2",
                      type: "stack",
                      direction: "row",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test28-m2-avatar",
                          type: "avatar",
                          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
                          alt: "Devon Keller",
                          fallback: "DK",
                          style: {
                            border: { radius: "full" },
                            custom: { width: "44px", height: "44px" },
                            sizing: { fit: "cover" },
                          },
                        },
                        {
                          id: "test28-m2-bubble",
                          type: "card",
                          element: "div",
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "lg" },
                            spacing: { padding: "md" },
                            color: { background: "background" },
                            sizing: { width: "full" },
                          },
                          children: [
                            {
                              id: "test28-m2-content",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "test28-m2-header",
                                  type: "stack",
                                  direction: "row",
                                  alignment: "center",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "sm",
                                  children: [
                                    {
                                      id: "test28-m2-name",
                                      type: "text",
                                      text: "Devon Keller",
                                      style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                                    },
                                    {
                                      id: "test28-m2-role",
                                      type: "text",
                                      text: "CTO @ Horizon Data",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                    {
                                      id: "test28-m2-time",
                                      type: "text",
                                      text: "10:18 AM",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                  ],
                                },
                                {
                                  id: "test28-m2-text",
                                  type: "text",
                                  text: "Same experience here. Schema validation catches mismatched props before anything touches our production CDN. Total game changer.",
                                  style: { typography: { size: "sm" }, color: { text: "text" } },
                                },
                                {
                                  id: "test28-m2-reactions",
                                  type: "stack",
                                  direction: "row",
                                  alignment: "center",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "xs",
                                  children: [
                                    {
                                      id: "test28-m2-r1",
                                      type: "badge",
                                      text: "❤️ 19",
                                      style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm" } },
                                    },
                                    {
                                      id: "test28-m2-r2",
                                      type: "badge",
                                      text: "🚀 12",
                                      style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm" } },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },

                    /* Bubble 3 */
                    {
                      id: "test28-msg-3",
                      type: "stack",
                      direction: "row",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test28-m3-avatar",
                          type: "avatar",
                          src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
                          alt: "Liam Gallagher",
                          fallback: "LG",
                          style: {
                            border: { radius: "full" },
                            custom: { width: "44px", height: "44px" },
                            sizing: { fit: "cover" },
                          },
                        },
                        {
                          id: "test28-m3-bubble",
                          type: "card",
                          element: "div",
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "lg" },
                            spacing: { padding: "md" },
                            color: { background: "surface-muted" },
                            sizing: { width: "full" },
                          },
                          children: [
                            {
                              id: "test28-m3-content",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "xs",
                              children: [
                                {
                                  id: "test28-m3-header",
                                  type: "stack",
                                  direction: "row",
                                  alignment: "center",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "sm",
                                  children: [
                                    {
                                      id: "test28-m3-name",
                                      type: "text",
                                      text: "Liam Gallagher",
                                      style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                                    },
                                    {
                                      id: "test28-m3-role",
                                      type: "text",
                                      text: "Lead Frontend Engineer @ Solis Networks",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                    {
                                      id: "test28-m3-time",
                                      type: "text",
                                      text: "10:24 AM",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                  ],
                                },
                                {
                                  id: "test28-m3-text",
                                  type: "text",
                                  text: "Can confirm. Our non-technical growth team is now shipping verified landing page variants without filing a single Jira sprint ticket.",
                                  style: { typography: { size: "sm" }, color: { text: "text" } },
                                },
                                {
                                  id: "test28-m3-reactions",
                                  type: "badge",
                                  text: "🎉 24 reactions",
                                  style: { color: { background: "background", text: "text" }, typography: { size: "sm" } },
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
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #29: Social Stream Feed Wall
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-29-social-post-testimonials",
    name: "Social Stream Feed Wall",
    kind: "section",
    root: {
      id: "test29-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test29-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "6xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test29-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test29-eyebrow",
                  type: "badge",
                  text: "COMMUNITY POSTS & CITATIONS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test29-title",
                  type: "heading",
                  level: 2,
                  text: "Trending Across the Tech Ecosystem",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test29-desc",
                  type: "text",
                  text: "Unfiltered posts and architectural discussions from verified technology practitioners.",
                  style: {
                    typography: { size: "base" },
                    color: { text: "text-muted" },
                  },
                },
              ],
            },

            /* 3-Column Social Post Stream via 12-col Grid */
            {
              id: "test29-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "md" },
                sizing: { width: "full" },
              },
              children: [
                /* Post 1 */
                {
                  id: "test29-card-1",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test29-c1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test29-c1-author-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test29-c1-author-meta",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "start",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "test29-c1-avatar",
                                  type: "avatar",
                                  src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
                                  alt: "Arjun Patel",
                                  fallback: "AP",
                                  style: {
                                    border: { radius: "full" },
                                    custom: { width: "44px", height: "44px" },
                                    sizing: { fit: "cover" },
                                  },
                                },
                                {
                                  id: "test29-c1-names",
                                  type: "stack",
                                  direction: "column",
                                  alignment: "start",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "none",
                                  children: [
                                    {
                                      id: "test29-c1-name-badge",
                                      type: "stack",
                                      direction: "row",
                                      alignment: "center",
                                      distribution: "start",
                                      wrap: false,
                                      gap: "xs",
                                      children: [
                                        {
                                          id: "test29-c1-name",
                                          type: "text",
                                          text: "Arjun Patel",
                                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                                        },
                                        {
                                          id: "test29-c1-badge",
                                          type: "badge",
                                          text: "✓",
                                          style: { color: { background: "primary", text: "background" }, typography: { size: "sm" } },
                                        },
                                      ],
                                    },
                                    {
                                      id: "test29-c1-handle",
                                      type: "text",
                                      text: "@arjun_builds • Founder",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "test29-c1-body",
                          type: "quote",
                          quote:
                            "Building responsive web experiences without deterministic component schemas feels like writing raw assembly now. Ozmishow nailed the visual abstraction layer.",
                          author: "Arjun Patel",
                          role: "Founder, SynapseAI Labs",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "test29-c1-metrics",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "xs",
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "none" },
                            spacing: { padding: "xs" },
                            sizing: { width: "full" },
                          },
                          children: [
                            { id: "test29-c1-m1", type: "text", text: "💬 42", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c1-m2", type: "text", text: "🔁 189", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c1-m3", type: "text", text: "❤️ 1.2k", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c1-m4", type: "text", text: "Oct 4", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Post 2 */
                {
                  id: "test29-card-2",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test29-c2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test29-c2-author-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test29-c2-author-meta",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "start",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "test29-c2-avatar",
                                  type: "avatar",
                                  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
                                  alt: "Claire Bouchard",
                                  fallback: "CB",
                                  style: {
                                    border: { radius: "full" },
                                    custom: { width: "44px", height: "44px" },
                                    sizing: { fit: "cover" },
                                  },
                                },
                                {
                                  id: "test29-c2-names",
                                  type: "stack",
                                  direction: "column",
                                  alignment: "start",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "none",
                                  children: [
                                    {
                                      id: "test29-c2-name-badge",
                                      type: "stack",
                                      direction: "row",
                                      alignment: "center",
                                      distribution: "start",
                                      wrap: false,
                                      gap: "xs",
                                      children: [
                                        {
                                          id: "test29-c2-name",
                                          type: "text",
                                          text: "Claire Bouchard",
                                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                                        },
                                        {
                                          id: "test29-c2-badge",
                                          type: "badge",
                                          text: "✓",
                                          style: { color: { background: "primary", text: "background" }, typography: { size: "sm" } },
                                        },
                                      ],
                                    },
                                    {
                                      id: "test29-c2-handle",
                                      type: "text",
                                      text: "@claire_ux • Principal Architect",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "test29-c2-body",
                          type: "quote",
                          quote:
                            "Designers can finally hand off production-ready visual documents to developers with zero Figma drift or lost styling variables. Pure engineering magic.",
                          author: "Claire Bouchard",
                          role: "Principal Design Architect",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "test29-c2-metrics",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "xs",
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "none" },
                            spacing: { padding: "xs" },
                            sizing: { width: "full" },
                          },
                          children: [
                            { id: "test29-c2-m1", type: "text", text: "💬 19", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c2-m2", type: "text", text: "🔁 94", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c2-m3", type: "text", text: "❤️ 840", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c2-m4", type: "text", text: "Oct 3", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                          ],
                        },
                      ],
                    },
                  ],
                },

                /* Post 3 */
                {
                  id: "test29-card-3",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test29-c3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test29-c3-author-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test29-c3-author-meta",
                              type: "stack",
                              direction: "row",
                              alignment: "center",
                              distribution: "start",
                              wrap: false,
                              gap: "sm",
                              children: [
                                {
                                  id: "test29-c3-avatar",
                                  type: "avatar",
                                  src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
                                  alt: "Henrik Lindqvist",
                                  fallback: "HL",
                                  style: {
                                    border: { radius: "full" },
                                    custom: { width: "44px", height: "44px" },
                                    sizing: { fit: "cover" },
                                  },
                                },
                                {
                                  id: "test29-c3-names",
                                  type: "stack",
                                  direction: "column",
                                  alignment: "start",
                                  distribution: "start",
                                  wrap: false,
                                  gap: "none",
                                  children: [
                                    {
                                      id: "test29-c3-name-badge",
                                      type: "stack",
                                      direction: "row",
                                      alignment: "center",
                                      distribution: "start",
                                      wrap: false,
                                      gap: "xs",
                                      children: [
                                        {
                                          id: "test29-c3-name",
                                          type: "text",
                                          text: "Henrik Lindqvist",
                                          style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                                        },
                                        {
                                          id: "test29-c3-badge",
                                          type: "badge",
                                          text: "✓",
                                          style: { color: { background: "primary", text: "background" }, typography: { size: "sm" } },
                                        },
                                      ],
                                    },
                                    {
                                      id: "test29-c3-handle",
                                      type: "text",
                                      text: "@henrik_dev • VP Platform",
                                      style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "test29-c3-body",
                          type: "quote",
                          quote:
                            "We benchmarked 5 visual engines for our multi-tenant SaaS portal. Ozmishow is the only one with zero hydration runtime penalties and clean JSON schema persistence.",
                          author: "Henrik Lindqvist",
                          role: "VP Platform @ NordTech Systems",
                          style: { typography: { size: "sm" } },
                        },
                        {
                          id: "test29-c3-metrics",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "xs",
                          style: {
                            border: { width: "thin", color: "text-muted", radius: "none" },
                            spacing: { padding: "xs" },
                            sizing: { width: "full" },
                          },
                          children: [
                            { id: "test29-c3-m1", type: "text", text: "💬 33", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c3-m2", type: "text", text: "🔁 152", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c3-m3", type: "text", text: "❤️ 1.5k", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                            { id: "test29-c3-m4", type: "text", text: "Oct 1", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
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
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #30: Cinema Video Theater & Transcript
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-30-video-testimonial-spotlight",
    name: "Cinema Video Theater & Transcript",
    kind: "section",
    root: {
      id: "test30-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test30-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "5xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test30-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test30-eyebrow",
                  type: "badge",
                  text: "EXECUTIVE CASE DOCUMENTARY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test30-title",
                  type: "heading",
                  level: 2,
                  text: "How Apex Cloud Scaled Global Deployments",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* Cinema Theater Stage Card */
            {
              id: "test30-theater-card",
              type: "card",
              element: "article",
              style: {
                sizing: { width: "full" },
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "none" },
                color: { background: "background" },
              },
              children: [
                /* Video Player Stage */
                {
                  id: "test30-stage",
                  type: "stack",
                  direction: "column",
                  alignment: "center",
                  distribution: "center",
                  wrap: false,
                  gap: "md",
                  style: {
                    spacing: { padding: "2xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "test30-video-poster",
                      type: "image",
                      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                      alt: "Apex Cloud Engineering Team in Video Interview",
                      aspectRatio: "wide",
                      style: {
                        sizing: { width: "full" },
                        border: { radius: "lg" },
                      },
                    },
                    {
                      id: "test30-controls-bar",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      style: { sizing: { width: "full" } },
                      children: [
                        {
                          id: "test30-play-btn",
                          type: "button",
                          label: "▶ Watch Full Customer Documentary (04:18)",
                          href: "#play-video",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "semibold" },
                            border: { radius: "md" },
                          },
                        },
                        {
                          id: "test30-video-meta",
                          type: "badge",
                          text: "4K CINEMATIC INTERVIEW • SAN FRANCISCO, CA",
                          style: {
                            color: { background: "background", text: "text" },
                            typography: { size: "sm" },
                          },
                        },
                      ],
                    },
                  ],
                },

                /* Transcript Excerpt Card Below Stage */
                {
                  id: "test30-transcript-tray",
                  type: "stack",
                  direction: "column",
                  alignment: "start",
                  distribution: "start",
                  wrap: false,
                  gap: "md",
                  style: {
                    spacing: { padding: "xl" },
                  },
                  children: [
                    {
                      id: "test30-transcript-badge",
                      type: "badge",
                      text: "KEY SPOKEN EXCERPT (02:14 - 02:48)",
                      style: {
                        color: { background: "surface-muted", text: "text" },
                        typography: { size: "sm", weight: "bold" },
                      },
                    },
                    {
                      id: "test30-quote",
                      type: "quote",
                      quote:
                        "“Before Ozmishow, delivering localized customer portal configurations across 80 countries took 6 weeks per region. Now our solutions team delivers complete, validated visual layouts in under 4 hours without engineer intervention.”",
                      author: "Marcus Sterling",
                      role: "Chief Operating Officer, Apex Cloud Systems",
                      style: {
                        typography: { size: "lg" },
                        color: { text: "text" },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // TEMPLATE #31: Audiogram Podcast Clip & Key Takeaway
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-31-audio-podcast-testimonial",
    name: "Audiogram Podcast Clip & Key Takeaway",
    kind: "section",
    root: {
      id: "test31-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test31-main-stack",
          type: "stack",
          direction: "column",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "xl",
          style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
          children: [
            /* Header */
            {
              id: "test31-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test31-eyebrow",
                  type: "badge",
                  text: "FEATURED PODCAST INTERVIEW",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test31-title",
                  type: "heading",
                  level: 2,
                  text: "The Architecture Roundtable: Episode #84",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* Audiogram Dock Card */
            {
              id: "test31-dock-card",
              type: "card",
              element: "article",
              style: {
                sizing: { width: "full" },
                border: { width: "thin", color: "text-muted", radius: "xl" },
                spacing: { padding: "2xl" },
                color: { background: "background" },
              },
              children: [
                {
                  id: "test31-dock-stack",
                  type: "stack",
                  direction: "column",
                  alignment: "stretch",
                  distribution: "start",
                  wrap: false,
                  gap: "lg",
                  children: [
                    /* Speaker Profile & Show Meta */
                    {
                      id: "test31-speaker-row",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      children: [
                        {
                          id: "test31-speaker-meta",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "start",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "test31-avatar",
                              type: "avatar",
                              src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
                              alt: "Rachel Simmons",
                              fallback: "RS",
                              style: {
                                border: { radius: "full" },
                                custom: { width: "56px", height: "56px" },
                                sizing: { fit: "cover" },
                              },
                            },
                            {
                              id: "test31-speaker-text",
                              type: "stack",
                              direction: "column",
                              alignment: "start",
                              distribution: "start",
                              wrap: false,
                              gap: "none",
                              children: [
                                {
                                  id: "test31-speaker-name",
                                  type: "text",
                                  text: "Rachel Simmons",
                                  style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                                },
                                {
                                  id: "test31-speaker-role",
                                  type: "text",
                                  text: "VP of Platform Architecture @ CloudScale Systems",
                                  style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "test31-episode-badge",
                          type: "badge",
                          text: "LISTEN TO CLIP (02:30)",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                      ],
                    },

                    /* Interactive Waveform Track */
                    {
                      id: "test31-audio-track",
                      type: "card",
                      element: "div",
                      style: {
                        border: { width: "thin", color: "text-muted", radius: "lg" },
                        spacing: { padding: "md" },
                        color: { background: "surface-muted" },
                      },
                      children: [
                        {
                          id: "test31-track-stack",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: false,
                          gap: "md",
                          children: [
                            {
                              id: "test31-play-button",
                              type: "button",
                              label: "▶ Play Audio Clip",
                              href: "#play-audio",
                              style: {
                                color: { background: "background", text: "text" },
                                typography: { size: "sm" },
                                border: { width: "thin", color: "text-muted", radius: "md" },
                              },
                            },
                            {
                              id: "test31-waveform",
                              type: "text",
                              text: "ılılılllıılılIlılılılllıılılIlılılılllıılılIlılılılllıılılIlılılılllı",
                              style: {
                                typography: { size: "sm", weight: "bold" },
                                color: { text: "primary" },
                              },
                            },
                            {
                              id: "test31-time-indicator",
                              type: "text",
                              text: "01:14 / 02:30",
                              style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                      ],
                    },

                    /* Transcript Pullquote */
                    {
                      id: "test31-quote",
                      type: "quote",
                      quote:
                        "“The genuine paradigm shift with Ozmishow is treating visual documents as first-class schemas. It gives engineering full CI/CD oversight while unblocking marketing completely.”",
                      author: "Rachel Simmons",
                      role: "VP of Platform Architecture, CloudScale",
                      style: {
                        typography: { size: "lg" },
                        color: { text: "text" },
                      },
                    },

                    /* Footer Metrics & Subscription Link */
                    {
                      id: "test31-footer-row",
                      type: "stack",
                      direction: "row",
                      alignment: "center",
                      distribution: "between",
                      wrap: true,
                      gap: "md",
                      style: {
                        border: { width: "thin", color: "text-muted", radius: "none" },
                        spacing: { padding: "sm" },
                      },
                      children: [
                        {
                          id: "test31-stat",
                          type: "stat",
                          value: "140,000+",
                          label: "Monthly Episode Listeners",
                        },
                        {
                          id: "test31-link",
                          type: "link",
                          label: "Listen to Full Episode on Spotify & Apple Podcasts →",
                          href: "https://podcasts.apple.com",
                          openInNewTab: true,
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
  },
];
