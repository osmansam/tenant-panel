import { describe, expect, it } from "vitest";
import { syncTranslatedTableColumns } from "./tableColumns";

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
