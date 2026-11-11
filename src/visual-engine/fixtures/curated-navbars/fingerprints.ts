/**
 * OZMI NAVBAR DIVERSITY FINGERPRINTS & COLLISION VERIFICATION
 *
 * Guarantees zero structural collisions (< 4 matching dimensions)
 * across all pairs of templates in the 30-template Navbar Library.
 */

export interface NavbarFingerprint {
  id: string;
  name: string;
  navbarModel: string;
  layoutFamily: string;
  brandAlignment: "left" | "center" | "split" | "stacked-center" | "left-subbrand" | "none-symbol-only";
  navigationPattern: string;
  actionStrategy: string;
  utilityElements: string;
  mobileBehavior: string;
  density: "airy" | "spacious" | "balanced" | "compact" | "dense";
  visualSurface: string;
  heightProfile: string;

  // Selection & Jev metadata
  category?: "navbar";
  purposes: string[];
  designFamily: string;
  audienceFit: string[];
  industryFit: string[];
  visualIntensity: "subtle" | "moderate" | "high" | "bold";
  colorDirection: string;
  capabilities: string[];
}

export type NavbarStructuralDimension =
  | "navbarModel"
  | "layoutFamily"
  | "brandAlignment"
  | "navigationPattern"
  | "actionStrategy"
  | "utilityElements"
  | "mobileBehavior"
  | "density"
  | "visualSurface"
  | "heightProfile";

export const NAVBAR_STRUCTURAL_DIMENSIONS: NavbarStructuralDimension[] = [
  "navbarModel",
  "layoutFamily",
  "brandAlignment",
  "navigationPattern",
  "actionStrategy",
  "utilityElements",
  "mobileBehavior",
  "density",
  "visualSurface",
  "heightProfile",
];

export interface NavbarOverlapComparison {
  idA: string;
  idB: string;
  matchingCount: number;
  matchingDimensions: NavbarStructuralDimension[];
}

export function compareNavbarFingerprints(
  a: NavbarFingerprint,
  b: NavbarFingerprint
): NavbarOverlapComparison {
  const matches: NavbarStructuralDimension[] = [];
  for (const dim of NAVBAR_STRUCTURAL_DIMENSIONS) {
    if (a[dim] === b[dim]) {
      matches.push(dim);
    }
  }
  return {
    idA: a.id,
    idB: b.id,
    matchingCount: matches.length,
    matchingDimensions: matches,
  };
}

export function checkAllNavbarCollisions(
  fingerprints: NavbarFingerprint[],
  maxAllowedMatches = 3
): NavbarOverlapComparison[] {
  const collisions: NavbarOverlapComparison[] = [];
  for (let i = 0; i < fingerprints.length; i++) {
    for (let j = i + 1; j < fingerprints.length; j++) {
      const cmp = compareNavbarFingerprints(fingerprints[i], fingerprints[j]);
      if (cmp.matchingCount > maxAllowedMatches) {
        collisions.push(cmp);
      }
    }
  }
  return collisions;
}

