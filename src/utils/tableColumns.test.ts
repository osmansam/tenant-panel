import { describe, expect, it } from "vitest";
import { mergeLiveTableColumns, syncTranslatedTableColumns } from "./tableColumns";

describe("syncTranslatedTableColumns", () => {
  it("refreshes translated keys and preserves column visibility", () => {
    const existing = [
      { key: "Email", correspondingKey: "email", isSortable: true, isActive: false },
      { key: "Role", correspondingKey: "role", isSortable: true, isActive: true },
    ];
    const translated = [
      { key: "E posta", correspondingKey: "email", isSortable: true },
      { key: "Rol", correspondingKey: "role", isSortable: true },
    ];

    expect(syncTranslatedTableColumns(existing, translated)).toEqual([
      { key: "E posta", correspondingKey: "email", isSortable: true, isActive: false },
      { key: "Rol", correspondingKey: "role", isSortable: true, isActive: true },
    ]);
  });
});

it("refreshes custom labels without changing the column identity or visibility", () => {
  const existing = [{ key: "Actions", label: "Actions", isSortable: false, isActive: true }];
  const updated = syncTranslatedTableColumns(existing, [{ key: "Actions", label: "İşlemler", isSortable: false }]);
  expect(updated[0]).toEqual({ key: "Actions", label: "İşlemler", isSortable: false, isActive: true });
  expect(syncTranslatedTableColumns(updated, [{ key: "Actions", isSortable: false }])[0].label).toBeUndefined();
});

it("refreshes dynamic header content while preserving column visibility", () => {
  const existing = [
    { key: "Is Active", isSortable: true, isActive: false, headerNode: "view mode" },
  ];

  expect(
    mergeLiveTableColumns(existing, [
      { key: "Is Active", isSortable: true, headerNode: "edit mode" },
    ]),
  ).toEqual([
    { key: "Is Active", isSortable: true, isActive: false, headerNode: "edit mode" },
  ]);
});

it("keeps stable columns when only the incoming array identity changes", () => {
  const existing = [
    { key: "Name", isSortable: true, isActive: true },
    { key: "Status", isSortable: false, isActive: false },
  ];

  expect(
    syncTranslatedTableColumns(existing, [
      { key: "Name", isSortable: true },
      { key: "Status", isSortable: false },
    ]),
  ).toBe(existing);
});
