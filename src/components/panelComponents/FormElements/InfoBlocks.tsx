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
};

const InfoBlocks: React.FC<InfoBlocksProps> = ({ config, dataBinding }) => {
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
    <div
      className="grid gap-5"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
      }}
    >
      {items.map((item, index) => {
        const color = item.color?.trim();
        const titleColor = resolveConditionalColor(
          item.titleColorRules,
          context,
        );
        const footerColor = resolveConditionalColor(
          item.footerColorRules,
          context,
        );
        return (
          <div
            key={`${item.title || "info-block"}-${index}`}
            className="min-h-[132px] rounded-2xl border border-neutral-200 bg-white px-8 py-7 shadow-sm"
            style={color ? { borderLeft: `5px solid ${color}` } : undefined}
          >
            <div className="flex h-full min-w-0 flex-col justify-between gap-3">
              <div
                className="truncate text-xl font-semibold text-neutral-500"
                style={titleColor ? { color: titleColor } : undefined}
              >
                {resolveTemplate(item.title, context)}
              </div>
              <div
                className="truncate text-4xl font-semibold leading-none text-neutral-950"
                style={color ? { color } : undefined}
              >
                {resolveTemplate(item.value, context)}
              </div>
              <div
                className="truncate text-lg font-semibold text-neutral-400"
                style={footerColor ? { color: footerColor } : undefined}
              >
                {resolveTemplate(item.footer, context)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoBlocks;
