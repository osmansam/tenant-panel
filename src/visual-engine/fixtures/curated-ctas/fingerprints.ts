export interface CtaFingerprint {
  id: string;
  name: string;
  visualFamily: string;
  layoutFamily: string;
  alignment: string;
  gridPattern: string;
  dominantElement: string;
  ctaPattern: string;
  supportingContentPattern: string;
  interactionModel: string;
  density: string;
  colorDirection: string;
  targetUseCase: string;
}

export type StructuralDimension = keyof Omit<CtaFingerprint, "id" | "name" | "targetUseCase">;

export const STRUCTURAL_DIMENSIONS: StructuralDimension[] = [
  "visualFamily",
  "layoutFamily",
  "alignment",
  "gridPattern",
  "dominantElement",
  "ctaPattern",
  "supportingContentPattern",
  "interactionModel",
  "density",
  "colorDirection",
];

export interface OverlapComparison {
  ctaA: string;
  ctaB: string;
  overlappingDimensions: StructuralDimension[];
  overlapCount: number;
  exceedsThreshold: boolean;
}

export function compareFingerprints(
  a: CtaFingerprint,
  b: CtaFingerprint,
): OverlapComparison {
  const overlappingDimensions = STRUCTURAL_DIMENSIONS.filter(
    (dim) => a[dim] === b[dim],
  );
  return {
    ctaA: a.id,
    ctaB: b.id,
    overlappingDimensions,
    overlapCount: overlappingDimensions.length,
    exceedsThreshold: overlappingDimensions.length >= 4,
  };
}

export function checkAllFingerprintCollisions(
  fingerprints: CtaFingerprint[],
): OverlapComparison[] {
  const collisions: OverlapComparison[] = [];
  for (let i = 0; i < fingerprints.length; i++) {
    for (let j = i + 1; j < fingerprints.length; j++) {
      const comparison = compareFingerprints(fingerprints[i], fingerprints[j]);
      if (comparison.exceedsThreshold) {
        collisions.push(comparison);
      }
    }
  }
  return collisions;
}

