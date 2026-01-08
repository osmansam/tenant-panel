import { lazy, Suspense, useMemo } from "react";
import { generateMockChartData } from "../../../utils/mockDataGenerator";

export type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "area"
  | "radar"
  | "heatmap"
  | "scatter"
  | "funnel"
  | "sankey"
  | "sunburst"
  | "treemap"
  | "calendar"
  | "chord"
  | "network"
  | "stream"
  | "waffle"
  | "bump"
  | "circle-packing";

export interface ChartConfig {
  type: ChartType; // Chart type is passed from component type
  schemaName?: string; // Optional when using dataBinding
  pipelineName?: string; // Optional when using dataBinding
  title?: string;
  height?: number;
  width?: string;
  additionalParams?: Record<string, unknown>;
  chartOptions?: Record<string, unknown>; // Nivo-specific options
  dataBinding?: {
    kind: "pipeline";
    schemaName: string;
    pipelineName: string;
    params?: Record<string, unknown>;
  };
}

interface DynamicChartProps {
  config: ChartConfig;
}

// Chart component mapping - dynamically import Nivo components
const getChartComponent = (type: ChartType) => {
  switch (type) {
    case "bar":
      return lazy(() =>
        import("@nivo/bar").then((mod) => ({
          default: mod.ResponsiveBar,
        }))
      );
    case "line":
      return lazy(() =>
        import("@nivo/line").then((mod) => ({
          default: mod.ResponsiveLine,
        }))
      );
    case "pie":
      return lazy(() =>
        import("@nivo/pie").then((mod) => ({
          default: mod.ResponsivePie,
        }))
      );
    case "area":
      return lazy(() =>
        import("@nivo/bump").then((mod) => ({
          default: mod.ResponsiveAreaBump,
        }))
      );
    case "radar":
      return lazy(() =>
        import("@nivo/radar").then((mod) => ({
          default: mod.ResponsiveRadar,
        }))
      );
    case "heatmap":
      return lazy(() =>
        import("@nivo/heatmap").then((mod) => ({
          default: mod.ResponsiveHeatMap,
        }))
      );
    case "scatter":
      return lazy(() =>
        import("@nivo/scatterplot").then((mod) => ({
          default: mod.ResponsiveScatterPlot,
        }))
      );
    case "funnel":
      return lazy(() =>
        import("@nivo/funnel").then((mod) => ({
          default: mod.ResponsiveFunnel,
        }))
      );
    case "sankey":
      return lazy(() =>
        import("@nivo/sankey").then((mod) => ({
          default: mod.ResponsiveSankey,
        }))
      );
    case "sunburst":
      return lazy(() =>
        import("@nivo/sunburst").then((mod) => ({
          default: mod.ResponsiveSunburst,
        }))
      );
    case "treemap":
      return lazy(() =>
        import("@nivo/treemap").then((mod) => ({
          default: mod.ResponsiveTreeMap,
        }))
      );
    case "calendar":
      return lazy(() =>
        import("@nivo/calendar").then((mod) => ({
          default: mod.ResponsiveCalendar,
        }))
      );
    case "chord":
      return lazy(() =>
        import("@nivo/chord").then((mod) => ({
          default: mod.ResponsiveChord,
        }))
      );
    case "network":
      return lazy(() =>
        import("@nivo/network").then((mod) => ({
          default: mod.ResponsiveNetwork,
        }))
      );
    case "stream":
      return lazy(() =>
        import("@nivo/stream").then((mod) => ({
          default: mod.ResponsiveStream,
        }))
      );
    case "waffle":
      return lazy(() =>
        import("@nivo/waffle").then((mod) => ({
          default: mod.ResponsiveWaffle,
        }))
      );
    case "bump":
      return lazy(() =>
        import("@nivo/bump").then((mod) => ({
          default: mod.ResponsiveBump,
        }))
      );
    case "circle-packing":
      return lazy(() =>
        import("@nivo/circle-packing").then((mod) => ({
          default: mod.ResponsiveCirclePacking,
        }))
      );
    default:
      return null;
  }
};

