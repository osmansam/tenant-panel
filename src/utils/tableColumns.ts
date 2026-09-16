import type { ColumnType } from "../components/panelComponents/shared/types";

export function syncTranslatedTableColumns(
  existing: ColumnType[] | undefined,
  incoming: ColumnType[],
): ColumnType[] {
  if (!existing || existing.length !== incoming.length) {
    return incoming.map((column) => ({ ...column, isActive: true }));
  }
  if (incoming.every((column, index) => column.key === existing[index]?.key && column.label === existing[index]?.label)) {
    return existing;
  }
  return incoming.map((column, index) => {
    const previous = column.correspondingKey
      ? existing.find((item) => item.correspondingKey === column.correspondingKey)
      : existing[index];
    return { ...column, isActive: previous?.isActive ?? true };
  });
}
