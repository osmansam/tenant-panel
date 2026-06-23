import React, { useMemo } from "react";
import { DataBinding, DistributionBlocksConfig } from "../../../types/page";
import { resolveTemplate } from "../../../utils/templateExpressions";
import {
  useGetTableSourceItems,
  useGetWorkflowData,
} from "../../../utils/dynamic";

type DistributionBlocksProps = {
  title?: string;
  config?: DistributionBlocksConfig;
  dataBinding?: DataBinding;
};

const parsePercent = (value: string): number => {
  const parsed = Number(value.replace("%", "").trim());
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), 100);
};

const formatPercent = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "%0";
  return trimmed.startsWith("%") ? trimmed : `%${trimmed.replace("%", "")}`;
};

const DistributionBlocks: React.FC<DistributionBlocksProps> = ({
  title,
  config,
  dataBinding,
}) => {
  const source = config?.source || "static";
  const shouldFetchTable =
    source !== "static" &&
    source !== "workflow" &&
    Boolean(dataBinding?.schemaName);
  const payload = useGetTableSourceItems<Record<string, unknown>>(
    1,
    1,
    shouldFetchTable
      ? {
          kind: dataBinding?.kind as "schema" | "pipeline" | "workflow",
          schemaName: dataBinding?.schemaName,
          pipelineName: dataBinding?.pipelineName,
          workflowName: dataBinding?.workflowName,
          params: dataBinding?.params,
        }
      : {},
    {},
  );
  const workflowData = useGetWorkflowData<Record<string, unknown>>(
    source === "workflow"
      ? {
          schemaName: dataBinding?.schemaName,
          workflowName: dataBinding?.workflowName,
          params: dataBinding?.params,
        }
      : {},
  );

  const context = useMemo<Record<string, unknown>>(() => {
    if (source === "workflow") {
      return workflowData || {};
    }
    const firstItem = payload?.items?.[0] || {};
    return {
      ...firstItem,
      items:
        (firstItem as Record<string, unknown>).items !== undefined
          ? (firstItem as Record<string, unknown>).items
          : payload?.items || [],
      totalItems: payload?.totalItems,
      totalPages: payload?.totalPages,
      currentPage: payload?.currentPage,
    };
  }, [payload, source, workflowData]);

  const items = (config?.items || []).slice(0, 5);

  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white px-8 py-7 shadow-sm">
      {title && (
        <h3 className="mb-7 text-2xl font-semibold tracking-normal text-neutral-950">
          {resolveTemplate(title, context)}
        </h3>
      )}

      <div
        className="mb-7 grid gap-5"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
        }}
      >
        {items.map((item, index) => {
          const color = item.color?.trim() || "#4f46e5";
          return (
            <div
              key={`${item.label || "distribution-tile"}-${index}`}
              className="min-h-[92px] rounded-2xl bg-neutral-100 px-5 py-4 text-center"
            >
              <div
                className="truncate text-4xl font-semibold leading-none"
                style={{ color }}
              >
                {resolveTemplate(item.value, context)}
              </div>
              <div className="mt-2 truncate text-lg font-semibold text-neutral-500">
                {resolveTemplate(item.label, context)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const color = item.color?.trim() || "#4f46e5";
          const resolvedPercent = resolveTemplate(item.percent, context);
          const width = parsePercent(resolvedPercent);
          return (
            <div key={`${item.label || "distribution-row"}-${index}`}>
              <div className="mb-1.5 flex items-center justify-between gap-4 text-lg font-semibold text-neutral-500">
                <span className="min-w-0 truncate">
                  {resolveTemplate(item.label, context)}
                </span>
                <span className="shrink-0">{formatPercent(resolvedPercent)}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-md bg-neutral-200">
                <div
                  className="h-full rounded-md"
                  style={{ width: `${width}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DistributionBlocks;
