import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  ActionConstantRow,
  actionConstantRowsFromValues,
  parseActionConstantRows,
} from "../../utils/actionConstantEditor";
import { Input } from "../ui";

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
    <div className="space-y-2 rounded-xl border border-ui-border bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-ui-foreground">
            Default / hidden values
          </p>
          <p className="text-[11px] text-ui-muted">
            Rendered fields use these as defaults. Fields not in the form are
            submitted hidden.
          </p>
        </div>
        <button
          type="button"
          onClick={() => commitRows([...rows, createRow()])}
          className="inline-flex items-center gap-1 rounded-lg bg-ui-active-subtle px-2 py-1 text-xs font-medium text-ui-foreground hover:bg-ui-active-subtle"
        >
          <FiPlus size={13} /> Add value
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-ui-placeholder">No configured values.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row, index) => (
            <div key={row.id} className="space-y-1">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] gap-2">
                <Input
                  value={row.key}
                  onChange={(event) => {
                    const nextRows = [...rows];
                    nextRows[index] = { ...row, key: event.target.value };
                    commitRows(nextRows);
                  }}
                  className="text-sm"
                  placeholder="status"
                />
                <Input
                  value={row.valueText}
                  onChange={(event) => {
                    const nextRows = [...rows];
                    nextRows[index] = {
                      ...row,
                      valueText: event.target.value,
                    };
                    commitRows(nextRows);
                  }}
                  className="font-mono text-sm"
                  placeholder='ACTIVE, false, 0, null, or {"key":"value"}'
                />
                <button
                  type="button"
                  onClick={() =>
                    commitRows(rows.filter((candidate) => candidate.id !== row.id))
                  }
                  className="rounded-lg bg-ui-danger-subtle px-2 text-ui-danger hover:bg-ui-danger-subtle"
                  aria-label={`Remove ${row.key || "constant"}`}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              {errors[row.id] ? (
                <p className="text-[11px] text-ui-danger">{errors[row.id]}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
