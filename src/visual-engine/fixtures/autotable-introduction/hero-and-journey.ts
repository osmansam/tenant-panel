import { compactDesign } from "./builders";

export const AUTOTABLE_INTRODUCTION_HERO = compactDesign(
  "autotable-introduction-hero",
  "AutoTable · Connected product introduction",
  (b) => [
    b.grid(
      [
        b.stack(
          [
            b.shimmerBadge("AUTOTABLE / BUILD FROM YOUR DATA MODEL"),
            b.shimmerHeading(
              "Build the backend and interface as one connected system.",
              "6xl",
              "#67e8f9",
              "#ffffff",
            ),
            b.text(
              "Define typed data once, then shape secure routes, automation, aggregation, and editable interfaces around the same project context.",
              { typography: { size: "lg", leading: "relaxed" } },
            ),
            b.row([
              b.magneticButton("Start building", "#start-building"),
              b.button("See how it works", "#how-it-works", true),
            ]),
            b.line(),
            b.row([
              b.text("TYPED SCHEMAS", { typography: { size: "sm", weight: "semibold" } }),
              b.text("DYNAMIC ROUTES", { typography: { size: "sm", weight: "semibold" } }),
              b.text("AUTOMATED WORK", { typography: { size: "sm", weight: "semibold" } }),
            ]),
          ],
          { sizing: { maxWidth: "3xl" } },
          "md",
        ),
        b.panel([
          b.row([
            b.eyebrow("PROJECT / COMMERCE"),
            b.shimmerBadge("CONNECTED"),
          ]),
          b.heading("One model. Every layer.", "2xl"),
          b.panel([
            b.eyebrow("CONTAINER"),
            b.heading("orders", "xl"),
            b.text("customerId · status · total · createdAt"),
          ]),
          b.grid(
            [
              b.panel([b.eyebrow("API"), b.text("POST /dynamic")]),
              b.panel([b.eyebrow("WORKFLOW"), b.text("after_create")]),
              b.panel([b.eyebrow("PIPELINE"), b.text("revenue_by_status")]),
              b.panel([b.eyebrow("INTERFACE"), b.text("orders dashboard")]),
            ],
            [6, 6, 6, 6],
            [6, 6, 6, 6],
          ),
        ]),
      ],
      [7, 5],
      [12, 12],
    ),
  ],
  true,
);

export const AUTOTABLE_PRODUCT_JOURNEY = compactDesign(
  "autotable-introduction-journey",
  "AutoTable · From schema to working product",
  (b) => [
    b.grid(
      [
        b.intro(
          "HOW AUTOTABLE FITS TOGETHER",
          "From schema to working product.",
          "Start with an orders container and carry one typed model through the backend, automation, and interface.",
        ),
        b.text(
          "Each layer stays connected to the same tenant and project, so the application can grow without rebuilding its foundation.",
        ),
      ],
      [8, 4],
      [12, 12],
    ),
    b.line(),
    b.grid(
      [
        b.panel([
          b.eyebrow("01 / DEFINE CONTAINERS"),
          b.heading("Describe the data.", "xl"),
          b.text("Create an orders container with typed fields, validation, indexes, and access rules."),
        ], true),
        b.panel([
          b.eyebrow("02 / USE DYNAMIC ROUTES"),
          b.heading("Work with records.", "xl"),
          b.text("Create, filter, update, export, and execute against the schema through project-scoped endpoints."),
        ]),
        b.panel([
          b.eyebrow("03 / ADD WORKFLOWS AND PIPELINES"),
          b.heading("Automate the behavior.", "xl"),
          b.text("React after_create, schedule recurring work, and aggregate revenue without disconnecting business logic from data."),
        ]),
        b.panel([
          b.eyebrow("04 / CONNECT AN INTERFACE"),
          b.heading("Ship the experience.", "xl"),
          b.text("Use the same project data in an editable Ozmishow page, an internal tool, or your own application."),
        ]),
      ],
      [3, 3, 3, 3],
      [6, 6, 6, 6],
    ),
  ],
);
