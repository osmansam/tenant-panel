import { cleanRules, cleanTableActions, cleanFilterPanelInputs, cleanSelectFilterBindings, cleanConstantFilters, cleanConstantSort } from "./designerCleaners";
import { FormComponentConfig, TableComponentConfig } from "../../types/page";
import { cleanDesignerGeneratedRelationColumns, cleanDesignerTableColumnTemplate, cleanDesignerTableDataFields, cleanDesignerTableDataMode, cleanDesignerTableDrag, cleanDesignerTableToggles, cleanDesignerToggleBinding, normalizeDesignerTableColumnLink } from "../../utils/pageDesignerTableConfig";
import { cleanArrayTableDataMode, cleanArrayTableSource } from "../../utils/pageDesignerArraySource";
import { normalizeDesignerCalculations } from "./formCalculationEditor";

export const cleanTableConfig = (
  tableConfig: TableComponentConfig,
): TableComponentConfig => ({
  dataMode: cleanDesignerTableDataMode(
    cleanArrayTableDataMode(tableConfig.dataMode, tableConfig.arraySource),
  ),
  ...(cleanDesignerTableDataFields(tableConfig.dataFields)
    ? { dataFields: cleanDesignerTableDataFields(tableConfig.dataFields) }
    : {}),
  ...(tableConfig.actionsColumnLabel?.trim() ? { actionsColumnLabel: tableConfig.actionsColumnLabel } : {}),
  ...(tableConfig.searchPlaceholder?.trim() ? { searchPlaceholder: tableConfig.searchPlaceholder } : {}),
  ...(tableConfig.enableSearch === false ? { enableSearch: false } : {}),
  columns: (tableConfig.columns || [])
    .filter((column) => column.field.trim())
    .map((column) => ({
      field: column.field.trim(),
      ...(column.type && column.type !== "field" ? { type: column.type } : {}),
      ...(column.displayName?.trim()
        ? { displayName: column.displayName.trim() }
        : {}),
      ...(column.type === "date" && column.dateFormat
        ? { dateFormat: column.dateFormat }
        : {}),
      ...(column.type === "lookupLabel" &&
      column.lookup?.schemaName?.trim() &&
      column.lookup?.labelField?.trim()
        ? {
            lookup: {
              schemaName: column.lookup.schemaName.trim(),
              matchField: column.lookup.matchField?.trim() || "_id",
              labelField: column.lookup.labelField.trim(),
            },
          }
        : {}),
      ...(column.type === "lookupLabel" && column.fallbackValue?.trim()
        ? { fallbackValue: column.fallbackValue.trim() }
        : {}),
      ...(column.type === "computedLabel" &&
      (column.computedLabelRules || []).some(
        (rule) => rule.condition?.trim() || rule.value?.trim(),
      )
        ? {
            computedLabelRules: (column.computedLabelRules || [])
              .filter((rule) => rule.condition?.trim() || rule.value?.trim())
              .map((rule) => ({
                condition: rule.condition?.trim() || "",
                value: rule.value?.trim() || "",
              })),
          }
        : {}),
      ...(column.type === "computedLabel" && column.fallbackValue?.trim()
        ? { fallbackValue: column.fallbackValue.trim() }
        : {}),
      ...(cleanDesignerTableColumnTemplate(column)
        ? { template: cleanDesignerTableColumnTemplate(column) }
        : {}),
      ...(column.type === "progressBar"
        ? {
            progressBar: {
              sourceField:
                column.progressBar?.sourceField?.trim() || column.field.trim(),
              max: Number(column.progressBar?.max ?? 8),
              ...(column.progressBar?.maxField?.trim()
                ? { maxField: column.progressBar.maxField.trim() }
                : {}),
              color: column.progressBar?.color?.trim() || "#4d9f24",
              trackColor: column.progressBar?.trackColor?.trim() || "#e7e5df",
              height: Number(column.progressBar?.height ?? 12),
              width: Number(column.progressBar?.width ?? 260),
              showValue: column.progressBar?.showValue !== false,
              ...(column.progressBar?.colorRules?.some(
                (rule) => rule.condition?.trim() || rule.color?.trim(),
              )
                ? {
                    colorRules: column.progressBar.colorRules
                      .filter(
                        (rule) => rule.condition?.trim() || rule.color?.trim(),
                      )
                      .map((rule) => ({
                        condition: rule.condition?.trim() || "",
                        color: rule.color?.trim() || "",
                      })),
                  }
                : {}),
            },
          }
        : {}),
      ...(cleanRules(column.cellClassName).length > 0
        ? { cellClassName: cleanRules(column.cellClassName) }
        : {}),
      ...(() => {
        const link = normalizeDesignerTableColumnLink(column.link);
        return link ? { link } : {};
      })(),
      ...(() => {
        const visibilityToggle = cleanDesignerToggleBinding(
          column.visibilityToggle,
        );
        return visibilityToggle ? { visibilityToggle } : {};
      })(),
      ...(() => {
        const booleanEditToggle = cleanDesignerToggleBinding(
          column.booleanEditToggle,
        );
        return booleanEditToggle ? { booleanEditToggle } : {};
      })(),
      ...(() => {
        const booleanDisplayToggle = cleanDesignerToggleBinding(
          column.booleanDisplayToggle,
        );
        return booleanDisplayToggle ? { booleanDisplayToggle } : {};
      })(),
    })),
  ...(cleanRules(tableConfig.rows?.className).length > 0
    ? { rows: { className: cleanRules(tableConfig.rows?.className) } }
    : {}),
  ...(tableConfig.nestedRows?.enabled &&
  tableConfig.nestedRows.field?.trim() &&
  (tableConfig.nestedRows.columns || []).some((column) => column.field?.trim())
    ? {
        nestedRows: {
          enabled: true,
          field: tableConfig.nestedRows.field.trim(),
          ...(tableConfig.nestedRows.header?.trim()
            ? { header: tableConfig.nestedRows.header.trim() }
            : {}),
          columns: (tableConfig.nestedRows.columns || [])
            .filter((column) => column.field?.trim())
            .map((column) => ({
              field: column.field.trim(),
              ...(column.displayName?.trim()
                ? { displayName: column.displayName.trim() }
                : {}),
              ...(column.type && column.type !== "field"
                ? { type: column.type }
                : {}),
              ...(column.type === "date" && column.dateFormat
                ? { dateFormat: column.dateFormat }
                : {}),
              ...(column.type === "lookupLabel" &&
              column.lookup?.schemaName?.trim() &&
              column.lookup?.labelField?.trim()
                ? {
                    lookup: {
                      schemaName: column.lookup.schemaName.trim(),
                      matchField: column.lookup.matchField?.trim() || "_id",
                      labelField: column.lookup.labelField.trim(),
                    },
                  }
                : {}),
              ...(column.type === "lookupLabel" && column.fallbackValue?.trim()
                ? { fallbackValue: column.fallbackValue.trim() }
                : {}),
            })),
        },
      }
    : {}),
  ...(cleanArrayTableSource(tableConfig.arraySource)
    ? { arraySource: cleanArrayTableSource(tableConfig.arraySource) }
    : {}),
  ...(tableConfig.cache?.invalidateKeys?.filter((key) => key.trim()).length
    ? {
        cache: {
          invalidateKeys: tableConfig.cache.invalidateKeys
            .map((key) => key.trim())
            .filter(Boolean),
        },
      }
    : {}),
  ...(cleanConstantFilters(tableConfig.constantFilters)
    ? { constantFilters: cleanConstantFilters(tableConfig.constantFilters) }
    : {}),
  ...(cleanConstantSort(tableConfig.constantSort)
    ? { constantSort: cleanConstantSort(tableConfig.constantSort) }
    : {}),
  ...(cleanDesignerTableDrag(tableConfig.drag)
    ? { drag: cleanDesignerTableDrag(tableConfig.drag) }
    : {}),
  ...(cleanTableActions(
    tableConfig.addButton ? [{ ...tableConfig.addButton, kind: "create" }] : [],
  )[0]
    ? {
        addButton: cleanTableActions(
          tableConfig.addButton
            ? [{ ...tableConfig.addButton, kind: "create" }]
            : [],
        )[0],
      }
    : {}),
  ...(cleanTableActions(
    (tableConfig.actions || []).filter((action) => action.kind !== "create"),
  ).length > 0
    ? {
        actions: cleanTableActions(
          (tableConfig.actions || []).filter(
            (action) => action.kind !== "create",
          ),
        ),
      }
    : {}),
  ...(tableConfig.bulkActions !== undefined
    ? {
        bulkActions: {
          ...(cleanTableActions(
            tableConfig.bulkActions.edit
              ? [{ ...tableConfig.bulkActions.edit, kind: "update" }]
              : [],
          )[0]
            ? {
                edit: cleanTableActions(
                  tableConfig.bulkActions.edit
                    ? [{ ...tableConfig.bulkActions.edit, kind: "update" }]
                    : [],
                )[0],
              }
            : {}),
          ...(cleanTableActions(
            tableConfig.bulkActions.delete
              ? [{ ...tableConfig.bulkActions.delete, kind: "delete" }]
              : [],
          )[0]
            ? {
                delete: cleanTableActions(
                  tableConfig.bulkActions.delete
                    ? [{ ...tableConfig.bulkActions.delete, kind: "delete" }]
                    : [],
                )[0],
              }
            : {}),
        },
      }
    : {}),
  ...(tableConfig.filterPanel !== undefined
    ? {
        filterPanel: {
          inputs: cleanFilterPanelInputs(tableConfig.filterPanel.inputs || []),
        },
      }
    : {}),
  ...(cleanDesignerTableToggles(tableConfig.toggles).length
    ? { toggles: cleanDesignerTableToggles(tableConfig.toggles) }
    : {}),
  ...(cleanDesignerGeneratedRelationColumns(
    tableConfig.generatedRelationColumns,
  ).length
    ? {
        generatedRelationColumns: cleanDesignerGeneratedRelationColumns(
          tableConfig.generatedRelationColumns,
        ),
      }
    : {}),
});

