import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 18: Maritime Salvage & Average (#86–#90)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 86: Parchment LOF 2024 / SCOPIC Salvage Agreement Workbench
 * 87: Full-Bleed Statutory Environmental Wreck Removal Warning Rail
 * 88: Tabular York-Antwerp Rules Average Adjustment Matrix (Hairline Table)
 * 89: High-Density Side-by-Side Dual Split Screen (6/6: MARPOL Fines vs Appeal)
 * 90: Asymmetric 70/30 Bunker Fuel Lab Assay Dossier (8/4: Contaminated Fuel)
 * ============================================================================
 */

/**
 * PRACTICE-86: Maritime Law · Lloyd's Open Form (LOF) & Superyacht Salvage Arbitration
 * Layout Archetype: Parchment LOF 2024 / SCOPIC Salvage Agreement Workbench
 */
export const PRACTICE_86_MARITIME_SALVAGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-86-maritime-salvage-lloyds-open-form",
  name: "Maritime Law · Lloyd's Open Form (LOF) & Superyacht Salvage Arbitration",
  kind: "section",
  root: {
    id: "prac86-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac86-container",
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
            id: "prac86-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac86-badge",
                type: "badge",
                text: "MARITIME ADMIRALTY · TTK ART. 1298–1327 · LOF 2024 / SCOPIC CLAUSE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac86-heading",
                type: "heading",
                level: 2,
                text: "Superyacht Grounding, Salvage Security & LOF Arbitration",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac86-sub",
                type: "text",
                text: "Managing emergency marine salvage negotiations, Lloyd’s Open Form (No Cure - No Pay) terms, SCOPIC remuneration defense, and Turkish port security releases.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 7 / 5 Workbench Grid */
          {
            id: "prac86-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): LOF 2024 Agreement Parchment Box */
              {
                id: "prac86-lof-box",
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
                    id: "prac86-lof-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac86-lof-header",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "between",
                        wrap: false,
                        gap: "sm",
                        style: { sizing: { width: "full" } },
                        children: [
                          {
                            id: "prac86-lof-tag",
                            type: "badge",
                            text: "STANDARD SALVAGE AGREEMENT (LOF 2024)",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac86-lof-venue",
                            type: "badge",
                            text: "VENUE: LLOYD’S SALVAGE ARBITRATION",
                            style: { color: { background: "primary", text: "background" } },
                          },
                        ],
                      },
                      {
                        id: "prac86-parchment-clause",
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
                            id: "prac86-clause-text",
                            type: "text",
                            text: "“The Contractor agrees to use best endeavours to salve the vessel and her cargo, bunkers, stores and any other property on board and take them to a safe place of safety. The services shall be rendered as salvage services upon the principle of ‘No Cure - No Pay’ subject to the Lloyd’s Standard Form of Salvage Agreement (LOF 2024) and the Lloyd’s Procedural Rules.”",
                            style: { typography: { size: "base" }, color: { text: "text" } },
                          },
                        ],
                      },
                      {
                        id: "prac86-points-head",
                        type: "heading",
                        level: 4,
                        text: "Key Salvage Checkpoints & P&I Security Clauses",
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac86-pt-1",
                        type: "text",
                        text: "• SCOPIC Invocation: Invoking the Special Compensation P&I Club Clause to cap salvor claims in environmentally sensitive Aegean marine zones.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac86-pt-2",
                        type: "text",
                        text: "• Port Entry Security: Posting acceptable bank or P&I Club letter of guarantee (Club LOU) before Liman Başkanlığı to prevent vessel maritime arrest.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac86-pt-3",
                        type: "text",
                        text: "• Turkish Law Mandatory Application: Reconciling foreign salvage arbitration awards with TTK Art. 1305 mandatory consumer & safety provisions.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac86-btn-row",
                        type: "stack",
                        direction: "row",
                        alignment: "center",
                        distribution: "start",
                        wrap: true,
                        gap: "sm",
                        children: [
                          {
                            id: "prac86-btn-terms",
                            type: "button",
                            label: "Download LOF 2024 Salvage Charter",
                          },
                          {
                            id: "prac86-btn-admiralty",
                            type: "button",
                            label: "Retain Emergency Admiralty Counsel",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Salvage Risk Docket */
              {
                id: "prac86-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
                children: [
                  {
                    id: "prac86-card-scopic",
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
                        id: "prac86-sc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac86-sc-badge",
                            type: "badge",
                            text: "SCOPIC CLAUSE · ENVIRONMENTAL SAFETY",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac86-sc-title",
                            type: "heading",
                            level: 4,
                            text: "Tariff-Based Salvor Remuneration",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac86-sc-desc",
                            type: "text",
                            text: "SCOPIC replaces unpredictable salvor percentage claims with pre-agreed hourly tariff rates for tugboats and divers, preventing ruinous salvage awards.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "prac86-card-arrest",
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
                        id: "prac86-ar-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac86-ar-badge",
                            type: "badge",
                            text: "MARITIME LIEN · TTK ART. 1320",
                            style: { color: { background: "surface-muted", text: "text" } },
                          },
                          {
                            id: "prac86-ar-title",
                            type: "heading",
                            level: 4,
                            text: "Statutory Maritime Lien Defense",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac86-ar-desc",
                            type: "text",
                            text: "Salvors acquire automatic maritime liens ranking ahead of ship mortgages. We deposit court escrow in Bodrum/Fethiye to secure immediate vessel clearance.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "prac86-card-pi",
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
                        id: "prac86-pi-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "xs",
                        children: [
                          {
                            id: "prac86-pi-badge",
                            type: "badge",
                            text: "INTERNATIONAL P&I CLUBS",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac86-pi-title",
                            type: "heading",
                            level: 4,
                            text: "Club Letter of Undertaking (LOU)",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac86-pi-desc",
                            type: "text",
                            text: "Direct integration with Gard, Britannia, and UK P&I Clubs to negotiate acceptable security wording recognized by Turkish commercial admiralty courts.",
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
 * PRACTICE-87: Maritime Safety · Sunken Vessel Wreck Removal Order (Enkaz Kaldırma)
 * Layout Archetype: Full-Bleed Statutory Environmental Wreck Removal Warning Rail
 */
export const PRACTICE_87_WRECK_REMOVAL_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-87-wreck-removal-port-authority-order",
  name: "Maritime Safety · Sunken Vessel Wreck Removal Order (Enkaz Kaldırma)",
  kind: "section",
  root: {
    id: "prac87-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac87-container",
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
          /* Top Full-Bleed Warning Bar */
          {
            id: "prac87-alert-bar",
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
                id: "prac87-alert-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac87-alert-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      {
                        id: "prac87-alert-badge",
                        type: "badge",
                        text: "STATUTORY REMOVAL MANDATE · LAW ON PORTS NO. 618 ART. 7",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac87-alert-text",
                        type: "text",
                        text: "Port Authorities (Liman Başkanlığı) impose strict 15-day removal orders on stranded or sunken yachts with daily compounding statutory penalties.",
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "prac87-alert-btn",
                    type: "button",
                    label: "File Emergency Wreck Removal Extension",
                  },
                ],
              },
            ],
          },

          /* Header */
          {
            id: "prac87-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac87-badge",
                type: "badge",
                text: "HARBOR REGULATIONS · ENVIRONMENTAL RECOVERY & NAIROBI CONVENTION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac87-heading",
                type: "heading",
                level: 2,
                text: "Port Authority Wreck Removal Orders & Salvage Tenders",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac87-sub",
                type: "text",
                text: "Legal representation for yacht owners and hull underwriters facing official port demolition orders, marine hazard declarations, and public auction recovery claims.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 3-Track Operational Grid */
          {
            id: "prac87-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Track 1: Liman Notice */
              {
                id: "prac87-col-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac87-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac87-c1-b",
                        type: "badge",
                        text: "PHASE 01 · 15-DAY NOTICE",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac87-c1-t",
                        type: "heading",
                        level: 3,
                        text: "Port Authority Order",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac87-c1-d",
                        type: "text",
                        text: "Service of formal notice by Bodrum, Marmaris, or Fethiye Harbor Master commanding owner removal under Law No. 618. Failure to comply triggers state contractor appointment.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Track 2: Environmental Bond */
              {
                id: "prac87-col-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac87-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac87-c2-b",
                        type: "badge",
                        text: "PHASE 02 · SALVAGE TENDER",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac87-c2-t",
                        type: "heading",
                        level: 3,
                        text: "Licensed Crane Tender",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac87-c2-d",
                        type: "text",
                        text: "Negotiating contracted salvage terms with Ministry-certified floating sheerlegs crane operators, environmental fuel defueling protocols, and safe berth allocations.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                    ],
                  },
                ],
              },

              /* Track 3: Auction Recovery */
              {
                id: "prac87-col-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac87-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      {
                        id: "prac87-c3-b",
                        type: "badge",
                        text: "PHASE 03 · RECOVERY AUCTION",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac87-c3-t",
                        type: "heading",
                        level: 3,
                        text: "State Auction Shield",
                        style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac87-c3-d",
                        type: "text",
                        text: "Preventing forced public auctions of valuable yacht components under Law No. 618 Art. 8 by lodging financial security and securing administrative court stays.",
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
};

/**
 * PRACTICE-88: Admiralty Average · York-Antwerp Rules General Average Adjustment Matrix
 * Layout Archetype: Tabular York-Antwerp Rules Average Adjustment Matrix (Hairline Table)
 */
export const PRACTICE_88_GENERAL_AVERAGE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-88-general-average-york-antwerp-matrix",
  name: "Admiralty Average · York-Antwerp Rules General Average Adjustment Matrix",
  kind: "section",
  root: {
    id: "prac88-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac88-container",
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
            id: "prac88-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac88-badge",
                type: "badge",
                text: "GENERAL AVERAGE · TTK ART. 1272–1297 · YORK-ANTWERP RULES 2016",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac88-heading",
                type: "heading",
                level: 2,
                text: "General Average Adjustment & Proportional Contribution Matrix",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac88-sub",
                type: "text",
                text: "Apportioning maritime sacrifice expenditures between shipowner, high-value charter cargo, and bunker interests under certified average adjuster (dispeççi) supervision.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Tabular General Average Matrix */
          {
            id: "prac88-matrix-card",
            type: "card",
            element: "article",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "xl" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac88-table-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Header Row */
                  {
                    id: "prac88-th-row",
                    type: "grid",
                    columns: 12,
                    style: {
                      sizing: { width: "full" },
                      spacing: { paddingY: "sm", paddingX: "md" },
                      color: { background: "surface-muted" },
                      border: { radius: "sm" },
                    },
                    children: [
                      {
                        id: "prac88-th-1",
                        type: "text",
                        text: "MARITIME SACRIFICE / EXPENDITURE",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-th-2",
                        type: "text",
                        text: "YORK-ANTWERP 2016 RULE",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-th-3",
                        type: "text",
                        text: "CONTRIBUTORY INTERESTS",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-th-4",
                        type: "text",
                        text: "CHAMBERS DISPEÇ ADJUSTMENT",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },

                  /* Row 1: Emergency Towage & Refloating */
                  {
                    id: "prac88-row-1",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac88-r1-c1",
                        type: "text",
                        text: "Emergency Tugboat Towage & Refloating",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-r1-c2",
                        type: "text",
                        text: "Rule A & Rule VII (Damage to Machinery in Refloating)",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-r1-c3",
                        type: "text",
                        text: "Hull value + charter equipment + bunkers proportional share",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac88-r1-c4",
                        type: "text",
                        text: "Filing average bond & collecting cash deposits from all charterers.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "prac88-div-1",
                    type: "divider",
                    style: { sizing: { width: "full" } },
                  },

                  /* Row 2: Port of Refuge Expenses */
                  {
                    id: "prac88-row-2",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac88-r2-c1",
                        type: "text",
                        text: "Port of Refuge Berth & Crew Wages",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-r2-c2",
                        type: "text",
                        text: "Rule X & Rule XI (Expenses at Port of Refuge)",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-r2-c3",
                        type: "text",
                        text: "Vessel sound value assessed at Bodrum port of destination",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac88-r2-c4",
                        type: "text",
                        text: "Certified average statement submission to Asliye Ticaret Mahkemesi.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                  {
                    id: "prac88-div-2",
                    type: "divider",
                    style: { sizing: { width: "full" } },
                  },

                  /* Row 3: Jettison of Equipment / Cargo */
                  {
                    id: "prac88-row-3",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { paddingY: "sm", paddingX: "md" } },
                    children: [
                      {
                        id: "prac88-r3-c1",
                        type: "text",
                        text: "Jettison of Deck Cargo & Luxury Tenders",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-r3-c2",
                        type: "text",
                        text: "Rule I (Jettison of Cargo) & Rule II (Extinguishing Fire)",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac88-r3-c3",
                        type: "text",
                        text: "Replaced values included in average credit allowance",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac88-r3-c4",
                        type: "text",
                        text: "Enforcing maritime lien over offloaded cargo until average security paid.",
                        layout: { span: { mobile: 12, tablet: 3, desktop: 3 } },
                        style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } },
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac88-footer-card",
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
                id: "prac88-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac88-fc-text",
                    type: "text",
                    text: "Chambers provides certified sworn dispeç adjustments under Turkish Commercial Court ratification (TTK Art. 1292).",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "prac88-btn-adjust",
                    type: "button",
                    label: "Retain Certified Average Adjuster",
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
 * PRACTICE-89: Marine Pollution · MARPOL & Coast Guard Bilge Fine Defense
 * Layout Archetype: High-Density Side-by-Side Dual Split Screen (6/6)
 */
export const PRACTICE_89_MARINE_POLLUTION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-89-marine-pollution-marpol-fine-defense",
  name: "Marine Pollution · MARPOL & Coast Guard Bilge Fine Defense",
  kind: "section",
  root: {
    id: "prac89-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac89-container",
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
            id: "prac89-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac89-badge",
                type: "badge",
                text: "ENVIRONMENT LAW NO. 2872 ART. 20 · MARPOL 73/78 ANNEX I & IV DEFENSE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac89-heading",
                type: "heading",
                level: 2,
                text: "Sahil Güvenlik Marine Pollution Fines & Vessel Arrest Defense",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac89-sub",
                type: "text",
                text: "Urgent defense against catastrophic environmental discharge fines imposed on foreign yachts by Coast Guard, Metropolitan Municipalities, and Port Authorities.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac89-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Coast Guard Sanction Protocol */
              {
                id: "prac89-left-col",
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
                    id: "prac89-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac89-left-b",
                        type: "badge",
                        text: "TRACK A · STATUTORY SANCTIONS & ARREST",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac89-left-t",
                        type: "heading",
                        level: 3,
                        text: "Automatic Vessel Detention & Fine Scale",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac89-left-d",
                        type: "text",
                        text: "Under Law No. 2872, fines for alleged bilge, grey water, or sewage discharge are calculated per gross tonnage (GT) and frequently exceed $100,000–$500,000 USD for large yachts.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac89-left-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac89-lp-1",
                        type: "text",
                        text: "• Immediate Harbor Arrest: Vessel prohibited from sailing until full cash fine or irrevocable bank letter of guarantee is deposited.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac89-lp-2",
                        type: "text",
                        text: "• Aerial Drone Surveillance: Sahil Güvenlik thermal imaging and aerial camera footage used as prima facie evidence of sea discolouration.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac89-left-btn",
                        type: "button",
                        label: "Deposit Guarantee & Release Vessel",
                      },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Administrative Judicial Appeal */
              {
                id: "prac89-right-col",
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
                    id: "prac89-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac89-right-b",
                        type: "badge",
                        text: "TRACK B · ADMINISTRATIVE COURT CANCELLATION",
                        style: { color: { background: "primary", text: "background" } },
                      },
                      {
                        id: "prac89-right-t",
                        type: "heading",
                        level: 3,
                        text: "İdare Mahkemesi Annulment Lawsuit",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac89-right-d",
                        type: "text",
                        text: "Chambers files an annulment lawsuit before Muğla Administrative Court within the strict 30-day statutory limitation period under IYUK Art. 7.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac89-right-divider",
                        type: "divider",
                        style: { sizing: { width: "full" } },
                      },
                      {
                        id: "prac89-rp-1",
                        type: "text",
                        text: "• Counter-Sampling Protocol: Challenging flawed water sample collection that failed to follow tripartite sealed container rules.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac89-rp-2",
                        type: "text",
                        text: "• Blue Card (Mavi Kart) Records: Proving regular marina waste pump-out compliance via Ministry electronic logging system.",
                        style: { typography: { size: "sm" }, color: { text: "text" } },
                      },
                      {
                        id: "prac89-right-btn",
                        type: "button",
                        label: "File Administrative Court Appeal",
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
 * PRACTICE-90: Marine Claims · Off-Spec Bunker Fuel Contamination & Engine Damage
 * Layout Archetype: Asymmetric 70/30 Bunker Fuel Lab Assay Dossier (8/4)
 */
export const PRACTICE_90_BUNKER_FUEL_CONTAMINATION_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-90-bunker-fuel-contamination-claim",
  name: "Marine Claims · Off-Spec Bunker Fuel Contamination & Engine Damage",
  kind: "section",
  root: {
    id: "prac90-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac90-container",
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
            id: "prac90-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac90-badge",
                type: "badge",
                text: "BUNKER CLAIMS · ISO 8217 MARPOL ANNEX VI · MARITIME LIEN ENFORCEMENT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac90-heading",
                type: "heading",
                level: 2,
                text: "Off-Spec Marine Gas Oil & Superyacht Engine Defect Claims",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac90-sub",
                type: "text",
                text: "Immediate legal intervention for MTU/Caterpillar engine failures caused by contaminated coastal bunkering, joint lab testing protocols, and supplier arrest.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Grid */
          {
            id: "prac90-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): Bunker Dispute Technical & Legal Dossier */
              {
                id: "prac90-main-dossier",
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
                    id: "prac90-md-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac90-md-b",
                        type: "badge",
                        text: "TECHNICAL DELIL TESPITI · COURT EXPERT SURVEY",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac90-md-t",
                        type: "heading",
                        level: 3,
                        text: "ISO 8217 Specification Breach & Evidentiary Freezing",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac90-md-d",
                        type: "text",
                        text: "Marine gas oil delivered by Aegean bunker barges containing high catalytic fines (al-si), water emulsion, or flash point violations causes catastrophic injector failure. Immediate preservation of evidence is crucial before bunkers are depleted.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac90-step-1",
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
                            id: "prac90-s1-t",
                            type: "heading",
                            level: 4,
                            text: "1. Joint Re-Testing at Accredited Laboratory",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac90-s1-p",
                            type: "text",
                            text: "Sealed bunker manifold samples tested jointly under FOBAS or Veritas Petroleum Services protocols to establish statutory liability under TBK Art. 219.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac90-step-2",
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
                            id: "prac90-s2-t",
                            type: "heading",
                            level: 4,
                            text: "2. Ex-Parte Court Delil Tespiti Survey",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac90-s2-p",
                            type: "text",
                            text: "Bodrum or Fethiye Civil Court appoints independent marine engineer to board vessel, inspect cylinder heads, and lock bunker tanks within 24 hours.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): Bunker Supplier Lien Desk */
              {
                id: "prac90-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac90-side-card",
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
                        id: "prac90-sc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac90-sc-b",
                            type: "badge",
                            text: "REMEDIES & ATTACHMENT",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac90-sc-t",
                            type: "heading",
                            level: 4,
                            text: "Bunker Barge Arrest",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac90-sc-item1",
                            type: "text",
                            text: "✓ Prejudgment attachment on fuel barge",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac90-sc-item2",
                            type: "text",
                            text: "✓ De-bunkering cost recoupment",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac90-sc-item3",
                            type: "text",
                            text: "✓ OEM MTU replacement parts warranty",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac90-sc-divider",
                            type: "divider",
                            style: { sizing: { width: "full" } },
                          },
                          {
                            id: "prac90-btn-sample",
                            type: "button",
                            label: "File Emergency Delil Tespiti Petition",
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

export const PRACTICE_LIBRARY_BATCH_18: ComponentDocument[] = [
  PRACTICE_86_MARITIME_SALVAGE_DOCUMENT,
  PRACTICE_87_WRECK_REMOVAL_DOCUMENT,
  PRACTICE_88_GENERAL_AVERAGE_DOCUMENT,
  PRACTICE_89_MARINE_POLLUTION_DOCUMENT,
  PRACTICE_90_BUNKER_FUEL_CONTAMINATION_DOCUMENT,
];
