import { useQueries } from "@tanstack/react-query";
import { FormComponentConfig } from "../../types/page";
import { get } from "../../utils/api";
import { FormSelectionDataMap } from "../../utils/formConfig";
import {
  hasDependentSelectFilters,
  referencedSelectRecordFields,
} from "../../utils/selectFilters";
import { getSelectionQueryConfig } from "../../utils/selectionQuery";
import { getEffectiveSelectDataFields } from "../../utils/selectOptionConfig";

type SelectionResponse =
  | Array<Record<string, unknown>>
  | {
      data?: Array<Record<string, unknown>>;
      items?: Array<Record<string, unknown>>;
    };

export const useFormSelectionData = (
  form: FormComponentConfig,
): FormSelectionDataMap => {
  const allFields = form.fields || [];
  const fields = allFields.filter(
    (field) =>
      field.type === "select" &&
      !hasDependentSelectFilters(field) &&
      field.optionsSource === "schema" &&
      field.sourceSchemaName,
  );
  const queries = useQueries({
    queries: fields.map((field) => {
      const fieldName = field.sourceLabelField || field.sourceValueField || "_id";
      const mappings = (form.objectLists || []).flatMap((list) => list.fieldMappings || []);
      const dataFields = Array.from(
        new Set([
          ...getEffectiveSelectDataFields(field, mappings),
          ...referencedSelectRecordFields(allFields, field.formKey),
        ]),
      ).filter(
        (name) => name !== fieldName && name !== (field.sourceValueField || "_id"),
      );
      const { path, queryKey } = getSelectionQueryConfig({
        schemaName: field.sourceSchemaName || "",
        fieldName,
        valueField: field.sourceValueField || "_id",
        dataFields,
        filterParams: field.sourceRequestFilters,
      });
      return {
        queryKey,
        queryFn: () =>
          get<SelectionResponse>({
            path,
          }),
        enabled: Boolean(field.sourceSchemaName && fieldName),
        staleTime: Infinity,
      };
    }),
  });

  return fields.reduce<FormSelectionDataMap>((map, field, index) => {
    const response = queries[index]?.data;
    const items = Array.isArray(response)
      ? response
      : response?.data || response?.items || [];
    map.set(field.formKey, items);
    return map;
  }, new Map());
};
