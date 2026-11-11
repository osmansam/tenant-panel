import { design } from "./builders";

export const FEATURE_STARTERS = [
  design("feature-bento", "Platform features · bento grid", b => [
    b.intro("BUILT TO FIT TOGETHER", "One platform. Fewer moving parts.", "The essentials your team needs, connected by design."),
    b.grid([
      b.panel([b.eyebrow("01 / A SHARED SOURCE OF TRUTH"), b.heading("Everything in its place.", "2xl"), b.text("Keep conversations, project context, and next steps together."), b.line(), b.grid([b.text("PROJECTS\nA clear path forward"), b.text("KNOWLEDGE\nAnswers close at hand")], [6, 6])], true),
      b.panel([b.eyebrow("02 / LESS REPETITION"), b.heading("Make room for focus.", "2xl"), b.text("Create repeatable workflows that take routine work off your plate.")]),
      b.panel([b.eyebrow("03 / CLEAR OWNERSHIP"), b.heading("Know what’s next.", "xl"), b.text("Every task has an owner. Every milestone has a home.")]),
      b.panel([b.eyebrow("04 / BUILT FOR COLLABORATION"), b.heading("Move together, wherever you work.", "2xl"), b.row([b.text("Shared plans"), b.text("Thoughtful updates"), b.text("Visible progress")])]),
    ], [8, 4, 4, 8], [12, 12, 6, 6]),
  ]),
  design("feature-workflow", "How it works · three-step process", b => [
    b.grid([b.intro("FROM IDEA TO IMPACT", "A better workflow starts here."), b.text("Start small, bring your team along, and build a rhythm that works for you.")], [8, 4]),
    b.line(),
    b.grid([
      b.stack([b.eyebrow("01 — CONNECT"), b.heading("Bring it together.", "2xl"), b.text("Connect your tools and gather the information your team needs."), b.line(), b.text("Your context, in one place.")]),
      b.stack([b.eyebrow("02 — ORGANIZE"), b.heading("Make a clear plan.", "2xl"), b.text("Set priorities, assign ownership, and agree on what success looks like."), b.line(), b.text("Clarity for every contributor.")]),
      b.stack([b.eyebrow("03 — DELIVER"), b.heading("Keep moving forward.", "2xl"), b.text("Track progress, share feedback, and learn from each milestone."), b.line(), b.text("Better work, every week.")]),
    ], [4, 4, 4]), b.row([b.button("Find your starting point", "/getting-started")]),
  ]),
  design("feature-split-detail", "Product detail · alternating features", b => [
    b.grid([b.image("/visual-builder/hero-product.svg", "Editable product dashboard illustration"), b.stack([b.eyebrow("SEE THE BIG PICTURE"), b.heading("Clarity without\nthe complexity."), b.text("Give everyone a clear view of the work, without another status meeting."), b.text("✓ Flexible views for different roles"), b.text("✓ Context attached to every decision"), b.button("Explore the product", "/product")])], [7, 5], [12, 12]),
    b.line(),
    b.grid([b.stack([b.eyebrow("MAKE IT YOURS"), b.heading("Built around\nyour process.", "2xl"), b.text("Adapt the workspace to your team, with simple building blocks that grow with you.")]), b.panel([b.eyebrow("YOUR WORKFLOW"), b.row([b.text("Capture →"), b.text("Review →"), b.text("Deliver")]), b.line(), b.text("A flexible foundation, not a fixed way of working.")], true)], [5, 7]),
  ]),
  design("cyber-bento-features", "Cloud platform · Interactive cyber bento", b => [
    b.grid([
      b.intro("DISTRIBUTED CLOUD FABRIC", "Infrastructure built for instant global reach.", "Eliminate latency and complex Kubernetes orchestration with our unified serverless edge mesh."),
      b.row([b.shimmerBadge("MULTI-REGION READY"), b.text("Global edge clusters online in 180+ regions")]),
    ], [8, 4], [12, 12]),
    b.line(),
    b.grid([
      b.glassPanel([
        b.row([b.eyebrow("01 / EDGE RUNTIME"), b.shimmerBadge("GLOBAL MESH")]),
        b.shimmerHeading("Sub-millisecond Cold Starts", "2xl", "#38bdf8", "#ffffff"),
        b.text("V8 isolates boot under 2ms globally. Your edge compute runs right next to your end user with instantaneous worldwide replication."),
        b.line(),
        b.grid([b.text("MEMORY\n128MB to 32GB"), b.text("CONCURRENCY\nZero queue saturation")], [6, 6]),
      ]),
      b.glassPanel([
        b.eyebrow("02 / REALTIME TELEMETRY"),
        b.heading("0.34ms", "6xl"),
        b.text("Median worldwide packet transit"),
        b.line(),
        b.text("Automated BGP routing optimization"),
      ], true),
      b.glassPanel([
        b.eyebrow("03 / ZERO-TRUST SECURITY"),
        b.heading("Quantum-grade mTLS", "2xl"),
        b.text("Automated certificate rotation and hardware key isolation at every ingress endpoint."),
      ]),
      b.glassPanel([
        b.row([b.eyebrow("04 / DEVELOPER SDK"), b.shimmerBadge("INSTANT CLI")]),
        b.shimmerHeading("Unified CLI & GitOps Engine", "2xl", "#34d399", "#ffffff"),
        b.text("Deploy with git push origin main. Instant previews, branch databases, and immutable canary deployments on every pull request."),
        b.row([b.magneticButton("Install CLI", "/cli"), b.button("Explore API specifications", "/docs/api", true)]),
      ]),
    ], [8, 4, 4, 8], [12, 12, 12, 12]),
  ], true, {
    effectId: "reactbits.background.dot-grid",
    props: { dotSize: 3, gap: 22, baseColor: "#0f172a", activeColor: "#38bdf8", proximity: 130, speedTrigger: 100, shockRadius: 220, shockStrength: 4, maxSpeed: 4000, resistance: 750, returnDuration: 1.5 },
  }),
  design("cinematic-media-spotlight", "Media platform · Cinematic stream spotlight", b => [
    b.stack([
      b.shimmerBadge("ULTRA-HIGH BITRATE STREAMING"),
      b.shimmerHeading("Studio fidelity delivered to every screen.", "6xl", "#fbbf24", "#ffffff", { typography: { align: "center", size: "6xl" } }),
      b.text("Stream losslessly encoded 4K HDR video and immersive Dolby Atmos audio across global CDN backbones with zero re-buffering.", { typography: { size: "xl", align: "center" }, sizing: { maxWidth: "3xl", align: "center" } }),
      b.row([b.magneticButton("Watch Showcase Stream", "/stream/watch"), b.button("Broadcast API Specs", "/docs/streaming", true)]),
    ], { sizing: { maxWidth: "4xl", align: "center" }, typography: { align: "center" } }),
    b.glassPanel([
      b.row([b.shimmerBadge("LIVE PREVIEW // 4K 60FPS"), b.text("Codec: AV1 / Opus 320kbps", { typography: { size: "sm" } })]),
      b.grid([
        b.panel([b.heading("Spatial Soundscape", "2xl"), b.text("Binaural real-time sound spatialization calibrated dynamically for web browsers.")]),
        b.panel([b.heading("Zero Re-buffer Engine", "2xl"), b.text("Adaptive predictive segment caching anticipating network fluctuations before they happen.")]),
      ], [6, 6], [6, 6]),
    ]),
  ], true, {
    effectId: "reactbits.background.light-rays",
    props: { colorA: "#ffffff", speed: 0.9, intensity: 1.3, rayLength: 2.8, fadeDistance: 1.4, followMouse: true, pointerStrength: 0.12 },
  }),
];
