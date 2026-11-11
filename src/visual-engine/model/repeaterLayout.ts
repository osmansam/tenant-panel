import type { RepeaterItemsLayout } from "./nodes";

/** A fresh value for each authoring operation; saved documents never share mutable defaults. */
export function createDefaultRepeaterLayout(): RepeaterItemsLayout {
  return {
    columns: { mobile: 1, tablet: 2, desktop: 3 },
    gap: { mobile: 16, tablet: 16, desktop: 16 },
    alignment: "stretch",
  };
}