export const BATCH_1_NAVBAR_FINGERPRINTS: NavbarFingerprint[] = [
  {
    "id": "navbar-01-classic-saas-balanced",
    "name": "Classic SaaS Balanced Header",
    "navbarModel": "classic-saas",
    "layoutFamily": "single-tier-balanced-row",
    "brandAlignment": "left",
    "navigationPattern": "inline-text-links",
    "actionStrategy": "dual-sign-in-and-primary-pill",
    "utilityElements": "theme-mode-toggle",
    "mobileBehavior": "slide-down-menu-panel",
    "density": "balanced",
    "visualSurface": "solid-surface-shadow-sm",
    "heightProfile": "standard-56px",
    "category": "navbar",
    "purposes": [
      "conversion",
      "navigation",
      "auth"
    ],
    "designFamily": "minimal-b2b-saas",
    "audienceFit": [
      "b2b",
      "startups",
      "teams"
    ],
    "industryFit": [
      "saas",
      "software",
      "cloud"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "neutral-slate-indigo",
    "capabilities": [
      "site-logo",
      "site-name",
      "navigation-menu",
      "theme-switcher",
      "button",
      "menu-toggle",
      "menu-panel"
    ]
  },
  {
    "id": "navbar-02-centered-brand-split",
    "name": "Centered Brand Bilateral Split Header",
    "navbarModel": "editorial-studio",
    "layoutFamily": "centered-logo-split-row",
    "brandAlignment": "center",
    "navigationPattern": "bilateral-split-links",
    "actionStrategy": "minimal-contact-text-link",
    "utilityElements": "language-switcher-pill",
    "mobileBehavior": "off-canvas-drawer",
    "density": "spacious",
    "visualSurface": "bordered-contrast-hairline",
    "heightProfile": "balanced-64px",
    "category": "navbar",
    "purposes": [
      "branding",
      "navigation",
      "portfolio"
    ],
    "designFamily": "editorial-atelier",
    "audienceFit": [
      "clients",
      "creative-directors",
      "luxury-buyers"
    ],
    "industryFit": [
      "design-agencies",
      "fashion",
      "architecture"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "monochrome-cream-dark",
    "capabilities": [
      "site-logo",
      "site-name",
      "navigation-menu",
      "language-switcher",
      "link",
      "menu-toggle",
      "menu-panel"
    ]
  },
  {
    "id": "navbar-03-floating-island-dock",
    "name": "Floating Pill Island Dock",
    "navbarModel": "modern-app",
    "layoutFamily": "floating-capsule-island",
    "brandAlignment": "left",
    "navigationPattern": "pill-segmented-dock-links",
    "actionStrategy": "single-accent-action-button",
    "utilityElements": "blur-backdrop-glassmorphism",
    "mobileBehavior": "floating-bottom-dock",
    "density": "compact",
    "visualSurface": "glassmorphism-blur",
    "heightProfile": "ultra-compact-48px",
    "category": "navbar",
    "purposes": [
      "conversion",
      "modern-ui",
      "floating-navigation"
    ],
    "designFamily": "futuristic-mobile-app",
    "audienceFit": [
      "mobile-users",
      "tech-enthusiasts",
      "consumers"
    ],
    "industryFit": [
      "mobile-apps",
      "ai-tools",
      "productivity"
    ],
    "visualIntensity": "high",
    "colorDirection": "dark-glass-cyan-glow",
    "capabilities": [
      "site-logo",
      "navigation-menu",
      "button",
      "badge",
      "flex"
    ]
  },
  {
    "id": "navbar-04-developer-terminal-strip",
    "name": "Monospace DevTerminal Status Bar",
    "navbarModel": "developer-tool",
    "layoutFamily": "dense-monospace-tool-rail",
    "brandAlignment": "left",
    "navigationPattern": "monospace-breadcrumb-path",
    "actionStrategy": "github-star-pill-and-cmd-k",
    "utilityElements": "live-status-ping-dot",
    "mobileBehavior": "horizontal-scroll-pill-rail",
    "density": "dense",
    "visualSurface": "monochrome-terminal-dark",
    "heightProfile": "ultra-compact-44px",
    "category": "navbar",
    "purposes": [
      "developer-experience",
      "documentation",
      "status-transparency"
    ],
    "designFamily": "developer-terminal",
    "audienceFit": [
      "engineers",
      "devops",
      "system-architects"
    ],
    "industryFit": [
      "developer-tools",
      "cloud-infra",
      "open-source"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "terminal-black-emerald-amber",
    "capabilities": [
      "site-name",
      "badge",
      "button",
      "icon",
      "link",
      "text"
    ]
  },
  {
    "id": "navbar-05-enterprise-dual-tier",
    "name": "Enterprise Dual-Tier Utility Header",
    "navbarModel": "enterprise-b2b",
    "layoutFamily": "stacked-utility-plus-primary",
    "brandAlignment": "left-subbrand",
    "navigationPattern": "dropdown-category-mega-triggers",
    "actionStrategy": "request-demo-and-portal-login",
    "utilityElements": "top-metadata-bar-phone-region",
    "mobileBehavior": "accordion-nested-menu-drawer",
    "density": "dense",
    "visualSurface": "elevated-double-bordered-surface",
    "heightProfile": "multi-tier-96px",
    "category": "navbar",
    "purposes": [
      "enterprise-sales",
      "global-navigation",
      "customer-portal"
    ],
    "designFamily": "enterprise-governance",
    "audienceFit": [
      "enterprise-buyers",
      "procurement",
      "existing-customers"
    ],
    "industryFit": [
      "enterprise-saas",
      "telecom",
      "cybersecurity"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "navy-slate-corporate-blue",
    "capabilities": [
      "site-logo",
      "site-name",
      "navigation-menu",
      "button",
      "link",
      "badge",
      "language-switcher"
    ]
  }
];

export const BATCH_2_NAVBAR_FINGERPRINTS: NavbarFingerprint[] = [
  {
    "id": "navbar-06-editorial-masthead",
    "name": "Editorial Newspaper Masthead",
    "navbarModel": "publishing",
    "layoutFamily": "three-row-editorial-masthead",
    "brandAlignment": "stacked-center",
    "navigationPattern": "category-topic-rule-links",
    "actionStrategy": "subscribe-membership-button",
    "utilityElements": "edition-date-weather-strip",
    "mobileBehavior": "full-screen-curtain",
    "density": "airy",
    "visualSurface": "editorial-rule-bordered",
    "heightProfile": "editorial-120px",
    "purposes": [
      "content-discovery",
      "publishing",
      "subscriptions"
    ],
    "designFamily": "classic-broadsheet",
    "audienceFit": [
      "readers",
      "subscribers",
      "journalists"
    ],
    "industryFit": [
      "news-media",
      "magazines",
      "literary-journals"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "warm-newsprint-charcoal",
    "capabilities": [
      "site-name",
      "navigation-menu",
      "button",
      "text",
      "link",
      "divider"
    ]
  },
  {
    "id": "navbar-07-ecommerce-retail-hub",
    "name": "E-Commerce Retail Header",
    "navbarModel": "retail-ecommerce",
    "layoutFamily": "wide-search-retail-grid",
    "brandAlignment": "left",
    "navigationPattern": "department-dropdown-links",
    "actionStrategy": "bag-wishlist-account-counter",
    "utilityElements": "promo-banner-and-live-search",
    "mobileBehavior": "bottom-app-bar-with-search",
    "density": "dense",
    "visualSurface": "solid-surface-shadow-sm",
    "heightProfile": "multi-tier-96px",
    "purposes": [
      "commerce",
      "product-search",
      "account-management"
    ],
    "designFamily": "modern-retail",
    "audienceFit": [
      "shoppers",
      "retail-customers"
    ],
    "industryFit": [
      "ecommerce",
      "fashion-retail",
      "consumer-goods"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "neutral-white-black-coral",
    "capabilities": [
      "site-logo",
      "site-name",
      "input",
      "button",
      "badge",
      "link",
      "navigation-menu"
    ]
  },
  {
    "id": "navbar-08-luxury-atelier-split",
    "name": "Luxury Atelier Minimalist Split",
    "navbarModel": "luxury-goods",
    "layoutFamily": "understated-asymmetric-split",
    "brandAlignment": "center",
    "navigationPattern": "spaced-serif-caps-links",
    "actionStrategy": "private-client-portal-link",
    "utilityElements": "currency-and-boutique-finder",
    "mobileBehavior": "full-screen-curtain",
    "density": "airy",
    "visualSurface": "bordered-contrast-hairline",
    "heightProfile": "prominent-80px",
    "purposes": [
      "brand-prestige",
      "boutique-direction",
      "private-clients"
    ],
    "designFamily": "haute-horlogerie",
    "audienceFit": [
      "high-net-worth",
      "collectors",
      "luxury-shoppers"
    ],
    "industryFit": [
      "jewelry",
      "couture",
      "luxury-estates"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "champagne-obsidian-gold",
    "capabilities": [
      "site-logo",
      "site-name",
      "navigation-menu",
      "link",
      "text"
    ]
  },
  {
    "id": "navbar-09-command-palette-center",
    "name": "Command-Palette Search Centered Header",
    "navbarModel": "knowledge-base",
    "layoutFamily": "search-dominant-command-bar",
    "brandAlignment": "split",
    "navigationPattern": "secondary-doc-topic-links",
    "actionStrategy": "cmd-k-palette-shortcut-pill",
    "utilityElements": "center-interactive-search-input",
    "mobileBehavior": "command-modal-overlay",
    "density": "compact",
    "visualSurface": "inset-search-sunken",
    "heightProfile": "prominent-72px",
    "purposes": [
      "documentation-search",
      "navigation",
      "api-reference"
    ],
    "designFamily": "developer-docs",
    "audienceFit": [
      "developers",
      "support-agents",
      "product-managers"
    ],
    "industryFit": [
      "documentation",
      "knowledge-base",
      "developer-tools"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "slate-blue-gray",
    "capabilities": [
      "site-logo",
      "site-name",
      "input",
      "badge",
      "link",
      "button"
    ]
  },
  {
    "id": "navbar-10-minimal-drawer-trigger",
    "name": "Minimalist Full-Curtain Drawer Bar",
    "navbarModel": "portfolio-agency",
    "layoutFamily": "edge-brand-with-drawer-icon",
    "brandAlignment": "left",
    "navigationPattern": "hidden-drawer-curtain-links",
    "actionStrategy": "curtain-drawer-trigger-button",
    "utilityElements": "sound-toggle-and-reel-status",
    "mobileBehavior": "full-screen-curtain",
    "density": "airy",
    "visualSurface": "transparent-overlay",
    "heightProfile": "standard-56px",
    "purposes": [
      "minimal-presentation",
      "portfolio",
      "experiential"
    ],
    "designFamily": "creative-direction",
    "audienceFit": [
      "clients",
      "agencies",
      "art-buyers"
    ],
    "industryFit": [
      "film-production",
      "creative-agencies",
      "photography"
    ],
    "visualIntensity": "high",
    "colorDirection": "monochrome-stark-black-white",
    "capabilities": [
      "site-logo",
      "site-name",
      "menu-toggle",
      "badge",
      "button"
    ]
  }
];

export const BATCH_3_NAVBAR_FINGERPRINTS: NavbarFingerprint[] = [
  {
    "id": "navbar-11-fintech-secure-portal",
    "name": "Fintech Banking Portal Header",
    "navbarModel": "fintech-banking",
    "layoutFamily": "dual-segment-secure-row",
    "brandAlignment": "left-subbrand",
    "navigationPattern": "audience-segmented-tabs",
    "actionStrategy": "encrypted-login-button",
    "utilityElements": "bank-grade-ssl-indicator",
    "mobileBehavior": "drawer-with-category-tabs",
    "density": "balanced",
    "visualSurface": "bordered-contrast-hairline",
    "heightProfile": "standard-56px",
    "purposes": [
      "secure-banking",
      "segment-routing",
      "compliance"
    ],
    "designFamily": "neobank-corporate",
    "audienceFit": [
      "consumers",
      "business-treasury",
      "investors"
    ],
    "industryFit": [
      "fintech",
      "banking",
      "treasury"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "emerald-slate-dark",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "badge",
      "navigation-menu",
      "link"
    ]
  },
  {
    "id": "navbar-12-healthcare-clinic-urgent",
    "name": "Urgent Care & Clinical Direct Dial Header",
    "navbarModel": "healthcare",
    "layoutFamily": "triage-utility-split-header",
    "brandAlignment": "left",
    "navigationPattern": "clinical-specialty-links",
    "actionStrategy": "urgent-appointment-booking-cta",
    "utilityElements": "24-7-emergency-direct-dial-strip",
    "mobileBehavior": "emergency-triage-modal",
    "density": "compact",
    "visualSurface": "high-contrast-clinical-banner",
    "heightProfile": "tall-88px",
    "purposes": [
      "patient-triage",
      "emergency-dial",
      "appointment-booking"
    ],
    "designFamily": "clinical-medical",
    "audienceFit": [
      "patients",
      "caregivers",
      "physicians"
    ],
    "industryFit": [
      "healthcare",
      "hospital-networks",
      "urgent-care"
    ],
    "visualIntensity": "high",
    "colorDirection": "cyan-white-emergency-red",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "link",
      "badge",
      "text"
    ]
  },
  {
    "id": "navbar-13-event-conference-countdown",
    "name": "Conference Countdown & Ticket Bar",
    "navbarModel": "event-conference",
    "layoutFamily": "countdown-anchored-header",
    "brandAlignment": "center",
    "navigationPattern": "agenda-venue-speaker-links",
    "actionStrategy": "buy-passes-scarcity-button",
    "utilityElements": "live-event-countdown-ticker",
    "mobileBehavior": "banner-dock-pinned",
    "density": "compact",
    "visualSurface": "vibrant-gradient-strip",
    "heightProfile": "tall-84px",
    "purposes": [
      "ticket-sales",
      "agenda-discovery",
      "countdown-urgency"
    ],
    "designFamily": "summit-festival",
    "audienceFit": [
      "attendees",
      "sponsors",
      "speakers"
    ],
    "industryFit": [
      "tech-conferences",
      "summits",
      "festivals"
    ],
    "visualIntensity": "bold",
    "colorDirection": "violet-amber-dark",
    "capabilities": [
      "site-logo",
      "site-name",
      "badge",
      "button",
      "link",
      "navigation-menu"
    ]
  },
  {
    "id": "navbar-14-api-gateway-status",
    "name": "API Gateway & Systems Status Bar",
    "navbarModel": "api-platform",
    "layoutFamily": "status-anchored-gateway-bar",
    "brandAlignment": "left",
    "navigationPattern": "protocol-sdk-doc-links",
    "actionStrategy": "generate-api-key-button",
    "utilityElements": "99-99-uptime-ping-indicator",
    "mobileBehavior": "horizontal-scroll-pill-rail",
    "density": "compact",
    "visualSurface": "bordered-contrast-hairline",
    "heightProfile": "ultra-compact-48px",
    "purposes": [
      "api-developer-access",
      "operational-status",
      "sdk-docs"
    ],
    "designFamily": "cloud-developer-gateway",
    "audienceFit": [
      "backend-engineers",
      "api-consumers",
      "integration-leads"
    ],
    "industryFit": [
      "api-platforms",
      "cloud-storage",
      "payment-infrastructure"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "dark-slate-green-accent",
    "capabilities": [
      "site-name",
      "badge",
      "button",
      "link",
      "icon"
    ]
  },
  {
    "id": "navbar-15-university-audience-tabs",
    "name": "University Multi-Audience Campus Bar",
    "navbarModel": "higher-education",
    "layoutFamily": "audience-split-campus-header",
    "brandAlignment": "stacked-center",
    "navigationPattern": "audience-segmented-tabs",
    "actionStrategy": "apply-now-admissions-pill",
    "utilityElements": "campus-directory-search-input",
    "mobileBehavior": "multi-level-accordion-drawer",
    "density": "dense",
    "visualSurface": "collegiate-crested-header",
    "heightProfile": "multi-tier-96px",
    "purposes": [
      "admissions",
      "audience-routing",
      "campus-portal"
    ],
    "designFamily": "academic-institution",
    "audienceFit": [
      "students",
      "faculty",
      "alumni",
      "parents"
    ],
    "industryFit": [
      "universities",
      "colleges",
      "research-institutes"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "crimson-gold-white",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "link",
      "input",
      "navigation-menu"
    ]
  }
];

export const BATCH_4_NAVBAR_FINGERPRINTS: NavbarFingerprint[] = [
  {
    "id": "navbar-16-hospitality-reservation",
    "name": "Hospitality & Dining Reservation Bar",
    "navbarModel": "dining-hospitality",
    "layoutFamily": "boutique-reservation-split",
    "brandAlignment": "center",
    "navigationPattern": "tasting-menu-and-cellar-links",
    "actionStrategy": "reserve-table-opentable-button",
    "utilityElements": "hours-phone-concierge-badge",
    "mobileBehavior": "off-canvas-drawer",
    "density": "spacious",
    "visualSurface": "solid-surface-shadow-sm",
    "heightProfile": "prominent-80px",
    "purposes": [
      "table-reservation",
      "menu-exploration",
      "boutique-hospitality"
    ],
    "designFamily": "michelin-dining",
    "audienceFit": [
      "diners",
      "event-planners",
      "guests"
    ],
    "industryFit": [
      "restaurants",
      "boutique-hotels",
      "private-clubs"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "warm-terracotta-charcoal",
    "capabilities": [
      "site-name",
      "navigation-menu",
      "button",
      "badge",
      "link"
    ]
  },
  {
    "id": "navbar-17-nonprofit-donation-strip",
    "name": "Nonprofit Impact & Grant Header",
    "navbarModel": "nonprofit-charity",
    "layoutFamily": "campaign-pinned-impact-bar",
    "brandAlignment": "left",
    "navigationPattern": "mission-program-financial-links",
    "actionStrategy": "highlighted-donate-now-pill",
    "utilityElements": "live-grant-impact-progress-badge",
    "mobileBehavior": "slide-down-menu-panel",
    "density": "balanced",
    "visualSurface": "elevated-double-bordered-surface",
    "heightProfile": "multi-tier-92px",
    "purposes": [
      "fundraising",
      "impact-transparency",
      "advocacy"
    ],
    "designFamily": "humanitarian-ngo",
    "audienceFit": [
      "donors",
      "grant-makers",
      "volunteers"
    ],
    "industryFit": [
      "nonprofits",
      "charities",
      "grant-foundations"
    ],
    "visualIntensity": "high",
    "colorDirection": "amber-emerald-white",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "badge",
      "navigation-menu",
      "link"
    ]
  },
  {
    "id": "navbar-18-multibrand-ecosystem-strip",
    "name": "Multi-Brand Umbrella Network Strip",
    "navbarModel": "conglomerate",
    "layoutFamily": "network-cross-nav-header",
    "brandAlignment": "left",
    "navigationPattern": "sister-product-ecosystem-links",
    "actionStrategy": "cross-app-launchpad-switcher",
    "utilityElements": "top-parent-company-brand-strip",
    "mobileBehavior": "slide-down-menu-panel",
    "density": "dense",
    "visualSurface": "duotone-ecosystem-header",
    "heightProfile": "multi-tier-96px",
    "purposes": [
      "cross-brand-routing",
      "ecosystem-retention",
      "unified-presence"
    ],
    "designFamily": "holding-corporation",
    "audienceFit": [
      "multi-product-users",
      "enterprise-clients"
    ],
    "industryFit": [
      "media-conglomerates",
      "product-studios",
      "cloud-suites"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "slate-navy-cyan",
    "capabilities": [
      "site-logo",
      "site-name",
      "link",
      "badge",
      "button",
      "navigation-menu"
    ]
  },
  {
    "id": "navbar-19-streaming-media-player",
    "name": "Streaming Audio & Podcast Bar",
    "navbarModel": "media-podcast",
    "layoutFamily": "player-embedded-header",
    "brandAlignment": "left",
    "navigationPattern": "season-episode-archive-links",
    "actionStrategy": "subscribe-apple-spotify-badges",
    "utilityElements": "persistent-mini-audio-player",
    "mobileBehavior": "bottom-app-bar-with-search",
    "density": "compact",
    "visualSurface": "glassmorphism-blur",
    "heightProfile": "balanced-64px",
    "purposes": [
      "content-listening",
      "subscriber-growth",
      "streaming-media"
    ],
    "designFamily": "broadcast-creator",
    "audienceFit": [
      "listeners",
      "fans",
      "subscribers"
    ],
    "industryFit": [
      "podcasts",
      "audio-networks",
      "music-creators"
    ],
    "visualIntensity": "bold",
    "colorDirection": "obsidian-neon-purple",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "badge",
      "link",
      "text"
    ]
  },
  {
    "id": "navbar-20-realestate-mls-search",
    "name": "Real Estate MLS Property Search Bar",
    "navbarModel": "real-estate",
    "layoutFamily": "inline-search-filter-header",
    "brandAlignment": "left",
    "navigationPattern": "buy-rent-sell-neighborhood-links",
    "actionStrategy": "list-property-cta-button",
    "utilityElements": "zip-mls-inline-search-filter",
    "mobileBehavior": "bottom-sheet-drawer",
    "density": "spacious",
    "visualSurface": "elevated-double-bordered-surface",
    "heightProfile": "prominent-80px",
    "purposes": [
      "property-search",
      "agent-contact",
      "listings"
    ],
    "designFamily": "proptech-brokerage",
    "audienceFit": [
      "homebuyers",
      "renters",
      "real-estate-agents"
    ],
    "industryFit": [
      "real-estate",
      "property-management",
      "proptech"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "slate-emerald-white",
    "capabilities": [
      "site-logo",
      "site-name",
      "input",
      "button",
      "link",
      "navigation-menu"
    ]
  }
];

export const BATCH_5_NAVBAR_FINGERPRINTS: NavbarFingerprint[] = [
  {
    "id": "navbar-21-automotive-configurator",
    "name": "Automotive Configurator & Dealer Bar",
    "navbarModel": "automotive",
    "layoutFamily": "model-selector-stepped-bar",
    "brandAlignment": "center",
    "navigationPattern": "vehicle-model-lineup-tabs",
    "actionStrategy": "build-and-price-configurator-pill",
    "utilityElements": "find-dealer-test-drive-link",
    "mobileBehavior": "horizontal-scroll-pill-rail",
    "density": "spacious",
    "visualSurface": "dark-carbon-metallic",
    "heightProfile": "spacious-72px",
    "purposes": [
      "vehicle-configuration",
      "test-drive-lead",
      "brand-hero"
    ],
    "designFamily": "automotive-performance",
    "audienceFit": [
      "car-buyers",
      "fleet-managers",
      "enthusiasts"
    ],
    "industryFit": [
      "ev-automakers",
      "luxury-vehicles",
      "dealerships"
    ],
    "visualIntensity": "high",
    "colorDirection": "monochrome-carbon-red-accent",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "link",
      "badge",
      "navigation-menu"
    ]
  },
  {
    "id": "navbar-22-dashboard-workspace-header",
    "name": "SaaS App Workspace & Breadcrumb Bar",
    "navbarModel": "web-application",
    "layoutFamily": "breadcrumb-workspace-rail",
    "brandAlignment": "none-symbol-only",
    "navigationPattern": "deep-route-breadcrumbs-path",
    "actionStrategy": "user-avatar-and-notifications",
    "utilityElements": "org-workspace-switcher-select",
    "mobileBehavior": "compact-icon-dock",
    "density": "dense",
    "visualSurface": "solid-surface-shadow-sm",
    "heightProfile": "ultra-compact-48px",
    "purposes": [
      "app-navigation",
      "workspace-context",
      "account-settings"
    ],
    "designFamily": "cloud-dashboard",
    "audienceFit": [
      "active-users",
      "team-admins"
    ],
    "industryFit": [
      "saas-platforms",
      "project-management",
      "analytics"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "slate-neutral-blue",
    "capabilities": [
      "avatar",
      "button",
      "badge",
      "link",
      "text",
      "icon"
    ]
  },
  {
    "id": "navbar-23-crowdfunding-progress",
    "name": "Crowdfunding Project Backer Header",
    "navbarModel": "crowdfunding",
    "layoutFamily": "progress-anchored-backer-bar",
    "brandAlignment": "left",
    "navigationPattern": "story-reward-faq-tab-links",
    "actionStrategy": "back-project-pledge-button",
    "utilityElements": "embedded-funding-goal-progress-bar",
    "mobileBehavior": "sticky-progress-footer-bar",
    "density": "dense",
    "visualSurface": "duotone-contrast-strip",
    "heightProfile": "multi-tier-92px",
    "purposes": [
      "backer-conversion",
      "campaign-updates",
      "social-proof"
    ],
    "designFamily": "crowdfunding-creator",
    "audienceFit": [
      "backers",
      "early-adopters",
      "investors"
    ],
    "industryFit": [
      "hardware-startups",
      "indie-games",
      "kickstarter-projects"
    ],
    "visualIntensity": "high",
    "colorDirection": "emerald-amber-dark",
    "capabilities": [
      "site-logo",
      "site-name",
      "badge",
      "button",
      "link",
      "text"
    ]
  },
  {
    "id": "navbar-24-legal-counsel-advisory",
    "name": "Legal Counsel & Practice Direct Bar",
    "navbarModel": "legal-counsel",
    "layoutFamily": "attorney-advisory-ledger",
    "brandAlignment": "left",
    "navigationPattern": "practice-areas-attorney-links",
    "actionStrategy": "confidential-consultation-request",
    "utilityElements": "emergency-advisory-hotline-badge",
    "mobileBehavior": "off-canvas-drawer",
    "density": "balanced",
    "visualSurface": "classic-parchment-border",
    "heightProfile": "spacious-72px",
    "purposes": [
      "legal-intake",
      "practice-authority",
      "attorney-access"
    ],
    "designFamily": "corporate-counsel",
    "audienceFit": [
      "corporate-counsel",
      "litigants",
      "founders"
    ],
    "industryFit": [
      "law-firms",
      "ip-attorneys",
      "advisory-partners"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "navy-gold-linen",
    "capabilities": [
      "site-name",
      "navigation-menu",
      "button",
      "link",
      "text"
    ]
  },
  {
    "id": "navbar-25-web3-community-ticker",
    "name": "Web3 Token Ticker & Wallet Bar",
    "navbarModel": "web3-defi",
    "layoutFamily": "ticker-embedded-crypto-header",
    "brandAlignment": "split",
    "navigationPattern": "protocol-governance-docs-links",
    "actionStrategy": "connect-wallet-web3-button",
    "utilityElements": "live-token-price-gas-tracker",
    "mobileBehavior": "bottom-app-bar-with-search",
    "density": "dense",
    "visualSurface": "neon-cyan-dark-border",
    "heightProfile": "ultra-compact-48px",
    "purposes": [
      "wallet-connection",
      "defi-interaction",
      "token-tracking"
    ],
    "designFamily": "crypto-protocol",
    "audienceFit": [
      "crypto-natives",
      "dao-members",
      "traders"
    ],
    "industryFit": [
      "defi",
      "web3",
      "dao-tooling"
    ],
    "visualIntensity": "bold",
    "colorDirection": "obsidian-cyan-violet",
    "capabilities": [
      "site-name",
      "badge",
      "button",
      "link",
      "text"
    ]
  }
];

export const BATCH_6_NAVBAR_FINGERPRINTS: NavbarFingerprint[] = [
  {
    "id": "navbar-26-segmented-horizon-tabs",
    "name": "Segmented Section Horizon Tabs Header",
    "navbarModel": "product-tour",
    "layoutFamily": "segmented-tab-docked-header",
    "brandAlignment": "left",
    "navigationPattern": "pill-segmented-dock-links",
    "actionStrategy": "start-product-tour-cta",
    "utilityElements": "active-section-step-indicator",
    "mobileBehavior": "horizontal-scroll-pill-rail",
    "density": "airy",
    "visualSurface": "segmented-sunken-well",
    "heightProfile": "standard-56px",
    "purposes": [
      "tour-navigation",
      "feature-switching",
      "conversion"
    ],
    "designFamily": "modern-saas-showcase",
    "audienceFit": [
      "evaluators",
      "product-buyers"
    ],
    "industryFit": [
      "saas",
      "hardware-showcases",
      "interactive-demos"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "slate-indigo-light",
    "capabilities": [
      "site-logo",
      "site-name",
      "button",
      "badge",
      "link"
    ]
  },
  {
    "id": "navbar-27-transparent-hero-overlay",
    "name": "Full-Bleed Transparent Hero Overlay Header",
    "navbarModel": "brand-landing",
    "layoutFamily": "flush-transparent-overlay-bar",
    "brandAlignment": "left",
    "navigationPattern": "high-contrast-ghost-links",
    "actionStrategy": "frosted-glass-pill-button",
    "utilityElements": "gradient-vignette-contrast-shadow",
    "mobileBehavior": "full-screen-curtain",
    "density": "spacious",
    "visualSurface": "transparent-overlay",
    "heightProfile": "prominent-80px",
    "purposes": [
      "hero-immersion",
      "brand-impact",
      "cinematic-landing"
    ],
    "designFamily": "apple-cinematic",
    "audienceFit": [
      "consumers",
      "tech-buyers"
    ],
    "industryFit": [
      "hardware-launches",
      "automotive",
      "luxury-tech"
    ],
    "visualIntensity": "bold",
    "colorDirection": "transparent-white-dark-shadow",
    "capabilities": [
      "site-logo",
      "site-name",
      "navigation-menu",
      "button",
      "link"
    ]
  },
  {
    "id": "navbar-28-b2b-trade-multilingual",
    "name": "Global Trade Dual-Language Header",
    "navbarModel": "global-logistics",
    "layoutFamily": "bilateral-trade-port-header",
    "brandAlignment": "split",
    "navigationPattern": "freight-customs-port-links",
    "actionStrategy": "track-shipment-quick-input",
    "utilityElements": "dual-language-switcher-en-zh",
    "mobileBehavior": "bilingual-switch-drawer",
    "density": "dense",
    "visualSurface": "harbor-industrial-ledger",
    "heightProfile": "multi-tier-96px",
    "purposes": [
      "freight-tracking",
      "international-trade",
      "customs-portal"
    ],
    "designFamily": "global-shipping",
    "audienceFit": [
      "importers",
      "logistics-directors",
      "freight-forwarders"
    ],
    "industryFit": [
      "maritime-shipping",
      "customs-brokerage",
      "supply-chain"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "navy-amber-steel",
    "capabilities": [
      "site-logo",
      "site-name",
      "language-switcher",
      "input",
      "button",
      "link"
    ]
  },
  {
    "id": "navbar-29-micro-rail-floating",
    "name": "Compact Floating Micro-Rail",
    "navbarModel": "minimal-portfolio",
    "layoutFamily": "micro-dock-island-capsule",
    "brandAlignment": "none-symbol-only",
    "navigationPattern": "icon-only-tooltip-links",
    "actionStrategy": "direct-contact-modal-trigger",
    "utilityElements": "quick-theme-light-dark-toggle",
    "mobileBehavior": "compact-icon-dock",
    "density": "compact",
    "visualSurface": "glassmorphism-blur",
    "heightProfile": "ultra-compact-44px",
    "purposes": [
      "portfolio-minimalism",
      "quick-dock",
      "personal-brand"
    ],
    "designFamily": "minimal-dock",
    "audienceFit": [
      "designers",
      "engineers",
      "freelancers"
    ],
    "industryFit": [
      "design-portfolios",
      "personal-sites",
      "dev-blogs"
    ],
    "visualIntensity": "subtle",
    "colorDirection": "dark-glass-white",
    "capabilities": [
      "theme-switcher",
      "button",
      "link",
      "icon"
    ]
  },
  {
    "id": "navbar-30-member-community-hub",
    "name": "Member Club & Community Portal Header",
    "navbarModel": "membership",
    "layoutFamily": "community-status-badge-header",
    "brandAlignment": "center",
    "navigationPattern": "forum-event-directory-links",
    "actionStrategy": "join-member-club-pill-button",
    "utilityElements": "live-online-member-count-pill",
    "mobileBehavior": "floating-bottom-dock",
    "density": "spacious",
    "visualSurface": "forest-glass-glow",
    "heightProfile": "spacious-72px",
    "purposes": [
      "community-engagement",
      "membership-conversion",
      "directory"
    ],
    "designFamily": "private-member-club",
    "audienceFit": [
      "members",
      "club-patrons",
      "community-leaders"
    ],
    "industryFit": [
      "private-clubs",
      "alumni-associations",
      "creator-communities"
    ],
    "visualIntensity": "moderate",
    "colorDirection": "forest-gold-ivory",
    "capabilities": [
      "site-logo",
      "site-name",
      "badge",
      "button",
      "link",
      "navigation-menu"
    ]
  }
];

export const CURATED_NAVBAR_FINGERPRINTS_ALL: NavbarFingerprint[] = [
  ...BATCH_1_NAVBAR_FINGERPRINTS,
  ...BATCH_2_NAVBAR_FINGERPRINTS,
  ...BATCH_3_NAVBAR_FINGERPRINTS,
  ...BATCH_4_NAVBAR_FINGERPRINTS,
  ...BATCH_5_NAVBAR_FINGERPRINTS,
  ...BATCH_6_NAVBAR_FINGERPRINTS,
];