// Default configurations for each chart type
const getDefaultConfig = (type: ChartType): Record<string, unknown> => {
  const commonMargin = { top: 50, right: 130, bottom: 50, left: 60 };

  switch (type) {
    case "bar":
      return {
        margin: commonMargin,
        padding: 0.3,
        valueScale: { type: "linear" },
        indexScale: { type: "band", round: true },
        colors: { scheme: "nivo" },
        axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 0 },
        axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0 },
        labelSkipWidth: 12,
        labelSkipHeight: 12,
      };
    case "line":
      return {
        margin: { top: 50, right: 110, bottom: 50, left: 60 },
        xScale: { type: "point" },
        yScale: { type: "linear", min: "auto", max: "auto" },
        axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 0 },
        axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0 },
        pointSize: 10,
        pointBorderWidth: 2,
        useMesh: true,
      };
    case "pie":
      return {
        margin: { top: 40, right: 80, bottom: 80, left: 80 },
        innerRadius: 0.5,
        padAngle: 0.7,
        cornerRadius: 3,
        activeOuterRadiusOffset: 8,
      };
    case "radar":
      return {
        margin: { top: 70, right: 80, bottom: 40, left: 80 },
        curve: "linearClosed",
      };
    case "heatmap":
      return {
        margin: { top: 60, right: 90, bottom: 60, left: 90 },
        axisTop: { tickSize: 5, tickPadding: 5, tickRotation: -90 },
        axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0 },
      };
    case "calendar":
      return {
        margin: { top: 40, right: 40, bottom: 40, left: 40 },
        emptyColor: "#eeeeee",
        yearSpacing: 40,
        monthBorderColor: "#ffffff",
        dayBorderWidth: 2,
        dayBorderColor: "#ffffff",
        colors: ["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"],
        legends: [
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ],
      };
    default:
      return { margin: commonMargin };
  }
};

export default function DynamicChart({ config }: DynamicChartProps) {
  const {
    type,
    schemaName: directSchemaName,
    pipelineName: directPipelineName,
    title,
    height = 400,
    width = "100%",
    additionalParams,
    chartOptions = {},
    dataBinding,
  } = config;

  // Extract schema and pipeline name from either direct props or dataBinding
  const schemaName = dataBinding?.schemaName || directSchemaName || "";
  const pipelineName = dataBinding?.pipelineName || directPipelineName || "";
  const params = dataBinding?.params || additionalParams;

  // Generate mock data based on chart type for preview mode
  const data = useMemo(() => generateMockChartData(type), [type]);

  // Get the chart component dynamically
  const ChartComponent = useMemo(() => getChartComponent(type), [type]);

  // Merge default config with custom options
  const finalConfig = useMemo(() => {
    const defaultConfig = getDefaultConfig(type);
    let config = { ...defaultConfig, ...chartOptions };

    // Special handling for calendar chart - extract date range from data
    if (type === "calendar" && data && Array.isArray(data) && data.length > 0) {
      // Extract dates from data if not provided in chartOptions
      if (!config.from || !config.to) {
        const dates = data
          .map((d: any) => d.day || d.date)
          .filter(Boolean)
          .sort();

        if (dates.length > 0) {
          config = {
            ...config,
            from: config.from || dates[0],
            to: config.to || dates[dates.length - 1],
          };
        }
      }
    }

    return config;
  }, [type, chartOptions, data]);

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="w-full px-2">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        )}
        <div
          className="flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200"
          style={{ height, width }}
        >
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  if (!ChartComponent) {
    return (
      <div className="w-full px-2">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        )}
        <div
          className="flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200"
          style={{ height, width }}
        >
          <p className="text-red-500">Unsupported chart type: {type}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      )}
      <div style={{ height, width }}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading chart...</p>
            </div>
          }
        >
          <ChartComponent {...({ data, ...finalConfig } as any)} />
        </Suspense>
      </div>
    </div>
  );
}