export const BATCH_1_FINGERPRINTS: Record<string, CtaFingerprint> = {
  "cta-01-minimal-mono-editorial": {
    id: "cta-01-minimal-mono-editorial",
    name: "The Minimal Mono Editorial",
    visualFamily: "editorial-monochrome",
    layoutFamily: "split-asymmetric-7-5",
    alignment: "left-editorial-flush",
    gridPattern: "2-col-asymmetric-7-5",
    dominantElement: "monumental-serif-headline",
    ctaPattern: "single-button-and-serif-link",
    supportingContentPattern: "issue-edition-metadata-stamp",
    interactionModel: "link-navigation-hover-arrow",
    density: "airy-editorial",
    colorDirection: "pure-stark-monochrome",
    targetUseCase: "Design magazines, thought leadership, independent newsletters",
  },
  "cta-02-warm-atelier-reserve": {
    id: "cta-02-warm-atelier-reserve",
    name: "Warm Atelier Reserve",
    visualFamily: "luxury-warm-neutral",
    layoutFamily: "floating-framed-canvas",
    alignment: "centered-refined-island",
    gridPattern: "single-col-framed-island",
    dominantElement: "double-bordered-patron-card",
    ctaPattern: "refined-outlined-button-and-concierge-phone",
    supportingContentPattern: "patron-quota-and-appointment-discretion",
    interactionModel: "subtle-frame-border-glow",
    density: "spacious-restrained",
    colorDirection: "warm-sand-and-espresso",
    targetUseCase: "Luxury hospitality, private wealth advisory, bespoke commissions",
  },
  "cta-03-dev-terminal-probe": {
    id: "cta-03-dev-terminal-probe",
    name: "DevTerminal QuickProbe",
    visualFamily: "developer-tool-utility",
    layoutFamily: "split-monospace-console-5-7",
    alignment: "split-left-pitch-right-terminal",
    gridPattern: "2-col-asymmetric-5-7",
    dominantElement: "interactive-code-terminal-console",
    ctaPattern: "clipboard-copy-cli-and-docs-link",
    supportingContentPattern: "live-diagnostic-logs-and-runtime-ecosystem",
    interactionModel: "clipboard-code-node-copy",
    density: "dense-technical",
    colorDirection: "terminal-slate-and-amber",
    targetUseCase: "Developer infra, open-source SDKs, CLI tools, backend APIs",
  },
  "cta-04-asymmetric-media-showcase": {
    id: "cta-04-asymmetric-media-showcase",
    name: "Asymmetric Visual Showcase",
    visualFamily: "image-led-studio-product",
    layoutFamily: "asymmetric-split-bleed-4-8",
    alignment: "left-spine-right-wide-media",
    gridPattern: "2-col-asymmetric-4-8",
    dominantElement: "expansive-hardware-media-container",
    ctaPattern: "stacked-pill-button-and-listening-booking",
    supportingContentPattern: "acoustic-specs-bullet-list-and-lab-cert",
    interactionModel: "media-hover-zoom-and-specs-anchor",
    density: "balanced-media-heavy",
    colorDirection: "cool-glacier-and-cobalt",
    targetUseCase: "Creative hardware, 3D design software, industrial design portfolios",
  },
  "cta-05-brutalist-action-slab": {
    id: "cta-05-brutalist-action-slab",
    name: "Industrial Brutalist Action Slab",
    visualFamily: "brutalist-high-contrast",
    layoutFamily: "3-column-partitioned-ribbon",
    alignment: "compartmentalized-ribbon-grid",
    gridPattern: "3-col-partitioned-5-3-4",
    dominantElement: "3px-thick-solid-bordered-action-slabs",
    ctaPattern: "dual-chunky-slab-buttons-with-offset-drop-shadows",
    supportingContentPattern: "uptime-consensus-metrics-and-network-node-count",
    interactionModel: "tactile-hard-shadow-press",
    density: "compact-monolithic",
    colorDirection: "stark-white-black-and-electric-lime",
    targetUseCase: "Web3 protocols, hacker tooling, indie hacker products, streetwear",
  },
};