// Exported for a save-boundary regression test; this remains a pure serializer.
// eslint-disable-next-line react-refresh/only-export-components
export const cleanFormConfig = (input: FormComponentConfig): FormComponentConfig => {
  const form = normalizeDesignerCalculations(input);
  return {
  title: form.title?.trim() || "",
  schemaName: form.schemaName.trim(),
  layout: {
    variant: form.layout?.variant || "page",
    columns: form.layout?.columns || 2,
    areas: (form.layout?.areas || [])
      .filter((area) => area.key)
      .map((area) => ({
        ...area,
        title: area.title?.trim() || "",
        className: area.className?.trim() || "",
      })),
  },
  fields: (form.fields || [])
    .filter((field) => field.formKey.trim() && field.type)
    .map((field, index) => ({
      ...field,
      formKey: field.formKey.trim(),
      label: field.label?.trim() || field.formKey.trim(),
      placeholder: field.placeholder?.trim() || "",
      area: field.area || "main",
      width: field.width || "full",
      order: Number(field.order ?? index + 1),
      sourceRequestFilters: cleanConstantFilters(
        field.sourceRequestFilters,
        field,
      ),
      sourceFilterBindings: cleanSelectFilterBindings(field.sourceFilterBindings),
      invalidateKeys: field.invalidateKeys
        ?.map((key) => key.trim())
        .filter(Boolean),
      sourceDataFields: Array.from(new Set(
        (field.sourceDataFields || []).map((key) => key.trim()).filter(Boolean),
      )),
      optionDisplay: field.optionDisplay && (
        field.optionDisplay.leftTemplate?.trim() ||
        field.optionDisplay.rightTemplate?.trim()
      ) ? {
          leftTemplate: field.optionDisplay.leftTemplate?.trim() || "",
          rightTemplate: field.optionDisplay.rightTemplate?.trim() || "",
        } : undefined,
    })),
  objectLists: (form.objectLists || [])
    .filter((objectList) => objectList.key.trim())
    .map((objectList) => ({
      ...objectList,
      key: objectList.key.trim(),
      title: objectList.title?.trim() || objectList.key.trim(),
      area: objectList.area || "right",
      source: "embedded",
      itemFields: (objectList.itemFields || []).filter(Boolean),
      display: {
        primaryField: objectList.display?.primaryField?.trim() || "",
        primaryTemplate: objectList.display?.primaryTemplate?.trim() || "",
        secondaryField: objectList.display?.secondaryField?.trim() || "",
        secondaryTemplate: objectList.display?.secondaryTemplate?.trim() || "",
        rightTemplate: objectList.display?.rightTemplate?.trim() || "",
        imageField: objectList.display?.imageField?.trim() || "",
        priceComparison: objectList.display?.priceComparison,
      },
      addAction: objectList.addAction
        ? {
            ...objectList.addAction,
            kind: "addObject",
            label: objectList.addAction.label?.trim() || "Add Item",
            area: objectList.addAction.area || "left",
            targetObjectList: objectList.key.trim(),
            sourceFields: (objectList.addAction.sourceFields || []).filter(
              Boolean,
            ),
            clearSourceFields: (
              objectList.addAction.clearSourceFields || []
            ).filter(Boolean),
            preserveSourceFields: (
              objectList.addAction.preserveSourceFields || []
            ).filter(Boolean),
            enabled: objectList.addAction.enabled !== false,
          }
        : undefined,
      actions: (objectList.actions || []).map((action) => ({
        ...action,
        label: action.label?.trim() || "",
        icon: action.icon?.trim() || "",
        position: action.position || "end",
        field: action.field?.trim() || "",
      })),
    })),
  summaries: form.summaries,
  actions: (form.actions || []).map((action, index) => ({
    ...action,
    label: action.label?.trim() || "",
    buttonName: action.buttonName?.trim() || "",
    area: action.area || (action.kind === "submit" ? "right" : "left"),
    targetObjectList: action.targetObjectList?.trim() || "",
    sourceFields: (action.sourceFields || []).filter(Boolean),
    clearSourceFields: (action.clearSourceFields || []).filter(Boolean),
    preserveSourceFields: (action.preserveSourceFields || []).filter(Boolean),
    enabled: action.enabled !== false,
    order: Number(action.order ?? index + 1),
  })),
  submit: {
    ...(form.submit || {}),
    mode: form.submit?.mode || "create",
    buttonName: form.submit?.buttonName?.trim() || "",
    ...(form.submit?.mode === "createMany"
      ? { bulkObjectListKey: form.submit.bulkObjectListKey?.trim() || "" }
      : {}),
    ...(form.submit?.mode === "workflow"
      ? {
          bulkObjectListKey: form.submit.bulkObjectListKey?.trim() || "",
          workflowSchema: form.submit.workflowSchema?.trim() || "",
          workflowName: form.submit.workflowName?.trim() || "",
        }
      : {}),
  },
  };
};
