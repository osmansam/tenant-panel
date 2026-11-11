import { design } from "./builders";

export const TRUST_STARTERS = [
  design("testimonial-editorial", "Testimonial · editorial spotlight", b => [
    b.grid([b.stack([b.eyebrow("A CUSTOMER’S PERSPECTIVE"), b.heading("“We finally have\nspace to focus on\nwhat matters.”", "4xl", { typography: { family: "serif", size: "4xl", weight: "normal", leading: "snug" } }), b.text("The team found a simpler way to share context, make decisions, and keep the important work moving."), b.line(), b.row([b.eyebrow("AM"), b.stack([b.heading("Alex Morgan", "xl"), b.text("Operations lead / Example Studio")], {}, "xs")])]), b.panel([b.eyebrow("THE SHIFT"), b.heading("From scattered\nto connected.", "2xl"), b.text("One workspace replaced a patchwork of conversations and disconnected updates."), b.line(), b.button("Read the story", "/stories"), b.text("Sample testimonial. Replace with an approved customer quote.", { typography: { size: "sm" } })])], [8, 4], [12, 12]),
  ]),
  design("testimonial-wall", "Testimonials · customer voices", b => [
    b.intro("BETTER TOGETHER", "Good work gets people talking."),
    b.grid([
      b.panel([b.eyebrow("PRODUCT TEAM"), b.heading("“Less chasing.\nMore creating.”", "2xl"), b.text("We know where to look, who to ask, and what to do next."), b.line(), b.text("Jamie Lee / Product lead")]),
      b.stack([b.panel([b.text("“It makes the handoff feel like part of the work, not another project.”"), b.eyebrow("RILEY / DESIGN")]), b.panel([b.text("“A thoughtful tool that stays out of the way.”"), b.eyebrow("SAM / ENGINEERING")])]),
      b.panel([b.eyebrow("OPERATIONS TEAM"), b.heading("“A calmer\nMonday morning.”", "2xl"), b.text("The plan is clear before the first meeting starts."), b.line(), b.text("Taylor Park / Operations lead")]),
    ], [4, 4, 4], [12, 12, 12]), b.text("Illustrative quotes and names. Replace with verified testimonials before publishing.", { typography: { size: "sm" } }),
  ]),
  design("faq-split", "FAQ · support sidebar", b => [
    b.grid([b.stack([b.eyebrow("A LITTLE MORE CLARITY"), b.heading("Good questions.\nStraight answers."), b.text("Can’t find what you’re looking for? We’re happy to help."), b.button("Ask the team", "mailto:hello@example.com", true)]), b.faq([
      ["Where should I start?", "Choose one workflow you want to improve. Start there, learn what works, and expand at your own pace."],
      ["Can I adapt this to my team?", "Yes. Edit the structure, copy, and visual details to fit your own process."],
      ["What happens as we grow?", "Add new projects and processes as you need them. Keep the foundations that work for your team."],
      ["How do I get help?", "Contact the team with a little context about what you need. We’ll help you find a clear next step."],
    ])], [4, 8], [12, 12]),
  ]),
  design("faq-categories", "FAQ · grouped knowledge base", b => [
    b.intro("THE DETAILS, ORGANIZED", "Find your answer."),
    b.grid([b.stack([b.eyebrow("01 / GETTING STARTED"), b.faq([["How do I set up my workspace?", "Start with the essentials: a project, a clear goal, and the people who will help you get there."], ["Can I invite my colleagues?", "Bring the people who need the context into the same workspace and agree on a simple working rhythm."]])]), b.stack([b.eyebrow("02 / WORKING TOGETHER"), b.faq([["How should we organize projects?", "Use a consistent structure that makes sense to your team. Keep names clear and ownership visible."], ["Can we change the process later?", "Absolutely. Treat your workspace as a living system and adjust it as your needs evolve."]])])], [6, 6], [12, 12]),
    b.panel([b.row([b.heading("Still have a question?", "xl"), b.button("Get in touch", "mailto:hello@example.com", true)])]),
  ]),
  design("social-proof-wall-of-trust", "Testimonials · Interactive social proof wall", b => [
    b.grid([
      b.intro("TRUSTED BY INDUSTRY TITANS", "Loved by developers. Endorsed by founders.", "See why teams from fast-growing YC startups to multinational conglomerates rely on our engine every day."),
      b.shimmerBadge("OVER 50,000+ DEVELOPERS EMPOWERED"),
    ], [8, 4], [12, 12]),
    b.line(),
    b.grid([
      b.glassPanel([
        b.row([b.shimmerBadge("★★★★★"), b.text("FINTECH FOUNDER")]),
        b.heading("“Our velocity jumped 400% in our first sprint.”", "2xl"),
        b.text("“The integrated visual components and built-in WebGL shaders gave our application an unfair polish that directly lifted conversion by 38%.”"),
        b.line(),
        b.text("Marcus Sterling / Founder & CEO, Apex Vaults"),
      ]),
      b.glassPanel([
        b.row([b.shimmerBadge("★★★★★"), b.text("VP OF ENGINEERING")]),
        b.heading("“The best developer experience we have encountered.”", "2xl"),
        b.text("“Clean composability, zero bloat, and bulletproof responsive behavior. Our design system engineers fell in love with it on day one.”"),
        b.line(),
        b.text("Elena Rostova / VP Engineering, Novus Labs"),
      ], true),
      b.glassPanel([
        b.row([b.shimmerBadge("★★★★★"), b.text("DESIGN DIRECTOR")]),
        b.heading("“Stunning interactive effects without writing shader code.”", "2xl"),
        b.text("“From liquid chrome to dynamic aurora backgrounds, we could create museum-grade digital moments that render smoothly at 60 FPS.”"),
        b.line(),
        b.text("Julian Kim / Creative Director, Studio Monolith"),
      ]),
    ], [4, 4, 4], [12, 12, 12]),
  ], true, {
    effectId: "reactbits.background.squares",
    props: { colorA: "#0d9488", colorB: "#0284c7", backgroundColor: "#090d16", speed: 0.8, density: 18, scale: 1, intensity: 1, interactive: true },
  }),
];
