import { describe, expect, it } from "vitest";
import {
  cleanRelationMatrixConfig,
  isRelationMatrixConfigComplete,
} from "./relationMatrixConfig";

const complete = {
  rowSchemaName: " product ",
  rowIdField: "_id",
  rowLabelField: " name ",
  columnSchemaName: " countList ",
  columnIdField: "_id",
  columnLabelField: "name",
  targetArrayField: " products ",
  targetItemMatchField: " product ",
  columnLimit: 140,
  toggles: [
    { id: "show-lists", label: "Show count lists", defaultValue: true },
  ],
  visibilityToggle: { toggleId: " show-lists ", when: true },
  editToggle: { toggleId: "edit-lists", when: true },
};

describe("relation matrix configuration", () => {
  it("cleans a complete configuration and applies safe defaults", () => {
    expect(cleanRelationMatrixConfig(complete)).toEqual({
      rowSchemaName: "product",
      rowIdField: "_id",
      rowLabelField: "name",
      columnSchemaName: "countList",
      columnIdField: "_id",
      columnLabelField: "name",
      targetArrayField: "products",
      targetItemMatchField: "product",
      columnLimit: 100,
      toggles: [
        { id: "show-lists", label: "Show count lists", defaultValue: true },
      ],
      visibilityToggle: { toggleId: "show-lists", when: true },
      editToggle: { toggleId: "edit-lists", when: true },
    });
    expect(isRelationMatrixConfigComplete(complete)).toBe(true);
  });

  it("defaults id fields and the column limit", () => {
    expect(
      cleanRelationMatrixConfig({
        ...complete,
        rowIdField: "",
        columnIdField: "",
        columnLimit: undefined,
        visibilityToggle: undefined,
        editToggle: undefined,
      }),
    ).toMatchObject({
      rowIdField: "_id",
      columnIdField: "_id",
      columnLimit: 100,
    });
  });

  it("rejects an incomplete target contract", () => {
    const incomplete = { ...complete, targetItemMatchField: "" };
    expect(cleanRelationMatrixConfig(incomplete)).toBeUndefined();
    expect(isRelationMatrixConfigComplete(incomplete)).toBe(false);
  });
});