export const BATCH_2_FINGERPRINTS: Record<string, CtaFingerprint> = {
  "cta-06-enterprise-role-matrix": {
    id: "cta-06-enterprise-role-matrix",
    name: "Enterprise Stakeholder Matrix",
    visualFamily: "enterprise-multi-stakeholder",
    layoutFamily: "3-column-role-selector-grid",
    alignment: "top-header-bottom-3-cards",
    gridPattern: "3-col-equal-cards-1-1-1",
    dominantElement: "tri-role-cards-with-compliance-bar",
    ctaPattern: "per-role-targeted-buttons",
    supportingContentPattern: "soc2-iso27001-compliance-badges",
    interactionModel: "role-card-focus-highlight",
    density: "structured-corporate",
    colorDirection: "corporate-navy-and-steel",
    targetUseCase: "B2B enterprise software, compliance platforms, cloud security suites",
  },
  "cta-07-playful-sticker-stack": {
    id: "cta-07-playful-sticker-stack",
    name: "Playful Neo-Pop Sticker Stack",
    visualFamily: "playful-startup-creative-tech",
    layoutFamily: "layered-badges-and-offset-card",
    alignment: "centered-pillowy-island",
    gridPattern: "single-card-with-floating-pill-anchors",
    dominantElement: "pillowy-soft-card-and-tilted-badges",
    ctaPattern: "oversized-pill-button-with-emoji",
    supportingContentPattern: "5-star-avatar-cluster-and-creator-tally",
    interactionModel: "floating-badge-spring-animation",
    density: "playful-airy",
    colorDirection: "warm-peach-coral-and-marigold",
    targetUseCase: "Creator economy tools, podcast apps, consumer SaaS, social tools",
  },
  "cta-08-data-milestone-gauge": {
    id: "cta-08-data-milestone-gauge",
    name: "Data-Driven Milestone Gauge",
    visualFamily: "data-led-fintech",
    layoutFamily: "split-6-6-metric-and-conversion",
    alignment: "split-balance-metric-action",
    gridPattern: "2-col-equal-split-6-6",
    dominantElement: "live-financial-progress-benchmark-gauge",
    ctaPattern: "instant-account-signup-and-fee-breakdown",
    supportingContentPattern: "realtime-volume-tally-and-fdic-disclaimer",
    interactionModel: "progress-bar-indicator-and-metric-tooltip",
    density: "dense-analytical",
    colorDirection: "fintech-emerald-and-charcoal",
    targetUseCase: "Payment gateways, treasury management, crypto rails, accounting tech",
  },
  "cta-09-nordic-minimal-strip": {
    id: "cta-09-nordic-minimal-strip",
    name: "Nordic Minimalist Forest Strip",
    visualFamily: "warm-neutral-scandinavian",
    layoutFamily: "compact-horizontal-utility-strip",
    alignment: "inline-horizontal-flex-ribbon",
    gridPattern: "single-row-auto-expand-flex",
    dominantElement: "low-height-minimal-strip-with-inline-field",
    ctaPattern: "docked-square-cohort-button-with-input",
    supportingContentPattern: "cohort-schedule-and-limited-seats-remaining",
    interactionModel: "inline-field-focus-expander",
    density: "compact-horizontal",
    colorDirection: "nordic-moss-and-warm-oat",
    targetUseCase: "Design retreats, executive cohorts, boutique craft publications",
  },
  "cta-10-flash-commerce-countdown": {
    id: "cta-10-flash-commerce-countdown",
    name: "Flash Drop Commerce Countdown",
    visualFamily: "commerce-streetwear-drop",
    layoutFamily: "full-bleed-urgent-banner-strip",
    alignment: "stacked-centered-urgency-banner",
    gridPattern: "stacked-urgency-blocks",
    dominantElement: "scarcity-countdown-clock-and-claimed-bar",
    ctaPattern: "full-width-instant-checkout-lock-button",
    supportingContentPattern: "edition-claimed-progress-bar-and-stock-ticker",
    interactionModel: "visual-scarcity-countdown-and-instant-buy",
    density: "dense-high-urgency",
    colorDirection: "hazard-orange-and-pitch-black",
    targetUseCase: "E-commerce product drops, event ticket presales, sneaker releases",
  },
};

