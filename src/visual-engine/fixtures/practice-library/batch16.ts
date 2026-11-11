import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 16: Litigation & Alternative Dispute Resolution (#76–#80)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 76: 4-Stage Horizontal Linear Mediation Process Rail (TTK Art. 5/A & Law 6325)
 * 77: Parchment Model ISTAC Arbitration Clause Workbench & Fast-Track Rules
 * 78: High-Density Side-by-Side Dual Split Screen (6/6: İİK 257 Asset Freeze vs Execution)
 * 79: Asymmetric 70/30 Exequatur Reciprocity Dossier (8/4: MÖHUK 50-59 Foreign Judgment)
 * 80: Full-Bleed Statutory Defense & Emergency Warning Command Bar (24/7 Sulh Ceza Desk)
 * ============================================================================
 */

/**
 * PRACTICE-76: Civil Procedure · Mandatory Pre-Litigation Mediation (Arabuluculuk) Deck
 * Layout Archetype: 4-Stage Horizontal Linear Mediation Process Rail
 */
export const PRACTICE_76_MANDATORY_COMMERCIAL_MEDIATION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-76-mandatory-commercial-mediation",
  name: "Civil Procedure · Mandatory Pre-Litigation Mediation (Arabuluculuk) Rail",
  kind: "section",
  root: {
    id: "prac76-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac76-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac76-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac76-badge",
                type: "badge",
                text: "CIVIL PROCEDURE · TTK ART. 5/A & LAW NO. 6325 · MANDATORY STATUTORY MEDIATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac76-heading",
                type: "heading",
                level: 2,
                text: "Commercial & Tenancy Pre-Litigation Mediation Protocol",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac76-sub",
                type: "text",
                text: "Navigating official Adliye Arabuluculuk Bürosu proceedings to achieve immediate settlement decrees or mandatory certificates of non-resolution before civil trial.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Horizontal Linear Process Rail */
          {
            id: "prac76-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Stage 1 */
              {
                id: "prac76-stage-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac76-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac76-s1-badge",
                        type: "badge",
                        text: "STAGE 01 · DAY 1–3",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac76-s1-title",
                        type: "heading",
                        level: 3,
                        text: "Adliye Bureau Filing",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac76-s1-desc",
                        type: "text",
                        text: "Official submission to Bodrum or Fethiye Mediation Bureau. Immediately suspends all statutory limitation periods (zamanaşımı durur).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac76-s1-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac76-s1-note",
                        type: "text",
                        text: "Prerequisite for commercial and rental debt claims under HMK Art. 114/2.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac76-stage-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac76-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac76-s2-badge",
                        type: "badge",
                        text: "STAGE 02 · WEEK 1–2",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac76-s2-title",
                        type: "heading",
                        level: 3,
                        text: "Joint & Private Caucus",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac76-s2-desc",
                        type: "text",
                        text: "Structured negotiation sessions chaired by Ministry-appointed mediator. Full statutory confidentiality (gizlilik ilkesi) protects all concessions.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac76-s2-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac76-s2-note",
                        type: "text",
                        text: "Chambers advocates represent non-resident clients via special proxy.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac76-stage-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac76-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac76-s3-badge",
                        type: "badge",
                        text: "STAGE 03 · WEEK 3–4",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac76-s3-title",
                        type: "heading",
                        level: 3,
                        text: "Settlement Minutes",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac76-s3-desc",
                        type: "text",
                        text: "Executing the binding Final Protocol (Son Tutanak). If settled, drafted with liquidated damages and immediate payment schedules.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac76-s3-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac76-s3-note",
                        type: "text",
                        text: "Failure to reach agreement produces Son Tutanak unlocking civil trial.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac76-stage-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac76-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac76-s4-badge",
                        type: "badge",
                        text: "STAGE 04 · ENFORCEMENT",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac76-s4-title",
                        type: "heading",
                        level: 3,
                        text: "İlam Niteliğinde Belge",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac76-s4-desc",
                        type: "text",
                        text: "Sulh Hukuk court issues enforceability endorsement (İcra Edilebilirlik Şerhi). Functions identically to a Supreme Court judgment without trial.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac76-s4-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac76-s4-note",
                        type: "text",
                        text: "Directly enforceable via İcra Dairesi with zero right of appellate appeal.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Callout & Action Bar */
          {
            id: "prac76-footer",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac76-footer-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  {
                    id: "prac76-footer-heading",
                    type: "heading",
                    level: 4,
                    text: "Mandatory Pre-Litigation Condition Under Turkish Law",
                    style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                  },
                  {
                    id: "prac76-footer-text",
                    type: "text",
                    text: "Under TTK Art. 5/A, initiating commercial litigation or commercial lease eviction proceedings without first exhausting mandatory mediation leads to summary procedural dismissal with prejudice to legal costs. Our chambers manages all bureau filings, advocate caucuses, and enforceable minutes drafting.",
                    style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                  },
                  {
                    id: "prac76-cta-row",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "start",
                    wrap: true,
                    gap: "md",
                    children: [
                      {
                        id: "prac76-btn-retain",
                        type: "button",
                        label: "Retain Accredited Commercial Mediator",
                      },
                      {
                        id: "prac76-btn-file",
                        type: "button",
                        label: "File Mediation Bureau Application",
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

/**
 * PRACTICE-77: Arbitration · Istanbul Arbitration Centre (ISTAC) Model Maritime Clause
 * Layout Archetype: Parchment Model ISTAC Arbitration Clause Workbench & Fast-Track Rules
 */
export const PRACTICE_77_ISTAC_ARBITRATION_CLAUSE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-77-istac-arbitration-clause-deck",
  name: "Arbitration · ISTAC Model Clause & Fast-Track Maritime Workbench",
  kind: "section",
  root: {
    id: "prac77-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac77-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac77-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac77-badge",
                type: "badge",
                text: "DISPUTE RESOLUTION · ISTAC RULES 2024 · FAST-TRACK MARITIME & HOTEL ARBITRATION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac77-heading",
                type: "heading",
                level: 2,
                text: "ISTAC Model Arbitration Clause Workbench",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac77-sub",
                type: "text",
                text: "Bespoke drafting and enforcement of Istanbul Arbitration Centre clauses for superyacht refits, foreign hotel concessions, and expedited Aegean commercial arbitrations.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 7 / 5 Workbench Grid */
          {
            id: "prac77-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): Parchment Model Clause Panel */
              {
                id: "prac77-clause-box",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac77-clause-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac77-clause-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "sm",
                        style: { sizing: { width: "full" } },
                        children: [
                          {
                            id: "prac77-clause-tag",
                            type: "badge",
                            text: "RECOMMENDED ISTAC MARITIME CLAUSE (EN/TR)",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac77-clause-jurisdiction",
                            type: "badge",
                            text: "SEAT: ISTANBUL / BODRUM",
                            style: { color: { background: "primary", text: "background" } },
                          },
                        ],
                      },
                      {
                        id: "prac77-parchment-text-box",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "lg" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac77-clause-prose",
                            type: "text",
                            text: "“Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration administered by the Istanbul Arbitration Centre (ISTAC) in accordance with the ISTAC Arbitration Rules for the time being in force.”",
                            style: {
                              typography: { size: "base", tracking: "normal" },
                              color: { text: "text" },
                            },
                          },
                        ],
                      },
                      {
                        id: "prac77-params-heading",
                        type: "heading",
                        level: 4,
                        text: "Key Clause Parameters & Drafting Checkpoints",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac77-param-1",
                        type: "text",
                        text: "• Tribunal Composition: Sole Arbitrator (Tek Hakem) nominated jointly within 15 days or appointed by ISTAC Board.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac77-param-2",
                        type: "text",
                        text: "• Procedural Language: English for cross-border maritime/hotel charters; Turkish for domestic suppliers.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac77-param-3",
                        type: "text",
                        text: "• Substantive Law: Turkish Law (Türk Hukuku) with explicit exclusion of conflict-of-law rules.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac77-clause-actions",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: true,
                        gap: "sm",
                        children: [
                          {
                            id: "prac77-btn-download",
                            type: "button",
                            label: "Download Tailored Clause (.doc)",
                          },
                          {
                            id: "prac77-btn-retain",
                            type: "button",
                            label: "Retain Arbitration Counsel",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Fast-Track & Emergency Docket */
              {
                id: "prac77-docket-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  /* Feature 1: Emergency Arbitrator */
                  {
                    id: "prac77-card-emergency",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac77-e-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac77-e-badge",
                            type: "badge",
                            text: "EMERGENCY ARBITRATOR · 7-DAY INJUNCTION",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac77-e-title",
                            type: "heading",
                            level: 4,
                            text: "Pre-Tribunal Interim Orders",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac77-e-desc",
                            type: "text",
                            text: "Urgent interim relief granted within 7 days to freeze bank guarantees, halt yacht delivery defaults, or impound equipment prior to tribunal formation.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  /* Feature 2: Fast-Track Rules */
                  {
                    id: "prac77-card-fasttrack",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac77-ft-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac77-ft-badge",
                            type: "badge",
                            text: "EXPEDITED PROCEDURE · 3 MONTHS",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac77-ft-title",
                            type: "heading",
                            level: 4,
                            text: "Fast-Track Rules (Seri Tahkim)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac77-ft-desc",
                            type: "text",
                            text: "Mandatory for claims under 300,000 TRY (or by agreement). Sole arbitrator renders final binding award on documents within 3 months.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  /* Feature 3: Global Enforceability */
                  {
                    id: "prac77-card-enforceability",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac77-ny-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac77-ny-badge",
                            type: "badge",
                            text: "1958 NEW YORK CONVENTION · 172 STATES",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac77-ny-title",
                            type: "heading",
                            level: 4,
                            text: "Worldwide Award Enforcement",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac77-ny-desc",
                            type: "text",
                            text: "ISTAC awards are immediately enforceable across all New York Convention signatory jurisdictions, avoiding foreign court exequatur bottlenecks.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
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

/**
 * PRACTICE-78: Emergency Remedies · Prejudgment Freezing Injunction (İhtiyati Haciz)
 * Layout Archetype: High-Density Side-by-Side Dual Split Screen (6/6)
 */
export const PRACTICE_78_PREJUDGMENT_ATTACHMENT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-78-prejudgment-attachment-ihtiyati-haciz",
  name: "Emergency Remedies · Prejudgment Freezing Injunction (İhtiyati Haciz)",
  kind: "section",
  root: {
    id: "prac78-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac78-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac78-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac78-badge",
                type: "badge",
                text: "EMERGENCY RELIEF · EXECUTION & BANKRUPTCY CODE (İİK) ART. 257 · EX-PARTE ATTACHMENT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac78-heading",
                type: "heading",
                level: 2,
                text: "Prejudgment Asset Freezing & Vessel Attachment (İhtiyati Haciz)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac78-sub",
                type: "text",
                text: "Securing expedited 24-hour court orders to immobilize defaulting debtor bank accounts, resort land titles, and superyachts before disposal or flight.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac78-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left Column (6 cols): Judicial Freezing Merits */
              {
                id: "prac78-left-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac78-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac78-left-badge",
                        type: "badge",
                        text: "TRACK A · ASLİYE TİCARET / HUKUK COURT PETITION",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac78-left-title",
                        type: "heading",
                        level: 3,
                        text: "Judicial Attachment Merits & Evidentiary Standard",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-left-desc",
                        type: "text",
                        text: "Under İİK Art. 257, creditors may petition for an attachment order over mature monetary claims unsecured by pledge, or claims where debtor is preparing to conceal assets.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac78-left-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac78-left-point-1",
                        type: "text",
                        text: "• Ex-Parte Order: Decree rendered without debtor hearing within 24 to 48 hours to preserve element of surprise.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-left-point-2",
                        type: "text",
                        text: "• Mandatory Collateral (Teminat): Standard 10%–15% bank guarantee letter deposited into court escrow.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-left-point-3",
                        type: "text",
                        text: "• Strict 10-Day Statutory Filing Clock: Creditor must initiate substantive enforcement or lawsuit under İİK 264 within 7 days of execution.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-left-btn",
                        type: "button",
                        label: "Draft Emergency Attachment Petition",
                      },
                    ],
                  },
                ],
              },

              /* Right Column (6 cols): Enforcement Directorate Mechanics */
              {
                id: "prac78-right-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac78-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac78-right-badge",
                        type: "badge",
                        text: "TRACK B · İCRA DAİRESİ & MULTI-AGENCY EXECUTION",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac78-right-title",
                        type: "heading",
                        level: 3,
                        text: "Direct Electronic & Physical Asset Immobilization",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-right-desc",
                        type: "text",
                        text: "Upon issuance of the court decree, execution must be formally demanded before the Execution Office within 10 days under penalty of total nullity (İİK Art. 261).",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac78-right-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac78-right-point-1",
                        type: "text",
                        text: "• UYAP Banking Freeze: Automated electronic notices sent instantaneously to Central Bank and all Turkish banks.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-right-point-2",
                        type: "text",
                        text: "• Tapu Land Registry Injunction: Instant electronic lien placed on coastal villas, boutique hotels, and parcels.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-right-point-3",
                        type: "text",
                        text: "• Liman Başkanlığı Vessel Arrest: Notice to Harbor Master and Coast Guard preventing yacht clearance and exit from marina.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac78-right-btn",
                        type: "button",
                        label: "Dispatch Execution Officers to Marina",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Full-Bleed Urgent Banner Bar */
          {
            id: "prac78-urgent-bar",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface-muted" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac78-ub-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac78-ub-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac78-ub-badge",
                        type: "badge",
                        text: "CRITICAL 24-HOUR INTERVENTION WINDOW",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac78-ub-text",
                        type: "text",
                        text: "Vessels departing Turkish territorial waters or offshore fund transfers permanently eliminate recovery prospects.",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "prac78-ub-btn",
                    type: "button",
                    label: "Call 24/7 Litigation Emergency Line",
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

/**
 * PRACTICE-79: Cross-Border Litigation · Foreign Judgment Enforcement (Tanıma ve Tenfiz)
 * Layout Archetype: Asymmetric 70/30 Exequatur Reciprocity Dossier (8/4)
 */
export const PRACTICE_79_FOREIGN_JUDGMENT_ENFORCEMENT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-79-foreign-judgment-tanima-tenfiz",
  name: "Cross-Border Litigation · Foreign Judgment Enforcement (Tanıma ve Tenfiz)",
  kind: "section",
  root: {
    id: "prac79-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac79-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Header */
          {
            id: "prac79-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac79-badge",
                type: "badge",
                text: "CROSS-BORDER LITIGATION · MÖHUK ART. 50–59 · EXEQUATUR & ENFORCEMENT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac79-heading",
                type: "heading",
                level: 2,
                text: "Foreign Court Judgment Recognition & Enforcement (Tanıma ve Tenfiz)",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac79-sub",
                type: "text",
                text: "Transforming UK, EU, US, and Swiss monetary judgments and arbitral awards into directly executable Turkish court writs without merits reconsideration (révision au fond).",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Dossier Grid */
          {
            id: "prac79-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): MÖHUK Statutory Conditions & Reciprocity Deep Dive */
              {
                id: "prac79-main-dossier",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 8 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac79-md-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac79-md-badge",
                        type: "badge",
                        text: "STATUTORY PREREQUISITES · MÖHUK ART. 54",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac79-md-title",
                        type: "heading",
                        level: 3,
                        text: "The Four Statutory Tests for Exequatur Enforcement",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac79-md-intro",
                        type: "text",
                        text: "Under Turkish law, the Asliye Hukuk or Asliye Ticaret court cannot review the substantive correctness of the foreign decree (prohibition of révision au fond). It strictly verifies:",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac79-cond-1",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac79-c1-t",
                            type: "heading",
                            level: 4,
                            text: "1. Reciprocity Requirement (Karşılıklılık)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-c1-d",
                            type: "text",
                            text: "Statutory or de facto reciprocity between Turkey and the state of origin. De facto reciprocity with the UK is confirmed by settled Court of Cassation (Yargıtay) jurisprudence.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac79-cond-2",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac79-c2-t",
                            type: "heading",
                            level: 4,
                            text: "2. Non-Exclusive Jurisdiction Compliance",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-c2-d",
                            type: "text",
                            text: "The dispute must not fall within exclusive Turkish jurisdiction (e.g. rights in rem over Turkish immovable property under Tapu Kanunu).",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac79-cond-3",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac79-c3-t",
                            type: "heading",
                            level: 4,
                            text: "3. Right of Defense (Savunma Hakkı)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-c3-d",
                            type: "text",
                            text: "Verification that the respondent was properly served with process and afforded full opportunity to defend under the Hague Service Convention.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac79-cond-4",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac79-c4-t",
                            type: "heading",
                            level: 4,
                            text: "4. Public Policy Conformity (Kamu Düzeni)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-c4-d",
                            type: "text",
                            text: "The foreign judgment must not run counter to fundamental principles of Turkish constitutional order or public morality.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): Filing Checklist & Exequatur Desk */
              {
                id: "prac79-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac79-desk-card",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac79-desk-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac79-desk-badge",
                            type: "badge",
                            text: "FILING DOSSIER CHECKLIST",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac79-desk-title",
                            type: "heading",
                            level: 4,
                            text: "Exequatur Petition Deliverables",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-doc-1",
                            type: "text",
                            text: "✓ Original or certified judgment copy",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-doc-2",
                            type: "text",
                            text: "✓ Apostille Certificate (1961 Hague)",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-doc-3",
                            type: "text",
                            text: "✓ Finality Certificate (Kesinleşme Şerhi)",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-doc-4",
                            type: "text",
                            text: "✓ Sworn notarial Turkish translation",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac79-desk-divider",
                            type: "divider",
                            style: { sizing: { width: "full" } },
                          },
                          {
                            id: "prac79-desk-timing",
                            type: "text",
                            text: "Average proceedings duration: 4 to 8 months before Bodrum / Fethiye Civil Courts.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac79-btn-review",
                            type: "button",
                            label: "Submit Decree for Merits Audit",
                          },
                          {
                            id: "prac79-btn-checklist",
                            type: "button",
                            label: "Download MÖHUK Guide",
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

/**
 * PRACTICE-80: Urgent Chambers · Coastal Tourism Criminal Defense & Sulh Ceza 24/7
 * Layout Archetype: Full-Bleed Statutory Defense & Emergency Warning Command Bar
 */
export const PRACTICE_80_CRIMINAL_DEFENSE_TOURISM_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-80-criminal-defense-tourism-zones",
  name: "Urgent Chambers · Coastal Tourism Criminal Defense & Sulh Ceza 24/7",
  kind: "section",
  root: {
    id: "prac80-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac80-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "7xl", align: "center" },
        },
        children: [
          /* Top Full-Bleed Emergency Alert Bar */
          {
            id: "prac80-alert-bar",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "lg" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac80-alert-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac80-alert-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac80-alert-badge",
                        type: "badge",
                        text: "24/7 EMERGENCY DEFENSE · JANDARMA & SAHİL GÜVENLİK ARREST COMMAND",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac80-alert-text",
                        type: "text",
                        text: "Immediate chambers advocate dispatch within 45 minutes to Bodrum, Marmaris, and Fethiye police stations, Jandarma outposts, and maritime patrol vessels.",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "prac80-alert-btn",
                    type: "button",
                    label: "Call Emergency Defense Hotline 24/7",
                  },
                ],
              },
            ],
          },

          /* Header */
          {
            id: "prac80-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac80-badge",
                type: "badge",
                text: "CRIMINAL PROCEDURE (CMK) ART. 90–101 · EXPAT & TOURIST DEFENSE ADVOCACY",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac80-heading",
                type: "heading",
                level: 2,
                text: "Coastal Criminal Defense, Custody & Sulh Ceza Interrogation",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac80-sub",
                type: "text",
                text: "Vigorous legal defense for foreign yacht owners, resort guests, and non-resident directors facing police detention (gözaltı), maritime customs interrogations, or arrest hearings.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual Operational Tracks (7 / 5) */
          {
            id: "prac80-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): Statutory Procedural Defense Rail */
              {
                id: "prac80-left-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
                children: [
                  /* CMK 149 Right to Counsel */
                  {
                    id: "prac80-card-counsel",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac80-cc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac80-cc-badge",
                            type: "badge",
                            text: "CMK ART. 149 · INALIENABLE RIGHT TO ADVOCATE",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac80-cc-title",
                            type: "heading",
                            level: 3,
                            text: "Immediate Police & Jandarma Interrogation Defense",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac80-cc-desc",
                            type: "text",
                            text: "Statements taken by police or gendarmerie without an advocate present are inadmissible under CMK Art. 148. Our advocates attend all custody interviews to enforce the absolute right to remain silent (susma hakkı).",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  /* CMK 202 Sworn Interpreter & Consular Notification */
                  {
                    id: "prac80-card-interpreter",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac80-ci-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac80-ci-badge",
                            type: "badge",
                            text: "VIENNA CONVENTION ART. 36 · SWORN INTERPRETERS",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac80-ci-title",
                            type: "heading",
                            level: 3,
                            text: "Consular Notification & Language Rights",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac80-ci-desc",
                            type: "text",
                            text: "Foreign detainees have the statutory right to sworn courtroom interpreter services at state expense (CMK Art. 202) and immediate formal notice to their respective embassy or consulate general.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  /* Sulh Ceza Hakimliği Interrogation */
                  {
                    id: "prac80-card-sulhceza",
                    type: "card",
                    element: "article",
                    style: {
                      color: { background: "surface" },
                      border: { width: "hairline", radius: "md", color: "border" },
                      spacing: { padding: "lg" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac80-cs-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac80-cs-badge",
                            type: "badge",
                            text: "CMK ART. 100 & 109 · JUDICIAL CONTROL DEFENSE",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac80-cs-title",
                            type: "heading",
                            level: 3,
                            text: "Sulh Ceza Hakimliği Release Hearings",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac80-cs-desc",
                            type: "text",
                            text: "Advocating for release on Judicial Control (Adli Kontrol), bail security, or regular signature obligations rather than pre-trial detention (tutuklama) at the magistrate court hearing.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Rapid Deployment Desks & Coverage */
              {
                id: "prac80-right-col",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac80-rc-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac80-rc-badge",
                        type: "badge",
                        text: "COASTAL DISTRICT COVERAGE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac80-rc-title",
                        type: "heading",
                        level: 3,
                        text: "Regional Emergency Chambers",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac80-cov-1",
                        type: "text",
                        text: "📍 Bodrum & Yalıkavak: Bodrum Courthouse, Yalıkavak Marina Security Desk & İlçe Jandarma.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac80-cov-2",
                        type: "text",
                        text: "📍 Fethiye & Göcek: Fethiye Adliyesi, Göcek Port Police & Sahil Güvenlik Bot Komutanlığı.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac80-cov-3",
                        type: "text",
                        text: "📍 Marmaris & Datça: Marmaris Sulh Ceza, Yacht Harbor Customs & Datça Coast Guard Outpost.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac80-rc-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac80-rc-phone-box",
                        type: "card",
                        element: "div",
                        style: {
                          color: { background: "surface-muted" },
                          border: { width: "hairline", radius: "sm", color: "border" },
                          spacing: { padding: "md" },
                          sizing: { width: "full" },
                        },
                        children: [
                          {
                            id: "prac80-rc-tel-label",
                            type: "text",
                            text: "24/7 Emergency Defense Dispatch:",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                          {
                            id: "prac80-rc-tel-num",
                            type: "heading",
                            level: 4,
                            text: "+90 (252) 614 00 24",
                            style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac80-btn-dispatch",
                        type: "button",
                        label: "Dispatch Advocate to Police Station",
                      },
                      {
                        id: "prac80-btn-consulate",
                        type: "button",
                        label: "Initiate Consular Notification",
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

export const PRACTICE_LIBRARY_BATCH_16: ComponentDocument[] = [
  PRACTICE_76_MANDATORY_COMMERCIAL_MEDIATION_DOCUMENT,
  PRACTICE_77_ISTAC_ARBITRATION_CLAUSE_DOCUMENT,
  PRACTICE_78_PREJUDGMENT_ATTACHMENT_DOCUMENT,
  PRACTICE_79_FOREIGN_JUDGMENT_ENFORCEMENT_DOCUMENT,
  PRACTICE_80_CRIMINAL_DEFENSE_TOURISM_DOCUMENT,
];
