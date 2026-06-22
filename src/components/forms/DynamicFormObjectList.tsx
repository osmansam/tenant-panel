import { FiEdit2, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { FormObjectListConfig } from "../../types/page";
import {
  EmbeddedFormObject,
  getObjectDisplayText,
} from "../../utils/formConfig";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";

type Props = {
  config: FormObjectListConfig;
  items: EmbeddedFormObject[];
  editingIndex?: number;
  onEdit: (item: EmbeddedFormObject, index: number) => void;
  onRemove: (index: number) => void;
  onAdjust: (
    index: number,
    field: string,
    delta: number,
    min?: number,
    max?: number,
  ) => void;
};

const DynamicFormObjectList = ({
  config,
  items,
  editingIndex,
  onEdit,
  onRemove,
  onAdjust,
}: Props) => {
  const visibleItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== editingIndex);

  const renderActions = (
    item: EmbeddedFormObject,
    index: number,
    position: "start" | "end",
  ) => (
    <div className="flex shrink-0 items-center gap-1">
      {(config.actions || [])
        .filter((action) => (action.position || "end") === position)
        .map((action, actionIndex) => {
          const key = `${action.kind}-${actionIndex}`;
          if (action.kind === "editObject") {
            return (
              <GenericButton
                key={key}
                variant="icon"
                size="sm"
                title={action.label || "Edit item"}
                aria-label={action.label || "Edit item"}
                onClick={() => onEdit(item, index)}
              >
                <FiEdit2 size={16} />
              </GenericButton>
            );
          }
          if (action.kind === "removeObject") {
            return (
              <GenericButton
                key={key}
                variant="icon"
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                title={action.label || "Remove item"}
                aria-label={action.label || "Remove item"}
                onClick={() => onRemove(index)}
              >
                <FiTrash2 size={16} />
              </GenericButton>
            );
          }
          if (!action.field) return null;
          const direction = action.kind === "increment" ? 1 : -1;
          const Icon = direction > 0 ? FiPlus : FiMinus;
          return (
            <GenericButton
              key={key}
              variant="icon"
              size="sm"
              title={action.label || action.kind}
              aria-label={action.label || action.kind}
              onClick={() =>
                onAdjust(
                  index,
                  action.field!,
                  direction * (action.step || 1),
                  action.min,
                  action.max,
                )
              }
            >
              <Icon size={16} />
            </GenericButton>
          );
        })}
    </div>
  );

  return (
    <section>
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <h3 className="text-base font-semibold text-neutral-900">
          {config.title || config.key}
        </h3>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium tabular-nums text-neutral-600">
          {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
        </span>
      </div>
      {visibleItems.length === 0 ? (
        <div className="py-12 text-center text-sm text-neutral-400">No items</div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {visibleItems.map(({ item, index }) => {
            const primary = getObjectDisplayText(
              item,
              config.display?.primaryField,
              config.display?.primaryTemplate,
            );
            const secondary = getObjectDisplayText(
              item,
              config.display?.secondaryField,
              config.display?.secondaryTemplate,
            );
            const image = config.display?.imageField
              ? item[config.display.imageField]
              : undefined;
            return (
              <div
                key={`${config.key}-${index}`}
                className="flex min-h-16 items-center gap-3 py-4"
              >
                {renderActions(item, index, "start")}
                {typeof image === "string" && image && (
                  <img
                    src={image}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-lg border border-neutral-100 object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-neutral-900">
                    {primary || "-"}
                  </div>
                  {secondary && (
                    <div className="mt-0.5 truncate text-sm text-neutral-500">
                      {secondary}
                    </div>
                  )}
                </div>
                {renderActions(item, index, "end")}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default DynamicFormObjectList;
