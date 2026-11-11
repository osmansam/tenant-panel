import {
  AUTOTABLE_SCREENSHOT_NODE_IDS,
  compactDesign,
  screenshotFrame,
} from "./builders";

const PLACEHOLDER_SRC = "/visual-builder/placeholder.svg";

export const AUTOTABLE_TENANT_PANEL_SHOWCASE = compactDesign(
  "autotable-introduction-tenant-panel",
  "AutoTable · Tenant Panel showcase",
  (b) => [
    b.grid(
      [
        b.stack([
          b.eyebrow("TENANT PANEL / BACKEND CONTROL"),
          b.heading("Shape the system from one project workspace."),
          b.text(
            "Tenant Panel is where developers define containers and fields, set validation, configure authentication and access rules, and manage project settings.",
          ),
          b.line(),
          b.stack([
            b.text("✓ Model typed records and relationships"),
            b.text("✓ Control routes, roles, and authentication"),
            b.text("✓ Keep configuration scoped to the active project"),
          ], {}, "sm"),
          b.button("Explore the backend model", "#how-it-works"),
        ], { sizing: { maxWidth: "3xl" } }, "md"),
        screenshotFrame({
          id: AUTOTABLE_SCREENSHOT_NODE_IDS.tenantPanel,
          label: "Replace with Tenant Panel screenshot",
          src: PLACEHOLDER_SRC,
          alt: "Tenant Panel project configuration placeholder",
          caption: "Future screenshot area · Replace only the image source and keep this application frame.",
        }),
      ],
      [5, 7],
      [5, 7],
    ),
  ],
);

export const AUTOTABLE_OZMISHOW_SHOWCASE = compactDesign(
  "autotable-introduction-visual-builder",
  "AutoTable · Ozmishow visual builder showcase",
  (b) => {
    const explanation = b.stack([
      b.eyebrow("OZMISHOW / INTERFACE BUILDER"),
      b.heading("Turn project data into an editable experience."),
      b.text(
        "Build pages and reusable sections with visual editing while each component can stay connected to AutoTable-backed content.",
      ),
      b.line(),
      b.stack([
        b.text("✓ Compose responsive pages from reusable sections"),
        b.text("✓ Edit content, media, layout, and presentation visually"),
        b.text("✓ Connect the interface to project-scoped AutoTable data"),
      ], {}, "sm"),
      b.button("Explore visual building", "#start-building"),
    ], { sizing: { maxWidth: "3xl" } }, "md");

    const screenshot = screenshotFrame({
      id: AUTOTABLE_SCREENSHOT_NODE_IDS.ozmishow,
      label: "Replace with Ozmishow screenshot",
      src: PLACEHOLDER_SRC,
      alt: "Ozmishow visual builder placeholder",
      caption: "Future screenshot area · The image remains independently selectable in the visual builder.",
    });

    return [b.grid([screenshot, explanation], [7, 5], [7, 5])];
  },
  true,
);
