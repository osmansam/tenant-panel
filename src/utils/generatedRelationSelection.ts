import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import type { TableComponentConfig } from "../types/page";
import { get } from "./api";
import { getSelectionQueryConfig } from "./selectionQuery";
import { GENERATED_RELATION_COLUMNS_MAX_RECORDS } from "./generatedRelationColumns";

type SelectionResponse =
  | Array<Record<string, unknown>>
  | { data?: Array<Record<string, unknown>>; items?: Array<Record<string, unknown>> };

const getItems = (response: SelectionResponse | undefined) =>
  Array.isArray(response) ? response : response?.data || response?.items || [];

export const useGeneratedRelationSelectionData = (
  tableConfig: TableComponentConfig | undefined,
): Record<string, Array<Record<string, unknown>>> => {
  const groups = useMemo(
    () => tableConfig?.generatedRelationColumns || [],
    [tableConfig?.generatedRelationColumns],
  );
  const results = useQueries({
    queries: groups.map((group) => {
      const limit = Math.min(
        GENERATED_RELATION_COLUMNS_MAX_RECORDS,
        Math.max(1, group.sourceLimit || GENERATED_RELATION_COLUMNS_MAX_RECORDS),
      );
      const { path, queryKey } = getSelectionQueryConfig({
        schemaName: group.sourceSchemaName,
        fieldName: group.sourceLabelField,
        valueField: group.sourceIdField || "_id",
        extraParams: { limit },
      });
      return {
        queryKey,
        queryFn: () => get<SelectionResponse>({ path }),
        enabled: Boolean(
          group.id &&
            group.sourceSchemaName &&
            group.sourceLabelField &&
            group.arrayField,
        ),
        staleTime: Infinity,
      };
    }),
  });
  return groups.reduce<Record<string, Array<Record<string, unknown>>>>(
    (map, group, index) => {
      map[group.id] = getItems(results[index]?.data);
      return map;
    },
    {},
  );
};

