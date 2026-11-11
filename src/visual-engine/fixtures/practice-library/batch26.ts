import type { ComponentDocument } from "../../model";

/**
 * ============================================================================
 * OZMI PRACTICE LIBRARY — BATCH 26: High-End Events, Festivals & Entertainment (#126–#130)
 * Coastal Turkish Legal Practice & Luxury Hospitality Integration
 *
 * 5 Radically Distinct Architectural Archetypes:
 * 126: Full-Bleed Statutory Maritime Sound & Coastal Enforcement Warning Bar
 * 127: Asymmetric 8/4 Beachfront Multi-Day Music Festival Licensing Blueprint
 * 128: Parchment A-List Headline Artist Appearance & Force Majeure Workbench (7/5)
 * 129: Dual Comparative Split Screen (6/6: Foreign Security vs Ministry Armed Escort)
 * 130: Tabular Marine Barge Pyrotechnic Fireworks License Schedule Matrix (12-Col Table)
 * ============================================================================
 */

/**
 * PRACTICE-126: Superyacht Parties · Maritime Acoustic Shield & Gendarmerie Enforcement
 * Layout Archetype: Full-Bleed Statutory Maritime Sound & Coastal Enforcement Warning Bar
 */
export const PRACTICE_126_YACHT_SOUND_SHIELD_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-126-mega-yacht-celebrity-party-sound-shield",
  name: "Maritime & Entertainment Law · Mega Yacht Celebrity Party Sound Shield & Coast Guard Fines",
  kind: "section",
  root: {
    id: "prac126-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac126-container",
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
            id: "prac126-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac126-badge",
                type: "badge",
                text: "ENVIRONMENTAL NOISE REGULATION (ÇEDY) · COAST GUARD BOARDING LIMITS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac126-title",
                type: "heading",
                level: 2,
                text: "Anchored Superyacht Live Entertainment & Sound Boundary Defense",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac126-subtitle",
                type: "text",
                text: "VIP birthday celebrations and celebrity DJ sets on yachts anchored in Cennet Koyu, Türkbükü, or Yalıkavak face aggressive night acoustic curfews, Coast Guard boardings, and instant sound equipment confiscation.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Full-Bleed Statutory Acoustic Warning Bar Card */
          {
            id: "prac126-warning-bar",
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
                id: "prac126-wb-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  { id: "prac126-wb-b", type: "badge", text: "STATUTORY CURFEW THRESHOLDS · EFFECTIVE 01:00 AM", style: { color: { background: "primary", text: "background" } } },
                  { id: "prac126-wb-h", type: "heading", level: 3, text: "Maritime Acoustic Boundary Protocol: 65 dB(A) High-Water Mark Limit", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                  { id: "prac126-wb-d", type: "text", text: "Under Turkish Environmental Noise Regulation (ÇEDY Art. 24), outdoor musical broadcasts from marine vessels within 500 meters of the coastline are strictly prohibited past 01:00 AM, with maximum permissible sound levels restricted to 65 dB(A) measured at the shoreward property boundary.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                  { id: "prac126-wb-div", type: "divider", style: { sizing: { width: "full" } } },
                  {
                    id: "prac126-wb-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      {
                        id: "prac126-c1",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                        style: { spacing: { padding: "sm" } },
                        children: [
                          { id: "prac126-c1-t", type: "heading", level: 4, text: "Acoustic Decibel Logging", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac126-c1-d", type: "text", text: "Continuous Type-1 sound level meters recording ambient decibels to disprove inaccurate shoreward handheld readings by municipal police.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                      {
                        id: "prac126-c2",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                        style: { spacing: { padding: "sm" } },
                        children: [
                          { id: "prac126-c2-t", type: "heading", level: 4, text: "Boarding Rights & Master Shield", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac126-c2-d", type: "text", text: "Advising yacht captain under UNCLOS & Turkish Port Law regarding lawful search limits, guest cabin privacy, and warrant requirements.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                      {
                        id: "prac126-c3",
                        type: "card",
                        element: "div",
                        layout: { span: { mobile: 12, tablet: 4, desktop: 4 } },
                        style: { spacing: { padding: "sm" } },
                        children: [
                          { id: "prac126-c3-t", type: "heading", level: 4, text: "Equipment Seizure Injunction", style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                          { id: "prac126-c3-d", type: "text", text: "Filing urgent interim relief in Bodrum Peace Criminal Court (Sulh Ceza Hakimliği) to release impounded DJ consoles and sound systems.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac126-action-card",
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
                id: "prac126-act-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac126-act-txt", type: "text", text: "Planning a major onboard celebration or facing active administrative noise enforcement?", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac126-btn-sound", type: "button", label: "Retain On-Call Maritime Defense", },
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
 * PRACTICE-127: Festival & Concerts · Beachfront Music Festival Licensing Blueprint
 * Layout Archetype: Asymmetric 8/4 Beachfront Multi-Day Music Festival Licensing Blueprint
 */
export const PRACTICE_127_FESTIVAL_BEACH_PERMIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-127-international-music-festival-beach-permit",
  name: "Entertainment Law · Bodrum Beachfront Music Festival Multi-Agency Permitting",
  kind: "section",
  root: {
    id: "prac127-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac127-container",
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
            id: "prac127-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac127-badge",
                type: "badge",
                text: "LAW NO. 2911 · KAYMAKAMLIK FESTIVAL PERMITS · TEMPORARY TAPDK ALCOHOL",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac127-title",
                type: "heading",
                level: 2,
                text: "Multi-Agency Permitting for 5,000+ Attendee Coastal Music Festivals",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac127-subtitle",
                type: "text",
                text: "Securing District Governorship (Kaymakamlık) permits, temporary alcoholic beverage service licenses (TAPDK), coastal stage engineering approvals, and emergency evacuation protocols for international beach festivals.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Asymmetric 8/4 Grid */
          {
            id: "prac127-asymm-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* 8 cols: Clearance Pillars */
              {
                id: "prac127-dossier-card",
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
                    id: "prac127-dos-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac127-dos-b", type: "badge", text: "REGULATORY MASTER PLAN · 30-DAY STATUTORY TIMETABLE", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac127-dos-h", type: "heading", level: 3, text: "The 4 Critical Statutory Clearance Pillars", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac127-dos-d", type: "text", text: "Failure to synchronize municipal, law enforcement, and environmental permits results in last-minute event cancellations, ticket refund liabilities exceeding millions of euros, and promoter bans.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac127-dos-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac127-p1", type: "text", text: "• Governorship & Police: District Governor approval under Law No. 2911 with Gendarmerie crowd control plan and private security ratio (1:50).", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac127-p2", type: "text", text: "• Temporary TAPDK Alcohol Permit: Multi-day open bar and sponsor tasting concessions issued under Agriculture & Forestry circulars.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac127-p3", type: "text", text: "• Coastal Stage Engineering: Chamber of Civil Engineers wind resistance certification (up to 8 Beaufort gusts) for beachfront trussing and VIP decks.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* 4 cols: Production Desk */
              {
                id: "prac127-side-card",
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
                    id: "prac127-side-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac127-sb-1", type: "badge", text: "PRODUCTION DESK", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac127-st-1", type: "heading", level: 4, text: "Filing Deadline & Defense", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac127-sd-1", type: "text", text: "Festival permit dossiers must be lodged at least 30 calendar days before the event. Late applications face non-appealable administrative rejections.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac127-side-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac127-btn-fest", type: "button", label: "Retain Festival Permitting Counsel", },
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
 * PRACTICE-128: Celebrity Contracts · A-List Headline Artist Contract & Force Majeure
 * Layout Archetype: Parchment A-List Headline Artist Appearance & Force Majeure Workbench (7/5)
 */
export const PRACTICE_128_CELEBRITY_ARTIST_CONTRACT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-128-celebrity-performer-force-majeure-cancel",
  name: "Entertainment Law · Celebrity Headliner Performance Contract & Force Majeure Escrow",
  kind: "section",
  root: {
    id: "prac128-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac128-container",
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
            id: "prac128-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac128-badge",
                type: "badge",
                text: "ENTERTAINMENT TALENT · CAA/WME RIDERS · TBK ART. 136 HARDSHIP",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac128-title",
                type: "heading",
                level: 2,
                text: "A-List Celebrity Performance Riders & Weather Force Majeure Escrow",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac128-subtitle",
                type: "text",
                text: "Drafting bulletproof performance appearance agreements for international DJs, pop icons, and headline performers at Bodrum/Çeşme luxury beach clubs and private villa weddings.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 7 / 5 Workbench Grid */
          {
            id: "prac128-workbench-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (7 cols): Artist Rider Protocol */
              {
                id: "prac128-left-card",
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
                    id: "prac128-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac128-l-b", type: "badge", text: "ARTIST BOOKING & RIDER GOVERNANCE", style: { color: { background: "surface-muted", text: "primary" } } },
                      { id: "prac128-l-h", type: "heading", level: 3, text: "Harmonizing CAA/WME Standard Riders with Turkish Civil Doctrine", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac128-l-d", type: "text", text: "Under Turkish Code of Obligations (TBK) Art. 136 and 137, impossibility of performance and unforeseen hardship (Aşırı İfa Güçlüğü) operate differently than common-law force majeure clauses. We align US/UK agency riders with Turkish civil law realities.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac128-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac128-p1", type: "text", text: "• Weather Force Majeure: Precise wind speed (>35 knots) and precipitation criteria verified by MGM to trigger cancellation without promoter fee forfeiture.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac128-p2", type: "text", text: "• Escrow Deposit Release: 50% advance in escrow; 50% remainder disbursed only upon soundcheck sign-off and artist stepping onto stage.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac128-p3", type: "text", text: "• Broadcasting & Image Rights: Strict limitations on guest drone recordings and sponsor endorsements under Law No. 5846.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (5 cols): Appearance Escrow Panel */
              {
                id: "prac128-right-card",
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
                    id: "prac128-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "sm",
                    children: [
                      { id: "prac128-r-b", type: "badge", text: "BOOKING ESCROW DESK", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac128-r-t", type: "heading", level: 4, text: "Headliner Contract Drafting", style: { typography: { size: "lg", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac128-r-d", type: "text", text: "Booking a 7-figure international headliner for an Aegean summer appearance? We deliver enforceable bilateral rider structures within 24 hours.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac128-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac128-btn-contract", type: "button", label: "Draft Artist Appearance Agreement", },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac128-footer-card",
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
                id: "prac128-foot-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac128-foot-txt", type: "text", text: "Protect event promoters and artists with cross-border escrow closing terms.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac128-btn-inquiry", type: "button", label: "Download Artist Rider Checklist", },
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
 * PRACTICE-129: VIP Security · Close Protection & Firearms Licensing
 * Layout Archetype: Dual Comparative Split Screen (6/6: Foreign Security vs Ministry Armed Escort)
 */
export const PRACTICE_129_VIP_SECURITY_ESCORT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-129-vip-security-firearm-foreign-close-protection",
  name: "Security & Firearms Law · Foreign VIP Close Protection & Armed Escort Licensing",
  kind: "section",
  root: {
    id: "prac129-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac129-container",
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
            id: "prac129-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac129-badge",
                type: "badge",
                text: "SECURITY LAW NO. 5188 · FIREARMS LAW NO. 6136 · ARMED ESCORTS",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac129-title",
                type: "heading",
                level: 2,
                text: "Foreign VIP Close Protection vs Turkish Ministry Armed Security",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac129-subtitle",
                type: "text",
                text: "Foreign heads of state, royal families, and tech billionaires visiting Bodrum villas and superyachts cannot lawfully deploy foreign armed bodyguards on Turkish sovereign soil without official Ministry authorization.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* Dual 6/6 Comparative Grid */
          {
            id: "prac129-split-grid",
            type: "grid",
            columns: 12,
            style: { sizing: { width: "full" }, spacing: { gap: "lg" } },
            children: [
              /* Left (6 cols): Foreign Bodyguard Pitfalls */
              {
                id: "prac129-left-card",
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
                    id: "prac129-left-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac129-l-b", type: "badge", text: "CRIMINAL PROHIBITION · LAW NO. 6136", style: { color: { background: "surface-muted", text: "text" } } },
                      { id: "prac129-l-t", type: "heading", level: 3, text: "Illicit Foreign Armed Protection Pitfalls", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac129-l-d", type: "text", text: "Carrying unpermitted firearms or attempting private security duties without Turkish licenses triggers mandatory criminal arrest at airport customs or marina docks.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac129-l-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac129-lp-1", type: "text", text: "• 5 to 8 years mandatory prison for unlicensed firearm importation (TCK 6136).", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac129-lp-2", type: "text", text: "• Immediate deportation & 5-year entry ban for security team members.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac129-lp-3", type: "text", text: "• Severe diplomatic embarrassment and press exposure for the VIP principal.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },

              /* Right (6 cols): Ministry Armed Escort Protocol */
              {
                id: "prac129-right-card",
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
                    id: "prac129-right-stack",
                    type: "stack",
                    direction: "column",
                    alignment: "start",
                    distribution: "start",
                    wrap: false,
                    gap: "md",
                    children: [
                      { id: "prac129-r-b", type: "badge", text: "LAW NO. 5188 CERTIFIED PROTOCOL", style: { color: { background: "primary", text: "background" } } },
                      { id: "prac129-r-t", type: "heading", level: 3, text: "Official Ministry Armed Escort & Liaison", style: { typography: { size: "2xl", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac129-r-d", type: "text", text: "We coordinate with the Ministry of Interior and Provincial Police Directorate (İl Emniyet Müdürlüğü) to license vetted armed Turkish close protection operators.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac129-r-div", type: "divider", style: { sizing: { width: "full" } } },
                      { id: "prac129-rp-1", type: "text", text: "✓ Governor Special Protection Commission (Özel Koruma Komisyonu) permit.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac129-rp-2", type: "text", text: "✓ Armed veteran officers from elite Police Counter-Terror details.", style: { typography: { size: "sm" }, color: { text: "text" } } },
                      { id: "prac129-btn-sec", type: "button", label: "Retain VIP Armed Security Protocol", },
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
 * PRACTICE-130: Coastal Fireworks · Marine Barge Pyrotechnic Fireworks License Matrix
 * Layout Archetype: Tabular Marine Barge Pyrotechnic Fireworks License Schedule Matrix (12-Col Table)
 */
export const PRACTICE_130_FIREWORKS_BARGE_PERMIT_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "practice-130-pyrotechnic-fireworks-marine-barge-permit",
  name: "Maritime Events · Sea Barge Pyrotechnic Fireworks Display Licensing & Port Exclusion",
  kind: "section",
  root: {
    id: "prac130-section",
    type: "section",
    style: {
      color: { background: "background", text: "text" },
      spacing: { paddingY: "2xl", paddingX: "lg" },
      sizing: { width: "full" },
    },
    children: [
      {
        id: "prac130-container",
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
            id: "prac130-header",
            type: "stack",
            direction: "column",
            alignment: "start",
            distribution: "start",
            wrap: false,
            gap: "xs",
            style: { sizing: { maxWidth: "3xl" } },
            children: [
              {
                id: "prac130-badge",
                type: "badge",
                text: "PYROTECHNIC DIRECTIVE · PORT AUTHORITY SAFETY ORDER · NAVTEX CORDON",
                style: {
                  color: { background: "surface-muted", text: "primary" },
                  border: { radius: "sm" },
                  spacing: { paddingX: "sm", paddingY: "xs" },
                },
              },
              {
                id: "prac130-title",
                type: "heading",
                level: 2,
                text: "Offshore Sea Barge Fireworks Displays & Maritime Safety Clearance",
                style: { typography: { size: "4xl", weight: "bold", tracking: "tight" }, color: { text: "text" } },
              },
              {
                id: "prac130-subtitle",
                type: "text",
                text: "Securing multi-agency clearances from Bodrum/Antalya Harbor Masters, Coast Guard, Provincial Police Explosives Branch, and Fire Brigade for dramatic pyrotechnic displays launched from marine barges.",
                style: { typography: { size: "lg" }, color: { text: "text-muted" } },
              },
            ],
          },

          /* 12-Column Tabular Matrix Card */
          {
            id: "prac130-table-card",
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
                id: "prac130-tbl-stack",
                type: "stack",
                direction: "column",
                alignment: "start",
                distribution: "start",
                wrap: false,
                gap: "md",
                children: [
                  /* Table Header */
                  {
                    id: "prac130-th-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac130-th-1", type: "text", text: "PERMIT / APPROVAL", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac130-th-2", type: "text", text: "ISSUING AUTHORITY", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac130-th-3", type: "text", text: "SAFETY MANDATE", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac130-th-4", type: "text", text: "EXCLUSION RADIUS", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "text" } } },
                    ],
                  },
                  { id: "prac130-div-1", type: "divider", style: { sizing: { width: "full" } } },

                  /* Row 1 */
                  {
                    id: "prac130-r1-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac130-r1-c1", type: "text", text: "Port Authority Order (Liman)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac130-r1-c2", type: "text", text: "Ministry of Transport", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac130-r1-c3", type: "text", text: "NAVTEX broadcast to commercial vessels", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac130-r1-c4", type: "text", text: "300m marine cordon around barge", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 2 */
                  {
                    id: "prac130-r2-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac130-r2-c1", type: "text", text: "Explosives Permit (A-Tipi)", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac130-r2-c2", type: "text", text: "Provincial Police Explosives Bureau", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac130-r2-c3", type: "text", text: "Certified Class-IV Pyrotechnician on barge", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac130-r2-c4", type: "text", text: "Escorted transit from bonded magazine", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },

                  /* Row 3 */
                  {
                    id: "prac130-r3-grid",
                    type: "grid",
                    columns: 12,
                    style: { sizing: { width: "full" }, spacing: { gap: "md" } },
                    children: [
                      { id: "prac130-r3-c1", type: "text", text: "Coast Guard Patrol Interception", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "base", weight: "bold" }, color: { text: "text" } } },
                      { id: "prac130-r3-c2", type: "text", text: "Turkish Coast Guard Command", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
                      { id: "prac130-r3-c3", type: "text", text: "TCSG patrol station keeping during show", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm", weight: "bold" }, color: { text: "primary" } } },
                      { id: "prac130-r3-c4", type: "text", text: "Active interception of spectator boats", layout: { span: { mobile: 12, tablet: 3, desktop: 3 } }, style: { typography: { size: "sm" }, color: { text: "text" } } },
                    ],
                  },
                ],
              },
            ],
          },

          /* Footer Action Strip */
          {
            id: "prac130-footer-card",
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
                id: "prac130-footer-stack",
                type: "stack",
                direction: "row",
                alignment: "center",
                distribution: "between",
                wrap: true,
                gap: "md",
                children: [
                  { id: "prac130-note", type: "text", text: "Unauthorized sea-barge fireworks trigger immediate vessel impoundment under Law No. 6136.", style: { typography: { size: "sm", weight: "medium" }, color: { text: "text" } } },
                  { id: "prac130-btn-pyro", type: "button", label: "License Marine Pyrotechnic Display", },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const PRACTICE_LIBRARY_BATCH_26: ComponentDocument[] = [
  PRACTICE_126_YACHT_SOUND_SHIELD_DOCUMENT,
  PRACTICE_127_FESTIVAL_BEACH_PERMIT_DOCUMENT,
  PRACTICE_128_CELEBRITY_ARTIST_CONTRACT_DOCUMENT,
  PRACTICE_129_VIP_SECURITY_ESCORT_DOCUMENT,
  PRACTICE_130_FIREWORKS_BARGE_PERMIT_DOCUMENT,
];
