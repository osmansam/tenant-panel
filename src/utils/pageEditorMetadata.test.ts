import { describe, expect, it } from "vitest";
import { updatePageEditorMetadata } from "./pageEditorMetadata";

describe("updatePageEditorMetadata", () => {
  it("updates the page name without losing the current designer state", () => {
    const page = {
      id: "page-1",
      name: "Old name",
      icon: "MdSpaceDashboard",
      sections: [{ columns: 1, cells: [] }],
    };

    expect(updatePageEditorMetadata(page, "name", "Games")).toEqual({
      ...page,
      name: "Games",
    });
  });

  it("updates the page icon without losing the current designer state", () => {
    const page = {
      id: "page-1",
      name: "Games",
      icon: "MdSpaceDashboard",
      sections: [{ columns: 1, cells: [] }],
    };

    expect(
      updatePageEditorMetadata(page, "icon", "MdSportsEsports"),
    ).toEqual({
      ...page,
      icon: "MdSportsEsports",
    });
  });
});