export const BATCH_3_FINGERPRINTS: Record<string, CtaFingerprint> = {
  "cta-11-deep-void-cinematic": {
    id: "cta-11-deep-void-cinematic",
    name: "Deep Void Cinematic Portal",
    visualFamily: "cinematic-atmospheric-dark",
    layoutFamily: "full-bleed-monolith-with-vignette",
    alignment: "monumental-centered-pillar",
    gridPattern: "single-col-monolith-centered",
    dominantElement: "vast-negative-space-and-cyan-horizon",
    ctaPattern: "luminescent-pill-and-trailer-modal-link",
    supportingContentPattern: "trailer-runtime-and-4k-hdr-specs",
    interactionModel: "radial-glow-hover-and-lightbox-trigger",
    density: "monumental-airy",
    colorDirection: "deep-void-and-cyan-glow",
    targetUseCase: "AI foundation models, game studios, luxury automotive, spatial computing",
  },
  "cta-12-concierge-advisory-desk": {
    id: "cta-12-concierge-advisory-desk",
    name: "Private Advisory Concierge Desk",
    visualFamily: "consultation-bespoke-advisory",
    layoutFamily: "split-7-5-profile-and-scheduler",
    alignment: "left-partner-right-scheduler",
    gridPattern: "2-col-asymmetric-7-5",
    dominantElement: "senior-partner-profile-and-slot-card",
    ctaPattern: "time-slot-booking-button-cluster",
    supportingContentPattern: "fortune-50-client-roster-and-engagement-scale",
    interactionModel: "consultation-date-slot-picker",
    density: "balanced-executive",
    colorDirection: "heritage-burgundy-and-ivory",
    targetUseCase: "M&A advisory, executive recruiting, specialized legal counsel, family offices",
  },
  "cta-13-wall-of-advocates-citadel": {
    id: "cta-13-wall-of-advocates-citadel",
    name: "Wall of Advocates Social Proof Citadel",
    visualFamily: "social-proof-led-community",
    layoutFamily: "inverted-stack-quotes-over-action",
    alignment: "top-masonry-arch-bottom-anchor-bar",
    gridPattern: "3-card-quote-grid-with-docked-footer",
    dominantElement: "curated-3-card-customer-testimonial-arch",
    ctaPattern: "docked-horizontal-signup-bar",
    supportingContentPattern: "g2-capterra-badges-and-18000-leaders-proof",
    interactionModel: "testimonial-card-hover-elevation",
    density: "rich-social-proof",
    colorDirection: "soft-lavender-and-deep-indigo",
    targetUseCase: "SaaS growth tools, community memberships, product-led marketing tools",
  },
  "cta-14-command-palette-portal": {
    id: "cta-14-command-palette-portal",
    name: "Command Palette Navigation Portal",
    visualFamily: "portal-navigation-led",
    layoutFamily: "floating-search-and-intent-selector",
    alignment: "centered-command-palette-modal",
    gridPattern: "single-col-intent-list-container",
    dominantElement: "interactive-command-palette-intent-chips",
    ctaPattern: "multi-intent-routing-action-rows",
    supportingContentPattern: "keyboard-shortcuts-and-intent-descriptors",
    interactionModel: "keyboard-intent-row-selection",
    density: "compact-modal-utility",
    colorDirection: "dark-mode-neutral-gray",
    targetUseCase: "Developer hubs, complex multi-product SaaS, documentation portals",
  },
  "cta-15-architectural-gallery-pass": {
    id: "cta-15-architectural-gallery-pass",
    name: "Architectural Gallery Exhibition Pass",
    visualFamily: "luxury-editorial-architecture",
    layoutFamily: "asymmetric-frame-with-overlapping-plate",
    alignment: "left-editorial-right-ticket-pass",
    gridPattern: "2-col-overlapping-cards",
    dominantElement: "perforated-admission-ticket-pass-card",
    ctaPattern: "perforated-ticket-reservation-button",
    supportingContentPattern: "biennial-curator-notes-and-venue-metadata",
    interactionModel: "ticket-perforation-tear-hover",
    density: "architectural-sculptural",
    colorDirection: "terracotta-and-raw-limestone",
    targetUseCase: "Art biennials, architecture symposiums, high-end design expos",
  },
};

