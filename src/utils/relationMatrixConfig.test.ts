import { describe, expect, it } from "vitest";
import {
  cleanRelationMatrixConfig,
  isRelationMatrixConfigComplete,
  requiresComponentSchemaName,
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
    { id: "show-relations", label: "Show relations", defaultValue: false },
    { id: "edit-relations", label: "Edit relations", defaultValue: false },
  ],
  visibilityToggle: { toggleId: " show-relations ", when: false },
  editToggle: { toggleId: "edit-relations", when: true },
};

describe("relation matrix configuration", () => {
  it("does not require the legacy component schema name", () => {
    expect(requiresComponentSchemaName("relationMatrix")).toBe(false);
    expect(requiresComponentSchemaName("table")).toBe(true);
  });

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
        { id: "edit-relations", label: "Edit relations", defaultValue: false },
      ],
      editToggle: { toggleId: "edit-relations", when: true },
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
