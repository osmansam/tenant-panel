import { describe, expect, it } from "vitest";
import {
  buildGeneratedRelationColumnDescriptors,
  normalizeRelationValue,
  relationMembershipsEqual,
  toggleRelationMembership,
} from "./generatedRelationColumns";

const group = {
  id: "locations",
  arrayField: "locations",
  sourceSchemaName: "location",
  sourceIdField: "_id",
  sourceLabelField: "name",
  sourceLimit: 100,
  booleanEditToggle: { toggleId: "locationEdit", when: true },
};

describe("generated relation columns", () => {
  it("hides and reveals a generated group with its visibility toggle", () => {
    const visibilityGroup = {
      ...group,
      visibilityToggle: { toggleId: "locationEdit", when: true },
    };
    const records = { location: [{ _id: "1", name: "Main" }] };
    const toggles = [
      { id: "locationEdit", label: "Edit locations", defaultValue: false },
    ];

    expect(
      buildGeneratedRelationColumnDescriptors(
        [visibilityGroup],
        records,
        { locationEdit: false },
        toggles,
      ),
    ).toEqual([]);
    expect(
      buildGeneratedRelationColumnDescriptors(
        [visibilityGroup],
        records,
        { locationEdit: true },
        toggles,
      ),
    ).toHaveLength(1);
  });

  it("normalizes supported relation identities consistently", () => {
    expect(normalizeRelationValue(" 12 ")).toBe("12");
    expect(normalizeRelationValue(12)).toBe("12");
    expect(normalizeRelationValue(12n)).toBe("12");
    expect(normalizeRelationValue({ $oid: " abc " })).toBe("abc");
    expect(normalizeRelationValue({ _id: " abc " })).toBe("abc");
    expect(normalizeRelationValue({ id: 12 })).toBe("12");
    expect(normalizeRelationValue(" ")).toBeNull();
    expect(normalizeRelationValue(null)).toBeNull();
    expect(normalizeRelationValue({ value: "abc" })).toBeNull();
  });

  it("recognizes populated object array memberships", () => {
    expect(
      relationMembershipsEqual(
        [{ _id: "location-1", name: "Main" }],
        ["location-1"],
      ),
    ).toBe(true);
  });

  it("adds without duplicates and removes all normalized matches", () => {
    const objectId = { $oid: "abc" };
    expect(toggleRelationMembership(["12"], 12, true)).toEqual(["12"]);
    expect(toggleRelationMembership([], objectId, true)).toEqual([objectId]);
    expect(toggleRelationMembership(["12", 12, "13"], 12, false)).toEqual([
      "13",
    ]);
  });

  it("recognizes an optimistic membership snapshot after normalized row data catches up", () => {
    expect(relationMembershipsEqual(["12", { $oid: "abc" }], [12, "abc"])).toBe(true);
    expect(relationMembershipsEqual(["12"], ["13"])).toBe(false);
  });

  it("deduplicates first ids, uses group-qualified keys, and falls back empty labels", () => {
    const descriptors = buildGeneratedRelationColumnDescriptors(
      [group],
      {
        location: [
          { _id: "12", name: "Chicago" },
          { _id: 12, name: "Duplicate" },
          { _id: "13", name: " " },
          { name: "Missing id" },
        ],
      },
      { locationEdit: true },
      [{ id: "locationEdit", label: "Location edit", defaultValue: false }],
    );

    expect(descriptors.map(({ key, label, sourceId, editable }) => ({
      key,
      label,
      sourceId,
      editable,
    }))).toEqual([
      {
        key: "locations:12",
        label: "Chicago",
        sourceId: "12",
        editable: true,
      },
      {
        key: "locations:13",
        label: "13",
        sourceId: "13",
        editable: true,
      },
    ]);
  });

  it("caps each group and follows its edit toggle", () => {
    const records = Array.from({ length: 120 }, (_, index) => ({
      _id: index + 1,
      name: `Location ${index + 1}`,
    }));
    expect(
      buildGeneratedRelationColumnDescriptors(
        [{ ...group, sourceLimit: 500 }],
        { location: records },
        { locationEdit: false },
        [{ id: "locationEdit", label: "Location edit", defaultValue: true }],
      ),
    ).toHaveLength(100);
    expect(
      buildGeneratedRelationColumnDescriptors(
        [{ ...group, sourceLimit: 1 }],
        { location: records },
        { locationEdit: false },
        [{ id: "locationEdit", label: "Location edit", defaultValue: true }],
      )[0].editable,
    ).toBe(false);
  });
});
