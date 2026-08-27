import { describe, expect, it } from "vitest";
import type { RelationMatrixConfig } from "../../types/page";
import type { Field } from "../../utils/api/container";
import {
  addRelationMatrixFilterInput,
  buildRelationMatrixFilterInputs,
  removeRelationMatrixFilterInput,
  updateRelationMatrixFilterInput,
} from "./relationMatrixFilterEditor";

const matrix: RelationMatrixConfig = {
  rowSchemaName: "product",
  rowIdField: "_id",
  rowLabelField: "name",
  columnSchemaName: "countList",
  columnIdField: "_id",
  columnLabelField: "name",
  targetArrayField: "products",
  targetItemMatchField: "product",
};

describe("relation matrix filter editor helpers", () => {
  it("builds supported filters from row fields", () => {
    const fields: Field[] = [
      { name: "_id", type: "ObjectID" },
      { name: "name", type: "string", frontend: { displayName: "Product" } },
      { name: "active", type: "Boolean" },
      { name: "status", type: "string", enumList: ["draft", "live"] },
      { name: "photo", type: "image" },
      {
        name: "category",
        type: "ObjectID",
        objectSchemaName: "category",
        populationSettings: {
          fieldName: "category",
          populatedFields: ["title"],
          displayFields: ["title"],
          inputSelectionField: "title",
          displayLabel: "Category",
        },
      },
    ];

    expect(buildRelationMatrixFilterInputs(fields)).toEqual([
      expect.objectContaining({ formKey: "name", type: "text", label: "Product" }),
      expect.objectContaining({
        formKey: "active",
        type: "select",
        staticOptionsJson: JSON.stringify([
          { value: "true", label: "True" },
          { value: "false", label: "False" },
        ], null, 2),
      }),
      expect.objectContaining({
        formKey: "status",
        type: "select",
        staticOptionsJson: JSON.stringify([
          { value: "draft", label: "draft" },
          { value: "live", label: "live" },
        ], null, 2),
      }),
      expect.objectContaining({
        formKey: "category",
        type: "select",
        optionsSource: "schema",
        sourceSchemaName: "category",
        sourceValueField: "_id",
        sourceLabelField: "title",
      }),
    ]);
  });

  it("adds, updates, and removes inputs without mutating the matrix", () => {
    const added = addRelationMatrixFilterInput(matrix);
    expect(added).not.toBe(matrix);
    expect(added.filterPanel?.inputs).toEqual([{
      formKey: "",
      type: "text",
      formKeyType: "string",
      label: "",
      placeholder: "",
      required: false,
      optionsSource: "static",
      staticOptionsJson: "[]",
      sourceValueField: "_id",
    }]);
    expect(matrix.filterPanel).toBeUndefined();

    const updated = updateRelationMatrixFilterInput(added, 0, {
      formKey: "name",
      label: "Name",
    });
    expect(updated.filterPanel?.inputs?.[0]).toMatchObject({
      formKey: "name",
      label: "Name",
    });
    expect(added.filterPanel?.inputs?.[0].formKey).toBe("");

    const removed = removeRelationMatrixFilterInput(updated, 0);
    expect(removed.filterPanel?.inputs).toEqual([]);
    expect(updated.filterPanel?.inputs).toHaveLength(1);
  });
});
