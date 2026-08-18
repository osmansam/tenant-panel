import { FormElementsState } from "../../types";
import { FormAreaKey, FormSummaryConfig } from "../../types/page";

type Props = { summaries: FormSummaryConfig[]; values: FormElementsState; area: FormAreaKey };

const DynamicFormSummary = ({ summaries, values, area }: Props) => {
  const visible = summaries.filter((summary) => (summary.area || "right") === area).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (!visible.length) return null;
  return <dl className="mt-5 space-y-2 border-t border-neutral-100 pt-4">
    {visible.map((summary) => {
      const precision = summary.format?.precision ?? 2;
      const raw = Number(values[summary.targetField] || 0);
      const formatted = new Intl.NumberFormat(undefined, {
        style: summary.format?.style === "currency" ? "currency" : "decimal",
        ...(summary.format?.style === "currency" ? { currency: summary.format.currency || "TRY" } : {}),
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(Number.isFinite(raw) ? raw : 0);
      return <div key={summary.key} className="flex items-center justify-between gap-4">
        <dt className="text-sm text-neutral-500">{summary.label || summary.key}</dt>
        <dd className="text-base font-semibold tabular-nums text-neutral-950">{formatted}</dd>
      </div>;
    })}
  </dl>;
};

export default DynamicFormSummary;
