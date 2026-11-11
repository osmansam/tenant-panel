import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 21: Coastal Aviation & Seaplanes (#101–#105)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 101: Asymmetric 70/30 Waterdrome Marine Aerodrome Blueprint (8/4: SHT-DENİZ)
 * 102: High-Density Side-by-Side Dual Split Screen (6/6: Heli-Skiing Concessions)
 * 103: 4-Stage Panoramic Flight Stepper Rail (Coastal Balloon Operations)
 * 104: Solemn Military Security Monograph with Pull-Quote (Island Helipad)
 * 105: Full-Bleed 24/7 International Medevac Command Bar (Air Ambulance Escrow)
 * ============================================================================
 */

/**
 * PRACTICE-101: Civil Aviation · Coastal Seaplane Waterdrome (Deniz Havalimanı) Concession
 * Layout Archetype: Asymmetric 70/30 Waterdrome Marine Aerodrome Blueprint (8/4)
 */
export const PRACTICE_101_SEAPLANE_WATERDROME_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-101-seaplane-coastal-waterdrome-concession",
  name: "Civil Aviation · Coastal Seaplane Waterdrome (Deniz Havalimanı) Concession",
  kind: "section",
  root: {
    id: "prac101-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac101-container",
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
            id: "prac101-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac101-badge",
                type: "badge",
                text: "SHGM SHT-DENİZ REGULATION · MARINE WATERDROME OPERATING CERTIFICATE",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac101-heading",
                type: "heading",
                level: 2,
                text: "Seaplane Marine Aerodrome (Waterdrome) Concession Licensing",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac101-sub",
                type: "text",
                text: "Authorizing designated water landing corridors in Bodrum, Göcek, and Kaş bays for amphibious seaplane transfers connecting luxury resorts to Greek islands and private mega-yachts.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8 / 4 Grid */
          {
            id: "prac101-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (8 cols): Waterdrome Legal Dossier */
              {
                id: "prac101-main-dossier",
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
                    id: "prac101-md-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      {
                        id: "prac101-md-b",
                        type: "badge",
                        text: "STATUTORY WATERDROME PIPELINE · SHGM SHT-DENİZ",
                        style: { color: { background: "surface-muted", text: "text" } },
                      },
                      {
                        id: "prac101-md-t",
                        type: "heading",
                        level: 3,
                        text: "Marine Air Corridor & Harbor Safety Certification",
                        style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } },
                      },
                      {
                        id: "prac101-md-d",
                        type: "text",
                        text: "Operating commercial amphibious aircraft (Cessna Caravan / DHC-6 Twin Otter) in coastal waters requires dual authorization: SHGM Waterdrome Operating Certificate and Ministry of Transport Port Authority marine space allocation.",
                        style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                      },
                      {
                        id: "prac101-step-1",
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
                            id: "prac101-s1-t",
                            type: "heading",
                            level: 4,
                            text: "1. Marine Runways & Navigation Buoy Allocation",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac101-s1-p",
                            type: "text",
                            text: "Surveying bathymetric water depths, clear takeoff approach corridors, and anchoring solar-powered perimeter marine safety buoys separating aircraft from yacht traffic.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                      {
                        id: "prac101-step-2",
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
                            id: "prac101-s2-t",
                            type: "heading",
                            level: 4,
                            text: "2. Temporary Border Customs Sea-Crossing Status",
                            style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac101-s2-p",
                            type: "text",
                            text: "Designating the waterdrome dock as a temporary international border gate (Geçici Hudut Kapısı) enabling direct flights to Mykonos, Santorini, and Rhodes.",
                            style: { typography: { size: "sm" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              /* Right (4 cols): Concession Desk */
              {
                id: "prac101-side-col",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                layout: { span: { mobile: 12, tablet: 12, desktop: 4 } },
                children: [
                  {
                    id: "prac101-side-card",
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
                        id: "prac101-sc-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac101-sc-b",
                            type: "badge",
                            text: "WATERDROME CONCESSION DESK",
                            style: { color: { background: "primary", text: "background" } },
                          },
                          {
                            id: "prac101-sc-t",
                            type: "heading",
                            level: 4,
                            text: "Marine Aviation Docket",
                            style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } },
                          },
                          {
                            id: "prac101-sc-item1",
                            type: "text",
                            text: "✓ Coast Guard & Harbor Master Clearance",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac101-sc-item2",
                            type: "text",
                            text: "✓ Environmental Sound Impact Waiver",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac101-sc-item3",
                            type: "text",
                            text: "✓ Fuel Barging & Jet-A1 Spill Plan",
                            style: { typography: { size: "sm" }, color: { text: "text" } },
                          },
                          {
                            id: "prac101-sc-divider",
                            type: "divider",
                            style: { sizing: { width: "full" } },
                          },
                          {
                            id: "prac101-btn-waterdrome",
                            type: "button",
                            label: "File Waterdrome Operating Permit",
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
 * PRACTICE-102: Alpine Tourism · Kaçkar & Taurus Coastal Heli-Skiing Concession
 * Layout Archetype: High-Density Side-by-Side Dual Split Screen (6/6)
 */
export const PRACTICE_102_HELI_SKIING_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-102-heli-skiing-kaackar-coastal-alps-permit",
  name: "Alpine Tourism · Kaçkar & Taurus Coastal Heli-Skiing Concession",
  kind: "section",
  root: {
    id: "prac102-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac102-container",
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
            id: "prac102-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac102-badge",
                type: "badge",
                text: "FORESTRY LAW NO. 6831 · NATIONAL PARKS · HELI-SKIING OPERATING CONCESSION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac102-heading",
                type: "heading",
                level: 2,
                text: "Alpine Heli-Skiing Operating Permits & Wilderness Tort Shield",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac102-sub",
                type: "text",
                text: "Securing multi-year government forestry concessions for commercial helicopter skiing operations in the coastal alpine peaks of Kaçkar and Antalya-Saklıkent, emergency search and rescue protocols, and liability waivers.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Side-by-Side Dual Split Screen (6 / 6) */
          {
            id: "prac102-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Forestry Concession */
              {
                id: "prac102-left-col",
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
                    id: "prac102-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac102-left-b", type: "badge", text: "TRACK A · STATE FORESTRY ALLOCATION", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac102-left-t", type: "heading", level: 3, text: "National Park Land Concession", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac102-left-d", type: "text", text: "Under National Parks Law No. 2873, operating commercial ski drop zones requires Long-Term Development Plan (UDGP) compliance, seasonal corridor leasing, and wildlife preservation bonds.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac102-left-divider", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac102-lp-1", type: "text", text: "• SHGM Drop-Zone Certification: Authorizing off-airport mountain ridge helicopter landings above 2,500 meters.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac102-left-btn", type: "button", label: "Apply for Forestry Concession", },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Avalanche & SAR Protocol */
              {
                id: "prac102-right-col",
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
                    id: "prac102-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac102-right-b", type: "badge", text: "TRACK B · EMERGENCY SEARCH & RESCUE", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac102-right-t", type: "heading", level: 3, text: "Avalanche Liability & Rescue Protocol", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac102-right-d", type: "text", text: "Mandatory AFAD search-and-rescue coordination agreements, dedicated evacuation air ambulance insurance, and international high-risk sport waivers conforming to TBK Art. 115.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac102-right-divider", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac102-rp-1", type: "text", text: "• Multilingual Assumption of Risk: Binding foreign high-net-worth guests to specialized international arbitration clauses.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac102-right-btn", type: "button", label: "Draft Heli-Skiing Liability Shield", },
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
 * PRACTICE-103: Hot Air Ballooning · Coastal Thermal Valley Flight Operations Rail
 * Layout Archetype: 4-Stage Panoramic Flight Stepper Rail
 */
export const PRACTICE_103_COASTAL_BALLOON_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-103-luxury-hot-air-balloon-coastal-corridor",
  name: "Hot Air Ballooning · Coastal Thermal Valley Flight Operations Rail",
  kind: "section",
  root: {
    id: "prac103-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac103-container",
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
            id: "prac103-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac103-badge",
                type: "badge",
                text: "SHGM SHT-BALON · THERMAL CANYON FLIGHT CORRIDORS · PAMUKKALE & LYCIAN SLOTS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac103-heading",
                type: "heading",
                level: 2,
                text: "4-Stage Commercial Hot Air Balloon Slot Permitting Rail",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac103-sub",
                type: "text",
                text: "Licensing commercial hot air balloon tourism operations over Pamukkale travertines and Lycian coastal valleys under strict SHGM commercial air transport regulations.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Horizontal Rail */
          {
            id: "prac103-rail",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Stage 1 */
              {
                id: "prac103-stage-1",
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
                    id: "prac103-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac103-s1-b", type: "badge", text: "STAGE 01 · SLOT QUOTA", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac103-s1-t", type: "heading", level: 3, text: "SHGM Airspace Quota", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac103-s1-d", type: "text", text: "Securing official morning flight slots from Directorate General of Civil Aviation balloon slot coordinator.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 2 */
              {
                id: "prac103-stage-2",
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
                    id: "prac103-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac103-s2-b", type: "badge", text: "STAGE 02 · LAUNCH BASE", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac103-s2-t", type: "heading", level: 3, text: "Takeoff Field Ground Lease", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac103-s2-d", type: "text", text: "Acquiring authorized launch field easement rights and emergency landing field indemnification agreements.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 3 */
              {
                id: "prac103-stage-3",
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
                    id: "prac103-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac103-s3-b", type: "badge", text: "STAGE 03 · INSURANCE", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac103-s3-t", type: "heading", level: 3, text: "Warsaw / Montreal Policy", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac103-s3-d", type: "text", text: "Mandatory international passenger liability insurance with €500,000 SDR coverage per passenger basket seat.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              /* Stage 4 */
              {
                id: "prac103-stage-4",
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
                    id: "prac103-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac103-s4-b", type: "badge", text: "STAGE 04 · AIR OPERATOR", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac103-s4-t", type: "heading", level: 3, text: "AOC Commercial License", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac103-s4-d", type: "text", text: "Issuance of final Air Operator Certificate (AOC) authorizing year-round VIP sunrise flights.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac103-footer-card",
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
                id: "prac103-fc-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac103-fc-text", type: "text", text: "Launch commercial hot air balloon operations with certified aviation regulatory compliance.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac103-btn-slot", type: "button", label: "File SHGM Balloon Slot Application", },
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
 * PRACTICE-104: National Security · Private Island Helipad Military Zone Clearance
 * Layout Archetype: Solemn Military Security Monograph with Inset Pull-Quote
 */
export const PRACTICE_104_MILITARY_HELIPAD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-104-private-island-helipad-military-clearance",
  name: "National Security · Private Island Helipad Military Zone Clearance",
  kind: "section",
  root: {
    id: "prac104-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac104-container",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "xl",
        style: {
          sizing: { width: "full", maxWidth: "4xl", align: "center" },
        },
        children: [
          /* Centered Monograph Column */
          {
            id: "prac104-header",
            type: "stack",
            direction: "column",
            alignment: "center",
            distribution: "start",
            wrap: false,
            gap: "sm",
            style: { typography: { align: "center" }, sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac104-badge",
                type: "badge",
                text: "MILITARY FORBIDDEN ZONES LAW NO. 2565 · GENERAL STAFF CLEARANCE · ISLAND HELIPAD",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac104-heading",
                type: "heading",
                level: 2,
                text: "Private Island Helipad Construction & Border Flight Clearance",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac104-sub",
                type: "text",
                text: "Securing Turkish General Staff (Genelkurmay Başkanlığı) security vetting and civil aviation construction permits for private helicopter landing pads on Aegean border islands.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          { id: "prac104-divider-top", type: "divider", style: { sizing: { width: "full" } } },

          /* Solemn Monograph Body */
          {
            id: "prac104-monograph-card",
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
                id: "prac104-mono-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "lg",
                children: [
                  {
                    id: "prac104-prose-1",
                    type: "text",
                    text: "Under Military Forbidden Zones and Security Zones Law No. 2565, coastal islands located adjacent to international maritime boundary lines fall under 1st or 2nd Degree Military Security Zones. Foreign property owners or luxury resort developers seeking to construct private helipads must obtain formal favorable clearance from the Ministry of National Defense, Naval Forces Command, and SHGM prior to commencing any earthwork.",
                    style: { typography: { size: "base" }, color: { text: "text" } },
                  },

                  /* Inset Pull-Quote Box */
                  {
                    id: "prac104-pullquote-box",
                    type: "card",
                    element: "div",
                    style: {
                      color: { background: "surface-muted" },
                      border: { width: "hairline", radius: "sm", color: "border" },
                      spacing: { padding: "xl" },
                      sizing: { width: "full" },
                    },
                    children: [
                      {
                        id: "prac104-pq-stack",
                        type: "stack",
                        direction: "column",
                        alignment: "start",
                        distribution: "start",
                        wrap: false,
                        gap: "sm",
                        children: [
                          {
                            id: "prac104-pq-text",
                            type: "text",
                            text: "“Navigating coastal military security clearances requires meticulous institutional coordination. Complete transparency in flight corridor manifests and sovereign defense vetting ensures seamless executive helicopter access without border radar interception.”",
                            style: { typography: { size: "lg", weight: "medium" }, color: { text: "text" } },
                          },
                          {
                            id: "prac104-pq-author",
                            type: "text",
                            text: "— National Defense & Admiralty Counsel · Ankara & Mediterranean Chambers",
                            style: { typography: { size: "sm", weight: "bold" }, color: { text: "text-muted" } },
                          },
                        ],
                      },
                    ],
                  },

                  {
                    id: "prac104-prose-2",
                    type: "text",
                    text: "Chambers orchestrates the complete statutory review: (1) Filing detailed geodetic landing pad coordinates with Turkish Naval Command (Deniz Kuvvetleri); (2) Vetting international flight paths against international maritime border agreements; (3) Securing SHGM Heliport Construction and Operating Clearance (SHT-HES) with dedicated radar beacon squawk codes.",
                    style: { typography: { size: "base" }, color: { text: "text" } },
                  },

                  {
                    id: "prac104-actions",
                    type: "stack",
                    direction: "row",
                    alignment: "center",
                    distribution: "center",
                    wrap: true,
                    gap: "md",
                    style: { sizing: { width: "full" } },
                    children: [
                      { id: "prac104-btn-defense", type: "button", label: "Initiate Military Security Clearance", },
                      { id: "prac104-btn-hes", type: "button", label: "Download SHT-HES Island Guidelines", },
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
 * PRACTICE-105: Emergency Health · Cross-Border Air Ambulance Medevac Escrow Desk
 * Layout Archetype: Full-Bleed 24/7 International Medevac Command Bar
 */
export const PRACTICE_105_MEDEVAC_ESCROW_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-105-air-ambulance-crossborder-medevac-escrow",
  name: "Emergency Health · Cross-Border Air Ambulance Medevac Escrow Desk",
  kind: "section",
  root: {
    id: "prac105-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac105-container",
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
          /* Top Alert Bar */
          {
            id: "prac105-alert-bar",
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
                id: "prac105-alert-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  {
                    id: "prac105-alert-info",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac105-alert-b", type: "badge", text: "24/7 CRITICAL FLIGHT DESK · IMMEDIATE DISPATCH", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac105-alert-t", type: "text", text: "Emergency air ambulance flight clearance granted within 90 minutes to Zurich, Munich, London, or Dubai.", style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac105-alert-btn", type: "button", label: "Call 24/7 Emergency Medevac Hotline", },
                ],
              },
            ],
          },

          /* Header */
          {
            id: "prac105-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac105-badge",
                type: "badge",
                text: "HEALTH LAW · CROSS-BORDER REPATRIATION · AIR AMBULANCE ESCROW",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac105-heading",
                type: "heading",
                level: 2,
                text: "International Air Ambulance Repatriation & Customs Clearance",
                style: {
                  typography: { size: "4xl", weight: "bold", tracking: "tight" },
                  color: { text: "text" },
                },
              },
              {
                id: "prac105-sub",
                type: "text",
                text: "Urgent legal coordination for medically unstable yacht owners, resort guests, and expatriates requiring intensive care air transport, consular authorizations, and hospital escrows.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 3-Track Grid */
          {
            id: "prac105-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              {
                id: "prac105-c1",
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
                    id: "prac105-c1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac105-c1-b", type: "badge", text: "FLIGHT CLEARANCE", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac105-c1-t", type: "heading", level: 3, text: "SHGM & Diplomatic Airway", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac105-c1-d", type: "text", text: "Urgent diplomatic overflight authorizations and airport tarmac ambulance access at Dalaman and Bodrum.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              {
                id: "prac105-c2",
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
                    id: "prac105-c2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac105-c2-b", type: "badge", text: "BORDER CONTROL", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac105-c2-t", type: "heading", level: 3, text: "Bedside Passport Clearance", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac105-c2-d", type: "text", text: "Police border exit stamps completed inside ICU or aircraft cabin for comatose or ventilator-dependent patients.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
              {
                id: "prac105-c3",
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
                    id: "prac105-c3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac105-c3-b", type: "badge", text: "ESCROW FINANCING", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac105-c3-t", type: "heading", level: 3, text: "Foreign Insurer Escrow", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac105-c3-d", type: "text", text: "Securing immediate pre-payment guarantee releases from Allianz, AXA, or Bupa into chambers client escrow.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
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

export const PRACTICE_LIBRARY_BATCH_21: ComponentDocument[] = [
  PRACTICE_101_SEAPLANE_WATERDROME_DOCUMENT,
  PRACTICE_102_HELI_SKIING_DOCUMENT,
  PRACTICE_103_COASTAL_BALLOON_DOCUMENT,
  PRACTICE_104_MILITARY_HELIPAD_DOCUMENT,
  PRACTICE_105_MEDEVAC_ESCROW_DOCUMENT,
];
