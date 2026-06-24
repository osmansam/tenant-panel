import React, { useMemo } from "react";
import { DataBinding, InfoBlocksConfig } from "../../../types/page";
import {
  resolveConditionalColor,
  resolveTemplate,
} from "../../../utils/templateExpressions";
import {
  useGetTableSourceItems,
  useGetWorkflowData,
} from "../../../utils/dynamic";

type InfoBlocksProps = {
  config?: InfoBlocksConfig;
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

const InfoBlocks: React.FC<InfoBlocksProps> = ({ config, dataBinding, resolvedParams }) => {
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
        title: resolveTemplate(dynamicItem.title || "", dataItem),
        value: resolveTemplate(dynamicItem.value || "", dataItem),
        footer: resolveTemplate(dynamicItem.footer || "", dataItem),
        color,
        titleColorRules: dynamicItem.titleColorRules,
        footerColorRules: dynamicItem.footerColorRules,
        itemContext: dataItem,
      };
    });
  }, [isDynamic, config?.items, config?.dynamicItem, config?.dynamicLimit, source, workflowData, payload?.items]);

  if (resolvedItems.length === 0) return null;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(min(170px, 100%), 1fr))",
      }}
    >
      {resolvedItems.map((item, index) => {
        const itemContext = (item as any).itemContext || context;
        const color = item.color?.trim();
        const titleColor = resolveConditionalColor(
          item.titleColorRules,
          itemContext,
        );
        const footerColor = resolveConditionalColor(
          item.footerColorRules,
          itemContext,
        );
        return (
          <div
            key={`${item.title || "info-block"}-${index}`}
            className="group relative min-h-[86px] overflow-hidden rounded-lg border border-neutral-200 bg-white px-4.5 py-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-neutral-300 hover:shadow-[0_12px_28px_rgba(16,24,40,0.08)]"
            style={
              color
                ? {
                    borderLeftColor: color,
                    borderLeftWidth: 4,
                  }
                : undefined
            }
          >
            <div className="flex h-full min-w-0 flex-col justify-between gap-1.5">
              <div
                className="truncate text-xs font-semibold uppercase tracking-wider text-neutral-500"
                style={titleColor ? { color: titleColor } : undefined}
              >
                {resolveTemplate(item.title, itemContext)}
              </div>
              <div
                className="truncate text-2xl font-bold leading-8 tracking-tight text-neutral-950 tabular-nums"
                style={color ? { color } : undefined}
              >
                {resolveTemplate(item.value, itemContext)}
              </div>
              <div
                className="truncate text-xs font-medium leading-4 text-neutral-400"
                style={footerColor ? { color: footerColor } : undefined}
              >
                {resolveTemplate(item.footer, itemContext)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoBlocks;
