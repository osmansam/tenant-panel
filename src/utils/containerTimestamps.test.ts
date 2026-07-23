import { describe, expect, it } from "vitest";
import {
  addMissingSystemTimestampFields,
  hasAllSystemTimestampFields,
  missingSystemTimestampFields,
} from "./containerTimestamps";

describe("container timestamp fields", () => {
  it("adds createdAt and updatedAt when both are missing", () => {
    const fields = addMissingSystemTimestampFields([
      { name: "status", type: "enum" },
    ]);

    expect(fields.map((field) => field.name)).toEqual([
      "status",
      "createdAt",
      "updatedAt",
    ]);
    expect(fields.find((field) => field.name === "createdAt")).toMatchObject({
      type: "date",
      isSearchable: true,
    });
    expect(fields.find((field) => field.name === "updatedAt")).toMatchObject({
      type: "date",
      isSearchable: true,
    });
  });

  it("does not duplicate existing timestamp fields", () => {
    const fields = addMissingSystemTimestampFields([
      { name: "createdAt", type: "date" },
      { name: "status", type: "enum" },
    ]);

    expect(fields.map((field) => field.name)).toEqual([
      "createdAt",
      "status",
      "updatedAt",
    ]);
    expect(missingSystemTimestampFields(fields)).toEqual([]);
    expect(hasAllSystemTimestampFields(fields)).toBe(true);
  });
});
