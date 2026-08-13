import { useMemo, useRef } from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CheckSwitch } from "../common/CheckSwitch";
import type { TableComponentConfig, TableToggleConfig } from "../types/page";
import {
  buildGeneratedRelationColumnDescriptors,
  isRelationMember,
  relationValueForSubmit,
  relationMembershipsEqual,
  toggleRelationMembership,
} from "./generatedRelationColumns";
import { useGeneratedRelationSelectionData } from "./generatedRelationSelection";
import type { TableToggleState } from "./tableToggles";

type Row = Record<string, unknown> & { _id: string | number };

export const useGeneratedRelationTableColumns = ({
  tableConfig,
  toggleState,
  toggles,
  updateRow,
}: {
  tableConfig: TableComponentConfig | undefined;
  toggleState: TableToggleState;
  toggles: TableToggleConfig[];
  updateRow: (
    id: string | number,
    updates: Record<string, unknown>,
    row?: Row,
  ) => void;
}) => {
  const records = useGeneratedRelationSelectionData(tableConfig);
  const snapshots = useRef(new Map<string, unknown[]>());
  const descriptors = useMemo(
    () =>
      buildGeneratedRelationColumnDescriptors(
        tableConfig?.generatedRelationColumns,
        records,
        toggleState,
        toggles,
      ),
    [records, tableConfig?.generatedRelationColumns, toggleState, toggles],
  );

  return useMemo(
    () => ({
      columns: descriptors.map((descriptor) => ({
        key: descriptor.label,
        isSortable: false,
        correspondingKey: descriptor.key,
      })),
      rowKeys: descriptors.map((descriptor) => ({
        key: descriptor.key,
        node: (row: Row) => {
          const snapshotKey = `${row._id}:${descriptor.group.arrayField}`;
          const rowMembership = Array.isArray(row[descriptor.group.arrayField])
            ? (row[descriptor.group.arrayField] as unknown[])
            : [];
          const snapshot = snapshots.current.get(snapshotKey);
          if (snapshot && relationMembershipsEqual(snapshot, rowMembership)) {
            snapshots.current.delete(snapshotKey);
          }
          const membership = snapshot && !relationMembershipsEqual(snapshot, rowMembership)
            ? snapshot
            : rowMembership;
          const checked = isRelationMember(membership, descriptor.sourceId);
          if (!descriptor.editable) {
            return checked ? (
              <IoCheckmark className="text-blue-500 text-2xl" />
            ) : (
              <IoCloseOutline className="text-red-800 text-2xl" />
            );
          }
          return (
            <CheckSwitch
              checked={checked}
              onChange={() => {
                const latest =
                  snapshots.current.get(snapshotKey) ??
                  (Array.isArray(row[descriptor.group.arrayField])
                    ? (row[descriptor.group.arrayField] as unknown[])
                    : []);
                const next = toggleRelationMembership(
                  latest,
                  descriptor.sourceId,
                  !isRelationMember(latest, descriptor.sourceId),
                );
                snapshots.current.set(snapshotKey, next);
                updateRow(
                  row._id,
                  {
                    [descriptor.group.arrayField]: next.map(
                      relationValueForSubmit,
                    ),
                  },
                  row,
                );
              }}
            />
          );
        },
      })),
    }),
    [descriptors, updateRow],
  );
};
