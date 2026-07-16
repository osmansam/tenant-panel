import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { TableComponentConfig } from "../types/page";
import { get } from "./api";
import { getSelectionQueryConfig } from "./selectionQuery";
import {
  collectTableLookupConfigs,
  getTableLookupKey,
  TableLookupSelectionDataMap,
} from "./tableConfig";

type SelectionResponse =
  | Array<Record<string, unknown>>
  | {
      data?: Array<Record<string, unknown>>;
      items?: Array<Record<string, unknown>>;
    };

const getSelectionItems = (
  response: SelectionResponse | undefined,
): Array<Record<string, unknown>> => {
  if (Array.isArray(response)) return response;
  return response?.data || response?.items || [];
};

export const useTableLookupSelectionData = (
  tableConfig: TableComponentConfig | undefined,
): TableLookupSelectionDataMap => {
  const lookups = useMemo(
    () => collectTableLookupConfigs(tableConfig),
    [tableConfig],
  );

  const results = useQueries({
    queries: lookups.map((lookup) => {
      const { path, queryKey } = getSelectionQueryConfig({
        schemaName: lookup.schemaName || "",
        fieldName: lookup.labelField || "",
        valueField: lookup.matchField || "_id",
      });

      return {
        queryKey,
        queryFn: () => get<SelectionResponse>({ path }),
        enabled: Boolean(lookup.schemaName && lookup.labelField),
        staleTime: Infinity,
      };
    }),
  });

  return lookups.reduce<TableLookupSelectionDataMap>((map, lookup, index) => {
    map.set(getTableLookupKey(lookup), getSelectionItems(results[index]?.data));
    return map;
  }, new Map());
};
