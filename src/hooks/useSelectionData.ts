import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { get } from "../utils/api";
import { Field } from "../utils/api/container";

const BASE = "/dynamic";

// Helper to stringify query params (copied from dynamic.ts to avoid circular deps or export issues)
const qs = (params: Record<string, unknown>) =>
  new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => [k, String(v)])
  ).toString();

/**
 * Custom hook to dynamically fetch selection data for fields with populationSettings.
 * Uses useQueries to handle any number of fields and properly manages enabled state.
 */
export function useSelectionData(
  fields: Field[]
): Map<string, Array<Record<string, unknown>>> {
  // 1) Identify fields that need selection data
  const fieldsNeedingSelection = useMemo(
    () =>
      fields.filter((f) => {
        const fieldType = (f.type || "").toLowerCase();
        return (
          (fieldType === "objectid" || fieldType === "autoincrementid" || fieldType === "objectidarray") &&
          f.populationSettings &&
          f.objectSchemaName &&
          f.populationSettings.inputSelectionField
        );
      }),
    [fields]
  );

  // 2) Use useQueries to fetch data for all identified fields in parallel
  const queryResults = useQueries({
    queries: fieldsNeedingSelection.map((field) => {
      const schemaName = field.objectSchemaName || "";
      const fieldName = field.populationSettings?.inputSelectionField || "";
      const hasParams = Boolean(schemaName && fieldName);
      
      const path = `${BASE}/selection?${qs({ schemaName, fieldName })}`;
      
      return {
        queryKey: ["dynamic", schemaName, "selection", fieldName],
        queryFn: () => get<Array<Record<string, unknown>>>({ path }),
        enabled: hasParams,
        staleTime: Infinity,
      };
    }),
  });

  // 3) Map field names to their selection data
  const selectionDataMap = useMemo(() => {
    const map = new Map<string, Array<Record<string, unknown>>>();

    fieldsNeedingSelection.forEach((field, index) => {
      const result = queryResults[index];
      if (result && result.data) {
        map.set(field.name, result.data);
      }
    });

    return map;
  }, [fieldsNeedingSelection, queryResults]);

  return selectionDataMap;
}
