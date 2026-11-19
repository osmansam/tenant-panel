import { FiTrash2 } from "react-icons/fi";
import { Input } from "../ui";
import type { RowClassConfig, TableComponentConfig } from "../../types/page";

export interface TableRowsTabProps {
  tableConfig: TableComponentConfig;
  addRowRule: () => void;
  updateRowRule: (ruleIndex: number, updates: Partial<RowClassConfig>) => void;
  removeRowRule: (ruleIndex: number) => void;
}

export function TableRowsTab({
  tableConfig,
  addRowRule,
  updateRowRule,
  removeRowRule,
}: TableRowsTabProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
          Row Class Rules
        </span>
        <button
          type="button"
          onClick={addRowRule}
          className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
        >
          + Add rule
        </button>
      </div>
      {(tableConfig.rows?.className || []).map(
        (rule, ruleIndex) => (
          <div
            key={ruleIndex}
            className="grid grid-cols-[1fr_1fr_auto] gap-2"
          >
            <Input
              type="text"
              value={rule.condition}
              onChange={(e) =>
                updateRowRule(ruleIndex, {
                  condition: e.target.value,
                })
              }
              className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
              placeholder="status = 'active'"
            />
            <Input
              type="text"
              value={rule.className}
              onChange={(e) =>
                updateRowRule(ruleIndex, {
                  className: e.target.value,
                })
              }
              className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
              placeholder="bg-ui-success-subtle"
            />
            <button
              type="button"
              onClick={() => removeRowRule(ruleIndex)}
              className="px-2 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ),
      )}
    </div>
  );
}