export const BATCH_4_FINGERPRINTS: Record<string, CtaFingerprint> = {
  "cta-16-security-compliance-vault": {
    id: "cta-16-security-compliance-vault",
    name: "Enterprise Security & Compliance Vault",
    visualFamily: "trust-compliance-security",
    layoutFamily: "security-badge-shield-with-download-wall",
    alignment: "centered-security-shield-card",
    gridPattern: "single-col-vault-container",
    dominantElement: "compliance-shield-badge-and-checksum-card",
    ctaPattern: "instant-dossier-download-and-sha256-copy",
    supportingContentPattern: "soc2-type2-iso27001-badges-and-auditor-seal",
    interactionModel: "checksum-hash-copy-and-dossier-download",
    density: "high-assurance-compact",
    colorDirection: "cobalt-navy-and-emerald-verification",
    targetUseCase: "B2B security vendors, enterprise SaaS, cloud infrastructure, fintech banking",
  },
  "cta-17-interactive-roi-calculator": {
    id: "cta-17-interactive-roi-calculator",
    name: "Interactive ROI Value Calculator",
    visualFamily: "analytical-roi-calculator",
    layoutFamily: "split-slider-and-computed-output",
    alignment: "left-inputs-right-output-card",
    gridPattern: "2-col-equal-split-6-6-calculator",
    dominantElement: "calculated-annual-savings-ticker-and-breakdown",
    ctaPattern: "lock-calculated-tier-pricing-button",
    supportingContentPattern: "instant-payback-period-and-fte-hours-saved",
    interactionModel: "team-slider-calculation-and-custom-quote",
    density: "dense-analytical",
    colorDirection: "charcoal-and-solar-amber",
    targetUseCase: "Workflow automation, dev productivity tools, cloud cost optimization, enterprise HR",
  },
  "cta-18-dual-persona-fork": {
    id: "cta-18-dual-persona-fork",
    name: "Dual Persona Fork Portal",
    visualFamily: "bifurcated-persona-choice",
    layoutFamily: "equal-split-dual-door-cards",
    alignment: "dual-path-parallel-doors",
    gridPattern: "2-col-equal-split-6-6-fork",
    dominantElement: "side-by-side-developer-vs-executive-doors",
    ctaPattern: "dual-distinct-destination-buttons",
    supportingContentPattern: "sub-10ms-terminal-quickstart-vs-board-deck",
    interactionModel: "dual-door-hover-spotlight",
    density: "balanced-bifurcated",
    colorDirection: "split-slate-mono-and-sapphire",
    targetUseCase: "Developer platforms with enterprise sales, multi-stakeholder databases, observability suites",
  },
  "cta-19-media-podcast-dock": {
    id: "cta-19-media-podcast-dock",
    name: "Media Audio Episode Streamer Dock",
    visualFamily: "media-creator-streaming",
    layoutFamily: "horizontal-audio-player-dock",
    alignment: "horizontal-media-player-dock",
    gridPattern: "single-col-audio-dock-container",
    dominantElement: "audiogram-waveform-track-and-playback-controls",
    ctaPattern: "play-episode-pill-and-subscribe-button",
    supportingContentPattern: "host-avatars-episode-duration-and-rss-links",
    interactionModel: "play-pause-scrubber-and-subscribe-toggle",
    density: "compact-horizontal-media",
    colorDirection: "pitch-noir-electric-violet-and-cadmium",
    targetUseCase: "Tech podcasts, audio publications, media production studios, conference talk replays",
  },
  "cta-20-founder-salon-invitation": {
    id: "cta-20-founder-salon-invitation",
    name: "VIP Founder Salon Wax-Seal Invitation",
    visualFamily: "exclusive-intimate-salon",
    layoutFamily: "centered-deckle-edge-formal-invitation",
    alignment: "centered-formal-card-invitation",
    gridPattern: "single-col-formal-envelope",
    dominantElement: "wax-seal-crest-and-curated-guest-list-notice",
    ctaPattern: "request-private-invitation-serif-button",
    supportingContentPattern: "table-capacity-dinner-venue-and-selection-criteria",
    interactionModel: "formal-guest-request-submission",
    density: "spacious-intimate-luxury",
    colorDirection: "deep-espresso-parchment-and-antique-gold",
    targetUseCase: "Private investor dinners, founder summits, closed advisory boards, executive retreats",
  },
};

