import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 27: Luxury Transport & Elite Concierge (#131–#135)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 131: Asymmetric 8/4 Coastal Supercar Rally Governor Permit & Transit Blueprint
 * 132: Dual Comparative Split Screen (6/6: D2 VIP License vs Korsan Impound Defense)
 * 133: 4-Stage Yacht Submersible Deep-Dive Clearance Stepper Rail (4-Card Rail)
 * 134: Parchment High-Jewellery In-Suite Viewing Consignment Workbench (7/5)
 * 135: 4-Quadrant Executive Private Island Sovereign Buyout Charter Matrix (2x2 Grid)
 * ============================================================================
 */

/**
 * PRACTICE-131: Supercar Rallies · Coastal Transit & Governorship Permits
 * Layout Archetype: Asymmetric 8/4 Coastal Supercar Rally Governor Permit & Highway Transit Blueprint
 */
export const PRACTICE_131_SUPERCAR_RALLY_PERMIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-131-international-supercar-rally-coastal-permit",
  name: "Transport & Sports Law · International Supercar Rally Coastal Highway Permits & ATA Carnet",
  kind: "section",
  root: {
    id: "prac131-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac131-container",
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
            id: "prac131-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac131-badge",
                type: "badge",
                text: "HIGHWAY TRAFFIC LAW NO. 2918 · TOSFED MOTORSPORT SANCTION · ATA CARNET",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac131-title",
                type: "heading",
                level: 2,
                text: "International Supercar Coastal Rallies & Highway Transit Permits",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac131-subtitle",
                type: "text",
                text: "Structuring multi-provincial governor permits, police motorcade escorts, temporary customs importation (ATA Carnet), and closed coastal mountain road stages across Muğla, Antalya, and İzmir.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Grid */
          {
            id: "prac131-asymm-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* 8 cols: Operational Regulatory Framework */
              {
                id: "prac131-dossier-card",
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
                    id: "prac131-dos-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac131-dos-b", type: "badge", text: "OPERATIONAL REGULATORY FRAMEWORK · FLEET VALUE €50M+", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac131-dos-h", type: "heading", level: 3, text: "Transit Architecture for 50+ Exotic Hypercars", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac131-dos-d", type: "text", text: "Importing foreign-registered hypercars without correct temporary admission seals triggers automatic customs seizure under Customs Law No. 4458. We coordinate Turkish Automobile Sports Federation (TOSFED) sanctions and ministerial exemptions.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac131-dos-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac131-p1", type: "text", text: "• Temporary Customs Bond (ATA Carnet): Expedited border clearance via Kapıkule or Çeşme with single blanket chamber bond covering fleet.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac131-p2", type: "text", text: "• Governorship Special Route Order: Muğla and Antalya Governor decrees authorizing rolling highway closures and designated high-speed hillclimbs.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac131-p3", type: "text", text: "• Police & Gendarmerie Escort: Official marked motorcycle escorts leading the convoy through congested resort centers.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* 4 cols: Rally Desk */
              {
                id: "prac131-side-card",
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
                    id: "prac131-side-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac131-sb-1", type: "badge", text: "RALLY LEGAL DESK", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac131-st-1", type: "heading", level: 4, text: "Turnkey Multi-Provincial Sanction", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac131-sd-1", type: "text", text: "We act as Turkish counsel for global supercar rallies (Gumball 3000, Challenge 2100), ensuring zero transit impoundments or customs penalties.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac131-side-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac131-btn-rally", type: "button", label: "Retain Supercar Rally Counsel", },
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
 * PRACTICE-132: VIP Limousines · Ministry D2 License vs "Korsan Taksi" Impound Defense
 * Layout Archetype: Dual Comparative Split Screen (6/6: D2 VIP License vs Korsan Impound Defense)
 */
export const PRACTICE_132_D2_VIP_TRANSPORT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-132-luxury-limousine-d2-transport-license",
  name: "Transport Law · Luxury Chauffeur D2 Tourism Passenger Licensing & Korsan Defense",
  kind: "section",
  root: {
    id: "prac132-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac132-container",
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
            id: "prac132-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac132-badge",
                type: "badge",
                text: "ROAD TRANSPORT REGULATION (KTY) · HIGHWAY TRAFFIC LAW ART. EK-2",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac132-title",
                type: "heading",
                level: 2,
                text: "Ministry D2 VIP Chauffeur Licensing vs Korsan Taksi Vehicle Impounds",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac132-subtitle",
                type: "text",
                text: "High-end resort hotel fleets (Mercedes Maybach, V-Class VIP vans, Rolls-Royce Phantoms) in Bodrum and Antalya face aggressive municipal taxi union sting operations resulting in 60-day vehicle impounds under EK-2.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual 6/6 Comparative Grid */
          {
            id: "prac132-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Enforcement Risk & Impound */
              {
                id: "prac132-left-card",
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
                    id: "prac132-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac132-l-b", type: "badge", text: "ENFORCEMENT RISK · ART. EK-2 SANCTIONS", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac132-l-t", type: "heading", level: 3, text: "Immediate 60-Day Vehicle Immobilization", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac132-l-d", type: "text", text: "Traffic police and municipal zabıta routinely classify VIP hotel guest transfers as illegal unlicensed passenger transport (Korsan Taksi) if paperwork lacks electronic U-ETDS registration.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac132-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac132-lp-1", type: "text", text: "• 60 days mandatory vehicle lockup in yediemin police impound lot.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac132-lp-2", type: "text", text: "• Administrative fine applied to driver and vehicle owner.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac132-lp-3", type: "text", text: "• Luxury guests stranded on airport highway with luggage during arrival.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Compliance Defense Protocol */
              {
                id: "prac132-right-card",
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
                    id: "prac132-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac132-r-b", type: "badge", text: "D2 & TÜRSAB COMPLIANCE DEFENSE", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac132-r-t", type: "heading", level: 3, text: "Bulletproof D2 & TÜRSAB Routing", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac132-r-d", type: "text", text: "We structure hotel VIP transport under Ministry of Transport D2 group passenger licenses integrated with Group A TÜRSAB travel agency vouchers, securing instant judicial release of wrongly impounded luxury vans.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac132-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac132-rp-1", type: "text", text: "✓ Real-time electronic U-ETDS manifest lodging prior to vehicle departure.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac132-rp-2", type: "text", text: "✓ Same-day Administrative Court stay of execution (Yürütmeyi Durdurma) order.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac132-btn-d2", type: "button", label: "Release Impounded Luxury Vehicle", },
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
 * PRACTICE-133: Private Submersibles · Deep-Dive Clearance Stepper Rail
 * Layout Archetype: 4-Stage Yacht Submersible Deep-Dive Clearance Stepper Rail (4-Card Rail)
 */
export const PRACTICE_133_SUBMERSIBLE_CLEARANCE_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-133-private-submarine-yacht-tender-clearance",
  name: "Maritime Law · Superyacht Private Submersible (U-Boat Worx / Triton) Deep-Dive Permits",
  kind: "section",
  root: {
    id: "prac133-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac133-container",
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
            id: "prac133-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac133-badge",
                type: "badge",
                text: "NAVAL FORCES COMMAND · UNDERWATER SECURITY ZONES · TCK ART. 334",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac133-title",
                type: "heading",
                level: 2,
                text: "Private Yacht Tourist Submersibles: 4-Stage Underwater Clearance",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac133-subtitle",
                type: "text",
                text: "Superyachts carrying recreational submersibles (Triton, U-Boat Worx, SEAmagine) must navigate strict Turkish military security zones, underwater archaeological sites, and Coast Guard notification protocols before diving.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Stage Stepper Rail Grid */
          {
            id: "prac133-rail-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "md" } },
            children: [
              /* Stage 1 */
              {
                id: "prac133-s1-card",
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
                    id: "prac133-s1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac133-s1-b", type: "badge", text: "STAGE 01 · SECURITY", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac133-s1-h", type: "heading", level: 4, text: "Naval Zone Vetting", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac133-s1-d", type: "text", text: "Naval Forces Command clearance confirming dive coordinates do not intersect restricted military security zones.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Stage 2 */
              {
                id: "prac133-s2-card",
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
                    id: "prac133-s2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac133-s2-b", type: "badge", text: "STAGE 02 · ARCHAEOLOGY", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac133-s2-h", type: "heading", level: 4, text: "Cultural Screening", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac133-s2-d", type: "text", text: "Ministry of Culture archaeology database verification ensuring no unexcavated ancient wrecks lie within 500m of descent vector.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Stage 3 */
              {
                id: "prac133-s3-card",
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
                    id: "prac133-s3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac133-s3-b", type: "badge", text: "STAGE 03 · CLASS", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac133-s3-h", type: "heading", level: 4, text: "Submersible Class", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac133-s3-d", type: "text", text: "Bureau Veritas or DNV sub-surface passenger certification audit with surface support vessel acoustic comms protocol.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Stage 4 */
              {
                id: "prac133-s4-card",
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
                    id: "prac133-s4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac133-s4-b", type: "badge", text: "STAGE 04 · DISPATCH", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac133-s4-h", type: "heading", level: 4, text: "Coast Guard Window", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac133-s4-d", type: "text", text: "Real-time VHF notification to local Coast Guard command center prior to hatch seal and dive crane deployment.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac133-footer-card",
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
                id: "prac133-foot-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac133-foot-txt", type: "text", text: "Ensure fully authorized submarine diving excursions along Aegean and Turquoise Coast drop-offs.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac133-btn-sub", type: "button", label: "Apply for Submersible Dive Corridor", },
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
 * PRACTICE-134: High Jewellery · In-Suite Private Viewing Consignment Workbench
 * Layout Archetype: Parchment High-Jewellery In-Suite Viewing Consignment Workbench (7/5)
 */
export const PRACTICE_134_HIGH_JEWELLERY_ESCROW_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-134-luxury-jewellery-in-suite-exhibition-escrow",
  name: "Commercial & Luxury Goods · High-Jewellery In-Suite Viewing Consignment & Bailment Escrow",
  kind: "section",
  root: {
    id: "prac134-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac134-container",
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
            id: "prac134-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac134-badge",
                type: "badge",
                text: "LUXURY CONSIGNMENT · TBK ART. 561 VEDİA · ATA CARNET TRANSIT",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac134-title",
                type: "heading",
                level: 2,
                text: "High-Jewellery Private In-Suite Viewings & Bailment Escrow",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac134-subtitle",
                type: "text",
                text: "When Place Vendôme and Bond Street jewelers bring multi-million euro diamond suites to Presidential villas in Bodrum or Amanruya, we structure airtight bailment contracts, Lloyd's specie insurance warranties, and customs transit compliance.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 7 / 5 Workbench Grid */
          {
            id: "prac134-workbench-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): Bailment Governance Protocol */
              {
                id: "prac134-left-card",
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
                    id: "prac134-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac134-l-b", type: "badge", text: "HIGH-VALUE BAILMENT & CUSTODY GOVERNANCE", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac134-l-h", type: "heading", level: 3, text: "Private Villa Viewing Bailment (Vedia Sözleşmesi) Protocol", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac134-l-d", type: "text", text: "Under Turkish law, hotel safekeepers bear strict liability (TBK Art. 576), but in-suite viewings conducted outside official hotel custody require customized tripartite bailment instruments binding the luxury house, the VIP guest, and armed escort couriers.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac134-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac134-p1", type: "text", text: "• Armored Transport Escort: Bespoke transit custody protocol from Milas-Bodrum airport customs vault to resort presidential suite under continuous dual-custody verification.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac134-p2", type: "text", text: "• Instant Escrow Closing: Bespoke SWIFT payment gateway escrow releasing diamond possession instantaneously upon confirmed buyer wire confirmation.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac134-p3", type: "text", text: "• ATA Carnet Re-Exportation: Flawless re-exportation certification for unsold high jewellery preventing Turkish luxury consumption tax (ÖTV) assessments.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Specie Insurance Panel */
              {
                id: "prac134-right-card",
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
                    id: "prac134-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac134-r-b", type: "badge", text: "SPECIE UNDERWRITING", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac134-r-t", type: "heading", level: 4, text: "Viewing Escrow Protocol", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac134-r-d", type: "text", text: "We represent international high-jewellery maisons (Place Vendôme, Geneva, London) ensuring flawless security and legal compliance on the Turkish Riviera.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac134-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac134-btn-jewel", type: "button", label: "Draft High Jewellery Viewing Protocol", },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac134-footer-card",
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
                id: "prac134-foot-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac134-foot-txt", type: "text", text: "Conduct high-value gemological exhibitions in complete legal and physical security.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac134-btn-inquiry", type: "button", label: "Consult Private Wealth Partner", },
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
 * PRACTICE-135: Sovereign Buyouts · Private Island Exclusive Buyout Charter Matrix
 * Layout Archetype: 4-Quadrant Executive Private Island Sovereign Buyout Charter Matrix (2x2 Grid)
 */
export const PRACTICE_135_PRIVATE_ISLAND_BUYOUT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-135-private-island-exclusive-buyout-charter",
  name: "Hospitality & Sovereign Concessions · Aegean Private Island Exclusive Buyout Charter",
  kind: "section",
  root: {
    id: "prac135-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac135-container",
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
            id: "prac135-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac135-badge",
                type: "badge",
                text: "SOVEREIGN BUYOUTS · PRIVATE ISLAND LEASES · PERIMETER EXCLUSION",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac135-title",
                type: "heading",
                level: 2,
                text: "Aegean Private Island Sovereign Buyout & Master Concession Charters",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac135-subtitle",
                type: "text",
                text: "When royal dynasties, ultra-HNW family syndicates, or global luxury brands lease an entire private Aegean island (e.g., Kalem Island, Tavşan Island) for complete sovereign privacy and perimeter control.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 4-Quadrant Executive 2x2 Matrix Grid */
          {
            id: "prac135-quad-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Quadrant 1 */
              {
                id: "prac135-q1-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac135-q1-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac135-q1-b", type: "badge", text: "PILLAR I · TERRITORIAL PERIMETER", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac135-q1-h", type: "heading", level: 3, text: "Maritime Cordon & Coast Guard Patrol", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac135-q1-p", type: "text", text: "Securing Harbor Master emergency exclusion zone (Seyir Emniyeti Genelgesi) prohibiting tourist day boats and paparazzi motor yachts from entering within 300 meters of island coves.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quadrant 2 */
              {
                id: "prac135-q2-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac135-q2-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac135-q2-b", type: "badge", text: "PILLAR II · AIRSPACE DEFENSE", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac135-q2-h", type: "heading", level: 3, text: "SHGM Temporary NOTAM & Anti-Drone Shield", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac135-q2-p", type: "text", text: "Temporary flight restriction zone (NOTAM) issued by Civil Aviation (SHGM) prohibiting unauthorized drone operations and general aviation flyovers below 3,000 feet.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quadrant 3 */
              {
                id: "prac135-q3-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac135-q3-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac135-q3-b", type: "badge", text: "PILLAR III · STAFF CONFIDENTIALITY", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac135-q3-h", type: "heading", level: 3, text: "Zero-Device Hotel Staff Undertaking", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac135-q3-p", type: "text", text: "Comprehensive biometric confidentiality protocols for 150+ island staff, including smartphone locker surrenders, non-disclosure deeds with €250,000 liquidated penalties, and background checks.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                    ],
                  },
                ],
              },

              /* Quadrant 4 */
              {
                id: "prac135-q4-card",
                type: "card",
                element: "article",
                layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                style: {
                  color: { background: "surface" },
                  border: { width: "hairline", radius: "md", color: "border" },
                  spacing: { padding: "xl" },
                },
                children: [
                  {
                    id: "prac135-q4-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "xs",
                    children: [
                      { id: "prac135-q4-b", type: "badge", text: "PILLAR IV · MASTER AGREEMENT", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac135-q4-h", type: "heading", level: 3, text: "Exclusive Buyout Charter Agreement", style: { typography: { size: "xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac135-q4-p", type: "text", text: "Total resort takeover agreement guaranteeing exclusive possession of all villas, helipads, docks, and dining facilities with escrow indemnities securing seamless execution.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac135-btn-island", type: "button", label: "Execute Island Buyout Agreement", },
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

export const PRACTICE_LIBRARY_BATCH_27: ComponentDocument[] = [
  PRACTICE_131_SUPERCAR_RALLY_PERMIT_DOCUMENT,
  PRACTICE_132_D2_VIP_TRANSPORT_DOCUMENT,
  PRACTICE_133_SUBMERSIBLE_CLEARANCE_DOCUMENT,
  PRACTICE_134_HIGH_JEWELLERY_ESCROW_DOCUMENT,
  PRACTICE_135_PRIVATE_ISLAND_BUYOUT_DOCUMENT,
];
