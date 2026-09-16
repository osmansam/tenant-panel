import { describe, expect, it } from "vitest";
import { outsideSearch } from "./outsideSearch";

describe("table search placeholder", () => {
  it("uses custom text as entered and falls back to the translation when blank", () => {
    const props = { t: (key: string) => `translated ${key}`, filterPanelFormElements: { search: "tea" }, setFilterPanelFormElements: () => {} };
    expect(outsideSearch({ ...props, placeholder: "Ara" }).props.placeholder).toBe("Ara");
    expect(outsideSearch({ ...props, placeholder: "  " }).props.placeholder).toBe("translated Search");
    expect(outsideSearch(props).props.placeholder).toBe("translated Search");
    expect(outsideSearch({ ...props, placeholder: "Ara" }).props.value).toBe("tea");
  });
});
