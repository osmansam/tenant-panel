import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 25: Environmental & Coastal Ecology (#121–#125)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 121: Asymmetric 8/4 Posidonia Oceanica Sanctuary Anchorage Ban & Penalty Blueprint
 * 122: Dual Comparative Split Screen (6/6: Turtle Nesting Law vs Resort Night Permits)
 * 123: 3-Tier Special Environmental Protection Area (ÖÇK) Degree Stepper Rail
 * 124: Tabular Desalination Marine Intake & Brine Discharge Matrix (12-Col Table)
 * 125: Editorial Ancient Sunken Port Ruins & Archaeology Monograph with Pull-Quote
 * ============================================================================
 */

/**
 * PRACTICE-121: Coastal Ecology · Posidonia Oceanica Seagrass Sanctuary Defense
 * Layout Archetype: Asymmetric 8/4 Posidonia Oceanica Sanctuary Anchorage Ban & Penalty Blueprint
 */
export const PRACTICE_121_SEAGRASS_DEFENSE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-121-posidonia-oceanica-seagrass-anchor-defense",
  name: "Environmental Law · Posidonia Oceanica Seagrass Anchor Damage Defense & Fines",
  kind: "section",
  root: {
    id: "prac121-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac121-container",
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
            id: "prac121-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac121-badge",
                type: "badge",
                text: "ENVIRONMENT LAW NO. 2872 · BARCELONA CONVENTION · ÇEVRE CEZASI",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac121-title",
                type: "heading",
                level: 2,
                text: "Posidonia Oceanica Meadows & Superyacht Anchor Damage Defense",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac121-subtitle",
                type: "text",
                text: "Defending mega yachts and charter captains against catastrophic environmental administrative fines (Çevre Cezası) and criminal prosecutions brought by Ministry of Environment and Coast Guard patrol boats in Göcek, Gökova, and Kaş marine reserves.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Grid */
          {
            id: "prac121-asymm-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* 8 cols: Statutory Defense Dossier */
              {
                id: "prac121-dossier-card",
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
                    id: "prac121-dos-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac121-dos-b", type: "badge", text: "STATUTORY DEFENSE DOSSIER · ÇEVRE KANUNU ART. 20", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac121-dos-h", type: "heading", level: 3, text: "Challenging Acoustic Sonar Evidence & Ministry Sampling Protocols", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac121-dos-d", type: "text", text: "Under 2024 revisions to Environmental Law No. 2872, anchor dragging through protected seagrass beds carries base administrative fines starting at 2,500,000 TRY, with mandatory referral to the Public Prosecutor for marine habitat destruction under TCK Art. 181.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac121-dos-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac121-dp-1", type: "text", text: "• AIS & ECDIS Mapping: Cross-referencing electronic logs against charts showing unmarked conservation boundaries.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac121-dp-2", type: "text", text: "• Marine Biologist Survey: Deploying commercial divers to prove pre-existing meadow degradation or sand-pocket anchoring.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac121-dp-3", type: "text", text: "• Administrative Fine Annulment: Filing emergency lawsuit in İdare Mahkemesi within 30 days to halt vessel detention.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* 4 cols: Emergency Marine Desk */
              {
                id: "prac121-side-card",
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
                    id: "prac121-side-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac121-sb-1", type: "badge", text: "24/7 MARINE RESPONSE", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac121-st-1", type: "heading", level: 4, text: "Coast Guard Citation Defense", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac121-sd-1", type: "text", text: "Our maritime environmental lawyers respond on-scene within 2 hours across Bodrum, Marmaris, and Göcek to prevent vessel seizure and captain passport confiscation.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac121-side-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac121-btn-defense", type: "button", label: "Retain Marine Environmental Counsel", },
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
 * PRACTICE-122: Coastal Fauna · Caretta Caretta Turtle Nesting Beach Regulations
 * Layout Archetype: Dual Comparative Split Screen (6/6: Turtle Nesting Law vs Resort Night Permits)
 */
export const PRACTICE_122_TURTLE_NESTING_BEACH_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-122-caretta-caretta-turtle-nesting-beach-permit",
  name: "Environmental Compliance · Caretta Caretta Nesting Beach Hotel Lighting & Acoustic Permits",
  kind: "section",
  root: {
    id: "prac122-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac122-container",
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
            id: "prac122-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac122-badge",
                type: "badge",
                text: "DKMP CIRCULAR · CARETTA CARETTA NESTING SANCTUARIES · NIGHT CURFEWS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac122-title",
                type: "heading",
                level: 2,
                text: "Loggerhead Sea Turtle Nesting Beaches: Resort Operational Permits",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac122-subtitle",
                type: "text",
                text: "Luxury beachfront resorts in İztuzu (Dalyan), Patara, Belek, and Çıralı must balance high-end guest beach club experiences with stringent national nesting sanctuary rules enforced from May to October.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual 6/6 Split Grid */
          {
            id: "prac122-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Sanctuary Mandates */
              {
                id: "prac122-left-card",
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
                    id: "prac122-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac122-l-b", type: "badge", text: "STATUTORY SANCTIONS · DKMP CURFEWS", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac122-l-t", type: "heading", level: 3, text: "Mandatory Beach Restrictions (20:00 – 08:00)", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac122-l-d", type: "text", text: "Under Ministry Circular No. 2020/1, beaches designated as primary Caretta caretta nesting grounds impose absolute nighttime public exclusion and strict lighting curfews.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac122-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac122-lp-1", type: "text", text: "• Zero artificial white lighting within 200m of high-water mark.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac122-lp-2", type: "text", text: "• Prohibition of sun loungers, cabanas, and beach umbrellas overnight.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac122-lp-3", type: "text", text: "• Immediate hotel closure orders for lighting disorienting hatchlings.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Resort Compliance Protocol */
              {
                id: "prac122-right-card",
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
                    id: "prac122-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac122-r-b", type: "badge", text: "HOSPITALITY COMPLIANCE PROTOCOL", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac122-r-t", type: "heading", level: 3, text: "Licensed Luxury Hospitality Operations", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac122-r-d", type: "text", text: "We negotiate bespoke operational permits with General Directorate of Nature Conservation (DKMP) enabling 5-star resort guest operations without risking environmental fines.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac122-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac122-rp-1", type: "text", text: "✓ Certified red-spectrum wavelength lighting plans approved by DKMP.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac122-rp-2", type: "text", text: "✓ Demountable timber boardwalk corridors protecting sand dunes.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac122-btn-permit", type: "button", label: "Apply for Turtle Beach Operational Permit", },
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
 * PRACTICE-123: Special Environmental Protection (ÖÇK) · 3-Tier Zoning Stepper Rail
 * Layout Archetype: 3-Tier Special Environmental Protection Area (ÖÇK) Degree Stepper Rail
 */
export const PRACTICE_123_OCK_ZONING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-123-special-environmental-protection-ock-zoning",
  name: "Zoning & Environmental Law · Special Environmental Protection Area (ÖÇK) Degrees",
  kind: "section",
  root: {
    id: "prac123-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac123-container",
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
            id: "prac123-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac123-badge",
                type: "badge",
                text: "ÖÇK AGENCY · NATURAL SİT DEGREES · TCK ART. 184 ZONING FRAUD",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac123-title",
                type: "heading",
                level: 2,
                text: "ÖÇK Conservation Degree Classifications & Permitted Construction",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac123-subtitle",
                type: "text",
                text: "Coastal regions such as Datça-Bozburun, Fethiye-Göcek, Köyceğiz-Dalyan, and Gökova operate under specialized Ministry master plans superseding municipal zoning laws.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 3-Tier Horizontal Stepper Rail */
          {
            id: "prac123-rail-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Tier 1 */
              {
                id: "prac123-t1-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac123-t1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac123-t1-b", type: "badge", text: "TIER 01 · 1. DERECE DOĞAL SİT", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac123-t1-h", type: "heading", level: 4, text: "Strict Nature Reserve", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac123-t1-d", type: "text", text: "Absolute construction ban. Only scientific surveys and traditional apiculture allowed. No foundations or road expansion permitted.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Tier 2 */
              {
                id: "prac123-t2-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac123-t2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac123-t2-b", type: "badge", text: "TIER 02 · 2. DERECE DOĞAL SİT", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac123-t2-h", type: "heading", level: 4, text: "Qualified Natural Protection", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac123-t2-d", type: "text", text: "High-end eco-tourism and low-density boutique resorts permitted. Maximum 15% floor-to-area ratio (EMSAL 0.15) with natural stone.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Tier 3 */
              {
                id: "prac123-t3-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "lg" },
                },
                children: [
                  {
                    id: "prac123-t3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac123-t3-b", type: "badge", text: "TIER 03 · 3. DERECE DOĞAL SİT", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac123-t3-h", type: "heading", level: 4, text: "Sustainable Conservation", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac123-t3-d", type: "text", text: "Residential villas, boutique hotels, and agricultural estate development permitted subject to Ministry Regional Commission approval.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac123-footer-card",
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
                id: "prac123-footer-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac123-f-text", type: "text", text: "Evaluate parcel eligibility for luxury villa or boutique resort development under ÖÇK master plans.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac123-btn-ock", type: "button", label: "Order ÖÇK Parcel Due Diligence Audit", },
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
 * PRACTICE-124: Marine Utilities · Private Desalination Plant & Brine Discharge Matrix
 * Layout Archetype: Tabular Desalination Marine Intake & Brine Discharge Matrix (12-Col Table)
 */
export const PRACTICE_124_DESALINATION_PERMIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-124-private-desalination-plant-marine-intake",
  name: "Environmental Law · Luxury Resort Seawater Desalination Plant & Brine Discharge Permits",
  kind: "section",
  root: {
    id: "prac124-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac124-container",
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
            id: "prac124-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac124-badge",
                type: "badge",
                text: "WATER POLLUTION CONTROL (SKKY) · EIA EXEMPTION · DERİN DENİZ DEŞARJI",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac124-title",
                type: "heading",
                level: 2,
                text: "Private Seawater Desalination Plants & Marine Brine Discharge",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac124-subtitle",
                type: "text",
                text: "With municipal freshwater scarcity across Bodrum, Çeşme, and Mediterranean islands, luxury 5-star resorts rely on private reverse osmosis desalination plants requiring multi-agency marine permits.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 12-Column Tabular Matrix Card */
          {
            id: "prac124-table-card",
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
                id: "prac124-tbl-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Table Header */
                  {
                    id: "prac124-th-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac124-th-1", type: "text", text: "APPROVAL / PERMIT", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac124-th-2", type: "text", text: "COMPETENT AGENCY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac124-th-3", type: "text", text: "STANDARD / REGULATION", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac124-th-4", type: "text", text: "PERMIT DURATION", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac124-div-1", type: "divider", style: { sizing: { width: "full" } } },

                  /* Row 1 */
                  {
                    id: "prac124-r1-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac124-r1-c1", type: "text", text: "Subsea Marine Intake Pipe", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac124-r1-c2", type: "text", text: "Ministry of Transport (UAB)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac124-r1-c3", type: "text", text: "Seabed right of easement concession", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac124-r1-c4", type: "text", text: "29-Year Renewable Lease", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 2 */
                  {
                    id: "prac124-r2-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac124-r2-c1", type: "text", text: "EIA Environmental Clearance", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac124-r2-c2", type: "text", text: "Ministry of Environment (ÇŞİDB)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac124-r2-c3", type: "text", text: "ÇED Gerekli Değildir Decision", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac124-r2-c4", type: "text", text: "Project Lifetime Validity", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 3 */
                  {
                    id: "prac124-r3-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac124-r3-c1", type: "text", text: "Deep Sea Brine Discharge", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac124-r3-c2", type: "text", text: "Provincial Environment Directorate", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac124-r3-c3", type: "text", text: "Diffuser nozzle salinity < 42 PSU", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac124-r3-c4", type: "text", text: "5-Year Renewable License", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac124-footer-card",
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
                id: "prac124-footer-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac124-note", type: "text", text: "Unlicensed brine discharge into protected bays triggers statutory environmental fines under Coastal Law No. 3621.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac124-btn-desal", type: "button", label: "License Resort Desalination Infrastructure", },
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
 * PRACTICE-125: Marine Archaeology · Sunken Ancient Ruins & Anchorage Clearance
 * Layout Archetype: Editorial Ancient Sunken Port Ruins & Archaeology Monograph with Pull-Quote
 */
export const PRACTICE_125_MARINE_ARCHAEOLOGY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-125-marine-archeology-anchorage-zone-clearance",
  name: "Cultural Heritage & Marine Law · Ancient Sunken Port Ruins & Archaeological Clearance",
  kind: "section",
  root: {
    id: "prac125-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac125-container",
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
            id: "prac125-badge",
            type: "badge",
            text: "LAW NO. 2863 · CULTURAL HERITAGE · UNDERWATER ARCHAEOLOGY CLEARANCE",
            style: {
              color: { background: "surface-muted", text: "primary" },
              border: { radius: "sm" },
              spacing: { paddingX: "sm", paddingY: "xs" },
            },
          },
          {
            id: "prac125-heading",
            type: "heading",
            level: 2,
            text: "Submerged Ancient Ports, Lycian Ruins & Marine Clearance",
            style: {
              typography: { size: "4xl", weight: "bold", tracking: "tight", align: "center" },
              color: { text: "text" },
            },
          },
          {
            id: "prac125-lead",
            type: "text",
            text: "Coastal Turkey boasts unmatched underwater cultural heritage, from submerged Lycian sarcophagi in Kekova to ancient Carian breakwaters in Knidos. We navigate Ministry archaeological board clearance for private docks, mooring buoys, and marina concessions.",
            style: {
              typography: { size: "lg", align: "center" },
              color: { text: "text-muted" },
            },
          },

          { id: "prac125-divider", type: "divider", style: { sizing: { width: "full" } } },

          /* Inset Pull Quote */
          {
            id: "prac125-quote",
            type: "quote",
            quote: "Deploying a concrete anchor block or seabed mooring in an unverified archaeological zone risks immediate criminal seizure of the yacht and felony charges under Law No. 2863.",
            author: "Adv. Selin Bayraktar, Of Counsel",
            role: "Cultural Heritage & Coastal Property Group",
          },

          /* Monograph Safeguard Card */
          {
            id: "prac125-monograph-card",
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
                id: "prac125-mono-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  { id: "prac125-mono-title", type: "heading", level: 3, text: "The 3 Stages of Subsea Archaeological Clearance", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                  { id: "prac125-st-1", type: "text", text: "1. Museum Directorate Sonar Survey: Collaboration with Bodrum Museum of Underwater Archaeology to map all seabed anomalies and ancient amphora deposits.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac125-st-2", type: "text", text: "2. Regional Conservation Board Decision: Formal petition establishing that proposed floating docks or swimming platforms do not touch submerged antiquities.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac125-st-3", type: "text", text: "3. Scientific Underwater Archaeologist Supervision: On-site supervision during eco-friendly helical screw anchor installations ensuring zero heritage impact.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                  { id: "prac125-mono-div", type: "divider", style: { sizing: { width: "full" } } },
                  {
                    id: "prac125-cta-stack",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "between",
                    wrap: true,
                    gap: "md",
                    style: { sizing: { width: "full" } },
                    children: [
                      { id: "prac125-btn-clearance", type: "button", label: "Petition Cultural Heritage Board", },
                      { id: "prac125-btn-audit", type: "button", label: "Review Marine Archaeological Map", },
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

export const PRACTICE_LIBRARY_BATCH_25: ComponentDocument[] = [
  PRACTICE_121_SEAGRASS_DEFENSE_DOCUMENT,
  PRACTICE_122_TURTLE_NESTING_BEACH_DOCUMENT,
  PRACTICE_123_OCK_ZONING_DOCUMENT,
  PRACTICE_124_DESALINATION_PERMIT_DOCUMENT,
  PRACTICE_125_MARINE_ARCHAEOLOGY_DOCUMENT,
];