export const BATCH_5_FINGERPRINTS: Record<string, CtaFingerprint> = {
  "cta-21-oss-contributor-rail": {
    id: "cta-21-oss-contributor-rail",
    name: "Open Source Contributor & Git Rail",
    visualFamily: "open-source-github-terminal",
    layoutFamily: "horizontal-contributor-strip",
    alignment: "horizontal-commit-and-star-rail",
    gridPattern: "single-row-commit-metadata-rail",
    dominantElement: "realtime-git-commit-ticker-and-star-counter",
    ctaPattern: "star-on-github-and-submit-pr-buttons",
    supportingContentPattern: "contributor-avatar-stack-and-apache2-license",
    interactionModel: "github-star-counter-toggle",
    density: "compact-terminal-horizontal",
    colorDirection: "github-dark-charcoal-and-star-yellow",
    targetUseCase: "Developer tooling, open source compilers, systems libraries, web frameworks",
  },
  "cta-22-free-vs-pro-switch": {
    id: "cta-22-free-vs-pro-switch",
    name: "Free Forever vs Pro Comparison Switch",
    visualFamily: "transparent-plan-comparison",
    layoutFamily: "2-col-asymmetric-plan-matrix",
    alignment: "side-by-side-tier-comparison",
    gridPattern: "2-col-equal-split-6-6-tiers",
    dominantElement: "side-by-side-feature-comparison-checklists",
    ctaPattern: "dual-tier-activation-buttons-free-vs-pro",
    supportingContentPattern: "transparent-feature-checkmarks-and-usage-limits",
    interactionModel: "annual-billing-discount-toggle",
    density: "dense-comparative",
    colorDirection: "slate-clean-and-electric-indigo",
    targetUseCase: "PLG SaaS, developer tools, team collaboration suites, freemium products",
  },
  "cta-23-hardware-kit-unboxing": {
    id: "cta-23-hardware-kit-unboxing",
    name: "Hardware DevKit Blueprint & Reservation",
    visualFamily: "industrial-iot-hardware",
    layoutFamily: "blueprint-spec-sheet-with-deposit",
    alignment: "left-schematic-right-deposit-card",
    gridPattern: "2-col-asymmetric-7-5-blueprint",
    dominantElement: "hardware-pinout-spec-sheet-and-deposit-card",
    ctaPattern: "refundable-hardware-deposit-button",
    supportingContentPattern: "pcb-dimensions-fpga-specs-and-batch-schedule",
    interactionModel: "hardware-batch-reservation-selector",
    density: "schematic-technical-dense",
    colorDirection: "blueprint-deep-cyan-and-titanium",
    targetUseCase: "Robotics hardware, IoT sensors, spatial computing dev kits, edge silicon",
  },
  "cta-24-system-migration-alert": {
    id: "cta-24-system-migration-alert",
    name: "System Cutover & Maintenance Alert",
    visualFamily: "critical-system-alert",
    layoutFamily: "high-visibility-system-notice-strip",
    alignment: "stacked-urgency-cutover-panel",
    gridPattern: "single-col-cutover-container",
    dominantElement: "scheduled-cutover-countdown-and-cli-check",
    ctaPattern: "schedule-zero-downtime-slot-button",
    supportingContentPattern: "cluster-health-telemetry-and-preflight-cli",
    interactionModel: "preflight-command-copy-and-slot-booking",
    density: "high-alert-compact",
    colorDirection: "hazard-amber-and-slate-midnight",
    targetUseCase: "Database major version upgrades, cloud cutovers, API deprecations, cluster maintenance",
  },
  "cta-25-ecosystem-nexus-citadel": {
    id: "cta-25-ecosystem-nexus-citadel",
    name: "Ecosystem Nexus Citadel Hub",
    visualFamily: "monumental-commonwealth-hub",
    layoutFamily: "3-card-gateway-triad-with-citadel-footer",
    alignment: "triad-gateway-with-universal-footer",
    gridPattern: "3-card-equal-split-gateway-triad",
    dominantElement: "3-pillar-ecosystem-gateways-and-community-counter",
    ctaPattern: "universal-commonwealth-entry-pass-button",
    supportingContentPattern: "250000-builder-census-discord-whitepaper-links",
    interactionModel: "gateway-card-portal-hover",
    density: "monumental-commonwealth",
    colorDirection: "royal-midnight-and-iridescent-amethyst",
    targetUseCase: "Decentralized foundations, developer commonwealths, multi-cloud platforms, global networks",
  },
};


