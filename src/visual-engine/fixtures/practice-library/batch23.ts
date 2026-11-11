import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 23: Superyacht Construction, Refit & Shipyard Liens (#111–#115)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 111: 5-Stage Milestone Progress Payment Stepper Rail (REFITCON / NEWBUILDCON)
 * 112: Dual Comparative Split Screen (6/6: Shipyard Mechanic Lien vs Escrow Release)
 * 113: Asymmetric 8/4 Hull Stability & Classification Society Dossier (RINA/Lloyd's)
 * 114: Tabular Inward Processing Regime (DİİB) & Bonded Spares Matrix (12-Col Table)
 * 115: Editorial Maritime Acceptance Protocol Monograph with Inset Pull-Quote
 * ============================================================================
 */

/**
 * PRACTICE-111: Custom Yacht Construction · Milestone Progress Payment Stepper Rail
 * Layout Archetype: 5-Stage Milestone Progress Payment Stepper Rail (REFITCON / NEWBUILDCON)
 */
export const PRACTICE_111_YACHT_BUILD_CONTRACT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-111-custom-yacht-build-contract-bimco-refit",
  name: "Custom Yacht Construction · BIMCO REFITCON & Milestone Payment Escrow",
  kind: "section",
  root: {
    id: "prac111-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac111-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac111-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac111-badge",
                type: "badge",
                text: "SHIPYARD CONTRACTS · BIMCO REFITCON · TTK ART. 1007 ESCROW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac111-title",
                type: "heading",
                level: 2,
                text: "Turnkey Superyacht Newbuild & BIMCO Refit Milestone Escrow",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac111-subtitle",
                type: "text",
                text: "From keel laying in Tuzla or Antalya Free Zone to sea trials in Bodrum: structuring stage-gate milestone financing, refund guarantees, and classification society certifications under BIMCO REFITCON.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 5-Stage Milestone Rail Grid */
          {
            id: "prac111-rail-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "sm" } },
            children: [
              /* Stage 1 */
              {
                id: "prac111-stg-1",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac111-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac111-s1-b", type: "badge", text: "STAGE 01 · 20%", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac111-s1-t", type: "heading", level: 4, text: "Keel Laying", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac111-s1-d", type: "text", text: "Hull plate welding certified by Classification Surveyor (RINA / Lloyd's Register). Escrow release.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 2 */
              {
                id: "prac111-stg-2",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac111-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac111-s2-b", type: "badge", text: "STAGE 02 · 25%", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac111-s2-t", type: "heading", level: 4, text: "Superstructure", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac111-s2-d", type: "text", text: "Aluminum/composite deck joins sealed. Gemi İnşa İpoteği mortgage lodged with Turkish registry.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 3 */
              {
                id: "prac111-stg-3",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac111-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac111-s3-b", type: "badge", text: "STAGE 03 · 25%", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac111-s3-t", type: "heading", level: 4, text: "Main Propulsion", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac111-s3-d", type: "text", text: "Twin MTU/MAN engines installed with laser shaft alignment test and bench warranty certificates lodged.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 4 */
              {
                id: "prac111-stg-4",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 2 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac111-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac111-s4-b", type: "badge", text: "STAGE 04 · 20%", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac111-s4-t", type: "heading", level: 4, text: "Interior Joinery", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac111-s4-d", type: "text", text: "Custom Italian marble, teak decks, AV systems & acoustic testing under 45 dB(A) comfort notation.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 5 */
              {
                id: "prac111-stg-5",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "md" },
                },
                children: [
                  {
                    id: "prac111-s5-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac111-s5-b", type: "badge", text: "STAGE 05 · 10%", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac111-s5-t", type: "heading", level: 4, text: "Delivery Protocol", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac111-s5-d", type: "text", text: "Full sea trials pass, Protocol of Delivery signed, builder lien waivers executed, Turkish flag hoisted.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Safeguard Callout Box */
          {
            id: "prac111-callout-card",
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
                id: "prac111-co-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "xs",
                children: [
                  { id: "prac111-co-badge", type: "badge", text: "MANDATORY BANK REFUND GUARANTEE (BRG)", style: { color: { background: "primary", text: "background" } } },
                  { id: "prac111-co-title", type: "heading", level: 3, text: "Unconditional First-Demand Bank Guarantee Shield", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                  { id: "prac111-co-text", type: "text", text: "Under TTK Art. 1007 and international yacht construction customs, stage payments must never be released without an unconditional first-demand Bank Refund Guarantee issued by a Turkish first-class bank guaranteeing 100% principal reimbursement in shipyard insolvency.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac111-footer-bar",
            type: "card",
            element: "div",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac111-footer-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac111-footer-text",
                    type: "text",
                    text: "Reviewing a 40m+ newbuild or multi-million euro winter refit contract in Aegean or Mediterranean yards?",
                    style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } },
                  },
                  {
                    id: "prac111-btn-escrow",
                    type: "button",
                    label: "Retain Refit Contract Counsel",
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
 * PRACTICE-112: Maritime Liens · Shipyard Possessory Lien (Hapis Hakkı) Defense
 * Layout Archetype: Dual Comparative Split Screen (6/6: Shipyard Mechanic Lien vs Escrow Release)
 */
export const PRACTICE_112_SHIPYARD_LIEN_DEFENSE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-112-shipyard-possessory-lien-hapis-hakki-defense",
  name: "Maritime Liens · Shipyard Possessory Lien (Hapis Hakkı) Defense & Vessel Arrest",
  kind: "section",
  root: {
    id: "prac112-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac112-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac112-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac112-badge",
                type: "badge",
                text: "TURKISH COMMERCIAL CODE ART. 1320 · TMK ART. 950 HAPİS HAKKI",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac112-title",
                type: "heading",
                level: 2,
                text: "Shipyard Possessory Lien Injunction vs Letter of Guarantee Release",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac112-subtitle",
                type: "text",
                text: "When a Turkish shipyard refuses to launch a superyacht over contested change-order invoices, our maritime litigation team secures urgent provisional orders releasing physical possession via escrow collateral.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual 6/6 Comparative Grid */
          {
            id: "prac112-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Shipyard Mechanic Lien Claim */
              {
                id: "prac112-left-card",
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
                    id: "prac112-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac112-left-b", type: "badge", text: "TRACK A · SHIPYARD RETENTION (TMK ART. 950)", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac112-left-h", type: "heading", level: 3, text: "Unilateral Physical Retention of Superyacht", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac112-left-d", type: "text", text: "Turkish Civil Code Art. 950 gives repairers a right of retention over movable property in their lawful possession for mature debts arising from work done. Yards frequently exploit this to block seasonal summer charter deployments over inflated labor hours.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac112-left-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac112-lp-1", type: "text", text: "• Port Master departure clearance blocked without shipyard waiver.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac112-lp-2", type: "text", text: "• MYBA summer charters cancelled with liquidated damages up to €50,000/week.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac112-lp-3", type: "text", text: "• Risk of forced auction under Enforcement and Bankruptcy Code (İİK).", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Owner Urgent Release Strategy */
              {
                id: "prac112-right-card",
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
                    id: "prac112-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac112-right-b", type: "badge", text: "TRACK B · COLLATERAL SUBSTITUTION (TMK ART. 953)", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac112-right-h", type: "heading", level: 3, text: "Immediate Vessel Release via Bank Guarantee", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac112-right-d", type: "text", text: "Under TMK Art. 953, the possessory lien is extinguished upon the debtor furnishing adequate substitute security. We petition the Maritime Specialized Court within 48 hours for an interim mandatory injunction ordering immediate launch against a cash deposit or bank letter of guarantee.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac112-right-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac112-rp-1", type: "text", text: "✓ Swift judicial inspection (Bilirkişi) to assess actual work completed.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac112-rp-2", type: "text", text: "✓ Letter of Guarantee lodged into court escrow, terminating detention.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac112-btn-injunction", type: "button", label: "Apply for Emergency Release Injunction", },
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
 * PRACTICE-113: Naval Architecture & Warranty · Design Defect & Speed Shortfall Dossier
 * Layout Archetype: Asymmetric 8/4 Hull Stability & Classification Society Dossier (RINA/Lloyd's)
 */
export const PRACTICE_113_NAVAL_WARRANTY_DEFECT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-113-naval-architect-warranty-design-defect",
  name: "Naval Architecture Disputes · Speed Shortfall, Stability Defect & Class Society Liability",
  kind: "section",
  root: {
    id: "prac113-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac113-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac113-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac113-badge",
                type: "badge",
                text: "NAVAL ARCHITECTURE · TBK ART. 475 LATENT DEFECTS · RINA / LLOYD'S",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac113-title",
                type: "heading",
                level: 2,
                text: "Yacht Speed Warranty Breaches & Hull Hydrodynamic Defects",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac113-subtitle",
                type: "text",
                text: "When delivered performance fails contract specifications—whether maximum speed deficit, excessive vibration, range deficiency, or draught overruns violating Mediterranean mooring drafts.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Grid */
          {
            id: "prac113-asymmetric-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* 8 cols: Technical Remedies Dossier */
              {
                id: "prac113-dossier-card",
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
                    id: "prac113-dos-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac113-dos-badge", type: "badge", text: "LIQUIDATED DAMAGES & RESCISSION PROTOCOL", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac113-dos-heading", type: "heading", level: 3, text: "Contractual Remedy Framework for Delivery Non-Conformity", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac113-dos-desc", type: "text", text: "Superyacht shipbuilding contracts feature precise graduated penalties for technical shortfall, backed by Turkish Code of Obligations (TBK) Art. 475 latent defect remedies and right of rescission.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac113-dos-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac113-dp-1", type: "text", text: "• Speed Deficit Penalty: €150,000 per knot below 24 knots baseline. Absolute right to reject vessel if deficit exceeds 2.5 knots.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac113-dp-2", type: "text", text: "• Draught Overrun: Unladen draught exceeding 2.30m prevents entry to Port Hercule or Bodrum marina berths, entitling capital devaluation damages.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac113-dp-3", type: "text", text: "• Noise & Vibration Comfort: Living area noise exceeding RINA Comfort Class (55 dBA) requires shipyard insulation retrofit at builder cost.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* 4 cols: Surveyor Audit Panel */
              {
                id: "prac113-side-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac113-side-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac113-sb-1", type: "badge", text: "TRIAL TELEMETRY", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac113-st-1", type: "heading", level: 4, text: "Independent Trial Protocol", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac113-sd-1", type: "text", text: "Our maritime litigators attend sea trials with certified naval architects, deploying calibrated GPS tow tank telemetry to establish unassailable evidence for London (LMAA) or Istanbul (ISTAC) arbitration.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac113-side-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac113-btn-survey", type: "button", label: "Commission Sea Trial Audit", },
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
 * PRACTICE-114: Customs & Tax · Inward Processing Regime (DİİB) & Yacht Spare Parts Bond
 * Layout Archetype: Tabular Inward Processing Regime (DİİB) & Bonded Spares Matrix (12-Col Table)
 */
export const PRACTICE_114_YACHT_CUSTOMS_BOND_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-114-duty-free-yacht-equipment-customs-bond",
  name: "Customs & Free Zones · Superyacht Inward Processing (DİİB) & Spares Exemption",
  kind: "section",
  root: {
    id: "prac114-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac114-container",
        type: "stack",
        direction: "column",
        alignment: "start",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
        children: [
          /* Header */
          {
            id: "prac114-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac114-badge",
                type: "badge",
                text: "CUSTOMS LAW NO. 4458 · DİİB INWARD PROCESSING REGIME · 0% VAT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac114-title",
                type: "heading",
                level: 2,
                text: "Duty-Free Superyacht Equipment Import & Inward Processing (DİİB)",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac114-subtitle",
                type: "text",
                text: "Structuring VAT and customs duty zero-rated import regimes for propulsion, generators, navigation suites, and tenders during yacht refits in Turkish shipyards.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 12-Column Tabular Matrix Card */
          {
            id: "prac114-table-card",
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
                id: "prac114-tbl-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Table Header Row */
                  {
                    id: "prac114-th-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac114-th-1", type: "text", text: "EQUIPMENT CATEGORY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac114-th-2", type: "text", text: "STANDARD DUTY & VAT", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac114-th-3", type: "text", text: "DİİB SUSPENSION STATUS", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac114-th-4", type: "text", text: "COLLATERAL BOND", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac114-div-1", type: "divider", style: { sizing: { width: "full" } } },

                  /* Row 1 */
                  {
                    id: "prac114-r1-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac114-r1-c1", type: "text", text: "Main Engines & Gensets (CAT / MTU)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac114-r1-c2", type: "text", text: "Customs 2.7% + 20% VAT", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac114-r1-c3", type: "text", text: "100% Tax Suspended (DİİB)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac114-r1-c4", type: "text", text: "Bank Letter of Guarantee (10%)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 2 */
                  {
                    id: "prac114-r2-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac114-r2-c1", type: "text", text: "Simrad / Furuno Nav Suites", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac114-r2-c2", type: "text", text: "Customs 3.5% + 20% VAT", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac114-r2-c3", type: "text", text: "100% Tax Suspended (DİİB)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac114-r2-c4", type: "text", text: "Customs Collateral Bond", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 3 */
                  {
                    id: "prac114-r3-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac114-r3-c1", type: "text", text: "Teak Decking & Specialist Timbers", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac114-r3-c2", type: "text", text: "Customs 4.0% + 20% VAT", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac114-r3-c3", type: "text", text: "Export-Processing Exemption", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac114-r3-c4", type: "text", text: "Bonded Warehouse Escrow", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Bar */
          {
            id: "prac114-footer-card",
            type: "card",
            element: "div",
            style: {
              color: { background: "surface" },
              border: { width: "hairline", radius: "md", color: "border" },
              spacing: { padding: "md" },
              sizing: { width: "full" },
            },
            children: [
              {
                id: "prac114-foot-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac114-foot-txt", type: "text", text: "Misallocation of refit materials without DİİB closure triggers 3x customs penalties under Law No. 5607.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac114-btn-diib", type: "button", label: "Apply for Inward Processing DİİB License", },
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
 * PRACTICE-115: Sea Trials & Protocol · Acceptance Monograph & Handover Protocol
 * Layout Archetype: Editorial Maritime Acceptance Protocol Monograph with Inset Pull-Quote
 */
export const PRACTICE_115_SEA_TRIALS_ACCEPTANCE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-115-yacht-sea-trials-acceptance-protocol",
  name: "Yacht Handover Protocol · Sea Trials Acceptance & Lien Waiver Execution",
  kind: "section",
  root: {
    id: "prac115-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac115-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: { sizing: { width: "full", maxWidth: "4xl", align: "center" } },
        children: [
          /* Monograph Header */
          {
            id: "prac115-badge",
            type: "badge",
            text: "CLOSING & HANDOVER PROTOCOL · AEGEAN SEA TRIALS · TTK ART. 1007",
            style: {
              color: { background: "surface-muted", text: "primary" },
              border: { radius: "sm" },
              spacing: { paddingX: "sm", paddingY: "xs" },
            },
          },
          {
            id: "prac115-heading",
            type: "heading",
            level: 2,
            text: "Protocol of Delivery and Acceptance: Legal Irrevocability",
            style: {
              typography: { size: "4xl", weight: "bold", tracking: "tight", align: "center" },
              color: { text: "text" },
            },
          },
          {
            id: "prac115-lead",
            type: "text",
            text: "Signing the Protocol of Delivery and Acceptance transfers risk of loss and title from the shipyard to the buyer. Once executed without reservation, patent defect claims are extinguished under Turkish Commercial Code and English maritime law.",
            style: {
              typography: { size: "lg", align: "center" },
              color: { text: "text-muted" },
            },
          },

          { id: "prac115-divider", type: "divider", style: { sizing: { width: "full" } } },

          /* Inset Pull Quote from Lead Maritime Partner */
          {
            id: "prac115-quote",
            type: "quote",
            quote: "Never permit the vessel master or representative to countersign the acceptance protocol until all subcontractor mechanic lien waivers are in hand and the final punch-list retention escrow is deposited.",
            author: "Adv. Murat Çelebi, Senior Partner",
            role: "Maritime Practice Group",
          },

          /* Monograph Safeguard Card */
          {
            id: "prac115-monograph-card",
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
                id: "prac115-mono-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  { id: "prac115-mono-title", type: "heading", level: 3, text: "The 4 Indispensable Handover Conditions Precedent", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                  { id: "prac115-cond-1", type: "text", text: "1. Builder's Certificate & Absolute Lien Waiver: Verification that no subcontractors, engine suppliers, or paint specialists hold unrecorded maritime liens.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac115-cond-2", type: "text", text: "2. Classification Clean Certificate: Issuance of clean unrestricted Class Certificate (Bureau Veritas, RINA, or Lloyd's Register) and Flag Safety Certificate.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac115-cond-3", type: "text", text: "3. Warranty Punch-List Escrow Agreement: Retention of 3% to 5% of contract value in independent bank escrow to secure rectification of 12-month latent guarantee items.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac115-cond-4", type: "text", text: "4. Official Turkish Flag Deletion or Provisional Registration: Seamless transition ensuring zero gaps in hull insurance cover and coastal navigation permissions.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac115-mono-div", type: "divider", style: { sizing: { width: "full" } } },
                  {
                    id: "prac115-cta-stack",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: { sizing: { width: "full" } },
                    children: [
                      { id: "prac115-btn-closing", type: "button", label: "Retain Sea Trial Handover Counsel", },
                      { id: "prac115-btn-checklist", type: "button", label: "Download Delivery Protocol Checklist", },
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

export const PRACTICE_LIBRARY_BATCH_23: ComponentDocument[] = [
  PRACTICE_111_YACHT_BUILD_CONTRACT_DOCUMENT,
  PRACTICE_112_SHIPYARD_LIEN_DEFENSE_DOCUMENT,
  PRACTICE_113_NAVAL_WARRANTY_DEFECT_DOCUMENT,
  PRACTICE_114_YACHT_CUSTOMS_BOND_DOCUMENT,
  PRACTICE_115_SEA_TRIALS_ACCEPTANCE_DOCUMENT,
];
