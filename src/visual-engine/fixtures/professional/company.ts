import { design } from "./builders";

export const COMPANY_STARTERS = [
  design("team-directory", "Team · people behind the work", b => [
    b.grid([b.intro("A SMALL TEAM WITH SHARED AMBITION", "Good people.\nThoughtful work."), b.stack([b.text("Different perspectives, one shared commitment: making work that matters."), b.button("Work with us", "mailto:careers@example.com", true)])], [8, 4]),
    b.grid([ ["AL", "Alex Lee", "Strategy & direction"], ["JM", "Jamie Morgan", "Design & experience"], ["RP", "Riley Park", "Engineering & systems"], ["SC", "Sam Chen", "Client partnerships"] ].map(([initials, name, role]) => b.stack([b.panel([b.heading(initials, "6xl")], true), b.heading(name, "xl"), b.text(role)])), [3, 3, 3, 3], [6, 6, 6, 6]),
    b.text("Sample team profiles. Replace with your own people and roles.", { typography: { size: "sm" } }),
  ]),
  design("contact-studio", "Contact · studio directory", b => [
    b.eyebrow("GOOD THINGS START WITH HELLO"), b.heading("What are you\nworking on?", "6xl"),
    b.grid([b.stack([b.text("Tell us about your idea, your challenge, or the question you can’t stop thinking about."), b.button("hello@example.com", "mailto:hello@example.com")]), b.stack([b.eyebrow("NEW PROJECTS"), b.text("A little context goes a long way. Share your goals, timing, and what you have in mind."), b.line(), b.eyebrow("WORKING HOURS"), b.text("Monday — Friday\n09:00 — 17:00")]), b.stack([b.eyebrow("ELSEWHERE"), b.button("Meet the studio", "/about", true), b.button("See our work", "/work", true), b.line(), b.text("Remote by nature.\nConnected by design.")])], [5, 4, 3], [12, 6, 6]),
  ]),
  design("stats-impact", "Impact · numbers with context", b => [
    b.grid([b.eyebrow("PROGRESS YOU CAN SEE"), b.stack([b.heading("Small improvements.\nMeaningful impact."), b.text("Make the results of your work visible, with a little context behind every number.")])], [3, 9]), b.line(),
    b.grid([b.stack([b.heading("42%", "6xl"), b.heading("Less time on admin", "xl"), b.text("More space for the work that matters.")]), b.stack([b.heading("3.2×", "6xl"), b.heading("Faster handoffs", "xl"), b.text("A smoother path from idea to delivery.")]), b.stack([b.heading("94%", "6xl"), b.heading("Team satisfaction", "xl"), b.text("A better experience for the people doing the work.")])], [4, 4, 4]),
    b.text("Illustrative figures only. Add your verified results, methodology, and reporting period.", { typography: { size: "sm" }, color: { text: "inverse-muted" } }),
  ], true),
  design("logo-partners", "Partners · typographic logo wall", b => [
    b.stack([b.eyebrow("IN GOOD COMPANY"), b.heading("Built on strong partnerships.", "2xl"), b.text("A shared belief in thoughtful work and lasting relationships.")], { typography: { align: "center" }, sizing: { maxWidth: "3xl", align: "center" } }), b.line(),
    b.grid(["NORTHSTAR", "Forma", "FIELDWORK", "arc / co", "Common Ground", "STILL"].map((name, i) => b.stack([b.heading(name, "2xl", { typography: { size: "2xl", family: i % 2 ? "serif" : "system", weight: "semibold", align: "center" }, color: { text: "text-muted" } })], { spacing: { padding: "lg" } })), [2, 2, 2, 2, 2, 2], [4, 4, 4, 4, 4, 4]),
    b.line(), b.text("Placeholder partner names. Replace with approved brand names or logos.", { typography: { size: "sm", align: "center" } }),
  ]),
  design("portfolio-selected-work", "Selected work · portfolio", b => [
    b.grid([b.intro("SELECTED WORK / 01—03", "Purpose, made visible."), b.stack([b.text("A collection of identities, products, and experiences built around a clear idea."), b.button("Explore all projects", "/work", true)])], [8, 4]),
    b.grid([
      b.stack([b.image("/visual-builder/brand-study.svg", "Coral and cream typographic identity study", "wide"), b.row([b.heading("Common Ground", "2xl"), b.text("Brand strategy / Identity")]), b.text("A warmer welcome for a new kind of gathering place.")]),
      b.stack([b.image("/visual-builder/architecture-study.svg", "Warm architectural arches and geometric forms", "square"), b.heading("Quiet Spaces", "xl"), b.text("Architecture / Digital experience")]),
      b.stack([b.image("/visual-builder/product-study.svg", "Olive and cream product packaging study", "landscape"), b.heading("Everyday Objects", "xl"), b.text("Art direction / Packaging")]),
    ], [8, 4, 12], [12, 6, 6]),
  ]),
  design("executive-impact-wall", "Executive impact · Global scale metrics", b => [
    b.grid([
      b.intro("MEASURABLE SCALE & RELIABILITY", "Numbers backed by enterprise infrastructure.", "Our autonomous platform runs mission-critical commerce, banking, and real-time streaming for the Fortune 500."),
      b.shimmerBadge("REAL-TIME PLATFORM TELEMETRY"),
    ], [8, 4], [12, 12]),
    b.line(),
    b.grid([
      b.panel([
        b.shimmerHeading("99.999%", "6xl", "#60a5fa", "#ffffff"),
        b.heading("Uptime SLA", "xl"),
        b.text("Zero unplanned platform downtime across 3 consecutive years."),
      ]),
      b.panel([
        b.shimmerHeading("14.2B+", "6xl", "#34d399", "#ffffff"),
        b.heading("Monthly API Calls", "xl"),
        b.text("Processed with an average global round-trip latency under 40ms."),
      ]),
      b.panel([
        b.shimmerHeading("180+", "6xl", "#fbbf24", "#ffffff"),
        b.heading("Edge PoPs", "xl"),
        b.text("Worldwide distribution points connected via Tier 1 fiber transits."),
      ]),
      b.panel([
        b.shimmerHeading("3.4×", "6xl", "#38bdf8", "#ffffff"),
        b.heading("ROI Multiplier", "xl"),
        b.text("Average infrastructure cost reduction reported by enterprise clients."),
      ]),
    ], [3, 3, 3, 3], [6, 6, 6, 6]),
    b.line(),
    b.row([
      b.button("Download Independent Audit", "/audit-report.pdf", true),
      b.text("Verified by third-party infrastructure benchmarking", { typography: { size: "sm" } }),
    ]),
  ], true, {
    effectId: "reactbits.background.dither",
    props: { waveSpeed: 0.04, waveFrequency: 2.5, waveAmplitude: 0.25, waveColor: "#0d9488", backgroundColor: "#090d16", colorNum: 4, pixelSize: 2, enableMouseInteraction: true, mouseRadius: 1.2 },
  }),
  design("living-editorial-portfolio", "Portfolio · Living editorial showcase", b => [
    b.grid([
      b.stack([
        b.shimmerBadge("VOL. 09 · ARCHIVE & MONOGRAPH"),
        b.heading("Permanence in an ephemeral digital world.", "6xl", { typography: { family: "serif", size: "6xl", weight: "normal", leading: "tight" } }),
        b.text("A curated survey of digital architecture, bespoke typography, and physical industrial design commissions from 2024 through 2026."),
      ]),
      b.stack([
        b.eyebrow("STUDIO INQUIRIES"),
        b.text("Currently accepting two major institutional commissions for Q1 2027."),
        b.button("Review index of works", "/works", true),
      ]),
    ], [8, 4], [12, 12]),
    b.line(),
    b.grid([
      b.glassPanel([
        b.image("/visual-builder/architecture-study.svg", "Architectural monolith study", "wide"),
        b.row([b.eyebrow("01 / ARCHITECTURE"), b.shimmerBadge("BERLIN")]),
        b.heading("Atelier Monolith", "2xl"),
        b.text("Physical gallery space and generative light control system for contemporary sculptors."),
      ]),
      b.glassPanel([
        b.image("/visual-builder/brand-study.svg", "Typographic identity study", "portrait"),
        b.row([b.eyebrow("02 / IDENTITY"), b.shimmerBadge("TOKYO")]),
        b.heading("Komorebi Labs", "2xl"),
        b.text("Spatial computing brand identity and bespoke variable typeface family."),
      ]),
      b.glassPanel([
        b.image("/visual-builder/product-study.svg", "Minimalist product hardware study", "landscape"),
        b.row([b.eyebrow("03 / HARDWARE"), b.shimmerBadge("NEW YORK")]),
        b.heading("Forma Synthesis", "2xl"),
        b.text("Tactile haptic audio interface engineered from bead-blasted aerospace aluminum."),
      ]),
    ], [4, 4, 4], [12, 12, 12]),
  ], true, {
    effectId: "reactbits.background.silk",
    props: { speed: 3, scale: 1.2, color: "#475569", noiseIntensity: 1.3, rotation: 0 },
  }),
];
