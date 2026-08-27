import { describe, expect, it } from "vitest";
import type { RelationMatrixConfig } from "../types/page";
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
  filterPanel: {
    inputs: [
      {
        formKey: " status ",
        type: "select",
        formKeyType: "string",
        label: " Status ",
        placeholder: " Choose status ",
        optionsSource: "static",
        staticOptionsJson: " [] ",
      },
      { formKey: "   ", type: "text", label: "Ignored" },
    ],
  },
} satisfies RelationMatrixConfig;

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
      filterPanel: {
        inputs: [
          {
            formKey: "status",
            type: "select",
            formKeyType: "string",
            label: "Status",
            placeholder: "Choose status",
            optionsSource: "static",
            staticOptionsJson: "[]",
          },
        ],
      },
    });
    expect(isRelationMatrixConfigComplete(complete)).toBe(true);
    expect(complete.filterPanel.inputs[0].formKey).toBe(" status ");
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

  it("omits a filter panel when every filter key is blank", () => {
    expect(
      cleanRelationMatrixConfig({
        ...complete,
        filterPanel: { inputs: [{ formKey: " ", type: "text" }] },
      }),
    ).not.toHaveProperty("filterPanel");
  });
});
