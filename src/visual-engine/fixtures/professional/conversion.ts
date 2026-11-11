import { design } from "./builders";

export const CONVERSION_STARTERS = [
  design("pricing-three-tiers", "Pricing · three clear tiers", b => [
    b.intro("SIMPLE, FLEXIBLE PRICING", "The right fit for your next chapter.", "Start with what you need today. Make room for what comes next."),
    b.grid([
      b.panel([b.eyebrow("STARTER"), b.heading("$19", "4xl"), b.text("per month / for independent work"), b.line(), b.text("✓ 3 active projects"), b.text("✓ Essential reporting"), b.text("✓ Community support"), b.button("Choose Starter", "/signup?plan=starter", true)]),
      b.panel([b.eyebrow("GROWTH / MOST POPULAR"), b.heading("$49", "4xl"), b.text("per month / for growing teams"), b.line(), b.text("✓ Unlimited projects"), b.text("✓ Shared team workspace"), b.text("✓ Advanced reporting"), b.text("✓ Priority support"), b.button("Choose Growth", "/signup?plan=growth")], true),
      b.panel([b.eyebrow("SCALE"), b.heading("Let’s talk", "4xl"), b.text("a tailored plan / for your organization"), b.line(), b.text("✓ Custom onboarding"), b.text("✓ Dedicated point of contact"), b.text("✓ Flexible account structure"), b.button("Contact sales", "mailto:sales@example.com", true)]),
    ], [4, 4, 4], [12, 12, 12]), b.text("Illustrative plans and prices. Replace with your own offer before publishing.", { typography: { size: "sm" } }),
  ]),
  design("pricing-enterprise", "Pricing · enterprise partnership", b => [
    b.grid([b.stack([b.eyebrow("FOR YOUR NEXT STAGE"), b.heading("Not one-size-fits-all.\nBuilt to fit you."), b.text("A partnership shaped around your people, your workflows, and your ambitions."), b.button("Design your plan", "mailto:sales@example.com")]), b.panel([b.eyebrow("WHAT’S INCLUDED"), b.heading("An extension of your team.", "2xl"), ...["A guided start", "A workspace that fits", "Support when it matters"].map((title, i) => b.stack([b.line(), b.heading(title, "xl"), b.text(["Plan your rollout with a dedicated onboarding partner.", "Configure the essentials around your existing workflow.", "Get a clear path to the answers and expertise you need."][i])]))])], [5, 7], [12, 12]),
    b.line(), b.row([b.eyebrow("LET’S FIND THE RIGHT FIT"), b.text("Tell us about your team. We’ll take it from there.")]),
  ]),
  design("cta-launch", "Call to action · launch banner", b => [
    b.grid([b.stack([b.eyebrow("YOUR NEXT CHAPTER STARTS HERE"), b.heading("Make room for\nbetter work."), b.text("A clearer process. A more connected team. A little more space to do your best work.")]), b.stack([b.button("Get started", "/signup"), b.button("Ask a question", "mailto:hello@example.com", true), b.text("Start at your own pace.", { typography: { size: "sm" }, color: { text: "inverse-muted" } })], { spacing: { paddingTop: "xl" } })], [8, 4], [8, 4]),
  ], true),
  design("cta-consultation", "Call to action · consultation invitation", b => [
    b.line(), b.grid([b.eyebrow("LET’S TALK / 30 MINUTES"), b.stack([b.heading("A good conversation\ncan change the direction."), b.text("Bring your challenge. We’ll bring a fresh perspective, a few useful questions, and a clear next step."), b.row([b.button("Book an introduction", "mailto:hello@example.com?subject=Introduction"), b.text("No pitch deck required.")])])], [3, 9], [4, 8]), b.line(),
  ]),
  design("glassmorphic-pricing-matrix", "Pricing · Glassmorphic tier matrix", b => [
    b.stack([
      b.shimmerBadge("TRANSPARENT, DETERMINISTIC PRICING"),
      b.shimmerHeading("Predictable pricing for high-velocity teams.", "4xl", "#2dd4bf", "#ffffff", { typography: { align: "center" } }),
      b.text("Start free. Upgrade as your workloads scale. No artificial seat taxes or surprise bandwidth invoices.", { typography: { size: "lg", align: "center" }, sizing: { maxWidth: "2xl", align: "center" } }),
    ], { sizing: { maxWidth: "3xl", align: "center" }, typography: { align: "center" } }),
    b.grid([
      b.glassPanel([
        b.eyebrow("DEVELOPER"),
        b.heading("$0", "6xl"),
        b.text("Free forever / Solo creators"),
        b.line(),
        b.text("✓ 3 production projects"),
        b.text("✓ 100k edge invocations/mo"),
        b.text("✓ Community Discord access"),
        b.text("✓ Standard SSL certificates"),
        b.button("Get started free", "/signup", true),
      ]),
      b.glassPanel([
        b.row([b.eyebrow("PRO TEAM"), b.shimmerBadge("MOST POPULAR")]),
        b.shimmerHeading("$49", "6xl", "#fbbf24", "#ffffff"),
        b.text("per seat / billed monthly"),
        b.line(),
        b.text("✓ Unlimited edge services"),
        b.text("✓ 10M edge invocations/mo"),
        b.text("✓ Sub-second staging branch builds"),
        b.text("✓ Priority 15-minute SLA support"),
        b.text("✓ Custom vanity domains"),
        b.magneticButton("Upgrade to Pro", "/signup?tier=pro"),
      ], true),
      b.glassPanel([
        b.eyebrow("GLOBAL ENTERPRISE"),
        b.heading("Tailored", "4xl"),
        b.text("Custom volume & security SLAs"),
        b.line(),
        b.text("✓ Custom VPC & dedicated hardware"),
        b.text("✓ Unlimited bandwidth pooling"),
        b.text("✓ 99.999% uptime financial guarantee"),
        b.text("✓ Dedicated technical account lead"),
        b.text("✓ Single Sign-On (SAML / Okta)"),
        b.button("Contact Solutions Architect", "mailto:enterprise@example.com", true),
      ]),
    ], [4, 4, 4], [12, 12, 12]),
    b.row([b.text("All plans include 30-day money-back guarantee · Cancel anytime · SOC2 Type II Certified", { typography: { size: "sm", align: "center" } })]),
  ], true, {
    effectId: "reactbits.background.color-bends",
    props: { rotation: 35, speed: 0.25, color1: "#0f766e", color2: "#0284c7", color3: "#d97706", transparent: true, autoRotate: 0.1, scale: 1, frequency: 1, warpStrength: 0.8, mouseInfluence: 0.8, parallax: 0.4, noise: 0.1, iterations: 3, intensity: 0.9, bandWidth: 1 },
  }),
  design("enterprise-launchpad-cta", "Call to action · High-conversion enterprise launchpad", b => [
    b.glassPanel([
      b.grid([
        b.stack([
          b.shimmerBadge("READY FOR YOUR NEXT LEAP"),
          b.shimmerHeading("Accelerate your product release by months.", "4xl", "#38bdf8", "#ffffff"),
          b.text("Join hundreds of industry-leading companies shipping remarkable visual experiences with guaranteed stability and zero technical debt."),
          b.row([b.magneticButton("Start 14-day free pilot", "/pilot"), b.button("Book 30-min architecture review", "mailto:architect@example.com", true)]),
          b.line(),
          b.row([b.text("✓ No credit card required"), b.text("✓ Automated 1-click migration"), b.text("✓ Dedicated Slack channel with core team")]),
        ], { spacing: { gap: "lg" } }),
        b.panel([
          b.eyebrow("SCHEDULE CONFIRMATION"),
          b.heading("Architecture Office Hours", "2xl"),
          b.text("Reserve a direct session with our principal systems engineers."),
          b.line(),
          b.text("TODAY // 3 slots available"),
          b.text("TOMORROW // 5 slots available"),
          b.button("Reserve instant calendar invite", "/calendar"),
        ]),
      ], [7, 5], [12, 12]),
    ], true),
  ], true, {
    effectId: "ozmishow.background.animated-gradient",
    props: { colorA: "#090d16", colorB: "#115e59", duration: 8, angle: 125, opacity: 1 },
  }),
  design("keynote-summit-launchpad", "Event keynote · Global summit launchpad", b => [
    b.stack([
      b.row([b.shimmerBadge("OCTOBER 28-30, 2026 · SAN FRANCISCO & VIRTUAL"), b.text("Annual Developer Keynote", { typography: { size: "sm" } })]),
      b.shimmerHeading("SYNAPSE '26 · The Autonomous Web Summit", "6xl", "#fbbf24", "#ffffff", { typography: { align: "center", size: "6xl" } }),
      b.text("Three days of breakthrough keynotes, technical deep-dives, and hands-on masterclasses on autonomous agentic systems and futuristic web engineering.", { typography: { size: "xl", align: "center" }, sizing: { maxWidth: "3xl", align: "center" } }),
      b.row([b.magneticButton("Claim All-Access Pass ($499)", "/tickets/register"), b.button("View keynote speakers lineup", "/speakers", true)]),
    ], { sizing: { maxWidth: "4xl", align: "center" }, typography: { align: "center" } }),
    b.grid([
      b.glassPanel([
        b.eyebrow("TIER 1"),
        b.heading("Virtual Livestream", "2xl"),
        b.text("Free / Global Access"),
        b.line(),
        b.text("✓ Access to all mainstage keynotes"),
        b.text("✓ Interactive Q&A chat"),
        b.button("Register free", "/tickets/virtual", true),
      ]),
      b.glassPanel([
        b.row([b.eyebrow("TIER 2"), b.shimmerBadge("RECOMMENDED")]),
        b.heading("Full In-Person", "2xl"),
        b.text("$499 / Full 3 Days"),
        b.line(),
        b.text("✓ Hands-on engineering labs"),
        b.text("✓ VIP opening night reception"),
        b.magneticButton("Get All-Access Pass", "/tickets/in-person"),
      ], true),
      b.glassPanel([
        b.eyebrow("TIER 3"),
        b.heading("Executive Roundtable", "2xl"),
        b.text("$1,499 / By Invitation"),
        b.line(),
        b.text("✓ Closed-door executive briefings"),
        b.text("✓ Private dinner with keynote speakers"),
        b.button("Apply for invitation", "/tickets/executive", true),
      ]),
    ], [4, 4, 4], [12, 12, 12]),
  ], true, {
    effectId: "reactbits.background.hyperspeed",
    props: { colorA: "#10b981", colorB: "#06b6d4", backgroundColor: "#030712", speed: 1.1, density: 16, scale: 1, intensity: 1.1, interactive: true },
  }),
];
