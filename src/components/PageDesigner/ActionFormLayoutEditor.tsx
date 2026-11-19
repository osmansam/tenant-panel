import { Input, Select } from "../ui";
import type {
  TableActionConfig,
  TableActionFormLayoutConfig,
} from "../../types/page";

export const ActionFormLayoutEditor = ({
  action,
  onChange,
  defaultAllowOverflow = false,
}: {
  action: TableActionConfig;
  onChange: (formLayout: TableActionFormLayoutConfig) => void;
  defaultAllowOverflow?: boolean;
}) => {
  const layout = action.formLayout || {};
  const update = (changes: Partial<TableActionFormLayoutConfig>) =>
    onChange({ ...layout, ...changes });

  return (
    <div className="space-y-3 rounded-lg border border-ui-border bg-ui-active-subtle/50 p-3">
      <div>
        <div className="text-xs font-semibold text-ui-foreground">Form layout</div>
        <p className="text-[11px] text-ui-muted">
          These settings apply only to this action.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">Columns</span>
          <Select
            value={layout.columns || ""}
            onChange={(event) =>
              update({
                columns: event.target.value
                  ? (Number(event.target.value) as 1 | 2 | 3 | 4)
                  : undefined,
              })
            }
            className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ui-focus"
          >
            <option value="">Default</option>
            <option value="1">1 column</option>
            <option value="2">2 columns</option>
            <option value="3">3 columns</option>
            <option value="4">4 columns</option>
          </Select>
        </label>
        <label className="flex items-end gap-2 pb-2 text-xs text-ui-foreground">
          <Input
            type="checkbox"
            checked={layout.allowOverflow ?? defaultAllowOverflow}
            onChange={(event) => update({ allowOverflow: event.target.checked })}
          />
          Allow content to overflow the modal
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">
            Form container classes (topClassName)
          </span>
          <Input
            type="text"
            value={layout.topClassName || ""}
            onChange={(event) => update({ topClassName: event.target.value })}
            className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ui-focus"
            placeholder="flex flex-col gap-2"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">
            Modal classes (generalClassName)
          </span>
          <Input
            type="text"
            value={layout.generalClassName || ""}
            onChange={(event) => update({ generalClassName: event.target.value })}
            className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ui-focus"
            placeholder="overflow-visible"
          />
        </label>
      </div>
    </div>
  );
};
