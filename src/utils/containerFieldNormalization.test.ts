import { describe, expect, it } from "vitest";
import { normalizeContainerField } from "./containerFieldNormalization";

describe("normalizeContainerField", () => {
  it.each(["objectId", "objectIdArray"])(
    "preserves PascalCase population settings for %s fields",
    (type) => {
      const field = normalizeContainerField({
        Name: "locations",
        Type: type,
        ObjectSchemaName: "location",
        PopulationSettings: {
          FieldName: "location",
          PopulatedFields: ["name"],
          DisplayFields: ["name"],
          InputSelectionField: "_id",
          DisplayLabel: "Location",
        },
      });

      expect(field.populationSettings).toEqual({
        fieldName: "location",
        populatedFields: ["name"],
        displayFields: ["name"],
        inputSelectionField: "_id",
        displayLabel: "Location",
      });
    },
  );

  it("normalizes population settings recursively for child fields", () => {
    const field = normalizeContainerField({
      Name: "products",
      Type: "array",
      Children: [
        {
          Name: "product",
          Type: "objectId",
          ObjectSchemaName: "product",
          PopulationSettings: {
            FieldName: "product",
            PopulatedFields: ["name"],
            DisplayFields: ["name"],
            InputSelectionField: "_id",
            DisplayLabel: "Product",
          },
        },
      ],
    });

    expect(field.children?.[0].populationSettings?.displayLabel).toBe(
      "Product",
    );
  });
});
