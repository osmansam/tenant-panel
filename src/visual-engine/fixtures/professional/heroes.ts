import { design } from "./builders";

export const HERO_STARTERS = [
  design("saas-workspace-hero", "SaaS workspace · split hero", b => [
    b.grid([
      b.stack([b.eyebrow("THE CALMER WAY TO WORK"), b.heading("Less busywork.\nMore momentum."), b.text("Bring projects, people, and decisions into one thoughtfully organized workspace."), b.row([b.button("Explore the workspace", "/product"), b.button("Talk to us", "mailto:hello@example.com", true)]), b.line(), b.text("One shared view. Every team moving forward.", { typography: { size: "sm" } })]),
      b.panel([b.row([b.eyebrow("WORKSPACE / OVERVIEW"), b.text("This week")]), b.heading("A good week, in focus.", "2xl"), b.grid([b.panel([b.heading("12", "2xl"), b.text("Projects in motion")]), b.panel([b.heading("86%", "2xl"), b.text("Milestones on track")])], [6, 6], [6, 6]), b.line(), b.text("PRODUCT LAUNCH  /  In review"), b.text("WEBSITE REFRESH  /  On track"), b.text("CUSTOMER RESEARCH  /  Complete")]),
    ], [6, 6], [12, 12]),
  ]),
  design("editorial-journal-hero", "Editorial journal · cover story", b => [
    b.row([b.eyebrow("FORM & FIELD"), b.text("An independent journal  /  Issue 08")]), b.line(),
    b.grid([b.stack([b.text("DESIGN / CULTURE / PEOPLE"), b.heading("A slower way\nto see the world.", "6xl", { typography: { family: "serif", size: "6xl", weight: "normal", leading: "tight" } }), b.text("Ideas worth sitting with. Stories about the places we shape, and the places that shape us."), b.button("Read the journal", "/journal")]), b.image("/visual-builder/architecture-study.svg", "Architectural study of warm geometric arches", "portrait")], [7, 5]),
    b.grid([b.text("01  /  The art of noticing"), b.text("02  /  Spaces for belonging"), b.text("03  /  Objects with a story")], [4, 4, 4]),
  ]),
  design("product-device-hero", "Product showcase · centered launch", b => [
    b.stack([b.eyebrow("INTRODUCING CLARITY"), b.heading("Your next big idea.\nA clearer picture."), b.text("Turn scattered data into a shared understanding. Built for the decisions that matter."), b.row([b.button("Discover Clarity", "/product"), b.button("See how it works", "/demo", true)])], { sizing: { maxWidth: "3xl", align: "center" }, typography: { align: "center" } }),
    b.image("/visual-builder/hero-product.svg", "Product analytics dashboard with performance charts", "wide"),
    b.grid([b.stack([b.heading("Connect", "xl"), b.text("Bring your sources together.")]), b.stack([b.heading("Understand", "xl"), b.text("Find the signal in the noise.")]), b.stack([b.heading("Act", "xl"), b.text("Move forward with confidence.")])], [4, 4, 4]),
  ]),
  design("studio-manifesto-hero", "Creative studio · manifesto", b => [
    b.row([b.eyebrow("NORTH / INDEPENDENT DESIGN STUDIO"), b.text("Strategy. Identity. Digital.")]),
    b.heading("Good brands\nmove people.", "6xl"), b.line(),
    b.grid([b.stack([b.text("We bring clarity to ambitious ideas, building brands and digital experiences with substance."), b.row([b.button("View selected work", "/work"), b.button("Start a conversation", "mailto:hello@example.com", true)])]), b.stack([b.eyebrow("OUR APPROACH"), b.heading("Small team.\nShared ambition.", "2xl"), b.text("From the first question to the final detail, we work as an extension of your team.")])], [8, 4], [7, 5]),
  ], true),
  design("ai-copilot-hero", "AI Copilot · Intelligence launch hero", b => [
    b.grid([
      b.stack([
        b.row([b.shimmerBadge("✦ AUTONOMOUS COGNITIVE AGENTS"), b.text("v3.4 Release", { typography: { size: "sm" } })]),
        b.shimmerHeading("Intelligence that works alongside your engineering team.", "6xl", "#38bdf8", "#ffffff"),
        b.text("Coordinate autonomous AI agents across codebases, infrastructure, and deployment pipelines with mathematical determinism and real-time observability.", { typography: { size: "lg", leading: "relaxed" } }),
        b.row([b.magneticButton("Deploy your first agent", "/signup"), b.button("Read architectural RFC", "/docs/architecture", true)]),
        b.line(),
        b.row([b.text("✓ SOC2 Type II Certified", { typography: { size: "sm" } }), b.text("✓ Sub-20ms inference streaming", { typography: { size: "sm" } }), b.text("✓ Air-gapped VPC support", { typography: { size: "sm" } })]),
      ], { spacing: { gap: "lg" } }),
      b.glassPanel([
        b.row([b.shimmerBadge("LIVE AGENT STREAM"), b.text("Status: Active", { typography: { size: "sm" } })]),
        b.heading("Multi-Agent Orchestration", "2xl"),
        b.panel([b.eyebrow("SYSTEM PROMPT EVALUATION"), b.text("“Analyzing repository AST dependencies across 14 services... Generating optimal migration strategy with 0 breaking schema changes.”")]),
        b.grid([b.panel([b.heading("3.8×", "2xl"), b.text("Throughput velocity")]), b.panel([b.heading("99.98%", "2xl"), b.text("Deterministic recall")])], [6, 6], [6, 6]),
        b.line(),
        b.row([b.button("View execution trace", "/traces", true), b.text("Simulated telemetry pipeline", { typography: { size: "sm" } })]),
      ]),
    ], [7, 5], [12, 12]),
  ], true, {
    effectId: "reactbits.background.galaxy",
    props: { starSpeed: 0.4, density: 1.2, hueShift: 185, speed: 0.8, mouseInteraction: true, glowIntensity: 0.4, saturation: 0.2, mouseRepulsion: true, repulsionStrength: 2.5, twinkleIntensity: 0.4, rotationSpeed: 0.08, autoCenterRepulsion: 0, transparent: true, lightMode: false },
  }),
  design("agency-aurora-hero", "Creative studio · Aurora showcase", b => [
    b.stack([
      b.shimmerBadge("STUDIO PROTOCOL · EST. 2026"),
      b.shimmerHeading("We engineer digital sensations that define new cultural eras.", "6xl", "#fbbf24", "#ffffff", { typography: { size: "6xl", align: "center", leading: "tight" } }),
      b.text("An independent studio crafting brands, tactile software, and spatial interfaces for visionary founders pushing human curiosity forward.", { typography: { size: "xl", align: "center", leading: "relaxed" }, sizing: { maxWidth: "3xl", align: "center" } }),
      b.row([b.magneticButton("Explore our monograph", "/monograph"), b.button("Initiate a dialogue", "mailto:curator@example.com", true)]),
    ], { sizing: { maxWidth: "4xl", align: "center" }, typography: { align: "center" } }),
    b.grid([
      b.panel([b.heading("24+", "4xl"), b.eyebrow("INTERNATIONAL AWARDS"), b.text("Cannes Lion, D&AD, Awwwards Site of the Year")]),
      b.panel([b.heading("60M+", "4xl"), b.eyebrow("GLOBAL ACTIVE USERS"), b.text("Products conceived, branded, and delivered by our team")]),
      b.panel([b.heading("100%", "4xl"), b.eyebrow("INDEPENDENT OWNERSHIP"), b.text("Uncompromised aesthetic and engineering execution")]),
    ], [4, 4, 4], [12, 12, 12]),
  ], true, {
    effectId: "reactbits.background.aurora",
    props: { colorA: "#0d9488", colorB: "#f59e0b", speed: 1.2, intensity: 1.1, blend: 0.6 },
  }),
  design("developer-terminal-hero", "Developer runtime · CLI command studio", b => [
    b.grid([
      b.stack([
        b.row([b.shimmerBadge("TERMINAL-FIRST TOOLCHAIN"), b.text("Rust · TypeScript · Go · Python")]),
        b.shimmerHeading("Build at terminal velocity.\nDeploy with zero ceremony.", "6xl", "#34d399", "#ffffff"),
        b.text("A unified compiler, debugger, and deploy engine designed for engineers who appreciate clean Unix abstractions and uncompromising speed."),
        b.row([b.magneticButton("Read Quickstart Guide", "/quickstart"), b.button("Star on GitHub", "https://github.com", true)]),
        b.line(),
        b.stack([b.text("✓ Zero-runtime type-checking in 12ms"), b.text("✓ Automatic edge API route generation"), b.text("✓ Integrated SQLite / libSQL branching")], {}, "sm"),
      ], { spacing: { gap: "lg" } }),
      b.glassPanel([
        b.row([b.eyebrow("BASH // OZMI RUNTIME"), b.text("bash 5.2.15", { typography: { size: "sm" } })]),
        b.panel([
          b.text("$ npx ozmishow@latest create-app my-service", { typography: { family: "system", size: "sm" }, color: { text: "primary" } }),
          b.text("✓ Scaffolded 12 microservices with strict schema contracts"),
          b.text("✓ Booted isolated sandbox in 48ms"),
          b.text("✓ Deployed edge endpoints to 180 regions"),
          b.text("➜ Ready: https://my-service.ozmi.run", { color: { text: "accent" } }),
        ]),
        b.line(),
        b.grid([b.stack([b.eyebrow("CLI BINARY"), b.text("Single static 14MB file")]), b.stack([b.eyebrow("COLD BOOT"), b.text("< 3ms anywhere on Earth")])], [6, 6]),
      ]),
    ], [7, 5], [12, 12]),
  ], true, {
    effectId: "reactbits.background.dark-veil",
    props: { hueShift: 165, noiseIntensity: 0.12, scanlineIntensity: 0.25, speed: 0.5, scanlineFrequency: 25, warpAmount: 0.08, resolutionScale: 1, lightMode: false },
  }),
  design("fintech-liquidity-launchpad", "Fintech · Digital asset protocol hero", b => [
    b.grid([
      b.stack([
        b.row([b.shimmerBadge("INSTITUTIONAL LIQUIDITY PROTOCOL"), b.text("Audited by OpenZeppelin")]),
        b.shimmerHeading("Institutional capital efficiency at internet scale.", "6xl", "#38bdf8", "#ffffff"),
        b.text("Access automated liquidity pools, zero-slippage cross-chain settlement, and programmatic treasury yield through verifiable cryptographic smart contracts."),
        b.row([b.magneticButton("Launch Liquidity App", "/app"), b.button("Read whitepaper", "/whitepaper.pdf", true)]),
        b.line(),
        b.grid([b.stack([b.eyebrow("SECURITY RATING"), b.heading("AAA+", "xl")]), b.stack([b.eyebrow("TREASURY AUDIT"), b.heading("100% On-chain", "xl")]), b.stack([b.eyebrow("SETTLEMENT"), b.heading("< 400ms", "xl")])], [4, 4, 4]),
      ], { spacing: { gap: "lg" } }),
      b.glassPanel([
        b.row([b.eyebrow("VAULT OVERVIEW"), b.shimmerBadge("LIVE METRICS")]),
        b.heading("$4,829,140,290", "4xl"),
        b.text("Total Value Locked across validated pools"),
        b.line(),
        b.grid([b.panel([b.eyebrow("USDC POOL"), b.heading("14.2% APY", "xl"), b.text("$2.1B Deposited")]), b.panel([b.eyebrow("ETH POOL"), b.heading("8.6% APY", "xl"), b.text("740k ETH Staked")])], [6, 6], [6, 6]),
        b.line(),
        b.row([b.button("Connect Web3 Wallet", "/connect"), b.text("Multi-signature vault protection active", { typography: { size: "sm" } })]),
      ]),
    ], [7, 5], [12, 12]),
  ], true, {
    effectId: "reactbits.background.iridescence",
    props: { color: "#0ea5e9", speed: 0.8, amplitude: 0.15, mouseReact: true },
  }),
];
