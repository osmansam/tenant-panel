import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  ActionConstantRow,
  actionConstantRowsFromValues,
  parseActionConstantRows,
} from "../../utils/actionConstantEditor";

type ActionConstantValuesEditorProps = {
  values?: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
};

const createRow = (): ActionConstantRow => ({
  id: `constant-${Date.now()}-${Math.random()}`,
  key: "",
  valueText: "",
});

export default function ActionConstantValuesEditor({
  values,
  onChange,
}: ActionConstantValuesEditorProps) {
  const [rows, setRows] = useState<ActionConstantRow[]>(() =>
    actionConstantRowsFromValues(values),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setRows(actionConstantRowsFromValues(values));
    setErrors({});
  }, [values]);

  const commitRows = (nextRows: ActionConstantRow[]) => {
    setRows(nextRows);
    const result = parseActionConstantRows(nextRows);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    onChange(result.values);
  };

  return (
    <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-neutral-800">
            Default / hidden values
          </p>
          <p className="text-[11px] text-neutral-500">
            Rendered fields use these as defaults. Fields not in the form are
            submitted hidden.
          </p>
        </div>
        <button
          type="button"
          onClick={() => commitRows([...rows, createRow()])}
          className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 hover:bg-violet-100"
        >
          <FiPlus size={13} /> Add value
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-neutral-400">No configured values.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row, index) => (
            <div key={row.id} className="space-y-1">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] gap-2">
                <input
                  value={row.key}
                  onChange={(event) => {
                    const nextRows = [...rows];
                    nextRows[index] = { ...row, key: event.target.value };
                    commitRows(nextRows);
                  }}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="status"
                />
                <input
                  value={row.valueText}
                  onChange={(event) => {
                    const nextRows = [...rows];
                    nextRows[index] = {
                      ...row,
                      valueText: event.target.value,
                    };
                    commitRows(nextRows);
                  }}
                  className="rounded-lg border border-neutral-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder='ACTIVE, false, 0, null, or {"key":"value"}'
                />
                <button
                  type="button"
                  onClick={() =>
                    commitRows(rows.filter((candidate) => candidate.id !== row.id))
                  }
                  className="rounded-lg bg-red-50 px-2 text-red-700 hover:bg-red-100"
                  aria-label={`Remove ${row.key || "constant"}`}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              {errors[row.id] ? (
                <p className="text-[11px] text-red-600">{errors[row.id]}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
