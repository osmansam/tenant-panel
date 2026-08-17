import { describe, expect, it } from "vitest";
import { buildPopulationSettings } from "./populationSettingsValidation";

describe("buildPopulationSettings", () => {
  it("returns complete population settings", () => {
    expect(
      buildPopulationSettings({
        fieldName: "location",
        populatedFields: ["name"],
        displayFields: ["name"],
        inputSelectionField: "_id",
        displayLabel: "Location",
      }),
    ).toEqual({
      fieldName: "location",
      populatedFields: ["name"],
      displayFields: ["name"],
      inputSelectionField: "_id",
      displayLabel: "Location",
    });
  });

  it("rejects partially completed settings instead of dropping them", () => {
    expect(() =>
      buildPopulationSettings({
        fieldName: "location",
        populatedFields: ["name"],
        displayFields: [],
        inputSelectionField: "_id",
        displayLabel: "Location",
      }),
    ).toThrow("Complete all population settings fields");
  });

  it("allows population settings to remain entirely unconfigured", () => {
    expect(
      buildPopulationSettings({
        fieldName: "location",
        populatedFields: [],
        displayFields: [],
        inputSelectionField: "",
        displayLabel: "",
      }),
    ).toBeUndefined();
  });
});
