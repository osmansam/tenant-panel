import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * Curated Testimonials — Batch 7 (Templates #32 to #36)
 *
 * #32: Customer Journey Chronology Timeline (testimonial-32-timeline-of-customer-stories)
 * #33: Vertical-Segmented Multi-Industry Matrix (testimonial-33-industry-segmented-testimonials)
 * #34: Dual-Persona (Engineer vs CFO) Perspectives (testimonial-34-role-persona-segmented-testimonials)
 * #35: Enterprise Governance & Security Ledger (testimonial-35-enterprise-testimonial-matrix)
 * #36: Trio Stat Counter with Customer Endorsements (testimonial-36-testimonial-stats-proof)
 * ============================================================================
 */

export const CURATED_TESTIMONIAL_BATCH_7: ComponentDocument[] = [
  // --------------------------------------------------------------------------
  // TEMPLATE #32: Customer Journey Chronology Timeline
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-32-timeline-of-customer-stories",
    name: "Customer Journey Chronology Timeline",
    kind: "section",
    root: {
      id: "test32-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test32-main-stack",
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
              id: "test32-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test32-eyebrow",
                  type: "badge",
                  text: "CHRONOLOGICAL CUSTOMER JOURNEY",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test32-title",
                  type: "heading",
                  level: 2,
                  text: "From 1-Squad Pilot to 40-Team Standard",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test32-desc",
                  type: "text",
                  text: "How FinStream Systems systematically scaled their visual development across 24 continuous months.",
                  style: { typography: { size: "base" }, color: { text: "text-muted" } },
                },
              ],
            },

            /* Vertical Timeline Stepper Stack */
            {
              id: "test32-timeline-track",
              type: "stack",
              direction: "column",
              alignment: "stretch",
              distribution: "start",
              wrap: false,
              gap: "lg",
              style: { sizing: { width: "full" } },
              children: [
                /* Step 1 */
                {
                  id: "test32-step-1",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test32-s1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test32-s1-badge",
                          type: "badge",
                          text: "STAGE 01 • MONTH 1 • PILOT PHASE",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test32-s1-title",
                          type: "heading",
                          level: 3,
                          text: "Zero-Regression Pilot Launch",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test32-s1-quote",
                          type: "quote",
                          quote:
                            "We started with 2 junior frontend engineers testing the visual engine for a single campaign page. It deployed cleanly with 0 hydration errors on day one.",
                          author: "Elena Rostova",
                          role: "Lead DevOps Architect, FinStream Systems",
                          style: { typography: { size: "base" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Step 2 */
                {
                  id: "test32-step-2",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test32-s2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test32-s2-badge",
                          type: "badge",
                          text: "STAGE 02 • MONTH 3 • GROWTH TRANSITION",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test32-s2-title",
                          type: "heading",
                          level: 3,
                          text: "Eliminating Jira Sprint Bottlenecks",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test32-s2-quote",
                          type: "quote",
                          quote:
                            "By month 3, our product growth managers took over visual authoring completely. Design handoffs dropped from 12 days to under 45 minutes flat.",
                          author: "Marcus Holloway",
                          role: "VP Product Operations, FinStream Systems",
                          style: { typography: { size: "base" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Step 3 */
                {
                  id: "test32-step-3",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test32-s3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test32-s3-badge",
                          type: "badge",
                          text: "STAGE 03 • YEAR 1 • GLOBAL SCALE",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test32-s3-title",
                          type: "heading",
                          level: 3,
                          text: "100M+ Monthly Impression Milestone",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test32-s3-quote",
                          type: "quote",
                          quote:
                            "Scaling across 14 sovereign micro-frontends without a single CSS namespace collision proved that deterministic schemas are the only way forward.",
                          author: "Tariq Mansoor",
                          role: "Head of Platform Architecture, FinStream Systems",
                          style: { typography: { size: "base" }, color: { text: "text-muted" } },
                        },
                      ],
                    },
                  ],
                },

                /* Step 4 */
                {
                  id: "test32-step-4",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test32-s4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test32-s4-badge",
                          type: "badge",
                          text: "STAGE 04 • YEAR 2 • ENTERPRISE FLEET",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test32-s4-title",
                          type: "heading",
                          level: 3,
                          text: "Full Corporate Standardization",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test32-s4-quote",
                          type: "quote",
                          quote:
                            "Ozmishow is now our global corporate standard. We retired 3 legacy CMS platforms and saved $1.2M in annual licensing costs across 40 product squads.",
                          author: "Victoria Sterling",
                          role: "Chief Information Officer, FinStream Systems",
                          style: { typography: { size: "base" }, color: { text: "text-muted" } },
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
  // TEMPLATE #33: Vertical-Segmented Multi-Industry Matrix
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-33-industry-segmented-testimonials",
    name: "Vertical-Segmented Multi-Industry Matrix",
    kind: "section",
    root: {
      id: "test33-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test33-main-stack",
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
              id: "test33-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test33-eyebrow",
                  type: "badge",
                  text: "MISSION-CRITICAL INDUSTRY VERTICALS",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test33-title",
                  type: "heading",
                  level: 2,
                  text: "Engineered for Heavily Regulated Sectors",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test33-desc",
                  type: "text",
                  text: "Strict data boundaries and deterministic markup for organizations with zero tolerance for visual drift.",
                  style: { typography: { size: "base" }, color: { text: "text-muted" } },
                },
              ],
            },

            /* 2x2 Industry Grid */
            {
              id: "test33-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Cell 1: Healthcare */
                {
                  id: "test33-cell-1",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test33-c1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test33-c1-badge",
                          type: "badge",
                          text: "HEALTHCARE • HIPAA & FDA PART 11 VERIFIED",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test33-c1-title",
                          type: "heading",
                          level: 3,
                          text: "Deterministic Medical Portals",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test33-c1-quote",
                          type: "quote",
                          quote:
                            "Clinical portal interfaces cannot tolerate unpredictable DOM mutations. Ozmishow gives our digital therapeutics team full deterministic schema validation.",
                          author: "Dr. Evelyn Wu",
                          role: "Chief Medical Information Officer, BioGenix Labs",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Cell 2: FinTech & Banking */
                {
                  id: "test33-cell-2",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test33-c2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test33-c2-badge",
                          type: "badge",
                          text: "SOVEREIGN BANKING • PCI-DSS & SOC 2 TYPE II",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test33-c2-title",
                          type: "heading",
                          level: 3,
                          text: "Zero-Trust Financial Surfaces",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test33-c2-quote",
                          type: "quote",
                          quote:
                            "Our cross-border treasury dashboard demands strict immutable props. Moving to Ozmishow prevented 100% of unauthorized layout alterations across global staging.",
                          author: "Henrietta Vance",
                          role: "Head of Core Banking Security, Helvetica Capital",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Cell 3: Defense & Aerospace */
                {
                  id: "test33-cell-3",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test33-c3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test33-c3-badge",
                          type: "badge",
                          text: "DEFENSE & AEROSPACE • FEDRAMP HIGH & ITAR",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test33-c3-title",
                          type: "heading",
                          level: 3,
                          text: "Air-Gapped Deployment Reliability",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test33-c3-quote",
                          type: "quote",
                          quote:
                            "In air-gapped tactical environments, UI runtimes cannot call external CDNs or unverified scripts. Ozmishow compiled standalone JSON schemas perfectly.",
                          author: "Col. Robert Vance (Ret.)",
                          role: "VP Systems Engineering, Aegis Defense Systems",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Cell 4: Global Logistics */
                {
                  id: "test33-cell-4",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test33-c4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "sm",
                      children: [
                        {
                          id: "test33-c4-badge",
                          type: "badge",
                          text: "GLOBAL LOGISTICS • ISO 27001 & 99.999% SLA",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test33-c4-title",
                          type: "heading",
                          level: 3,
                          text: "Sub-Second Global Portals",
                          style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                        },
                        {
                          id: "test33-c4-quote",
                          type: "quote",
                          quote:
                            "Coordinating 12,000 freight vessels requires instant localized tracking surfaces with zero hydration lag across unstable satellite connections.",
                          author: "Kenji Sato",
                          role: "VP Global Fleet Infrastructure, Pacific Freight Lines",
                          style: { typography: { size: "sm" } },
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
  // TEMPLATE #34: Dual-Persona (Engineer vs CFO) Perspectives
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-34-role-persona-segmented-testimonials",
    name: "Dual-Persona (Engineer vs CFO) Perspectives",
    kind: "section",
    root: {
      id: "test34-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test34-main-stack",
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
              id: "test34-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test34-eyebrow",
                  type: "badge",
                  text: "DUAL-STAKEHOLDER PERSPECTIVES",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test34-title",
                  type: "heading",
                  level: 2,
                  text: "Why Both Engineering & Finance Choose Ozmishow",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
              ],
            },

            /* 50/50 Dual Persona Split Grid */
            {
              id: "test34-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "lg" },
                sizing: { width: "full" },
              },
              children: [
                /* Persona 1: Engineering */
                {
                  id: "test34-col-eng",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "2xl" },
                    color: { background: "surface-muted" },
                  },
                  children: [
                    {
                      id: "test34-eng-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test34-eng-badge",
                          type: "badge",
                          text: "THE ENGINEERING PERSPECTIVE",
                          style: {
                            color: { background: "primary", text: "background" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test34-eng-stat",
                          type: "stat",
                          value: "0 Regressions",
                          label: "Across 45 Enterprise Production Deployments",
                        },
                        {
                          id: "test34-eng-quote",
                          type: "quote",
                          quote:
                            "Our developers don't maintain fragile custom visual editor forks anymore. Everything compiles directly to clean TypeScript schemas with 100% automated test coverage in CI/CD.",
                          author: "Liam Chen",
                          role: "VP Engineering, CloudPeak Technologies",
                          avatarSrc:
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&fit=crop&q=80",
                          avatarAlt: "Liam Chen",
                          style: { typography: { size: "base" }, color: { text: "text" } },
                        },
                      ],
                    },
                  ],
                },

                /* Persona 2: Finance */
                {
                  id: "test34-col-cfo",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "2xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test34-cfo-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test34-cfo-badge",
                          type: "badge",
                          text: "THE CFO & CAPITAL ALLOCATION PERSPECTIVE",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test34-cfo-stat",
                          type: "stat",
                          value: "74% Savings",
                          label: "In Frontend Development & Agency Payroll Hours",
                        },
                        {
                          id: "test34-cfo-quote",
                          type: "quote",
                          quote:
                            "From a capital allocation standpoint, Ozmishow paid for itself in month two. Our marketing team builds and iterates autonomously, freeing our senior engineering payroll for core revenue-generating AI infrastructure.",
                          author: "Charlotte Dubois",
                          role: "Chief Financial Officer, CloudPeak Technologies",
                          avatarSrc:
                            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&fit=crop&q=80",
                          avatarAlt: "Charlotte Dubois",
                          style: { typography: { size: "base" }, color: { text: "text" } },
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
  // TEMPLATE #35: Enterprise Governance & Security Ledger
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-35-enterprise-testimonial-matrix",
    name: "Enterprise Governance & Security Ledger",
    kind: "section",
    root: {
      id: "test35-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test35-main-stack",
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
              id: "test35-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test35-eyebrow",
                  type: "badge",
                  text: "ENTERPRISE SECURITY & AUDIT RECORD",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test35-title",
                  type: "heading",
                  level: 2,
                  text: "Architectural Attestations from Security Leads",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test35-desc",
                  type: "text",
                  text: "Formal audit findings and third-party security certifications from global compliance leads.",
                  style: { typography: { size: "base" }, color: { text: "text-muted" } },
                },
              ],
            },

            /* Ledger Stack of Rows */
            {
              id: "test35-ledger-stack",
              type: "stack",
              direction: "column",
              alignment: "stretch",
              distribution: "start",
              wrap: false,
              gap: "md",
              style: { sizing: { width: "full" } },
              children: [
                /* Row 1 */
                {
                  id: "test35-row-1",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test35-r1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test35-r1-meta-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: true,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test35-r1-badge",
                              type: "badge",
                              text: "PENETRATION AUDIT PASS • ZERO CRITICAL VULNERABILITIES",
                              style: { color: { background: "primary", text: "background" }, typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "test35-r1-scope",
                              type: "text",
                              text: "GLOBAL TIER-1 INVESTMENT BANK",
                              style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test35-r1-quote",
                          type: "quote",
                          quote:
                            "Ozmishow's deterministic schema eliminates unsanitized script injection vectors common in legacy WYSIWYG website builders. Passed all 4 internal penetration tests with zero findings.",
                          author: "Chief Information Security Officer",
                          role: "Top 5 Global Investment Bank (Confidential Attestation)",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Row 2 */
                {
                  id: "test35-row-2",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test35-r2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test35-r2-meta-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: true,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test35-r2-badge",
                              type: "badge",
                              text: "GDPR & DATA SOVEREIGNTY COMPLIANCE AUDIT",
                              style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "test35-r2-scope",
                              type: "text",
                              text: "EUROPEAN TELECOMMUNICATIONS LEADER",
                              style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test35-r2-quote",
                          type: "quote",
                          quote:
                            "Completely decoupled visual layout documents allow us to enforce strict regional hosting boundaries without maintaining multiple CMS deployments.",
                          author: "Data Protection Officer",
                          role: "Nordic Telecom Group",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Row 3 */
                {
                  id: "test35-row-3",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test35-r3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test35-r3-meta-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: true,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test35-r3-badge",
                              type: "badge",
                              text: "ACCESSIBILITY WCAG 2.1 AAA CONFORMANCE VERIFIED",
                              style: { color: { background: "surface-muted", text: "text" }, typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "test35-r3-scope",
                              type: "text",
                              text: "FEDERAL DIGITAL SERVICES AGENCY",
                              style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test35-r3-quote",
                          type: "quote",
                          quote:
                            "Every primitive emitted by Ozmishow strictly adheres to semantic HTML rules and contrast tokens, ensuring flawless screen reader compatibility out of the box.",
                          author: "Principal Accessibility Architect",
                          role: "Federal Public Services Directorate",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Row 4 */
                {
                  id: "test35-row-4",
                  type: "card",
                  element: "article",
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "lg" },
                    spacing: { padding: "lg" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test35-r4-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "xs",
                      children: [
                        {
                          id: "test35-r4-meta-row",
                          type: "stack",
                          direction: "row",
                          alignment: "center",
                          distribution: "between",
                          wrap: true,
                          gap: "sm",
                          style: { sizing: { width: "full" } },
                          children: [
                            {
                              id: "test35-r4-badge",
                              type: "badge",
                              text: "PERFORMANCE SLA ATTESTATION (SUB-100MS LCP)",
                              style: { color: { background: "primary", text: "background" }, typography: { size: "sm", weight: "bold" } },
                            },
                            {
                              id: "test35-r4-scope",
                              type: "text",
                              text: "NYSE-LISTED GLOBAL E-COMMERCE",
                              style: { typography: { size: "sm", weight: "semibold" }, color: { text: "text-muted" } },
                            },
                          ],
                        },
                        {
                          id: "test35-r4-quote",
                          type: "quote",
                          quote:
                            "Maintained sub-100ms Largest Contentful Paint (LCP) across 45 million Black Friday sessions. No runtime visual builder script overhead or DOM bloat.",
                          author: "VP Infrastructure & Performance",
                          role: "Global Retail Brands Holding",
                          style: { typography: { size: "sm" } },
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
  // TEMPLATE #36: Trio Stat Counter with Customer Endorsements
  // --------------------------------------------------------------------------
  {
    version: 2,
    id: "testimonial-36-testimonial-stats-proof",
    name: "Trio Stat Counter with Customer Endorsements",
    kind: "section",
    root: {
      id: "test36-root",
      type: "section",
      style: {
        spacing: { paddingY: "2xl", paddingX: "lg" },
        color: { background: "background", text: "text" },
        sizing: { width: "full" },
      },
      children: [
        {
          id: "test36-main-stack",
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
              id: "test36-header-stack",
              type: "stack",
              direction: "column",
              alignment: "center",
              distribution: "start",
              wrap: false,
              gap: "xs",
              children: [
                {
                  id: "test36-eyebrow",
                  type: "badge",
                  text: "QUANTIFIED BUSINESS IMPACT",
                  style: {
                    color: { background: "surface-muted", text: "text" },
                    typography: { size: "sm", weight: "bold" },
                  },
                },
                {
                  id: "test36-title",
                  type: "heading",
                  level: 2,
                  text: "Measurable Outcomes Backed by Hard Data",
                  style: {
                    typography: { size: "4xl", weight: "bold" },
                    color: { text: "text" },
                  },
                },
                {
                  id: "test36-desc",
                  type: "text",
                  text: "Real benchmark results verified across enterprise engineering and growth teams.",
                  style: { typography: { size: "base" }, color: { text: "text-muted" } },
                },
              ],
            },

            /* 3-Column Equal Stat Trio Cards */
            {
              id: "test36-grid",
              type: "grid",
              columns: 12,
              style: {
                spacing: { gap: "md" },
                sizing: { width: "full" },
              },
              children: [
                /* Stat Card 1 */
                {
                  id: "test36-card-1",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test36-c1-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test36-c1-badge",
                          type: "badge",
                          text: "RELIABILITY BENCHMARK",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test36-c1-stat",
                          type: "stat",
                          value: "99.99%",
                          label: "Runtime SLA & Uptime Reliability",
                        },
                        {
                          id: "test36-c1-quote",
                          type: "quote",
                          quote:
                            "We experienced zero downtime during our peak product launch with 2.8 million concurrent visual document renders.",
                          author: "Kieran Blake",
                          role: "Head of Reliability, Apex Cloud",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Stat Card 2 */
                {
                  id: "test36-card-2",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test36-c2-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test36-c2-badge",
                          type: "badge",
                          text: "VELOCITY MULTIPLIER",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test36-c2-stat",
                          type: "stat",
                          value: "14x Faster",
                          label: "Campaign Deployment Turnaround",
                        },
                        {
                          id: "test36-c2-quote",
                          type: "quote",
                          quote:
                            "Marketing went from shipping one seasonal landing page per month to deploying 14 targeted localized variants in a single week.",
                          author: "Maya Lin",
                          role: "VP Growth Marketing, Pulse Global",
                          style: { typography: { size: "sm" } },
                        },
                      ],
                    },
                  ],
                },

                /* Stat Card 3 */
                {
                  id: "test36-card-3",
                  type: "card",
                  element: "article",
                  layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                  style: {
                    border: { width: "thin", color: "text-muted", radius: "xl" },
                    spacing: { padding: "xl" },
                    color: { background: "background" },
                  },
                  children: [
                    {
                      id: "test36-c3-stack",
                      type: "stack",
                      direction: "column",
                      alignment: "start",
                      distribution: "start",
                      wrap: false,
                      gap: "md",
                      children: [
                        {
                          id: "test36-c3-badge",
                          type: "badge",
                          text: "ENGINEERING EFFICIENCY",
                          style: {
                            color: { background: "surface-muted", text: "text" },
                            typography: { size: "sm", weight: "bold" },
                          },
                        },
                        {
                          id: "test36-c3-stat",
                          type: "stat",
                          value: "85% Less",
                          label: "Engineering Time on Marketing Tickets",
                        },
                        {
                          id: "test36-c3-quote",
                          type: "quote",
                          quote:
                            "Engineers stopped writing boilerplate hero sections. They build components once, register them in Ozmishow, and never touch styling tickets again.",
                          author: "Julian Chen",
                          role: "Director of Platforms, Helix Software",
                          style: { typography: { size: "sm" } },
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
