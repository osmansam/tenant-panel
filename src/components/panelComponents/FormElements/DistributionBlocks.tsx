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
  resolvedParams?: Record<string, unknown>;
};

const CURATED_COLORS = [
  "#4f46e5", // Indigo
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#8b5cf6", // Purple
  "#f97316", // Orange
  "#14b8a6", // Teal
  "#3b82f6", // Blue
  "#6366f1", // Indigo Light
];

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
  resolvedParams,
}) => {
  const source = config?.source || "static";
  const isDynamic = config?.isDynamic || false;
  const limit = isDynamic ? (config?.dynamicLimit || 50) : 1;

  const shouldFetchTable =
    source !== "static" &&
    source !== "workflow" &&
    Boolean(dataBinding?.schemaName);

  const payload = useGetTableSourceItems<Record<string, unknown>>(
    1,
    limit,
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
    resolvedParams,
  );

  const workflowData = useGetWorkflowData<Record<string, unknown>>(
    source === "workflow"
      ? {
          schemaName: dataBinding?.schemaName,
          workflowName: dataBinding?.workflowName,
          params: dataBinding?.params,
        }
      : {},
    resolvedParams,
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

  const resolvedItems = useMemo(() => {
    if (!isDynamic) {
      return (config?.items || []).slice(0, 5);
    }

    let dataList: Record<string, unknown>[] = [];
    if (source === "workflow") {
      if (Array.isArray(workflowData)) {
        dataList = workflowData;
      } else if (workflowData && typeof workflowData === "object") {
        const arrayField =
          (workflowData as any).items ||
          (workflowData as any).data ||
          (workflowData as any).list;
        if (Array.isArray(arrayField)) {
          dataList = arrayField;
        } else {
          dataList = [workflowData];
        }
      }
    } else {
      dataList = payload?.items || [];
    }

    const dynamicItem = config?.dynamicItem;
    if (!dynamicItem) return [];

    const maxLimit = config?.dynamicLimit || 50;
    return dataList.slice(0, maxLimit).map((dataItem, index) => {
      const rawColor = resolveTemplate(dynamicItem.color || "", dataItem) || dynamicItem.color;
      const color = rawColor?.toLowerCase() === "random"
        ? CURATED_COLORS[index % CURATED_COLORS.length]
        : rawColor;
      return {
        label: resolveTemplate(dynamicItem.label || "", dataItem),
        value: resolveTemplate(dynamicItem.value || "", dataItem),
        percent: resolveTemplate(dynamicItem.percent || "", dataItem),
        color,
        itemContext: dataItem,
      };
    });
  }, [isDynamic, config?.items, config?.dynamicItem, config?.dynamicLimit, source, workflowData, payload?.items]);

  if (resolvedItems.length === 0) return null;

  return (
    <section className="rounded-xl border border-neutral-200 bg-white px-6 py-5 shadow-sm">
      {title && (
        <h3 className="mb-4 text-lg font-bold tracking-tight text-neutral-950">
          {resolveTemplate(title, context)}
        </h3>
      )}

      <div
        className="mb-4 grid gap-3.5"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(135px, 100%), 1fr))",
        }}
      >
        {resolvedItems.map((item, index) => {
          const itemContext = (item as any).itemContext || context;
          const color = item.color?.trim() || "#4f46e5";
          return (
            <div
              key={`${item.label || "distribution-tile"}-${index}`}
              className="min-h-[76px] rounded-lg bg-neutral-50 px-3.5 py-3 text-center flex flex-col justify-center"
            >
              <div
                className="truncate text-2xl font-bold leading-8 tracking-tight"
                style={{ color }}
              >
                {resolveTemplate(item.value, itemContext)}
              </div>
              <div className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                {resolveTemplate(item.label, itemContext)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3.5">
        {resolvedItems.map((item, index) => {
          const itemContext = (item as any).itemContext || context;
          const color = item.color?.trim() || "#4f46e5";
          const resolvedPercent = resolveTemplate(item.percent, itemContext);
          const width = parsePercent(resolvedPercent);
          return (
            <div key={`${item.label || "distribution-row"}-${index}`}>
              <div className="mb-1 flex items-center justify-between gap-4 text-sm font-semibold text-neutral-500">
                <span className="min-w-0 truncate">
                  {resolveTemplate(item.label, itemContext)}
                </span>
                <span className="shrink-0">{formatPercent(resolvedPercent)}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-md bg-neutral-200">
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
