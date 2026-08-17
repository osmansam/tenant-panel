export interface TableDragConfiguration {
  enabled?: boolean;
  orderField?: string;
}

export interface ResolvedTableDragState {
  enabled: boolean;
  orderField: string;
  defaultSort?: string;
}

export const resolveTableDragState = (
  drag: TableDragConfiguration | undefined,
  userSort: unknown,
  configuredSort: unknown,
): ResolvedTableDragState => {
  const orderField = drag?.orderField?.trim() || "";
  const explicitSort =
    (typeof userSort === "string" && userSort.trim()) ||
    (typeof configuredSort === "string" && configuredSort.trim()) ||
    "";
  const configured = drag?.enabled === true && Boolean(orderField);
  if (!configured || (explicitSort && explicitSort !== orderField)) {
    return { enabled: false, orderField };
  }
  return {
    enabled: true,
    orderField,
    ...(!explicitSort ? { defaultSort: orderField } : {}),
  };
};

export interface TableRowOrderUpdate {
  _id: string | number;
  updates: Record<string, number>;
}

export interface TableRowReorderResult<T> {
  rows: T[];
  updates: TableRowOrderUpdate[];
}

const rowIdentity = (row: Record<string, unknown>): string | null => {
  const value = row._id ?? row.id;
  return value === undefined || value === null ? null : String(value);
};

export const sortRowsByOrderField = <T extends Record<string, unknown>>(
  rows: T[],
  orderField: string,
): T[] => {
  if (!orderField.trim()) return rows;
  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const leftOrder = Number(left.row[orderField]);
      const rightOrder = Number(right.row[orderField]);
      const leftValid = Number.isFinite(leftOrder);
      const rightValid = Number.isFinite(rightOrder);
      if (leftValid && rightValid && leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }
      if (leftValid !== rightValid) return leftValid ? -1 : 1;
      return left.index - right.index;
    })
    .map(({ row }) => row);
};

export const reorderCurrentPageRows = <T extends Record<string, unknown>>(
  rows: T[],
  draggedRow: T,
  targetRow: T,
  orderField: string,
  startOrder: number,
): TableRowReorderResult<T> => {
  const draggedIdentity = rowIdentity(draggedRow);
  const targetIdentity = rowIdentity(targetRow);
  if (
    !draggedIdentity ||
    !targetIdentity ||
    draggedIdentity === targetIdentity ||
    !orderField.trim()
  ) {
    return { rows, updates: [] };
  }

  const draggedIndex = rows.findIndex(
    (row) => rowIdentity(row) === draggedIdentity,
  );
  const targetIndex = rows.findIndex(
    (row) => rowIdentity(row) === targetIdentity,
  );
  if (draggedIndex < 0 || targetIndex < 0) {
    return { rows, updates: [] };
  }

  const reordered = [...rows];
  const [dragged] = reordered.splice(draggedIndex, 1);
  reordered.splice(targetIndex, 0, dragged);

  const normalizedRows = reordered.map((row, index) => ({
    ...row,
    [orderField]: startOrder + index,
  })) as T[];
  const updates = normalizedRows.flatMap<TableRowOrderUpdate>((row, index) => {
    const identity = rowIdentity(row);
    const order = startOrder + index;
    if (!identity || row[orderField] === rows.find(
      (candidate) => rowIdentity(candidate) === identity,
    )?.[orderField]) {
      return [];
    }
    const originalIdentity = (row._id ?? row.id) as string | number;
    return [{ _id: originalIdentity, updates: { [orderField]: order } }];
  });

  return { rows: normalizedRows, updates };
};
