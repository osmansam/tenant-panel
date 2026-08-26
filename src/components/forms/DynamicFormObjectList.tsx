import { FiEdit2, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { FormObjectListConfig } from "../../types/page";
import {
  EmbeddedFormObject,
  getObjectListDisplayValues,
} from "../../utils/formConfig";
import { getNextQuantityDiscountTier } from "../../utils/formCalculations";
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

const renderPriceComparison = (
  item: EmbeddedFormObject,
  config: FormObjectListConfig["display"],
) => {
  const comparison = config?.priceComparison;
  if (!comparison) return undefined;
  const original = item[comparison.originalField];
  const discounted = item[comparison.discountedField];
  if (typeof original !== "number" || !Number.isFinite(original) || typeof discounted !== "number" || !Number.isFinite(discounted)) return undefined;
  const precision = comparison.precision ?? 2;
  const suffix = comparison.currency ? ` ${comparison.currency}` : "";
  const format = (value: number) => `${value.toFixed(precision)}${suffix}`;
  if (discounted >= original) return <span>{format(discounted)}</span>;
  return (
    <span className="flex items-baseline gap-2">
      <del className="font-normal text-neutral-400">{format(original)}</del>
      <span>{format(discounted)}</span>
    </span>
  );
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

  const getDiscountOffer = (item: EmbeddedFormObject) => {
    const calculation = (config.itemCalculations || []).find(
      (candidate) => candidate.operation === "quantityDiscount" && candidate.inputs.length === 2,
    );
    if (!calculation) return undefined;
    const quantityField = calculation.inputs[1];
    const quantity = item[quantityField];
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) return undefined;
    const tier = getNextQuantityDiscountTier(calculation, quantity);
    if (!tier) return undefined;
    const missingQuantity = tier.minimumQuantity - quantity;
    if (!Number.isFinite(missingQuantity) || missingQuantity <= 0) return undefined;
    return { quantityField, missingQuantity, tier };
  };

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
            const { primary, secondary, right } = getObjectListDisplayValues(item, config.display);
            const comparedPrice = renderPriceComparison(item, config.display);
            const image = config.display?.imageField
              ? item[config.display.imageField]
              : undefined;
            const discountOffer = getDiscountOffer(item);
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
                  {discountOffer && (
                    <button
                      type="button"
                      className="mt-1.5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold tabular-nums text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      aria-label={`Add ${discountOffer.missingQuantity} items to unlock ${discountOffer.tier.discountPercentage}% discount`}
                      onClick={() => onAdjust(index, discountOffer.quantityField, discountOffer.missingQuantity)}
                    >
                      +{discountOffer.missingQuantity} → %{discountOffer.tier.discountPercentage}
                    </button>
                  )}
                </div>
                {(comparedPrice || right) && <div className="shrink-0 text-sm font-semibold tabular-nums text-neutral-900">{comparedPrice || right}</div>}
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
