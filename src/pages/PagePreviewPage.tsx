import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import DynamicChart, {
  ChartType,
} from "../components/panelComponents/FormElements/DynamicChart";
import GenericPaginatedPage from "../components/panelComponents/FormElements/GenericPaginatedPage";
import GenericTabPage from "../components/panelComponents/FormElements/GenericTabPage";
import {
  ComponentBlock,
  GridCell,
  GridSection,
  TableComponentConfig,
} from "../types/page";
import { useGetTenantPages } from "../utils/api/page";

// Map component type to chart type
const getChartTypeFromComponentType = (
  componentType: string
): ChartType | null => {
  const mapping: Record<string, ChartType> = {
    barChart: "bar",
    lineChart: "line",
    pieChart: "pie",
    areaChart: "area",
    radarChart: "radar",
    heatmapChart: "heatmap",
    scatterChart: "scatter",
    funnelChart: "funnel",
    sankeyChart: "sankey",
    sunburstChart: "sunburst",
    treemapChart: "treemap",
    calendarChart: "calendar",
    bumpChart: "bump",
    streamChart: "stream",
    waffleChart: "waffle",
    circlePackingChart: "circle-packing",
  };
  return mapping[componentType] || null;
};

// Render a single component
const RenderComponent: React.FC<{ component: ComponentBlock }> = ({
  component,
}) => {
  const { type, dataBinding, tabs, title, props } = component;
  const tableConfig =
    component.table ||
    (props?.table as TableComponentConfig | undefined) ||
    (props?.columns || props?.rows || props?.cache
      ? (props as TableComponentConfig)
      : undefined);

  switch (type) {
    case "table":
      if (dataBinding?.kind === "schema" && dataBinding.schemaName) {
        return (
          <GenericPaginatedPage
            schemaName={dataBinding.schemaName}
            isHeader={false}
            tableConfig={tableConfig}
          />
        );
      }
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800 text-sm">
            Table component requires schema binding
          </p>
        </div>
      );

    case "tabPanel":
      if (tabs && Array.isArray(tabs) && tabs.length > 0) {
        const allTabsAreTables = tabs.every(
          (tab) =>
            tab.components.length === 1 && tab.components[0]?.type === "table"
        );

        if (allTabsAreTables) {
          const tabsConfig = tabs.map((tab) => {
            const schemaName = tab.components[0]?.dataBinding?.schemaName || "";
            return {
              schemaName,
              label: tab.title,
              isPaginated: true,
              tableConfig: tab.components[0]?.table,
            };
          });
          return <GenericTabPage tabs={tabsConfig} />;
        }
      }
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800 text-sm">
            TabPanel component requires tabs configuration
          </p>
        </div>
      );

    case "barChart":
    case "lineChart":
    case "pieChart":
    case "areaChart":
    case "radarChart":
    case "heatmapChart":
    case "scatterChart":
    case "funnelChart":
    case "sankeyChart":
    case "sunburstChart":
    case "treemapChart":
    case "calendarChart":
    case "bumpChart":
    case "streamChart":
    case "waffleChart":
    case "circlePackingChart": {
      const chartType = getChartTypeFromComponentType(type);
      if (!chartType) {
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-yellow-800 text-sm">
              Invalid chart type: {type}
            </p>
          </div>
        );
      }

      if (
        dataBinding?.kind === "pipeline" &&
        dataBinding.schemaName &&
        dataBinding.pipelineName
      ) {
        return (
          <DynamicChart
            config={{
              type: chartType,
              title: title,
              height: (props?.height as number | undefined) || 400,
              width: (props?.width as string | undefined) || "100%",
              chartOptions: props?.chartOptions as
                | Record<string, unknown>
                | undefined,
              dataBinding: {
                kind: "pipeline",
                schemaName: dataBinding.schemaName,
                pipelineName: dataBinding.pipelineName,
                params: dataBinding.params,
              },
            }}
          />
        );
      }
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800 text-sm">
            Chart component requires pipeline binding
          </p>
        </div>
      );
    }

    default:
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800 text-sm">
            Unknown component type: <code>{type}</code>
          </p>
        </div>
      );
  }
};

// Render a grid cell
const GridCellView: React.FC<{ cell: GridCell }> = ({ cell }) => {
  const { row, column, rowSpan = 1, colSpan = 1, components } = cell;
  const sortedComponents = [...components].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div
      style={{
        gridRow: `${row} / span ${rowSpan}`,
        gridColumn: `${column} / span ${colSpan}`,
      }}
    >
      <div className="flex flex-col gap-4 h-full">
        {sortedComponents.map((component) => (
          <RenderComponent key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
};

// Render a grid section
const GridSectionView: React.FC<{ grid: GridSection }> = ({ grid }) => {
  const { columns, gap = 16, cells } = grid;

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {cells.map((cell) => (
        <GridCellView key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export const PagePreviewPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const pages = useGetTenantPages();

  const page = useMemo(() => {
    if (!pages || !pageId) return null;
    return pages.find((p: any) => p._id === pageId || p.id === pageId);
  }, [pages, pageId]);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or you don't have access
            to it.
          </p>
        </div>
      </div>
    );
  }

  // Extract grid sections from page.sections
  const gridSections: GridSection[] =
    page.sections
      ?.map((s: any) => {
        // Handle nested structure (type: "grid", grid: {...})
        if (s.type === "grid" && s.grid) {
          return s.grid;
        }
        // Handle flat structure (columns, cells directly on section)
        if (s.columns && s.cells) {
          return {
            columns: s.columns,
            gap: s.gap,
            cells: s.cells,
          };
        }
        return null;
      })
      .filter((g: any) => g !== null) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{page.name}</h1>
        <div className="flex flex-col gap-8">
          {gridSections.map((section, index) => (
            <GridSectionView key={index} grid={section} />
          ))}
        </div>
      </div>
    </div>
  );
};
